import test from "node:test";
import assert from "node:assert/strict";
import {
  createProviderConnection,
  deleteProviderConnection,
  getProviderConnectionById,
} from "../../src/lib/db/providers.ts";
import {
  setProviderLimitsCache,
  deleteProviderLimitsCache,
} from "../../src/lib/db/providerLimits.ts";
import { toProviderLimitsCacheEntry } from "../../src/lib/usage/providerLimitsCache.ts";
import { GET } from "../../src/app/api/usage/availability/route.ts";
import { listConnectionCooldowns } from "../../src/lib/resilience/cooldownManager.ts";
import { getProviderCredentials } from "../../src/sse/services/auth.ts";
import {
  clearAllModelLockouts,
  getAllModelLockouts,
} from "../../open-sse/services/accountFallback.ts";
import { getQuotaCacheState } from "../../src/domain/quotaCacheState.ts";
import { toProviderConnection } from "../../src/lib/db/providers/lazyConnectionView.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

for (const provider of ["antigravity", "agy"])
  for (const scenario of ["clear", "gemini", "peers"])
    test(`${provider} saved family ${scenario} is visible before credential selection`, async (t) => {
      const startedAt = Date.now();
      t.mock.method(Date, "now", () => startedAt);
      clearAllModelLockouts();
      const until = new Date(Date.now() + 600_000).toISOString();
      const blocked = scenario !== "clear";
      const peer = scenario === "peers";
      const created = await createProviderConnection({
        provider,
        authType: "oauth",
        accessToken: "synthetic-access",
        refreshToken: "synthetic-refresh",
        isActive: true,
        testStatus: "active",
        providerSpecificData: blocked
          ? { antigravityFamilyRateLimitedUntil: { gemini: until } }
          : {},
      });
      const id = String(created.id);
      const usage = {
        fetchedAt: new Date().toISOString(),
        quotas: {
          gemini_session: { remainingPercentage: 80, resetAt: until },
          gemini_weekly: { remainingPercentage: 80, resetAt: until },
          ...(peer ? { claude_gpt_session: { remainingPercentage: 80, resetAt: until } } : {}),
        },
        quotaGroups: [
          { id: "gemini", models: ["gemini-3-flash"] },
          ...(peer ? [{ id: "claude", models: ["claude-sonnet-4-5"] }] : []),
        ],
      };
      try {
        setProviderLimitsCache(id, toProviderLimitsCacheEntry(usage, "synthetic"));
        getQuotaCacheState().cache.delete(id);
        clearAllModelLockouts();
        const response = await GET();
        assert.equal(response.status, 200);
        const body = await response.json();
        const verdict = body.connections.find((c: { id: string }) => c.id === id);
        const cooldown = (await listConnectionCooldowns()).find((c) => c.id === id);
        assert.deepEqual(getAllModelLockouts(), [], "summary reads must not hydrate locks");
        assert.equal(getQuotaCacheState().cache.has(id), false, "quota read view remains private");
        const row = toProviderConnection(await getProviderConnectionById(id));
        const now = Date.now();
        const account = buildHealthAccount(row, { raw: usage }, {}, now, {
          availability: verdict,
          availabilityObservedAt: now,
          cooldown,
          observedAt: now,
        });
        const display = displayAccount(account, now);
        const pool = displayPool(account, "gemini", now);
        const scope = verdict.scopes.find((s: { id: string }) => s.id === "gemini");
        assert.equal(scope.decision.usable, !blocked);
        if (blocked) assert.equal(scope.decision.blockers[0].resetAt, until);
        assert.equal(
          verdict.account.usable,
          !blocked || peer,
          "peer pools retain any-usable aggregation"
        );
        assert.equal(pool.kind === "ok", !blocked);
        assert.equal(countDisplay([display]).ok, !blocked || peer ? 1 : 0);
        assert.equal(display.partial, peer);
        if (!peer) assert.equal(display.kind === "ok", !blocked);
        const router = await getProviderCredentials(provider, null, [id], "gemini-3-flash");
        const refused = !router || "allRateLimited" in router || "allExpired" in router;
        assert.equal(refused, blocked);
        if (blocked && router && "retryAfter" in router) assert.equal(router.retryAfter, until);
        if (peer) {
          const sibling = await getProviderCredentials(provider, null, [id], "claude-sonnet-4-5");
          assert.ok(sibling && "connectionId" in sibling);
        }
      } finally {
        clearAllModelLockouts();
        getQuotaCacheState().cache.delete(id);
        deleteProviderLimitsCache(id);
        await deleteProviderConnection(id);
      }
    });
