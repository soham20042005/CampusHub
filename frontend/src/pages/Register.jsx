import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Mail, Lock, User, Phone, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT',
    phone: '',
    rollNumber: '',
    employeeId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 p-6 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/25">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight gradient-text">Create Account</h2>
          <p className="text-xs text-slate-400 mt-1">Register for CampusHub Enterprise ERP</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2 text-xs text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="john.doe@university.edu"
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">System Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:border-brand-500 outline-none"
              >
                <option value="STUDENT">STUDENT</option>
                <option value="FACULTY">FACULTY</option>
                <option value="PLACEMENT_OFFICER">PLACEMENT OFFICER</option>
                <option value="CLUB_HEAD">CLUB HEAD</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {formData.role === 'STUDENT' ? 'Roll Number' : 'Employee ID'}
              </label>
              <input
                type="text"
                name={formData.role === 'STUDENT' ? 'rollNumber' : 'employeeId'}
                value={formData.role === 'STUDENT' ? formData.rollNumber : formData.employeeId}
                onChange={handleChange}
                placeholder={formData.role === 'STUDENT' ? '2024CSE001' : 'FAC202401'}
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-brand-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50 mt-2"
          >
            {loading ? 'Creating Account...' : 'Complete Registration'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
