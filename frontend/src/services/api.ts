import { Todo, Category, CreateTodoDto, UpdateTodoDto, CreateCategoryDto } from '../types';

const API_BASE_URL = '/api';

// Todo API
export const todoApi = {
  getAll: async (status?: string, sortBy?: string): Promise<Todo[]> => {
    try {
      const params = new URLSearchParams();
      if (status) params.append('status', status);
      if (sortBy) params.append('sortBy', sortBy);
      
      const response = await fetch(`${API_BASE_URL}/todos?${params.toString()}`);
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to fetch todos' }));
        throw new Error(error.error || 'Failed to fetch todos');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to server');
    }
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos/${id}`);
    if (!response.ok) throw new Error('Failed to fetch todo');
    return response.json();
  },

  create: async (todo: CreateTodoDto): Promise<Todo> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to create todo' }));
        throw new Error(error.error || 'Failed to create todo');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to server');
    }
  },

  update: async (id: string, updates: UpdateTodoDto): Promise<Todo> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to update todo' }));
        throw new Error(error.error || 'Failed to update todo');
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to server');
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Failed to delete todo' }));
        throw new Error(error.error || 'Failed to delete todo');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error: Unable to connect to server');
    }
  },
};

// Category API
export const categoryApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  getById: async (id: string): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  create: async (category: CreateCategoryDto): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create category');
    }
    return response.json();
  },

  update: async (id: string, updates: Partial<Category>): Promise<Category> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update category');
    }
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
  },
};

