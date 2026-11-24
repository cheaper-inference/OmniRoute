// Characterisation of recordKeyHealthStatus under the single-state model:
//   - the rotator's per-key entry is the only state (status, rejectedAt, lastSeq);
//   - the connection verdict is derived (no key left without a rejection verdict);
//   - one ordering rule, by dispatch sequence, discards responses older than what applied.
import { test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { BaseExecutor } from "../../open-sse/executors/base.ts";
import {
  bindKeyHealthRecorder,
  recordKeyHealthStatus,
  __setKeyHealthPersistenceSink,
} from "../../open-sse/handlers/chatCore/keyHealth.ts";
import {
  getAllKeyHealth,
  recoverKeyHealth,
  removeConnectionHealth,
  syncHealthFromDB,
} from "../../open-sse/services/apiKeyRotator.ts";
import {
  getCredentialHealth,
  isCredentialHealthy,
  setCredentialHealth,
  __test_resetCredentialHealthCache,
} from "../../src/lib/credentialHealth/cache.ts";

const noopLog = { warn: () => {}, error: () => {} };
const touched: string[] = [];

function creds(connectionId: string, psd: Record<string, unknown> = {}) {
  touched.push(connectionId);
  return { connectionId, apiKey: "kh-test-key", accessToken: null, providerSpecificData: psd };
}

const workspaceDenied = JSON.stringify({
  error: { code: "workspace_access_denied", message: "Workspace access denied" },
});
const forbidden = JSON.stringify({ error: { message: "Forbidden" } });

beforeEach(() => {
  // Tests that inspect persistence replace this sink before recording an outcome.
  __setKeyHealthPersistenceSink(() => {});
});

afterEach(() => {
  for (const c of touched.splice(0)) removeConnectionHealth(c);
  __test_resetCredentialHealthCache();
  __setKeyHealthPersistenceSink(null);
});

test("missing connectionId is a no-op", () => {
  const before = Object.keys(getAllKeyHealth()).length;
  recordKeyHealthStatus(200, { providerSpecificData: {} }, noopLog);
  assert.equal(Object.keys(getAllKeyHealth()).length, before);
});

test("model capability failures and model-sync conflicts do not touch credential health", () => {
  const cases = [
    [400, JSON.stringify({ error: { code: "model_not_found", message: "Model not found" } })],
    [403, JSON.stringify({ error: { code: "unsupported_model", message: "Unsupported model" } })],
    [409, JSON.stringify({ error: "Model discovery deferred" })],
    // A credential status carrying a capability reason: without the capability classifier this
    // one alone would close the connection, so it is the case that fails on deletion.
    [401, JSON.stringify({ error: { message: "This model is not available" } })],
  ] as const;

  for (const [status, failure] of cases) {
    const conn = `kh-non-credential-${status}`;
    recordKeyHealthStatus(status, creds(conn), noopLog, undefined, failure);
    assert.equal(
      getAllKeyHealth()[`${conn}:primary`],
      undefined,
      `${status} is about the model, not the credential`
    );
  }
});

test("2xx after a failure resets the key to active with 0 failures", () => {
  const conn = "kh-2xx-recover";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  recordKeyHealthStatus(204, creds(conn), noopLog);
  const h = getAllKeyHealth()[`${conn}:primary`];
  assert.equal(h?.failures, 0);
  assert.equal(h?.status, "active");
});

test("non-401 / non-2xx status does not touch key health", () => {
  const conn = "kh-5xx-noop";
  recordKeyHealthStatus(500, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});

test("the persisted health entry carries no wording from the upstream body", () => {
  const conn = "kh-no-body-text";
  const marker = "sk-LEAK-MARKER-9f3c";
  const writes: Array<Record<string, unknown>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(health as Record<string, unknown>));

  recordKeyHealthStatus(
    401,
    creds(conn),
    noopLog,
    undefined,
    JSON.stringify({ error: { message: `Invalid API key ${marker}`, hint: "check billing" } })
  );

  const serialized = JSON.stringify(writes.at(-1));
  assert.equal(
    serialized.includes(marker),
    false,
    "an upstream body can echo the key; it must never reach storage"
  );
  assert.equal(serialized.includes("check billing"), false);
});

test("CPA pool failures do not poison the selected native connection key", () => {
  const conn = "kh-cpa-pool-isolation";
  recordKeyHealthStatus(401, creds(conn), noopLog, "cliproxyapi");
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "a shared external pool's auth failure says nothing about this connection's key"
  );
});

