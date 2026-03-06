import {Link, useParams} from 'react-router';
import {recipes} from '~/data/recipes';
import {restaurants} from '~/data/restaurants';
import {regions} from '~/data/regions';

export const meta = ({params}) => {
  const recipe = recipes.find((r) => r.id === params.id);
  if (!recipe) {
    return [{title: 'Recipe — Locally Sauced'}];
  }
  return [
    {title: `${recipe.name} — Locally Sauced`},
    {name: 'description', content: recipe.description},
    {property: 'og:title', content: `${recipe.name} — Locally Sauced`},
    {property: 'og:description', content: recipe.description},
  ];
};

export default function RecipeDetailPage() {
  const {id} = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
        <Link to="/recipes" className="text-primary hover:underline">
          Back to all recipes
        </Link>
      </div>
    );
  }

  const restaurant = restaurants.find((r) => r.id === recipe.restaurantId);
  const region = restaurant
    ? regions.find((r) => r.id === restaurant.regionId)
    : null;
  const totalTime = recipe.prepTime + recipe.cookTime;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back */}
      <Link
        to="/recipes"
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
        All recipes
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
            {recipe.cuisine}
          </span>
          {recipe.dietary.map((d) => (
            <span
              key={d}
              className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {d}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
          {recipe.name}
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          {recipe.description}
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-6 text-sm">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-muted-foreground"
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
            <div>
              <div className="font-medium">{recipe.prepTime} min</div>
              <div className="text-muted-foreground text-xs">Prep</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-muted-foreground"
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
            <div>
              <div className="font-medium">{recipe.cookTime} min</div>
              <div className="text-muted-foreground text-xs">Cook</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-muted-foreground"
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
            <div>
              <div className="font-medium">{totalTime} min</div>
              <div className="text-muted-foreground text-xs">Total</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <div>
              <div className="font-medium">{recipe.servings}</div>
              <div className="text-muted-foreground text-xs">Servings</div>
            </div>
          </div>
        </div>
      </div>

      <hr className="mb-8 border-border" />

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Ingredients</h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
              {ingredient}
            </li>
          ))}
        </ul>
      </section>

      <hr className="mb-8 border-border" />

      {/* Method */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-5">Method</h2>
        <ol className="space-y-5">
          {recipe.instructions.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <hr className="mb-8 border-border" />

      {/* Restaurant credit */}
      {restaurant && (
        <section className="bg-muted rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
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
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
                Recipe by
              </p>
              <h3 className="font-semibold text-lg leading-tight">
                {restaurant.name}
              </h3>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-1">
            {restaurant.description}
          </p>
          {region && (
            <p className="text-xs text-muted-foreground">
              {region.name} · {restaurant.address}
            </p>
          )}
          <div className="flex gap-3 mt-4">
            <Link
              to={`/restaurants/${restaurant.id}`}
              className="inline-flex items-center px-4 py-2 rounded-md border border-border text-sm font-medium hover:bg-card transition-colors"
            >
              View Restaurant
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Get the Binder
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
