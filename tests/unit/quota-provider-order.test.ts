import test from "node:test";
import assert from "node:assert/strict";

// Operator-defined provider order for the Quota Tracker (drag-to-reorder).
// `settings.quotaProviderOrder` overrides the built-in PROVIDER_ORDER group
// ranking; an empty/absent order must leave the default layout untouched.

const orderUtils = await import("../../src/shared/utils/quotaProviderOrder.ts");
const utils =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx");
const constants =
  await import("../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/constants.ts");
const { updateSettingsSchema } = await import("../../src/shared/validation/settingsSchemas.ts");

const {
  sanitizeQuotaProviderOrder,
  buildProviderRankMap,
  providerSequence,
  moveProviderBlock,
  QUOTA_PROVIDER_ORDER_MAX_ENTRIES,
} = orderUtils;
const { compareQuotaConnections, compareProviderGroups } = utils;
const { PROVIDER_ORDER, PROVIDER_LABEL } = constants;

type Conn = { id: string; provider: string; name?: string };

function sortConns(conns: Conn[], providerOrder: Record<string, number>): string[] {
  return [...conns]
    .sort((a, b) =>
      compareQuotaConnections(a, b, { providerOrder, providerLabels: PROVIDER_LABEL })
    )
    .map((c) => c.id);
}

function sortGroups(keys: string[], providerOrder: Record<string, number>): string[] {
  return [...keys].sort((a, b) =>
    compareProviderGroups(a, b, { providerOrder, providerLabels: PROVIDER_LABEL })
  );
}

const MIXED: Conn[] = [
  { id: "cl", provider: "claude", name: "Claude acc" },
  { id: "ag", provider: "antigravity", name: "Ag acc" },
  { id: "cx", provider: "codex", name: "Codex acc" },
  { id: "zz", provider: "zz-unranked", name: "Unranked acc" },
  { id: "gh", provider: "github", name: "GH acc" },
];

test("custom order puts claude before antigravity (antigravity is first by default)", () => {
  assert.deepEqual(
    sortGroups(["antigravity", "claude"], PROVIDER_ORDER),
    ["antigravity", "claude"],
    "built-in order pins antigravity first"
  );
  const ranks = buildProviderRankMap(["claude", "antigravity"], PROVIDER_ORDER);
  assert.ok(ranks.claude < ranks.antigravity, "claude ranks before antigravity");
  assert.deepEqual(sortGroups(["antigravity", "claude"], ranks), ["claude", "antigravity"]);
  assert.deepEqual(sortConns(MIXED, ranks).slice(0, 2), ["cl", "ag"]);
});

test("empty or invalid order is byte-identical to PROVIDER_ORDER", () => {
  for (const raw of [[], undefined, null, "claude", { 0: "claude" }, [42, null, "  "]]) {
    const ranks = buildProviderRankMap(raw, PROVIDER_ORDER);
    assert.equal(ranks, PROVIDER_ORDER, `same reference for ${JSON.stringify(raw)}`);
    assert.deepEqual(sortConns(MIXED, ranks), sortConns(MIXED, PROVIDER_ORDER));
  }
  assert.deepEqual(sortConns(MIXED, PROVIDER_ORDER), ["ag", "gh", "cx", "cl", "zz"]);
});

test("providers missing from the custom order keep PROVIDER_ORDER order after listed ones", () => {
  const ranks = buildProviderRankMap(["codex"], PROVIDER_ORDER);
  assert.deepEqual(sortConns(MIXED, ranks), ["cx", "ag", "gh", "cl", "zz"]);
  // An unranked provider explicitly listed is placed by the custom order.
  const withUnranked = buildProviderRankMap(["zz-unranked", "claude"], PROVIDER_ORDER);
  assert.deepEqual(sortConns(MIXED, withUnranked), ["zz", "cl", "ag", "gh", "cx"]);
  // Built-in ranks of unlisted providers are not rewritten.
  assert.equal(withUnranked.github, PROVIDER_ORDER.github);
  assert.equal(PROVIDER_ORDER.claude, 5, "PROVIDER_ORDER itself is never mutated");
});

test("a full 200-entry custom order still ranks every listed provider first", () => {
  const order = Array.from({ length: QUOTA_PROVIDER_ORDER_MAX_ENTRIES }, (_, i) => `p${i}`);
  order[order.length - 1] = "claude";
  const ranks = buildProviderRankMap(order, PROVIDER_ORDER);
  assert.ok(ranks.claude < ranks.antigravity, "last listed still before any unlisted");
  assert.ok(ranks.p0 < ranks.claude);
});

test("sanitizeQuotaProviderOrder drops non-strings, trims, dedupes and caps", () => {
  assert.deepEqual(sanitizeQuotaProviderOrder(undefined), []);
  assert.deepEqual(sanitizeQuotaProviderOrder("claude"), []);
  assert.deepEqual(
    sanitizeQuotaProviderOrder([" claude ", 42, null, "", "   ", "codex", "claude", {}]),
    ["claude", "codex"]
  );
  assert.deepEqual(sanitizeQuotaProviderOrder(["x".repeat(65), "ok"]), ["ok"]);
  const many = Array.from({ length: 500 }, (_, i) => `p${i}`);
  const capped = sanitizeQuotaProviderOrder(many);
  assert.equal(capped.length, QUOTA_PROVIDER_ORDER_MAX_ENTRIES);
  assert.equal(capped[0], "p0");
});

test("providerSequence lists distinct providers in first-seen order", () => {
  assert.deepEqual(
    providerSequence([
      { provider: "codex" },
      { provider: "codex" },
      { provider: "claude" },
      { provider: undefined },
      { provider: "codex" },
    ]),
    ["codex", "claude"]
  );
});

test("moveProviderBlock moves the whole provider; no-op returns the same array", () => {
  const seq = ["antigravity", "github", "codex", "claude"];
  assert.deepEqual(moveProviderBlock(seq, "claude", "antigravity"), [
    "claude",
    "antigravity",
    "github",
    "codex",
  ]);
  assert.deepEqual(moveProviderBlock(seq, "antigravity", "codex"), [
    "github",
    "codex",
    "antigravity",
    "claude",
  ]);
  assert.equal(moveProviderBlock(seq, "codex", "codex"), seq, "same provider");
  assert.equal(moveProviderBlock(seq, "nope", "codex"), seq, "unknown source");
  assert.equal(moveProviderBlock(seq, "codex", "nope"), seq, "unknown target");
  assert.deepEqual(seq, ["antigravity", "github", "codex", "claude"], "input untouched");
});

test("settings PATCH schema accepts quotaProviderOrder and rejects bad payloads", () => {
  const ok = updateSettingsSchema.safeParse({ quotaProviderOrder: [" claude ", "codex"] });
  assert.equal(ok.success, true);
  if (ok.success) assert.deepEqual(ok.data.quotaProviderOrder, ["claude", "codex"]);
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: [] }).success, true);

  const tooMany = Array.from({ length: 500 }, (_, i) => `p${i}`);
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: tooMany }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ quotaProviderOrder: ["claude", 42] }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: ["   "] }).success, false);
  assert.equal(
    updateSettingsSchema.safeParse({ quotaProviderOrder: ["x".repeat(65)] }).success,
    false
  );
  assert.equal(updateSettingsSchema.safeParse({ quotaProviderOrder: "claude" }).success, false);
});
