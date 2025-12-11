import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import client from '../api/client';

const AuthCtx = createContext({ user: null, setUser: () => {}, refreshUser: async () => {}, loading: true });

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authenticated user state across the app and utilities. */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await client.get('/auth/me');
      setUser(res.data || null);
      return res.data || null;
    } catch {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      await refreshUser();
      if (mounted) setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const value = useMemo(() => ({ user, setUser, loading, refreshUser }), [user, loading]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access the current authentication context. */
  return useContext(AuthCtx);
}
