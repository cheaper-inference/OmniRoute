import { grokBotReadStream } from "./read";
import { backlogged, bufferPressure } from "./pressure";
import { transcriptErrorFrame } from "./transcript";

const STALL_MS = 15_000;
const PAUSE_MS = 200;

export type Backpressure = "read" | "pause" | "abort";

export type FramesReader = (input: {
  accessToken: string;
  method: string;
  payload: Record<string, unknown>;
  signal?: AbortSignal;
}) => AsyncIterable<unknown>;

/**
 * Turns the upstream watch stream into the server-sent events this dashboard
 * reads.
 *
 * The downstream queue is watched rather than trusted: a consumer that stops
 * reading would otherwise let the upstream buffer grow without bound, so a queue
 * that stays full past the stall window aborts the upstream watch and fails the
 * stream instead.
 */
/** Watches how long the downstream queue has been full and says what to do. */
function queueGate(controller: ReadableStreamDefaultController<Uint8Array>): () => Backpressure {
  let highSince = 0;
  return () => {
    const queued = backlogged(controller.desiredSize);
    if (queued === 0) highSince = 0;
    else if (highSince === 0) highSince = Date.now();
    const highFor = highSince === 0 ? 0 : Date.now() - highSince;
    return bufferPressure(queued, { high: 0, stall: STALL_MS }, highFor);
  };
}

/** Moves frames from the upstream watch into the downstream queue, pausing or
 *  giving up when the queue stops draining. */
async function pump(input: {
  frames: AsyncIterable<unknown>;
  controller: ReadableStreamDefaultController<Uint8Array>;
  upstream: AbortController;
  pressure: () => Backpressure;
}): Promise<void> {
  const encoder = new TextEncoder();
  const iterator = input.frames[Symbol.asyncIterator]();
  try {
    for (;;) {
      const pressure = input.pressure();
      if (pressure === "abort") {
        input.upstream.abort();
        input.controller.error(new Error("downstream stalled"));
        return;
      }
      if (pressure === "pause") {
        await new Promise((resolve) => setTimeout(resolve, PAUSE_MS));
        continue;
      }
      const step = await iterator.next();
      if (step.done) return;
      input.controller.enqueue(encoder.encode(`data: ${JSON.stringify(step.value)}\n\n`));
    }
  } catch {
    input.controller.enqueue(encoder.encode(transcriptErrorFrame()));
  }
}

export function watchStream(input: {
  accessToken: string;
  agentId: string;
  after: string;
  signal: AbortSignal;
  release: () => void;
  frames?: FramesReader;
  pressure?: () => Backpressure;
}): ReadableStream<Uint8Array> {
  const readFrames = input.frames ?? grokBotReadStream;
  return new ReadableStream<Uint8Array>(
    {
      async start(controller) {
        const upstream = new AbortController();
        const onAbort = () => upstream.abort();
        input.signal.addEventListener("abort", onAbort);
        const gate = queueGate(controller);
        const frames = readFrames({
          accessToken: input.accessToken,
          method: "WatchGrokBotTranscripts",
          payload: {
            cursors: [
              {
                agentId: input.agentId,
                sessionId: "",
                generation: 0,
                afterUpdatedSeq: input.after === "0" ? "" : input.after,
              },
            ],
          },
          signal: upstream.signal,
        });
        try {
          await pump({
            frames,
            controller,
            upstream,
            pressure: input.pressure ?? gate,
          });
        } finally {
          input.signal.removeEventListener("abort", onAbort);
          input.release();
          try {
            controller.close();
          } catch {
            /* already errored */
          }
        }
      },
      cancel() {
        input.release();
      },
    },
    { highWaterMark: 0 }
  );
}
