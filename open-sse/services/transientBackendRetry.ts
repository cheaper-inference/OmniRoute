/**
 * transientBackendRetry — bounded retry-with-jitter for transient HTTP errors.
 *
 * Only retryable: 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout.
 * 429 is intentionally NOT retryable here — the upstream proxy uses 429 as a
 * per-tenant policy signal (quota, region, credential) and the same retry would
 * just hit the same policy.
 *
 * Strategy: decorrelated full-jitter (AWS pattern). Each attempt picks a random
 * delay in [baseMs, prev*3], capped at capMs. With defaults (baseMs=200, capMs=2000)
 * the worst-case wall-clock for 3 attempts is ~7s.
 */

export const TRANSIENT_BACKEND_STATUS_CODES: ReadonlySet<number> = new Set([
  502,
  503,
  504,
]);

export function isResponseStatusRetryable(status: number | undefined | null): boolean {
  if (typeof status !== "number") return false;
  return TRANSIENT_BACKEND_STATUS_CODES.has(status);
}

// Network/timeout signals carried by a thrown `code`, `cause.code` or error name.
// Kept local to this module: the sibling token-refresh classifier treats AbortError
// as transient, which would contradict the immediate propagation required here.
const RETRYABLE_THROWN_ERROR_CODES: ReadonlySet<string> = new Set([
  "ETIMEDOUT",
  "ECONNREFUSED",
  "ECONNRESET",
  "ECONNABORTED",
  "EPIPE",
  "EHOSTUNREACH",
  "ENETUNREACH",
  "ENOTCONN",
  "ENOTFOUND",
  "EAI_AGAIN",
  "ERR_NETWORK",
  "ERR_SOCKET",
  "ERR_CONNECTION",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_SOCKET",
]);

const NON_RETRYABLE_ERROR_NAMES: ReadonlySet<string> = new Set([
  "TypeError",
  "SyntaxError",
  "ReferenceError",
  "RangeError",
  "URIError",
]);

// Transport-specific phrases only. A bare `network` or `terminated` token would also
// match a TypeError such as "Cannot read properties of undefined (reading 'network')",
// classifying a programming error as retryable before the name-based check below.
const NETWORK_MESSAGE_PATTERN =
  /fetch failed|socket hang up|socket terminated|connection terminated|network (?:error|failure|timeout|unreachable|down)/i;

function asRecord(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : undefined;
}

function readString(source: Record<string, unknown> | undefined, key: string): string {
  if (!source) return "";
  const value = source[key];
  return typeof value === "string" ? value : "";
}

function carriesNetworkSignal(
  record: Record<string, unknown> | undefined,
  name: string,
): boolean {
  const cause = asRecord(record?.cause);
  const code = readString(record, "code");
  const causeCode = readString(cause, "code");
  const message = readString(record, "message");
  const causeMessage = readString(cause, "message");
  return (
    RETRYABLE_THROWN_ERROR_CODES.has(code) ||
    RETRYABLE_THROWN_ERROR_CODES.has(causeCode) ||
    name === "TimeoutError" ||
    name === "BodyTimeoutError" ||
    NETWORK_MESSAGE_PATTERN.test(message) ||
    NETWORK_MESSAGE_PATTERN.test(causeMessage)
  );
}

/**
 * Classify an error thrown by the retried action. Cancellation and known
 * programming errors surface at once; transport/timeout signals are retried.
 * Anything undecidable stays retryable (fail-open) so an opaque transport error
 * is not mistaken for a permanent one — undici, for example, rejects with a
 * bare `TypeError: fetch failed` whose cause carries the real network code.
 */
export function isRetryableThrownError(error: unknown): boolean {
  if (error == null) return true;

  const record = asRecord(error);
  const name = readString(record, "name");
  if (name === "AbortError") return false;
  if (carriesNetworkSignal(record, name)) return true;
  if (NON_RETRYABLE_ERROR_NAMES.has(name)) return false;
  // Fail-open: no readable code or cause — keep the historical retry behaviour.
  return true;
}

export interface TransientRetryOptions {
  maxAttempts?: number;
  baseMs?: number;
  capMs?: number;
  /** Source label propagated to onRetry for observability (e.g. "global-fallback"). */
  source?: string;
  sleep?: (ms: number, signal?: AbortSignal) => Promise<void>;
  signal?: AbortSignal;
  onRetry?: (info: { attempt: number; delayMs: number; status?: number; error?: unknown; source?: string }) => void;
}

export interface ResponseLike {
  ok: boolean;
  status: number;
  body: unknown;
}

const DEFAULT_SLEEP = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
      return;
    }
    const timer = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });

/**
 * Run an action that returns a ResponseLike or throws. Retries while the response
 * is non-OK with a transient status (502/503/504). Honours AbortSignal between
 * attempts. Returns the last response on exhaustion — never throws on a transient
 * HTTP response (only throws if the action itself throws).
 */
export async function runWithTransientBackendRetry<T extends ResponseLike>(
  action: () => Promise<T>,
  options: TransientRetryOptions = {},
): Promise<T> {
  const maxAttempts = options.maxAttempts ?? 3;
  const baseMs = options.baseMs ?? 200;
  const capMs = options.capMs ?? 2000;
  const sleep = options.sleep ?? DEFAULT_SLEEP;
  const signal = options.signal;
  const onRetry = options.onRetry;
  const source = options.source;

  let prev = baseMs;
  let lastResult: T | undefined;

  // Decorrelated jitter (AWS pattern): temp = min(cap, random(base, prev*3)); prev = temp.
  // See https://aws.amazon.com/blogs/architecture/exponential-backoff-and-jitter/ — "full jitter"
  // variant of decorrelated jitter produces lower contention under thundering-herd conditions
  // than naive exponential backoff with constant jitter.
  const decorrelatedDelay = (): number => {
    const upper = Math.max(baseMs, prev * 3);
    const candidate = baseMs + Math.floor(Math.random() * (upper - baseMs + 1));
    return Math.min(capMs, candidate);
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (signal?.aborted) {
      throw new DOMException("Retry aborted", "AbortError");
    }
    try {
      const result = await action();
      lastResult = result;
      if (result.ok) return result;
      if (!isResponseStatusRetryable(result.status)) return result;
      // Exhausted: return the last result rather than throwing
      if (attempt >= maxAttempts) return result;
      const delayMs = decorrelatedDelay();
      onRetry?.({ attempt, delayMs, status: result.status, source });
      await sleep(delayMs, signal);
      prev = delayMs;
    } catch (error) {
      if (signal?.aborted) {
        throw error;
      }
      if (!isRetryableThrownError(error)) {
        throw error;
      }
      if (attempt >= maxAttempts) throw error;
      const delayMs = decorrelatedDelay();
      onRetry?.({ attempt, delayMs, error, source });
      await sleep(delayMs, signal);
      prev = delayMs;
    }
  }

  // Unreachable, but TypeScript wants an explicit return
  return lastResult as T;
}
