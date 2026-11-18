import { ciChartSeriesOrder, type CiChartSlot } from "@omniroute/ui-kit/tokens";

/**
 * Categorical palette on the kit's eight chart tokens (KEA-7886 P8; issue #19066 block 5).
 *
 * The Keak CI UI Kit ships eight categorical colours — `--color-chart-1..8` (→ `--ci-chart-*`,
 * flipped by the theme and by Editions) — each with a text-safe `-ink` (4.5:1 on background,
 * surface and surface-subtle) and an opaque `-subtle` chip tint. Every hand-rolled categorical
 * palette in the dashboard maps onto them through this module:
 *
 * - **Deterministic index, kit order.** A category's slot is its position in a fixed, documented
 *   list owned by the caller (provider categories, routing strategies, …). Slot `i` takes token
 *   `ciChartSeriesOrder[i % 8]` — the kit's colour-blind-safe series order, the same rule as the
 *   kit's `chartSeries()` — so the mapping never depends on render order or on which categories
 *   happen to be shown.
 * - **More than eight categories.** The eight tokens cycle, and each full cycle switches the
 *   marker shape (`circle` → `square` → `diamond`, the kit `LegendMarker` `dot`/`square`/
 *   `diamond`), so the first 24 slots are all distinct by colour + shape. Colour is never the
 *   only carrier: every legend also has a text label.
 * - **Ink.** Fills, borders and strokes use the token itself. Text on a chip (or next to a
 *   marker, when it should carry the category colour) uses the token's `-ink` (`inkClass`);
 *   never the plain token as text, which falls below 4.5:1 in the light theme.
 *
 * Tailwind only generates classes it can see as literals, so every class below is spelled out.
 */

export const CHART_TOKEN_COUNT = ciChartSeriesOrder.length;

/** `var(--color-chart-N)` for token N (index N-1) — inline `style`, SVG, xyflow nodes. */
export const CHART_TOKEN_VARS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
  "var(--color-chart-8)",
] as const;

/** Solid fill for token N (index N-1): legend dots, bar segments. */
export const CHART_FILL_CLASSES = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
  "bg-chart-6",
  "bg-chart-7",
  "bg-chart-8",
] as const;

/** Chip for token N (index N-1): opaque `-subtle` tint + token border; text uses the ink class. */
export const CHART_CHIP_CLASSES = [
  "bg-chart-1-subtle border border-chart-1",
  "bg-chart-2-subtle border border-chart-2",
  "bg-chart-3-subtle border border-chart-3",
  "bg-chart-4-subtle border border-chart-4",
  "bg-chart-5-subtle border border-chart-5",
  "bg-chart-6-subtle border border-chart-6",
  "bg-chart-7-subtle border border-chart-7",
  "bg-chart-8-subtle border border-chart-8",
] as const;

/** Text-safe ink for token N (index N-1). */
export const CHART_INK_CLASSES = [
  "text-chart-1-ink",
  "text-chart-2-ink",
  "text-chart-3-ink",
  "text-chart-4-ink",
  "text-chart-5-ink",
  "text-chart-6-ink",
  "text-chart-7-ink",
  "text-chart-8-ink",
] as const;

export const CATEGORICAL_SHAPES = ["circle", "square", "diamond"] as const;
export type CategoricalShape = (typeof CATEGORICAL_SHAPES)[number];

/** Kit `LegendMarker` shape for each OmniRoute shape name. */
export const CATEGORICAL_LEGEND_SHAPES = {
  circle: "dot",
  square: "square",
  diamond: "diamond",
} as const satisfies Record<CategoricalShape, "dot" | "square" | "diamond">;

export interface CategoricalSlot {
  /** Position in the caller's fixed list (normalised to a non-negative integer). */
  index: number;
  /** Kit chart token number, 1–8 (`ciChartSeriesOrder[index % 8]`). */
  token: CiChartSlot;
  colorVar: (typeof CHART_TOKEN_VARS)[number];
  fillClass: (typeof CHART_FILL_CLASSES)[number];
  chipClass: (typeof CHART_CHIP_CLASSES)[number];
  inkClass: (typeof CHART_INK_CLASSES)[number];
  shape: CategoricalShape;
}

function normaliseIndex(index: number): number {
  if (!Number.isFinite(index) || index < 0) return 0;
  return Math.floor(index);
}

/** Slot for the `index`-th category of a fixed list: token cycles every 8, shape every 24. */
export function categoricalSlot(index: number): CategoricalSlot {
  const i = normaliseIndex(index);
  const token = ciChartSeriesOrder[i % CHART_TOKEN_COUNT];
  const t = token - 1;
  const cycle = Math.floor(i / CHART_TOKEN_COUNT);
  return {
    index: i,
    token,
    colorVar: CHART_TOKEN_VARS[t],
    fillClass: CHART_FILL_CLASSES[t],
    chipClass: CHART_CHIP_CLASSES[t],
    inkClass: CHART_INK_CLASSES[t],
    shape: CATEGORICAL_SHAPES[cycle % CATEGORICAL_SHAPES.length],
  };
}

/** Slot for `key` in `order`; `null` when the key is not part of the palette. */
export function categoricalSlotFor<K extends string>(
  order: readonly K[],
  key: string | null | undefined
): CategoricalSlot | null {
  if (!key) return null;
  const index = (order as readonly string[]).indexOf(key);
  return index === -1 ? null : categoricalSlot(index);
}
