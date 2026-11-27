/**
 * Resume a combo stream at the next target after a cut.
 *
 * A combo commits a streaming target as soon as it has produced output, so a cut that comes
 * later reaches the client as a failure. This wrapper keeps the combo in charge of that cut for
 * the opt-in case (single-choice Chat Completions, sequential combo, plain-text history).
 *
 * What it does with the response body of the target the combo committed:
 *   - every complete event is forwarded unchanged, byte for byte, as soon as it is read; the
 *     text and plain reasoning those events carry are collected as a checkpoint;
 *   - the first sign of a cut (the gateway's `stream_error` frame, a transport error, or a body
 *     that ends without a terminal) is held back instead of forwarded;
 *   - `openNext` is asked once for a replacement stream built from the checkpoint; the whole
 *     replacement is read within its byte and time limits and checked before a single byte of
 *     it reaches the client: known terminal, no tool call, a single choice, and, when answer
 *     text had already been delivered, the exact anchor echoed at its start;
 *   - on success the client receives the words after the anchor in the identity of the stream
 *     it was already reading, then one terminal chunk, the usage trailer if the replacement
 *     reported one, and a single `[DONE]`; the held failure is dropped;
 *   - on any failure the held frames are released as they were, so the client keeps the prefix
 *     and receives the original, already sanitized failure.
 *
 * It never sees a stream that finished normally, one that carried a tool call, a refusal, several
 * choices or any frame it does not recognize: from that point the stream is forwarded untouched.
 * A client disconnect aborts the replacement and releases every reader exactly once.
 */
import { sanitizeErrorMessage } from "../../utils/error.ts";
import { inheritEmptyTurnPolicy } from "../../utils/emptyTurnPolicy.ts";
import { inheritNoReplayResponse } from "../../utils/noReplayResponse.ts";
import { COMBO_PER_MODEL_TIMEOUT_REASON } from "./comboAbortReasons.ts";
import { isEventStreamResponse } from "./firstOutputStream.ts";
import { classifyPreContentReadFailure } from "./preContentTransportFailure.ts";
import {
  ChatCheckpointCollector,
  anchorOf,
  checkpointHasAnswerText,
  type ReasoningCheckpoint,
} from "./reasoningCheckpoint.ts";
import {
  MAX_EVENT_BYTES,
  SseEventBuffer,
  buildSuffixFrames,
  classifyChatFrame,
  eventPayload,
  type ChatFrame,
  type JsonRecord,
  type StreamIdentity,
} from "./streamCheckpointFrames.ts";

/** Asks the combo for the replacement stream; null when no target can take over. */
export type OpenNextComboStream = (
  checkpoint: ReasoningCheckpoint,
  signal: AbortSignal
) => Promise<Response | null>;

export type StreamResumeRefusal =
  | "no-checkpoint"
  | "truncated"
  | "aborted"
  | "timeout"
  | "no-target"
  | "open-failed"
  | "replacement-status"
  | "replacement-unsupported"
  | "replacement-too-large"
  | "replacement-read-failed"
  | "replacement-no-terminal"
  | "anchor-mismatch"
  | "no-useful-suffix";

/** What became of a cut, for the combo's accounting and log. Sizes and names, never text. */
export type StreamResumeOutcome =
  | { kind: "resumed"; suffixChars: number; checkpointChars: number }
  | { kind: "refused"; reason: StreamResumeRefusal; detail?: string };

export type ComboStreamCheckpointOptions = Readonly<{
  /** The client's own signal: its abort cancels the wrapped stream and the replacement. */
  signal: AbortSignal;
  /** Time, from the cut, the whole replacement (opening and reading) may take. */
  resumeTimeoutMs: number;
  /** Most bytes of text and reasoning kept as the checkpoint. */
  maxCheckpointBytes: number;
  /** Most bytes accepted from the replacement stream. */
  maxReplacementBytes: number;
  openNext: OpenNextComboStream;
  /** Called once, when a cut was handled (either way). */
  onOutcome?: (outcome: StreamResumeOutcome) => void;
}>;

