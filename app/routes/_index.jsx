import {Link, useLoaderData, useFetcher, data as remixData} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {regions} from '~/data/regions';
import {restaurants} from '~/data/restaurants';
import heroLogoImg from '~/assets/hero-logo.png';

const featuredRestaurants = restaurants.filter((r) => r.featured).slice(0, 6);

const BINDER_LOCATIONS = {
  'surrey-binder': {lat: 51.3148, lng: -0.5600, area: 'Surrey'},
  'berkshire-binder': {lat: 51.4543, lng: -0.9781, area: 'Berkshire'},
};

const testimonials = [
  {
    quote:
      "I bought the SW London edition as a housewarming gift and my friend absolutely loved it. The recipes are proper — not dumbed down versions. We've already cooked three of them.",
    name: 'Sophie R.',
    location: 'Wandsworth',
  },
  {
    quote:
      "Such a lovely idea. It's like having a little piece of your favourite restaurants at home. The binder itself is gorgeous too — it sits proudly on my kitchen shelf.",
    name: 'James T.',
    location: 'Richmond',
  },
  {
    quote:
      "We made the Gambas al Ajillo from Casa Andalucía last weekend and it was incredible. My partner said it tasted exactly like the restaurant. Can't wait for the next edition.",
    name: 'Priya K.',
    location: 'Battersea',
  },
];

const steps = [
  {
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Local Restaurants',
    description:
      'We partner with the best independent restaurants in your area. Ranging from classic British bistros to vibrant street food kitchens.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
    title: 'Exclusive Recipes',
    description:
      'Each restaurant shares the secrets behind their signature recipes just for you, written exactly as they cook it in their kitchen.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Your Binder',
    description:
      'The recipes arrive as beautiful recipe cards which can be sorted, removed or built upon within your premium Locally Sauced binder.',
  },
];

export const meta = () => {
  return [
    {title: 'Locally Sauced — The Cookbook Your Community Built'},
    {
      name: 'description',
      content:
        'Locally Sauced collects exclusive recipes from the best independent restaurants in your city — presented in a beautiful binder.',
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Locally Sauced',
        url: 'https://locallysauced.uk',
        logo: 'https://locallysauced.uk/hero-logo.png',
        description:
          'Locally Sauced collects exclusive recipes from the best independent restaurants in your city — presented in a beautiful binder.',
        email: 'hello@locallysauced.uk',
        sameAs: [
          'https://instagram.com/locallysaucedHQ',
          'https://tiktok.com/@locallysauced',
          'https://facebook.com/locallysauced',
          'https://x.com/locallysauced',
        ],
      },
    },
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Locally Sauced',
        url: 'https://locallysauced.uk',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://locallysauced.uk/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {products} = await context.storefront.query(FEATURED_PRODUCTS_QUERY);
  return {products: products.nodes};
}

/**
 * @param {Route.ActionArgs} args
 */
