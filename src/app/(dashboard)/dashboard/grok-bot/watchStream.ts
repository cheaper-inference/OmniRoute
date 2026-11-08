import { grokBotRead, grokBotReadStream } from "./read";
import { fillBlobBodies, fillOmittedBodies, blobReadPaths } from "./recover";
import { backlogged, bufferPressure } from "./pressure";
import {
  transcriptConnectedFrame,
  transcriptDataFrame,
  transcriptTerminalFrame,
} from "./transcript";

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

async function recoverOmitted(
  frame: unknown,
  accessToken: string,
  agentId: string,
  read: typeof grokBotRead = grokBotRead,
  fetchBlob: (url: string) => Promise<Response> = fetch
): Promise<unknown> {
  if (!frame || typeof frame !== "object") return frame;
  const rows = (frame as { rows?: { entries?: unknown } }).rows;
  if (!rows || !Array.isArray(rows.entries)) return frame;
  const entries = await fillOmittedBodies(rows.entries, async (query) => {
    const answer = await read({
      accessToken,
      method: "ListGrokBotTranscriptEntries",
      payload: { agentId, sessionId: "", ...query },
    });
    const listed = (answer as { entries?: unknown } | null)?.entries;
    return Array.isArray(listed) ? listed : [];
  });
  const withBlobs = await fillBlobBodies(entries, async (hash) => {
    const paths = blobReadPaths([hash]);
    if (paths.length === 0) return null;
    const signed = await read({
      accessToken,
      method: "PresignSandBoxStoreReads",
      payload: { relPaths: paths },
    });
    const instructions = (signed as { instructions?: unknown } | null)?.instructions;
    const match = Array.isArray(instructions)
      ? instructions.find(
          (item) =>
            item &&
            typeof item === "object" &&
            (item as { relPath?: unknown }).relPath === paths[0] &&
            typeof (item as { url?: unknown }).url === "string"
        )
      : null;
    if (!match) return null;
    const response = await fetchBlob((match as { url: string }).url);
    if (!response.ok) return null;
    const text = await response.text();
    return text === "" ? null : text;
  });
  return { ...frame, rows: { ...rows, entries: withBlobs } };
}

/** Moves frames from the upstream watch into the downstream queue, pausing or
 *  giving up when the queue stops draining. */
async function pump(input: {
  frames: AsyncIterable<unknown>;
  controller: ReadableStreamDefaultController<Uint8Array>;
  upstream: AbortController;
  pressure: () => Backpressure;
  streamId: string;
  recover?: (frame: unknown) => Promise<unknown>;
}): Promise<void> {
  const encoder = new TextEncoder();
  const iterator = input.frames[Symbol.asyncIterator]();
  let pause: ReturnType<typeof setTimeout> | undefined;
  const stop = () => {
    if (pause) clearTimeout(pause);
    input.upstream.abort();
  };
  const onAbort = () => stop();
  input.upstream.signal.addEventListener("abort", onAbort);
  try {
    for (;;) {
      if (input.upstream.signal.aborted) return;
      const pressure = input.pressure();
      if (pressure === "abort") {
        stop();
        input.controller.error(new Error("downstream stalled"));
        return;
      }
      if (pressure === "pause") {
        if (input.upstream.signal.aborted) return;
        await new Promise<void>((resolve) => {
          const done = () => {
            if (pause) clearTimeout(pause);
            pause = undefined;
            input.upstream.signal.removeEventListener("abort", done);
            resolve();
          };
          pause = setTimeout(done, PAUSE_MS);
          input.upstream.signal.addEventListener("abort", done, { once: true });
        });
        continue;
      }
      const step = await iterator.next();
      if (step.done || input.upstream.signal.aborted) return;
      const value = input.recover ? await input.recover(step.value) : step.value;
      input.controller.enqueue(encoder.encode(transcriptDataFrame(value)));
    }
  } catch (error) {
    stop();
    input.controller.enqueue(encoder.encode(transcriptTerminalFrame(error, input.streamId)));
  } finally {
    input.upstream.signal.removeEventListener("abort", onAbort);
    stop();
  }
}

export async function pumpWatch(input: {
  frames: AsyncIterable<unknown>;
  controller: ReadableStreamDefaultController<Uint8Array>;
  upstream: AbortController;
  pressure: () => Backpressure;
  streamId: string;
  recover?: (frame: unknown) => Promise<unknown>;
}): Promise<void> {
  return pump(input);
}

export function watchStream(input: {
  accessToken: string;
  agentId: string;
  after: string;
  generation?: number;
  signal: AbortSignal;
  release: () => void;
  streamId?: string;
  frames?: FramesReader;
  recover?: typeof grokBotRead;
  fetchBlob?: (url: string) => Promise<Response>;
  pressure?: () => Backpressure;
}): ReadableStream<Uint8Array> {
  const readFrames = input.frames ?? grokBotReadStream;
  const upstream = new AbortController();
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    input.release();
  };
  const onAbort = () => upstream.abort();
  input.signal.addEventListener("abort", onAbort);
  return new ReadableStream<Uint8Array>(
    {
      async start(controller) {
        // The caller may have gone away before the stream was pulled. Opening the
        // upstream watch anyway spends one of the connection's two slots and leaves
        // it held until the read finishes.
        if (input.signal.aborted) {
          release();
          controller.close();
          return;
        }
        const streamId = input.streamId ?? crypto.randomUUID();
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(transcriptConnectedFrame(streamId)));
        if (input.generation === undefined) {
          upstream.abort();
          release();
          controller.error(Object.assign(new Error("generation required"), { fatal: true }));
          return;
        }
        const gate = queueGate(controller);
        let frames: AsyncIterable<unknown>;
        try {
          frames = readFrames({
            accessToken: input.accessToken,
            method: "WatchGrokBotTranscripts",
            payload: {
              cursors: [
                {
                  agentId: input.agentId,
                  sessionId: "",
                  generation: input.generation,
                  afterUpdatedSeq: input.after,
                },
              ],
              inlineBodyMaxBytes: 65_536,
            },
            signal: upstream.signal,
          });
        } catch (error) {
          upstream.abort();
          release();
          controller.error(error);
          return;
        }
        try {
          await pump({
            frames,
            controller,
            upstream,
            pressure: input.pressure ?? gate,
            streamId,
            recover: async (frame) =>
              recoverOmitted(
                frame,
                input.accessToken,
                input.agentId,
                input.recover,
                input.fetchBlob
              ),
          });
        } finally {
          input.signal.removeEventListener("abort", onAbort);
          release();
          try {
            controller.close();
          } catch {
            /* already errored */
          }
        }
      },
      cancel() {
        upstream.abort();
        release();
      },
    },
    { highWaterMark: 0 }
  );
}
