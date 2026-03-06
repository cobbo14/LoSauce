import {Link, useParams, redirect} from 'react-router';
import {restaurants} from '~/data/restaurants';
import {recipes} from '~/data/recipes';
import {regions} from '~/data/regions';

export const meta = ({params}) => {
  const restaurant = restaurants.find((r) => r.id === params.id);
  return [
    {title: restaurant ? `${restaurant.name} — Locally Sauced` : 'Restaurant — Locally Sauced'},
  ];
};

export default function RestaurantDetailPage() {
  const {id} = useParams();
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
