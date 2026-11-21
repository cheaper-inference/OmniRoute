// PUT /api/db-backups must report `created: true` only after the backup file is whole.
// Before, the route used the fire-and-forget `backupDbFile()`: it answered `created: true` while the
// copy still ran, and a copy that failed later still gave a success answer.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-backup-put-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";

const core = await import("../../src/lib/db/core.ts");
const route = await import("../../src/app/api/db-backups/route.ts");

const BACKUP_DIR = path.join(TEST_DATA_DIR, "db_backups");

function seed() {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const insert = db.prepare(
    "INSERT INTO provider_connections (id, provider, auth_type, name, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
  );
  for (let i = 0; i < 20; i++) insert.run(`c-${i}`, "openai", "apikey", `c-${i}`, 1, now, now);
}

seed();

const put = () =>
  route.PUT(
    new Request("http://localhost/api/db-backups", { method: "PUT" }) as unknown as NextRequest
  );

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("PUT /api/db-backups answers 500, not created:true, when the copy fails", async () => {
  const db = core.getDbInstance();
  const original = db.backup;
  db.backup = async () => {
    throw new Error("disk full");
  };
  try {
    const response = await put();
    const body = await response.json();
    assert.equal(response.status, 500);
    assert.notEqual(body.created, true);
  } finally {
    db.backup = original;
  }
});

test("PUT /api/db-backups: the file named in a created:true answer already exists", async () => {
  const response = await put();
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.created, true);
  assert.ok(
    fs.existsSync(path.join(BACKUP_DIR, body.filename)),
    "the backup file must be whole on disk when the answer arrives"
  );
});
