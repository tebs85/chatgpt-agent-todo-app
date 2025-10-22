# Todo App - Application Guide

This guide provides a visual walkthrough of the Todo application's features and functionality.

## Table of Contents

- [Frontend Application](#frontend-application)
  - [Home Page](#home-page)
  - [Adding Todos](#adding-todos)
  - [Managing Todos](#managing-todos)
  - [Completing Todos](#completing-todos)
  - [Deleting Todos](#deleting-todos)
- [API Documentation](#api-documentation)
  - [Swagger UI](#swagger-ui)
  - [API Endpoints](#api-endpoints)
- [Security Features](#security-features)

---

## Frontend Application

### Home Page

**URL:** `http://localhost:5173/`

![Home Page - Empty State](screenshots/01-home-empty.png)

**Description:** The home page displays when no todos exist. It features:
- Application title "Todo App"
- Subtitle "Organize your tasks efficiently"
- Todo creation form with title and description fields
- Empty state message: "No todos yet. Add one above to get started!"

**Key Elements:**
- Clean, modern UI with a centered layout
- Form with input field for title
- Textarea for optional description
- "Add Todo" button

---

### Adding Todos

![Adding a Todo](screenshots/02-add-todo.png)

**Description:** Creating a new todo by filling out the form.

**Steps:**
1. Enter a title in the "What needs to be done?" field
2. Optionally add a description
3. Click "Add Todo" button

**Example:**
- Title: "Buy groceries"
- Description: "Milk, eggs, bread"

---

![Todo Added Successfully](screenshots/03-todo-added.png)

**Description:** After adding a todo, it appears at the top of the list.

**Features Shown:**
- New todo appears immediately (no page refresh)
- Todo displays with title and description
- Checkbox for marking complete/incomplete
- Delete button on the right
- Stats showing "0 of 1 completed"

---

### Managing Todos

![Multiple Todos](screenshots/04-multiple-todos.png)

**Description:** The application with multiple todos.

**Features Shown:**
- Multiple todos listed in chronological order (newest first)
- Each todo shows:
  - Checkbox for completion status
  - Title in bold
  - Description in gray text below title
  - Delete button
- Stats counter showing completion ratio

**Example Todos:**
1. "Write documentation" (no description)
2. "Buy groceries" - "Milk, eggs, bread"
3. "Test integration" - "Testing backend and frontend integration"

---

### Completing Todos

![Completing a Todo](screenshots/05-complete-todo.png)

**Description:** Marking a todo as completed by clicking the checkbox.

**Visual Changes:**
- Checkbox becomes checked
- Title gets strikethrough decoration
- Todo content becomes slightly transparent (opacity: 0.6)
- Stats update to reflect completion

**Before/After:**
- Before: ☐ Buy groceries
- After: ☑ ~~Buy groceries~~

---

![Completed Todos](screenshots/06-completed-todos.png)

**Description:** View showing mix of completed and incomplete todos.

**Features Shown:**
- Completed todos have strikethrough text
- Incomplete todos appear normal
- Stats show "2 of 3 completed"
- Can toggle completion status by clicking checkbox again

---

### Deleting Todos

![Delete Todo Confirmation](screenshots/07-delete-todo.png)

**Description:** Deleting a todo by clicking the Delete button.

**Features:**
- Click "Delete" button removes todo immediately
- List updates without page refresh
- Stats counter updates automatically

---

## API Documentation

### Swagger UI

![Swagger UI - Home](screenshots/08-swagger-home.png)

**URL:** `http://localhost:3000/api/docs`

**Description:** The Swagger UI homepage showing all available endpoints.

**Features Shown:**
- API title: "Todo API"
- Description: "A simple and secure Todo application API"
- Version: 1.0
- Tag: "todos"
- List of all endpoints:
  - GET /todos
  - POST /todos
  - GET /todos/{id}
  - PATCH /todos/{id}
  - DELETE /todos/{id}

---

![Swagger - GET /todos](screenshots/09-swagger-get-todos.png)

**Description:** Swagger documentation for GET /todos endpoint.

**Information Shown:**
- **Summary:** Get all todos
- **Description:** Retrieve all todos ordered by creation date (newest first)
- **Responses:**
  - 200: List of todos retrieved successfully
- **Response Schema:** Array of Todo objects
- "Try it out" button for testing

---

![Swagger - POST /todos](screenshots/10-swagger-post-todos.png)

**Description:** Swagger documentation for POST /todos endpoint.

**Information Shown:**
- **Summary:** Create a new todo
- **Description:** Create a new todo item
- **Request Body:** CreateTodoDto schema
  - title (string, required) - Example: "Buy groceries"
  - description (string, optional) - Example: "Milk, eggs, bread"
  - completed (boolean, optional) - Example: false
- **Responses:**
  - 201: Todo created successfully
  - 400: Invalid input data
- Example request payload
- "Try it out" button

---

![Swagger - Try It Out](screenshots/11-swagger-try-it.png)

**Description:** Testing an endpoint directly from Swagger UI.

**Features Shown:**
1. "Try it out" button clicked
2. Request body editor with example JSON
3. "Execute" button to send request
4. Response section showing:
   - Response code (201)
   - Response body with created todo
   - Response headers
   - curl command for the request

**Example Request:**
```json
{
  "title": "Test from Swagger",
  "description": "Testing API documentation",
  "completed": false
}
```

**Example Response:**
```json
{
  "id": 4,
  "title": "Test from Swagger",
  "description": "Testing API documentation",
  "completed": false,
  "createdAt": "2025-10-22T14:00:00.000Z",
  "updatedAt": "2025-10-22T14:00:00.000Z"
}
```

---

![Swagger - Schemas](screenshots/12-swagger-schemas.png)

**Description:** The Schemas section at the bottom of Swagger UI.

**Schemas Shown:**
- **Todo:** Complete todo entity with all fields
- **CreateTodoDto:** Schema for creating todos
- **UpdateTodoDto:** Schema for updating todos

**Todo Schema Fields:**
- id (integer) - The unique identifier
- title (string) - The title of the todo
- description (string, nullable) - The description
- completed (boolean) - Whether completed
- createdAt (string, date-time) - Creation date
- updatedAt (string, date-time) - Last update date

---

### API Endpoints

![PATCH /todos/{id}](screenshots/13-swagger-patch-todo.png)

**Description:** Swagger documentation for PATCH /todos/{id} endpoint.

**Information Shown:**
- **Summary:** Update a todo
- **Description:** Update an existing todo by its ID
- **Parameters:**
  - id (path parameter, required) - Example: 1
- **Request Body:** UpdateTodoDto (all fields optional)
- **Responses:**
  - 200: Todo updated successfully
  - 404: Todo not found
  - 400: Invalid input data

---

![DELETE /todos/{id}](screenshots/14-swagger-delete-todo.png)

**Description:** Swagger documentation for DELETE /todos/{id} endpoint.

**Information Shown:**
- **Summary:** Delete a todo
- **Description:** Delete a todo by its ID
- **Parameters:**
  - id (path parameter, required) - Example: 1
- **Responses:**
  - 204: Todo deleted successfully
  - 404: Todo not found

---

## Security Features

### Security Headers

![Security Headers - curl Output](screenshots/15-security-headers.png)

**Command:**
```bash
curl -I http://localhost:3000/todos
```

**Headers Shown:**
```
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';style-src 'self' 'unsafe-inline';script-src 'self' 'unsafe-inline';img-src 'self' data: https:
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
```

**Description:** Security headers set by Helmet middleware.

**Key Security Features:**
- **Content-Security-Policy:** Restricts resource loading
- **X-Frame-Options:** Prevents clickjacking (SAMEORIGIN)
- **X-Content-Type-Options:** Prevents MIME sniffing (nosniff)
- **CORS Headers:** Configured for frontend origin

---

## Application Flow

### Complete User Journey

![Complete Flow](screenshots/16-complete-flow.png)

**Description:** A complete user journey showing:

1. **Start:** Empty application
2. **Add First Todo:** User creates "Buy groceries"
3. **Add More Todos:** User adds "Write documentation" and "Test integration"
4. **Mark Complete:** User checks off "Test integration"
5. **View Stats:** Stats show "1 of 3 completed"
6. **Delete Todo:** User deletes "Write documentation"
7. **Final State:** 2 todos remaining, 1 completed

---

## Developer Tools

### Network Tab

![Network Tab - API Call](screenshots/17-network-tab.png)

**Description:** Browser DevTools Network tab showing API communication.

**Features Shown:**
- POST request to `http://localhost:3000/todos`
- Request Headers:
  - Content-Type: application/json
  - Origin: http://localhost:5173
- Request Payload: CreateTodoDto JSON
- Response:
  - Status: 201 Created
  - Response body with created todo

---

### Console

![Console - No Errors](screenshots/18-console-clean.png)

**Description:** Browser console showing clean operation with no errors.

**Features:**
- No JavaScript errors
- Successful API responses logged
- React development mode messages

---

## Responsive Design

### Mobile View

![Mobile View - Portrait](screenshots/19-mobile-portrait.png)

**Description:** Application on mobile device (portrait orientation).

**Features:**
- Responsive layout adapts to smaller screens
- Form inputs full width
- Todos stack vertically
- Delete button remains accessible
- Touch-friendly button sizes

---

### Tablet View

![Tablet View](screenshots/20-tablet-view.png)

**Description:** Application on tablet device.

**Features:**
- Optimized for medium screen sizes
- Comfortable reading width
- All functionality accessible

---

## Error Handling

### Backend Offline

![Backend Offline Error](screenshots/21-error-backend-offline.png)

**Description:** Error message when backend is not running.

**Error Shown:**
- Red alert banner at top
- Message: "Failed to fetch todos. Make sure the backend is running."
- Close button (×) to dismiss alert

---

### Validation Error

![Validation Error](screenshots/22-validation-error.png)

**Description:** Error when trying to create todo without title.

**Features:**
- Form validation prevents submission
- Title field is required
- Empty title shows validation error

---

## Summary

This Todo application demonstrates:

- **Modern Frontend:** React with TypeScript, clean UI, responsive design
- **Robust Backend:** NestJS with TypeORM, PostgreSQL database
- **API Documentation:** Interactive Swagger UI
- **Security:** Helmet security headers, input validation, CORS
- **Real-time Updates:** Instant UI updates without page refresh
- **Developer Experience:** Hot reload, TypeScript, comprehensive documentation

---

## Taking Screenshots

To capture these screenshots:

1. **Frontend Screenshots:**
   - Navigate to `http://localhost:5173/`
   - Use browser screenshot tools or press `Cmd/Ctrl + Shift + S`
   - Capture different states as described above

2. **Swagger Screenshots:**
   - Navigate to `http://localhost:3000/api/docs`
   - Expand different endpoints
   - Click "Try it out" and execute requests
   - Capture request/response examples

3. **Developer Tools:**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Perform actions and capture API calls
   - Check Console tab for logs

4. **Security Headers:**
   - Use terminal: `curl -I http://localhost:3000/todos`
   - Take screenshot of terminal output

Save all screenshots in `/docs/screenshots/` directory with the filenames referenced in this guide.
