/**
 * The single exit point of `createSSEStream`: every pre-encoded SSE frame goes through
 * `forward()`, which marks TTFT/ITL on the stream timing and enqueues it.
 *
 * Two opt-in stages sit in front of the enqueue, both OFF by default (with neither enabled
 * `forward()` is exactly `markForward(); observeOutput(bytes); enqueue(bytes)`):
 *
 * 1. Claude delta coalescing (`SSE_COALESCE_*_MS`, see sseDeltaCoalesce.ts) — only when the
 *    client speaks the Claude Messages protocol.
 * 2. Frame batching (`SSE_FRAME_COALESCE_MS`) — frames forwarded within the window are
 *    concatenated and handed to the client as ONE enqueue, which cuts the per-frame socket
 *    write and Web Streams overhead under high concurrency. The first frame of a stream and
 *    terminal frames (`[DONE]`, `message_stop`, `error`, `response.completed|failed|incomplete`)
 *    are never held back. With batching on, TTFT/ITL marks are per flushed batch, so ITL then
 *    measures batch gaps.
 *
 * Timer-driven flushes run outside `transform()`, so the sink keeps the latest controller and
 * goes inert once the stream ends: `wrap()` drains pending output at the end of `flush()` and
 * disposes it on `cancel()`, and an enqueue that throws (errored/closed stream) disposes it too.
 */
import {
  createDeltaFrameCoalescer,
  deltaCoalescingEnabled,
  readDeltaCoalesceWindows,
  type DeltaFrameCoalescer,
} from "./sseDeltaCoalesce.ts";
import type { StreamTiming } from "./streamTiming.ts";

type OutputController = TransformStreamDefaultController<Uint8Array>;
type SinkTiming = Pick<StreamTiming, "markForward" | "observeOutput">;

/** Upper bound for one batched enqueue; a fuller batch is flushed without waiting. */
const MAX_BATCH_BYTES = 64 * 1024;

const TERMINAL_FRAME_RE =
  /(?:^|\n)(?:data: ?\[DONE\]|event: ?(?:message_stop|error|response\.(?:completed|failed|incomplete))\b)|"type": ?"(?:message_stop|error|response\.(?:completed|failed|incomplete))"/;

export function readFrameCoalesceMs(): number {
  const value = Number(process.env.SSE_FRAME_COALESCE_MS);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function isTerminalSSEFrame(frame: string): boolean {
  return TERMINAL_FRAME_RE.test(frame);
}

function concatChunks(chunks: Uint8Array[], totalBytes: number): Uint8Array {
  if (chunks.length === 1) return chunks[0];
  const merged = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    merged.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return merged;
}

export type SSEOutputSink = {
  forward: (controller: OutputController, bytes: Uint8Array) => void;
  /** Emit everything still buffered (both stages) through `controller`. */
  drain: (controller: OutputController) => void;
  /** Wrap a transformer so `flush()` drains and `cancel()` disposes the sink. */
  wrap: <T extends Transformer<Uint8Array, Uint8Array>>(transformer: T) => T;
};

export function createSSEOutputSink(
  timing: SinkTiming,
  options: { claudeClient: boolean }
): SSEOutputSink {
  const frameWindowMs = readFrameCoalesceMs();
  const deltaWindows = readDeltaCoalesceWindows();
  let controllerRef: OutputController | null = null;
  let closed = false;
  let forwardedAny = false;
  let batch: Uint8Array[] = [];
  let batchBytes = 0;
  let batchTimer: ReturnType<typeof setTimeout> | null = null;
  const frameDecoder = new TextDecoder();
  let deltaStage: DeltaFrameCoalescer | null = null;

  const write = (bytes: Uint8Array) => {
    if (closed || !controllerRef) return;
    timing.markForward();
    timing.observeOutput(bytes);
    try {
      controllerRef.enqueue(bytes);
    } catch {
      // The readable side already closed or errored: nothing can reach the client any more.
      dispose();
    }
  };

  const clearBatchTimer = () => {
    if (batchTimer) clearTimeout(batchTimer);
    batchTimer = null;
  };

  const flushBatch = () => {
    clearBatchTimer();
    if (batch.length === 0) return;
    const merged = concatChunks(batch, batchBytes);
    batch = [];
    batchBytes = 0;
    write(merged);
  };

  const emitFrame = (bytes: Uint8Array) => {
    if (closed) return;
    if (frameWindowMs <= 0) {
      write(bytes);
      return;
    }
    if (!forwardedAny || isTerminalSSEFrame(frameDecoder.decode(bytes))) {
      forwardedAny = true;
      batch.push(bytes);
      batchBytes += bytes.byteLength;
      flushBatch();
      return;
    }
    batch.push(bytes);
    batchBytes += bytes.byteLength;
    if (batchBytes >= MAX_BATCH_BYTES) {
      flushBatch();
      return;
    }
    if (!batchTimer) {
      batchTimer = setTimeout(flushBatch, frameWindowMs);
      (batchTimer as { unref?: () => void }).unref?.();
    }
  };

  if (options.claudeClient && deltaCoalescingEnabled(deltaWindows)) {
    deltaStage = createDeltaFrameCoalescer(deltaWindows, emitFrame);
  }

  function dispose() {
    closed = true;
    clearBatchTimer();
    batch = [];
    batchBytes = 0;
    deltaStage?.dispose();
  }

  const forward = (controller: OutputController, bytes: Uint8Array) => {
    if (!deltaStage && frameWindowMs <= 0) {
      timing.markForward();
      timing.observeOutput(bytes);
      controller.enqueue(bytes);
      return;
    }
    controllerRef = controller;
    if (deltaStage) deltaStage.push(bytes);
    else emitFrame(bytes);
  };

  const drain = (controller: OutputController) => {
    if (closed) return;
    controllerRef = controller;
    deltaStage?.flush();
    flushBatch();
  };

  const wrap = <T extends Transformer<Uint8Array, Uint8Array>>(transformer: T): T => {
    if (!deltaStage && frameWindowMs <= 0) return transformer;
    const originalFlush = transformer.flush;
    const originalCancel = (
      transformer as T & { cancel?: (reason?: unknown) => void | PromiseLike<void> }
    ).cancel;
    return {
      ...transformer,
      async flush(controller: OutputController) {
        try {
          await originalFlush?.call(transformer, controller);
        } finally {
          drain(controller);
          dispose();
        }
      },
      cancel(reason: unknown) {
        dispose();
        return originalCancel?.call(transformer, reason);
      },
    };
  };

  return { forward, drain, wrap };
}
