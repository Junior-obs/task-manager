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
    <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <h3 className="font-bold text-slate-700">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-rose-600 hover:text-rose-700 flex items-center gap-1 font-medium"
            aria-label="Réinitialiser les filtres"
          >
            <X size={14} />
            Réinitialiser
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Statut</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as FilterOptions['status'] })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white shadow-sm transition-all"
          >
            <option value="all">Tous</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Priorité</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value as FilterOptions['priority'] })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white shadow-sm transition-all"
          >
            <option value="all">Toutes</option>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value as FilterOptions['category'] })}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent bg-white shadow-sm transition-all"
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