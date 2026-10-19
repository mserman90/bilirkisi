import React, { useState } from 'react';
import { WizardGuidance, ChecklistItem } from '../../types';
import { HelpCircle, AlertTriangle, Copy, Check, CheckSquare, BookOpen } from 'lucide-react';

interface GuidancePanelProps {
  guidance: WizardGuidance;
  checklistProgress: Record<string, boolean>;
  onToggleChecklist: (itemId: string) => void;
  onInsertSamplePhrase: (phrase: string) => void;
}

export const GuidancePanel: React.FC<GuidancePanelProps> = ({
  guidance,
  checklistProgress,
  onToggleChecklist,
  onInsertSamplePhrase,
}) => {
  const [copiedPhrase, setCopiedPhrase] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'rehber' | 'checklist' | 'ornekler'>('rehber');

  const handleCopy = (phrase: string) => {
    navigator.clipboard.writeText(phrase);
    setCopiedPhrase(phrase);
    setTimeout(() => setCopiedPhrase(null), 2000);
  };

  const totalChecks = guidance.checklist.length;
  const completedChecks = guidance.checklist.filter((item) => checklistProgress[item.id]).length;
  const progressPercent = totalChecks > 0 ? Math.round((completedChecks / totalChecks) * 100) : 0;

  return (
    <div className="bg-white border border-[#E4DCCB] rounded-xl shadow-xs overflow-hidden flex flex-col h-full">
      {/* Tab Header */}
      <div className="bg-[#FBF9F4] border-b border-[#E4DCCB] px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('rehber')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t-md border-b-2 transition-all ${
              activeTab === 'rehber'
                ? 'bg-white text-[#0F3D2E] border-[#B45309] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Yazım Kılavuzu
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-t-md border-b-2 transition-all ${
              activeTab === 'checklist'
                ? 'bg-white text-[#0F3D2E] border-[#B45309] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            <span>Kontrol Listesi</span>
            <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 tabular-nums">
              {completedChecks}/{totalChecks}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('ornekler')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-t-md border-b-2 transition-all ${
              activeTab === 'ornekler'
                ? 'bg-white text-[#0F3D2E] border-[#B45309] shadow-xs'
                : 'text-slate-600 hover:text-slate-900 border-transparent'
            }`}
          >
            Örnek İfadeler
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1 text-slate-800 text-sm">
        
        {activeTab === 'rehber' && (
          <div className="space-y-4">
            {/* Neden bu bölüm? */}
            <div className="bg-[#FBF9F4] border-l-[3px] border-[#B45309] border border-[#E4DCCB] p-3.5 rounded-r-lg">
              <div className="flex items-center gap-2 mb-1.5">
                <HelpCircle className="w-4 h-4 text-[#B45309] shrink-0" />
                <h4 className="font-semibold text-xs tracking-wider uppercase text-slate-900 font-sans">
                  Neden Bu Bölüm Zorunlu?
                </h4>
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                {guidance.whyThisStep}
              </p>
            </div>

            {/* Bilirkişilik İlkeleri */}
            <div className="border border-[#E4DCCB] bg-white rounded-lg p-3">
              <h4 className="font-semibold text-xs text-slate-900 mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-emerald-800" />
                <span>HMK & Yargıtay Esasları</span>
              </h4>
              <ul className="space-y-2">
                {guidance.principles.map((pr, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                    <span className="font-mono text-emerald-800 font-bold text-[11px] shrink-0 mt-0.5">·</span>
                    <span>{pr}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sık Yapılan Hatalar */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                <h4 className="font-semibold text-xs text-amber-900">
                  Sık Yapılan Hatalar ve Kaçınma Yolları
                </h4>
              </div>
              <ul className="space-y-1.5">
                {guidance.commonMistakes.map((mis, idx) => (
                  <li key={idx} className="text-xs text-amber-900/90 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-700 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{mis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100">
              <span>Bölüm Tamamlanma Durumu</span>
              <span className="font-mono font-semibold text-emerald-800 tabular-nums">%{progressPercent}</span>
            </div>

            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-emerald-700 h-1.5 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="space-y-2.5 pt-1">
              {guidance.checklist.map((item) => {
                const checked = !!checklistProgress[item.id];
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                      checked
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                        : 'bg-white border-[#E4DCCB] text-slate-700 hover:bg-[#FBF9F4]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggleChecklist(item.id)}
                      className="mt-0.5 w-4 h-4 rounded text-[#0F3D2E] focus:ring-emerald-700 border-slate-300"
                    />
                    <div className="text-xs space-y-0.5">
                      <div className="font-medium flex items-center gap-1.5">
                        <span className={checked ? 'line-through text-slate-500' : 'text-slate-800'}>
                          {item.label}
                        </span>
                        {item.isCrucial && (
                          <span className="text-[10px] text-amber-700 font-semibold uppercase tracking-wider">
                            (Zorunlu)
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {item.explanation}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'ornekler' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">
              Aşağıdaki standart mahkeme ifadelerini tek tıkla doğrudan metninize ekleyebilir veya panoya kopyalayabilirsiniz:
            </p>

            <div className="space-y-2.5">
              {guidance.samplePhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="bg-[#FBF9F4] border border-[#E4DCCB] rounded-lg p-3 space-y-2 group hover:border-[#B45309]/50 transition-colors"
                >
                  <p className="text-xs leading-relaxed text-slate-700 italic">
                    "{phrase}"
                  </p>
                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-[#E4DCCB]/60">
                    <button
                      onClick={() => handleCopy(phrase)}
                      className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 px-2 py-1 rounded bg-white border border-[#E4DCCB] transition-colors"
                    >
                      {copiedPhrase === phrase ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-700" />
                          <span className="text-emerald-700">Kopyalandı</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Kopyala</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => onInsertSamplePhrase(phrase)}
                      className="flex items-center gap-1 text-[11px] text-white bg-[#0F3D2E] hover:bg-[#1A5340] px-2.5 py-1 rounded font-medium transition-colors"
                    >
                      Metne Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
