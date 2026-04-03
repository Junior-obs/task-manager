import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, BarChart3, Info, LogOut, User, Menu, X, SquareCheckBig } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/add', icon: PlusCircle, label: 'Ajouter' },
  { to: '/stats', icon: BarChart3, label: 'Statistiques' },
  { to: '/about', icon: Info, label: 'À propos' },
];

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fermer le menu mobile lors d'un changement de route
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Barre de navigation principale */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <div className="flex items-center gap-2">
                <SquareCheckBig className="h-10 w-10 text-indigo-600 dark:text-indigo-400 shadow-lg rounded-xl bg-white/50 p-1" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
              </div>
            </div>

            {/* Navigation desktop */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-md'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:shadow-sm'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Actions droite */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              {user?.fullName && (
                <div className="hidden md:flex items-center gap-2 bg-gray-100/80 dark:bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50">
                  <User size={14} className="text-indigo-600 dark:text-indigo-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {user.fullName.split(' ')[0]}
                  </span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all duration-200 text-sm font-medium"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu mobile (overlay latéral ou déroulant) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Overlay sombre */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        {/* Menu latéral */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-3/4 max-w-xs bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* En-tête du menu */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h2 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">TaskFlow</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation mobile */}
            <div className="flex-1 py-6 px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-semibold'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <item.icon size={22} />
                  <span className="text-base">{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* Footer du menu avec infos utilisateur */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
              {user?.fullName && (
                <div className="flex items-center gap-3 px-2 py-2 bg-gray-50 dark:bg-slate-800 rounded-xl">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full">
                    <User size={18} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Connecté en tant que</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">{user.fullName}</p>
                  </div>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-all"
              >
                <LogOut size={20} />
                <span className="font-medium">Se déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de navigation mobile en bas (optionnelle, mais gardée pour certains usages) */}
      {/* 
        Tu peux soit garder le menu burger ci-dessus, soit ajouter une barre inférieure.
        Pour une expérience "ultra professionnelle", le menu latéral est plus moderne.
        Je commente la barre inférieure pour éviter le doublon.
      */}
    </>
  );
};