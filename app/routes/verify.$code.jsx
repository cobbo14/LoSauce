import {
  data as remixData,
  Form,
  useLoaderData,
  useActionData,
} from 'react-router';
import {lookupCode, redeemCode} from '~/lib/discounts.server';
import {restaurants} from '~/data/restaurants';

export const meta = () => {
  return [{title: 'Verify Discount — Locally Sauced'}];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({params, context}) {
  const {supabaseAdmin} = context;
  const code = params.code;

  if (!supabaseAdmin || !code) {
    return remixData({discount: null, error: 'Service not configured'});
  }

  const discount = await lookupCode(supabaseAdmin, code);

  if (!discount) {
    return remixData({discount: null, error: 'Code not found'});
  }

  // Check if expired
  if (discount.expires_at && new Date(discount.expires_at) < new Date()) {
    discount.status = 'expired';
  }

  return remixData({discount, error: null});
}

/**
 * @param {Route.ActionArgs}
 */
export async function action({request, params, context}) {
  const {supabaseAdmin} = context;
  const code = params.code;

  if (!supabaseAdmin || !code) {
    return remixData({success: false, error: 'Service not configured'});
  }

  const formData = await request.formData();
  const pin = formData.get('pin');

  if (!pin) {
    return remixData({success: false, error: 'PIN is required'});
  }

  // Look up the code to get restaurant ID
  const discount = await lookupCode(supabaseAdmin, code);
  if (!discount) {
    return remixData({success: false, error: 'Code not found'});
  }

  if (discount.status !== 'active') {
    return remixData({
      success: false,
      error: `Code has already been ${discount.status}`,
    });
  }

  // Verify restaurant PIN
  const {data: pinRecord} = await supabaseAdmin
    .from('restaurant_pins')
    .select('pin_hash, salt')
    .eq('restaurant_id', discount.restaurant_id)
    .single();

  if (!pinRecord) {
    return remixData({
      success: false,
      error: 'Restaurant verification not configured',
    });
  }

  const {verifyPin} = await import('~/lib/discounts.server');
  const pinValid = verifyPin(String(pin), pinRecord.salt, pinRecord.pin_hash);

  if (!pinValid) {
    return remixData({success: false, error: 'Invalid PIN'});
  }

  // Redeem the code
  const redeemed = await redeemCode(
    supabaseAdmin,
    code,
    discount.restaurant_id,
  );

  if (!redeemed) {
    return remixData({success: false, error: 'Failed to redeem code'});
  }

  return remixData({success: true, error: null});
}

export default function VerifyCodePage() {
  /** @type {ReturnType<typeof useLoaderData<typeof loader>>} */
  const {discount, error: loaderError} = useLoaderData();
  const actionData = useActionData();

  // Code not found
  if (loaderError || !discount) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-card border border-border rounded-xl p-8">
          <svg
            className="w-16 h-16 text-red-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h1 className="text-2xl font-bold mb-2">Invalid Code</h1>
          <p className="text-muted-foreground">
            {loaderError || 'This discount code was not found.'}
          </p>
        </div>
      </div>
    );
  }

  const offer = discount.restaurant_offers;
  const restaurant = restaurants.find(
    (r) => r.id === discount.restaurant_id,
  );
  const isRedeemed =
    discount.status === 'redeemed' || actionData?.success === true;
  const isExpired = discount.status === 'expired';
  const isActive = !isRedeemed && !isExpired;

  return (
    <div className="max-w-lg mx-auto px-4 py-20">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary/15 to-secondary/15 p-6 text-center">
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary">
            Locally Sauced
          </span>
          <h1 className="text-xl font-bold mt-2">
            {restaurant?.name || discount.restaurant_id}
          </h1>
        </div>

        {/* Offer details */}
        <div className="p-6">
          {offer && (
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-primary">
                {offer.offer_title}
              </p>
              {offer.offer_description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {offer.offer_description}
                </p>
              )}
            </div>
          )}

          {/* Customer info */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">Customer</span>
                <p className="font-medium">{discount.customer_name}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Code</span>
                <p className="font-mono font-medium">{discount.code}</p>
              </div>
              {discount.expires_at && (
                <div>
                  <span className="text-muted-foreground">Valid until</span>
                  <p className="font-medium">
                    {new Date(discount.expires_at).toLocaleDateString('en-GB')}
                  </p>
                </div>
              )}
              <div>
                <span className="text-muted-foreground">Status</span>
                <p className="font-medium">
                  {isRedeemed
                    ? 'Redeemed'
                    : isExpired
                      ? 'Expired'
                      : 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Redeemed success */}
          {isRedeemed && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <svg
                className="w-10 h-10 text-green-500 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold text-green-700 dark:text-green-400">
                Discount Redeemed
              </p>
              <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                This code has been successfully applied.
              </p>
            </div>
          )}

          {/* Expired */}
          {isExpired && (
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <p className="font-semibold text-gray-600 dark:text-gray-400">
                This discount has expired.
              </p>
            </div>
          )}

          {/* Active — show redemption form */}
          {isActive && (
            <div>
              <p className="text-sm text-muted-foreground text-center mb-4">
                Enter your restaurant PIN to redeem this discount.
              </p>
              <Form method="POST" className="space-y-3">
                <input
                  type="password"
                  name="pin"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  required
                  className="w-full px-4 py-3 text-center text-lg font-mono tracking-widest rounded-lg border border-input bg-background"
                />
                {actionData?.error && (
                  <p className="text-sm text-red-500 text-center">
                    {actionData.error}
                  </p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Redeem Discount
                </button>
              </Form>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border px-6 py-3 text-center">
          <p className="text-xs text-muted-foreground">
            Powered by{' '}
            <a href="/" className="text-primary hover:underline">
              Locally Sauced
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

/** @typedef {import('./+types/verify.$code').Route} Route */
