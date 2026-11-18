/**
 * claudeUsageLimit.ts — executor-side glue for the Claude OAuth usage wall.
 *
 * Keeps `BaseExecutor.execute()` free of the lower-priority lane's mechanics: this guard
 * owns the per-request wait accounting, the header injection, the abort-aware sleep and the
 * decision logging. The decision itself is the pure state machine in
 * `open-sse/services/claudeLowPriority.ts`; the weekly session-limit reset lives in
 * `open-sse/services/claudeLimitReset.ts`.
 *
 * Both behaviors are opt-in per connection (`providerSpecificData.lowPriorityMode` /
 * `autoLimitReset`) and only ever act on a real 5-hour usage wall — see the module header of
 * claudeLowPriority.ts for the wire contract and the lifecycle. When an operator policy is
 * registered (`setClaudeLimitResetPolicy`, "auto-apply banked resets"), it may take over the
 * reset decision; with the feature off it answers `null` and the toggle decides as before.
 */

import {
  attemptClaudeLimitReset,
  consultClaudeLimitResetPolicy,
  hasClaudeLimitResetPolicy,
  type ClaudeLimitResetPolicyVerdict,
} from "../services/claudeLimitReset.ts";
import {
  CLAUDE_UNIFIED_HEADERS,
  CLAUDE_USAGE_LIMIT_HEADER,
  CLAUDE_USAGE_LIMIT_SLOW,
  createClaudeLowPriorityWait,
  handleClaudeUsageLimitResponse,
  isClaudeLowPriorityActive,
  parseClaudeHeaderNumber,
  readClaudeUsageLimitConfig,
  resolveClaudeUsageLimitKey,
  type ClaudeLowPriorityWait,
} from "../services/claudeLowPriority.ts";
import { observeClaudeUsageHeaders } from "../services/usage/claude.ts";
import type { ExecutorLog, ProviderCredentials } from "./base.ts";

/** Safety margin kept between the last lane wait and the request's own upstream timeout. */
export const CLAUDE_USAGE_LIMIT_WAIT_MARGIN_MS = 5_000;

type GuardResponse = { status: number; headers: Headers };

export type ClaudeUsageLimitRetryInput = {
  credentials?: ProviderCredentials | null;
  signal?: AbortSignal | null;
  /** The request's upstream-start timeout; 0/undefined means "unbounded". */
  budgetMs?: number;
  /** Whether THIS request went out carrying the slow header (see `sentSlow` in the service). */
  sentSlow: boolean;
};

/** True for a native Claude connection authenticated with a subscription OAuth token. */
function isClaudeOAuth(provider: string, credentials?: ProviderCredentials | null): boolean {
  return (
    provider === "claude" &&
    typeof credentials?.accessToken === "string" &&
    credentials.accessToken.startsWith("sk-ant-oat") &&
    !credentials?.apiKey
  );
}

/** The wall's announced session-window reset (unix seconds in the headers) as ISO, if any. */
function readWallSessionResetAt(headers: Headers): string | null {
  const seconds =
    parseClaudeHeaderNumber(headers, CLAUDE_UNIFIED_HEADERS.reset5h) ??
    parseClaudeHeaderNumber(headers, CLAUDE_UNIFIED_HEADERS.reset);
  if (seconds === undefined || seconds <= 0) return null;
  const date = new Date(seconds * 1000);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

/** Sleep that rejects as soon as the request is aborted, so a lane wait never outlives it. */
function abortableSleep(delayMs: number, signal?: AbortSignal | null): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, delayMs);
    const onAbort = () => {
      clearTimeout(timer);
      reject(signal?.reason ?? new DOMException("Aborted", "AbortError"));
    };
    if (signal?.aborted) return onAbort();
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

/** One instance per `execute()` call: the wait window spans the intra-URL retries. */
export class ClaudeUsageLimitGuard {
  private readonly wait: ClaudeLowPriorityWait = createClaudeLowPriorityWait();
  private readonly startedAtMs = Date.now();
  private key: string | null = null;

