/**
 * Claude extra-usage monthly spend cap, as a pre-dispatch signal (#18059).
 *
 * A Claude connection that opted into extra usage (`blockExtraUsage === false`) bypasses the
 * plan-window quota filter, so an account whose plan windows AND monthly cap are both spent used
 * to stay eligible until the upstream "monthly spend limit" 429. The cap is tracked here, apart
 * from the plan windows, because it alone never makes an account ineligible: the plan windows
 * still serve requests while the cap is spent. Only the combination does.
 */
import {
  buildClaudeExtraUsageConnectionUpdate,
  isClaudeExtraUsageAllowed,
} from "@/lib/providers/claudeExtraUsage";

type JsonRecord = Record<string, unknown>;

/** connectionId -> epoch ms at which the spent cap stops being trusted (next billing month). */
const spentCapUntil = new Map<string, number>();

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/** First instant of the next UTC month: where Anthropic's monthly spend cap rolls over. */
function nextBillingMonthStartMs(now: number): number {
  const d = new Date(now);
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1);
}

/** True when the payload says extra usage is enabled and its monthly cap is fully spent. */
export function isClaudeExtraUsageCapSpent(extraUsage: unknown): boolean {
  const eu = asRecord(extraUsage);
  if (eu.is_enabled !== true) return false;
  const { monthly_limit: limit, used_credits: used, utilization } = eu;
  if (typeof limit === "number" && limit > 0 && typeof used === "number") return used >= limit;
  return typeof utilization === "number" && utilization >= 100;
}

/** Record the cap state from a fresh usage reading (a non-spent reading clears it). */
export function recordClaudeExtraUsageCap(
  connectionId: string,
  provider: string | null | undefined,
  usage: unknown,
  now: number = Date.now()
): void {
  if (provider !== "claude" || !connectionId) return;
  const record = asRecord(usage);
  if (!Object.prototype.hasOwnProperty.call(record, "extraUsage")) return;
  if (isClaudeExtraUsageCapSpent(record.extraUsage)) {
    spentCapUntil.set(connectionId, nextBillingMonthStartMs(now));
  } else {
    spentCapUntil.delete(connectionId);
  }
}

/** True while the last reading showed a spent cap and the billing month has not rolled over. */
export function isClaudeExtraUsageCapKnownSpent(
  connectionId: string,
  now: number = Date.now()
): boolean {
  const until = spentCapUntil.get(connectionId);
  if (until === undefined) return false;
  if (now >= until) {
    spentCapUntil.delete(connectionId);
    return false;
  }
  return true;
}

/**
 * Whether the operator's extra-usage opt-in makes cached plan windows irrelevant for this request.
 * It stops doing so once the monthly cap is known spent: the account then has no pay-as-you-go
 * headroom left, so the plan-window check applies again (exhausted plan windows + spent cap).
 */
export function isClaudeExtraUsageBypassingQuota(
  connectionId: string,
  provider: string,
  providerSpecificData: unknown
): boolean {
  return (
    isClaudeExtraUsageAllowed(provider, providerSpecificData) &&
    !isClaudeExtraUsageCapKnownSpent(connectionId)
  );
}

/** Records the cap, then builds the connection's extra-usage state update (one call site). */
export function trackCapAndBuildClaudeExtraUsageUpdate(
  connection: Parameters<typeof buildClaudeExtraUsageConnectionUpdate>[0] & { id: string },
  usage: JsonRecord
) {
  recordClaudeExtraUsageCap(connection.id, connection.provider, usage);
  return buildClaudeExtraUsageConnectionUpdate(connection, usage);
}

export function __resetClaudeExtraUsageCapForTests(): void {
  spentCapUntil.clear();
}
