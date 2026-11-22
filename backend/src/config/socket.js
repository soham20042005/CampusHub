import { Server } from 'socket.io';

let io = null;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL || 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO Client Connected]: ${socket.id}`);

    // Join user-specific notification room
    socket.on('join_user_room', (userId) => {
      socket.join(`user_${userId}`);
      console.log(`Socket ${socket.id} joined room user_${userId}`);
    });

    // Join role-specific broadcast room (e.g. STUDENT, FACULTY)
    socket.on('join_role_room', (role) => {
      socket.join(`role_${role}`);
      console.log(`Socket ${socket.id} joined room role_${role}`);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO Client Disconnected]: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.warn('[Socket.IO]: Server instance not initialized yet');
  }
  return io;
};

export const emitToUser = (userId, event, payload) => {
  if (io) {
    io.to(`user_${userId}`).emit(event, payload);
  }
};

export const emitToRole = (role, event, payload) => {
  if (io) {
    io.to(`role_${role}`).emit(event, payload);
  }
};

export const broadcastEvent = (event, payload) => {
  if (io) {
    io.emit(event, payload);
  }
};
