import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

/**
 * #17933: `codex-search` spends the ChatGPT subscription quota of a connected Codex
 * account. An operator who connected Codex only for chat must not start paying for
 * search silently, so automatic selection (last-resort primary pick and failover
 * alternate) is opt-in behind this flag. An explicit `provider: "codex-search"`
 * request is never affected.
 */
export const CODEX_SEARCH_AUTO_FALLBACK_FLAG = "CODEX_SEARCH_AUTO_FALLBACK_ENABLED";

const CODEX_SEARCH_PROVIDER_ID = "codex-search";

export function isCodexSearchAutoFallbackEnabled(): boolean {
  try {
    return isFeatureFlagEnabled(CODEX_SEARCH_AUTO_FALLBACK_FLAG);
  } catch {
    // Unreadable flag store fails closed: never spend subscription quota implicitly.
    return false;
  }
}

/**
 * Order the fallback-only providers an automatic search may try. With the flag off
 * `codex-search` is dropped; with it on, it is tried first (a credentialed last
 * resort ahead of the keyless ones). `compare` orders the rest; the sort is stable,
 * so omitting it keeps the input order.
 */
export function orderAutoSearchFallbacks<T extends { id: string }>(
  providers: readonly T[],
  compare?: (a: T, b: T) => number
): T[] {
  if (!isCodexSearchAutoFallbackEnabled()) {
    const rest = providers.filter((provider) => provider.id !== CODEX_SEARCH_PROVIDER_ID);
    return compare ? rest.sort(compare) : rest;
  }
  const codexFirst = (a: T, b: T) =>
    Number(b.id === CODEX_SEARCH_PROVIDER_ID) - Number(a.id === CODEX_SEARCH_PROVIDER_ID);
  return [...providers].sort((a, b) => codexFirst(a, b) || (compare ? compare(a, b) : 0));
}
