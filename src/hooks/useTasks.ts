import { useState, useMemo } from 'react';
import type { Task, FilterOptions } from '../types';
import { useLocalStorage } from './useLocalStorage';

const initialFilters: FilterOptions = {
  status: 'all',
  priority: 'all',
  category: 'all',
  searchQuery: '',
};

const sampleTasks: Task[] = [
  {
    id: '1',
    title: 'Créer le projet React',
    description: 'Initialiser le projet avec Vite et TypeScript',
    status: 'done',
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Configurer Tailwind CSS',
    description: 'Installer et configurer Tailwind pour le projet',
    status: 'in-progress',
    priority: 'medium',
    category: 'work',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Faire les courses',
    description: 'Acheter des fruits, légumes et produits laitiers',
    status: 'todo',
    priority: 'low',
    category: 'shopping',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Appeler le client important',
    description: 'Discuter du nouveau projet et des délais',
    status: 'todo',
    priority: 'high',
    category: 'work',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Faire du sport',
    description: '30 minutes de jogging ou de gym',
    status: 'todo',
    priority: 'medium',
    category: 'health',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', sampleTasks);
const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  // Filtrer les tâches
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (filters.status !== 'all') {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        task =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [tasks, filters]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  return {
    tasks,
    filteredTasks,
    filters,
    addTask,
    updateTask,
    deleteTask,
    setFilters: updateFilters,
    resetFilters,
    getTaskById,
  };
};