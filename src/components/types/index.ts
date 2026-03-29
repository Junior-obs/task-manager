// 1. Définition des types de base (pour la précision)
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed' | 'done';
export type Category = 'work' | 'personal' | 'shopping' | 'others';

// 2. L'interface principale (utilisée par TaskCard)
export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  category: string;
  dueDate: string;
}

// 3. Le type pour le formulaire (utilisé par TaskForm)
export interface TaskFormData extends Omit<Task, 'id'> {}

// 4. Les dictionnaires de labels (utilisés par les deux)
export const priorityLabels: Record<Priority, string> = {
  high: 'Haute',
  medium: 'Moyenne',
  low: 'Basse'
};

export const statusLabels: Record<Status, string> = {
  todo: 'À faire',
  'in-progress': 'En cours',
  completed: 'Terminé',
  done: 'Fait'
};

export const categoryLabels: Record<string, string> = {
  work: 'Travail',
  personal: 'Personnel',
  shopping: 'Courses',
  others: 'Autres'
};

// 5. Les couleurs (utilisées par TaskCard)
export const priorityColors = { 
  high: 'text-red-600 bg-red-100', 
  medium: 'text-yellow-600 bg-yellow-100', 
  low: 'text-green-600 bg-green-100' 
};

export const statusColors = { 
  todo: 'bg-gray-100 text-gray-800', 
  'in-progress': 'bg-blue-100 text-blue-800', 
  completed: 'bg-green-100 text-green-800', 
  done: 'bg-purple-100 text-purple-800' 
};
export interface FilterOptions {
  status: string;
  priority: string;
  category: string;
}