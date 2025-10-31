import { useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTodoAdded = () => {
    // Trigger refresh of todo list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <header>
        <h1>Todo App</h1>
        <p>Manage your tasks efficiently</p>
      </header>
      <main>
        <section className="todo-form-section">
          <h2>Add New Todo</h2>
          <TodoForm onTodoAdded={handleTodoAdded} />
        </section>
        <section className="todo-list-section">
          <TodoList key={refreshKey} />
        </section>
      </main>
    </div>
  );
}

export default App;
