import React, { useState } from 'react';
import { ExpertProfile, ExpertField } from '../types';
import { User, X, Save, Check } from 'lucide-react';

interface ExpertProfileModalProps {
  profile: ExpertProfile;
  onSave: (profile: ExpertProfile) => void;
  onClose: () => void;
}

export const ExpertProfileModal: React.FC<ExpertProfileModalProps> = ({
  profile,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState<ExpertProfile>({ ...profile });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full border border-[#E4DCCB] shadow-xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-900 flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-slate-900">
                Uzman Bilirkişi Profili
              </h3>
              <p className="text-[11px] text-slate-500">
                Bu bilgiler raporlarınızın imza ve antet bloklarına otomatik yansıtılır.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Ad Soyad *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Bilirkişilik Sicil No *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: 42-2018-0912"
                value={formData.registrationNo}
                onChange={(e) => setFormData({ ...formData, registrationNo: e.target.value })}
                className="w-full px-3 py-2 font-mono border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Mesleki Unvan & Uzmanlık *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Ziraat Yüksek Mühendisi - Tarla Bitkileri Uzmanı"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Birincil Uzmanlık Alanı
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ziraat', 'gida', 'hayvancilik'] as ExpertField[]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFormData({ ...formData, field: f })}
                  className={`py-2 px-2 rounded-lg border text-center font-medium capitalize transition-colors ${
                    formData.field === f
                      ? 'border-[#0F3D2E] bg-emerald-50 text-[#0F3D2E] font-semibold'
                      : 'border-[#E4DCCB] bg-white text-slate-600'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Bağlı Olunan Bilirkişilik Bölge Kurulu
            </label>
            <input
              type="text"
              placeholder="Örn: Konya Bilirkişilik Bölge Kurulu Başkanlığı"
              value={formData.courtDistrict}
              onChange={(e) => setFormData({ ...formData, courtDistrict: e.target.value })}
              className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Meslek Odası / Sicil Bilgisi
            </label>
            <input
              type="text"
              placeholder="Örn: TMMOB Ziraat Mühendisleri Odası (Sicil: 18452)"
              value={formData.chamber}
              onChange={(e) => setFormData({ ...formData, chamber: e.target.value })}
              className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                E-posta Adresi
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">
                Telefon Numarası
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold bg-[#0F3D2E] text-white rounded-lg hover:bg-[#1A5340] shadow-xs"
            >
              {saved ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Kaydedildi</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>Profili Güncelle</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
