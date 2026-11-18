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
// Matched case-insensitively and trimmed, and only as the WHOLE output — an
// answer that quotes it and continues is legitimate and passes through untouched.
export const CODEX_OVERLOADED_OUTPUT_MESSAGE =
  "Our servers are currently overloaded. Please try again later.";
export const CODEX_OVERLOADED_OUTPUT_MATCH = "codex_overloaded_output";
