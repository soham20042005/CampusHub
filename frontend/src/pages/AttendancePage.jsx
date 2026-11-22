import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { CalendarCheck, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AttendancePage() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data } = await api.get('/attendance/student');
        setAttendanceRecords(data.data.records);
      } catch (err) {
        console.error('Failed to fetch attendance:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  const total = attendanceRecords.length;
  const present = attendanceRecords.filter((r) => r.status === 'PRESENT').length;
  const percentage = total > 0 ? ((present / total) * 100).toFixed(1) : 100;
  const isLow = percentage < 75.0;

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Attendance Ledger & Percentage Tracker</h1>
        <p className="text-xs text-slate-400 mt-1">Real-time lecture attendance records and 75% threshold analysis</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <span className="text-xs text-slate-400">Total Lectures</span>
          <div className="text-2xl font-bold text-white mt-1">{total}</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <span className="text-xs text-slate-400">Attended Lectures</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">{present}</div>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800">
          <span className="text-xs text-slate-400">Attendance Percentage</span>
          <div className={`text-2xl font-bold mt-1 ${isLow ? 'text-rose-400' : 'text-brand-400'}`}>
            {percentage}%
          </div>
          {isLow && (
            <div className="text-[10px] text-rose-400 flex items-center gap-1 mt-1 font-semibold">
              <AlertTriangle className="w-3 h-3" /> Below 75% threshold warning!
            </div>
          )}
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-brand-400" />
            Lecture History
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">Subject</th>
                <th className="px-6 py-3.5">Lecture Date</th>
                <th className="px-6 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-400">Loading attendance ledger...</td>
                </tr>
              ) : attendanceRecords.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-slate-400">No lecture attendance records logged yet.</td>
                </tr>
              ) : (
                attendanceRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4 font-semibold text-slate-200">
                      {r.session?.allocation?.subject?.name || 'Data Structures'} ({r.session?.allocation?.subject?.code || 'CS301'})
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(r.session?.sessionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 font-bold text-[10px] px-2.5 py-0.5 rounded-full border ${
                        r.status === 'PRESENT'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}>
                        {r.status === 'PRESENT' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
