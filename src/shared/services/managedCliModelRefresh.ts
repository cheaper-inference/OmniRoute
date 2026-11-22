/** Browser-side discovery uses the existing authenticated provider API and its catalog safeguards. */
export interface ManagedCliModelRefreshResult {
  attempted: number;
  refreshed: number;
  failed: number;
}

const PROVIDERS_BY_TOOL: Readonly<Record<string, readonly string[]>> = {
  codex: ["codex"],
  claude: ["claude"],
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

async function fetchJson(
  url: string,
  fetchImpl: typeof fetch,
  signal?: AbortSignal
): Promise<Record<string, unknown>> {
  signal?.throwIfAborted();
  const controller = new AbortController();
  const abort = () => controller.abort(signal?.reason);
  signal?.addEventListener("abort", abort, { once: true });
  const timer = setTimeout(() => controller.abort(), 30_000);
  try {
    const response = await fetchImpl(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error("Model discovery request failed");
    return asRecord(await response.json());
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abort);
  }
}

export async function refreshManagedCliProviderModels(
  toolId: string,
  fetchImpl: typeof fetch = fetch,
  options: { signal?: AbortSignal } = {}
): Promise<ManagedCliModelRefreshResult> {
  const result = { attempted: 0, refreshed: 0, failed: 0 };
  const providers = PROVIDERS_BY_TOOL[toolId];
  if (!providers) return result;
  options.signal?.throwIfAborted();

  let data: Record<string, unknown>;
  try {
    data = await fetchJson("/api/providers", fetchImpl, options.signal);
    if (!Array.isArray(data.connections)) throw new Error("Invalid provider response");
  } catch {
    options.signal?.throwIfAborted();
    throw new Error("Unable to load provider connections for model refresh");
  }

  const connectionIds = [
    ...new Set(
      (data.connections as unknown[])
        .map(asRecord)
        .filter(
          (connection) =>
            connection.isActive !== false &&
            typeof connection.provider === "string" &&
            providers.includes(connection.provider) &&
            typeof connection.id === "string" &&
            connection.id.length > 0
        )
        .map((connection) => connection.id as string)
    ),
  ];

  for (const id of connectionIds) {
    options.signal?.throwIfAborted();
    result.attempted += 1;
    try {
      const payload = await fetchJson(
        "/api/providers/" + encodeURIComponent(id) + "/models?refresh=true",
        fetchImpl,
        options.signal
      );
      // A fallback can return HTTP 200 and the old catalog; that is not a fresh discovery.
      if (isFreshModelDiscovery(payload)) {
        result.refreshed += 1;
      } else {
        result.failed += 1;
      }
    } catch {
      options.signal?.throwIfAborted();
      result.failed += 1;
    }
  }
  return result;
}

function isFreshModelDiscovery(payload: Record<string, unknown>): boolean {
  const clientVersion = asRecord(asRecord(payload.discovery).clientVersion);
  return (
    payload.source === "api" &&
    !payload.failure &&
    !payload.degraded &&
    !clientVersion.degraded &&
    Array.isArray(payload.models) &&
    payload.models.length > 0
  );
}
