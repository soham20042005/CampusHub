import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950 p-6 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-brand-500/25">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight gradient-text">Welcome Back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to your CampusHub Portal account</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-2.5 text-xs text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-400 hover:underline font-semibold">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
