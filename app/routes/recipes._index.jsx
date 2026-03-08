import {useState} from 'react';
import {Link} from 'react-router';
import {recipes} from '~/data/recipes';
import {restaurants} from '~/data/restaurants';
import {regions} from '~/data/regions';

const ALL_CUISINES = Array.from(new Set(recipes.map((r) => r.cuisine))).sort();
const ALL_DIETARY = Array.from(
  new Set(recipes.flatMap((r) => r.dietary)),
).sort();

export function headers() {
  return {
    'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
  };
}

export const meta = () => {
  return [
    {title: 'All Recipes — Locally Sauced'},
    {
      name: 'description',
      content:
        'Exclusive recipes from every restaurant in our collection. Filter to find exactly what you\'re looking for.',
    },
  ];
};

export default function RecipesPage() {
  const [regionFilter, setRegionFilter] = useState('all');
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');

  const filtered = recipes.filter((recipe) => {
    const restaurant = restaurants.find((r) => r.id === recipe.restaurantId);
    if (!restaurant) return false;

    if (regionFilter !== 'all' && restaurant.regionId !== regionFilter)
      return false;
    if (cuisineFilter !== 'all' && recipe.cuisine !== cuisineFilter)
      return false;
    if (dietaryFilter !== 'all' && !recipe.dietary.includes(dietaryFilter))
      return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Cook
        </span>
        <h1 className="text-4xl font-bold mt-2 mb-4">All Recipes</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Exclusive recipes from every restaurant in our collection. Filter to
          find exactly what you're looking for.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-48 px-3 py-2 rounded-md border border-input bg-card text-sm"
        >
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name}
            </option>
          ))}
        </select>

        <select
          value={cuisineFilter}
          onChange={(e) => setCuisineFilter(e.target.value)}
          className="w-44 px-3 py-2 rounded-md border border-input bg-card text-sm"
        >
          <option value="all">All cuisines</option>
          {ALL_CUISINES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={dietaryFilter}
          onChange={(e) => setDietaryFilter(e.target.value)}
          className="w-44 px-3 py-2 rounded-md border border-input bg-card text-sm"
        >
          <option value="all">All dietary</option>
          {ALL_DIETARY.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <span className="self-center text-sm text-muted-foreground">
          {filtered.length} recipes
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No recipes match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((recipe) => {
            const restaurant = restaurants.find(
              (r) => r.id === recipe.restaurantId,
            );
            return (
              <Link
                key={recipe.id}
                to={`/recipes/${recipe.id}`}
                className="group"
              >
                <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full cursor-pointer p-5">
                  <h2 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors mb-2">
                    {recipe.name}
                  </h2>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-xs px-2 py-0.5 rounded-full border border-border">
                      {recipe.cuisine}
                    </span>
                    {recipe.dietary.slice(0, 2).map((d) => (
                      <span
                        key={d}
                        className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {recipe.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
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
                        {recipe.prepTime + recipe.cookTime} min
                      </span>
                      <span>Serves {recipe.servings}</span>
                    </div>
                    {restaurant && (
                      <span className="truncate max-w-[120px]">
                        {restaurant.name}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
