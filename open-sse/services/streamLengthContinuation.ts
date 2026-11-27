/**
 * Bounded continuation after a genuine upstream `finish_reason: "length"`.
 *
 * Scope: single-choice Chat Completions SSE that already delivered text. When the upstream
 * ends such a turn with `length`, the terminal frames are held back and ONE extra request
 * goes to the same executor and connection, prefilled with the delivered text. The client
 * still gets a single terminal and a single `[DONE]`, and usage that adds up both runs.
 *
 * Bounds: one extra request, a cap on its output tokens, a wall-clock deadline measured from
 * the moment the terminal is held, and a cap on the bytes held. A limit the client set itself
 * is never extended. Whenever the extension cannot be proven safe (it fails, stalls, uses
 * tools, or does not echo the end of the delivered text) the original frames are delivered
 * unchanged, so the failure mode is exactly today's behavior.
 */
import { STREAM_RECOVERY } from "../config/constants.ts";
import { isRegisteredFeatureFlagEnabled } from "../utils/registeredFeatureFlag.ts";
import { makeContinuationBody, trimContinuationOverlap } from "./streamRecovery.ts";

export const LENGTH_CONTINUATION_FLAG = "STREAM_LENGTH_CONTINUATION_ENABLED";

export const LENGTH_CONTINUATION_LIMITS = {
  maxExtraOutputTokens: 2048,
  continuationTimeoutMs: 30_000,
  maxBufferedBytes: 64 * 1024,
} as const;

/** Beyond this, an event with no boundary is no SSE we understand: stop parsing it. */
const MAX_UNTERMINATED_EVENT_CHARS = 1024 * 1024;

type JsonRecord = Record<string, unknown>;

export type LengthContinuationExecution = {
  phase: "initial" | "continuation";
  finishReason: string | null;
  usage: JsonRecord | null;
};

export type LengthContinuationFailure =
  | "retention-cap"
  | "no-stream"
  | "timeout"
  | "aborted"
  | "stream-error"
  | "overflow"
  | "empty"
  | "unsafe-content"
  | "no-terminal"
  | "uncertain-seam"
  | "no-suffix"
  | "error";

export type LengthContinuationOutcome =
  | { outcome: "continued"; suffixChars: number }
  | { outcome: "skipped"; reason: "client-limit" | "not-continuable" }
  | { outcome: "fallback"; reason: LengthContinuationFailure };

export type LengthContinuationOptions = Readonly<{
  /** The client's signal: aborting it aborts the extension too. */
  signal: AbortSignal;
  /** Wall-clock budget for the extension, measured from the moment the terminal is held. */
  continuationTimeoutMs: number;
  maxExtraOutputTokens: number;
  maxBufferedBytes: number;
  /** Output limit the client set itself (null when it set none). Never extended. */
  clientOutputLimit: number | null;
  reopen: (
    body: Record<string, unknown>,
    signal: AbortSignal
  ) => Promise<ReadableStream<Uint8Array> | null>;
  /** One call per upstream execution whose usage may be billed, rejected extensions included. */
  onExecution?: (execution: LengthContinuationExecution) => void;
  onOutcome?: (outcome: LengthContinuationOutcome) => void;
}>;

// ── Request-level eligibility ────────────────────────────────────────────────

const LINKED_SESSION_KEYS = ["previous_response_id", "conversation", "session_id", "thread_id"];

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function positiveNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

export function isLengthContinuationEnabled(): boolean {
  return isRegisteredFeatureFlagEnabled(LENGTH_CONTINUATION_FLAG);
}

/** The smallest output limit the client itself put on the request, or null. */
export function explicitClientOutputLimit(clientBody: unknown): number | null {
  if (!isRecord(clientBody)) return null;
  const generationConfig = isRecord(clientBody.generationConfig)
    ? clientBody.generationConfig.maxOutputTokens
    : undefined;
  const candidates = [
    clientBody.max_completion_tokens,
    clientBody.max_tokens,
    clientBody.max_output_tokens,
    generationConfig,
  ]
    .map(positiveNumber)
    .filter((value): value is number => value !== null);
  return candidates.length > 0 ? Math.min(...candidates) : null;
}

