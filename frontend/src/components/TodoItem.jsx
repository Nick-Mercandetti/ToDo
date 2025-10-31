import { useState } from 'react';
import { updateTodo, deleteTodo } from '../services/api';

function TodoItem({ todo, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await updateTodo(todo.id, { completed: !todo.completed });
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) {
      return;
    }

    setIsUpdating(true);
    try {
      await updateTodo(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });
      setIsEditing(false);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      alert('Failed to update todo. Please try again.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTodo(todo.id);
      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <form onSubmit={handleSaveEdit} className="edit-form">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="Title"
            required
            disabled={isUpdating}
            className="edit-title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="Description (optional)"
            rows="2"
            disabled={isUpdating}
            className="edit-description"
          />
          <div className="edit-actions">
            <button type="submit" disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={handleCancelEdit} disabled={isUpdating}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggleComplete}
            disabled={isUpdating}
          />
          <span className="todo-title">{todo.title}</span>
        </label>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <span className="todo-date">
          Created: {new Date(todo.created_at).toLocaleDateString()}
        </span>
      </div>
      <div className="todo-actions">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isUpdating || isDeleting}
          className="btn-edit"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isUpdating || isDeleting}
          className="btn-delete"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default TodoItem;

