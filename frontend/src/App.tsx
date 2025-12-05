import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { fetchTodos } from './store/todoSlice';
import { fetchCategories } from './store/categorySlice';
import TodoList from './components/TodoList';
import CategoryList from './components/CategoryList';
import TodoForm from './components/TodoForm';
import CategoryForm from './components/CategoryForm';
import FilterBar from './components/FilterBar';
import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const { todos, loading, error } = useAppSelector((state) => state.todos);
  const { categories } = useAppSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchTodos());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Todo App</h1>
        <p>Manage your tasks across multiple categories</p>
      </header>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      <div className="app-content">
        <div className="sidebar">
          <CategoryForm />
          <CategoryList />
        </div>

        <div className="main-content">
          <FilterBar />
          <TodoForm />
          {loading ? (
            <div className="loading">Loading todos...</div>
          ) : (
            <TodoList todos={todos} categories={categories} />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

