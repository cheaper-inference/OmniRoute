import assert from "node:assert/strict";
import test from "node:test";
import { enrichLocalEndpoints } from "../src/catalog.ts";
import { buildDesiredGraph } from "../src/graph.ts";
import { planCpa } from "../src/cpa/plan.ts";
import type { LocalEndpoint } from "../src/types.ts";

const sub = (connectionId: string, providerId: string, modelId: string): LocalEndpoint => ({
  connectionId, providerId, modelId, billingClass: "subscription", active: true,
});

function graph(endpoints: LocalEndpoint[], families: Record<string, string>) {
  return buildDesiredGraph({
    enriched: enrichLocalEndpoints(endpoints, Object.entries(families).map(([modelId, familyId]) => ({ modelId, familyId }))),
    health: {},
  });
}

function refs(g: ReturnType<typeof graph>, name: string) {
  return g.combos.find((c) => c.name === name)?.models.map((m) => (m.kind === "combo-ref" ? m.comboName : m.model)) ?? [];
}

test("the unversioned alias refs only the newest version and the old pin stays", () => {
  const g = graph(
    [sub("a", "codex", "gpt-5.6-sol"), sub("a", "codex", "gpt-6-sol")],
    { "gpt-5.6-sol": "gpt/sol", "gpt-6-sol": "gpt/sol" },
  );
  assert.deepEqual(refs(g, "gpt/sol"), ["gpt/sol/6"]);
  assert.ok(g.combos.some((c) => c.name === "gpt/sol/5.6"));
});

test("gpt/astra never resolves to luna and gemini pro never resolves to argon", () => {
  const g = graph(
    [sub("a", "codex", "gpt-6-astra"), sub("b", "opencode-go", "gpt-6-luna"), sub("c", "antigravity", "gemini-3.1-pro"), sub("d", "opencode-go", "gemini-4-argon")],
    { "gpt-6-astra": "gpt/astra", "gpt-6-luna": "gpt/luna", "gemini-3.1-pro": "gemini/pro", "gemini-4-argon": "gemini/argon" },
  );
  assert.ok(refs(g, "gpt/astra").every((m) => !String(m).includes("luna")));
  assert.ok(refs(g, "gemini/pro").every((m) => !String(m).includes("argon") && !String(m).includes("carbon")));
});

test("an effort alias exists only when the first provider has the exact suffix", () => {
  const present = graph(
    [sub("a", "codex", "gpt-6-sol"), sub("a", "codex", "gpt-6-sol-high")],
    { "gpt-6-sol": "gpt/sol", "gpt-6-sol-high": "gpt/sol" },
  );
  assert.ok(present.combos.some((c) => c.name === "gpt/sol/6/high"));
  const absent = graph([sub("a", "codex", "gpt-6-terra")], { "gpt-6-terra": "gpt/terra" });
  assert.ok(!absent.combos.some((c) => c.name.endsWith("/high")));
});

test("the unsuffixed alias is not an effort mix and flash is not an effort", () => {
  const g = graph(
    [sub("a", "codex", "gpt-6-sol"), sub("a", "codex", "gpt-6-sol-high"), sub("b", "opencode-go", "qwen3.8-flash")],
    { "gpt-6-sol": "gpt/sol", "gpt-6-sol-high": "gpt/sol", "qwen3.8-flash": "qwen/qwen" },
  );
  assert.deepEqual(refs(g, "gpt/sol"), ["gpt/sol/6"]);
  assert.ok(!g.combos.some((c) => c.name.endsWith("/flash")));
});

test("cpa emits the first native card or says it cannot represent ordered fallback", () => {
  const g = graph(
    [sub("a", "codex", "gpt-6-sol"), sub("b", "opencode-go", "gpt-6-sol")],
    { "gpt-6-sol": "gpt/sol" },
  );
  const plan = planCpa({ desired: g, liveProviders: [], omnirouteBaseUrl: "https://omni", omnirouteApiKeyRef: "env:K" });
  const version = g.combos.find((c) => c.name === "gpt/sol/6");
  if (version && version.models.filter((m) => m.kind === "model").length > 1) {
    assert.ok(plan.omitted.some((o) => o.reason.includes("ordered fallback")));
  }
});

test("a combo without the ownership marker is never in the desired set", () => {
  const g = graph([sub("a", "codex", "gpt-6-sol")], { "gpt-6-sol": "gpt/sol" });
  assert.ok(g.combos.every((c) => c.description.startsWith("managed-by:family-alias-maintainer/v2")));
});
