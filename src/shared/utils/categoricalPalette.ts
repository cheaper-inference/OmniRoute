/**
 * Categorical palette on the kit's five chart tokens (KEA-7886, P8).
 *
 * The Keak CI UI Kit ships exactly five categorical colours — `--color-chart-1..5`
 * (→ `--ci-chart-*`, flipped by the theme) — and no `-foreground` pair for them. Every
 * hand-rolled categorical palette in the dashboard maps onto them through this module:
 *
 * - **Deterministic index.** A category's slot is its position in a fixed, documented list
 *   owned by the caller (provider categories, routing strategies, …). `token = index % 5 + 1`,
 *   so the mapping never depends on render order or on which categories happen to be shown.
 * - **More than five categories.** The five tokens cycle, and each full cycle switches the
 *   marker shape (`circle` → `square` → `diamond`), so the first 15 slots are all distinct
 *   by colour + shape. Colour is never the only carrier: every legend also has a text label.
 * - **Ink.** The tokens are used only for fills, borders and strokes. Text drawn next to or on
 *   top of a token tint uses the neutral ink (`text-text-main` / `text-text-muted`), because
 *   the light-theme chart-1 (lime) and chart-5 (pink) fall below 4.5:1 as text.
 *
 * Tailwind only generates classes it can see as literals, so every class below is spelled out.
 */

export const CHART_TOKEN_COUNT = 5;

/** `var(--color-chart-N)` — for inline `style`, SVG `fill`/`stroke` and xyflow nodes. */
export const CHART_TOKEN_VARS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
] as const;

/** Solid fill (legend dots, bar segments). */
export const CHART_FILL_CLASSES = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
] as const;

/** Tinted chip: token tint + token border; pair it with a neutral ink class for the text. */
export const CHART_CHIP_CLASSES = [
  "bg-chart-1/15 border border-chart-1/50",
  "bg-chart-2/15 border border-chart-2/50",
  "bg-chart-3/15 border border-chart-3/50",
  "bg-chart-4/15 border border-chart-4/50",
  "bg-chart-5/15 border border-chart-5/50",
] as const;

export const CATEGORICAL_SHAPES = ["circle", "square", "diamond"] as const;
export type CategoricalShape = (typeof CATEGORICAL_SHAPES)[number];

/** Marker geometry per shape (the diamond is a rotated square, so it keeps the same box). */
export const CATEGORICAL_SHAPE_CLASSES: Record<CategoricalShape, string> = {
  circle: "rounded-full",
  square: "rounded-[1px]",
  diamond: "rounded-[1px] rotate-45 scale-[0.85]",
};

export interface CategoricalSlot {
  /** Position in the caller's fixed list (normalised to a non-negative integer). */
  index: number;
  /** Kit chart token number, 1–5. */
  token: 1 | 2 | 3 | 4 | 5;
  colorVar: (typeof CHART_TOKEN_VARS)[number];
  fillClass: (typeof CHART_FILL_CLASSES)[number];
  chipClass: (typeof CHART_CHIP_CLASSES)[number];
  shape: CategoricalShape;
}

function normaliseIndex(index: number): number {
  if (!Number.isFinite(index) || index < 0) return 0;
  return Math.floor(index);
}

/** Slot for the `index`-th category of a fixed list: token cycles every 5, shape every 15. */
export function categoricalSlot(index: number): CategoricalSlot {
  const i = normaliseIndex(index);
  const t = i % CHART_TOKEN_COUNT;
  const cycle = Math.floor(i / CHART_TOKEN_COUNT);
  return {
    index: i,
    token: (t + 1) as CategoricalSlot["token"],
    colorVar: CHART_TOKEN_VARS[t],
    fillClass: CHART_FILL_CLASSES[t],
    chipClass: CHART_CHIP_CLASSES[t],
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
