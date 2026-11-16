/**
 * A pre-migration snapshot is content-addressed: its id is `db_state-<sha256>_pre-migration.sqlite`.
 * The helper must reject a file whose bytes no longer match the hash in its id, even when the
 * changed file is a valid SQLite database. Ids that carry no hash make no claim and pass.
 */
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-backup-content-hash-"));
const { verifyContentAddressedSnapshot, resolveBackupFile } =
  await import("../../src/lib/db/backupPaths.ts");

test.after(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

const sha = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
const idFor = (hash: string) => `db_state-${hash}_pre-migration.sqlite`;

test("a flat snapshot whose bytes match the hash in its id passes", () => {
  const bytes = Buffer.from("snapshot-bytes-a");
  const id = idFor(sha(bytes));
  fs.writeFileSync(path.join(root, id), bytes);
  assert.doesNotThrow(() => verifyContentAddressedSnapshot(id, resolveBackupFile(root, id)));
});

test("a flat snapshot whose bytes changed after publication is rejected", () => {
  const original = Buffer.from("snapshot-bytes-b");
  const id = idFor(sha(original));
  fs.writeFileSync(path.join(root, id), Buffer.from("snapshot-bytes-b-modified"));
  assert.throws(
    () => verifyContentAddressedSnapshot(id, resolveBackupFile(root, id)),
    /does not match its content hash/
  );
});

test("a portable snapshot directory is checked through its inner file", () => {
  const original = Buffer.from("snapshot-bytes-c");
  const id = idFor(sha(original));
  const directory = path.join(root, `${id}.snapshot`);
  fs.mkdirSync(directory);
  fs.writeFileSync(path.join(directory, "snapshot.sqlite"), original);
  assert.doesNotThrow(() => verifyContentAddressedSnapshot(id, resolveBackupFile(root, id)));

  fs.writeFileSync(path.join(directory, "snapshot.sqlite"), Buffer.from("tampered"));
  assert.throws(
    () => verifyContentAddressedSnapshot(id, resolveBackupFile(root, id)),
    /does not match its content hash/
  );
});

test("ids without a content hash are not checked", () => {
  const file = path.join(root, "db_2026-01-01T00-00-00-000Z_manual.sqlite");
  fs.writeFileSync(file, "any bytes");
  assert.doesNotThrow(() => verifyContentAddressedSnapshot(path.basename(file), file));
});
