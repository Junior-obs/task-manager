import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Task, TaskFormData, FilterOptions } from '../types';
import { tasksService } from '../services/tasks.service';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filters: FilterOptions;
  addTask: (task: TaskFormData) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  getTaskById: (id: string) => Task | undefined;
  isApiMode: boolean;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialFilters: FilterOptions = {
  status: 'all',
  priority: 'all',
  category: 'all',
  searchQuery: '',
};

function mapApiTaskToTask(apiTask: any): Task {
  return {
    id: apiTask.id,
    title: apiTask.title,
    description: apiTask.description || '',
    status: apiTask.status || 'todo',
    priority: apiTask.priority || 'medium',
    category: apiTask.category || 'other',
    dueDate: apiTask.dueDate || '',
    createdAt: apiTask.createdAt || new Date().toISOString(),
    updatedAt: apiTask.updatedAt || new Date().toISOString(),
  };
}

const sampleTasks: Task[] = [
  {
    id: '1', title: 'Créer le projet React', description: 'Initialiser le projet avec Vite et TypeScript',
    status: 'done', priority: 'high', category: 'work',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '2', title: 'Configurer Tailwind CSS', description: 'Installer et configurer Tailwind pour le projet',
    status: 'in-progress', priority: 'medium', category: 'work',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '3', title: 'Faire les courses', description: 'Acheter des fruits, légumes et produits laitiers',
    status: 'todo', priority: 'low', category: 'shopping',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '4', title: 'Appeler le client important', description: 'Discuter du nouveau projet et des délais',
    status: 'todo', priority: 'high', category: 'work',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: '5', title: 'Faire du sport', description: '30 minutes de jogging ou de gym',
    status: 'todo', priority: 'medium', category: 'health',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [localTasks, setLocalTasks] = useLocalStorage<Task[]>('tasks', sampleTasks);
  const [apiTasks, setApiTasks] = useState<Task[]>([]);
  const [isApiMode, setIsApiMode] = useState(false);
  const [filters, setFiltersState] = useState<FilterOptions>(initialFilters);

  const tasks = isApiMode ? apiTasks : localTasks;

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      tasksService.getAll()
        .then((data) => {
          setApiTasks(data.map(mapApiTaskToTask));
          setIsApiMode(true);
        })
        .catch(() => {
          setIsApiMode(false);
        });
    }
  }, []);

  const filteredTasks = (() => {
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
        task => task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  })();

  const addTask = useCallback(async (taskData: TaskFormData) => {
    if (isApiMode) {
      try {
        const created = await tasksService.create(taskData);
        setApiTasks(prev => [mapApiTaskToTask(created), ...prev]);
      } catch {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setLocalTasks(prev => [...prev, newTask]);
      }
    } else {
      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setLocalTasks(prev => [...prev, newTask]);
    }
  }, [isApiMode, setLocalTasks]);

  const updateTask = useCallback(async (id: string, updates: Partial<Task>) => {
    if (isApiMode) {
      try {
        const updated = await tasksService.update(id, updates);
        setApiTasks(prev => prev.map(t => t.id === id ? mapApiTaskToTask(updated) : t));
      } catch {
        setLocalTasks(prev =>
          prev.map(task =>
            task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
          )
        );
      }
    } else {
      setLocalTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...updates, updatedAt: new Date().toISOString() } : task
        )
      );
    }
  }, [isApiMode, setLocalTasks]);

  const deleteTask = useCallback(async (id: string) => {
    if (isApiMode) {
      try {
        await tasksService.delete(id);
        setApiTasks(prev => prev.filter(t => t.id !== id));
      } catch {
        setLocalTasks(prev => prev.filter(task => task.id !== id));
      }
    } else {
      setLocalTasks(prev => prev.filter(task => task.id !== id));
    }
  }, [isApiMode, setLocalTasks]);

  const getTaskById = useCallback((id: string) => {
    return tasks.find(task => task.id === id);
  }, [tasks]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFiltersState(initialFilters);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        addTask,
        updateTask,
        deleteTask,
        setFilters: updateFilters,
        resetFilters,
        getTaskById,
        isApiMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
