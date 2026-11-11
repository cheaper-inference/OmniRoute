/**
 * GET /api/monitoring/health?provider=<id>[&unhealthRatioThreshold=0..1] answers for ONE provider
 * pool with counts and one verdict, so a plain uptime monitor can alert on pool degradation
 * without parsing the full health payload. Management auth only; counts only (no account names).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-health-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const route = await import("../../src/app/api/monitoring/health/route.ts");

const BASE = "http://localhost/api/monitoring/health";
const FUTURE = new Date(Date.now() + 60 * 60 * 1000).toISOString();

async function seedPool(provider: string) {
  const rows = [
    { name: "ok-1", testStatus: "active" },
    { name: "ok-2", testStatus: "active" },
    { name: "expired", testStatus: "expired" },
    { name: "cooling", testStatus: "active", rateLimitedUntil: FUTURE },
    { name: "disabled", testStatus: "expired", isActive: false }, // switched off: not part of the pool
  ];
  for (const row of rows) {
    await providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      apiKey: `sk-${provider}-${row.name}`,
      name: row.name,
      isActive: row.isActive ?? true,
      testStatus: row.testStatus,
      rateLimitedUntil: row.rateLimitedUntil,
    });
  }
}

async function asManager(query: string) {
  const request = await makeManagementSessionRequest(`${BASE}?${query}`);
  return route.GET(request as never);
}

test.before(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await seedPool("openai");
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("counts active accounts, rounds the ratio, and answers 200 while the pool is within the threshold", async () => {
  const res = await asManager("provider=openai");
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(res.status, 200);
  assert.deepEqual(body, {
    provider: "openai",
    total: 4,
    healthy: 2,
    unhealthy: 2,
    unhealthyRatio: 0.5,
    unhealthRatioThreshold: 0.5,
    summaryHealth: true,
  });
});

test("a pool above the threshold answers 503 with summaryHealth false", async () => {
  const res = await asManager("provider=openai&unhealthRatioThreshold=0.25");
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(res.status, 503);
  assert.equal(body.summaryHealth, false);
  assert.equal(body.unhealthyRatio, 0.5);
  assert.equal(body.unhealthRatioThreshold, 0.25);
});

test("a pool with no active account is unhealthy (ratio 1), not silently fine", async () => {
  const res = await asManager("provider=anthropic");
  const body = (await res.json()) as Record<string, unknown>;
  assert.equal(res.status, 503);
  assert.equal(body.total, 0);
  assert.equal(body.unhealthyRatio, 1);
  assert.equal(body.summaryHealth, false);
});

test("an anonymous caller gets 401, not a healthy-looking liveness answer", async () => {
  const res = await route.GET(new Request(`${BASE}?provider=openai`) as never);
  assert.equal(res.status, 401);
});

test("a threshold outside 0..1 is a 400", async () => {
  for (const bad of ["2", "-0.1", "abc"]) {
    const res = await asManager(`provider=openai&unhealthRatioThreshold=${bad}`);
    assert.equal(res.status, 400, `threshold ${bad}`);
  }
});

test("the pool answer carries no account name, id or key", async () => {
  const res = await asManager("provider=openai");
  const text = await res.text();
  for (const secret of ["ok-1", "expired", "cooling", "sk-openai"]) {
    assert.equal(text.includes(secret), false, `leaked ${secret}`);
  }
});
