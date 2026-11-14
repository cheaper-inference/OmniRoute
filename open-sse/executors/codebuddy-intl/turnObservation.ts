/**
 * Observe one SSE turn so the telemetry reports what the stream really carried.
 *
 * Contract:
 *  - Pure accumulation. This module never sends anything; `reportTurn` does.
 *  - The values are only ever what the upstream produced: the first chunk that
 *    carried content/tool-call output stamps `firstTokenAtMs`, and the LAST
 *    chunk that carried a `usage` block becomes the turn usage (`stream_options
 *    .include_usage`, which the CLI body always requests).
 *  - A malformed, partial or vendor-shaped chunk is ignored, never thrown: a
 *    telemetry detail must never break a chat response.
 *  - The bytes observed are the SAME bytes handed to the client: the tap is a
 *    pass-through, so nothing is consumed twice.
 */

/** Whatever the upstream last declared as this turn's usage. */
export interface TurnObservation {
  /** Epoch ms of the first chunk carrying model output (reasoning, text or tool call). */
  firstTokenAtMs?: number;
  /** The last `usage` object seen on the stream, verbatim. */
  usage?: Record<string, unknown>;
  /** True once at least one SSE event was seen. */
  sawEvent: boolean;
}

export interface TurnObservationSink {
  observe(chunk: string): void;
  readonly state: TurnObservation;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

/** True when the chunk produced visible output for the user. */
function carriesOutput(choice: JsonRecord): boolean {
  const delta = isRecord(choice.delta) ? choice.delta : undefined;
  const message = isRecord(choice.message) ? choice.message : undefined;
  const payload = delta ?? message;
  if (!payload) return false;
  if (typeof payload.content === "string" && payload.content.length > 0) return true;
  if (typeof payload.reasoning_content === "string" && payload.reasoning_content.length > 0) {
    return true;
  }
  if (typeof payload.reasoning === "string" && payload.reasoning.length > 0) return true;
  if (Array.isArray(payload.tool_calls) && payload.tool_calls.length > 0) return true;
  return false;
}

/**
 * Fold one decoded SSE payload into the observation.
 *
 * Exported for the tests and for the `execute()` path that receives a
 * non-streaming JSON body instead of SSE events.
 */
export function observePayload(
  payload: unknown,
  state: TurnObservation,
  now: () => number = Date.now
): void {
  if (!isRecord(payload)) return;

  const observed = isRecord(payload.usage) ? payload.usage : undefined;
  if (observed && Object.keys(observed).length > 0) state.usage = observed;

  if (state.firstTokenAtMs !== undefined) return;
  const choices = Array.isArray(payload.choices) ? payload.choices : [];
  for (const choice of choices) {
    if (isRecord(choice) && carriesOutput(choice)) {
      state.firstTokenAtMs = now();
      return;
    }
  }
}

/**
 * Line-buffered SSE reader. `data:` lines are parsed; every other SSE field
 * (`event:`, `id:`, comments, `[DONE]`) is skipped.
 */
export function createTurnObservationSink(
  now: () => number = Date.now
): TurnObservationSink & { push(bytes: Uint8Array): void; end(): void } {
  const state: TurnObservation = { sawEvent: false };
  const decoder = new TextDecoder();
  let partial = "";

  const drainLine = (rawLine: string) => {
    const line = rawLine.endsWith("\r") ? rawLine.slice(0, -1) : rawLine;
    if (!line.startsWith("data:")) return;
    const body = line.slice(5).trim();
    if (!body || body === "[DONE]") return;
    state.sawEvent = true;
    try {
      observePayload(JSON.parse(body), state, now);
    } catch {
      // Malformed event: ignore, the stream itself is still forwarded verbatim.
    }
  };

  const drain = (flush: boolean) => {
    const lines = partial.split("\n");
    partial = flush ? "" : (lines.pop() ?? "");
    for (const line of lines) drainLine(line);
    if (flush && partial) {
      drainLine(partial);
      partial = "";
    }
  };

  return {
    get state() {
      return state;
    },
    observe(chunk: string) {
      partial += chunk;
      drain(false);
    },
    push(bytes: Uint8Array) {
      partial += decoder.decode(bytes, { stream: true });
      drain(false);
    },
    end() {
      partial += decoder.decode();
      drain(true);
    },
  };
}

/** How a turn stopped, as observed from the response body. */
export type TurnOutcome =
  /** The stream reached its natural end. */
  | "completed"
  /** The consumer abandoned the turn (client disconnect, abort, combo cancel). */
  | "cancelled"
  /** The upstream body errored mid-stream. */
  | "error";

/**
 * Byte-level pass-through that feeds the sink without altering, reordering or
 * buffering the response. Reading the client stream yields the very chunks the
 * consumer would have received; a `cancel()` is forwarded upstream so an
 * abandoned turn never leaks a socket, and it is reported as `cancelled` so the
 * telemetry closes the turn with the truth instead of pretending it finished.
 */
export function tapResponseForObservation(
  response: Response,
  sink: { state: TurnObservation } & { push(bytes: Uint8Array): void; end(): void },
  onEnd: (state: TurnObservation, outcome: TurnOutcome) => void
): Response {
  if (!response.body) return response;

  const upstream = response.body.getReader();
  let settled = false;
  const finish = (outcome: TurnOutcome) => {
    if (settled) return;
    settled = true;
    try {
      sink.end();
    } catch {
      /* observation is best-effort */
    }
    onEnd(sink.state, outcome);
  };

  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await upstream.read();
        if (done) {
          finish("completed");
          controller.close();
          return;
        }
        try {
          sink.push(value);
        } catch {
          /* observation is best-effort */
        }
        controller.enqueue(value);
      } catch (error) {
        finish("error");
        controller.error(error);
      }
    },
    async cancel(reason) {
      // The consumer walked away mid-turn. `finish` runs BEFORE the upstream
      // cancel settles so the report cannot be lost if that cancel hangs.
      finish("cancelled");
      try {
        await upstream.cancel(reason);
      } catch {
        /* already closed */
      }
    },
  });

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