function asksForOneChoice(body: unknown): boolean {
  if (!isRecord(body) || body.n === undefined || body.n === null) return true;
  return body.n === 1;
}

/** Static checks on the request; the turn's content is checked as the stream is read. */
export function isLengthContinuationRequestEligible(
  clientBody: unknown,
  upstreamBody: unknown
): boolean {
  if (!isRecord(upstreamBody)) return false;
  if (!Array.isArray(upstreamBody.messages) || upstreamBody.messages.length === 0) return false;
  if (!asksForOneChoice(clientBody) || !asksForOneChoice(upstreamBody)) return false;
  if (upstreamBody.audio !== undefined && upstreamBody.audio !== null) return false;
  return !LINKED_SESSION_KEYS.some((key) => {
    const value = upstreamBody[key];
    return value !== undefined && value !== null && value !== "";
  });
}

// ── SSE helpers ──────────────────────────────────────────────────────────────

type ParsedEvent = { raw: string; done: boolean; json: JsonRecord | null };

const EVENT_BOUNDARY = /\r?\n\r?\n/g;

/** Split complete events (separator included, so bytes survive) from the unfinished rest. */
function takeEvents(buffer: string): { events: string[]; rest: string } {
  const events: string[] = [];
  let start = 0;
  EVENT_BOUNDARY.lastIndex = 0;
  for (let match = EVENT_BOUNDARY.exec(buffer); match; match = EVENT_BOUNDARY.exec(buffer)) {
    const end = match.index + match[0].length;
    events.push(buffer.slice(start, end));
    start = end;
  }
  return { events, rest: buffer.slice(start) };
}

function parseEvent(raw: string): ParsedEvent {
  const data = raw
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data:"))
    .map((line) => line.slice(5).replace(/^ /, ""))
    .join("\n")
    .trim();
  if (data === "[DONE]") return { raw, done: true, json: null };
  if (!data) return { raw, done: false, json: null };
  try {
    const parsed: unknown = JSON.parse(data);
    return { raw, done: false, json: isRecord(parsed) ? parsed : null };
  } catch {
    return { raw, done: false, json: null };
  }
}

function encodeEvent(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

type Fold = {
  text: string;
  tool: boolean;
  refusal: boolean;
  multiChoice: boolean;
  finishReason: string | null;
  usage: JsonRecord | null;
};

function newFold(): Fold {
  return {
    text: "",
    tool: false,
    refusal: false,
    multiChoice: false,
    finishReason: null,
    usage: null,
  };
}

/** Fold one delta's visible text and its tool and refusal signals into the scan. */
function foldDelta(fold: Fold, delta: JsonRecord): void {
  if (typeof delta.content === "string") fold.text += delta.content;
  if (hasToolSignal(delta)) fold.tool = true;
  if (typeof delta.refusal === "string" && delta.refusal.length > 0) fold.refusal = true;
}

function hasToolSignal(delta: JsonRecord): boolean {
  if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) return true;
  return delta.function_call !== undefined && delta.function_call !== null;
}

function foldChoice(fold: Fold, choice: JsonRecord): void {
  if (typeof choice.index === "number" && choice.index !== 0) {
    fold.multiChoice = true;
    return;
  }
  if (isRecord(choice.delta)) foldDelta(fold, choice.delta);
  if (typeof choice.finish_reason === "string") fold.finishReason = choice.finish_reason;
}

function foldEvent(fold: Fold, json: JsonRecord): void {
  if (isRecord(json.usage)) fold.usage = json.usage;
  if (!Array.isArray(json.choices)) return;
  for (const choice of json.choices) {
    if (isRecord(choice)) foldChoice(fold, choice);
  }
}

function firstChoice(json: JsonRecord | null): JsonRecord | null {
  if (!json || !Array.isArray(json.choices)) return null;
  const choice = json.choices[0];
  return isRecord(choice) ? choice : null;
}

