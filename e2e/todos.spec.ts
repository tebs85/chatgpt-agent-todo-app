import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display app title and subtitle', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Todo App');
    await expect(page.locator('.subtitle')).toHaveText('Organize your tasks efficiently');
  });

  test('should show empty state when no todos', async ({ page }) => {
    const emptyState = page.locator('.empty-state');
    await expect(emptyState).toBeVisible();
    await expect(emptyState).toContainText('No todos yet. Add one above to get started!');
  });

  test('should create a new todo', async ({ page }) => {
    // Fill in the form
    await page.fill('input[placeholder="What needs to be done?"]', 'Buy groceries');
    await page.fill('textarea[placeholder="Description (optional)"]', 'Milk, eggs, bread');

    // Submit the form
    await page.click('button:has-text("Add Todo")');

    // Verify the todo appears
    await expect(page.locator('.todo-item')).toBeVisible();
    await expect(page.locator('.todo-title')).toHaveText('Buy groceries');
    await expect(page.locator('.todo-description')).toHaveText('Milk, eggs, bread');
  });

  test('should create a todo without description', async ({ page }) => {
    await page.fill('input[placeholder="What needs to be done?"]', 'Simple task');
    await page.click('button:has-text("Add Todo")');

    await expect(page.locator('.todo-title')).toHaveText('Simple task');
    await expect(page.locator('.todo-description')).not.toBeVisible();
  });

  test('should not submit empty todo', async ({ page }) => {
    await page.click('button:has-text("Add Todo")');

    // Should still show empty state
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('should clear form after submission', async ({ page }) => {
    const titleInput = page.locator('input[placeholder="What needs to be done?"]');
    const descriptionInput = page.locator('textarea[placeholder="Description (optional)"]');

    await titleInput.fill('Test Todo');
    await descriptionInput.fill('Test Description');
    await page.click('button:has-text("Add Todo")');

    // Form should be cleared
    await expect(titleInput).toHaveValue('');
    await expect(descriptionInput).toHaveValue('');
  });

  test('should mark todo as completed', async ({ page }) => {
    // Create a todo
    await page.fill('input[placeholder="What needs to be done?"]', 'Complete me');
    await page.click('button:has-text("Add Todo")');

    // Get the checkbox and verify it's unchecked
    const checkbox = page.locator('input[type="checkbox"]');
    await expect(checkbox).not.toBeChecked();

    // Click the checkbox
    await checkbox.check();

    // Verify it's checked
    await expect(checkbox).toBeChecked();

    // Verify the completed class is applied
    await expect(page.locator('.todo-item')).toHaveClass(/completed/);
  });

  test('should unmark completed todo', async ({ page }) => {
    // Create and complete a todo
    await page.fill('input[placeholder="What needs to be done?"]', 'Complete me');
    await page.click('button:has-text("Add Todo")');

    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();

    // Uncheck it
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
    await expect(page.locator('.todo-item')).not.toHaveClass(/completed/);
  });

  test('should delete a todo', async ({ page }) => {
    // Create a todo
    await page.fill('input[placeholder="What needs to be done?"]', 'Delete me');
    await page.click('button:has-text("Add Todo")');

    // Verify todo exists
    await expect(page.locator('.todo-item')).toBeVisible();

    // Click delete button
    await page.click('button:has-text("Delete")');

    // Todo should be gone, empty state should appear
    await expect(page.locator('.todo-item')).not.toBeVisible();
    await expect(page.locator('.empty-state')).toBeVisible();
  });

  test('should show stats for multiple todos', async ({ page }) => {
    // Create multiple todos
    await page.fill('input[placeholder="What needs to be done?"]', 'Todo 1');
    await page.click('button:has-text("Add Todo")');

    await page.fill('input[placeholder="What needs to be done?"]', 'Todo 2');
    await page.click('button:has-text("Add Todo")');

    await page.fill('input[placeholder="What needs to be done?"]', 'Todo 3');
    await page.click('button:has-text("Add Todo")');

    // Check stats
    await expect(page.locator('.stats')).toContainText('0 of 3 completed');

    // Complete one todo
    await page.locator('input[type="checkbox"]').first().check();
    await expect(page.locator('.stats')).toContainText('1 of 3 completed');
  });

  test('should display todos in correct order (newest first)', async ({ page }) => {
    // Create todos
    await page.fill('input[placeholder="What needs to be done?"]', 'First todo');
    await page.click('button:has-text("Add Todo")');

    await page.fill('input[placeholder="What needs to be done?"]', 'Second todo');
    await page.click('button:has-text("Add Todo")');

    await page.fill('input[placeholder="What needs to be done?"]', 'Third todo');
    await page.click('button:has-text("Add Todo")');

    // Get all todo titles
    const titles = page.locator('.todo-title');

    // First one should be "Third todo" (newest)
    await expect(titles.first()).toHaveText('Third todo');

    // Last one should be "First todo" (oldest)
    await expect(titles.last()).toHaveText('First todo');
  });

  test('should persist todos after page reload', async ({ page }) => {
    // Create a todo
    await page.fill('input[placeholder="What needs to be done?"]', 'Persistent todo');
    await page.click('button:has-text("Add Todo")');

    // Verify it exists
    await expect(page.locator('.todo-title')).toHaveText('Persistent todo');

    // Reload the page
    await page.reload();

    // Todo should still be there
    await expect(page.locator('.todo-title')).toHaveText('Persistent todo');
  });

  test('should handle multiple operations in sequence', async ({ page }) => {
    // Create todos
    await page.fill('input[placeholder="What needs to be done?"]', 'Todo 1');
    await page.click('button:has-text("Add Todo")');

    await page.fill('input[placeholder="What needs to be done?"]', 'Todo 2');
    await page.click('button:has-text("Add Todo")');

    // Complete first todo
    await page.locator('input[type="checkbox"]').first().check();

    // Delete second todo
    await page.locator('button:has-text("Delete")').last().click();

    // Should have 1 todo, completed
    await expect(page.locator('.todo-item')).toHaveCount(1);
    await expect(page.locator('.stats')).toContainText('1 of 1 completed');
  });
});
