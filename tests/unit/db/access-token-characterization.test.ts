/**
 * Characterization of the CLI access token store through its public facade. These
 * pin the observable behavior that the repository extraction must keep: synchronous
 * results, persisted columns, the last-used write window and its swallowed failure,
 * expiry parsing, list order, and every revoke outcome including a lost race.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "access-token-characterization-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";

const core = await import("../../../src/lib/db/core.ts");
const at = await import("../../../src/lib/db/accessTokens.ts");

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
  return core
    .getDbInstance()
    .prepare("SELECT * FROM cli_access_tokens WHERE id = ?")
    .get(id) as Row;
}

function rawUpdate(sql: string, ...params: unknown[]) {
  core
    .getDbInstance()
    .prepare(sql)
    .run(...params);
}

/** Wraps db.prepare so a statement matching `pattern` runs `hook` instead of `run`. */
function interceptRun(
  pattern: RegExp,
  hook: (originalRun: (...args: unknown[]) => unknown, args: unknown[]) => unknown
) {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    const statement = originalPrepare(sql);
    if (pattern.test(sql)) {
      const originalRun = statement.run.bind(statement);
      statement.run = ((...args: unknown[]) => hook(originalRun, args)) as typeof statement.run;
    }
    return statement;
  }) as typeof db.prepare;
  return () => {
    db.prepare = originalPrepare;
  };
}

test("every export answers synchronously", () => {
  const created = at.createAccessToken({ name: "sync", scope: "write" });
  assert.ok(!(created instanceof Promise));
  for (const value of [
    at.verifyAccessToken(created.secret),
    at.listAccessTokens(),
    at.getAccessToken(created.record.id),
    at.revokeAccessToken(created.record.id),
  ]) {
    assert.ok(!(value instanceof Promise));
  }
});

test("create persists exactly the generated columns and returns the same record", () => {
  const expiresAt = new Date(Date.now() + 3_600_000).toISOString();
  const { record, secret } = at.createAccessToken({
    name: "  padded  ",
    scope: "admin",
    expiresAt,
  });
  assert.equal(record.name, "padded");
  assert.match(record.id, /^tok_[0-9a-f-]{36}$/);
  assert.equal(record.tokenPrefix, secret.slice(0, "oma_live_".length + 6));
  assert.match(secret, /^oma_live_[A-Za-z0-9_-]{43}$/);

  const row = rawRow(record.id);
  assert.deepEqual(row, {
    id: record.id,
    token_hash: at.hashAccessToken(secret),
    token_prefix: record.tokenPrefix,
    name: "padded",
    scope: "admin",
    created_at: record.createdAt,
    last_used_at: null,
    expires_at: expiresAt,
    revoked_at: null,
  });
  assert.deepEqual(at.getAccessToken(record.id), record);
});

test("create stores null expiry and the read scope when none is given", () => {
  const { record } = at.createAccessToken({ name: "defaults" });
  assert.equal(record.scope, "read");
  assert.equal(record.expiresAt, null);
  assert.equal(rawRow(record.id).expires_at, null);
});

test("an empty name throws before anything is written", () => {
  assert.throws(() => at.createAccessToken({ name: "" }), /name is required/);
  assert.deepEqual(at.listAccessTokens(), []);
});

test("a duplicate hash insert surfaces the database error", () => {
  const first = at.createAccessToken({ name: "first" });
  const restore = interceptRun(/INSERT INTO cli_access_tokens/, (run, args) => {
    const next = [...args];
    next[1] = at.hashAccessToken(first.secret);
    return run(...next);
  });
  try {
    assert.throws(() => at.createAccessToken({ name: "clash" }), /UNIQUE/);
  } finally {
    restore();
  }
  assert.equal(at.listAccessTokens().length, 1);
});

test("hashing is plain SHA-256 hex of the secret", () => {
  assert.equal(
    at.hashAccessToken("abc"),
    "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
  );
});

test("verify reads the stored scope through normalization", () => {
  const { record, secret } = at.createAccessToken({ name: "legacy-scope", scope: "admin" });
  rawUpdate("UPDATE cli_access_tokens SET scope = ? WHERE id = ?", "bogus", record.id);
  assert.deepEqual(at.verifyAccessToken(secret), {
    id: record.id,
    name: "legacy-scope",
    scope: "read",
  });
  assert.equal(at.getAccessToken(record.id)?.scope, "read");
});

test("verify treats an unparseable expiry as not expired and a future one as live", () => {
  const bad = at.createAccessToken({ name: "bad-expiry", expiresAt: "not-a-date" });
  assert.ok(at.verifyAccessToken(bad.secret));
  const future = at.createAccessToken({
    name: "future",
    expiresAt: new Date(Date.now() + 60_000).toISOString(),
  });
  assert.ok(at.verifyAccessToken(future.secret));
});

test("verify rejects revoked and expired tokens without stamping them", () => {
  const revoked = at.createAccessToken({ name: "revoked" });
  rawUpdate(
    "UPDATE cli_access_tokens SET revoked_at = ? WHERE id = ?",
    new Date().toISOString(),
    revoked.record.id
  );
  assert.equal(at.verifyAccessToken(revoked.secret), null);
  assert.equal(rawRow(revoked.record.id).last_used_at, null);

  const expired = at.createAccessToken({
    name: "expired",
    expiresAt: new Date(Date.now() - 1).toISOString(),
  });
  assert.equal(at.verifyAccessToken(expired.secret), null);
  assert.equal(rawRow(expired.record.id).last_used_at, null);
});

