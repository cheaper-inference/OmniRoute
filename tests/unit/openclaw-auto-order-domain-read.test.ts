import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-openclaw-auto-order-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const route = await import("../../src/app/api/cli-tools/openclaw/auto-order/route.ts");

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("auto-order reads combos from the database when self-hop requests are refused", async () => {
  await combosDb.createCombo({
    name: "openclaw-order",
    strategy: "priority",
    models: ["anthropic/claude-sonnet-4-5", "openai/gpt-4o", "openai/gpt-4o-mini"],
  });

  // With login on, the real self-hops return 401 because they carry no credential.
  const hops: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    hops.push(String(input));
    return new Response(JSON.stringify({ error: "Authentication required" }), { status: 401 });
  }) as typeof fetch;

  const response = await route.GET(
    new Request("http://localhost/api/cli-tools/openclaw/auto-order")
  );
  const body = await response.json();

  assert.deepEqual(hops, [], "the route must not call itself over HTTP");
  assert.equal(body.source, "omniroute-auto-combo");
  assert.deepEqual(body.provider.order, ["openai", "anthropic"]);
});

test("auto-order demotes a provider whose circuit breaker is open", async () => {
  const { getCircuitBreaker, resetAllCircuitBreakers } =
    await import("../../src/shared/utils/circuitBreaker.ts");
  resetAllCircuitBreakers();
  const breaker = getCircuitBreaker("openai", { failureThreshold: 1, resetTimeout: 60_000 });
  breaker._onFailure();
  assert.equal(breaker.getStatus().state, "OPEN");

  try {
    const response = await route.GET(
      new Request("http://localhost/api/cli-tools/openclaw/auto-order")
    );
    const body = await response.json();

    // openai has 2 combo entries (score 2 * 0.1) and anthropic has 1: anthropic now leads.
    assert.deepEqual(body.provider.order, ["anthropic", "openai"]);
  } finally {
    resetAllCircuitBreakers();
  }
});
