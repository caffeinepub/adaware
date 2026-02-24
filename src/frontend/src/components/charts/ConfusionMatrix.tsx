import { useEffect, useRef } from 'react';

export default function ConfusionMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Mock confusion matrix data (3x3 for Low/Medium/High)
    const confusionData = [
      [45, 3, 2], // Actual Low
      [4, 38, 3], // Actual Medium
      [1, 4, 40], // Actual High
    ];

    const labels = ['Low', 'Medium', 'High'];
    const colors = ['rgba(34, 197, 94, 0.8)', 'rgba(234, 179, 8, 0.8)', 'rgba(239, 68, 68, 0.8)'];

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Confusion Matrix: Predicted vs Actual', canvas.width / 2, 30);

    // Draw bars
    const barWidth = 50;
    const barSpacing = 20;
    const startX = 100;
    const startY = 350;
    const maxHeight = 250;
    const maxValue = Math.max(...confusionData.flat());

    confusionData.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        const x = startX + (rowIndex * 3 + colIndex) * (barWidth + barSpacing);
        const height = (value / maxValue) * maxHeight;
        const y = startY - height;

        ctx.fillStyle = colors[rowIndex];
        ctx.fillRect(x, y, barWidth, height);

        // Draw value on top
        ctx.fillStyle = '#000';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5);
      });
    });

    // Draw legend
    ctx.font = '12px sans-serif';
    labels.forEach((label, index) => {
      const legendX = 50;
      const legendY = 80 + index * 25;
      
      ctx.fillStyle = colors[index];
      ctx.fillRect(legendX, legendY, 20, 15);
      
      ctx.fillStyle = '#000';
      ctx.textAlign = 'left';
      ctx.fillText(`Actual ${label}`, legendX + 30, legendY + 12);
    });

  }, []);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
