export type ExpertField = 'ziraat' | 'gida' | 'hayvancilik';

export type ReportStatus = 'taslak' | 'inceleniyor' | 'tamamlandi' | 'arsivlendi';

export interface ReportAttachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'analysis';
  size: string;
  uploadDate: string;
  description: string;
  dataUrl?: string;
}

export interface Step1CourtInfo {
  courtName: string;
  fileNumber: string;
  caseType: string;
  plaintiff: string;
  defendant: string;
  subject: string;
  panelMembers: string;
}

export interface Step2Inspection {
  inspectionDate: string;
  location: string;
  parcelInfo: string;
  attendees: string;
  observations: string;
}

export interface Step3Findings {
  technicalFindings: string;
  damagePercentage: string;
  yieldData: string;
  sampleAnalysis: string;
  rawNotes: string;
}

export interface Step4Evaluation {
  scientificMethod: string;
  calculationTable: string;
  causalityAnalysis: string;
  technicalConclusion: string;
}

export interface Step5Legislation {
  applicableLaws: string[];
  legalArticles: string;
  precedentNotes: string;
}

export interface Step6Conclusion {
  finalOpinion: string;
  answersToCourt: string;
  expertStatement: string;
}

export interface Step7Signatures {
  reportDate: string;
  expertName: string;
  expertTitle: string;
  expertRegistrationNo: string;
  chamberMembership: string;
}

export interface ReportStepData {
  step1_courtInfo: Step1CourtInfo;
  step2_inspection: Step2Inspection;
  step3_findings: Step3Findings;
  step4_evaluation: Step4Evaluation;
  step5_legislation: Step5Legislation;
  step6_conclusion: Step6Conclusion;
  step7_signatures: Step7Signatures;
}

export interface ExpertReport {
  id: string;
  title: string;
  field: ExpertField;
  status: ReportStatus;
  createdAt: string;
  updatedAt: string;
  steps: ReportStepData;
  checklistProgress: Record<string, boolean>;
  attachments: ReportAttachment[];
}

export interface ExpertProfile {
  name: string;
  title: string;
  registrationNo: string;
  chamber: string;
  courtDistrict: string;
  field: ExpertField;
  email: string;
  phone: string;
}

export interface LegislationItem {
  id: string;
  title: string;
  lawNumber: string;
  category: ExpertField | 'genel';
  summary: string;
  keyArticles: { articleNo: string; heading: string; text: string }[];
  citationNote: string;
}

export interface ChecklistItem {
  id: string;
  stepNumber: number;
  label: string;
  isCrucial: boolean;
  explanation: string;
}

export interface WizardGuidance {
  stepNumber: number;
  title: string;
  subtitle: string;
  whyThisStep: string;
  principles: string[];
  commonMistakes: string[];
  samplePhrases: string[];
  checklist: ChecklistItem[];
}

export interface AiEvaluationResult {
  score: number;
  compliant: boolean;
  warnings: string[];
  recommendations: string[];
  suggestedFix: string;
}
