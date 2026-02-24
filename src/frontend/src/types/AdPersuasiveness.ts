import { Prediction } from '../backend';

// Extract AdPersuasiveness type from Prediction interface
export type AdPersuasiveness = Prediction['adPersuasiveness'];

// Define enum values for use in components
export const AdPersuasiveness = {
  low: 'low' as AdPersuasiveness,
  medium: 'medium' as AdPersuasiveness,
  high: 'high' as AdPersuasiveness,
};
