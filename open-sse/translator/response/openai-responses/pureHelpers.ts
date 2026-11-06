// Pure, stateless helpers for the OpenAI Responses <-> Chat response translator.
// Extracted verbatim from response/openai-responses.ts (no host imports, no stream state).

// Minimal structural view of the tool JSON-Schema subset this module inspects. Values
// arrive straight from request payloads, so fields stay `unknown` and every access site
// narrows them with runtime guards — the guards below remain the source of truth.
interface ToolArgSchema {
  description?: unknown;
  type?: unknown;
  enum?: unknown;
  properties?: Record<string, ToolArgSchema>;
  required?: unknown;
  default?: unknown;
  [key: string]: unknown;
}

export function normalizeToolName(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

// Tools whose empty-string/empty-array optional args are safe to strip. Arbitrary
// tools are left untouched because an empty string/array can be a valid payload.
// - "Read": Claude Code's Read tool (empty `pages`) — #2937.
// - "Subagent": Cursor's local subagent tool emits a cloud-only `cloud_base_branch: ""`,
//   which Cursor rejects unless environment is cloud — ported from decolua/9router#2446.
const STRIPPABLE_EMPTY_ARG_TOOLS = new Set(["Read", "Subagent"]);

// Deep-equal for JSON-shaped values (schema `default` comparison). Cheap and safe:
// tool args are always JSON-serializable, so a stringify comparison is exact.
function jsonValuesEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

function hasUsableSchema(schema: unknown): schema is ToolArgSchema {
  return !!(schema && typeof schema === "object" && !Array.isArray(schema));
}

function schemaProperties(schema: unknown): Record<string, ToolArgSchema> | null {
  if (!hasUsableSchema(schema)) return null;
  return schema.properties && typeof schema.properties === "object" ? schema.properties : null;
}

function schemaRequiredSet(schema: unknown): Set<unknown> {
  const required = hasUsableSchema(schema) ? schema.required : null;
  return new Set(Array.isArray(required) ? required : []);
}

function isEmptyToolArgValue(entry: unknown): boolean {
  return entry === "" || (Array.isArray(entry) && entry.length === 0);
}

// True when `entry` strictly equals the property's declared JSON Schema `default` — an
// emitted value indistinguishable from omission, safe to drop for any tool.
function matchesSchemaDefault(
  propSchema: ToolArgSchema | null | undefined,
  entry: unknown
): boolean {
  if (!propSchema || !Object.prototype.hasOwnProperty.call(propSchema, "default")) return false;
  return jsonValuesEqual(entry, propSchema.default);
}

// True when `entry` is empty and either the tool is on the legacy allowlist, or the
// schema declares this property but does not mark it `required` (generalized #6951 rule).
function isDroppableEmptyEntry(
  entry: unknown,
  propSchema: ToolArgSchema | null | undefined,
  required: Set<unknown>,
  key: string,
  allowlisted: boolean
): boolean {
  if (!isEmptyToolArgValue(entry)) return false;
  return allowlisted || (propSchema != null && !required.has(key));
}

function schemaTypeIncludes(type: unknown, wanted: string): boolean {
  return type === wanted || (Array.isArray(type) && type.includes(wanted));
}

function hasOmissionSentinel(propSchema: ToolArgSchema | null | undefined): boolean {
  if (!propSchema || typeof propSchema !== "object") return false;
  if (
    typeof propSchema.description !== "string" ||
    !propSchema.description.includes("null = omit this parameter")
  ) {
    return false;
  }
  return (
    schemaTypeIncludes(propSchema.type, "null") ||
    (Array.isArray(propSchema.enum) && propSchema.enum.includes(null))
  );
}

// #7023 — the request-side counterpart widens no-default optional properties to accept
// `null`, meaning "omitted" (OpenAI's own nullable-union idiom for Responses-API strict
// mode). Enums use injectOptionalEnumOmissionSentinel; plain strings use
// injectOptionalStringOmissionSentinel. Drop the key when the model follows that idiom
// for a non-required, schema-declared property, or when OmniRoute's marker is present
// even after an upstream strictifies the field into `required`.
function isDroppableNullEntry(
  entry: unknown,
  propSchema: ToolArgSchema | null | undefined,
  required: Set<unknown>,
  key: string,
  toolName: string
): boolean {
  if (entry !== null) return false;
  if (toolName === "Agent") return true;
  if (propSchema == null) return false;
  return !required.has(key) || hasOmissionSentinel(propSchema);
}

function stripEmptyOptionalToolArgsObject(
  value: Record<string, unknown>,
  toolName: string,
  schema: unknown
): Record<string, unknown> {
  const properties = schemaProperties(schema);
  const required = schemaRequiredSet(schema);
  const allowlisted = STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName);

  const cleaned = { ...value };
  for (const [key, entry] of Object.entries(cleaned)) {
    const propSchema = properties ? properties[key] : null;
    if (
      matchesSchemaDefault(propSchema, entry) ||
      isDroppableEmptyEntry(entry, propSchema, required, key, allowlisted) ||
      isDroppableNullEntry(entry, propSchema, required, key, toolName)
    ) {
      delete cleaned[key];
    }
  }
  return cleaned;
}

