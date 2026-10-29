import { getCachedClaudeQuotaScopeDecision } from "../../services/claudeQuotaScopeBridge.ts";
import { cooldownUntilMs, isCreditsExhausted, lockModel } from "../../services/accountFallback.ts";
import { SUBSCRIPTION_QUOTA_COOLDOWN_MS } from "../../services/quotaTextCooldowns.ts";
import { isExplicitClaudeQuota429Text } from "../../services/usage/claudeQuota.ts";

interface ClaudeQuotaFailure {
  provider: string;
  connectionId: string;
  model: string;
  status: number;
  errorText: string;
  retainedMessage: string;
  retryAfterMs?: number | null;
  hasCallerOwner: boolean;
  /** Dependencies already owned by chatCore; do not introduce new open-sse -> src edges. */
  deps: {
    readConnection: (id: string) => Promise<{
      testStatus?: unknown;
      rateLimitedUntil?: unknown;
    } | null | undefined>;
    persistConnection: (
      id: string,
      update: {
        lastErrorType: "quota_exhausted";
        lastError: string;
        lastErrorAt: string;
        errorCode: number;
        testStatus?: "unavailable";
        rateLimitedUntil?: string;
      }
    ) => Promise<unknown>;
    isProbe: () => Promise<boolean>;
  };
}

function isRenewingClaudeQuota(input: ClaudeQuotaFailure): boolean {
  return (
    input.provider === "claude" &&
    input.status === 429 &&
    isExplicitClaudeQuota429Text(input.errorText) &&
    !isCreditsExhausted(input.errorText) &&
    !input.errorText.toLowerCase().includes("monthly spend limit")
  );
}

/** A recurring Claude quota is temporary; it must never become depleted credits. */
export async function handleClaudeQuotaFailure(input: ClaudeQuotaFailure): Promise<boolean> {
  if (!isRenewingClaudeQuota(input)) return false;
  if (await input.deps.isProbe()) return false;
  // The outer handler resolves the exact scope and reset. Prewriting a cooldown here
  // would trip its duplicate-write guard before it can persist that evidence.
  if (input.hasCallerOwner) return true;
  const connection = await input.deps.readConnection(input.connectionId);
  if (!connection) return true;
  const status = typeof connection.testStatus === "string" ? connection.testStatus : "";
  if (["banned", "expired", "deactivated", "credits_exhausted"].includes(status)) {
    return true;
  }
  // DB reads expose nullable fields as unknown. Narrow them before passing
  // them into typed helpers; do not stringify an invalid cooldown as evidence.
  // Match the outer fallback's duplicate-mark guard: another request must not
  // shorten or extend a cooldown that is still active.
  const storedCooldown = connection.rateLimitedUntil;
  const existingUntil = cooldownUntilMs(
    typeof storedCooldown === "string" || typeof storedCooldown === "number"
      ? storedCooldown
      : null
  );
  if (Number.isFinite(existingUntil) && existingUntil > Date.now()) return true;
  const scope = getCachedClaudeQuotaScopeDecision(input);
  const cooldownMs = scope.cooldownMs ?? (input.retryAfterMs || SUBSCRIPTION_QUOTA_COOLDOWN_MS);
  const metadata = {
    lastErrorType: "quota_exhausted" as const,
    lastError: input.retainedMessage,
    lastErrorAt: new Date().toISOString(),
    errorCode: input.status,
  };
  if (scope.scope === "model") {
    lockModel(input.provider, input.connectionId, input.model, "quota_exhausted", cooldownMs);
    await input.deps.persistConnection(input.connectionId, metadata);
  } else {
    await input.deps.persistConnection(input.connectionId, {
      ...metadata,
      testStatus: "unavailable",
      rateLimitedUntil: scope.resetAt ?? new Date(Date.now() + cooldownMs).toISOString(),
    });
  }
  return true;
}
