/**
 * An in-flight migration restore point must survive count/age pruning until the upgrade ends.
 * The owner publishes a lease file next to the snapshot; pruning skips a family whose lease
 * names a live process, and ignores a lease left by a dead one.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const retention = await import("../../src/lib/db/backupRetention.ts");

const DAY_MS = 24 * 60 * 60 * 1000;
const sha = (n: number) => n.toString(16).padStart(64, "0");
const snapshotName = (n: number) => `db_state-${sha(n)}_pre-migration.sqlite`;

function seed(dir: string, count: number) {
  const names: string[] = [];
  for (let i = 0; i < count; i++) {
    const name = snapshotName(i + 1);
    const file = path.join(dir, name);
    fs.writeFileSync(file, `snapshot-${i}`);
    // Index 0 is the oldest, and older than the retention window.
    const mtime = new Date(Date.now() - (count - i) * 10 * DAY_MS);
    fs.utimesSync(file, mtime, mtime);
    names.push(name);
  }
  return names;
}

function primaries(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((name) => name.startsWith("db_"))
    .sort();
}

function deadPid(): number {
  const child = spawnSync(process.execPath, ["-e", ""]);
  assert.ok(child.pid);
  return child.pid;
}

test("a lease held by this process protects an old snapshot from count and age pruning", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-"));
  try {
    const [oldest] = seed(dir, 3);
    const release = retention.acquireSnapshotLease(dir, path.join(dir, oldest));

    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });
    assert.ok(primaries(dir).includes(oldest), "the leased restore point was deleted");

    release();
    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });
    assert.equal(primaries(dir).includes(oldest), false, "a released lease must not pin the file");
    assert.deepEqual(
      fs.readdirSync(dir).filter((name) => name.startsWith(".migration-lease-")),
      [],
      "release removes the lease file"
    );
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a lease file from another live process protects the snapshot", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-"));
  try {
    const [oldest] = seed(dir, 3);
    // Another process holding the lease is visible only through its file.
    fs.writeFileSync(
      path.join(dir, ".migration-lease-other-1.json"),
      JSON.stringify({ pid: process.ppid || process.pid, base: oldest })
    );

    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });

    assert.ok(primaries(dir).includes(oldest), "a live foreign lease was ignored");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a lease left by a dead process does not pin the snapshot", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-"));
  try {
    const [oldest] = seed(dir, 3);
    fs.writeFileSync(
      path.join(dir, ".migration-lease-dead-1.json"),
      JSON.stringify({ pid: deadPid(), base: oldest })
    );

    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });

    assert.equal(primaries(dir).includes(oldest), false, "a dead process kept its lease alive");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("pruning without any lease still applies the count rule", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-"));
  try {
    const names = seed(dir, 4);
    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 2, retentionDays: 0 });
    assert.deepEqual(primaries(dir), names.slice(2).sort());
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("a live lease older than a day does not pin the snapshot (reused pid)", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lease-"));
  try {
    const [oldest] = seed(dir, 3);
    const lease = path.join(dir, ".migration-lease-stale-1.json");
    fs.writeFileSync(lease, JSON.stringify({ pid: process.pid, base: oldest }));
    const old = new Date(Date.now() - 2 * DAY_MS);
    fs.utimesSync(lease, old, old);

    retention.pruneBackupDirectory({ backupDir: dir, maxFiles: 1, retentionDays: 1 });

    assert.equal(primaries(dir).includes(oldest), false, "a day-old lease pinned the snapshot");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
