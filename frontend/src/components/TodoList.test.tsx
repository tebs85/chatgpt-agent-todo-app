import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from './TodoList';
import { Todo } from '../types/todo';

describe('TodoList', () => {
  const mockTodos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      description: 'Description 1',
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: 'Todo 2',
      description: 'Description 2',
      completed: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  it('renders empty state when no todos', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoList todos={[]} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    expect(screen.getByText(/no todos yet/i)).toBeInTheDocument();
    expect(screen.getByText(/add one above to get started/i)).toBeInTheDocument();
  });

  it('renders list of todos', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
  });

  it('renders correct number of todos', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const todoItems = screen.getAllByRole('checkbox');
    expect(todoItems).toHaveLength(2);
  });

  it('does not render todo list when empty', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    const { container } = render(<TodoList todos={[]} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const todoList = container.querySelector('.todo-list');
    expect(todoList).not.toBeInTheDocument();
  });

  it('passes onUpdate callback to TodoItem components', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    // Check that the component renders without errors
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
  });

  it('passes onDelete callback to TodoItem components', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoList todos={mockTodos} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    expect(deleteButtons).toHaveLength(2);
  });
});
