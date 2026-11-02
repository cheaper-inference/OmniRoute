/**
 * First-output gate for streaming combo targets.
 *
 * `DEFAULT_COMBO_TARGET_TIMEOUT_MS` is meant to bound how long a single target may hold a
 * combo before it falls over (see comboConfig.ts). For streaming responses the dispatch race
 * settles as soon as the upstream sends headers, so a target that opens the stream and then
 * produces nothing keeps the combo waiting until the CLIENT gives up — the per-target budget
 * has already been cleared and nothing else watches the body.
 *
 * This gate holds a streaming response until its body carries output, then hands the original
 * response back untouched. Generation that has started is never cut short: the gate leaves the
 * moment the first real event arrives.
 *
 * What counts as output is decided by `sseChunkCarriesOutput` — the predicate TTFT already uses
 * — so the lifecycle frames this gateway injects itself (SSE heartbeats shaped as
 * `response.in_progress`, `event: progress` ticks, pings, `message_start`, role-only deltas) are
 * not mistaken for an answer. That matters here: the combo sees the client-facing stream, which
 * already carries those frames.
 */
import { COMBO_PER_MODEL_TIMEOUT_REASON } from "./comboAbortReasons.ts";
import { sseChunkCarriesOutput } from "../../utils/sseOutputSignal.ts";

/** Floor for the gate window, so a dispatch that ate the whole budget cannot abandon a live target. */
const MIN_FIRST_OUTPUT_BUDGET_MS = 250;

/** Give up accumulating at this size: a streaming body this far into silence is not answering. */
const MAX_BUFFERED_CHARS = 64 * 1024;

/**
 * Why the gate stopped waiting.
 *
 * - `budget`: the target produced nothing in time; the caller falls over.
 * - `cancelled`: something outside aborted the wait (hedge winner, client disconnect). Not a
 *   target failure, and the caller must not charge it to the model.
 * - `empty`: the body closed before producing anything. Left to the existing empty-response
 *   handling so its classification and retry behaviour still apply.
 */
export type FirstOutputStallReason = "budget" | "cancelled" | "empty";

export type FirstOutputResult =
  { kind: "output"; response: Response } | { kind: "stalled"; reason: FirstOutputStallReason };

/** True for SSE responses carrying a body, the only kind this gate inspects. */
export function isEventStreamResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type") ?? "";
  return response.body !== null && contentType.toLowerCase().includes("text/event-stream");
}

/**
 * Ask the shared predicate whether one assembled event carries output.
 *
 * `sseChunkCarriesOutput` reads a *chunk* and evaluates each `data:` line on its own, so a
 * payload that an event joined from several `data:` lines has to go back as a single line. The
 * join separator is a newline; flattening it to a space is equivalent wherever it can legally
 * appear — JSON never allows a raw newline inside a value, so the character only ever sits
 * between tokens.
 */
function carriesOutput(payload: string): boolean {
  return sseChunkCarriesOutput(`data: ${payload.replace(/\n/g, " ")}\n\n`);
}

/**
 * Incremental SSE reader that reports the first event carrying output.
 *
 * Owns the framing only: one event may span several `data:` lines (joined with `\n`), an event
 * ends at a blank line, a chunk boundary may fall anywhere, and CRLF, bare LF and bare CR all
 * terminate a line. Whether an assembled event counts as output is `sseChunkCarriesOutput`'s
 * question, not this class's.
 */
export class SseOutputScanner {
  private pendingLine = "";
  private dataLines: string[] = [];
  private bufferedChars = 0;

  /** Feed decoded text; true once an event has shown output. */
  push(text: string): boolean {
    this.pendingLine += text;
    let start = 0;
    let index = 0;
    let sawOutput = false;
    while (index < this.pendingLine.length) {
      const code = this.pendingLine.charCodeAt(index);
      if (code !== 10 && code !== 13) {
        index += 1;
        continue;
      }
      const line = this.pendingLine.slice(start, index);
      index += 1;
      // The LF of a CRLF pair is the same terminator, not a second empty line.
      if (
        code === 13 &&
        index < this.pendingLine.length &&
        this.pendingLine.charCodeAt(index) === 10
      ) {
        index += 1;
      }
      start = index;
      if (this.consumeLine(line)) {
        sawOutput = true;
        break;
      }
    }
    this.pendingLine = this.pendingLine.slice(start);
    this.bufferedChars =
      this.pendingLine.length + this.dataLines.reduce((total, line) => total + line.length, 0);
    return sawOutput;
  }

