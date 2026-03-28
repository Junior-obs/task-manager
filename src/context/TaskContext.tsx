import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { TaskContextType } from './types';
import { useTasks } from '../hooks/useTasks';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
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