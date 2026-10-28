import { acquireMany } from "../services/accountSemaphore.ts";
import {
  initializeRateLimits,
  isRateLimitEnabled,
  withRateLimit,
  resolveRequestQueueMaxWaitMs,
} from "../services/rateLimitManager.ts";
import {
  resolveAccountSemaphoreKey,
  resolveAccountSemaphoreMaxConcurrency,
  resolveModelSemaphore,
} from "./chatCore/executorHelpers.ts";
import { remainingQueueBudgetMs } from "./chatCore/queueBudget.ts";
import { getCachedSettings } from "@/lib/db/readCache";
import { resolveResilienceSettings } from "@/lib/resilience/settings";
import { resolveProviderId } from "@/shared/constants/providers";
import { systemOneBackend } from "../config/systemOneRegistry.ts";
import type { SystemOneCredentials } from "./systemOneTransport.ts";
export interface SystemOneCapacityOptions {
  provider: string;
  body: Record<string, unknown>;
  credentials: SystemOneCredentials | null;
  timeoutMs?: number;
  correlationId?: string | null;
}
export async function runWithSharedCapacity(
  options: SystemOneCapacityOptions,
  signal: AbortSignal,
  run: () => Promise<Response>
): Promise<Response> {
  await initializeRateLimits();
  const settings = resolveResilienceSettings(await getCachedSettings());
  const provider = resolveProviderId(options.provider.trim().toLowerCase());
  const model = typeof options.body.model === "string" ? options.body.model : "";
  const credentials = { ...options.credentials };
  const connectionId = credentials.connectionId;
  const accountKey = resolveAccountSemaphoreKey({ provider, model, connectionId, credentials });
  const modelGate = resolveModelSemaphore({ provider, model, connectionId, credentials });
  const maxWaitMs = resolveRequestQueueMaxWaitMs(provider, undefined, connectionId ?? undefined);
  const started = Date.now();
  const release = await acquireMany(
    [
      { key: "global", maxConcurrency: settings.requestQueue.globalConcurrentRequests },
      {
        key: "provider:" + provider,
        maxConcurrency: settings.providerQuotaOverrides[provider]?.providerConcurrency ?? 0,
      },
      {
        key: accountKey || "",
        maxConcurrency: accountKey
          ? resolveAccountSemaphoreMaxConcurrency(
              credentials,
              Boolean(connectionId && isRateLimitEnabled(connectionId))
            )
          : null,
      },
      { key: modelGate.key || "", maxConcurrency: modelGate.maxConcurrency },
    ],
    {
      timeoutMs:
        maxWaitMs > 0
          ? maxWaitMs
          : (options.timeoutMs ?? systemOneBackend(options.provider).timeoutMs),
      maxQueueSize: settings.requestQueue.maxQueueDepth,
      signal,
    }
  );
  try {
    signal.throwIfAborted();
    return await withRateLimit(
      provider,
      connectionId,
      model,
      run,
      signal,
      maxWaitMs > 0 ? remainingQueueBudgetMs(maxWaitMs, started) : undefined,
      options.correlationId ?? undefined,
      {
        executor: {
          getTimeoutMs: () => options.timeoutMs ?? systemOneBackend(options.provider).timeoutMs,
        },
        providerSpecificData: credentials.providerSpecificData,
      }
    );
  } finally {
    release();
  }
}