function sumUsage(a: JsonRecord, b: JsonRecord): JsonRecord {
  const out: JsonRecord = { ...a };
  for (const [key, value] of Object.entries(b)) {
    const current = out[key];
    if (typeof current === "number" && typeof value === "number") out[key] = current + value;
    else if (isRecord(current) && isRecord(value)) out[key] = sumUsage(current, value);
    else if (current === undefined) out[key] = value;
  }
  return out;
}

const ABORTED = Symbol("aborted");

/** Resolve with ABORTED as soon as the signal fires; a late result is handed to `discard`. */
function raceAbort<T>(
  promise: Promise<T>,
  signal: AbortSignal,
  discard?: (late: T) => void
): Promise<T | typeof ABORTED> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const onAbort = () => {
      if (settled) return;
      settled = true;
      resolve(ABORTED);
    };
    if (signal.aborted) {
      promise.then((late) => discard?.(late)).catch(() => {});
      resolve(ABORTED);
      return;
    }
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        if (settled) {
          discard?.(value);
          return;
        }
        settled = true;
        resolve(value);
      },
      (error) => {
        signal.removeEventListener("abort", onAbort);
        if (settled) return;
        settled = true;
        reject(error);
      }
    );
  });
}

// ── Extension: request body, drain, validation, frames ───────────────────────

type ExtensionResult =
  | {
      kind: "ok";
      suffix: string;
      finishReason: string;
      usage: JsonRecord | null;
      done: boolean;
    }
  | { kind: "fail"; reason: LengthContinuationFailure; usage: JsonRecord | null };

type Mode = "scan" | "held" | "passthrough";

function byteLength(text: string): number {
  return new TextEncoder().encode(text).length;
}

function heldVerbatim(held: readonly ParsedEvent[]): string {
  return held.map((event) => event.raw).join("");
}

/** Held frames as they came, with the usage of a rejected extension folded in. */
function heldWithUsage(
  held: readonly ParsedEvent[],
  baseUsage: JsonRecord | null,
  extra: JsonRecord | null
): string {
  if (!extra || !baseUsage) return heldVerbatim(held);
  const combined = sumUsage(baseUsage, extra);
  return held
    .map((event) =>
      event.json && isRecord(event.json.usage)
        ? encodeEvent({ ...event.json, usage: combined })
        : event.raw
    )
    .join("");
}

/** Extra output tokens the extension may use, or null when the client's own limit is spent. */
function resolveExtraTokenCap(options: LengthContinuationOptions, usage: JsonRecord | null) {
  if (options.clientOutputLimit === null) return options.maxExtraOutputTokens;
  const used = usage?.completion_tokens;
  const remaining =
    typeof used === "number" && Number.isFinite(used) ? options.clientOutputLimit - used : 0;
  return remaining <= 0 ? null : Math.min(options.maxExtraOutputTokens, remaining);
}

function buildContinuationBody(
  body: Readonly<Record<string, unknown>>,
  delivered: string,
  cap: number
): Record<string, unknown> | null {
  const prefilled = makeContinuationBody(body as Record<string, unknown>, delivered);
  if (!prefilled || !Array.isArray((prefilled as { messages?: unknown }).messages)) return null;
  const next: Record<string, unknown> = { ...prefilled, stream: true };
  const keys = ["max_tokens", "max_completion_tokens"].filter((key) => key in next);
  for (const key of keys.length > 0 ? keys : ["max_tokens"]) next[key] = cap;
  return next;
}

/** Read the extension fully (bounded). `track` exposes the reader so a client cancel can end it. */
async function drainExtension(
  source: ReadableStream<Uint8Array>,
  signal: AbortSignal,
  maxBytes: number,
  track: (reader: ReadableStreamDefaultReader<Uint8Array> | null) => void
): Promise<{ failure: LengthContinuationFailure | null; raw: string }> {
  const extReader = source.getReader();
  track(extReader);
  const extDecoder = new TextDecoder();
  let raw = "";
  let bytes = 0;
  try {
    for (;;) {
      let result: ReadableStreamReadResult<Uint8Array> | typeof ABORTED;
      try {
        result = await raceAbort(extReader.read(), signal);
      } catch {
        return { failure: "stream-error", raw };
      }
      if (result === ABORTED) return { failure: "aborted", raw };
      if (result.done) return { failure: null, raw: raw + extDecoder.decode() };
      bytes += result.value.length;
      if (bytes > maxBytes) return { failure: "overflow", raw };
      raw += extDecoder.decode(result.value, { stream: true });
      if (/data:\s*\[DONE\]/.test(raw)) return { failure: null, raw };
    }
  } finally {
    track(null);
    await extReader.cancel().catch(() => {});
  }
}

