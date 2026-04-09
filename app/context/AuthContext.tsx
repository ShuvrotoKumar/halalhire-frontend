'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useTranslation } from 'react-i18next'

interface User {
  name: string;
  email: string;
  role: 'user' | 'company';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'user' | 'company') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation()
  const [user, setUser] = useState<User | null>(null);

  const login = (role: 'user' | 'company') => {
    setUser({
      name: role === 'user' ? 'Yahya Khan' : t('halalTechSolutions', 'Halal Tech Solutions'),
      email: role === 'user' ? 'yahya@halalhire.com' : 'contact@halaltech.com',
      role,
      avatar: role === 'user' ? '/g1.png' : undefined,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
