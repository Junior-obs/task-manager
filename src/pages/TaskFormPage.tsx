import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import type { TaskFormData, Status, Priority, Category } from '../types';
import { priorityLabels, categoryLabels, statusLabels } from '../types';
import { ArrowLeft, Save, X, AlertCircle } from 'lucide-react';
// Native JS date validation - no external deps needed

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Le titre est requis';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Le titre doit faire au moins 3 caractères';
    }

    if (formData.dueDate) {
      const date = new Date(formData.dueDate);
      if (isNaN(date.getTime())) {
        newErrors.dueDate = 'Date invalide';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        await updateTask(id, {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          category: formData.category,
          dueDate: formData.dueDate,
        });
      } else {
        await addTask({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          priority: formData.priority,
          category: formData.category,
          dueDate: formData.dueDate,
        });
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

  return (
    <div className="bg-gradient-to-br from-slate-50 to-indigo-50 min-h-screen py-12 px-4 dark:from-slate-950 dark:to-indigo-900 dark:text-slate-100">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleCancel}
          className="mb-8 inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-semibold transition-all hover:bg-white/50 px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl p-8 hover:shadow-2xl transition-all animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-3">
              {isEditing ? 'Modifier la tâche' : 'Nouvelle tâche'}
            </h1>
            <p className="text-slate-600 font-medium">Remplissez les informations de votre tâche</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-slate-800 mb-2">
                Titre *
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className={`w-full px-4 py-3.5 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all font-medium ${
                  errors.title
                    ? 'border-red-300 focus:ring-red-500 bg-red-50 text-red-900'
                    : 'border-white/30 focus:ring-blue-400 focus:border-blue-400 bg-white/50 text-slate-800'
                }`}
                placeholder="Ex: Finaliser le rapport"
                aria-invalid={!!errors.title}
                aria-describedby={errors.title ? 'title-error' : undefined}
              />
              {errors.title && (
                <p id="title-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-slate-800 mb-2">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3.5 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-vertical transition-all bg-white/50 text-slate-800 placeholder-slate-500 font-medium"
                placeholder="Détails supplémentaires..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-semibold text-slate-800 mb-2">
                  Statut
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Status })}
                  className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 text-slate-800 font-semibold"
                >
                  {Object.entries(statusLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold text-slate-800 mb-2">
                  Priorité
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                  className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 text-slate-800 font-semibold"
                >
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-slate-800 mb-2">
                  Catégorie
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                  className="w-full px-4 py-3 border-2 border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/50 text-slate-800 font-semibold"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-800 mb-2">
                Date d'échéance (optionnel)
              </label>
              <input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all font-medium ${
                  errors.dueDate
                    ? 'border-red-300 focus:ring-red-500 bg-red-50 text-red-900'
                    : 'border-white/30 focus:ring-blue-400 focus:border-blue-400 bg-white/50 text-slate-800'
                }`}
                aria-invalid={!!errors.dueDate}
                aria-describedby={errors.dueDate ? 'dueDate-error' : undefined}
              />
              {errors.dueDate && (
                <p id="dueDate-error" className="mt-2 text-sm text-red-600 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dueDate}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all flex items-center justify-center gap-2 text-lg"
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
                className="flex-1 bg-white/70 backdrop-blur-lg border border-white/20 hover:bg-white text-slate-800 font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <X className="w-5 h-5" />
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

