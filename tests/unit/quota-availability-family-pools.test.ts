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
import { setQuotaCache } from "../../src/domain/quotaCache.ts";
import { toProviderConnection } from "../../src/lib/db/providers/lazyConnectionView.ts";
import { buildHealthAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/healthOverview.ts";
import {
  displayAccount,
  displayPool,
  countDisplay,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";
import { availabilityScopes } from "../../src/lib/usage/availabilityScopes.ts";
import { getProviderModels } from "../../open-sse/config/providerModels.ts";
import { getAntigravityQuotaFamily } from "../../open-sse/services/antigravityQuotaFamily.ts";
import type { ConnectionQuotaAvailability } from "../../src/lib/usage/availabilityTypes.ts";
import {
  buildConnectionQuotaAvailability,
  evaluateCachedQuotaAvailability,
} from "../../src/lib/usage/availability.ts";

for (const provider of ["antigravity", "agy"]) {
  for (const source of ["model cache", "snapshot"]) {
    for (const scenario of ["both cooling", "clear", "gemini cooling"]) {
      test(`${provider} ${source} without groups keeps ${scenario} consistent with selection`, async () => {
        clearAllModelLockouts();
        const now = Date.now();
        const geminiUntil = new Date(now + 600_000).toISOString();
        const claudeUntil = new Date(now + 1_200_000).toISOString();
        const geminiBlocked = scenario !== "clear";
        const claudeBlocked = scenario === "both cooling";
        const created = await createProviderConnection({
          provider,
          authType: "oauth",
          accessToken: "synthetic-access",
          refreshToken: "synthetic-refresh",
          isActive: true,
          testStatus: "active",
          providerSpecificData: {
            antigravityFamilyRateLimitedUntil: {
              ...(geminiBlocked ? { gemini: geminiUntil } : {}),
              ...(claudeBlocked ? { claude: claudeUntil } : {}),
            },
          },
        });
        const id = String(created.id);
        const usage = {
          fetchedAt: new Date(now).toISOString(),
          quotas: {
            "gemini-3-flash": { remainingPercentage: 80, resetAt: geminiUntil },
            "claude-sonnet-4-5": { remainingPercentage: 80, resetAt: claudeUntil },
          },
          quotaGroups: [],
        };
        try {
          if (source === "snapshot")
            setQuotaCache(id, provider, {
              gemini_session: { remainingPercentage: 80, resetAt: geminiUntil },
              claude_gpt_session: { remainingPercentage: 80, resetAt: claudeUntil },
            });
          else setProviderLimitsCache(id, toProviderLimitsCacheEntry(usage, "synthetic"));
          getQuotaCacheState().cache.delete(id);
          clearAllModelLockouts();
          const response = await GET();
          assert.equal(response.status, 200);
          const body = await response.json();
          const verdict: ConnectionQuotaAvailability = body.connections.find(
            (row: { id: string }) => row.id === id
          );
          assert.ok(verdict);
          const cooldown = (await listConnectionCooldowns()).find((row) => row.id === id);
          assert.deepEqual(getAllModelLockouts(), [], "summary cannot hydrate model locks");
          assert.equal(
            getQuotaCacheState().cache.has(id),
            false,
            "summary uses a private read view"
          );
          const row = toProviderConnection(await getProviderConnectionById(id));
          const observedAt = Date.now();
          const account = buildHealthAccount(
            row,
            source === "snapshot" ? undefined : { raw: usage },
            {},
            observedAt,
            { availability: verdict, availabilityObservedAt: observedAt, cooldown, observedAt }
          );
          const display = displayAccount(account, observedAt);
          assert.equal(verdict.account.usable, !claudeBlocked);
          assert.equal(display.kind === "ok", !claudeBlocked);
          assert.equal(countDisplay([display]).ok, Number(!claudeBlocked));
          assert.equal(display.partial, geminiBlocked && !claudeBlocked);
          if (claudeBlocked) {
            assert.equal(verdict.account.recoveryWindow?.resetAt, geminiUntil);
            assert.equal(
              display.recoverAt,
              geminiUntil,
              "first family recovery restores the account"
            );
          }
          if (geminiBlocked) {
            assert.ok(display.reasons.some((reason) => reason.type === "lockout"));
            assert.ok(
              verdict.scopes.some((scope) =>
                scope.decision.blockers.some(
                  (blocker) => blocker.reason === "modelLockout" && blocker.resetAt === geminiUntil
                )
              )
            );
          }
          for (const [poolId, model, blocked] of [
            ["gemini", "gemini-3-flash", geminiBlocked],
            ["claude_gpt", "claude-sonnet-4-5", claudeBlocked],
          ] as const) {
            const pool = verdict.scopes.find(
              (scope) => scope.kind === "group" && scope.id === poolId
            );
            assert.ok(pool);
            assert.equal(pool.decision.usable, !blocked);
            assert.equal(displayPool(account, poolId, observedAt).kind === "ok", !blocked);
            const router = await getProviderCredentials(provider, null, [id], model);
            if (blocked) assert.ok(router && "allRateLimited" in router && router.allRateLimited);
            else assert.ok(router && "connectionId" in router && router.connectionId === id);
          }
        } finally {
          clearAllModelLockouts();
          getQuotaCacheState().cache.delete(id);
          deleteProviderLimitsCache(id);
          await deleteProviderConnection(id);
        }
      });
    }
  }

  test(`${provider} unobserved Claude family pool agrees with ordinary Claude selection`, async () => {
    clearAllModelLockouts();
    const until = new Date(Date.now() + 600_000).toISOString();
    const created = await createProviderConnection({
      provider,
      authType: "oauth",
      accessToken: "synthetic-access",
      refreshToken: "synthetic-refresh",
      isActive: true,
      testStatus: "active",
      providerSpecificData: { antigravityFamilyRateLimitedUntil: { gemini: until } },
    });
    const id = String(created.id);
    try {
      setProviderLimitsCache(
        id,
        toProviderLimitsCacheEntry(
          {
            quotas: { "gemini-3-flash": { remainingPercentage: 80, resetAt: until } },
          },
          "synthetic"
        )
      );
      getQuotaCacheState().cache.delete(id);
      const response = await GET();
      assert.equal(response.status, 200);
      const body = await response.json();
      const verdict: ConnectionQuotaAvailability = body.connections.find(
        (row: { id: string }) => row.id === id
      );
      const pool = verdict.scopes.find(
        (scope) => scope.kind === "group" && scope.id === "claude_gpt"
      );
      assert.ok(pool);
      assert.deepEqual(pool.windows, []);
      const router = await getProviderCredentials(provider, null, [id], "claude-sonnet-4-5");
      assert.ok(router && "connectionId" in router && router.connectionId === id);
      assert.equal(pool.decision.usable, true);
      assert.equal(verdict.account.usable, pool.decision.usable);
    } finally {
      clearAllModelLockouts();
      getQuotaCacheState().cache.delete(id);
      deleteProviderLimitsCache(id);
      await deleteProviderConnection(id);
    }
  });

  for (const quotaGroups of [undefined, []]) {
    test(`${provider} ${quotaGroups ? "empty" : "missing"} groups prefer observed models and fill unobserved catalog families`, () => {
      const scopes = availabilityScopes(provider, {
        quotaGroups,
        quotas: {
          "google/gemini-synthetic": {},
          gemini_session: {},
          gemini_custom: {},
          claude_gpt_weekly: {},
          claude_gpt_custom: {},
          "synthetic-other-model": {},
        },
      });
      const groups = scopes.filter((scope) => scope.kind === "group");
      assert.deepEqual(
        groups.map((scope) => scope.id),
        ["gemini", "claude_gpt"]
      );
      assert.deepEqual(groups[0].models, ["google/gemini-synthetic"]);
      assert.deepEqual(groups[0].windows, ["gemini_session", "gemini_custom"]);
      assert.deepEqual(
        groups[1].models,
        getProviderModels(provider)
          .map((model) => model.id)
          .filter((model) => getAntigravityQuotaFamily(model) === "claude")
          .sort()
      );
      assert.deepEqual(groups[1].windows, ["claude_gpt_weekly", "claude_gpt_custom"]);
    });
  }

  for (const quotaGroups of [undefined, []]) {
    for (const quotas of [
      {},
      { session: { remainingPercentage: 0 }, weekly: { remainingPercentage: 0 } },
    ]) {
      test(`${provider} ${quotaGroups ? "empty" : "missing"} groups with ${Object.keys(quotas).length ? "generic windows" : "no windows"} retain account routing`, () => {
        const usage = { quotaGroups, quotas, fetchedAt: new Date().toISOString() };
        const connection = { id: `synthetic-generic-${provider}`, provider, isActive: true };
        const scopes = availabilityScopes(provider, usage);
        assert.deepEqual(
          scopes.filter((scope) => scope.kind === "group"),
          []
        );
        const verdict = buildConnectionQuotaAvailability(connection, usage, {
          enabled: false,
          defaultThresholdPercent: 2,
          providerWindowDefaults: {},
        });
        assert.deepEqual(
          verdict.account,
          evaluateCachedQuotaAvailability(
            connection,
            usage,
            { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} },
            null
          )
        );
        assert.equal(verdict.account.usable, Object.keys(quotas).length === 0);
      });
    }
  }

  for (const evidence of ["model", "snapshot", "saved gemini", "saved claude"]) {
    test(`${provider} ${evidence} evidence alone creates both catalog family pools`, () => {
      const scopes = availabilityScopes(
        provider,
        {
          quotas:
            evidence === "model"
              ? { "gemini-synthetic": {} }
              : evidence === "snapshot"
                ? { claude_gpt_session: {} }
                : { session: {} },
        },
        evidence.startsWith("saved")
          ? { [evidence.split(" ")[1]]: "2000-01-01T00:00:00Z" }
          : undefined
      );
      assert.deepEqual(
        scopes.filter((scope) => scope.kind === "group").map((scope) => scope.id),
        ["gemini", "claude_gpt"]
      );
    });
  }

  for (const familyCooldowns of [undefined, null, {}, [], { other: "2099-01-01T00:00:00Z" }]) {
    test(`${provider} non-family saved data ${JSON.stringify(familyCooldowns)} does not create pools`, () => {
      assert.deepEqual(
        availabilityScopes(
          provider,
          { quotas: { session: {}, "synthetic-other-model": {} } },
          familyCooldowns
        ).filter((scope) => scope.kind === "group"),
        []
      );
    });
  }

  for (const both of [false, true]) {
    test(`${provider} generic windows with saved ${both ? "both families" : "one family"} use peer-pool decisions`, () => {
      const now = Date.now();
      const until = new Date(now + 600_000).toISOString();
      const connection = {
        id: `synthetic-saved-${provider}`,
        provider,
        isActive: true,
        providerSpecificData: {
          antigravityFamilyRateLimitedUntil: { gemini: until, ...(both ? { claude: until } : {}) },
        },
      };
      const usage = {
        fetchedAt: new Date(now).toISOString(),
        quotas: { session: { remainingPercentage: 80 } },
      };
      const verdict = buildConnectionQuotaAvailability(connection, usage, {
        enabled: false,
        defaultThresholdPercent: 2,
        providerWindowDefaults: {},
      });
      assert.equal(verdict.scopes.filter((scope) => scope.kind === "group").length, 2);
      assert.equal(verdict.account.usable, !both);
      const display = displayAccount(
        buildHealthAccount(
          { id: connection.id, provider, isActive: true },
          { raw: usage },
          {},
          now,
          { availability: verdict, availabilityObservedAt: now }
        ),
        now
      );
      assert.equal(display.kind === "ok", !both);
      assert.equal(display.partial, !both);
      assert.ok(display.reasons.some((reason) => reason.type === "lockout"));
    });
  }

  test(`${provider} supplied groups do not gain catalog peer pools`, () => {
    const scopes = availabilityScopes(provider, {
      quotaGroups: [{ id: "gemini", models: ["gemini-synthetic"] }],
      quotas: { gemini_session: {} },
    });
    assert.deepEqual(
      scopes.filter((scope) => scope.kind === "group"),
      [
        {
          id: "gemini",
          kind: "group",
          model: "gemini-synthetic",
          models: ["gemini-synthetic"],
          windows: ["gemini_session"],
        },
      ]
    );
  });
}
