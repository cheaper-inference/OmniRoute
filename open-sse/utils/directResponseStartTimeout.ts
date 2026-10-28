import { isPrivateHost } from "@/shared/network/privateHost";

type DirectFetchOptions = RequestInit & { dispatcher?: unknown };
type DirectFetch = (input: RequestInfo | URL, options: DirectFetchOptions) => Promise<Response>;

const DEFAULT_DIRECT_HEADERS_TIMEOUT_MS = 30_000;
/** Local/self-hosted backends (Ollama, LM Studio, host.docker.internal) often need >30s TTFB. */
const DEFAULT_LOCAL_DIRECT_HEADERS_TIMEOUT_MS = 300_000;
const DIRECT_RESPONSE_START_TIMEOUT_CODE = "DIRECT_RESPONSE_START_TIMEOUT";

// #13703 — the fresh-socket RETRY (2nd direct attempt) reused the pooled
// attempt's short flat watchdog and 504'd healthy slow-TTFB upstreams: unlike
// the pooled attempt (a possibly-dead keep-alive socket, #10214), the retry is
// a brand-new socket with nothing to detect, so it defers to the caller's own
// (larger) deadline signal when one is present — see resolveDirectRetryTimeoutMs.
const DEFAULT_DIRECT_RETRY_CEILING_MS = 600_000;

// Reasoning models (GLM-5.2/5.3 reasoning.effort=high/max, codex-gpt-5.x-high,
// third-party Claude-format replicas) warm up with a ~78s+ TTFB before emitting
// the first byte. The stream-readiness layer (streamReadinessPolicy.ts) already
// budgets 180s for this class (claude_format_heavy_reasoning /
// codex_gpt_5_5_high_reasoning +30s bumps over an 80s base). This fetch-layer
// guard must align to the SAME ceiling so it does not pre-empt a warm reasoning
// response that the readiness layer would have permitted — that mismatch is the
// 504 regression introduced by 142ae9349 (flat 30s cut a 78s+ reasoning TTFB).
const REASONING_READINESS_CEILING_MS = 180_000;
// Bounded, non-overlapping pattern: a quoted "reasoning_effort" or nested
// "effort" field whose value is high or max. No variable-length quantifier
// overlap → no ReDoS surface (project PII rule #1).
const HIGH_REASONING_EFFORT_PATTERN = /"(?:reasoning_effort|effort)"\s*:\s*"(?:high|max)"/i;

function hasHighReasoningEffort(body?: string | null): boolean {
  if (!body || typeof body !== "string") return false;
  return HIGH_REASONING_EFFORT_PATTERN.test(body);
}

function isLocalDirectTarget(targetUrl?: string | null): boolean {
  if (!targetUrl) return false;
  try {
    return isPrivateHost(new URL(targetUrl).hostname);
  } catch {
    return false;
  }
}

function resolveLocalDirectHeadersFloorMs(
  env: Record<string, string | undefined> = process.env
): number {
  const raw = env.OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS;
  if (raw == null || raw.trim() === "") return DEFAULT_LOCAL_DIRECT_HEADERS_TIMEOUT_MS;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
}

// Volume-aware probe-window tier. Prefill scales with input size: a large
// context legitimately sits silent well past the 30s default before the first
// byte, with no reasoning selector in the body for the ceiling above to key
// on — so the flat floor cut healthy slow-prefill upstreams at exactly the
// floor. Tiers: ≤512KB unchanged (a small body overrunning the probe still
// smells like a dead connection), >512KB ×2, >2MB ×3, capped at 180s.
// OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE=0/false/off pins the flat behavior.
const LARGE_BODY_TIER_BYTES = 512 * 1024;
const HUGE_BODY_TIER_BYTES = 2 * 1024 * 1024;
const VOLUME_AWARE_WINDOW_CAP_MS = 180_000;

function isVolumeAdaptiveDirectHeadersEnabled(
  env: Record<string, string | undefined> = process.env
): boolean {
  const raw = env.OMNIROUTE_DIRECT_HEADERS_VOLUME_ADAPTIVE;
  if (raw == null || raw.trim() === "") return true;
  return !["0", "false", "off"].includes(raw.trim().toLowerCase());
}

