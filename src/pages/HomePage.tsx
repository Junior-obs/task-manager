import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { TaskCard } from '../components/tasks/TaskCard';
import { FilterBar } from '../components/tasks/FilterBar';
import { SearchBar } from '../components/tasks/SearchBar';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { Plus, ListTodo } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { filteredTasks, filters, setFilters, resetFilters, updateTask, deleteTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState<any>(null);

  const handleEdit = (task: any) => {
    navigate(`/edit/${task.id}`);
  };

  const handleStatusChange = (id: string, status: any) => {
    updateTask(id, { status });
  };

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mes Tâches</h1>
          <p className="text-gray-600 mt-1">Gérez vos tâches efficacement</p>
        </div>
        <Button onClick={() => navigate('/add')} className="flex items-center gap-2">
          <Plus size={20} />
          Nouvelle tâche
        </Button>
      </div>
      
      <SearchBar value={filters.searchQuery} onChange={(query) => setFilters({ searchQuery: query })} />
      <FilterBar filters={filters} onFilterChange={setFilters} onReset={resetFilters} />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <ListTodo size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">Aucune tâche trouvée</h3>
          <p className="text-gray-500 mb-4">
            {filters.searchQuery || filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all'
              ? 'Essayez de modifier vos filtres'
              : 'Commencez par créer votre première tâche'}
          </p>
          {!filters.searchQuery && filters.status === 'all' && filters.priority === 'all' && filters.category === 'all' && (
            <Button onClick={() => navigate('/add')}>Créer une tâche</Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={deleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};