import { FalClient } from "./client.ts";
import { falCompatibilityInput, type FalDefinition, type FalRecord } from "./schema.ts";

export type FalCompatibilityCredentials = {
  apiKey?: unknown;
  accessToken?: unknown;
  connectionId?: unknown;
};

export type FalDefinitionStore = {
  get: (connectionId: string, endpoint: string) => FalDefinition | null;
  save: (connectionId: string, definition: FalDefinition) => unknown;
};

/** App routes may inject a connection-scoped cache; standalone engine callers discover schemas. */
export async function prepareFalCompatibility(
  endpoint: string,
  body: FalRecord,
  credentials: FalCompatibilityCredentials,
  signal?: AbortSignal,
  store?: FalDefinitionStore
) {
  const connectionId =
    typeof credentials.connectionId === "string" ? credentials.connectionId : null;
  const cached = connectionId && store ? store.get(connectionId, endpoint) : null;
  const definition =
    cached ??
    (await new FalClient(String(credentials.apiKey || credentials.accessToken || "")).definition(
      endpoint,
      signal
    ));
  if (!cached && connectionId && store) store.save(connectionId, definition);
  return falCompatibilityInput(body, definition);
}

export type PrepareFalInput = typeof prepareFalCompatibility;
