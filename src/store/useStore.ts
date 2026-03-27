import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppStore, Theme } from '../types';

export const useStore = create<AppStore>()(
  persist(
    (set) => ({
      theme: 'system',
      apiKey: null,
      uploadedImage: null,
      analysisResult: null,
      isAnalyzing: false,
      error: null,
      
      setTheme: (theme: Theme) => set({ theme }),
      setApiKey: (apiKey: string | null) => set({ apiKey }),
      setUploadedImage: (uploadedImage) => set({ uploadedImage }),
      setAnalysisResult: (analysisResult) => set({ analysisResult }),
      setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
      setError: (error) => set({ error }),
      reset: () => set({
        uploadedImage: null,
        analysisResult: null,
        isAnalyzing: false,
        error: null,
      }),
    }),
    {
      name: 'icon-finder-storage',
      partialize: (state) => ({
        theme: state.theme,
        apiKey: state.apiKey,
      }),
    }
  )
);
