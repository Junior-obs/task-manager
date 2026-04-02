import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Clock, 
  ListTodo, 
  Plus, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  Award,
  Sparkles,
  ArrowRight,
  BarChart3,
  Target,
  Zap,
  Star
} from 'lucide-react';
import { useTaskContext } from '../context/TaskContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { tasks } = useTaskContext();
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Calculs avancés
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const pendingTasks = totalTasks - completedTasks;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const highPriorityCount = tasks.filter(t => t.priority === 'high').length;
  const urgentTasks = tasks.filter(t => {
    const dueDate = new Date(t.dueDate);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && t.status !== 'done';
  }).length;

  // Tâches par catégorie pour le graphique
  const categoryLabels = { personal: 'Personnel', work: 'Travail', shopping: 'Courses', health: 'Santé', other: 'Autre' };
  const categoryIcons = { personal: '👤', work: '💼', shopping: '🛒', health: '🏥', other: '📌' };
  const tasksByCategory = Object.entries(categoryLabels).map(([key, name]) => ({
    name,
    count: tasks.filter(t => t.category === key).length,
    icon: categoryIcons[key as keyof typeof categoryIcons],
    color: 'blue'
  })).filter((cat): cat is { name: string; count: number; icon: string; color: string } => cat.count > 0);

  // Définir le message de bienvenue selon l'heure
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Bonjour');
    else if (hour < 18) setGreeting('Bon après-midi');
    else setGreeting('Bonsoir');

    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const getMotivationalMessage = () => {
    if (completionRate === 100 && totalTasks > 0) return "🎉 Exceptionnel ! Toutes vos tâches sont accomplies !";
    if (completionRate >= 75) return "🌟 Impressionnant ! Vous êtes sur une très bonne lancée !";
    if (completionRate >= 50) return "💪 Bon travail ! Continuez comme ça !";
    if (completionRate >= 25) return "📈 Bien commencé ! Gardez le rythme !";
    if (totalTasks === 0) return "✨ Prêt à commencer ? Créez votre première tâche !";
    return "🎯 Chaque petite étape compte. Vous allez y arriver !";
  };

  // Obtenir le nom d'utilisateur depuis localStorage
  const getUserName = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        return user.fullName?.split(' ')[0] || user.email?.split('@')[0] || 'Utilisateur';
      } catch {
        return 'Utilisateur';
      }
    }
    return 'Utilisateur';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        {/* Header avec animation */}
        <div className="mb-12 animate-in slide-in-from-top duration-700">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Tableau de bord
                </span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent">
                {greeting}, {getUserName()}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-3 max-w-2xl">
                {currentTime.toLocaleDateString('fr-FR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/stats')}
                className="group flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-300 hover:shadow-lg"
              >
                <BarChart3 size={18} />
                <span>Analyses</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => navigate('/add')}
                className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <Plus size={20} />
                <span>Nouvelle tâche</span>
              </button>
            </div>
          </div>
          
          {/* Message motivationnel */}
          <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-500" />
              <p className="text-amber-800 dark:text-amber-300 font-medium">{getMotivationalMessage()}</p>
            </div>
          </div>
        </div>

        {/* Cartes de statistiques premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <ListTodo className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-3xl font-black text-blue-600 dark:text-blue-400">{totalTasks}</span>
              </div>
              <h3 className="text-slate-600 dark:text-slate-400 font-medium">Total des tâches</h3>
              <div className="mt-2 h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-full bg-blue-500 rounded-full" style={{ width: `${Math.min(100, totalTasks * 10)}%` }} />
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400">{pendingTasks}</span>
              </div>
              <h3 className="text-slate-600 dark:text-slate-400 font-medium">En cours / À faire</h3>
              {urgentTasks > 0 && (
                <div className="mt-2 flex items-center gap-1 text-xs text-red-600 dark:text-red-400">
                  <AlertCircle size={12} />
                  <span>{urgentTasks} tâche(s) urgente(s)</span>
                </div>
              )}
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{completedTasks}</span>
              </div>
              <h3 className="text-slate-600 dark:text-slate-400 font-medium">Tâches terminées</h3>
              {completedTasks > 0 && (
                <div className="mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                  +{Math.round((completedTasks / totalTasks) * 100)}% du total
                </div>
              )}
            </div>
          </div>

          <div className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black text-white">{Math.round(completionRate)}%</span>
              </div>
              <h3 className="text-white/90 font-medium">Taux de réussite</h3>
              <div className="mt-3 flex items-center gap-1">
                <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${completionRate}%` }} />
                </div>
                <Target className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Section des tâches urgentes et à venir */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Tâches urgentes */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
                    <Zap className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tâches prioritaires</h2>
                </div>
                <span className="text-sm font-semibold text-red-600 dark:text-red-400">{highPriorityCount} haute priorité</span>
              </div>
            </div>
            <div className="p-6">
              {tasks.filter(t => t.priority === 'high' && t.status !== 'done').length > 0 ? (
                <div className="space-y-4">
                  {tasks.filter(t => t.priority === 'high' && t.status !== 'done').slice(0, 3).map((task) => (
                    <div key={task.id} className="group p-4 bg-red-50 dark:bg-red-950/30 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/50 transition-all cursor-pointer" onClick={() => navigate(`/edit/${task.id}`)}>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{task.description?.substring(0, 100)}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-red-600 dark:text-red-400">⚠️ Échéance bientôt</span>
                            <span className="text-xs text-slate-500">{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500">🎯 Aucune tâche prioritaire pour le moment</p>
                </div>
              )}
            </div>
          </div>

          {/* Répartition par catégorie */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Star className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Catégories</h2>
            </div>
            {tasksByCategory.length > 0 ? (
              <div className="space-y-4">
                {tasksByCategory.map((cat: { name: string; count: number; icon: string; color: string }) => (
                  <div key={cat.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{cat.name}</span>
                      </div>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">{cat.count}</span>
                    </div>
                    <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${cat.color}-500 rounded-full transition-all duration-1000`}
                        style={{ width: `${(cat.count / totalTasks) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-8">Aucune tâche par catégorie</p>
            )}
          </div>
        </div>

        {/* Tâches récentes */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Activité récente</h2>
              </div>
              {tasks.length > 3 && (
                <button 
                  onClick={() => navigate('/tasks')} 
                  className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold hover:underline flex items-center gap-1"
                >
                  Voir toutes les tâches
                  <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>
          <div className="p-6">
            {tasks.length > 0 ? (
              <div className="space-y-3">
                {tasks.slice(0, 5).map((task, index) => (
                  <div 
                    key={task.id}
                    className="group flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all cursor-pointer animate-in slide-in-from-bottom duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => navigate(`/edit/${task.id}`)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-2 h-2 rounded-full ${task.status === 'done' ? 'bg-emerald-500' : task.priority === 'high' ? 'bg-red-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                      <div className="flex-1">
                        <p className={`font-medium text-slate-900 dark:text-white ${task.status === 'done' ? 'line-through opacity-50' : ''}`}>
                          {task.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-slate-500">{categoryIcons[task.category as keyof typeof categoryIcons]} {categoryLabels[task.category as keyof typeof categoryLabels]}</span>
                          <span className="text-xs text-slate-400">{new Date(task.dueDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        task.priority === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex p-4 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Aucune tâche pour le moment</p>
                <p className="text-slate-400 dark:text-slate-500 mt-2">Commencez à organiser votre succès dès maintenant !</p>
                <button
                  onClick={() => navigate('/add')}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  <Plus size={18} />
                  Créer ma première tâche
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer avec conseils */}
        <div className="mt-12 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-md">
              <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">Conseil productivité</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Priorisez les tâches à haute valeur ajoutée et découpez les grands projets en étapes plus petites. 
                La régularité bat l'intensité ! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};