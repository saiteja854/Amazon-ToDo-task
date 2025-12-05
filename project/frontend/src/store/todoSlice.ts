import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo, CreateTodoDto, UpdateTodoDto, FilterStatus, SortBy } from '../types';
import { todoApi } from '../services/api';
import { RootState } from './store';

interface TodoState {
  todos: Todo[];
  allTodos: Todo[]; // Store all todos for count calculations
  loading: boolean;
  error: string | null;
  filter: FilterStatus;
  sortBy: SortBy;
}

const initialState: TodoState = {
  todos: [],
  allTodos: [],
  loading: false,
  error: null,
  filter: 'all',
  sortBy: 'none',
};

// Async thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { filter, sortBy } = state.todos;
    const status = filter === 'all' ? undefined : filter;
    const sort = sortBy === 'none' ? undefined : sortBy;
    return todoApi.getAll(status, sort);
  }
);

// Fetch all todos for count calculations
export const fetchAllTodos = createAsyncThunk(
  'todos/fetchAllTodos',
  async () => {
    return todoApi.getAll();
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: CreateTodoDto) => {
    return todoApi.create(todo);
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, updates }: { id: string; updates: UpdateTodoDto }) => {
    return todoApi.update(id, updates);
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await todoApi.delete(id);
    return id;
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterStatus>) => {
      state.filter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortBy>) => {
      state.sortBy = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Fetch all todos for counts
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.allTodos = action.payload;
      })
      // Create todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
        state.allTodos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create todo';
      })
      // Update todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
        // Update in allTodos as well
        const allIndex = state.allTodos.findIndex(t => t.id === action.payload.id);
        if (allIndex !== -1) {
          state.allTodos[allIndex] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update todo';
      })
      // Delete todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(t => t.id !== action.payload);
        state.allTodos = state.allTodos.filter(t => t.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete todo';
      });
  },
});

export const { setFilter, setSortBy, clearError } = todoSlice.actions;
export default todoSlice.reducer;

