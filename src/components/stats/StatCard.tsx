import React from 'react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color = 'bg-blue-500' }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-600 text-sm font-semibold mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-bold text-slate-800">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-2xl text-white shadow-lg border-2 border-white/30`}>
          {icon}
        </div>
      </div>
    </div>
  );
};