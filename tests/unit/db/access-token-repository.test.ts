/**
 * Contract of the CLI access token repository (Promise-based, SQLite implementation)
 * and of the facade wiring: the facade hands out the composition-root repository, the
 * repository stores exactly what it is given, and the synchronous legacy access is the
 * same SQLite store.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "access-token-repository-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const { accessTokenRepositories } =
  await import("../../../src/lib/db/repositories/accessTokenRepositories.ts");
const facade = await import("../../../src/lib/db/accessTokens.ts");

const { tokens } = accessTokenRepositories;

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
    tokenHash: `hash-${id}`,
    tokenPrefix: `oma_live_${id}`,
    name: id,
    scope: "read",
    createdAt: "2026-01-01T00:00:00.000Z",
    expiresAt: null,
    ...overrides,
  };
}

test("the facade hands out the composition-root repository", () => {
  assert.equal(facade.getAccessTokenRepository(), tokens);
});

test("insert stores the given values verbatim and findById/findByHash read them back", async () => {
  await promised(
    tokens.insert(insert("tok_a", { scope: "not-normalized", expiresAt: "2030-01-01T00:00:00Z" }))
  );
  const expected = {
    id: "tok_a",
    token_hash: "hash-tok_a",
    token_prefix: "oma_live_tok_a",
    name: "tok_a",
    scope: "not-normalized",
    created_at: "2026-01-01T00:00:00.000Z",
    last_used_at: null,
    expires_at: "2030-01-01T00:00:00Z",
    revoked_at: null,
  };
  assert.deepEqual({ ...(await promised(tokens.findById("tok_a"))) }, expected);
  assert.deepEqual({ ...(await promised(tokens.findByHash("hash-tok_a"))) }, expected);
  assert.equal(await tokens.findById("tok_missing"), null);
  assert.equal(await tokens.findByHash("hash-missing"), null);
});

test("insert rejects a duplicate hash and leaves the first row alone", async () => {
  await tokens.insert(insert("tok_a"));
  await assert.rejects(tokens.insert(insert("tok_b", { tokenHash: "hash-tok_a" })), /UNIQUE/);
  assert.equal((await tokens.list()).length, 1);
});

test("list orders by created_at descending", async () => {
  await tokens.insert(insert("tok_old", { createdAt: "2026-01-01T00:00:00.000Z" }));
  await tokens.insert(insert("tok_new", { createdAt: "2026-03-01T00:00:00.000Z" }));
  await tokens.insert(insert("tok_mid", { createdAt: "2026-02-01T00:00:00.000Z" }));
  assert.deepEqual(
    (await promised(tokens.list())).map((row) => row.id),
    ["tok_new", "tok_mid", "tok_old"]
  );
});

test("touchLastUsed writes the given stamp", async () => {
  await tokens.insert(insert("tok_a"));
  await promised(tokens.touchLastUsed("tok_a", "2026-05-05T00:00:00.000Z"));
  assert.equal((await tokens.findById("tok_a"))?.last_used_at, "2026-05-05T00:00:00.000Z");
});

test("findRevokeCandidates matches by id or display prefix, revoked rows included", async () => {
  await tokens.insert(insert("tok_a", { tokenPrefix: "oma_live_shared" }));
  await tokens.insert(insert("tok_b", { tokenPrefix: "oma_live_shared" }));
  await tokens.insert(insert("tok_c"));
  await tokens.markRevoked("tok_b", "2026-01-02T00:00:00.000Z");

  const byPrefix = await promised(tokens.findRevokeCandidates("oma_live_shared"));
  assert.deepEqual(
    byPrefix.map((row) => ({ ...row })).sort((x, y) => x.id.localeCompare(y.id)),
    [
      { id: "tok_a", revoked_at: null },
      { id: "tok_b", revoked_at: "2026-01-02T00:00:00.000Z" },
    ]
  );
  assert.deepEqual(
    (await tokens.findRevokeCandidates("tok_c")).map((row) => ({ ...row })),
    [{ id: "tok_c", revoked_at: null }]
  );
  assert.deepEqual(await tokens.findRevokeCandidates("nothing"), []);
});

test("markRevoked only writes a live token and reports whether it did", async () => {
  await tokens.insert(insert("tok_a"));
  assert.equal(await promised(tokens.markRevoked("tok_a", "2026-01-02T00:00:00.000Z")), true);
  assert.equal(await tokens.markRevoked("tok_a", "2026-09-09T00:00:00.000Z"), false);
  assert.equal((await tokens.findById("tok_a"))?.revoked_at, "2026-01-02T00:00:00.000Z");
  assert.equal(await tokens.markRevoked("tok_missing", "2026-01-02T00:00:00.000Z"), false);
});

test("legacy sync access and the Promise repository share one store", async () => {
  const legacy = accessTokenRepositories.legacySync.tokens;
  legacy.insert(insert("tok_sync"));
  assert.equal((await tokens.findById("tok_sync"))?.name, "tok_sync");
  await tokens.insert(insert("tok_async"));
  const row = legacy.findByHash("hash-tok_async");
  assert.ok(!(row instanceof Promise));
  assert.equal(row?.id, "tok_async");
});

test("facade writes go through the repository store", async () => {
  const { record, secret } = facade.createAccessToken({ name: "via-facade", scope: "write" });
  const row = await tokens.findByHash(facade.hashAccessToken(secret));
  assert.equal(row?.id, record.id);
  assert.equal(row?.scope, "write");
  facade.revokeAccessToken(record.id);
  assert.notEqual((await tokens.findById(record.id))?.revoked_at, null);
});
