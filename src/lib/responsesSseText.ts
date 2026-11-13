import type { FieldCategory } from "./sseTextTransform";

type JsonObject = Record<string, unknown>;
type Processor = (
  text: string,
  field: FieldCategory,
  stop?: boolean,
  index?: string | number,
  snapshot?: boolean
) => string;
type PendingLane = { event: JsonObject; category: FieldCategory };
type LanePredicate = (lane: JsonObject) => boolean;

export interface ResponsesSseTextOptions {
  /** Route tool-call arguments/input through the processor (credential masking does). */
  processToolArgs?: boolean;
  /** Called with a lane key once its buffered tail was drained. */
  release?: (index: string) => void;
  /**
   * Category of a non-payload string by its key (`null` = protocol metadata, left as is).
   * Without it, non-payload strings are not redacted.
   */
  classify?: (key: string) => FieldCategory | null;
}

const DELTA_FIELDS: Record<string, [string, FieldCategory]> = {
  "response.output_text.delta": ["text", "content"],
  "response.refusal.delta": ["refusal", "content"],
  "response.reasoning_text.delta": ["text", "reasoning"],
  "response.reasoning_summary_text.delta": ["text", "reasoning"],
  "response.function_call_arguments.delta": ["arguments", "toolArgs"],
  "response.custom_tool_call_input.delta": ["input", "toolArgs"],
  "response.mcp_call_arguments.delta": ["arguments", "toolArgs"],
  "response.code_interpreter_call_code.delta": ["code", "content"],
  "response.audio.transcript.delta": ["text", "content"],
};
const TERMINALS = new Set([
  "response.completed",
  "response.done",
  "response.incomplete",
  "response.failed",
  "response.cancelled",
]);
const LIFECYCLE_SNAPSHOTS = new Set([...TERMINALS, "response.created", "response.in_progress"]);
const ITEM_SNAPSHOTS = new Set(["response.output_item.added", "response.output_item.done"]);
const PART_SNAPSHOTS = new Set([
  "response.content_part.added",
  "response.content_part.done",
  "response.reasoning_summary_part.added",
  "response.reasoning_summary_part.done",
]);
const LANE_FIELDS = ["item_id", "output_index", "content_index", "summary_index"];
// Protocol tokens of Responses frames that METADATA_KEYS does not cover: a redaction hit
// would corrupt a value the client matches on or sends back verbatim.
const RESPONSES_OPAQUE_KEYS = new Set(["phase", "approval_request_id"]);

const object = (value: unknown): JsonObject | undefined =>
  value && typeof value === "object" && !Array.isArray(value) ? (value as JsonObject) : undefined;
const rawItemId = (event: JsonObject) => event.item_id ?? object(event.item)?.id;
const sameSubIndex = (a: JsonObject, b: JsonObject, field: string) =>
  (a[field] ?? 0) === (b[field] ?? 0);

/** Which buffered lanes a `.done` event closes: its item, part, summary part or own delta. */
function doneLaneMatcher(type: string, event: JsonObject): LanePredicate {
  if (type === "response.output_item.done") return () => true;
  if (type === "response.content_part.done") {
    return (lane) => sameSubIndex(lane, event, "content_index");
  }
  if (type === "response.reasoning_summary_part.done") {
    return (lane) => sameSubIndex(lane, event, "summary_index");
  }
  const deltaType = type.slice(0, -5) + ".delta";
  return (lane) =>
    lane.type === deltaType &&
    sameSubIndex(lane, event, "content_index") &&
    sameSubIndex(lane, event, "summary_index");
}

/**
 * Routes Responses payloads through per item/part lanes. Answer, reasoning and tool payload
 * fields stream through the processor's rolling buffers; every other string of a frame is
 * redacted in place, without entering a buffer, so protocol metadata can never be spliced
 * into answer text while secrets in tool output, search results or annotations stay masked.
 */
class ResponsesLaneRouter {
  private readonly pending = new Map<string, PendingLane>();
  private readonly itemIndexes = new Map<string, number>();
  private readonly indexItems = new Map<number, string>();
  private readonly identities = new Map<string, string>();
  /** Payload fields (holder + key) of the frame being transformed. */
  private payload: Array<[JsonObject, string]> = [];

