// /components/providers/AuthProvider.tsx
'use client';

import { useState, useEffect } from 'react';
import { AuthContext, AuthContextType } from '@/context/AuthContext'; // ✅ same context
import { api } from '@/lib/api';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await api.auth.me();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const userData = await api.auth.login({ email, password });
    setUser(userData);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const userData = await api.auth.register({ email, password, displayName });
    setUser(userData);
  };

  const logout = async () => {
    await api.auth.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};