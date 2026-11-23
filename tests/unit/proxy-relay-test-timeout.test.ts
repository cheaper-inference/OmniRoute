import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { getGlobalDispatcher, setGlobalDispatcher, type Dispatcher } from "undici";

// Relay proxies (Vercel / Deno / Cloudflare) on free plans cold-start slowly: the
// first request after idle routinely takes 10-25s. A 10s budget on the dashboard
// "Test" button reported a healthy-but-cold relay as dead. The relay branch of
// /api/settings/proxy/test must give the relay 30s, end to end.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-relay-timeout-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { RELAY_TEST_TIMEOUT_MS } =
  await import("../../src/app/api/settings/proxy/test/relayTestResult.ts");
const proxyTestRoute = await import("../../src/app/api/settings/proxy/test/route.ts");

type CapturedOpts = { headersTimeout?: number; bodyTimeout?: number; origin?: unknown };

const originalDispatcher = getGlobalDispatcher();

// The relay branch calls undici.request() without a dispatcher, so it goes
// through the global one. Swap in a dispatcher that records the options and
// fails the request with `failWith`, so no network I/O happens.
function installCapturingDispatcher(failWith: Error): CapturedOpts[] {
  const captured: CapturedOpts[] = [];
  const capturing = {
    dispatch(opts: CapturedOpts) {
      captured.push(opts);
      throw failWith;
    },
  };
  setGlobalDispatcher(capturing as unknown as Dispatcher);
  return captured;
}

function relayTestRequest() {
  return new Request("http://localhost/api/settings/proxy/test", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      proxy: { type: "vercel", host: "relay.example.test", port: 443, password: "tok" },
    }),
  });
}

test.afterEach(() => {
  setGlobalDispatcher(originalDispatcher);
});

test.after(() => {
  setGlobalDispatcher(originalDispatcher);
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best effort */
  }
});

test("relay test timeout budget is 30s", () => {
  assert.equal(RELAY_TEST_TIMEOUT_MS, 30_000);
});

test("relay test passes the 30s budget to undici headersTimeout/bodyTimeout", async () => {
  const captured = installCapturingDispatcher(new Error("captured"));

  const res = await proxyTestRoute.POST(relayTestRequest());
  const body = (await res.json()) as { success?: boolean };

  assert.equal(captured.length, 1, "relay branch should issue exactly one request");
  assert.equal(captured[0].headersTimeout, 30_000);
  assert.equal(captured[0].bodyTimeout, 30_000);
  assert.equal(body.success, false);
});

test("relay test abort reports the 30s budget in its timeout message", async () => {
  const abortErr = new Error("aborted");
  abortErr.name = "AbortError";
  installCapturingDispatcher(abortErr);

  const res = await proxyTestRoute.POST(relayTestRequest());
  const body = (await res.json()) as { success?: boolean; error?: string };

  assert.equal(body.success, false);
  assert.equal(body.error, "Connection timeout (30s)");
});
