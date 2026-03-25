import React, { createContext, useContext, ReactNode } from 'react';
import { Task, FilterOptions } from '../types';
import { useTasks } from '../hooks/useTasks';

interface TaskContextType {
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

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    tasks,
    filteredTasks,
    filters,
    addTask,
    updateTask,
    deleteTask,
    setFilters,
    resetFilters,
    getTaskById,
  } = useTasks();

  return (
    <TaskContext.Provider
      value={{
        tasks,
        filteredTasks,
        filters,
        addTask,
        updateTask,
        deleteTask,
        setFilters,
        resetFilters,
        getTaskById,
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