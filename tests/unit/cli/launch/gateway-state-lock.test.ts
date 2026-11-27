// Unit tests for the lock branches of core/gateway/state.mjs (takeLock): unparsable content,
// hard-stale live holders, the StateLocked error shape and non-EEXIST create failures.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { chmodSync, readFileSync, writeFileSync } from "node:fs";

import { makeTempDir, removeDir } from "./_fixtures/gateway/harness.mjs";
import {
  ensureStateDir,
  statePaths,
  takeLock,
} from "../../../../bin/cli/launch/core/gateway/state.mjs";

const dirs: string[] = [];
function tmp(): string {
  const dir = makeTempDir("launch-lock-");
  dirs.push(dir);
  return dir;
}
after(() => {
  for (const dir of dirs) {
    try {
      chmodSync(dir, 0o700);
    } catch {}
    removeDir(dir);
  }
});

function lockPath(dir: string): string {
  return statePaths(dir).lock;
}

function writeRawLock(dir: string, raw: string) {
  ensureStateDir(dir);
  writeFileSync(lockPath(dir), raw);
}

function readHolder(dir: string): { pid?: number; token?: string } {
  return JSON.parse(readFileSync(lockPath(dir), "utf8"));
}

test("an unparsable lock that stays the same for one poll is stolen", async () => {
  const dir = tmp();
  writeRawLock(dir, "{not json");
  const release = await takeLock(dir, { timeoutMs: 2000 });
  assert.equal(readHolder(dir).pid, process.pid);
  release();
});

test("a parsed lock without an integer pid is stolen", async () => {
  const dir = tmp();
  writeRawLock(dir, JSON.stringify({ pid: "nope", token: "t" }));
  const release = await takeLock(dir, { timeoutMs: 2000 });
  assert.notEqual(readHolder(dir).token, "t");
  release();
});

test("an unparsable lock rewritten during the poll is judged again (live peer kept)", async () => {
  const dir = tmp();
  writeRawLock(dir, "{");
  // The synchronous part of takeLock reads "{" and starts its one-poll sleep before returning.
  const pending = takeLock(dir, { timeoutMs: 200 });
  writeRawLock(dir, JSON.stringify({ pid: process.pid, at: Date.now(), token: "peer" }));
  await assert.rejects(
    () => pending,
    (err: { code?: string; message?: string; hint?: string }) =>
      err.code === "StateLocked" &&
      err.message === `The launcher state is locked by process ${process.pid}` &&
      err.hint === `If no other launch is running, remove ${lockPath(dir)}`
  );
  assert.equal(readHolder(dir).token, "peer");
});

test("a live holder older than the hard stale age is broken", async () => {
  const dir = tmp();
  writeRawLock(
    dir,
    JSON.stringify({ pid: process.pid, at: Date.now() - 6 * 60_000, token: "old" })
  );
  const release = await takeLock(dir, { timeoutMs: 2000 });
  assert.notEqual(readHolder(dir).token, "old");
  release();
});

test("a live holder with no timestamp is never hard-stale", async () => {
  const dir = tmp();
  writeRawLock(dir, JSON.stringify({ pid: process.pid, token: "live" }));
  await assert.rejects(
    () => takeLock(dir, { timeoutMs: 100 }),
    (err: { code?: string }) => err.code === "StateLocked"
  );
  assert.equal(readHolder(dir).token, "live");
});

test("timeoutMs 0 fails after the first look at a live holder", async () => {
  const dir = tmp();
  writeRawLock(dir, JSON.stringify({ pid: process.pid, at: Date.now(), token: "x" }));
  const started = Date.now();
  await assert.rejects(
    () => takeLock(dir, { timeoutMs: 0 }),
    (err: { code?: string }) => err.code === "StateLocked"
  );
  assert.ok(Date.now() - started < 1000);
});

test(
  "a create failure other than EEXIST is rethrown",
  {
    skip:
      process.platform === "win32" ||
      (typeof process.getuid === "function" && process.getuid() === 0),
  },
  async () => {
    const dir = tmp();
    ensureStateDir(dir);
    chmodSync(dir, 0o500);
    await assert.rejects(
      () => takeLock(dir, { timeoutMs: 500 }),
      (err: { code?: string }) => err.code === "EACCES"
    );
  }
);
