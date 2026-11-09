/**
 * getRuntimeProviderProfile runs several times per request. It must reuse the
 * profile it built for the same settings object instead of rebuilding about 45
 * fields and scanning process.argv on every call, and it must still rebuild when
 * the settings object or the test-process environment changes.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-profile-memo-"));
process.env.DATA_DIR = DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { getRuntimeProviderProfile } = await import("../../open-sse/services/accountFallback.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function countArgvScans(run: () => Promise<void>): Promise<number> {
  const realArgv = process.argv;
  let scans = 0;
  process.argv = new Proxy(realArgv, {
    get(target, prop, receiver) {
      if (prop === Symbol.iterator) scans++;
      return Reflect.get(target, prop, receiver);
    },
  });
  return run().then(
    () => {
      process.argv = realArgv;
      return scans;
    },
    (err) => {
      process.argv = realArgv;
      throw err;
    }
  );
}

test("same settings object: repeated calls reuse one profile and scan argv at most once", async () => {
  await getRuntimeProviderProfile("openai"); // warm the settings cache
  const scans = await countArgvScans(async () => {
    for (let i = 0; i < 50; i++) await getRuntimeProviderProfile("openai");
  });
  assert.ok(scans <= 1, `scanned process.argv ${scans} times in 50 calls`);
  const a = await getRuntimeProviderProfile("openai");
  const b = await getRuntimeProviderProfile("openai");
  assert.equal(a, b, "same settings object returns the same profile object");
});

test("an oauth and an apikey provider keep separate profiles", async () => {
  const oauth = await getRuntimeProviderProfile("claude");
  const apikey = await getRuntimeProviderProfile("openai");
  assert.notEqual(oauth, apikey);
  assert.equal(await getRuntimeProviderProfile("claude"), oauth);
});

test("a settings change rebuilds the profile with the new values", async () => {
  const before = await getRuntimeProviderProfile("openai");
  await settingsDb.updateSettings({
    resilienceSettings: { connectionCooldown: { apikey: { baseCooldownMs: 4321 } } },
  });
  const after = await getRuntimeProviderProfile("openai");
  assert.notEqual(after, before);
  assert.equal(after.baseCooldownMs, 4321);
});

test("flipping NODE_ENV to test rebuilds the profile with the test lockout floor", async () => {
  const realArgv = process.argv;
  const realExecArgv = process.execArgv;
  const realEnv = process.env.NODE_ENV;
  try {
    await settingsDb.updateSettings({ modelLockout: { baseCooldownMs: 0, maxCooldownMs: 1000 } });
    process.argv = realArgv.filter((arg) => !arg.includes("test"));
    process.execArgv = realExecArgv.filter((arg) => !arg.includes("test"));
    process.env.NODE_ENV = "production";
    const production = await getRuntimeProviderProfile("openai");
    assert.equal(production.maxCooldownMs, 5000, "outside tests the floor is 5000 ms");
    process.env.NODE_ENV = "test";
    const test = await getRuntimeProviderProfile("openai");
    assert.equal(test.maxCooldownMs, 1000, "under NODE_ENV=test the floor is 0");
  } finally {
    process.argv = realArgv;
    process.execArgv = realExecArgv;
    if (realEnv === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = realEnv;
  }
});
