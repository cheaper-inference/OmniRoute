import type { MetadataRecord } from "../types.ts";

export function transformModelsDev(payload: unknown): MetadataRecord[] {
  const providers = payload as Record<
    string,
    { id?: string; models?: Record<string, Record<string, unknown>> }
  >;
  const out: MetadataRecord[] = [];
  for (const [providerKey, provider] of Object.entries(providers || {})) {
    const providerId = provider.id || providerKey;
    for (const [modelKey, model] of Object.entries(provider.models || {})) {
      const modelId = String(model.id || modelKey);
      out.push({
        modelId,
        familyId:
          typeof model.family === "string" ? `${providerId}/${model.family}` : null,
        releaseDate:
          typeof model.release_date === "string" ? model.release_date : null,
        created: null,
        contextWindow:
          typeof model.limit === "number"
            ? model.limit
            : typeof (model.limit as { context?: unknown } | undefined)?.context ===
                "number"
              ? ((model.limit as { context: number }).context ?? null)
              : null,
      });
    }
  }
  return out;
}
