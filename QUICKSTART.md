# Quick Start Guide

This guide will help you get the Todo App up and running in minutes.

## Prerequisites

- **Java 21** - [Download JDK 21](https://adoptium.net/)
- **Node.js 20+** - [Download Node.js](https://nodejs.org/)
- **PostgreSQL 14+** - [Download PostgreSQL](https://www.postgresql.org/download/)
- **Maven 3.9+** - Usually included with Java IDE or [download separately](https://maven.apache.org/download.cgi)

## Step 1: Install PostgreSQL

### Windows
1. Download installer from https://www.postgresql.org/download/windows/
2. Run installer and set password for `postgres` user: **postgres**
3. Keep default port: **5432**
4. Complete installation

### macOS
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Step 2: Create Database

```bash
# Connect to PostgreSQL (password: postgres)
psql -U postgres

# In psql prompt, create the database:
CREATE DATABASE todo_db;

# Verify it was created:
\l

# Exit psql:
\q
```

## Step 3: Start the Backend

```bash
# Navigate to backend folder
cd todo-backend

# Build and start (this will also run Flyway migrations)
mvn spring-boot:run
```

**What happens:**
- Maven downloads dependencies (first time only)
- Flyway creates tables (`users`, `tasks`)
- Flyway seeds demo user (`demo@example.com`)
- Backend starts on port 8080

**Verify backend is running:**
```bash
curl http://localhost:8080/api/tasks
```

Expected: `[]` (empty JSON array)

## Step 4: Start the Frontend

Open a **new terminal window**:

```bash
# Navigate to frontend folder
cd todo-frontend

# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

**What happens:**
- npm installs Next.js and dependencies (first time only)
- Frontend starts on port 3000
- Hot reload enabled for development

## Step 5: Use the Application

Open your browser and go to:
```
http://localhost:3000
```

You'll be redirected to **http://localhost:3000/tasks** (Inbox view).

### Try These Actions:

1. **Create a task:**
   - Type in the "Add a task" input
   - Press Enter or click "Add"

2. **Mark as important:**
   - Click the star icon ⭐

3. **Add to My Day:**
   - Click the "+ My Day" button
   - Navigate to "My Day" in the sidebar

4. **Set due date:**
   - Go to "Planned" view
   - Create a task with a due date

5. **Complete a task:**
   - Click the checkbox ✓

## Verify Everything Works

Open a third terminal and run:

```bash
# Check demo user exists
psql -U postgres -d todo_db -c "SELECT * FROM users;"

# View all tasks
psql -U postgres -d todo_db -c "SELECT * FROM tasks;"

# View tasks with user info
psql -U postgres -d todo_db -c "SELECT t.title, u.email FROM tasks t JOIN users u ON t.user_id = u.id;"
```

## Testing the API

### Create a task via API:
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Task from CLI", "description": "Created via curl"}'
```

### Get all tasks:
```bash
curl http://localhost:8080/api/tasks
```

### Get important tasks:
```bash
curl "http://localhost:8080/api/tasks?view=important"
```

### Get My Day tasks:
```bash
curl "http://localhost:8080/api/tasks?view=myday"
```

## Stopping the Application

### Stop Backend:
- Press `Ctrl + C` in the backend terminal

### Stop Frontend:
- Press `Ctrl + C` in the frontend terminal

### Stop PostgreSQL (optional):
```bash
# macOS
brew services stop postgresql@16

# Linux
sudo systemctl stop postgresql
```

## Restarting After Stopping

### Just restart backend and frontend:
```bash
# Terminal 1: Backend
cd todo-backend
mvn spring-boot:run

# Terminal 2: Frontend
cd todo-frontend
npm run dev
```

PostgreSQL usually runs as a service and doesn't need restarting.

## Common Issues

### Issue: Port 8080 already in use

**Solution:**
```bash
# Find what's using port 8080
lsof -i :8080

# Kill the process (use PID from above)
kill -9 <PID>

# Or on Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Find what's using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>
```

### Issue: Backend can't connect to database

**Check PostgreSQL is running:**
```bash
# macOS
brew services list | grep postgresql

# Linux
sudo systemctl status postgresql

# Test connection
psql -U postgres -d todo_db
```

**Verify credentials in `todo-backend/src/main/resources/application.properties`:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=postgres
spring.datasource.******
```

### Issue: Frontend shows "Failed to fetch" errors

**Ensure backend is running:**
```bash
curl http://localhost:8080/api/tasks
```

**Check browser console for CORS errors** - backend should allow `http://localhost:3000`

### Issue: Database tables don't exist

**Re-run Flyway migrations:**
```bash
cd todo-backend
mvn clean install
mvn spring-boot:run
```

Or manually run migrations:
```bash
cd todo-backend
mvn flyway:migrate
```

### Issue: Demo user not found error

**Verify demo user exists:**
```bash
psql -U postgres -d todo_db -c "SELECT * FROM users WHERE email = 'demo@example.com';"
```

**If not found, check Flyway migrations:**
```bash
psql -U postgres -d todo_db -c "SELECT * FROM flyway_schema_history;"
```

**Reset database if needed:**
```bash
psql -U postgres -c "DROP DATABASE todo_db;"
psql -U postgres -c "CREATE DATABASE todo_db;"
cd todo-backend
mvn spring-boot:run
```

## Next Steps

- Explore the code in `todo-backend/src/main/java/`
- Modify frontend components in `todo-frontend/components/`
- Add new features to the Task entity
- Create additional views
- Customize the UI with Tailwind classes

## Development Tips

### Backend Hot Reload

Spring Boot DevTools is included. Changes to Java files will auto-restart the backend.

### Frontend Hot Reload

Next.js hot reloads automatically. Just save your files and refresh the browser.

### Database Queries

Use pgAdmin 4 or psql to inspect data:
```bash
psql -U postgres -d todo_db
```

Common queries:
```sql
-- View all tables
\dt

-- View table structure
\d tasks

-- Count tasks
SELECT COUNT(*) FROM tasks;

-- View tasks with user
SELECT t.*, u.email FROM tasks t JOIN users u ON t.user_id = u.id;
```

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Next.js Documentation](https://nextjs.org/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Flyway Documentation](https://flywaydb.org/documentation/)
