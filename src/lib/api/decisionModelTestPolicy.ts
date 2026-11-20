import { resolveDecisionProtocol } from "@/shared/constants/decisionProtocol";
import { getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";

/** The chat health probe must never be sent to a native decision-only model. */
export async function nativeDecisionTestEndpoint(
  provider: string,
  model: string,
  metadata: Record<string, unknown> | null,
  nodeType: string | undefined
): Promise<string | null> {
  if (provider === "supersoniclabs") return "/v1/systemone";
  const bare = model.slice(model.indexOf("/") + 1);
  const row =
    metadata ||
    (await getActiveSyncedCatalog(provider)).models.find(
      (entry) => entry.id === bare || entry.id === model
    );
  const format = resolveDecisionProtocol({ ...row, id: model }, nodeType);
  return format ? `/v1/${format}` : null;
}
