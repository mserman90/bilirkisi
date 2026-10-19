import React from 'react';
import { CompletionRing } from './CompletionRing';
import { Check } from 'lucide-react';

interface StepBarProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  stepPercentages: Record<number, number>;
}

const STEPS = [
  { step: 1, label: 'Görev & Dava', shortLabel: 'Dava Bilgisi' },
  { step: 2, label: 'İnceleme & Keşif', shortLabel: 'Keşif' },
  { step: 3, label: 'Tespitler & Bulgular', shortLabel: 'Tespitler' },
  { step: 4, label: 'Teknik Değerlendirme', shortLabel: 'Hesap & Analiz' },
  { step: 5, label: 'Mevzuat Dayanağı', shortLabel: 'Mevzuat' },
  { step: 6, label: 'Sonuç & Kanaat', shortLabel: 'Sonuç' },
  { step: 7, label: 'Ekler & İmzalar', shortLabel: 'Ek & İmza' },
];

export const StepBar: React.FC<StepBarProps> = ({
  currentStep,
  onSelectStep,
  stepPercentages,
}) => {
  // Calculate average total progress across all 7 steps
  const totalSum = Object.values(stepPercentages).reduce((acc, curr) => acc + curr, 0);
  const overallPercentage = Math.round(totalSum / 7);

  return (
    <div className="w-full bg-white border-b border-[#E4DCCB] px-4 py-2 overflow-x-auto no-scrollbar shadow-2xs">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between min-w-[820px] gap-2">
        {STEPS.map(({ step, label }) => {
          const isActive = currentStep === step;
          const percent = stepPercentages[step] || 0;
          const isDone = percent === 100;

          return (
            <button
              key={step}
              onClick={() => onSelectStep(step)}
              className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all text-left whitespace-nowrap shrink-0 group ${
                isActive
                  ? 'bg-[#0F3D2E] text-white shadow-sm ring-1 ring-[#0F3D2E]'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100/70 border border-emerald-200/70'
                  : 'text-slate-700 hover:bg-[#F1ECE1]/70 border border-transparent'
              }`}
            >
              {/* Step completion ring next to step */}
              <div className="shrink-0 flex items-center">
                <CompletionRing
                  percentage={percent}
                  size={24}
                  strokeWidth={2.8}
                  showText={false}
                  className={isActive ? 'brightness-125' : ''}
                />
              </div>

              {/* Step info */}
              <div className="truncate max-w-[125px]">
                <div className="flex items-center gap-1.5 leading-none">
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      isActive ? 'text-[#B45309]' : 'text-slate-400'
                    }`}
                  >
                    0{step}
                  </span>
                  <span className="truncate font-sans font-medium text-xs">
                    {label}
                  </span>
                </div>
                {/* Micro completion text below */}
                <div className="flex items-center gap-1 text-[10px] font-mono mt-0.5 leading-none">
                  <span className={isActive ? 'text-emerald-200' : isDone ? 'text-emerald-700' : 'text-slate-400'}>
                    %{percent}
                  </span>
                  {isDone && <span className={isActive ? 'text-emerald-200' : 'text-emerald-600'}>· Tamam</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
