import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Veuillez remplir l\'email et le mot de passe.');
      setLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Veuillez entrer un email valide');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const existingUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
      const fullName = existingUser?.fullName || email.split('@')[0];
      localStorage.setItem('user', JSON.stringify({ email, fullName }));
      window.location.href = '/';
    }, 450);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8 animate-in slide-in-from-top duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">TaskManager</h1>
          <p className="text-slate-600 dark:text-slate-400">Organisez votre succès</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 rounded-3xl shadow-xl p-8 animate-in fade-in duration-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Bienvenue !</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Connectez-vous à votre compte</p>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600" />
                <span className="ml-2 text-slate-600 dark:text-slate-400">Se souvenir</span>
              </label>
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span className="animate-pulse">Connexion...</span>
              ) : (
                <>
                  Se connecter
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500">ou</span>
            </div>
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-600 dark:text-slate-400">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 dark:text-slate-500 text-sm mt-8">
          © 2026 TaskManager. Tous droits réservés.
        </p>
      </div>
    </div>
  );
};
