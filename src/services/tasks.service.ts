import api from './api';

export interface TaskData {
  id?: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  category?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TaskStats {
  total: number;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
  byCategory: Record<string, number>;
  completionRate: number;
}

export const tasksService = {
  async getAll(): Promise<TaskData[]> {
    const response = await api.get<PaginatedResponse<TaskData>>('/tasks');
    return response.data.data;
  },

  async getById(id: string): Promise<TaskData> {
    const response = await api.get<TaskData>(`/tasks/${id}`);
    return response.data;
  },

  async create(data: Omit<TaskData, 'id' | 'createdAt' | 'updatedAt'>): Promise<TaskData> {
    const response = await api.post<TaskData>('/tasks', data);
    return response.data;
  },

  async update(id: string, data: Partial<TaskData>): Promise<TaskData> {
    const response = await api.patch<TaskData>(`/tasks/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getStats(): Promise<TaskStats> {
    const response = await api.get<TaskStats>('/tasks/stats');
    return response.data;
  },
};
