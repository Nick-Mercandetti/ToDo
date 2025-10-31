import { useState, useEffect } from 'react';
import { getTodos } from '../services/api';
import TodoItem from './TodoItem';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError('Failed to load todos. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleTodoUpdate = () => {
    fetchTodos();
  };

  const handleTodoDelete = () => {
    fetchTodos();
  };

  if (loading) {
    return <div className="todo-list loading">Loading todos...</div>;
  }

  if (error) {
    return (
      <div className="todo-list error">
        <p>{error}</p>
        <button onClick={fetchTodos}>Retry</button>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list empty">
        <p>No todos yet. Create your first todo above!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Your Todos ({todos.length})</h2>
      <div className="todos-container">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={handleTodoUpdate}
            onDelete={handleTodoDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodoList;

