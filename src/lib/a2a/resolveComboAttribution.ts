/**
 * #17188 — distinguish an A2A client's requested combo from actual execution.
 * Server-side routing policies can override a requested combo. Attribution
 * requires an explicit confirmation from the gateway response.
 */
export function resolveA2AComboAttribution(metadata: {
  requested_combo?: unknown;
  confirmed_combo?: unknown;
}): { comboId: string; requestedCombo: string | null } {
  const requestedCombo =
    typeof metadata.requested_combo === "string" && metadata.requested_combo.trim()
      ? metadata.requested_combo.trim()
      : null;
  const confirmedCombo =
    typeof metadata.confirmed_combo === "string" && metadata.confirmed_combo.trim()
      ? metadata.confirmed_combo.trim()
      : null;
  return { comboId: confirmedCombo || "default", requestedCombo };
}
