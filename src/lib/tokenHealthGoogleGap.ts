/**
 * Opt-in spacing between background token refreshes of Google OAuth accounts.
 * The health sweep refreshes expiring accounts in concurrent batches; Google
 * accounts that refresh together can trip anti-abuse limits.
 *
 * BG_REFRESH_GOOGLE_DELAY_MS = base gap in ms (unset or 0 = off). Each refresh
 * start is at least base + up to base/3 of jitter after the previous one
 * (12 s base gives up to 4 s of jitter).
 * shortcut: one in-process slot clock, not shared across replicas; upgrade if
 * replicas must coordinate.
 */
const GOOGLE_BG_REFRESH_PROVIDERS = new Set(["antigravity", "gemini-cli"]);

let nextSlotAt = 0;

export async function waitForGoogleRefreshSlot(provider: string | null | undefined): Promise<void> {
  const baseMs = Number(process.env.BG_REFRESH_GOOGLE_DELAY_MS);
  if (!(baseMs > 0) || !GOOGLE_BG_REFRESH_PROVIDERS.has(String(provider || "").toLowerCase())) {
    return;
  }
  const now = Date.now();
  const startAt = Math.max(now, nextSlotAt);
  // Reserve the next slot before awaiting so concurrent callers queue behind each other.
  nextSlotAt = startAt + baseMs + Math.random() * (baseMs / 3);
  if (startAt > now) await new Promise((resolve) => setTimeout(resolve, startAt - now));
}
