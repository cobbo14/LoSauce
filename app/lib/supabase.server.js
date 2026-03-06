import {createClient} from '@supabase/supabase-js';

/**
 * Creates a Supabase client with the service role key (for server-side operations).
 * Use this for webhooks, code generation, and redemption.
 * @param {Env} env
 */
export function createSupabaseAdmin(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required',
    );
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
}

/**
 * Creates a Supabase client with the anon key (for public/read-only queries).
 * @param {Env} env
 */
export function createSupabaseClient(env) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error(
      'SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required',
    );
  }
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);
}
