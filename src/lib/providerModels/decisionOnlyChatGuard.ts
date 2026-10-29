import { isSystemOneProvider } from "@omniroute/open-sse/config/systemOneRegistry.ts";
import { getModelEndpointDecision } from "@omniroute/open-sse/services/modelEndpointPolicy.ts";
import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import type { SyncedAvailableModel } from "@/lib/db/models";

type ModelInfoLike = {
  provider?: string | null;
  model?: string | null;
  /** Endpoints from the catalog row model resolution already loaded. */
  supportedEndpoints?: readonly string[] | null;
};

/**
 * Decision-only models are rejected before a chat connection is selected. The endpoints
 * come from the metadata model resolution already read; `readModels` is consulted only
 * when a caller passes no metadata for a decision-capable provider.
 */
export async function decisionOnlyChatRejection(
  info: ModelInfoLike,
  readModels?: (provider: string) => Promise<SyncedAvailableModel[]>
): Promise<Response | null> {
  const provider = info.provider || "";
  const model = info.model || "";
  if (!model || !isSystemOneProvider(provider)) return null;
  let endpoints = info.supportedEndpoints ?? undefined;
  if (!endpoints && provider !== "typesafe" && readModels) {
    const row = (await readModels(provider)).find(
      (candidate) => candidate.id.replace(/^~/, "") === model.replace(/^~/, "")
    );
    endpoints = row?.supportedEndpoints;
  }
  if (getModelEndpointDecision(provider, model, endpoints).kind !== "decision") return null;
  return errorResponse(
    400,
    `Model ${provider}/${model} is decision-only; use /v1/systemone instead of chat completions`
  );
}