// ─── The seam ──────────────────────────────────────────────────────────────────

function commonPrefixLength(a: string, b: string): number {
  const max = Math.min(a.length, b.length);
  let i = 0;
  while (i < max && a.charCodeAt(i) === b.charCodeAt(i)) i++;
  return i;
}

/**
 * The words of `replacement` that continue `delivered`, or null when the seam cannot be
 * verified. With delivered answer text the replacement must begin with the exact anchor (the
 * end of the text, no Unicode or whitespace normalization); the echo is removed once. White
 * space the client already has after the anchor is not repeated. With no delivered text the
 * replacement is a whole answer.
 */
export function stitchSuffix(delivered: string, replacement: string): string | null {
  let suffix = replacement;
  if (delivered.trim().length > 0) {
    const anchor = anchorOf(delivered);
    if (!replacement.startsWith(anchor)) return null;
    const rest = replacement.slice(anchor.length);
    const gap = delivered.slice(delivered.trimEnd().length);
    suffix = rest.slice(commonPrefixLength(rest, gap));
  }
  return suffix.trim().length > 0 ? suffix : null;
}

// ─── Reading the replacement ───────────────────────────────────────────────────

type Replacement = Readonly<{
  text: string;
  finishReason: string;
  usage: JsonRecord | null;
  identity: StreamIdentity | null;
}>;

type ReplacementResult =
  { kind: "read"; replacement: Replacement } | { kind: "refused"; reason: StreamResumeRefusal };

/** Accumulates the replacement's single choice; `unsupported` once a frame cannot be followed. */
class ReplacementFold {
  text = "";
  finishReason: string | null = null;
  usage: JsonRecord | null = null;
  identity: StreamIdentity | null = null;
  unsupported = false;

  add(event: Uint8Array): void {
    const frame = classifyChatFrame(eventPayload(event));
    switch (frame.kind) {
      case "delta":
        this.text += frame.content;
        this.finishReason = frame.finishReason ?? this.finishReason;
        this.usage = frame.usage ?? this.usage;
        this.identity ??= frame.identity;
        return;
      case "usage":
        this.usage = frame.usage;
        this.identity ??= frame.identity;
        return;
      case "cut":
      case "unsupported":
        this.unsupported = true;
        return;
      default:
        return;
    }
  }

  result(): ReplacementResult {
    if (this.unsupported) return { kind: "refused", reason: "replacement-unsupported" };
    const finish = this.finishReason;
    if (finish !== "stop" && finish !== "length") {
      return { kind: "refused", reason: "replacement-no-terminal" };
    }
    return {
      kind: "read",
      replacement: {
        text: this.text,
        finishReason: finish,
        usage: this.usage,
        identity: this.identity,
      },
    };
  }
}

/**
 * Read the whole replacement under `signal`, within `maxBytes`. The body is cancelled at most
 * once and only when it was not read to its end.
 */
async function readReplacement(
  response: Response,
  signal: AbortSignal,
  maxBytes: number
): Promise<ReplacementResult> {
  const body = response.body;
  if (!response.ok || !body || !isEventStreamResponse(response)) {
    void body?.cancel().catch(() => undefined);
    return { kind: "refused", reason: "replacement-status" };
  }
  const reader = body.getReader();
  let released = false;
  const release = (reason?: unknown) => {
    if (released) return;
    released = true;
    void reader.cancel(reason).catch(() => undefined);
  };
  const onAbort = () => release(signal.reason);
  signal.addEventListener("abort", onAbort, { once: true });
  const buffer = new SseEventBuffer();
  const fold = new ReplacementFold();
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) {
        released = true;
        break;
      }
      total += value.byteLength;
      if (total > maxBytes) {
        release();
        return { kind: "refused", reason: "replacement-too-large" };
      }
      for (const event of buffer.push(value)) fold.add(event);
      if (fold.unsupported) {
        release();
        break;
      }
    }
    const rest = buffer.drain();
    if (rest.byteLength > 0) fold.add(rest);
    return fold.result();
  } catch {
    release();
    return { kind: "refused", reason: signal.aborted ? "aborted" : "replacement-read-failed" };
  } finally {
    signal.removeEventListener("abort", onAbort);
  }
}

