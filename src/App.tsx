import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import { Navigation } from './components/common/Navigation';
import { HomePage } from './pages/HomePage';
import { TaskFormPage } from './pages/TaskFormPage';
import { StatsPage } from './pages/StatsPage';
import { AboutPage } from './pages/AboutPage';

function App() {
  return (
    <TaskProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/add" element={<TaskFormPage />} />
              <Route path="/edit/:id" element={<TaskFormPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;