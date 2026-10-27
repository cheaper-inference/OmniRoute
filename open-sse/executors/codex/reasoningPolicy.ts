import {
  CODEX_EFFORT_ORDER as EFFORT_ORDER,
  getCodexAliasEffortCap,
  splitCodexReasoningSuffix,
  type CodexEffortLevel as EffortLevel,
} from "./reasoningSuffix.ts";

type RecordValue = Record<string, unknown>;
type WireEffort = string | number;
const NORMALIZED_EFFORTS = new Set<string>([...EFFORT_ORDER, "minimal", "persistent", "disabled"]);

function asRecord(value: unknown): RecordValue {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as RecordValue) : {};
}

/** Preserve the Responses control without forwarding Chat-only stream options. */
export function normalizeCodexSummaryStreamOptions(body: RecordValue): void {
  const delivery = asRecord(body.stream_options).reasoning_summary_delivery;
  if (typeof delivery === "string" && delivery.length > 0) {
    body.stream_options = { reasoning_summary_delivery: delivery };
  } else {
    delete body.stream_options;
  }
}

function effort(value: unknown): WireEffort | undefined {
  // Codex's request serializer emits custom u64 budgets as JSON numbers. Keep
  // the exactly representable JS subset, including zero, without coercion.
  if (typeof value === "number") {
    return Number.isSafeInteger(value) && value >= 0 ? value : undefined;
  }
  if (typeof value !== "string" || !value.trim()) return undefined;
  const normalized = value.trim().toLowerCase();
  // Retain known-tier normalization, but do not change model-defined spellings.
  return NORMALIZED_EFFORTS.has(normalized) ? normalized : value;
}

/**
 * Maximum reasoning effort allowed per Codex model.
 * Fallback for legacy catalog entries only. Discovered metadata takes precedence.
 * Max/ultra-tier models come from the alias sets in reasoningSuffix.ts.
 */
const MAX_EFFORT_BY_MODEL: Record<string, EffortLevel> = {
  "gpt-5.3-codex": "xhigh",
  "gpt-5.1-codex-max": "xhigh",
  "gpt-5-mini": "high",
  "gpt-5.1-mini": "high",
  "gpt-4.1-mini": "high",
};

/**
 * Clamp reasoning effort to the model's maximum allowed level.
 * Returns the original value if within limits, or the cap if it exceeds it.
 */
function legacyEffortCap(model: string): EffortLevel | null {
  return MAX_EFFORT_BY_MODEL[model] ?? getCodexAliasEffortCap(model);
}

function clampEffort(model: string, requested: WireEffort): WireEffort {
  if (typeof requested === "number") return requested;
  const max = legacyEffortCap(model);
  if (!max) return requested;
  const reqIdx = EFFORT_ORDER.indexOf(requested as EffortLevel);
  const maxIdx = EFFORT_ORDER.indexOf(max);
  if (reqIdx > maxIdx) {
    console.debug(`[Codex] clampEffort: "${requested}" → "${max}" (model: ${model})`);
    return max;
  }
  return requested;
}

/**
 * Preserve the Responses reasoning fields intentionally forwarded by this adapter.
 * The official Codex client emits context: "all_turns" for Responses Lite.
 * Ref: openai/codex@83086188ae0614bd882818ff1aa23f3194962012
 * codex-rs/core/src/client.rs:934-951.
 * Forward explicit caller values; this does not assert support on every backend
 * model or mode. Leave value validation to the upstream backend.
 * Strip OpenRouter-only siblings such as enabled, max_tokens, and exclude.
 */
function whitelistWireReasoning(body: RecordValue): void {
  const wire = body.reasoning;
  if (!wire || typeof wire !== "object" || Array.isArray(wire)) return;
  const record = wire as RecordValue;
  for (const key of Object.keys(record)) {
    if (key !== "effort" && key !== "summary" && key !== "context") delete record[key];
  }
  if (Object.keys(record).length === 0) delete body.reasoning;
}

/**
 * Apply a catalog-resolved selection without parsing a real upstream ID twice, then
 * whitelist the wire `reasoning` object. `forcedEffort` is a server-selected force rule
 * and outranks every request-side source.
 */
export function applyCodexReasoningSelection(
  model: string,
  body: RecordValue,
  metadataInput: unknown,
  connectionDefault: string | undefined,
  allowDefaults: boolean,
  forcedEffort?: string
): void {
  selectCodexReasoning(model, body, metadataInput, connectionDefault, allowDefaults, forcedEffort);
  whitelistWireReasoning(body);
}

type CatalogSplit = { baseModel: string; effort: WireEffort | null | undefined };

/** The model id and suffix effort: a discovered catalog id is used verbatim (no re-parse). */
function splitRequestedModel(
  metadata: RecordValue,
  requestedModel: string,
  hasCatalog: boolean
): CatalogSplit {
  return hasCatalog
    ? { baseModel: requestedModel, effort: effort(metadata.resolvedThinkingEffort) }
    : splitCodexReasoningSuffix(requestedModel);
}

/**
 * Effort used when the request carries none. OpenRouter-style `enabled: false` asks for
 * reasoning to be off: it wins over the connection default but loses to any per-request
 * effort selection.
 */
function fallbackEffort(
  reasoning: RecordValue,
  metadata: RecordValue,
  connectionDefault: string | undefined,
  allowDefaults: boolean
): WireEffort | undefined {
  if (reasoning.enabled === false) return "none";
  if (!allowDefaults) return undefined;
  return effort(connectionDefault) ?? effort(metadata.defaultThinkingEffort) ?? "medium";
}

/**
 * The caller's own effort choice. Chat→Responses translation normalizes canonical max to
 * xhigh, so for catalog-backed Codex models in passthrough mode the original choice is
 * restored; explicit thinking-budget policies still own the translated value in other modes.
 */
function requestedEffort(
  metadata: RecordValue,
  reasoning: RecordValue,
  body: RecordValue,
  restoreOriginal: boolean
): WireEffort | undefined {
  if (restoreOriginal && Object.hasOwn(metadata, "requestedThinkingEffort")) {
    return effort(metadata.requestedThinkingEffort);
  }
  return effort(reasoning.effort) ?? effort(body.reasoning_effort);
}

function selectCodexReasoning(
  model: string,
  body: RecordValue,
  metadataInput: unknown,
  connectionDefault: string | undefined,
  allowDefaults: boolean,
  forcedEffort: string | undefined
): void {
  const metadata = asRecord(metadataInput);
  const requestedModel = typeof body.model === "string" ? body.model : model;
  const hasCatalog =
    metadata.model === requestedModel && Array.isArray(metadata.supportedThinkingEfforts);
  const split = splitRequestedModel(metadata, requestedModel, hasCatalog);
  if (split.effort) body.model = split.baseModel;
  const reasoning = asRecord(body.reasoning);
  const requested = requestedEffort(metadata, reasoning, body, hasCatalog && allowDefaults);
  const selected =
    effort(forcedEffort) ??
    split.effort ??
    requested ??
    fallbackEffort(reasoning, metadata, connectionDefault, allowDefaults);
  if (selected === undefined || selected === null) return;
  // New catalog values pass through verbatim, including upstream validation errors.
  // Only the old built-in Ultra aliases retain their historical Max wire mapping.
  const resolved = hasCatalog ? selected : clampEffort(split.baseModel, selected);
  body.reasoning = {
    ...reasoning,
    effort:
      !hasCatalog && legacyEffortCap(split.baseModel) && resolved === "ultra" ? "max" : resolved,
  };
}
