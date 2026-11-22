import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import academicRoutes from './routes/academic.routes.js';
import timetableRoutes from './routes/timetable.routes.js';
import attendanceRoutes from './routes/attendance.routes.js';
import assignmentRoutes from './routes/assignment.routes.js';
import clubRoutes from './routes/club.routes.js';
import placementRoutes from './routes/placement.routes.js';
import announcementRoutes from './routes/announcement.routes.js';

const app = express();

// Global Middlewares
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

// API v1 Routes Mounting
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/academic', academicRoutes);
app.use('/api/v1/timetable', timetableRoutes);
app.use('/api/v1/attendance', attendanceRoutes);
app.use('/api/v1/assignments', assignmentRoutes);
app.use('/api/v1/clubs', clubRoutes);
app.use('/api/v1/placements', placementRoutes);
app.use('/api/v1/announcements', announcementRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'CampusHub Enterprise API is running smoothly (JavaScript ES Modules)',
    timestamp: new Date().toISOString(),
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('[CampusHub Error]:', err.stack || err);
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

export default app;
