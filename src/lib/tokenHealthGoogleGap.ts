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
const GOOGLE_BG_REFRESH_PROVIDERS = new Set(["antigravity", "agy", "gemini", "gemini-cli"]);

// Grants are serialized: each refresh waits for the previous grant, then for the gap measured
// from that grant's actual start. A host sleep that makes several waits overdue therefore still
// starts them a gap apart instead of all at once.
let chain: Promise<void> = Promise.resolve();
let lastGrantAt = 0;

export async function waitForGoogleRefreshSlot(provider: string | null | undefined): Promise<void> {
  const baseMs = Number(process.env.BG_REFRESH_GOOGLE_DELAY_MS);
  if (!(baseMs > 0) || !GOOGLE_BG_REFRESH_PROVIDERS.has(String(provider || "").toLowerCase())) {
    return;
  }
  const turn = chain.then(async () => {
    const gapMs = baseMs + Math.random() * (baseMs / 3);
    const waitMs = lastGrantAt > 0 ? lastGrantAt + gapMs - Date.now() : 0;
    if (waitMs > 0) await new Promise((resolve) => setTimeout(resolve, waitMs));
    lastGrantAt = Date.now();
  });
  chain = turn.catch(() => {});
  return turn;
}

/** Test hook: forget the previous grant. */
export function __resetGoogleRefreshSlotsForTests(): void {
  chain = Promise.resolve();
  lastGrantAt = 0;
}
