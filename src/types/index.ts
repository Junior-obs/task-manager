export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'done';
export type Category = 'personal' | 'work' | 'shopping' | 'health' | 'other';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  category: Category;
  dueDate: string;
}

export interface FilterOptions {
  status: Status | 'all';
  priority: Priority | 'all';
  category: Category | 'all';
  searchQuery: string;
}

export interface StatData {
  total: number;
  byStatus: Record<Status, number>;
  byPriority: Record<Priority, number>;
  byCategory: Record<Category, number>;
  completionRate: number;
}

export const statusLabels: Record<Status, string> = {
  'todo': 'À faire',
  'in-progress': 'En cours',
  'done': 'Terminé'
};

export const priorityLabels: Record<Priority, string> = {
  'low': 'Basse',
  'medium': 'Moyenne',
  'high': 'Haute'
};

export const categoryLabels: Record<Category, string> = {
  'personal': 'Personnel',
  'work': 'Travail',
  'shopping': 'Courses',
  'health': 'Santé',
  'other': 'Autre'
};

export const priorityColors: Record<Priority, string> = {
  'low': 'bg-green-100 text-green-800',
  'medium': 'bg-yellow-100 text-yellow-800',
  'high': 'bg-red-100 text-red-800'
};

export const statusColors: Record<Status, string> = {
  'todo': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'done': 'bg-green-100 text-green-800'
};