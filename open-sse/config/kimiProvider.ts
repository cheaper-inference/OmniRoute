/** Only the Moonshot Open Platform API was consolidated; Coding and Web are separate. */
export function canonicalKimiProvider(provider: string): string {
  return provider === "moonshot" ? "kimi" : provider;
}

export function canonicalKimiModel(model: string): string {
  return model.startsWith("moonshot/") ? "kimi/" + model.slice(9) : model;
}

/** API-context check only; the shared search/base-ID blocking rules remain separate. */
export function isKimiApiProviderBlocked(provider: string, blocked: unknown): boolean {
  if (canonicalKimiProvider(provider) !== "kimi") return false;
  const has = (id: string) =>
    blocked instanceof Set ? blocked.has(id) : Array.isArray(blocked) && blocked.includes(id);
  return has("kimi") || has("moonshot");
}
