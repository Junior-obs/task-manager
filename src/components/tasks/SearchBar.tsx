import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-11 pr-10 py-3 border border-slate-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all bg-white"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700"
          aria-label="Effacer la recherche"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};