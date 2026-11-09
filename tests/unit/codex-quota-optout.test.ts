import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "omni-codex-quota-optout-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const { evaluateQuotaCutoff, registerQuotaFetcher } =
  await import("../../open-sse/services/quotaPreflight.ts");
const { getProviderCredentialsWithQuotaPreflight } = await import("../../src/sse/services/auth.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

const optedOut = { limitPolicy: { enabled: false }, quotaPreflightEnabled: false };
function metadata(connection: Record<string, unknown> | null): Record<string, unknown> {
  assert.ok(connection);
  const value = connection.providerSpecificData;
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}
const resetAt = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString();
const exhausted = {
  used: 100,
  total: 100,
  percentUsed: 1,
  resetAt,
  limitReached: true,
  windows: { session: { percentUsed: 1, resetAt } },
};
let connectionId = "";

test.before(async () => {
  const connection = await providers.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "quota-optout-fixture",
    accessToken: "fixture-access",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  assert.ok(typeof connection.id === "string");
  connectionId = connection.id;
});

test.after(
  async () => {
    await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5_000);
    core.resetDbInstance();
    fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  },
  { timeout: 6_000 }
);

test(
  "Codex combined opt-out preserves observations and bypasses cached/live quota cutoffs",
  { timeout: 5_000 },
  async () => {
    quotaCache.setQuotaCache(connectionId, "codex", {
      session: { remainingPercentage: 0, resetAt },
    });
    const previous = structuredClone(quotaCache.getQuotaCache(connectionId));
    assert.equal(quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol"), true);
    assert.equal(evaluateQuotaCutoff(exhausted, undefined, { provider: "codex" }).proceed, false);

    await providers.updateProviderConnection(connectionId, { providerSpecificData: optedOut });
    invalidateDbCache("connections", connectionId);
    assert.equal(
      quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol", optedOut),
      false
    );
    assert.equal(
      evaluateQuotaCutoff(exhausted, undefined, {
        provider: "codex",
        providerSpecificData: optedOut,
      }).proceed,
      true
    );
    assert.deepEqual(quotaCache.getQuotaCache(connectionId), previous);

    registerQuotaFetcher("codex", async () => {
      assert.fail("Explicit opt-out must not perform an upstream quota fetch");
    });
    const selected = await getProviderCredentialsWithQuotaPreflight(
      "codex",
      null,
      [connectionId],
      "gpt-6.1-sol"
    );
    assert.ok(selected && "connectionId" in selected);
    assert.equal(selected.connectionId, connectionId);
  }
);

test(
  "Partial, malformed and other-provider settings retain exhausted-window filtering",
  { timeout: 1_000 },
  () => {
    for (const settings of [
      {},
      { quotaPreflightEnabled: false },
      { limitPolicy: { enabled: false } },
      { limitPolicy: { enabled: "false" }, quotaPreflightEnabled: false },
      { limitPolicy: { enabled: false }, quotaPreflightEnabled: "false" },
    ]) {
      assert.equal(
        quotaCache.isQuotaExhaustedForRequest(connectionId, "codex", "gpt-6.1-sol", settings),
        true
      );
      assert.equal(
        evaluateQuotaCutoff(exhausted, undefined, {
          provider: "codex",
          providerSpecificData: settings,
        }).proceed,
        false
      );
    }
    assert.equal(
      evaluateQuotaCutoff(exhausted, undefined, {
        provider: "openai",
        providerSpecificData: optedOut,
      }).proceed,
      false
    );
    quotaCache.setQuotaCache("other-provider", "openai", {
      session: { remainingPercentage: 0, resetAt },
    });
    assert.equal(
      quotaCache.isQuotaExhaustedForRequest("other-provider", "openai", "gpt-6.1-sol", optedOut),
      true
    );
  }
);

test(
  "Restoring filtering and terminal account protection remain effective",
  { timeout: 5_000 },
  async () => {
    await providers.updateProviderConnection(connectionId, {
      providerSpecificData: { limitPolicy: { enabled: true }, quotaPreflightEnabled: true },
      testStatus: "active",
    });
    invalidateDbCache("connections", connectionId);
    const restored = await getProviderCredentialsWithQuotaPreflight(
      "codex",
      null,
      [connectionId],
      "gpt-6.1-sol"
    );
    assert.ok(restored && "allRateLimited" in restored);
    assert.equal(restored.allRateLimited, true);

    await providers.updateProviderConnection(connectionId, {
      providerSpecificData: optedOut,
      testStatus: "banned",
    });
    invalidateDbCache("connections", connectionId);
    const banned = await getProviderCredentialsWithQuotaPreflight(
      "codex",
      null,
      [connectionId],
      "gpt-6.1-sol"
    );
    assert.ok(!banned || !("connectionId" in banned) || banned.connectionId !== connectionId);
  }
);

test(
  "Codex OAuth upserts and credential updates preserve omitted operator quota controls",
  { timeout: 8_000 },
  async () => {
    const account = {
      provider: "codex",
      authType: "oauth",
      email: "quota-fixture@example.invalid",
      name: "quota-reimport-fixture",
      accessToken: "fixture-access",
      providerSpecificData: { workspaceId: "quota-fixture-workspace", ...optedOut },
    };
    const original = await providers.createProviderConnection(account);
    assert.ok(original && typeof original.id === "string");
    const id = original.id;
    const imported = await providers.createProviderConnection({
      ...account,
      accessToken: "fixture-rotated-access",
      providerSpecificData: { workspaceId: "quota-fixture-workspace", autoSync: true },
    });
    assert.equal(imported?.id, id, "OAuth refresh must update the same account");
    assert.deepEqual(metadata(imported).limitPolicy, optedOut.limitPolicy);
    assert.equal(metadata(imported).quotaPreflightEnabled, false);
    assert.equal(metadata(imported).autoSync, true);
    assert.equal(metadata(imported).codexFingerprintSeed, metadata(original).codexFingerprintSeed);

    const updated = await providers.updateProviderConnection(id, {
      providerSpecificData: { workspaceId: "quota-fixture-workspace", autoSync: false },
    });
    assert.deepEqual(metadata(updated).limitPolicy, optedOut.limitPolicy);
    assert.equal(metadata(updated).quotaPreflightEnabled, false);
    const enabled = await providers.updateProviderConnection(id, {
      providerSpecificData: { ...optedOut, quotaPreflightEnabled: true },
    });
    assert.equal(metadata(enabled).quotaPreflightEnabled, true);
    const cleared = await providers.updateProviderConnection(id, { providerSpecificData: null });
    assert.equal(metadata(cleared).limitPolicy, undefined);
    assert.equal(metadata(cleared).quotaPreflightEnabled, undefined);
  }
);

test("Codex OAuth re-login keeps the paid-credits opt-in", { timeout: 8_000 }, async () => {
  const account = {
    provider: "codex",
    authType: "oauth",
    email: "credits-fixture@example.invalid",
    name: "credits-reimport-fixture",
    accessToken: "credits-access",
    providerSpecificData: { workspaceId: "credits-fixture-workspace", allowPaidCredits: true },
  };
  const original = await providers.createProviderConnection(account);
  assert.ok(original && typeof original.id === "string");
  const reloggedIn = await providers.createProviderConnection({
    ...account,
    accessToken: "credits-rotated-access",
    providerSpecificData: { workspaceId: "credits-fixture-workspace", autoSync: true },
  });
  assert.equal(reloggedIn?.id, original.id, "re-login must update the same account");
  assert.equal(metadata(reloggedIn).allowPaidCredits, true);

  const optedOut = await providers.updateProviderConnection(original.id, {
    providerSpecificData: { workspaceId: "credits-fixture-workspace", allowPaidCredits: false },
  });
  assert.equal(metadata(optedOut).allowPaidCredits, false);
  const cleared = await providers.updateProviderConnection(original.id, {
    providerSpecificData: null,
  });
  assert.equal(metadata(cleared).allowPaidCredits, undefined);
});
