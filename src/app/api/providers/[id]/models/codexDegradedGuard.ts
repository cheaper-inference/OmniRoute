// #16714: when the Codex client-version refresh failed (source "fallback"), the backend may hide
// models gated behind a newer client. A live list that is a strict subset of the connection's
// stored catalog is then not trustworthy enough to replace it. Healthy sources (override,
// registry, pinned) stay authoritative.

type IdModel = { id?: unknown };

export function shouldKeepStoredCodexCatalog(
  versionSource: string,
  liveModels: readonly IdModel[],
  storedModels: readonly IdModel[]
): boolean {
  if (versionSource !== "fallback" || storedModels.length === 0) return false;
  const liveIds = new Set(liveModels.map((model) => model.id));
  return storedModels.some((model) => !liveIds.has(model.id));
}
