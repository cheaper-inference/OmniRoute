/**
 * Per-node thinking-replay capability declaration.
 *
 * modelCompatOverrides entry field `thinkingReplay` (PUT /api/provider-models or
 * key_value, same channel as supportsVision — live, no restart; a cached value can
 * take up to CACHE_TTL_MS to refresh):
 *   "redacted" (default) — Anthropic-native replay handling for nodes detected as such:
 *                          genuine signed thinking blocks stay verbatim, unsigned ones are
 *                          dropped, nothing is synthesized (manual thinking is disabled
 *                          when the final tool turn has no genuine block)
 *   "text"              — upstream requires non-empty plain thinking text;
 *                          force the plain-text branch even for anthropic-compatible nodes
 *   "none"              — upstream neither requires nor validates a precursor
 *                          thinking block; synthesize nothing, drop nothing and leave
 *                          replayed blocks exactly as the client sent them
 *
 * Motivation: the provider-prefix assumption ("anthropic-compatible ⇒ Anthropic
 * signature contract") is wrong for a growing family of Claude-shape endpoints.
 * Some reject the `redacted_thinking` content type outright (supported types list
 * does not include it) while accepting plain `thinking` blocks; others accept a
 * bare tool_use with thinking enabled and want no fabricated precursor at all. A
 * per-node declaration lets the operator state the upstream's actual contract
 * instead of the gateway guessing from the provider prefix.
 */
import { getModelCompatOverrides } from "../../../src/lib/db/models/compat.ts";
import {
  isThinkingReplayMode,
  type ThinkingReplayMode,
} from "../../../src/shared/constants/modelCompat.ts";

export type { ThinkingReplayMode };

const CACHE_TTL_MS = 15_000;
const cache = new Map<string, { v: ThinkingReplayMode | null; exp: number }>();

export function getThinkingReplayOverride(
  provider: string | null | undefined,
  model: string | null | undefined
): ThinkingReplayMode | null {
  if (!provider || !model) return null;
  const leaf = model.includes("/") ? model.slice(model.lastIndexOf("/") + 1) : model;
  const key = provider + "\u0000" + model;
  const now = Date.now();
  const hit = cache.get(key);
  if (hit && hit.exp > now) return hit.v;
  let v: ThinkingReplayMode | null = null;
  try {
    for (const entry of getModelCompatOverrides(provider)) {
      const raw = entry?.thinkingReplay;
      if (entry && (entry.id === model || entry.id === leaf) && isThinkingReplayMode(raw)) {
        v = raw;
        break;
      }
    }
  } catch {
    // DB hiccup → fall back to default (prefix-assumed) behavior
  }
  cache.set(key, { v, exp: now + CACHE_TTL_MS });
  return v;
}
