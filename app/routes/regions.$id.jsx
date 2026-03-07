import {Link, useParams} from 'react-router';
import {regions} from '~/data/regions';
import {restaurants} from '~/data/restaurants';
import {recipes} from '~/data/recipes';

export const meta = ({params}) => {
  const region = regions.find((r) => r.id === params.id);
  if (!region) return [{title: 'Region Not Found — Locally Sauced'}];
  return [
    {title: `${region.name} — Locally Sauced`},
    {
      name: 'description',
      content: region.description,
    },
  ];
};

export default function RegionPage() {
  const {id} = useParams();
  const region = regions.find((r) => r.id === id);

  if (!region) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Region Not Found</h1>
        <p className="text-muted-foreground mb-6">
          We couldn't find that region. Browse our available cities below.
        </p>
        <Link
          to="/regions"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          View All Regions
        </Link>
      </div>
    );
  }

  const regionRestaurants = restaurants.filter((r) => r.regionId === region.id);
  const regionRecipes = recipes.filter((recipe) =>
    regionRestaurants.some((r) => r.id === recipe.restaurantId),
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
            {region.city} Edition
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mt-3 mb-6">
            {region.name}
          </h1>
          <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl mx-auto">
            {region.description}
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center">
            <span className="text-3xl font-bold text-secondary">{regionRestaurants.length}</span>
            <p className="text-muted-foreground text-sm mt-1">Restaurants</p>
          </div>
          <div className="text-center">
            <span className="text-3xl font-bold text-secondary">{regionRecipes.length}</span>
            <p className="text-muted-foreground text-sm mt-1">Recipes</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <span className="text-3xl font-bold text-secondary">
              {[...new Set(regionRecipes.map((r) => r.cuisine))].length}
            </span>
            <p className="text-muted-foreground text-sm mt-1">Cuisines</p>
          </div>
        </div>

        {/* Restaurants */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionRestaurants.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurants/${restaurant.id}`}
                prefetch="intent"
                className="group"
              >
                <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full">
                  <div className="h-32 rounded-t-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    </svg>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">
                        {restaurant.name}
                      </h3>
                      <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-border">
                        {restaurant.cuisine}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {restaurant.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recipes */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Recipes from {region.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionRecipes.map((recipe) => {
              const restaurant = regionRestaurants.find(
                (r) => r.id === recipe.restaurantId,
              );
              return (
                <Link
                  key={recipe.id}
                  to={`/recipes/${recipe.id}`}
                  prefetch="intent"
                  className="group"
                >
                  <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full">
                    <div className="p-5">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors mb-1">
                        {recipe.name}
                      </h3>
                      {restaurant && (
                        <p className="text-xs text-secondary mb-2">
                          {restaurant.name}
                        </p>
                      )}
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {recipe.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{recipe.prepTime + recipe.cookTime} min</span>
                        <span>·</span>
                        <span>Serves {recipe.servings}</span>
                        {recipe.dietary.length > 0 && (
                          <>
                            <span>·</span>
                            <span className="capitalize">{recipe.dietary[0]}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-muted rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Get the {region.name} Binder
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg mx-auto">
            All these recipes, beautifully printed and ready to cook from. Order
            your binder today.
          </p>
          <Link
            to="/collections/all"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
