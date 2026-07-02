import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { Category } from '../types';
import { priorityLabels, statusLabels, categoryLabels } from '../types';
import { ArrowLeft, Edit2, Trash2, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, deleteTask } = useTaskContext();

  const task = id ? getTaskById(id) : undefined;

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-slate-600 dark:text-slate-400 mb-4">Tâche introuvable</p>
          <button
            onClick={() => navigate('/')}
            className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const isCompleted = task.status === 'done';

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200';
      default: return 'text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-200';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'todo': return 'text-slate-600 bg-slate-50 dark:bg-slate-800 border-slate-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-200';
      case 'done': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold transition-all bg-white/40 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/30 hover:bg-white/60 hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Retour
        </button>

        {/* Task card */}
        <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl overflow-hidden transition-all duration-500">
          {/* Header */}
          <div className="p-8 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className={`text-3xl font-bold text-slate-900 dark:text-white ${isCompleted ? 'line-through opacity-60' : ''}`}>
                  {task.title}
                </h1>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => navigate(`/edit/${task.id}`)}
                  className="p-3 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-xl text-indigo-600 hover:text-indigo-700 transition-all active:scale-95"
                  title="Modifier"
                >
                  <Edit2 size={20} />
                </button>
                <button
                  onClick={() => {
                    if (window.confirm(`Supprimer la tâche "${task.title}" ?`)) {
                      deleteTask(task.id);
                      navigate('/');
                    }
                  }}
                  className="p-3 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 rounded-xl text-rose-600 hover:text-rose-700 transition-all active:scale-95"
                  title="Supprimer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {task.description || 'Aucune description'}
              </p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Statut */}
              <div className="p-5 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Statut
                </h3>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${getStatusColor()}`}>
                  {task.status === 'done' ? <CheckCircle size={16} /> : <Clock size={16} />}
                  {statusLabels[task.status]}
                </span>
              </div>

              {/* Priorité */}
              <div className="p-5 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Priorité
                </h3>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${getPriorityColor()}`}>
                  <AlertCircle size={16} />
                  {priorityLabels[task.priority]}
                </span>
              </div>

              {/* Catégorie */}
              <div className="p-5 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Catégorie
                </h3>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border text-purple-600 bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800">
                  {categoryLabels[task.category as Category] || task.category}
                </span>
              </div>

              {/* Date d'échéance */}
              <div className="p-5 bg-white/50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                  Date d'échéance
                </h3>
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
                  isOverdue
                    ? 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200'
                    : 'text-slate-600 bg-slate-50 dark:bg-slate-800 border-slate-200'
                }`}>
                  <Calendar size={16} />
                  {new Date(task.dueDate).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {isOverdue && <span className="text-xs font-bold">(En retard)</span>}
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-xs text-slate-400">
                <span>Créée le {new Date(task.createdAt).toLocaleDateString('fr-FR', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}</span>
                <span>Mise à jour le {new Date(task.updatedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
