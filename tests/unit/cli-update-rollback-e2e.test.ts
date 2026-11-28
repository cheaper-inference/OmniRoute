/**
 * End-to-end check of the managed update with the REAL coordinator, process control, snapshot
 * and restore code, against a throwaway fake install: a temp "global" package tree, a fake
 * `npm` script and tiny fake servers. Nothing here touches a real service, a real npm prefix
 * or a real data directory; every process it starts is stopped by pid.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {
  installedVersion as version,
  preflightFor,
  setup,
  startOldServer,
  teardown,
  waitForPing,
  type Env,
} from "../helpers/managedUpdateFixture.ts";

const tx = await import("../../bin/cli/updateTransaction.mjs");

// `runUpdate` pins the container check but not the platform: the pre-flight reads /proc and
// returns `unsupported-platform` anywhere but Linux, so these scenarios are registered on Linux
// only. The orchestration tests in cli-update-rollback.test.ts run everywhere.
const LINUX_ONLY = process.platform !== "linux" && "the managed update only runs on Linux";

async function runUpdate(env: Env, targetVersion: string, readinessTimeoutMs: number) {
  const plan = {
    operationId: "0b8f3c1e-2d4a-4f6b-9c7d-1a2b3c4d5e6f",
    previousVersion: "3.8.54",
    targetVersion,
    readinessTimeoutMs,
    pollIntervalMs: 100,
  };
  const pre = await preflightFor(env, plan);
  assert.equal(pre.kind, "ok", JSON.stringify(pre));
  await tx.launchManagedUpdateCoordinator({
    plan,
    runtime: pre.runtime,
    environment: pre.environment,
  });
  const state = await tx.waitForManagedUpdateOutcome(env.dataDir, plan.operationId, {
    timeoutMs: 90_000,
    pollMs: 100,
  });
  return { plan, state };
}

test(
  "e2e: a healthy target is installed, started, proven ready and the snapshots are discarded",
  { skip: LINUX_ONLY },
  async () => {
    const env = await setup();
    try {
      startOldServer(env);
      assert.equal(await waitForPing(env.port), true, "the fake old service must be up first");
      const { plan, state } = await runUpdate(env, "3.8.55", 10_000);
      assert.equal(state.status, "updated", JSON.stringify(state));
      assert.equal(state.runningVersion, "3.8.55");
      assert.equal(version(env), "3.8.55");
      assert.equal(
        fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"),
        "MIGRATED-BY-3.8.55"
      );
      assert.equal(await waitForPing(env.port), true, "the new service answers");
      const opDir = tx.operationDir(env.dataDir, plan.operationId);
      assert.equal(fs.existsSync(path.join(opDir, "data-snapshot")), false);
      assert.equal(fs.existsSync(path.join(opDir, "previous-package")), false);
      assert.equal(tx.isLockHeld(env.dataDir), false, "lock released");
    } finally {
      teardown(env);
    }
  }
);

test(
  "e2e: a target that migrates the data and then fails to start is rolled back with the data restored",
  { skip: LINUX_ONLY },
  async () => {
    const env = await setup();
    try {
      startOldServer(env);
      assert.equal(await waitForPing(env.port), true);
      const { plan, state } = await runUpdate(env, "3.8.56", 10_000);
      assert.equal(state.status, "rolled-back", JSON.stringify(state));
      assert.equal(state.runningVersion, "3.8.54");
      assert.equal(state.reason, "target-not-ready");
      assert.equal(version(env), "3.8.54");
      assert.equal(
        fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"),
        "ORIGINAL-DB"
      );
      assert.equal(await waitForPing(env.port), true, "the previous version answers again");
      // The failed tree and the candidate's data are kept for diagnosis.
      const siblings = fs.readdirSync(path.dirname(env.packageRoot));
      assert.ok(
        siblings.some((name) => name.startsWith("omniroute.failed-")),
        siblings.join(",")
      );
      const opDir = tx.operationDir(env.dataDir, plan.operationId);
      assert.equal(
        fs.readFileSync(path.join(opDir, "candidate-data", "storage.sqlite"), "utf8"),
        "MIGRATED-BY-3.8.56"
      );
      assert.equal(tx.isLockHeld(env.dataDir), false);
    } finally {
      teardown(env);
    }
  }
);

test(
  "e2e: a partial npm install error restores the package and brings the previous version back",
  { skip: LINUX_ONLY },
  async () => {
    const env = await setup();
    try {
      startOldServer(env);
      assert.equal(await waitForPing(env.port), true);
      const { state } = await runUpdate(env, "3.8.57", 10_000);
      assert.equal(state.status, "rolled-back", JSON.stringify(state));
      assert.equal(state.reason, "install-failed");
      assert.equal(version(env), "3.8.54");
      assert.ok(fs.existsSync(path.join(env.packageRoot, "bin", "omniroute.mjs")));
      assert.equal(
        fs.readFileSync(path.join(env.dataDir, "storage.sqlite"), "utf8"),
        "ORIGINAL-DB"
      );
      assert.equal(await waitForPing(env.port), true);
    } finally {
      teardown(env);
    }
  }
);

test(
  "e2e: a target missing from the registry is refused before anything stops",
  { skip: LINUX_ONLY },
  async () => {
    const env = await setup();
    try {
      const oldPid = startOldServer(env);
      assert.equal(await waitForPing(env.port), true);
      const { state } = await runUpdate(env, "9.9.9", 2_500);
      assert.equal(state.status, "unsupported", JSON.stringify(state));
      assert.equal(state.reason, "target-unavailable");
      assert.equal(state.refused, true);
      assert.equal(version(env), "3.8.54");
      process.kill(oldPid, 0); // still alive: throws if it was stopped
      assert.equal(await waitForPing(env.port), true);
    } finally {
      teardown(env);
    }
  }
);
