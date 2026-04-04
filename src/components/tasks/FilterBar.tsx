import React from 'react';
import type { FilterOptions } from '../../types';
import { statusLabels, priorityLabels, categoryLabels } from '../../types';
import { X } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
  onReset: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const hasActiveFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.category !== 'all';

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl border border-white/20 p-6 mb-6 shadow-xl hover:shadow-2xl transition-all animate-fade-in">
      <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
        <h3 className="font-bold text-slate-800 text-lg">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1.5 font-semibold active:scale-95 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-all"
            aria-label="Réinitialiser les filtres"
          >
            <X size={16} />
            Réinitialiser
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Statut</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as FilterOptions['status'] })}
            className="w-full px-4 py-2.5 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/80 transition-all text-slate-700 font-medium shadow-md"
          >
            <option value="all">Tous</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Priorité</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value as FilterOptions['priority'] })}
            className="w-full px-4 py-2.5 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/80 transition-all text-slate-700 font-medium shadow-md"
          >
            <option value="all">Toutes</option>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-2">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value as FilterOptions['category'] })}
            className="w-full px-4 py-2.5 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent hover:bg-white/80 transition-all text-slate-700 font-medium shadow-md"
          >
            <option value="all">Toutes</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};