function bodyByteLength(body: string | null | undefined): number {
  if (!body) return 0;
  return new TextEncoder().encode(body).length;
}

export function resolveVolumeAwareDirectHeadersTimeoutMs(
  baseMs: number,
  bodyBytes: number,
  env: Record<string, string | undefined> = process.env
): number {
  if (!(baseMs > 0) || !(bodyBytes > 0)) return baseMs;
  if (!isVolumeAdaptiveDirectHeadersEnabled(env)) return baseMs;
  let factor = 1;
  if (bodyBytes > HUGE_BODY_TIER_BYTES) factor = 3;
  else if (bodyBytes > LARGE_BODY_TIER_BYTES) factor = 2;
  if (factor === 1) return baseMs;
  // Raise-only: the ceiling must never pull the window below an
  // already-higher floor (operator override or the local/LAN floor).
  return Math.max(baseMs, Math.min(baseMs * factor, VOLUME_AWARE_WINDOW_CAP_MS));
}

function resolveFlatDirectHeadersFloorMs(
  env: Record<string, string | undefined>,
  body?: string | null,
  targetUrl?: string | null
): number {
  const raw = env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  let base =
    raw == null || raw.trim() === ""
      ? DEFAULT_DIRECT_HEADERS_TIMEOUT_MS
      : Number.isFinite(Number(raw)) && Number(raw) > 0
        ? Math.floor(Number(raw))
        : 0;
  // Operator override is a FLOOR: reasoning/local awareness only raises the budget,
  // never lowers it. An override above the ceiling (e.g. 240s) is preserved.
  if (hasHighReasoningEffort(body)) {
    base = Math.max(base, REASONING_READINESS_CEILING_MS);
  }
  if (isLocalDirectTarget(targetUrl)) {
    base = Math.max(base, resolveLocalDirectHeadersFloorMs(env));
  }
  // Volume tier applies last with raise-only semantics, so it composes with
  // the effort/local raises above without order dependence.
  return resolveVolumeAwareDirectHeadersTimeoutMs(base, bodyByteLength(body), env);
}

// #13703: `attempt` 0 is the pooled dispatcher (flat floor, #10214's
// zombie-socket rationale); attempt 1+ is the fresh-socket retry, which has
// no zombie to detect and so defers to resolveDirectRetryTimeoutMs instead.
export function resolveDirectHeadersTimeoutMs(
  env: Record<string, string | undefined> = process.env,
  body?: string | null,
  attempt = 0,
  hasCallerDeadline = false,
  targetUrl?: string | null
): number {
  const flatFloorMs = resolveFlatDirectHeadersFloorMs(env, body, targetUrl);
  if (attempt === 0) return flatFloorMs;
  return resolveDirectRetryTimeoutMs(flatFloorMs, hasCallerDeadline, env);
}

/**
 * Per-request resolver for the direct no-proxy attempts in proxyFetch: binds the
 * request body (reasoning-effort awareness), caller-deadline presence (retry
 * ceiling) and target URL (local/LAN floor) once, so each attempt
 * (0 = pooled dispatcher, 1+ = fresh-socket retry) resolves its own budget.
 */
export function directHeadersTimeoutResolver(
  options: { body?: unknown; signal?: unknown },
  targetUrl?: string | null
): (attempt: number) => number {
  const body = typeof options.body === "string" ? options.body : null;
  const hasCallerDeadline = !!options.signal;
  return (attempt) =>
    resolveDirectHeadersTimeoutMs(process.env, body, attempt, hasCallerDeadline, targetUrl);
}

