/**
 * Codex hosted images use an independent image-generation allowance. A
 * depleted cached text/Responses quota must not reject an image operation
 * before its provider receives the request. All connection-scope, auth,
 * terminal-state, and model eligibility gates remain in force.
 */
export function imageQuotaPreflightOptions(provider: string): {
  bypassQuotaPolicy?: true;
  requirePaidCodexPlan?: true;
} {
  return provider === "codex" ? { bypassQuotaPolicy: true, requirePaidCodexPlan: true } : {};
}
