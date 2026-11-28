import { toNumber } from "../../utils/numeric.ts";
import { usableTokenCounter } from "../../utils/usageEvidence.ts";

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

// Only the legacy Chat fields accept positive numeric strings.
// A numeric string zero does not count as a reported zero.
function legacyCacheRead(value: unknown): unknown {
  return typeof value === "string" ? toNumber(value) || undefined : value;
}

// Share alias precedence across Chat → Claude JSON and SSE. Wire-specific clamping
// and stream state handling belong to the callers, not to evidence selection.
export function readChatCacheReadCounter(value: unknown): number | undefined {
  const usage = toRecord(value);
  return [
    legacyCacheRead(toRecord(usage.prompt_tokens_details).cached_tokens),
    legacyCacheRead(usage.cached_tokens),
    toRecord(usage.input_tokens_details).cached_tokens,
    usage.cache_read_input_tokens,
  ].find(usableTokenCounter);
}
