import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { TaskFormData, Status, Priority, Category } from '../types';
import { priorityLabels, categoryLabels, statusLabels } from '../types';
import { ArrowLeft, Save, X, AlertCircle, Calendar, Sparkles } from 'lucide-react';

interface FormData extends Omit<TaskFormData, 'dueDate'> {
  dueDate: string;
}

const initialFormData: FormData = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  category: 'personal',
  dueDate: '',
};

export const TaskFormPage = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { addTask, updateTask, getTaskById, resetFilters } = useTaskContext();
  
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ✅ useProtectedRoute() supprimé – inutile sur cette page

  const existingTask = id ? getTaskById(id) : undefined;

  useEffect(() => {
    if (existingTask) {
      setIsEditing(true);
      setFormData({
        title: existingTask.title,
        description: existingTask.description,
        status: existingTask.status,
        priority: existingTask.priority,
        category: existingTask.category,
        dueDate: existingTask.dueDate,
      });
    }
  }, [existingTask]);

  const validateField = (name: string, value: string): string => {
    if (name === 'title') {
      if (!value.trim()) return 'Le titre est requis';
      if (value.trim().length < 3) return 'Le titre doit faire au moins 3 caractères';
    }
    if (name === 'dueDate' && value) {
      const date = new Date(value);
      if (isNaN(date.getTime())) return 'Date invalide';
    }
    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const titleError = validateField('title', formData.title);
    if (titleError) newErrors.title = titleError;
    if (formData.dueDate) {
      const dueError = validateField('dueDate', formData.dueDate);
      if (dueError) newErrors.dueDate = dueError;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (field === 'title') {
      const error = validateField('title', formData.title);
      setErrors(prev => ({ ...prev, title: error }));
    }
    if (field === 'dueDate' && formData.dueDate) {
      const error = validateField('dueDate', formData.dueDate);
      setErrors(prev => ({ ...prev, dueDate: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, dueDate: true });
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const taskData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        priority: formData.priority,
        category: formData.category,
        dueDate: formData.dueDate || new Date().toISOString().split('T')[0],
      };
      if (isEditing && id) {
        await updateTask(id, taskData);
      } else {
        await addTask(taskData);
      }
      resetFilters();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  const getStatusBadge = (status: Status) => {
    const colors = {
      todo: 'bg-amber-100 text-amber-700 border-amber-200',
      'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
      done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return colors[status];
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={handleCancel}
            className="group mb-8 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-semibold transition-all bg-white/40 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/30 hover:bg-white/60 hover:shadow-md"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Retour
          </button>

          <div className="backdrop-blur-xl bg-white/40 dark:bg-slate-900/40 rounded-3xl border border-white/30 dark:border-slate-700/50 shadow-2xl p-8 transition-all duration-500 hover:shadow-indigo-500/10 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
                {isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
                {isEditing ? 'Ajustez les détails de votre tâche' : 'Remplissez les informations ci-dessous'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Titre */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Titre <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  onBlur={() => handleBlur('title')}
                  className={`w-full px-4 py-3.5 bg-white/60 dark:bg-slate-800/60 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all font-medium ${
                    touched.title && errors.title
                      ? 'border-red-400 focus:ring-red-400 bg-red-50/50'
                      : 'border-white/30 focus:ring-indigo-400 focus:border-indigo-400'
                  }`}
                  placeholder="Ex: Finaliser le rapport trimestriel"
                />
                {touched.title && errors.title && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3.5 bg-white/60 dark:bg-slate-800/60 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-vertical transition-all placeholder-slate-500 font-medium"
                  placeholder="Détails supplémentaires, notes, etc."
                />
              </div>

              {/* Statut, Priorité, Catégorie */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Statut
                  </label>
                  <select
                    id="status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-slate-800/60 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 font-semibold"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${getStatusBadge(formData.status)}`}>
                      {statusLabels[formData.status]}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Priorité
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-slate-800/60 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 font-semibold"
                  >
                    {Object.entries(priorityLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                    Catégorie
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                    className="w-full px-4 py-3 bg-white/60 dark:bg-slate-800/60 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 font-semibold"
                  >
                    {Object.entries(categoryLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date d'échéance */}
              <div>
                <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Date d'échéance
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    onBlur={() => handleBlur('dueDate')}
                    className={`w-full pl-12 pr-4 py-3.5 bg-white/60 dark:bg-slate-800/60 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                      touched.dueDate && errors.dueDate
                        ? 'border-red-400 focus:ring-red-400 bg-red-50/50'
                        : 'border-white/30 focus:ring-indigo-400 focus:border-indigo-400'
                    }`}
                  />
                </div>
                {touched.dueDate && errors.dueDate && (
                  <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.dueDate}
                  </p>
                )}
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Optionnelle. Laissez vide pour une date par défaut.</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sauvegarde...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {isEditing ? 'Mettre à jour' : 'Créer la tâche'}
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 bg-white/70 backdrop-blur-sm border border-white/30 hover:bg-white/90 text-slate-700 dark:text-slate-200 font-bold py-4 px-8 rounded-2xl shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant d'arrière-plan animé
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-slate-950 dark:via-indigo-950 dark:to-purple-950" />
      <svg className="absolute bottom-0 left-0 w-full h-2/3 opacity-30 dark:opacity-20" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradForm" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path fill="url(#waveGradForm)" fillOpacity="0.4" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
      </svg>
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-300/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-pink-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>
    </div>
  );
};