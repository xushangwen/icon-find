export interface AnalysisResult {
  chineseKeywords: string[];
  englishKeywords: string[];
  style: string;
  theme: string;
}

export interface UploadedImage {
  file: File;
  preview: string;
  base64: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface AppStore {
  theme: Theme;
  apiKey: string | null;
  uploadedImage: UploadedImage | null;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
  error: string | null;
  setTheme: (theme: Theme) => void;
  setApiKey: (key: string | null) => void;
  setUploadedImage: (image: UploadedImage | null) => void;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}
