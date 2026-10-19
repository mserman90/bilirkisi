import { ExpertReport } from '../types';
import { WIZARD_GUIDANCE } from '../data/wizardGuidance';

export function calculateStepProgress(report: ExpertReport, stepNumber: number): number {
  if (!report || !report.steps) return 0;

  let fieldScore = 0;
  const guidance = WIZARD_GUIDANCE[stepNumber];

  // 1. Evaluate form fields for this step
  switch (stepNumber) {
    case 1: {
      const c = report.steps.step1_courtInfo;
      const f1 = c.courtName?.trim() ? 1 : 0;
      const f2 = c.fileNumber?.trim() ? 1 : 0;
      const f3 = c.subject?.trim() && c.subject.trim().length > 15 ? 1 : 0;
      const f4 = c.caseType?.trim() ? 1 : 0;
      fieldScore = ((f1 * 0.35) + (f2 * 0.25) + (f3 * 0.3) + (f4 * 0.1)) * 100;
      break;
    }
    case 2: {
      const s = report.steps.step2_inspection;
      const f1 = s.inspectionDate?.trim() ? 1 : 0;
      const f2 = s.parcelInfo?.trim() ? 1 : 0;
      const f3 = s.observations?.trim() && s.observations.trim().length > 15 ? 1 : 0;
      fieldScore = ((f1 * 0.25) + (f2 * 0.35) + (f3 * 0.4)) * 100;
      break;
    }
    case 3: {
      const f = report.steps.step3_findings;
      const f1 = f.technicalFindings?.trim() && f.technicalFindings.trim().length > 15 ? 1 : 0;
      const f2 = f.damagePercentage?.trim() ? 1 : 0;
      const f3 = f.sampleAnalysis?.trim() || f.yieldData?.trim() ? 1 : 0;
      fieldScore = ((f1 * 0.5) + (f2 * 0.25) + (f3 * 0.25)) * 100;
      break;
    }
    case 4: {
      const ev = report.steps.step4_evaluation;
      const f1 = ev.calculationTable?.trim() ? 1 : 0;
      const f2 = ev.causalityAnalysis?.trim() && ev.causalityAnalysis.trim().length > 15 ? 1 : 0;
      const f3 = ev.scientificMethod?.trim() ? 1 : 0;
      fieldScore = ((f1 * 0.4) + (f2 * 0.4) + (f3 * 0.2)) * 100;
      break;
    }
    case 5: {
      const l = report.steps.step5_legislation;
      const f1 = l.applicableLaws && l.applicableLaws.length > 0 ? 1 : 0;
      const f2 = l.legalArticles?.trim() && l.legalArticles.trim().length > 15 ? 1 : 0;
      fieldScore = ((f1 * 0.4) + (f2 * 0.6)) * 100;
      break;
    }
    case 6: {
      const c = report.steps.step6_conclusion;
      const f1 = c.finalOpinion?.trim() && c.finalOpinion.trim().length > 15 ? 1 : 0;
      const f2 = c.answersToCourt?.trim() ? 1 : 0;
      const f3 = c.expertStatement?.trim() ? 1 : 0;
      fieldScore = ((f1 * 0.5) + (f2 * 0.3) + (f3 * 0.2)) * 100;
      break;
    }
    case 7: {
      const sig = report.steps.step7_signatures;
      const f1 = sig.reportDate?.trim() ? 1 : 0;
      const f2 = sig.expertName?.trim() ? 1 : 0;
      const f3 = sig.expertRegistrationNo?.trim() ? 1 : 0;
      fieldScore = ((f1 * 0.3) + (f2 * 0.4) + (f3 * 0.3)) * 100;
      break;
    }
    default:
      fieldScore = 0;
  }

  // 2. Evaluate checklist items for this step
  let checklistScore = 100;
  if (guidance && guidance.checklist && guidance.checklist.length > 0) {
    const totalChecks = guidance.checklist.length;
    const checkedCount = guidance.checklist.filter(
      (item) => !!report.checklistProgress[item.id]
    ).length;
    checklistScore = (checkedCount / totalChecks) * 100;
  }

  // Combined score: 60% text/input content + 40% checklist verification
  const total = Math.round(fieldScore * 0.6 + checklistScore * 0.4);
  return Math.min(100, Math.max(0, total));
}
