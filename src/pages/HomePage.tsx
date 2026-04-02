import React from 'react';
import type { Task } from '../types';
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

  const handleEdit = (task: Task) => {
    navigate(`/edit/${task.id}`);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
  };

  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter((task) => task.status === 'done').length;
  const overdueTasks = filteredTasks.filter((task) => new Date(task.dueDate) < new Date() && task.status !== 'done').length;

  return (
    <div className="container mx-auto px-4 py-8 pb-20 md:pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Tableau de bord des tâches</h1>
          <p className="text-slate-500 mt-2">Un aperçu clair de vos priorités et de votre progression.</p>
        </div>
        <Button onClick={() => navigate('/add')} className="flex items-center gap-2" size="lg">
          <Plus size={20} />
          Nouvelle tâche
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all">
          <p className="text-xs uppercase tracking-widest text-slate-500">Total tâches</p>
          <p className="text-3xl font-bold text-slate-800">{totalTasks}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all">
          <p className="text-xs uppercase tracking-widest text-slate-500">Terminées</p>
          <p className="text-3xl font-bold text-emerald-600">{completedTasks}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all">
          <p className="text-xs uppercase tracking-widest text-slate-500">En retard</p>
          <p className="text-3xl font-bold text-rose-600">{overdueTasks}</p>
        </div>
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