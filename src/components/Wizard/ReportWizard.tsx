import React, { useState, useMemo } from 'react';
import { ExpertReport, ExpertProfile } from '../../types';
import { WIZARD_GUIDANCE } from '../../data/wizardGuidance';
import { LEGISLATION_DATABASE } from '../../data/legislation';
import { calculateStepProgress } from '../../utils/progressCalculator';
import { StepBar } from './StepBar';
import { CompletionRing } from './CompletionRing';
import { GuidancePanel } from './GuidancePanel';
import { AiAssistantPanel } from './AiAssistantPanel';
import { FieldAiAuditor } from './FieldAiAuditor';
import { AttachmentManager } from '../AttachmentManager';
import { ArrowLeft, ArrowRight, Save, Eye, FileDown, CheckCircle2, Award } from 'lucide-react';

interface ReportWizardProps {
  report: ExpertReport;
  onUpdateReport: (updated: ExpertReport) => void;
  onBackToList: () => void;
  onOpenPreview: (report: ExpertReport) => void;
  profile: ExpertProfile;
}

export const ReportWizard: React.FC<ReportWizardProps> = ({
  report,
  onUpdateReport,
  onBackToList,
  onOpenPreview,
  profile,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [saveStatus, setSaveStatus] = useState<string>('Tüm değişiklikler kaydedildi');

  const guidance = WIZARD_GUIDANCE[currentStep] || WIZARD_GUIDANCE[1];

  // Calculate dynamic step percentages for each of the 7 steps in real-time
  const stepPercentages = useMemo(() => {
    const res: Record<number, number> = {};
    for (let i = 1; i <= 7; i++) {
      res[i] = calculateStepProgress(report, i);
    }
    return res;
  }, [report]);

  const currentStepPercent = stepPercentages[currentStep] || 0;

  const handleStepDataChange = (stepKey: keyof ExpertReport['steps'], fieldKey: string, value: any) => {
    const updated: ExpertReport = {
      ...report,
      steps: {
        ...report.steps,
        [stepKey]: {
          ...report.steps[stepKey],
          [fieldKey]: value,
        },
      },
    };
    onUpdateReport(updated);
    setSaveStatus('Kaydedildi');
  };

  const handleToggleChecklist = (itemId: string) => {
    const updated: ExpertReport = {
      ...report,
      checklistProgress: {
        ...report.checklistProgress,
        [itemId]: !report.checklistProgress[itemId],
      },
    };
    onUpdateReport(updated);
  };

  const getCurrentStepText = (): string => {
    switch (currentStep) {
      case 1:
        return report.steps.step1_courtInfo.subject;
      case 2:
        return report.steps.step2_inspection.observations;
      case 3:
        return report.steps.step3_findings.technicalFindings;
      case 4:
        return report.steps.step4_evaluation.causalityAnalysis || report.steps.step4_evaluation.calculationTable;
      case 5:
        return report.steps.step5_legislation.legalArticles;
      case 6:
        return report.steps.step6_conclusion.finalOpinion;
      case 7:
        return report.steps.step6_conclusion.expertStatement;
      default:
        return '';
    }
  };

  const handleApplyAiText = (newText: string) => {
    switch (currentStep) {
      case 1:
        handleStepDataChange('step1_courtInfo', 'subject', newText);
        break;
      case 2:
        handleStepDataChange('step2_inspection', 'observations', newText);
        break;
      case 3:
        handleStepDataChange('step3_findings', 'technicalFindings', newText);
        break;
      case 4:
        handleStepDataChange('step4_evaluation', 'causalityAnalysis', newText);
        break;
      case 5:
        handleStepDataChange('step5_legislation', 'legalArticles', newText);
        break;
      case 6:
        handleStepDataChange('step6_conclusion', 'finalOpinion', newText);
        break;
      case 7:
        handleStepDataChange('step6_conclusion', 'expertStatement', newText);
        break;
    }
  };

  const handleAppendAiText = (additionalText: string) => {
    const existing = getCurrentStepText();
    const merged = existing ? `${existing}\n\n${additionalText}` : additionalText;
    handleApplyAiText(merged);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4]">
      {/* Sub Header / Action bar */}
      <div className="bg-white border-b border-[#E4DCCB] px-4 sm:px-6 py-2.5 flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToList}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Rapor Listesi</span>
          </button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm text-slate-900 truncate max-w-[280px] sm:max-w-[420px]">
              {report.title}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {report.field.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-[11px] text-slate-400 font-mono">
            {saveStatus}
          </span>
          <button
            onClick={() => onOpenPreview(report)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-[#F1ECE1] hover:bg-[#E4DCCB] rounded-md transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Resmî Önizle & İndir</span>
          </button>
        </div>
      </div>

      {/* 7-Step StepBar with individual completion rings */}
      <StepBar
        currentStep={currentStep}
        onSelectStep={(step) => setCurrentStep(step)}
        stepPercentages={stepPercentages}
      />

      {/* Main Workspace (3 columns on lg: 1fr content + 380px guidance) */}
      <div className="max-w-[1440px] w-full mx-auto p-4 sm:p-6 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left / Center Column: Step Form and AI Assistant (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Active Step Card */}
          <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
            
            {/* Step Header with prominent Completion Ring & Stats */}
            <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-semibold">
                  <span>ADIM 0{currentStep} / 07</span>
                  <span>·</span>
                  <span className="uppercase">{report.field} UZMANLIĞI</span>
                </div>
                <h2 className="font-serif font-bold text-xl text-slate-900 mt-1 truncate">
                  {guidance.title}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {guidance.subtitle}
                </p>
              </div>

              {/* Visual Step Completion Ring Badge */}
              <div className="flex items-center gap-3 bg-[#FBF9F4] border border-[#E4DCCB] px-3.5 py-2 rounded-xl shrink-0">
                <CompletionRing
                  percentage={currentStepPercent}
                  size={46}
                  strokeWidth={4}
                  showText={true}
                />
                <div className="text-right leading-tight hidden sm:block">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block">
                    Bu Adım Doluluğu
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {currentStepPercent === 100 ? (
                      <span className="text-emerald-700 flex items-center gap-1 justify-end">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Tamamlandı
                      </span>
                    ) : (
                      `%${currentStepPercent} Hazır`
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Dynamic Step Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Adım İlerlemesi (Metin Girişi + Kontrol Listesi)</span>
                <span className="font-mono font-bold text-slate-800 tabular-nums">
                  %{currentStepPercent}
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 transition-all duration-500 ease-out rounded-full ${
                    currentStepPercent === 100
                      ? 'bg-emerald-600'
                      : currentStepPercent >= 60
                      ? 'bg-[#0F3D2E]'
                      : 'bg-[#B45309]'
                  }`}
                  style={{ width: `${currentStepPercent}%` }}
                />
              </div>
            </div>

            {/* Step-specific Form Fields with FieldAiAuditor */}
            {currentStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Mahkeme Adı (Resmî Antet) *
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: KONYA 2. ASLİYE HUKUK MAHKEMESİ"
                      value={report.steps.step1_courtInfo.courtName}
                      onChange={(e) => handleStepDataChange('step1_courtInfo', 'courtName', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Dosya Esas Numarası *
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 2025/342 Esas"
                      value={report.steps.step1_courtInfo.fileNumber}
                      onChange={(e) => handleStepDataChange('step1_courtInfo', 'fileNumber', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Dava Türü / Niteliği
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Zirai Don ve Kuraklık Kaynaklı Maddi Tazminat Talebi"
                    value={report.steps.step1_courtInfo.caseType}
                    onChange={(e) => handleStepDataChange('step1_courtInfo', 'caseType', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Davacı (Ad / Unvan)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Ahmet Yılmaz"
                      value={report.steps.step1_courtInfo.plaintiff}
                      onChange={(e) => handleStepDataChange('step1_courtInfo', 'plaintiff', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Davalı (Ad / Unvan / İdare)
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: Anadolu Sulama Birliği Başkanlığı"
                      value={report.steps.step1_courtInfo.defendant}
                      onChange={(e) => handleStepDataChange('step1_courtInfo', 'defendant', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Uyuşmazlık Konusu ve Mahkemenin Görevlendirme Amacı *
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Mahkemenin tensip zaptındaki bilirkişiye sorduğu hususları ve uyuşmazlığın teknik özetini buraya yazınız..."
                    value={report.steps.step1_courtInfo.subject}
                    onChange={(e) => handleStepDataChange('step1_courtInfo', 'subject', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed text-slate-800"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={1}
                    stepTitle="Görev ve Dava Bilgileri"
                    fieldLabel="Uyuşmazlık Konusu"
                    text={report.steps.step1_courtInfo.subject}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step1_courtInfo', 'subject', fixed)}
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Bilirkişi Heyeti ve Uzmanlık Alanları
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Serdar Erman (Ziraat Yüksek Mühendisi - Tek Bilirkişi)"
                    value={report.steps.step1_courtInfo.panelMembers}
                    onChange={(e) => handleStepDataChange('step1_courtInfo', 'panelMembers', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Keşif / İnceleme Tarihi ve Saati *
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 15.05.2025 Saat: 10:30"
                      value={report.steps.step2_inspection.inspectionDate}
                      onChange={(e) => handleStepDataChange('step2_inspection', 'inspectionDate', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Ada / Parsel / İşletme Sicil Bilgisi *
                    </label>
                    <input
                      type="text"
                      placeholder="Örn: 142 Ada 18 Parsel (45.200 m² Sulu Tarla)"
                      value={report.steps.step2_inspection.parcelInfo}
                      onChange={(e) => handleStepDataChange('step2_inspection', 'parcelInfo', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Mahal ve Adres Tanımı
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Konya İli, Karatay İlçesi, İsmil Mahallesi Mevkii"
                    value={report.steps.step2_inspection.location}
                    onChange={(e) => handleStepDataChange('step2_inspection', 'location', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Keşfe İştirak Edenler ve Taraf Temsilcileri
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Naip Hâkim, Zabıt Kâtibi, Davacı asil ve vekili Av. Mehmet Can, Davalı temsilcisi"
                    value={report.steps.step2_inspection.attendees}
                    onChange={(e) => handleStepDataChange('step2_inspection', 'attendees', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Mahallinde Yapılan Gözlemler ve Taşınmazın Fiziki Durumu *
                    </label>
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Keşif anında arazinin/tesisin fiziksel durumu, topoğrafyası, ekili ürünün genel hali ve çevre parsellerle durumu..."
                    value={report.steps.step2_inspection.observations}
                    onChange={(e) => handleStepDataChange('step2_inspection', 'observations', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed text-slate-800"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={2}
                    stepTitle="İnceleme ve Keşif Bilgileri"
                    fieldLabel="Keşif Gözlemleri"
                    text={report.steps.step2_inspection.observations}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step2_inspection', 'observations', fixed)}
                  />
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Maddi ve Teknik Bulgular *
                    </label>
                  </div>
                  <textarea
                    rows={5}
                    placeholder="Yapılan örneklemeler, fenolojik inceleme detayları, bitki/gıda/hayvan durumunda saptanan somut maddi vakıalar..."
                    value={report.steps.step3_findings.technicalFindings}
                    onChange={(e) => handleStepDataChange('step3_findings', 'technicalFindings', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed text-slate-800"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={3}
                    stepTitle="Tespitler ve Bulgular"
                    fieldLabel="Teknik Bulgular"
                    text={report.steps.step3_findings.technicalFindings}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step3_findings', 'technicalFindings', fixed)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      {report.field === 'gida'
                        ? 'Saptanan Ayıp / Uygunsuzluk Derecesi'
                        : report.field === 'hayvancilik'
                        ? 'Saptanan Telef ve Değer Kaybı Oranı'
                        : 'Saptanan Zarar / Hasar Oranı (%)'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        report.field === 'gida'
                          ? 'Örn: Gıda Güvenilirliği Tam İhlali (%100 Uygunsuzluk)'
                          : report.field === 'hayvancilik'
                          ? 'Örn: 3 Baş Telef, 5 Baş Zorunlu Kesim'
                          : 'Örn: %32.00 Ortalama Rekolte Kaybı'
                      }
                      value={report.steps.step3_findings.damagePercentage}
                      onChange={(e) => handleStepDataChange('step3_findings', 'damagePercentage', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      {report.field === 'gida'
                        ? 'Parti / Porsiyon ve Etkilenen Tüketici Sayısı'
                        : report.field === 'hayvancilik'
                        ? 'Sürü Büyüklüğü ve Verim / Hayvan Kaybı'
                        : 'Rekolte ve Verim / Ölçüm Kıyas Verisi'}
                    </label>
                    <input
                      type="text"
                      placeholder={
                        report.field === 'gida'
                          ? 'Örn: İncelenen Parti: 350 Porsiyon | Zehirlenen Kişi: 48 Kişi'
                          : report.field === 'hayvancilik'
                          ? 'Örn: Süt Verim Kaybı: Günlük 620 Lt x 60 Gün = 37.200 Lt'
                          : 'Örn: Normal Verim: 550 kg/da | Gerçekleşen: 374 kg/da'
                      }
                      value={report.steps.step3_findings.yieldData}
                      onChange={(e) => handleStepDataChange('step3_findings', 'yieldData', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Numune ve Laboratuvar / Muayene Analiz Tutanakları
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: İl Tarım ve Orman Müdürlüğü 2025/1109 sayılı Fen ve Dane Analiz Raporu"
                    value={report.steps.step3_findings.sampleAnalysis}
                    onChange={(e) => handleStepDataChange('step3_findings', 'sampleAnalysis', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Ham Saha Notları ve Karşılaştırmalı Gözlemler
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Emsal sağlam parseller veya ek kontrol notları..."
                    value={report.steps.step3_findings.rawNotes}
                    onChange={(e) => handleStepDataChange('step3_findings', 'rawNotes', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Uygulanan Bilimsel Değerleme Metodu *
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Kamulaştırma Kanunu 11. Maddesi Net Gelir Yöntemi ve Resmi Maliyet Cetveli Analizi"
                    value={report.steps.step4_evaluation.scientificMethod}
                    onChange={(e) => handleStepDataChange('step4_evaluation', 'scientificMethod', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Ayrıntılı Matematiksel Hesap Tablosu / Cetveli *
                    </label>
                  </div>
                  <textarea
                    rows={6}
                    placeholder={`1. Parsel Alanı: 45,20 Dekar
2. Dekar Başı Kayıp: 176 Kg
3. Toplam Kayıp: 7.955,20 Kg
4. Fiyat: 11,20 TL/Kg
5. Net Birim Değer (%10 Masraf Düşülmüş): 10,08 TL/Kg
6. Toplam Zarar: 80.188,42 TL`}
                    value={report.steps.step4_evaluation.calculationTable}
                    onChange={(e) => handleStepDataChange('step4_evaluation', 'calculationTable', e.target.value)}
                    className="w-full px-3 py-2 font-mono text-xs border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed bg-[#FBF9F4]/40"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={4}
                    stepTitle="Teknik Değerlendirme"
                    fieldLabel="Hesap Cetveli"
                    text={report.steps.step4_evaluation.calculationTable}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step4_evaluation', 'calculationTable', fixed)}
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Teknik Nedensellik (İlliyet) Bağı Analizi *
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Olay ile meydana gelen zarar arasındaki teknik bağlantıyı, zamansal örtüşmeyi ve fiziksel sebepleri açıklayınız..."
                    value={report.steps.step4_evaluation.causalityAnalysis}
                    onChange={(e) => handleStepDataChange('step4_evaluation', 'causalityAnalysis', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={4}
                    stepTitle="Teknik Değerlendirme"
                    fieldLabel="İlliyet Bağı"
                    text={report.steps.step4_evaluation.causalityAnalysis}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step4_evaluation', 'causalityAnalysis', fixed)}
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Teknik Değerlendirme Özeti
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Parseldeki rekolte kaybı tarımsal kusurdan değil, doğrudan su kesintisinden ileri gelmiştir."
                    value={report.steps.step4_evaluation.technicalConclusion}
                    onChange={(e) => handleStepDataChange('step4_evaluation', 'technicalConclusion', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1.5">
                    Dayanılan Mevzuat Maddeleri (Seçiniz)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LEGISLATION_DATABASE.map((leg) => {
                      const selected = (report.steps.step5_legislation.applicableLaws || []).includes(leg.title);
                      return (
                        <button
                          key={leg.id}
                          type="button"
                          onClick={() => {
                            const current = report.steps.step5_legislation.applicableLaws || [];
                            const next = selected ? current.filter((x) => x !== leg.title) : [...current, leg.title];
                            handleStepDataChange('step5_legislation', 'applicableLaws', next);
                          }}
                          className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex items-start gap-2 ${
                            selected
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                              : 'bg-white border-[#E4DCCB] text-slate-700 hover:bg-[#FBF9F4]'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold text-slate-400 mt-0.5">
                            {selected ? '✓' : '+'}
                          </span>
                          <div>
                            <div className="font-semibold text-xs text-slate-900">{leg.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">{leg.summary}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Kanun ve Yönetmelik Hükümleri ile HMK 279/1 Açıklaması *
                    </label>
                  </div>
                  <textarea
                    rows={4}
                    placeholder="Bilirkişi olarak hukuki nitelendirme yapmaksızın yalnızca teknik ve bilimsel kurallara dayanıldığına dair mevzuat açıklaması..."
                    value={report.steps.step5_legislation.legalArticles}
                    onChange={(e) => handleStepDataChange('step5_legislation', 'legalArticles', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed text-slate-800"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={5}
                    stepTitle="Mevzuat Dayanağı"
                    fieldLabel="Kanun Maddeleri & HMK 279"
                    text={report.steps.step5_legislation.legalArticles}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step5_legislation', 'legalArticles', fixed)}
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    İlgili Yargıtay İçtihatları ve Emsal Karar Referansları
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Örn: Yargıtay 5. Hukuk Dairesi net gelir metodu ve yöre münavebesine dair ilke kararları..."
                    value={report.steps.step5_legislation.precedentNotes}
                    onChange={(e) => handleStepDataChange('step5_legislation', 'precedentNotes', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block font-medium text-slate-700">
                      Nihai Teknik Görüş ve Sonuç Maddeleri *
                    </label>
                  </div>
                  <textarea
                    rows={5}
                    placeholder={`1. Dava konusu parselde rekolte kaybının %32 olduğu,
2. Toplam maddi zararın 80.188,42 TL olarak hesaplandığı,
3. Zarar ile olay arasında doğrudan illiyet bulunduğu mütalaa edilmiştir.`}
                    value={report.steps.step6_conclusion.finalOpinion}
                    onChange={(e) => handleStepDataChange('step6_conclusion', 'finalOpinion', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E] leading-relaxed text-slate-800"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={6}
                    stepTitle="Sonuç ve Kanaat"
                    fieldLabel="Nihai Görüş ve Hüküm"
                    text={report.steps.step6_conclusion.finalOpinion}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step6_conclusion', 'finalOpinion', fixed)}
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Mahkemenin Tensip Zaptındaki Sorularına Sırasıyla Cevaplar
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mahkemenin 1 nolu sorusuna: Zarar miktarı 80.188,42 TL'dir. 2 nolu sorusuna: İlliyet tamdır."
                    value={report.steps.step6_conclusion.answersToCourt}
                    onChange={(e) => handleStepDataChange('step6_conclusion', 'answersToCourt', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block font-medium text-slate-700">
                    Bilirkişi Beyanı ve Resmî Kapanış İfadesi
                  </label>
                  <input
                    type="text"
                    value={report.steps.step6_conclusion.expertStatement}
                    onChange={(e) => handleStepDataChange('step6_conclusion', 'expertStatement', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                  {/* Inline AI Auditor */}
                  <FieldAiAuditor
                    field={report.field}
                    stepNumber={6}
                    stepTitle="Sonuç ve Kanaat"
                    fieldLabel="Bilirkişi Beyanı"
                    text={report.steps.step6_conclusion.expertStatement}
                    context={report.steps}
                    onApplyFix={(fixed) => handleStepDataChange('step6_conclusion', 'expertStatement', fixed)}
                  />
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Rapor Tarihi *
                    </label>
                    <input
                      type="text"
                      value={report.steps.step7_signatures.reportDate}
                      onChange={(e) => handleStepDataChange('step7_signatures', 'reportDate', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Bilirkişi Adı Soyadı *
                    </label>
                    <input
                      type="text"
                      value={report.steps.step7_signatures.expertName}
                      onChange={(e) => handleStepDataChange('step7_signatures', 'expertName', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Mesleki Unvan ve Uzmanlık Alanı
                    </label>
                    <input
                      type="text"
                      value={report.steps.step7_signatures.expertTitle}
                      onChange={(e) => handleStepDataChange('step7_signatures', 'expertTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      Bilirkişilik Sicil Numarası
                    </label>
                    <input
                      type="text"
                      value={report.steps.step7_signatures.expertRegistrationNo}
                      onChange={(e) => handleStepDataChange('step7_signatures', 'expertRegistrationNo', e.target.value)}
                      className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Oda / Birlik Sicil Kaydı
                  </label>
                  <input
                    type="text"
                    value={report.steps.step7_signatures.chamberMembership}
                    onChange={(e) => handleStepDataChange('step7_signatures', 'chamberMembership', e.target.value)}
                    className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                  />
                </div>

                {/* Attachment Manager */}
                <div className="pt-4 border-t border-slate-100">
                  <AttachmentManager
                    attachments={report.attachments || []}
                    onUpdateAttachments={(attachments) => {
                      onUpdateReport({ ...report, attachments });
                    }}
                  />
                </div>
              </div>
            )}

            {/* Step Navigation Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={currentStep === 1}
                onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-[#E4DCCB] rounded-lg hover:bg-slate-50 disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Önceki Adım</span>
              </button>

              <div className="flex items-center gap-2">
                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((s) => Math.min(7, s + 1))}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold text-white bg-[#0F3D2E] rounded-lg hover:bg-[#1A5340] shadow-xs transition-colors"
                  >
                    <span>Sonraki Adım</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onOpenPreview(report)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#B45309] rounded-lg hover:bg-[#92400E] shadow-xs transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Raporu Tamamla ve Önizle</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* AI Assistant Panel */}
          <AiAssistantPanel
            field={report.field}
            stepNumber={currentStep}
            stepTitle={guidance.title}
            context={report.steps}
            currentText={getCurrentStepText()}
            onApplyText={handleApplyAiText}
            onAppendText={handleAppendAiText}
          />
        </div>

        {/* Right Column: Educational Guidance Panel (4-5 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 h-full">
          <div className="sticky top-20 h-[calc(100vh-6rem)]">
            <GuidancePanel
              guidance={guidance}
              checklistProgress={report.checklistProgress || {}}
              onToggleChecklist={handleToggleChecklist}
              onInsertSamplePhrase={handleAppendAiText}
            />
          </div>
        </div>

      </div>
    </div>
  );
};
