import React, { useState } from 'react';
import { ExpertReport, ExpertField, ReportStatus } from '../types';
import { exportReportToWord } from '../utils/exportWord';
import {
  FileText,
  PlusCircle,
  Search,
  Eye,
  FileDown,
  Trash2,
  Copy,
  Clock,
  Layers,
  CheckCircle,
  Building2,
  Wheat,
  UtensilsCrossed,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface ReportListProps {
  reports: ExpertReport[];
  onSelectReport: (report: ExpertReport) => void;
  onNewReport: (field?: ExpertField) => void;
  onDeleteReport: (id: string) => void;
  onDuplicateReport: (report: ExpertReport) => void;
  onOpenPreview: (report: ExpertReport) => void;
}

export const ReportList: React.FC<ReportListProps> = ({
  reports,
  onSelectReport,
  onNewReport,
  onDeleteReport,
  onDuplicateReport,
  onOpenPreview,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = reports.filter((r) => {
    const matchesField = selectedField === 'all' || r.field === selectedField;
    const matchesStatus = selectedStatus === 'all' || r.status === selectedStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.steps.step1_courtInfo.courtName.toLowerCase().includes(q) ||
      r.steps.step1_courtInfo.fileNumber.toLowerCase().includes(q) ||
      r.steps.step1_courtInfo.plaintiff.toLowerCase().includes(q);

    return matchesField && matchesStatus && matchesSearch;
  });

  const getFieldColor = (field: ExpertField) => {
    switch (field) {
      case 'ziraat':
        return 'text-[#15803D] bg-[#15803D]/10 border-[#15803D]/25';
      case 'gida':
        return 'text-[#B45309] bg-[#B45309]/10 border-[#B45309]/25';
      case 'hayvancilik':
        return 'text-[#0E7490] bg-[#0E7490]/10 border-[#0E7490]/25';
      default:
        return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'tamamlandi':
        return <span className="text-emerald-800 bg-emerald-50 text-[11px] font-medium px-2 py-0.5 rounded">Tamamlandı</span>;
      case 'inceleniyor':
        return <span className="text-amber-800 bg-amber-50 text-[11px] font-medium px-2 py-0.5 rounded">İnceleniyor</span>;
      case 'arsivlendi':
        return <span className="text-slate-600 bg-slate-100 text-[11px] font-medium px-2 py-0.5 rounded">Arşivlendi</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 text-[11px] font-medium px-2 py-0.5 rounded">Taslak</span>;
    }
  };

  const calculateCompletion = (r: ExpertReport): number => {
    const checks = Object.values(r.checklistProgress || {});
    if (checks.length === 0) return 30; // base progress
    const checked = checks.filter(Boolean).length;
    return Math.min(100, Math.round((checked / Math.max(1, checks.length)) * 100));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 space-y-8">
      
      {/* Hero Panel with 7-step workflow ribbon */}
      <div className="bg-[#0F3D2E] text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm border border-[#1A5340]">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-[#F1ECE1]/80">
            <span>RESMÎ BİLİRKİŞİLİK ÇALIŞMA ALANI</span>
            <span>·</span>
            <span>HMK MD. 266-287 & 6754 S. KANUN</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Adım Adım Bilirkişi Raporu Yazma ve Mevzuat Otomasyonu
          </h1>

          <p className="text-sm text-emerald-100/90 leading-relaxed font-sans max-w-2xl">
            Ziraat mühendisleri, gıda mühendisleri ve veteriner hekimler için öğretici rehberlik, Yargıtay denetimine uygunluk kontrol listeleri ve yapay zekâ destekli 7 adımlı rapor mimarisi.
          </p>

          {/* Quick launch field buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNewReport('ziraat')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-white border border-emerald-600/50 transition-colors shadow-xs"
            >
              <Wheat className="w-4 h-4 text-emerald-300" />
              <span>Ziraat Raporu Başlat</span>
            </button>

            <button
              onClick={() => onNewReport('gida')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-900/70 hover:bg-amber-800 text-white border border-amber-600/50 transition-colors shadow-xs"
            >
              <UtensilsCrossed className="w-4 h-4 text-amber-300" />
              <span>Gıda Raporu Başlat</span>
            </button>

            <button
              onClick={() => onNewReport('hayvancilik')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-cyan-950/80 hover:bg-cyan-900 text-white border border-cyan-700/50 transition-colors shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-300" />
              <span>Hayvancılık Raporu Başlat</span>
            </button>
          </div>
        </div>

        {/* 7-Step Ribbon on bottom of Hero */}
        <div className="mt-8 pt-5 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { num: '01', title: 'Görev & Dava', desc: 'Mahkeme ve Esas' },
            { num: '02', title: 'Keşif & İnceleme', desc: 'Mahal ve Taraf' },
            { num: '03', title: 'Maddi Bulgular', desc: 'Örnekleme & Veri' },
            { num: '04', title: 'Teknik Değerlendirme', desc: 'Net Gelir & İlliyet' },
            { num: '05', title: 'Mevzuat Dayanağı', desc: 'HMK 279 & Kanunlar' },
            { num: '06', title: 'Sonuç & Kanaat', desc: 'Sarih Teknik Hüküm' },
            { num: '07', title: 'Ekler & İmza', desc: 'Word & UYAP Çıktısı' },
          ].map((st, i) => (
            <div key={i} className="bg-emerald-950/50 border border-emerald-800/50 rounded-lg p-2.5">
              <span className="font-mono text-[11px] font-bold text-[#B45309] block tabular-nums">
                {st.num}
              </span>
              <span className="font-serif text-xs font-semibold text-white block mt-0.5 truncate">
                {st.title}
              </span>
              <span className="text-[10px] text-emerald-200/70 block mt-0.5 truncate">
                {st.desc}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-[#E4DCCB] rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        
        {/* Search input */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Rapor başlığı, mahkeme adı, esas no veya davacı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
          />
        </div>

        {/* Segmented Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Field filters */}
          <div className="flex items-center gap-1 bg-[#F1ECE1] p-1 rounded-lg">
            <button
              onClick={() => setSelectedField('all')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedField === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Alanlar
            </button>
            <button
              onClick={() => setSelectedField('ziraat')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedField === 'ziraat'
                  ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ziraat
            </button>
            <button
              onClick={() => setSelectedField('gida')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedField === 'gida'
                  ? 'bg-white text-amber-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Gıda
            </button>
            <button
              onClick={() => setSelectedField('hayvancilik')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedField === 'hayvancilik'
                  ? 'bg-white text-cyan-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hayvancılık
            </button>
          </div>

          {/* Status filters */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-[#E4DCCB] rounded-lg bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="taslak">Taslak</option>
            <option value="inceleniyor">İnceleniyor</option>
            <option value="tamamlandi">Tamamlandı</option>
            <option value="arsivlendi">Arşivlendi</option>
          </select>
        </div>
      </div>

      {/* Report Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-[#E4DCCB] rounded-xl p-12 text-center space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="font-serif font-bold text-lg text-slate-800">
            Arama Kriterlerine Uygun Rapor Bulunamadı
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Arama terimini değiştirebilir veya yeni bir bilirkişi raporu oluşturarak çalışmaya başlayabilirsiniz.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNewReport()}
              className="px-4 py-2 text-xs font-semibold bg-[#0F3D2E] text-white rounded-lg hover:bg-[#1A5340] shadow-xs"
            >
              Yeni Rapor Oluştur
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r) => {
            const completion = calculateCompletion(r);
            return (
              <div
                key={r.id}
                className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs flex flex-col justify-between hover:border-[#0F3D2E]/50 hover:shadow-sm transition-all group"
              >
                <div className="space-y-3">
                  {/* Top tags line */}
                  <div className="flex items-center justify-between text-xs">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${getFieldColor(r.field)}`}>
                      {r.field}
                    </span>
                    {getStatusBadge(r.status)}
                  </div>

                  {/* Title & Court */}
                  <div>
                    <h3
                      onClick={() => onSelectReport(r)}
                      className="font-serif font-bold text-base text-slate-900 group-hover:text-[#0F3D2E] cursor-pointer transition-colors line-clamp-2"
                    >
                      {r.title}
                    </h3>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{r.steps.step1_courtInfo.courtName || 'Mahkeme Henüz Girilmedi'}</span>
                    </div>

                    <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                      {r.steps.step1_courtInfo.fileNumber || 'Esas No Yok'}
                    </div>
                  </div>

                  {/* Subject Snippet */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-[#FBF9F4] p-2 rounded border border-[#E4DCCB]/60">
                    {r.steps.step1_courtInfo.subject || r.steps.step2_inspection.observations || 'Rapor içeriği henüz doldurulmadı.'}
                  </p>

                  {/* Progress & Attachments info */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Kontrol ve İçerik Doluluğu</span>
                      <span className="font-mono font-semibold text-slate-700 tabular-nums">%{completion}</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#0F3D2E] h-1.5 transition-all duration-300"
                        style={{ width: `${completion}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                    <Clock className="w-3 h-3" />
                    <span className="text-[11px] font-mono">
                      {new Date(r.updatedAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onOpenPreview(r)}
                      title="Resmî Rapor Önizleme"
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => exportReportToWord(r)}
                      title="Word (.doc) İndir"
                      className="p-1.5 rounded hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 transition-colors"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDuplicateReport(r)}
                      title="Raporu Çoğalt"
                      className="p-1.5 rounded hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onDeleteReport(r.id)}
                      title="Raporu Sil"
                      className="p-1.5 rounded hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onSelectReport(r)}
                      className="ml-1.5 flex items-center gap-1 px-3 py-1.5 text-xs font-semibold bg-[#0F3D2E] text-white rounded-md hover:bg-[#1A5340] shadow-xs transition-colors"
                    >
                      <span>Düzenle</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
