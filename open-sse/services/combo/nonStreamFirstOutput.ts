/**
 * First output for NON-streamed combo targets.
 *
 * A combo gives each target a budget (`targetTimeoutMs`, 120 s by default). For a streamed
 * request that budget only covers the wait for the first output (firstOutputStream.ts). For a
 * non-streamed request the target's call returns only once the whole answer is assembled, so
 * the same budget used to cut any answer that takes longer to write, on every target in turn.
 *
 * The fix has three parts, all keyed on the hook the per-target timer hands its target
 * (targetTimeoutRunner.ts):
 * 1. The dispatch copies the hook into `clientRawRequest` (src/sse/handlers/chat/clientRawRequest.ts).
 * 2. chatCore streams a non-streamed Claude-format target from the upstream
 *    (`shouldStreamUpstreamForFirstOutput`) and assembles the JSON answer from the stream, the
 *    same path forceStream providers already use.
 * 3. The non-streaming body reader reports the first event that carries output
 *    (`observeUpstreamFirstOutput`); the timer then stops for that target.
 * A target that never produces output is still cut at the budget.
 */
import { FORMATS } from "../../translator/formats.ts";
import { SseOutputScanner, isEventStreamResponse } from "./firstOutputStream.ts";

/** What the per-target timer passes to its target so the dispatch can report first output. */
export type ComboFirstOutputHook = { onFirstOutput: () => void };

/** The hook copied into `clientRawRequest` by the dispatch, or null outside a timed combo target. */
export function getComboFirstOutputHook(clientRawRequest: unknown): (() => void) | null {
  if (!clientRawRequest || typeof clientRawRequest !== "object") return null;
  const hook = (clientRawRequest as { comboFirstOutput?: unknown }).comboFirstOutput;
  if (!hook || typeof hook !== "object") return null;
  const onFirstOutput = (hook as { onFirstOutput?: unknown }).onFirstOutput;
  return typeof onFirstOutput === "function" ? (onFirstOutput as () => void) : null;
}

/**
 * Whether chatCore should stream this request from the upstream only so first output can be
 * observed. Limited to Claude-format targets: their streamed answer is assembled back into JSON
 * by the existing non-streaming reader, and Anthropic picks streaming from the body's `stream`
 * field, which the caller sets. Upstreams that already stream need no change.
 */
export function shouldStreamUpstreamForFirstOutput(options: {
  stream: boolean;
  upstreamStream: boolean;
  targetFormat: string;
  onFirstOutput: (() => void) | null;
}): boolean {
  return (
    !options.stream &&
    !options.upstreamStream &&
    options.targetFormat === FORMATS.CLAUDE &&
    typeof options.onFirstOutput === "function"
  );
}

/**
 * Return `response` with a body that calls `onFirstOutput` once, when the first event carrying
 * output (text, tool input, or upstream thinking) passes through. Bytes pass through unchanged
 * and cancelling the returned body cancels the upstream body. Non-SSE responses are returned as
 * they are: a JSON body only arrives when the answer is complete, so there is nothing to report.
 */
export function observeUpstreamFirstOutput(
  response: Response,
  onFirstOutput: () => void
): Response {
  if (!isEventStreamResponse(response)) return response;

  const scanner = new SseOutputScanner();
  const decoder = new TextDecoder();
  let reported = false;
  const report = () => {
    if (reported) return;
    reported = true;
    try {
      onFirstOutput();
    } catch {
      // The timer's bookkeeping must never break the body read.
    }
  };

  const observer = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      if (!reported) {
        const sawOutput = scanner.push(decoder.decode(chunk, { stream: true }));
        if (sawOutput || scanner.reasoningActivity() || scanner.overflowedWithoutOutput()) {
          report();
        }
      }
      controller.enqueue(chunk);
    },
    flush() {
      if (!reported && (scanner.flush() || scanner.reasoningActivity())) report();
    },
  });

  return new Response(response.body!.pipeThrough(observer), {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
