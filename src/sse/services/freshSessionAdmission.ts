import type { ProviderConnectionView } from "@/lib/db/providers/lazyConnectionView";
import { getSessionAffinityStore } from "@/lib/db/sessionAccountAffinity";
import { resolveSessionAffinityConnection } from "@/lib/db/sessionAffinity/accountIdentity";
import { isAccountSemaphoreFull } from "@omniroute/open-sse/services/accountSemaphore.ts";
import { isRateLimitEnabled } from "@omniroute/open-sse/services/rateLimitManager/protectionState";
import { resolveAccountSemaphoreMaxConcurrency } from "@omniroute/open-sse/handlers/chatCore/executorHelpers.ts";
import { buildConnectionConcurrencyFields } from "./connectionConcurrencyFields";

type AdmissionOptions = {
  sessionKey?: string | null;
  forcedConnectionId?: string | null;
  lease?: unknown;
};

export function needsFreshSessionAdmission(
  connections: ProviderConnectionView[],
  options: AdmissionOptions
): boolean {
  return (
    !options.forcedConnectionId &&
    !options.lease &&
    connections.some((c) => (c.rateLimitOverrides?.newSessionMaxConcurrent ?? 0) > 0)
  );
}

/** Advisory routing only; the executor's existing shared account gate remains authoritative. */
export async function filterFreshSessionAdmission<T extends ProviderConnectionView>(
  connections: T[],
  provider: string,
  options: AdmissionOptions,
  ttlMs: number
): Promise<T[]> {
  // Explicit targeting and managed leases retain their established ownership/claim semantics.
  if (!needsFreshSessionAdmission(connections, options)) {
    return connections;
  }
  const observed =
    options.sessionKey && ttlMs > 0
      ? await getSessionAffinityStore().get(options.sessionKey, provider, ttlMs)
      : null;
  // Resolve only a previously stored, live identity in the fully policy-filtered pool.
  // selectSessionAffinityConnection may CREATE a pin later; that is never proof of reuse.
  const existing =
    observed && Date.parse(observed.expiresAt) > Date.now()
      ? resolveSessionAffinityConnection(observed, connections, provider)
      : null;
  return connections.filter((connection) => {
    const configured = connection.rateLimitOverrides?.newSessionMaxConcurrent;
    if (
      typeof configured !== "number" ||
      !Number.isInteger(configured) ||
      configured <= 0 ||
      configured > 10_000
    )
      return true;
    const hard = resolveAccountSemaphoreMaxConcurrency(
      buildConnectionConcurrencyFields(connection),
      isRateLimitEnabled(connection.id)
    );
    const ceiling = hard != null && hard > 0 ? Math.min(configured, hard) : configured;
    const limit = connection.id === existing?.id ? hard : ceiling;
    return !isAccountSemaphoreFull(provider, connection.id, limit);
  });
}