function foldExtension(raw: string): { fold: Fold; done: boolean } {
  const fold = newFold();
  let done = false;
  const { events, rest } = takeEvents(raw.endsWith("\n") ? raw : `${raw}\n\n`);
  for (const chunk of [...events, rest]) {
    if (!chunk) continue;
    const parsed = parseEvent(chunk);
    if (parsed.done) done = true;
    if (parsed.json) foldEvent(fold, parsed.json);
  }
  return { fold, done };
}

function judgeExtension(fold: Fold, done: boolean, delivered: string): ExtensionResult {
  const fail = (reason: LengthContinuationFailure): ExtensionResult => ({
    kind: "fail",
    reason,
    usage: fold.usage,
  });
  if (fold.multiChoice || fold.tool || fold.refusal) return fail("unsafe-content");
  if (fold.text.length === 0) return fail("empty");
  if (fold.finishReason === null) return fail("no-terminal");
  if (fold.finishReason === "tool_calls" || fold.finishReason === "function_call")
    return fail("unsafe-content");
  const suffix = trimContinuationOverlap(delivered, fold.text);
  const overlap = fold.text.length - suffix.length;
  if (overlap < Math.min(STREAM_RECOVERY.MIN_CONTINUATION_OVERLAP_CHARS, delivered.length))
    return fail("uncertain-seam");
  if (suffix.length === 0) return fail("no-suffix");
  return { kind: "ok", suffix, finishReason: fold.finishReason, usage: fold.usage, done };
}

function validateExtension(raw: string, delivered: string): ExtensionResult {
  const { fold, done } = foldExtension(raw);
  return judgeExtension(fold, done, delivered);
}

/** The frames that replace the held terminal when the extension was accepted. */
function buildSuccessFrames(
  lengthJson: JsonRecord,
  result: Extract<ExtensionResult, { kind: "ok" }>,
  baseUsage: JsonRecord | null,
  sawDone: boolean
): string {
  const identity: JsonRecord = { ...lengthJson };
  delete identity.choices;
  delete identity.usage;
  const usageInline = isRecord(lengthJson.usage);
  const combined = baseUsage && result.usage ? sumUsage(baseUsage, result.usage) : null;
  const delta = firstChoice(lengthJson)?.delta;
  let out = "";
  if (isRecord(delta) && Object.keys(delta).length > 0) {
    out += encodeEvent({ ...identity, choices: [{ index: 0, delta }] });
  }
  out += encodeEvent({ ...identity, choices: [{ index: 0, delta: { content: result.suffix } }] });
  out += encodeEvent({
    ...identity,
    choices: [{ index: 0, delta: {}, finish_reason: result.finishReason }],
    ...(usageInline && combined ? { usage: combined } : {}),
  });
  if (!usageInline && combined) out += encodeEvent({ ...identity, choices: [], usage: combined });
  if (sawDone || result.done) out += "data: [DONE]\n\n";
  return out;
}

/** Aborts `controller` when the client leaves or the deadline passes; `dispose` undoes both. */
function armExtensionGuards(
  controller: AbortController,
  options: LengthContinuationOptions
): { timedOut: () => boolean; dispose: () => void } {
  let timedOut = false;
  const onClientAbort = () => controller.abort(options.signal.reason);
  if (options.signal.aborted) controller.abort(options.signal.reason);
  else options.signal.addEventListener("abort", onClientAbort, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, options.continuationTimeoutMs);
  return {
    timedOut: () => timedOut,
    dispose: () => {
      clearTimeout(timer);
      options.signal.removeEventListener("abort", onClientAbort);
    },
  };
}

