// A 400 is how upstreams reject the caller's own input, and many of them quote that
// input back in error.message. A credit phrase inside such an echo is caller text, not
// a billing verdict: it must not park a shared connection as credits_exhausted (or
// classify as QUOTA_EXHAUSTED). On 400 a credit signal counts only when the structured
// error code is a credit code, or the provider is one whose documented 400 credit form
// is message-only (command-code, bai, openai-compatible-*). Other statuses keep the
// plain text match.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("credits-signal-400-status-gate");
const providersDb = await import("../../src/lib/db/providers.ts");
const { checkFallbackError } = await import("../../open-sse/services/accountFallback.ts");
const { classifyProviderError, PROVIDER_ERROR_TYPES } =
  await import("../../open-sse/services/errorClassifier.ts");
const { resolveTerminalConnectionStatus } =
  await import("../../src/sse/services/authTerminalStatus.ts");
const { isCreditsExhaustedForStatus } =
  await import("../../open-sse/services/accountFallback/creditsExhaustedForStatus.ts");

const originalFetch = globalThis.fetch;
const ECHO_MARKER = "ECHO-MARKER-REQUEST";

// Typed invalid_request_error: covered by the request-scoped guard in chat.ts, but not
// by the provider-failure classification in chatCore.
const TYPED_ECHO_400 = {
  error: {
    message: "Unknown parameter: 'your credit balance is too low'.",
    type: "invalid_request_error",
  },
};
// Matches no PARAM_VALIDATION_PATTERNS / MALFORMED_REQUEST_PATTERNS entry and carries
// no request-scoped type, so the chat.ts guard does not apply either.
const UNTYPED_ECHO_400 = {
  error: {
    message: "Invalid value 'your credit balance is too low' for model",
    type: "api_error",
  },
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => h.cleanup());

function terminalFor(status: number, text: string, provider: string) {
  const result = checkFallbackError(status, text, 0, "gpt-4o-mini", provider);
  const terminal = result.shouldFallback
    ? resolveTerminalConnectionStatus(
        status,
        result,
        classifyProviderError(status, text, provider),
        provider,
        false,
        text
      )
    : null;
  return { result, terminal };
}

function stubUpstream(echoBody: unknown) {
  const calls = { echo: 0, clean: 0 };
  globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
    const sent = typeof init?.body === "string" ? init.body : "";
    if (sent.includes(ECHO_MARKER)) {
      calls.echo++;
      return new Response(JSON.stringify(echoBody), {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }
    calls.clean++;
    return h.buildOpenAIResponse("served");
  }) as typeof fetch;
  return calls;
}

function chatRequest(content: string) {
  return h.buildRequest({
    body: {
      model: "openai/gpt-4o-mini",
      stream: false,
      messages: [{ role: "user", content }],
    },
  });
}

for (const [label, echoBody] of [
  ["typed invalid_request_error", TYPED_ECHO_400],
  ["untyped 400 outside the param-validation patterns", UNTYPED_ECHO_400],
] as const) {
  test(`${label}: a caller-echoed credit phrase never parks a shared openai connection`, async () => {
    await h.resetStorage();
    const conns = [];
    for (let i = 0; i < 3; i++) {
      conns.push(await h.seedConnection("openai", { name: `shared-${i}` }));
    }
    const calls = stubUpstream(echoBody);

    for (let i = 0; i < 3; i++) {
      const res = await h.handleChat(chatRequest(`hello ${ECHO_MARKER} ${i}`));
      await res.text();
    }
    assert.ok(calls.echo >= 3, `expected the echo requests to reach upstream, got ${calls.echo}`);

    for (const conn of conns) {
      const after = await providersDb.getProviderConnectionById(conn.id);
      assert.notEqual(after?.testStatus, "credits_exhausted", `connection ${after?.name} parked`);
    }

    const clean = await h.handleChat(chatRequest("a clean request"));
    const body = await clean.text();
    assert.equal(clean.status, 200, `clean request was not served: ${body}`);
    assert.ok(calls.clean >= 1);
  });
}

