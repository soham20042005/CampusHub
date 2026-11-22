import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { initSocket } from './config/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.IO Server Instance
initSocket(server);

server.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`🚀 CampusHub Backend (JavaScript) running on port ${PORT}`);
  console.log(`⚡ Socket.IO Engine Initialized`);
  console.log(`📍 Health Check: http://localhost:${PORT}/health`);
  console.log(`==================================================`);
});

// Graceful Shutdown Handler
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received. Closing HTTP server...');
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });
});
