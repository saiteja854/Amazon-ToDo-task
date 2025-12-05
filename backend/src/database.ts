import { Todo, Category } from './types';

// In-memory database
class Database {
  private todos: Todo[] = [];
  private categories: Category[] = [];
  private todoIdCounter = 1;
  private categoryIdCounter = 1;

  // Todo methods
  getAllTodos(): Todo[] {
    return [...this.todos];
  }

  getTodoById(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  createTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'completed'>): Todo {
    const newTodo: Todo = {
      ...todo,
      id: this.todoIdCounter.toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    this.todoIdCounter++;
    this.todos.push(newTodo);
    return newTodo;
  }

  updateTodo(id: string, updates: Partial<Todo>): Todo | null {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return null;
    
    this.todos[index] = { ...this.todos[index], ...updates };
    return this.todos[index];
  }

  deleteTodo(id: string): boolean {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return false;
    
    this.todos.splice(index, 1);
    return true;
  }

  // Category methods
  getAllCategories(): Category[] {
    return [...this.categories];
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories.find(cat => cat.id === id);
  }

  createCategory(category: Omit<Category, 'id' | 'createdAt'>): Category {
    const newCategory: Category = {
      ...category,
      id: this.categoryIdCounter.toString(),
      createdAt: new Date().toISOString(),
    };
    this.categoryIdCounter++;
    this.categories.push(newCategory);
    return newCategory;
  }

  updateCategory(id: string, updates: Partial<Category>): Category | null {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) return null;
    
    this.categories[index] = { ...this.categories[index], ...updates };
    return this.categories[index];
  }

  deleteCategory(id: string): boolean {
    const index = this.categories.findIndex(cat => cat.id === id);
    if (index === -1) return false;
    
    // Also delete all todos in this category
    this.todos = this.todos.filter(todo => todo.categoryId !== id);
    this.categories.splice(index, 1);
    return true;
  }
}

export const db = new Database();

