import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #18608: a saved resilienceSettings boolean beats the env toggle, so an env flag the
// operator set explicitly can be silently ignored. Boot must say so once.
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-resilience-env-18608-"));
const originalDataDir = process.env.DATA_DIR;
process.env.DATA_DIR = dataDir;

const ENV_KEYS = [
  "QUOTA_PREFLIGHT_CUTOFF_ENABLED",
  "PROVIDER_COOLDOWN_ENABLED",
  "STREAM_RECOVERY_ENABLED",
  "STREAM_RECOVERY_MIDSTREAM_ENABLED",
  "STREAM_THROUGHPUT_WATCHDOG_ENABLED",
] as const;
const savedEnv = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));

const { findResilienceEnvOverrides, warnResilienceEnvOverridesAtBoot } =
  await import("../../src/lib/resilience/envOverrideWarning.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");

function clearEnv() {
  for (const key of ENV_KEYS) delete process.env[key];
}

test.beforeEach(clearEnv);

test.after(() => {
  for (const key of ENV_KEYS) {
    if (savedEnv[key] === undefined) delete process.env[key];
    else process.env[key] = savedEnv[key];
  }
  invalidateDbCache("settings");
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("an env flag that disagrees with the saved boolean is reported", () => {
  process.env.QUOTA_PREFLIGHT_CUTOFF_ENABLED = "true";
  process.env.STREAM_THROUGHPUT_WATCHDOG_ENABLED = "1";
  const found = findResilienceEnvOverrides({
    resilienceSettings: {
      quotaPreflight: { enabled: false },
      streamRecovery: { throughputWatchdog: { enabled: false } },
    },
  });
  assert.deepEqual(found, [
    { env: "QUOTA_PREFLIGHT_CUTOFF_ENABLED", envValue: true, saved: false },
    { env: "STREAM_THROUGHPUT_WATCHDOG_ENABLED", envValue: true, saved: false },
  ]);
});

test("an env flag that agrees with the saved boolean is not reported", () => {
  process.env.PROVIDER_COOLDOWN_ENABLED = "off";
  const found = findResilienceEnvOverrides({
    resilienceSettings: { providerCooldown: { enabled: false } },
  });
  assert.deepEqual(found, []);
});

test("nothing is reported without an env value, without a saved boolean, or for an unreadable env value", () => {
  const saved = { resilienceSettings: { streamRecovery: { enabled: false } } };
  assert.deepEqual(findResilienceEnvOverrides(saved), []);
  process.env.STREAM_RECOVERY_ENABLED = "  ";
  assert.deepEqual(findResilienceEnvOverrides(saved), []);
  process.env.STREAM_RECOVERY_ENABLED = "maybe";
  assert.deepEqual(findResilienceEnvOverrides(saved), []);
  process.env.STREAM_RECOVERY_ENABLED = "true";
  assert.deepEqual(findResilienceEnvOverrides({}), []);
  assert.deepEqual(findResilienceEnvOverrides({ resilienceSettings: { streamRecovery: {} } }), []);
  assert.deepEqual(findResilienceEnvOverrides(null), []);
});

test("boot logs one warning that names the overridden flag and its saved value", async () => {
  await updateSettings({ resilienceSettings: { quotaPreflight: { enabled: false } } });
  process.env.QUOTA_PREFLIGHT_CUTOFF_ENABLED = "true";
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => void warnings.push(args.map(String).join(" "));
  try {
    await warnResilienceEnvOverridesAtBoot();
  } finally {
    console.warn = originalWarn;
  }
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /QUOTA_PREFLIGHT_CUTOFF_ENABLED=true \(saved: false\)/);
  assert.match(warnings[0], /saved setting wins/);
});

test("boot stays silent when no env flag is overridden", async () => {
  await updateSettings({ resilienceSettings: { quotaPreflight: { enabled: false } } });
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => void warnings.push(args.map(String).join(" "));
  try {
    await warnResilienceEnvOverridesAtBoot();
  } finally {
    console.warn = originalWarn;
  }
  assert.deepEqual(warnings, []);
});

test("registerNodejs runs the check after the DB is ready", () => {
  const source = fs.readFileSync("src/instrumentation-node.ts", "utf8");
  const call = source.indexOf("warnResilienceEnvOverridesAtBoot()");
  assert.ok(call > source.indexOf("await warmAdaptiveVirtualLanesIntoRuntime();"));
});