// ── The relay ────────────────────────────────────────────────────────────────

class LengthContinuationRelay {
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
  private readonly decoder = new TextDecoder();
  private readonly encoder = new TextEncoder();
  private readonly fold = newFold();
  private mode: Mode = "scan";
  private pending = "";
  private held: ParsedEvent[] = [];
  private heldBytes = 0;
  private lengthEvent: ParsedEvent | null = null;
  private sawDone = false;
  private cancelled = false;
  private upstreamReleased = false;
  private extension: AbortController | null = null;
  private extensionReader: ReadableStreamDefaultReader<Uint8Array> | null = null;

  constructor(
    stream: ReadableStream<Uint8Array>,
    private readonly body: Readonly<Record<string, unknown>>,
    private readonly options: LengthContinuationOptions
  ) {
    this.reader = stream.getReader();
  }

  toStream(): ReadableStream<Uint8Array> {
    return new ReadableStream<Uint8Array>({
      pull: (controller) => this.pull(controller),
      cancel: (reason) => this.cancel(reason),
    });
  }

  private report(outcome: LengthContinuationOutcome): void {
    this.options.onOutcome?.(outcome);
  }

  private async releaseUpstream(reason?: unknown): Promise<void> {
    if (this.upstreamReleased) return;
    this.upstreamReleased = true;
    try {
      await this.reader.cancel(reason);
    } catch {
      // already closed
    }
  }

  private mayContinue(): boolean {
    const { text, tool, refusal, multiChoice } = this.fold;
    return text.length > 0 && !tool && !refusal && !multiChoice;
  }

  private enqueueText(controller: ReadableStreamDefaultController<Uint8Array>, text: string) {
    if (this.cancelled || text.length === 0) return;
    controller.enqueue(this.encoder.encode(text));
  }

  /** Consume one complete event; returns the text to send to the client right now. */
  private consume(raw: string): string {
    if (this.mode === "passthrough") return raw;
    const event = parseEvent(raw);
    return this.mode === "held" ? this.consumeHeld(event) : this.consumeScan(event);
  }

  private consumeHeld(event: ParsedEvent): string {
    this.held.push(event);
    this.heldBytes += byteLength(event.raw);
    if (event.done) this.sawDone = true;
    if (event.json && isRecord(event.json.usage)) this.fold.usage = event.json.usage;
    if (this.heldBytes <= this.options.maxBufferedBytes) return "";
    this.mode = "passthrough";
    this.report({ outcome: "fallback", reason: "retention-cap" });
    const out = heldVerbatim(this.held);
    this.held = [];
    return out;
  }

  private consumeScan(event: ParsedEvent): string {
    if (event.json) foldEvent(this.fold, event.json);
    const reason = firstChoice(event.json)?.finish_reason;
    if (reason === "length" && this.mayContinue()) return this.startHolding(event);
    if (typeof reason === "string") this.mode = "passthrough";
    return event.raw;
  }

  private startHolding(event: ParsedEvent): string {
    this.mode = "held";
    this.lengthEvent = event;
    this.held = [event];
    this.heldBytes = byteLength(event.raw);
    if (this.heldBytes <= this.options.maxBufferedBytes) return "";
    this.mode = "passthrough";
    this.report({ outcome: "fallback", reason: "retention-cap" });
    this.held = [];
    return event.raw;
  }

  private async openSource(
    continuationBody: Record<string, unknown>,
    controller: AbortController
  ): Promise<ReadableStream<Uint8Array> | LengthContinuationFailure> {
    try {
      const source = await raceAbort(
        this.options.reopen(continuationBody, controller.signal),
        controller.signal,
        (late) => void late?.cancel().catch(() => {})
      );
      if (source === ABORTED) return "aborted";
      return source ?? "no-stream";
    } catch {
      return "no-stream";
    }
  }

