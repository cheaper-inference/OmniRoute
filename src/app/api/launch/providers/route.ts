import { launchError, launchJson, resolveLaunchCaller, unauthorized } from "../launchRouteHelpers";
import { buildConnectedProviders } from "./connectedProviders";

export const dynamic = "force-dynamic";

type ConnectionRow = Parameters<
  typeof import("@/lib/db/providers/lazyConnectionView").createLazyConnectionView
>[0];

/**
 * `GET /api/launch/providers`: the providers with an active stored credential (API key or OAuth
 * connection) and every id prefix the `/v1/models` catalog uses for their rows, so the launch
 * CLI can offer only models the user can actually call. Authenticated like capabilities; cheap
 * (cached connection and node reads, no catalog build, no upstream calls). Exposes provider ids
 * and prefixes only, never connection ids, names, emails or secrets.
 */
export async function GET(request: Request) {
  const caller = await resolveLaunchCaller(request);
  if (!caller) return unauthorized();
  try {
    const { getCachedRawProviderConnections, getCachedProviderNodes } =
      await import("@/lib/db/readCache");
    const { createLazyConnectionView } = await import("@/lib/db/providers/lazyConnectionView");
    const { getSettings } = await import("@/lib/db/settings");
    const [rows, nodes, settings] = await Promise.all([
      getCachedRawProviderConnections(),
      getCachedProviderNodes(),
      getSettings(),
    ]);
    const connections = (rows as ConnectionRow[]).map(createLazyConnectionView);
    return launchJson(buildConnectedProviders(connections, nodes, settings?.blockedProviders));
  } catch {
    return launchError(500, "Could not list connected providers", "internal_error");
  }
}
