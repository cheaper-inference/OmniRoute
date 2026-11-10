import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "fresh-admission-"));
process.env.DATA_DIR = dir;
process.env.APP_LOG_TO_FILE = "false";
process.env.API_KEY_SECRET = "fresh-admission-test-only";
const core = await import("../../src/lib/db/core.ts");
const db = await import("../../src/lib/db/providers.ts");
const affinity = await import("../../src/lib/db/sessionAccountAffinity.ts");
const auth = await import("../../src/sse/services/auth.ts");
const semaphore = await import("../../open-sse/services/accountSemaphore.ts");
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");
const helpers = await import("../../open-sse/handlers/chatCore/executorHelpers.ts");
const { filterFreshSessionAdmission } =
  await import("../../src/sse/services/freshSessionAdmission.ts");
const { toProviderConnection } = await import("../../src/lib/db/providers/lazyConnectionView.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");
const protection = await import("../../open-sse/services/rateLimitManager/protectionState.ts");
const { buildRateLimitOverridesFromForm } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/rateLimitOverridesFromForm.ts");

let a: string;
let b: string;
test.beforeEach(async () => {
  semaphore.resetAll();
  for (const row of await db.getProviderConnections({ provider: "openai" })) {
    await db.deleteProviderConnection(String(row.id));
  }
  a = String(
    (
      await db.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        name: "a",
        priority: 1,
        isActive: true,
        testStatus: "active",
        maxConcurrent: 3,
      })
    ).id
  );
  b = String(
    (
      await db.createProviderConnection({
        provider: "openai",
        authType: "apikey",
        name: "b",
        priority: 2,
        isActive: true,
        testStatus: "active",
        maxConcurrent: 3,
      })
    ).id
  );
  // Seed the proposed JSON field independently of the write-path validator, so
  // RED exercises selection rather than failing during fixture construction.
  core
    .getDbInstance()
    .prepare("UPDATE provider_connections SET rate_limit_overrides_json = ? WHERE id = ?")
    .run(JSON.stringify({ newSessionMaxConcurrent: 1 }), a);
});
test.after(() => {
  semaphore.resetAll();
  core.resetDbInstance();
  fs.rmSync(dir, { recursive: true, force: true });
});
function select(sessionKey?: string, allowed: string[] | null = null, forcedConnectionId?: string) {
  return auth
    .getProviderCredentials("openai", null, allowed, "gpt-test", {
      sessionKey,
      sessionAffinityTtlMs: 60_000,
      forcedConnectionId,
    })
    .then((result) => (result && "connectionId" in result ? result : null));
}
async function busy() {
  return semaphore.acquire(
    semaphore.buildAccountSemaphoreKey({ provider: "openai", accountKey: a }),
    { maxConcurrency: 3 }
  );
}

