import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-account-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const auth = await import("../../src/sse/services/auth.ts");

const PROVIDER = "codex";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function createConnection(data: Record<string, unknown>): Promise<string> {
  const created = (await providersDb.createProviderConnection(data)) as { id: string };
  return created.id;
}

/** The connection id the selector handed back, or null if it returned no account. */
function selectedConnectionId(selected: unknown): string | null {
  if (!selected || typeof selected !== "object") return null;
  const id = (selected as { connectionId?: unknown }).connectionId;
  return typeof id === "string" ? id : null;
}

/** Create accounts with shared and subscription-specific model inventories. */
async function seedTwoAccounts(options: { proRateLimitedUntil?: string } = {}) {
  const proId = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-codex-token",
    name: "Pro account",
    priority: 1,
    isActive: true,
  });
  const plusId = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-codex-token",
    name: "Plus account",
    priority: 2,
    isActive: true,
  });

  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, proId, [
    { id: "gpt-shared-test", name: "gpt-shared-test" },
    { id: "gpt-pro-only-test", name: "gpt-pro-only-test" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, plusId, [
    { id: "gpt-shared-test", name: "gpt-shared-test" },
  ]);

  if (options.proRateLimitedUntil) {
    await providersDb.updateProviderConnection(proId, {
      rateLimitedUntil: options.proRateLimitedUntil,
    });
  }

  return { proId, plusId };
}

test("Codex selects only the account whose synced inventory advertises the model", async () => {
  await resetStorage();
  const { proId, plusId } = await seedTwoAccounts();

  // Exclude pro to force the selector to look elsewhere. Plus account does not
  // advertise gpt-pro-only-test, so it must NOT be handed back.
  const selected = await auth.getProviderCredentials(PROVIDER, proId, null, "gpt-pro-only-test");

  assert.notEqual(
    selectedConnectionId(selected),
    plusId,
    "plus never synced gpt-pro-only-test and must not be selected for it"
  );
});

test("Codex does not preemptively fail over to an account lacking the model when the owner is cooling", async () => {
  await resetStorage();
  const coolingUntil = new Date(Date.now() + 10 * 60 * 1000).toISOString();
  const { plusId } = await seedTwoAccounts({ proRateLimitedUntil: coolingUntil });

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "gpt-pro-only-test");

  assert.notEqual(
    selectedConnectionId(selected),
    plusId,
    "a cooling pro must surface a cooldown, not silently route to an account without the model"
  );
});

test("Codex keeps the connection that does advertise the model selectable", async () => {
  await resetStorage();
  const { proId } = await seedTwoAccounts();

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "gpt-pro-only-test");

  assert.equal(
    selectedConnectionId(selected),
    proId,
    "pro advertises gpt-pro-only-test and must be selected"
  );
});

test("Codex a model advertised by every account leaves both connections eligible", async () => {
  await resetStorage();
  const { proId, plusId } = await seedTwoAccounts();

  const first = await auth.getProviderCredentials(PROVIDER, null, null, "gpt-shared-test");
  assert.equal(
    selectedConnectionId(first),
    proId,
    "fill-first prefers priority 1 for a shared model"
  );

  // Excluding pro (the normal account-fallback path) must still reach plus,
  // because plus genuinely advertises gpt-shared-test.
  const second = await auth.getProviderCredentials(PROVIDER, proId, null, "gpt-shared-test");
  assert.equal(
    selectedConnectionId(second),
    plusId,
    "plus advertises gpt-shared-test and must remain a valid failover"
  );
});

test("Codex does not fall back to an unsynchronized account once an inventory exists", async () => {
  await resetStorage();
  const { proId, plusId } = await seedTwoAccounts();
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, plusId, []);
  const selected = await auth.getProviderCredentials(PROVIDER, proId, null, "gpt-pro-only-test");
  assert.equal(selectedConnectionId(selected), null);
});

test("Codex preserves bootstrap selection when no account has a synced catalog", async () => {
  await resetStorage();
  const id = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-token",
    isActive: true,
  });
  assert.equal(
    selectedConnectionId(
      await auth.getProviderCredentials(PROVIDER, null, null, "gpt-shared-test")
    ),
    id
  );
});

test("Codex forced and API-key restricted selection cannot bypass the account inventory", async () => {
  await resetStorage();
  const { plusId } = await seedTwoAccounts();
  const restricted = await auth.getProviderCredentials(
    PROVIDER,
    null,
    [plusId],
    "gpt-pro-only-test"
  );
  assert.equal(selectedConnectionId(restricted), null);
  const pinned = await auth.getProviderCredentials(PROVIDER, null, null, "gpt-pro-only-test", {
    forcedConnectionId: plusId,
  });
  assert.equal(selectedConnectionId(pinned), null);
});

test("the public catalog keeps the union of active Codex account inventories", async () => {
  await resetStorage();
  await seedTwoAccounts();
  const catalog = await import("../../src/app/api/v1/models/catalog.ts");
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  const ids = new Set(body.data.map((model) => model.id));
  assert.ok(ids.has("cx/gpt-pro-only-test"));
  assert.ok(ids.has("cx/gpt-shared-test"));
});

test("Codex reasoning-suffix aliases select the account that advertises the base model", async () => {
  await resetStorage();
  const proId = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-codex-token",
    name: "Pro account",
    priority: 1,
    isActive: true,
  });
  const plusId = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-codex-token",
    name: "Plus account",
    priority: 2,
    isActive: true,
  });
  // The synced inventories hold base ids only; the effort suffix is split off later, in the executor.
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, proId, [
    { id: "gpt-6-sol", name: "gpt-6-sol" },
    { id: "gpt-6-luna", name: "gpt-6-luna" },
  ]);
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, plusId, [
    { id: "gpt-6-luna", name: "gpt-6-luna" },
  ]);

  for (const suffixed of [
    "gpt-6-sol-high",
    "gpt-6-sol-xhigh",
    "gpt-6-sol-max",
    "gpt-6-sol-ultra",
    "cx/gpt-6-sol-high",
  ]) {
    const selected = await auth.getProviderCredentials(PROVIDER, null, null, suffixed);
    assert.equal(
      selectedConnectionId(selected),
      proId,
      `${suffixed} must select the account advertising gpt-6-sol`
    );
    // Plus never advertised gpt-6-sol, so excluding pro must not fall back to it.
    const failover = await auth.getProviderCredentials(PROVIDER, proId, null, suffixed);
    assert.equal(
      selectedConnectionId(failover),
      null,
      `${suffixed} must not fail over to an account without gpt-6-sol`
    );
  }
});

test("Codex suffixed request for a model no account advertises stays filtered", async () => {
  await resetStorage();
  const { proId, plusId } = await seedTwoAccounts();

  for (const accountId of [proId, plusId]) {
    const selected = await auth.getProviderCredentials(
      PROVIDER,
      null,
      [accountId],
      "gpt-unadvertised-test-high"
    );
    assert.equal(selectedConnectionId(selected), null);
  }
});

test("Codex keeps matching an inventory id that already carries a reasoning suffix", async () => {
  await resetStorage();
  const proId = await createConnection({
    provider: PROVIDER,
    authType: "oauth",
    accessToken: "test-codex-token",
    name: "Pro account",
    priority: 1,
    isActive: true,
  });
  await modelsDb.replaceSyncedAvailableModelsForConnection(PROVIDER, proId, [
    { id: "gpt-6-sol-high", name: "gpt-6-sol-high" },
  ]);

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "gpt-6-sol-high");
  assert.equal(selectedConnectionId(selected), proId);
});
