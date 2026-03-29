import React from 'react';
import {  type FilterOptions , statusLabels, priorityLabels, categoryLabels } from '../types';
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
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700">Filtres</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <X size={14} />
            Réinitialiser
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Statut</label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value as FilterOptions['status'] })}
            className="input-field"
          >
            <option value="all">Tous</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
          <select
            value={filters.priority}
            onChange={(e) => onFilterChange({ priority: e.target.value as FilterOptions['priority'] })}
            className="input-field"
          >
            <option value="all">Toutes</option>
            {Object.entries(priorityLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value as FilterOptions['category'] })}
            className="input-field"
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