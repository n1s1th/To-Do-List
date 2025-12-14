# Todo App

Microsoft To Do Clone - Full Stack Application

## Tech Stack
- **Frontend**: Next.js 14 (TypeScript, App Router, TailwindCSS)
- **Backend**: Spring Boot 3.2 (Java 21, Maven)
- **Database**: PostgreSQL with Flyway migrations

## Features
- ✅ Task management with CRUD operations
- 📝 Four views: Tasks (Inbox), My Day, Important, Planned
- ⭐ Mark tasks as important
- ☀️ Add tasks to My Day
- 📅 Set due dates for planning
- ✓ Mark tasks as complete/incomplete
- 🔍 Real-time backend API integration

## Project Structure
```
todo-app/
├── todo-backend/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/notes/todobackend/
│   │   │   │   ├── config/       # CORS configuration
│   │   │   │   ├── common/       # Exception handling
│   │   │   │   ├── user/         # User entity & services
│   │   │   │   └── task/         # Task entity, DTOs, services, controllers
│   │   │   └── resources/
│   │   │       ├── db/migration/ # Flyway SQL migrations
│   │   │       └── application.properties
│   │   └── test/
│   └── pom.xml
├── todo-frontend/         # Next.js frontend
│   ├── app/              # App Router pages
│   │   ├── tasks/        # Inbox view
│   │   ├── my-day/       # My Day view
│   │   ├── important/    # Important tasks view
│   │   └── planned/      # Planned tasks view
│   ├── components/       # React components
│   ├── lib/              # API client
│   └── package.json
└── README.md
```

## Prerequisites

- **Java 21+** - [Download](https://adoptium.net/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Maven 3.9+** - [Download](https://maven.apache.org/download.cgi)

## Setup Instructions

### 1. Install PostgreSQL

#### Windows
Download and install from: https://www.postgresql.org/download/windows/

During installation:
- Set password for `postgres` user: `postgres`
- Port: `5432`
- Leave other settings as default

#### macOS
```bash
brew install postgresql@16
brew services start postgresql@16
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2. Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database (in psql prompt)
CREATE DATABASE todo_db;

# Exit psql
\q
```

### 3. Set up Backend

```bash
cd todo-backend

# Build the project (downloads dependencies and runs Flyway migrations)
mvn clean install

# Run the backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

**Verify backend is running:**
```bash
curl http://localhost:8080/api/tasks
```
Expected response: `[]` (empty array)

### 4. Set up Frontend

Open a new terminal:

```bash
cd todo-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will start on **http://localhost:3000**

### 5. Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

The app will automatically redirect to `/tasks` (Inbox view).

## API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Get Tasks
```http
GET /api/tasks?view={view}&search={search}
```
- **view**: `inbox`, `myday`, `important`, `planned`, `completed` (default: `inbox`)
- **search**: Optional search term for title/description

#### Create Task
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "Task title",
  "description": "Optional description",
  "dueAt": "2024-12-31T12:00:00Z"  // Optional ISO-8601
}
```

#### Update Task
```http
PATCH /api/tasks/{id}
Content-Type: application/json

{
  "title": "Updated title",
  "isCompleted": true,
  "isImportant": false,
  "dueAt": null,  // Clear due date
  "myDayDate": "2024-12-13"  // ISO date
}
```

#### Delete Task
```http
DELETE /api/tasks/{id}
```

#### Toggle Important
```http
POST /api/tasks/{id}/toggleImportant
```

#### Toggle Complete
```http
POST /api/tasks/{id}/toggleComplete
```

#### Add to My Day
```http
POST /api/tasks/{id}/addToMyDay
```

#### Remove from My Day
```http
POST /api/tasks/{id}/removeFromMyDay
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    display_name TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    is_important BOOLEAN NOT NULL DEFAULT FALSE,
    due_at TIMESTAMPTZ,
    my_day_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### Demo User
A demo user is automatically created with:
- **Email**: demo@example.com
- **Name**: Demo User

All task operations use this demo user internally.

## Development

### Backend Development

The backend uses:
- **Spring Boot DevTools** for hot reload
- **Flyway** for database migrations
- **JPA/Hibernate** for ORM

To rebuild after changes:
```bash
cd todo-backend
mvn clean package
mvn spring-boot:run
```

### Frontend Development

The frontend uses:
- **Next.js App Router** with hot reload
- **TypeScript** for type safety
- **TailwindCSS** for styling

Changes are automatically reflected in the browser.

### Database Migrations

Migrations are in `todo-backend/src/main/resources/db/migration/`

To create a new migration:
1. Create file: `V{number}__{description}.sql`
2. Add SQL statements
3. Restart backend (Flyway auto-runs migrations)

Example:
```sql
-- V3__add_task_priority.sql
ALTER TABLE tasks ADD COLUMN priority INTEGER DEFAULT 0;
```

## Troubleshooting

### Port already in use

**Backend (8080):**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>
```

**Frontend (3000):**
```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

**PostgreSQL (5432):**
```bash
# Check PostgreSQL status
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# Restart PostgreSQL
sudo systemctl restart postgresql  # Linux
brew services restart postgresql@16  # macOS
```

### Backend cannot connect to database

Check `todo-backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=postgres
spring.datasource.******
```

Verify PostgreSQL is running:
```bash
psql -U postgres -d todo_db -c "SELECT version();"
```

### Frontend cannot connect to backend

Ensure backend is running on port 8080:
```bash
curl http://localhost:8080/api/tasks
```

Check frontend API configuration in `todo-frontend/lib/api.ts`:
```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

### Flyway migration errors

To reset database:
```bash
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate database
DROP DATABASE todo_db;
CREATE DATABASE todo_db;
\q

# Restart backend (migrations will run again)
cd todo-backend
mvn spring-boot:run
```

### Build errors

**Backend:**
```bash
cd todo-backend
mvn clean install -U  # Force update dependencies
```

**Frontend:**
```bash
cd todo-frontend
rm -rf node_modules package-lock.json
npm install
```

## Testing

### Backend Tests
```bash
cd todo-backend
mvn test
```

### Frontend Tests
```bash
cd todo-frontend
npm test
```

## Production Build

### Backend
```bash
cd todo-backend
mvn clean package
java -jar target/todo-backend-1.0.0.jar
```

### Frontend
```bash
cd todo-frontend
npm run build
npm start
```

## License
MIT