// #6951 — Responses API strict mode forces every tool property into `required`, so the
// model always emits *some* value for "optional" params (no first-class optional).
// When the tool's JSON Schema is available (`schema`, from the request's `tools[]`),
// normalization becomes schema-aware instead of allowlist-only:
//   - drop-if-default: value strictly equals the property's declared `default`.
//   - drop-if-empty (generalized): empty string/array for a property that is declared
//     in `schema.properties` but absent from `schema.required` — any tool, not just the
//     Read/Subagent allowlist above.
// Without a schema, behavior is unchanged (allowlist + empty-only), preserving existing
// callers that only pass (value, toolName).
export function stripEmptyOptionalToolArgs(
  value: unknown,
  toolName: string,
  schema: unknown
): unknown {
  if (value == null) return value;

  if (typeof value === "string") {
    // JSON-string cleanup runs for allowlisted tools, or for any tool once a schema is
    // supplied (schema-aware normalization is not restricted to the allowlist).
    // "Agent" also passes without a schema: isDroppableNullEntry drops its null
    // omission sentinels even when the strict schema snapshot is unavailable (#9423).
    if (
      !hasUsableSchema(schema) &&
      !STRIPPABLE_EMPTY_ARG_TOOLS.has(toolName) &&
      toolName !== "Agent"
    ) {
      return value;
    }
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) || typeof parsed !== "object" || parsed === null) return value;
      const cleaned = stripEmptyOptionalToolArgs(parsed, toolName, schema);
      return JSON.stringify(cleaned ?? {});
    } catch {
      return value;
    }
  }

  if (Array.isArray(value) || typeof value !== "object") return value;

  return stripEmptyOptionalToolArgsObject(value as Record<string, unknown>, toolName, schema);
}