  constructor(
    private readonly processor: Processor,
    private readonly options: ResponsesSseTextOptions
  ) {}

  transform(event: JsonObject): JsonObject[] {
    const type = String(event.type);
    this.learnIdentity(event);
    this.payload = [];
    const flushed = this.routePayload(event, type);
    this.redactMetadata(event);
    this.payload = [];
    return flushed;
  }

  drain(matches: LanePredicate = () => true): JsonObject[] {
    const events: JsonObject[] = [];
    for (const [key, lane] of this.pending) {
      if (!matches(lane.event)) continue;
      const delta = this.processor("", lane.category, true, key, false);
      if (delta) events.push({ ...lane.event, delta });
      this.options.release?.(key);
      this.pending.delete(key);
    }
    return events;
  }

  private routePayload(event: JsonObject, type: string): JsonObject[] {
    const selected = DELTA_FIELDS[type];
    if (selected && typeof event.delta === "string") {
      this.payload.push([event, "delta"]);
      if (this.enabled(selected[1])) {
        this.bufferDelta(event, type, selected[1]);
        return [];
      }
    }
    const flushed = this.drainBefore(event, type);
    this.processSnapshots(event, type);
    return flushed;
  }

  // ── delta lane ────────────────────────────────────────────────────────────────────────

  private bufferDelta(event: JsonObject, type: string, category: FieldCategory): void {
    const key = this.laneKey(event);
    const wire: JsonObject = { ...this.pending.get(key)?.event, type };
    const id = this.itemId(event);
    const index = this.outputIndex(event);
    if (id !== undefined) wire.item_id = id;
    if (index !== undefined) wire.output_index = index;
    for (const field of LANE_FIELDS) {
      if (event[field] !== undefined) wire[field] = event[field];
    }
    this.pending.set(key, { event: wire, category });
    event.delta = this.processor(event.delta as string, category, false, key, false);
  }

  // ── done / terminal drain ─────────────────────────────────────────────────────────────

  private drainBefore(event: JsonObject, type: string): JsonObject[] {
    if (TERMINALS.has(type)) return this.drain();
    if (!type.endsWith(".done")) return [];
    const closes = doneLaneMatcher(type, event);
    return this.drain((lane) => this.sameItem(lane, event) && closes(lane));
  }

  private sameItem(a: JsonObject, b: JsonObject): boolean {
    const aId = this.itemId(a);
    const bId = this.itemId(b);
    if (aId !== undefined && bId !== undefined) return aId === bId;
    const aIndex = this.outputIndex(a);
    const bIndex = this.outputIndex(b);
    if (aIndex !== undefined && bIndex !== undefined) return aIndex === bIndex;
    return aId === undefined && bId === undefined && aIndex === undefined && bIndex === undefined;
  }

  // ── snapshot selection ────────────────────────────────────────────────────────────────

  private processSnapshots(event: JsonObject, type: string): void {
    const snapshot = type.endsWith(".done") ? DELTA_FIELDS[type.slice(0, -5) + ".delta"] : null;
    if (snapshot) this.processField(event, snapshot[0], snapshot[1]);
    if (ITEM_SNAPSHOTS.has(type)) this.processItem(event.item);
    if (PART_SNAPSHOTS.has(type)) this.processPart(event.part);
    const response = object(event.response);
    if (response && LIFECYCLE_SNAPSHOTS.has(type)) {
      if (Array.isArray(response.output)) response.output.forEach((item) => this.processItem(item));
      this.processField(response, "output_text", "content");
    }
  }

  private processItem(value: unknown): void {
    const obj = object(value);
    if (!obj) return;
    const parts = [obj.type === "message" || obj.type === "reasoning" ? obj.content : undefined];
    if (obj.type === "reasoning") parts.push(obj.summary);
    for (const list of parts) {
      if (Array.isArray(list)) list.forEach((part) => this.processPart(part));
    }
    if (obj.type === "function_call" || obj.type === "mcp_call") {
      this.processField(obj, "arguments", "toolArgs");
    }
    if (obj.type === "code_interpreter_call") this.processField(obj, "code", "content");
    if (obj.type === "custom_tool_call") this.processField(obj, "input", "toolArgs");
  }

