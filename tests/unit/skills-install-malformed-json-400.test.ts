/**
 * Regression tests: POST /api/skills/marketplace/install and POST /api/skills/skillssh/install
 * must answer 400 (not 500) when the request body is not JSON.
 *
 * Before the fix both handlers read the body with `await request.json()` inside the try whose
 * catch answers 500, so a body that is not JSON came back as a 500. A well-formed body keeps its
 * existing behavior.
 *
 * Setup mirrors tests/unit/skills-skillssh.test.ts: a temp DATA_DIR, `requireLogin: false` so
 * the handlers run unauthenticated, and the skills provider set to the one each route needs.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skills-install-json-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = tmpDir;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { skillRegistry } = await import("../../src/lib/skills/registry.ts");
const marketplaceInstall = await import("../../src/app/api/skills/marketplace/install/route.ts");
const skillsshInstall = await import("../../src/app/api/skills/skillssh/install/route.ts");

function clearSkillRegistry() {
  skillRegistry.registeredSkills?.clear?.();
  skillRegistry.versionCache?.clear?.();
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(tmpDir, { recursive: true });
  clearSkillRegistry();
  core.getDbInstance();
}

function postRequest(url: string, body: string): Request {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
  });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  clearSkillRegistry();
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("POST /api/skills/marketplace/install — a body that is not JSON answers 400", async () => {
  await settingsDb.updateSettings({ skillsProvider: "skillsmp", requireLogin: false });
  const res = await marketplaceInstall.POST(
    postRequest("http://localhost/api/skills/marketplace/install", "not-json")
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("POST /api/skills/marketplace/install — a well-formed but invalid body still answers 400", async () => {
  await settingsDb.updateSettings({ skillsProvider: "skillsmp", requireLogin: false });
  const res = await marketplaceInstall.POST(
    postRequest("http://localhost/api/skills/marketplace/install", JSON.stringify({}))
  );
  assert.equal(res.status, 400);
});

test("POST /api/skills/skillssh/install — a body that is not JSON answers 400", async () => {
  await settingsDb.updateSettings({ skillsProvider: "skillssh", requireLogin: false });
  const res = await skillsshInstall.POST(
    postRequest("http://localhost/api/skills/skillssh/install", "not-json")
  );
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.equal(body.error, "Invalid JSON body");
});

test("POST /api/skills/skillssh/install — a well-formed but invalid body still answers 400", async () => {
  await settingsDb.updateSettings({ skillsProvider: "skillssh", requireLogin: false });
  const res = await skillsshInstall.POST(
    postRequest("http://localhost/api/skills/skillssh/install", JSON.stringify({}))
  );
  assert.equal(res.status, 400);
});
