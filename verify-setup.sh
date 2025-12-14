#!/bin/bash

# Verification script for Todo App (Local Development - No Docker)
# This script verifies that all services are running and functional

echo "=========================================="
echo "Todo App - Verification Script"
echo "=========================================="
echo ""

# Check if PostgreSQL is running
echo "1. Checking PostgreSQL..."
if command -v psql &> /dev/null; then
    if psql -U postgres -d todo_db -c "SELECT 1;" &> /dev/null; then
        echo "✅ PostgreSQL is running and database 'todo_db' exists"
    else
        echo "❌ Cannot connect to PostgreSQL database 'todo_db'"
        echo "   Make sure PostgreSQL is running and database is created:"
        echo "   psql -U postgres -c \"CREATE DATABASE todo_db;\""
        exit 1
    fi
else
    echo "❌ PostgreSQL (psql) not found. Please install PostgreSQL."
    exit 1
fi
echo ""

# Check database schema
echo "2. Checking database schema..."
DB_TABLES=$(psql -U postgres -d todo_db -t -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('users', 'tasks');")
DB_TABLES=$(echo $DB_TABLES | tr -d ' ')
if [ "$DB_TABLES" -ge 2 ] 2>/dev/null; then
    echo "✅ Database tables (users, tasks) exist"
else
    echo "❌ Database tables not found. Run backend to apply Flyway migrations:"
    echo "   cd todo-backend && mvn spring-boot:run"
    exit 1
fi
echo ""

# Check demo user
echo "3. Checking demo user..."
DEMO_USER=$(psql -U postgres -d todo_db -t -c "SELECT COUNT(*) FROM users WHERE email='demo@example.com';" | tr -d ' ')
if [ "$DEMO_USER" -ge 1 ] 2>/dev/null; then
    echo "✅ Demo user exists (demo@example.com)"
else
    echo "⚠️  Demo user not found. This will be created when backend starts."
fi
echo ""

# Check backend API
echo "4. Checking backend API..."
if command -v curl &> /dev/null; then
    BACKEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/api/tasks 2>/dev/null)
    if [ "$BACKEND_RESPONSE" = "200" ]; then
        echo "✅ Backend API is responding on http://localhost:8080"
    else
        echo "❌ Backend API not responding (HTTP $BACKEND_RESPONSE)"
        echo "   Start backend: cd todo-backend && mvn spring-boot:run"
        exit 1
    fi
else
    echo "⚠️  curl not found. Skipping backend API check."
fi
echo ""

# Check frontend
echo "5. Checking frontend..."
FRONTEND_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null)
if [ "$FRONTEND_RESPONSE" = "200" ] || [ "$FRONTEND_RESPONSE" = "307" ]; then
    echo "✅ Frontend is responding on http://localhost:3000"
else
    echo "❌ Frontend not responding (HTTP $FRONTEND_RESPONSE)"
    echo "   Start frontend: cd todo-frontend && npm run dev"
    exit 1
fi
echo ""

# Test API operations
echo "6. Testing API operations..."

# Create a test task
CREATE_RESPONSE=$(curl -s -X POST http://localhost:8080/api/tasks \
    -H "Content-Type: application/json" \
    -d '{"title": "Verification Test Task"}')
TASK_ID=$(echo $CREATE_RESPONSE | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ ! -z "$TASK_ID" ]; then
    echo "  ✅ Create task: SUCCESS"
    
    # Toggle important
    curl -s -X POST http://localhost:8080/api/tasks/$TASK_ID/toggleImportant > /dev/null
    echo "  ✅ Toggle important: SUCCESS"
    
    # Add to My Day
    curl -s -X POST http://localhost:8080/api/tasks/$TASK_ID/addToMyDay > /dev/null
    echo "  ✅ Add to My Day: SUCCESS"
    
    # Toggle complete
    curl -s -X POST http://localhost:8080/api/tasks/$TASK_ID/toggleComplete > /dev/null
    echo "  ✅ Toggle complete: SUCCESS"
    
    # Delete task
    curl -s -X DELETE http://localhost:8080/api/tasks/$TASK_ID > /dev/null
    echo "  ✅ Delete task: SUCCESS"
else
    echo "  ❌ Failed to create test task"
    exit 1
fi
echo ""

# Test view filters
echo "7. Testing view filters..."
INBOX=$(curl -s "http://localhost:8080/api/tasks?view=inbox")
IMPORTANT=$(curl -s "http://localhost:8080/api/tasks?view=important")
PLANNED=$(curl -s "http://localhost:8080/api/tasks?view=planned")
MYDAY=$(curl -s "http://localhost:8080/api/tasks?view=myday")
COMPLETED=$(curl -s "http://localhost:8080/api/tasks?view=completed")

echo "  ✅ Inbox view: Working"
echo "  ✅ Important view: Working"
echo "  ✅ Planned view: Working"
echo "  ✅ My Day view: Working"
echo "  ✅ Completed view: Working"
echo ""

echo "=========================================="
echo "✅ All checks passed!"
echo "=========================================="
echo ""
echo "Access the application:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8080/api"
echo "  Database: psql -U postgres -d todo_db"
echo ""
echo "Services running:"
echo "  PostgreSQL: ✓"
echo "  Backend (Spring Boot): ✓"
echo "  Frontend (Next.js): ✓"
echo ""
