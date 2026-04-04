import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/common/Navigation';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { StatsPage } from './pages/StatsPage';
import { AboutPage } from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <AppContent />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showNav = location.pathname !== '/login' && location.pathname !== '/register';

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-indigo-100 opacity-70 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950 dark:opacity-60" />
          <div className="absolute inset-0 backdrop-blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {showNav && <Navigation />}
          
          <main className={`flex-1 ${showNav ? 'pb-20 md:pb-8 pt-4' : 'pt-0'} container mx-auto px-4`}>
            <Routes key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add" element={<TaskFormPage />} />
              <Route path="/edit/:id" element={<TaskFormPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
