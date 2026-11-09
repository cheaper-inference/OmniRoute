import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import {
  type HealthData,
  type HealthQuota,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
const now = Date.parse("2099-01-01T00:00:00Z");
const resetAt = new Date(now + 86400000).toISOString();
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };
const q = (remainingPercentage: number) => ({
  remainingPercentage,
  used: 100 - remainingPercentage,
  total: 100,
  resetAt,
});
function project(
  provider: string,
  raw: NonNullable<HealthData["raw"]> & { modelQuotas?: Record<string, Partial<HealthQuota>> }
) {
  return buildHealthAccount(
    { id: "synthetic", provider, isActive: true },
    { raw, quotas: parseQuotaData(provider, raw) },
    {},
    now,
    { policy }
  );
}
for (const [provider, names] of [
  ["devin-cli", ["daily", "weekly"]],
  ["unknown-provider", ["arbitrary_feature_bucket"]],
  ["github", ["chat", "completions", "premium_interactions"]],
  ["glm", ["session", "weekly", "mcp_monthly"]],
  ["kimi-coding", ["code_5h", "code_7d"]],
  ["moonshot", ["code_5h", "code_7d"]],
  ["llmgateway", ["devpass_monthly", "devpass_premium_weekly"]],
] as const) {
  for (const name of names)
    test(`${provider}/${name}: absent routing scope proof defaults to account`, () => {
      const a = project(provider, { quotas: { [name]: q(0), weekly_other: q(80) } });
      assert.equal(a.cells.find((c) => c.name === name)?.scope, "account");
      assert.notEqual(displayAccount(a, now).kind, "ok");
      assert.equal(displayAccount(a, now).partial, false);
    });
}
test("devin daily=0 weekly=80 uses the long-window cooldown", () => {
  assert.equal(
    displayAccount(project("devin-cli", { quotas: { daily: q(0), weekly: q(80) } }), now).kind,
    "cdw"
  );
});
test("unknown provider single arbitrary exhausted window cannot be available", () => {
  assert.notEqual(
    displayAccount(project("unknown", { quotas: { surprise: q(0) } }), now).kind,
    "ok"
  );
});
for (const provider of ["codex", "claude", "unknown"]) {
  for (const name of [
    "constructor",
    "toString",
    "daily",
    "claude-sonnet-4",
    "future_spark_weekly",
  ]) {
    test(`${provider}/${name}: no inferred or inherited scope`, () => {
      assert.equal(project(provider, { quotas: { [name]: q(0) } }).cells[0].scope, "account");
    });
  }
}
for (const provider of ["antigravity", "agy"])
  test(`${provider} exact-model routing proof stays partial alongside healthy pools`, () => {
    const a = project(provider, {
      quotas: { "gemini-3-flash": q(0) },
      quotaGroups: [
        { id: "gemini", windows: { weekly: q(80) } },
        { id: "claude_gpt", windows: { weekly: q(80) } },
      ],
    });
    assert.equal(a.cells.find((c) => c.name === "gemini-3-flash")?.scope, "scoped");
    assert.equal(displayAccount(a, now).kind, "ok");
    assert.equal(displayAccount(a, now).partial, true);
  });
test("Claude scope provenance survives modelQuotas parsing; names alone confer no scope", () => {
  // Deliberately no model/window words: provenance, not a name heuristic.
  const a = project("claude", { quotas: { weekly: q(80) }, modelQuotas: { bucket: q(0) } });
  assert.equal(a.cells.find((c) => c.name === "bucket")?.scope, "scoped");
  assert.equal(displayAccount(a, now).kind, "ok");
  assert.equal(displayAccount(a, now).partial, true);
  const unmarked = project("claude", { quotas: { claude_sonnet_weekly: q(0) } });
  assert.equal(unmarked.cells[0].scope, "account");
});
for (const name of [
  "gpt_5_3_codex_spark_session",
  "gpt_5_3_codex_spark_weekly",
  "code_review",
  "code_review_weekly",
]) {
  test(`Codex explicit scoped mapping ${name} is partial`, () => {
    const a = displayAccount(project("codex", { quotas: { weekly: q(80), [name]: q(0) } }), now);
    assert.equal(a.kind, "ok");
    assert.equal(a.partial, true);
  });
}
for (const name of ["reserve_session", "reserve_weekly"])
  test(`Codex ${name} is display-only, not a routing restriction`, () => {
    const a = displayAccount(project("codex", { quotas: { weekly: q(80), [name]: q(0) } }), now);
    assert.equal(a.kind, "ok");
    assert.equal(a.partial, false);
    assert.equal(
      a.cells.some((c) => c.name === name),
      false
    );
  });
for (const name of ["free_daily", "free_rpm"])
  test(`OpenRouter ${name} only restricts :free models`, () => {
    const a = displayAccount(
      project("openrouter", { quotas: { weekly: q(80), [name]: q(0) } }),
      now
    );
    assert.equal(a.cells.find((c) => c.name === name)?.scope, "scoped");
    assert.equal(a.kind, "ok");
    assert.equal(a.partial, true);
  });
test("quotaGroupId independent pools retain partial/full blocking", () => {
  for (const second of [80, 0]) {
    const a = project("antigravity", {
      quotaGroups: [
        { id: "gemini", windows: { weekly: q(0) } },
        { id: "claude_gpt", windows: { weekly: q(second) } },
      ],
    });
    assert.equal(displayPool(a, "gemini", now).kind, "cdw");
    assert.equal(displayAccount(a, now).kind, second ? "ok" : "cdw");
  }
});
