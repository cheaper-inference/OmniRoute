/**
 * Decision routing, step 2: the one outbound path every network decider uses.
 * Bounded body (64 KB), redirects refused, no retries, timeout and caller abort,
 * status-only failures (an upstream body can echo the prompt or the key).
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  MAX_DECISION_RESPONSE_BYTES,
  postDecisionJson,
  readBoundedJson,
  type DecisionTransport,
} from "../../../open-sse/services/decision/transport.ts";
import { DECISION_MODEL_REQUEST_HEADER } from "../../../open-sse/services/decision/types.ts";

const ok = (data: unknown) => Response.json(data);

test("readBoundedJson parses a small body and refuses anything above 64 KB", async () => {
  assert.equal(MAX_DECISION_RESPONSE_BYTES, 64 * 1024);
  assert.deepEqual(await readBoundedJson(ok({ a: 1 })), { a: 1 });
  const huge = new Response("x".repeat(MAX_DECISION_RESPONSE_BYTES + 1));
  await assert.rejects(readBoundedJson(huge), /oversized/);
  await assert.rejects(readBoundedJson(new Response("not json")), /invalid_json/);
});

test("posts JSON with the marker header, redirect:error and the timeout", async () => {
  let seen: Parameters<DecisionTransport>[1] | undefined;
  let seenUrl = "";
  const result = await postDecisionJson({
    url: "https://decider.invalid/v1/systemone",
    headers: { Authorization: "Bearer k" },
    body: { hello: "world" },
    timeoutMs: 700,
    transport: async (url, init) => {
      seenUrl = url;
      seen = init;
      return ok({ answer: 42 });
    },
  });
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.deepEqual(result.data, { answer: 42 });
  assert.equal(seenUrl, "https://decider.invalid/v1/systemone");
  assert.equal(seen?.method, "POST");
  assert.equal(seen?.redirect, "error");
  assert.equal(seen?.timeoutMs, 700);
  assert.equal(seen?.headers["Content-Type"], "application/json");
  assert.equal(seen?.headers[DECISION_MODEL_REQUEST_HEADER], "1");
  assert.equal(seen?.headers.Authorization, "Bearer k");
  assert.equal(seen?.body, JSON.stringify({ hello: "world" }));
});

test("non-2xx maps to http_error with the status only, never the body", async () => {
  const result = await postDecisionJson({
    url: "https://decider.invalid/x",
    headers: {},
    body: {},
    timeoutMs: 500,
    transport: async () => new Response("echo sk-secret prompt", { status: 401 }),
  });
  assert.deepEqual(
    { ok: result.ok, reason: !result.ok && result.reason },
    {
      ok: false,
      reason: "http_error",
    }
  );
  assert.equal(!result.ok && result.status, 401);
  assert.doesNotMatch(JSON.stringify(result), /sk-secret|prompt/);
});

test("a hung transport is aborted at the timeout", async () => {
  let aborted = false;
  const result = await postDecisionJson({
    url: "https://decider.invalid/x",
    headers: {},
    body: {},
    timeoutMs: 20,
    transport: (_url, init) =>
      new Promise((_resolve, reject) => {
        init.signal.addEventListener("abort", () => {
          aborted = true;
          reject(Object.assign(new Error("aborted"), { name: "AbortError" }));
        });
      }),
  });
  assert.equal(aborted, true);
  assert.equal(!result.ok && result.reason, "timeout");
});

test("a caller abort cancels the call; an already-aborted signal never calls out", async () => {
  let calls = 0;
  const controller = new AbortController();
  controller.abort();
  const result = await postDecisionJson({
    url: "https://decider.invalid/x",
    headers: {},
    body: {},
    timeoutMs: 500,
    signal: controller.signal,
    transport: async () => {
      calls += 1;
      return ok({});
    },
  });
  assert.equal(calls, 0);
  assert.equal(!result.ok && result.reason, "timeout");
});

test("network errors, oversized and malformed bodies are failures, not throws", async () => {
  const fail = await postDecisionJson({
    url: "https://decider.invalid/x",
    headers: {},
    body: {},
    timeoutMs: 500,
    transport: async () => {
      throw new Error("ECONNREFUSED 10.0.0.1 sk-live");
    },
  });
  assert.equal(!fail.ok && fail.reason, "network_error");
  const big = await postDecisionJson({
    url: "https://decider.invalid/x",
    headers: {},
    body: {},
    timeoutMs: 500,
    transport: async () => new Response("x".repeat(MAX_DECISION_RESPONSE_BYTES * 2)),
  });
  assert.equal(!big.ok && big.reason, "invalid_response");
});

test("egress goes through safeOutboundFetch with the provider guard, no bare fetch (#14239)", () => {
  const source = readFileSync(
    new URL("../../../open-sse/services/decision/transport.ts", import.meta.url),
    "utf8"
  );
  assert.match(source, /import\("@\/shared\/network\/safeOutboundFetch"\)/);
  assert.match(source, /guard:\s*getProviderOutboundGuard\(\)/);
  assert.match(source, /retry:\s*false/);
  assert.match(source, /allowRedirect:\s*false/);
  assert.doesNotMatch(source, /\?\?\s*fetch\b/);
  assert.doesNotMatch(source, /globalThis\.fetch/);
});
