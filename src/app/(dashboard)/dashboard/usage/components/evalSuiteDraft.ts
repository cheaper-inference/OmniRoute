/**
 * Validation of the Quality › suite builder draft, kept apart from the dialog so the rules can
 * be read (and tested) in one place. A case needs a name, at least one prompt and an expected
 * value. Its model is optional: the runner sends the case to the run's target and, on "Suite
 * defaults" with no model on the case, to its built-in default (src/lib/evals/runtime.ts).
 */

export interface SuiteCaseDraftFields {
  id: string;
  name: string;
  systemPrompt: string;
  userPrompt: string;
  expectedValue: string;
}

export interface SuiteDraftFields {
  name: string;
  cases: SuiteCaseDraftFields[];
}

export interface SuiteCaseErrors {
  name: boolean;
  prompt: boolean;
  expectedValue: boolean;
}

export interface SuiteDraftErrors {
  name: boolean;
  /** Keyed by case id; only cases with at least one problem are present. */
  cases: Record<string, SuiteCaseErrors>;
}

export function validateSuiteDraft(draft: SuiteDraftFields): SuiteDraftErrors {
  const cases: Record<string, SuiteCaseErrors> = {};
  for (const draftCase of draft.cases) {
    const errors: SuiteCaseErrors = {
      name: !draftCase.name.trim(),
      prompt: !draftCase.systemPrompt.trim() && !draftCase.userPrompt.trim(),
      expectedValue: !draftCase.expectedValue.trim(),
    };
    if (errors.name || errors.prompt || errors.expectedValue) cases[draftCase.id] = errors;
  }
  return { name: !draft.name.trim(), cases };
}

export function hasSuiteDraftErrors(errors: SuiteDraftErrors): boolean {
  return errors.name || Object.keys(errors.cases).length > 0;
}
