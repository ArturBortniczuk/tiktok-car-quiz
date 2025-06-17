// Funkcje pomocnicze dla całej aplikacji

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// File utilities
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidImageFile(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  return validTypes.includes(file.type);
}

export function createImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function resizeImage(file: File, maxWidth: number, maxHeight: number, quality: number = 0.8): Promise<Blob> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      // Oblicz nowe wymiary zachowując proporcje
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Rysuj przeskalowany obraz
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
}

// String utilities
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

export function capitalizeFirst(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Time utilities
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Array utilities
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, count);
}

// ID generator
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  return `${prefix}${prefix ? '_' : ''}${timestamp}_${random}`;
}

// Local Storage utilities (bezpieczne)
export function getLocalStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
}

export function removeLocalStorageItem(key: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error);
  }
}

// Error handling
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Wystąpił nieznany błąd';
}

// API utilities
export function createFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  });
  
  return formData;
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Media utilities
export function getVideoDimensions(file: File): Promise<{ width: number; height: number; duration: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration
      });
      URL.revokeObjectURL(video.src);
    };
    
    video.onerror = reject;
    video.src = URL.createObjectURL(file);
  });
}

// Polish language utilities
export function polishPlural(count: number, singular: string, plural: string, genitive: string): string {
  if (count === 1) return singular;
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return plural;
  }
  return genitive;
}

// Debug utilities
export function debugLog(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}`, data);
  }
}
