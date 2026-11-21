import type { LocalEndpoint, MetadataRecord } from "./types.ts";

export type EnrichedEndpoint = {
  endpoint: LocalEndpoint;
  metadata: MetadataRecord | null;
};

function candidates(modelId: string): string[] {
  const bare = modelId.slice(modelId.lastIndexOf("/") + 1);
  return [modelId, bare];
}

export function enrichLocalEndpoints(
  endpoints: LocalEndpoint[],
  metadata: MetadataRecord[],
): EnrichedEndpoint[] {
  const byId = new Map<string, MetadataRecord>();
  for (const record of metadata) {
    if (!byId.has(record.modelId)) byId.set(record.modelId, record);
  }
  return endpoints.map((endpoint) => ({
    endpoint,
    metadata:
      candidates(endpoint.modelId)
        .map((id) => byId.get(id))
        .find(Boolean) ?? null,
  }));
}
