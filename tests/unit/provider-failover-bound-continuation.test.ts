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
  ["a tool call with no call_id", { input: [{ type: "function_call", name: "f" }] }],
] as const) {
  test(`${label} is a bound continuation`, () => {
    assert.equal(bodyCarriesBoundContinuation(body as Record<string, unknown>), true);
  });
}

test("plain tool history stays adoptable, so it does not pin the provider", () => {
  // The ownership claim can adopt a call that carries its `call_id`; failover must
  // keep the same boundary or an agentic request could never fail over at all.
  assert.equal(
    bodyCarriesBoundContinuation({
      input: [
        { type: "function_call", call_id: "call_1", name: "read" },
        { type: "function_call_output", call_id: "call_1", output: "ok" },
      ],
      messages: [{ role: "tool", tool_call_id: "call_1", content: "ok" }],
    }),
    false
  );
});

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

// Served by both fireworks and cerebras in the static catalogs: a bare id with an alternate.
const FAILOVER_MODEL = "gpt-oss-120b";

async function dispatchBareModel(firstAttempt: () => Response) {
  const { dispatchWithProviderFailover } =
    await import("../../src/sse/handlers/chat/providerFailover.ts");
  await seedConnection("fireworks");
  await seedConnection("cerebras");
  const dispatched: string[] = [];
  const response = await dispatchWithProviderFailover({
    modelStr: FAILOVER_MODEL,
    apiKeyInfo: null,
    request: null,
    pins: {},
    dispatch: async (target) => {
      dispatched.push(target);
      return dispatched.length === 1 ? firstAttempt() : Response.json({ ok: true });
    },
  });
  return { response, dispatched };
}

test("a plain 503 on a bare id still fails over to the other provider", async () => {
  const { response, dispatched } = await dispatchBareModel(() =>
    Response.json({ error: { message: "Service unavailable" } }, { status: 503 })
  );
  assert.equal(response.status, 200);
  assert.equal(dispatched.length, 2, `expected one failover, got ${dispatched.join(", ")}`);
});

test("a Muse owner-unavailable 503 is returned as is and never failed over", async () => {
  const { museOwnerUnavailable } = await import("../../src/sse/handlers/chat/museOwnership.ts");
  const owner = {
    scope: "ses_owner_unavailable",
    connectionId: "conn-owner",
    emptyRetries: 0,
    emptyOriginal: null,
  } as unknown as Parameters<typeof museOwnerUnavailable>[0];
  const { response, dispatched } = await dispatchBareModel(() => {
    const failClose = museOwnerUnavailable(owner, { allRateLimited: true });
    assert.ok(failClose, "a credential set without the owner must fail closed");
    return failClose;
  });
  assert.equal(response.status, 503);
  assert.match(await response.text(), /cross-account continuation is forbidden/);
  assert.deepEqual(dispatched, [FAILOVER_MODEL]);
});

test("a Muse ownership-claim 503 is returned as is and never failed over", async () => {
  // Not every ownership fail-close says "forbidden": this 503 reads like any outage, so
  // only an explicit marker keeps the dispatcher from replaying it on another provider.
  const { claimMuseOwner } = await import("../../src/sse/handlers/chat/museOwnership.ts");
  await providersDb.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "muse-oauth-claim",
    accessToken: "ya29.test-claim",
    refreshToken: "1//test-claim",
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
    isActive: true,
    testStatus: "active",
  });
  const claimed = await claimMuseOwner({
    provider: "muse-code",
    model: "muse-spark-1.3-contributor",
    body: { model: "muse-spark-1.3-contributor" },
    headers: new Headers({ "x-session-id": "ses_claim_503" }),
    apiKeyId: null,
    forcedConnectionId: null,
    // The key admits no Muse OAuth account, so the claim has no candidate.
    allowedConnections: ["conn-not-muse"],
    allowUnavailable: false,
  });
  assert.ok(claimed instanceof Response, "expected the claim to fail closed");
  assert.equal(claimed.status, 503);

  const { response, dispatched } = await dispatchBareModel(() => claimed);
  assert.equal(response.status, 503);
  assert.match(await response.text(), /No native OAuth Muse account is available/);
  assert.deepEqual(dispatched, [FAILOVER_MODEL]);
});
