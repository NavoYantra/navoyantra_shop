import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Instead of throwing a module-level error which crashes the whole app with a white screen,
// we just create the client (which might fail if keys are empty or invalid) inside a try-catch,
// or we export a proxy if we want to be really safe. 
// For now, if the key is obviously wrong (like missing or not a JWT), we can log a warning.

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('🚨 Missing Supabase environment variables. Please check your .env file.');
} else if (!supabaseAnonKey.startsWith('eyJ')) {
  console.error('🚨 The Supabase Anon Key looks invalid. It should start with "eyJ". Please check your .env file.');
}

// We still try to create it, but if it throws, we catch it so the app doesn't go white.
export const supabase = (() => {
  try {
    return createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder');
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e);
    return {} as any;
  }
})();
