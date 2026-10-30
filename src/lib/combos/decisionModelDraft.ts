/**
 * Combo-builder draft helpers for `config.decisionModel` (decision-router strategies).
 * Client-safe: no server imports. Values are kept as typed (the combo schema trims on
 * save); blank fields and empty descriptions are dropped so `.strict()` limits only
 * count what the operator actually set.
 */

export const DECISION_ROUTER_STRATEGIES = ["decision-openai", "decision-systemone"] as const;
export const MAX_DECISION_DESCRIPTIONS = 50;
export const MAX_DECISION_DESCRIPTION_KEY_CHARS = 300;
export const MAX_DECISION_DESCRIPTION_CHARS = 1_000;

export interface DecisionModelDraft {
  baseUrl?: string;
  model?: string;
  apiKey?: string;
  timeoutMs?: number;
  descriptions?: Record<string, string>;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function isDecisionRouterStrategy(strategy: unknown): boolean {
  return typeof strategy === "string" && DECISION_ROUTER_STRATEGIES.includes(strategy as never);
}

/** Env-var prefix the router falls back to when a field is left empty. */
export function decisionEnvPrefix(strategy: string): string {
  return strategy === "decision-systemone"
    ? "OMNIROUTE_SYSTEM_ONE_DECISION"
    : "OMNIROUTE_OPENAI_DECISION";
}

export function readDecisionModelDraft(config: unknown): DecisionModelDraft {
  const raw = isRecord(config) && isRecord(config.decisionModel) ? config.decisionModel : {};
  const text = (value: unknown) => (typeof value === "string" ? value : undefined);
  const timeoutMs = Number(raw.timeoutMs);
  const descriptions = isRecord(raw.descriptions)
    ? Object.fromEntries(
        Object.entries(raw.descriptions).filter(
          (entry): entry is [string, string] => typeof entry[1] === "string"
        )
      )
    : undefined;
  return {
    baseUrl: text(raw.baseUrl),
    model: text(raw.model),
    apiKey: text(raw.apiKey),
    timeoutMs: Number.isFinite(timeoutMs) && timeoutMs > 0 ? timeoutMs : undefined,
    descriptions,
  };
}

/** Merge a patch and drop blank values; returns `undefined` when nothing is left. */
export function patchDecisionModelDraft(
  draft: DecisionModelDraft,
  patch: Partial<DecisionModelDraft>
): DecisionModelDraft | undefined {
  const next: DecisionModelDraft = { ...draft, ...patch };
  const cleaned: DecisionModelDraft = {};
  for (const key of ["baseUrl", "model", "apiKey"] as const) {
    if (typeof next[key] === "string" && next[key].trim()) cleaned[key] = next[key];
  }
  if (typeof next.timeoutMs === "number" && Number.isFinite(next.timeoutMs) && next.timeoutMs > 0)
    cleaned.timeoutMs = next.timeoutMs;
  const descriptions = Object.entries(next.descriptions ?? {}).filter(
    ([key, value]) => key.trim() && value.trim()
  );
  if (descriptions.length) cleaned.descriptions = Object.fromEntries(descriptions);
  return Object.keys(cleaned).length ? cleaned : undefined;
}

/** Set (or, with blank text, remove) one description. */
export function setDecisionDescription(
  draft: DecisionModelDraft,
  key: string,
  text: string
): DecisionModelDraft | undefined {
  const descriptions = { ...(draft.descriptions ?? {}) };
  if (text.trim()) descriptions[key] = text;
  else delete descriptions[key];
  return patchDecisionModelDraft(draft, { descriptions });
}

/** Plain model steps as `provider/model` strings; combo refs and wildcards are skipped. */
export function toDecisionPreviewModels(steps: unknown[]): string[] {
  return steps.flatMap((step) => {
    if (typeof step === "string") return step.trim() ? [step.trim()] : [];
    if (!isRecord(step)) return [];
    if (step.kind !== undefined && step.kind !== "model") return [];
    return typeof step.model === "string" && step.model.trim() ? [step.model.trim()] : [];
  });
}

/** Table rows: menu models first, then description keys outside the menu, then pending keys. */
export function decisionDescriptionRows(
  menu: string[],
  descriptions: Record<string, string> | undefined,
  pendingKeys: string[]
): Array<{ key: string; inMenu: boolean }> {
  const rows = new Map<string, boolean>();
  for (const id of menu) rows.set(id, true);
  for (const key of [...Object.keys(descriptions ?? {}), ...pendingKeys]) {
    if (!rows.has(key)) rows.set(key, false);
  }
  return [...rows.entries()].map(([key, inMenu]) => ({ key, inMenu }));
}
