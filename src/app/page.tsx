'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StepProgress } from '@/components/ui/Progress';
import { LoadingState } from '@/components/ui/Spinner';
import { Header } from '@/components/Header';
import { APP_STEPS } from '@/lib/constants';
import type { AppState } from '@/types/api';
import type { CarImage } from '@/types/car';

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>({
    currentStep: 'upload',
    images: [],
    isLoading: false
  });

  // Demo function to test different states
  const handleDemoState = (step: 'upload' | 'analyze' | 'quiz' | 'video' | 'preview') => {
    const demoImages: CarImage[] = [
      {
        id: '1',
        file: new File([], 'bmw.jpg'),
        preview: '/demo/bmw.jpg',
        analyzed: step !== 'upload',
        carInfo: step !== 'upload' ? {
          make: 'BMW',
          model: 'M3',
          year: 2023,
          confidence: 0.95,
          description: 'BMW M3 Competition'
        } : undefined
      },
      {
        id: '2', 
        file: new File([], 'audi.jpg'),
        preview: '/demo/audi.jpg',
        analyzed: step !== 'upload',
        carInfo: step !== 'upload' ? {
          make: 'Audi',
          model: 'RS6',
          confidence: 0.92,
          description: 'Audi RS6 Avant'
        } : undefined
      },
      {
        id: '3',
        file: new File([], 'mercedes.jpg'), 
        preview: '/demo/mercedes.jpg',
        analyzed: step !== 'upload',
        carInfo: step !== 'upload' ? {
          make: 'Mercedes',
          model: 'AMG GT',
          confidence: 0.88,
          description: 'Mercedes AMG GT'
        } : undefined
      },
      {
        id: '4',
        file: new File([], 'porsche.jpg'),
        preview: '/demo/porsche.jpg', 
        analyzed: step !== 'upload',
        carInfo: step !== 'upload' ? {
          make: 'Porsche',
          model: '911',
          confidence: 0.97,
          description: 'Porsche 911 Turbo S'
        } : undefined
      }
    ];

    setAppState({
      currentStep: step,
      images: step === 'upload' ? [] : demoImages,
      quiz: step === 'quiz' || step === 'video' || step === 'preview' ? {
        id: 'demo-quiz',
        questions: [
          {
            id: 'q1',
            imageId: '1',
            question: 'Jaki to model BMW?',
            correctAnswer: 'M3',
            wrongAnswers: ['M5', 'M4', 'M2'],
            allAnswers: ['M3', 'M5', 'M4', 'M2'],
            explanation: 'To BMW M3 Competition',
            displayTime: 10
          }
        ],
        totalDuration: 40,
        createdAt: new Date(),
        title: 'Demo Quiz'
      } : undefined,
      generatedVideo: step === 'preview' ? {
        id: 'demo-video',
        videoUrl: '/demo/quiz-video.mp4',
        duration: 40,
        size: 15000000,
        createdAt: new Date()
      } : undefined,
      isLoading: step === 'analyze' || step === 'quiz' || step === 'video'
    });
  };

  const completedSteps = React.useMemo(() => {
    const steps: string[] = [];
    
    if (appState.images.length === 4) steps.push('upload');
    if (appState.images.every(img => img.analyzed)) steps.push('analyze');
    if (appState.quiz) steps.push('quiz');
    if (appState.generatedVideo) steps.push('video');
    
    return steps;
  }, [appState]);

  const renderCurrentStepContent = () => {
    switch (appState.currentStep) {
      case 'upload':
        return (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Prześlij zdjęcia samochodów</h3>
              <p className="text-gray-600 mb-6">Dodaj 4 zdjęcia różnych samochodów, które będą podstawą Twojego quizu TikTok</p>
              <Button 
                onClick={() => handleDemoState('analyze')}
                size="lg"
              >
                Wybierz zdjęcia (Demo)
              </Button>
            </CardContent>
          </Card>
        );
        
      case 'analyze':
        return (
          <LoadingState 
            message="Analizuję zdjęcia..."
            description="AI rozpoznaje modele samochodów na Twoich zdjęciach"
            size="lg"
          />
        );
        
      case 'quiz':
        return (
          <LoadingState 
            message="Generuję quiz..."
            description="Tworzę pytania i odpowiedzi na podstawie rozpoznanych aut"
            size="lg"
          />
        );
        
      case 'video':
        return (
          <LoadingState 
            message="Renderuję wideo..."
            description="Tworzę 40-sekundowy film w formacie TikTok"
            size="lg"
          />
        );
        
      case 'preview':
        return (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quiz gotowy!</h3>
              <p className="text-gray-600 mb-6">Twój film TikTok z quizem samochodowym jest gotowy do pobrania</p>
              <div className="space-y-3">
                <Button size="lg" className="w-full">
                  Pobierz wideo
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  Podgląd wideo
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  className="w-full"
                  onClick={() => handleDemoState('upload')}
                >
                  Nowy quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentStep={appState.currentStep}
        onReset={() => handleDemoState('upload')}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Demo Controls */}
        <Card className="mb-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle level={3}>🚀 Demo Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Przetestuj różne stany aplikacji:
            </p>
            <div className="flex flex-wrap gap-2">
              {APP_STEPS.map((step) => (
                <Button
                  key={step.id}
                  variant={appState.currentStep === step.id ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleDemoState(step.id as any)}
                >
                  {step.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Progress Tracker */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle level={3}>Postęp tworzenia quizu</CardTitle>
          </CardHeader>
          <CardContent>
            <StepProgress 
              steps={APP_STEPS}
              currentStep={appState.currentStep}
              completedSteps={completedSteps}
            />
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {appState.images.length}/4
              </div>
              <div className="text-sm text-gray-600">Zdjęcia</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {appState.images.filter(img => img.analyzed).length}
              </div>
              <div className="text-sm text-gray-600">Rozpoznane</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {appState.quiz ? appState.quiz.questions.length : 0}
              </div>
              <div className="text-sm text-gray-600">Pytania</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                40s
              </div>
              <div className="text-sm text-gray-600">Długość filmu</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          {renderCurrentStepContent()}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card hover>
            <CardContent>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">AI rozpoznawanie</h3>
              <p className="text-gray-600 text-sm">
                Automatyczna identyfikacja marek i modeli samochodów z wykorzystaniem GPT-4 Vision
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Polski lektor</h3>
              <p className="text-gray-600 text-sm">
                Profesjonalna naracja w języku polskim generowana przez ElevenLabs AI
              </p>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M7 8h10M9 12h6m-6 4h6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Format TikTok</h3>
              <p className="text-gray-600 text-sm">
                Optymalne wymiary 9:16, 40 sekund długości i wysokiej jakości render
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <Card>
          <CardContent>
            <div className="text-center text-sm text-gray-500">
              <p className="mb-2">
                🚗 Obsługuje wszystkie popularne marki samochodów
              </p>
              <p className="mb-2">
                🎯 Generuje 4 pytania z wielokrotnym wyborem
              </p>
              <p>
                📱 Gotowe do publikacji na TikToku, Instagram Reels i YouTube Shorts
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
