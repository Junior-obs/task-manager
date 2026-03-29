import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;

  
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary' // On lui donne 'primary' par défaut
}) => {
  
  // On définit les styles selon le variant choisi
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  };

  return (
    <button 
      onClick={onClick} 
      className={`px-4 py-2 rounded-md transition-colors ${variantStyles[variant as keyof typeof variantStyles]} ${className}`}
    >
      {children}
    </button>
  );
};