// No real credentials: isolated SQLite, synthetic quota and upstream responses.
import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createTempDataDir } from "../../_setup/tempDataDir.ts";

const { cleanup } = createTempDataDir("omr-cooldown-scope-");
const { handleComboChat } = await import("../../../open-sse/services/combo.ts");
const db = await import("../../../src/lib/db/providers.ts");
const { registerQuotaFetcher } = await import("../../../open-sse/services/quotaPreflight.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");
const quotaCache = await import("../../../src/domain/quotaCache.ts");
const { getInflight, _clearInflightForTest } =
  await import("../../../open-sse/services/combo/quotaShareInflight.ts");
const { __setHeadroomSaturationFetcherForTests } =
  await import("../../../open-sse/services/combo/quotaStrategies.ts");

test.after(async () => {
  __setHeadroomSaturationFetcherForTests(null);
  quotaCache.__clearForTests();
  _clearInflightForTest();
  resetAllCircuitBreakers();
  await cleanup();
});
const log = { info() {}, warn() {}, debug() {}, error() {} };
// These share the optional expansion stage; one all-cooling regression each
// guards dispatch-specific paths without repeating the full exclusion matrix.
const otherExpansionStrategies = [
  "random",
  "least-used",
  "cost-optimized",
  "lkgp",
  "fill-first",
  "strict-random",
  "context-optimized",
  "cache-optimized",
  "context-relay",
];
const variants = [
  ...otherExpansionStrategies.map((strategy) => ({ strategy, expansion: true })),
  ...["quota-weighted", "reset-aware", "reset-window", "headroom"].map((strategy) => ({
    strategy,
    expansion: false,
  })),
  ...["round-robin", "fusion", "pipeline"].map((strategy) => ({ strategy, expansion: true })),
  ...["priority", "p2c", "weighted"].flatMap((strategy) =>
    [false, true].map((expansion) => ({ strategy, expansion }))
  ),
];

