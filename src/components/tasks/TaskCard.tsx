import React, { useState } from 'react';
import type { Task } from '../../types';
import { priorityLabels, statusLabels, categoryLabels } from '../../types';
import { Edit2, Trash2, CheckCircle, AlertCircle, Clock, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getPriorityIcon = () => {
    switch (task.priority) {
      case 'high':
        return <AlertCircle size={16} className="text-red-600" />;
      case 'medium':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <CheckCircle size={16} className="text-emerald-600" />;
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  const isCompleted = task.status === 'done';

  const getPriorityBadgeColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-600 border border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-600 border border-amber-200';
      default:
        return 'bg-emerald-100 text-emerald-600 border border-emerald-200';
    }
  };

  return (
    <>
      <div className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg border border-white/20 dark:border-slate-700 shadow-xl rounded-3xl p-6 mb-4 flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 ease-out cursor-pointer group ${
        isCompleted ? 'opacity-60 grayscale' : ''
      }`}>
        {/* Header avec avatar et titre */}
          {/* Titre et description */}
        <div className="flex-1 min-w-0 mb-4">
          <h3 className={`text-lg font-semibold text-slate-800 tracking-tight truncate ${
            isCompleted ? 'line-through text-slate-500' : ''
          }`}>
            {task.title}
          </h3>
          <p className={`text-sm text-slate-600 mt-1 line-clamp-2 ${
            isCompleted ? 'text-slate-400' : ''
          }`}>
            {task.description}
          </p>
        </div>

        {/* Boutons d'action */}
        <div className="flex gap-2 flex-shrink-0">

          {/* Boutons d'action */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 text-blue-600 hover:text-blue-700 active:scale-95 hover:brightness-110"
              aria-label={`Modifier ${task.title}`}
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-rose-50 hover:bg-rose-100 rounded-xl transition-all duration-200 text-rose-600 hover:text-rose-700 active:scale-95 hover:brightness-110"
              aria-label={`Supprimer ${task.title}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Badges - Priorité, Statut, Catégorie */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Badge Priorité */}
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getPriorityBadgeColor()} flex items-center gap-1.5 backdrop-blur-sm`}>
            {getPriorityIcon()}
            <span>{priorityLabels[task.priority]}</span>
          </span>

          {/* Badge Statut */}
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
            task.status === 'todo' ? 'bg-slate-100 text-slate-700 border-slate-200' :
            task.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200' :
            'bg-emerald-100 text-emerald-700 border-emerald-200'
          }`}>
            {statusLabels[task.status]}
          </span>

          {/* Badge Catégorie */}
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 backdrop-blur-sm">
            {categoryLabels[task.category]}
          </span>
        </div>

        {/* Footer - Date d'échéance et sélecteur de statut */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm mt-auto pt-4 border-t border-white/20">
          <div className="flex items-center gap-2 text-slate-600 font-medium">
            <Clock size={16} className="flex-shrink-0" />
            <span className={`${
              isOverdue ? 'text-red-600 font-bold' : 'text-slate-600'
            }`}>
              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          {task.status !== 'done' && (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
              className="min-w-[150px] px-3 py-2 bg-white/50 border border-white/30 rounded-xl text-sm font-semibold text-slate-700 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all active:scale-95"
              aria-label={`Modifier le statut de ${task.title}`}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          )}
          {isCompleted && (
            <div className="flex items-center gap-2 text-emerald-600 font-semibold px-3 py-2 bg-emerald-50/50 rounded-xl">
              <Check size={16} className="flex-shrink-0" />
              Complétée
            </div>
          )}
        </div>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer la tâche"
      >
        <p className="mb-4 text-slate-700">Êtes-vous sûr de vouloir supprimer la tâche "{task.title}" ?</p>
        <div className="flex justify-end space-x-3">
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onDelete(task.id);
              setShowDeleteModal(false);
            }}
          >
            Supprimer
          </Button>
        </div>
      </Modal>
    </>
  );
};