test("fresh session routes away at the lower total-account threshold", async () => {
  const release = await busy();
  try {
    assert.equal((await select("fresh"))?.connectionId, b);
  } finally {
    release();
  }
});
test("existing valid affinity reuses the same busy account", async () => {
  affinity.upsertSessionAccountAffinity("existing", "openai", a, Date.now(), 60_000);
  const release = await busy();
  try {
    assert.equal((await select("existing"))?.connectionId, a);
  } finally {
    release();
  }
});
test("missing or stale affinity is not reuse", async () => {
  affinity.upsertSessionAccountAffinity("stale", "openai", a, Date.now() - 120_000, 60_000);
  const release = await busy();
  try {
    assert.equal((await select("stale"))?.connectionId, b);
  } finally {
    release();
  }
});
test("unpinned requests use the same total count across models", async () => {
  const release = await busy();
  try {
    const result = await auth.getProviderCredentials("openai", null, null, "another-model");
    assert.ok(result && "connectionId" in result);
    assert.equal(result.connectionId, b);
  } finally {
    release();
  }
});
test("key-scoped pool cannot escape to a forbidden sibling", async () => {
  const release = await busy();
  try {
    assert.equal((await select("scoped", [a]))?.connectionId, undefined);
  } finally {
    release();
  }
});
test("explicit forced id retains its existing semantics", async () => {
  const release = await busy();
  try {
    assert.equal((await select("forced", null, a))?.connectionId, a);
  } finally {
    release();
  }
});
test("unset threshold preserves selection", async () => {
  await db.updateProviderConnection(a, { rateLimitOverrides: null });
  const release = await busy();
  try {
    assert.equal((await select())?.connectionId, a);
  } finally {
    release();
  }
});
test("validated JSON threshold persists without a SQL column", async () => {
  const parsed = updateProviderConnectionSchema.safeParse({
    rateLimitOverrides: { newSessionMaxConcurrent: 2 },
  });
  assert.equal(parsed.success, true);
  if (!parsed.success) return;
  await db.updateProviderConnection(a, parsed.data);
  assert.equal(
    ((await db.getProviderConnectionById(a))?.rateLimitOverrides as Record<string, unknown>)
      ?.newSessionMaxConcurrent,
    2
  );
  for (const value of [-1, 1.5, 10_001]) {
    assert.equal(
      updateProviderConnectionSchema.safeParse({
        rateLimitOverrides: { newSessionMaxConcurrent: value },
      }).success,
      false
    );
  }
});

test("hard account cap remains shared and atomic for sticky and fresh work", async () => {
  const key = semaphore.buildAccountSemaphoreKey({ provider: "openai", accountKey: a });
  const cap = helpers.resolveTrackedAccountSemaphoreMaxConcurrency({
    maxConcurrent: 3,
    newSessionMaxConcurrent: 1,
  });
  const releases = [
    await semaphore.acquire(key, { maxConcurrency: cap }),
    await semaphore.acquire(key, { maxConcurrency: cap }),
    await semaphore.acquire(key, { maxConcurrency: cap }),
  ];
  try {
    affinity.upsertSessionAccountAffinity("at-hard", "openai", a, Date.now(), 60_000);
    assert.equal((await select("at-hard"))?.connectionId, b);
    // Selection is advisory; authoritative admission still rejects at the hard cap.
    await assert.rejects(semaphore.acquire(key, { maxConcurrency: cap, failFast: true }), {
      code: "SEMAPHORE_QUEUE_FULL",
    });
  } finally {
    releases.forEach((release) => release());
  }
});

test("clamp and rate-limit protection precedence use the existing hard-cap resolver", async () => {
  const c = toProviderConnection({
    id: a,
    provider: "openai",
    maxConcurrent: 1,
    rateLimitOverrides: { maxConcurrent: 5, newSessionMaxConcurrent: 4 },
  });
  const release = await busy();
  try {
    assert.deepEqual(await filterFreshSessionAdmission([c], "openai", {}, 0), []);
  } finally {
    release();
  }
  const credentials = { maxConcurrent: 1, rateLimitMaxConcurrent: 5, newSessionMaxConcurrent: 4 };
  assert.equal(helpers.resolveTrackedAccountSemaphoreMaxConcurrency(credentials, true), 5);
  assert.equal(helpers.resolveTrackedAccountSemaphoreMaxConcurrency(credentials, false), 1);
});

test("zero is disabled and unlimited opt-in accounts are counted without a second gate", async () => {
  assert.equal(helpers.resolveTrackedAccountSemaphoreMaxConcurrency({ maxConcurrent: null }), null);
  assert.equal(
    helpers.resolveTrackedAccountSemaphoreMaxConcurrency({
      maxConcurrent: 0,
      newSessionMaxConcurrent: 0,
    }),
    0
  );
  assert.equal(
    helpers.resolveTrackedAccountSemaphoreMaxConcurrency({
      maxConcurrent: null,
      newSessionMaxConcurrent: 1,
    }),
    Number.MAX_SAFE_INTEGER
  );
  await db.updateProviderConnection(a, { rateLimitOverrides: { newSessionMaxConcurrent: 0 } });
  const release = await busy();
  try {
    assert.equal((await select())?.connectionId, a);
  } finally {
    release();
  }
});