  constructor(
    private readonly provider: string,
    private readonly log?: ExecutorLog | null
  ) {}

  /**
   * Stamp `anthropic-usage-limit: slow` when this connection's lane is active. Returns
   * whether the header went out, which the response side needs to tell a lane verdict from
   * a header-less sibling's outcome.
   */
  applyHeader(headers: Record<string, string>, credentials?: ProviderCredentials | null): boolean {
    this.key = isClaudeOAuth(this.provider, credentials)
      ? resolveClaudeUsageLimitKey(credentials ?? {})
      : null;
    if (this.key === null || !isClaudeLowPriorityActive(this.key)) return false;
    headers[CLAUDE_USAGE_LIMIT_HEADER] = CLAUDE_USAGE_LIMIT_SLOW;
    return true;
  }

  /**
   * Classify an upstream response. Resolves true when the caller must retry the SAME
   * account (the sleep, if any, has already happened) instead of surfacing the response.
   */
  async shouldRetry(
    response: GuardResponse,
    url: string,
    input: ClaudeUsageLimitRetryInput
  ): Promise<boolean> {
    if (this.key === null) return false;
    // Every Claude OAuth response carries the plan-window utilization: feed the quota views.
    observeClaudeUsageHeaders(input.credentials?.accessToken, response.headers);
    const key = this.key;
    const credentials = input.credentials;
    // The operator policy's verdict: onSettled reports a claim's outcome, release frees a
    // reservation the attempt never used.
    let verdict: ClaudeLimitResetPolicyVerdict | null = null;
    const decision = await handleClaudeUsageLimitResponse({
      key,
      config: readClaudeUsageLimitConfig(credentials?.providerSpecificData),
      response,
      wait: this.wait,
      sentSlow: input.sentSlow,
      waitCeilingMs: this.waitCeilingMs(input.budgetMs),
      limitResetGate: hasClaudeLimitResetPolicy()
        ? async () => {
            verdict = await consultClaudeLimitResetPolicy({
              connectionId: credentials?.connectionId ?? null,
              sessionResetAt: readWallSessionResetAt(response.headers),
              now: Date.now(),
            });
            return verdict ? verdict.allow : null;
          }
        : undefined,
      claimLimitReset: async () => {
        try {
          const attempt = await attemptClaudeLimitReset({
            key,
            connectionId: credentials?.connectionId ?? null,
            accessToken: credentials?.accessToken ?? "",
            providerSpecificData: credentials?.providerSpecificData,
            log: this.log,
            onSettled: (settled) => verdict?.onSettled?.(settled),
          });
          return attempt.reset;
        } finally {
          // No claim POST (memo, recent reset, a sibling's in-flight claim, not on offer), or
          // the attempt rejected: onSettled never ran, so free the reservation now instead of
          // holding the caps.
          try {
            verdict?.release?.();
          } catch {
            // Releasing is best-effort and must never change the attempt's outcome.
          }
        }
      },
    });

    if (decision.kind === "ended") {
      this.log?.info?.("CLAUDE_LOW_PRIORITY", `lane ended (${decision.reason}) on ${url}`);
      return false;
    }
    if (decision.kind !== "retry") return false;

    this.log?.info?.(
      "CLAUDE_LOW_PRIORITY",
      `${decision.via} on ${url} — retrying same account in ${decision.delayMs}ms`
    );
    if (decision.delayMs > 0) await abortableSleep(decision.delayMs, input.signal);
    return true;
  }

  /**
   * What is left of the request's upstream timeout, minus a safety margin. Without this the
   * server-announced max-wait (20 min by default, up to 6 h) outlives the request and the
   * sleep is aborted mid-wait, surfacing a TimeoutError instead of the graceful `max_wait`
   * end plus its cool-off.
   */
  private waitCeilingMs(budgetMs?: number): number | undefined {
    if (!budgetMs || budgetMs <= 0) return undefined;
    const elapsed = Date.now() - this.startedAtMs;
    return Math.max(0, budgetMs - elapsed - CLAUDE_USAGE_LIMIT_WAIT_MARGIN_MS);
  }
}
