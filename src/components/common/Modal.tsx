import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-900/50 transition-colors" onClick={onClose} />
      <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl w-full max-w-lg mx-4 z-10 border border-white/30 animate-fade-in">
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-100 rounded-lg transition-all active:scale-95 text-slate-600 hover:text-red-600 font-semibold"
            aria-label="Fermer"
          >
            <X size={22} />
          </button>
        </div>
        <div className="p-6 text-slate-700">{children}</div>
      </div>
    </div>
  );
};