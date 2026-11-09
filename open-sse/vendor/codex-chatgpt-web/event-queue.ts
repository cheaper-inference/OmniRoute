/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
/** Adjacent small text/thinking deltas merge in the backlog up to this many UTF-16 code units. */
const COALESCE_LIMIT = 65_536;
/** Backlog budget in retained UTF-16 code units; 32 Mi is 64 MiB of string data. */
const MAX_BUFFERED_CHARS = 32 * 1024 * 1024;

type Delta = { type?: unknown; phase?: unknown; text?: unknown; thinking?: unknown };

// shortcut: shallow size, only top-level strings count; upgrade if a nested payload gets large.
function retainedChars(value: unknown): number {
  if (typeof value !== "object" || value === null) return 0;
  let n = 0;
  for (const field of Object.values(value)) if (typeof field === "string") n += field.length;
  return n;
}

function deltaField(value: Delta): "text" | "thinking" | null {
  return value.type === "text_delta" ? "text" : value.type === "thinking_delta" ? "thinking" : null;
}

/** The merge of two adjacent same-kind, same-phase deltas, or null when they must stay apart. */
function mergeDeltas<T>(prev: T, next: T): T | null {
  const a = prev as Delta;
  const b = next as Delta;
  const field = deltaField(a);
  if (!field || a.type !== b.type || a.phase !== b.phase) return null;
  const left = a[field];
  const right = b[field];
  if (typeof left !== "string" || typeof right !== "string") return null;
  if (left.length + right.length > COALESCE_LIMIT) return null;
  return { ...prev, [field]: left + right };
}

export class AsyncEventQueue<T> implements AsyncIterable<T> {
  private readonly buffered: T[] = [];
  private readonly waiters: Array<(result: IteratorResult<T>) => void> = [];
  private closed = false;
  private chars = 0;

  constructor(
    private readonly maxBuffered = 10_000,
    private readonly maxChars = MAX_BUFFERED_CHARS
  ) {}

  push(value: T): void {
    if (this.closed) return;
    const waiter = this.waiters.shift();
    if (waiter) {
      waiter({ value, done: false });
      return;
    }
    const size = retainedChars(value);
    const last = this.buffered.length - 1;
    const merged = last >= 0 ? mergeDeltas(this.buffered[last], value) : null;
    if (merged !== null) {
      const grown = retainedChars(merged) - retainedChars(this.buffered[last]);
      if (this.chars + grown <= this.maxChars) {
        this.buffered[last] = merged;
        this.chars += grown;
        return;
      }
    }
    // A terminal error must always fit, so overflow can still reach the consumer.
    const isError = (value as { type?: unknown } | null)?.type === "error";
    if (
      !isError &&
      (this.buffered.length >= this.maxBuffered || this.chars + size > this.maxChars)
    ) {
      throw new Error("Adapter event backlog exceeded");
    }
    this.buffered.push(value);
    this.chars += size;
  }

  close(): void {
    if (this.closed) return;
    this.closed = true;
    while (this.waiters.length > 0) this.waiters.shift()!({ value: undefined, done: true });
  }

  async collect(): Promise<T[]> {
    const values: T[] = [];
    for await (const value of this) values.push(value);
    return values;
  }

  [Symbol.asyncIterator](): AsyncIterator<T> {
    return {
      next: () => {
        const value = this.buffered.shift();
        if (value !== undefined) {
          this.chars -= retainedChars(value);
          return Promise.resolve({ value, done: false });
        }
        if (this.closed) return Promise.resolve({ value: undefined, done: true });
        return new Promise((resolve) => this.waiters.push(resolve));
      },
      return: () => {
        this.close();
        return Promise.resolve({ value: undefined, done: true });
      },
    };
  }
}
