import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import { type HealthData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
  compareDisplayAccounts,
  matchesDisplayFilter,
  displayStatus,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
const now = Date.parse("2099-01-01T00:00:00Z");
const H = 3_600_000;
const connection = { id: "a", provider: "claude", email: "a@example.test", isActive: true };
const future = (ms: number) => new Date(now + ms).toISOString();
const q = (name: string, remainingPercentage: number, ms?: number, quotaGroupId?: string) => ({
  name,
  remainingPercentage,
  resetAt: ms === undefined ? undefined : future(ms),
  quotaGroupId,
});
function account(
  quotas = [q("session", 80), q("weekly", 80)],
  extra = {},
  locks = false,
  clock = now
) {
  return buildHealthAccount({ ...connection, ...extra }, { quotas }, {}, clock, {
    policy: { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} },
    observedAt: future(0),
    cooldown: {
      id: "a",
      status: "healthy",
      ...extra,
      lockouts: locks ? [{ model: "claude-sonnet", remainingMs: H, reason: "429" }] : [],
    },
  });
}
test("low remaining quota is green and uses the tightest remaining percentage", () => {
  const a = displayAccount(account([q("session", 10), q("weekly", 80)]), now);
  assert.equal(a.kind, "ok");
  assert.equal(a.fill, 10);
  assert.equal(a.remainingPct, 10);
});
test("binding window controls cooldown kind and inverse waterline", () => {
  for (const [five, week, kind, fill] of [
    [0, 80, "cd5", 80],
    [80, 0, "cdw", 100 * (1 - 2 / 7)],
    [0, 0, "cdw", 100 * (1 - 2 / 7)],
  ] as const) {
    const a = displayAccount(account([q("session", five, H), q("weekly", week, 48 * H)]), now);
    assert.equal(a.kind, kind);
    assert.ok(Math.abs(a.fill! - fill) < 1e-8);
  }
  assert.equal(
    displayAccount(account([q("session", 0, H)], { provider: "codex" }), now).kind,
    "cd5"
  );
});
test("ordinary cooldown, expiry, terminal and lockout", () => {
  const c = (ms: number, clock = now) =>
    displayAccount(account(undefined, { rateLimitedUntil: future(ms) }, false, clock), clock);
  assert.equal(c(H / 2).kind, "cd5");
  assert.equal(c(H / 2).fill, 0);
  assert.equal(c(48 * H).kind, "cdw");
  assert.equal(c(-1).kind, "ok");
  for (const testStatus of ["banned", "expired", "credits_exhausted"])
    assert.equal(displayAccount(account(undefined, { testStatus }), now).kind, "act");
  const a = displayAccount(account(undefined, {}, true), now);
  assert.equal(a.kind, "ok");
  assert.equal(a.partial, true);
});
test("independent pools restrict partly, or block by the latest window; pool evidence stays isolated", () => {
  const quotas = [
    q("gemini_session", 80, H, "gemini"),
    q("claude_gpt_session", 0, 2 * H, "claude_gpt"),
  ];
  const a = account(quotas, { provider: "agy" });
  assert.equal(displayAccount(a, now).kind, "ok");
  assert.equal(displayAccount(a, now).partial, true);
  assert.equal(displayPool(a, "gemini", now).kind, "ok");
  assert.equal(displayPool(a, "gemini", now).fill, 80);
  assert.equal(displayPool(a, "claude_gpt", now).kind, "cd5");
  assert.equal(displayPool(a, "claude_gpt", now).partial, false);
  const both = account(
    [q("gemini_session", 0, H, "gemini"), q("claude_gpt_weekly", 0, 48 * H, "claude_gpt")],
    { provider: "agy" }
  );
  assert.equal(displayAccount(both, now).kind, "cdw");
  const d: HealthData = {
    raw: { quotaGroups: [{ id: "gemini", models: ["gemini-custom"] }, { id: "claude_gpt" }] },
    quotas,
  };
  const lock = buildHealthAccount({ ...connection, provider: "agy" }, d, {}, now, {
    observedAt: future(0),
    cooldown: {
      id: "a",
      status: "model_locked",
      lockouts: [{ model: "gemini-custom", remainingMs: H, reason: "429" }],
    },
  });
  assert.equal(displayPool(lock, "gemini", now).partial, true);
  assert.equal(displayPool(lock, "claude_gpt", now).partial, false);
});
test("unknown reset classifies by window with no invented waterline; clock increases fill then recovers", () => {
  for (const [name, kind] of [
    ["session", "cd5"],
    ["weekly", "cdw"],
    ["overall", "cdw"],
  ]) {
    const a = displayAccount(account([q(name, 0)]), now);
    assert.equal(a.kind, kind);
    assert.equal(a.fill, 0);
    assert.equal(a.waitMs, null);
  }
  const fills = [0, H / 2, H - 1].map(
    (delta) =>
      displayAccount(account([q("session", 0, H)], {}, false, now + delta), now + delta).fill!
  );
  assert.ok(fills[0] < fills[1] && fills[1] < fills[2]);
  assert.equal(
    displayAccount(account([q("session", 0, H)], {}, false, now + H), now + H).kind,
    "ok"
  );
});
test("sort is green first, partial after ordinary green, descending fill, stable name/id ties", () => {
  const list = [
    displayAccount(account([], { id: "empty" }), now),
    displayAccount(account(undefined, { id: "paused", isActive: false }), now),
    displayAccount(account(undefined, { id: "act", testStatus: "banned" }), now),
    displayAccount(account([q("weekly", 0, 48 * H)], { id: "cdw" }), now),
    displayAccount(account([q("session", 0, H)], { id: "cd5" }), now),
    displayAccount(account([q("session", 90)], { id: "partial" }, true), now),
    displayAccount(account([q("session", 10)], { id: "low" }), now),
    displayAccount(account([q("session", 90)], { id: "high" }), now),
  ];
  const sorted = [...list].sort(compareDisplayAccounts);
  assert.deepEqual(
    sorted.map((a) => a.connection.id),
    ["high", "low", "partial", "cd5", "cdw", "act", "paused", "empty"]
  );
  assert.deepEqual([...list].reverse().sort(compareDisplayAccounts), sorted);
  for (const a of list) {
    assert.equal(
      displayStatus(a),
      a.partial && a.kind === "ok"
        ? "alert"
        : { cd5: "critical", cdw: "critical", act: "critical" }[a.kind] || a.kind
    );
    assert.equal(matchesDisplayFilter(a, "critical"), ["cd5", "cdw", "act"].includes(a.kind));
    assert.equal(matchesDisplayFilter(a, "ok"), a.kind === "ok");
  }
});
