import { getAllSyncedAvailableModels } from "@/lib/db/models";
import { enrichCursorCatalog, getActiveSyncedCatalog } from "@/lib/db/models/activeSyncedCatalog";
import { isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * GET /api/synced-available-models?provider=<id>
 * List synced available models for a provider (or all providers).
 */
export async function GET(request: Request) {
  try {
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    if (provider) {
      // The dashboard merges operator-owned custom rows separately. Do not let
      // legacy imports act as evidence that a model still exists upstream.
      // `liveCatalog` is the catalog request dispatch gates on (custom rows included,
      // as in lookupModelMeta), so the dashboard's "Not in live catalog" flag decides
      // authority with the runtime's own inputs (#20065) without changing the listing.
      const [catalog, runtimeCatalog] = await Promise.all([
        getActiveSyncedCatalog(provider, false),
        getActiveSyncedCatalog(provider),
      ]);
      return Response.json({
        ...catalog,
        models: enrichCursorCatalog(provider, catalog.models),
        liveCatalog: {
          authoritative: runtimeCatalog.authoritative,
          modelIds: runtimeCatalog.models.map((model) => model.id),
        },
      });
    }

    const allModels = await getAllSyncedAvailableModels();
    return Response.json(allModels);
  } catch {
    return Response.json(
      { error: { message: "Failed to fetch synced available models", type: "server_error" } },
      { status: 500 }
    );
  }
}
