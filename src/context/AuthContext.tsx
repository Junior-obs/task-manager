import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface User {
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, fullName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialiser l'état de l'utilisateur de manière synchrone
const initializeUser = (): User | null => {
  try {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Failed to initialize user from localStorage:', error);
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initializeUser);

  const login = (email: string, fullName: string) => {
    const userData = { email, fullName };
    setUser(userData);
    try {
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to save user to localStorage:', error);
      }
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Failed to remove user from localStorage:', error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
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
