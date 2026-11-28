/**
 * Contract of the uploaded file repository (Promise-based, SQLite implementation) and
 * of the facade wiring: the facade hands out the composition-root repository, the
 * repository stores exactly what it is given, the facade keeps id/expiry/cursor/owner
 * rules to itself, and the synchronous legacy access is the same SQLite store.
 */
import test, { mock } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "file-repository-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { fileRepositories } = await import("../../../src/lib/db/repositories/fileRepositories.ts");
const facade = await import("../../../src/lib/db/files.ts");

const { files: repo } = fileRepositories;
const legacy = fileRepositories.legacySync.files;

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

function insert(id: string, overrides: Record<string, unknown> = {}) {
  return {
    id,
    bytes: 3,
    createdAt: 100,
    filename: `${id}.jsonl`,
    purpose: "batch",
    content: Buffer.from(id) as Buffer | null,
    mimeType: "application/jsonl" as string | null,
    apiKeyId: null as string | null,
    expiresAt: null as number | null,
    deletedAt: null as number | null,
    ...overrides,
  };
}

const ids = (list: Array<{ id: string }>) => list.map((f) => f.id);

test("the facade hands out the composition-root repository", () => {
  assert.equal(facade.getFileRepository(), repo);
});

test("insert stores the given values verbatim; findById reads metadata, findContentById the bytes", async () => {
  // Values the facade would never produce on its own: the repository must not
  // generate ids, default the expiry or drop a pre-set deleted_at.
  await promised(
    repo.insert(insert("custom-id", { purpose: "batch", expiresAt: null, apiKeyId: "key-A" }))
  );
  assert.deepEqual(
    { ...(await promised(repo.findById("custom-id"))) },
    {
      id: "custom-id",
      bytes: 3,
      createdAt: 100,
      filename: "custom-id.jsonl",
      purpose: "batch",
      mimeType: "application/jsonl",
      apiKeyId: "key-A",
      expiresAt: null,
      deletedAt: null,
    }
  );
  const content = await promised(repo.findContentById("custom-id"));
  assert.equal(content?.toString(), "custom-id");

  await repo.insert(insert("born-deleted", { deletedAt: 5 }));
  assert.equal(await repo.findById("born-deleted"), null);
  assert.equal(await repo.findContentById("born-deleted"), null);
  assert.equal(await repo.findById("missing"), null);
});

test("insert rejects a duplicate id and leaves the first row alone", async () => {
  await repo.insert(insert("dup", { filename: "first" }));
  await assert.rejects(repo.insert(insert("dup", { filename: "second" })), /UNIQUE|PRIMARY/);
  assert.equal((await repo.findById("dup"))?.filename, "first");
});

test("list takes a resolved cursor as-is and filters, orders and limits", async () => {
  await repo.insert(insert("a", { createdAt: 10, apiKeyId: "key-A" }));
  await repo.insert(insert("b", { createdAt: 20, apiKeyId: "key-A" }));
  await repo.insert(insert("c", { createdAt: 20, apiKeyId: "key-B", purpose: "fine-tune" }));
  await repo.insert(insert("d", { createdAt: 30, apiKeyId: "key-A", deletedAt: 1 }));

  assert.deepEqual(ids(await promised(repo.list({ limit: 10, order: "desc" }))), ["c", "b", "a"]);
  assert.deepEqual(ids(await repo.list({ limit: 10, order: "asc" })), ["a", "b", "c"]);
  assert.deepEqual(ids(await repo.list({ limit: 1, order: "asc" })), ["a"]);
  assert.deepEqual(ids(await repo.list({ limit: 10, order: "desc", apiKeyId: "key-A" })), [
    "b",
    "a",
  ]);
  assert.deepEqual(ids(await repo.list({ limit: 10, order: "desc", purpose: "fine-tune" })), ["c"]);
  // The repository does not look the cursor up or judge its owner: a position that
  // matches no row, and one from another owner's row, both bound the page.
  assert.deepEqual(
    ids(await repo.list({ limit: 10, order: "desc", after: { createdAt: 20, id: "c" } })),
    ["b", "a"]
  );
  assert.deepEqual(
    ids(
      await repo.list({
        limit: 10,
        order: "desc",
        apiKeyId: "key-A",
        after: { createdAt: 20, id: "c" },
      })
    ),
    ["b", "a"]
  );
  assert.deepEqual(
    ids(await repo.list({ limit: 10, order: "asc", after: { createdAt: 15, id: "zzz" } })),
    ["b", "c"]
  );
});

