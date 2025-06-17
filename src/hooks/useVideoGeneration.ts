// useVideoGeneration.ts
export const useVideoGeneration = () => {
  return { 
    generateVideo: () => Promise.resolve(null),
    isLoading: false,
    progress: 0 
  };
};