export function normalizeOutputIndex(outputIndex: unknown): number {
  const normalized = Number(outputIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : 0;
}

/** A `{ url, title? }` search hit; the shared emitter normalizes these into blocks. */
export interface ResponsesWebSearchHit {
  url: string;
  title?: string;
}

/** One `web_search_call` output item: its query and the hits it reported. */
export interface ResponsesWebSearchCall {
  id: string;
  query: string;
  items: ResponsesWebSearchHit[];
}

/**
 * The web-search evidence a SINGLE Responses SSE chunk carries, normalized for the
 * shared emitter (`helpers/claudeServerWebSearch.ts`). Pure and per-chunk: the caller
 * accumulates these across the stream, so this leaf keeps the stateless contract
 * enforced by its split-guard test.
 *
 * Two upstream shapes are read:
 *  - `web_search_call` output items → `call` (`action.query`, `action.sources[]`),
 *  - `url_citation` annotations on the answer message → `citations[]`.
 * `response.completed`'s output[] snapshot is a fallback for upstreams that never
 * stream the incremental events.
 */
export interface ResponsesWebSearchChunkEvidence {
  call?: ResponsesWebSearchCall;
  citations: ResponsesWebSearchHit[];
  /**
   * Id of a call that must be DROPPED: `output_item.added` announced it, but the
   * matching `output_item.done` reported a non-completed status, so the search
   * produced no evidence.
   */
  revokeCallId?: string;
}

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

/** A `{ url, title? }` hit from an upstream shape, or null when the url is unusable. */
function toHit(value: unknown): ResponsesWebSearchHit | null {
  const record = toRecord(value);
  const url = typeof record.url === "string" ? record.url.trim() : "";
  if (!url) return null;
  const title = typeof record.title === "string" ? record.title.trim() : "";
  return title ? { url, title } : { url };
}

/** Normalize one `web_search_call` output item (or null when it has no usable id). */
function toCall(callItem: unknown): ResponsesWebSearchCall | null {
  const record = toRecord(callItem);
  const id = typeof record.id === "string" ? record.id : "";
  if (!id) return null;
  const action = toRecord(record.action);
  const items: ResponsesWebSearchHit[] = [];
  if (Array.isArray(action.sources)) {
    for (const source of action.sources) {
      const hit = toHit(source);
      if (hit) items.push(hit);
    }
  }
  return { id, query: typeof action.query === "string" ? action.query : "", items };
}

/** Normalize one `url_citation` annotation (or null for any other annotation type). */
function toCitation(annotation: unknown): ResponsesWebSearchHit | null {
  const record = toRecord(annotation);
  if (record.type !== "url_citation") return null;
  return toHit(record);
}

/** True for a web_search_call whose status says it finished (a missing status counts as finished). */
function isCompletedStatus(status: unknown): boolean {
  return status === undefined || status === "completed";
}

/** `output_item.added` / `output_item.done` for a `web_search_call` item. */
function extractWebSearchCallItemEvidence(
  eventType: unknown,
  item: Record<string, unknown>
): ResponsesWebSearchChunkEvidence {
  const empty: ResponsesWebSearchChunkEvidence = { citations: [] };
  // Only a finished call is evidence of a search that actually ran. A call that
  // failed/incomplete is not evidence — and it must REVOKE the call the
  // `output_item.added` event already recorded, so no empty result pair is
  // emitted for a search that never produced anything.
  if (eventType === "response.output_item.done" && !isCompletedStatus(item.status)) {
    const id = typeof item.id === "string" ? item.id : "";
    return id ? { citations: [], revokeCallId: id } : empty;
  }
  const call = toCall(item);
  return call ? { call, citations: [] } : empty;
}

/** Every `url_citation` among the annotations of one message content part. */
function collectPartCitations(part: unknown): ResponsesWebSearchHit[] {
  const annotations = toRecord(part).annotations;
  if (!Array.isArray(annotations)) return [];
  const citations: ResponsesWebSearchHit[] = [];
  for (const annotation of annotations) {
    const citation = toCitation(annotation);
    if (citation) citations.push(citation);
  }
  return citations;
}

/** `response.completed` / `response.incomplete`: the final output array, read in one pass. */
function extractFinalResponseEvidence(
  payload: Record<string, unknown>
): ResponsesWebSearchChunkEvidence {
  const response = toRecord(payload.response);
  const output = Array.isArray(response.output) ? response.output : [];
  const citations: ResponsesWebSearchHit[] = [];
  let call: ResponsesWebSearchCall | null = null;
  for (const value of output) {
    const outputItem = toRecord(value);
    if (outputItem.type === "web_search_call") {
      // Same rule as the incremental events: a call that never completed is
      // not evidence of a search that ran.
      if (!isCompletedStatus(outputItem.status)) continue;
      call = toCall(outputItem) ?? call;
    } else if (outputItem.type === "message" && Array.isArray(outputItem.content)) {
      for (const part of outputItem.content) citations.push(...collectPartCitations(part));
    }
  }
  return { ...(call ? { call } : {}), citations };
}

/**
 * Read the web-search evidence out of one raw Responses SSE chunk. Returns an empty
 * result for every other event, so a caller can invoke it unconditionally.
 */
export function extractResponsesWebSearchEvidence(chunk: unknown): ResponsesWebSearchChunkEvidence {
  const root = toRecord(chunk);
  const eventType = root.type || root.event;
  const payload = toRecord(root.data || root);
  const item = toRecord(payload.item);

  const isItemEvent =
    eventType === "response.output_item.added" || eventType === "response.output_item.done";
  if (isItemEvent && item.type === "web_search_call") {
    return extractWebSearchCallItemEvidence(eventType, item);
  }
  if (eventType === "response.output_text.annotation.added") {
    const citation = toCitation(payload.annotation);
    return { citations: citation ? [citation] : [] };
  }
  if (eventType === "response.completed" || eventType === "response.incomplete") {
    return extractFinalResponseEvidence(payload);
  }
  return { citations: [] };
}

export function normalizeUpstreamFailure(data: unknown, fallbackType = "server_error") {
  const root = (data && typeof data === "object" ? data : {}) as Record<string, unknown>;
  const response =
    root.response && typeof root.response === "object"
      ? (root.response as Record<string, unknown>)
      : null;
  const error =
    response?.error && typeof response.error === "object"
      ? (response.error as Record<string, unknown>)
      : root.error && typeof root.error === "object"
        ? (root.error as Record<string, unknown>)
        : null;

  const code = typeof error?.code === "string" ? error.code : "";
  const message =
    typeof error?.message === "string"
      ? error.message
      : typeof root.message === "string"
        ? root.message
        : "Upstream failure";

  // Preserve upstream error semantics:
  // - context_length_exceeded → 400 (client can retry with smaller context)
  // - rate_limit_exceeded → 429 (client should back off)
  // - Everything else → 502 (upstream failure)
  const isContextOverflow = code === "context_length_exceeded";
  const isRateLimit = code === "rate_limit_exceeded" || code === "rate_limited";
  let status: number;
  let type: string;
  if (isRateLimit) {
    status = 429;
    type = "rate_limit_error";
  } else if (isContextOverflow) {
    status = 400;
    type = "invalid_request_error";
  } else {
    status = 502;
    type = fallbackType;
  }

  return {
    status,
    type,
    code: code || (isRateLimit ? "rate_limit_exceeded" : "bad_gateway"),
    message,
  };
}

// `response.done` is a terminal alias some Responses upstreams send instead of (or
// after) response.completed / response.incomplete / response.failed. Route it by
// response.status so the translator's existing terminal branches handle it.
export function resolveResponsesDoneEventType(
  eventType: string | undefined,
  data: unknown
): string | undefined {
  if (eventType !== "response.done") return eventType;
  const response =
    data && typeof data === "object" ? (data as { response?: unknown }).response : null;
  const status =
    response && typeof response === "object" ? (response as { status?: unknown }).status : null;
  if (status === "failed" || status === "cancelled") return "response.failed";
  if (status === "incomplete") return "response.incomplete";
  return "response.completed";
}

export function extractResponsesReasoningSummaryText(item: unknown): string {
  const summary = item && typeof item === "object" ? (item as { summary?: unknown }).summary : null;
  if (!Array.isArray(summary)) return "";
  // #9500 — reasoning summary parts are discrete segments; join with "\n\n"
  // (matches extractThinkingFromContent convention). Filter empties so an
  // empty summary_text element does not produce a dangling separator.
  return summary
    .map((part) => {
      const p = part as { text?: unknown } | null;
      return p && typeof p === "object" && typeof p.text === "string" ? p.text : "";
    })
    .filter((text) => text.length > 0)
    .join("\n\n");
}

// #7095/#7176/#7243 — when Codex exposes a reasoning item only as encrypted
// private reasoning (no plaintext summary), callers may synthesize client-facing
// reasoning summary events from this helper. Reconciles three goals:
//   - #7176: never mutate the upstream item — `encrypted_content` (needed by
//     Codex for subsequent requests) must not be overwritten with a fabricated
//     `summary`.
//   - #7095: real plaintext summaries from upstream are forwarded to chat
//     clients that render a thinking panel.
//   - #7243: when upstream provides no plaintext summary, do NOT fabricate an
//     alarming error-like paragraph into `reasoning_summary_text.delta` — clients
//     would display it as if it were real reasoning. Return empty so synthetic
//     summary events are suppressed; the reasoning item (with `encrypted_content`)
//     still arrives on `response.output_item.done`.
export function getVisibleResponsesReasoningSummaryText(item: unknown): string {
  return extractResponsesReasoningSummaryText(item);
}
