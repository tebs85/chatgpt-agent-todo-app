import React from 'react';
import { Todo, UpdateTodoDto } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, data: UpdateTodoDto) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
  const toggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-checkbox">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          id={`todo-${todo.id}`}
        />
      </div>
      <div className="todo-content">
        <label htmlFor={`todo-${todo.id}`} className="todo-title">
          {todo.title}
        </label>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="btn btn-danger btn-small"
        aria-label="Delete todo"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
