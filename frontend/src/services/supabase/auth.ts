import { isSupabaseConfigured, supabase } from './client';
import type { User } from '@/types';

const demoUserKey = 'demo_user';
const authTokenKey = 'auth_token';

const createDemoUser = (email: string): User => ({
  id: 'demo-user',
  email,
  role: 'admin',
  created_at: new Date().toISOString(),
});

export const authService = {
  async signUp(email: string, password: string): Promise<User> {
    if (!isSupabaseConfigured) {
      const user = createDemoUser(email);
      localStorage.setItem(demoUserKey, JSON.stringify(user));
      localStorage.setItem(authTokenKey, 'demo-token');
      return user;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) throw new Error('Sign up failed');

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    return profile as User;
  },

  async signIn(email: string, password: string): Promise<User> {
    if (!isSupabaseConfigured) {
      const user = createDemoUser(email);
      localStorage.setItem(demoUserKey, JSON.stringify(user));
      localStorage.setItem(authTokenKey, 'demo-token');
      return user;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    if (!data.user) throw new Error('Sign in failed');

    // Get user profile with role
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) throw profileError;

    if (data.session?.access_token) {
      localStorage.setItem(authTokenKey, data.session.access_token);
    }

    return profile as User;
  },

  async signOut(): Promise<void> {
    localStorage.removeItem(demoUserKey);
    localStorage.removeItem(authTokenKey);

    if (!isSupabaseConfigured) {
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser(): Promise<User | null> {
    if (!isSupabaseConfigured) {
      const storedUser = localStorage.getItem(demoUserKey);
      if (storedUser) {
        return JSON.parse(storedUser) as User;
      }

      const user = createDemoUser('demo@vendobin.local');
      localStorage.setItem(demoUserKey, JSON.stringify(user));
      localStorage.setItem(authTokenKey, 'demo-token');
      return user;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) return null;

    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    return profile as User;
  },

  async resetPassword(email: string): Promise<void> {
    if (!isSupabaseConfigured) {
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },
};
