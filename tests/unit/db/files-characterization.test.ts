/**
 * Characterization of the uploaded file store through its public facade. These pin
 * the observable behavior that the repository extraction must keep: synchronous
 * results, persisted columns, the batch default expiry, metadata-only reads, list
 * filters/order/keyset pagination (including the foreign-owner cursor rule), counts,
 * every soft-delete flavor and the blank-owner guard.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "files-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const files = await import("../../../src/lib/db/files.ts");
const { DEFAULT_BATCH_EXPIRATION_SECONDS } = await import("../../../src/shared/constants/batch.ts");

type Row = Record<string, unknown>;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rawRow(id: string): Row {
  return core.getDbInstance().prepare("SELECT * FROM files WHERE id = ?").get(id) as Row;
}

function rawInsert(row: {
  id: string;
  createdAt: number;
  apiKeyId?: string | null;
  purpose?: string;
  expiresAt?: number | null;
  deletedAt?: number | null;
  content?: Buffer | string | null;
}) {
  core
    .getDbInstance()
    .prepare(
      `INSERT INTO files (id, bytes, created_at, filename, purpose, content, mime_type, api_key_id, expires_at, deleted_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.id,
      3,
      row.createdAt,
      `${row.id}.jsonl`,
      row.purpose ?? "batch",
      row.content === undefined ? Buffer.from("abc") : row.content,
      "application/jsonl",
      row.apiKeyId ?? null,
      row.expiresAt ?? null,
      row.deletedAt ?? null
    );
}

const ids = (list: Array<{ id: string }>) => list.map((f) => f.id);

test("every export answers synchronously", () => {
  const created = files.createFile({ bytes: 1, filename: "a", purpose: "batch" });
  assert.ok(!(created instanceof Promise));
  for (const value of [
    files.getFile(created.id),
    files.getFileContent(created.id),
    files.listFiles(),
    files.countFiles(),
    files.deleteFileOwnedBy(created.id, "nobody"),
    files.deleteFile(created.id),
    files.pruneExpiredFiles(0),
  ]) {
    assert.ok(!(value instanceof Promise));
  }
});

test("createFile persists the generated columns and returns the same record", () => {
  const before = Math.floor(Date.now() / 1000);
  const record = files.createFile({
    bytes: 5,
    filename: "input.jsonl",
    purpose: "batch",
    content: Buffer.from("hello"),
    mimeType: "application/jsonl",
    apiKeyId: "key-A",
  });
  const after = Math.floor(Date.now() / 1000);

  assert.match(record.id, /^file-[0-9a-f]{24}$/);
  assert.ok(record.createdAt >= before && record.createdAt <= after);
  assert.equal(record.expiresAt, record.createdAt + DEFAULT_BATCH_EXPIRATION_SECONDS);
  assert.deepEqual(record.content, Buffer.from("hello"));
  assert.equal(record.deletedAt, null);

  const row = rawRow(record.id);
  assert.equal(row.bytes, 5);
  assert.equal(row.created_at, record.createdAt);
  assert.equal(row.filename, "input.jsonl");
  assert.equal(row.purpose, "batch");
  assert.deepEqual(Buffer.from(row.content as Buffer), Buffer.from("hello"));
  assert.equal(row.mime_type, "application/jsonl");
  assert.equal(row.api_key_id, "key-A");
  assert.equal(row.expires_at, record.expiresAt);
  assert.equal(row.deleted_at, null);
});

test("createFile expiry: explicit value kept, explicit null kept, non-batch has none", () => {
  const explicit = files.createFile({ bytes: 1, filename: "e", purpose: "batch", expiresAt: 42 });
  assert.equal(explicit.expiresAt, 42);
  assert.equal(rawRow(explicit.id).expires_at, 42);

  const nulled = files.createFile({ bytes: 1, filename: "n", purpose: "batch", expiresAt: null });
  assert.equal(nulled.expiresAt, null);
  assert.equal(rawRow(nulled.id).expires_at, null);

  const other = files.createFile({ bytes: 1, filename: "o", purpose: "fine-tune" });
  assert.equal(other.expiresAt, null);
  assert.equal(other.content, null);
  assert.equal(other.mimeType, null);
  assert.equal(other.apiKeyId, null);
  const row = rawRow(other.id);
  assert.equal(row.expires_at, null);
  assert.equal(row.content, null);
  assert.equal(row.mime_type, null);
  assert.equal(row.api_key_id, null);
});

test("getFile returns camelCase metadata without content and hides deleted rows", () => {
  rawInsert({ id: "f1", createdAt: 100, apiKeyId: "key-A", expiresAt: 200 });
  rawInsert({ id: "f-del", createdAt: 100, deletedAt: 150 });

  assert.deepEqual(
    { ...files.getFile("f1") },
    {
      id: "f1",
      bytes: 3,
      createdAt: 100,
      filename: "f1.jsonl",
      purpose: "batch",
      mimeType: "application/jsonl",
      apiKeyId: "key-A",
      expiresAt: 200,
      deletedAt: null,
    }
  );
  assert.equal(files.getFile("f-del"), null);
  assert.equal(files.getFile("missing"), null);
});

test("getFileContent returns a Buffer for live content and null otherwise", () => {
  rawInsert({ id: "blob", createdAt: 1, content: Buffer.from("bytes") });
  rawInsert({ id: "text", createdAt: 1, content: "as-text" });
  rawInsert({ id: "empty", createdAt: 1, content: null });
  rawInsert({ id: "gone", createdAt: 1, deletedAt: 2 });

  const blob = files.getFileContent("blob");
  assert.ok(Buffer.isBuffer(blob));
  assert.equal(blob?.toString(), "bytes");
  const text = files.getFileContent("text");
  assert.ok(Buffer.isBuffer(text));
  assert.equal(text?.toString(), "as-text");
  assert.equal(files.getFileContent("empty"), null);
  assert.equal(files.getFileContent("gone"), null);
  assert.equal(files.getFileContent("missing"), null);
});

test("listFiles filters by owner and purpose, skips deleted rows, default newest first, limit 20", () => {
  for (let i = 0; i < 22; i++) {
    rawInsert({ id: `k${String(i).padStart(2, "0")}`, createdAt: 1000 + i, apiKeyId: "key-A" });
  }
  rawInsert({ id: "b1", createdAt: 5000, apiKeyId: "key-B" });
  rawInsert({ id: "b2", createdAt: 5001, apiKeyId: "key-B", purpose: "fine-tune" });
  rawInsert({ id: "b3", createdAt: 5002, apiKeyId: "key-B", deletedAt: 1 });

  const all = files.listFiles();
  assert.equal(all.length, 20);
  assert.deepEqual(ids(all).slice(0, 3), ["b2", "b1", "k21"]);
  assert.equal("content" in all[0], false, "list reads metadata only");

  assert.deepEqual(ids(files.listFiles({ apiKeyId: "key-B" })), ["b2", "b1"]);
  assert.deepEqual(ids(files.listFiles({ apiKeyId: "key-B", purpose: "batch" })), ["b1"]);
  assert.deepEqual(ids(files.listFiles({ purpose: "fine-tune" })), ["b2"]);
  assert.equal(files.listFiles({ apiKeyId: "" }).length, 20, "empty owner is no filter");
  assert.equal(files.listFiles({ limit: 1000 }).length, 24);
});

test("listFiles orders by created_at then id and pages with the after cursor in both directions", () => {
  rawInsert({ id: "a", createdAt: 10 });
  rawInsert({ id: "c", createdAt: 20 });
  rawInsert({ id: "b", createdAt: 20 });
  rawInsert({ id: "d", createdAt: 30 });

  assert.deepEqual(ids(files.listFiles({ order: "desc" })), ["d", "c", "b", "a"]);
  assert.deepEqual(ids(files.listFiles({ order: "asc" })), ["a", "b", "c", "d"]);

  assert.deepEqual(ids(files.listFiles({ after: "c", order: "desc" })), ["b", "a"]);
  assert.deepEqual(ids(files.listFiles({ after: "b", order: "asc" })), ["c", "d"]);
  assert.deepEqual(ids(files.listFiles({ after: "c", order: "desc", limit: 1 })), ["b"]);
  assert.deepEqual(
    ids(files.listFiles({ after: "unknown", order: "asc" })),
    ["a", "b", "c", "d"],
    "an unknown cursor is ignored"
  );
});

test("listFiles ignores a deleted cursor and a cursor owned by another key", () => {
  rawInsert({ id: "a1", createdAt: 10, apiKeyId: "key-A" });
  rawInsert({ id: "a2", createdAt: 20, apiKeyId: "key-A" });
  rawInsert({ id: "a3", createdAt: 30, apiKeyId: "key-A" });
  rawInsert({ id: "foreign", createdAt: 25, apiKeyId: "key-B" });
  rawInsert({ id: "public", createdAt: 15, apiKeyId: null });
  rawInsert({ id: "dead", createdAt: 25, apiKeyId: "key-A", deletedAt: 1 });

  assert.deepEqual(
    ids(files.listFiles({ apiKeyId: "key-A", after: "foreign" })),
    ["a3", "a2", "a1"],
    "a foreign cursor is treated like an unknown one"
  );
  assert.deepEqual(
    ids(files.listFiles({ apiKeyId: "key-A", after: "public" })),
    ["a3", "a2", "a1"],
    "an unowned cursor does not belong to the key either"
  );
  assert.deepEqual(ids(files.listFiles({ apiKeyId: "key-A", after: "dead" })), ["a3", "a2", "a1"]);
  assert.deepEqual(ids(files.listFiles({ apiKeyId: "key-A", after: "a2" })), ["a1"]);
  assert.deepEqual(
    ids(files.listFiles({ after: "foreign" })),
    ["a2", "public", "a1"],
    "without an owner filter any live cursor is trusted"
  );
});

test("countFiles applies the same owner/purpose/deleted rules", () => {
  rawInsert({ id: "1", createdAt: 1, apiKeyId: "key-A" });
  rawInsert({ id: "2", createdAt: 1, apiKeyId: "key-A", purpose: "fine-tune" });
  rawInsert({ id: "3", createdAt: 1, apiKeyId: "key-B" });
  rawInsert({ id: "4", createdAt: 1, apiKeyId: "key-A", deletedAt: 1 });

  assert.equal(files.countFiles(), 3);
  assert.equal(files.countFiles({ apiKeyId: "key-A" }), 2);
  assert.equal(files.countFiles({ apiKeyId: "key-A", purpose: "batch" }), 1);
  assert.equal(files.countFiles({ purpose: "fine-tune" }), 1);
  assert.equal(files.countFiles({ apiKeyId: "" }), 3);
  assert.equal(files.countFiles({ apiKeyId: "nobody" }), 0);
});

test("deleteFile soft-deletes, clears content, stamps now, and also matches deleted rows", () => {
  rawInsert({ id: "live", createdAt: 1 });
  rawInsert({ id: "dead", createdAt: 1, deletedAt: 7 });

  const before = Math.floor(Date.now() / 1000);
  assert.equal(files.deleteFile("live"), true);
  const row = rawRow("live");
  assert.ok((row.deleted_at as number) >= before);
  assert.equal(row.content, null);
  assert.ok(row.filename, "metadata row is kept");

  assert.equal(files.deleteFile("dead"), true, "the id-only update matches an already deleted row");
  assert.ok((rawRow("dead").deleted_at as number) >= before, "and re-stamps it");
  assert.equal(files.deleteFile("missing"), false);
});

test("deleteFileOwnedBy only touches the owner's row and rejects a blank owner", () => {
  rawInsert({ id: "mine", createdAt: 1, apiKeyId: "key-A" });
  rawInsert({ id: "theirs", createdAt: 1, apiKeyId: "key-B" });
  rawInsert({ id: "public", createdAt: 1, apiKeyId: null });

  assert.equal(files.deleteFileOwnedBy("theirs", "key-A"), false);
  assert.equal(files.deleteFileOwnedBy("public", "key-A"), false);
  assert.equal(rawRow("theirs").deleted_at, null);
  assert.equal(rawRow("public").deleted_at, null);

  assert.equal(files.deleteFileOwnedBy("mine", "key-A"), true);
  assert.notEqual(rawRow("mine").deleted_at, null);
  assert.equal(rawRow("mine").content, null);

  for (const blank of ["", "   ", undefined as unknown as string, 5 as unknown as string]) {
    assert.throws(() => files.deleteFileOwnedBy("theirs", blank), /apiKeyId is required/);
  }
  assert.equal(rawRow("theirs").deleted_at, null);
});

test("pruneExpiredFiles clears only live rows whose expiry is strictly before now", () => {
  rawInsert({ id: "old", createdAt: 1, expiresAt: 99 });
  rawInsert({ id: "edge", createdAt: 1, expiresAt: 100 });
  rawInsert({ id: "future", createdAt: 1, expiresAt: 101 });
  rawInsert({ id: "forever", createdAt: 1, expiresAt: null });
  rawInsert({ id: "gone", createdAt: 1, expiresAt: 50, deletedAt: 60 });

  assert.equal(files.pruneExpiredFiles(100), 1);
  assert.equal(rawRow("old").deleted_at, 100);
  assert.equal(rawRow("old").content, null);
  for (const id of ["edge", "future", "forever"]) {
    assert.equal(rawRow(id).deleted_at, null, id);
    assert.ok(rawRow(id).content, id);
  }
  assert.equal(rawRow("gone").deleted_at, 60, "already deleted rows keep their stamp");
  assert.equal(files.pruneExpiredFiles(100), 0);
});

test("formatFileResponse keeps the API shape and sanitizes non-finite timestamps", () => {
  assert.deepEqual(
    files.formatFileResponse({
      id: "f",
      bytes: 2,
      createdAt: 10,
      filename: "x",
      purpose: "batch",
      expiresAt: 20,
    }),
    {
      id: "f",
      bytes: 2,
      created_at: 10,
      filename: "x",
      object: "file",
      purpose: "batch",
      expires_at: 20,
    }
  );
  const odd = files.formatFileResponse({
    id: "f",
    bytes: 2,
    createdAt: Number.NaN,
    filename: "x",
    purpose: "batch",
    expiresAt: Number.POSITIVE_INFINITY,
  });
  assert.equal(odd.created_at, 0);
  assert.equal(odd.expires_at, null);
});
