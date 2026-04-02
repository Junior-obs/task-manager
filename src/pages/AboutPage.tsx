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
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <Code2 size={48} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskFlow</h1>
          <p className="text-gray-600">Application de gestion de tâches moderne et efficace</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">À propos du projet</h2>
          <p className="text-gray-600 mb-4">
            TaskFlow est une application web développée dans le cadre de l'examen de fin de module React.
            Elle permet de gérer efficacement vos tâches quotidiennes avec une interface moderne et intuitive.
          </p>
          <p className="text-gray-600">
            Ce projet utilise React avec TypeScript, Tailwind CSS pour le styling, et Recharts pour les graphiques.
            Les données sont persistées localement dans le navigateur.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <feature.icon size={32} className="mx-auto text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Notre équipe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800">{member.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{member.role}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.github} className="text-gray-500 hover:text-gray-700" aria-label="GitHub">
                    <Link2 size={18} />
                  </a>
                  <a href={member.linkedin} className="text-gray-500 hover:text-gray-700" aria-label="LinkedIn">
                    <Link2 size={18} />
                  </a>
                  <a href={`mailto:${member.name.toLowerCase()}@example.com`} className="text-gray-500 hover:text-gray-700" aria-label="Email">
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