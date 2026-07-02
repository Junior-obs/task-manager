import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTaskContext } from '../context/TaskContext';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { SearchBar } from '../components/tasks/SearchBar';
import { FilterBar } from '../components/tasks/FilterBar';
import type { Category } from '../types';
import { ArrowRight, Calendar, ListTodo, Sparkles, Plus } from 'lucide-react';

const categoryLabels: Record<Category, string> = {
  personal: 'Personnel',
  work: 'Travail',
  shopping: 'Courses',
  health: 'Santé',
  other: 'Autre',
};

const categoryIcons: Record<Category, string> = {
  personal: '👤',
  work: '💼',
  shopping: '🛒',
  health: '🏥',
  other: '📌',
};

export const TasksPage: React.FC = () => {
  useProtectedRoute();
  const navigate = useNavigate();
  const { filteredTasks, filters, setFilters, resetFilters } = useTaskContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8 animate-in slide-in-from-top duration-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <ListTodo className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Mes tâches
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                Toutes les tâches
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                {filteredTasks.length} tâche{filteredTasks.length !== 1 ? 's' : ''} trouvée{filteredTasks.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              onClick={() => navigate('/add')}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Plus size={20} />
              <span>Nouvelle tâche</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <SearchBar value={filters.searchQuery} onChange={(value) => setFilters({ searchQuery: value })} />
          <FilterBar filters={filters} onFilterChange={setFilters} onReset={resetFilters} />
        </div>

        {/* Tasks List */}
        {filteredTasks.length > 0 ? (
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="group flex items-center justify-between p-5 bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer hover:-translate-y-0.5 border border-slate-100 dark:border-slate-700"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      task.status === 'done'
                        ? 'bg-emerald-500'
                        : task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                            ? 'bg-amber-500'
                            : 'bg-blue-500'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      className={`font-semibold text-slate-900 dark:text-white truncate ${
                        task.status === 'done' ? 'line-through opacity-50' : ''
                      }`}
                    >
                      {task.title}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-slate-500">
                        {categoryIcons[task.category as Category] || '📌'}{' '}
                        {categoryLabels[task.category as Category] || task.category}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                      </span>
                      {task.description && (
                        <span className="text-xs text-slate-400 truncate max-w-[200px] hidden sm:inline">
                          {task.description}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : task.priority === 'medium'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    }`}
                  >
                    {task.priority === 'high'
                      ? 'Haute'
                      : task.priority === 'medium'
                        ? 'Moyenne'
                        : 'Basse'}
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                      task.status === 'todo'
                        ? 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                        : task.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}
                  >
                    {task.status === 'todo'
                      ? 'À faire'
                      : task.status === 'in-progress'
                        ? 'En cours'
                        : 'Terminé'}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
              <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Aucune tâche trouvée</p>
            <p className="text-slate-400 dark:text-slate-500 mt-1">Essayez de modifier vos filtres ou créez une nouvelle tâche</p>
          </div>
        )}
      </div>
    </div>
  );
};
