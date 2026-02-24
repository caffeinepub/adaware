import { useEffect, useRef } from 'react';
import { Prediction, ConcernLevel } from '../../backend';

interface GenderBiasChartProps {
  genderData?: {
    male: Prediction[];
    female: Prediction[];
  };
}

export default function GenderBiasChart({ genderData }: GenderBiasChartProps) {
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
      const total = predictions.length;
      if (total === 0) return { low: 0, medium: 0, high: 0 };
      
      const low = (predictions.filter((p) => p.concernLevel === ConcernLevel.low).length / total) * 100;
      const medium = (predictions.filter((p) => p.concernLevel === ConcernLevel.medium).length / total) * 100;
      const high = (predictions.filter((p) => p.concernLevel === ConcernLevel.high).length / total) * 100;
      return { low, medium, high };
    };

    const male = genderData?.male || [];
    const female = genderData?.female || [];

    const distMale = calculateDistribution(male);
    const distFemale = calculateDistribution(female);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Gender Distribution Comparison (%)', canvas.width / 2, 30);

    // Draw grouped bars
    const barWidth = 40;
    const barSpacing = 10;
    const groupSpacing = 100;
    const startX = 120;
    const startY = 350;
    const maxHeight = 250;

    const concernLevels = ['Low Concern', 'Medium Concern', 'High Concern'];
    const maleData = [distMale.low, distMale.medium, distMale.high];
    const femaleData = [distFemale.low, distFemale.medium, distFemale.high];

    concernLevels.forEach((level, index) => {
      const x = startX + index * groupSpacing;

      // Male bar
      const maleHeight = (maleData[index] / 100) * maxHeight;
      ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.fillRect(x, startY - maleHeight, barWidth, maleHeight);

      // Draw value
      ctx.fillStyle = '#000';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${maleData[index].toFixed(1)}%`, x + barWidth / 2, startY - maleHeight - 5);

      // Female bar
      const femaleHeight = (femaleData[index] / 100) * maxHeight;
      ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
      ctx.fillRect(x + barWidth + barSpacing, startY - femaleHeight, barWidth, femaleHeight);

      // Draw value
      ctx.fillText(`${femaleData[index].toFixed(1)}%`, x + barWidth + barSpacing + barWidth / 2, startY - femaleHeight - 5);

      // Draw label
      ctx.font = '12px sans-serif';
      ctx.fillText(level, x + barWidth + barSpacing / 2, startY + 25);
    });

    // Draw legend
    ctx.fillStyle = 'rgba(59, 130, 246, 0.8)';
    ctx.fillRect(450, 80, 20, 15);
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Male', 480, 92);

    ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
    ctx.fillRect(450, 105, 20, 15);
    ctx.fillStyle = '#000';
    ctx.fillText('Female', 480, 117);

  }, [genderData]);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