for (const { strategy, expansion } of variants) {
  for (const scenario of [
    "healthy",
    "all-cooling",
    "one-healthy",
    "expired-cooldown",
    "empty",
    "denied",
    "inactive",
    "missing",
    "banned",
    "expired",
    "credits_exhausted",
    "exhausted",
    "mixed",
    "long-cooldown",
    "generic",
    "numeric-cooldown",
    "decimal-cooldown",
    "unpinned-cooling",
    "allowlisted-cooling",
  ] as const) {
    if (otherExpansionStrategies.includes(strategy) && scenario !== "all-cooling") continue;
    // Expansion-off comparisons retain the in-loop cooldown gate. Other
    // eligibility checks belong to handleSingleModel, stubbed in this test.
    if (
      !expansion &&
      ["priority", "p2c", "weighted"].includes(strategy) &&
      !["healthy", "all-cooling", "one-healthy", "expired-cooldown", "empty"].includes(scenario)
    )
      continue;
    test(`${strategy} expansion=${expansion} ${scenario}`, { timeout: 10000 }, async (t) => {
      resetAllCircuitBreakers();
      quotaCache.__clearForTests();
      _clearInflightForTest();
      __setHeadroomSaturationFetcherForTests(async () => 0.2);
      const provider = scenario === "generic" ? `cooldown-${randomUUID()}` : "codex";
      registerQuotaFetcher(provider, async () => ({
        percentUsed: 0.2,
        limitReached: false,
        resetAt: new Date(Date.now() + 3600_000).toISOString(),
      }));
      const ids: string[] = [];
      t.after(async () => {
        for (const id of ids) await db.deleteProviderConnection(id);
      });
      // Headroom intentionally skips expansion for a single initial target.
      const count = strategy === "headroom" || ["one-healthy", "mixed"].includes(scenario) ? 2 : 1;
      for (let i = 0; i < count; i++) {
        const cooling =
          !["healthy", "empty", "expired-cooldown", "missing"].includes(scenario) &&
          !(scenario === "one-healthy" && i === 1);
        const terminal = ["banned", "expired", "credits_exhausted"].includes(scenario)
          ? scenario
          : scenario === "mixed" && i === 1
            ? "banned"
            : null;
        const cooldownUntil =
          Date.now() +
          (scenario === "long-cooldown"
            ? 7 * 86400_000
            : scenario === "mixed" && i === 1
              ? 1000
              : 60_000);
        const connection = await db.createProviderConnection({
          provider,
          name: `synthetic-${randomUUID()}`,
          isActive: scenario !== "inactive",
          authType: "apikey",
          testStatus: terminal ?? (cooling ? "unavailable" : "active"),
          rateLimitedUntil: cooling
            ? scenario === "numeric-cooldown"
              ? String(cooldownUntil)
              : scenario === "decimal-cooldown"
                ? `${cooldownUntil}.0`
                : new Date(cooldownUntil).toISOString()
            : scenario === "expired-cooldown"
              ? new Date(Date.now() - 1000).toISOString()
              : null,
        });
        ids.push(String(connection.id));
        if (scenario === "missing") await db.deleteProviderConnection(String(connection.id));
        if (scenario === "exhausted")
          quotaCache.markAccountExhaustedFromCredits(String(connection.id), provider);
      }
      const calls: string[] = [];
      const combo = {
        name: `synthetic-${randomUUID()}`,
        strategy,
        models:
          scenario === "empty"
            ? []
            : ids.map((connectionId) => ({
                kind: "model",
                providerId: provider,
                model: `${provider}/test-model`,
                connectionId: ["unpinned-cooling", "allowlisted-cooling"].includes(scenario)
                  ? undefined
                  : connectionId,
                allowedConnectionIds: scenario === "allowlisted-cooling" ? ids : undefined,
                weight: 1,
              })),
        config: {
          maxRetries: 0,
          maxSetRetries: 0,
          retryDelayMs: 0,
          fallbackDelayMs: 0,
          disableSessionStickiness: true,
          connectionAwareExpansion: expansion,
        },
      };
      const response = await handleComboChat({
        body: { model: combo.name, messages: [{ role: "user", content: "synthetic test" }] },
        combo,
        log,
        settings: { promptCacheAffinityEnabled: false },
        allCombos: null,
        apiKeyAllowedConnections: scenario === "denied" ? ["not-an-allowed-account"] : ids,
        // Isolate pre-dispatch ordering; persisted-row gates still run normally.
        isModelAvailable: async () => true,
        handleSingleModel: async (_body, _model, target) => {
          calls.push(target.connectionId!);
          return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
            headers: { "content-type": "application/json" },
          });
        },
      });
      const body = await response.json();
      for (const id of ids) assert.equal(getInflight(id), 0, "reservation released");
      if (
        [
          "all-cooling",
          "mixed",
          "long-cooldown",
          "generic",
          "unpinned-cooling",
          "allowlisted-cooling",
          "numeric-cooldown",
          "decimal-cooldown",
        ].includes(scenario)
      ) {
        assert.equal(calls.length, 0);
        assert.ok(
          [429, 503].includes(response.status),
          `Expected retryable temporary unavailability, got ${response.status}`
        );
        const retryAfter = Number(response.headers.get("Retry-After"));
        assert.ok(retryAfter >= 1 && retryAfter <= (scenario === "long-cooldown" ? 86400 : 60));
        if (expansion || !["priority", "weighted", "p2c"].includes(strategy)) {
          assert.equal(response.status, 503);
          assert.equal(body.error.code, "all_targets_cooling_down");
          assert.equal(body.recovery_hint.action, "wait");
          // The existing diagnostic sanitizer caps its suggested wait at one
          // hour independently of the HTTP Retry-After header.
          assert.equal(body.recovery_hint.retry_after_seconds, Math.min(retryAfter, 3600));
          assert.ok(
            body.diagnostics.excluded.some(
              (entry: { reason: string; provider: string; model: string }) =>
                entry.reason === "connection_cooldown" &&
                entry.provider === provider &&
                entry.model === "test-model"
            )
          );
          if (scenario === "mixed")
            assert.ok(retryAfter > 1, "terminal sibling must not shorten recovery");
          if (scenario === "long-cooldown") assert.equal(retryAfter, 86400);
        }
      } else if (
        scenario === "healthy" ||
        scenario === "one-healthy" ||
        scenario === "expired-cooldown"
      ) {
        assert.equal(response.status, 200);
        assert.equal(calls.length, 1);
        if (scenario === "one-healthy") assert.equal(calls[0], ids[1]);
      } else {
        assert.ok(response.status >= 400);
        if (scenario === "empty") {
          if (["fusion", "pipeline"].includes(strategy)) {
            assert.equal(response.status, 400);
          } else {
            assert.equal(response.status, 404);
            assert.equal(body.error.code, "model_not_found");
          }
        }
        assert.equal(calls.length, 0);
        assert.equal(response.headers.get("Retry-After"), null);
      }
    });
  }
}
