import {Link} from 'react-router';
import {regions} from '~/data/regions';
import {restaurants} from '~/data/restaurants';

const featuredRestaurants = restaurants.filter((r) => r.featured).slice(0, 6);

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
      'We partner with the best independent restaurants in your city — from classic British bistros to vibrant street food kitchens.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    ),
    title: 'Exclusive Recipes',
    description:
      'Each restaurant shares their signature recipes — the real thing, written exactly as they cook it in their kitchen.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Your Binder',
    description:
      'The recipes arrive as beautiful recipe cards, ready to slot into your premium Locally Sauced binder.',
  },
];

export const meta = () => {
  return [
    {title: 'Locally Sauced — Real Recipes from Real Local Restaurants'},
    {
      name: 'description',
      content:
        'Locally Sauced collects exclusive recipes from the best independent restaurants in your city — presented in a beautiful binder.',
    },
  ];
};

export default function Homepage() {
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
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-36 text-center">
          <span className="inline-block text-secondary text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The cookbook from your neighbourhood
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Real Recipes from
            <br />
            <span className="text-secondary">Real Local Restaurants</span>
          </h1>
          <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Locally Sauced collects exclusive recipes from the best independent
            restaurants in your city — presented in a beautiful binder you'll
            treasure for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
            >
              Get Your Binder
            </Link>
            <Link
              to="/recipes"
              className="inline-flex items-center justify-center px-8 py-3 rounded-md border border-primary-foreground/40 text-primary-foreground font-medium hover:bg-primary-foreground/10 transition-colors"
            >
              Browse Recipes
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
            A cookbook with soul — built from the kitchens of restaurants you
            already love.
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

      {/* Regions */}
      <section className="bg-muted py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Available Regions</h2>
            <p className="text-muted-foreground">
              More cities launching soon — is yours next?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {regions.map((region) => (
              <Link
                key={region.id}
                to={`/restaurants?region=${region.id}`}
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
            to="/collections"
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-secondary text-secondary-foreground font-medium hover:bg-secondary/90 transition-colors"
          >
            Shop Now — from £14.99
          </Link>
        </div>
      </section>
    </div>
  );
}
