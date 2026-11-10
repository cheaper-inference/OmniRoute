/**
 * Provider failover must never replay a continuation on another provider.
 *
 * The ownership service already decides what counts as provider-bound history
 * (opaque reasoning, continuation ids, a response id, reasoning/tool items in
 * `input`) when it claims a Muse session; failover reuses that same predicate, so
 * the two cannot drift, and an already-owned Muse session is pinned as well.
 */

import assert from "node:assert/strict";
import test from "node:test";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("provider-failover-continuation");
const { resetStorage, seedConnection } = harness;
const { bodyCarriesBoundContinuation } =
  await import("../../src/sse/services/museSessionOwnership.ts");
const { museSessionIsOwned } = await import("../../src/sse/handlers/chat/museOwnership.ts");
const providersDb = await import("../../src/lib/db/providers.ts");

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("plain messages are not a bound continuation", () => {
  assert.equal(
    bodyCarriesBoundContinuation({
      model: "gpt-oss-120b",
      messages: [{ role: "user", content: "hello" }],
      input: [{ type: "message", role: "user", content: "hello" }],
    }),
    false
  );
});

for (const [label, body] of [
  ["previous_response_id", { previous_response_id: "resp_1" }],
  ["_omniroutePreviousResponseResumed", { _omniroutePreviousResponseResumed: true }],
  ["encrypted reasoning", { input: [{ type: "reasoning", encrypted_content: "gAAAA-x" }] }],
  ["item_reference", { input: [{ type: "item_reference", id: "item_1" }] }],
  ["tool call id", { input: [{ type: "function_call", call_id: "call_1", name: "f" }] }],
] as const) {
  test(`${label} is a bound continuation`, () => {
    assert.equal(bodyCarriesBoundContinuation(body as Record<string, unknown>), true);
  });
}

test("a Muse API-key install is never ownership-pinned", async () => {
  // "Preserve the existing unpinned behavior for Muse API-key connections."
  await seedConnection("muse-code", { name: "muse-apikey", apiKey: "mk-test" });
  assert.equal(
    await museSessionIsOwned({
      body: { model: "muse-spark-1.3-contributor" },
      headers: new Headers({ "x-session-id": "ses_apikey_1" }),
      apiKeyId: null,
    }),
    false
  );
});

test("a Muse OAuth session with a served owner is pinned", async () => {
  await providersDb.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "muse-oauth-1",
    accessToken: "ya29.test-1",
    refreshToken: "1//test-1",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
  });
  const body = { model: "muse-spark-1.3-contributor" };
  const headers = new Headers({ "x-session-id": "ses_oauth_1" });
  // No claim yet: nothing to keep the request on.
  assert.equal(await museSessionIsOwned({ body, headers, apiKeyId: null }), false);

  const { claimMuseOwner } = await import("../../src/sse/handlers/chat/museOwnership.ts");
  const owner = await claimMuseOwner({
    provider: "muse-code",
    model: "muse-spark-1.3-contributor",
    body,
    headers,
    apiKeyId: null,
    forcedConnectionId: null,
    allowedConnections: null,
    allowUnavailable: false,
  });
  assert.ok(owner && !(owner instanceof Response), "expected a claimed Muse owner");
  assert.equal(await museSessionIsOwned({ body, headers, apiKeyId: null }), true);
});
