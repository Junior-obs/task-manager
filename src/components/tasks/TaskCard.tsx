import React, { useState } from 'react';
import type { Task } from '../../types';
import { priorityColors, statusColors, priorityLabels, statusLabels, categoryLabels } from '../../types';
import { Edit2, Trash2, CheckCircle, AlertCircle, Clock } from 'lucide-react';
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
        return <CheckCircle size={16} className="text-green-600" />;
    }
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">{task.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="p-2 bg-slate-100 hover:bg-blue-50 rounded-lg transition-colors text-slate-600 hover:text-blue-600"
              aria-label={`Modifier ${task.title}`}
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 bg-slate-100 hover:bg-rose-100 rounded-lg transition-colors text-rose-600 hover:text-rose-700"
              aria-label={`Supprimer ${task.title}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${priorityColors[task.priority]} bg-opacity-20 border border-slate-200`}> 
            <span className="flex items-center gap-1">
              {getPriorityIcon()}
              {priorityLabels[task.priority]}
            </span>
          </span>
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[task.status]} bg-opacity-20 border border-slate-200`}>
            {statusLabels[task.status]}
          </span>
          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            {categoryLabels[task.category]}
          </span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
          <div className="flex items-start sm:items-center gap-2 text-slate-500">
            <Clock size={14} />
            <span className="font-medium">Échéance :</span>
            <span className={isOverdue ? 'text-red-600 font-semibold' : 'text-slate-700'}>
              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          {task.status !== 'done' && (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
              className="min-w-[150px] px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label={`Modifier le statut de ${task.title}`}
            >
              <option value="todo">À faire</option>
              <option value="in-progress">En cours</option>
              <option value="done">Terminé</option>
            </select>
          )}
        </div>
      </div>
      
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Supprimer la tâche"
      >
        <p className="mb-4">Êtes-vous sûr de vouloir supprimer la tâche "{task.title}" ?</p>
        <div className="flex justify-end space-x-2">
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