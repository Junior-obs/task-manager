import React, { useState } from 'react';
import { Task, priorityColors, statusColors, priorityLabels, statusLabels, categoryLabels } from '../../types';
import { Edit2, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
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
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit2 size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 size={18} className="text-red-600" />
            </button>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{task.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
            <span className="flex items-center gap-1">
              {getPriorityIcon()}
              {priorityLabels[task.priority]}
            </span>
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
            {statusLabels[task.status]}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            {categoryLabels[task.category]}
          </span>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="text-gray-500">
            <span>Échéance: </span>
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              {new Date(task.dueDate).toLocaleDateString('fr-FR')}
            </span>
          </div>
          
          {task.status !== 'done' && (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
              className="px-2 py-1 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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