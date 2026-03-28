import React, { useState, useEffect, useCallback } from 'react';
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types';
import { Search, Filter, Trash2, Edit3, CheckCircle2, Clock, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StatusBadge = ({ status }: { status: Task['status'] }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'done' ? 'bg-green-100 text-green-800' : status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
    {status === 'todo' ? 'À faire' : status === 'in-progress' ? 'En cours' : 'Terminé'}
  </span>
);

const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priority === 'high' ? 'bg-red-100 text-red-800' : priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
    {priority.charAt(0).toUpperCase() + priority.slice(1)}
  </span>
);

const TaskCard = ({ task }: { task: Task }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const navigate = useNavigate();
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  const toggleStatus = () => {
    const newStatus = task.status === 'done' ? 'todo' : task.status === 'todo' ? 'in-progress' : 'done';
    updateTask(task.id, { status: newStatus as Task['status'] });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-6 border-l-4 border-blue-500 group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600">{task.title}</h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
          <button
            onClick={() => navigate(`/edit/${task.id}`)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Modifier ${task.title}`}
          >
            <Edit3 className="w-5 h-5" />
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label={`Supprimer ${task.title}`}
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}
      <div className="flex flex-wrap gap-2 items-center mb-4">
        <StatusBadge status={task.status} />
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            {isOverdue && <Clock className="w-4 h-4 text-red-500 ml-1" />}
          </div>
        )}
      </div>
      <button
        onClick={toggleStatus}
        className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all font-medium"
        aria-label={`Changer statut à ${task.status === 'done' ? 'todo' : task.status === 'todo' ? 'in-progress' : 'done'}`}
      >
        <CheckCircle2 className="w-5 h-5" />
        {task.status === 'done' ? 'Reprendre' : task.status === 'todo' ? 'Démarrer' : 'Terminer'}
      </button>
    </div>
  );
};

export const HomePage = () => {
  const { filteredTasks, setFilters, resetFilters } = useTaskContext();
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Debounce search
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilters({ searchQuery });
    }, 300);
    return () => clearTimeout(timeout);
  }, [searchQuery, setFilters]);

  const handleFilterChange = useCallback((key: 'status' | 'priority' | 'category', value: string) => {
    setFilters({ [key]: value });
  }, [setFilters]);

  const emptyFiltered = filteredTasks.length === 0 && searchQuery;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
          Mes Tâches
        </h1>
        <p className="text-xl text-gray-600">Gérez vos tâches efficacement</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher des tâches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="flex gap-2">
            <select
              value=""
              onChange={(e) => handleFilterChange('status', e.target.value)} 
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tous statuts</option>
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
            <select
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Toutes priorités</option>
              <option value="low">Basse</option>
              <option value="medium">Moyenne</option>
              <option value="high">Haute</option>
            </select>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <Filter className="w-5 h-5 inline mr-1" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emptyFiltered ? (
          <div className="col-span-full text-center py-20">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune tâche trouvée</h3>
            <p className="text-gray-500 mb-6">Essayez de modifier votre recherche</p>
            <button
              onClick={resetFilters}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-all"
            >
              Voir toutes les tâches
            </button>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
              <Plus className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune tâche</h3>
            <p className="text-gray-500 mb-8">Commencez par ajouter votre première tâche</p>
            <a href="/add" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all inline-flex items-center gap-2">
              + Ajouter une tâche
            </a>
          </div>
        ) : (
          filteredTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
};

