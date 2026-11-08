import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const mediaStore = await import("../../src/lib/media/mediaStore.ts");
const { MEDIA_DIR, NO_OWNER_TAG, resolveMediaPath, pruneExpiredMedia, writeMediaFile } = mediaStore;

const HOUR_MS = 60 * 60 * 1000;

test.beforeEach(() => {
  fs.rmSync(MEDIA_DIR as string, { recursive: true, force: true });
  fs.mkdirSync(MEDIA_DIR as string, { recursive: true });
});

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A stored file of `size` bytes that is `ageHours` old. Sparse, so a multi-GiB file costs no disk.
function plant(name: string, size: number, ageHours: number): string {
  const id = `${NO_OWNER_TAG}__${name.padEnd(32, "0")}.mp4`;
  const file = path.join(MEDIA_DIR as string, id);
  fs.closeSync(fs.openSync(file, "w"));
  fs.truncateSync(file, size);
  const when = new Date(Date.now() - ageHours * HOUR_MS);
  fs.utimesSync(file, when, when);
  return id;
}

test("pruneExpiredMedia evicts the oldest files first until the total fits the cap", () => {
  const oldest = plant("a", 10, 30);
  const middle = plant("b", 10, 20);
  const newest = plant("c", 10, 10);

  // 30 bytes against a 15 byte cap: the two oldest go, the newest stays.
  const removed = pruneExpiredMedia(Date.now(), 15);

  assert.equal(removed, 2);
  assert.equal(resolveMediaPath(oldest), null, "oldest file must be evicted");
  assert.equal(resolveMediaPath(middle), null, "next oldest must be evicted");
  assert.ok(resolveMediaPath(newest), "newest file must stay");
});

test("pruneExpiredMedia stops evicting as soon as the total fits", () => {
  const oldest = plant("a", 10, 30);
  const middle = plant("b", 10, 20);
  const newest = plant("c", 10, 10);

  pruneExpiredMedia(Date.now(), 20);

  assert.equal(resolveMediaPath(oldest), null);
  assert.ok(resolveMediaPath(middle), "a file that already fits must not be evicted");
  assert.ok(resolveMediaPath(newest));
});

test("pruneExpiredMedia never evicts the newest file, even when it alone exceeds the cap", () => {
  const older = plant("a", 10, 30);
  const newest = plant("b", 100, 10);

  pruneExpiredMedia(Date.now(), 5);

  assert.equal(resolveMediaPath(older), null);
  assert.ok(resolveMediaPath(newest), "the file just written must stay readable");
});

test("pruneExpiredMedia leaves everything alone when the total is under the cap", () => {
  const a = plant("a", 10, 30);
  const b = plant("b", 10, 10);

  assert.equal(pruneExpiredMedia(Date.now(), 1000), 0);
  assert.ok(resolveMediaPath(a));
  assert.ok(resolveMediaPath(b));
});

test("writeMediaFile bounds the media directory with the built-in cap, with nothing expired by age", () => {
  const GIB = 1024 ** 3;
  // Two 1.5 GiB files, both newer than the 7 day retention: 3 GiB in total.
  const oldest = plant("a", 1.5 * GIB, 30);
  const middle = plant("b", 1.5 * GIB, 20);

  const id = writeMediaFile(Buffer.from("fresh clip"), "mp4", NO_OWNER_TAG);

  assert.ok(id, "media should be stored");
  assert.ok(resolveMediaPath(id!), "the new file must stay");
  assert.equal(resolveMediaPath(oldest), null, "the oldest file must be evicted by the size cap");
  assert.ok(resolveMediaPath(middle), "the next file fits under the cap and must stay");
});
