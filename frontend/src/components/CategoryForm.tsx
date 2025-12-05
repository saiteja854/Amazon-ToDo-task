import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createCategory, fetchCategories } from '../store/categorySlice';
import './CategoryForm.css';

const CategoryForm = () => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [color, setColor] = useState('#667eea');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Category name is required');
      return;
    }

    if (name.trim().length > 50) {
      setError('Category name must be 50 characters or less');
      return;
    }

    // Validate color format
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (!colorRegex.test(color)) {
      setError('Please enter a valid color code (e.g., #667eea)');
      return;
    }

    try {
      await dispatch(createCategory({ name: name.trim(), color })).unwrap();
      setName('');
      setColor('#667eea');
      dispatch(fetchCategories());
    } catch (err: any) {
      setError(err.message || 'Failed to create category');
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h3>Create Category</h3>
      {error && <div className="form-error">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="categoryName">Name *</label>
        <input
          type="text"
          id="categoryName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          maxLength={50}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="categoryColor">Color</label>
        <div className="color-input-group">
          <input
            type="color"
            id="categoryColor"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#667eea"
            pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
          />
        </div>
      </div>

      <button type="submit" className="btn-submit">Create Category</button>
    </form>
  );
};

export default CategoryForm;

