/**
 * Claude Code (and the Anthropic SDKs) only surface a 401 from `/v1/messages`
 * when the body uses Anthropic's error envelope:
 * `{ type: "error", error: { type: "authentication_error", message } }`.
 * The OpenAI-shaped `{ error: { code, message } }` body is shown as an opaque
 * failure instead. These tests pin the Anthropic envelope on both 401 layers
 * (the authz pipeline and the route-level guard) for `/v1/messages` and
 * `/v1/messages/count_tokens`, keep every other route on its current shape,
 * and check that no stack trace or internal path leaks into either body.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omr-anthropic-401-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "anthropic-401-test-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const pipeline = await import("../../src/server/authz/pipeline.ts");
const { enforceClientApiRouteAuth } = await import("../../src/shared/utils/clientApiRouteAuth.ts");
const envelope = await import("../../src/shared/utils/anthropicErrorEnvelope.ts");

const ORIGINAL_ENV = {
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  ROUTER_API_KEY: process.env.ROUTER_API_KEY,
  REQUIRE_API_KEY: process.env.REQUIRE_API_KEY,
};

const INVALID_KEY = "sk-not-a-real-omniroute-key";

function restoreEnv(name: keyof typeof ORIGINAL_ENV) {
  const value = ORIGINAL_ENV[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.beforeEach(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  delete process.env.OMNIROUTE_API_KEY;
  delete process.env.ROUTER_API_KEY;
  process.env.REQUIRE_API_KEY = "true";
  globalThis.__omnirouteShutdown = { init: false, shuttingDown: false, activeRequests: 0 };
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  restoreEnv("OMNIROUTE_API_KEY");
  restoreEnv("ROUTER_API_KEY");
  restoreEnv("REQUIRE_API_KEY");
});

function pipelineRequest(url: string, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest(url, { method: "GET", headers });
}

function routeRequest(url: string, headers: Record<string, string> = {}): Request {
  return new Request(url, { method: "POST", headers });
}

function assertNoLeak(rawBody: string) {
  assert.doesNotMatch(rawBody, /stack/i, "body must not carry a stack field");
  assert.doesNotMatch(rawBody, /\bat\s+\S+\s+\(/, "body must not carry stack frames");
  assert.doesNotMatch(rawBody, /\/home\/|\/src\/|\.ts:\d+/, "body must not carry source paths");
}

// ─── authz pipeline (first 401 layer) ────────────────────────────────────────

test("pipeline: invalid key on /v1/messages → Anthropic authentication_error envelope", async () => {
  const response = await pipeline.runAuthzPipeline(
    pipelineRequest("http://localhost/v1/messages", { "x-api-key": INVALID_KEY }),
    { enforce: true }
  );
  assert.equal(response.status, 401);
  const raw = await response.text();
  assert.deepEqual(JSON.parse(raw), {
    type: "error",
    error: { type: "authentication_error", message: "Invalid API key" },
  });
  assert.ok(response.headers.get("x-request-id"), "correlation id stays on the header");
  assert.equal(response.headers.get("x-omniroute-route-class"), "CLIENT_API");
  assertNoLeak(raw);
});

test("pipeline: keyless /api/v1/messages → Anthropic authentication_error envelope", async () => {
  const response = await pipeline.runAuthzPipeline(
    pipelineRequest("http://localhost/api/v1/messages"),
    { enforce: true }
  );
  assert.equal(response.status, 401);
  assert.deepEqual(await response.json(), {
    type: "error",
    error: { type: "authentication_error", message: "Authentication required" },
  });
});

test("pipeline: invalid key on /v1/messages/count_tokens → Anthropic envelope", async () => {
  const response = await pipeline.runAuthzPipeline(
    pipelineRequest("http://localhost/v1/messages/count_tokens", {
      authorization: `Bearer ${INVALID_KEY}`,
    }),
    { enforce: true }
  );
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.equal(body.type, "error");
  assert.equal(body.error.type, "authentication_error");
  assert.equal(body.error.message, "Invalid API key");
});

test("pipeline: invalid key on /v1/chat/completions keeps the existing AUTH_002 shape", async () => {
  const response = await pipeline.runAuthzPipeline(
    pipelineRequest("http://localhost/v1/chat/completions", {
      authorization: `Bearer ${INVALID_KEY}`,
    }),
    { enforce: true }
  );
  assert.equal(response.status, 401);
  const raw = await response.text();
  const body = JSON.parse(raw);
  assert.equal(body.type, undefined);
  assert.equal(body.error.code, "AUTH_002");
  assert.equal(body.error.message, "Invalid API key");
  assert.equal(body.error.correlation_id, response.headers.get("x-request-id"));
  assertNoLeak(raw);
});

test("pipeline: anthropic-version header on another route does not switch the 401 shape", async () => {
  const response = await pipeline.runAuthzPipeline(
    pipelineRequest("http://localhost/v1/responses", {
      "x-api-key": INVALID_KEY,
      "anthropic-version": "2023-06-01",
    }),
    { enforce: true }
  );
  assert.equal(response.status, 401);
  const body = await response.json();
  assert.equal(body.type, undefined);
  assert.equal(body.error.code, "AUTH_002");
});

// ─── route-level guard (second 401 layer) ────────────────────────────────────

test("route guard: invalid key on /api/v1/messages → Anthropic envelope", async () => {
  const rejection = await enforceClientApiRouteAuth(
    // Claude Code sends x-api-key with anthropic-version; extractApiKey() only
    // treats x-api-key as an identity when that header is present (#2225).
    routeRequest("http://localhost/api/v1/messages", {
      "x-api-key": INVALID_KEY,
      "anthropic-version": "2023-06-01",
    })
  );
  assert.ok(rejection);
  assert.equal(rejection.status, 401);
  assert.match(rejection.headers.get("content-type") || "", /application\/json/);
  const raw = await rejection.text();
  assert.deepEqual(JSON.parse(raw), {
    type: "error",
    error: { type: "authentication_error", message: "Invalid API key" },
  });
  assertNoLeak(raw);
});

test("route guard: keyless /v1/messages → Anthropic envelope", async () => {
  const rejection = await enforceClientApiRouteAuth(routeRequest("http://localhost/v1/messages"));
  assert.ok(rejection);
  assert.equal(rejection.status, 401);
  assert.deepEqual(await rejection.json(), {
    type: "error",
    error: { type: "authentication_error", message: "Authentication required" },
  });
});

test("route guard: invalid key on /api/v1/chat/completions keeps the OpenAI shape", async () => {
  const rejection = await enforceClientApiRouteAuth(
    routeRequest("http://localhost/api/v1/chat/completions", {
      authorization: `Bearer ${INVALID_KEY}`,
    })
  );
  assert.ok(rejection);
  assert.equal(rejection.status, 401);
  const raw = await rejection.text();
  const body = JSON.parse(raw);
  assert.equal(body.type, undefined);
  assert.equal(body.error.message, "Invalid API key");
  assertNoLeak(raw);
});

// ─── envelope helpers ────────────────────────────────────────────────────────

test("isAnthropicMessagesPath matches only the Messages endpoints", () => {
  for (const p of [
    "/v1/messages",
    "/api/v1/messages",
    "/api/v1/messages/",
    "/V1/Messages",
    "/v1/messages/count_tokens",
    "/api/v1/messages/count_tokens",
  ]) {
    assert.equal(envelope.isAnthropicMessagesPath(p), true, p);
  }
  for (const p of [
    "/v1/chat/completions",
    "/api/v1/responses",
    "/v1/messages-archive",
    "/api/v1/messages/batches",
    "/dashboard/messages",
    "",
  ]) {
    assert.equal(envelope.isAnthropicMessagesPath(p), false, p);
  }
});

test("anthropicErrorResponse sanitizes the message so no stack or path leaks", async () => {
  const leaky =
    "Invalid API key\n    at validate (/home/runner/omniroute/src/lib/db/apiKeys.ts:42:7)\n" +
    "    at async evaluate (/home/runner/omniroute/src/server/authz/policies/clientApi.ts:63:11)";
  const response = envelope.anthropicErrorResponse(401, "authentication_error", leaky);
  assert.equal(response.status, 401);
  const raw = await response.text();
  const body = JSON.parse(raw);
  assert.equal(body.type, "error");
  assert.equal(body.error.type, "authentication_error");
  assert.match(body.error.message, /^Invalid API key/);
  assert.deepEqual(Object.keys(body).sort(), ["error", "type"]);
  assert.deepEqual(Object.keys(body.error).sort(), ["message", "type"]);
  assertNoLeak(raw);
});
