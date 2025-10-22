import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from './TodoForm';

describe('TodoForm', () => {
  it('renders form fields', () => {
    const mockOnSubmit = vi.fn();
    render(<TodoForm onSubmit={mockOnSubmit} />);

    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description (optional)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add todo/i })).toBeInTheDocument();
  });

  it('calls onSubmit with form data when submitted', async () => {
    const mockOnSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByPlaceholderText('What needs to be done?');
    const descriptionInput = screen.getByPlaceholderText('Description (optional)');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(titleInput, 'Test Todo');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: 'Test Description',
      completed: false,
    });
  });

  it('clears form after submission', async () => {
    const mockOnSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByPlaceholderText('What needs to be done?') as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText('Description (optional)') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(titleInput, 'Test Todo');
    await user.type(descriptionInput, 'Test Description');
    await user.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('does not submit when title is empty', async () => {
    const mockOnSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', { name: /add todo/i });
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('submits with undefined description when not provided', async () => {
    const mockOnSubmit = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByPlaceholderText('What needs to be done?');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    await user.type(titleInput, 'Test Todo');
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: undefined,
      completed: false,
    });
  });
});
