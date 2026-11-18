/**
 * GET /api/settings/banked-reset-auto/history — recent `bankedReset.redeem` audit rows plus
 * the last 24 h counts, behind management auth, with a Zod-validated `limit` (1–200) and
 * sanitized error bodies.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-banked-reset-history-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_API_KEY_SECRET = process.env.API_KEY_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "a".repeat(64);

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const route = await import("../../src/app/api/settings/banked-reset-auto/history/route.ts");

const URL_BASE = "http://localhost/api/settings/banked-reset-auto/history";
const HOUR_MS = 3_600_000;

async function enableManagementAuth() {
  process.env.INITIAL_PASSWORD = "banked-reset-history-password";
  await settingsDb.updateSettings({ requireLogin: true, password: "" });
}

function seedRow(status: string, ageMs: number, target = "conn-a", action = "bankedReset.redeem") {
  compliance.logAuditEvent({
    action,
    actor: "system",
    target,
    resourceType: "provider_connection",
    status,
    details: {
      provider: "codex",
      creditType: "codexCredits",
      mode: "eager",
      trigger: "walled-session",
      reason: "walled-session",
    },
    createdAt: new Date(Date.now() - ageMs).toISOString(),
  });
}

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_INITIAL_PASSWORD === undefined) delete process.env.INITIAL_PASSWORD;
  else process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  if (ORIGINAL_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = ORIGINAL_API_KEY_SECRET;
});

test("history route requires management auth", async () => {
  await enableManagementAuth();
  const res = await route.GET(new Request(URL_BASE));
  assert.equal(res.status, 401);
});

test("history route returns recent redeem rows (newest first) and the 24 h counts", async () => {
  await enableManagementAuth();
  seedRow("success", 1 * HOUR_MS, "conn-a");
  seedRow("failed", 2 * HOUR_MS, "conn-b");
  seedRow("dry-run", 3 * HOUR_MS, "conn-a");
  seedRow("success", 30 * HOUR_MS, "conn-b"); // older than 24 h: listed, not counted
  seedRow("success", 1 * HOUR_MS, "conn-a", "settings.update"); // another action

  const res = await route.GET(await makeManagementSessionRequest(URL_BASE));
  assert.equal(res.status, 200);
  const body = await res.json();

  assert.equal(body.entries.length, 4);
  assert.deepEqual(
    body.entries.map((e: { status: string }) => e.status),
    ["success", "failed", "dry-run", "success"]
  );
  assert.deepEqual(body.entries[0], {
    id: body.entries[0].id,
    timestamp: body.entries[0].timestamp,
    connectionId: "conn-a",
    status: "success",
    provider: "codex",
    creditType: "codexCredits",
    mode: "eager",
    trigger: "walled-session",
    reason: "walled-session",
  });
  assert.deepEqual(body.counts24h, { success: 1, failed: 1, dryRun: 1 });
});

test("history route honours ?limit", async () => {
  await enableManagementAuth();
  for (let i = 0; i < 5; i++) seedRow("success", (i + 1) * 60_000);
  const res = await route.GET(await makeManagementSessionRequest(`${URL_BASE}?limit=2`));
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.entries.length, 2);
  assert.equal(body.counts24h.success, 5);
});

test("history route rejects an out-of-range or non-numeric limit with a clean 400", async () => {
  await enableManagementAuth();
  for (const limit of ["0", "201", "abc", "1.5"]) {
    const res = await route.GET(await makeManagementSessionRequest(`${URL_BASE}?limit=${limit}`));
    assert.equal(res.status, 400, `limit=${limit}`);
    const body = await res.json();
    assert.equal(typeof body.error.message, "string");
    assert.ok(!body.error.message.includes("at /"), "no stack trace in the error body");
  }
});

test("history route failure returns a sanitized 500 without a stack", async () => {
  await enableManagementAuth();
  // Replace the table with a view: the audit read now throws inside the route.
  const db = core.getDbInstance();
  db.exec("DROP TABLE IF EXISTS audit_log; CREATE VIEW audit_log AS SELECT 1 AS x;");
  const originalError = console.error;
  console.error = () => undefined;
  try {
    const res = await route.GET(await makeManagementSessionRequest(URL_BASE));
    assert.equal(res.status, 500);
    const body = await res.json();
    assert.equal(typeof body.error.message, "string");
    assert.ok(!body.error.message.includes("at /"), "no stack trace in the error body");
    assert.ok(!JSON.stringify(body).includes("views may not be indexed"), "no raw error text");
  } finally {
    console.error = originalError;
  }
});