test("count applies owner/purpose filters and skips deleted rows", async () => {
  await repo.insert(insert("1", { apiKeyId: "key-A" }));
  await repo.insert(insert("2", { apiKeyId: "key-A", purpose: "fine-tune" }));
  await repo.insert(insert("3", { apiKeyId: "key-A", deletedAt: 1 }));
  assert.equal(await promised(repo.count({})), 2);
  assert.equal(await repo.count({ apiKeyId: "key-A", purpose: "batch" }), 1);
  assert.equal(await repo.count({ apiKeyId: "" }), 2);
});

test("softDelete and softDeleteOwnedBy use the caller's timestamp and clear content", async () => {
  await repo.insert(insert("x", { apiKeyId: "key-A" }));
  await repo.insert(insert("y", { apiKeyId: "key-B" }));

  assert.equal(await promised(repo.softDeleteOwnedBy("y", "key-A", 11)), false);
  assert.equal(await promised(repo.softDeleteOwnedBy("x", "key-A", 11)), true);
  assert.equal(await promised(repo.softDelete("y", 12)), true);
  assert.equal(await repo.softDelete("missing", 12), false);

  const raw = core
    .getDbInstance()
    .prepare("SELECT id, deleted_at, content FROM files ORDER BY id")
    .all();
  assert.deepEqual(raw, [
    { id: "x", deleted_at: 11, content: null },
    { id: "y", deleted_at: 12, content: null },
  ]);
});

test("softDeleteOwnedBy does not guard a blank owner itself; the facade does", async () => {
  await repo.insert(insert("unowned-blank", { apiKeyId: "" }));
  assert.equal(await repo.softDeleteOwnedBy("unowned-blank", "", 1), true);
  assert.throws(() => facade.deleteFileOwnedBy("x", ""), /apiKeyId is required/);
});

test("softDeleteExpired uses the given now for both the bound and the stamp", async () => {
  await repo.insert(insert("old", { expiresAt: 49 }));
  await repo.insert(insert("edge", { expiresAt: 50 }));
  assert.equal(await promised(repo.softDeleteExpired(50)), 1);
  assert.equal(await repo.findById("old"), null);
  assert.ok(await repo.findById("edge"));
});

test("legacy sync access is the same SQLite store", async () => {
  legacy.insert(insert("sync"));
  assert.equal((await repo.findById("sync"))?.id, "sync");
  await repo.insert(insert("async"));
  assert.equal(legacy.findById("async")?.id, "async");
  assert.equal(legacy.count({}), 2);
  assert.ok(!(legacy.list({ limit: 5, order: "asc" }) instanceof Promise));
});

test("facade passes its own cursor resolution to the repository", () => {
  legacy.insert(insert("a1", { createdAt: 10, apiKeyId: "key-A" }));
  legacy.insert(insert("a2", { createdAt: 20, apiKeyId: "key-A" }));
  legacy.insert(insert("b1", { createdAt: 15, apiKeyId: "key-B" }));
  // The repository alone would honor b1's position; the facade drops it for key-A.
  assert.deepEqual(
    ids(
      legacy.list({
        limit: 10,
        order: "desc",
        apiKeyId: "key-A",
        after: { createdAt: 15, id: "b1" },
      })
    ),
    ["a1"]
  );
  assert.deepEqual(ids(facade.listFiles({ apiKeyId: "key-A", after: "b1" })), ["a2", "a1"]);
});

test("every facade export delegates to the legacy sync repository", () => {
  const calls: string[] = [];
  const names = [
    "insert",
    "findById",
    "findContentById",
    "list",
    "count",
    "softDelete",
    "softDeleteOwnedBy",
    "softDeleteExpired",
  ] as const;
  const spies = names.map((name) => {
    const original = legacy[name] as (...args: unknown[]) => unknown;
    return mock.method(legacy, name, (...args: unknown[]) => {
      calls.push(name);
      return original(...args);
    });
  });
  try {
    const created = facade.createFile({ bytes: 1, filename: "spy", purpose: "batch" });
    facade.getFile(created.id);
    facade.getFileContent(created.id);
    facade.listFiles();
    facade.countFiles();
    facade.deleteFileOwnedBy(created.id, "key-A");
    facade.deleteFile(created.id);
    facade.pruneExpiredFiles(0);
  } finally {
    for (const spy of spies) spy.mock.restore();
  }
  assert.deepEqual(calls, [
    "insert",
    "findById",
    "findContentById",
    "list",
    "count",
    "softDeleteOwnedBy",
    "softDelete",
    "softDeleteExpired",
  ]);
});
