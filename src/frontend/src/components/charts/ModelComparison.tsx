import { useEffect, useRef } from 'react';

export default function ModelComparison() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    const metrics = ['Accuracy', 'Precision', 'Recall', 'F1 Score'];
    const rfData = [0.87, 0.85, 0.88, 0.86];
    const lrData = [0.79, 0.77, 0.80, 0.78];

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Model Performance Comparison', canvas.width / 2, 30);

    // Draw bars
    const barWidth = 40;
    const barSpacing = 30;
    const groupSpacing = 80;
    const startX = 100;
    const startY = 350;
    const maxHeight = 250;

    metrics.forEach((metric, index) => {
      const x = startX + index * groupSpacing;

      // Random Forest bar
      const rfHeight = rfData[index] * maxHeight;
      ctx.fillStyle = 'rgba(20, 184, 166, 0.8)';
      ctx.fillRect(x, startY - rfHeight, barWidth, rfHeight);

      // Logistic Regression bar
      const lrHeight = lrData[index] * maxHeight;
      ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
      ctx.fillRect(x + barWidth + 10, startY - lrHeight, barWidth, lrHeight);

      // Draw metric label
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(metric, x + barWidth, startY + 20);

      // Draw values
      ctx.font = '10px sans-serif';
      ctx.fillText(`${(rfData[index] * 100).toFixed(0)}%`, x + barWidth / 2, startY - rfHeight - 5);
      ctx.fillText(`${(lrData[index] * 100).toFixed(0)}%`, x + barWidth + 10 + barWidth / 2, startY - lrHeight - 5);
    });

    // Draw legend
    ctx.fillStyle = 'rgba(20, 184, 166, 0.8)';
    ctx.fillRect(450, 60, 20, 15);
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Random Forest', 475, 72);

    ctx.fillStyle = 'rgba(168, 85, 247, 0.8)';
    ctx.fillRect(450, 85, 20, 15);
    ctx.fillStyle = '#000';
    ctx.fillText('Logistic Regression', 475, 97);

  }, []);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
