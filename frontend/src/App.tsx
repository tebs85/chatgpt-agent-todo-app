import React, { useState, useEffect } from 'react';
import { Todo, CreateTodoDto, UpdateTodoDto } from './types/todo';
import { todoApi } from './services/api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data: CreateTodoDto) => {
    try {
      const newTodo = await todoApi.create(data);
      setTodos([newTodo, ...todos]);
    } catch (err) {
      setError('Failed to create todo.');
      console.error('Error creating todo:', err);
    }
  };

  const handleUpdate = async (id: number, data: UpdateTodoDto) => {
    try {
      const updatedTodo = await todoApi.update(id, data);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    } catch (err) {
      setError('Failed to update todo.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await todoApi.delete(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo.');
      console.error('Error deleting todo:', err);
    }
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>Todo App</h1>
          <p className="subtitle">Organize your tasks efficiently</p>
        </header>

        {error && (
          <div className="alert alert-error">
            {error}
            <button onClick={() => setError(null)} className="alert-close">
              ×
            </button>
          </div>
        )}

        <TodoForm onSubmit={handleCreate} />

        {loading ? (
          <div className="loading">Loading todos...</div>
        ) : (
          <>
            {totalCount > 0 && (
              <div className="stats">
                <span>
                  {completedCount} of {totalCount} completed
                </span>
              </div>
            )}
            <TodoList
              todos={todos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
