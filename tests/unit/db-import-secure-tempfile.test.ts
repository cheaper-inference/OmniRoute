// POST /api/db-backups/import stages the upload in a temp file before validating it.
// It used to write `${os.tmpdir()}/omniroute-import-${Date.now()}.sqlite` with a plain
// writeFileSync: a guessable name, the default 0644 mode, and an existing file or symlink
// at that path was reused or followed. The upload is a full database (provider
// credentials included), so another local user could read it, and with
// fs.protected_symlinks / fs.protected_regular off, redirect or capture the write.
// These tests drive the real route handler with TMPDIR set to a sticky, world-writable
// directory standing in for /tmp (the last two use a non-sticky one), and pin that:
//   - a symlink planted at the old predictable path is not followed;
//   - a file planted there is neither reused nor deleted;
//   - the staged copy is 0600 inside a fresh 0700 directory under TMPDIR;
//   - a directory planted under a timestamp-derived or constant name, or under the name
//     the previous request used, is not reused, and the staging directory has a fresh
//     mkdtemp name;
//   - nothing is left behind in TMPDIR after a valid or an invalid upload, or after a
//     write error that ends in a 500;
//   - in a world-writable TMPDIR without the sticky bit, where the fresh directory can be
//     renamed away and replaced, a symlink planted inside is not followed and a regular
//     file planted inside is not reused ("wx").
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createManagementSessionHeaders } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-db-import-tmpfile-"));
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  JWT_SECRET: process.env.JWT_SECRET,
  INITIAL_PASSWORD: process.env.INITIAL_PASSWORD,
};

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "db-import-tmpfile-api-key-secret";
process.env.JWT_SECRET = "db-import-tmpfile-jwt-secret";
process.env.INITIAL_PASSWORD = "db-import-tmpfile-password";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const importRoute = await import("../../src/app/api/db-backups/import/route.ts");

const IMPORT_URL = "http://localhost:20128/api/db-backups/import";

await updateSettings({ requireLogin: true });
await apiKeysDb.createApiKey("tmpfile-candidate", "machine-import");
const CANDIDATE_PATH = path.join(TEST_DATA_DIR, "candidate.sqlite");
core.getDbInstance().exec(`VACUUM INTO '${CANDIDATE_PATH.replace(/'/g, "''")}'`);
const CANDIDATE_BYTES = fs.readFileSync(CANDIDATE_PATH);

// Stand-in for /tmp: sticky and world-writable.
const FAKE_TMP = path.join(TEST_DATA_DIR, "shared-tmp");
fs.mkdirSync(FAKE_TMP);
fs.chmodSync(FAKE_TMP, 0o1777);

