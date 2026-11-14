import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/** Permissive view of a JSON body for assertions (no explicit any in tests/). */
type Loose = { [key: string]: Loose };

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-launch-sessions-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "launch-sessions-test-secret";

const core = await import("../../../src/lib/db/core.ts");
const ls = await import("../../../src/lib/db/launchSessions.ts");
const apiKeys = await import("../../../src/lib/db/apiKeys.ts");

const ENV_KEYS = [
  "REQUIRE_API_KEY",
  "OMNIROUTE_API_KEY",
  "ROUTER_API_KEY",
  "INITIAL_PASSWORD",
] as const;
const savedEnv: Record<string, string | undefined> = {};
for (const k of ENV_KEYS) savedEnv[k] = process.env[k];

function restoreEnv() {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
}

function resetStorage() {
  restoreEnv();
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);
test.after(() => {
  restoreEnv();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function rawRow(id: string) {
  return core.getDbInstance().prepare("SELECT * FROM launch_sessions WHERE id = ?").get(id) as
    Record<string, unknown> | undefined;
}

const DAY = 24 * 60 * 60 * 1000;

test("token format and parse", () => {
  const { session, token } = ls.createLaunchSession({ parentKeyId: null, toolId: "codex" });
  assert.match(token, /^olx_[a-z2-7]{26}_[a-z2-7]{52}$/);
  const parsed = ls.parseLaunchSessionToken(token);
  assert.equal(parsed?.sessionId, session.id);
  assert.equal(token, `olx_${parsed?.sessionId}_${parsed?.secret}`);
});

test("parse rejects malformed tokens", () => {
  const id = "a".repeat(26);
  const secret = "b".repeat(52);
  assert.ok(ls.parseLaunchSessionToken(`olx_${id}_${secret}`));
  assert.equal(ls.parseLaunchSessionToken(`sk_${id}_${secret}`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${id.slice(1)}_${secret}`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${id}_${secret.slice(1)}`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${id}_${secret}x`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${"A".repeat(26)}_${secret}`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${"1".repeat(26)}_${secret}`), null);
  assert.equal(ls.parseLaunchSessionToken(`olx_${id}${secret}`), null);
  assert.equal(ls.parseLaunchSessionToken(""), null);
  assert.equal(ls.parseLaunchSessionToken(null), null);
  assert.equal(ls.parseLaunchSessionToken(42), null);
});

test("secret is stored hashed only", () => {
  const { session, token } = ls.createLaunchSession({
    parentKeyId: null,
    toolId: "codex",
    view: { hash: "h", ids: ["a/b"] },
  });
  const parsed = ls.parseLaunchSessionToken(token)!;
  const row = rawRow(session.id)!;
  assert.equal(typeof row.secret_hash, "string");
  assert.notEqual(row.secret_hash, token);
  assert.notEqual(row.secret_hash, parsed.secret);
  const dump = JSON.stringify(row);
  assert.ok(!dump.includes(token));
  assert.ok(!dump.includes(parsed.secret));
});

test("resolve works with correct token, fails with wrong secret for same id", () => {
  const { session, token } = ls.createLaunchSession({ parentKeyId: null, toolId: "codex" });
  assert.equal(ls.resolveLaunchSessionToken(token)?.id, session.id);
  const other = ls.createLaunchSession({ parentKeyId: null, toolId: "codex" });
  const otherSecret = ls.parseLaunchSessionToken(other.token)!.secret;
  assert.equal(ls.resolveLaunchSessionToken(`olx_${session.id}_${otherSecret}`), null);
  assert.equal(ls.resolveLaunchSessionToken("olx_garbage"), null);
  assert.equal(ls.resolveLaunchSessionToken(undefined), null);
});

test("ttl default and clamp", () => {
  assert.equal(ls.clampLaunchSessionTtl(undefined), 900);
  assert.equal(ls.clampLaunchSessionTtl("120"), 900);
  assert.equal(ls.clampLaunchSessionTtl(NaN), 900);
  assert.equal(ls.clampLaunchSessionTtl(10), 60);
  assert.equal(ls.clampLaunchSessionTtl(99999), 3600);
  assert.equal(ls.clampLaunchSessionTtl(120), 120);
  const now = Date.now();
  const def = ls.createLaunchSession({ parentKeyId: null, toolId: "t", now });
  assert.equal(def.session.ttlSeconds, 900);
  assert.equal(Date.parse(def.session.expiresAt), now + 900_000);
  assert.equal(
    ls.createLaunchSession({ parentKeyId: null, toolId: "t", ttlSeconds: 5 }).session.ttlSeconds,
    60
  );
  assert.equal(
    ls.createLaunchSession({ parentKeyId: null, toolId: "t", ttlSeconds: 1e6 }).session.ttlSeconds,
    3600
  );
});

test("expired token rejects", () => {
  const now = Date.now();
  const { session, token } = ls.createLaunchSession({ parentKeyId: null, toolId: "t", now });
  assert.ok(ls.resolveLaunchSessionToken(token, now + 899_000));
  assert.equal(ls.resolveLaunchSessionToken(token, Date.parse(session.expiresAt)), null);
  assert.equal(ls.resolveLaunchSessionToken(token, now + 901_000), null);
});

test("heartbeat extends by ttl, fails on revoked or expired", () => {
  const now = Date.now();
  const { session } = ls.createLaunchSession({
    parentKeyId: null,
    toolId: "t",
    ttlSeconds: 120,
    now,
  });
  const later = now + 60_000;
  const beat = ls.heartbeatLaunchSession(session.id, later)!;
  assert.equal(Date.parse(beat.expiresAt), later + 120_000);
  assert.equal(Date.parse(beat.lastSeenAt), later);

  assert.equal(ls.heartbeatLaunchSession(session.id, later + 121_000), null);

  const second = ls.createLaunchSession({ parentKeyId: null, toolId: "t", now });
  ls.revokeLaunchSession(second.session.id, now);
  assert.equal(ls.heartbeatLaunchSession(second.session.id, now + 1), null);
  assert.equal(ls.heartbeatLaunchSession("nope", now), null);
});

test("revoke wipes secret, sets revoked_at, keeps row, token stops resolving", () => {
  const now = Date.now();
  const { session, token } = ls.createLaunchSession({ parentKeyId: null, toolId: "t", now });
  assert.equal(ls.revokeLaunchSession(session.id, now + 5), true);
  const row = rawRow(session.id)!;
  assert.equal(row.secret_hash, null);
  assert.equal(row.revoked_at, new Date(now + 5).toISOString());
  assert.equal(ls.resolveLaunchSessionToken(token, now + 10), null);
  assert.ok(ls.getLaunchSession(session.id));
  // idempotent, keeps first revoked_at
  assert.equal(ls.revokeLaunchSession(session.id, now + 99), true);
  assert.equal(rawRow(session.id)!.revoked_at, new Date(now + 5).toISOString());
  assert.equal(ls.revokeLaunchSession("a".repeat(26), now), false);
  assert.equal(ls.revokeLaunchSession("bad", now), false);
});

test("purge wipes hash of expired rows and deletes rows past 30 days", () => {
  const now = Date.now();
  const old = ls.createLaunchSession({
    parentKeyId: null,
    toolId: "t",
    now: now - 31 * DAY,
  });
  const expired = ls.createLaunchSession({
    parentKeyId: null,
    toolId: "t",
    now: now - 2 * DAY,
  });
  const live = ls.createLaunchSession({ parentKeyId: null, toolId: "t", now });
  const deleted = ls.purgeLaunchSessions(now);
  assert.equal(deleted, 1);
  assert.equal(ls.getLaunchSession(old.session.id), null);
  const expiredRow = rawRow(expired.session.id)!;
  assert.ok(expiredRow);
  assert.equal(expiredRow.secret_hash, null);
  assert.equal(typeof rawRow(live.session.id)!.secret_hash, "string");
  assert.ok(ls.resolveLaunchSessionToken(live.token, now));
});

test("session tag default and custom", () => {
  const a = ls.createLaunchSession({ parentKeyId: null, toolId: "codex" });
  assert.equal(a.session.sessionTag, `launch:codex:${a.session.id}`);
  assert.equal(ls.defaultLaunchSessionTag("codex", a.session.id), a.session.sessionTag);
  const b = ls.createLaunchSession({ parentKeyId: null, toolId: "codex", sessionTag: "mine" });
  assert.equal(b.session.sessionTag, "mine");
});

test("setLaunchSessionView round-trips", () => {
  const { session } = ls.createLaunchSession({ parentKeyId: null, toolId: "t" });
  assert.equal(session.view, null);
  const view = { hash: "abc", ids: ["x/y", "z"], serve: { prefix: "p", mode: "mirror" as const } };
  const updated = ls.setLaunchSessionView(session.id, view)!;
  assert.deepEqual(updated.view, view);
  assert.deepEqual(ls.getLaunchSession(session.id)!.view, view);
  assert.equal(ls.setLaunchSessionView(session.id, null)!.view, null);
  ls.revokeLaunchSession(session.id);
  assert.equal(ls.setLaunchSessionView(session.id, view), null);
});

test("launchSessionScopes strips non-inherited scopes", () => {
  assert.deepEqual(ls.launchSessionScopes(["manage"]), ["launch:session"]);
  assert.deepEqual(ls.launchSessionScopes([]), ["launch:session"]);
  assert.deepEqual(ls.launchSessionScopes(null), ["launch:session"]);
  assert.deepEqual(
    ls.launchSessionScopes(["admin", "mcp:connect", "read:cache", "write:cache", "self:usage"]),
    ["self:usage"]
  );
});

// ---------- apiKeys integration ----------

test("olx token for DB parent key validates and returns parent metadata plus launchSession", async () => {
  const parent = await apiKeys.createApiKey("parent", "machine-launch", [], {
    allowedModels: ["openai/gpt-4o"],
    modelAccessMode: "allow",
  } as never);
  const view = { hash: "h", ids: ["openai/gpt-4o"] };
  const { session, token } = ls.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "codex",
    view,
    policy: { p: 1 },
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  const meta = (await apiKeys.getApiKeyMetadata(token)) as Loose;
  assert.equal(meta.id, parent.id);
  assert.deepEqual(meta.allowedModels, ["openai/gpt-4o"]);
  assert.deepEqual(meta.launchSession, {
    id: session.id,
    toolId: "codex",
    sessionTag: session.sessionTag,
    parentKeyId: parent.id,
    view,
    policy: { p: 1 },
  });
  const parentMeta = (await apiKeys.getApiKeyMetadata(parent.key)) as Loose;
  assert.equal(parentMeta.launchSession, undefined);
});

test("manage scope stripped; other scopes kept", async () => {
  const onlyManage = await apiKeys.createApiKey("m", "machine-launch", ["manage"]);
  const s1 = ls.createLaunchSession({
    parentKeyId: onlyManage.id,
    parentCredential: onlyManage.key,
    toolId: "t",
  });
  const m1 = (await apiKeys.getApiKeyMetadata(s1.token)) as Loose;
  assert.deepEqual(m1.scopes, ["launch:session"]);

  const mixed = await apiKeys.createApiKey("m2", "machine-launch", ["manage", "self:usage"]);
  const s2 = ls.createLaunchSession({
    parentKeyId: mixed.id,
    parentCredential: mixed.key,
    toolId: "t",
  });
  const m2 = (await apiKeys.getApiKeyMetadata(s2.token)) as Loose;
  assert.deepEqual(m2.scopes, ["self:usage"]);
  const pm = (await apiKeys.getApiKeyMetadata(mixed.key)) as Loose;
  assert.ok(pm.scopes.includes("manage"));
});

test("revoking the parent key invalidates the session token", async () => {
  const parent = await apiKeys.createApiKey("p", "machine-launch");
  const { token } = ls.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "t",
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  assert.equal(await apiKeys.revokeApiKey(parent.id), true);
  // No explicit clearApiKeyCaches here: revokeApiKey evicts the cache itself.
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
});

test("deleting the parent key invalidates the session token", async () => {
  const parent = await apiKeys.createApiKey("p", "machine-launch");
  const { token } = ls.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "t",
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  await apiKeys.deleteApiKey(parent.id);
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
});

test("revoking the session invalidates immediately", async () => {
  const parent = await apiKeys.createApiKey("p", "machine-launch");
  const { session, token } = ls.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "t",
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  ls.revokeLaunchSession(session.id);
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
  assert.equal(await apiKeys.validateApiKey(parent.key), true);
});

test("anonymous session depends on REQUIRE_API_KEY", async () => {
  delete process.env.INITIAL_PASSWORD;
  const { session, token } = ls.createLaunchSession({ parentKeyId: null, toolId: "t" });
  process.env.REQUIRE_API_KEY = "false";
  assert.equal(await apiKeys.validateApiKey(token), true);
  const meta = (await apiKeys.getApiKeyMetadata(token)) as Loose;
  assert.equal(meta.id, ls.LAUNCH_ANONYMOUS_API_KEY_ID);
  assert.equal(meta.launchSession.id, session.id);
  assert.equal(meta.launchSession.parentKeyId, null);
  assert.ok(!meta.scopes.includes("manage"));

  process.env.REQUIRE_API_KEY = "true";
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
  restoreEnv();
});

test("env-key parent valid only while the env key is configured", async () => {
  const { SYNTHETIC_ENV_API_KEY_ID } =
    await import("../../../src/shared/constants/apiKeyIdentities.ts");
  const { session, token } = ls.createLaunchSession({
    parentKeyId: SYNTHETIC_ENV_API_KEY_ID,
    parentCredential: "env-secret-for-launch-test",
    toolId: "t",
  });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);

  process.env.OMNIROUTE_API_KEY = "env-secret-for-launch-test";
  assert.equal(await apiKeys.validateApiKey(token), true);
  const meta = (await apiKeys.getApiKeyMetadata(token)) as Loose;
  assert.equal(meta.launchSession.id, session.id);
  assert.ok(!meta.scopes.includes("manage"));

  delete process.env.OMNIROUTE_API_KEY;
  assert.equal(await apiKeys.validateApiKey(token), false);
});

test("non-olx random key is still invalid; olx with unknown session is invalid", async () => {
  assert.equal(await apiKeys.validateApiKey("sk-random-not-a-key"), false);
  assert.equal(await apiKeys.getApiKeyMetadata("sk-random-not-a-key"), null);
  const fake = `olx_${"a".repeat(26)}_${"b".repeat(52)}`;
  assert.equal(await apiKeys.validateApiKey(fake), false);
  assert.equal(await apiKeys.getApiKeyMetadata(fake), null);
  assert.equal(await apiKeys.validateApiKey("olx_short"), false);
});

test("createLaunchSession throws without parentCredential for a non-null parent", () => {
  assert.throws(() => ls.createLaunchSession({ parentKeyId: "some-key", toolId: "t" }));
  assert.throws(() =>
    ls.createLaunchSession({ parentKeyId: "some-key", parentCredential: "", toolId: "t" })
  );
  const anon = ls.createLaunchSession({ parentKeyId: null, toolId: "t" });
  assert.equal(anon.session.parentCredentialHash, null);
  const withCred = ls.createLaunchSession({
    parentKeyId: "some-key",
    parentCredential: "raw-secret",
    toolId: "t",
  });
  assert.equal(typeof withCred.session.parentCredentialHash, "string");
  assert.notEqual(withCred.session.parentCredentialHash, "raw-secret");
  assert.ok(!JSON.stringify(rawRow(withCred.session.id)).includes("raw-secret"));
});

test("regenerating the parent key kills the session", async () => {
  const parent = await apiKeys.createApiKey("p", "machine-launch");
  const { token } = ls.createLaunchSession({
    parentKeyId: parent.id,
    parentCredential: parent.key,
    toolId: "t",
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  const regen = await apiKeys.regenerateApiKey(parent.id);
  assert.ok(regen);
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
  assert.equal(await apiKeys.validateApiKey(regen!.key), true);
});

test("changing the env key value kills an env-parented session; same value keeps it", async () => {
  const { SYNTHETIC_ENV_API_KEY_ID } =
    await import("../../../src/shared/constants/apiKeyIdentities.ts");
  process.env.OMNIROUTE_API_KEY = "env-key-value-one";
  const { token } = ls.createLaunchSession({
    parentKeyId: SYNTHETIC_ENV_API_KEY_ID,
    parentCredential: "env-key-value-one",
    toolId: "t",
  });
  assert.equal(await apiKeys.validateApiKey(token), true);
  process.env.OMNIROUTE_API_KEY = "env-key-value-one";
  assert.equal(await apiKeys.validateApiKey(token), true);
  process.env.OMNIROUTE_API_KEY = "env-key-value-two";
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
});

test("hard lifetime cap of 24h from created_at", () => {
  assert.equal(ls.LAUNCH_SESSION_MAX_LIFETIME_MS, DAY);
  const now = Date.now();
  const { session, token } = ls.createLaunchSession({
    parentKeyId: null,
    toolId: "t",
    ttlSeconds: 3600,
    now,
  });
  // keep heartbeating hourly; the session stays alive until the cap
  let t = now;
  for (let i = 0; i < 23; i++) {
    t += 3600_000 - 1000;
    assert.ok(ls.heartbeatLaunchSession(session.id, t), `heartbeat ${i}`);
  }
  // near the cap: expires_at clamps to created + 24h
  const near = ls.heartbeatLaunchSession(session.id, now + DAY - 600_000)!;
  assert.equal(Date.parse(near.expiresAt), now + DAY);
  assert.ok(ls.resolveLaunchSessionToken(token, now + DAY - 1));
  // beyond the cap: rejected even after heartbeat, and heartbeat refuses
  assert.equal(ls.resolveLaunchSessionToken(token, now + DAY + 1), null);
  assert.equal(ls.heartbeatLaunchSession(session.id, now + DAY + 1), null);
});

test("anonymous session: open posture, ended by creating a key, blocked by INITIAL_PASSWORD", async () => {
  process.env.REQUIRE_API_KEY = "false";
  delete process.env.INITIAL_PASSWORD;
  assert.equal(await apiKeys.isLaunchAnonymousPostureOpen(), true);
  const { token } = ls.createLaunchSession({ parentKeyId: null, toolId: "t" });
  assert.equal(await apiKeys.validateApiKey(token), true);

  process.env.INITIAL_PASSWORD = "something";
  assert.equal(await apiKeys.isLaunchAnonymousPostureOpen(), false);
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
  delete process.env.INITIAL_PASSWORD;
  assert.equal(await apiKeys.validateApiKey(token), true);

  await apiKeys.createApiKey("any", "machine-launch");
  assert.equal(await apiKeys.validateApiKey(token), false);
  assert.equal(await apiKeys.getApiKeyMetadata(token), null);
});
