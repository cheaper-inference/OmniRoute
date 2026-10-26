/**
 * KEA-7886 P8 — every hand-rolled categorical palette maps onto the kit's five chart tokens
 * (`--color-chart-1..5`). Pins the deterministic index → token/shape rule and the three
 * concrete palettes built on it (provider categories, routing strategies, compression layers).
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import {
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

test("slot = chart-(i % 5 + 1); the shape advances once per full cycle", () => {
  assert.equal(CHART_TOKEN_COUNT, 5);
  const tokens = Array.from({ length: 12 }, (_, i) => categoricalSlot(i).token);
  assert.deepEqual(tokens, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5, 1, 2]);
  assert.equal(categoricalSlot(0).shape, "circle");
  assert.equal(categoricalSlot(4).shape, "circle");
  assert.equal(categoricalSlot(5).shape, "square");
  assert.equal(categoricalSlot(10).shape, "diamond");
  assert.equal(categoricalSlot(15).shape, "circle", "shapes cycle too");
  const s = categoricalSlot(7);
  assert.equal(s.colorVar, "var(--color-chart-3)");
  assert.equal(s.fillClass, "bg-chart-3");
  assert.equal(s.chipClass, "bg-chart-3/15 border border-chart-3/50");
});

test("the first 15 slots are unique by colour + shape", () => {
  const pairs = new Set(
    Array.from({ length: CHART_TOKEN_COUNT * CATEGORICAL_SHAPES.length }, (_, i) => {
      const s = categoricalSlot(i);
      return `${s.token}/${s.shape}`;
    })
  );
  assert.equal(pairs.size, 15);
});

test("bad indexes clamp to slot 0 instead of producing undefined classes", () => {
  for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
    assert.equal(categoricalSlot(bad).fillClass, "bg-chart-1");
  }
  assert.equal(categoricalSlot(2.9).token, 3, "fractional indexes floor");
});

test("categoricalSlotFor resolves by position and returns null off-list", () => {
  const order = ["a", "b", "c"] as const;
  assert.equal(categoricalSlotFor(order, "c")?.token, 3);
  assert.equal(categoricalSlotFor(order, "zzz"), null);
  assert.equal(categoricalSlotFor(order, null), null);
});

test("provider categories: 13 keys, each a distinct colour + shape pair on the chart tokens", () => {
  assert.equal(PROVIDER_CATEGORY_ORDER.length, 13);
  const seen = new Set<string>();
  for (const key of PROVIDER_CATEGORY_ORDER) {
    const slot = providerCategorySlot(key);
    assert.ok(slot, key);
    assert.match(slot.fillClass, /^bg-chart-[1-5]$/);
    assert.doesNotMatch(slot.fillClass, RAW_HUE);
    seen.add(`${slot.token}/${slot.shape}`);
  }
  assert.equal(seen.size, 13, "no two categories collide on colour AND shape");
});

test("provider categories keep the closest hue of the old palette in the first cycle", () => {
  assert.equal(providerCategorySlot("oauth")?.fillClass, "bg-chart-2"); // blue → blue
  assert.equal(providerCategorySlot("web-cookie")?.fillClass, "bg-chart-3"); // purple → purple
  assert.equal(providerCategorySlot("free")?.fillClass, "bg-chart-4"); // green → green
  assert.equal(providerCategorySlot("audio")?.fillClass, "bg-chart-5"); // rose → pink
  // compatible and webfetch were both orange; now they differ.
  assert.notDeepEqual(providerCategorySlot("compatible"), providerCategorySlot("webfetch"));
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
    assert.equal(slot?.token, (i % 5) + 1, strategy);
    assert.equal(strategyColorVar(strategy), `var(--color-chart-${(i % 5) + 1})`);
  }
  assert.ok(strategySlot("quota-share"), "internal strategies are coloured too");
});

test("strategy badges: token tint + border, neutral ink, never a raw hue or a status tone", () => {
  for (const strategy of STRATEGY_PALETTE_ORDER) {
    const cls = strategyBadgeClass(strategy);
    assert.match(cls, /\bbg-chart-[1-5]\/15\b/);
    assert.match(cls, /\bborder-chart-[1-5]\/50\b/);
    assert.match(cls, /\btext-text-main\b/);
    assert.doesNotMatch(cls, /\btext-chart-|text-(success|warning|error|info)\b/);
    assert.doesNotMatch(cls, RAW_HUE);
  }
  assert.equal(
    strategyBadgeClass("cost-optimized"),
    "bg-chart-4/15 border border-chart-4/50 text-text-main"
  );
});

test("unknown strategies fall back to neutral, not to a chart token", () => {
  assert.equal(strategySlot("made-up"), null);
  assert.equal(strategyColorVar("made-up"), STRATEGY_NEUTRAL_COLOR);
  assert.equal(strategyColorVar(undefined), STRATEGY_NEUTRAL_COLOR);
  assert.equal(strategyBadgeClass("made-up"), "bg-bg-subtle border border-border text-text-main");
});
