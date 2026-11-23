/**
 * Combo-builder draft helpers for the `decision` router's `config.decision` block
 * (adapted from #18555). Client-safe. Values are kept as typed (the combo schema trims on
 * save); blank fields and empty descriptions are dropped so `.strict()` limits only count
 * what the operator actually set. There is no API-key field: the credential is a stored
 * connection (`connectionId`) or the OMNIROUTE_DECISION_API_KEY environment variable.
 */

export const DECISION_ROUTER_STRATEGY = "decision";
export const DECISION_DECIDERS = ["systemone", "http", "combo-model"] as const;
export const DECISION_WIRE_OPTIONS = ["systemone", "openai-chat"] as const;
export const MAX_DECISION_DESCRIPTIONS = 50;
export const MAX_DECISION_DESCRIPTION_KEY_CHARS = 300;
export const MAX_DECISION_DESCRIPTION_CHARS = 1_000;
export const MAX_DECISION_PROMPT_CHARS = 8_000;

export type DecisionDecider = (typeof DECISION_DECIDERS)[number];
export type DecisionWireOption = (typeof DECISION_WIRE_OPTIONS)[number];

export interface DecisionDraft {
  decider: DecisionDecider;
  model?: string;
  baseUrl?: string;
  connectionId?: string;
  wire?: DecisionWireOption;
  timeoutMs?: number;
  minConfidence?: number;
  descriptions?: Record<string, string>;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function isDecisionRouterStrategy(strategy: unknown): boolean {
  return strategy === DECISION_ROUTER_STRATEGY;
}

/** Read `config.decision` into an editable draft, ignoring fields of the wrong type. */
export function readDecisionDraft(config: unknown): DecisionDraft {
  const raw = isRecord(config) && isRecord(config.decision) ? config.decision : {};
  const text = (value: unknown) => (typeof value === "string" ? value : undefined);
  const finite = (value: unknown) => {
    const n = typeof value === "number" ? value : Number.NaN;
    return Number.isFinite(n) ? n : undefined;
  };
  const decider = DECISION_DECIDERS.includes(raw.decider as DecisionDecider)
    ? (raw.decider as DecisionDecider)
    : "systemone";
  const wire = DECISION_WIRE_OPTIONS.includes(raw.wire as DecisionWireOption)
    ? (raw.wire as DecisionWireOption)
    : undefined;
  const descriptions = isRecord(raw.descriptions)
    ? Object.fromEntries(
        Object.entries(raw.descriptions).filter(
          (entry): entry is [string, string] => typeof entry[1] === "string"
        )
      )
    : undefined;
  return {
    decider,
    model: text(raw.model),
    baseUrl: text(raw.baseUrl),
    connectionId: text(raw.connectionId),
    wire,
    timeoutMs: finite(raw.timeoutMs),
    minConfidence: finite(raw.minConfidence),
    descriptions,
  };
}

/**
 * Merge a patch and drop blank values. Fields a decider does not use are dropped too
 * (`baseUrl`/`wire` outside `http`, `connectionId` for `combo-model`).
 */
export function patchDecisionDraft(
  draft: DecisionDraft,
  patch: Partial<DecisionDraft>
): DecisionDraft {
  const next: DecisionDraft = { ...draft, ...patch };
  const cleaned: DecisionDraft = { decider: next.decider };
  const keepText = (key: "model" | "baseUrl" | "connectionId") => {
    const value = next[key];
    if (typeof value === "string" && value.trim()) cleaned[key] = value;
  };
  keepText("model");
  if (next.decider === "http") {
    keepText("baseUrl");
    if (next.wire) cleaned.wire = next.wire;
  }
  if (next.decider !== "combo-model") keepText("connectionId");
  if (typeof next.timeoutMs === "number" && Number.isFinite(next.timeoutMs)) {
    cleaned.timeoutMs = next.timeoutMs;
  }
  if (typeof next.minConfidence === "number" && Number.isFinite(next.minConfidence)) {
    cleaned.minConfidence = next.minConfidence;
  }
  const descriptions = Object.entries(next.descriptions ?? {}).filter(
    ([key, value]) => key.trim() && value.trim()
  );
  if (descriptions.length) cleaned.descriptions = Object.fromEntries(descriptions);
  return cleaned;
}

/** Set (or, with blank text, remove) one description. */
export function setDecisionDescription(
  draft: DecisionDraft,
  key: string,
  text: string
): DecisionDraft {
  const descriptions = { ...(draft.descriptions ?? {}) };
  if (text.trim()) descriptions[key] = text;
  else delete descriptions[key];
  return patchDecisionDraft(draft, { descriptions });
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