// ─── The wrapped stream ────────────────────────────────────────────────────────

type Phase = "streaming" | "held" | "passthrough";

type Controller = ReadableStreamDefaultController<Uint8Array>;

const ABORTED = Symbol("aborted");

class CheckpointStream {
  private readonly reader: ReadableStreamDefaultReader<Uint8Array>;
  private readonly splitter = new SseEventBuffer();
  private readonly collector: ChatCheckpointCollector;
  private readonly master = new AbortController();
  private readonly onClientAbort = () => this.abort(this.options.signal.reason);
  private phase: Phase = "streaming";
  private held: Uint8Array[] = [];
  private heldBytes = 0;
  private identity: StreamIdentity | null = null;
  private controller: Controller | null = null;
  private finished = false;
  private cancelled = false;
  private sourceSettled = false;
  private enqueued = false;

  constructor(
    source: ReadableStream<Uint8Array>,
    private readonly options: ComboStreamCheckpointOptions
  ) {
    this.reader = source.getReader();
    this.collector = new ChatCheckpointCollector(options.maxCheckpointBytes);
    if (options.signal.aborted) this.abort(options.signal.reason);
    else options.signal.addEventListener("abort", this.onClientAbort, { once: true });
  }

  /** The consumer cancelled the wrapped stream: it is already closed, there is nothing to end. */
  cancel(reason: unknown): void {
    this.finished = true;
    this.abort(reason);
  }

  /** Client gone or stream cancelled: stop the replacement, release the source once. */
  private abort(reason: unknown): void {
    if (this.cancelled) return;
    this.cancelled = true;
    this.master.abort(reason);
    this.detach();
    if (!this.sourceSettled) {
      this.sourceSettled = true;
      void this.reader.cancel(reason).catch(() => undefined);
    }
    // A client signal can fire while a read of the wrapped stream is pending: end it.
    if (this.controller) this.finish(this.controller);
  }

  private detach(): void {
    this.options.signal.removeEventListener("abort", this.onClientAbort);
  }

  async pull(controller: Controller): Promise<void> {
    this.controller = controller;
    this.enqueued = false;
    if (this.cancelled) this.finish(controller);
    while (!this.finished && !this.cancelled && !this.enqueued) {
      await this.step(controller);
    }
  }

  private async step(controller: Controller): Promise<void> {
    let chunk: Uint8Array | null;
    try {
      const read = await this.reader.read();
      if (this.cancelled) return;
      chunk = read.done ? null : read.value;
    } catch (error) {
      if (this.cancelled) return;
      await this.onSourceEnd(controller, error);
      return;
    }
    if (chunk === null) await this.onSourceEnd(controller, undefined);
    else this.onChunk(controller, chunk);
  }

  // ── forwarding ──

  private emit(controller: Controller, bytes: Uint8Array): void {
    if (this.finished || this.cancelled || bytes.byteLength === 0) return;
    controller.enqueue(bytes);
    this.enqueued = true;
  }

  private finish(controller: Controller, error?: unknown): void {
    if (this.finished) return;
    this.finished = true;
    this.detach();
    // The consumer may have cancelled between the last read and here; closing then throws.
    try {
      if (error === undefined || this.cancelled) controller.close();
      else controller.error(error);
    } catch {
      return;
    }
  }

  private flushHeld(controller: Controller): void {
    const frames = this.held;
    this.held = [];
    this.heldBytes = 0;
    for (const frame of frames) this.emit(controller, frame);
  }

  private hold(bytes: Uint8Array): void {
    this.held.push(bytes);
    this.heldBytes += bytes.byteLength;
  }

  private passthrough(controller: Controller): void {
    this.phase = "passthrough";
    this.flushHeld(controller);
  }

