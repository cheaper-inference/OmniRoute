import {
  EMPTY_SESSION_ID,
  WATCH_IDLE_TIMEOUT_MS,
  WATCH_READ_TIMEOUT_MS,
  type Transport,
} from "./grok-bot-protocol.ts";
import { GrokWatchFrameReader, type WatchFrame, type LiveAgent } from "./grok-bot-watch-frame.ts";

/** A refusal that must never be mistaken for an answer. */
function incompleteTurn(message: string): Error {
  return Object.assign(new Error(message), { errorType: "incomplete_turn" });
}

type WatchLog = { warn?: (...args: unknown[]) => void } | null;

function traceLive(live: LiveAgent | undefined): string {
  return `liveId=${String(live?.agentId ?? "")} liveRunning=${String(live?.isRunning ?? "")} liveRunningTurn=${String(live?.isRunningTurn ?? "")} staleAfter=${String(live?.staleAfterMs ?? "")} updatedAt=${String(live?.updatedAtMs ?? "")}`;
}

/**
 * Delay before reconnecting the watch stream after an error or clean EOF.
 * Backs off from 250ms to 4s; the caller caps each wait at the turn deadline.
 */
export function grokReconnectDelayMs(attempt: number): number {
  if (attempt <= 0) return 0;
  return Math.min(4000, 250 * 2 ** Math.min(attempt - 1, 4));
}

function sleepUnlessAborted(ms: number, signal: AbortSignal | null): Promise<void> {
  if (ms <= 0 || signal?.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const timer = setTimeout(finish, ms);
    function finish(): void {
      clearTimeout(timer);
      signal?.removeEventListener("abort", finish);
      resolve();
    }
    signal?.addEventListener("abort", finish, { once: true });
  });
}

/** One turn's cursor, settlement and reconnect state. Never shared between requests. */
class GrokWatchSession {
  private seenRunning = false;
  private readonly parts: string[] = [];
  private submitted: string | null = null;
  private generation = 0;
  private readonly cursor = { ack: "0" };
  private staleTimer: ReturnType<typeof setTimeout> | null = null;
  private staleAbort: AbortController | null = null;
  private readonly deadline = Date.now() + WATCH_IDLE_TIMEOUT_MS;
  private lastTrace = "";
  private reconnectAttempt = 0;
  private readonly frames: GrokWatchFrameReader;

  constructor(
    private readonly transport: Transport,
    private readonly agentId: string,
    messageId: string,
    private readonly signal: AbortSignal | null,
    private readonly log: WatchLog
  ) {
    this.frames = new GrokWatchFrameReader({
      agentId,
      messageId,
      parts: this.parts,
      cursor: this.cursor,
      onRunning: (running) => {
        if (running) this.seenRunning = true;
        return !running && this.seenRunning;
      },
      onSubmit: (answer) => {
        this.submitted = answer;
      },
      onStale: (remainingMs) => {
        if (this.staleTimer) clearTimeout(this.staleTimer);
        this.staleTimer = setTimeout(() => this.staleAbort?.abort(), remainingMs);
      },
    });
  }

  async run(): Promise<string> {
    try {
      this.signal?.throwIfAborted();
      while (Date.now() < this.deadline) {
        const answer = await this.readStream();
        if (answer !== null) return answer;
        // Charge every unfinished read once, including an empty clean EOF.
        const delay = grokReconnectDelayMs(++this.reconnectAttempt);
        await sleepUnlessAborted(Math.min(delay, this.deadline - Date.now()), this.signal);
        this.signal?.throwIfAborted();
      }
      if (!this.seenRunning) throw new Error("watch stream ended before the agent started running");
      throw incompleteTurn("turn ended without explicit completion");
    } finally {
      // Reconnects retain their window; every terminal return/throw releases it.
      this.stopStale();
    }
  }

  private stopStale(): void {
    if (this.staleTimer) clearTimeout(this.staleTimer);
    this.staleTimer = null;
  }

  private realParts(): string[] {
    return this.parts.filter((part) => !part.startsWith("\u0000submit:"));
  }

  /**
   * Refuse a turn that is not complete, or return the text it did produce.
   * Both settlement paths ask the same question, so they ask it in one place.
   */
  private settle(missing: string, empty: string): string {
    if (this.frames.hasMissingRows()) throw incompleteTurn(missing);
    const real = this.realParts();
    if (real.length) return real.join("");
    throw incompleteTurn(empty);
  }

  private watchSignal(): AbortSignal {
    const remaining = Math.max(0, this.deadline - Date.now());
    const timeout = AbortSignal.timeout(Math.min(WATCH_READ_TIMEOUT_MS, remaining));
    if (!this.staleTimer) this.staleAbort = new AbortController();
    return this.signal
      ? AbortSignal.any([this.signal, timeout, this.staleAbort!.signal])
      : AbortSignal.any([timeout, this.staleAbort!.signal]);
  }

  private watchPayload() {
    return {
      cursors: [
        {
          agentId: this.agentId,
          sessionId: EMPTY_SESSION_ID,
          generation: this.generation,
          afterUpdatedSeq: this.frames.cursorForReconnect(),
        },
      ],
      includeUnlistedAgents: false,
      inlineBodyMaxBytes: 65536,
    };
  }

  private async readStream(): Promise<string | null> {
    const link = this.watchSignal();
    const payload = this.watchPayload();
    try {
      const watch = this.transport.watch("WatchGrokBotTranscripts", payload, { signal: link });
      for await (const event of watch) {
        this.trace(event);
        const result = this.frames.consume(event);
        const answer = this.settlement(result);
        if (answer !== null) {
          this.stopStale();
          return answer;
        }
      }
      // A server idle cut reconnects with the same stale timer/controller.
      return null;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private settlement(ended: boolean): string | null {
    if (this.submitted !== null) return this.submitted;
    if (!ended) return null;
    return this.settle(
      "turn ended with transcript rows still missing",
      "turn became idle without explicit completion"
    );
  }

  private handleError(error: unknown): string | null {
    if (this.staleAbort?.signal.aborted) {
      this.stopStale();
      if (this.submitted !== null) return this.submitted;
      return this.settle(
        "turn became stale with transcript rows still missing",
        "turn became stale without explicit completion"
      );
    }
    const type = (error as { errorType?: unknown }).errorType;
    if (type === "incomplete_turn") throw error;
    if (type === "watch_resync") {
      this.stopStale();
      const generation = (error as { generation: number }).generation;
      this.frames.resetRows(generation !== this.generation);
      this.generation = generation;
      this.cursor.ack = "0";
      return null;
    }
    if (this.signal?.aborted) throw error;
    if (this.submitted !== null) {
      this.stopStale();
      return this.submitted;
    }
    return null;
  }

  private trace(event: unknown): void {
    this.reconnectAttempt = 0;
    if (process.env.GROK_BOT_WATCH_TRACE !== "1") return;
    const frame = event as WatchFrame;
    const live = frame.agentState?.live?.[0];
    const line = `running=${String(frame.agent?.isRunningTurn ?? "")} live=${frame.agentState?.live?.length ?? 0} ${traceLive(live)} entry=${frame.entry?.kind ?? ""} parts=${this.parts.length}`;
    if (line !== this.lastTrace) {
      this.lastTrace = line;
      this.log?.warn?.("GROK_BOT_WATCH", line);
    }
  }
}

export function watchGrokBotTurn(
  transport: Transport,
  agentId: string,
  messageId: string,
  signal: AbortSignal | null,
  log: WatchLog
): Promise<string> {
  return new GrokWatchSession(transport, agentId, messageId, signal, log).run();
}
