import {Link, useSearchParams} from 'react-router';
import {useState, useEffect} from 'react';
import {restaurants} from '~/data/restaurants';
import {regions} from '~/data/regions';
import {recipes} from '~/data/recipes';

export const meta = () => {
  return [
    {title: 'Our Restaurants — Locally Sauced'},
    {
      name: 'description',
      content:
        'Every restaurant in the Locally Sauced collection — browse by region.',
    },
  ];
};

export default function RestaurantsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRegion, setSelectedRegion] = useState(
    searchParams.get('region') ?? 'all',
  );

  useEffect(() => {
    const region = searchParams.get('region');
    if (region) setSelectedRegion(region);
  }, [searchParams]);

  const filtered =
    selectedRegion === 'all'
      ? restaurants
      : restaurants.filter((r) => r.regionId === selectedRegion);

  function handleRegionChange(e) {
    const value = e.target.value;
    setSelectedRegion(value);
    if (value === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({region: value});
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <span className="text-sm font-semibold tracking-[0.2em] uppercase text-secondary">
          Directory
        </span>
        <h1 className="text-4xl font-bold mt-2 mb-4">Our Restaurants</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Every restaurant in the Locally Sauced collection — browse by region.
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm font-medium text-muted-foreground shrink-0">
          Filter by region:
        </span>
        <select
          value={selectedRegion}
          onChange={handleRegionChange}
          className="w-56 px-3 py-2 rounded-md border border-input bg-card text-sm"
        >
          <option value="all">All regions</option>
          {regions.map((region) => (
            <option key={region.id} value={region.id}>
              {region.name}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} restaurants
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((restaurant) => {
          const region = regions.find((r) => r.id === restaurant.regionId);
          const recipeCount = recipes.filter(
            (rec) => rec.restaurantId === restaurant.id,
          ).length;
          return (
            <Link
              key={restaurant.id}
              to={`/restaurants/${restaurant.id}`}
              className="group"
            >
              <div className="bg-card rounded-lg border border-border hover:shadow-md transition-shadow h-full cursor-pointer">
                <div className="h-36 rounded-t-lg bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-primary/30"
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
                    <h2 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {restaurant.name}
                    </h2>
                    <span className="shrink-0 text-xs px-2 py-0.5 rounded-full border border-border">
                      {restaurant.cuisine}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {restaurant.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
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
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                      </svg>
                      {region?.name}
                    </div>
                    <span>
                      {recipeCount} {recipeCount === 1 ? 'recipe' : 'recipes'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
