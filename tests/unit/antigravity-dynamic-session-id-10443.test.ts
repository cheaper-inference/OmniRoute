import assert from "node:assert/strict";
import { test } from "node:test";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import {
  deriveAntigravitySessionId,
  getAntigravitySessionId,
} from "../../open-sse/services/antigravityIdentity.ts";
import { closeSharedLoggerResource } from "../../src/shared/utils/loggerResource.ts";

test.after(async () => {
  await closeSharedLoggerResource();
});

test("getAntigravitySessionId derives a stable session ID from credentials for prompt-cache reuse", () => {
  const credentials = { email: "user@example.com", connectionId: "conn_123" };

  const id1 = getAntigravitySessionId(credentials);
  const id2 = getAntigravitySessionId(credentials);

  assert.equal(id1, id2, "same credentials must produce the same session ID for cache reuse");
  assert.equal(typeof id1, "string");
  assert.ok(id1.length > 0, "session ID must be non-empty");

  const explicitFallback = "custom-session-456";
  const idWithFallback = getAntigravitySessionId(credentials, explicitFallback);
  assert.equal(
    idWithFallback,
    explicitFallback,
    "explicit fallback session ID should take precedence"
  );
});

test("getAntigravitySessionId falls back to random ID when no credentials are available", () => {
  const id1 = getAntigravitySessionId();
  const id2 = getAntigravitySessionId();

  assert.equal(typeof id1, "string");
  assert.ok(id1.length > 0, "random session ID must be non-empty");

  // Without credentials, each call should produce a different random ID
  // (this is acceptable since there's no account to pin cache to)
  assert.notEqual(id1, id2, "without credentials, IDs should be random per call");
});

test("getAntigravitySessionId produces different IDs for different accounts", () => {
  const credsA = { email: "alice@example.com" };
  const credsB = { email: "bob@example.com" };

  const idA = getAntigravitySessionId(credsA);
  const idB = getAntigravitySessionId(credsB);

  assert.notEqual(idA, idB, "different accounts must produce different session IDs");
});

// #13125: the envelope session id stays account-derived for passthrough bodies, which reach
// the executor with no request.sessionId (the OpenAI translator sets its own).
const aliceCreds = { accessToken: "token-a", projectId: "project-a", email: "alice@example.com" };
const bobCreds = { accessToken: "token-b", projectId: "project-b", email: "bob@example.com" };

async function envelopeSessionId(
  model: string,
  credentials: typeof aliceCreds,
  parts: Array<Record<string, unknown>>,
  sessionId?: string
): Promise<string> {
  const executor = new AntigravityExecutor();
  const body = {
    request: {
      contents: [{ role: "user", parts }],
      ...(sessionId !== undefined && { sessionId }),
    },
  };
  const envelope = await executor.transformRequest(model, body, true, credentials);
  assert.ok(!(envelope instanceof Response), "transformRequest must build an envelope");
  return (envelope.request as { sessionId: string }).sessionId;
}

for (const model of ["gemini-2.5-flash", "claude-3-5-sonnet"]) {
  test(`${model}: two accounts with the same first prompt get different session IDs`, async () => {
    const parts = [{ text: "Same first prompt" }];

    const idA = await envelopeSessionId(model, aliceCreds, parts);
    const idB = await envelopeSessionId(model, bobCreds, parts);

    assert.notEqual(idA, idB, "a shared prompt must not collapse two accounts into one session");
    assert.equal(idA, getAntigravitySessionId(aliceCreds));
    assert.equal(idB, getAntigravitySessionId(bobCreds));
    assert.notEqual(idA, deriveAntigravitySessionId("Same first prompt"));
  });

  test(`${model}: one account keeps its session ID across different prompts`, async () => {
    const first = await envelopeSessionId(model, aliceCreds, [{ text: "First prompt" }]);
    const repeat = await envelopeSessionId(model, aliceCreds, [{ text: "First prompt" }]);
    const other = await envelopeSessionId(model, aliceCreds, [{ text: "Another prompt" }]);

    assert.equal(first, repeat);
    assert.equal(first, other, "the session ID follows the account, not the prompt");
  });

  test(`${model}: a request with no text part stays account-derived, not random`, async () => {
    const parts = [{ inlineData: { mimeType: "image/png", data: "aGVsbG8=" } }];

    const first = await envelopeSessionId(model, aliceCreds, parts);
    const second = await envelopeSessionId(model, aliceCreds, parts);

    assert.equal(first, getAntigravitySessionId(aliceCreds));
    assert.equal(first, second);
  });

  test(`${model}: an incoming request.sessionId still wins over the account ID`, async () => {
    const parts = [{ text: "First prompt" }];

    const id = await envelopeSessionId(model, aliceCreds, parts, "caller-session-789");

    assert.equal(id, "caller-session-789");
  });
}
