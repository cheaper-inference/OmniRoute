/**
 * Reasoning holdback for a streaming combo target.
 *
 * The first-output gate (`firstOutputStream.ts`) lets a stream through the moment it carries
 * reasoning, because reasoning is output a user can see. For a combo that opts in, that is too
 * early: a target that reasons for a while and is then cut has already committed the stream, so
 * the combo can neither fail over cleanly nor hand the draft to the next target. This module
 * holds the target back until the first thing that is not reasoning: an answer token, a tool
 * call, a refusal, a finish reason or an error the existing policy owns.
 *
 * Mechanics: like the first-output gate it reads a clone of the response, never the response
 * itself. The caller keeps the original object (and every WeakMap marker keyed by it) with an
 * unlocked body, and the tee that backs the clone keeps the held bytes for it, so on commit the
 * original delivers them once, in order, followed by the rest of the stream. One reader on the
 * clone does all the reading, SSE framing is the existing `SseOutputScanner`, and the bytes held
 * are capped, so a runaway reasoner cannot grow the buffer: the cap is checked after every chunk
 * and the attempt is released on overflow.
 *
 * Scope is single-choice Chat Completions. Any frame this module does not recognise ends the hold
 * at once and leaves the stream to the existing handling, which is also what happens when the
 * body closes or fails without any reasoning having been seen.
 */
import {
  COMBO_HEDGE_CANCELLED_REASON,
  COMBO_PER_MODEL_TIMEOUT_REASON,
} from "./comboAbortReasons.ts";
import { SseOutputScanner } from "./firstOutputStream.ts";
import {
  classifyPreContentReadFailure,
  createTransportReplayObserver,
} from "./preContentTransportFailure.ts";
import {
  ChatCheckpointCollector,
  attachReasoningCheckpoint,
  markReasoningHoldbackCut,
  type ReasoningCheckpoint,
} from "./reasoningCheckpoint.ts";

export type ReasoningHoldbackFallbackReason = "overflow" | "cut" | "deadline";

export type ReasoningHoldbackResult =
  /** The target answered (or the stream is not ours to judge): carry on with `response`. */
  | { kind: "commit"; response: Response }
  /**
   * The target is abandoned. `response` is the failed attempt to hand to the combo; the held
   * body has already been released. `checkpoint` is the draft worth forwarding, or null.
   */
  | {
      kind: "fallback";
      response: Response;
      reason: ReasoningHoldbackFallbackReason;
      checkpoint: ReasoningCheckpoint | null;
    }
  /** Something outside aborted the wait; no verdict on the target. */
  | { kind: "cancelled" };

export type ReasoningHoldbackOptions = Readonly<{
  /** Most bytes of the stream that may be held. */
  maxBytes: number;
  /** Wall-clock time (ms epoch) at which the target's remaining budget runs out. */
  deadlineAt: number;
  /** Aborted by a hedge winner or a client disconnect. */
  signal: AbortSignal;
  /** The failed attempt to return when the deadline ends the hold. */
  timeoutResponse: () => Response;
}>;

/** Longest delay `setTimeout` accepts. */
const MAX_TIMER_MS = 2 ** 31 - 1;

type JsonRecord = Record<string, unknown>;

type EventVerdict =
  | { kind: "ignore" }
  | { kind: "reasoning"; delta: JsonRecord }
  | { kind: "commit" }
  | { kind: "cut" };

/** `type`/`code` pairs the stream pipeline gives to a transport cut of an upstream stream. */
const RECOVERABLE_STREAM_ERROR_CODES = new Set([
  "stream_error",
  "stream_terminated",
  "stream_pipeline_error",
  "stream_content_stall",
]);

