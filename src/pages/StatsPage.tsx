
import { useTaskContext } from '../context/TaskContext';
import type { Task } from '../types';
import { StatCard } from '../components/stats/StatCard';
import { BarChart3, CheckCircle, Clock, TrendingUp, Award, Filter } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { StatData } from '../types';

const calculateStats = (tasks: Task[]) => {
  const total = tasks.length;
  const byStatus = { todo: 0, 'in-progress': 0, done: 0 };
  const byPriority = { low: 0, medium: 0, high: 0 };
  const byCategory: Record<string, number> = {};

  tasks.forEach((task) => {
    byStatus[task.status]++;
    byPriority[task.priority]++;
    byCategory[task.category] = (byCategory[task.category] || 0) + 1;
  });

  const doneCount = byStatus.done;
  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return {
    total,
    byStatus,
    byPriority,
    byCategory,
    completionRate,
  } as StatData;
};

export const StatsPage = () => {
  const { tasks } = useTaskContext();
  const stats = calculateStats(tasks);

  const statusChartData = [
    { name: 'À faire', value: stats.byStatus.todo, fill: '#ef4444' },
    { name: 'En cours', value: stats.byStatus['in-progress'], fill: '#3b82f6' },
    { name: 'Terminé', value: stats.byStatus.done, fill: '#10b981' },
  ];

  const priorityChartData = Object.entries(stats.byPriority).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
    fill: name === 'high' ? '#ef4444' : name === 'medium' ? '#f59e0b' : '#10b981',
  }));

  const topCategories = Object.entries(stats.byCategory)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 3)
    .map(([name, value]) => ({
      name,
      value,
      fill: '#8b5cf6',
    }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
          📊
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Statistiques
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Visualisez la progression de vos tâches et identifiez vos habitudes
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          title="Total tâches"
          value={stats.total.toLocaleString()}
          icon={<BarChart3 className="w-8 h-8" />}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          title="Taux complétion"
          value={`${stats.completionRate}%`}
          icon={<CheckCircle className="w-8 h-8" />}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="En cours"
          value={stats.byStatus['in-progress']}
          icon={<Clock className="w-8 h-8" />}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
        />
        <StatCard
          title="Priorité haute"
          value={stats.byPriority.high}
          icon={<TrendingUp className="w-8 h-8" />}
          color="bg-gradient-to-br from-red-500 to-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Status Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            Distribution par statut
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={statusChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Priority Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="w-8 h-8 text-amber-600" />
            Distribution par priorité
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={priorityChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Categories */}
      {topCategories.length > 0 && (
        <div className="mt-12 bg-white rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Filter className="w-8 h-8 text-purple-600" />
            Catégories les plus actives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCategories.map((category, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{category.name.slice(0,2).toUpperCase()}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{category.name}</h4>
                <p className="text-3xl font-bold text-purple-600">{category.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-center py-24">
          <BarChart3 className="w-24 h-24 text-gray-300 mx-auto mb-8" />
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Aucune donnée</h3>
          <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
            Ajoutez vos premières tâches pour voir vos statistiques
          </p>
          <a
            href="/add"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            + Ajouter ma première tâche
          </a>
        </div>
      )}
    </div>
  );
};

