import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Veuillez remplir l\'email et le mot de passe.');
      return;
    }
    if (!email.includes('@')) {
      setError('Veuillez entrer un email valide');
      return;
    }

    setLoading(true);
    try {
      // Récupérer la liste des utilisateurs enregistrés
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
      
      // Chercher l'utilisateur par email
      const foundUser = registeredUsers.find((u: { email: string; fullName: string }) => u.email === email);
      
      if (foundUser) {
        // Utilisateur trouvé - utiliser son fullName enregistré
        login(email, foundUser.fullName);
      } else {
        // Utilisateur non trouvé - utiliser prénom générique du début email seulement si valide
        const fullName = email.split('@')[0].replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() + email.split('@')[0].replace(/[^a-zA-Z]/g, '').slice(1) || 'Utilisateur';
        login(email, fullName);
      }
      
      // Délai pour voir le loader et éviter les conflits de rendu
      setTimeout(() => navigate('/', { replace: true }), 300);
    } catch (err) {
      console.error('Login error:', err);
      setError('Une erreur est survenue lors de la connexion');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-5 ring-4 ring-white/20">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            TaskFlow
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2 font-medium">
            Gérez vos projets avec excellence
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-500/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Bienvenue</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Connectez-vous à votre espace de travail</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-600 dark:text-red-400 text-sm text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="vous@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <input type="checkbox" className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                Se souvenir
              </label>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span className="animate-pulse">Connexion en cours...</span>
              ) : (
                <>
                  Se connecter <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/50 dark:border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-transparent text-slate-500 backdrop-blur-sm">Nouveau ici ?</span>
            </div>
          </div>

          <p className="text-center">
            <Link
              to="/register"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-3 transition-all"
            >
              Créer un compte <ArrowRight size={16} />
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-8 opacity-70">
          © 2026 TaskFlow – Productivité sans limite
        </p>
      </div>
    </div>
  );
};

// Composant d'arrière-plan
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950" />
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-30 dark:opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGrad)" fillOpacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  );
};