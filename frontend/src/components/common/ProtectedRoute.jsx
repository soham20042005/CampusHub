import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Loading CampusHub Portal...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
