// useCarAnalysis.ts
export const useCarAnalysis = () => {
  return { 
    analyzeImage: () => Promise.resolve(null),
    isLoading: false,
    error: null 
  };
};
