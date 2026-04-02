
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navigation } from './components/common/Navigation';
import { HomePage } from './pages/HomePage';
import { TaskFormPage } from './pages/TaskFormPage';
import { StatsPage } from './pages/StatsPage';
import { AboutPage } from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <TaskProvider>
        <Router>
          <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-100">
            <Navigation />
            <main className="pb-16 md:pb-0">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-70 pointer-events-none dark:from-slate-900 dark:via-slate-900 dark:to-purple-950 dark:opacity-50" />
                <div className="relative">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/add" element={<TaskFormPage />} />
                    <Route path="/edit/:id" element={<TaskFormPage />} />
                    <Route path="/stats" element={<StatsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                  </Routes>
                </div>
              </div>
            </main>
          </div>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
}

export default App;