import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { generatePredictionReport } from '../utils/pdfGenerator';
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

interface DownloadPDFButtonProps {
  predictionData: PredictionData;
}

export default function DownloadPDFButton({ predictionData }: DownloadPDFButtonProps) {
  const handleDownload = () => {
    generatePredictionReport(predictionData);
  };

  return (
    <Button
      onClick={handleDownload}
      className="bg-teal-600 hover:bg-teal-700 text-white"
      size="lg"
    >
      <Download className="mr-2 h-5 w-5" />
      Download Report (TXT)
    </Button>
  );
}
