import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

const isHttpUrl = (value?: string) => {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    isHttpUrl(supabaseUrl) &&
    supabaseAnonKey &&
    jwtPattern.test(supabaseAnonKey) &&
    import.meta.env.VITE_DEMO_MODE !== 'true',
);

export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'http://localhost',
  isSupabaseConfigured ? supabaseAnonKey : 'demo-anon-key',
);