/** Delta keys that never carry an answer; any other populated key ends the hold. */
const HELD_DELTA_KEYS = new Set([
  "role",
  "content",
  "reasoning_content",
  "reasoning",
  "reasoning_details",
]);

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function isPopulated(value: unknown): boolean {
  if (value === null || value === undefined || value === false) return false;
  if (typeof value === "string") return value.length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/** Frames the gateway injects itself: a ping, or an `event: progress` tick. */
function isLifecycleFrame(parsed: JsonRecord): boolean {
  if (parsed.type === "ping") return true;
  const keys = Object.keys(parsed);
  return keys.length > 0 && keys.every((key) => key === "tokens_generated" || key === "elapsed_ms");
}

/** True for the error object of the frame the gateway writes when it cut an upstream stream. */
export function isRecoverableStreamErrorFrame(error: unknown): boolean {
  return (
    isRecord(error) &&
    error.type === "stream_error" &&
    typeof error.code === "string" &&
    RECOVERABLE_STREAM_ERROR_CODES.has(error.code)
  );
}

function errorFrameVerdict(error: unknown): EventVerdict {
  return { kind: isRecoverableStreamErrorFrame(error) ? "cut" : "commit" };
}

function deltaVerdict(delta: unknown): EventVerdict {
  if (!isRecord(delta)) return { kind: "commit" };
  if (isPopulated(delta.content)) return { kind: "commit" };
  for (const [key, value] of Object.entries(delta)) {
    if (!HELD_DELTA_KEYS.has(key) && isPopulated(value)) return { kind: "commit" };
  }
  const reasoning = isPopulated(delta.reasoning_content) || isPopulated(delta.reasoning);
  return reasoning || isPopulated(delta.reasoning_details)
    ? { kind: "reasoning", delta }
    : { kind: "ignore" };
}

/** What one assembled SSE event means for the hold. */
export function classifyHeldEvent(payload: string): EventVerdict {
  if (payload.trim() === "[DONE]") return { kind: "commit" };
  let parsed: unknown;
  try {
    parsed = JSON.parse(payload);
  } catch {
    return { kind: "commit" };
  }
  if (!isRecord(parsed)) return { kind: "commit" };
  if (isPopulated(parsed.error)) return errorFrameVerdict(parsed.error);
  if (isLifecycleFrame(parsed)) return { kind: "ignore" };
  if (!Array.isArray(parsed.choices)) return { kind: "commit" };
  if (parsed.choices.length === 0) return { kind: "ignore" };
  if (parsed.choices.length > 1) return { kind: "commit" };
  const choice = parsed.choices[0];
  if (!isRecord(choice)) return { kind: "commit" };
  if (choice.index !== undefined && choice.index !== 0) return { kind: "commit" };
  if (isPopulated(choice.finish_reason)) return { kind: "commit" };
  return deltaVerdict(choice.delta);
}

type Outcome =
  | { kind: "commit" }
  | { kind: "cancelled" }
  | { kind: "cut" }
  | { kind: "overflow" }
  | { kind: "deadline" };

/** What the scanner's event callback has concluded so far. */
type HoldState = { committed: boolean; cutFrame: boolean };

type HeldRead = {
  reader: ReadableStreamDefaultReader<Uint8Array>;
  scanner: SseOutputScanner;
  state: HoldState;
  collector: ChatCheckpointCollector;
  maxBytes: number;
  settled: () => boolean;
};

function createHeldScanner(
  response: Response,
  state: HoldState,
  collector: ChatCheckpointCollector
): SseOutputScanner {
  return new SseOutputScanner(createTransportReplayObserver(response), (payload) => {
    const verdict = classifyHeldEvent(payload);
    if (verdict.kind === "reasoning") collector.addDelta(verdict.delta);
    else if (verdict.kind === "commit") state.committed = true;
    else if (verdict.kind === "cut") state.cutFrame = true;
  });
}

function stateOutcome(state: HoldState): Outcome | null {
  if (state.committed) return { kind: "commit" };
  return state.cutFrame ? { kind: "cut" } : null;
}

/** The scanner reports the first output event and pauses; resume it until the chunk is drained. */
function feedScanner(scanner: SseOutputScanner, state: HoldState, text: string): void {
  let more = scanner.push(text);
  while (more && !stateOutcome(state)) more = scanner.push("");
}

/** The body closed. No reasoning seen means there is nothing of ours to judge. */
function endOfBodyOutcome(held: HeldRead): Outcome {
  held.scanner.flush();
  return stateOutcome(held.state) ?? { kind: held.collector.hasReasoning() ? "cut" : "commit" };
}

/** A read that failed: a transport cut after reasoning is ours, anything else is not. */
function readFailureOutcome(error: unknown, collector: ChatCheckpointCollector): Outcome {
  const failure = classifyPreContentReadFailure(error);
  if (failure?.kind === "abort") return { kind: "cancelled" };
  const ours = failure?.kind === "transport" && collector.hasReasoning();
  return { kind: ours ? "cut" : "commit" };
}

/** Read until a verdict; null when the wait was already settled from outside. */
async function readUntilVerdict(held: HeldRead): Promise<Outcome | null> {
  const decoder = new TextDecoder();
  let heldBytes = 0;
  try {
    for (;;) {
      const { done, value } = await held.reader.read();
      if (held.settled()) return null;
      if (done) return endOfBodyOutcome(held);
      if (!value) continue;
      heldBytes += value.byteLength;
      feedScanner(held.scanner, held.state, decoder.decode(value, { stream: true }));
      const verdict = stateOutcome(held.state);
      if (verdict) return verdict;
      if (heldBytes > held.maxBytes) return { kind: "overflow" };
    }
  } catch (error) {
    return held.settled() ? null : readFailureOutcome(error, held.collector);
  }
}

/** Resolve with whichever comes first: a verdict, the deadline, or an outside abort. */
function awaitOutcome(held: HeldRead, options: ReasoningHoldbackOptions): Promise<Outcome> {
  return new Promise<Outcome>((resolve) => {
    let settled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const onAbort = () => finish({ kind: "cancelled" });
    const finish = (value: Outcome) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      options.signal.removeEventListener("abort", onAbort);
      resolve(value);
    };
    if (options.signal.aborted) {
      finish({ kind: "cancelled" });
      return;
    }
    options.signal.addEventListener("abort", onAbort, { once: true });
    const remainingMs = Math.min(Math.max(0, options.deadlineAt - Date.now()), MAX_TIMER_MS);
    timer = setTimeout(() => finish({ kind: "deadline" }), remainingMs);
    held.settled = () => settled;
    void readUntilVerdict(held).then((outcome) => outcome && finish(outcome));
  });
}

