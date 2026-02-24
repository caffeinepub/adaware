import { useEffect, useRef } from 'react';
import { Prediction, ConcernLevel } from '../../backend';

interface AgeGroupAnalysisProps {
  ageGroupData?: {
    _13to15: Prediction[];
    _16to18: Prediction[];
    _19plus: Prediction[];
  };
}

export default function AgeGroupAnalysis({ ageGroupData }: AgeGroupAnalysisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    const calculateDistribution = (predictions: Prediction[]) => {
      const low = predictions.filter((p) => p.concernLevel === ConcernLevel.low).length;
      const medium = predictions.filter((p) => p.concernLevel === ConcernLevel.medium).length;
      const high = predictions.filter((p) => p.concernLevel === ConcernLevel.high).length;
      return { low, medium, high };
    };

    const age13to15 = ageGroupData?._13to15 || [];
    const age16to18 = ageGroupData?._16to18 || [];
    const age19plus = ageGroupData?._19plus || [];

    const dist13to15 = calculateDistribution(age13to15);
    const dist16to18 = calculateDistribution(age16to18);
    const dist19plus = calculateDistribution(age19plus);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Predictions by Age Group', canvas.width / 2, 30);

    // Draw stacked bars
    const barWidth = 80;
    const barSpacing = 60;
    const startX = 120;
    const startY = 350;
    const maxHeight = 250;
    const maxValue = Math.max(
      dist13to15.low + dist13to15.medium + dist13to15.high,
      dist16to18.low + dist16to18.medium + dist16to18.high,
      dist19plus.low + dist19plus.medium + dist19plus.high,
      1
    );

    const colors = {
      low: 'rgba(34, 197, 94, 0.8)',
      medium: 'rgba(234, 179, 8, 0.8)',
      high: 'rgba(239, 68, 68, 0.8)',
    };

    const ageGroups = [
      { label: '13-15', data: dist13to15 },
      { label: '16-18', data: dist16to18 },
      { label: '19+', data: dist19plus },
    ];

    ageGroups.forEach((group, index) => {
      const x = startX + index * (barWidth + barSpacing);
      let currentY = startY;

      // Draw low
      const lowHeight = (group.data.low / maxValue) * maxHeight;
      ctx.fillStyle = colors.low;
      ctx.fillRect(x, currentY - lowHeight, barWidth, lowHeight);
      currentY -= lowHeight;

      // Draw medium
      const mediumHeight = (group.data.medium / maxValue) * maxHeight;
      ctx.fillStyle = colors.medium;
      ctx.fillRect(x, currentY - mediumHeight, barWidth, mediumHeight);
      currentY -= mediumHeight;

      // Draw high
      const highHeight = (group.data.high / maxValue) * maxHeight;
      ctx.fillStyle = colors.high;
      ctx.fillRect(x, currentY - highHeight, barWidth, highHeight);

      // Draw label
      ctx.fillStyle = '#000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(group.label, x + barWidth / 2, startY + 25);
    });

    // Draw legend
    const legendItems = ['Low Concern', 'Medium Concern', 'High Concern'];
    const legendColors = [colors.low, colors.medium, colors.high];

    legendItems.forEach((label, index) => {
      const legendY = 80 + index * 25;
      
      ctx.fillStyle = legendColors[index];
      ctx.fillRect(450, legendY, 20, 15);
      
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(label, 480, legendY + 12);
    });

  }, [ageGroupData]);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
