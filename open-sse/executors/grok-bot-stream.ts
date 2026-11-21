import { sanitizeErrorMessage } from "../utils/error.ts";
import {
  getUnreadTimeout,
  namesAClientTool,
  sseChunk,
  sseFinish,
  sseToolCallChunk,
  type StartedBridge,
} from "./grok-bot-protocol.ts";

export type StreamTurn = {
  model: string;
  id: string;
  collect: Promise<string>;
  startedBridge: StartedBridge | null;
  clientToolList: unknown[];
  turnController: AbortController | null;
  signal: AbortSignal | null | undefined;
  deleteAgent: () => Promise<void>;
};

/** Owns the SSE body's lifetime after execute hands remote cleanup to it. */
class GrokTurnStream {
  private readonly encoder = new TextEncoder();
  private readClaimed = false;
  private cancelled = false;
  private writing: Promise<void> | undefined;
  private unreadTimer: ReturnType<typeof setTimeout> | null = null;
  private body!: ReadableStream<Uint8Array>;

  constructor(private readonly turn: StreamTurn) {}

  response(): Response {
    this.body = new ReadableStream<Uint8Array>(
      {
        cancel: () => {
          this.cancelled = true;
          this.clearUnreadTimer();
          this.turn.turnController?.abort();
          // Cancellation settles only after the owned remote agent is cleaned up.
          return this.writing;
        },
        pull: () => {
          this.readClaimed = true;
          this.clearUnreadTimer();
        },
        // Resolving start immediately keeps pull read-triggered while collection is pending.
        start: (controller) => {
          this.writing = this.write(controller);
        },
      },
      { highWaterMark: 0 }
    );
    if (this.turn.startedBridge) {
      this.unreadTimer = setTimeout(() => {
        this.unreadTimer = null;
        if (!this.readClaimed && !this.body.locked) this.turn.turnController?.abort();
      }, getUnreadTimeout());
      this.unreadTimer.unref?.();
    }
    return new Response(this.body, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  private clearUnreadTimer(): void {
    if (this.unreadTimer) {
      clearTimeout(this.unreadTimer);
      this.unreadTimer = null;
    }
  }

  private emit(controller: ReadableStreamDefaultController<Uint8Array>, value: unknown): void {
    controller.enqueue(this.encoder.encode(`data: ${JSON.stringify(value)}\n\n`));
  }

  private done(controller: ReadableStreamDefaultController<Uint8Array>): void {
    controller.enqueue(this.encoder.encode("data: [DONE]\n\n"));
  }

  private emitCalls(controller: ReadableStreamDefaultController<Uint8Array>, text?: string): void {
    const { model, id, startedBridge } = this.turn;
    if (text) this.emit(controller, sseChunk(model, text, id));
    (startedBridge?.invocations ?? []).forEach((call, index) => {
      this.emit(controller, sseToolCallChunk(model, id, index, call));
    });
    this.emit(controller, sseFinish(model, id, "tool_calls"));
  }

  private emitSuccess(controller: ReadableStreamDefaultController<Uint8Array>, text: string): void {
    const { model, id, startedBridge, clientToolList } = this.turn;
    if (startedBridge?.invocations?.length) {
      this.emitCalls(controller, text);
    } else if (
      startedBridge &&
      clientToolList.length > 0 &&
      namesAClientTool(text ?? "", clientToolList)
    ) {
      this.emit(controller, {
        error: { message: "Request bridge tool was not called", type: "bridge_not_called" },
      });
    } else {
      if (text) this.emit(controller, sseChunk(model, text, id));
      this.emit(controller, sseFinish(model, id));
    }
    this.done(controller);
  }

  private emitFailure(
    controller: ReadableStreamDefaultController<Uint8Array>,
    error: unknown
  ): void {
    this.clearUnreadTimer();
    const { startedBridge, turnController, signal } = this.turn;
    if (
      (error as { errorType?: unknown }).errorType === "incomplete_turn" &&
      startedBridge?.invocations?.length
    ) {
      this.emitCalls(controller);
      this.done(controller);
      return;
    }
    const aborted = turnController?.signal.aborted || signal?.aborted;
    // Cancellation emits neither an error frame nor [DONE].
    if (aborted) return;
    const errorType = (error as { errorType?: unknown }).errorType;
    this.emit(controller, {
      error: {
        message: sanitizeErrorMessage(error),
        type: typeof errorType === "string" ? errorType : "upstream_error",
      },
    });
  }

  private async write(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
    try {
      const text = await this.turn.collect;
      if (!this.cancelled) this.emitSuccess(controller, text);
    } catch (error) {
      if (!this.cancelled) this.emitFailure(controller, error);
    } finally {
      this.clearUnreadTimer();
      await this.turn.deleteAgent();
      this.turn.startedBridge?.close?.("normal");
      if (!this.cancelled) controller.close();
    }
  }
}

export function createGrokTurnStream(turn: StreamTurn): Response {
  return new GrokTurnStream(turn).response();
}
