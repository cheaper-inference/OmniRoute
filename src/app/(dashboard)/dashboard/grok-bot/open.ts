import type { TranscriptCursor } from "./transcript";
export type TranscriptStep = TranscriptCursor & { stop?: boolean };

/** Silence long enough that the socket, not the bot, is the suspect. The watch
 *  heartbeats about every ten seconds, so a minute of nothing is a dead
 *  connection that never closed. The route's own 15 s gate does not cover this:
 *  it fires on a consumer that stops reading, not on an upstream that stops
 *  talking, and the route adds no heartbeat of its own. */
const SILENCE_MS = 60_000;

type RetryKind = "drop" | "admission";

type OpenTranscriptInput = {
  request: TranscriptCursor;
  read: (request: TranscriptCursor, signal: AbortSignal) => AsyncIterable<unknown>;
  onFrame: (frame: unknown, request: TranscriptCursor) => TranscriptStep;
  /** `admission` means the server refused to serve yet (a watch-slot 429) rather
   *  than a stream dying, so the caller must not count it as a failure. */
  retryWait: (fails: number, livedMs: number, kind: RetryKind) => number;
  onFault?: (error: unknown) => void;
  silenceMs?: number;
};

type Context = {
  input: OpenTranscriptInput;
  silenceMs: number;
  stopped: boolean;
  active: AbortController | undefined;
  retryTimer: ReturnType<typeof setTimeout> | undefined;
  stop: () => void;
};

type Outcome =
  | { kind: "stopped" }
  | { kind: "cutover"; cursor: TranscriptCursor }
  | { kind: "retry"; cursor: TranscriptCursor; fails: number; wait: number };

/**
 * One connection attempt: read until the stream ends, breaks for a cutover, goes
 * silent past the deadline, or fails. Whatever happened, it reports back what the
 * retry loop should do next and never decides that itself.
 */
async function attempt(ctx: Context, request: TranscriptCursor, fails: number): Promise<Outcome> {
  const controller = new AbortController();
  const openedAt = Date.now();
  ctx.active = controller;
  let cursor = request;
  let cutover = false;
  let handlerFault = false;
  let kind: RetryKind = "drop";
  // A half-open socket delivers nothing and never rejects, so the attempt needs
  // its own deadline or the reader waits for a close that never comes.
  let silence = setTimeout(() => controller.abort(), ctx.silenceMs);
  try {
    for await (const frame of ctx.input.read(request, controller.signal)) {
      if (ctx.stopped) return { kind: "stopped" };
      clearTimeout(silence);
      silence = setTimeout(() => controller.abort(), ctx.silenceMs);
      handlerFault = true;
      const next = ctx.input.onFrame(frame, cursor);
      handlerFault = false;
      cursor = { phase: next.phase, after: next.after };
      fails = 0;
      if (next.stop) {
        cutover = true;
        break;
      }
    }
  } catch (error) {
    if (handlerFault) {
      // The frame handler threw, not the transport: retrying would repeat the
      // same fault forever, so the session ends here.
      if (ctx.input.onFault) {
        ctx.input.onFault(error);
        ctx.stop();
        return { kind: "stopped" };
      }
      throw error;
    }
    kind = (error as { admission?: unknown })?.admission === true ? "admission" : "drop";
    // A read that rejects, a read that ends early and a read that goes silent are
    // the same event here: the stream stopped before we asked it to.
  } finally {
    clearTimeout(silence);
    controller.abort();
    ctx.active = undefined;
  }
  if (ctx.stopped) return { kind: "stopped" };
  if (cutover) return { kind: "cutover", cursor };
  const nextFails = fails + 1;
  const wait = ctx.input.retryWait(nextFails, Date.now() - openedAt, kind);
  if (wait < 0) return { kind: "stopped" };
  return { kind: "retry", cursor, fails: nextFails, wait };
}

async function run(ctx: Context, request: TranscriptCursor, fails: number): Promise<void> {
  while (!ctx.stopped) {
    const outcome = await attempt(ctx, request, fails);
    if (outcome.kind === "stopped") return;
    if (outcome.kind === "cutover") {
      request = outcome.cursor;
      fails = 0;
      continue;
    }
    ctx.retryTimer = setTimeout(() => void run(ctx, outcome.cursor, outcome.fails), outcome.wait);
    return;
  }
}

export function openTranscript(input: OpenTranscriptInput): { abort: () => void } {
  const ctx: Context = {
    input,
    silenceMs: input.silenceMs ?? SILENCE_MS,
    stopped: false,
    active: undefined,
    retryTimer: undefined,
    stop: () => {},
  };
  const stop = () => {
    ctx.stopped = true;
    ctx.active?.abort();
    clearTimeout(ctx.retryTimer);
  };
  ctx.stop = stop;
  void run(ctx, input.request, 0);
  return { abort: stop };
}