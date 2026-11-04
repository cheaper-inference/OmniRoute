/**
 * #17393 — account display names for the Combo Control Center.
 *
 * The control center renders every configured target's pinned account, but the
 * browser cannot read the connection table itself: it only receives the combo
 * row. The combo step's stored `label` is the account label the builder wrote
 * when the step was created, so it goes stale as soon as the account is
 * renamed — and it is missing entirely for combos created through the API.
 *
 * This helper resolves the current display name (name → displayName → email,
 * the same order `getAccountDisplayName()` uses) for every connection the
 * combo pins, so the dashboard can render the account in full instead of a
 * truncated connection id.
 *
 * Server-side only (it reads the DB): the client-safe counterpart lives in
 * `controlCenter.ts` (`resolveComboTargetAccountLabel`).
 */
import { getProviderConnectionDisplayMetadata } from "@/lib/db/providers";
import { normalizeComboModels } from "./steps";

/**
 * Build a connectionId → account display name map for the connections a combo
 * pins. Connections without a name/displayName/email are left out so the
 * caller can fall back to the step label and then to the full connection id.
 */
export function buildComboConnectionLabels(combo: { models?: unknown }): Record<string, string> {
  const steps = normalizeComboModels(Array.isArray(combo.models) ? combo.models : [], {
    comboName: null,
  });
  const connectionIds = steps
    .flatMap((step) => (step.kind === "combo-ref" ? [] : [step.connectionId]))
    .filter((id): id is string => typeof id === "string" && id.trim().length > 0);
  if (connectionIds.length === 0) return {};

  const labels: Record<string, string> = {};
  for (const meta of getProviderConnectionDisplayMetadata(connectionIds)) {
    const name =
      (meta.name || "").trim() || (meta.displayName || "").trim() || (meta.email || "").trim();
    if (name) labels[meta.id] = name;
  }
  return labels;
}
