/** Explicit native catalog read for one selected connection; never performs inference. */
import {
  handleSystemOneModels,
  type SystemOneCatalogConnection,
} from "@omniroute/open-sse/handlers/systemOneModels";
import {
  isSystemOneProvider,
  systemOneBackend,
} from "@omniroute/open-sse/config/systemOneRegistry";
import { errorResponse } from "@omniroute/open-sse/utils/error";
import { getModelIsHidden } from "@/lib/db/models";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isModelSyncInternalRequest } from "@/shared/services/modelSyncScheduler";

type CatalogEntry = Record<string, unknown> & {
  id: string;
  root: string;
  supported_endpoints?: string[];
};

export async function getNativeDecisionProviderModels(
  request: Request,
  connection: SystemOneCatalogConnection,
  excludeHidden: boolean
): Promise<Response> {
  if (!(await isAuthenticated(request)) && !isModelSyncInternalRequest(request)) {
    return errorResponse(401, "Authentication required");
  }
  if (!isSystemOneProvider(connection.provider))
    return errorResponse(400, "Provider has no native decision adapter");
  if (!systemOneBackend(connection.provider).modelsUrl) {
    return errorResponse(
      501,
      "This native decision adapter has no verified remote catalog; add a documented model explicitly"
    );
  }
  const response = await handleSystemOneModels(
    {
      allowedConnections: [connection.id],
      signal: request.signal,
    },
    { listConnections: async () => [connection] }
  );
  if (!response.ok) return response;
  const body = (await response.json()) as { data?: CatalogEntry[] };
  if (response.headers.get("X-OmniRoute-Catalog-Status") !== "complete") {
    return errorResponse(503, "The selected connection has no complete native model catalog");
  }
  const models = (body.data ?? [])
    .filter(
      (row) =>
        !excludeHidden ||
        (!getModelIsHidden(connection.provider, row.root) &&
          !getModelIsHidden(connection.provider, row.root, "decision"))
    )
    .map((row) => ({
      ...row,
      id: row.root,
      name: typeof row.name === "string" ? row.name : row.root,
      ...(row.supported_endpoints?.includes("chat") ||
      row.supported_endpoints?.includes("responses")
        ? {}
        : { apiFormat: "systemone", modelType: "decision" }),
      supportedEndpoints: row.supported_endpoints ?? ["systemone"],
      endpointCapabilitySource: "declared",
    }));
  return Response.json(
    {
      provider: connection.provider,
      connectionId: connection.id,
      models,
      source: "upstream",
      inferenceAccess: "unverified",
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
