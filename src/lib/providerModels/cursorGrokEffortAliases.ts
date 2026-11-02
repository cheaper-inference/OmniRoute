/** Server-side Grok aliases; the dashboard uses the pure cursorAutoCatalog helpers. */

import { GROK_47_EFFORTS } from "@omniroute/open-sse/config/providers/registry/cursor/grok47.ts";
import { isCursorGrok47MaxEffortDropped } from "@omniroute/open-sse/utils/cursorAgentProtobuf/grok47MaxEffort.ts";

import type { CursorAutoCatalogEntry } from "./cursorAutoCatalog";

// Verified with grok-4.7 through AgentService/Run: each tier returned HTTP 200. Cursor's docs list
// only GROK_47_EFFORTS, so "max" is dropped only under CURSOR_GROK_47_DROP_MAX_EFFORT (#17386).
const GROK_47_FALLBACK_EFFORT_TIERS = [...GROK_47_EFFORTS, "max"] as const;

/** Expose selectable names only when Grok 4.7 itself is available upstream. */
export function ensureCursorGrokEffortAliases<
  T extends CursorAutoCatalogEntry & { supportedThinkingEfforts?: string[] },
>(models: T[]): T[] {
  const base = models.find((model) => model.id === "grok-4.7");
  if (!base) return models;
  const tiers: readonly string[] = isCursorGrok47MaxEffortDropped()
    ? GROK_47_EFFORTS
    : GROK_47_FALLBACK_EFFORT_TIERS;
  const allowed =
    base.supportedThinkingEfforts === undefined
      ? tiers
      : tiers.filter((tier) => base.supportedThinkingEfforts?.includes(tier));
  const existing = new Set(models.map((model) => model.id));
  const out: T[] = [];
  for (const model of models) {
    out.push(model);
    if (model.id !== base.id) continue;
    for (const tier of allowed) {
      const id = `${base.id}-${tier}`;
      if (existing.has(id)) continue;
      existing.add(id);
      out.push({ ...base, id, name: `${base.name} ${tier.toUpperCase()}` });
    }
  }
  return out;
}
