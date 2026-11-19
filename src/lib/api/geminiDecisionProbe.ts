export function isGeminiDecisionProbe(providerId: string, model: string): boolean {
  return providerId === "gemini" && /^(?:gemini\/)?gemini-decision-1$/.test(model);
}

export function decisionProbeBody() {
  return {
    model: "gemini-decision-1",
    input: "The parcel is damaged.",
    questions: { damaged: { type: "noul", instructions: "Does the text report damage?" } },
  };
}

export function decisionProbeText(payload: unknown): string {
  const answer = (payload as { answers?: { damaged?: { type?: string; noul?: number } } })?.answers
    ?.damaged;
  return answer?.type === "noul" && Number.isFinite(answer.noul) ? String(answer.noul) : "";
}
