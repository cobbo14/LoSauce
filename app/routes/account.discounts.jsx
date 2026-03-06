import {data as remixData, useLoaderData} from 'react-router';
import {useState} from 'react';
import {DiscountQRCode} from '~/components/DiscountQRCode';
import {getCustomerDiscounts} from '~/lib/discounts.server';
import {restaurants} from '~/data/restaurants';
import {CUSTOMER_EMAIL_QUERY} from '~/graphql/customer-account/CustomerEmailQuery';

export const meta = () => {
  return [{title: 'My Discounts — Locally Sauced'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({context}) {
  const {customerAccount, supabaseAdmin} = context;

  await customerAccount.handleAuthStatus();

  // Get customer email from Shopify Customer Account API
  const {data: customerData} = await customerAccount.query(CUSTOMER_EMAIL_QUERY);
  const email = customerData?.customer?.emailAddress?.emailAddress;

  if (!email || !supabaseAdmin) {
    return remixData({storeCodes: [], restaurantCodes: [], email: null});
  }

  const {storeCodes, restaurantCodes} = await getCustomerDiscounts(
    supabaseAdmin,
    email,
  );

  return remixData(
    {storeCodes, restaurantCodes, email},
    {headers: {'Cache-Control': 'no-cache, no-store, must-revalidate'}},
  );
}

export default function AccountDiscountsPage() {
  /** @type {ReturnType<typeof useLoaderData<typeof loader>>} */
  const {storeCodes, restaurantCodes} = useLoaderData();

  const hasAnyDiscounts = storeCodes.length > 0 || restaurantCodes.length > 0;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Discounts</h2>

      {!hasAnyDiscounts ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <svg
            className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
            />
          </svg>
          <h3 className="text-lg font-semibold mb-2">No discounts yet</h3>
          <p className="text-muted-foreground mb-4">
            Purchase a Locally Sauced binder to unlock exclusive discounts at
            our partner restaurants and on future orders.
          </p>
          <a
            href="/collections"
            className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Browse Binders
          </a>
        </div>
      ) : (
        <div className="space-y-8">
          {/* LoSauce Store Discounts */}
          {storeCodes.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">Store Discounts</h3>
              <div className="space-y-3">
                {storeCodes.map((discount) => (
                  <StoreDiscountCard key={discount.id} discount={discount} />
                ))}
              </div>
            </section>
          )}

          {/* Restaurant Discounts */}
          {restaurantCodes.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Restaurant Discounts
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Show the QR code to restaurant staff when you visit. They will
                scan it to apply your discount.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurantCodes.map((discount) => (
                  <RestaurantDiscountCard
                    key={discount.id}
                    discount={discount}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function StoreDiscountCard({discount}) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(discount.shopify_discount_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-card border border-border rounded-lg p-4 flex items-center justify-between gap-4">
      <div>
        <p className="font-medium">
          {discount.discount_value}% off your next order
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {discount.redeemed ? 'Used' : 'Active'}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
          {discount.shopify_discount_code}
        </code>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 text-sm rounded-md border border-input hover:bg-muted transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <a
          href={`/discount/${discount.shopify_discount_code}?redirect=/collections`}
          className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Apply
        </a>
      </div>
    </div>
  );
}

function RestaurantDiscountCard({discount}) {
  const offer = discount.restaurant_offers;
  const restaurant = restaurants.find(
    (r) => r.id === discount.restaurant_id,
  );
  const isExpired =
    discount.status === 'expired' ||
    (discount.expires_at && new Date(discount.expires_at) < new Date());
  const isRedeemed = discount.status === 'redeemed';
  const isActive = !isExpired && !isRedeemed;

  return (
    <div
      className={`bg-card border rounded-lg p-5 ${
        isActive ? 'border-border' : 'border-border opacity-60'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-semibold">{restaurant?.name || discount.restaurant_id}</h4>
          {offer && (
            <p className="text-primary font-medium text-sm mt-0.5">
              {offer.offer_title}
            </p>
          )}
        </div>
        <StatusBadge status={isRedeemed ? 'redeemed' : isExpired ? 'expired' : 'active'} />
      </div>

      {offer?.offer_description && (
        <p className="text-xs text-muted-foreground mb-4">
          {offer.offer_description}
        </p>
      )}

      {isActive && (
        <div className="flex justify-center pt-2">
          <DiscountQRCode code={discount.code} size={160} />
        </div>
      )}

      {discount.expires_at && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          Valid until {new Date(discount.expires_at).toLocaleDateString('en-GB')}
        </p>
      )}
    </div>
  );
}

function StatusBadge({status}) {
  const styles = {
    active:
      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    redeemed:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    expired:
      'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400',
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

/** @typedef {import('./+types/account.discounts').Route} Route */
