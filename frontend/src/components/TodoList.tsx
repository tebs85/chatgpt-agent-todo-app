import React from 'react';
import { Todo, UpdateTodoDto } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, data: UpdateTodoDto) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
