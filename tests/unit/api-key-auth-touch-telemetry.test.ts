import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-auth-touch-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "auth-touch-test-secret";
process.env.REQUIRE_API_KEY = "true";

const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const compliance = await import("../../src/lib/compliance/index.ts");
const core = await import("../../src/lib/db/core.ts");

function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
  delete process.env.API_KEY_AUDIT_CLIENT_DETAILS_ENABLED;
  process.env.REQUIRE_API_KEY = "true";
}

/** Opt in to recording the client IP and user-agent on auth-touch rows. */
function enableClientDetails() {
  process.env.API_KEY_AUDIT_CLIENT_DETAILS_ENABLED = "true";
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function loadPolicy() {
  const mod = await import(`../../src/server/authz/policies/clientApi.ts?ts=${Date.now()}`);
  return mod.clientApiPolicy;
}

function context(options: {
  headers: Headers;
  method?: string;
  normalizedPath?: string;
  ip?: string;
  requestId?: string;
}) {
  const method = options.method ?? "GET";
  const normalizedPath = options.normalizedPath ?? "/api/v1/models";
  return {
    request: {
      method,
      headers: options.headers,
      url: `http://localhost${normalizedPath}`,
      ip: options.ip,
    },
    classification: {
      routeClass: "CLIENT_API" as const,
      reason: "client_api_v1" as const,
      normalizedPath,
    },
    requestId: options.requestId ?? "req_auth_touch",
  };
}

function authTouchRows() {
  return compliance.getAuditLog({
    action: compliance.API_KEY_AUTH_TOUCH_ACTION,
    limit: 500,
  });
}

test("successful discovery auth records bounded metadata without the credential or query", async () => {
  enableClientDetails();
  const created = await apiKeysDb.createApiKey("operator discovery", "machine-auth-touch");
  const metadata = await apiKeysDb.getApiKeyMetadata(created.key);
  assert.ok(metadata?.keyHash);

  const userAgent = `Codex/1.2 Bearer ${created.key} hash=${metadata.keyHash}${"x".repeat(400)}`;
  const policy = await loadPolicy();
  const outcome = await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": userAgent,
        "x-forwarded-for": "203.0.113.99",
      }),
      normalizedPath: "/api/v1/models?api_key=query-secret",
      ip: "198.51.100.20",
    })
  );

  assert.equal(outcome.allow, true);
  const [row] = authTouchRows();
  assert.ok(row);
  assert.equal(row.target, created.id);
  assert.equal(row.actor, "api_key");
  assert.equal(row.ip, "198.51.100.20", "direct peers must ignore spoofed forwarding headers");
  assert.deepEqual(row.metadata, {
    method: "GET",
    path: "/api/v1/models",
    userAgent: (row.metadata as { userAgent: string }).userAgent,
  });

  const recordedUserAgent = (row.metadata as { userAgent: string }).userAgent;
  assert.ok(recordedUserAgent.length <= 256);
  assert.doesNotMatch(recordedUserAgent, /[\u0000-\u001f\u007f]/);
  assert.doesNotMatch(
    recordedUserAgent,
    new RegExp(created.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  );
  assert.doesNotMatch(recordedUserAgent, new RegExp(metadata.keyHash));

  const raw = core
    .getDbInstance()
    .prepare("SELECT * FROM audit_log WHERE action = ?")
    .get(compliance.API_KEY_AUTH_TOUCH_ACTION) as Record<string, unknown>;
  const serialized = JSON.stringify(raw);
  assert.doesNotMatch(serialized, /query-secret/);
  assert.doesNotMatch(serialized, new RegExp(created.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(serialized, new RegExp(metadata.keyHash));
  assert.doesNotMatch(serialized, /authorization/i);
});

test("multi-credential and path-token auth audit only the credential that validated", async () => {
  enableClientDetails();
  const created = await apiKeysDb.createApiKey("alternate credential", "machine-alt-touch");
  const staleBearer = "stale-claude-session-secret";
  const policy = await loadPolicy();

  const alternateOutcome = await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${staleBearer}`,
        "x-api-key": created.key,
        "user-agent": `ClaudeCode bearer=${staleBearer} key=${created.key}`,
      }),
      requestId: "req_alternate_credential",
    })
  );
  assert.equal(alternateOutcome.allow, true);

  const encodedKey = encodeURIComponent(created.key);
  const tokenizedPath = `/api/v1/vscode/${encodedKey}/models`;
  const pathOutcome = await policy.evaluate(
    context({
      headers: new Headers({ "user-agent": "VSCode/1.0" }),
      normalizedPath: tokenizedPath,
      requestId: "req_path_credential",
    })
  );
  assert.equal(pathOutcome.allow, true);

  const rows = authTouchRows();
  assert.equal(rows.length, 2);
  assert.ok(rows.every((row) => row.target === created.id));
  const serialized = JSON.stringify(rows);
  assert.doesNotMatch(serialized, new RegExp(created.key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(serialized, new RegExp(staleBearer));
  assert.match(serialized, /\[redacted\]/);
});

test("trusted proxy forwarding is recorded while a direct peer cannot spoof it", async () => {
  enableClientDetails();
  const created = await apiKeysDb.createApiKey("proxy attribution", "machine-proxy-touch");
  const policy = await loadPolicy();
  const headers = new Headers({
    authorization: `Bearer ${created.key}`,
    "user-agent": "CatalogClient/1.0",
    "x-forwarded-for": "203.0.113.44",
  });

  await policy.evaluate(context({ headers, ip: "198.51.100.21", requestId: "req_direct" }));
  await policy.evaluate(context({ headers, ip: "127.0.0.1", requestId: "req_proxy" }));

  process.env.OMNIROUTE_PEER_STAMP_TOKEN = "auth-touch-stamp";
  await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "CatalogClient/1.0",
        "x-forwarded-for": "203.0.113.45",
        "x-omniroute-peer-ip": "auth-touch-stamp|172.18.0.2",
        "x-omniroute-via-proxy": "auth-touch-stamp|1",
      }),
      requestId: "req_docker_proxy",
    })
  );
  await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "CatalogClient/1.0",
        "x-forwarded-for": "203.0.113.250",
        "x-omniroute-peer-ip": "auth-touch-stamp|198.51.100.22",
        "x-omniroute-via-proxy": "auth-touch-stamp|1",
      }),
      requestId: "req_public_peer_spoof",
    })
  );

  const ips = authTouchRows()
    .map((row) => row.ip)
    .sort();
  assert.deepEqual(ips, ["198.51.100.21", "198.51.100.22", "203.0.113.44", "203.0.113.45"]);
});

test("with API_KEY_AUDIT_CLIENT_DETAILS_ENABLED off (default) the touch is recorded without IP or user-agent", async () => {
  const created = await apiKeysDb.createApiKey("no client details", "machine-no-details");
  const policy = await loadPolicy();
  const outcome = await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "Codex/9.9 private-client",
        "x-forwarded-for": "203.0.113.77",
      }),
      ip: "198.51.100.30",
    })
  );

  assert.equal(outcome.allow, true);
  const rows = authTouchRows();
  assert.equal(rows.length, 1, "the key usage itself is still audited");
  const [row] = rows;
  assert.equal(row.target, created.id);
  assert.equal(row.ip, null, "no client IP without the opt-in flag");
  assert.deepEqual(row.metadata, { method: "GET", path: "/api/v1/models", userAgent: null });
  const raw = JSON.stringify(
    core
      .getDbInstance()
      .prepare("SELECT * FROM audit_log WHERE action = ?")
      .get(compliance.API_KEY_AUTH_TOUCH_ACTION)
  );
  assert.doesNotMatch(raw, /198\.51\.100\.30|203\.0\.113\.77/);
  assert.doesNotMatch(raw, /private-client/);
});

test("with API_KEY_AUDIT_CLIENT_DETAILS_ENABLED on the touch records the client IP and user-agent", async () => {
  enableClientDetails();
  const created = await apiKeysDb.createApiKey("client details", "machine-details");
  const policy = await loadPolicy();
  const outcome = await policy.evaluate(
    context({
      headers: new Headers({
        authorization: `Bearer ${created.key}`,
        "user-agent": "Codex/9.9 private-client",
      }),
      ip: "198.51.100.31",
    })
  );

  assert.equal(outcome.allow, true);
  const [row] = authTouchRows();
  assert.ok(row);
  assert.equal(row.ip, "198.51.100.31");
  assert.deepEqual(row.metadata, {
    method: "GET",
    path: "/api/v1/models",
    userAgent: "Codex/9.9 private-client",
  });
});

test("failed auth, inference POSTs, noLog keys, and environment keys produce no touch", async () => {
  const policy = await loadPolicy();

  const failed = await policy.evaluate(
    context({ headers: new Headers({ authorization: "Bearer invalid-secret" }) })
  );
  assert.equal(failed.allow, false);

  const inferenceKey = await apiKeysDb.createApiKey("inference", "machine-inference");
  const inference = await policy.evaluate(
    context({
      headers: new Headers({ authorization: `Bearer ${inferenceKey.key}` }),
      method: "POST",
      normalizedPath: "/api/v1/responses",
    })
  );
  assert.equal(inference.allow, true);

  const noLogKey = await apiKeysDb.createApiKey("private", "machine-private");
  assert.equal(await apiKeysDb.updateApiKeyPermissions(noLogKey.id, { noLog: true }), true);
  const noLog = await policy.evaluate(
    context({ headers: new Headers({ authorization: `Bearer ${noLogKey.key}` }) })
  );
  assert.equal(noLog.allow, true);

  process.env.OMNIROUTE_API_KEY = "environment-only-key";
  const envKey = await policy.evaluate(
    context({ headers: new Headers({ authorization: "Bearer environment-only-key" }) })
  );
  assert.equal(envKey.allow, true);

  assert.equal(authTouchRows().length, 0);
});

test("a failure inside the touch helpers never changes the auth outcome of a valid key", async () => {
  enableClientDetails();
  const created = await apiKeysDb.createApiKey("audit-failure", "machine-audit-failure");
  // Headers whose user-agent read throws: the touch path reads it after validation,
  // the credential extraction does not, so only the audit step can fail here.
  class ThrowingUserAgentHeaders extends Headers {
    get(name: string): string | null {
      if (name.toLowerCase() === "user-agent") throw new Error("boom: user-agent read");
      return super.get(name);
    }
  }
  const policy = await loadPolicy();
  const outcome = await policy.evaluate(
    context({
      headers: new ThrowingUserAgentHeaders({ authorization: `Bearer ${created.key}` }),
    })
  );
  assert.equal(outcome.allow, true, "a validated key stays allowed when auditing throws");
  assert.equal(authTouchRows().length, 0);
});

test("identical touches coalesce and the telemetry action is hard-capped", async () => {
  const created = await apiKeysDb.createApiKey("bounded", "machine-bounded");
  const base = Date.parse("2026-09-21T12:00:00.000Z");

  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    ipAddress: "127.0.0.1",
    userAgent: "same-client",
    createdAt: new Date(base).toISOString(),
  });
  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    ipAddress: "127.0.0.1",
    userAgent: "same-client",
    createdAt: new Date(base + 60_000).toISOString(),
  });
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 1);

  for (let index = 0; index <= compliance.API_KEY_AUTH_TOUCH_MAX_ROWS; index += 1) {
    compliance.recordApiKeyAuthTouch({
      apiKeyId: created.id,
      method: "GET",
      normalizedPath: `/api/v1/models/${index}`,
      ipAddress: "127.0.0.1",
      userAgent: `client-${index}`,
      createdAt: new Date(base + 10 * 60_000 + index).toISOString(),
    });
  }

  assert.equal(
    compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }),
    compliance.API_KEY_AUTH_TOUCH_MAX_ROWS
  );
  assert.equal(
    compliance.getAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION, limit: 10 }).length,
    10,
    "existing management read pagination remains usable"
  );
});

test("repeat touches inside the refresh window do not write; older ones refresh the row", async () => {
  const created = await apiKeysDb.createApiKey("refresh-window", "machine-refresh-window");
  const base = Date.parse("2026-09-21T12:00:00.000Z");
  const touch = (offsetMs: number) =>
    compliance.recordApiKeyAuthTouch({
      apiKeyId: created.id,
      method: "GET",
      normalizedPath: "/api/v1/models",
      ipAddress: "127.0.0.1",
      userAgent: "same-client",
      requestId: `req_${offsetMs}`,
      createdAt: new Date(base + offsetMs).toISOString(),
    });
  const onlyRow = () => {
    const rows = authTouchRows();
    assert.equal(rows.length, 1, "identical touches stay a single row");
    return rows[0];
  };

  touch(0);
  const first = onlyRow();
  assert.equal(new Date(first.timestamp).toISOString(), new Date(base).toISOString());

  // A hot /v1/models poll must not turn into one SQLite write per request.
  touch(30_000);
  const withinWindow = onlyRow();
  assert.equal(
    new Date(withinWindow.timestamp).toISOString(),
    new Date(base).toISOString(),
    "a repeat inside the refresh window must not rewrite the row"
  );
  assert.equal(withinWindow.request_id, first.request_id);

  // Past the refresh window (but inside the coalesce window) the row is refreshed.
  touch(120_000);
  const refreshed = onlyRow();
  assert.equal(
    new Date(refreshed.timestamp).toISOString(),
    new Date(base + 120_000).toISOString(),
    "a repeat past the refresh window must bump the existing row's timestamp"
  );
});

test("a remembered fresh touch does no SQLite work and the schema is ensured once", async () => {
  const created = await apiKeysDb.createApiKey("hot-path", "machine-hot-path");
  const base = Date.parse("2026-09-21T12:00:00.000Z");
  const touch = (offsetMs: number) =>
    compliance.recordApiKeyAuthTouch({
      apiKeyId: created.id,
      method: "GET",
      normalizedPath: "/api/v1/models",
      ipAddress: "127.0.0.1",
      userAgent: "polling-client",
      requestId: `req_hot_${offsetMs}`,
      createdAt: new Date(base + offsetMs).toISOString(),
    });

  touch(0);
  assert.equal(authTouchRows().length, 1);

  type CountedDb = {
    prepare: (...args: unknown[]) => unknown;
    exec: (...args: unknown[]) => unknown;
  };
  const db = core.getDbInstance() as unknown as CountedDb;
  const originalPrepare = db.prepare;
  const originalExec = db.exec;
  let prepares = 0;
  let execs = 0;
  db.prepare = (...args: unknown[]) => {
    prepares += 1;
    return originalPrepare.apply(db, args);
  };
  db.exec = (...args: unknown[]) => {
    execs += 1;
    return originalExec.apply(db, args);
  };
  try {
    // A hot /v1/models poll inside the refresh window never reaches SQLite.
    touch(15_000);
    touch(45_000);
    assert.equal(prepares, 0, "a remembered fresh hit must not prepare any statement");
    assert.equal(execs, 0, "a remembered fresh hit must not run DDL");

    // Past the refresh window the row is re-stamped, still without re-running the schema DDL.
    touch(120_000);
    assert.ok(prepares > 0, "a touch past the refresh window refreshes the row");
    assert.equal(execs, 0, "audit_log schema is ensured once per DB instance, not per touch");
  } finally {
    db.prepare = originalPrepare;
    db.exec = originalExec;
  }
  const rows = authTouchRows();
  assert.equal(rows.length, 1);
  assert.equal(new Date(rows[0].timestamp).toISOString(), new Date(base + 120_000).toISOString());
});

test("auth-touch rows follow existing application-log retention", async () => {
  const created = await apiKeysDb.createApiKey("retention", "machine-retention");
  compliance.recordApiKeyAuthTouch({
    apiKeyId: created.id,
    method: "GET",
    normalizedPath: "/api/v1/models",
    createdAt: "2000-01-01T00:00:00.000Z",
  });
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 1);

  const cleanup = await compliance.cleanupExpiredLogs();
  assert.ok(cleanup.deletedAuditLogs >= 1);
  assert.equal(compliance.countAuditLog({ action: compliance.API_KEY_AUTH_TOUCH_ACTION }), 0);
});
