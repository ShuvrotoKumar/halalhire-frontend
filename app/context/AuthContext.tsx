'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { setUser as reduxSetUser, logout as reduxLogout } from '@/redux/Slice/authSlice';

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
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const login = (role: 'user' | 'company') => {
    // Mock login - in production this would be handled by auth mutation results
    dispatch(reduxSetUser({
      user: {
        name: role === 'user' ? 'Yahya Khan' : t('halalTechSolutions', 'Halal Tech Solutions'),
        email: role === 'user' ? 'yahya@halalhire.com' : 'contact@halaltech.com',
        role,
        avatar: role === 'user' ? '/g1.png' : undefined,
      },
      token: 'mock-token-' + Date.now()
    }));
  };

  const logout = () => {
    dispatch(reduxLogout());
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
