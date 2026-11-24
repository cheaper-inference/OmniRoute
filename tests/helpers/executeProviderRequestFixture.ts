// Exercise the real request dispatcher with an offline executor response.
import { resolveResilienceSettings } from "../../src/lib/resilience/settings.ts";
import type { ExecuteProviderRequestDeps } from "../../open-sse/handlers/chatCore/executeProviderRequest.ts";

export function makeRequestDeps(
  response: Response,
  record: ExecuteProviderRequestDeps["recordKeyHealthStatus"],
  stream: boolean
): ExecuteProviderRequestDeps {
  const controller = new AbortController();
  const credentials = { connectionId: "kh-real-dispatch", apiKey: "fixture" };
  const body = { model: "fixture-model", messages: [{ role: "user", content: "offline" }] };
  return {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence: () => {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "chat.completions",
    connectionId: null,
    correlationId: null,
    credentials: null,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: body.model,
    executor: { execute: async () => response },
    extendedContext: false,
    getExecutionCredentials: () => credentials,
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model: body.model,
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model: body.model, provider: "openai", connectionId: null },
    provider: "openai",
    providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
    rawBody: body,
    recordKeyHealthStatus: record,
    requestedModel: body.model,
    resilienceSettings: resolveResilienceSettings(null),
    settings: null,
    skipUpstreamRetry: false,
    stream,
    streamController: { signal: controller.signal },
    targetFormat: "openai",
    trace: () => {},
    traceId: "key-health-dispatch-test",
    translatedBody: body,
    trustedEffortContext: {},
    upstreamStream: stream,
    userAgent: "offline-key-health-test",
  };
}