test.after(() => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

function clearFakeTmp() {
  for (const entry of fs.readdirSync(FAKE_TMP)) {
    fs.rmSync(path.join(FAKE_TMP, entry), { recursive: true, force: true });
  }
}

/**
 * POST a dry-run upload with TMPDIR pointed at FAKE_TMP, umask 022 and Date.now()
 * frozen at `now`, so the old predictable name is known in advance.
 */
async function postUpload(body: Buffer, now: number) {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  const request = new Request(`${IMPORT_URL}?dryRun=true`, {
    method: "POST",
    headers,
    body: new Uint8Array(body),
  });
  const savedTmp = process.env.TMPDIR;
  const savedNow = Date.now;
  const savedUmask = process.umask(0o022);
  process.env.TMPDIR = FAKE_TMP;
  Date.now = () => now;
  try {
    const response = await importRoute.POST(request);
    return { status: response.status, body: await response.json() };
  } finally {
    Date.now = savedNow;
    process.umask(savedUmask);
    if (savedTmp === undefined) delete process.env.TMPDIR;
    else process.env.TMPDIR = savedTmp;
  }
}

function oldPredictablePath(now: number) {
  return path.join(FAKE_TMP, `omniroute-import-${now}.sqlite`);
}

test("a symlink planted at the old predictable path is not followed", async () => {
  clearFakeTmp();
  const now = Date.now();
  const victim = path.join(TEST_DATA_DIR, "victim.txt");
  fs.writeFileSync(victim, "ORIGINAL");
  fs.symlinkSync(victim, oldPredictablePath(now));

  const res = await postUpload(CANDIDATE_BYTES, now);

  assert.equal(res.status, 200, JSON.stringify(res.body));
  assert.equal(res.body.valid, true);
  // Compared as a boolean so a failure does not dump the database bytes.
  assert.ok(
    fs.readFileSync(victim, "utf8") === "ORIGINAL",
    "upload was written through the symlink"
  );
});

test("a file planted at the old predictable path is neither reused nor deleted", async () => {
  clearFakeTmp();
  const now = Date.now();
  const planted = oldPredictablePath(now);
  fs.writeFileSync(planted, "attacker-owned");
  fs.chmodSync(planted, 0o666);

  const res = await postUpload(CANDIDATE_BYTES, now);

  assert.equal(res.status, 200, JSON.stringify(res.body));
  assert.ok(fs.existsSync(planted), "the route deleted a file it did not create");
  assert.equal(fs.readFileSync(planted, "utf8"), "attacker-owned", "the route reused the file");
});

type StagedWrite = { file: string; mode: number; dir: string; dirMode: number };

/** Run an upload while recording every fs.writeFileSync under FAKE_TMP right after it. */
async function postUploadRecordingWrites(body: Buffer, now: number) {
  const seen: StagedWrite[] = [];
  const realWrite = fs.writeFileSync;
  fs.writeFileSync = ((file: fs.PathOrFileDescriptor, ...rest: unknown[]) => {
    (realWrite as (...a: unknown[]) => void)(file, ...rest);
    if (typeof file === "string" && file.startsWith(FAKE_TMP + path.sep)) {
      const dir = path.dirname(file);
      seen.push({
        file,
        mode: fs.lstatSync(file).mode & 0o777,
        dir,
        dirMode: fs.lstatSync(dir).mode & 0o777,
      });
    }
  }) as typeof fs.writeFileSync;
  try {
    return { res: await postUpload(body, now), seen };
  } finally {
    fs.writeFileSync = realWrite;
  }
}

test("the staged copy is 0600 inside a fresh 0700 directory under TMPDIR", async () => {
  clearFakeTmp();
  const { res, seen } = await postUploadRecordingWrites(CANDIDATE_BYTES, Date.now());

  assert.equal(res.status, 200, JSON.stringify(res.body));
  assert.equal(seen.length, 1, `expected one staged write under TMPDIR, saw ${seen.length}`);
  const [staged] = seen;
  assert.equal(staged.mode.toString(8), "600", "staged file mode");
  assert.notEqual(staged.dir, FAKE_TMP, "the upload was staged directly in the shared tmpdir");
  assert.equal(path.dirname(staged.dir), FAKE_TMP, "staging dir should be directly under TMPDIR");
  assert.equal(staged.dirMode.toString(8), "700", "staging directory mode");
});

test("nothing is left in TMPDIR after a valid or an invalid upload", async () => {
  clearFakeTmp();
  const ok = await postUpload(CANDIDATE_BYTES, Date.now());
  assert.equal(ok.status, 200, JSON.stringify(ok.body));
  assert.deepEqual(fs.readdirSync(FAKE_TMP), [], "left behind after a valid upload");

  const bad = await postUpload(Buffer.alloc(8192, 0x41), Date.now());
  assert.equal(bad.status, 400);
  assert.deepEqual(fs.readdirSync(FAKE_TMP), [], "left behind after an invalid upload");
});

test("directories planted under predictable names are not reused", async () => {
  clearFakeTmp();
  const now = Date.now();
  // What a fixed `omniroute-import-<Date.now()>` or constant `omniroute-import` staging
  // directory would be called. mkdirSync({ recursive: true }) would accept either.
  const planted = [
    path.join(FAKE_TMP, `omniroute-import-${now}`),
    path.join(FAKE_TMP, "omniroute-import"),
  ];
  const plant = (dir: string) => {
    fs.mkdirSync(dir);
    fs.chmodSync(dir, 0o777);
  };
  planted.forEach(plant);

  /** One upload; returns the staging directory, checked against what TMPDIR held before. */
  const stageOnce = async () => {
    const before = new Set(fs.readdirSync(FAKE_TMP));
    const { res, seen } = await postUploadRecordingWrites(CANDIDATE_BYTES, now);
    assert.equal(res.status, 200, JSON.stringify(res.body));
    assert.equal(seen.length, 1, `expected one staged write under TMPDIR, saw ${seen.length}`);
    const [staged] = seen;
    assert.equal(path.dirname(staged.dir), FAKE_TMP, "staging dir should be directly under TMPDIR");
    for (const dir of planted) {
      assert.notEqual(staged.dir, dir, "the route staged the upload in a planted directory");
      assert.deepEqual(fs.readdirSync(dir), [], `the planted ${path.basename(dir)} was written to`);
    }
    const name = path.basename(staged.dir);
    assert.match(name, /^omniroute-import-[A-Za-z0-9]{6}$/, "staging dir is not a mkdtemp name");
    assert.ok(!before.has(name), "the staging dir existed before the request");
    return staged.dir;
  };

  // A constant name that happens to match the mkdtemp shape passes the checks above, so
  // stage twice: the second request must not land where the first one did, even when
  // another user has planted a directory under that name in the meantime.
  const first = await stageOnce();
  planted.push(first);
  plant(first);
  const second = await stageOnce();
  assert.notEqual(second, first, "the staging directory name repeats across requests");
});

test("TMPDIR is empty after a staging write fails with a 500", async () => {
  clearFakeTmp();
  const realWrite = fs.writeFileSync;
  let failedWrites = 0;
  // Write part of the upload, then fail the way a full disk would.
  fs.writeFileSync = ((file: fs.PathOrFileDescriptor, data: unknown, ...rest: unknown[]) => {
    if (typeof file === "string" && file.startsWith(FAKE_TMP + path.sep)) {
      failedWrites += 1;
      (realWrite as (...a: unknown[]) => void)(file, (data as Buffer).subarray(0, 4096), ...rest);
      throw Object.assign(new Error("ENOSPC: no space left on device, write"), {
        code: "ENOSPC",
      });
    }
    (realWrite as (...a: unknown[]) => void)(file, data, ...rest);
  }) as typeof fs.writeFileSync;
  let res;
  try {
    res = await postUpload(CANDIDATE_BYTES, Date.now());
  } finally {
    fs.writeFileSync = realWrite;
  }

  assert.equal(failedWrites, 1, "the staging write was not intercepted");
  assert.equal(res.status, 500, JSON.stringify(res.body));
  assert.deepEqual(fs.readdirSync(FAKE_TMP), [], "left behind after a failed write");
});

test("a swapped staging directory with a planted symlink is not followed", async () => {
  // Without the sticky bit, anyone who can write to TMPDIR can rename the fresh mkdtemp
  // directory away and put their own directory, holding import.sqlite -> a file they own,
  // under the same name before the route writes. Simulated with one uid.
  const nonSticky = path.join(TEST_DATA_DIR, "nonsticky-tmp");
  fs.rmSync(nonSticky, { recursive: true, force: true });
  fs.mkdirSync(nonSticky);
  fs.chmodSync(nonSticky, 0o777);
  const capture = path.join(TEST_DATA_DIR, "capture.sqlite");
  fs.writeFileSync(capture, "EMPTY");
  fs.chmodSync(capture, 0o666);

  const realWrite = fs.writeFileSync;
  let swapped = false;
  fs.writeFileSync = ((file: fs.PathOrFileDescriptor, ...rest: unknown[]) => {
    const dir = typeof file === "string" ? path.dirname(file) : "";
    if (!swapped && path.dirname(dir) === nonSticky) {
      swapped = true;
      fs.renameSync(dir, `${dir}.moved`);
      fs.mkdirSync(dir, { mode: 0o777 });
      fs.symlinkSync(capture, path.join(dir, path.basename(file as string)));
    }
    return (realWrite as (...a: unknown[]) => void)(file, ...rest);
  }) as typeof fs.writeFileSync;
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  const savedTmp = process.env.TMPDIR;
  process.env.TMPDIR = nonSticky;
  let status;
  try {
    const response = await importRoute.POST(
      new Request(`${IMPORT_URL}?dryRun=true`, {
        method: "POST",
        headers,
        body: new Uint8Array(CANDIDATE_BYTES),
      })
    );
    status = response.status;
  } finally {
    fs.writeFileSync = realWrite;
    if (savedTmp === undefined) delete process.env.TMPDIR;
    else process.env.TMPDIR = savedTmp;
  }

  assert.ok(swapped, "the staging write did not happen in a fresh directory under TMPDIR");
  assert.ok(
    fs.readFileSync(capture, "utf8") === "EMPTY",
    "upload was written through the planted symlink"
  );
  assert.equal(status, 500, "the route should fail on the planted symlink");
});

test("a swapped staging directory with a planted regular file is not reused", async () => {
  // Same race as above, but import.sqlite is a regular file the other user owns and can
  // read (here kept reachable through a hard link). O_NOFOLLOW alone would refuse the
  // symlink and still write into this file; "wx" refuses both.
  const nonSticky = path.join(TEST_DATA_DIR, "nonsticky-tmp-file");
  fs.rmSync(nonSticky, { recursive: true, force: true });
  fs.mkdirSync(nonSticky);
  fs.chmodSync(nonSticky, 0o777);
  const capture = path.join(TEST_DATA_DIR, "capture-file.sqlite");
  fs.rmSync(capture, { force: true });

  const realWrite = fs.writeFileSync;
  let swapped = false;
  fs.writeFileSync = ((file: fs.PathOrFileDescriptor, ...rest: unknown[]) => {
    const dir = typeof file === "string" ? path.dirname(file) : "";
    if (!swapped && path.dirname(dir) === nonSticky) {
      swapped = true;
      fs.renameSync(dir, `${dir}.moved`);
      fs.mkdirSync(dir, { mode: 0o777 });
      const planted = path.join(dir, path.basename(file as string));
      realWrite(planted, "EMPTY", { mode: 0o666 });
      fs.chmodSync(planted, 0o666);
      fs.linkSync(planted, capture);
    }
    return (realWrite as (...a: unknown[]) => void)(file, ...rest);
  }) as typeof fs.writeFileSync;
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  const savedTmp = process.env.TMPDIR;
  process.env.TMPDIR = nonSticky;
  let status;
  try {
    const response = await importRoute.POST(
      new Request(`${IMPORT_URL}?dryRun=true`, {
        method: "POST",
        headers,
        body: new Uint8Array(CANDIDATE_BYTES),
      })
    );
    status = response.status;
  } finally {
    fs.writeFileSync = realWrite;
    if (savedTmp === undefined) delete process.env.TMPDIR;
    else process.env.TMPDIR = savedTmp;
  }

  assert.ok(swapped, "the staging write did not happen in a fresh directory under TMPDIR");
  assert.ok(
    fs.readFileSync(capture, "utf8") === "EMPTY",
    "upload was written into the planted file"
  );
  assert.equal(status, 500, "the route should fail on the planted file");
});
