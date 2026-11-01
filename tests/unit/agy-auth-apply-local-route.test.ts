/**
 * POST /api/providers/agy-auth/apply-local — local Antigravity CLI login import.
 *
 * Proves that with no local login anywhere (isolated HOME, no AGY_TOKEN_FILE) the
 * route answers 404 `no_local_login` instead of a 500, and that an explicit
 * AGY_TOKEN_FILE that does not exist falls through to the same 404.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-apply-local-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const ISOLATED_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-apply-local-home-"));
const ENV_KEYS = ["HOME", "USERPROFILE", "XDG_CONFIG_HOME", "APPDATA", "AGY_TOKEN_FILE"] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { POST } = await import("../../src/app/api/providers/agy-auth/apply-local/route.ts");

function makeRequest(body?: unknown) {
  return new Request("http://localhost/api/providers/agy-auth/apply-local", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

test.before(async () => {
  await updateSettings({ requireLogin: false, setupComplete: true });
  process.env.HOME = ISOLATED_HOME;
  process.env.USERPROFILE = ISOLATED_HOME;
  process.env.XDG_CONFIG_HOME = path.join(ISOLATED_HOME, ".config");
  process.env.APPDATA = path.join(ISOLATED_HOME, "AppData", "Roaming");
  delete process.env.AGY_TOKEN_FILE;
});

test.after(() => {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(ISOLATED_HOME, { recursive: true, force: true });
});

test("apply-local returns 404 no_local_login when no local Antigravity login exists", async () => {
  const res = await POST(makeRequest());
  assert.equal(res.status, 404);
  const data = await res.json();
  assert.equal(data.code, "no_local_login");
  assert.match(data.error, /No local Antigravity CLI login found/);
});

test("apply-local returns 404 when AGY_TOKEN_FILE points at a missing file", async () => {
  process.env.AGY_TOKEN_FILE = path.join(ISOLATED_HOME, "does-not-exist.json");
  try {
    const res = await POST(makeRequest({ overwriteExisting: false }));
    assert.equal(res.status, 404);
    const data = await res.json();
    assert.equal(data.code, "no_local_login");
  } finally {
    delete process.env.AGY_TOKEN_FILE;
  }
});

test("apply-local rejects a malformed JSON body with 400", async () => {
  const res = await POST(
    new Request("http://localhost/api/providers/agy-auth/apply-local", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{not json",
    })
  );
  assert.equal(res.status, 400);
});
