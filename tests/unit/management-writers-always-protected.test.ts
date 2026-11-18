// With login disabled (requireLogin=false, the "local-first" mode `omniroute setup` and the
// onboarding "skip" write), every MANAGEMENT route is anonymous unless it is in
// ALWAYS_PROTECTED_API_PATHS. These routes write the operator's host CLI config, ship call
// logs to a caller-chosen BigQuery project, or restart the process, while their same-effect
// siblings (/api/cli-tools/codex-profiles, /api/logs/export, /api/shutdown) were already
// protected. They now require a dashboard session or a manage-scoped key in every mode.
//
// Anonymous calls send an invalid JSON body: before the fix they passed the auth gate and
// stopped at the 400 "invalid JSON" branch, so the RED run has no side effects.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-writers-"));
const TEST_HOME = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-mgmt-writers-home-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  HOME: process.env.HOME,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  CLI_ALLOW_CONFIG_WRITES: process.env.CLI_ALLOW_CONFIG_WRITES,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.HOME = TEST_HOME;
process.env.API_KEY_SECRET = "mgmt-writers-api-key-secret";
process.env.JWT_SECRET = "mgmt-writers-jwt-secret";
// Belt and braces: even a request that got through must not touch a CLI config.
process.env.CLI_ALLOW_CONFIG_WRITES = "false";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { isAlwaysProtectedPath } = await import("../../src/server/authz/routeGuard.ts");
const applyRoute = await import("../../src/app/api/cli-tools/apply/route.ts");
const backupsRoute = await import("../../src/app/api/cli-tools/backups/route.ts");
const hermesRoute = await import("../../src/app/api/cli-tools/hermes-agent-settings/route.ts");
const guideRoute = await import("../../src/app/api/cli-tools/guide-settings/[toolId]/route.ts");
const destinationsRoute = await import("../../src/app/api/log-export/destinations/route.ts");
const runRoute = await import("../../src/app/api/log-export/destinations/[id]/run/route.ts");
const statusRoute = await import("../../src/app/api/log-export/status/route.ts");
const restartRoute = await import("../../src/app/api/restart/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(TEST_HOME, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

const BASE = "http://localhost:20128";
const idCtx = (id: string) => ({ params: Promise.resolve({ id }) });
const toolCtx = (toolId: string) => ({ params: Promise.resolve({ toolId }) });

function anonymous(pathname: string, method = "GET"): Request {
  return new Request(`${BASE}${pathname}`, {
    method,
    headers: method === "GET" ? {} : { "content-type": "application/json" },
    body: method === "GET" ? undefined : "not-json",
  });
}

async function assertUnauthenticated(label: string, response: Response): Promise<void> {
  const text = await response.text();
  assert.equal(response.status, 401, `${label}: expected 401, got ${response.status}: ${text}`);
  assert.ok(!text.includes("at /"), `${label}: 401 body must not leak a stack trace`);
}

async function withLoginDisabled(run: () => Promise<void>): Promise<void> {
  await updateSettings({ requireLogin: false, setupComplete: true });
  try {
    await run();
  } finally {
    await updateSettings({ requireLogin: true });
  }
}

test("the central route guard always protects the host-config, log-export and restart routes", () => {
  for (const p of [
    "/api/cli-tools/apply",
    "/api/cli-tools/backups",
    "/api/cli-tools/hermes-agent-settings",
    "/api/cli-tools/guide-settings/claude",
    "/api/log-export/destinations",
    "/api/log-export/destinations/dest-1/run",
    "/api/log-export/destinations/dest-1/test",
    "/api/log-export/status",
    "/api/restart",
  ]) {
    assert.equal(isAlwaysProtectedPath(p), true, `${p} must be ALWAYS_PROTECTED`);
  }
  // Read-only CLI tool routes the dashboard polls stay on the normal tier.
  assert.equal(isAlwaysProtectedPath("/api/cli-tools/status"), false);
});

test("with login disabled, anonymous callers cannot rewrite host CLI configs", async () => {
  await withLoginDisabled(async () => {
    await assertUnauthenticated(
      "POST /api/cli-tools/apply",
      await applyRoute.POST(anonymous("/api/cli-tools/apply", "POST"))
    );
    await assertUnauthenticated(
      "POST /api/cli-tools/backups",
      await backupsRoute.POST(anonymous("/api/cli-tools/backups", "POST"))
    );
    await assertUnauthenticated(
      "POST /api/cli-tools/hermes-agent-settings",
      await hermesRoute.POST(anonymous("/api/cli-tools/hermes-agent-settings", "POST"))
    );
    await assertUnauthenticated(
      "POST /api/cli-tools/guide-settings/claude",
      await guideRoute.POST(
        anonymous("/api/cli-tools/guide-settings/claude", "POST"),
        toolCtx("claude")
      )
    );
  });
});

test("with login disabled, anonymous callers cannot configure or run a log export", async () => {
  await withLoginDisabled(async () => {
    await assertUnauthenticated(
      "GET /api/log-export/destinations",
      await destinationsRoute.GET(anonymous("/api/log-export/destinations"))
    );
    await assertUnauthenticated(
      "POST /api/log-export/destinations",
      await destinationsRoute.POST(anonymous("/api/log-export/destinations", "POST"))
    );
    await assertUnauthenticated(
      "POST /api/log-export/destinations/[id]/run",
      await runRoute.POST(
        anonymous("/api/log-export/destinations/missing/run", "POST"),
        idCtx("missing")
      )
    );
    await assertUnauthenticated(
      "GET /api/log-export/status",
      await statusRoute.GET(anonymous("/api/log-export/status"))
    );
  });
});

test("with login disabled, anonymous callers cannot restart the server", async (t) => {
  const kill = t.mock.method(process, "kill", () => true);
  try {
    await withLoginDisabled(async () => {
      await assertUnauthenticated(
        "POST /api/restart",
        await restartRoute.POST(anonymous("/api/restart", "POST"))
      );
    });
  } finally {
    // A restart that slipped through schedules SIGTERM 500 ms later; wait past it here so
    // the signal is counted by this test, not the next one.
    await new Promise((resolve) => setTimeout(resolve, 650));
  }
  assert.equal(kill.mock.callCount(), 0, "an anonymous restart must not signal the process");
});

test("with login disabled, a dashboard session keeps using these routes", async (t) => {
  const kill = t.mock.method(process, "kill", () => true);
  await withLoginDisabled(async () => {
    const list = await destinationsRoute.GET(
      await makeManagementSessionRequest(`${BASE}/api/log-export/destinations`)
    );
    assert.equal(list.status, 200, await list.clone().text());

    const restart = await restartRoute.POST(
      await makeManagementSessionRequest(`${BASE}/api/restart`, { method: "POST" })
    );
    assert.equal(restart.status, 200, await restart.clone().text());
  });
  await new Promise((resolve) => setTimeout(resolve, 650));
  assert.equal(kill.mock.callCount(), 1, "the authenticated restart signals the process once");
});
