# Todo App

A full-stack todo application built with React, NestJS, and PostgreSQL.

## Documentation

- **[Application Guide](docs/APPLICATION_GUIDE.md)** - Complete visual guide with screenshots and functionality walkthrough
- **[API Documentation](http://localhost:3000/api/docs)** - Interactive Swagger UI (requires backend running)

## Features

- Create, read, update, and delete todos
- Mark todos as completed/incomplete
- Add descriptions to todos
- Real-time updates
- Clean and modern UI
- RESTful API
- Secure API with Helmet security headers
- Interactive API documentation with Swagger

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Axios for API calls
- CSS3 for styling

### Backend
- NestJS with TypeScript
- TypeORM for database management
- PostgreSQL database
- Class-validator for validation
- Helmet for security headers
- Swagger/OpenAPI for API documentation

### Infrastructure
- Docker Compose for PostgreSQL

## Project Structure

```
chatgpt-agent-todo-app/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── todos/          # Todo module
│   │   │   ├── dto/        # Data transfer objects
│   │   │   ├── todo.entity.ts
│   │   │   ├── todos.controller.ts
│   │   │   ├── todos.service.ts
│   │   │   └── todos.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API service
│   │   ├── types/          # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml      # PostgreSQL configuration
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd chatgpt-agent-todo-app
```

### 2. Start the PostgreSQL database

```bash
docker-compose up -d
```

This will start a PostgreSQL database on port 5432.

### 3. Set up the backend

```bash
cd backend
npm install
npm run start:dev
```

The backend API will be running on http://localhost:3000

### 4. Set up the frontend

Open a new terminal window:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be running on http://localhost:5173

### 5. Access the application

Open your browser and navigate to http://localhost:5173

## API Documentation

### Swagger UI

The API documentation is available via Swagger UI at:

**http://localhost:3000/api/docs**

Swagger provides:
- Interactive API documentation
- Ability to test endpoints directly from the browser
- Request/response schemas
- Example payloads
- API versioning information

### API Endpoints

### Todos

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a specific todo
- `POST /todos` - Create a new todo
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false
  }
  ```
- `PATCH /todos/:id` - Update a todo
  ```json
  {
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, cheese",
    "completed": true
  }
  ```
- `DELETE /todos/:id` - Delete a todo

## Environment Variables

### Backend

Create a `.env` file in the `backend` directory (optional, defaults are provided):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=todoapp
```

## Development

### Backend Development

```bash
cd backend
npm run start:dev  # Start with hot reload
```

### Frontend Development

```bash
cd frontend
npm run dev  # Start with hot reload
```

### Build for Production

#### Backend

```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview  # Preview production build
```

## Database Management

### Stop the database

```bash
docker-compose down
```

### Reset the database (delete all data)

```bash
docker-compose down -v
docker-compose up -d
```

### View database logs

```bash
docker-compose logs postgres
```

## Security

This application implements several security best practices:

### Helmet Security Headers

The backend uses Helmet middleware to set secure HTTP headers:

- **Content-Security-Policy**: Restricts resources the browser can load
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-DNS-Prefetch-Control**: Controls DNS prefetching
- **X-Download-Options**: Prevents file downloads in older IE versions
- **X-Permitted-Cross-Domain-Policies**: Restricts cross-domain policies
- **Strict-Transport-Security**: Enforces HTTPS connections (in production)

You can verify the security headers with:

```bash
curl -I http://localhost:3000/todos
```

### Input Validation

- All API inputs are validated using class-validator
- DTOs define strict schemas for request payloads
- TypeScript provides compile-time type checking

### CORS Configuration

- CORS is configured to only allow requests from the frontend origin
- Credentials are enabled for secure cookie handling

## Troubleshooting

### Backend cannot connect to database

- Make sure Docker is running
- Check if PostgreSQL container is running: `docker ps`
- Verify PostgreSQL is accessible: `docker-compose logs postgres`

### Frontend cannot connect to backend

- Make sure the backend is running on port 3000
- Check CORS settings in `backend/src/main.ts`
- Verify the API URL in `frontend/src/services/api.ts`

### Port already in use

If port 3000 or 5173 is already in use, you can change the ports:

- **Backend**: Modify the port in `backend/src/main.ts`
- **Frontend**: Modify the port in `frontend/vite.config.ts`
- Update the API URL in `frontend/src/services/api.ts` if you change the backend port
- Update CORS origin in `backend/src/main.ts` if you change the frontend port

## License

MIT