  // ── reading ──

  private onChunk(controller: Controller, chunk: Uint8Array): void {
    if (this.phase === "passthrough") {
      this.emit(controller, chunk);
      return;
    }
    for (const event of this.splitter.push(chunk)) this.onEvent(controller, event);
    if (!this.isPassthrough() && this.splitter.pendingBytes > MAX_EVENT_BYTES) {
      this.passthrough(controller);
    }
    // Whatever follows an unrecognized frame bypasses the splitter, so its tail goes first.
    if (this.isPassthrough()) this.emit(controller, this.splitter.drain());
  }

  /** A method, not a field read: `onEvent` changes the phase and narrowing cannot see that. */
  private isPassthrough(): boolean {
    return this.phase === "passthrough";
  }

  private onEvent(controller: Controller, event: Uint8Array): void {
    if (this.phase === "passthrough") {
      this.emit(controller, event);
      return;
    }
    const frame = classifyChatFrame(eventPayload(event));
    if (this.phase === "held") {
      this.onHeldEvent(controller, event, frame.kind);
      return;
    }
    switch (frame.kind) {
      case "delta":
        this.identity ??= frame.identity;
        this.collector.addDelta(frame.delta);
        this.collector.addText(frame.content);
        this.emit(controller, event);
        if (frame.finishReason !== null) this.phase = "passthrough";
        return;
      case "cut":
        this.phase = "held";
        this.hold(event);
        return;
      case "done":
      case "unsupported":
        this.phase = "passthrough";
        this.emit(controller, event);
        return;
      default:
        this.emit(controller, event);
    }
  }

  /** After a cut frame only the rest of the failure (a `[DONE]`, a ping) may follow. */
  private onHeldEvent(controller: Controller, event: Uint8Array, kind: ChatFrame["kind"]): void {
    const failureTail = kind === "cut" || kind === "done" || kind === "ignore" || kind === "usage";
    if (failureTail && this.heldBytes + event.byteLength <= MAX_EVENT_BYTES) {
      this.hold(event);
      return;
    }
    this.passthrough(controller);
    this.emit(controller, event);
  }

  // ── the end of the source ──

  private async onSourceEnd(controller: Controller, error: unknown): Promise<void> {
    this.sourceSettled = true;
    const rest = this.splitter.drain();
    if (this.phase === "passthrough") {
      this.emit(controller, rest);
      this.finish(controller, error);
      return;
    }
    if (rest.byteLength > 0) this.hold(rest);
    if (error !== undefined && !this.isTransportCut(error)) {
      this.flushHeld(controller);
      this.finish(controller, error);
      return;
    }
    const outcome = await this.resume(controller);
    this.options.onOutcome?.(outcome);
    if (outcome.kind === "resumed") {
      this.finish(controller);
      return;
    }
    if (this.cancelled) return;
    this.flushHeld(controller);
    this.finish(controller, error);
  }

  private isTransportCut(error: unknown): boolean {
    return classifyPreContentReadFailure(error)?.kind === "transport";
  }

  // ── the resumption ──

  private refusal(checkpoint: ReasoningCheckpoint | null): StreamResumeRefusal | null {
    if (this.cancelled) return "aborted";
    if (!checkpoint) return "no-checkpoint";
    return checkpoint.truncated ? "truncated" : null;
  }

  private async resume(controller: Controller): Promise<StreamResumeOutcome> {
    const checkpoint = this.collector.snapshot();
    const refused = this.refusal(checkpoint);
    if (refused || !checkpoint) return { kind: "refused", reason: refused ?? "no-checkpoint" };

    const attempt = new AbortController();
    const timeout = new Error(COMBO_PER_MODEL_TIMEOUT_REASON);
    const timer = setTimeout(() => attempt.abort(timeout), this.options.resumeTimeoutMs);
    const onMaster = () => attempt.abort(this.master.signal.reason);
    this.master.signal.addEventListener("abort", onMaster, { once: true });
    try {
      return await this.runReplacement(controller, checkpoint, attempt.signal);
    } finally {
      clearTimeout(timer);
      this.master.signal.removeEventListener("abort", onMaster);
    }
  }

