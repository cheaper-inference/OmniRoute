// Shared /event connection of the opencode server.

const EVENT_IDLE_CLOSE_MS = 30_000;

export type OpencodeMessageInfo = {
  id?: string;
  role?: string;
  sessionID?: string;
  providerID?: string;
  modelID?: string;
  finish?: string;
  tokens?: {
    input?: number;
    output?: number;
    reasoning?: number;
    cache?: { read?: number; write?: number };
  };
};

export type OpencodePart = {
  id?: string;
  type?: string;
  text?: string;
  messageID?: string;
};

// Resolves early when the signal aborts and never keeps the process alive.
function abortableSleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) return resolve();
    const timer = setTimeout(done, ms);
    timer.unref?.();
    function done(): void {
      clearTimeout(timer);
      signal.removeEventListener("abort", done);
      resolve();
    }
    signal.addEventListener("abort", done, { once: true });
  });
}

export type EventProperties = {
  sessionID?: string;
  messageID?: string;
  partID?: string;
  field?: unknown;
  delta?: unknown;
  part?: OpencodePart & { sessionID?: string; state?: { status?: string } };
  info?: OpencodeMessageInfo;
};
export type EventLike = { type?: string; properties?: Record<string, unknown> };

// One shared /event connection for the whole process. opencode publishes every
// session's events on it, so requests filter by sessionID (+ the assistant
// messageID, otherwise the echoed user prompt leaks into the content).
export class OpencodeEventBus {
  constructor(private readonly getBaseUrl: () => string) {}

  private listeners = new Map<string, Set<(event: EventLike) => void>>();
  private task: Promise<void> | null = null;
  private taskGeneration = -1;
  private generation = 0;
  private controller: AbortController | null = null;
  private idleTimer: ReturnType<typeof setTimeout> | null = null;

  subscribe(sessionID: string, handler: (event: EventLike) => void): () => void {
    this.cancelIdleClose();
    const set = this.listeners.get(sessionID) || new Set();
    set.add(handler);
    this.listeners.set(sessionID, set);
    void this.ensure();
    return () => {
      set.delete(handler);
      if (set.size === 0 && this.listeners.get(sessionID) === set) this.listeners.delete(sessionID);
      if (this.listeners.size === 0) this.scheduleIdleClose();
    };
  }

  /**
   * Stops the shared /event connection and its reconnect loop. Safe to call more
   * than once; a later subscribe() opens a fresh connection. Tests must call this
   * in test.after(), otherwise the reconnect loop keeps the process alive.
   */
  close(): void {
    this.generation += 1;
    this.cancelIdleClose();
    this.listeners.clear();
    this.controller?.abort();
    this.controller = null;
  }

  // The connection is kept for a short grace period after the last request so a
  // burst of requests does not reconnect (and miss early events) every time, but
  // it never outlives its subscribers: with nobody listening the loop exits.
  private scheduleIdleClose(): void {
    if (this.idleTimer) return;
    this.idleTimer = setTimeout(() => {
      this.idleTimer = null;
      if (this.listeners.size === 0) this.close();
    }, EVENT_IDLE_CLOSE_MS);
    this.idleTimer.unref?.();
  }

  private cancelIdleClose(): void {
    if (!this.idleTimer) return;
    clearTimeout(this.idleTimer);
    this.idleTimer = null;
  }

  private ensure(): void {
    if (this.task && this.taskGeneration === this.generation) return;
    const generation = this.generation;
    const controller = new AbortController();
    this.controller = controller;
    this.taskGeneration = generation;
    const task: Promise<void> = this.loop(generation, controller.signal).finally(() => {
      if (this.task === task) this.task = null;
    });
    this.task = task;
  }

  private async loop(generation: number, signal: AbortSignal): Promise<void> {
    let attempt = 0;
    while (generation === this.generation && this.listeners.size > 0) {
      try {
        const response = await fetch(`${this.getBaseUrl()}/event`, {
          headers: { accept: "text/event-stream" },
          signal,
        });
        if (!response.ok || !response.body) throw new Error(`event stream HTTP ${response.status}`);
        attempt = 0;
        await this.consume(response.body);
      } catch {
        if (generation !== this.generation) return;
      }
      if (generation !== this.generation) return;
      attempt += 1;
      await abortableSleep(Math.min(5000, 250 * attempt), signal);
    }
  }

  private async consume(body: ReadableStream<Uint8Array>): Promise<void> {
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return;
      buffer += decoder.decode(value, { stream: true });
      let index: number;
      while ((index = buffer.indexOf("\n\n")) >= 0) {
        const frame = buffer.slice(0, index);
        buffer = buffer.slice(index + 2);
        const dataLine = frame.split("\n").find((line) => line.startsWith("data:"));
        if (!dataLine) continue;
        let event: EventLike;
        try {
          event = JSON.parse(dataLine.slice(5).trim()) as EventLike;
        } catch {
          continue;
        }
        this.dispatch(event);
      }
    }
  }

  private dispatch(event: EventLike): void {
    const properties = (event?.properties || {}) as EventProperties;
    const part = (properties.part || {}) as { sessionID?: string };
    const info = (properties.info || {}) as { sessionID?: string };
    const sessionID = properties.sessionID || part.sessionID || info.sessionID;
    if (!sessionID) return;
    const handlers = this.listeners.get(sessionID);
    if (!handlers || handlers.size === 0) return;
    for (const handler of [...handlers]) {
      try {
        handler(event);
      } catch {
        /* a broken listener must not kill the bus */
      }
    }
  }
}
