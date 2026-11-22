import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  BookOpen,
  CalendarCheck,
  Briefcase,
  Award,
  Megaphone,
  TrendingUp,
  Clock,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { label: 'Active Students', value: '1,280', change: '+12% this batch', icon: Users, color: 'text-sky-400', bg: 'bg-sky-500/10 border-sky-500/20' },
    { label: 'Faculty Members', value: '84', change: 'Across 6 Depts', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Overall Attendance', value: '88.4%', change: 'Campus Average', icon: CalendarCheck, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Active Placement Drives', value: '14', change: 'Avg 12.5 LPA', icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative rounded-2xl glass-card p-6 border border-slate-800 overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-gradient-to-tr from-brand-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 uppercase tracking-wider">
                {user?.role} Portal
              </span>
              <span className="text-xs text-slate-400">Academic Year 2026-2027</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Welcome, {user?.firstName} {user?.lastName}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              CampusHub Enterprise ERP centralizing academic management, timetable schedules, attendance tracking, and campus placement drives.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">System Status</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-400">{item.label}</span>
                <div className={`p-2.5 rounded-xl border ${item.bg}`}>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
              </div>
              <div className="text-2xl font-extrabold text-white mt-3">{item.value}</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-emerald-400" />
                <span>{item.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Feature Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Modules Overview */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-brand-400" />
              Core Academic Modules
            </h3>
            <span className="text-xs text-brand-400 font-semibold">Active Semester</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Link to="/timetable" className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/40 transition group">
              <div className="flex items-center justify-between mb-2">
                <Clock className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-400 font-medium uppercase">Timetable</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">Class Schedule Grid</h4>
              <p className="text-xs text-slate-400 mt-1">View weekly lecture slots & room allocations</p>
            </Link>

            <Link to="/attendance" className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/40 transition group">
              <div className="flex items-center justify-between mb-2">
                <CalendarCheck className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-400 font-medium uppercase">Attendance</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">Attendance Ledger</h4>
              <p className="text-xs text-slate-400 mt-1">Track lecture attendance & 75% threshold alerts</p>
            </Link>

            <Link to="/assignments" className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/40 transition group">
              <div className="flex items-center justify-between mb-2">
                <BookOpen className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-400 font-medium uppercase">Grading</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">Assignments & Evaluation</h4>
              <p className="text-xs text-slate-400 mt-1">Submit course assignments & view grades</p>
            </Link>

            <Link to="/placements" className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition group">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-[10px] text-slate-400 font-medium uppercase">Placements</span>
              </div>
              <h4 className="text-sm font-bold text-slate-200">Corporate ATS Drive</h4>
              <p className="text-xs text-slate-400 mt-1">Apply for placement drives with CGPA rules</p>
            </Link>
          </div>
        </div>

        {/* Quick Announcements & Actions */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Megaphone className="w-4 h-4 text-amber-400" />
              Latest Announcements
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-brand-400 uppercase">Academic Notice</span>
                <h5 className="text-xs font-bold text-slate-200 mt-0.5">Mid-Semester Exam Timetable Published</h5>
                <p className="text-[11px] text-slate-400 mt-1">Exams scheduled from Aug 10 to Aug 18 across all engineering departments.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] font-bold text-emerald-400 uppercase">Placement Alert</span>
                <h5 className="text-xs font-bold text-slate-200 mt-0.5">Google Software Engineer Placement Drive</h5>
                <p className="text-[11px] text-slate-400 mt-1">Applications close this Friday. Minimum CGPA threshold: 7.50.</p>
              </div>
            </div>
          </div>

          <Link
            to="/announcements"
            className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-1.5 transition"
          >
            <PlusCircle className="w-4 h-4 text-brand-400" />
            View All Broadcasts
          </Link>
        </div>
      </div>
    </div>
  );
}
