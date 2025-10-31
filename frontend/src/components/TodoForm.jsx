import { useState } from 'react';
import { createTodo } from '../services/api';

function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await createTodo({
        title: title.trim(),
        description: description.trim() || null,
      });
      setTitle('');
      setDescription('');
      if (onTodoAdded) {
        onTodoAdded();
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      alert('Failed to create todo. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title"
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter todo description (optional)"
          rows="3"
          disabled={isSubmitting}
        />
      </div>
      <button type="submit" disabled={isSubmitting || !title.trim()}>
        {isSubmitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default TodoForm;

