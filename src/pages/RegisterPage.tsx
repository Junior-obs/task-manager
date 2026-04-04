import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '', color: '', width: '0%' };
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) strength++;
    
    const labels = ['', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    const colors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    const widths = ['0%', '25%', '50%', '75%', '100%'];
    
    return { strength, label: labels[strength], color: colors[strength], width: widths[strength] };
  };

  const passwordStrength = getPasswordStrength(password);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Veuillez entrer votre nom complet');
      return;
    }
    if (!validateEmail(email)) {
      setError('Veuillez entrer un email valide (ex: nom@domaine.com)');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }
    if (passwordStrength.strength < 2) {
      setError('Le mot de passe est trop faible. Utilisez majuscules, chiffres et caractères spéciaux.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!acceptTerms) {
      setError('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    setLoading(true);
    try {
      const registeredUsersJson = localStorage.getItem('registeredUsers');
      const registeredUsers = registeredUsersJson ? JSON.parse(registeredUsersJson) : [];
      
      const emailExists = registeredUsers.some((u: { email: string }) => u.email === email);
      if (emailExists) {
        setError('Cet email est déjà enregistré');
        setLoading(false);
        return;
      }
      
      registeredUsers.push({ fullName, email });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      login(email, fullName);
      setTimeout(() => navigate('/', { replace: true }), 300);
    } catch (err) {
      console.error('Registration error:', err);
      setError('Une erreur est survenue lors de l\'inscription');
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden py-8">
      <AnimatedBackground />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-2xl mb-5 ring-4 ring-white/20">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            TaskFlow
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-2 font-medium">
            Créez votre espace de productivité
          </p>
        </div>

        <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8 transition-all duration-500 hover:shadow-emerald-500/10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Inscription</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Rejoignez la communauté TaskFlow</p>
          </div>

          {error && (
            <div className="mb-5 p-3 bg-red-500/10 backdrop-blur-sm border border-red-400/30 rounded-xl text-red-600 dark:text-red-400 text-sm text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Nom complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"
                  placeholder="Alioune Faye"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"
                  placeholder="votre@email.com"
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
                  className="w-full pl-10 pr-10 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"
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
              {password && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${passwordStrength.color} transition-all duration-300`} style={{ width: passwordStrength.width }}></div>
                    </div>
                    <span className="text-xs font-medium text-slate-600 dark:text-slate-400">{passwordStrength.label}</span>
                  </div>
                  <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                    <li className="flex items-center gap-1">
                      {password.length >= 8 ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-slate-400" />}
                      <span>Au moins 8 caractères</span>
                    </li>
                    <li className="flex items-center gap-1">
                      {/[A-Z]/.test(password) && /[a-z]/.test(password) ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-slate-400" />}
                      <span>Majuscules et minuscules</span>
                    </li>
                    <li className="flex items-center gap-1">
                      {/[0-9]/.test(password) ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-slate-400" />}
                      <span>Au moins un chiffre</span>
                    </li>
                    <li className="flex items-center gap-1">
                      {/[!@#$%^&*(),.?":{}|<>]/.test(password) ? <CheckCircle size={12} className="text-emerald-500" /> : <XCircle size={12} className="text-slate-400" />}
                      <span>Caractère spécial</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Confirmer le mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 bg-white/60 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle size={14} />
                  Les mots de passe correspondent
                </div>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label className="text-sm text-slate-600 dark:text-slate-400">
                J'accepte les <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">conditions</a> et la{' '}
                <a href="#" className="text-emerald-600 dark:text-emerald-400 hover:underline">politique de confidentialité</a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-xl transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <span className="animate-pulse">Création en cours...</span>
              ) : (
                <>
                  S'inscrire <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/50 dark:border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-transparent text-slate-500 backdrop-blur-sm">Déjà inscrit ?</span>
            </div>
          </div>

          <p className="text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold hover:gap-3 transition-all">
              Se connecter <ArrowRight size={16} />
            </Link>
          </p>
        </div>

        <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-8 opacity-70">
          © 2026 TaskFlow – Organisation sans limite
        </p>
      </div>
    </div>
  );
};

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-slate-950 dark:via-emerald-950 dark:to-teal-950" />
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-30 dark:opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradReg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradReg)" fillOpacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-teal-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  );
};