/**
 * Resolves the fresh-socket RETRY attempt's response-start ceiling (#13703).
 *
 * `hasCallerDeadline` is true when the caller already attached its own
 * AbortSignal to the request (in production, the resolved connection ->
 * model -> provider -> FETCH_TIMEOUT_MS cascade, merged in by the executor
 * layer before proxyFetch ever sees the request). In that case the caller's
 * own signal is the REAL deadline and always fires first in the intended
 * path, so the retry gets a generous backstop ceiling
 * (OMNIROUTE_DIRECT_RESPONSE_RETRY_TIMEOUT_MS, default 600s) instead of
 * reusing the short flat pooled-attempt floor.
 *
 * When there is no caller-supplied deadline at all, there is no larger budget
 * to defer to, so the retry keeps the SAME flat floor as the pooled attempt
 * (`flatFloorMs`) — preserving #10214's original zombie-socket-detection
 * behavior for callers that never pass their own signal.
 */
export function resolveDirectRetryTimeoutMs(
  flatFloorMs: number,
  hasCallerDeadline: boolean,
  env: Record<string, string | undefined> = process.env
): number {
  if (!hasCallerDeadline) return flatFloorMs;
  const raw = env.OMNIROUTE_DIRECT_RESPONSE_RETRY_TIMEOUT_MS;
  const ceiling =
    raw == null || raw.trim() === ""
      ? DEFAULT_DIRECT_RETRY_CEILING_MS
      : Number.isFinite(Number(raw)) && Number(raw) > 0
        ? Math.floor(Number(raw))
        : DEFAULT_DIRECT_RETRY_CEILING_MS;
  // The env var is a ceiling operators can tune down; it must never be
  // allowed to undercut the flat floor (that would re-introduce the original
  // #10214 zombie-socket-detection gap on the retry attempt).
  return Math.max(flatFloorMs, ceiling);
}

function createDirectResponseStartTimeout(timeoutMs: number): Error & { code: string } {
  const err = new Error(
    `Direct response did not start within ${timeoutMs}ms — retrying on a fresh socket`
  ) as Error & { code: string };
  err.name = "TimeoutError";
  err.code = DIRECT_RESPONSE_START_TIMEOUT_CODE;
  return err;
}

export function isDirectResponseStartTimeout(err: unknown): boolean {
  return (
    !!err &&
    typeof err === "object" &&
    "code" in err &&
    err.code === DIRECT_RESPONSE_START_TIMEOUT_CODE
  );
}

function mergeAbortSignals(
  primary: AbortSignal | null | undefined,
  secondary: AbortSignal
): AbortSignal {
  if (!primary) return secondary;
  if (primary.aborted) return primary;
  const controller = new AbortController();
  const onPrimaryAbort = () => controller.abort(primary.reason);
  const onSecondaryAbort = () => controller.abort(secondary.reason);
  const cleanup = () => {
    primary.removeEventListener("abort", onPrimaryAbort);
    secondary.removeEventListener("abort", onSecondaryAbort);
  };
  primary.addEventListener("abort", onPrimaryAbort, { once: true });
  secondary.addEventListener("abort", onSecondaryAbort, { once: true });
  controller.signal.addEventListener("abort", cleanup, { once: true });
  return controller.signal;
}

export async function directFetchWithBoundedResponseStart(
  input: RequestInfo | URL,
  options: DirectFetchOptions,
  fetchImpl: DirectFetch,
  timeoutMs: number
): Promise<Response> {
  if (!timeoutMs || timeoutMs <= 0) return fetchImpl(input, options);
  const attemptController = new AbortController();
  // #12861: guards a narrow but real race between the timer macrotask and the
  // fetch promise settling. If `fetchImpl` has already resolved/rejected by
  // the time this timer fires, aborting now delivers the abort reason to a
  // promise nobody is awaiting anymore — Node promotes that to an
  // unhandledRejection -> uncaughtException and kills the process. Once the
  // attempt has settled, the timer becomes a no-op instead: the caller
  // already has its answer, and there's nothing left to abort for.
  let settled = false;
  const timer = setTimeout(() => {
    if (settled) return;
    attemptController.abort(createDirectResponseStartTimeout(timeoutMs));
  }, timeoutMs);
  timer.unref?.();
  try {
    const response = await fetchImpl(input, {
      ...options,
      signal: mergeAbortSignals(options.signal, attemptController.signal),
    });
    settled = true;
    return response;
  } catch (err) {
    settled = true;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
