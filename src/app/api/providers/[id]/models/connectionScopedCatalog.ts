/**
 * Providers whose synced catalog belongs to one API key, not the provider.
 *
 * JZS Token Standard and Dedicated keys list mutually exclusive models. The
 * connection-test selector must keep that split: another connection's synced
 * rows are not a fallback, and an empty cache with auto-fetch disabled stays
 * empty without a fetch or a settings change.
 */
const CONNECTION_SCOPED_SYNCED_CATALOG = new Set(["jzstoken"]);

export function usesConnectionScopedSyncedCatalog(provider: string): boolean {
  return CONNECTION_SCOPED_SYNCED_CATALOG.has(provider);
}
