import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-usage-by-combo-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const route = await import("../../src/app/api/usage/by-combo/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

let seq = 0;
async function saveLog(overrides: Record<string, unknown>) {
  seq += 1;
  await callLogs.saveCallLog({
    id: `usage-by-combo-${seq}`,
    timestamp: hoursAgo(1),
    status: 200,
    model: "claude/claude-sonnet-4-6",
    provider: "claude",
    tokens: { prompt_tokens: 100, completion_tokens: 50 },
    ...overrides,
  });
}

test.beforeEach(async () => {
  await resetStorage();
  process.env.INITIAL_PASSWORD = "usage-by-combo-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;

  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;

  if (ORIGINAL_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
});

test("by-combo groups requests and tokens per combo and ignores calls without combo", async () => {
  await saveLog({ comboName: "coder" });
  await saveLog({ comboName: "coder", status: 500 });
  await saveLog({ comboName: "bulk", tokens: { prompt_tokens: 10, completion_tokens: 5 } });
  await saveLog({});

  const response = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=1d")
  );
  assert.equal(response.status, 200);
  const body = await response.json();

  assert.deepEqual(body.combos, [
    { comboName: "coder", requests: 2, successCount: 1, inputTokens: 200, outputTokens: 100 },
    { comboName: "bulk", requests: 1, successCount: 1, inputTokens: 10, outputTokens: 5 },
  ]);
});

test("by-combo respects the range boundary", async () => {
  await saveLog({ comboName: "coder", timestamp: hoursAgo(23) });
  await saveLog({ comboName: "coder", timestamp: hoursAgo(25) });

  const day = await (
    await route.GET(
      await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=1d")
    )
  ).json();
  const week = await (
    await route.GET(
      await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=7d")
    )
  ).json();

  assert.equal(day.combos[0].requests, 1);
  assert.equal(week.combos[0].requests, 2);
});

test("by-combo requires management auth and validates the range", async () => {
  const unauthenticated = await route.GET(new Request("http://localhost/api/usage/by-combo"));
  assert.equal(unauthenticated.status, 401);

  const invalid = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=bad")
  );
  assert.equal(invalid.status, 400);

  const customWithoutStart = await route.GET(
    await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=custom")
  );
  assert.equal(customWithoutStart.status, 400);
});

test("by-combo supports 90d and all ranges", async () => {
  await saveLog({ comboName: "coder", timestamp: hoursAgo(24 * 60) });
  await saveLog({ comboName: "coder", timestamp: hoursAgo(24 * 200) });

  const ninety = await (
    await route.GET(
      await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=90d")
    )
  ).json();
  const all = await (
    await route.GET(
      await makeManagementSessionRequest("http://localhost/api/usage/by-combo?range=all")
    )
  ).json();

  assert.equal(ninety.combos[0].requests, 1);
  assert.equal(all.combos[0].requests, 2);
});

test("by-combo custom range filters between startDate and endDate", async () => {
  await saveLog({ comboName: "coder", timestamp: hoursAgo(10) });
  await saveLog({ comboName: "coder", timestamp: hoursAgo(30) });
  await saveLog({ comboName: "coder", timestamp: hoursAgo(60) });

  const query = new URLSearchParams({
    range: "custom",
    startDate: hoursAgo(40),
    endDate: hoursAgo(20),
  });
  const body = await (
    await route.GET(
      await makeManagementSessionRequest(`http://localhost/api/usage/by-combo?${query}`)
    )
  ).json();

  assert.equal(body.combos[0].requests, 1);
});