  private async extend(
    continuationBody: Record<string, unknown>,
    delivered: string,
    controller: AbortController,
    timedOut: () => boolean
  ): Promise<ExtensionResult> {
    const source = await this.openSource(continuationBody, controller);
    if (typeof source === "string") {
      return { kind: "fail", reason: timedOut() ? "timeout" : source, usage: null };
    }
    const drained = await drainExtension(
      source,
      controller.signal,
      this.options.maxBufferedBytes,
      (reader) => {
        this.extensionReader = reader;
      }
    );
    const result = validateExtension(drained.raw, delivered);
    // Whatever the attempt reported is billed even when it is rejected: surface it.
    this.options.onExecution?.({
      phase: "continuation",
      finishReason: !drained.failure && result.kind === "ok" ? result.finishReason : null,
      usage: result.usage,
    });
    if (!drained.failure) return result;
    return {
      kind: "fail",
      reason: timedOut() ? "timeout" : drained.failure,
      usage: result.usage,
    };
  }

  private async runExtension(
    continuationBody: Record<string, unknown>,
    delivered: string
  ): Promise<ExtensionResult> {
    const controller = new AbortController();
    this.extension = controller;
    const guards = armExtensionGuards(controller, this.options);
    try {
      return await this.extend(continuationBody, delivered, controller, guards.timedOut);
    } catch {
      return {
        kind: "fail",
        reason: guards.timedOut() ? "timeout" : "error",
        usage: null,
      };
    } finally {
      guards.dispose();
      this.extension = null;
    }
  }

  /** Decide, run the extension, and return everything the client still has to receive. */
  private async settle(): Promise<string> {
    const lengthJson = this.lengthEvent?.json ?? null;
    const cap = resolveExtraTokenCap(this.options, this.fold.usage);
    if (cap === null) {
      this.report({ outcome: "skipped", reason: "client-limit" });
      return heldVerbatim(this.held);
    }
    const continuationBody = buildContinuationBody(this.body, this.fold.text, cap);
    if (!continuationBody || !lengthJson) {
      this.report({ outcome: "skipped", reason: "not-continuable" });
      return heldVerbatim(this.held);
    }
    this.options.onExecution?.({
      phase: "initial",
      finishReason: "length",
      usage: this.fold.usage,
    });
    const result = await this.runExtension(continuationBody, this.fold.text);
    if (result.kind === "fail") {
      this.report({ outcome: "fallback", reason: result.reason });
      return heldWithUsage(this.held, this.fold.usage, result.usage);
    }
    this.report({ outcome: "continued", suffixChars: result.suffix.length });
    return buildSuccessFrames(lengthJson, result, this.fold.usage, this.sawDone);
  }

  /** Read the next upstream chunk; null means the read ended the pull (cancel or error). */
  private async readUpstream(
    controller: ReadableStreamDefaultController<Uint8Array>
  ): Promise<ReadableStreamReadResult<Uint8Array> | null> {
    let result: ReadableStreamReadResult<Uint8Array>;
    try {
      result = await this.reader.read();
    } catch (error) {
      if (this.cancelled) return null;
      this.upstreamReleased = true;
      if (this.mode === "held") this.enqueueText(controller, heldVerbatim(this.held));
      controller.error(error);
      return null;
    }
    return this.cancelled ? null : result;
  }

  /** The upstream ended: flush the unfinished tail, settling a held terminal first. */
  private async finishUpstream(controller: ReadableStreamDefaultController<Uint8Array>) {
    this.upstreamReleased = true;
    const tail = this.pending + this.decoder.decode();
    this.pending = "";
    if (this.mode === "held") {
      if (tail) this.held.push({ raw: tail, done: false, json: null });
      this.enqueueText(controller, await this.settle());
    } else {
      this.enqueueText(controller, tail);
    }
    if (!this.cancelled) controller.close();
  }

  private consumeDecoded(decoded: string): string {
    this.pending += decoded;
    const { events, rest } = takeEvents(this.pending);
    this.pending = rest;
    let out = "";
    for (const raw of events) out += this.consume(raw);
    if (this.mode === "scan" && this.pending.length > MAX_UNTERMINATED_EVENT_CHARS) {
      this.mode = "passthrough";
    }
    if (this.mode === "passthrough" && this.pending.length > 0) {
      out += this.pending;
      this.pending = "";
    }
    return out;
  }

