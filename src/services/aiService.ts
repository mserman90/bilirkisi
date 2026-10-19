import { ExpertField, AiEvaluationResult } from '../types';

export const AiService = {
  async generateDraft(params: {
    field: ExpertField;
    stepNumber: number;
    stepTitle: string;
    context: Record<string, any>;
    existingText?: string;
  }): Promise<{ draftText: string; source: string }> {
    try {
      const response = await fetch('/api/draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        throw new Error(`Draft request failed with status ${response.status}`);
      }

      const data = await response.json();
      return {
        draftText: data.draftText || '',
        source: data.source || 'gemini',
      };
    } catch (error) {
      console.warn('Draft service fallback error:', error);
      throw error;
    }
  },

  async evaluateContent(params: {
    field: ExpertField;
    stepNumber: number;
    stepTitle: string;
    text: string;
    context: Record<string, any>;
  }): Promise<AiEvaluationResult> {
    try {
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Evaluation failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn('Evaluation service error:', error);
      throw error;
    }
  },
};