/**
 * Hold `response` until its body carries something other than reasoning.
 *
 * On `commit` the same Response comes back. On `fallback` the held body has been cancelled
 * (clone and original) and the result carries the failed attempt and, when the draft is worth
 * forwarding, its checkpoint (also attached to the response for the attempt loop to read).
 */
export async function holdComboReasoning(
  response: Response,
  options: ReasoningHoldbackOptions
): Promise<ReasoningHoldbackResult> {
  const peekBody = response.clone().body;
  if (!peekBody) return { kind: "commit", response };
  const state: HoldState = { committed: false, cutFrame: false };
  const collector = new ChatCheckpointCollector(options.maxBytes);
  const reader = peekBody.getReader();
  const held: HeldRead = {
    reader,
    scanner: createHeldScanner(response, state, collector),
    state,
    collector,
    maxBytes: options.maxBytes,
    settled: () => false,
  };
  const outcome = await awaitOutcome(held, options);

  // Drop the clone's branch either way. Not awaited: a tee branch's cancel only settles once its
  // sibling is cancelled too, and on commit the original is still wanted.
  void reader.cancel(COMBO_PER_MODEL_TIMEOUT_REASON).catch(() => undefined);
  if (outcome.kind === "commit") return { kind: "commit", response };
  if (outcome.kind === "cancelled") return { kind: "cancelled" };

  void response.body?.cancel(new Error(COMBO_HEDGE_CANCELLED_REASON)).catch(() => undefined);
  const checkpoint = outcome.kind === "overflow" ? null : collector.snapshot();
  const failed =
    outcome.kind === "deadline"
      ? options.timeoutResponse()
      : markReasoningHoldbackCut(new Response(null, { status: 200, headers: response.headers }));
  attachReasoningCheckpoint(failed, checkpoint);
  return { kind: "fallback", response: failed, reason: outcome.kind, checkpoint };
}