  /** Returns true when this pull produced output or ended the stream. */
  private async handleChunk(
    controller: ReadableStreamDefaultController<Uint8Array>,
    value: Uint8Array
  ): Promise<boolean> {
    const decoded = this.decoder.decode(value, { stream: true });
    if (this.mode === "passthrough") {
      this.enqueueText(controller, decoded);
      return decoded.length > 0;
    }
    const out = this.consumeDecoded(decoded);
    if (this.mode === "held" && this.sawDone) {
      await this.releaseUpstream();
      this.enqueueText(controller, await this.settle());
      if (!this.cancelled) controller.close();
      return true;
    }
    this.enqueueText(controller, out);
    return out.length > 0;
  }

  private async pull(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
    for (;;) {
      const result = await this.readUpstream(controller);
      if (result === null) return;
      if (result.done) {
        await this.finishUpstream(controller);
        return;
      }
      if (await this.handleChunk(controller, result.value)) return;
    }
  }

  private async cancel(reason: unknown): Promise<void> {
    this.cancelled = true;
    this.extension?.abort(reason);
    try {
      await this.extensionReader?.cancel(reason);
    } catch {
      // already closed
    }
    await this.releaseUpstream(reason);
  }
}

export function wrapLengthContinuation(
  stream: ReadableStream<Uint8Array>,
  body: Readonly<Record<string, unknown>>,
  options: LengthContinuationOptions
): ReadableStream<Uint8Array> {
  return new LengthContinuationRelay(stream, body, options).toStream();
}

// ── Wiring helper for the provider executor ──────────────────────────────────

type LengthContinuationLog =
  { info?: (...args: unknown[]) => void; warn?: (...args: unknown[]) => void } | null | undefined;

/**
 * Wrap `stream` when the flag is on, the upstream speaks Chat Completions, and the request is
 * eligible; otherwise return it untouched (same object, so frames stay byte for byte equal).
 */
export function maybeWrapLengthContinuation(args: {
  stream: ReadableStream<Uint8Array>;
  targetFormat: string;
  clientBody: unknown;
  upstreamBody: unknown;
  signal: AbortSignal;
  reopen: LengthContinuationOptions["reopen"];
  log?: LengthContinuationLog;
}): ReadableStream<Uint8Array> {
  const { stream, targetFormat, clientBody, upstreamBody, signal, reopen, log } = args;
  if (targetFormat !== "openai") return stream;
  if (!isLengthContinuationEnabled()) return stream;
  if (!isLengthContinuationRequestEligible(clientBody, upstreamBody)) return stream;
  return wrapLengthContinuation(stream, upstreamBody as Record<string, unknown>, {
    signal,
    continuationTimeoutMs: LENGTH_CONTINUATION_LIMITS.continuationTimeoutMs,
    maxExtraOutputTokens: LENGTH_CONTINUATION_LIMITS.maxExtraOutputTokens,
    maxBufferedBytes: LENGTH_CONTINUATION_LIMITS.maxBufferedBytes,
    clientOutputLimit: explicitClientOutputLimit(clientBody),
    reopen,
    onExecution: (execution) =>
      log?.info?.(
        "STREAM_LENGTH_CONTINUATION",
        `execution phase=${execution.phase} finish=${execution.finishReason ?? "none"} completionTokens=${String(execution.usage?.completion_tokens ?? "unknown")} promptTokens=${String(execution.usage?.prompt_tokens ?? "unknown")}`
      ),
    onOutcome: (outcome) =>
      log?.info?.(
        "STREAM_LENGTH_CONTINUATION",
        `outcome=${outcome.outcome}${"reason" in outcome ? ` reason=${outcome.reason}` : ""}${"suffixChars" in outcome ? ` suffixChars=${outcome.suffixChars}` : ""}`
      ),
  });
}
