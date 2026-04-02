import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Plus, BarChart3, Info, Sun, Moon, LogOut } from 'lucide-react';
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

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <nav className="bg-white/70 backdrop-blur-lg sticky top-0 z-50 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2 hover:text-blue-600 transition-colors">
              <span className="text-blue-600 text-3xl">✔</span>
              <span className="hidden sm:inline">TaskManager</span>
            </Link>
          </div>
          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg hover:shadow-xl'
                      : 'text-slate-700 hover:bg-white/50 hover:text-blue-600 hover:shadow-md'
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
              className="ml-4 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100/30 text-slate-700 hover:bg-slate-200/50 active:scale-95 transition-all hover:shadow-md"
              aria-label="Basculer le thème"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-all duration-200 hover:shadow-md"
              aria-label="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </button>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100/30 text-slate-700 hover:bg-slate-200/50 transition-all"
              aria-label="Basculer le thème"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100/30 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              aria-label="Basculer le menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/70 backdrop-blur-lg border-t border-white/20 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-white/50 hover:text-blue-600 hover:shadow-md'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 font-semibold hover:bg-red-100 dark:hover:bg-red-900/50 transition-all mt-2"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

