import { useEffect, useRef } from 'react';

interface ConcernDistributionPieProps {
  distribution?: {
    low: bigint;
    medium: bigint;
    high: bigint;
  };
}

export default function ConcernDistributionPie({ distribution }: ConcernDistributionPieProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 500;
    canvas.height = 400;

    const low = distribution ? Number(distribution.low) : 0;
    const medium = distribution ? Number(distribution.medium) : 0;
    const high = distribution ? Number(distribution.high) : 0;
    const total = low + medium + high;

    if (total === 0) {
      ctx.fillStyle = '#666';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', canvas.width / 2, canvas.height / 2);
      return;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#000';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Concern Level Distribution', canvas.width / 2, 30);

    // Pie chart settings
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2 + 20;
    const radius = 120;

    const colors = [
      'rgba(34, 197, 94, 0.8)',
      'rgba(234, 179, 8, 0.8)',
      'rgba(239, 68, 68, 0.8)',
    ];

    const labels = ['Low Concern', 'Medium Concern', 'High Concern'];
    const values = [low, medium, high];

    // Draw pie slices
    let currentAngle = -Math.PI / 2;

    values.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index];
      ctx.fill();

      // Draw percentage label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
      const percentage = ((value / total) * 100).toFixed(1);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`${percentage}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Draw legend
    labels.forEach((label, index) => {
      const legendY = 320 + index * 25;
      
      ctx.fillStyle = colors[index];
      ctx.fillRect(150, legendY, 20, 15);
      
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`${label}: ${values[index]}`, 180, legendY + 12);
    });

  }, [distribution]);

  return (
    <div className="w-full flex justify-center">
      <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
    </div>
  );
}
