// OpenAI API Types
export interface OpenAIImageAnalysisRequest {
  model: string;
  messages: Array<{
    role: 'user' | 'system';
    content: Array<{
      type: 'text' | 'image_url';
      text?: string;
      image_url?: {
        url: string;
        detail?: 'low' | 'high' | 'auto';
      };
    }>;
  }>;
  max_tokens: number;
  temperature: number;
}

// ElevenLabs API Types
export interface ElevenLabsTTSRequest {
  text: string;
  model_id: string;
  voice_settings: {
    stability: number;
    similarity_boost: number;
    style?: number;
  };
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description?: string;
}

// Common API Response
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
}

// File Upload Types
export interface FileUploadResponse {
  success: boolean;
  url?: string;
  error?: string;
}

// App State Types
export interface AppState {
  currentStep: 'upload' | 'analyze' | 'quiz' | 'video' | 'preview';
  images: import('./car').CarImage[];
  quiz?: import('./quiz').Quiz;
  generatedVideo?: import('./video').GeneratedVideo;
  isLoading: boolean;
  error?: string;
}
