import {
  getKeyHealthEntry,
  previewKeyHealthRecovery,
  recoverKeyHealth,
  type KeyHealth,
} from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { setCredentialHealth } from "@/lib/credentialHealth/cache";

type RecoveryPreview = { recovered: KeyHealth; source: Record<string, unknown> };

/**
 * What a passing probe would restore for the primary key, plus the snapshot it was derived from.
 * The snapshot is what a caller's persist falls back to when it returns no row of its own.
 */
export function previewRecovery(args: {
  connectionId: string;
  connection: { apiKey?: unknown; accessToken?: unknown };
  latestSpecificData: unknown;
  valid: boolean;
}): RecoveryPreview | undefined {
  const { connectionId, connection, latestSpecificData, valid } = args;
  if (!valid || !(connection.apiKey || connection.accessToken)) return undefined;
  const data = latestSpecificData as Record<string, unknown> | undefined;
  const stored = data?.apiKeyHealth as Record<string, KeyHealth> | undefined;
  const health = getKeyHealthEntry(connectionId, "primary") ?? stored?.primary;
  const owesRecovery =
    health &&
    (health.status !== "active" ||
      health.failures > 0 ||
      Boolean(health.rejectedAt) ||
      Boolean(health.cooldownUntil));
  if (!owesRecovery) return undefined;
  return {
    recovered: previewKeyHealthRecovery(health),
    source: { ...data, apiKeyHealth: { ...stored, primary: health } },
  };
}

/** Write the probe's verdict, then publish a recovered key only if the row was committed. */
export async function persistProbeResult(args: {
  connectionId: string;
  provider: string;
  updateData: Record<string, unknown>;
  recovery: RecoveryPreview | undefined;
  probeStartedAt: string;
  valid: boolean;
  persist: (
    id: string,
    data: Record<string, unknown>,
    options: {
      mergeApiKeyHealth?: boolean;
      probeHealthWrite?: { outcome: "success" | "failure"; startedAt: string };
    }
  ) => Promise<unknown>;
}): Promise<void> {
  const { connectionId, provider, updateData, recovery, probeStartedAt, valid, persist } = args;
  const persistOptions: {
    mergeApiKeyHealth?: boolean;
    probeHealthWrite?: { outcome: "success" | "failure"; startedAt: string };
  } = {
    probeHealthWrite: { outcome: valid ? "success" : "failure", startedAt: probeStartedAt },
  };
  if (recovery) persistOptions.mergeApiKeyHealth = true;
  const saved = await persist(connectionId, updateData, persistOptions);
  // A connection deleted mid-test keeps the release flow (no throw), but it must not advertise
  // recovered credentials - and it is not active either.
  if (saved === null) return;
  if (recovery) {
    const committed = (saved as { providerSpecificData?: unknown } | undefined)
      ?.providerSpecificData;
    const data = (committed ?? recovery.source) as Record<string, unknown>;
    const health = data.apiKeyHealth as Record<string, KeyHealth> | undefined;
    recoverKeyHealth(connectionId, "primary", {
      ...data,
      apiKeyHealth: {
        ...health,
        primary: (recovery.source.apiKeyHealth as Record<string, KeyHealth> | undefined)?.primary,
      },
    });
  }
  if (valid) setCredentialHealth(connectionId, provider, "active");
}
