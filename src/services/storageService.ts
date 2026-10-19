import { ExpertReport, ExpertProfile } from '../types';
import { SAMPLE_REPORTS } from '../data/templates';

const STORAGE_KEYS = {
  REPORTS: 'bilirkisi_reports_v1',
  PROFILE: 'bilirkisi_profile_v1',
};

const DEFAULT_PROFILE: ExpertProfile = {
  name: 'Serdar Erman',
  title: 'Ziraat Yüksek Mühendisi & Fen Bilirkişisi',
  registrationNo: '42-2018-0912',
  chamber: 'TMMOB Ziraat Mühendisleri Odası (Sicil: 18452)',
  courtDistrict: 'Konya Bilirkişilik Bölge Kurulu',
  field: 'ziraat',
  email: 'serdarerman@gmail.com',
  phone: '0532 000 00 00',
};

export const StorageService = {
  getReports(): ExpertReport[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
      if (!data) {
        // Seed default sample reports
        this.saveReports(SAMPLE_REPORTS);
        return SAMPLE_REPORTS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.error('Storage read error:', e);
      return SAMPLE_REPORTS;
    }
  },

  getReportById(id: string): ExpertReport | undefined {
    const list = this.getReports();
    return list.find((r) => r.id === id);
  },

  saveReports(reports: ExpertReport[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  },

  saveReport(report: ExpertReport): void {
    const list = this.getReports();
    const index = list.findIndex((r) => r.id === report.id);
    const updated = {
      ...report,
      updatedAt: new Date().toISOString(),
    };
    if (index >= 0) {
      list[index] = updated;
    } else {
      list.unshift(updated);
    }
    this.saveReports(list);
  },

  deleteReport(id: string): void {
    const list = this.getReports().filter((r) => r.id !== id);
    this.saveReports(list);
  },

  getProfile(): ExpertProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (!data) {
        this.saveProfile(DEFAULT_PROFILE);
        return DEFAULT_PROFILE;
      }
      return JSON.parse(data);
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: ExpertProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Profile save error:', e);
    }
  },
};
