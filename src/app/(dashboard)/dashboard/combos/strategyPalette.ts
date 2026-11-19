import {
  ROUTING_STRATEGY_VALUES,
  INTERNAL_ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { categoricalSlot, type CategoricalSlot } from "@/shared/utils/categoricalPalette";

/**
 * One routing-strategy palette for the combos screens (list badge + live StrategyNode) on the
 * kit's eight chart tokens (KEA-7886 P8; #19066). The index is the strategy's position in
 * ROUTING_STRATEGY_VALUES (then the internal ones), and the token is the kit series order
 * `ciChartSeriesOrder[index % 8]`:
 *
 *   chart-4 priority · cost-optimized · lkgp
 *   chart-3 weighted · reset-aware · context-optimized
 *   chart-6 round-robin · reset-window · cache-optimized
 *   chart-7 context-relay · expiry-first · fusion
 *   chart-8 fill-first · headroom · pipeline
 *   chart-2 p2c · quota-weighted · quota-share
 *   chart-1 random · strict-random
 *   chart-5 least-used · auto
 *
 * Twenty-two palette entries (twenty-one public strategies plus the internal quota-share) share
 * eight colours, so the colour is only a grouping cue: every badge and node prints the strategy
 * name. Badge text uses the token's text-safe `-ink` on the opaque `-subtle` tint (the kit's
 * chip pair). Unknown strategies get no token and neutral ink.
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

/** Chip classes for the strategy badge: `-subtle` tint + token border + the token's `-ink`. */
export function strategyBadgeClass(strategy: string | null | undefined): string {
  const slot = strategySlot(strategy);
  return slot
    ? `${slot.chipClass} ${slot.inkClass}`
    : "bg-bg-subtle border border-border text-text-main";
}