test("a keyless connection has no key to fail (#9827)", () => {
  const before = Object.keys(getAllKeyHealth()).length;
  recordKeyHealthStatus(
    401,
    { connectionId: "noauth", apiKey: null, accessToken: null, providerSpecificData: {} },
    noopLog
  );
  assert.equal(Object.keys(getAllKeyHealth()).length, before);
});

test("401 walks the failure ladder: warning, then invalid", () => {
  const conn = "kh-ladder";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "warning");
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "invalid");
});

test("a 401 records the rejection verdict as soon as it arrives", () => {
  const conn = "kh-verdict-early";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.ok(getAllKeyHealth()[`${conn}:primary`]?.rejectedAt);
});

test("a single key rejected twice closes the connection", () => {
  const conn = "kh-block-single";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.equal(isCredentialHealthy(conn), undefined);
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.equal(isCredentialHealthy(conn), false);
  assert.equal(getCredentialHealth(conn)?.lastErrorSource, "inference");
  assert.equal(getCredentialHealth(conn)?.lastError, "upstream rejected the credential");
});

test("a generic 403 invalidates the key but leaves the connection dispatchable", () => {
  const conn = "kh-generic-403";
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, forbidden);
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, forbidden);

  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "invalid");
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.rejectedAt, undefined);
  assert.equal(getCredentialHealth(conn), undefined);
});

test("an endpoint-scoped workspace denial is not a credential verdict", () => {
  const conn = "kh-endpoint-scoped";
  const detail = JSON.stringify({
    error: { message: "Workspace access denied for this endpoint" },
  });
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  assert.equal(getCredentialHealth(conn), undefined);
});

