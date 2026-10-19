import React from 'react';
import { ExpertProfile } from '../types';
import { FileText, PlusCircle, BookOpen, ShieldCheck, User } from 'lucide-react';

interface NavbarProps {
  activeView: 'reports' | 'wizard' | 'library' | 'guidance';
  onNavigate: (view: 'reports' | 'wizard' | 'library' | 'guidance') => void;
  onNewReport: () => void;
  profile: ExpertProfile;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onNewReport,
  profile,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0F3D2E] text-[#FBF9F4] border-b border-[#1A5340] shadow-sm no-print">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single-Element Wordmark */}
        <button
          onClick={() => onNavigate('reports')}
          className="text-left font-serif text-lg font-semibold tracking-tight text-white whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity"
        >
          Bilirkişi Rapor Çalışma Alanı
        </button>

        {/* Zone 2: 4 Single-Line Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <button
            onClick={() => onNavigate('reports')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeView === 'reports'
                ? 'text-white border-b-2 border-[#B45309] font-semibold'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            Raporlarım
          </button>

          <button
            onClick={() => onNavigate('library')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeView === 'library'
                ? 'text-white border-b-2 border-[#B45309] font-semibold'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            Mevzuat Kütüphanesi
          </button>

          <button
            onClick={() => onNavigate('guidance')}
            className={`whitespace-nowrap shrink-0 py-1 transition-colors ${
              activeView === 'guidance'
                ? 'text-white border-b-2 border-[#B45309] font-semibold'
                : 'text-emerald-100/80 hover:text-white'
            }`}
          >
            Bilirkişilik Rehberi
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Profile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNewReport}
            className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold bg-[#B45309] text-white rounded-md hover:bg-[#92400E] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Rapor</span>
          </button>

          <button
            onClick={onOpenProfile}
            aria-label="Uzman Bilirkişi Profili"
            title={`${profile.name} - ${profile.title}`}
            className="w-8 h-8 rounded-full bg-[#184E3C] hover:bg-[#20634D] border border-emerald-700/50 flex items-center justify-center text-white transition-colors shrink-0"
          >
            <User className="w-4 h-4 text-emerald-200" />
          </button>
        </div>
      </div>
    </header>
  );
};
