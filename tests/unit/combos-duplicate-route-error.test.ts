/**
 * Unit tests for the 500 catch path of POST /api/combos/duplicate (issue #16969,
 * Hard Rule #12).
 *
 * Before the fix the route's final catch returned `details: String(error.message)`,
 * leaking the raw exception message into the 500 body. This test forces that path
 * through a real failure, with no module mocks: after the isolated DB is migrated it
 * drops the `provider_connections` table, so the auto-combo resolution
 * (prepareVirtualAutoComboInputs → getCachedProviderConnections) throws a genuine
 * SQLite "no such table" error inside the route's try block. The auth gate only reads
 * settings, so the request still reaches that catch.
 *
 * This is a dedicated file (not part of combos-duplicate-route.test.ts) because it
 * destroys a table in its throwaway DATA_DIR.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combos-dup-err-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "combos-duplicate-error-test-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const duplicateRoute = await import("../../src/app/api/combos/duplicate/route.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

test("#16969: a 500 from POST /api/combos/duplicate must not leak the raw exception message", async () => {
  await settingsDb.updateSettings({ requireLogin: false });
  // Real failure seam: the connection lookup now fails with a raw SQLite error.
  core.getDbInstance().exec("DROP TABLE provider_connections");

  const res = await duplicateRoute.POST(
    new Request("http://localhost/api/combos/duplicate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "auto/best-coding" }),
    }) as never
  );
  const body = (await res.json()) as { error?: string; details?: unknown };
  const serialized = JSON.stringify(body);

  // With the table present (and no connections) the route answers 422 instead.
  assert.equal(res.status, 500, `expected 500, got ${res.status}: ${serialized}`);
  assert.equal(body.error, "Failed to duplicate auto-combo");
  assert.equal(body.details, undefined, `500 body must not carry raw details: ${serialized}`);
  assert.ok(!/no such table/i.test(serialized), `raw SQLite error leaked: ${serialized}`);
  assert.ok(!serialized.includes("provider_connections"), `table name leaked: ${serialized}`);
  assert.ok(!serialized.includes("at /"), "error response must not leak stack traces");
});
