import React from 'react';
import { Check } from 'lucide-react';

interface CompletionRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  showText?: boolean;
  className?: string;
}

export const CompletionRing: React.FC<CompletionRingProps> = ({
  percentage,
  size = 36,
  strokeWidth = 3.5,
  showText = true,
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, Math.round(percentage)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  const isComplete = clamped === 100;

  // Determine stroke color
  const getStrokeColor = () => {
    if (isComplete) return '#15803D'; // emerald-700
    if (clamped >= 60) return '#0F3D2E'; // brand dark green
    if (clamped >= 25) return '#B45309'; // amber-700
    return '#94A3B8'; // slate-400
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={`Tamamlanma: %${clamped}`}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated progress track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getStrokeColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center text / icon */}
      {showText && (
        <div className="absolute inset-0 flex items-center justify-center">
          {isComplete ? (
            <Check
              className="text-emerald-700"
              style={{ width: size * 0.42, height: size * 0.42 }}
            />
          ) : (
            <span
              className="font-mono font-bold text-slate-800 tabular-nums leading-none select-none"
              style={{ fontSize: Math.max(9, Math.round(size * 0.3)) }}
            >
              %{clamped}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
