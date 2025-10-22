import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

describe('TodoItem', () => {
  const mockTodo: Todo = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  it('renders todo title and description', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders without description when not provided', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const todoWithoutDescription = { ...mockTodo, description: undefined };

    render(<TodoItem todo={todoWithoutDescription} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });

  it('renders checkbox as unchecked for incomplete todo', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('renders checkbox as checked for completed todo', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const completedTodo = { ...mockTodo, completed: true };

    render(<TodoItem todo={completedTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onUpdate when checkbox is clicked', async () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const user = userEvent.setup();

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(1, { completed: true });
  });

  it('calls onDelete when delete button is clicked', async () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const user = userEvent.setup();

    render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete todo/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('applies completed class when todo is completed', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();
    const completedTodo = { ...mockTodo, completed: true };

    const { container } = render(<TodoItem todo={completedTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('does not apply completed class when todo is not completed', () => {
    const mockOnUpdate = vi.fn();
    const mockOnDelete = vi.fn();

    const { container } = render(<TodoItem todo={mockTodo} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />);

    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).not.toHaveClass('completed');
  });
});
