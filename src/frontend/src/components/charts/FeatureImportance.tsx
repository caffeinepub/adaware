import { useEffect, useRef } from 'react';

export default function FeatureImportance() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 700;
    canvas.height = 400;

    // Mock feature importance scores
    const features = [
      'Ad Persuasiveness',
      'Ad Frequency',
      'Screen Time',
      'Platform',
      'Ad Type',
      'Age Group',
      'Gender',
    ];

    const importanceScores = [0.28, 0.22, 0.18, 0.14, 0.10, 0.05, 0.03];

    const colors = [
      'rgba(20, 184, 166, 0.8)',
      'rgba(34, 197, 94, 0.8)',
      'rgba(59, 130, 246, 0.8)',
      'rgba(168, 85, 247, 0.8)',
      'rgba(234, 179, 8, 0.8)',
      'rgba(249, 115, 22, 0.8)',
      'rgba(239, 68, 68, 0.8)',
    ];

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Feature Importance Ranking', canvas.width / 2, 30);

    // Draw horizontal bars
    const barHeight = 35;
    const barSpacing = 10;
    const startX = 200;
    const startY = 60;
    const maxBarWidth = 400;

    features.forEach((feature, index) => {
      const y = startY + index * (barHeight + barSpacing);
      const barWidth = importanceScores[index] * maxBarWidth / 0.3;

      // Draw bar
      ctx.fillStyle = colors[index];
      ctx.fillRect(startX, y, barWidth, barHeight);

      // Draw feature label
      ctx.fillStyle = '#000';
      ctx.font = '14px sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(feature, startX - 10, y + barHeight / 2 + 5);

      // Draw value
      ctx.textAlign = 'left';
      ctx.fillText(`${(importanceScores[index] * 100).toFixed(1)}%`, startX + barWidth + 10, y + barHeight / 2 + 5);
    });

  }, []);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
