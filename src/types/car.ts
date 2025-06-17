export interface CarImage {
  id: string;
  file: File;
  preview: string;
  analyzed: boolean;
  carInfo?: CarInfo;
}

export interface CarInfo {
  make: string;
  model: string;
  year?: number;
  generation?: string;
  bodyType?: string;
  confidence: number;
  description: string;
}

export interface CarAnalysisRequest {
  imageBase64: string;
  imageId: string;
}

export interface CarAnalysisResponse {
  success: boolean;
  carInfo?: CarInfo;
  error?: string;
}
