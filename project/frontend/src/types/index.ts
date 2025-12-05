export interface Todo {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
  completed: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
  createdAt: string;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  dueDate: string;
  categoryId: string;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  dueDate?: string;
  categoryId?: string;
  completed?: boolean;
}

export interface CreateCategoryDto {
  name: string;
  color?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortBy = 'dueDate' | 'createdAt' | 'none';

