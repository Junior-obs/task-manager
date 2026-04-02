import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { LayoutDashboard, CheckCircle, Clock, List } from 'lucide-react';
import type { Task } from '../types';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, className }) => (
  <div className={`rounded-2xl p-5 bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg hover:scale-102 transition-all ${className}`}>
    <div className="flex items-center justify-between mb-2">
      <p className="text-sm font-semibold text-slate-700">{title}</p>
      <div className="text-2xl text-slate-600">{icon}</div>
    </div>
    <p className="text-3xl font-extrabold text-slate-900">{value}</p>
  </div>
);

const getPriorityClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700';
    case 'medium':
      return 'bg-orange-100 text-orange-700';
    default:
      return 'bg-emerald-100 text-emerald-700';
  }
};

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks } = useTaskContext();

  const total = tasks.length;
  const inProgress = tasks.filter((task) => task.status === 'in-progress').length;
  const done = tasks.filter((task) => task.status === 'done').length;
  const latestTasks = [...tasks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800">Dashboard</h1>
          <p className="text-indigo-600 mt-1">Contrôle central de vos tâches</p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:scale-102 hover:bg-indigo-700 transition-all"
        >
          + Nouvelle Tâche
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <SummaryCard title="Total Tâches" value={total} icon={<LayoutDashboard className="w-6 h-6" />} className="" />
        <SummaryCard title="En cours" value={inProgress} icon={<Clock className="w-6 h-6" />} className="" />
        <SummaryCard title="Terminées" value={done} icon={<CheckCircle className="w-6 h-6" />} className="" />
      </div>

      <div className="bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg rounded-3xl p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-slate-800">Dernières tâches</h2>
          <List className="w-5 h-5 text-indigo-600" />
        </div>

        {latestTasks.length === 0 ? (
          <p className="text-slate-500">Aucune tâche enregistrée pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
            {latestTasks.map((task) => (
              <div key={task.id} className="p-4 bg-white/80 rounded-2xl border border-white/20 hover:shadow-md transition-all">
                <div className="flex justify-between items-start gap-3 mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{task.title}</h3>
                    <p className="text-sm text-slate-500">{task.description}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getPriorityClass(task.priority)}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-1">{task.status}</span>
                  <span className="text-slate-400">{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};