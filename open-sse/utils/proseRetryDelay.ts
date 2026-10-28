/**
 * Parse Antigravity error message to extract retry time
 * Example: "You have exhausted your capacity on this model. Your quota will reset after 2h7m23s."
 * @param {string} message - Error message
 * @returns {number|null} Retry time in milliseconds, or null if not found
 */
export function parseAntigravityRetryTime(message: unknown): number | null {
  if (typeof message !== "string") return null;

  // Match patterns like: 2h7m23s, 5m30s, 45s, 1h20m, etc.
  const match = message.match(/reset after (\d+h)?(\d+m)?(\d+s)?/i);
  if (!match) return null;

  let totalMs = 0;

  // Extract hours
  if (match[1]) {
    const hours = parseInt(match[1]);
    totalMs += hours * 60 * 60 * 1000;
  }

  // Extract minutes
  if (match[2]) {
    const minutes = parseInt(match[2]);
    totalMs += minutes * 60 * 1000;
  }

  // Extract seconds
  if (match[3]) {
    const seconds = parseInt(match[3]);
    totalMs += seconds * 1000;
  }

  return totalMs > 0 ? totalMs : null;
}

const MAX_PROSE_RETRY_MS = 24 * 60 * 60 * 1000;

/**
 * Retry delay in ms from upstream error prose (Antigravity "reset after 2h7m23s",
 * generic "retry after 30s"), capped at 24h; null when the text carries no hint.
 */
export function parseProseRetryDelayMs(text: unknown): number | null {
  if (typeof text !== "string" || text === "") return null;
  const antigravityMs = parseAntigravityRetryTime(text);
  if (antigravityMs) return Math.min(antigravityMs, MAX_PROSE_RETRY_MS);
  const m = /retry\s+after\s+(\d{1,9})\s*s/i.exec(text);
  const ms = m ? Number.parseInt(m[1], 10) * 1000 : 0;
  return ms > 0 ? Math.min(ms, MAX_PROSE_RETRY_MS) : null;
}
