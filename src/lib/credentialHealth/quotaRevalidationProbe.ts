/**
 * The production probe of the daily quota revalidation (#20343).
 *
 * A model lock is about ONE model on ONE connection, so the probe asks exactly that
 * question: it sends the smallest real request to the locked model, pinned to the
 * locked connection, through the regular model-test path (the in-process
 * /v1/chat/completions route, so routing, translation, auth and the provider
 * executor all apply). A credential check would not do: a key that still
 * authenticates says nothing about whether this model's quota window reopened.
 *
 * Cost: one request with a one-token answer cap per locked model per day, and only
 * when the operator turned QUOTA_DAILY_REVALIDATION on.
 *
 * Outcome → effect, scoped to this provider + connection + model only:
 *   - the model answered          → "recovered" (the runner clears this model's lock);
 *   - a quota / 429-type answer   → "still-locked": the lock stays, refreshed from the
 *                                   answer's reset hint through the existing parsers;
 *   - anything else (timeout, 5xx, 4xx, skipped probe) → "unknown": the lock stays
 *                                   exactly as it was and the outcome is logged.
 *
 * The probe runs failure-isolated (`isolateFailures`), so no answer it gets can put
 * a connection-wide cooldown (`rateLimitedUntil`), a terminal status or a lock on a
 * sibling model, even when the operator opted into `probeCanDisable`.
 */
import {
  isAuthoritativeRetryHintSource,
  parseDetailedRetryFromErrorText,
  recordModelLockoutFailure,
  retryHintBypassesMaxCooldownMs,
  type RetryHintProvenance,
} from "@omniroute/open-sse/services/accountFallback.ts";
import type { DailyRevalidationCandidate } from "@omniroute/open-sse/services/quotaDailyRevalidation.ts";
import type { RunSingleModelTestOptions, SingleModelTestResult } from "@/lib/api/modelTestRunner";

/** What one probe concluded. Only `recovered` unlocks the model. */
export type DailyRevalidationVerdict = "recovered" | "still-locked" | "unknown";

/** The answer cap of a probe request: the upstream only has to accept it. */
export const QUOTA_PROBE_MAX_OUTPUT_TOKENS = 1;

/** A probe that hangs longer than this proves nothing either way. */
export const QUOTA_PROBE_TIMEOUT_MS = 30_000;

export type QuotaProbeModelTest = (
  options: RunSingleModelTestOptions
) => Promise<SingleModelTestResult>;

export type QuotaProbeLogger = { info?: (msg: string) => void; warn?: (msg: string) => void };

async function runModelTestInProcess(
  options: RunSingleModelTestOptions
): Promise<SingleModelTestResult> {
  const { runSingleModelTest } = await import("@/lib/api/modelTestRunner");
  return runSingleModelTest(options);
}

/** The request a probe sends: this model, on this connection, one token, failure-isolated. */
export function buildQuotaProbeRequest(
  candidate: DailyRevalidationCandidate
): RunSingleModelTestOptions {
  return {
    providerId: candidate.provider,
    // Always prefixed: a bare model id that itself contains "/" would otherwise be
    // read as `<provider>/<model>` and routed to the wrong provider.
    modelId: `${candidate.provider}/${candidate.model ?? ""}`,
    connectionId: candidate.connectionId,
    timeoutMs: QUOTA_PROBE_TIMEOUT_MS,
    streamChat: true,
    maxOutputTokens: QUOTA_PROBE_MAX_OUTPUT_TOKENS,
    acceptEmptyOutput: true,
    isolateFailures: true,
  };
}

function isQuotaAnswer(result: SingleModelTestResult): boolean {
  return (
    result.rateLimited === true ||
    result.isQuota === true ||
    result.statusCode === 429 ||
    result.httpStatus === 429
  );
}

/** Map a model-test result to the verdict; only a delivered answer is a recovery. */
export function classifyQuotaProbeResult(result: SingleModelTestResult): DailyRevalidationVerdict {
  if (result.status === "ok") return "recovered";
  if (result.skipped === true) return "unknown";
  return isQuotaAnswer(result) ? "still-locked" : "unknown";
}

type ProbeRetryHint = { retryAfterMs: number; provenance: RetryHintProvenance };

/** The reset the answer announced: Retry-After first, then the existing body-text parsers. */
function resolveProbeRetryHint(
  result: SingleModelTestResult,
  provider: string,
  nowMs: number
): ProbeRetryHint | null {
  if (typeof result.retryAfter === "number" && result.retryAfter > 0) {
    return { retryAfterMs: result.retryAfter * 1000, provenance: "header" };
  }
  const hint = parseDetailedRetryFromErrorText(result.error, provider, nowMs);
  return hint && hint.retryAfterMs > 0 ? hint : null;
}

/**
 * Refresh the lock of this exact model from a quota answer. Without a parseable
 * reset the lock is simply kept as it is. Exact scope only: a quota-family write
 * would park the connection's sibling models, which this probe never touches.
 * Returns whether a refresh was written.
 */
export function refreshLockFromQuotaAnswer(
  candidate: DailyRevalidationCandidate,
  result: SingleModelTestResult,
  nowMs: number = Date.now()
): boolean {
  if (!candidate.model) return false;
  const hint = resolveProbeRetryHint(result, candidate.provider, nowMs);
  if (!hint) return false;
  recordModelLockoutFailure(
    candidate.provider,
    candidate.connectionId,
    candidate.model,
    candidate.reason || (result.isQuota ? "quota_exhausted" : "rate_limit"),
    typeof result.statusCode === "number" ? result.statusCode : 429,
    hint.retryAfterMs,
    null,
    {
      exactCooldownMs: hint.retryAfterMs,
      scope: "exact",
      exactCooldownIsUpstreamReset: retryHintBypassesMaxCooldownMs(hint.provenance),
      authoritativeBodyReset: isAuthoritativeRetryHintSource(hint.provenance),
    }
  );
  return true;
}

function describeCandidate(candidate: DailyRevalidationCandidate): string {
  return `${candidate.provider}/${candidate.model} on ${candidate.connectionId}`;
}

/**
 * Probe one locked model with a minimal real request and act on that model's
 * answer only. Clearing a recovered lock is the runner's job.
 */
export async function probeLockedModel(
  candidate: DailyRevalidationCandidate,
  deps: { runModelTest?: QuotaProbeModelTest; logger?: QuotaProbeLogger; nowMs?: number } = {}
): Promise<DailyRevalidationVerdict> {
  if (!candidate.model) return "unknown";
  const runModelTest = deps.runModelTest ?? runModelTestInProcess;
  const logger = deps.logger ?? { warn: (msg: string) => console.warn(msg) };
  const result = await runModelTest(buildQuotaProbeRequest(candidate));
  const verdict = classifyQuotaProbeResult(result);
  if (verdict === "still-locked") {
    const refreshed = refreshLockFromQuotaAnswer(candidate, result, deps.nowMs ?? Date.now());
    logger.info?.(
      `[quota-daily] ${describeCandidate(candidate)} is still over quota; lock kept${refreshed ? " and refreshed" : ""}`
    );
  } else if (verdict === "unknown") {
    logger.warn?.(
      `[quota-daily] probe of ${describeCandidate(candidate)} was inconclusive (${result.status}, HTTP ${result.httpStatus}); lock kept unchanged: ${result.error ?? "no detail"}`
    );
  }
  return verdict;
}
