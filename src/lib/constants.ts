// Konfiguracja aplikacji
export const APP_CONFIG = {
  name: 'TikTok Car Quiz Generator',
  version: '1.0.0',
  description: 'Generator quizów samochodowych dla TikToka',
  author: 'CarQuiz Team'
} as const;

// Ustawienia wideo
export const VIDEO_CONFIG = {
  width: 1080,
  height: 1920, // Format 9:16 dla TikToka
  fps: 30,
  duration: 40, // 40 sekund
  format: 'mp4',
  quality: 'high',
  bitrate: 5000000 // 5 Mbps
} as const;

// Ustawienia obrazów
export const IMAGE_CONFIG = {
  maxSize: 10 * 1024 * 1024, // 10MB
  maxWidth: 1920,
  maxHeight: 1920,
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  compressionQuality: 0.8,
  thumbnailSize: 300
} as const;

// Ustawienia quizu
export const QUIZ_CONFIG = {
  questionsPerQuiz: 4,
  answersPerQuestion: 4,
  timePerQuestion: 10, // sekundy
  transitionTime: 1, // sekundy między pytaniami
  maxQuizzes: 10 // limit quizów w localStorage
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  analyzeCarImage: '/api/analyze-car',
  generateQuiz: '/api/generate-quiz',
  generateTTS: '/api/generate-tts',
  uploadImage: '/api/upload'
} as const;

// OpenAI Configuration
export const OPENAI_CONFIG = {
  model: 'gpt-4-vision-preview',
  maxTokens: 1000,
  temperature: 0.3,
  imageDetail: 'high' as const,
  timeout: 30000 // 30 sekund
} as const;

// ElevenLabs Configuration
export const ELEVENLABS_CONFIG = {
  voiceId: 'pNInz6obpgDQGcFmaJgB', // Adam (English)
  polishVoiceId: 'pFZP5JQG7iQjIQuC4Bku', // Lily (może mieć polski akcent)
  model: 'eleven_monolingual_v1',
  voiceSettings: {
    stability: 0.5,
    similarityBoost: 0.5,
    style: 0.0
  },
  timeout: 60000 // 60 sekund
} as const;

// Kroki aplikacji
export const APP_STEPS = [
  {
    id: 'upload',
    title: 'Upload zdjęć',
    description: 'Prześlij 4 zdjęcia samochodów'
  },
  {
    id: 'analyze',
    title: 'Analiza AI',
    description: 'Rozpoznawanie modeli aut'
  },
  {
    id: 'quiz',
    title: 'Generowanie quizu',
    description: 'Tworzenie pytań i odpowiedzi'
  },
  {
    id: 'video',
    title: 'Renderowanie wideo',
    description: 'Generowanie filmu TikTok'
  },
  {
    id: 'preview',
    title: 'Podgląd',
    description: 'Sprawdź i pobierz film'
  }
];

// Komunikaty błędów
export const ERROR_MESSAGES = {
  fileTooBig: `Plik jest za duży. Maksymalny rozmiar to ${IMAGE_CONFIG.maxSize / 1024 / 1024}MB`,
  invalidFileType: 'Nieprawidłowy typ pliku. Dozwolone: JPG, PNG, WebP',
  uploadFailed: 'Nie udało się przesłać pliku',
  analysisTimeout: 'Przekroczono czas analizy obrazu',
  analysisError: 'Błąd podczas analizy obrazu',
  quizGenerationError: 'Błąd podczas generowania quizu',
  ttsError: 'Błąd podczas generowania audio',
  videoRenderError: 'Błąd podczas renderowania wideo',
  apiKeyMissing: 'Brak klucza API',
  networkError: 'Błąd połączenia z siecią',
  unknownError: 'Wystąpił nieznany błąd'
} as const;

// Komunikaty sukcesu
export const SUCCESS_MESSAGES = {
  imageUploaded: 'Zdjęcie zostało przesłane',
  imageAnalyzed: 'Samochód został rozpoznany',
  quizGenerated: 'Quiz został wygenerowany',
  audioGenerated: 'Audio zostało wygenerowane',
  videoRendered: 'Film został wyrenderowany',
  videoDownloaded: 'Film został pobrany'
} as const;

// Ustawienia localStorage
export const STORAGE_KEYS = {
  carImages: 'tiktok_car_quiz_images',
  generatedQuiz: 'tiktok_car_quiz_current',
  userSettings: 'tiktok_car_quiz_settings',
  savedQuizzes: 'tiktok_car_quiz_saved'
} as const;

// Polskie nazwy marek samochodów (dla lepszego rozpoznawania)
export const POLISH_CAR_BRANDS = {
  'Audi': 'Audi',
  'BMW': 'BMW',
  'Mercedes': 'Mercedes-Benz',
  'Mercedes-Benz': 'Mercedes-Benz',
  'Volkswagen': 'Volkswagen',
  'Opel': 'Opel',
  'Ford': 'Ford',
  'Toyota': 'Toyota',
  'Honda': 'Honda',
  'Nissan': 'Nissan',
  'Hyundai': 'Hyundai',
  'Kia': 'Kia',
  'Škoda': 'Škoda',
  'Seat': 'Seat',
  'Fiat': 'Fiat',
  'Renault': 'Renault',
  'Peugeot': 'Peugeot',
  'Citroën': 'Citroën',
  'Mazda': 'Mazda',
  'Subaru': 'Subaru',
  'Mitsubishi': 'Mitsubishi',
  'Lexus': 'Lexus',
  'Infiniti': 'Infiniti',
  'Acura': 'Acura',
  'Volvo': 'Volvo',
  'Saab': 'Saab',
  'Jaguar': 'Jaguar',
  'Land Rover': 'Land Rover',
  'Porsche': 'Porsche',
  'Ferrari': 'Ferrari',
  'Lamborghini': 'Lamborghini',
  'Bentley': 'Bentley',
  'Rolls-Royce': 'Rolls-Royce'
} as const;

// Regex patterns
export const REGEX_PATTERNS = {
  carModel: /^[a-zA-Z0-9\s\-\.]+$/,
  year: /^(19|20)\d{2}$/,
  alphanumeric: /^[a-zA-Z0-9]+$/
} as const;

// Limity API (free tier)
export const API_LIMITS = {
  openai: {
    requestsPerMinute: 3,
    tokensPerMinute: 40000
  },
  elevenlabs: {
    charactersPerMonth: 10000,
    requestsPerMinute: 2
  }
} as const;
