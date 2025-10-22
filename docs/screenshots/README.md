# Screenshots Directory

This directory contains screenshots demonstrating the Todo App's features and functionality.

## Required Screenshots

Place screenshots in this directory with the following filenames:

### Frontend Application
- `01-home-empty.png` - Empty home page state
- `02-add-todo.png` - Adding a new todo
- `03-todo-added.png` - Todo successfully added
- `04-multiple-todos.png` - Multiple todos in the list
- `05-complete-todo.png` - Completing a todo
- `06-completed-todos.png` - Mix of completed and incomplete todos
- `07-delete-todo.png` - Deleting a todo

### API Documentation (Swagger)
- `08-swagger-home.png` - Swagger UI homepage
- `09-swagger-get-todos.png` - GET /todos endpoint
- `10-swagger-post-todos.png` - POST /todos endpoint
- `11-swagger-try-it.png` - Testing endpoint with "Try it out"
- `12-swagger-schemas.png` - Schemas section
- `13-swagger-patch-todo.png` - PATCH /todos/{id} endpoint
- `14-swagger-delete-todo.png` - DELETE /todos/{id} endpoint

### Security & Developer Tools
- `15-security-headers.png` - Security headers from curl
- `16-complete-flow.png` - Complete user journey
- `17-network-tab.png` - Browser DevTools Network tab
- `18-console-clean.png` - Clean console output

### Responsive Design
- `19-mobile-portrait.png` - Mobile view (portrait)
- `20-tablet-view.png` - Tablet view

### Error Handling
- `21-error-backend-offline.png` - Backend offline error
- `22-validation-error.png` - Form validation error

## How to Capture Screenshots

### Frontend (Browser)
1. Start the application:
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run start:dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

2. Open browser to `http://localhost:5173/`

3. Use browser screenshot tools:
   - **Chrome/Edge:** Cmd/Ctrl + Shift + P → "Capture screenshot"
   - **Firefox:** Right-click → "Take Screenshot"
   - **Manual:** Use OS screenshot tool (Cmd+Shift+4 on Mac, Windows+Shift+S on Windows)

### Swagger UI
1. Navigate to `http://localhost:3000/api/docs`
2. Expand endpoints and capture documentation
3. Use "Try it out" to test and capture results

### Terminal/Command Line
1. Run curl commands
2. Capture terminal output with screenshot tool

## Screenshot Guidelines

- **Resolution:** Minimum 1920x1080 for desktop views
- **Format:** PNG for better quality
- **Mobile:** Use actual device or browser DevTools device emulator
- **Crop:** Focus on relevant UI, remove unnecessary browser chrome where appropriate
- **Annotations:** Add arrows or highlights if needed to emphasize features
- **Consistency:** Use the same sample data across screenshots when possible

## Sample Data for Screenshots

For consistency, use these sample todos:

1. **Todo 1:**
   - Title: "Buy groceries"
   - Description: "Milk, eggs, bread"
   - Status: Completed

2. **Todo 2:**
   - Title: "Write documentation"
   - Description: (empty)
   - Status: Incomplete

3. **Todo 3:**
   - Title: "Test integration"
   - Description: "Testing backend and frontend integration"
   - Status: Completed

## Current Status

- [ ] Frontend screenshots captured
- [ ] Swagger screenshots captured
- [ ] Security screenshots captured
- [ ] Responsive design screenshots captured
- [ ] Error handling screenshots captured

Once screenshots are added, update the checkboxes above.
