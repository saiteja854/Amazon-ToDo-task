import { useState } from 'react';
import { Todo, Category } from '../types';
import { useAppDispatch } from '../store/hooks';
import { updateTodo, deleteTodo, fetchTodos, fetchAllTodos } from '../store/todoSlice';
import { formatDate } from '../utils/dateFormatter';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  category: Category | undefined;
}

const TodoItem = ({ todo, category }: TodoItemProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: todo.title,
    description: todo.description,
    dueDate: todo.dueDate.split('T')[0],
  });

  const handleToggleComplete = async () => {
    await dispatch(updateTodo({ id: todo.id, updates: { completed: !todo.completed } }));
    // Refetch both filtered todos and all todos for counts
    dispatch(fetchTodos());
    dispatch(fetchAllTodos());
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await dispatch(deleteTodo(todo.id));
      dispatch(fetchTodos());
      dispatch(fetchAllTodos());
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await dispatch(updateTodo({
      id: todo.id,
      updates: {
        title: editForm.title,
        description: editForm.description,
        dueDate: new Date(editForm.dueDate).toISOString(),
      },
    }));
    setIsEditing(false);
    dispatch(fetchTodos());
    dispatch(fetchAllTodos());
  };

  const handleCancel = () => {
    setEditForm({
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate.split('T')[0],
    });
    setIsEditing(false);
  };

  // Parse due date - ensure it's a valid Date object
  const dueDate = todo.dueDate ? new Date(todo.dueDate) : new Date();
  const isOverdue = !todo.completed && !isNaN(dueDate.getTime()) && dueDate < new Date();

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editForm.title}
          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
          className="edit-input"
          placeholder="Title"
          maxLength={100}
        />
        <textarea
          value={editForm.description}
          onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
          className="edit-textarea"
          placeholder="Description"
          rows={3}
          maxLength={500}
        />
        <input
          type="date"
          value={editForm.dueDate}
          onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
          className="edit-input"
        />
        <div className="todo-actions">
          <button onClick={handleSave} className="btn btn-primary">Save</button>
          <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}>
      <div className="todo-content">
        <div className="todo-header">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            className="todo-checkbox"
          />
          <h4 className="todo-title">{todo.title}</h4>
          {category && (
            <span
              className="category-badge"
              style={{ backgroundColor: category.color || '#667eea' }}
            >
              {category.name}
            </span>
          )}
        </div>
        <p className="todo-description">{todo.description}</p>
        <div className="todo-meta">
          <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
            📅 Due: {formatDate(dueDate)}
          </span>
          {isOverdue && <span className="overdue-badge">Overdue</span>}
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={handleEdit} className="btn btn-edit">Edit</button>
        <button onClick={handleDelete} className="btn btn-delete">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;

