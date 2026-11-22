import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ToastContainer from './ToastContainer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
