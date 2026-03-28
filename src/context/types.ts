import type { Task, FilterOptions } from '../types';

export interface TaskContextType {
  tasks: Task[];
  filteredTasks: Task[];
  filters: FilterOptions;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
  getTaskById: (id: string) => Task | undefined;
}

