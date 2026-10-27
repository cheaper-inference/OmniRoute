/**
 * Integration test for the short-TTL cache on GET /api/monitoring/health.
 *
 * Health is a frequently-polled endpoint; rebuilding it on the request path
 * (DB reads + status aggregation) starves GET /healthz (#12532). The route
 * caches the payload for HEALTH_PAYLOAD_TTL_MS (30s). After the first fill,
 * expired entries are served immediately (stale-while-revalidate) and
 * refreshed off the request path. DELETE (circuit-breaker reset) invalidates
 * the cache so the next GET rebuilds. We assert via `timestamp`.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { cleanupTempDataDir } from "../_setup/tempDataDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-health-cache-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.JWT_SECRET = "test-health-cache-secret";

await import("../../src/lib/db/core.ts");
const { GET, DELETE, __test_resetMonitoringHealthPayloadCache } =
  await import("../../src/app/api/monitoring/health/route.ts");

// GHSA-mvf8-qc78-5mxm: the detailed health payload (the one carrying `timestamp`)
// is reserved for a management principal — GET now takes the Request and an
// anonymous caller only gets the liveness verdict. Every probe below therefore
// authenticates with a dashboard-session cookie, exactly like the DELETE probe.
const { SignJWT } = await import("jose");
const AUTH_TOKEN = await new SignJWT({ authenticated: true })
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("30d")
  .sign(new TextEncoder().encode(process.env.JWT_SECRET as string));

function authedRequest(method = "GET"): Request {
  return new Request("http://localhost/api/monitoring/health", {
    method,
    headers: { cookie: `auth_token=${AUTH_TOKEN}` },
  });
}

async function healthTimestamp(): Promise<string> {
  const res = await GET(authedRequest());
  const body = (await res.json()) as {
    timestamp?: string;
    adaptiveAdmission?: unknown;
  };
  assert.ok(body.timestamp, "health payload should carry a timestamp");
  // Adaptive admission is always projected (summary object or null) — never omitted.
  assert.ok("adaptiveAdmission" in body, "health payload must include adaptiveAdmission");
  return body.timestamp as string;
}

test("GET within the TTL serves the cached payload (identical timestamp)", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const t1 = await healthTimestamp();
  const t2 = await healthTimestamp();
  assert.equal(t2, t1, "a second GET within the TTL must return the cached payload");
});

test("expired cache is served immediately (stale-while-revalidate)", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const dateNow = Date.now;
  let now = dateNow();
  Date.now = () => now;
  try {
    const t1 = await healthTimestamp();
    now += 31_000;
    const t2 = await healthTimestamp();
    assert.equal(t2, t1, "an expired payload must be returned while its refresh runs");
    let refreshed = t2;
    const deadline = performance.now() + 5_000;
    while (refreshed === t1 && performance.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      refreshed = await healthTimestamp();
    }
    assert.notEqual(refreshed, t1, "the expired payload must refresh in the background");
  } finally {
    Date.now = dateNow;
  }
});

test("a 15-second dashboard poll stays inside the health payload refresh window", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const dateNow = Date.now;
  let now = dateNow();
  Date.now = () => now;
  try {
    const initial = await healthTimestamp();
    now += 15_000;
    await healthTimestamp();
    await new Promise((resolve) => setTimeout(resolve, 50));
    assert.equal(await healthTimestamp(), initial, "dashboard polling must not rebuild every 15s");
  } finally {
    Date.now = dateNow;
  }
});

test("concurrent cold-cache GETs share one health payload rebuild", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const toISOString = Date.prototype.toISOString;
  let timestampSequence = 0;
  Date.prototype.toISOString = function () {
    return `${toISOString.call(this)}-${++timestampSequence}`;
  };
  try {
    const responses = await Promise.all([GET(authedRequest()), GET(authedRequest())]);
    const payloads = await Promise.all(responses.map((response) => response.json()));
    assert.equal(payloads[0].timestamp, payloads[1].timestamp);
  } finally {
    Date.prototype.toISOString = toISOString;
  }
});

test("DELETE (circuit-breaker reset) invalidates the cache immediately", async () => {
  __test_resetMonitoringHealthPayloadCache();
  const t1 = await healthTimestamp(); // populate cache
  const delRes = await DELETE(authedRequest("DELETE"));
  assert.ok(delRes.status < 400, `DELETE should succeed, got ${delRes.status}`);
  await new Promise((r) => setTimeout(r, 5)); // ensure the clock advances past ms precision
  const t2 = await healthTimestamp();
  assert.notEqual(t2, t1, "a GET right after DELETE must rebuild (cache invalidated)");
});

test.after(async () => {
  await cleanupTempDataDir(TEST_DATA_DIR);
});
