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

function foldEvent(fold: Fold, json: JsonRecord): void {
  if (isRecord(json.usage)) fold.usage = json.usage;
  if (!Array.isArray(json.choices)) return;
  for (const choice of json.choices) {
    if (!isRecord(choice)) continue;
    if (typeof choice.index === "number" && choice.index !== 0) {
      fold.multiChoice = true;
      continue;
    }
    const delta = isRecord(choice.delta) ? choice.delta : null;
    if (delta) {
      if (typeof delta.content === "string") fold.text += delta.content;
      if (Array.isArray(delta.tool_calls) && delta.tool_calls.length > 0) fold.tool = true;
      if (delta.function_call !== undefined && delta.function_call !== null) fold.tool = true;
      if (typeof delta.refusal === "string" && delta.refusal.length > 0) fold.refusal = true;
    }
    if (typeof choice.finish_reason === "string") fold.finishReason = choice.finish_reason;
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

// ── The wrapper ──────────────────────────────────────────────────────────────

type ExtensionResult =
  | {
      kind: "ok";
      suffix: string;
      finishReason: string;
      usage: JsonRecord | null;
      done: boolean;
    }
  | { kind: "fail"; reason: LengthContinuationFailure; usage: JsonRecord | null };

export function wrapLengthContinuation(
  stream: ReadableStream<Uint8Array>,
  body: Readonly<Record<string, unknown>>,
  options: LengthContinuationOptions
): ReadableStream<Uint8Array> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const fold = newFold();

  let mode: "scan" | "held" | "passthrough" = "scan";
  let pending = "";
  let held: ParsedEvent[] = [];
  let heldBytes = 0;
  let lengthEvent: ParsedEvent | null = null;
  let sawDone = false;
  let cancelled = false;
  let upstreamReleased = false;
  let extension: AbortController | null = null;
  let extensionReader: ReadableStreamDefaultReader<Uint8Array> | null = null;

  const releaseUpstream = async (reason?: unknown): Promise<void> => {
    if (upstreamReleased) return;
    upstreamReleased = true;
    try {
      await reader.cancel(reason);
    } catch {
      // already closed
    }
  };

  const report = (outcome: LengthContinuationOutcome): void => options.onOutcome?.(outcome);

  const heldVerbatim = (): string => held.map((event) => event.raw).join("");

  /** Held frames as they came, with the usage of a rejected extension folded in. */
  const heldWithUsage = (extra: JsonRecord | null): string => {
    if (!extra || !fold.usage) return heldVerbatim();
    const combined = sumUsage(fold.usage, extra);
    return held
      .map((event) =>
        event.json && isRecord(event.json.usage)
          ? encodeEvent({ ...event.json, usage: combined })
          : event.raw
      )
      .join("");
  };

  const mayContinue = (): boolean =>
    fold.text.length > 0 && !fold.tool && !fold.refusal && !fold.multiChoice;

  /** Consume one complete event; returns the text to send to the client right now. */
  const consume = (raw: string): string => {
    if (mode === "passthrough") return raw;
    const event = parseEvent(raw);
    if (mode === "held") {
      held.push(event);
      heldBytes += encoder.encode(raw).length;
      if (event.done) sawDone = true;
      if (event.json && isRecord(event.json.usage)) fold.usage = event.json.usage;
      if (heldBytes > options.maxBufferedBytes) {
        mode = "passthrough";
        report({ outcome: "fallback", reason: "retention-cap" });
        const out = heldVerbatim();
        held = [];
        return out;
      }
      return "";
    }
    if (event.json) foldEvent(fold, event.json);
    const reason = firstChoice(event.json)?.finish_reason;
    if (reason === "length" && mayContinue()) {
      mode = "held";
      lengthEvent = event;
      held = [event];
      heldBytes = encoder.encode(raw).length;
      if (heldBytes > options.maxBufferedBytes) {
        mode = "passthrough";
        report({ outcome: "fallback", reason: "retention-cap" });
        held = [];
        return raw;
      }
      return "";
    }
    if (typeof reason === "string") mode = "passthrough";
    return raw;
  };

  const drainExtension = async (
    source: ReadableStream<Uint8Array>,
    signal: AbortSignal
  ): Promise<{ failure: LengthContinuationFailure | null; raw: string }> => {
    const extReader = source.getReader();
    extensionReader = extReader;
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
        if (bytes > options.maxBufferedBytes) return { failure: "overflow", raw };
        raw += extDecoder.decode(result.value, { stream: true });
        if (/data:\s*\[DONE\]/.test(raw)) return { failure: null, raw };
      }
    } finally {
      extensionReader = null;
      await extReader.cancel().catch(() => {});
    }
  };

  const validateExtension = (raw: string, delivered: string): ExtensionResult => {
    const extFold = newFold();
    let done = false;
    const { events, rest } = takeEvents(raw.endsWith("\n") ? raw : `${raw}\n\n`);
    for (const chunk of [...events, rest]) {
      if (!chunk) continue;
      const parsed = parseEvent(chunk);
      if (parsed.done) done = true;
      if (parsed.json) foldEvent(extFold, parsed.json);
    }
    const fail = (reason: LengthContinuationFailure): ExtensionResult => ({
      kind: "fail",
      reason,
      usage: extFold.usage,
    });
    if (extFold.multiChoice || extFold.tool || extFold.refusal) return fail("unsafe-content");
    if (extFold.text.length === 0) return fail("empty");
    if (extFold.finishReason === null) return fail("no-terminal");
    if (extFold.finishReason === "tool_calls" || extFold.finishReason === "function_call")
      return fail("unsafe-content");
    const suffix = trimContinuationOverlap(delivered, extFold.text);
    const overlap = extFold.text.length - suffix.length;
    if (overlap < Math.min(STREAM_RECOVERY.MIN_CONTINUATION_OVERLAP_CHARS, delivered.length))
      return fail("uncertain-seam");
    if (suffix.length === 0) return fail("no-suffix");
    return { kind: "ok", suffix, finishReason: extFold.finishReason, usage: extFold.usage, done };
  };

  const runExtension = async (
    continuationBody: Record<string, unknown>,
    delivered: string
  ): Promise<ExtensionResult> => {
    const controller = new AbortController();
    extension = controller;
    const onClientAbort = () => controller.abort(options.signal.reason);
    if (options.signal.aborted) controller.abort(options.signal.reason);
    else options.signal.addEventListener("abort", onClientAbort, { once: true });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, options.continuationTimeoutMs);
    const failure = (reason: LengthContinuationFailure): ExtensionResult => ({
      kind: "fail",
      reason: timedOut ? "timeout" : reason,
      usage: null,
    });
    try {
      let source: ReadableStream<Uint8Array> | null | typeof ABORTED;
      try {
        source = await raceAbort(
          options.reopen(continuationBody, controller.signal),
          controller.signal,
          (late) => void late?.cancel().catch(() => {})
        );
      } catch {
        return failure("no-stream");
      }
      if (source === ABORTED) return failure("aborted");
      if (!source) return failure("no-stream");
      const drained = await drainExtension(source, controller.signal);
      if (drained.failure) {
        // Whatever the attempt already reported is still billed; surface it for accounting.
        const partial = validateExtension(drained.raw, delivered);
        const usage = partial.usage;
        options.onExecution?.({ phase: "continuation", finishReason: null, usage });
        return { kind: "fail", reason: timedOut ? "timeout" : drained.failure, usage };
      }
      const result = validateExtension(drained.raw, delivered);
      options.onExecution?.({
        phase: "continuation",
        finishReason: result.kind === "ok" ? result.finishReason : null,
        usage: result.usage,
      });
      return result;
    } catch {
      return failure("error");
    } finally {
      clearTimeout(timer);
      options.signal.removeEventListener("abort", onClientAbort);
      extension = null;
    }
  };

  const buildContinuationBody = (cap: number): Record<string, unknown> | null => {
    const prefilled = makeContinuationBody(body as Record<string, unknown>, fold.text);
    if (!prefilled || !Array.isArray((prefilled as { messages?: unknown }).messages)) return null;
    const next: Record<string, unknown> = { ...prefilled, stream: true };
    const keys = ["max_tokens", "max_completion_tokens"].filter((key) => key in next);
    for (const key of keys.length > 0 ? keys : ["max_tokens"]) next[key] = cap;
    return next;
  };

  /** Decide, run the extension, and return everything the client still has to receive. */
  const settle = async (): Promise<string> => {
    const lengthJson = lengthEvent?.json ?? null;
    const delivered = fold.text;
    let cap = options.maxExtraOutputTokens;
    if (options.clientOutputLimit !== null) {
      const used = fold.usage?.completion_tokens;
      const remaining =
        typeof used === "number" && Number.isFinite(used) ? options.clientOutputLimit - used : 0;
      if (remaining <= 0) {
        report({ outcome: "skipped", reason: "client-limit" });
        return heldVerbatim();
      }
      cap = Math.min(cap, remaining);
    }
    const continuationBody = buildContinuationBody(cap);
    if (!continuationBody || !lengthJson) {
      report({ outcome: "skipped", reason: "not-continuable" });
      return heldVerbatim();
    }
    options.onExecution?.({ phase: "initial", finishReason: "length", usage: fold.usage });
    const result = await runExtension(continuationBody, delivered);
    if (result.kind === "fail") {
      report({ outcome: "fallback", reason: result.reason });
      return heldWithUsage(result.usage);
    }

    const identity: JsonRecord = { ...lengthJson };
    delete identity.choices;
    delete identity.usage;
    const usageInline = isRecord(lengthJson.usage);
    const combined = fold.usage && result.usage ? sumUsage(fold.usage, result.usage) : null;
    const delta = firstChoice(lengthJson)?.delta;
    let out = "";
    if (isRecord(delta) && Object.keys(delta).length > 0) {
      out += encodeEvent({ ...identity, choices: [{ index: 0, delta }] });
    }
    out += encodeEvent({
      ...identity,
      choices: [{ index: 0, delta: { content: result.suffix } }],
    });
    out += encodeEvent({
      ...identity,
      choices: [{ index: 0, delta: {}, finish_reason: result.finishReason }],
      ...(usageInline && combined ? { usage: combined } : {}),
    });
    if (!usageInline && combined) out += encodeEvent({ ...identity, choices: [], usage: combined });
    if (sawDone || result.done) out += "data: [DONE]\n\n";
    report({ outcome: "continued", suffixChars: result.suffix.length });
    return out;
  };

  const enqueueText = (controller: ReadableStreamDefaultController<Uint8Array>, text: string) => {
    if (cancelled || text.length === 0) return;
    controller.enqueue(encoder.encode(text));
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      for (;;) {
        let result: ReadableStreamReadResult<Uint8Array>;
        try {
          result = await reader.read();
        } catch (error) {
          if (cancelled) return;
          upstreamReleased = true;
          if (mode === "held") enqueueText(controller, heldVerbatim());
          controller.error(error);
          return;
        }
        if (cancelled) return;

        if (result.done) {
          upstreamReleased = true;
          const tail = pending + decoder.decode();
          pending = "";
          if (mode === "held") {
            if (tail) held.push({ raw: tail, done: false, json: null });
            enqueueText(controller, await settle());
          } else {
            enqueueText(controller, tail);
          }
          if (!cancelled) controller.close();
          return;
        }

        const decoded = decoder.decode(result.value, { stream: true });
        if (mode === "passthrough") {
          if (decoded.length === 0) continue;
          enqueueText(controller, decoded);
          return;
        }

        pending += decoded;
        const { events, rest } = takeEvents(pending);
        pending = rest;
        let out = "";
        for (const raw of events) out += consume(raw);
        if (mode === "scan" && pending.length > MAX_UNTERMINATED_EVENT_CHARS) {
          mode = "passthrough";
        }
        if (mode === "passthrough" && pending.length > 0) {
          out += pending;
          pending = "";
        }

        if (mode === "held" && sawDone) {
          await releaseUpstream();
          enqueueText(controller, await settle());
          if (!cancelled) controller.close();
          return;
        }
        if (out.length > 0) {
          enqueueText(controller, out);
          return;
        }
      }
    },

    async cancel(reason) {
      cancelled = true;
      extension?.abort(reason);
      try {
        await extensionReader?.cancel(reason);
      } catch {
        // already closed
      }
      await releaseUpstream(reason);
    },
  });
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