  /**
   * True once an unterminated run of bytes has grown past what any real first event needs.
   *
   * The gate exists to catch a silent target, so a body this far into a single unterminated
   * line is treated as "talking in a framing this reader does not know" rather than failed.
   */
  overflowedWithoutOutput(): boolean {
    return this.bufferedChars > MAX_BUFFERED_CHARS;
  }

  /** Evaluate whatever is left after the body closed without a trailing blank line. */
  flush(): boolean {
    if (this.dataLines.length === 0) return false;
    const payload = this.dataLines.join("\n");
    this.dataLines = [];
    return payload.length > 0 && carriesOutput(payload);
  }

  private consumeLine(line: string): boolean {
    if (line === "") {
      const payload = this.dataLines.join("\n");
      this.dataLines = [];
      return payload.length > 0 && carriesOutput(payload);
    }
    if (!line.startsWith("data:")) return false;
    const value = line.slice(5);
    this.dataLines.push(value.startsWith(" ") ? value.slice(1) : value);
    return false;
  }
}

/**
 * Hold `response` until its body carries output, or stop waiting for one of the reasons above.
 *
 * The peek reads a clone, so the caller keeps the original Response (same object, same headers,
 * unlocked body). The gate owns only the peek branch: it always cancels that one, and it cancels
 * the original body only on `budget`, when the caller is about to throw the target away.
 * - `empty`: the original body still holds every byte the target sent, so the empty-response
 *   checks (quality validation, trusted empty turns) read exactly what they read without the gate.
 * - `cancelled`: whoever aborted `signal` owns the teardown; the runner passes the target's
 *   abort signal, which already releases the upstream request.
 */
export async function awaitFirstOutput(
  response: Response,
  budgetMs: number,
  signal?: AbortSignal | null
): Promise<FirstOutputResult> {
  const peekBody = response.clone().body;
  if (!peekBody) return { kind: "output", response };
  const reader = peekBody.getReader();

  const decoder = new TextDecoder();
  const scanner = new SseOutputScanner();
  let timer: ReturnType<typeof setTimeout> | undefined;

  const outcome = await new Promise<"output" | FirstOutputStallReason>((resolve) => {
    let settled = false;
    const finish = (value: "output" | FirstOutputStallReason) => {
      if (settled) return;
      settled = true;
      if (timer) clearTimeout(timer);
      resolve(value);
    };
    timer = setTimeout(() => finish("budget"), Math.max(budgetMs, MIN_FIRST_OUTPUT_BUDGET_MS));
    if (signal) {
      if (signal.aborted) {
        finish("cancelled");
        return;
      }
      signal.addEventListener("abort", () => finish("cancelled"), { once: true });
    }
    void (async () => {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) {
            // A body that closed still counts if its last event never got a terminator.
            finish(scanner.flush() ? "output" : "empty");
            return;
          }
          if (!value) continue;
          if (scanner.push(decoder.decode(value, { stream: true }))) {
            finish("output");
            return;
          }
          if (scanner.overflowedWithoutOutput()) {
            finish("output");
            return;
          }
        }
      } catch {
        // A read error is the target's own failure; take what arrived as final rather than
        // inventing a second failure mode here.
        finish(scanner.flush() ? "output" : "empty");
      }
    })();
  });

  // Drop the peek branch either way: the clone is a tee of the original body, so cancelling it
  // stops that copy from growing while the caller reads the original at its own pace. Not
  // awaited — a tee branch's cancel only settles once the sibling is cancelled too.
  void reader.cancel(COMBO_PER_MODEL_TIMEOUT_REASON).catch(() => undefined);
  if (outcome === "output") return { kind: "output", response };

  if (outcome === "budget") {
    void response.body?.cancel(COMBO_PER_MODEL_TIMEOUT_REASON).catch(() => undefined);
  }
  return { kind: "stalled", reason: outcome };
}
