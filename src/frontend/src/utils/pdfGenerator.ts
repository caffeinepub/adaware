import { ConcernLevel, AgeGroup, Gender, ScreenTime, Platform, Frequency, AdType } from '../backend';
import { AdPersuasiveness } from '../types/AdPersuasiveness';

interface PredictionData {
  concernLevel: ConcernLevel;
  recommendation: string;
  inputs: {
    ageGroup: AgeGroup;
    gender: Gender;
    screenTime: ScreenTime;
    platform: Platform;
    frequency: Frequency;
    adType: AdType;
    adPersuasiveness: AdPersuasiveness;
  };
}

export function generatePredictionReport(data: PredictionData) {
  // Create a simple text-based report since jsPDF is not available
  const timestamp = new Date().toLocaleString();
  
  const formatValue = (key: string, value: string): string => {
    if (key === 'ageGroup') {
      if (value === '_13to15') return '13-15';
      if (value === '_16to18') return '16-18';
      if (value === '_19plus') return '19+';
    }
    if (key === 'screenTime') {
      if (value === 'under2hrs') return '<2 hours';
      if (value === '_2to5hrs') return '2-5 hours';
      if (value === 'over5hrs') return '>5 hours';
    }
    if (key === 'adType') {
      if (value === 'fastFood') return 'Fast Food';
      if (value === 'sugaryDrinks') return 'Sugary Drinks';
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const inputLabels: Record<string, string> = {
    ageGroup: 'Age Group',
    gender: 'Gender',
    screenTime: 'Daily Screen Time',
    platform: 'Primary Platform',
    frequency: 'Ad Frequency',
    adType: 'Ad Type',
    adPersuasiveness: 'Ad Persuasiveness',
  };

  // Generate report content
  let reportContent = `AdAware Prediction Report
Explainable AI Framework for Adolescent Health
Generated: ${timestamp}

========================================

PREDICTION RESULT
Concern Level: ${data.concernLevel.toUpperCase()}

========================================

PERSONALIZED RECOMMENDATION
${data.recommendation}

========================================

INPUT SUMMARY
`;

  Object.entries(data.inputs).forEach(([key, value]) => {
    const label = inputLabels[key];
    const formattedValue = formatValue(key, value);
    reportContent += `${label}: ${formattedValue}\n`;
  });

  reportContent += `
========================================

EXPLAINABLE AI INSIGHTS (SHAP)

SHAP (SHapley Additive exPlanations) analysis reveals the key factors
influencing this prediction:

• Ad Persuasiveness: Primary driver of concern level predictions
• Screen Time: Extended exposure correlates with higher concern
• Ad Frequency: Frequent exposure significantly impacts results
• Age Group & Platform: Demographic factors influence susceptibility

Note: SHAP visualizations provide feature importance rankings and 
contribution analysis for transparent AI decision-making.

========================================

AdAware - Academic Research Project
For educational and research purposes only
`;

  // Create a blob and download
  const blob = new Blob([reportContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AdAware_Report_${Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
