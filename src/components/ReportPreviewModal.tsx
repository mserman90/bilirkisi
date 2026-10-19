import React from 'react';
import { ExpertReport } from '../types';
import { exportReportToWord } from '../utils/exportWord';
import { X, FileDown, Printer, FileText } from 'lucide-react';

interface ReportPreviewModalProps {
  report: ExpertReport;
  onClose: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  report,
  onClose,
}) => {
  const steps = report.steps;
  const courtInfo = steps.step1_courtInfo;
  const inspection = steps.step2_inspection;
  const findings = steps.step3_findings;
  const evalData = steps.step4_evaluation;
  const legislation = steps.step5_legislation;
  const conclusion = steps.step6_conclusion;
  const sig = steps.step7_signatures;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#525659] p-4 sm:p-6 w-full max-w-4xl rounded-xl shadow-2xl space-y-4 max-h-[95vh] flex flex-col">
        
        {/* Modal Controls Bar (hidden during print) */}
        <div className="bg-[#323639] text-white px-4 py-2.5 rounded-lg flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2 text-xs font-medium">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span className="truncate max-w-[320px]">{report.title}</span>
            <span className="font-mono text-slate-400">· Resmî Belge Önizleme</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => exportReportToWord(report)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0F3D2E] hover:bg-[#1A5340] text-white rounded transition-colors shadow-xs"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Word (.doc) İndir</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white text-slate-800 hover:bg-slate-100 rounded transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Yazdır / PDF</span>
            </button>

            <button
              onClick={onClose}
              title="Kapat"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-white/10 transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Paper Document Preview (A4 Court Sheet layout) */}
        <div className="bg-white text-black p-8 sm:p-14 shadow-lg rounded overflow-y-auto font-serif text-[13px] leading-relaxed flex-1 print-container selection:bg-amber-100">
          
          {/* Header */}
          <div className="text-center font-bold space-y-1 mb-8 border-b-2 border-black pb-4">
            <p className="text-sm tracking-widest">T.C.</p>
            <p className="text-base uppercase tracking-wide">
              {courtInfo.courtName || '... MAHKEMESİNE'}
            </p>
            <p className="text-base tracking-widest pt-1">BİLİRKİŞİ RAPORU</p>
          </div>

          {/* Case Metadata Table */}
          <div className="mb-8 border border-black/40 rounded p-4 font-sans text-xs space-y-1.5 bg-[#FAF9F6]">
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">ESAS NO</span>
              <span className="col-span-9 font-mono">: {courtInfo.fileNumber || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">DAVA TÜRÜ</span>
              <span className="col-span-9">: {courtInfo.caseType || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">DAVACI</span>
              <span className="col-span-9">: {courtInfo.plaintiff || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">DAVALI</span>
              <span className="col-span-9">: {courtInfo.defendant || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">UYUŞMAZLIK</span>
              <span className="col-span-9">: {courtInfo.subject || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">BİLİRKİŞİ HEYETİ</span>
              <span className="col-span-9">: {courtInfo.panelMembers || '-'}</span>
            </div>
            <div className="grid grid-cols-12 gap-2">
              <span className="col-span-3 font-bold text-slate-900">RAPOR TARİHİ</span>
              <span className="col-span-9 font-mono">: {sig.reportDate || '-'}</span>
            </div>
          </div>

          {/* Section 1 */}
          <section className="mb-6 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              1. GÖREV VE DAVA BİLGİLERİ
            </h3>
            <p className="text-justify leading-relaxed indent-6">
              {courtInfo.subject || 'Sayın Mahkemeniz tensip zaptı uyarınca dosya teknik incelemeye tevdi edilmiştir.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-6 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              2. İNCELEME VE KEŞİF BİLGİLERİ
            </h3>
            <p className="indent-6">
              <strong>Keşif Tarihi ve Saati:</strong> {inspection.inspectionDate || '-'}
            </p>
            <p className="indent-6">
              <strong>Mahal ve Parsel Tanımı:</strong> {inspection.location || '-'} ({inspection.parcelInfo || '-'})
            </p>
            <p className="indent-6">
              <strong>Keşfe İştirak Edenler:</strong> {inspection.attendees || '-'}
            </p>
            <p className="text-justify leading-relaxed indent-6">
              <strong>Yapılan Gözlem ve Fiziki Durum:</strong> {inspection.observations || '-'}
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-6 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              3. TESPİTLER VE BULGULAR
            </h3>
            <p className="text-justify leading-relaxed indent-6">
              {findings.technicalFindings || 'Mahallinde fen ve teknik incelemeler gerçekleştirilmiştir.'}
            </p>
            {findings.damagePercentage && (
              <p className="indent-6">
                <strong>
                  {report.field === 'gida'
                    ? 'Saptanan Ayıp / Uygunsuzluk Derecesi:'
                    : report.field === 'hayvancilik'
                    ? 'Saptanan Telef ve Değer Kaybı Oranı:'
                    : 'Saptanan Zarar / Hasar Oranı:'}
                </strong>{' '}
                {findings.damagePercentage}
              </p>
            )}
            {findings.yieldData && (
              <p className="indent-6 font-mono text-xs">
                <strong>
                  {report.field === 'gida'
                    ? 'Parti Büyüklüğü ve Etkilenen Tüketici Sayısı:'
                    : report.field === 'hayvancilik'
                    ? 'Sürü Büyüklüğü ve Verim / Telef Kaybı:'
                    : 'Rekolte ve Verim Verisi:'}
                </strong>{' '}
                {findings.yieldData}
              </p>
            )}
            {findings.sampleAnalysis && (
              <p className="indent-6">
                <strong>Numune Analiz ve Muayene Raporları:</strong> {findings.sampleAnalysis}
              </p>
            )}
          </section>

          {/* Section 4 */}
          <section className="mb-6 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              4. TEKNİK VE BİLİMSEL DEĞERLENDİRME
            </h3>
            <p className="indent-6">
              <strong>Uygulanan Bilimsel Metot:</strong> {evalData.scientificMethod || '-'}
            </p>
            {evalData.calculationTable && (
              <div className="font-mono text-xs bg-slate-50 p-4 border border-black/20 rounded whitespace-pre-wrap my-3 leading-relaxed">
                {evalData.calculationTable}
              </div>
            )}
            <p className="text-justify leading-relaxed indent-6">
              <strong>Teknik Nedensellik (İlliyet) Bağı:</strong> {evalData.causalityAnalysis || '-'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="mb-6 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              5. MEVZUAT VE HUKUKİ DAYANAK
            </h3>
            <p className="text-justify leading-relaxed indent-6">
              İşbu raporun tanziminde 6100 sayılı Hukuk Muhakemeleri Kanunu md. 266-287 ve 6754 sayılı Bilirkişilik Kanunu hükümleri uyarınca yalnızca teknik ve bilimsel kurallar esas alınmış, HMK 279/1 gereğince hukuki nitelendirme ve hüküm içeren ifadelerden kaçınılmıştır.
            </p>
            {legislation.applicableLaws?.length > 0 && (
              <p className="indent-6">
                <strong>Dayanılan Özel Hükümler:</strong> {legislation.applicableLaws.join('; ')}
              </p>
            )}
            {legislation.legalArticles && (
              <p className="text-justify leading-relaxed indent-6">
                {legislation.legalArticles}
              </p>
            )}
            {legislation.precedentNotes && (
              <p className="text-justify leading-relaxed indent-6">
                <strong>Yargıtay İçtihatları:</strong> {legislation.precedentNotes}
              </p>
            )}
          </section>

          {/* Section 6 */}
          <section className="mb-8 space-y-2">
            <h3 className="font-bold text-sm tracking-wide border-b border-black/40 pb-1 uppercase">
              6. SONUÇ VE KANAAT
            </h3>
            <div className="text-justify leading-relaxed whitespace-pre-wrap font-sans text-xs bg-[#FAF9F6] p-4 border border-black/30 rounded">
              {conclusion.finalOpinion || 'Teknik ve bilimsel incelemeler neticesinde kanaate varılmıştır.'}
            </div>
            {conclusion.answersToCourt && (
              <div className="text-justify leading-relaxed whitespace-pre-wrap text-xs pt-2">
                <strong>Sayın Mahkemenin Sorularına Cevaplar:</strong><br />
                {conclusion.answersToCourt}
              </div>
            )}
            <p className="italic text-center pt-3 text-xs">
              {conclusion.expertStatement || 'Takdir Sayın Mahkemenize ait olmak üzere saygıyla arz olunur.'}
            </p>
          </section>

          {/* Section 7 / Signatures */}
          <div className="pt-8 flex justify-end">
            <div className="text-center space-y-1 font-sans text-xs min-w-[260px]">
              <p className="font-bold tracking-wider">BİLİRKİŞİ</p>
              <p className="font-semibold text-sm">{sig.expertName || 'Uzman Bilirkişi'}</p>
              <p className="text-slate-600">{sig.expertTitle || '-'}</p>
              <p className="font-mono text-slate-500">{sig.expertRegistrationNo || '-'}</p>
              <p className="text-slate-500">{sig.chamberMembership || ''}</p>
              <div className="pt-8 text-slate-400 italic font-mono text-[11px]">
                (e-imzalıdır / ıslak imza)
              </div>
            </div>
          </div>

          {/* Attachments list if any */}
          {report.attachments?.length > 0 && (
            <div className="mt-12 pt-4 border-t border-black/20 text-xs font-sans text-slate-600 space-y-1">
              <p className="font-bold text-slate-800 uppercase">RAPOR EKLERİ FİHRİSTİ:</p>
              {report.attachments.map((att, i) => (
                <p key={att.id} className="font-mono text-[11px]">
                  EK-{i + 1}: {att.name} ({att.description})
                </p>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
