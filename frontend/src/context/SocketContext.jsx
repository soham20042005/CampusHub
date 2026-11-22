import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const socketInstance = io('http://localhost:5000', {
      withCredentials: true,
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      socketInstance.emit('join_user_room', user.id);
      socketInstance.emit('join_role_room', user.role);
    });

    // Listen for events
    socketInstance.on('new_campus_event', (data) => {
      addNotification({ id: Date.now(), type: 'event', ...data });
    });

    socketInstance.on('new_placement_drive', (data) => {
      addNotification({ id: Date.now(), type: 'placement', ...data });
    });

    socketInstance.on('new_announcement', (data) => {
      addNotification({ id: Date.now(), type: 'announcement', ...data });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  const addNotification = (item) => {
    setNotifications((prev) => [item, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <SocketContext.Provider value={{ socket, notifications, removeNotification }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
