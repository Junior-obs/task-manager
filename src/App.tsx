import { useState } from 'react';
import { FilterBar } from './components/tasks/FilterBar';
import { type FilterOptions } from './components/types';

function App() {
  // 1. Initialise l'état de tes filtres (avec category !)
  const [filters, setFilters] = useState<FilterOptions>({
    status: 'all',
    priority: 'all',
    category: 'all'
  });
const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
  setFilters((prev: FilterOptions) => ({ 
    ...prev, 
    ...newFilters 
  }));
};

  const handleReset = () => {
    setFilters({ status: 'all', priority: 'all', category: 'all' });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Gestionnaire de Tâches</h1>
      
      {/* 2. Affiche ton composant FilterBar ici */}
      <div className="max-w-4xl mx-auto">
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onReset={handleReset} 
        />
        
        {/* Ici tu pourras ajouter ta liste de tâches plus tard */}
      </div>
    </div>
  );
}

export default App;