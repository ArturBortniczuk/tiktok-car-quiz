import React from 'react';
import { Button } from './ui/Button';
import { APP_CONFIG } from '@/lib/constants';

interface HeaderProps {
  currentStep?: string;
  onReset?: () => void;
  showActions?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentStep,
  onReset,
  showActions = true
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {APP_CONFIG.name}
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {APP_CONFIG.description}
                </p>
              </div>
            </div>
          </div>

          {/* Current Step Indicator */}
          {currentStep && (
            <div className="hidden md:flex items-center space-x-2 bg-gray-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 capitalize">
                {getStepLabel(currentStep)}
              </span>
            </div>
          )}

          {/* Actions */}
          {showActions && (
            <div className="flex items-center space-x-3">
              {onReset && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onReset}
                  leftIcon={
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  }
                >
                  Nowy quiz
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://github.com/your-repo', '_blank')}
                leftIcon={
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                }
              >
                GitHub
              </Button>

              <div className="hidden sm:block h-4 w-px bg-gray-300"></div>

              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-medium text-gray-900">Powered by</p>
                  <p className="text-xs text-gray-500">OpenAI & ElevenLabs</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

function getStepLabel(step: string): string {
  const labels: Record<string, string> = {
    upload: 'Przesyłanie zdjęć',
    analyze: 'Analiza AI',
    quiz: 'Generowanie quizu',
    video: 'Renderowanie wideo',
    preview: 'Podgląd i pobieranie'
  };
  
  return labels[step] || step;
}

// Mobile Header Component dla mniejszych ekranów
interface MobileHeaderProps {
  currentStep?: string;
  progress?: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  currentStep,
  progress = 0
}) => {
  return (
    <div className="sm:hidden bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-gray-900">
            Car Quiz
          </h1>
          <div className="flex items-center space-x-1">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {currentStep && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">
                {getStepLabel(currentStep)}
              </span>
              <span className="text-gray-500">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="mt-1 w-full bg-gray-200 rounded-full h-1">
              <div 
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Breadcrumb Component
interface BreadcrumbProps {
  steps: Array<{ id: string; title: string }>;
  currentStep: string;
  onStepClick?: (stepId: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  const currentIndex = steps.findIndex(step => step.id === currentStep);
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = index < currentIndex;
          const isClickable = onStepClick && (isCompleted || isActive);
          
          return (
            <li key={step.id} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              
              <button
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-blue-600'
                    : isCompleted
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-500'
                } ${isClickable ? 'hover:underline cursor-pointer' : 'cursor-default'}`}
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
              >
                {step.title}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
