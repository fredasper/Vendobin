import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const jwtPattern = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    jwtPattern.test(supabaseAnonKey) &&
    import.meta.env.VITE_DEMO_MODE !== 'true',
);

export const supabase = createClient(
  supabaseUrl || 'http://localhost',
  isSupabaseConfigured ? supabaseAnonKey : 'demo-anon-key',
);
