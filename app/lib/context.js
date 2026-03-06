import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {CART_QUERY_FRAGMENT} from '~/lib/fragments';
import {createSupabaseAdmin, createSupabaseClient} from '~/lib/supabase.server';

/**
 * Creates Hydrogen context for React Router 7.9.x
 * Returns HydrogenRouterContextProvider with hybrid access patterns
 * @param {Request} request
 * @param {Env} env
 * @param {ExecutionContext} executionContext
 */
export async function createHydrogenRouterContext(
  request,
  env,
  executionContext,
) {
  /**
   * Open a cache instance in the worker and a custom session instance.
   */
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  // Initialise Supabase clients (only if env vars are configured)
  const supabase =
    env.SUPABASE_URL && env.SUPABASE_ANON_KEY
      ? createSupabaseClient(env)
      : null;
  const supabaseAdmin =
    env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
      ? createSupabaseAdmin(env)
      : null;

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: {language: 'EN', country: 'GB'},
      cart: {
        queryFragment: CART_QUERY_FRAGMENT,
      },
    },
    {supabase, supabaseAdmin},
  );

  return hydrogenContext;
}

/** @typedef {{ supabase: import('@supabase/supabase-js').SupabaseClient | null, supabaseAdmin: import('@supabase/supabase-js').SupabaseClient | null }} AdditionalContextType */
