/**
 * CodeBuddy International `/v3/config` model catalog.
 *
 * `GET /v3/config?repos[]=` is the authoritative source of models and their
 * capabilities (the curated registry had drifted: 8 models missing, 5 stale).
 * The endpoint needs authentication, so it can never be mirrored at build time
 * — it is fetched at runtime and merged into the curated list.
 *
 * Parsing is deliberately defensive: the gateway is an external contract, so a
 * shape change must degrade to "no models from the gateway" instead of throwing
 * and taking model discovery down with it.
 *
 * // UNVERIFIED: the exact key names of the `/v3/config` model entries were not
 * captured, so every field below is read through a list of plausible aliases
 * (camelCase AND snake_case). Accepting an extra alias is harmless — an unknown
 * key simply never matches — while guessing a single spelling would silently
 * drop capabilities. Narrow this list once a real payload is captured.
 *
 * Live evidence (2026-10-26): `GET /v3/config?repos[]=` answers 28 entries that
 * OmniRoute turns into 28 models, and the ids are served correctly, so the
 * extraction path works. What was NOT captured is the per-entry field spelling
 * (capabilities/limits), because the fetch is consumed inside the server and
 * only the derived `{id, name, supportsVision}` reaches the models route.
 */

export interface CodeBuddyCatalogModel {
  id: string;
  name: string;
  reasoning?: boolean;
  vision?: boolean;
  toolCall?: boolean;
  maxTokens?: number;
  contextWindow?: number;
}

export interface MergeResult<T extends { id: string }> {
  models: Array<T & Partial<CodeBuddyCatalogModel>>;
  /** Ids the gateway lists that the curated list does not have. */
  added: string[];
  /** Curated ids the gateway no longer lists (kept, but flagged). */
  stale: string[];
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

function asBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function firstRecord(...values: unknown[]): JsonRecord {
  for (const value of values) {
    if (isRecord(value)) return value;
  }
  return {};
}

/** Locate the model array regardless of how deeply the gateway nests it. */
function findModelArray(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!isRecord(payload)) return [];

  for (const candidate of [payload.models, payload.data, payload.result, payload.list]) {
    if (Array.isArray(candidate)) return candidate;
  }

  const data = payload.data;
  if (isRecord(data)) {
    for (const candidate of [data.models, data.list, data.result, data.items]) {
      if (Array.isArray(candidate)) return candidate;
    }
  }

  const result = payload.result;
  if (isRecord(result) && Array.isArray(result.models)) return result.models;

  return [];
}

function parseEntry(entry: unknown): CodeBuddyCatalogModel | null {
  if (!isRecord(entry)) return null;

  const id =
    asString(entry.id) ||
    asString(entry.model) ||
    asString(entry.modelId) ||
    asString(entry.model_id);
  if (!id) return null;

  const capabilities = firstRecord(entry.capabilities, entry.capability, entry.features);
  const limits = firstRecord(entry.limits, entry.limit, capabilities.limits);

  const model: CodeBuddyCatalogModel = {
    id,
    name:
      asString(entry.name) ||
      asString(entry.displayName) ||
      asString(entry.display_name) ||
      asString(entry.label) ||
      asString(entry.title) ||
      id,
  };

  const reasoning =
    asBoolean(entry.reasoning) ??
    asBoolean(entry.supportsReasoning) ??
    asBoolean(entry.supports_reasoning) ??
    asBoolean(capabilities.reasoning) ??
    asBoolean(capabilities.supportsReasoning) ??
    asBoolean(capabilities.supports_reasoning);
  if (reasoning !== undefined) model.reasoning = reasoning;

  const vision =
    asBoolean(entry.vision) ??
    asBoolean(entry.supportsVision) ??
    asBoolean(entry.supports_vision) ??
    asBoolean(capabilities.vision) ??
    asBoolean(capabilities.supportsVision) ??
    asBoolean(capabilities.supports_vision) ??
    asBoolean(capabilities.image);
  if (vision !== undefined) model.vision = vision;

  const toolCall =
    asBoolean(entry.toolCall) ??
    asBoolean(entry.tool_call) ??
    asBoolean(entry.supportsToolCall) ??
    asBoolean(entry.supports_tool_call) ??
    asBoolean(entry.functionCall) ??
    asBoolean(capabilities.toolCall) ??
    asBoolean(capabilities.tool_call) ??
    asBoolean(capabilities.functionCall);
  if (toolCall !== undefined) model.toolCall = toolCall;

  const maxTokens =
    asNumber(entry.maxTokens) ??
    asNumber(entry.max_tokens) ??
    asNumber(entry.maxOutputTokens) ??
    asNumber(entry.max_output_tokens) ??
    asNumber(capabilities.maxTokens) ??
    asNumber(limits.maxTokens) ??
    asNumber(limits.max_tokens);
  if (maxTokens !== undefined) model.maxTokens = maxTokens;

  const contextWindow =
    asNumber(entry.contextWindow) ??
    asNumber(entry.context_window) ??
    asNumber(entry.maxInputTokens) ??
    asNumber(entry.max_input_tokens) ??
    asNumber(capabilities.contextWindow) ??
    asNumber(capabilities.context_window) ??
    asNumber(limits.contextWindow) ??
    asNumber(limits.context_window);
  if (contextWindow !== undefined) model.contextWindow = contextWindow;

  return model;
}

/** Parse a `/v3/config` payload into catalog entries. Never throws. */
export function parseCodeBuddyConfig(payload: unknown): CodeBuddyCatalogModel[] {
  const seen = new Set<string>();
  const models: CodeBuddyCatalogModel[] = [];

  for (const entry of findModelArray(payload)) {
    const model = parseEntry(entry);
    if (!model || seen.has(model.id)) continue;
    seen.add(model.id);
    models.push(model);
  }

  return models;
}

/**
 * Merge the gateway catalog into the curated list.
 *
 * - Curated entries keep their hand-written metadata (descriptions, pricing,
 *   aliases) but receive the gateway's capabilities.
 * - Gateway-only models are ADDED (they are the ones a curated list misses).
 * - Curated models the gateway omits are KEPT and reported as `stale`; dropping
 *   a model the user may still have configured would break their routing.
 *
 * The return type is intentionally non-generic in the added entries: a model the
 * curated list never declared has no `T`-specific fields to invent, so it is
 * surfaced as a plain catalog model instead of pretending to be `T`.
 */
export function mergeCatalogWithCurated<T extends { id: string }>(
  parsed: CodeBuddyCatalogModel[],
  curated: T[]
): MergeResult<T> {
  const parsedById = new Map(parsed.map((model) => [model.id, model]));
  const curatedIds = new Set(curated.map((model) => model.id));

  const models: Array<T & Partial<CodeBuddyCatalogModel>> = curated.map((entry) => {
    const fromGateway = parsedById.get(entry.id);
    if (!fromGateway) return { ...entry };
    return { ...fromGateway, ...entry };
  });

  const added: string[] = [];
  for (const model of parsed) {
    if (curatedIds.has(model.id)) continue;
    added.push(model.id);
    // Gateway-only entry: every field comes from the catalog, so `T`'s extra
    // properties are genuinely absent (the cast documents that, it does not
    // fabricate values).
    models.push({ ...model } as T & Partial<CodeBuddyCatalogModel>);
  }

  const stale = curated.filter((entry) => !parsedById.has(entry.id)).map((entry) => entry.id);

  return { models, added, stale };
}