  private async runReplacement(
    controller: Controller,
    checkpoint: ReasoningCheckpoint,
    signal: AbortSignal
  ): Promise<StreamResumeOutcome> {
    const stopped = (): StreamResumeRefusal => (this.cancelled ? "aborted" : "timeout");
    const opened = await this.open(checkpoint, signal);
    if (opened.kind === "failed") return opened.outcome;
    if (!opened.response) return { kind: "refused", reason: "no-target" };
    if (signal.aborted) {
      void opened.response.body?.cancel().catch(() => undefined);
      return { kind: "refused", reason: stopped() };
    }
    const read = await readReplacement(opened.response, signal, this.options.maxReplacementBytes);
    if (signal.aborted) return { kind: "refused", reason: stopped() };
    if (read.kind === "refused") return { kind: "refused", reason: read.reason };
    const suffix = stitchSuffix(checkpoint.text, read.replacement.text);
    if (suffix === null) {
      const anchored = checkpointHasAnswerText(checkpoint);
      return { kind: "refused", reason: anchored ? "anchor-mismatch" : "no-useful-suffix" };
    }
    this.phase = "passthrough";
    this.held = [];
    this.heldBytes = 0;
    for (const frame of buildSuffixFrames({
      suffix,
      finishReason: read.replacement.finishReason,
      identity: this.identity ?? read.replacement.identity,
      usage: read.replacement.usage,
    })) {
      this.emit(controller, frame);
    }
    return { kind: "resumed", suffixChars: suffix.length, checkpointChars: checkpoint.text.length };
  }

  /** Ask `openNext`, giving up the moment the attempt is aborted; a late response is cancelled. */
  private async open(
    checkpoint: ReasoningCheckpoint,
    signal: AbortSignal
  ): Promise<
    { kind: "opened"; response: Response | null } | { kind: "failed"; outcome: StreamResumeOutcome }
  > {
    let failure: StreamResumeOutcome | null = null;
    const pending = this.options.openNext(checkpoint, signal).catch((error: unknown) => {
      failure = {
        kind: "refused",
        reason: "open-failed",
        detail: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
      };
      return null;
    });
    let onAbort: (() => void) | undefined;
    const aborted = new Promise<typeof ABORTED>((resolve) => {
      onAbort = () => resolve(ABORTED);
      if (signal.aborted) resolve(ABORTED);
      else signal.addEventListener("abort", onAbort, { once: true });
    });
    const settled = await Promise.race([pending, aborted]);
    if (onAbort) signal.removeEventListener("abort", onAbort);
    if (settled === ABORTED) {
      void pending.then((late) => late?.body?.cancel().catch(() => undefined));
      const reason = this.cancelled ? "aborted" : "timeout";
      return { kind: "failed", outcome: { kind: "refused", reason } };
    }
    if (failure) return { kind: "failed", outcome: failure };
    return { kind: "opened", response: settled };
  }
}

/**
 * Wrap a committed streaming response so a cut can be resumed at the next target.
 *
 * Returns `response` itself when there is no body to wrap. The wrapper keeps the status and
 * headers and the response policies the combo reads from the object (empty-turn, no-replay).
 */
export function wrapComboStreamWithCheckpoint(
  response: Response,
  options: ComboStreamCheckpointOptions
): Response {
  const source = response.body;
  if (!source || !response.ok) return response;
  const wrapped = new CheckpointStream(source, options);
  const stream = new ReadableStream<Uint8Array>({
    pull: (controller) => wrapped.pull(controller),
    cancel: (reason) => wrapped.cancel(reason),
  });
  const next = new Response(stream, {
    status: response.status,
    statusText: response.statusText,
    headers: new Headers(response.headers),
  });
  return inheritNoReplayResponse(response, inheritEmptyTurnPolicy(response, next));
}
