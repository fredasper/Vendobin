import { useCallback, useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import { authService } from '@services/supabase/auth';

export const useAuth = () => {
  const { user, loading, initialized, setUser, setLoading, setInitialized, logout } = useAuthStore();

  useEffect(() => {
    if (initialized) {
      return;
    }

    let cancelled = false;

    const initAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await authService.getCurrentUser();
        if (!cancelled) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setInitialized(true);
          setLoading(false);
        }
      }
    };

    initAuth();

    return () => {
      cancelled = true;
    };
  }, [initialized, setInitialized, setLoading, setUser]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      const signedInUser = await authService.signIn(email, password);
      setUser(signedInUser);
      setInitialized(true);
    },
    [setInitialized, setUser],
  );

  const signUp = useCallback(
    async (email: string, password: string) => {
      const signedUpUser = await authService.signUp(email, password);
      setUser(signedUpUser);
      setInitialized(true);
    },
    [setInitialized, setUser],
  );

  const signOut = useCallback(async () => {
    await authService.signOut();
    logout();
    setInitialized(true);
  }, [logout, setInitialized]);

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};
