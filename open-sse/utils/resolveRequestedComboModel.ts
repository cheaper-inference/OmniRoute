/**
 * #17188 — MCP and A2A accept an explicit combo alongside a fallback model.
 *
 * The chat gateway selects combos through the `model` field; there is no
 * consumer for `body["x-combo"]`. Choose the requested combo as the model
 * before dispatch so the gateway's existing model/combo admission gates still
 * apply. This helper never authorizes a combo or bypasses API key policies.
 */
export function resolveRequestedComboModel(
  fallbackModel: string,
  requestedCombo: unknown
): { model: string; requestedCombo: string | null } {
  if (requestedCombo === null || requestedCombo === undefined) {
    return { model: fallbackModel, requestedCombo: null };
  }

  if (typeof requestedCombo !== "string" || requestedCombo.trim().length === 0) {
    throw new Error("combo must be a non-empty string");
  }

  const combo = requestedCombo.trim();
  return { model: combo, requestedCombo: combo };
}
