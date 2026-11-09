/**
 * A capability gap (HTTP 501, or gRPC Unimplemented behind a 5xx) means "this target cannot
 * serve this kind of request", for example a rerank call to a server without a reranker.
 * It must skip to the next target without cooling the connection or counting a failure.
 * A request-size error (context size, gRPC message limit) is rejected by the next target
 * too, so it must not be retried and must not cool the account.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-capability-gap-501-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const accountFallback = await import("../../open-sse/services/accountFallback.ts");
const { checkFallbackError } = accountFallback;

const UNIMPLEMENTED_BODY = "rpc error: code = Unimplemented desc = method Rerank not implemented";
const GRPC_SIZE_BODY =
  "rpc error: code = ResourceExhausted desc = grpc: received message larger than max (5000000 vs. 4194304)";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("HTTP 501 is a capability gap: skip the target, no cooldown, no breaker", () => {
  const result = checkFallbackError(501, "Not Implemented", 0, "bge-reranker", "openai");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.skipProviderBreaker, true);
  assert.equal(result.permanent, undefined);
});

test("HTTP 501 with an empty body is a capability gap too", () => {
  const result = checkFallbackError(501, "", 0, "bge-reranker", "openai");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
});

test("gRPC Unimplemented behind a 500 is a capability gap", () => {
  const result = checkFallbackError(500, UNIMPLEMENTED_BODY, 0, "bge-reranker", "openai");
  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.skipProviderBreaker, true);
});

test("a plain 500 and 503 keep their transient cooldown", () => {
  for (const status of [500, 502, 503]) {
    const result = checkFallbackError(status, "internal error", 0, "gpt-5", "openai");
    assert.equal(result.shouldFallback, true, `status ${status}`);
    assert.ok(result.cooldownMs > 0, `status ${status} keeps a cooldown`);
    assert.notEqual(result.skipProviderBreaker, true, `status ${status}`);
  }
});

test("a gRPC message-size error behind a 500 is not retried and takes no cooldown", () => {
  const result = checkFallbackError(500, GRPC_SIZE_BODY, 0, "llama", "openai");
  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 0);
  assert.equal(result.skipProviderBreaker, true);
});

test("a context-size rejection behind a 500 is not retried and takes no cooldown", () => {
  const result = checkFallbackError(
    500,
    "the request exceeds the available context size, try increasing it",
    0,
    "llama",
    "openai"
  );
  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 0);
});

test("a context-size rejection behind a 400 stays a non-retried request error", () => {
  const result = checkFallbackError(
    400,
    "the request exceeds the available context size, try increasing it",
    0,
    "llama",
    "openai"
  );
  assert.equal(result.shouldFallback, false);
  assert.equal(result.cooldownMs, 0);
});

test("a 501 does not cool or mark the connection", async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  accountFallback.clearAllModelLockouts();
  const conn = (await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-capability-gap-test",
    isActive: true,
    testStatus: "active",
  })) as unknown as { id: string };

  const result = await auth.markAccountUnavailable(
    conn.id,
    501,
    "Not Implemented",
    "openai",
    "bge-reranker"
  );

  assert.equal(result.shouldFallback, true);
  assert.equal(result.cooldownMs, 0);
  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after?.testStatus, "active");
  assert.ok(!after?.rateLimitedUntil, "no connection cooldown");
  assert.equal(accountFallback.isModelLocked("openai", conn.id, "bge-reranker"), false);
});
