import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { authService } from '../services/auth.service';

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isApiMode: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initializeUser = (): User | null => {
  try {
    if (typeof window === 'undefined') return null;
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
    return null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(initializeUser);
  const [isApiMode, setIsApiMode] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login({ email, password });
      localStorage.setItem('access_token', response.access_token);
      const userData: User = response.user;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsApiMode(true);
    } catch {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
      const foundUser = registeredUsers.find((u: { email: string; fullName: string; password?: string }) => u.email === email);
      if (foundUser) {
        const userData: User = {
          id: crypto.randomUUID?.() || Date.now().toString(),
          email: foundUser.email,
          username: foundUser.fullName || foundUser.email.split('@')[0],
          role: 'user',
        };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setIsApiMode(false);
      } else {
        throw new Error('Identifiants incorrects');
      }
    }
  }, []);

  const register = useCallback(async (email: string, username: string, password: string) => {
    try {
      const response = await authService.register({ email, username, password });
      localStorage.setItem('access_token', response.access_token);
      const userData: User = response.user;
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsApiMode(true);
    } catch {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
      if (registeredUsers.some((u: { email: string }) => u.email === email)) {
        throw new Error('Cet email est déjà enregistré');
      }
      registeredUsers.push({ email, fullName: username, password });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      const userData: User = {
        id: crypto.randomUUID?.() || Date.now().toString(),
        email,
        username,
        role: 'user',
      };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsApiMode(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isApiMode,
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
