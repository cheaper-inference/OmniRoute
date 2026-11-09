import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("cursor-entitlement-17167");
const { getExecutor } = await import("../../open-sse/executors/index.ts");
const { classifyCursorError } = await import("../../open-sse/executors/cursor/cursorErrors.ts");
const { connectEndStreamError } = await import("../../open-sse/executors/cursor/streamDriver.ts");
const { encodeBytes, encodeString } =
  await import("../../open-sse/utils/cursorAgentProtobuf/wire.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { hasPerModelFailureScope } =
  await import("../../open-sse/services/accountFallback/perModelFailureScope.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const executor = await getExecutor("cursor");
const originalExecute = executor.execute;
const { handleChat, buildRequest, settingsDb, buildOpenAIResponse } = harness;

const model = "fable-5";
const sibling = "composer-2.5";
const title = "Fable 5 is not included in your weekly usage";
const payload = Buffer.from(
  JSON.stringify({
    error: {
      code: "unknown",
      message: "Error",
      details: [
        {
          type: "aiserver.v1.ErrorDetails",
          value: encodeBytes(
            2,
            Buffer.concat([
              encodeString(1, title),
              encodeString(2, "Buy credits or switch to a Grok model to continue."),
            ])
          ).toString("base64"),
        },
      ],
    },
  })
);
function rejection() {
  const text = connectEndStreamError(payload);
  assert.ok(text);
  return classifyCursorError(text);
}

test.after(async () => {
  executor.execute = originalExecute;
  fallback.clearAllModelLockouts();
  fallback.clearProviderFailure("cursor");
  const { flushProxyLogsSync } = await import("../../src/lib/proxyLogger.ts");
  flushProxyLogsSync();
  await harness.cleanup();
});

test("real consumer classifier/scope accept the projected entitlement as model-only", () => {
  const out = rejection();
  const body = { error: { message: out.message, type: out.type } };
  assert.equal(
    classifyProviderError(out.status, body, "cursor"),
    PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND
  );
  assert.equal(
    hasPerModelFailureScope("cursor", model, false, out.status, JSON.stringify(body)),
    true
  );
});

test("isolated DB/chat pipeline: lock only the rejected model; sibling and second account stay selectable", async () => {
  await settingsDb.updateSettings({
    excludeTosAvoid: false,
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });
  const first = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "synthetic first",
    email: "first@example.invalid",
    accessToken: "synthetic-cursor-one",
    isActive: true,
    testStatus: "active",
    priority: 1,
  });
  const second = await providersDb.createProviderConnection({
    provider: "cursor",
    authType: "oauth",
    name: "synthetic second",
    email: "second@example.invalid",
    accessToken: "synthetic-cursor-two",
    isActive: true,
    testStatus: "active",
    priority: 2,
  });
  assert.equal(typeof first.id, "string");
  assert.equal(typeof second.id, "string");
  const firstId = String(first.id);
  const secondId = String(second.id);
  assert.notEqual(firstId, secondId);
  const before = await providersDb.getProviderConnectionById(firstId);
  const beforeSecond = await providersDb.getProviderConnectionById(secondId);
  const attempts: { model: string; connectionId?: string }[] = [];
  // Replace only execute's transport boundary. The response is produced by the
  // REAL Connect projection/classifier; routing, chatCore failure handling,
  // model locks and temporary DB persistence are NOT mocked. No real H2/auth.
  executor.execute = async (options) => {
    attempts.push({ model: options.model, connectionId: options.credentials.connectionId });
    const out = rejection();
    return {
      response:
        options.model === model
          ? new Response(JSON.stringify({ error: { message: out.message, type: out.type } }), {
              status: out.status,
              headers: { "Content-Type": "application/json" },
            })
          : buildOpenAIResponse("synthetic sibling success", sibling),
      url: "http://localhost/synthetic-cursor",
      headers: {},
      transformedBody: options.body,
    };
  };
  const request = (id: string, pin?: string) =>
    buildRequest({
      headers: pin ? { "x-omniroute-connection": pin } : {},
      body: {
        model: `cursor/${id}`,
        stream: false,
        messages: [{ role: "user", content: "synthetic entitlement test" }],
      },
    });
  const failed = await handleChat(request(model, firstId));
  await failed.text();
  assert.equal(failed.status, 404);
  assert.ok(attempts.length > 0);
  const lockedId = attempts[0].connectionId;
  assert.ok(lockedId);
  assert.equal(fallback.isModelLocked("cursor", lockedId, model), true);
  assert.equal(fallback.isModelLocked("cursor", lockedId, sibling), false);
  assert.equal(lockedId, firstId);
  const otherId = secondId;
  assert.equal(fallback.isModelLocked("cursor", otherId, model), false);
  for (const [id, original] of [
    [firstId, before],
    [secondId, beforeSecond],
  ] as const) {
    const after = await providersDb.getProviderConnectionById(id);
    for (const field of ["testStatus", "rateLimitedUntil", "isActive"] as const) {
      assert.equal(after[field], original[field], field);
    }
    assert.ok(!["banned", "expired", "credits_exhausted"].includes(after.testStatus));
  }
  assert.equal(fallback.isProviderInCooldown("cursor"), false);
  assert.equal(fallback.isProviderInCooldown("cursor", firstId), false);
  assert.equal(fallback.isProviderInCooldown("cursor", secondId), false);
  assert.equal(fallback.getProviderBreakerState("cursor")?.failureCount, 0);
  attempts.length = 0;
  const ok = await handleChat(request(sibling));
  await ok.text();
  assert.equal(ok.status, 200);
  assert.ok(attempts.some((attempt) => attempt.connectionId === lockedId));
  // Route the refused model again: the unlocked other connection must be used.
  attempts.length = 0;
  await (await handleChat(request(model))).text();
  assert.ok(attempts.length > 0);
  assert.ok(attempts.every((attempt) => attempt.connectionId === otherId));
});
