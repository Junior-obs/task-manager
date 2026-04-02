import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Plus, BarChart3, Info, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

const navItems = [
  { path: '/', label: 'Accueil', icon: Home },
  { path: '/add', label: 'Ajouter', icon: Plus },
  { path: '/stats', label: 'Stats', icon: BarChart3 },
  { path: '/about', label: 'À propos', icon: Info },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white/90 backdrop-blur sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
              <span className="text-blue-600">✔</span> TaskManager
            </Link>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-sm dark:text-slate-200 dark:hover:text-blue-300 dark:hover:bg-slate-800'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 p-3 rounded-lg font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-blue-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              Mode {theme === 'dark' ? 'clair' : 'sombre'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

