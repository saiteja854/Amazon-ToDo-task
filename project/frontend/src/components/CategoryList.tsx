import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchCategories, deleteCategory, updateCategory } from '../store/categorySlice';
import { fetchTodos, fetchAllTodos } from '../store/todoSlice';
import { Category } from '../types';
import './CategoryList.css';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { categories, loading } = useAppSelector((state) => state.categories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ name: string; color: string }>({ name: '', color: '#667eea' });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure? This will also delete all todos in this category.')) {
      try {
        // Delete the category (backend will delete all todos in this category)
        await dispatch(deleteCategory(id)).unwrap();
        
        // Refetch categories first
        await dispatch(fetchCategories());
        
        // Then refetch todos to get updated list (todos in deleted category will be gone)
        await dispatch(fetchTodos());
        await dispatch(fetchAllTodos());
      } catch (error: any) {
        alert(error.message || 'Failed to delete category');
      }
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      color: category.color || '#667eea',
    });
  };

  const handleSave = async (id: string) => {
    if (!editForm.name.trim()) {
      alert('Category name is required');
      return;
    }

    try {
      await dispatch(updateCategory({
        id,
        updates: {
          name: editForm.name.trim(),
          color: editForm.color,
        },
      })).unwrap();
      setEditingId(null);
      dispatch(fetchCategories());
    } catch (error: any) {
      alert(error.message || 'Failed to update category');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ name: '', color: '#667eea' });
  };

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  if (categories.length === 0) {
    return (
      <div className="category-list">
        <h3>Categories</h3>
        <p className="empty-message">No categories yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="category-list">
      <h3>Categories</h3>
      <div className="categories-container">
        {categories.map(category => {
          const isEditing = editingId === category.id;

          if (isEditing) {
            return (
              <div
                key={category.id}
                className="category-item editing"
                style={{ borderLeftColor: editForm.color }}
              >
                <div className="category-edit-form">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="edit-category-input"
                    placeholder="Category name"
                    autoFocus
                  />
                  <div className="color-input-group">
                    <input
                      type="color"
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="edit-color-picker"
                    />
                    <input
                      type="text"
                      value={editForm.color}
                      onChange={(e) => setEditForm({ ...editForm, color: e.target.value })}
                      className="edit-color-input"
                      placeholder="#667eea"
                      pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                    />
                  </div>
                  <div className="category-edit-actions">
                    <button
                      onClick={() => handleSave(category.id)}
                      className="btn-save-category"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-cancel-category"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={category.id}
              className="category-item"
              style={{ borderLeftColor: category.color || '#667eea' }}
            >
              <div className="category-info">
                <span
                  className="category-color"
                  style={{ backgroundColor: category.color || '#667eea' }}
                />
                <span className="category-name">{category.name}</span>
              </div>
              <div className="category-actions">
                <button
                  onClick={() => handleEdit(category)}
                  className="btn-edit-category"
                  title="Edit category"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="btn-delete-category"
                  title="Delete category"
                >
                  ×
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;

