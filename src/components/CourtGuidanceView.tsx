import React from 'react';
import { Scale, CheckCircle2, AlertOctagon, HelpCircle, FileCheck, Award, ShieldAlert } from 'lucide-react';

export const CourtGuidanceView: React.FC = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 space-y-8 text-slate-800">
      
      {/* Title */}
      <div className="bg-white border border-[#E4DCCB] rounded-2xl p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B45309] font-semibold">
          <Scale className="w-4 h-4" />
          <span>ADALET BAKANLIĞI & YARGITAY STANDARTLARI</span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
          Bilirkişi Rapor Yazım Rehberi & Resmî İlkeler
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          6754 sayılı Bilirkişilik Kanunu ve 6100 sayılı Hukuk Muhakemeleri Kanunu uyarınca mahkemelerin bilirkişi raporlarında aradığı temel geçerlilik şartları, etik ilkeler ve Yargıtay bozma sebeplerinden kaçınma rehberi.
        </p>
      </div>

      {/* Golden Rule: HMK 279/1 */}
      <div className="bg-[#0F3D2E] text-white rounded-xl p-6 sm:p-8 border border-[#1A5340] space-y-4">
        <div className="flex items-center gap-2 text-amber-300 text-xs font-mono font-semibold uppercase tracking-wider">
          <AlertOctagon className="w-4 h-4" />
          <span>Altın Kural: Hukuki Nitelendirme Yasağı (HMK md. 279/1)</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
          "Bilirkişi, raporunda ve sözlü açıklamaları sırasında hukukî nitelendirme ve değerlendirmelerde bulunamaz."
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs">
          <div className="bg-rose-950/60 border border-rose-800/80 p-3.5 rounded-lg space-y-1.5">
            <span className="font-bold text-rose-300 flex items-center gap-1.5 uppercase">
              ✕ Kesinlikle Yasak Olan İfadeler
            </span>
            <ul className="space-y-1 text-rose-100/90 list-disc list-inside">
              <li>"Davalı idare kusurludur ve tazminat ödemelidir."</li>
              <li>"Davacı sözleşmeyi haklı olarak feshetmiştir."</li>
              <li>"Mücbir sebep gerçekleşmemiştir, davalı haksızdır."</li>
            </ul>
          </div>

          <div className="bg-emerald-950/60 border border-emerald-700/80 p-3.5 rounded-lg space-y-1.5">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5 uppercase">
              ✓ Teknik Olarak Doğru Olan İfadeler
            </span>
            <ul className="space-y-1 text-emerald-100/90 list-disc list-inside">
              <li>"Kanal vanasındaki arıza ile bitkideki su stresi arasında teknik illiyet bağı saptanmıştır."</li>
              <li>"Üretim uygulamasının fen ve ziraat kurallarına uygun olmadığı belirlenmiştir."</li>
              <li>"Takdir ve hukuki hüküm Sayın Mahkemenize ait olmak üzere..."</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4 Pillars of a Flawless Court Report */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">
            1. Yargıtay Denetimine Elverişlilik
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Raporun hesap kısımları o kadar sarih ve matematiksel olmalıdır ki, dosyayı inceleyen istinaf veya Yargıtay dairesi dekar başına verimi, birim fiyatı ve masraf tenzilatını kalemi kalemine denetleyebilsin. Afaki rakamlar bozma sebebidir.
          </p>
        </div>

        <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center">
            <Scale className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">
            2. Resmi Verilere Dayanma Zorunluluğu
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zirai gelir ve kamulaştırma hesaplarında İl veya İlçe Tarım ve Orman Müdürlüklerinin resmi cari üretim maliyet cetvelleri, Ticaret Borsası bültenleri ve TARSİM verileri bağlayıcıdır. Serbest piyasa kulaktan dolma verileri kabul görmez.
          </p>
        </div>

        <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-800 flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">
            3. Bizzat Keşif ve Taraf Güvencesi
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Bilirkişi incelemeyi bizzat kendisi yapmalı; keşif günü tarafların veya vekillerinin hazır bulunup bulunmadığını, onların keşif anındaki teknik iddialarını raporun inceleme bölümünde açıkça yanıtlamalıdır.
          </p>
        </div>

        <div className="bg-white border border-[#E4DCCB] rounded-xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="font-serif font-bold text-base text-slate-900">
            4. Net ve Çelişkisiz Sonuç Fıkrası
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Mahkemenin tensip zaptında yönelttiği her soru sonuç bölümünde madde madde cevaplanmalı; raporun içindeki zarar tutarı ile sonuç bölümündeki nihai rakam kuruşu kuruşuna aynı olmalıdır.
          </p>
        </div>
      </div>

    </div>
  );
};
