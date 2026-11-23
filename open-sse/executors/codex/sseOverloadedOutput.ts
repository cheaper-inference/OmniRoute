/**
 * Fake-200 classification helpers for the Codex SSE peek
 * (`peekCodexSseTransientError()` in ../codex.ts).
 *
 * Codex sometimes disguises overload as a "successful" 200 text/event-stream
 * whose ONLY output text is a fixed sentence (decolua/9router#3232). These
 * helpers let the peek keep buffering while the output seen so far could still
 * be that sentence, classify a stream whose whole output IS the sentence as a
 * transient failure, and derive the human-readable message for the 503 body.
 */
import { scanCodexSseOutputText } from "./ssePeekProgress.ts";

// Matched case-insensitively and trimmed, and only as the WHOLE output — an
// answer that quotes it and continues is legitimate and passes through untouched.
export const CODEX_OVERLOADED_OUTPUT_MESSAGE =
  "Our servers are currently overloaded. Please try again later.";
export const CODEX_OVERLOADED_OUTPUT_MATCH = "codex_overloaded_output";

const NORMALIZED_OVERLOADED_MESSAGE = normalizeCodexOutputText(CODEX_OVERLOADED_OUTPUT_MESSAGE);

function normalizeCodexOutputText(text: string): string {
  return text.trim().toLowerCase();
}

/**
 * Peek-loop decision for the fake-200 overload. Returns:
 * - `"wait"`: the output text seen so far is still a prefix of the overload
 *   sentence (it may be split across frames) — keep peeking;
 * - `"settled"`: same, but `response.completed` arrived — stop peeking;
 * - `null`: not an overload candidate — fall through to the normal checks.
 */
export function codexOverloadedOutputPeekStep(text: string): "wait" | "settled" | null {
  const scan = scanCodexSseOutputText(text);
  if (!scan.outputText.trim() || scan.otherProgress) return null;
  if (!NORMALIZED_OVERLOADED_MESSAGE.startsWith(normalizeCodexOutputText(scan.outputText))) {
    return null;
  }
  return scan.completed ? "settled" : "wait";
}

/** The overload match id when the peeked stream's WHOLE output is the overload sentence. */
export function matchCodexOverloadedOutput(text: string): string | null {
  const scan = scanCodexSseOutputText(text);
  const isOverload =
    !scan.otherProgress &&
    normalizeCodexOutputText(scan.outputText) === NORMALIZED_OVERLOADED_MESSAGE;
  return isOverload ? CODEX_OVERLOADED_OUTPUT_MATCH : null;
}

/**
 * Best-effort extraction of the human-readable error message from a peeked SSE
 * chunk, so the resulting 503 body carries something more useful than the raw
 * pattern that matched. Falls back to the matched pattern when no structured
 * `data:` payload could be parsed. The fake-200 overload carries no error
 * payload, so it maps straight to the overload sentence.
 */
export function extractCodexSseErrorMessage(text: string, fallback: string): string {
  if (fallback === CODEX_OVERLOADED_OUTPUT_MATCH) return CODEX_OVERLOADED_OUTPUT_MESSAGE;
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("data:")) continue;
    const data = line.slice("data:".length).trim();
    if (!data || data === "[DONE]") continue;
    try {
      const parsed = JSON.parse(data) as Record<string, unknown>;
      const directError = parsed.error as Record<string, unknown> | undefined;
      const nestedError = (parsed.response as Record<string, unknown> | undefined)?.error as
        Record<string, unknown> | undefined;
      const message =
        (typeof directError?.message === "string" && directError.message) ||
        (typeof nestedError?.message === "string" && nestedError.message) ||
        (typeof parsed.message === "string" && parsed.message);
      if (message) return message;
    } catch {
      // Non-JSON SSE data line — keep scanning subsequent lines.
    }
  }
  return fallback;
}
