# To-Do-List

A full-stack To-Do List application built with Next.js (frontend) and Spring Boot (backend).

## Features

- 📝 Create, update, and delete tasks
- 📋 Organize tasks into custom lists
- ⭐ Mark tasks as important
- 📅 Set due dates and add tasks to "My Day"
- 🔐 User authentication and authorization
- 🎨 Modern, responsive UI with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 16** - React framework for production
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Spring Boot 3.5.7** - Java backend framework
- **PostgreSQL** - Relational database
- **Spring Security** - Authentication and authorization
- **Flyway** - Database migrations

## Quick Start with Docker Compose

The easiest way to run the entire application (frontend, backend, and database) is using Docker Compose:

### Prerequisites
- Docker and Docker Compose installed on your machine

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/n1s1th/To-Do-List.git
   cd To-Do-List
   ```

2. (Optional) Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file if you want to customize any environment variables.

3. Start all services:
   ```bash
   docker-compose up --build
   ```

4. Access the application:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8080
   - **Health Check**: http://localhost:8080/actuator/health

5. To stop the services:
   ```bash
   docker-compose down
   ```

6. To remove all data (including database):
   ```bash
   docker-compose down -v
   ```

## Local Development Setup

### Backend Setup

#### Prerequisites
- Java 17 or higher
- Maven 3.9+
- PostgreSQL 15+

#### Steps

1. Start PostgreSQL database:
   ```bash
   # Using Docker
   docker run -d \
     --name todo-postgres \
     -e POSTGRES_DB=todo_db \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_PASSWORD=1234 \
     -p 5432:5432 \
     postgres:15-alpine
   ```

2. Navigate to the backend directory:
   ```bash
   cd todo-backend
   ```

3. Build the application:
   ```bash
   ./mvnw clean install
   ```

4. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

   Or set environment variables before running:
   ```bash
   export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/todo_db
   export SPRING_DATASOURCE_USERNAME=postgres
   export SPRING_DATASOURCE_PASSWORD=1234
   export CORS_ALLOWED_ORIGINS=http://localhost:3000
   ./mvnw spring-boot:run
   ```

5. The backend will be available at http://localhost:8080

### Frontend Setup

#### Prerequisites
- Node.js 20+ 
- npm or yarn

#### Steps

1. Navigate to the frontend directory:
   ```bash
   cd todo-frontend-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```bash
   echo "NEXT_PUBLIC_API_BASE_URL=http://localhost:8080" > .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. The frontend will be available at http://localhost:3000

## Environment Variables

### Frontend (Next.js)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API base URL | `/api` | No |

Create a `.env.local` file in `todo-frontend-main/` for local development:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Backend (Spring Boot)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `SPRING_DATASOURCE_URL` | PostgreSQL connection URL | `jdbc:postgresql://localhost:5432/todo_db` | Yes |
| `SPRING_DATASOURCE_USERNAME` | Database username | `postgres` | Yes |
| `SPRING_DATASOURCE_PASSWORD` | Database password | `1234` | Yes |
| `CORS_ALLOWED_ORIGINS` | Allowed CORS origins (comma-separated) | `http://localhost:3000` | No |

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

### List Endpoints
- `GET /api/lists` - Get all lists
- `POST /api/lists` - Create a new list
- `PUT /api/lists/{id}` - Update a list
- `DELETE /api/lists/{id}` - Delete a list

### Health Check
- `GET /actuator/health` - Application health status

## Project Structure

```
.
├── docker-compose.yml          # Docker Compose configuration
├── .env.example               # Environment variables template
├── todo-backend/              # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
└── todo-frontend-main/        # Next.js frontend
    ├── app/
    ├── components/
    ├── lib/
    ├── package.json
    └── Dockerfile
```

## Development Workflow

1. Make changes to the code
2. For backend: Run tests with `./mvnw test`
3. For frontend: Check with `npm run build`
4. Test locally before committing
5. Build with Docker to ensure everything works in containers

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running and accessible
- Check database credentials in environment variables
- Verify the database exists: `createdb todo_db`

### CORS Errors
- Check that `CORS_ALLOWED_ORIGINS` includes your frontend URL
- For local development: `http://localhost:3000`
- For Docker: `http://backend:8080`

### Port Already in Use
- Frontend (3000): `lsof -ti:3000 | xargs kill -9`
- Backend (8080): `lsof -ti:8080 | xargs kill -9`
- Database (5432): `lsof -ti:5432 | xargs kill -9`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Create a Pull Request

## License

This project is open source and available under the MIT License.
