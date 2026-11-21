/**
 * Settings-write wiring for the quota window ping scheduler.
 *
 * runtimeSettings must not import the scheduler itself: that import (even dynamic)
 * pulled runner -> open-sse executors into the dashboard typecheck program and
 * surfaced pre-existing executor errors as check:dashboard-typecheck regressions.
 * The boot code in instrumentation-node.ts registers the scheduler refresh here,
 * and every settings write reaches the scheduler through this dependency-free seam.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qwp-wiring-"));
process.env.APP_LOG_TO_FILE = "false";

const runtime = await import("../../src/lib/config/runtimeSettings.ts");
const bridge = await import("../../src/lib/config/quotaWindowPingRefresh.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  bridge.registerQuotaWindowPingRefresh(null);
  resetDbInstance();
  fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
});

test("no registered handler: a settings write still completes", async () => {
  bridge.registerQuotaWindowPingRefresh(null);
  runtime.resetRuntimeSettingsStateForTests();

  const changes = await runtime.applyRuntimeSettings({ quotaWindowPing: { enabled: true } });

  assert.ok(changes.some((change) => change.section === "quotaWindowPing"));
});

test("a settings write refreshes the registered scheduler only on a real change", async () => {
  let calls = 0;
  bridge.registerQuotaWindowPingRefresh(async () => {
    calls += 1;
  });
  runtime.resetRuntimeSettingsStateForTests();

  await runtime.applyRuntimeSettings({ quotaWindowPing: { enabled: true } });
  assert.equal(calls, 1);

  await runtime.applyRuntimeSettings({ quotaWindowPing: { enabled: true } });
  assert.equal(calls, 1, "an unchanged section does not refresh");

  await runtime.applyRuntimeSettings({ quotaWindowPing: { enabled: false } });
  assert.equal(calls, 2);
});

test("a throwing refresh handler never fails the settings write", async () => {
  bridge.registerQuotaWindowPingRefresh(async () => {
    throw new Error("scheduler unavailable");
  });
  runtime.resetRuntimeSettingsStateForTests();

  const changes = await runtime.applyRuntimeSettings({ quotaWindowPing: { enabled: true } });

  assert.ok(changes.some((change) => change.section === "quotaWindowPing"));
});