test("verify ignores non-string input", () => {
  assert.equal(at.verifyAccessToken(undefined), null);
  assert.equal(at.verifyAccessToken(42 as unknown as string), null);
});

test("a failed last-used stamp still verifies the token", () => {
  const { record, secret } = at.createAccessToken({ name: "stamp-fails", scope: "write" });
  let attempts = 0;
  const restore = interceptRun(/UPDATE\s+cli_access_tokens\s+SET\s+last_used_at/i, () => {
    attempts += 1;
    throw new Error("database is locked");
  });
  try {
    assert.deepEqual(at.verifyAccessToken(secret), {
      id: record.id,
      name: "stamp-fails",
      scope: "write",
    });
  } finally {
    restore();
  }
  assert.equal(attempts, 1);
  assert.equal(rawRow(record.id).last_used_at, null);
});

test("a failed lookup during verify propagates to the caller", () => {
  const db = core.getDbInstance();
  const originalPrepare = db.prepare.bind(db);
  db.prepare = ((sql: string) => {
    if (/WHERE token_hash = \?/.test(sql)) throw new Error("disk I/O error");
    return originalPrepare(sql);
  }) as typeof db.prepare;
  try {
    assert.throws(() => at.verifyAccessToken("oma_live_anything"), /disk I\/O error/);
  } finally {
    db.prepare = originalPrepare;
  }
});

test("an unparseable stored stamp is refreshed", () => {
  const { record, secret } = at.createAccessToken({ name: "garbled-stamp" });
  rawUpdate("UPDATE cli_access_tokens SET last_used_at = ? WHERE id = ?", "garbage", record.id);
  assert.ok(at.verifyAccessToken(secret));
  assert.notEqual(rawRow(record.id).last_used_at, "garbage");
});

test("list returns newest first and get returns null for an unknown id", () => {
  const a = at.createAccessToken({ name: "a" });
  const b = at.createAccessToken({ name: "b" });
  const c = at.createAccessToken({ name: "c" });
  rawUpdate(
    "UPDATE cli_access_tokens SET created_at = ? WHERE id = ?",
    "2026-01-02T00:00:00.000Z",
    a.record.id
  );
  rawUpdate(
    "UPDATE cli_access_tokens SET created_at = ? WHERE id = ?",
    "2026-01-03T00:00:00.000Z",
    b.record.id
  );
  rawUpdate(
    "UPDATE cli_access_tokens SET created_at = ? WHERE id = ?",
    "2026-01-01T00:00:00.000Z",
    c.record.id
  );
  assert.deepEqual(
    at.listAccessTokens().map((r) => r.name),
    ["b", "a", "c"]
  );
  assert.equal(at.getAccessToken("tok_missing"), null);
});

test("revoke with an empty argument touches nothing", () => {
  const { record } = at.createAccessToken({ name: "untouched" });
  assert.deepEqual(at.revokeAccessToken(""), {
    revoked: false,
    alreadyRevoked: false,
    ambiguous: false,
  });
  assert.equal(rawRow(record.id).revoked_at, null);
});

test("revoke by an exact id wins over a live prefix collision", () => {
  const target = at.createAccessToken({ name: "target" });
  const other = at.createAccessToken({ name: "other" });
  rawUpdate(
    "UPDATE cli_access_tokens SET token_prefix = ? WHERE id = ?",
    target.record.id,
    other.record.id
  );
  assert.deepEqual(at.revokeAccessToken(target.record.id), {
    revoked: true,
    alreadyRevoked: false,
    ambiguous: false,
  });
  assert.equal(rawRow(other.record.id).revoked_at, null);
});

test("a prefix shared only by revoked tokens matches nothing", () => {
  const a = at.createAccessToken({ name: "dead-a" });
  const b = at.createAccessToken({ name: "dead-b" });
  const now = new Date().toISOString();
  rawUpdate(
    "UPDATE cli_access_tokens SET token_prefix = ?, revoked_at = ? WHERE id IN (?, ?)",
    "oma_live_shared",
    now,
    a.record.id,
    b.record.id
  );
  assert.deepEqual(at.revokeAccessToken("oma_live_shared"), {
    revoked: false,
    alreadyRevoked: false,
    ambiguous: false,
  });
});

test("revoke writes the revoke time only once", () => {
  const { record } = at.createAccessToken({ name: "once" });
  at.revokeAccessToken(record.id);
  const first = rawRow(record.id).revoked_at;
  assert.equal(typeof first, "string");
  at.revokeAccessToken(record.id);
  assert.equal(rawRow(record.id).revoked_at, first);
});

test("losing the revoke race to another caller still reports alreadyRevoked", () => {
  const { record } = at.createAccessToken({ name: "race" });
  const winner = "2026-01-01T00:00:00.000Z";
  const restore = interceptRun(/revoked_at IS NULL/, (run, args) => {
    rawUpdate("UPDATE cli_access_tokens SET revoked_at = ? WHERE id = ?", winner, record.id);
    return run(...args);
  });
  let result;
  try {
    result = at.revokeAccessToken(record.id);
  } finally {
    restore();
  }
  assert.deepEqual(result, { revoked: true, alreadyRevoked: true, ambiguous: false });
  assert.equal(rawRow(record.id).revoked_at, winner);
});
