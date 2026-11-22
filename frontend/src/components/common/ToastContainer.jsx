import React from 'react';
import { useSocket } from '../../context/SocketContext';
import { Bell, X, Award, Briefcase, Megaphone } from 'lucide-react';

const iconMap = {
  event: Award,
  placement: Briefcase,
  announcement: Megaphone,
};

export default function ToastContainer() {
  const { notifications, removeNotification } = useSocket() || {};

  if (!notifications || notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-3 max-w-sm w-full">
      {notifications.map((item) => {
        const Icon = iconMap[item.type] || Bell;
        return (
          <div
            key={item.id}
            className="glass-card rounded-xl p-4 border border-brand-500/30 shadow-2xl flex items-start space-x-3 animate-slide-up"
          >
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 shrink-0">
              <Icon className="w-4 h-4" />
            </div>

            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-bold text-white capitalize">{item.type} Alert</h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-snug">{item.message || item.title}</p>
            </div>

            <button
              onClick={() => removeNotification(item.id)}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
