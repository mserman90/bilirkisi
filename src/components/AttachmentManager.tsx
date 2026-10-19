import React, { useState } from 'react';
import { ReportAttachment } from '../types';
import { Paperclip, Image, FileText, Trash2, Plus, Upload, Eye } from 'lucide-react';

interface AttachmentManagerProps {
  attachments: ReportAttachment[];
  onUpdateAttachments: (attachments: ReportAttachment[]) => void;
}

export const AttachmentManager: React.FC<AttachmentManagerProps> = ({
  attachments,
  onUpdateAttachments,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'image' | 'document' | 'analysis'>('image');
  const [newDescription, setNewDescription] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAttachment: ReportAttachment = {
      id: `att-${Date.now()}`,
      name: newTitle.trim(),
      type: newType,
      size: `${(Math.random() * 2 + 0.5).toFixed(1)} MB`,
      uploadDate: new Date().toLocaleDateString('tr-TR'),
      description: newDescription.trim() || 'Keşif ve dosya inceleme eki',
    };

    onUpdateAttachments([...attachments, newAttachment]);
    setNewTitle('');
    setNewDescription('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    onUpdateAttachments(attachments.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
            Rapor Ekleri ve Görseller ({attachments.length})
          </h4>
          <p className="text-xs text-slate-500">
            Keşif fotoğrafları, tapu kayıtları, analiz sonuçları ve tutanaklar mahkeme dosyasının ayrılmaz parçasıdır.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#0F3D2E] text-white hover:bg-[#1A5340] rounded-md transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Yeni Belge / Fotoğraf Ekle</span>
        </button>
      </div>

      {attachments.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-[#E4DCCB] rounded-xl bg-[#FBF9F4]/40">
          <Paperclip className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-medium text-slate-600">Henüz eklenmiş delil veya belge bulunmuyor</p>
          <p className="text-[11px] text-slate-400 mt-1">Keşif fotoğraflarını veya resmi kurum cetvellerini buraya ekleyebilirsiniz.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {attachments.map((att, idx) => (
            <div
              key={att.id}
              className="bg-white border border-[#E4DCCB] rounded-lg p-3 flex items-start justify-between gap-3 shadow-xs hover:border-[#0F3D2E]/40 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-9 h-9 rounded-md bg-[#F1ECE1] flex items-center justify-center text-[#0F3D2E] shrink-0 mt-0.5">
                  {att.type === 'image' ? (
                    <Image className="w-4 h-4 text-[#B45309]" />
                  ) : att.type === 'analysis' ? (
                    <FileText className="w-4 h-4 text-emerald-800" />
                  ) : (
                    <Paperclip className="w-4 h-4 text-slate-700" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-semibold text-slate-400">EK-{idx + 1}</span>
                    <h5 className="font-semibold text-xs text-slate-900 truncate">{att.name}</h5>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{att.description}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                    <span>{att.size}</span>
                    <span>·</span>
                    <span>{att.uploadDate}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleDelete(att.id)}
                title="Eki Sil"
                className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition-colors shrink-0"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full border border-[#E4DCCB] shadow-lg p-5 space-y-4">
            <h3 className="font-serif font-bold text-base text-slate-900">
              Rapora Ek Belge / Fotoğraf İliştir
            </h3>
            <form onSubmit={handleAdd} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Belge Adı / Fotoğraf Başlığı
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Keşif Mahallinde Çekilen Makro Başak Fotoğrafları"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Belge Türü
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewType('image')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                      newType === 'image'
                        ? 'border-[#B45309] bg-amber-50 text-[#B45309]'
                        : 'border-[#E4DCCB] bg-white text-slate-600'
                    }`}
                  >
                    Fotoğraf
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('analysis')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                      newType === 'analysis'
                        ? 'border-[#0F3D2E] bg-emerald-50 text-[#0F3D2E]'
                        : 'border-[#E4DCCB] bg-white text-slate-600'
                    }`}
                  >
                    Analiz Cetveli
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewType('document')}
                    className={`py-2 px-2.5 rounded-lg border text-center font-medium transition-colors ${
                      newType === 'document'
                        ? 'border-slate-800 bg-slate-100 text-slate-900'
                        : 'border-[#E4DCCB] bg-white text-slate-600'
                    }`}
                  >
                    Resmi Belge
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Açıklama / Not
                </label>
                <textarea
                  rows={2}
                  placeholder="Örn: 15.05.2025 keşif günü parselin kuzey cephesinden çekilmiştir."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-[#E4DCCB] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0F3D2E]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-semibold bg-[#0F3D2E] text-white rounded-lg hover:bg-[#1A5340] shadow-xs"
                >
                  Ek Olarak Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
