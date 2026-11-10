import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-media-cap-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const mediaStore = await import("../../src/lib/media/mediaStore.ts");
const { MEDIA_DIR, NO_OWNER_TAG, resolveMediaPath, pruneExpiredMedia, writeMediaFile } = mediaStore;

const HOUR_MS = 60 * 60 * 1000;

test.beforeEach(() => {
  fs.rmSync(MEDIA_DIR as string, { recursive: true, force: true });
  fs.mkdirSync(MEDIA_DIR as string, { recursive: true });
});

test.after(() => {
  // Files can share one process (test:unit:fast): do not leave DATA_DIR on the deleted directory.
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
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

// Equal mtimes make "the newest file" ambiguous. The file writeMediaFile just returned must be
// protected by its id, whatever the sort order of files that share an mtime.
test("pruneExpiredMedia protects the file named by id when every mtime is equal", () => {
  const ids = ["a", "b", "c", "d", "e", "f"].map((name) => plant(name, 10, 10));

  for (const keep of ids) {
    // 60 bytes against a 25 byte cap: some files must go, but never `keep`.
    for (const id of ids) fs.closeSync(fs.openSync(path.join(MEDIA_DIR as string, id), "a"));
    pruneExpiredMedia(Date.now(), 25, keep);
    assert.ok(resolveMediaPath(keep), `${keep} was named as just written and must stay`);
    // Put the evicted files back for the next round.
    for (const id of ids) {
      const file = path.join(MEDIA_DIR as string, id);
      if (!fs.existsSync(file)) {
        fs.closeSync(fs.openSync(file, "w"));
        fs.truncateSync(file, 10);
        const when = new Date(Date.now() - 10 * HOUR_MS);
        fs.utimesSync(file, when, when);
      }
    }
  }
});

test("writeMediaFile never returns an id whose file its own size cap just evicted", () => {
  const GIB = 1024 ** 3;
  // Two files that are NEWER than the one about to be written, together over the cap: the new
  // file sorts first, so a "newest stays" rule would delete it and still hand back its id.
  for (const name of ["a", "b"]) {
    const id = plant(name, 1.5 * GIB, 0);
    const later = new Date(Date.now() + HOUR_MS);
    fs.utimesSync(path.join(MEDIA_DIR as string, id), later, later);
  }

  const id = writeMediaFile(Buffer.from("fresh clip"), "mp4", NO_OWNER_TAG);

  assert.ok(id, "media should be stored");
  assert.ok(resolveMediaPath(id!), "the id that writeMediaFile returned must resolve to a file");
});
