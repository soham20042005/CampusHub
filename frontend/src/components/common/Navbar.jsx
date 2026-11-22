import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { LogOut, Bell, Shield, User, GraduationCap, Briefcase, Award } from 'lucide-react';

const roleIcons = {
  ADMIN: Shield,
  STUDENT: GraduationCap,
  FACULTY: User,
  PLACEMENT_OFFICER: Briefcase,
  CLUB_HEAD: Award,
};

const roleColors = {
  ADMIN: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  STUDENT: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  FACULTY: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  PLACEMENT_OFFICER: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  CLUB_HEAD: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export default function Navbar() {
  const { user, logout } = useAuth();
  const { notifications } = useSocket() || {};
  const RoleIcon = roleIcons[user?.role] || User;

  return (
    <header className="h-16 border-b border-slate-800/80 bg-navy-900/60 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Brand Title */}
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-lg tracking-tight gradient-text">CampusHub</h1>
          <span className="text-[10px] text-slate-400 block -mt-1 font-medium tracking-widest uppercase">
            Enterprise ERP
          </span>
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="w-9 h-9 rounded-lg border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-300 hover:text-white hover:border-slate-700 transition">
            <Bell className="w-4 h-4" />
            {notifications?.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-pulse">
                {notifications.length}
              </span>
            )}
          </button>
        </div>

        {/* User Identity & Role Badge */}
        <div className="flex items-center space-x-3 border-l border-slate-800 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">
              {user?.firstName} {user?.lastName}
            </p>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                roleColors[user?.role]
              }`}
            >
              <RoleIcon className="w-3 h-3" />
              {user?.role}
            </span>
          </div>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold text-sm">
            {user?.firstName?.[0]}
          </div>

          {/* Logout Button */}
          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