test("control: a 400 whose structured code is a credit code still parks the openai connection", async () => {
  await h.resetStorage();
  const conn = await h.seedConnection("openai", { name: "dry-key" });
  stubUpstream({
    error: {
      message: "You exceeded your current quota, please check your plan and billing details.",
      type: "insufficient_quota",
      code: "insufficient_quota",
    },
  });

  const res = await h.handleChat(chatRequest(`hello ${ECHO_MARKER}`));
  await res.text();

  const after = await providersDb.getProviderConnectionById(conn.id);
  assert.equal(after?.testStatus, "credits_exhausted");
});

test("echoed 400 shapes are neither QUOTA_EXHAUSTED nor terminal for openai", () => {
  for (const body of [TYPED_ECHO_400, UNTYPED_ECHO_400]) {
    const text = JSON.stringify(body);
    assert.notEqual(
      classifyProviderError(400, text, "openai"),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED,
      text
    );
    const { result, terminal } = terminalFor(400, text, "openai");
    assert.notEqual(result.creditsExhausted, true, text);
    assert.equal(terminal, null, text);
  }
});

test("control: a real 402 insufficient_quota still parks", () => {
  const text = JSON.stringify({
    error: { message: "You exceeded your current quota.", code: "insufficient_quota" },
  });
  assert.equal(classifyProviderError(402, text, "openai"), PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED);
  assert.equal(terminalFor(402, text, "openai").terminal, "credits_exhausted");
});

test("control: other statuses keep the plain text match", () => {
  for (const status of [401, 402, 403]) {
    assert.equal(
      isCreditsExhaustedForStatus(status, "openai", "your credit balance is too low"),
      true
    );
  }
});

test("control: a 400 with a structured credit code still parks on openai", () => {
  for (const code of ["insufficient_user_quota", "insufficient_quota", "credit_balance_too_low"]) {
    const text = JSON.stringify({ error: { message: "billing problem", code } });
    const withSignal = JSON.stringify({ error: { message: `${code}: account is dry`, code } });
    assert.equal(isCreditsExhaustedForStatus(400, "openai", withSignal), true, code);
    assert.equal(
      classifyProviderError(400, withSignal, "openai"),
      PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
    );
    assert.equal(terminalFor(400, withSignal, "openai").terminal, "credits_exhausted", code);
    // The explicit structured code wins even when only the message carries the phrase.
    assert.equal(
      isCreditsExhaustedForStatus(400, "openai", "insufficient balance", code),
      true,
      code
    );
    // The code alone (localized or generic message) is enough: it sits in the body.
    assert.equal(isCreditsExhaustedForStatus(400, "openai", text), true, code);
  }
  // A credit phrase inside the message with an unrelated code is still an echo.
  const echoedWithOtherCode = JSON.stringify({
    error: { message: "Unknown parameter: 'insufficient_quota'.", code: "unknown_parameter" },
  });
  assert.equal(isCreditsExhaustedForStatus(400, "openai", echoedWithOtherCode), false);
});

test("control: documented message-only 400 credit forms still classify", () => {
  const commandCode =
    "You have insufficient credits to make this request. Please purchase more credits to continue using the service.";
  assert.equal(isCreditsExhaustedForStatus(400, "command-code", commandCode), true);
  assert.equal(
    classifyProviderError(400, commandCode, "command-code"),
    PROVIDER_ERROR_TYPES.QUOTA_EXHAUSTED
  );
  assert.equal(terminalFor(400, commandCode, "command-code").terminal, "credits_exhausted");

  const bai = "[400]: credit insufficient balance: balance=0 required=6792";
  assert.equal(isCreditsExhaustedForStatus(400, "bai", bai), true);
  assert.equal(checkFallbackError(400, bai, 0, "m", "bai").shouldFallback, true);

  for (const provider of ["openai-compatible-chat-123", "openai-compatible-my-gateway"]) {
    assert.equal(isCreditsExhaustedForStatus(400, provider, "credits exhausted for model x"), true);
  }
  // The allow-list is the prefix, not a substring anywhere in the id.
  assert.equal(
    isCreditsExhaustedForStatus(400, "my-openai-compatible-x", "credits exhausted"),
    false
  );
});
