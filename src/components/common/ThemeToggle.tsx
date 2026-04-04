import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-slate-200/50 dark:bg-slate-700/50 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all text-slate-700 dark:text-slate-200 hover:scale-105 active:scale-95"
      title={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
      aria-label={`Passer en mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      {theme === 'light' ? (
        <Moon size={20} className="stroke-slate-700" strokeWidth={2} />
      ) : (
        <Sun size={20} className="stroke-slate-200" strokeWidth={2} />
      )}
    </button>
  );
};

