import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Briefcase, Building, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

export default function PlacementsPage() {
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const fetchDrives = async () => {
      try {
        const { data } = await api.get('/placements/drives');
        setDrives(data.data.drives);
      } catch (err) {
        console.error('Failed to fetch drives:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDrives();
  }, []);

  const handleApply = async (driveId) => {
    setApplyingId(driveId);
    setMsg(null);
    try {
      await api.post(`/placements/drives/${driveId}/apply`);
      setMsg({ type: 'success', text: 'Application submitted successfully to corporate HR!' });
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Application failed eligibility criteria check.' });
    } finally {
      setApplyingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Corporate Placements & ATS Portal</h1>
        <p className="text-xs text-slate-400 mt-1">Browse active campus placement drives and verify automated CGPA eligibility</p>
      </div>

      {msg && (
        <div className={`p-4 rounded-xl text-xs border flex items-center gap-2 ${
          msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Drives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-slate-400 text-xs">Loading corporate drives...</div>
        ) : drives.length === 0 ? (
          <div className="col-span-full text-center py-12 text-slate-400 text-xs">No active placement drives scheduled.</div>
        ) : (
          drives.map((d) => (
            <div key={d.id} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 uppercase">
                    {d.company?.industry || 'Technology'}
                  </span>
                  <div className="flex items-center text-emerald-400 font-extrabold text-xs gap-0.5">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>{d.packageLPA} LPA</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-white">{d.jobTitle}</h3>
                <h4 className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-medium">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  {d.company?.name || 'Corporate Partner'}
                </h4>

                <p className="text-xs text-slate-400 mt-3 line-clamp-2 leading-relaxed">
                  {d.jobDescription}
                </p>

                {/* Eligibility Badges */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Min CGPA: <strong className="text-slate-200">{d.minCgpa}</strong></span>
                  <span className="text-slate-400">Max Backlogs: <strong className="text-slate-200">{d.maxBacklogs}</strong></span>
                </div>
              </div>

              <button
                onClick={() => handleApply(d.id)}
                disabled={applyingId === d.id}
                className="mt-5 w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-brand-500/20 transition disabled:opacity-50"
              >
                {applyingId === d.id ? 'Verifying Eligibility...' : 'Apply Now'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
