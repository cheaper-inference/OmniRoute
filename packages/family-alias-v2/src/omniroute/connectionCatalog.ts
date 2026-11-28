import type { BillingClass, LocalEndpoint } from "../types.ts";

export type ConnectionPolicy = Record<
  string,
  { billingClass: BillingClass; enabled?: boolean }
>;

type ConnectionRecord = {
  id?: unknown;
  provider?: unknown;
  isActive?: unknown;
};

function headers(apiKey: string): HeadersInit {
  return {
    Authorization: `Bearer ${apiKey}`,
    "x-api-key": apiKey,
    Accept: "application/json",
  };
}

function modelIds(payload: unknown): string[] {
  const root = payload as {
    models?: unknown;
    data?: unknown;
    availableModels?: unknown;
  };
  const items = Array.isArray(payload)
    ? payload
    : Array.isArray(root.models)
      ? root.models
      : Array.isArray(root.data)
        ? root.data
        : Array.isArray(root.availableModels)
          ? root.availableModels
          : [];
  return items
    .map((item) => {
      if (typeof item === "string") return item;
      if (!item || typeof item !== "object") return "";
      const record = item as Record<string, unknown>;
      return String(record.id || record.name || record.model || "");
    })
    .filter(Boolean);
}

export async function collectConnectionCatalog(opts: {
  baseUrl: string;
  apiKey: string;
  policy: ConnectionPolicy;
  fetchImpl?: typeof fetch;
}): Promise<LocalEndpoint[]> {
  const fetchImpl = opts.fetchImpl ?? fetch;
  const base = opts.baseUrl.replace(/\/$/, "");
  const response = await fetchImpl(`${base}/api/providers`, {
    headers: headers(opts.apiKey),
  });
  if (!response.ok) {
    throw new Error(`GET /api/providers failed: ${response.status}`);
  }
  const payload = (await response.json()) as {
    connections?: ConnectionRecord[];
  };
  const connections = payload.connections ?? [];
  const endpoints: LocalEndpoint[] = [];

  for (const connection of connections) {
    const connectionId = String(connection.id || "");
    const providerId = String(connection.provider || "");
    const policy = opts.policy[connectionId];
    if (!connectionId || !providerId || connection.isActive !== true) continue;
    if (!policy || policy.enabled === false) continue;

    const modelsResponse = await fetchImpl(
      `${base}/api/providers/${encodeURIComponent(connectionId)}/models`,
      { headers: headers(opts.apiKey) },
    );
    if (!modelsResponse.ok) {
      throw new Error(
        `GET /api/providers/${connectionId}/models failed: ${modelsResponse.status}`,
      );
    }
    const models = modelIds(await modelsResponse.json());
    for (const modelId of models) {
      endpoints.push({
        connectionId,
        providerId,
        modelId,
        billingClass: policy.billingClass,
        active: true,
      });
    }
  }

  return endpoints;
}
