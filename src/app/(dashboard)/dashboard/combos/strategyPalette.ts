import {
  ROUTING_STRATEGY_VALUES,
  INTERNAL_ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { categoricalSlot, type CategoricalSlot } from "@/shared/utils/categoricalPalette";

/**
 * One routing-strategy palette for the combos screens (list badge + live StrategyNode) on the
 * kit's five chart tokens (KEA-7886, P8). The index is the strategy's position in
 * ROUTING_STRATEGY_VALUES (then the internal ones), so `chart-(index % 5 + 1)`:
 *
 *   chart-1 priority · p2c · reset-window · lkgp · quota-share
 *   chart-2 weighted · random · headroom · context-optimized
 *   chart-3 round-robin · least-used · quota-weighted · cache-optimized
 *   chart-4 context-relay · cost-optimized · strict-random · fusion
 *   chart-5 fill-first · reset-aware · auto · pipeline
 *
 * Twenty strategies share five colours, so the colour is only a grouping cue: every badge and
 * node prints the strategy name in neutral ink (the chart tokens have no `-foreground` pair and
 * lime/pink text fails contrast on the light surface). Unknown strategies get no token.
 */
export const STRATEGY_PALETTE_ORDER: readonly string[] = [
  ...ROUTING_STRATEGY_VALUES,
  ...INTERNAL_ROUTING_STRATEGY_VALUES,
];

export function strategySlot(strategy: string | null | undefined): CategoricalSlot | null {
  if (!strategy) return null;
  const index = STRATEGY_PALETTE_ORDER.indexOf(strategy);
  return index === -1 ? null : categoricalSlot(index);
}

/** Neutral fallback for a strategy outside the palette (border/stroke only). */
export const STRATEGY_NEUTRAL_COLOR = "var(--color-text-muted)";

/** `var(--color-chart-N)` for inline styles (xyflow node border/glow). */
export function strategyColorVar(strategy: string | null | undefined): string {
  return strategySlot(strategy)?.colorVar ?? STRATEGY_NEUTRAL_COLOR;
}

/** Chip classes for the strategy badge: token tint + border, neutral ink for the label. */
export function strategyBadgeClass(strategy: string | null | undefined): string {
  const slot = strategySlot(strategy);
  return `${slot ? slot.chipClass : "bg-bg-subtle border border-border"} text-text-main`;
}
