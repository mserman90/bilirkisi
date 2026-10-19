import React, { useState } from 'react';
import { LEGISLATION_DATABASE, EXPERT_GLOSSARY } from '../data/legislation';
import { Search, BookOpen, Scale, Copy, Check, Bookmark, ArrowRight, ShieldCheck } from 'lucide-react';

export const LegislationLibrary: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'kanunlar' | 'sozluk'>('kanunlar');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLegislation = LEGISLATION_DATABASE.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = search.toLowerCase();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.lawNumber.includes(q) ||
      item.keyArticles.some((a) => a.heading.toLowerCase().includes(q) || a.text.toLowerCase().includes(q));

    return matchesCat && matchesQuery;
  });

  const filteredGlossary = EXPERT_GLOSSARY.filter((g) => {
    const q = search.toLowerCase();
    return !q || g.term.toLowerCase().includes(q) || g.def.toLowerCase().includes(q) || g.field.toLowerCase().includes(q);
  });

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-[#E4DCCB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-semibold">
            <Scale className="w-4 h-4" />
            <span>TÜRK MEVZUATI VE BİLİRKİŞİLİK HUKUKİ DAYANAKLARI</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Mevzuat Kütüphanesi & Terimler Sözlüğü
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed font-sans">
            Ziraat, gıda ve hayvancılık davalarında mahkemelerin denetlediği HMK 266-287, Bilirkişilik Kanunu, Toprak Koruma, Kamulaştırma md. 11 net gelir ilkeleri ve Türk Gıda Kodeksi maddeleri.
          </p>
        </div>

        {/* Tab switch */}
        <div className="mt-6 flex items-center gap-2 border-b border-slate-200">
          <button
            onClick={() => setActiveTab('kanunlar')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'kanunlar'
                ? 'border-[#0F3D2E] text-[#0F3D2E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mevzuat ve Kanun Maddeleri ({filteredLegislation.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('sozluk')}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold border-b-2 transition-all ${
              activeTab === 'sozluk'
                ? 'border-[#0F3D2E] text-[#0F3D2E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bilirkişilik Terimler Sözlüğü ({filteredGlossary.length})</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white border border-[#E4DCCB] rounded-xl p-4 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={activeTab === 'kanunlar' ? "Kanun adı, madde no veya anahtar kelime ara (Örn: HMK 279, net gelir, tağşiş)..." : "Terim ara (Örn: münavebe, kapitalizasyon, soğuk zincir)..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
          />
        </div>

        {activeTab === 'kanunlar' && (
          <div className="flex items-center gap-1 bg-[#F1ECE1] p-1 rounded-lg">
            {[
              { id: 'all', label: 'Tümü' },
              { id: 'genel', label: 'HMK & Genel' },
              { id: 'ziraat', label: 'Ziraat' },
              { id: 'gida', label: 'Gıda' },
              { id: 'hayvancilik', label: 'Hayvancılık' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tab 1: Laws List */}
      {activeTab === 'kanunlar' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredLegislation.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs space-y-4 hover:border-[#0F3D2E]/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono text-xs font-bold text-[#B45309]">
                    {item.lawNumber ? `${item.lawNumber} Sayılı Kanun/Mevzuat` : 'Mevzuat'}
                  </span>
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-base text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Key Articles */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Bilirkişi Raporlarında Esas Alınan Maddeler:
                </span>
                {item.keyArticles.map((art, idx) => (
                  <div key={idx} className="bg-[#FBF9F4] p-3 rounded-lg border border-[#E4DCCB] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#0F3D2E]">
                        Madde {art.articleNo}: {art.heading}
                      </span>
                      <button
                        onClick={() => handleCopyText(`${item.id}-${art.articleNo}`, `[${item.title} Madde ${art.articleNo}]: ${art.text}`)}
                        className="flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-900 bg-white px-2 py-0.5 rounded border border-[#E4DCCB]"
                      >
                        {copiedId === `${item.id}-${art.articleNo}` ? (
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
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-sans">
                      {art.text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Citation guidance */}
              <div className="bg-amber-50/70 border-l-[3px] border-[#B45309] p-3 rounded-r-lg text-xs text-amber-900/90 leading-relaxed">
                <strong>Bilirkişi Uygulama Notu:</strong> {item.citationNote}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Glossary */}
      {activeTab === 'sozluk' && (
        <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredGlossary.map((g, idx) => (
              <div
                key={idx}
                className="bg-[#FBF9F4] border border-[#E4DCCB] rounded-lg p-4 space-y-1.5 hover:border-[#0F3D2E]/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-sm text-slate-900">
                    {g.term}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                    {g.field}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {g.def}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
