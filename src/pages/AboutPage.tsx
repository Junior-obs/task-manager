import React from 'react';
import { Link2, Mail, Code2, CheckSquare, TrendingUp, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const teamMembers = [
    { name: 'Membre 1', role: 'Lead Tech', github: '#', linkedin: '#' },
    { name: 'Membre 2', role: 'UI/UX Designer', github: '#', linkedin: '#' },
    { name: 'Membre 3', role: 'Développeur Frontend', github: '#', linkedin: '#' },
    { name: 'Membre 4', role: 'Développeur Fullstack', github: '#', linkedin: '#' },
  ];
  
  const features = [
    { icon: CheckSquare, title: 'Gestion des tâches', description: 'Ajoutez, modifiez et supprimez vos tâches facilement' },
    { icon: TrendingUp, title: 'Statistiques', description: 'Visualisez votre progression avec des graphiques détaillés' },
    { icon: Users, title: 'Travail d\'équipe', description: 'Projet collaboratif avec Git et GitHub' },
  ];
  
  return (
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen p-8 dark:from-slate-950 dark:to-indigo-900 dark:text-slate-100">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block p-3 bg-blue-100 rounded-2xl mb-4">
            <Code2 size={48} className="text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">TaskFlow</h1>
          <p className="text-lg text-slate-600">Application de gestion de tâches moderne et efficace</p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8 mb-8 hover:shadow-2xl transition-all animate-fade-in">
          <h2 className="text-3xl font-semibold text-slate-800 mb-5">À propos du projet</h2>
          <p className="text-slate-700 mb-5 leading-relaxed text-lg">
            TaskFlow est une application web développée dans le cadre de l'examen de fin de module React.
            Elle permet de gérer efficacement vos tâches quotidiennes avec une interface moderne et intuitive.
          </p>
          <p className="text-slate-700 leading-relaxed text-lg">
            Ce projet utilise React avec TypeScript, Tailwind CSS pour le styling, et Recharts pour les graphiques.
            Les données sont persistées localement dans le navigateur.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 animate-fade-in">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 p-7 text-center shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-block p-3 bg-blue-100 rounded-xl mb-4">
                <feature.icon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2 text-lg">{feature.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 p-8 shadow-xl hover:shadow-2xl transition-all animate-fade-in">
          <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Notre équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center p-5 bg-gradient-to-br from-slate-50 to-indigo-50 rounded-2xl border border-white/30 hover:border-blue-200 hover:shadow-lg transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg border-2 border-white/30">
                  <span className="text-white text-3xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-slate-800 text-lg">{member.name}</h3>
                <p className="text-slate-600 text-sm mb-4 font-medium">{member.role}</p>
                <div className="flex justify-center gap-3">
                  <a href={member.github} className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all" aria-label="GitHub">
                    <Link2 size={18} />
                  </a>
                  <a href={member.linkedin} className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all" aria-label="LinkedIn">
                    <Link2 size={18} />
                  </a>
                  <a href={`mailto:${member.name.toLowerCase()}@example.com`} className="text-slate-600 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-all" aria-label="Email">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};