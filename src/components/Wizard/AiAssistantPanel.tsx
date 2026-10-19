import React, { useState } from 'react';
import { ExpertField, AiEvaluationResult } from '../../types';
import { AiService } from '../../services/aiService';
import { Sparkles, ShieldAlert, CheckCircle, ArrowRight, RefreshCw, AlertCircle, Check } from 'lucide-react';

interface AiAssistantPanelProps {
  field: ExpertField;
  stepNumber: number;
  stepTitle: string;
  context: Record<string, any>;
  currentText: string;
  onApplyText: (newText: string) => void;
  onAppendText: (additionalText: string) => void;
}

export const AiAssistantPanel: React.FC<AiAssistantPanelProps> = ({
  field,
  stepNumber,
  stepTitle,
  context,
  currentText,
  onApplyText,
  onAppendText,
}) => {
  const [drafting, setDrafting] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [draftResult, setDraftResult] = useState<string | null>(null);
  const [evalResult, setEvalResult] = useState<AiEvaluationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [appliedNotification, setAppliedNotification] = useState<string | null>(null);

  const handleGenerateDraft = async () => {
    setDrafting(true);
    setErrorMsg(null);
    setDraftResult(null);
    try {
      const res = await AiService.generateDraft({
        field,
        stepNumber,
        stepTitle,
        context,
        existingText: currentText,
      });
      setDraftResult(res.draftText);
    } catch (e: any) {
      setErrorMsg(e.message || 'AI taslak üretilirken bir hata oluştu.');
    } finally {
      setDrafting(false);
    }
  };

  const handleEvaluate = async () => {
    if (!currentText || currentText.trim().length < 15) {
      setErrorMsg('Değerlendirme yapabilmek için lütfen en az 15 karakterlik bir metin giriniz.');
      return;
    }
    setEvaluating(true);
    setErrorMsg(null);
    setEvalResult(null);
    try {
      const res = await AiService.evaluateContent({
        field,
        stepNumber,
        stepTitle,
        text: currentText,
        context,
      });
      setEvalResult(res);
    } catch (e: any) {
      setErrorMsg(e.message || 'Mevzuat denetimi sırasında bir hata oluştu.');
    } finally {
      setEvaluating(false);
    }
  };

  const notifyApplied = (msg: string) => {
    setAppliedNotification(msg);
    setTimeout(() => setAppliedNotification(null), 2500);
  };

  return (
    <div className="bg-white border border-[#E4DCCB] rounded-xl shadow-xs overflow-hidden">
      {/* Top Header */}
      <div className="bg-[#FBF9F4] px-4 py-3 border-b border-[#E4DCCB] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#B45309]" />
          <h3 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
            Yapay Zekâ Bilirkişi Asistanı
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleGenerateDraft}
            disabled={drafting || evaluating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-[#0F3D2E] text-white hover:bg-[#1A5340] disabled:opacity-50 transition-colors shadow-xs"
          >
            {drafting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Hazırlanıyor...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bölüm Taslağı Yaz</span>
              </>
            )}
          </button>

          <button
            onClick={handleEvaluate}
            disabled={drafting || evaluating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md bg-white border border-[#E4DCCB] text-slate-700 hover:bg-[#F1ECE1] disabled:opacity-50 transition-colors"
          >
            {evaluating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-700" />
                <span>Denetleniyor...</span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Mevzuat Denetimi Yap</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Applied Banner */}
      {appliedNotification && (
        <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 flex items-center gap-1.5 border-b border-emerald-200">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{appliedNotification}</span>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-rose-50 text-rose-800 text-xs px-4 py-2.5 flex items-center gap-2 border-b border-rose-200">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Results View */}
      {(draftResult || evalResult) && (
        <div className="p-4 space-y-4 bg-[#FBF9F4]/40">
          {/* Draft Result */}
          {draftResult && (
            <div className="space-y-2 border border-emerald-200 bg-white rounded-lg p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-100">
                <span className="font-semibold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Önerilen Resmî Taslak Metin
                </span>
                <span className="text-[11px] text-slate-500">6754 s. Kanun & HMK 279 Uyumlu</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-sans whitespace-pre-wrap bg-[#FBF9F4] p-3 rounded border border-[#E4DCCB]">
                {draftResult}
              </p>
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    onAppendText(draftResult);
                    notifyApplied('Metin mevcut içeriğin sonuna eklendi.');
                  }}
                  className="px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-[#E4DCCB] hover:bg-slate-50 rounded"
                >
                  Mevcut Metne Ekle
                </button>
                <button
                  onClick={() => {
                    onApplyText(draftResult);
                    notifyApplied('Taslak metin editöre aktarıldı.');
                  }}
                  className="px-3 py-1 text-xs font-semibold text-white bg-[#0F3D2E] hover:bg-[#1A5340] rounded shadow-xs"
                >
                  Editöre Aktar (Üzerine Yaz)
                </button>
              </div>
            </div>
          )}

          {/* Evaluation Result */}
          {evalResult && (
            <div className="space-y-3 border border-amber-200 bg-white rounded-lg p-3.5 shadow-xs">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                    evalResult.compliant ? 'bg-emerald-100 text-emerald-900' : 'bg-rose-100 text-rose-900'
                  }`}>
                    {evalResult.compliant ? 'HMK 279/1 Uyumlu' : 'Hukuki Nitelendirme Riski'}
                  </span>
                  <span className="text-slate-600">Teknik Uygunluk Puanı:</span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {evalResult.score}/100
                  </span>
                </div>
              </div>

              {/* Warnings */}
              {evalResult.warnings?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wide">
                    Dikkat Edilmesi Gereken Hususlar:
                  </span>
                  <ul className="space-y-1">
                    {evalResult.warnings.map((w, i) => (
                      <li key={i} className="text-xs text-amber-900 bg-amber-50/80 p-2 rounded border border-amber-200/60 leading-relaxed">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {evalResult.recommendations?.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-700 uppercase tracking-wide">
                    Teknik ve Mevzuat Önerileri:
                  </span>
                  <ul className="space-y-1">
                    {evalResult.recommendations.map((rec, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 leading-relaxed">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Fix */}
              {evalResult.suggestedFix && (
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wide">
                    Önerilen Düzeltilmiş Metin:
                  </span>
                  <p className="text-xs text-slate-700 bg-[#FBF9F4] p-2.5 rounded border border-[#E4DCCB] leading-relaxed">
                    {evalResult.suggestedFix}
                  </p>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => {
                        onApplyText(evalResult.suggestedFix);
                        notifyApplied('Önerilen düzeltme metne uygulandı.');
                      }}
                      className="px-3 py-1 text-xs font-semibold text-white bg-[#B45309] hover:bg-[#92400E] rounded shadow-xs"
                    >
                      Düzeltmeyi Uygula
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
