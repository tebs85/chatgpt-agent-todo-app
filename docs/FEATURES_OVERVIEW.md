# Todo App - Features Overview

Quick reference guide for all application features.

## Frontend Features

### 1. Create Todos
- **Location:** Main form at the top of the page
- **Fields:**
  - Title (required)
  - Description (optional)
- **Action:** Click "Add Todo" button
- **Result:** Todo appears at the top of the list immediately

### 2. View Todos
- **Display:** List of all todos ordered by creation date (newest first)
- **Information Shown:**
  - Title (bold)
  - Description (gray text, if provided)
  - Completion status (checkbox)
  - Created/Updated timestamps
- **Statistics:** Shows "X of Y completed" counter

### 3. Complete/Uncomplete Todos
- **Action:** Click the checkbox next to a todo
- **Visual Feedback:**
  - Checked: Title gets strikethrough, content becomes semi-transparent
  - Unchecked: Normal appearance
- **Persistence:** Status saved to database immediately

### 4. Delete Todos
- **Action:** Click "Delete" button on the right side
- **Result:** Todo removed from list and database immediately
- **No confirmation:** Direct deletion for quick workflow

### 5. Real-time Updates
- **No page refresh required**
- **Instant UI updates** after all operations
- **Optimistic UI:** Changes appear immediately

## Backend API Features

### Endpoints

#### GET /todos
- **Purpose:** Retrieve all todos
- **Response:** Array of todo objects
- **Order:** Newest first (by createdAt DESC)

#### GET /todos/:id
- **Purpose:** Retrieve a specific todo
- **Parameters:** id (number)
- **Response:** Single todo object or 404 error

#### POST /todos
- **Purpose:** Create a new todo
- **Body:** CreateTodoDto
  - title: string (required)
  - description: string (optional)
  - completed: boolean (optional, default: false)
- **Response:** Created todo with generated ID and timestamps

#### PATCH /todos/:id
- **Purpose:** Update an existing todo
- **Parameters:** id (number)
- **Body:** UpdateTodoDto (all fields optional)
  - title: string
  - description: string
  - completed: boolean
- **Response:** Updated todo object or 404 error

#### DELETE /todos/:id
- **Purpose:** Delete a todo
- **Parameters:** id (number)
- **Response:** 204 No Content or 404 error

### Data Model

```typescript
interface Todo {
  id: number;                // Auto-generated
  title: string;             // Required
  description: string | null; // Optional
  completed: boolean;        // Default: false
  createdAt: Date;          // Auto-generated
  updatedAt: Date;          // Auto-updated
}
```

## Security Features

### Helmet Security Headers

1. **Content-Security-Policy**
   - Restricts resource loading
   - Prevents XSS attacks
   - Configured for self-hosted resources

2. **X-Frame-Options: SAMEORIGIN**
   - Prevents clickjacking attacks
   - Disallows embedding in iframes from other domains

3. **X-Content-Type-Options: nosniff**
   - Prevents MIME type sniffing
   - Forces browsers to respect declared content types

4. **X-DNS-Prefetch-Control: off**
   - Controls DNS prefetching
   - Enhances privacy

5. **X-Download-Options: noopen**
   - Prevents automatic file opening in IE
   - Reduces attack surface

6. **CORS Configuration**
   - Origin restricted to frontend URL
   - Credentials enabled for cookies
   - Pre-configured for localhost:5173

### Input Validation

- **class-validator:** All DTOs validated
- **Type checking:** TypeScript compile-time validation
- **Required fields:** Enforced at API level
- **Data sanitization:** Automatic via TypeORM

## API Documentation (Swagger)

### Features

1. **Interactive Testing**
   - "Try it out" buttons on all endpoints
   - Execute API calls directly from browser
   - See real responses

2. **Complete Schemas**
   - Request body schemas with examples
   - Response schemas for all status codes
   - Field descriptions and types

3. **Documentation**
   - Endpoint summaries
   - Detailed descriptions
   - Parameter documentation
   - Example payloads

### Access

