/**
 * Local/API-key provider-limits sync must honor PROVIDER_LIMITS_SYNC_SPACING_MS
 * too, not just the OAuth path (#6916).
 *
 * `syncAllProviderLimits` previously ran non-OAuth (local/API-key, e.g. Ollama)
 * connections in `concurrency`-sized chunks with NO spacing at all between
 * chunks, so setting `PROVIDER_LIMITS_SYNC_SPACING_MS` had no effect on that
 * path. This is the direct regression guard: forces >1 chunk (concurrency=1)
 * and controls the spacing clock: zero requests no wait; positive waits block
 * the next chunk until the configured timer fires, without a final wait.
 */
import test, { type TestContext } from "node:test";
import assert from "node:assert/strict";
import { setImmediate as nextTurn } from "node:timers/promises";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-apikey-spacing-sync-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-apikey-spacing-sync-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const providerLimits = await import("../../src/lib/usage/providerLimits.ts");

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  delete process.env.PROVIDER_LIMITS_SYNC_SPACING_MS;
  await cleanupTempDataDir(TEST_DATA_DIR);
});

async function createGlmApiKeyConnection(i: number) {
  return providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: `GLM Spacing ${i}`,
    apiKey: `glm-spacing-key-${i}`,
  });
}

function glmQuotaResponse() {
  return new Response(
    JSON.stringify({
      code: 200,
      success: true,
      data: {
        planName: "max",
        limits: [
          {
            type: "TOKENS_LIMIT",
            unit: 3,
            number: 5,
            percentage: 13,
            nextResetTime: Math.floor(Date.now() / 1000) + 3 * 3600,
            models: [],
          },
        ],
      },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

function controlSpacingClock(context: TestContext) {
  const nativeDate = globalThis.Date;
  const nativeTimeout = globalThis.setTimeout;
  context.mock.timers.enable({ apis: ["Date", "setTimeout"], now: 1_800_000_000_000 });
  const timeout = context.mock.method(globalThis, "setTimeout");
  let settled = true;

  context.after(async () => {
    try {
      // At most three chunks: drain a failed assertion's held waits before restoring globals.
      for (let remaining = 3; !settled && remaining > 0; remaining--) {
        context.mock.timers.runAll();
        await nextTurn();
      }
      assert.equal(settled, true, "the controlled sync must settle before restoring globals");
    } finally {
      // Restore the spy before the clock, and remove both from the context's tracker.
      context.mock.reset();
      assert.equal(globalThis.Date, nativeDate);
      assert.equal(globalThis.setTimeout, nativeTimeout);
    }
  });

  return {
    timeout,
    track<T>(pending: Promise<T>): Promise<T> {
      settled = false;
      void pending.then(
        () => {
          settled = true;
        },
        () => {
          settled = true;
        }
      );
      return pending;
    },
  };
}

test("syncAllProviderLimits spaces chunks for local/API-key connections when spacingMs is set", async (t) => {
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "60";
  for (let i = 0; i < 3; i++) await createGlmApiKeyConnection(i);

  const { timeout, track } = controlSpacingClock(t);
  const chunkStarts: number[] = [];
  const start = Date.now();

  t.mock.method(globalThis, "fetch", async (input: string | URL | Request) => {
    // Count only the quota fetch, not GLM's reset-card follow-up (#12754).
    if (String(input).includes("/quota/limit")) chunkStarts.push(Date.now() - start);
    return glmQuotaResponse();
  });

  const pending = track(
    providerLimits.syncAllProviderLimits({ source: "scheduled", concurrency: 1 })
  );
  await nextTurn(); // Drain the in-memory fetch/SQLite promise chain; no clock advance.
  assert.deepEqual(chunkStarts, [0], "the next chunk must remain behind the first wait");

  for (let completed = 1; completed < 3; completed++) {
    assert.equal(timeout.mock.callCount(), completed);
    assert.equal(timeout.mock.calls.at(-1)?.arguments[1], 60);
    t.mock.timers.tick(59);
    await nextTurn();
    assert.equal(chunkStarts.length, completed, "a chunk must not start before 60ms");
    t.mock.timers.tick(1);
    await nextTurn();
    assert.equal(chunkStarts.length, completed + 1, "the next chunk must start at 60ms");
  }

  assert.deepEqual(chunkStarts, [0, 60, 120]);
  assert.deepEqual(
    timeout.mock.calls.map((call) => call.arguments[1]),
    [60, 60],
    "three chunks require two waits and no wait after the last chunk"
  );
  const result = await pending;
  assert.equal(result.succeeded, 3);
  assert.equal(result.failed, 0);
});

test("syncAllProviderLimits does not space local/API-key chunks when spacingMs=0 (opt-out)", async (t) => {
  process.env.PROVIDER_LIMITS_SYNC_SPACING_MS = "0";
  for (let i = 0; i < 3; i++) await createGlmApiKeyConnection(i);

  const { timeout, track } = controlSpacingClock(t);
  const chunkStarts: number[] = [];
  const start = Date.now();
  const nonSpacingWorkMs = [2, 48, 0];

  t.mock.method(globalThis, "fetch", async (input: string | URL | Request) => {
    // Count only the quota fetch, not GLM's reset-card follow-up (#12754).
    if (String(input).includes("/quota/limit")) {
      chunkStarts.push(Date.now() - start);
      // Model elapsed work between origins without scheduling or firing a timer.
      t.mock.timers.setTime(Date.now() + (nonSpacingWorkMs[chunkStarts.length - 1] ?? 0));
    }
    return glmQuotaResponse();
  });

  const pending = track(
    providerLimits.syncAllProviderLimits({ source: "scheduled", concurrency: 1 })
  );
  await nextTurn();
  assert.equal(timeout.mock.callCount(), 0, "spacingMs=0 must not schedule a spacing timer");
  assert.deepEqual(chunkStarts, [0, 2, 50], "all three chunks must run without ticking timers");
  const result = await pending;
  assert.equal(result.succeeded, 3);
  assert.equal(result.failed, 0);
});
