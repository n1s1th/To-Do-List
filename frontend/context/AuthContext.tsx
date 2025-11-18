// /context/AuthContext.tsx
'use client';

import { createContext, useContext } from 'react';

export type AuthContextType = {
  user: { id: string; email: string; displayName: string | null } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
};

// ✅ SINGLE context instance
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ✅ SINGLE hook — exports the context usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// ✅ Export context for Provider
export { AuthContext };