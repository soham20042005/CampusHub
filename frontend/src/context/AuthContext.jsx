import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth state on app load
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const { data } = await api.get('/auth/me');
          setUser(data.data.user);
        }
      } catch (err) {
        console.error('Session restore failed:', err);
        localStorage.removeItem('accessToken');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { user: userData, accessToken } = data.data;

    localStorage.setItem('accessToken', accessToken);
    setUser(userData);
    return userData;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('accessToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
