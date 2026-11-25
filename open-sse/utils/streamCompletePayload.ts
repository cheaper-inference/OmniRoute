export type StreamCompletePayload = {
  buyerCostMicro?: number | null;
  status: number;
  usage: unknown;
  /** Minimal response body for call log (streaming: usage + note; non-streaming not used) */
  responseBody?: unknown;
  providerPayload?: unknown;
  clientPayload?: unknown;
  error?: string | null;
  errorCode?: string | null;
  /**
   * Time-to-first-forwarded-SSE-chunk in ms, or null when nothing was forwarded.
   * NOT token-level TTFT — see open-sse/utils/streamTiming.ts for what is measured.
   */
  ttft?: number | null;
  firstOutputMs?: number | null; // StreamTiming.firstOutputMs(); the caller adds pre-stream time
  /** Mean inter-chunk gap in ms (chunk-latency proxy for ITL), or null. */
  itlMs?: number | null;
  /** True when the stream was interrupted (timeout/abort/error) before a clean finish. */
  interrupted?: boolean;
  cacheEvidence?: "hit" | "miss" | "unreported" | "invalid";
  /**
   * Encrypted-reasoning observation (Responses opaque `reasoning` items):
   * flag when seen, wall-clock added→done delta when paired. Efforts are
   * read at the sink from the request bodies — never threaded here.
   */
  reasoningMeta?: {
    encryptedSeen: boolean;
    durationMs: number | null;
  } | null;
};

/** Add the latest observed provider charge only when completion logging is enabled. */
export function withBuyerCostMicro(
  callback: ((payload: StreamCompletePayload) => void) | null,
  readCost: () => number | null
) {
  if (!callback) return null;
  return (payload: StreamCompletePayload) => callback({ ...payload, buyerCostMicro: readCost() });
}
