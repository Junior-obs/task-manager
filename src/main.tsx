import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    // 👈 StrictMode temporairement désactivé pour éviter l'erreur "removeChild" 
    // Réactivez après tests avec : <React.StrictMode><App /></React.StrictMode>
    <App />
  );
}
