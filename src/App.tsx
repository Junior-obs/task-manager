import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/common/Navigation';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { StatsPage } from './pages/StatsPage';
import { AboutPage } from './pages/AboutPage';
import './App.css';

// Composant pour routes protégées
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('user');
  return isAuthenticated ? <>{element}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <AppContent />
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavigation = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
            
            {/* BACKGROUND FIXE : Ne se coupe plus au scroll */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-indigo-100 opacity-70 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950 dark:opacity-60" />
              {/* Petit effet de flou pour plus de "premium" */}
              <div className="absolute inset-0 backdrop-blur-[100px]" />
            </div>

            {/* CONTENU : Doit être au-dessus du background (z-10) */}
            <div className="relative z-10 flex flex-col min-h-screen">
              {!hideNavigation && <Navigation />}
              
              <main className="flex-1 pb-20 md:pb-8 pt-4 container mx-auto px-4">
                <Routes>
                  <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/dashboard" element={<ProtectedRoute element={<DashboardPage />} />} />
                  <Route path="/add" element={<ProtectedRoute element={<TaskFormPage />} />} />
                  <Route path="/edit/:id" element={<ProtectedRoute element={<TaskFormPage />} />} />
                  <Route path="/stats" element={<ProtectedRoute element={<StatsPage />} />} />
                  <Route path="/about" element={<ProtectedRoute element={<AboutPage />} />} />
                </Routes>
              </main>
            </div>

          </div>
  );
}

export default App;