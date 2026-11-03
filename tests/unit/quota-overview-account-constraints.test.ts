import assert from "node:assert/strict";
import { test } from "node:test";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";
const now = Date.parse("2099-01-01T00:00:00Z");
const policy = { enabled: true, defaultThresholdPercent: 2, providerWindowDefaults: {} };
for (const provider of ["kimi-coding", "moonshot"]) {
  for (const [short, weekly, kind, fill] of [
    [0, 80, "cd5", 80],
    [80, 0, "cdw", 100 * (1 - 2 / 7)],
    [60, 80, "ok", 60],
  ] as const) {
    test(`${provider} code windows ${short}/${weekly}: ${kind}, fill from tighter account constraint`, () => {
      const raw = {
        fetchedAt: new Date(now).toISOString(),
        quotas: {
          code_5h: {
            displayName: "Code · 5h",
            remainingPercentage: short,
            total: 100,
            used: 100 - short,
            resetAt: "2099-01-01T01:00:00Z",
          },
          code_7d: {
            displayName: "Code · 7d",
            remainingPercentage: weekly,
            total: 100,
            used: 100 - weekly,
            resetAt: "2099-01-03T00:00:00Z",
          },
        },
      };
      const account = displayAccount(
        buildHealthAccount(
          { id: "synthetic-kimi", provider, isActive: true },
          { raw, quotas: parseQuotaData(provider, raw) },
          {},
          now,
          { policy }
        ),
        now
      );
      assert.equal(account.kind, kind);
      assert.equal(account.partial, false);
      assert.ok(Math.abs(account.fill! - fill) < 1e-9);
      assert.ok(account.cells.every((c) => c.scope === "account"));
    });
  }
}
test("real Claude scoped weekly quota and model lockout remain partial, not account cooldowns", () => {
  const account = displayAccount(
    buildHealthAccount(
      { id: "synthetic-claude", provider: "claude", isActive: true },
      {
        quotas: [
          { name: "weekly", remainingPercentage: 80 },
          {
            name: "claude_sonnet_weekly",
            modelScoped: true,
            displayName: "Sonnet · 7d",
            windowSeconds: 604800,
            remainingPercentage: 0,
            resetAt: "2099-01-03T00:00:00Z",
          },
        ],
      },
      {},
      now,
      {
        policy,
        observedAt: new Date(now).toISOString(),
        cooldown: {
          id: "synthetic-claude",
          status: "model_locked",
          lockouts: [{ model: "claude-sonnet", remainingMs: 60000, reason: "429" }],
        },
      }
    ),
    now
  );
  assert.equal(account.kind, "ok");
  assert.equal(account.partial, true);
  assert.equal(account.fill, 80);
  assert.equal(account.cells[1].scope, "scoped");
  assert.ok(account.reasons.some((r) => r.type === "lockout" && r.scope === "scoped"));
});
