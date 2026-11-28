import { resolveProviderId } from "@/shared/constants/providers";
import { ZCODE_PROVIDERS } from "@/shared/constants/zcodeProviders";

type QuotaEntryReader = (connectionId: string) => { provider?: string } | null | undefined;
type QuotaSnapshotScopeRow = { provider?: string | null; window_key?: string | null };

function tariff(provider: string | undefined): "start" | "individual" | null {
  const id = resolveProviderId(provider || "");
  if (["zcode-start", "zcode-cn-start"].includes(id)) return "start";
  if (["zcode-individual", "zcode-cn-individual"].includes(id)) return "individual";
  return null;
}

export function isZcodeQuotaScopeApplicable(
  provider: string,
  authType: string | null | undefined,
  observedProvider: string | undefined
): boolean {
  if (authType !== "oauth" || observedProvider === undefined) return true;
  const target = resolveProviderId(provider);
  const plan = target === "zcode" ? "start" : tariff(target);
  return plan === null || tariff(observedProvider) === plan;
}

/** Collapse hydrated snapshots that mix ZCode tariff scopes onto the shared "zcode" scope. */
export function resolveSnapshotQuotaProvider(
  provider: string,
  snapshots: readonly QuotaSnapshotScopeRow[]
): string {
  const scopes = snapshotQuotaScopes(snapshots);
  const mixedZcode =
    scopes.size > 1 && [...scopes].some((scope) => scope === "zcode" || tariff(scope) !== null);
  return mixedZcode ? "zcode" : provider;
}

/**
 * Build the request-time scope check: a cached ZCode OAuth observation only applies to the
 * tariff it was recorded for. Non-ZCode providers and non-OAuth connections always apply.
 */
export function createQuotaScopeCheck(readEntry: QuotaEntryReader) {
  return (connectionId: string, provider: string, authType?: string | null): boolean => {
    if (authType !== "oauth" || !ZCODE_PROVIDERS.has(resolveProviderId(provider))) return true;
    return isZcodeQuotaScopeApplicable(provider, authType, readEntry(connectionId)?.provider);
  };
}

/** Provider scopes of the hydratable snapshots (rows with a window key). */
function snapshotQuotaScopes(snapshots: readonly QuotaSnapshotScopeRow[]): Set<string> {
  const scopes = new Set<string>();
  for (const snapshot of snapshots) {
    const row = snapshot as QuotaSnapshotScopeRow & { windowKey?: string };
    if (row.windowKey ?? row.window_key) scopes.add(resolveProviderId(row.provider || ""));
  }
  return scopes;
}
