import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Search, Shield, User, GraduationCap, Briefcase, Award, CheckCircle, XCircle } from 'lucide-react';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (role) params.role = role;

      const { data } = await api.get('/users', { params });
      setUsers(data.data.users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const handleStatusToggle = async (userId, currentStatus) => {
    try {
      await api.patch(`/users/${userId}/status`, { isActive: !currentStatus });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Status toggle failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">User Directory Management</h1>
          <p className="text-xs text-slate-400 mt-1">Manage system accounts, roles, and status across all departments</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="glass-card rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchUsers()}
            placeholder="Search by name, email, roll number, employee ID..."
            className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">ADMIN</option>
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="PLACEMENT_OFFICER">PLACEMENT OFFICER</option>
          <option value="CLUB_HEAD">CLUB HEAD</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Identifier</th>
                <th className="px-6 py-3.5">Department</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">Loading user records...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400">No users found matching search criteria.</td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-800/30 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                          {u.firstName[0]}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-200">{u.firstName} {u.lastName}</div>
                          <div className="text-[11px] text-slate-400">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-brand-400 border border-slate-700">
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-300">
                      {u.studentProfile?.rollNumber || u.facultyProfile?.employeeId || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      {u.studentProfile?.department?.name || u.facultyProfile?.department?.name || 'General'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 font-semibold text-[11px] ${u.isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {u.isActive ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                        {u.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleStatusToggle(u.id, u.isActive)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition ${
                          u.isActive
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                        }`}
                      >
                        {u.isActive ? 'Deactivate' : 'Activate'}
                      </button>
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