- **URL:** http://localhost:3000/api/docs
- **JSON:** http://localhost:3000/api/docs-json
- **Available when:** Backend is running

## User Interface Features

### Design

- **Clean & Modern:** Minimalist design with focus on usability
- **Color Scheme:**
  - Primary: Indigo (#4f46e5)
  - Success: Green (#10b981)
  - Danger: Red (#ef4444)
  - Neutral: Gray scale

### Responsive Design

- **Desktop:** Full-width layout (max-width: 768px)
- **Tablet:** Optimized for medium screens
- **Mobile:** Stack vertically, full-width buttons

### Accessibility

- **Semantic HTML:** Proper element usage
- **Labels:** All form inputs labeled
- **Keyboard navigation:** Full keyboard support
- **Focus indicators:** Visible focus states

## Error Handling

### Frontend Errors

1. **Backend Offline**
   - Alert message displayed
   - Instructions to start backend
   - Dismissible notification

2. **Validation Errors**
   - Empty title prevented
   - Form validation before submission
   - Visual feedback

3. **Network Errors**
   - Caught and displayed
   - User-friendly messages
   - Console logging for debugging

### Backend Errors

1. **404 Not Found**
   - Todo doesn't exist
   - Clear error message

2. **400 Bad Request**
   - Invalid input data
   - Validation error details

3. **500 Internal Server Error**
   - Unexpected errors logged
   - Generic message to user

## Database Features

### PostgreSQL

- **Database:** todoapp
- **Table:** todos
- **Connection:** TypeORM with connection pooling

### Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  createdAt TIMESTAMP DEFAULT NOW(),
  updatedAt TIMESTAMP DEFAULT NOW()
);
```

### Features

- **Auto-sync:** Schema automatically updated in development
- **Timestamps:** Automatic creation and update tracking
- **Constraints:** NOT NULL on required fields
- **Indexes:** Primary key on id

## Development Features

### Hot Reload

- **Frontend:** Vite dev server with HMR
- **Backend:** NestJS watch mode
- **Instant updates** during development

### TypeScript

- **Type safety** across full stack
- **Compile-time errors** caught early
- **IntelliSense** support in IDEs

### Code Quality

- **Validation:** class-validator decorators
- **DTOs:** Separate interfaces for create/update
- **Services:** Business logic separated
- **Controllers:** Thin routing layer

## Performance

### Frontend

- **Vite:** Fast build tool and dev server
- **React 18:** Latest React features
- **Optimistic UI:** Instant feedback

### Backend

- **NestJS:** Efficient Node.js framework
- **TypeORM:** Optimized queries
- **Connection pooling:** Database connections reused

### Database

- **Indexed primary key**
- **Efficient queries:** Only fetch needed data
- **Prepared statements:** SQL injection prevention

## Browser Support

- **Chrome:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Edge:** Latest 2 versions

## Technology Stack Summary

```
┌─────────────────────────────────────────┐
│           Frontend (Port 5173)          │
│  React 18 + TypeScript + Vite + Axios   │
└────────────────┬────────────────────────┘
                 │ HTTP/REST
                 │
┌────────────────▼────────────────────────┐
│           Backend (Port 3000)           │
│  NestJS + TypeORM + Helmet + Swagger    │
└────────────────┬────────────────────────┘
                 │ TypeORM
                 │
┌────────────────▼────────────────────────┐
│         Database (Port 5432)            │
│          PostgreSQL 15                  │
└─────────────────────────────────────────┘
```

## Quick Commands

```bash
# Start PostgreSQL
docker-compose up -d

# Start Backend
cd backend && npm run start:dev

# Start Frontend
cd frontend && npm run dev

# View API Documentation
open http://localhost:3000/api/docs

# View Application
open http://localhost:5173

# Test API Security Headers
curl -I http://localhost:3000/todos

# Test API Endpoint
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","description":"Testing API"}'
```

## Next Steps

For detailed visual walkthrough with screenshots, see:
- [Application Guide](APPLICATION_GUIDE.md)

For screenshots directory and guidelines, see:
- [Screenshots README](screenshots/README.md)
