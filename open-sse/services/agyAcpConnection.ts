/**
 * agyAcpConnection.ts — newline-delimited JSON-RPC 2.0 over an agy child's stdio.
 *
 * `agy acp` speaks ACP: every message is one line of JSON on stdin/stdout, the
 * client's requests and the agent's own requests share the same pipe, and the
 * agent pushes notifications with no id at all. Doing that inline in the pool
 * would tangle framing with turn bookkeeping, so this module owns bytes only:
 * it never learns what a session or a tool call is.
 *
 * Two framing decisions come from agy itself rather than from the spec:
 *
 *   - A line larger than 64 MiB is refused outright instead of buffered. agy can
 *     put a whole tool result on one line, and an unbounded buffer would turn a
 *     misbehaving agent into host memory pressure. Refusing closes nothing: the
 *     protocol error goes to the owner, which drops the process.
 *   - A line that is not JSON is skipped, not fatal. Closing the pipe over one
 *     bad line would kill every session behind it, and the next request's
 *     timeout already reports the truth.
 *
 * Ported from magpie-community/plugins packages/agy-cli index.mjs (AcpConnection).
 */

/** A whole ACP line; agy may send a tool result as a single line. */
export const ACP_LINE_LIMIT = 64 * 1024 * 1024;

export type JsonRecord = Record<string, unknown>;

/** An error that carries agy's own JSON-RPC error object. */
export type AcpError = Error & { acpError?: unknown; code?: number };

export type AcpHandlers = {
  /** A message with a method and no id. */
  onNotification: (method: string, params: JsonRecord) => void;
  /**
   * A message with both a method and an id: the agent asking the client to do
   * something. Its resolution is written back as the reply; a rejection is
   * written as a JSON-RPC error using `error.code` when it has one.
   */
  onRequest: (method: string, params: JsonRecord) => unknown | Promise<unknown>;
  /** The stream could not be framed at all; the owner should drop the process. */
  onProtocolError: (error: Error) => void;
};

/** The part of a spawned child this module writes to and reads from. */
export type AcpChild = {
  stdin: { write(chunk: string): unknown; writable?: boolean } | null;
  stdout: {
    setEncoding(encoding: "utf8"): unknown;
    on(event: "data", listener: (chunk: string) => void): unknown;
  };
};

type Pending = {
  method: string;
  resolve: (result: JsonRecord | null) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
};

const isRecord = (value: unknown): value is JsonRecord =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export class AcpConnection {
  private nextId = 0;
  private readonly pending = new Map<number, Pending>();
  private buffer = "";
  private closed = false;
  private closedError: Error | null = null;

  constructor(
    private readonly child: AcpChild,
    private readonly handlers: AcpHandlers
  ) {
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => this.onData(chunk));
  }

  get isClosed(): boolean {
    return this.closed;
  }

  /**
   * Send a request and wait for its reply. `timeoutMs` of 0 waits forever, which
   * is right for a prompt: the turn has its own idle deadline, and a second
   * timer here would race it.
   */
  request(
    method: string,
    params: JsonRecord,
    timeoutMs = 0,
    timeoutMessage = ""
  ): Promise<JsonRecord | null> {
    if (this.closed) {
      return Promise.reject(this.closedError || new Error("agy ACP connection is closed"));
    }
    const id = ++this.nextId;
    return new Promise<JsonRecord | null>((resolve, reject) => {
      const entry: Pending = { method, resolve, reject, timer: null };
      if (timeoutMs > 0) {
        entry.timer = setTimeout(() => {
          this.pending.delete(id);
          reject(
            new Error(timeoutMessage || `agy bridge: ${method} timed out after ${timeoutMs}ms`)
          );
        }, timeoutMs);
        entry.timer.unref?.();
      }
      this.pending.set(id, entry);
      this.write({ jsonrpc: "2.0", id, method, params });
    });
  }

  notify(method: string, params: JsonRecord): void {
    if (!this.closed) this.write({ jsonrpc: "2.0", method, params });
  }

  /** Fail every outstanding request with the same error; later calls reject too. */
  close(error: Error): void {
    if (this.closed) return;
    this.closed = true;
    this.closedError = error;
    for (const entry of this.pending.values()) {
      if (entry.timer) clearTimeout(entry.timer);
      entry.reject(error);
    }
    this.pending.clear();
  }

  private write(message: JsonRecord): void {
    try {
      if (this.child.stdin?.writable !== false) {
        this.child.stdin?.write(`${JSON.stringify(message)}\n`);
      }
    } catch {
      /* the child is going; close() reports it to every waiter */
    }
  }

  private onData(chunk: string): void {
    this.buffer += chunk;
    if (this.buffer.length > ACP_LINE_LIMIT) {
      this.buffer = "";
      this.handlers.onProtocolError(new Error("agy emitted an ACP message larger than 64 MiB"));
      return;
    }
    for (;;) {
      const newline = this.buffer.indexOf("\n");
      if (newline < 0) return;
      const line = this.buffer.slice(0, newline).trim();
      this.buffer = this.buffer.slice(newline + 1);
      if (!line) continue;
      let message: unknown;
      try {
        message = JSON.parse(line);
      } catch {
        // One unparseable line cannot be attributed to a request, so there is
        // nobody to answer; the pending request's own timeout is the report.
        continue;
      }
      this.dispatch(message);
    }
  }

  private dispatch(message: unknown): void {
    if (!isRecord(message)) return;

    // A reply: an id and no method.
    if (Object.hasOwn(message, "id") && !Object.hasOwn(message, "method")) {
      const id = message.id;
      if (typeof id !== "number") return;
      const entry = this.pending.get(id);
      if (!entry) return;
      this.pending.delete(id);
      if (entry.timer) clearTimeout(entry.timer);
      if (message.error) {
        const detail = message.error;
        const label = isRecord(detail)
          ? String(detail.message ?? JSON.stringify(detail))
          : String(detail);
        const error: AcpError = new Error(`agy ${entry.method} failed: ${label}`);
        error.acpError = detail;
        entry.reject(error);
        return;
      }
      const result = message.result;
      entry.resolve(isRecord(result) ? result : null);
      return;
    }

    if (typeof message.method !== "string") return;
    const params = isRecord(message.params) ? message.params : {};

    if (!Object.hasOwn(message, "id")) {
      this.handlers.onNotification(message.method, params);
      return;
    }

    // The agent's own request. Answer it even when the handler throws: a
    // missing reply leaves agy waiting for a client that will never speak.
    const id = message.id;
    Promise.resolve()
      .then(() => this.handlers.onRequest(message.method as string, params))
      .then(
        (result) => this.write({ jsonrpc: "2.0", id, result: result ?? null }),
        (error: unknown) => {
          const typed = error as AcpError | undefined;
          this.write({
            jsonrpc: "2.0",
            id,
            error: {
              code: typeof typed?.code === "number" ? typed.code : -32603,
              message: String(typed?.message ?? error),
            },
          });
        }
      );
  }
}
