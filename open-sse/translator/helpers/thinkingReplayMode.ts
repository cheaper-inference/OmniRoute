/**
 * Per-node thinking-replay capability declaration.
 *
 * modelCompatOverrides entry field `thinkingReplay` (dashboard/key_value,
 * same channel as supportsVision — live, no restart):
 *   "redacted" (default) — upstream validates the Anthropic signature scheme;
 *                          synthesize redacted_thinking precursors (previous behavior)
 *   "text"              — upstream requires non-empty plain thinking text;
 *                          force the plain-text branch even for anthropic-compatible nodes
 *   "none"              — upstream neither requires nor validates a precursor
 *                          thinking block; synthesize nothing and leave replayed
 *                          blocks untouched
 *
 * Motivation: the provider-prefix assumption ("anthropic-compatible ⇒ wants
 * redacted_thinking precursors") is wrong for a growing family of Claude-shape
 * endpoints. Some reject the synthesized redacted_thinking blob with a generic
 * 400 "invalid params"; others reject the `redacted_thinking` content type
 * outright (supported types list does not include it) while accepting plain
 * `thinking` blocks; yet others accept a bare tool_use with thinking enabled
 * and want no fabricated precursor at all. A per-node declaration lets the
 * operator state the upstream's actual contract instead of the gateway
 * guessing from the provider prefix.
 */
import { getModelCompatOverrides } from "../../../src/lib/db/models/compat.ts";

export type ThinkingReplayMode = "redacted" | "text" | "none";

const VALID_MODES = new Set<string>(["redacted", "text", "none"]);
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
      if (
        entry &&
        (entry.id === model || entry.id === leaf) &&
        typeof raw === "string" &&
        VALID_MODES.has(raw)
      ) {
        v = raw as ThinkingReplayMode;
        break;
      }
    }
  } catch {
    // DB hiccup → fall back to default (prefix-assumed) behavior
  }
  cache.set(key, { v, exp: now + CACHE_TTL_MS });
  return v;
}
