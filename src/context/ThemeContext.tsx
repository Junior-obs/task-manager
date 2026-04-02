import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = 'task-manager-theme';

const getInitialTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = window.localStorage.getItem(THEME_KEY) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (e) {
    console.warn('localStorage access failed:', e);
  }
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      window.localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      console.warn('Theme update failed:', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};