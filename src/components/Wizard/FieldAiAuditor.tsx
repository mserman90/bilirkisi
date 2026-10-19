import React, { useState } from 'react';
import { ExpertField, AiEvaluationResult } from '../../types';
import { AiService } from '../../services/aiService';
import { ShieldCheck, ShieldAlert, Sparkles, RefreshCw, Check, X, AlertTriangle, ArrowRight } from 'lucide-react';

interface FieldAiAuditorProps {
  field: ExpertField;
  stepNumber: number;
  stepTitle: string;
  fieldLabel: string;
  text: string;
  context: Record<string, any>;
  onApplyFix: (fixedText: string) => void;
}

export const FieldAiAuditor: React.FC<FieldAiAuditorProps> = ({
  field,
  stepNumber,
  stepTitle,
  fieldLabel,
  text,
  context,
  onApplyFix,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiEvaluationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const handleAudit = async () => {
    if (!text || text.trim().length < 15) {
      setError('Denetim yapabilmek için lütfen bu alana en az 15 karakterlik bir metin giriniz.');
      setIsOpen(true);
      return;
    }

    setIsOpen(true);
    setLoading(true);
    setError(null);
    setApplied(false);

    try {
      const res = await AiService.evaluateContent({
        field,
        stepNumber,
        stepTitle: `${stepTitle} - ${fieldLabel}`,
        text,
        context,
      });
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'Denetim yapılırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (fixedText: string) => {
    onApplyFix(fixedText);
    setApplied(true);
    setTimeout(() => {
      setApplied(false);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-2">
      {/* Trigger Button Row */}
      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={handleAudit}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-semibold text-[#0F3D2E] bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-300/80 rounded-md shadow-2xs transition-all active:scale-[0.98] disabled:opacity-50"
          title="Yazdığınız içeriği HMK 279/1 hukuki nitelendirme yasağı ve teknik dil açısından denetler"
        >
          {loading ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-800" />
              <span>Mevzuat Denetleniyor...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span>AI ile Denetle & Puanla</span>
            </>
          )}
        </button>
      </div>

      {/* Inline Audit Result Card */}
      {isOpen && (
        <div className="border border-[#E4DCCB] bg-[#FBF9F4] rounded-lg p-3.5 space-y-3 shadow-xs animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-[#E4DCCB] pb-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-slate-900">
                AI Mevzuat & Teknik Dil Denetim Raporu
              </span>
              {result && (
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider font-mono ${
                    result.compliant
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                      : 'bg-rose-100 text-rose-900 border border-rose-200'
                  }`}
                >
                  {result.compliant ? 'HMK 279 Uyumlu' : 'Nitelendirme Riski'}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {result && (
                <div className="flex items-center gap-1 font-mono text-xs">
                  <span className="text-slate-500">Puan:</span>
                  <span
                    className={`font-bold tabular-nums text-sm ${
                      result.score >= 80
                        ? 'text-emerald-700'
                        : result.score >= 60
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {result.score}/100
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-0.5 rounded"
                title="Paneli Kapat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-4 text-center space-y-2">
              <RefreshCw className="w-5 h-5 text-emerald-800 animate-spin mx-auto" />
              <p className="text-xs text-slate-600 font-medium">
                Metin HMK md. 279/1, Yargıtay ilkeleri ve teknik dil kriterlerine göre analiz ediliyor...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-xs text-rose-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Result details */}
          {result && !loading && (
            <div className="space-y-2.5 text-xs">
              {/* Warnings */}
              {result.warnings && result.warnings.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-amber-900 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-700" />
                    <span>Tespit Edilen Riskler / Eksiklikler:</span>
                  </span>
                  <ul className="space-y-1">
                    {result.warnings.map((w, idx) => (
                      <li
                        key={idx}
                        className="bg-amber-50 text-amber-900 p-2 rounded border border-amber-200/80 leading-relaxed text-[11px]"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-700">
                    İyileştirme Önerileri:
                  </span>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-slate-700 flex items-start gap-1.5 text-[11px] leading-relaxed">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Fix */}
              {result.suggestedFix && (
                <div className="pt-2 border-t border-[#E4DCCB] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-800">
                      Önerilen Düzeltilmiş Resmî İfade:
                    </span>
                    {applied ? (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Alana Uygulandı
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApply(result.suggestedFix)}
                        className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-[#0F3D2E] hover:bg-[#1A5340] rounded shadow-2xs transition-colors"
                      >
                        <span>Düzeltmeyi Alana Uygula</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  <div className="p-2.5 bg-white border border-[#E4DCCB] rounded text-slate-800 leading-relaxed font-sans text-xs whitespace-pre-wrap">
                    {result.suggestedFix}
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
