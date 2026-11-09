import { resolveConnectionTimeoutMs } from "@omniroute/open-sse/handlers/chatCore/upstreamTimeouts.ts";
import { getUpstreamTimeoutConfig } from "@/shared/utils/runtimeTimeouts";
import { isImageGenerationLongJobsEnabled } from "@/shared/utils/featureFlags";

/**
 * #16260 — IMAGE_GENERATION_LONG_JOBS (default off). The routes read the flag here and inject
 * the result into `handleImageGeneration({ longJobs })`, so the open-sse handler never imports
 * src/ (boundary ratchet).
 *
 * On: the OpenAI-compatible image path uses the connection's `providerSpecificData.timeoutMs`,
 * else the central upstream fetch timeout (FETCH_TIMEOUT_MS → REQUEST_TIMEOUT_MS → default), with
 * the legacy OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS honoured when it is the only one set; a caller
 * abort ends the request with 499. The Playground may ask for an SSE-wrapped response.
 * Off: the fixed `getConfiguredTimeout()` budget and no caller cancellation, as before.
 */
export type ImageLongJobOptions = {
  resolveTimeoutMs: (providerSpecificData: unknown) => number;
};

function hasTimeoutEnvValue(env: Record<string, string | undefined>, name: string): boolean {
  const value = env[name];
  return value !== undefined && value.trim() !== "";
}

export function resolveImageGenerationTimeoutMs(
  providerSpecificData: unknown,
  env: Record<string, string | undefined> = process.env
): number {
  const connectionTimeoutMs = resolveConnectionTimeoutMs(providerSpecificData);
  if (connectionTimeoutMs !== undefined) return connectionTimeoutMs;

  const useLegacyDefault =
    !hasTimeoutEnvValue(env, "FETCH_TIMEOUT_MS") &&
    !hasTimeoutEnvValue(env, "REQUEST_TIMEOUT_MS") &&
    hasTimeoutEnvValue(env, "OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS");
  const timeoutEnv = useLegacyDefault
    ? { ...env, FETCH_TIMEOUT_MS: env.OMNIROUTE_DEFAULT_FETCH_TIMEOUT_MS }
    : env;
  return getUpstreamTimeoutConfig(timeoutEnv).fetchTimeoutMs;
}

/** Null (default behavior) unless IMAGE_GENERATION_LONG_JOBS is on; fails closed. */
export function getImageLongJobOptions(): ImageLongJobOptions | null {
  if (!isImageGenerationLongJobsEnabled()) return null;
  return { resolveTimeoutMs: (psd) => resolveImageGenerationTimeoutMs(psd) };
}
