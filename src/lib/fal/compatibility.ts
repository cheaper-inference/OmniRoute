import { FalClient } from "@omniroute/open-sse/handlers/fal/client";
import { falCompatibilityInput, type FalRecord } from "@omniroute/open-sse/handlers/fal/schema";
import { getFalDefinition, saveFalDefinition } from "@/lib/db/fal";

/** Used after the compatibility route has selected its scoped credentials. */
export async function prepareFalCompatibility(
  endpoint: string,
  body: FalRecord,
  credentials: { apiKey?: unknown; accessToken?: unknown; connectionId?: unknown },
  signal?: AbortSignal
) {
  const connectionId =
    typeof credentials.connectionId === "string" ? credentials.connectionId : null;
  const cached = connectionId ? getFalDefinition(connectionId, endpoint) : null;
  const definition =
    cached ??
    (await new FalClient(String(credentials.apiKey || credentials.accessToken || "")).definition(
      endpoint,
      signal
    ));
  if (!cached && connectionId) saveFalDefinition(connectionId, definition);
  return falCompatibilityInput(body, definition);
}
