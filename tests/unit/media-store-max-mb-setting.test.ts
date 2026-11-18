import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-cap-setting-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
  MEDIA_STORE_MAX_MB: process.env.MEDIA_STORE_MAX_MB,
};
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.MEDIA_STORE_MAX_MB;

const core = await import("../../src/lib/db/core.ts");
const databaseSettings = await import("../../src/lib/db/databaseSettings.ts");
const databaseSettingsRoute = await import("../../src/app/api/settings/database/route.ts");
const mediaStore = await import("../../src/lib/media/mediaStore.ts");
const { DEFAULT_DATABASE_SETTINGS } = await import("../../src/types/databaseSettings.ts");
const { MEDIA_DIR, MAX_MEDIA_BYTES, NO_OWNER_TAG, resolveMediaPath, writeMediaFile } = mediaStore;

const HOUR_MS = 60 * 60 * 1000;
const MIB = 1024 ** 2;

test.beforeEach(() => {
  delete process.env.MEDIA_STORE_MAX_MB;
  fs.rmSync(MEDIA_DIR as string, { recursive: true, force: true });
  fs.mkdirSync(MEDIA_DIR as string, { recursive: true });
  databaseSettings.updateDatabaseSettings({
    retention: { ...databaseSettings.getUserDatabaseSettings().retention, mediaStoreMaxMb: 2048 },
  });
});

test.after(() => {
  core.resetDbInstance();
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A sparse stored file of `size` bytes that is `ageHours` old: it costs no disk.
function plant(name: string, size: number, ageHours: number): string {
  const id = `${NO_OWNER_TAG}__${name.padEnd(32, "0")}.mp4`;
  const file = path.join(MEDIA_DIR as string, id);
  fs.closeSync(fs.openSync(file, "w"));
  fs.truncateSync(file, size);
  const when = new Date(Date.now() - ageHours * HOUR_MS);
  fs.utimesSync(file, when, when);
  return id;
}

function setCapSetting(mediaStoreMaxMb: number) {
  const { retention } = databaseSettings.getUserDatabaseSettings();
  databaseSettings.updateDatabaseSettings({ retention: { ...retention, mediaStoreMaxMb } });
}

// Two older files of 0.8 MiB each, then one small write. Against a 1 MiB cap the oldest must
// go and the next one must stay. Against a cap of 2 GiB or more nothing is evicted.
function writeAgainstTwoOlderFiles() {
  const oldest = plant("a", Math.round(0.8 * MIB), 30);
  const middle = plant("b", Math.round(0.8 * MIB), 20);
  const id = writeMediaFile(Buffer.from("fresh clip"), "mp4", NO_OWNER_TAG);
  assert.ok(id, "media should be stored");
  assert.ok(resolveMediaPath(id!), "the file just written must stay");
  return { oldest, middle };
}

test("the built-in default stays 2 GiB and matches the stored default", () => {
  assert.equal(MAX_MEDIA_BYTES, 2 * 1024 ** 3);
  assert.equal(DEFAULT_DATABASE_SETTINGS.retention.mediaStoreMaxMb * MIB, MAX_MEDIA_BYTES);
});

test("with no setting change and no env, a 1.6 MiB folder is not trimmed", () => {
  const { oldest, middle } = writeAgainstTwoOlderFiles();
  assert.ok(resolveMediaPath(oldest));
  assert.ok(resolveMediaPath(middle));
});

test("the Storage setting changes the cap", () => {
  setCapSetting(1);
  const { oldest, middle } = writeAgainstTwoOlderFiles();
  assert.equal(resolveMediaPath(oldest), null, "the oldest file must be evicted by the setting");
  assert.ok(resolveMediaPath(middle), "the next file fits under the cap and must stay");
});

test("the env MEDIA_STORE_MAX_MB changes the cap", () => {
  process.env.MEDIA_STORE_MAX_MB = "1";
  const { oldest, middle } = writeAgainstTwoOlderFiles();
  assert.equal(resolveMediaPath(oldest), null, "the oldest file must be evicted by the env cap");
  assert.ok(resolveMediaPath(middle));
});

test("the env wins over the setting, whichever of the two is smaller", () => {
  setCapSetting(4096);
  process.env.MEDIA_STORE_MAX_MB = "1";
  const small = writeAgainstTwoOlderFiles();
  assert.equal(resolveMediaPath(small.oldest), null, "env 1 MiB must override a 4096 MiB setting");
  assert.ok(resolveMediaPath(small.middle));

  fs.rmSync(MEDIA_DIR as string, { recursive: true, force: true });
  fs.mkdirSync(MEDIA_DIR as string, { recursive: true });
  setCapSetting(1);
  process.env.MEDIA_STORE_MAX_MB = "4096";
  const large = writeAgainstTwoOlderFiles();
  assert.ok(resolveMediaPath(large.oldest), "env 4096 MiB must override a 1 MiB setting");
  assert.ok(resolveMediaPath(large.middle));
});

test("an env value that is not a whole number above 0 is ignored and the setting applies", () => {
  setCapSetting(1);
  for (const bad of ["abc", "0", "1.5", "-3", " "]) {
    fs.rmSync(MEDIA_DIR as string, { recursive: true, force: true });
    fs.mkdirSync(MEDIA_DIR as string, { recursive: true });
    process.env.MEDIA_STORE_MAX_MB = bad;
    const { oldest, middle } = writeAgainstTwoOlderFiles();
    assert.equal(
      resolveMediaPath(oldest),
      null,
      `env ${JSON.stringify(bad)} must not disable the setting`
    );
    assert.ok(resolveMediaPath(middle));
  }
});

test("the settings route stores a valid cap and rejects 0", async () => {
  const patch = (retention: Record<string, unknown>) =>
    databaseSettingsRoute.PATCH(
      new Request("http://localhost/api/settings/database", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ retention }),
      }) as never
    );

  const ok = await patch({ mediaStoreMaxMb: 512 });
  assert.equal(ok.status, 200);
  assert.equal((await ok.json()).retention.mediaStoreMaxMb, 512);
  assert.equal(databaseSettings.getUserDatabaseSettings().retention.mediaStoreMaxMb, 512);

  assert.equal((await patch({ mediaStoreMaxMb: 0 })).status, 400);
  assert.equal((await patch({ mediaStoreMaxMb: 1.5 })).status, 400);
  assert.equal(databaseSettings.getUserDatabaseSettings().retention.mediaStoreMaxMb, 512);
});
