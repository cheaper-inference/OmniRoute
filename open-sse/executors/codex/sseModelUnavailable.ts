/**
 * Model-unavailable classification for the Codex SSE peek
 * (`peekCodexSseTransientError()` in ../codex.ts).
 *
 * ChatGPT-plan Codex accounts can reject a model with an HTTP 200
 * text/event-stream whose first meaningful event is `response.failed` / `error`
 * saying "The configured model is unavailable from the provider — it may have
 * been renamed, retired, or is not offered on this account." That failure is
 * model + account scoped, so the executor turns it into a model-scoped 400
 * (combo advances, the model is locked on this connection) instead of the 503
 * used for capacity errors (a provider-breaker status).
 *
 * Only the error message of complete error frames is matched — output text that
 * happens to quote the phrase is never classified.
 */

export const CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS = [
  "configured model is unavailable from the provider",
  "not offered on this account",
] as const;

const ERROR_EVENT_TYPES = new Set(["error", "response.failed"]);

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function errorFrameMessage(frame: string): string | null {
  let eventName = "";
  const dataLines: string[] = [];
  for (const line of frame.split(/\r?\n/)) {
    if (line.startsWith("event:")) eventName = line.slice(6).trim();
    else if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
  }
  let payload: Record<string, unknown> | null = null;
  try {
    payload = asRecord(JSON.parse(dataLines.join("\n")));
  } catch {
    return null;
  }
  if (!payload) return null;
  const directError = asRecord(payload.error);
  const nestedError = asRecord(asRecord(payload.response)?.error);
  const type = typeof payload.type === "string" ? payload.type : eventName;
  if (!ERROR_EVENT_TYPES.has(type) && !directError) return null;
  const message = directError?.message ?? nestedError?.message ?? payload.message;
  return typeof message === "string" ? message : null;
}

/**
 * The matched pattern when a complete peeked error frame reports the model as
 * unavailable. `streamEnded` also parses the trailing frame (an upstream that
 * closes without the final blank line); otherwise it is an unfinished frame.
 */
export function matchCodexSseModelUnavailable(text: string, streamEnded = false): string | null {
  const frames = text.split(/\r?\n\r?\n/);
  for (const frame of streamEnded ? frames : frames.slice(0, -1)) {
    const message = errorFrameMessage(frame)?.toLowerCase();
    if (!message) continue;
    const hit = CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS.find((pattern) => message.includes(pattern));
    if (hit) return hit;
  }
  return null;
}

export function isCodexSseModelUnavailableMatch(matched: string | null | undefined): boolean {
  return CODEX_SSE_MODEL_UNAVAILABLE_PATTERNS.some((pattern) => pattern === matched);
}
