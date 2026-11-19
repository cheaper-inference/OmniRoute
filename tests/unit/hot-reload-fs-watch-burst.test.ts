/**
 * The SQLite file watcher must not reload runtime settings once per database event. Request-log
 * writes touch storage.sqlite-wal many times per second. A burst of events may cause only a few
 * settings reads, and a real settings change must still be applied in under one second.
 * `fs.watch` is faked so the test does not depend on free inotify slots.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-hot-reload-burst-"));
// test:unit:fast shares process.env across files (--test-isolation=none): restore both after.
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_DISABLE_BACKGROUND = process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = "1"; // poll off: only the file watcher runs

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { applyRuntimeSettings, resetRuntimeSettingsStateForTests } =
  await import("../../src/lib/config/runtimeSettings.ts");
const { startRuntimeConfigHotReload, stopRuntimeConfigHotReloadForTests } =
  await import("../../src/lib/config/hotReload.ts");
const { getCliCompatProviders } = await import("../../open-sse/config/cliFingerprints.ts");

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const realWatch = fs.watch;
let emit: (filename: string) => void = () => {};

test.after(() => {
  fs.watch = realWatch;
  stopRuntimeConfigHotReloadForTests();
  resetRuntimeSettingsStateForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  if (ORIGINAL_DISABLE_BACKGROUND === undefined)
    delete process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES;
  else process.env.OMNIROUTE_DISABLE_BACKGROUND_SERVICES = ORIGINAL_DISABLE_BACKGROUND;
});

test("a burst of watcher events causes only a few settings reads", async () => {
  const db = core.getDbInstance();
  await applyRuntimeSettings(await settingsDb.getSettings(), { force: true, source: "test" });
  fs.watch = ((_dir: string, listener: (event: string, filename: string) => void) => {
    emit = (filename) => listener("change", filename);
    return { close() {} } as unknown as fs.FSWatcher;
  }) as unknown as typeof fs.watch;
  startRuntimeConfigHotReload();
  await sleep(600); // let the start check settle

  let settingsReads = 0;
  const realPrepare = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    if (sql.startsWith("SELECT key, value FROM key_value WHERE namespace = 'settings'")) {
      settingsReads += 1;
    }
    return realPrepare(sql);
  }) as typeof db.prepare;

  try {
    for (let i = 0; i < 40; i++) {
      emit("storage.sqlite-wal");
      await sleep(5);
    }
    // Wait for the debounced reload itself (bounded) rather than trusting a fixed delay on a
    // slow runner, then give any trailing reload time to land so the upper bound counts it.
    const deadline = Date.now() + 5_000;
    while (settingsReads === 0 && Date.now() < deadline) await sleep(25);
    await sleep(800);
  } finally {
    db.prepare = realPrepare as typeof db.prepare;
  }

  assert.ok(settingsReads >= 1, "a burst must still trigger a reload");
  assert.ok(
    settingsReads <= 4,
    `expected at most 4 settings reads for 40 events, got ${settingsReads}`
  );
});

test("a settings change is applied in under one second after a watcher event", async () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'cliCompatProviders', ?)"
    )
    .run(JSON.stringify(["github"]));
  emit("storage.sqlite");

  const deadline = Date.now() + 1000;
  while (Date.now() < deadline && !getCliCompatProviders().includes("github")) await sleep(25);
  assert.ok(getCliCompatProviders().includes("github"));
});
