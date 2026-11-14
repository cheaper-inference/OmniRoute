// Opt-in HEALTHCHECK_PER_PROVIDER_CONCURRENCY: the proactive refresh sweep runs at most N
// refreshes at once per provider, so an account sweep stops hammering one identity endpoint.
// Default off: the sweep keeps its current batch concurrency.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hc-provider-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.NODE_ENV = "test";
process.env.HEALTHCHECK_STAGGER_MS = "0";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { PROVIDERS } = await import("../../open-sse/config/constants.ts");
const tokenHealthCheck = await import("../../src/lib/tokenHealthCheck.ts");
const { createProviderLimiter } = await import("../../src/lib/providerConcurrencyLimiter.ts");

const FLAG = "HEALTHCHECK_PER_PROVIDER_CONCURRENCY";
const DELAY_MS = 40;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
test.afterEach(() => {
  delete process.env[FLAG];
});

function tokenUrl(provider: string) {
  return `https://token-cap.test.invalid/${provider}/token`;
}

/** Slow refresh endpoint that records the most refreshes in flight at once, per provider. */
function trackRefreshes(providers: string[]) {
  const original = globalThis.fetch;
  const live = new Map<string, number>();
  const peak = new Map<string, number>();
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : (input as Request).url;
    const provider = providers.find((p) => url === tokenUrl(p));
    if (!provider) return original(input as never, init as never);
    const now = (live.get(provider) ?? 0) + 1;
    live.set(provider, now);
    peak.set(provider, Math.max(peak.get(provider) ?? 0, now));
    await new Promise((resolve) => setTimeout(resolve, DELAY_MS));
    live.set(provider, (live.get(provider) ?? 1) - 1);
    return new Response(JSON.stringify({ error: "invalid_grant" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  return { peak, restore: () => (globalThis.fetch = original) };
}

async function sweepWith(providers: string[], perProvider: number) {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  for (const p of providers) {
    PROVIDERS[p] = { tokenUrl: tokenUrl(p), clientId: "cap-client", clientSecret: "cap-secret" };
    for (let i = 0; i < perProvider; i++) {
      await providersDb.createProviderConnection({
        provider: p,
        authType: "oauth",
        name: `${p}-${i}`,
        email: `${p}-${i}@example.invalid`,
        refreshToken: `rt-${p}-${i}`,
        accessToken: `at-${p}-${i}`,
        healthCheckInterval: 60,
        isActive: true,
        testStatus: "active",
      });
    }
  }
  const tracker = trackRefreshes(providers);
  try {
    await tokenHealthCheck.sweep();
  } finally {
    tracker.restore();
    for (const p of providers) delete PROVIDERS[p];
  }
  return tracker.peak;
}

test("limiter: runs at most N tasks per key at once and finishes all of them", async () => {
  const run = createProviderLimiter(2);
  let live = 0;
  let peak = 0;
  const task = async () => {
    peak = Math.max(peak, ++live);
    await new Promise((resolve) => setTimeout(resolve, 5));
    live--;
    return "done";
  };
  const results = await Promise.all(Array.from({ length: 7 }, () => run("a", task)));
  assert.deepEqual(results, Array(7).fill("done"));
  assert.equal(peak, 2);
});

test("limiter: a failing task frees its slot", async () => {
  const run = createProviderLimiter(1);
  await assert.rejects(
    run("a", async () => {
      throw new Error("boom");
    })
  );
  assert.equal(await run("a", async () => "next"), "next");
});

test("limiter: different keys do not wait on each other", async () => {
  const run = createProviderLimiter(1);
  let live = 0;
  let peak = 0;
  const task = async () => {
    peak = Math.max(peak, ++live);
    await new Promise((resolve) => setTimeout(resolve, 5));
    live--;
  };
  await Promise.all([run("a", task), run("b", task)]);
  assert.equal(peak, 2);
});

test("limiter: a limit of 0 means no limit", async () => {
  const run = createProviderLimiter(0);
  let live = 0;
  let peak = 0;
  const task = async () => {
    peak = Math.max(peak, ++live);
    await new Promise((resolve) => setTimeout(resolve, 5));
    live--;
  };
  await Promise.all(Array.from({ length: 4 }, () => run("a", task)));
  assert.equal(peak, 4);
});

test("sweep is off by default: one provider refreshes in parallel as before", async () => {
  const peak = await sweepWith(["capdef"], 4);
  assert.equal(peak.get("capdef"), 4);
});

test("sweep with a cap of 1 refreshes one account per provider at a time", async () => {
  process.env[FLAG] = "1";
  const peak = await sweepWith(["capone"], 4);
  assert.equal(peak.get("capone"), 1);
});

test("sweep with a cap of 2 allows two at once", async () => {
  process.env[FLAG] = "2";
  const peak = await sweepWith(["captwo"], 4);
  assert.equal(peak.get("captwo"), 2);
});

test("the cap is per provider: two providers still refresh side by side", async () => {
  process.env[FLAG] = "1";
  const peak = await sweepWith(["capa", "capb"], 3);
  assert.equal(peak.get("capa"), 1);
  assert.equal(peak.get("capb"), 1);
});

test("an invalid cap value leaves the sweep unchanged", async () => {
  process.env[FLAG] = "abc";
  const peak = await sweepWith(["capbad"], 4);
  assert.equal(peak.get("capbad"), 4);
});
