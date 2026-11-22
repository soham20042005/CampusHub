# CampusHub Enterprise

CampusHub is a full-stack college management system for students, faculty, administrators, placement officers, and club heads. It combines REST APIs with real-time Socket.IO notifications and a role-aware React interface.

## Features

- JWT authentication with refresh token rotation
- Role-based access for administrators, students, faculty, placement officers, and club heads
- Academic structure, departments, courses, subjects, and student enrollments
- Timetables and attendance management
- Assignments and assignment submissions
- Clubs, memberships, and event registrations
- Placement drives, companies, applications, and application statuses
- Announcements and real-time notifications
- Protected React routes and role-specific navigation

## Tech Stack

### Frontend

- React 18
- Vite 5
- React Router
- Axios
- Tailwind CSS
- Socket.IO Client
- Lucide React

### Backend

- Node.js with ECMAScript modules
- Express
- Prisma ORM
- PostgreSQL
- JSON Web Tokens
- Socket.IO
- Zod
- bcrypt

## Project Structure

```text
.
|-- backend/
|   |-- prisma/
|   |   `-- schema.prisma
|   `-- src/
|       |-- config/
|       |-- controllers/
|       |-- middlewares/
|       |-- repositories/
|       |-- routes/
|       |-- services/
|       |-- validation/
|       |-- app.js
|       `-- server.js
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   |-- services/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   |-- index.html
|   `-- vite.config.js
`-- Readme.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL 13 or newer
- Git

## Installation

Clone the repository and install dependencies in both applications.

```powershell
git clone <repository-url>
cd "full stack"

cd backend
npm install

cd ..\frontend
npm install
```

## Environment Setup

Create the backend environment file from the provided example:

```powershell
cd backend
Copy-Item .env.example .env
```

Update `backend/.env` as needed:

```dotenv
NODE_ENV=development
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/campushub_db?schema=public"
JWT_ACCESS_SECRET="replace-with-a-long-random-access-secret"
JWT_REFRESH_SECRET="replace-with-a-long-random-refresh-secret"
JWT_ACCESS_EXPIRATION="15m"
JWT_REFRESH_EXPIRATION="7d"
CLIENT_URL="http://localhost:5173"
```

Replace the example database credentials and JWT secrets before running the application. Never commit the real `backend/.env` file.

## Database Setup

Create a PostgreSQL database named `campushub_db`, then run Prisma generation and migrations:

```powershell
cd backend
npx prisma generate
npx prisma migrate dev
```

To open the Prisma database browser:

```powershell
npx prisma studio
```

## Running the Application

Start the backend in one terminal:

```powershell
cd backend
npm run dev
```

The API will be available at `http://localhost:5000`, with a health check at `http://localhost:5000/health`.

Start the frontend in a second terminal:

```powershell
cd frontend
npm run dev
```

Open `http://localhost:5173` in your browser. Vite proxies `/api` requests to `http://localhost:5000`.

## API Routes

All API endpoints are mounted below `/api/v1`.

| Area | Base route |
| --- | --- |
| Authentication | `/api/v1/auth` |
| Users | `/api/v1/users` |
| Academic data | `/api/v1/academic` |
| Timetable | `/api/v1/timetable` |
| Attendance | `/api/v1/attendance` |
| Assignments | `/api/v1/assignments` |
| Clubs | `/api/v1/clubs` |
| Placements | `/api/v1/placements` |
| Announcements | `/api/v1/announcements` |

Additional server endpoints:

- `GET /health` - API health status
- Socket.IO server - `http://localhost:5000`

## Available Scripts

### Backend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the backend with Node watch mode |
| `npm start` | Start the backend |
| `npm run prisma:generate` | Generate the Prisma client |
| `npm run prisma:migrate` | Create and apply a development migration |
| `npm run prisma:studio` | Open Prisma Studio |

### Frontend

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |

## Frontend Pages

- `/login` - User login
- `/register` - Account registration
- `/` - Dashboard
- `/attendance` - Attendance view
- `/placements` - Placement drives and applications
- `/users` - User administration for `ADMIN` users

## Real-Time Events

Authenticated users join their user and role rooms through Socket.IO. The frontend listens for:

- Campus events
- Placement drives
- Announcements

## Git Ignore

The frontend and backend maintain separate `.gitignore` files to exclude:

- `node_modules`
- Build and coverage output
- Environment files
- Log and temporary files
- Editor settings and operating-system files

The example environment file (`.env.example`) is retained in Git.

## Production Checklist

Before deploying:

1. Replace all development JWT secrets and database credentials.
2. Set `NODE_ENV=production`.
3. Set `CLIENT_URL` to the deployed frontend origin.
4. Configure HTTPS and secure cookie settings.
5. Run Prisma migrations against the production database.
6. Build and serve the frontend from `frontend/dist`.
7. Configure a production Socket.IO and reverse-proxy origin as needed.