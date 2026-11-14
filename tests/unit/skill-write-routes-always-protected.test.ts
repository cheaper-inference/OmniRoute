// With login disabled (requireLogin=false), every MANAGEMENT route is anonymous unless it is
// in ALWAYS_PROTECTED_API_PATHS. These skill routes write to the host or to every tenant:
// /api/agent-skills/generate can prune directories under skills/, and the two install routes
// register a global skill that is injected into other keys' requests. They now require a
// dashboard session or a manage-scoped key in every mode.
//
// Anonymous calls send an invalid JSON body: before the fix they passed the auth gate and
// stopped at a 400 or 409 branch, so the RED run has no side effects.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-skill-writers-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "skill-writers-api-key-secret";
process.env.JWT_SECRET = "skill-writers-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { isAlwaysProtectedPath } = await import("../../src/server/authz/routeGuard.ts");
const generateRoute = await import("../../src/app/api/agent-skills/generate/route.ts");
const marketplaceRoute = await import("../../src/app/api/skills/marketplace/install/route.ts");
const skillsshRoute = await import("../../src/app/api/skills/skillssh/install/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const BASE = "http://localhost:20128";
const ROUTES = [
  ["/api/agent-skills/generate", generateRoute],
  ["/api/skills/marketplace/install", marketplaceRoute],
  ["/api/skills/skillssh/install", skillsshRoute],
] as const;

function anonymous(pathname: string): Request {
  return new Request(`${BASE}${pathname}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "not-json",
  });
}

async function withLoginDisabled(run: () => Promise<void>): Promise<void> {
  await updateSettings({ requireLogin: false, setupComplete: true });
  try {
    await run();
  } finally {
    await updateSettings({ requireLogin: true });
  }
}

test("the central route guard always protects the skill write routes", () => {
  for (const [p] of ROUTES) {
    assert.equal(isAlwaysProtectedPath(p), true, `${p} must be ALWAYS_PROTECTED`);
  }
  // The read-only marketplace listing stays on the normal tier.
  assert.equal(isAlwaysProtectedPath("/api/skills/marketplace"), false);
});

test("with login disabled, anonymous callers cannot prune or install skills", async () => {
  await withLoginDisabled(async () => {
    for (const [p, route] of ROUTES) {
      const response = await route.POST(anonymous(p));
      const text = await response.text();
      assert.equal(
        response.status,
        401,
        `POST ${p}: expected 401, got ${response.status}: ${text}`
      );
      assert.ok(!text.includes("at /"), `POST ${p}: 401 body must not leak a stack trace`);
    }
  });
});

test("with login disabled, a dashboard session still reaches the handlers", async () => {
  await withLoginDisabled(async () => {
    for (const [p, route] of ROUTES) {
      const request = await makeManagementSessionRequest(`${BASE}${p}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "not-json",
      });
      const response = await route.POST(request);
      assert.notEqual(response.status, 401, `POST ${p} refused a dashboard session`);
      assert.notEqual(response.status, 403, `POST ${p} refused a dashboard session`);
    }
  });
});
