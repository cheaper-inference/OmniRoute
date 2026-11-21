/**
 * The single outbound path of the network deciders (TypeSafe, operator URLs).
 *
 * - `safeOutboundFetch` with the provider outbound guard (SSRF policy + global proxy), no
 *   retries, redirects refused (`allowRedirect: false` blocks every 3xx; the transport seam
 *   also receives `redirect: "error"`, #14239);
 * - the response body is read up to 64 KB (`readBoundedJson`, #14239), so a hostile or broken
 *   decider cannot make the router buffer an unbounded answer;
 * - one timeout bounds the whole round trip, body included, and a caller abort cancels it;
 * - failures are status-only: an upstream body can echo the prompt or the key.
 */
import { DEFAULT_DECISION_TIMEOUT_MS, MAX_DECISION_TIMEOUT_MS } from "./config.ts";
import { DECISION_MODEL_REQUEST_HEADER, type DecisionFailureReason } from "./types.ts";

export const MAX_DECISION_RESPONSE_BYTES = 64 * 1024;

export interface DecisionTransportInit {
  method: "POST";
  headers: Record<string, string>;
  body: string;
  timeoutMs: number;
  signal: AbortSignal;
  redirect: "error";
}

/** The HTTP seam: production uses safeOutboundFetch, tests inject a fake. */
export type DecisionTransport = (url: string, init: DecisionTransportInit) => Promise<Response>;

export const defaultDecisionTransport: DecisionTransport = async (url, init) => {
  // Lazy so this module stays free of the proxy/TLS fetch stack until the first call.
  const [{ safeOutboundFetch }, { getProviderOutboundGuard }] = await Promise.all([
    import("@/shared/network/safeOutboundFetch"),
    import("@/shared/network/outboundUrlGuardPolicy"),
  ]);
  return safeOutboundFetch(url, {
    method: init.method,
    headers: init.headers,
    body: init.body,
    signal: init.signal,
    timeoutMs: init.timeoutMs,
    redirect: init.redirect,
    allowRedirect: false,
    retry: false,
    guard: getProviderOutboundGuard(),
  });
};

class DecisionTransportError extends Error {
  constructor(readonly reason: DecisionFailureReason) {
    super(reason);
    this.name = "DecisionTransportError";
  }
}

/** Parse a JSON body of at most `maxBytes`; throws `oversized` / `invalid_json`. */
export async function readBoundedJson(
  response: Response,
  maxBytes = MAX_DECISION_RESPONSE_BYTES
): Promise<unknown> {
  if (!response.body) throw new Error("invalid_json");
  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const result = await reader.read();
      if (result.done) break;
      size += result.value.byteLength;
      if (size > maxBytes) {
        await reader.cancel().catch(() => {});
        throw new Error("oversized");
      }
      chunks.push(result.value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch {
    throw new Error("invalid_json");
  }
}

export type DecisionPostFailure = {
  ok: false;
  reason: DecisionFailureReason;
  status?: number;
  latencyMs: number;
};

export type DecisionPostResult =
  { ok: true; data: unknown; latencyMs: number } | DecisionPostFailure;

export interface DecisionPostOptions {
  url: string;
  headers: Record<string, string>;
  body: unknown;
  timeoutMs: number;
  signal?: AbortSignal | null;
  transport?: DecisionTransport;
  now?: () => number;
}

/** Map a thrown transport error to a reason; the message itself is never kept. */
function reasonFor(error: unknown, controller: AbortController): DecisionFailureReason {
  if (error instanceof DecisionTransportError) return error.reason;
  if (controller.signal.aborted) return "timeout";
  const record = error as { name?: unknown; code?: unknown } | null;
  if (record?.name === "AbortError" || record?.code === "TIMEOUT") return "timeout";
  return "network_error";
}

async function cancelBody(response: Response): Promise<void> {
  try {
    await response.body?.cancel();
  } catch {
    // The status is all the caller needs; a body that cannot be cancelled is dropped.
  }
}

/** One decision round trip. Never throws. */
export async function postDecisionJson(options: DecisionPostOptions): Promise<DecisionPostResult> {
  const now = options.now ?? Date.now;
  const startedAt = now();
  const elapsed = () => Math.max(0, now() - startedAt);
  if (options.signal?.aborted) return { ok: false, reason: "timeout", latencyMs: 0 };

  const controller = new AbortController();
  let rejectStop: (error: DecisionTransportError) => void = () => {};
  const stopped = new Promise<never>((_, reject) => {
    rejectStop = reject;
  });
  // The race below observes the rejection; this keeps a late one from surfacing as unhandled.
  stopped.catch(() => {});
  const stop = (reason: DecisionFailureReason) => {
    controller.abort();
    rejectStop(new DecisionTransportError(reason));
  };
  const onCallerAbort = () => stop("timeout");
  options.signal?.addEventListener("abort", onCallerAbort, { once: true });
  // Callers pass a clamped value already; the explicit bound here keeps the timer delay
  // provably capped at the call site, whatever a future caller passes.
  const timeoutMs =
    options.timeoutMs > 0 && options.timeoutMs <= MAX_DECISION_TIMEOUT_MS
      ? options.timeoutMs
      : DEFAULT_DECISION_TIMEOUT_MS;
  const timer = setTimeout(() => stop("timeout"), timeoutMs);

  const operation = async (): Promise<unknown> => {
    const transport = options.transport ?? defaultDecisionTransport;
    const response = await transport(options.url, {
      method: "POST",
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
        [DECISION_MODEL_REQUEST_HEADER]: "1",
      },
      body: JSON.stringify(options.body),
      timeoutMs,
      signal: controller.signal,
      redirect: "error",
    });
    if (!response.ok) {
      await cancelBody(response);
      throw Object.assign(new DecisionTransportError("http_error"), { status: response.status });
    }
    try {
      return await readBoundedJson(response);
    } catch {
      throw new DecisionTransportError(controller.signal.aborted ? "timeout" : "invalid_response");
    }
  };

  try {
    const data = await Promise.race([operation(), stopped]);
    return { ok: true, data, latencyMs: elapsed() };
  } catch (error) {
    const status = (error as { status?: unknown }).status;
    return {
      ok: false,
      reason: reasonFor(error, controller),
      ...(typeof status === "number" ? { status } : {}),
      latencyMs: elapsed(),
    };
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", onCallerAbort);
  }
}
