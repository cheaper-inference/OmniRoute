import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const MAX_BUFFERED_BYTES = 256 * 1024;
const SNAPSHOT_CHUNK_BYTES = 32 * 1024;
type EventSink = {
  send: (chunk: Uint8Array) => boolean;
  onCleanup: (cleanup: () => void) => void;
  isClosed: () => boolean;
};

/** Snapshot text stays on the heap; only demand-driven encoded chunks enter the stream. */
class EventQueue {
  private offset = 0;
  private queuedBytes = 0;
  private readonly pending: Uint8Array[] = [];
  private readonly encoder = new TextEncoder();

  constructor(private initial: string) {}

  write(chunk: Uint8Array): boolean {
    if (this.queuedBytes + chunk.byteLength > MAX_BUFFERED_BYTES) return false;
    this.pending.push(chunk);
    this.queuedBytes += chunk.byteLength;
    return true;
  }

  read(): Uint8Array | undefined {
    if (this.initial) {
      const bytes = new Uint8Array(SNAPSHOT_CHUNK_BYTES);
      const { read, written } = this.encoder.encodeInto(this.initial.slice(this.offset), bytes);
      this.offset += read;
      if (this.offset === this.initial.length) this.initial = "";
      return bytes.subarray(0, written);
    }
    const chunk = this.pending.shift();
    if (chunk) this.queuedBytes -= chunk.byteLength;
    return chunk;
  }

  clear(): void {
    this.initial = "";
    this.offset = 0;
    this.pending.length = 0;
    this.queuedBytes = 0;
  }
}

function closeEventController(controller: ReadableStreamDefaultController<Uint8Array>): void {
  try {
    controller.close();
  } catch {
    /* Consumer already cancelled. */
  }
}

/** Bound live byte queues; encode a single initial SSE frame only as the reader pulls. */
export function createBoundedEventStream(
  signal: AbortSignal,
  subscribe: (sink: EventSink) => void,
  initialFrame?: () => string
): ReadableStream<Uint8Array> {
  let closed = false;
  let reading = false;
  let queue: EventQueue | undefined;
  let controller: ReadableStreamDefaultController<Uint8Array>;
  const cleanups = new Set<() => void>();
  const cleanup = () => {
    if (closed) return;
    closed = true;
    queue?.clear();
    signal.removeEventListener("abort", abort);
    for (const dispose of cleanups) dispose();
    cleanups.clear();
  };
  const abort = () => {
    cleanup();
    closeEventController(controller);
  };
  const fail = (error: unknown) => {
    cleanup();
    controller.error(new Error(sanitizeErrorMessage(error)));
  };
  const flush = () => {
    if (!reading || closed) return;
    const chunk = queue?.read();
    if (chunk) {
      reading = false;
      controller.enqueue(chunk);
    }
  };
  const send = (chunk: Uint8Array): boolean => {
    if (closed) return false;
    if (!queue?.write(chunk)) {
      fail("Event stream buffer limit exceeded.");
      return false;
    }
    try {
      flush();
      return true;
    } catch (error) {
      fail(error);
      return false;
    }
  };
  return new ReadableStream<Uint8Array>(
    {
      start(streamController) {
        controller = streamController;
        if (signal.aborted) {
          abort();
          return;
        }
        signal.addEventListener("abort", abort, { once: true });
        try {
          queue = new EventQueue(initialFrame?.() ?? "");
          subscribe({
            send,
            isClosed: () => closed,
            onCleanup(dispose) {
              if (closed) dispose();
              else cleanups.add(dispose);
            },
          });
        } catch (error) {
          fail(error);
        }
      },
      pull() {
        reading = true;
        flush();
      },
      cancel: cleanup,
    },
    { highWaterMark: 0 }
  );
}
