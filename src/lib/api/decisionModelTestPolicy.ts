import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";

/** The chat health probe must never be sent to a native decision-only model. */
export async function nativeDecisionTestEndpoint(
  provider: string,
  model: string,
  metadata: Record<string, unknown> | null,
  nodeType: string | undefined
): Promise<string | null> {
  const bare = model.slice(model.indexOf("/") + 1);
  const row =
    metadata ||
    (await getActiveSyncedCatalog(provider)).models.find(
      (entry) => entry.id === bare || entry.id === model
    );
  const endpoints = Array.isArray(row?.supportedEndpoints) ? row.supportedEndpoints : [];
  if (endpoints.includes("systemone") || nodeType === "systemone") return "/v1/systemone";
  if (endpoints.includes("decisions") || nodeType === "decisions") return "/v1/decisions";
  return null;
}