export async function action({request}) {
  const formData = await request.formData();
  const postcode = String(formData.get('postcode') || '').trim().replace(/\s+/g, '');

  if (!postcode) {
    return remixData({error: 'Please enter a postcode.'}, {status: 400});
  }

  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`,
    );
    const json = await res.json();

    if (json.status !== 200 || !json.result) {
      return remixData(
        {error: "We couldn't find that postcode. Please check and try again."},
        {status: 400},
      );
    }

    return remixData({
      latitude: json.result.latitude,
      longitude: json.result.longitude,
    });
  } catch {
    return remixData(
      {error: 'Something went wrong. Please try again.'},
      {status: 500},
    );
  }
}

export default function Homepage() {
  const {products} = useLoaderData();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%, oklch(0.73 0.12 75) 0%, transparent 60%), radial-gradient(circle at 80% 20%, oklch(0.73 0.12 75) 0%, transparent 50%)',
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <img src={heroLogoImg} alt="Locally Sauced" className="w-48 md:w-56 mx-auto mb-6" />
          <span className="inline-block text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The cookbook from your neighbourhood
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            The Cookbook
            <br />
            <span className="text-secondary">Your Community Built</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Locally Sauced collects exclusive recipes from the best independent
            restaurants in your area. Presented in a beautiful binder you'll
            treasure and build on for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                document.getElementById('postcode-search')?.scrollIntoView({behavior: 'smooth'});
                setTimeout(() => document.querySelector('#postcode-search input[name="postcode"]')?.focus(), 600);
              }}
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
            >
              Find Your Binder
            </button>
            <Link
              to="/collections/all"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Our Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A cookbook forged from the fires of the kitchens you already love.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Find Your Area */}
      <PostcodeSearch products={products} />

      {/* Products */}
      {products.length > 0 && (
        <section className="bg-muted py-20">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
                Shop
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
                Our Products
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Everything you need to bring restaurant-quality cooking into your
                home.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <HomepageProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/collections/all"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-md border border-border text-sm font-medium hover:bg-card transition-colors"
              >
                View All Products
              </Link>
            </div>

            {/* Regions */}
            <div className="mt-20 text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Available Regions</h2>
              <p className="text-muted-foreground">
                More cities launching soon — is yours next?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regions.map((region) => (
                <Link
                  key={region.id}
                  to={`/regions/${region.id}`}
                  className="group"
                >
                  <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow cursor-pointer">
                    <div className="h-2 bg-secondary rounded-t-lg" />
                    <div className="pt-5 pb-6 px-5">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-primary mt-0.5 shrink-0"
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
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {region.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                            {region.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured restaurants */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Featured Restaurants</h2>
          <Link
            to="/restaurants"
            className="inline-flex items-center px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-muted transition-colors"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRestaurants.map((restaurant) => {
            const region = regions.find((r) => r.id === restaurant.regionId);
            return (
              <Link
                key={restaurant.id}
                to={`/restaurants/${restaurant.id}`}
                className="group"
              >
                <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full cursor-pointer">
                  <div className="h-40 rounded-t-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <svg
                      className="w-10 h-10 text-primary/40"
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
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors leading-tight">
                        {restaurant.name}
                      </h3>
                      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-border">
                        {restaurant.cuisine}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {restaurant.description}
                    </p>
                    {region && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                        </svg>
                        {region.name}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              What People Are Saying
            </h2>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <svg className="w-8 h-8 text-secondary/40 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="text-foreground/80 leading-relaxed mb-4 text-sm">
                  {t.quote}
                </p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="bg-card border border-border rounded-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            Stay in the Loop
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-4">
            New Cities. New Recipes. New Editions.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Be the first to know when we launch in a new city or drop a new
            edition. No spam — just good food news.
          </p>
          {/* Klaviyo signup form — replace FORM_ID with your Klaviyo embedded form ID */}
          <div className="klaviyo-form-PLACEHOLDER"></div>
          <noscript>
            <a
              href="mailto:hello@locallysauced.uk?subject=Newsletter Signup&body=Hi! I'd like to join the Locally Sauced mailing list. Please add me!"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Join the Mailing List
            </a>
          </noscript>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to cook like a local?
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8">
            Order your Locally Sauced binder and bring restaurant-quality
            cooking into your home.
          </p>
          <Link
            to="/collections/all"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          >
            Shop Now — from £14.99
          </Link>
        </div>
      </section>
    </div>
  );
}

function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function PostcodeSearch({products}) {
  const fetcher = useFetcher();
  const loading = fetcher.state !== 'idle';
  const data = fetcher.data;

  // Filter to binder products that have a location, then rank by distance
  const ranked =
    data?.latitude != null
      ? products
          .filter((p) => BINDER_LOCATIONS[p.handle])
          .map((p) => {
            const loc = BINDER_LOCATIONS[p.handle];
            return {
              ...p,
              area: loc.area,
              distance: getDistanceKm(data.latitude, data.longitude, loc.lat, loc.lng),
            };
          })
          .sort((a, b) => a.distance - b.distance)
      : null;

  return (
    <section id="postcode-search" className="max-w-6xl mx-auto px-4 py-20">
      <div className="bg-card border border-border rounded-xl p-8 md:p-12 max-w-2xl mx-auto text-center">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Find Your Area
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mt-3 mb-3">
          Is there a binder near you?
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Enter your postcode and we'll find the nearest Locally Sauced binder.
        </p>
        <fetcher.Form method="post" className="flex gap-3 max-w-sm mx-auto">
          <input
            type="text"
            name="postcode"
            placeholder="e.g. SW11 1AA"
            className="flex-1 px-4 py-2.5 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </fetcher.Form>

        {data?.error && (
          <p className="text-red-500 text-sm mt-4">{data.error}</p>
        )}

        {ranked && ranked.length > 0 && (
          <div className="mt-8 text-left">
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg p-5 mb-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-secondary mb-1">
                    Nearest binder
                  </p>
                  <h3 className="text-xl font-bold text-foreground">
                    {ranked[0].title}
                  </h3>
                  {ranked[0].description && (
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {ranked[0].description}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    ~{Math.round(ranked[0].distance * 0.621)} miles away
                  </p>
                </div>
                <Link
                  to={`/products/${ranked[0].handle}`}
                  className="shrink-0 inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  View Binder
                </Link>
              </div>
            </div>

            {ranked.length > 1 && (
              <div>
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
                  Other binders
                </p>
                <div className="space-y-2">
                  {ranked.slice(1).map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.handle}`}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-border hover:bg-muted transition-colors"
                    >
                      <div>
                        <p className="font-medium text-sm">{product.title}</p>
                        <p className="text-xs text-muted-foreground">
                          ~{Math.round(product.distance * 0.621)} miles away
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-muted-foreground shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {ranked && ranked.length === 0 && (
          <div className="mt-8">
            <p className="text-muted-foreground text-sm">
              We don't have a binder for your area yet, but we're expanding!
              Check out our{' '}
              <Link to="/collections/all" className="text-primary hover:underline">
                full range
              </Link>.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function HomepageProductCard({product}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  return (
    <Link
      className="group block bg-card rounded-lg border border-border hover:shadow-md transition-shadow overflow-hidden"
      to={variantUrl}
      prefetch="intent"
    >
      <div className="h-2 bg-secondary rounded-t-lg" />
      {image && (
        <div className="overflow-hidden">
          <Image
            alt={image.altText || product.title}
            aspectRatio="1/1"
            data={image}
            loading="eager"
            sizes="(min-width: 45em) 400px, 100vw"
            className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-muted-foreground text-sm leading-relaxed mt-2 line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-secondary font-medium mt-3">
          <Money data={product.priceRange.minVariantPrice} />
        </p>
      </div>
    </Link>
  );
}

const FEATURED_PRODUCTS_QUERY = `#graphql
  query FeaturedProducts(
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: 6, sortKey: BEST_SELLING) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          id
          altText
          url
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
