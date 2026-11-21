import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-readiness-checks-"));
process.env.DATA_DIR = DATA_DIR;

const checks = await import("../../src/lib/readinessChecks.ts");
const { GuardrailRegistry, BaseGuardrail } = await import("../../src/lib/guardrails/index.ts");
const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/monitoring/health/route.ts");

const GUARD_ENV = [
  "INJECTION_GUARD_MODE",
  "INPUT_SANITIZER_MODE",
  "INPUT_SANITIZER_BLOCK_THRESHOLD",
  "INJECTION_GUARD_BLOCK_THRESHOLD",
] as const;

test.beforeEach(() => {
  checks.resetReadinessChecksForTests();
  for (const name of GUARD_ENV) delete process.env[name];
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("healthy by default: every check is ok and nothing is degraded", () => {
  const report = checks.getReadinessChecks();
  assert.deepEqual(report.degraded_checks, []);
  assert.deepEqual(report.checks, {
    hot_reload: "ok",
    guardrails_fail_open: "ok",
    injection_guard: "ok",
  });
});

test("a failed runtime-config reload degrades hot_reload until a reload succeeds", () => {
  checks.noteHotReload(false);
  assert.deepEqual(checks.getReadinessChecks().degraded_checks, ["hot_reload"]);
  checks.noteHotReload(true);
  assert.deepEqual(checks.getReadinessChecks().degraded_checks, []);
});

test("a guardrail that failed open is reported for 5 minutes, by name only", () => {
  checks.noteGuardrailFailOpen("pii-masker", 1_000_000);
  const during = checks.getReadinessChecks(1_000_000 + 299_000);
  assert.deepEqual(during.degraded_checks, ["guardrails_fail_open"]);
  assert.equal(during.checks.guardrails_fail_open, "degraded: pii-masker");
  assert.deepEqual(checks.getReadinessChecks(1_000_000 + 301_000).degraded_checks, []);
});

test("the registry reports a guardrail that throws, before and after the call, without its error text", async () => {
  class Exploder extends BaseGuardrail {
    async preCall(): Promise<never> {
      throw new Error("secret detail that must stay out of the report");
    }
    async postCall(): Promise<never> {
      throw new Error("another secret detail");
    }
  }
  const registry = new GuardrailRegistry();
  registry.register(new Exploder("exploder"));

  await registry.runPreCallHooks({}, { log: { warn() {} } });
  assert.deepEqual(checks.getReadinessChecks().degraded_checks, ["guardrails_fail_open"]);

  checks.resetReadinessChecksForTests();
  await registry.runPostCallHooks({}, { log: { warn() {} } });
  const report = checks.getReadinessChecks();
  assert.deepEqual(report.degraded_checks, ["guardrails_fail_open"]);
  assert.equal(JSON.stringify(report).includes("secret detail"), false);
});

test("an injection-guard mode or threshold that nothing recognises is reported as unreachable", () => {
  process.env.INJECTION_GUARD_MODE = "blok";
  let report = checks.getReadinessChecks();
  assert.deepEqual(report.degraded_checks, ["injection_guard"]);
  assert.match(report.checks.injection_guard, /^unreachable: mode "blok"/);

  delete process.env.INJECTION_GUARD_MODE;
  process.env.INPUT_SANITIZER_BLOCK_THRESHOLD = "hgih";
  report = checks.getReadinessChecks();
  assert.deepEqual(report.degraded_checks, ["injection_guard"]);
  assert.match(report.checks.injection_guard, /threshold "hgih"/);

  process.env.INPUT_SANITIZER_BLOCK_THRESHOLD = "medium";
  process.env.INJECTION_GUARD_MODE = "block";
  assert.deepEqual(checks.getReadinessChecks().degraded_checks, []);
});

test("the report reaches the management health payload and never the anonymous view", async () => {
  checks.noteHotReload(false);
  const managed = (await makeManagementSessionRequest(
    "http://localhost/api/monitoring/health"
  )) as unknown as NextRequest;
  const full = (await (await route.GET(managed as never)).json()) as {
    readiness?: { degraded_checks?: string[] };
  };
  assert.deepEqual(full.readiness?.degraded_checks, ["hot_reload"]);

  const anonymous = (await (
    await route.GET(new Request("http://localhost/api/monitoring/health") as never)
  ).json()) as Record<string, unknown>;
  assert.equal("readiness" in anonymous, false, "no readiness detail for an anonymous caller");
});

// The reload loop runs on its own queue. The test waits for the loop's own notification
// (readiness flips), driven by setImmediate yields: no timer and no clock.
async function until(predicate: () => boolean): Promise<void> {
  for (let i = 0; i < 20_000 && !predicate(); i += 1) {
    await new Promise((resolve) => setImmediate(resolve));
  }
  assert.equal(predicate(), true, "the reload loop never reported its result");
}

test("the hot reload loop reports a failed reload, and its recovery", async () => {
  const hotReload = await import("../../src/lib/config/hotReload.ts");
  hotReload.stopRuntimeConfigHotReloadForTests();
  try {
    // A failing settings read is what a broken database or a bad stored setting looks like.
    core.resetDbInstance();
    const sqliteFile = path.join(DATA_DIR, "storage.sqlite");
    fs.rmSync(sqliteFile, { force: true });
    fs.rmSync(`${sqliteFile}-wal`, { force: true });
    fs.rmSync(`${sqliteFile}-shm`, { force: true });
    fs.mkdirSync(sqliteFile);
    hotReload.startRuntimeConfigHotReload({ pollIntervalMs: 3_600_000 });
    await until(() => checks.getReadinessChecks().degraded_checks.includes("hot_reload"));

    hotReload.stopRuntimeConfigHotReloadForTests();
    fs.rmSync(sqliteFile, { recursive: true, force: true });
    core.resetDbInstance();
    hotReload.startRuntimeConfigHotReload({ pollIntervalMs: 3_600_000 });
    await until(() => !checks.getReadinessChecks().degraded_checks.includes("hot_reload"));
  } finally {
    hotReload.stopRuntimeConfigHotReloadForTests();
  }
});
