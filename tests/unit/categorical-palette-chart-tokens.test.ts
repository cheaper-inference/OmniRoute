/**
 * KEA-7886 P8 / #19066 — every hand-rolled categorical palette maps onto the kit's eight chart
 * tokens (`--color-chart-1..8`) in the kit's series order (`ciChartSeriesOrder`). Pins the
 * deterministic index → token/shape rule and the three concrete palettes built on it (provider
 * categories, routing strategies, compression layers).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { ciChartSeriesOrder } from "../../packages/ui-kit/src/tokens";
import { chartSeries } from "../../packages/ui-kit/src/legend-marker";
import {
  CATEGORICAL_LEGEND_SHAPES,
  CATEGORICAL_SHAPES,
  CHART_TOKEN_COUNT,
  categoricalSlot,
  categoricalSlotFor,
} from "../../src/shared/utils/categoricalPalette";
import {
  PROVIDER_CATEGORY_ORDER,
  normalizeProviderCategory,
  providerCategorySlot,
} from "../../src/app/(dashboard)/dashboard/providers/providerCategoryPalette";
import {
  STRATEGY_PALETTE_ORDER,
  STRATEGY_NEUTRAL_COLOR,
  strategyBadgeClass,
  strategyColorVar,
  strategySlot,
} from "../../src/app/(dashboard)/dashboard/combos/strategyPalette";
import { ROUTING_STRATEGY_VALUES } from "../../src/shared/constants/routingStrategies";

const RAW_HUE =
  /-(red|green|blue|amber|yellow|emerald|rose|slate|gray|zinc|stone|neutral|indigo|violet|purple|orange|cyan|sky|teal|lime|pink|fuchsia)-\d/;

test("slot = ciChartSeriesOrder[i % 8]; the shape advances once per full cycle", () => {
  assert.equal(CHART_TOKEN_COUNT, 8);
  assert.deepEqual([...ciChartSeriesOrder], [4, 3, 6, 7, 8, 2, 1, 5], "the kit series order");
  const tokens = Array.from({ length: 12 }, (_, i) => categoricalSlot(i).token);
  assert.deepEqual(tokens, [4, 3, 6, 7, 8, 2, 1, 5, 4, 3, 6, 7]);
  assert.equal(categoricalSlot(0).shape, "circle");
  assert.equal(categoricalSlot(7).shape, "circle");
  assert.equal(categoricalSlot(8).shape, "square");
  assert.equal(categoricalSlot(16).shape, "diamond");
  assert.equal(categoricalSlot(24).shape, "circle", "shapes cycle too");
  const s = categoricalSlot(9);
  assert.equal(s.token, 3);
  assert.equal(s.colorVar, "var(--color-chart-3)");
  assert.equal(s.fillClass, "bg-chart-3");
  assert.equal(s.chipClass, "bg-chart-3-subtle border border-chart-3");
  assert.equal(s.inkClass, "text-chart-3-ink");
});

test("every slot matches the kit chartSeries() token and LegendMarker shape", () => {
  for (let i = 0; i < 30; i++) {
    const slot = categoricalSlot(i);
    const kit = chartSeries(i);
    assert.equal(slot.token, kit.token, `slot ${i} token`);
    assert.equal(slot.colorVar, `var(--color-chart-${kit.token})`, `slot ${i} colour`);
    assert.equal(CATEGORICAL_LEGEND_SHAPES[slot.shape], kit.shape, `slot ${i} shape`);
  }
});

test("chips use the opaque -subtle tint + token border, and the text-safe -ink for text", () => {
  for (let i = 0; i < CHART_TOKEN_COUNT; i++) {
    const { token, chipClass, inkClass, fillClass } = categoricalSlot(i);
    assert.equal(chipClass, `bg-chart-${token}-subtle border border-chart-${token}`);
    assert.equal(inkClass, `text-chart-${token}-ink`);
    assert.equal(fillClass, `bg-chart-${token}`);
    assert.doesNotMatch(chipClass, /\/\d/, "no translucent tint: the kit ships an opaque one");
  }
});

test("the first 24 slots are unique by colour + shape", () => {
  const pairs = new Set(
    Array.from({ length: CHART_TOKEN_COUNT * CATEGORICAL_SHAPES.length }, (_, i) => {
      const s = categoricalSlot(i);
      return `${s.token}/${s.shape}`;
    })
  );
  assert.equal(pairs.size, 24);
});

test("bad indexes clamp to slot 0 instead of producing undefined classes", () => {
  for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(categoricalSlot(bad).fillClass, "bg-chart-4");
  }
  assert.equal(categoricalSlot(2.9).token, 6, "fractional indexes floor (slot 2 → chart-6)");
});

test("categoricalSlotFor resolves by position and returns null off-list", () => {
  const order = ["a", "b", "c"] as const;
  assert.equal(categoricalSlotFor(order, "c")?.token, 6);
  assert.equal(categoricalSlotFor(order, "zzz"), null);
  assert.equal(categoricalSlotFor(order, null), null);
});

test("provider categories: 13 keys, each a distinct colour + shape pair on the chart tokens", () => {
  assert.equal(PROVIDER_CATEGORY_ORDER.length, 13);
  const seen = new Set<string>();
  for (const key of PROVIDER_CATEGORY_ORDER) {
    const slot = providerCategorySlot(key);
    assert.ok(slot, key);
    assert.match(slot.fillClass, /^bg-chart-[1-8]$/);
    assert.doesNotMatch(slot.fillClass, RAW_HUE);
    seen.add(`${slot.token}/${slot.shape}`);
  }
  assert.equal(seen.size, 13, "no two categories collide on colour AND shape");
});

test("provider categories keep the closest hue of the old palette under the kit order", () => {
  assert.equal(providerCategorySlot("oauth")?.fillClass, "bg-chart-2"); // blue → blue
  assert.equal(providerCategorySlot("web-cookie")?.fillClass, "bg-chart-3"); // purple → purple
  assert.equal(providerCategorySlot("free")?.fillClass, "bg-chart-4"); // green → green
  assert.equal(providerCategorySlot("audio")?.fillClass, "bg-chart-5"); // rose → pink
  assert.equal(providerCategorySlot("compatible")?.fillClass, "bg-chart-6"); // orange → orange
  for (const key of ["oauth", "web-cookie", "free", "audio", "compatible"]) {
    assert.equal(providerCategorySlot(key)?.shape, "circle", `${key} is in the first cycle`);
  }
  // compatible and webfetch were both orange; now they share the hue but differ by shape.
  assert.notDeepEqual(providerCategorySlot("compatible"), providerCategorySlot("webfetch"));
  assert.equal(providerCategorySlot("webfetch")?.shape, "square");
});

test("provider category aliases used by the summary card resolve to the same slot", () => {
  assert.equal(normalizeProviderCategory("webcookie"), "web-cookie");
  assert.equal(normalizeProviderCategory("cloudagent"), "cloud-agent");
  assert.deepEqual(providerCategorySlot("webcookie"), providerCategorySlot("web-cookie"));
  assert.equal(providerCategorySlot("not-a-category"), null);
  assert.equal(providerCategorySlot(null), null);
});

test("strategy palette covers every public routing strategy, in ROUTING_STRATEGY_VALUES order", () => {
  for (const [i, strategy] of ROUTING_STRATEGY_VALUES.entries()) {
    assert.equal(STRATEGY_PALETTE_ORDER[i], strategy);
    const slot = strategySlot(strategy);
    const token = ciChartSeriesOrder[i % 8];
    assert.equal(slot?.token, token, strategy);
    assert.equal(strategyColorVar(strategy), `var(--color-chart-${token})`);
  }
  assert.ok(strategySlot("quota-share"), "internal strategies are coloured too");
});

test("strategy badges: -subtle tint + token border + the same token's -ink, never a raw hue", () => {
  for (const strategy of STRATEGY_PALETTE_ORDER) {
    const cls = strategyBadgeClass(strategy);
    const token = strategySlot(strategy)?.token;
    assert.ok(token, strategy);
    assert.match(cls, new RegExp(`\\bbg-chart-${token}-subtle\\b`));
    assert.match(cls, new RegExp(`\\bborder-chart-${token}(?=\\s|$)`));
    assert.match(cls, new RegExp(`\\btext-chart-${token}-ink\\b`), "text uses the text-safe ink");
    assert.doesNotMatch(cls, /\btext-chart-[1-8](?=\s|$)/, "never the plain token as text");
    assert.doesNotMatch(cls, /text-(success|warning|error|info)\b/);
    assert.doesNotMatch(cls, RAW_HUE);
  }
  assert.equal(
    strategyBadgeClass("cost-optimized"),
    "bg-chart-4-subtle border border-chart-4 text-chart-4-ink"
  );
});

test("unknown strategies fall back to neutral, not to a chart token", () => {
  assert.equal(strategySlot("made-up"), null);
  assert.equal(strategyColorVar("made-up"), STRATEGY_NEUTRAL_COLOR);
  assert.equal(strategyColorVar(undefined), STRATEGY_NEUTRAL_COLOR);
  assert.equal(strategyBadgeClass("made-up"), "bg-bg-subtle border border-border text-text-main");
});
