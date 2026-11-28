import { type KeyHealth } from "@omniroute/open-sse/services/apiKeyRotator.ts";
import { isPassiveCodex } from "@omniroute/open-sse/services/tokenRefresh.ts";
import { persistProbeResult, previewRecovery } from "./connectionTestHealthPersist";
import { applyDetectedControlUpdate, type ApiKeyValidationResult } from "./apiKeyTestResult";
import { TERMINAL_TEST_STATUSES, isParkedTestStatus } from "@/shared/utils/parkedStatus";

interface ConnectionHealthSnapshot {
  testStatus?: unknown;
  lastError?: unknown;
  lastErrorAt?: unknown;
  lastErrorType?: unknown;
  lastErrorSource?: unknown;
  errorCode?: unknown;
  rateLimitedUntil?: string | number | null;
  apiKey?: unknown;
  accessToken?: unknown;
  providerSpecificData?: unknown;
}

interface ConnectionProbeResult extends ApiKeyValidationResult {
  error?: string | null;
  refreshed?: boolean;
  newTokens?: {
    accessToken?: string;
    refreshToken?: string;
    expiresIn?: number;
  };
}

interface HealthUpdateOptions {
  connectionId: string;
  provider: string;
  connection: ConnectionHealthSnapshot;
  latest: ConnectionHealthSnapshot;
  probeStartedAt: string;
  result: ConnectionProbeResult;
  diagnosis: { type?: string; source?: string; code?: string | number | null };
  operatorDisabled: boolean;
  clearErrorState: boolean;
  now: string;
  persist: (
    connectionId: string,
    update: Record<string, unknown>,
    options?: {
      mergeApiKeyHealth?: boolean;
      probeHealthWrite?: { outcome: "success" | "failure"; startedAt: string };
    }
  ) => Promise<unknown>;
}

/** Commit probe state before advertising recovered credentials; quota policy stays with the caller. */
/**
 * A passive Codex standby only adopts tokens from the active instance; it must never persist tokens a
 * connection test carries back, or it would overwrite the replicated credentials.
 */
function adoptRefreshedTokens(
  updateData: Record<string, unknown>,
  provider: string,
  result: HealthUpdateOptions["result"]
): void {
  if (!result.refreshed || !result.newTokens || isPassiveCodex(provider)) return;
  updateData.accessToken = result.newTokens.accessToken;
  if (result.newTokens.refreshToken) updateData.refreshToken = result.newTokens.refreshToken;
  if (result.newTokens.expiresIn)
    updateData.expiresAt = new Date(Date.now() + result.newTokens.expiresIn * 1000).toISOString();
}

/** The row as it stands after the probe, with the pre-probe snapshot filling the gaps. */
function snapshotAfterProbe(
  connection: HealthUpdateOptions["connection"],
  latest: HealthUpdateOptions["latest"]
): ConnectionHealthSnapshot {
  const base: ConnectionHealthSnapshot = { ...connection };
  for (const [key, value] of Object.entries(latest ?? {})) {
    if (value !== undefined) (base as Record<string, unknown>)[key] = value;
  }
  return base;
}

/** Carry the recovered key into the write without touching the rest of the specific data. */
function publishRecoveredKey(updateData: Record<string, unknown>, recovered: KeyHealth): void {
  const metadata = { ...(updateData.providerSpecificData as Record<string, unknown> | undefined) };
  delete metadata.apiKeyHealth;
  updateData.providerSpecificData = { ...metadata, apiKeyHealth: { primary: recovered } };
}

export async function persistConnectionTestHealth({
  connectionId,
  provider,
  connection,
  latest,
  probeStartedAt,
  result,
  diagnosis,
  operatorDisabled,
  clearErrorState,
  now,
  persist,
}: HealthUpdateOptions): Promise<void> {
  // The pre-probe snapshot is only a fallback: the row read after the probe wins for every
  // field it carries, so a verdict parked during the probe is what this write reports.
  const base = snapshotAfterProbe(connection, latest);
  // Probe verdicts that mean the credential cannot recover by retrying: the stored-status
  // vocabulary plus the classifier's own name for account-level deactivation.
  const terminalDiagnoses = new Set<string>([...TERMINAL_TEST_STATUSES, "account_deactivated"]);
  // A failed probe is not evidence that a parked account recovered. The stored row's own
  // verdict is enforced inside the persistence transaction, because this handler only holds
  // the row as it was before the probe started.
  const isTerminalFailure =
    !result.valid &&
    terminalDiagnoses.has(String(diagnosis.code ?? diagnosis.type ?? "").toLowerCase());
  const updateData: Record<string, unknown> = {
    testStatus:
      provider === "chatgpt" && !result.valid && diagnosis.code === "expired"
        ? "expired"
        : clearErrorState
          ? "active"
          : result.valid
            ? base.testStatus
            : "error",
    ...(result.valid && !operatorDisabled ? { isActive: true } : {}),
    lastError: clearErrorState ? null : result.valid ? base.lastError : result.error,
    lastErrorAt: clearErrorState ? null : result.valid ? base.lastErrorAt : now,
    lastTested: now,
    lastErrorType: clearErrorState
      ? null
      : result.valid
        ? base.lastErrorType
        : diagnosis.type,
    lastErrorSource: clearErrorState
      ? null
      : result.valid
        ? base.lastErrorSource
        : diagnosis.source,
    errorCode: clearErrorState
      ? null
      : result.valid
        ? base.errorCode
        : diagnosis.code || result.statusCode || null,
  };
  // One owner for the cooldown window. When the row is parked and the probe failed, the
  // persistence transaction restores the stored deadline from the row it reads; writing a fresh
  // window here would be a second rule that the transaction immediately discards.
  // A caller that owns its own cooldown contract keeps it: a rejected chatgpt refresh clears the
  // window, so that case is not delegated to the transaction.
  const chatgptRejectedRefresh = provider === "chatgpt" && !result.valid && diagnosis.code === "expired";
  const parkedStoredRow =
    !result.valid && !chatgptRejectedRefresh && isParkedTestStatus(base.testStatus);
  if (!parkedStoredRow) {
    updateData.rateLimitedUntil =
      clearErrorState || (provider === "chatgpt" && !result.valid && diagnosis.code === "expired")
        ? null
        : isTerminalFailure || result.valid
          ? base.rateLimitedUntil || null
          : new Date(Date.now() + 30_000).toISOString();
  }
  if (clearErrorState) updateData.backoffLevel = 0;
  const recovery = previewRecovery({
    connectionId,
    connection,
    latestSpecificData: latest.providerSpecificData,
    valid: result.valid,
  });
  applyDetectedControlUpdate(updateData, latest.providerSpecificData, result);
  if (recovery) publishRecoveredKey(updateData, recovery.recovered);
  adoptRefreshedTokens(updateData, provider, result);
  await persistProbeResult({
    connectionId,
    provider,
    updateData,
    recovery,
    probeStartedAt,
    valid: result.valid,
    persist,
  });
}
