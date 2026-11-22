import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  CalendarCheck,
  Clock,
  FileText,
  Award,
  Briefcase,
  Megaphone,
} from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role;

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, roles: ['ADMIN', 'STUDENT', 'FACULTY', 'PLACEMENT_OFFICER', 'CLUB_HEAD'] },
    { label: 'User Directory', path: '/users', icon: Users, roles: ['ADMIN'] },
    { label: 'Academic Catalog', path: '/academic', icon: BookOpen, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
    { label: 'Timetable Schedule', path: '/timetable', icon: Clock, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
    { label: 'Attendance Ledger', path: '/attendance', icon: CalendarCheck, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
    { label: 'Assignments', path: '/assignments', icon: FileText, roles: ['ADMIN', 'FACULTY', 'STUDENT'] },
    { label: 'Clubs & Events', path: '/clubs', icon: Award, roles: ['ADMIN', 'STUDENT', 'FACULTY', 'CLUB_HEAD'] },
    { label: 'Placements ATS', path: '/placements', icon: Briefcase, roles: ['ADMIN', 'STUDENT', 'PLACEMENT_OFFICER'] },
    { label: 'Announcements', path: '/announcements', icon: Megaphone, roles: ['ADMIN', 'STUDENT', 'FACULTY', 'PLACEMENT_OFFICER', 'CLUB_HEAD'] },
  ];

  const filteredItems = navItems.filter((item) => item.roles.includes(role));

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-navy-900/40 backdrop-blur-xl flex flex-col p-4 space-y-1 shrink-0">
      <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2">
        Main Navigation
      </div>

      {filteredItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
              }`
            }
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </aside>
  );
}
