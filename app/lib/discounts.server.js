import {sha256} from '@noble/hashes/sha2.js';
import {bytesToHex} from '@noble/hashes/utils.js';

/**
 * Generate a unique restaurant discount code.
 * Format: LS-{RESTAURANT_SHORT}-{RANDOM} e.g. LS-IVY-A7K2M9
 * @param {string} restaurantId
 * @returns {string}
 */
export function generateDiscountCode(restaurantId) {
  const prefix = 'LS';
  // Take first 3 consonant-heavy chars of restaurant ID for readability
  const short = restaurantId
    .replace(/^the-/, '')
    .replace(/-/g, '')
    .slice(0, 3)
    .toUpperCase();
  const random = crypto.randomUUID().replace(/-/g, '').slice(0, 6).toUpperCase();
  return `${prefix}-${short}-${random}`;
}

/**
 * Hash a PIN using SHA-256 with a salt.
 * @param {string} pin
 * @param {string} salt
 * @returns {string}
 */
export function hashPin(pin, salt) {
  const data = new TextEncoder().encode(`${salt}:${pin}`);
  return bytesToHex(sha256(data));
}

/**
 * Verify a PIN against its hash.
 * @param {string} pin
 * @param {string} salt
 * @param {string} expectedHash
 * @returns {boolean}
 */
export function verifyPin(pin, salt, expectedHash) {
  return hashPin(pin, salt) === expectedHash;
}

/**
 * Assign a LoSauce store discount code from the pool to a customer.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} customerEmail
 * @param {string} orderId
 * @param {string} regionId
 * @returns {Promise<{code: string, value: number} | null>}
 */
export async function assignStoreDiscount(
  supabase,
  customerEmail,
  orderId,
  regionId,
) {
  // Find an unassigned code for this region (or region 'all')
  const {data: code, error} = await supabase
    .from('losaucestore_discounts')
    .select('id, shopify_discount_code, discount_value')
    .is('assigned_to_email', null)
    .or(`region_id.eq.${regionId},region_id.eq.all`)
    .limit(1)
    .single();

  if (error || !code) return null;

  // Assign it
  await supabase
    .from('losaucestore_discounts')
    .update({
      assigned_to_email: customerEmail,
      assigned_to_order_id: orderId,
      assigned_at: new Date().toISOString(),
    })
    .eq('id', code.id);

  return {code: code.shopify_discount_code, value: code.discount_value};
}

/**
 * Generate and store restaurant discount codes for all restaurants in a region.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} customerEmail
 * @param {string} customerName
 * @param {string} orderId
 * @param {string} regionId
 * @returns {Promise<Array<{restaurantId: string, code: string, offerTitle: string, offerDescription: string}>>}
 */
export async function generateRestaurantCodes(
  supabase,
  customerEmail,
  customerName,
  orderId,
  regionId,
) {
  // Get all active offers for this region
  const {data: offers, error} = await supabase
    .from('restaurant_offers')
    .select('*')
    .eq('region_id', regionId)
    .eq('active', true)
    .gte('valid_until', new Date().toISOString().split('T')[0]);

  if (error || !offers?.length) return [];

  const codes = offers.map((offer) => ({
    code: generateDiscountCode(offer.restaurant_id),
    offer_id: offer.id,
    restaurant_id: offer.restaurant_id,
    customer_email: customerEmail,
    customer_name: customerName,
    order_id: orderId,
    status: 'active',
    expires_at: offer.valid_until,
  }));

  const {error: insertError} = await supabase
    .from('restaurant_discount_codes')
    .insert(codes);

  if (insertError) {
    console.error('Failed to insert restaurant codes:', insertError);
    return [];
  }

  return codes.map((c, i) => ({
    restaurantId: c.restaurant_id,
    code: c.code,
    offerTitle: offers[i].offer_title,
    offerDescription: offers[i].offer_description,
  }));
}

/**
 * Get all discount codes for a customer.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} customerEmail
 * @returns {Promise<{storeCodes: Array, restaurantCodes: Array}>}
 */
export async function getCustomerDiscounts(supabase, customerEmail) {
  const [storeResult, restaurantResult] = await Promise.all([
    supabase
      .from('losaucestore_discounts')
      .select('*')
      .eq('assigned_to_email', customerEmail)
      .order('assigned_at', {ascending: false}),
    supabase
      .from('restaurant_discount_codes')
      .select('*, restaurant_offers(*)')
      .eq('customer_email', customerEmail)
      .order('created_at', {ascending: false}),
  ]);

  return {
    storeCodes: storeResult.data || [],
    restaurantCodes: restaurantResult.data || [],
  };
}

/**
 * Look up a discount code for verification.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} code
 * @returns {Promise<Object|null>}
 */
export async function lookupCode(supabase, code) {
  const {data, error} = await supabase
    .from('restaurant_discount_codes')
    .select('*, restaurant_offers(*)')
    .eq('code', code.toUpperCase())
    .single();

  if (error) return null;
  return data;
}

/**
 * Redeem a discount code.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} code
 * @param {string} redeemedBy
 * @returns {Promise<boolean>}
 */
export async function redeemCode(supabase, code, redeemedBy) {
  const {error} = await supabase
    .from('restaurant_discount_codes')
    .update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
      redeemed_by: redeemedBy,
    })
    .eq('code', code.toUpperCase())
    .eq('status', 'active');

  return !error;
}

/**
 * Get active restaurant offers (public, for display on restaurant pages).
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase
 * @param {string} [restaurantId] - Optional filter by restaurant
 * @returns {Promise<Array>}
 */
export async function getActiveOffers(supabase, restaurantId) {
  let query = supabase
    .from('restaurant_offers')
    .select('*')
    .eq('active', true)
    .gte('valid_until', new Date().toISOString().split('T')[0]);

  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }

  const {data} = await query;
  return data || [];
}
