/**
 * Bridge to the quota window ping scheduler's refresh function.
 *
 * `runtimeSettings` is part of the dashboard typecheck program, and importing the
 * scheduler from it (even dynamically) drags runner -> open-sse executors into that
 * program, where two pre-existing executor type errors become new gate regressions.
 * The boot code in `instrumentation-node.ts` imports the scheduler and registers it
 * here, so a settings write crosses only this dependency-free seam.
 *
 * globalThis, not a module local: Next.js chunks do not share module state (same
 * reason as the authz-bypass store in runtimeSettings, #13995).
 */
type QuotaWindowPingRefreshHandler = () => Promise<void>;

const HANDLER_GLOBAL_KEY = "__omniroute_quotaWindowPingRefresh__";
const handlerStore = globalThis as unknown as Record<
  string,
  QuotaWindowPingRefreshHandler | null | undefined
>;

/** Registered by instrumentation-node at boot; null clears (tests). */
export function registerQuotaWindowPingRefresh(
  handler: QuotaWindowPingRefreshHandler | null
): void {
  handlerStore[HANDLER_GLOBAL_KEY] = handler;
}

/** Called on every settings write; a no-op when the scheduler was never booted. */
export async function refreshQuotaWindowPingFromSettings(): Promise<void> {
  await handlerStore[HANDLER_GLOBAL_KEY]?.().catch(() => undefined);
}
