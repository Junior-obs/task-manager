import { useTaskContext } from '../context/TaskContext';
import { useProtectedRoute } from '../hooks/useProtectedRoute';
import { StatCard } from '../components/stats/StatCard';
import {
  BarChart3,
  TrendingUp,
  Award,
  Filter,
  Calendar,
  AlertCircle,
  PieChart,
  Target,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from 'recharts';
import { useMemo } from 'react';

interface Stats {
  total: number;
  byStatus: { todo: number; 'in-progress': number; done: number };
  byPriority: { low: number; medium: number; high: number };
  byCategory: Record<string, number>;
  completionRate: number;
  overdueCount: number;
  averageCompletionTime: number;
}

const COLORS = {
  todo: '#ef4444',
  'in-progress': '#3b82f6',
  done: '#10b981',
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
};

export const StatsPage = () => {
  const { tasks } = useTaskContext();
  useProtectedRoute();

  const stats = useMemo((): Stats => {
    const total = tasks.length;
    const byStatus = { todo: 0, 'in-progress': 0, done: 0 };
    const byPriority = { low: 0, medium: 0, high: 0 };
    const byCategory: Record<string, number> = {};
    let overdueCount = 0;
    let totalCompletionDays = 0;
    let completedTasksCount = 0;
    const now = new Date();

    tasks.forEach((task) => {
      byStatus[task.status]++;
      byPriority[task.priority]++;
      byCategory[task.category] = (byCategory[task.category] || 0) + 1;

      if (task.status !== 'done' && new Date(task.dueDate) < now) overdueCount++;

      if (task.status === 'done' && task.createdAt && task.updatedAt) {
        const created = new Date(task.createdAt);
        const updated = new Date(task.updatedAt);
        const days = Math.ceil((updated.getTime() - created.getTime()) / (1000 * 3600 * 24));
        totalCompletionDays += days;
        completedTasksCount++;
      }
    });

    const completionRate = total > 0 ? Math.round((byStatus.done / total) * 100) : 0;
    const averageCompletionTime = completedTasksCount > 0 ? Math.round(totalCompletionDays / completedTasksCount) : 0;

    return { total, byStatus, byPriority, byCategory, completionRate, overdueCount, averageCompletionTime };
  }, [tasks]);

  const statusChartData = [
    { name: 'À faire', value: stats.byStatus.todo, color: COLORS.todo },
    { name: 'En cours', value: stats.byStatus['in-progress'], color: COLORS['in-progress'] },
    { name: 'Terminé', value: stats.byStatus.done, color: COLORS.done },
  ].filter(item => item.value > 0);

  const priorityChartData = [
    { name: 'Haute', value: stats.byPriority.high, color: COLORS.high },
    { name: 'Moyenne', value: stats.byPriority.medium, color: COLORS.medium },
    { name: 'Basse', value: stats.byPriority.low, color: COLORS.low },
  ].filter(item => item.value > 0);

  const categoryChartData = Object.entries(stats.byCategory)
    .map(([name, value]) => ({ name, value, color: '#8b5cf6' }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec icône */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <PieChart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
            Tableau de bord
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-2xl mx-auto">
            Analysez votre productivité et suivez l'évolution de vos tâches
          </p>
        </div>

        {/* Cartes KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total tâches" value={stats.total} icon={<BarChart3 className="w-6 h-6" />} color="from-blue-500 to-blue-600" />
          <StatCard title="Taux de complétion" value={`${stats.completionRate}%`} icon={<Target className="w-6 h-6" />} color="from-emerald-500 to-emerald-600" />
          <StatCard title="Tâches en retard" value={stats.overdueCount} icon={<AlertCircle className="w-6 h-6" />} color="from-red-500 to-red-600" />
          <StatCard title="Temps moyen" value={`${stats.averageCompletionTime} j`} icon={<Calendar className="w-6 h-6" />} color="from-purple-500 to-purple-600" />
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Barres horizontales : statut */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl"><BarChart3 className="w-5 h-5 text-blue-600" /></div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Répartition par statut</h3>
            </div>
            {statusChartData.length ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={statusChartData} layout="vertical" margin={{ left: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={80} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '12px', border: 'none' }} />
{statusChartData.map((e, i) => <Cell key={`status-${e.name}`} fill={e.color} />)}
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState message="Aucune donnée de statut" />}
          </div>

          {/* Camembert : priorité */}
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl"><Award className="w-5 h-5 text-amber-600" /></div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Priorités</h3>
            </div>
            {priorityChartData.length ? (
              <ResponsiveContainer width="100%" height={320}>
                <RePieChart>
                  <Pie data={priorityChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
{priorityChartData.map((e, i) => <Cell key={`priority-${e.name}`} fill={e.color} />)}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            ) : <EmptyState message="Aucune donnée de priorité" />}
          </div>
        </div>

        {/* Deuxième ligne : catégories + résumé */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-slate-200/50 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl"><Filter className="w-5 h-5 text-purple-600" /></div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Catégories principales</h3>
            </div>
            {categoryChartData.length ? (
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={categoryChartData} layout="vertical" margin={{ left: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : <EmptyState message="Aucune catégorie" />}
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Résumé</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-white/20 pb-2"><span>Productivité globale</span><span className="font-bold">{stats.completionRate}%</span></div>
                <div className="flex justify-between border-b border-white/20 pb-2"><span>Tâches terminées</span><span className="font-bold">{stats.byStatus.done}</span></div>
                <div className="flex justify-between border-b border-white/20 pb-2"><span>En retard</span><span className="font-bold text-yellow-200">{stats.overdueCount}</span></div>
                <div className="flex justify-between"><span>Moyenne de complétion</span><span className="font-bold">{stats.averageCompletionTime} jours</span></div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-white/20 text-sm opacity-80">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</div>
          </div>
        </div>

        {/* État vide */}
        {tasks.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="inline-block p-6 bg-white/80 rounded-3xl shadow-xl mb-6"><BarChart3 className="w-24 h-24 text-slate-400" /></div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Aucune donnée disponible</h3>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">Commencez par créer des tâches pour visualiser vos statistiques.</p>
            <a href="/add" className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all active:scale-95">+ Créer une tâche</a>
          </div>
        )}
      </div>
    </div>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center h-64 text-slate-400">
    <div className="text-center"><BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>{message}</p></div>
  </div>
);