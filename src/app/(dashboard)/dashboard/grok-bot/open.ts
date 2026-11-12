import type { TranscriptAdvance, TranscriptCursor } from "./transcript";
export type TranscriptStep = TranscriptCursor & {
  stop?: boolean;
  cleared?: boolean;
  halt?: boolean;
};

/** Silence long enough that the socket, not the bot, is the suspect. The watch
 *  heartbeats about every ten seconds, so a minute of nothing is a dead
 *  connection that never closed. The route's own 15 s gate does not cover this:
 *  it fires on a consumer that stops reading, not on an upstream that stops
 *  talking, and the route adds no heartbeat of its own. */
const SILENCE_MS = 60_000;

type RetryKind = "drop" | "admission" | "fatal";

/**
 * Shapes the advance into the step the reader consumes. The reader rebuilds its next
 * cursor from this object alone, so every field it needs has to survive the trip;
 * generation in particular decides whether the next request is accepted at all.
 */
export function transcriptStep(next: TranscriptAdvance): TranscriptStep {
  return {
    phase: next.phase,
    after: next.after,
    generation: next.generation,
    stop: next.stop,
    halt: next.halt,
    cleared: next.cleared,
  };
}

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
/** Restarts the silence deadline on every frame; a half-open socket never rejects. */
function silenceWatchdog(ctx: Context, controller: AbortController) {
  let timer = setTimeout(() => controller.abort(), ctx.silenceMs);
  return {
    touch() {
      clearTimeout(timer);
      timer = setTimeout(() => controller.abort(), ctx.silenceMs);
    },
    clear() {
      clearTimeout(timer);
    },
  };
}

function classifyFailure(error: unknown): RetryKind {
  if ((error as { admission?: unknown })?.admission === true) return "admission";
  if ((error as { fatal?: unknown })?.fatal === true) return "fatal";
  return "drop";
}

type FrameLoop =
  | { kind: "stopped" }
  | { kind: "ended"; cursor: TranscriptCursor; cutover: boolean; sawFrame: boolean }
  | { kind: "threw"; cursor: TranscriptCursor; error: unknown; sawFrame: boolean };

/**
 * Reads one upstream watch to its end, its stop, or a failure. It reports what happened
 * and leaves the retry decision to the caller.
 */
async function pumpFrames(
  ctx: Context,
  request: TranscriptCursor,
  controller: AbortController,
  watchdog: { touch: () => void }
): Promise<FrameLoop> {
  let cursor = request;
  let cutover = false;
  let sawFrame = false;
  let handlerFault = false;
  try {
    for await (const frame of ctx.input.read(request, controller.signal)) {
      if (ctx.stopped) return { kind: "stopped" };
      watchdog.touch();
      handlerFault = true;
      const next = ctx.input.onFrame(frame, cursor);
      handlerFault = false;
      cursor = {
        phase: next.phase,
        after: next.after,
        ...(next.generation === undefined ? {} : { generation: next.generation }),
      };
      sawFrame = true;
      if (next.halt) {
        ctx.stop();
        return { kind: "stopped" };
      }
      if (next.stop) {
        cutover = true;
        break;
      }
    }
  } catch (error) {
    if (handlerFault) {
      // The frame handler threw, not the transport: retrying would repeat the same
      // fault forever, so the session ends here.
      if (!ctx.input.onFault) throw error;
      ctx.input.onFault(error);
      ctx.stop();
      return { kind: "stopped" };
    }
    // A read that rejects, one that ends early and one that goes silent are the same
    // event here: the stream stopped before we asked it to.
    return { kind: "threw", cursor, error, sawFrame };
  }
  return { kind: "ended", cursor, cutover, sawFrame };
}

async function attempt(ctx: Context, request: TranscriptCursor, fails: number): Promise<Outcome> {
  const controller = new AbortController();
  const openedAt = Date.now();
  ctx.active = controller;
  const watchdog = silenceWatchdog(ctx, controller);
  let loop: FrameLoop;
  try {
    loop = await pumpFrames(ctx, request, controller, watchdog);
  } finally {
    watchdog.clear();
    controller.abort();
    ctx.active = undefined;
  }
  if (loop.kind === "stopped" || ctx.stopped) return { kind: "stopped" };
  if (loop.kind === "ended" && loop.cutover) return { kind: "cutover", cursor: loop.cursor };
  const kind: RetryKind = loop.kind === "threw" ? classifyFailure(loop.error) : "drop";
  if (loop.kind === "threw" && kind === "fatal") ctx.input.onFault?.(loop.error);
  // A turn that produced frames is a fresh start, so its first failure counts as one.
  const nextFails = loop.sawFrame ? 1 : fails + 1;
  if (kind === "fatal") return { kind: "stopped" };
  const wait = ctx.input.retryWait(nextFails, Date.now() - openedAt, kind);
  if (wait < 0) return { kind: "stopped" };
  return { kind: "retry", cursor: loop.cursor, fails: nextFails, wait };
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
