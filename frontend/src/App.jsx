import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';

import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/UsersPage';
import AttendancePage from './pages/AttendancePage';
import PlacementsPage from './pages/PlacementsPage';

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes Layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/placements" element={<PlacementsPage />} />

                {/* Admin Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
                  <Route path="/users" element={<UsersPage />} />
                </Route>
              </Route>
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </AuthProvider>
  );
}
