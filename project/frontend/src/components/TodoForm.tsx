import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { createTodo, fetchTodos, fetchAllTodos } from '../store/todoSlice';
import { fetchCategories } from '../store/categorySlice';
import './TodoForm.css';

const TodoForm = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.categories);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    categoryId: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.dueDate || !formData.categoryId) {
      setError('All fields are required');
      return;
    }

    if (formData.title.trim().length > 100) {
      setError('Title must be 100 characters or less');
      return;
    }

    if (formData.description.trim().length > 500) {
      setError('Description must be 500 characters or less');
      return;
    }

    const selectedDate = new Date(formData.dueDate);
    if (isNaN(selectedDate.getTime())) {
      setError('Please select a valid due date');
      return;
    }

    try {
      await dispatch(createTodo({
        title: formData.title.trim(),
        description: formData.description.trim(),
        dueDate: new Date(formData.dueDate).toISOString(),
        categoryId: formData.categoryId,
      })).unwrap();
      
      setFormData({
        title: '',
        description: '',
        dueDate: '',
        categoryId: '',
      });
      // Refetch to ensure proper filtering/sorting and update counts
      await dispatch(fetchTodos());
      dispatch(fetchAllTodos());
    } catch (err: any) {
      setError(err.message || 'Failed to create todo');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <h3>Create New Todo</h3>
      {error && <div className="form-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter todo title"
          maxLength={100}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Enter todo description"
          rows={3}
          maxLength={500}
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input
            type="date"
            id="dueDate"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">Category *</label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button type="submit" className="btn-submit">Create Todo</button>
    </form>
  );
};

export default TodoForm;

