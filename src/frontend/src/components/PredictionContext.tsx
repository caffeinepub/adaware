import { createContext, useContext, useState, ReactNode } from 'react';
import { ConcernLevel, AgeGroup, Gender, ScreenTime, Platform, Frequency, AdType } from '../backend';
import { AdPersuasiveness } from '../types/AdPersuasiveness';

interface PredictionInputs {
  ageGroup: AgeGroup;
  gender: Gender;
  screenTime: ScreenTime;
  platform: Platform;
  frequency: Frequency;
  adType: AdType;
  adPersuasiveness: AdPersuasiveness;
}

interface PredictionData {
  concernLevel: ConcernLevel;
  recommendation: string;
  inputs: PredictionInputs;
}

interface PredictionContextType {
  predictionData: PredictionData | null;
  setPredictionData: (data: PredictionData) => void;
}

const PredictionContext = createContext<PredictionContextType | undefined>(undefined);

export function PredictionProvider({ children }: { children: ReactNode }) {
  const [predictionData, setPredictionData] = useState<PredictionData | null>(null);

  return (
    <PredictionContext.Provider value={{ predictionData, setPredictionData }}>
      {children}
    </PredictionContext.Provider>
  );
}

export function usePredictionContext() {
  const context = useContext(PredictionContext);
  if (!context) {
    throw new Error('usePredictionContext must be used within PredictionProvider');
  }
  return context;
}
