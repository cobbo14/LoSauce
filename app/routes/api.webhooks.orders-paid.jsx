import {
  assignStoreDiscount,
  generateRestaurantCodes,
} from '~/lib/discounts.server';

/**
 * Shopify orders/paid webhook handler.
 *
 * Receives order data, determines the purchased binder region,
 * generates discount codes (store + restaurant), and optionally
 * sends a Klaviyo event to trigger the post-purchase email.
 *
 * @param {Route.ActionArgs}
 */
export async function action({request, context}) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {status: 405});
  }

  const {env, supabaseAdmin} = context;

  // Verify Shopify webhook HMAC
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256');
  const rawBody = await request.text();

  if (env.SHOPIFY_WEBHOOK_SECRET && hmacHeader) {
    const verified = await verifyWebhookHmac(
      rawBody,
      hmacHeader,
      env.SHOPIFY_WEBHOOK_SECRET,
    );
    if (!verified) {
      return new Response('Unauthorized', {status: 401});
    }
  }

  if (!supabaseAdmin) {
    console.error('Supabase not configured — cannot process webhook');
    return new Response('Service unavailable', {status: 503});
  }

  let order;
  try {
    order = JSON.parse(rawBody);
  } catch {
    return new Response('Invalid JSON', {status: 400});
  }

  const customerEmail = order.email || order.contact_email;
  const customerName =
    order.customer?.first_name ||
    order.billing_address?.first_name ||
    'Customer';
  const orderId = String(order.id);

  if (!customerEmail) {
    return new Response('No customer email', {status: 400});
  }

  // Determine region from product tags (e.g. "region:sw-london")
  const regionId = extractRegionFromOrder(order);
  if (!regionId) {
    console.log('Order does not contain a binder product with region tag');
    return new Response('OK — no binder product', {status: 200});
  }

  // Generate discount codes
  const [storeDiscount, restaurantCodes] = await Promise.all([
    assignStoreDiscount(supabaseAdmin, customerEmail, orderId, regionId),
    generateRestaurantCodes(
      supabaseAdmin,
      customerEmail,
      customerName,
      orderId,
      regionId,
    ),
  ]);

  // Send event to Klaviyo (if configured)
  if (env.KLAVIYO_PRIVATE_API_KEY) {
    await sendKlaviyoEvent(env.KLAVIYO_PRIVATE_API_KEY, {
      email: customerEmail,
      firstName: customerName,
      regionId,
      storeDiscount,
      restaurantCodes,
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      storeDiscount: storeDiscount?.code || null,
      restaurantCodes: restaurantCodes.length,
    }),
    {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    },
  );
}

/**
 * Extract region ID from order line item tags.
 * Looks for tags like "region:sw-london" on products.
 * @param {Object} order - Shopify order object
 * @returns {string|null}
 */
function extractRegionFromOrder(order) {
  const lineItems = order.line_items || [];
  for (const item of lineItems) {
    // Shopify sends tags as a comma-separated string on the product
    const tags = item.properties || [];
    // Check product tags (available in webhook payload)
    if (item.product_id) {
      // Tags come as a comma-separated string
      const tagString = item.tags || '';
      const tagList = tagString.split(',').map((t) => t.trim().toLowerCase());
      for (const tag of tagList) {
        if (tag.startsWith('region:')) {
          return tag.replace('region:', '');
        }
      }
    }
    // Also check line item properties (custom attributes)
    for (const prop of tags) {
      if (prop.name === 'region') {
        return prop.value;
      }
    }
  }
  return null;
}

/**
 * Verify Shopify webhook HMAC signature.
 * @param {string} body - Raw request body
 * @param {string} hmac - HMAC from header
 * @param {string} secret - Webhook secret
 * @returns {Promise<boolean>}
 */
async function verifyWebhookHmac(body, hmac, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {name: 'HMAC', hash: 'SHA-256'},
    false,
    ['sign'],
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
  const computed = btoa(
    String.fromCharCode(...new Uint8Array(signature)),
  );
  return computed === hmac;
}

/**
 * Send a custom event to Klaviyo to trigger the post-purchase email flow.
 * @param {string} apiKey
 * @param {Object} data
 */
async function sendKlaviyoEvent(apiKey, data) {
  try {
    await fetch('https://a.klaviyo.com/api/events/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${apiKey}`,
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            metric: {data: {type: 'metric', attributes: {name: 'Binder Purchase'}}},
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email: data.email,
                  first_name: data.firstName,
                },
              },
            },
            properties: {
              region_id: data.regionId,
              store_discount_code: data.storeDiscount?.code || null,
              store_discount_value: data.storeDiscount?.value || null,
              restaurant_discounts: data.restaurantCodes.map((c) => ({
                restaurant_id: c.restaurantId,
                code: c.code,
                offer_title: c.offerTitle,
                offer_description: c.offerDescription,
              })),
            },
          },
        },
      }),
    });
  } catch (error) {
    console.error('Failed to send Klaviyo event:', error);
  }
}

/** @typedef {import('./+types/api.webhooks.orders-paid').Route} Route */