test("an endpoint-scoped 401 does not close the connection", () => {
  const conn = "kh-endpoint-401";
  const detail = JSON.stringify({
    error: { message: "This API key is invalid for the selected endpoint" },
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(getCredentialHealth(conn), undefined, "one endpoint's rejection is not the key's");
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "the key itself must not be marked invalid by an endpoint-scoped rejection"
  );
});

test("a structured body without a message field still counts a 401", () => {
  const conn = "kh-error-string-401";
  const detail = JSON.stringify({ error: "Invalid API key", request_id: "req_123" });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.ok(
    getAllKeyHealth()[`${conn}:primary`],
    "an identifier in the envelope must not hide a credential failure"
  );
});

test("an auxiliary hint cannot decide that a denial was scoped", () => {
  const conn = "kh-hint-scope";
  const detail = JSON.stringify({
    error: "Invalid API key",
    hint: "verify access for the selected model",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.ok(
    getAllKeyHealth()[`${conn}:primary`],
    "the wording that counts is the rejection, not an auxiliary hint"
  );
});

test("a body with no wording field is judged on its status, not on an auxiliary hint", () => {
  const conn = "kh-hint-only";
  const detail = JSON.stringify({ code: "401", hint: "verify access for the selected model" });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.ok(
    getAllKeyHealth()[`${conn}:primary`],
    "an envelope with no message field carries no scope wording to trust"
  );
});

test("scope wording in a later field still counts", () => {
  const conn = "kh-scope-later-field";
  const detail = JSON.stringify({
    error: "invalid_request_type",
    message: "This API key is invalid for the selected endpoint",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "reading only the first wording field loses the target the denial names"
  );
});

test("a model name after the target noun is still one model", () => {
  const conn = "kh-model-name-scope";
  const detail = JSON.stringify({
    error: { message: "This key is not allowed for model gpt-4" },
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});

test("an error_description field carries the scope wording too", () => {
  const conn = "kh-error-description";
  const detail = JSON.stringify({
    error: "invalid_grant",
    error_description: "This grant is not valid for the selected endpoint",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
});

test("a model reason that lives in the code field still reports a model problem", () => {
  const conn = "kh-code-reason-model";
  const detail = JSON.stringify({
    error: { message: "The model `gpt-4o` does not exist", code: "model_not_found" },
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "the reason can arrive in the code field"
  );
});

test("a sibling hint cannot make a bare 401 decisive", () => {
  const conn = "kh-hint-decisive";
  const detail = JSON.stringify({
    error: { message: "Unauthorized" },
    hint: "account suspended",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(
    getCredentialHealth(conn),
    undefined,
    "a decisive verdict reads the rejection, not a sibling field"
  );
});

test("a code-first body still reports a model problem", () => {
  const conn = "kh-code-first-model";
  const detail = JSON.stringify({
    error: "invalid_request_error",
    message: "This model is not available",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "the capability wording lives in the message, not in the code"
  );
});

test("a sibling hint cannot downgrade a key-blamed 401 to a model problem", () => {
  const conn = "kh-hint-capability";
  const detail = JSON.stringify({
    error: { message: "Invalid API key" },
    hint: "model not found",
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.ok(
    getAllKeyHealth()[`${conn}:primary`],
    "the capability classifier reads the rejection, not a sibling field"
  );
});

test("a qualified target still marks the denial as scoped", () => {
  const conn = "kh-qualified-scope";
  const detail = JSON.stringify({
    error: { message: "This model is not allowed for the embeddings endpoint" },
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`],
    undefined,
    "a qualified endpoint name is still one endpoint"
  );
  assert.equal(getCredentialHealth(conn), undefined);
});

test("upstream wording that blames the key counts even when it mentions an endpoint", () => {
  const conn = "kh-azure-401";
  const detail = JSON.stringify({
    error: {
      code: "401",
      message: "Access denied due to invalid subscription key or wrong API endpoint",
    },
  });
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, detail);
  assert.ok(getAllKeyHealth()[`${conn}:primary`], "invalid subscription key is a credential failure");
});

test("a bare 401 still counts against the key", () => {
  const conn = "kh-bare-401";
  recordKeyHealthStatus(401, creds(conn), noopLog);
  const entry = getAllKeyHealth()[`${conn}:primary`];
  assert.ok(entry, "a bare 401 is a credential failure and must be recorded");
  assert.equal(entry?.failures, 1);
});

test("a suspended workspace is a credential verdict", () => {
  const conn = "kh-suspended";
  const detail = JSON.stringify({ error: { message: "Workspace suspended" } });
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  assert.equal(getCredentialHealth(conn)?.status, "error");
});

test("a model-availability rejection touches neither key health nor the gate", () => {
  const conn = "kh-model-403";
  const detail = JSON.stringify({
    error: { code: "unsupported_model", message: "Invalid API key for this model family" },
  });
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, detail);
  assert.equal(getAllKeyHealth()[`${conn}:primary`], undefined);
  assert.equal(getCredentialHealth(conn), undefined);
});

test("a terminal 402 rejects the key and closes the connection", () => {
  const conn = "kh-402";
  recordKeyHealthStatus(402, creds(conn), noopLog);
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "invalid");
  assert.ok(getAllKeyHealth()[`${conn}:primary`]?.rejectedAt);
  assert.equal(getCredentialHealth(conn)?.lastErrorType, "insufficient_balance");
});

test("a 429 cools the key without a credential verdict", () => {
  const conn = "kh-429";
  recordKeyHealthStatus(429, creds(conn), noopLog, undefined, "", 30_000);
  const entry = getAllKeyHealth()[`${conn}:primary`];
  assert.ok(entry?.cooldownUntil);
  assert.equal(entry?.rejectedAt, undefined);
  assert.equal(getCredentialHealth(conn), undefined);
});

test("a served request clears the verdict, the gate and the persisted state", () => {
  const conn = "kh-recovery";
  const writes: Array<Record<string, { status?: string; rejectedAt?: string | null }>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));

  recordKeyHealthStatus(401, creds(conn), noopLog);
  recordKeyHealthStatus(401, creds(conn), noopLog);
  assert.equal(isCredentialHealthy(conn), false);

  const before = writes.length;
  recordKeyHealthStatus(204, creds(conn), noopLog);

  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.rejectedAt, undefined);
  assert.equal(isCredentialHealthy(conn), true);
  assert.ok(writes.length > before, "the recovery has to reach the database");
  const entry = writes[writes.length - 1]["primary"];
  assert.equal(entry?.status, "active");
  assert.equal(
    Object.prototype.hasOwnProperty.call(entry ?? {}, "rejectedAt"),
    false,
    "the persisted snapshot must not carry a cleared verdict"
  );
});

test("a sibling key keeps the connection alive until it too is rejected", () => {
  const conn = "kh-siblings";
  const psd = { extraApiKeys: ["second-key"] };

  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  assert.equal(isCredentialHealthy(conn), undefined, "the extra key can still serve");

  recordKeyHealthStatus(401, creds(conn, { ...psd, selectedKeyId: "extra_0" }), noopLog);
  recordKeyHealthStatus(401, creds(conn, { ...psd, selectedKeyId: "extra_0" }), noopLog);
  assert.equal(isCredentialHealthy(conn), false);
});

test("a blank extra key is not a usable sibling", () => {
  const conn = "kh-blank-sibling";
  const psd = { extraApiKeys: [""] };
  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  assert.equal(isCredentialHealthy(conn), false);
});

test("a success for an older dispatch is discarded", () => {
  const conn = "kh-ordering";
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, "", null, 2);
  const afterFailure = { ...getAllKeyHealth()[`${conn}:primary`] };

  // Dispatched before the failure that already applied: it proves nothing.
  recordKeyHealthStatus(204, creds(conn), noopLog, undefined, "", null, 1);
  assert.deepEqual({ ...getAllKeyHealth()[`${conn}:primary`] }, afterFailure);
  assert.equal(isCredentialHealthy(conn), undefined, "and it must not reopen the gate either");
});

test("a stale failure is discarded as well", () => {
  const conn = "kh-ordering-failure";

  recordKeyHealthStatus(204, creds(conn), noopLog, undefined, "", null, 2);
  recordKeyHealthStatus(429, creds(conn), noopLog, undefined, "", 30_000, 1);

  assert.equal(
    getAllKeyHealth()[`${conn}:primary`]?.cooldownUntil ?? null,
    null,
    "an attempt dispatched before the success cannot cool the key afterwards"
  );
});

test("a newer failure is still applied", () => {
  const conn = "kh-ordering-newer";

  recordKeyHealthStatus(204, creds(conn), noopLog, undefined, "", null, 1);
  recordKeyHealthStatus(429, creds(conn), noopLog, undefined, "", 30_000, 2);

  assert.ok(getAllKeyHealth()[`${conn}:primary`]?.cooldownUntil);
});

test("the dispatch that ties the applied sequence is discarded", () => {
  const conn = "kh-ordering-equal";
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, "", null, 7);
  const afterFailure = { ...getAllKeyHealth()[`${conn}:primary`] };
  recordKeyHealthStatus(204, creds(conn), noopLog, undefined, "", null, 7);
  assert.deepEqual({ ...getAllKeyHealth()[`${conn}:primary`] }, afterFailure);
});

test("swapping the credential clears the previous verdict", () => {
  const conn = "kh-generation";
  const oldCreds = { ...creds(conn), apiKey: "key-old" };
  recordKeyHealthStatus(401, oldCreds, noopLog, undefined, "", null, 1);
  recordKeyHealthStatus(401, oldCreds, noopLog, undefined, "", null, 2);
  assert.equal(isCredentialHealthy(conn), false);

  // A new key material replaces the one the verdict described.
  const rotated = { ...creds(conn), apiKey: "key-new" };
  recordKeyHealthStatus(401, rotated, noopLog, undefined, "", null, 3);

  assert.equal(
    getAllKeyHealth()[`${conn}:primary`]?.failures,
    1,
    "the ladder restarts for the new credential"
  );
  assert.equal(isCredentialHealthy(conn), undefined, "the old block is gone");
});

test("a late rejection issued with the replaced credential does not blacklist the new one", () => {
  const conn = "kh-generation-race";
  const oldCreds = { ...creds(conn), apiKey: "key-old" };
  const newCreds = { ...creds(conn), apiKey: "key-new" };

  // Attempt 1 is in flight with the old material; the credential is swapped and
  // attempt 2 serves 204. Attempt 1 then reports 401, late.
  recordKeyHealthStatus(204, newCreds, noopLog, undefined, "", null, 2);
  recordKeyHealthStatus(401, oldCreds, noopLog, undefined, "", null, 1);

  assert.equal(
    getAllKeyHealth()[`${conn}:primary`]?.rejectedAt ?? null,
    null,
    "the old material's verdict must not land on the credential that replaced it"
  );
  assert.notEqual(
    isCredentialHealthy(conn),
    false,
    "the connection must not be closed by the replaced credential's rejection"
  );
});

test("each persistence delta contains only the key whose outcome was observed", () => {
  const conn = "kh-write-scope";
  const psd = { extraApiKeys: ["second-key"] };
  const writes: Array<Record<string, { rejectedAt?: string | null }>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));

  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  recordKeyHealthStatus(401, creds(conn, { ...psd, selectedKeyId: "extra_0" }), noopLog);

  assert.deepEqual(Object.keys(writes[0]), ["primary"]);
  assert.deepEqual(Object.keys(writes[1]), ["extra_0"]);
  assert.ok(writes[0].primary.rejectedAt);
  assert.ok(writes[1].extra_0.rejectedAt);
});

test("one connection's health never leaks into another", () => {
  const a = "kh-isolation-a";
  const b = "kh-isolation-b";
  const writes: Array<{ conn: string; keys: string[]; rejectedAt?: string | null }> = [];
  __setKeyHealthPersistenceSink((id, health) =>
    writes.push({ conn: id, keys: Object.keys(health), rejectedAt: health.primary?.rejectedAt })
  );

  const aWrites = () => writes.filter((w) => w.conn === a);
  const bWrites = () => writes.filter((w) => w.conn === b);

  recordKeyHealthStatus(401, creds(a), noopLog);
  const aOnly = bWrites().length;
  recordKeyHealthStatus(401, creds(b), noopLog);

  assert.deepEqual(writes.filter((w) => w.conn === b).at(-1)?.keys, ["primary"]);
  assert.equal(aWrites().at(-1)?.rejectedAt, writes.find((w) => w.conn === a)?.rejectedAt);
  assert.equal(
    aOnly,
    0,
    "writing connection a must not emit a write for connection b"
  );
});

test("the recorder binding forwards the dispatch sequence", () => {
  const conn = "kh-binding";
  const record = bindKeyHealthRecorder(noopLog);

  record(401, creds(conn), undefined, "", null, 9);
  const afterFailure = { ...getAllKeyHealth()[`${conn}:primary`] };

  record(204, creds(conn), undefined, "", null, 9);
  assert.deepEqual(
    { ...getAllKeyHealth()[`${conn}:primary`] },
    afterFailure,
    "the binding must forward the sequence rather than dropping it"
  );
});

test("a gate entry written by an earlier round is cleared by a served request", () => {
  const conn = "kh-preblocked";
  setCredentialHealth(
    conn,
    "opencode-go",
    "error",
    "upstream rejected the credential",
    "upstream_auth_error",
    "inference"
  );
  recordKeyHealthStatus(204, creds(conn), noopLog);
  assert.equal(isCredentialHealthy(conn), true);
});

test("a blank entry before a real extra key does not shift the key ids", () => {
  const conn = "kh-shifted-ids";
  const psd = { extraApiKeys: ["", "second-key"] };

  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  recordKeyHealthStatus(401, creds(conn, psd), noopLog);
  assert.equal(isCredentialHealthy(conn), undefined, "the blank slot is not a key");

  // The real extra key is extra_0 for the rotator, blank slot or not.
  recordKeyHealthStatus(401, creds(conn, { ...psd, selectedKeyId: "extra_0" }), noopLog);
  recordKeyHealthStatus(401, creds(conn, { ...psd, selectedKeyId: "extra_0" }), noopLog);
  assert.equal(isCredentialHealthy(conn), false);
});

test("a persistence delta does not republish an unobserved sibling snapshot", () => {
  const conn = "kh-stored-sibling";
  const psd = {
    extraApiKeys: ["second-key"],
    apiKeyHealth: {
      extra_0: { status: "invalid", failures: 2, rejectedAt: "2026-01-01T00:00:00.000Z" },
    },
  };
  const writes: Array<Record<string, { rejectedAt?: string | null }>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));

  recordKeyHealthStatus(401, creds(conn, psd), noopLog);

  const last = writes[writes.length - 1];
  assert.deepEqual(Object.keys(last), ["primary"]);
  assert.ok(last.primary.rejectedAt);
  // The real SQLite suite verifies the transaction preserves the latest sibling.
  assert.equal(last.extra_0, undefined);
});

test("a wording-proven failure closes the connection before the ladder reaches invalid", () => {
  const conn = "kh-verdict-gate";
  const psd = { extraApiKeys: ["second-key"] };

  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, workspaceDenied, null, 1);
  recordKeyHealthStatus(
    401,
    creds(conn, { ...psd, selectedKeyId: "extra_0" }),
    noopLog,
    undefined,
    workspaceDenied,
    null,
    2
  );

  assert.equal(
    getAllKeyHealth()[`${conn}:primary`]?.status,
    "warning",
    "the ladder has not reached invalid yet"
  );
  assert.equal(
    isCredentialHealthy(conn),
    false,
    "but the derived verdict already knows no key can serve"
  );
});

test("a decisive rejection increases the cache counter only once per response", () => {
  const conn = "kh-single-cache-verdict";
  const countsAtPersistence: Array<number | undefined> = [];
  __setKeyHealthPersistenceSink(() => {
    countsAtPersistence.push(getCredentialHealth(conn)?.consecutiveFailures);
  });

  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, workspaceDenied, null, 1);
  assert.equal(getCredentialHealth(conn)?.status, "error", "the first decisive response blocks");
  assert.equal(getCredentialHealth(conn)?.consecutiveFailures, 1);

  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, workspaceDenied, null, 2);
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "invalid");
  assert.deepEqual(countsAtPersistence, [1, 2], "publish before each unchanged persistence write");
  assert.equal(getCredentialHealth(conn)?.consecutiveFailures, 2, "count two observed failures");
});

test("a stored entry that is not key-shaped is ignored", () => {
  const conn = "kh-stored-prototype";
  const psd = {
    apiKeyHealth: JSON.parse('{"__proto__":{"status":"invalid"},"../escape":{"status":"invalid"}}'),
  };
  const writes: Array<Record<string, unknown>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));

  recordKeyHealthStatus(401, creds(conn, psd), noopLog, undefined, "", null, 1);

  const keys = Object.keys(writes[writes.length - 1]);
  assert.deepEqual(keys, ["primary"], "only key-shaped entries survive the write");
});

test("the persisted snapshot does not carry the in-process sequence", () => {
  const conn = "kh-seq-not-persisted";
  const writes: Array<Record<string, { lastSeq?: number }>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));

  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, "", null, 42);

  assert.equal(
    writes[writes.length - 1]["primary"].lastSeq,
    undefined,
    "a restart starts a new sequence, so the old one must not be stored"
  );
});

test("a validated probe clears both the ladder and the verdict", () => {
  const conn = "kh-probe-recovery";
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, workspaceDenied, null, 1);
  recordKeyHealthStatus(401, creds(conn), noopLog, undefined, workspaceDenied, null, 2);
  assert.equal(isCredentialHealthy(conn), false);

  // The stored snapshot is keyed by key id only, not by the rotator's `conn:key` scope.
  const stored = { apiKeyHealth: { primary: getAllKeyHealth()[`${conn}:primary`] } };
  recoverKeyHealth(conn, "primary", stored);

  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.status, "active");
  assert.equal(
    getAllKeyHealth()[`${conn}:primary`]?.rejectedAt ?? null,
    null,
    "an authoritative probe is evidence the credential works again"
  );
});

test("non-string extra keys are ignored", () => {
  const conn = "kh-bad-extras";
  recordKeyHealthStatus(
    401,
    creds(conn, { extraApiKeys: [42, null, "real-key"] as unknown as string[] }),
    noopLog,
    undefined,
    "",
    null,
    1
  );
  assert.deepEqual(
    Object.keys(getAllKeyHealth()).filter((k) => k.startsWith(conn)),
    [`${conn}:primary`]
  );
});

test("a request without providerSpecificData still records the failure", () => {
  const conn = "kh-no-psd";
  touched.push(conn);
  recordKeyHealthStatus(401, { connectionId: conn, apiKey: "k" }, noopLog, undefined, "", null, 1);
  assert.equal(getAllKeyHealth()[`${conn}:primary`]?.failures, 1);
});

test("a persisted rejected sibling is included when the primary is rejected", () => {
  const conn = "kh-stored-dead-sibling";
  const psd = {
    extraApiKeys: ["extra-fixture"],
    apiKeyHealth: {
      extra_0: { status: "invalid", failures: 2, rejectedAt: "2026-01-01T00:00:00.000Z" },
    },
  };
  recordKeyHealthStatus(403, creds(conn, psd), noopLog, undefined, workspaceDenied, null, 1);
  assert.equal(isCredentialHealthy(conn), false, "every configured key has a rejection verdict");
});

test("a served sibling overrides its stale stored rejection", () => {
  const conn = "kh-live-over-stored";
  const psd = {
    extraApiKeys: ["extra-fixture"],
    apiKeyHealth: {
      extra_0: { status: "invalid", failures: 2, rejectedAt: "2026-01-01T00:00:00.000Z" },
    },
  };
  recordKeyHealthStatus(
    200,
    creds(conn, { ...psd, selectedKeyId: "extra_0" }),
    noopLog,
    undefined,
    "",
    null,
    1
  );
  recordKeyHealthStatus(403, creds(conn, psd), noopLog, undefined, workspaceDenied, null, 2);
  assert.notEqual(isCredentialHealthy(conn), false, "the live extra key can still serve");
});

test("an actual executor extra-key replacement restarts only that key's ladder", () => {
  const conn = "kh-actual-extra-generation";
  const executor = new BaseExecutor("openai", { baseUrls: ["https://fixture.invalid"] });
  const first = creds(conn, { extraApiKeys: ["", "extra-old"], selectedKeyId: "extra_0" });
  assert.equal(executor.buildHeaders(first).Authorization, "Bearer extra-old");
  recordKeyHealthStatus(401, first, noopLog, undefined, "", null, 1);
  const before = getAllKeyHealth()[`${conn}:extra_0`];
  const second = creds(conn, { extraApiKeys: ["", "extra-new"], selectedKeyId: "extra_0" });
  assert.equal(executor.buildHeaders(second).Authorization, "Bearer extra-new");
  assert.equal(second.apiKey, first.apiKey, "rotation does not replace the primary apiKey field");
  recordKeyHealthStatus(401, second, noopLog, undefined, "", null, 2);
  const after = getAllKeyHealth()[`${conn}:extra_0`];
  assert.notEqual(after.generation, before.generation);
  assert.equal(after.failures, 1, "the old extra credential's failure count cannot carry over");
  assert.equal(after.status, "warning");
});

test("extra-only connections record the credential the executor actually used", () => {
  const conn = "kh-extra-only";
  touched.push(conn);
  const credentials = {
    connectionId: conn,
    apiKey: "",
    providerSpecificData: { extraApiKeys: ["extra-only-fixture"] },
  };
  const executor = new BaseExecutor("openai", { baseUrls: ["https://fixture.invalid"] });
  assert.equal(executor.buildHeaders(credentials).Authorization, "Bearer extra-only-fixture");
  recordKeyHealthStatus(403, credentials, noopLog, undefined, workspaceDenied, null, 1);
  assert.ok(getAllKeyHealth()[`${conn}:extra_0`]?.rejectedAt);
  assert.equal(isCredentialHealthy(conn), false);
});

for (const status of [402, 429]) {
  test(`per-model ${status} preserves key state, connection gate and persistence`, () => {
    const conn = `kh-per-model-${status}`;
    const credentials = { ...creds(conn), provider: "openai-compatible-chat-fixture" };
    recordKeyHealthStatus(401, credentials, noopLog, undefined, "", null, 1);
    const state = structuredClone(getAllKeyHealth());
    const gate = structuredClone(getCredentialHealth(conn));
    const writes: unknown[] = [];
    __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));
    recordKeyHealthStatus(status, credentials, noopLog, undefined, "quota exceeded", 30_000, 2);
    assert.deepEqual(getAllKeyHealth(), state);
    assert.deepEqual(getCredentialHealth(conn), gate);
    assert.deepEqual(writes, [], "model quota is not credential-health evidence");
  });
}

test("ordinary healthy successes do not write provider storage", () => {
  const conn = "kh-success-no-write";
  const writes: unknown[] = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));
  recordKeyHealthStatus(200, creds(conn), noopLog, undefined, "", null, 1);
  recordKeyHealthStatus(200, creds(conn), noopLog, undefined, "", null, 2);
  assert.equal(getAllKeyHealth()[`${conn}:primary`].totalRequests, 2);
  assert.deepEqual(writes, [], "do not turn every served request into a database write");
});

test("a successful recovery persists removal of the key's cooldown", () => {
  const conn = "kh-persist-cooldown-clear";
  const writes: Array<Record<string, { cooldownUntil?: string | null }>> = [];
  __setKeyHealthPersistenceSink((_id, health) => writes.push(structuredClone(health)));
  recordKeyHealthStatus(429, creds(conn), noopLog, undefined, "", 30_000, 1);
  assert.ok(writes[0].primary.cooldownUntil);
  recordKeyHealthStatus(200, creds(conn), noopLog, undefined, "", null, 2);
  assert.equal(writes.length, 2, "a real state recovery must be persisted");
  assert.equal(writes[1].primary.cooldownUntil, null);
});

test("loading a stale database snapshot cannot erase the applied dispatch sequence", () => {
  const conn = "kh-hydration-sequence";
  recordKeyHealthStatus(403, creds(conn), noopLog, undefined, workspaceDenied, null, 5);
  const before = structuredClone(getAllKeyHealth()[`${conn}:primary`]);
  syncHealthFromDB(conn, {
    primary: { ...before, lastSeq: undefined, rejectedAt: null, status: "active", failures: 0 },
  });
  recordKeyHealthStatus(200, creds(conn), noopLog, undefined, "", null, 4);
  assert.deepEqual(getAllKeyHealth()[`${conn}:primary`], before);
  assert.equal(isCredentialHealthy(conn), false);
});
