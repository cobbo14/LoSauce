import {Link, useParams, useLoaderData, data as remixData} from 'react-router';
import {restaurants} from '~/data/restaurants';
import {recipes} from '~/data/recipes';
import {regions} from '~/data/regions';
import {getActiveOffers} from '~/lib/discounts.server';
import {DiscountQRCode} from '~/components/DiscountQRCode';
import {CUSTOMER_EMAIL_QUERY} from '~/graphql/customer-account/CustomerEmailQuery';

export const meta = ({params}) => {
  const restaurant = restaurants.find((r) => r.id === params.id);
  return [
    {title: restaurant ? `${restaurant.name} — Locally Sauced` : 'Restaurant — Locally Sauced'},
  ];
};

/**
 * @param {Route.LoaderArgs}
 */
export async function loader({params, context}) {
  const {supabaseAdmin, customerAccount} = context;

  let offer = null;
  let customerCode = null;

  if (supabaseAdmin) {
    // Get active offer for this restaurant
    const offers = await getActiveOffers(supabaseAdmin, params.id);
    offer = offers[0] || null;

    // Check if logged-in user has a code for this restaurant
    try {
      const isLoggedIn = await customerAccount.isLoggedIn();
      if (isLoggedIn && offer) {
        const {data: customerData} = await customerAccount.query(CUSTOMER_EMAIL_QUERY);
        const email = customerData?.customer?.emailAddress?.emailAddress;
        if (email) {
          const {data: codes} = await supabaseAdmin
            .from('restaurant_discount_codes')
            .select('code, status, expires_at')
            .eq('restaurant_id', params.id)
            .eq('customer_email', email)
            .eq('status', 'active')
            .limit(1);
          customerCode = codes?.[0] || null;
        }
      }
    } catch {
      // Not logged in — that's fine
    }
  }

  return remixData({offer, customerCode});
}

export default function RestaurantDetailPage() {
  const {id} = useParams();
  const {offer, customerCode} = useLoaderData();
  const restaurant = restaurants.find((r) => r.id === id);

  if (!restaurant) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Restaurant not found</h1>
        <Link to="/restaurants" className="text-primary hover:underline">
          Back to all restaurants
        </Link>
      </div>
    );
  }

  const region = regions.find((r) => r.id === restaurant.regionId);
  const restaurantRecipes = recipes.filter(
    (r) => r.restaurantId === restaurant.id,
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        to="/restaurants"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        All restaurants
      </Link>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/15 to-secondary/15 rounded-xl h-48 flex items-center justify-center mb-8">
        <svg
          className="w-16 h-16 text-primary/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
          />
        </svg>
      </div>

      {/* Info */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
              {restaurant.cuisine}
            </span>
            {region && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                </svg>
                {region.name}
              </div>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {restaurant.name}
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {restaurant.description}
          </p>
          <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
            </svg>
            {restaurant.address}
          </p>
        </div>
      </div>

      {/* Discount Card */}
      {offer && (
        <div className="mb-10">
          {customerCode ? (
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-1 text-center md:text-left">
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary">
                    Your Exclusive Discount
                  </span>
                  <h3 className="text-xl font-bold mt-1 text-primary">
                    {offer.offer_title}
                  </h3>
                  {offer.offer_description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {offer.offer_description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-3">
                    Show the QR code to your server to redeem.
                  </p>
                </div>
                <DiscountQRCode code={customerCode.code} size={140} />
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <svg
                className="w-8 h-8 text-secondary mx-auto mb-2"
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
              <p className="font-semibold text-primary">{offer.offer_title}</p>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                Buy the {region?.name} binder to unlock this exclusive discount.
              </p>
              <Link
                to="/collections/all"
                className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Get the Binder
              </Link>
            </div>
          )}
        </div>
      )}

      <hr className="mb-10 border-border" />

      {/* Recipes */}
      <div>
        <h2 className="text-2xl font-bold mb-6">
          Recipes from {restaurant.name}
        </h2>
        {restaurantRecipes.length === 0 ? (
          <p className="text-muted-foreground">
            No recipes yet — check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {restaurantRecipes.map((recipe) => (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="group"
              >
                <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full cursor-pointer p-5">
                  <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                    {recipe.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {recipe.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Prep: {recipe.prepTime} min
                    </div>
                    <div className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Cook: {recipe.cookTime} min
                    </div>
                    <span>Serves {recipe.servings}</span>
                  </div>
                  {recipe.dietary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {recipe.dietary.map((d) => (
                        <span
                          key={d}
                          className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** @typedef {import('./+types/restaurants.$id').Route} Route */
