export interface VideoFrame {
  imageId: string;
  imagePath: string;
  question: string;
  answers: string[];
  correctAnswerIndex: number;
  startTime: number;
  duration: number;
}

export interface VideoSettings {
  width: number;
  height: number;
  fps: number;
  totalDuration: number;
  format: 'mp4';
}

export interface AudioTrack {
  id: string;
  text: string;
  audioUrl: string;
  startTime: number;
  duration: number;
}

export interface VideoGenerationProgress {
  stage: 'preparing' | 'generating-audio' | 'rendering-video' | 'finalizing' | 'completed' | 'error';
  progress: number; // 0-100
  message: string;
  currentFrame?: number;
  totalFrames?: number;
}

export interface GeneratedVideo {
  id: string;
  videoUrl: string;
  duration: number;
  size: number;
  createdAt: Date;
}
