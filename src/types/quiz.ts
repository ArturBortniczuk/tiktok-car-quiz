export interface QuizQuestion {
  id: string;
  imageId: string;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  allAnswers: string[];
  explanation: string;
  displayTime: number; // czas wyświetlania w sekundach
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  totalDuration: number;
  createdAt: Date;
  title: string;
}

export interface QuizGenerationRequest {
  carInfos: Array<{
    imageId: string;
    carInfo: import('./car').CarInfo;
  }>;
}

export interface QuizGenerationResponse {
  success: boolean;
  quiz?: Quiz;
  error?: string;
}