  private processPart(value: unknown): void {
    const obj = object(value);
    if (obj?.type === "output_text") this.processField(obj, "text", "content");
    if (obj?.type === "refusal") this.processField(obj, "refusal", "content");
    if (obj?.type === "summary_text" || obj?.type === "reasoning_text") {
      this.processField(obj, "text", "reasoning");
    }
  }

  /** A payload snapshot: processed as a standalone value, never through a rolling buffer. */
  private processField(obj: JsonObject, key: string, category: FieldCategory): void {
    if (typeof obj[key] !== "string") return;
    this.payload.push([obj, key]);
    if (!this.enabled(category)) return;
    obj[key] = this.processor(obj[key] as string, category, false, "responses:snapshot", true);
  }

  // ── in-place metadata redaction ───────────────────────────────────────────────────────

  /**
   * Redact every non-payload string of the frame where it sits (tool output, search
   * results, annotations, instructions…), as a standalone value. A metadata key skips a
   * string value only; any object or array under it is still walked.
   */
  private redactMetadata(value: unknown): void {
    const classify = this.options.classify;
    if (!classify || !value || typeof value !== "object") return;
    const obj = value as JsonObject;
    for (const key of Object.keys(obj)) {
      if (RESPONSES_OPAQUE_KEYS.has(key) || this.isPayload(obj, key)) continue;
      const field = obj[key];
      if (typeof field !== "string") this.redactMetadata(field);
      else if (classify(key) !== null) {
        obj[key] = this.processor(field, "content", false, "responses:snapshot", true);
      }
    }
  }

  private isPayload(holder: JsonObject, key: string): boolean {
    return this.payload.some(([obj, field]) => obj === holder && field === key);
  }

  // ── identity ──────────────────────────────────────────────────────────────────────────

  private enabled(category: FieldCategory): boolean {
    return category !== "toolArgs" || this.options.processToolArgs === true;
  }

  private identityKeys(event: JsonObject): string[] {
    const keys: string[] = [];
    const id = rawItemId(event);
    if (typeof event.output_index === "number") keys.push(`index:${event.output_index}`);
    if (typeof id === "string") keys.push(`id:${id}`);
    return keys;
  }

  private learnIdentity(event: JsonObject): void {
    const keys = this.identityKeys(event);
    const known = keys.map((key) => this.identities.get(key)).filter((key) => key !== undefined);
    if (new Set(known).size > 1) throw new Error("[PII] Conflicting Responses stream identities");
    const identity = known[0] ?? keys[0];
    if (identity !== undefined) for (const key of keys) this.identities.set(key, identity);
    const id = rawItemId(event);
    if (typeof id === "string" && typeof event.output_index === "number") {
      this.itemIndexes.set(id, event.output_index);
      this.indexItems.set(event.output_index, id);
    }
  }

  private outputIndex(event: JsonObject): number | undefined {
    return typeof event.output_index === "number"
      ? event.output_index
      : this.itemIndexes.get(String(rawItemId(event)));
  }

  private itemId(event: JsonObject): unknown {
    const index = this.outputIndex(event);
    return rawItemId(event) ?? (index === undefined ? undefined : this.indexItems.get(index));
  }

  private laneKey(event: JsonObject): string {
    return JSON.stringify([
      event.type,
      this.identities.get(this.identityKeys(event)[0]) ?? "anonymous",
      event.content_index ?? 0,
      event.summary_index ?? 0,
    ]);
  }
}

/**
 * Process Responses payloads in item/part lanes while preserving protocol metadata.
 * Snapshots bypass rolling buffers; matching done/terminal events drain and release lanes;
 * non-payload strings are redacted in place. Conflicting identities fail closed without
 * logging the unredacted SSE chunk.
 */
export function createResponsesSseText(
  processor: Processor,
  options: ResponsesSseTextOptions = {}
): Pick<ResponsesLaneRouter, "transform" | "drain"> {
  return new ResponsesLaneRouter(processor, options);
}