test("missing pin target and excluded pin never gain a reuse exemption", async () => {
  affinity.upsertSessionAccountAffinity("missing", "openai", "absent", Date.now(), 60_000);
  affinity.upsertSessionAccountAffinity("excluded", "openai", a, Date.now(), 60_000);
  const release = await busy();
  try {
    assert.equal((await select("missing"))?.connectionId, b);
    const result = await auth.getProviderCredentials("openai", a, null, "gpt-test", {
      sessionKey: "excluded",
      sessionAffinityTtlMs: 60_000,
    });
    assert.ok(result && "connectionId" in result);
    assert.equal(result.connectionId, b);
  } finally {
    release();
  }
});

test("key scope beats a valid affinity", async () => {
  affinity.upsertSessionAccountAffinity("key-scope", "openai", a, Date.now(), 60_000);
  assert.equal((await select("key-scope", [b]))?.connectionId, b);
});

test("model exclusions beat a valid affinity", async () => {
  affinity.upsertSessionAccountAffinity("model-gate", "openai", a, Date.now(), 60_000);
  await db.updateProviderConnection(a, { providerSpecificData: { excludedModels: ["gpt-test"] } });
  assert.equal((await select("model-gate"))?.connectionId, b);
});

test("unlimited hard-cap accounts still expose total running work to fresh routing", async () => {
  await db.updateProviderConnection(a, {
    maxConcurrent: null,
    rateLimitOverrides: { newSessionMaxConcurrent: 1 },
  });
  const credentials = await select();
  assert.ok(credentials && credentials.connectionId === a);
  const limit = helpers.resolveTrackedAccountSemaphoreMaxConcurrency(
    credentials as Record<string, unknown>
  );
  assert.equal(limit, Number.MAX_SAFE_INTEGER);
  const release = await semaphore.acquire(`openai:${a}`, { maxConcurrency: limit });
  try {
    assert.equal((await select())?.connectionId, b);
  } finally {
    release();
  }
});

test("selection-only routing is advisory and does not reserve slots", async () => {
  const first = await select();
  const second = await select();
  assert.equal(first?.connectionId, a);
  assert.equal(second?.connectionId, a);
  assert.equal(semaphore.getStats()[`openai:${a}`], undefined);
});

test("quota exhaustion beats existing affinity", async () => {
  affinity.upsertSessionAccountAffinity("no-quota", "openai", a, Date.now(), 60_000);
  quotaCache.setQuotaCache(a, "openai", {
    daily: { remainingPercentage: 0, resetAt: new Date(Date.now() + 60_000).toISOString() },
  });
  assert.equal((await select("no-quota"))?.connectionId, b);
});

test("protection state shares the same override precedence during routing", async () => {
  const c = toProviderConnection({
    id: a,
    provider: "openai",
    maxConcurrent: 1,
    rateLimitOverrides: { maxConcurrent: 3, newSessionMaxConcurrent: 2 },
  });
  const release = await busy();
  protection.enabledConnections.add(a);
  try {
    assert.deepEqual(await filterFreshSessionAdmission([c], "openai", {}, 0), [c]);
  } finally {
    protection.enabledConnections.delete(a);
    release();
  }
});

test("dashboard payload preserves and clears the threshold alongside other overrides", () => {
  const form = {
    rpm: "",
    rpd: "",
    tpm: "",
    tpd: "",
    minTime: "",
    maxWaitMs: "",
    rateLimitMaxConcurrent: "3",
    modelConcurrency: "",
    newSessionMaxConcurrent: "2",
  };
  assert.deepEqual(buildRateLimitOverridesFromForm(form, { executionMaxWaitMs: 500 }).overrides, {
    maxConcurrent: 3,
    newSessionMaxConcurrent: 2,
    executionMaxWaitMs: 500,
  });
  assert.deepEqual(
    buildRateLimitOverridesFromForm({ ...form, newSessionMaxConcurrent: "" }).overrides,
    { maxConcurrent: 3 }
  );
});
