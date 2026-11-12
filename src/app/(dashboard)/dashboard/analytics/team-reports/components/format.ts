import { formatDuration } from "@/shared/utils/formatting";

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "-";
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? "-"
    : date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

interface StoredTokens {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  /** Server-computed uncached input (per request); preferred over the aggregate difference. */
  uncachedInput?: number;
}

export interface TokenSplit {
  /** Input that was not served from or written to the prompt cache. */
  input: number;
  /** Output as stored; reasoning tokens are already part of it. */
  output: number;
  /** Cache reads plus cache writes. */
  cache: number;
  cacheRead: number;
  cacheCreation: number;
}

/**
 * Split stored token counters into three figures that do not overlap. The input counter already
 * includes cache reads and writes (the cost calculator subtracts them the same way), so showing
 * it next to the cache figure would count the cached part twice.
 */
export function splitTokens(tokens: StoredTokens): TokenSplit {
  const cache = tokens.cacheRead + tokens.cacheCreation;
  return {
    input: tokens.uncachedInput ?? Math.max(0, tokens.input - cache),
    output: tokens.output,
    cache,
    cacheRead: tokens.cacheRead,
    cacheCreation: tokens.cacheCreation,
  };
}

/** Shown in place of a figure that has no value (no input, no latency samples, no sessions). */
export const NO_VALUE = "—";

/** Time spans as "2h 14m", "12m 5s", "48s"; sub-second spans round to "0s". */
export function formatSpan(ms: number | null | undefined): string {
  if (ms == null || !Number.isFinite(ms)) return NO_VALUE;
  const total = Math.max(0, Math.round(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

/** Request latency and TTFT: "420ms", "1.2s". `null` and 0 (nothing recorded) read as no value. */
export function formatLatency(ms: number | null | undefined): string {
  return ms ? formatDuration(ms) : NO_VALUE;
}

/** A 0..1 ratio as "87.5%". */
export function formatRatio(ratio: number | null | undefined): string {
  return ratio == null || !Number.isFinite(ratio) ? NO_VALUE : `${(ratio * 100).toFixed(1)}%`;
}
