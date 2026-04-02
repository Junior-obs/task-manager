import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-6 animate-fade-in">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
      <input
        type="text"
        placeholder="Rechercher une tâche..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-11 py-3.5 bg-white/70 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-slate-800 font-medium placeholder-slate-500"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 rounded-lg p-1 transition-all"
          aria-label="Effacer la recherche"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
};