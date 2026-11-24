/**
 * Integration tests: the member breakdown option through the admin pool API.
 *
 * Verifies:
 *   - PATCH turns the option on, and both GET routes report it
 *   - A PATCH without the field leaves the stored setting alone
 *   - A value that is not a boolean is refused with 400 and no stack trace
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-member-breakdown-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-quota-pools-secret";

// Import in dependency order to ensure migrations run before routes
const core = await import("../../src/lib/db/core.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const { createPool } = await import("../../src/lib/db/quotaPools.ts");
const { getPoolMemberBreakdown, setPoolMemberBreakdown } =
  await import("../../src/lib/db/quotaMemberBreakdown.ts");
const poolsRoute = await import("../../src/app/api/quota/pools/route.ts");
const poolIdRoute = await import("../../src/app/api/quota/pools/[id]/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  resetDb();
  compliance.initAuditLog();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function makePool(name: string) {
  return createPool({ connectionId: `conn-${name}`, name });
}

function req(method: string, body?: Record<string, unknown>) {
  return makeManagementSessionRequest("http://localhost/api/quota/pools", { method, body });
}

function params(id: string) {
  return { params: Promise.resolve({ id }) };
}

test("PATCH turns the member breakdown on and GET reports it", async () => {
  const pool = makePool("breakdown-on");
  const patched = await poolIdRoute.PATCH(
    await req("PATCH", { memberBreakdown: true }),
    params(pool.id)
  );
  assert.equal(patched.status, 200);
  assert.equal((await patched.json()).pool.memberBreakdown, true);
  const single = await poolIdRoute.GET(await req("GET"), params(pool.id));
  assert.equal((await single.json()).pool.memberBreakdown, true);
  const list = (await (await poolsRoute.GET(await req("GET"))).json()) as {
    pools: Array<{ id: string; memberBreakdown: boolean }>;
  };
  assert.equal(list.pools.find((p) => p.id === pool.id)?.memberBreakdown, true);

  const logs = compliance.getAuditLog({ action: "quota.pool.updated", limit: 10 });
  const events = (Array.isArray(logs) ? logs : []) as Array<Record<string, unknown>>;
  const evt = events.find((e) => e.target === pool.id);
  assert.ok(evt, "quota.pool.updated audit event must be present");
  assert.equal((evt.metadata as Record<string, unknown>).memberBreakdown, true);
});

test("a PATCH without the field leaves the setting alone", async () => {
  const pool = makePool("breakdown-kept");
  setPoolMemberBreakdown(pool.id, true);
  const res = await poolIdRoute.PATCH(await req("PATCH", { name: "again" }), params(pool.id));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).pool.memberBreakdown, true);
  assert.equal(getPoolMemberBreakdown(pool.id), true);
});

test("a value that is not a boolean is refused with 400 and no stack", async () => {
  const pool = makePool("breakdown-refused");
  const res = await poolIdRoute.PATCH(
    await req("PATCH", { memberBreakdown: "yes" }),
    params(pool.id)
  );
  assert.equal(res.status, 400);
  assert.doesNotMatch(await res.text(), /\bat .+:\d+:\d+/);
  assert.equal(getPoolMemberBreakdown(pool.id), false);
});
