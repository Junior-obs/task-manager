import React from 'react';
import { Github, Linkedin, Mail, Code2, CheckSquare, TrendingUp, Users, Sparkles, Award } from 'lucide-react';
import { useProtectedRoute } from '../hooks/useProtectedRoute';

export const AboutPage: React.FC = () => {
  useProtectedRoute();
  
  const teamMembers = [
    { name: 'Alioune Faye Diouf', role: 'Lead Tech', github: 'https://github.com', linkedin: 'https://linkedin.com' },
    { name: 'Lamine Badji', role: 'UI/UX Designer', github: 'https://github.com', linkedin: 'https://linkedin.com' },
    { name: 'Rassoul Tall', role: 'Développeur Frontend', github: 'https://github.com', linkedin: 'https://linkedin.com' },
    { name: 'Saliou', role: 'Développeuse Frontend', github: 'https://github.com', linkedin: 'https://linkedin.com' },
  ];
  
  const features = [
    { icon: CheckSquare, title: 'Gestion des tâches', description: 'Ajoutez, modifiez et supprimez vos tâches facilement', color: 'from-blue-500 to-blue-600' },
    { icon: TrendingUp, title: 'Statistiques avancées', description: 'Visualisez votre progression avec des graphiques détaillés', color: 'from-emerald-500 to-emerald-600' },
    { icon: Users, title: 'Travail collaboratif', description: 'Projet open-source avec Git et GitHub', color: 'from-purple-500 to-purple-600' },
    { icon: Award, title: 'Qualité professionnelle', description: 'Code typé, composants réutilisables, architecture modulaire', color: 'from-amber-500 to-amber-600' },
  ];
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header avec icône animée */}
          <div className="text-center mb-12 animate-fade-in-down">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-2xl mb-5 ring-4 ring-white/20">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
              TaskFlow
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mt-3 font-medium">
              Productivité sans limite
            </p>
          </div>
          
          {/* Section À propos */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8 mb-10 hover:shadow-indigo-500/10 transition-all duration-500 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-5 flex items-center gap-3">
              <div className="p-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl">
                <Code2 className="w-6 h-6 text-indigo-600" />
              </div>
              À propos du projet
            </h2>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              <p>
                TaskFlow est une application web moderne de gestion de tâches, développée dans le cadre de l'examen de fin de module React.
                Elle allie performance, ergonomie et design épuré pour vous aider à organiser votre quotidien.
              </p>
              <p>
                Ce projet utilise <strong className="font-semibold text-indigo-600">React 18</strong> avec <strong className="font-semibold text-indigo-600">TypeScript</strong> pour un typage robuste,
                <strong className="font-semibold text-indigo-600"> Tailwind CSS</strong> pour le style utilitaire, <strong className="font-semibold text-indigo-600">Recharts</strong> pour les graphiques,
                et <strong className="font-semibold text-indigo-600">Lucide React</strong> pour les icônes. Les données sont persistées localement dans le navigateur via localStorage.
              </p>
              <p className="pt-2 text-sm text-slate-500 dark:text-slate-400 border-t border-white/20 mt-4">
                Version 2.0 – Conçu avec ❤️ par une équipe passionnée
              </p>
            </div>
          </div>
          
          {/* Grille des fonctionnalités */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={`feature-${index}`} 
                className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-white/30 p-6 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-3 bg-gradient-to-br ${feature.color} rounded-xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          
          {/* Section Équipe */}
          <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-purple-500/10 transition-all duration-500 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
              <Users className="w-7 h-7 text-purple-500" />
              Notre équipe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div 
                  key={`member-${index}`} 
                  className="text-center p-5 bg-gradient-to-br from-white/50 to-indigo-50/30 dark:from-slate-800/50 dark:to-indigo-900/30 rounded-2xl border border-white/40 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-md hover:shadow-xl transition-all group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg ring-4 ring-white/40 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white text-3xl font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">{member.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 text-sm mb-4 font-medium">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/50 dark:bg-slate-800/50 p-2 rounded-full transition-all hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/50 dark:bg-slate-800/50 p-2 rounded-full transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@taskflow.com`} 
                      className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/50 dark:bg-slate-800/50 p-2 rounded-full transition-all hover:scale-110"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer de la page */}
          <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-10 opacity-70">
            © 2026 TaskFlow – Organisation intelligente
          </p>
        </div>
      </div>
    </div>
  );
};

// Composant d'arrière‑plan animé
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950" />
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-30 dark:opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradAbout" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradAbout)" fillOpacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  );
};