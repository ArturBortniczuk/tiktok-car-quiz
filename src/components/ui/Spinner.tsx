import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'blue' | 'white' | 'gray' | 'green' | 'red';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'blue',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };
  
  const colorClasses = {
    blue: 'text-blue-600',
    white: 'text-white',
    gray: 'text-gray-600',
    green: 'text-green-600',
    red: 'text-red-600'
  };
  
  const classes = `animate-spin ${sizeClasses[size]} ${colorClasses[color]} ${className}`;
  
  return (
    <svg className={classes} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
  children: React.ReactNode;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  message = 'Ładowanie...',
  children
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="text-center">
            <Spinner size="lg" />
            <p className="mt-2 text-sm text-gray-600">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface LoadingStateProps {
  message?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Ładowanie...',
  description,
  size = 'md'
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size={size === 'sm' ? 'md' : size === 'md' ? 'lg' : 'xl'} />
      <p className={`mt-4 font-medium text-gray-900 ${size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg'}`}>
        {message}
      </p>
      {description && (
        <p className={`mt-2 text-gray-500 text-center max-w-sm ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {description}
        </p>
      )}
    </div>
  );
};
