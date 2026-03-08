/**
 * Google Search Console verification file
 * @param {Route.LoaderArgs}
 */
export async function loader() {
  return new Response(
    'google-site-verification: googlebf5167d087b0d0b1.html',
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
      },
    },
  );
}

/** @typedef {import('./+types/[googlebf5167d087b0d0b1.html]').Route} Route */
