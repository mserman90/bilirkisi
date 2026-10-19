import React, { useState, useEffect } from 'react';
import { ExpertReport, ExpertProfile, ExpertField } from './types';
import { StorageService } from './services/storageService';
import { createEmptyReport } from './data/templates';
import { Navbar } from './components/Navbar';
import { ReportList } from './components/ReportList';
import { ReportWizard } from './components/Wizard/ReportWizard';
import { LegislationLibrary } from './components/LegislationLibrary';
import { CourtGuidanceView } from './components/CourtGuidanceView';
import { ReportPreviewModal } from './components/ReportPreviewModal';
import { ExpertProfileModal } from './components/ExpertProfileModal';

export default function App() {
  const [reports, setReports] = useState<ExpertReport[]>([]);
  const [profile, setProfile] = useState<ExpertProfile>(StorageService.getProfile());
  const [activeView, setActiveView] = useState<'reports' | 'wizard' | 'library' | 'guidance'>('reports');
  const [activeReport, setActiveReport] = useState<ExpertReport | null>(null);
  const [previewReport, setPreviewReport] = useState<ExpertReport | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    const loaded = StorageService.getReports();
    setReports(loaded);
  }, []);

  const handleSelectReport = (report: ExpertReport) => {
    setActiveReport(report);
    setActiveView('wizard');
  };

  const handleNewReport = (field?: ExpertField) => {
    const selectedField = field || profile.field || 'ziraat';
    const empty = createEmptyReport(selectedField, profile.name);
    // Pre-populate with profile data
    empty.steps.step7_signatures.expertName = profile.name;
    empty.steps.step7_signatures.expertTitle = profile.title;
    empty.steps.step7_signatures.expertRegistrationNo = profile.registrationNo ? `Bilirkişilik Sicil No: ${profile.registrationNo}` : '';
    empty.steps.step7_signatures.chamberMembership = profile.chamber;
    empty.steps.step1_courtInfo.panelMembers = `${profile.name} (${profile.title})`;

    StorageService.saveReport(empty);
    setReports(StorageService.getReports());
    setActiveReport(empty);
    setActiveView('wizard');
  };

  const handleUpdateReport = (updated: ExpertReport) => {
    setActiveReport(updated);
    StorageService.saveReport(updated);
    setReports(StorageService.getReports());
  };

  const handleDeleteReport = (id: string) => {
    if (window.confirm('Bu bilirkişi raporunu silmek istediğinizden emin misiniz?')) {
      StorageService.deleteReport(id);
      setReports(StorageService.getReports());
      if (activeReport?.id === id) {
        setActiveReport(null);
        setActiveView('reports');
      }
    }
  };

  const handleDuplicateReport = (report: ExpertReport) => {
    const cloned: ExpertReport = {
      ...report,
      id: `rep-${Date.now()}`,
      title: `${report.title} (Kopya)`,
      status: 'taslak',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    StorageService.saveReport(cloned);
    setReports(StorageService.getReports());
  };

  const handleSaveProfile = (newProfile: ExpertProfile) => {
    setProfile(newProfile);
    StorageService.saveProfile(newProfile);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-slate-800">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
        }}
        onNewReport={() => handleNewReport()}
        profile={profile}
        onOpenProfile={() => setShowProfileModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'reports' && (
          <ReportList
            reports={reports}
            onSelectReport={handleSelectReport}
            onNewReport={handleNewReport}
            onDeleteReport={handleDeleteReport}
            onDuplicateReport={handleDuplicateReport}
            onOpenPreview={(rep) => setPreviewReport(rep)}
          />
        )}

        {activeView === 'wizard' && activeReport && (
          <ReportWizard
            report={activeReport}
            onUpdateReport={handleUpdateReport}
            onBackToList={() => setActiveView('reports')}
            onOpenPreview={(rep) => setPreviewReport(rep)}
            profile={profile}
          />
        )}

        {activeView === 'library' && <LegislationLibrary />}

        {activeView === 'guidance' && <CourtGuidanceView />}
      </main>

      {/* Official Court Document Preview Modal */}
      {previewReport && (
        <ReportPreviewModal
          report={previewReport}
          onClose={() => setPreviewReport(null)}
        />
      )}

      {/* Expert Profile Modal */}
      {showProfileModal && (
        <ExpertProfileModal
          profile={profile}
          onSave={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
        />
      )}
    </div>
  );
}
