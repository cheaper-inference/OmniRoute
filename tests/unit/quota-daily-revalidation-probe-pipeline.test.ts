/**
 * The daily quota probe through the real in-process pipeline (#20343).
 *
 * The probe must reach the upstream as a one-token request for the locked model on
 * the locked connection (the model lock itself must not stop it), and whatever the
 * upstream answers must never write a connection-wide cooldown — not even with the
 * operator's `probeCanDisable` opt-in, which makes operator-pressed probes count as
 * real traffic. Upstream is a mocked fetch: no real provider call is made.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-probe-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { clearAllModelLockouts, getAllModelLockouts, recordModelLockoutFailure } =
  await import("../../open-sse/services/accountFallback.ts");
const { probeLockedModel, QUOTA_PROBE_MAX_OUTPUT_TOKENS } =
  await import("../../src/lib/credentialHealth/quotaRevalidationProbe.ts");
const { runSingleModelTest } = await import("../../src/lib/api/modelTestRunner.ts");
const { getAllKeyHealth } = await import("../../open-sse/services/apiKeyRotator.ts");

const DAY = 24 * 3_600_000;
const originalFetch = globalThis.fetch;
const silent = { info: () => {}, warn: () => {} };

test.beforeEach(() => {
  resetAllCircuitBreakers();
  invalidateDbCache("connections");
  clearAllModelLockouts();
});

// Warm up the chat pipeline once (translators, settings and executors lazy-init on the
// first in-process request), so the probes below are not timed against that cold start.
test.before(async () => {
  const connId = await createConnection();
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ choices: [{ message: { role: "assistant", content: "OK" } }] }), {
      headers: { "content-type": "application/json" },
    });
  await runSingleModelTest({
    providerId: "openai",
    modelId: "gpt-4o",
    connectionId: connId,
    timeoutMs: 120_000,
  });
});

test.after(() => {
  globalThis.fetch = originalFetch;
  clearAllModelLockouts();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function readRateLimitedUntil(connId: string): unknown {
  const db = core.getDbInstance() as unknown as {
    prepare: (sql: string) => { get: (id: string) => { rate_limited_until: unknown } | undefined };
  };
  return db.prepare("SELECT rate_limited_until FROM provider_connections WHERE id = ?").get(connId)
    ?.rate_limited_until;
}

async function createConnection(): Promise<string> {
  const conn = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "quota-probe",
    apiKey: "sk-quota-probe", // pragma: allowlist secret
    isActive: true,
    testStatus: "active",
  });
  return String((conn as { id: string }).id);
}

function lock(connId: string, model: string) {
  recordModelLockoutFailure("openai", connId, model, "quota_exhausted", 429, 3_000, null, {
    exactCooldownMs: 7 * DAY,
    scope: "exact",
  });
}

function candidateFor(connId: string, model: string) {
  const entry = getAllModelLockouts().find(
    (item) => item.connectionId === connId && item.model === model
  );
  assert.ok(entry, `sanity: ${model} must be locked`);
  return {
    provider: "openai",
    connectionId: connId,
    model,
    reason: entry.reason,
    until: entry.until,
    lockedAt: Date.parse(entry.lockedAt),
  };
}

/** Records every upstream body and answers with `respond`. */
function mockUpstream(respond: () => Response) {
  const bodies: Array<Record<string, unknown>> = [];
  globalThis.fetch = async (_input, init = {}) => {
    try {
      bodies.push(JSON.parse(String((init as RequestInit).body ?? "{}")));
    } catch {
      bodies.push({});
    }
    return respond();
  };
  return bodies;
}

test("the probe reaches upstream with the smallest cap upstreams accept, for the locked model", async () => {
  const connId = await createConnection();
  lock(connId, "gpt-4o");
  const bodies = mockUpstream(
    () =>
      new Response(
        JSON.stringify({ choices: [{ message: { role: "assistant", content: "O" } }] }),
        { headers: { "content-type": "application/json" } }
      )
  );

  const warnings: string[] = [];
  const verdict = await probeLockedModel(candidateFor(connId, "gpt-4o"), {
    logger: { warn: (msg) => warnings.push(msg) },
  });

  assert.equal(verdict, "recovered", `the model lock must not stop its own probe: ${warnings}`);
  assert.equal(bodies.length, 1, "exactly one upstream request");
  assert.equal(bodies[0].model, "gpt-4o", "the locked model is what reaches upstream");
  const cap = bodies[0].max_tokens ?? bodies[0].max_completion_tokens;
  assert.equal(cap, QUOTA_PROBE_MAX_OUTPUT_TOKENS, "the probe's small answer cap");
});

test("a 429 for the model keeps its lock and writes no connection-wide cooldown", async () => {
  await settingsDb.updateSettings({ probeCanDisable: true });
  try {
    const connId = await createConnection();
    lock(connId, "gpt-4o");
    lock(connId, "gpt-4o-mini");
    const sibling = getAllModelLockouts().find((entry) => entry.model === "gpt-4o-mini")?.until;
    mockUpstream(
      () =>
        new Response(
          JSON.stringify({ error: { message: "You exceeded your current quota for gpt-4o." } }),
          { status: 429, headers: { "content-type": "application/json", "retry-after": "30" } }
        )
    );

    const verdict = await probeLockedModel(candidateFor(connId, "gpt-4o"), { logger: silent });

    assert.equal(verdict, "still-locked");
    assert.equal(
      readRateLimitedUntil(connId),
      null,
      "a failed probe must never put the whole connection in cooldown"
    );
    // The per-key cooldown is connection-wide too: with one key it parks every model.
    const keyCooldown = getAllKeyHealth()[`${connId}:primary`]?.cooldownUntil ?? null;
    assert.ok(
      keyCooldown === null || Date.parse(keyCooldown) <= Date.now(),
      `a failed probe must never cool the connection's key (cooldownUntil=${keyCooldown})`
    );
    assert.ok(
      getAllModelLockouts().some((entry) => entry.model === "gpt-4o"),
      "the probed model stays locked"
    );
    assert.ok(sibling, "sanity: the sibling is locked");
    assert.equal(
      getAllModelLockouts().find((entry) => entry.model === "gpt-4o-mini")?.until,
      sibling,
      "the sibling model's lock is untouched"
    );
  } finally {
    await settingsDb.updateSettings({ probeCanDisable: false });
  }
});
