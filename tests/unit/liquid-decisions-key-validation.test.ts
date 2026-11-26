/**
 * A Liquid AI key can be issued for the decisions API only: on 2026-11-26 a fresh key
 * answered 401 "Could not validate credentials" on inference.liquid.ai (models, chat)
 * and 200 on api.liquid.ai/decisions/v1/systemone. Validating it against chat alone
 * blocked saving the connection that POST /v1/systemone liquid/<model> needs.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateProviderApiKey } = await import("../../src/lib/providers/validation.ts");

const DECISIONS_URL = "https://api.liquid.ai/decisions/v1/systemone";

type Call = { url: string; method: string; body: string | null; auth: string | null };

function mockLiquid(handlers: { chat: number; decisions: number }) {
  const calls: Call[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = input instanceof Request ? input.url : String(input);
    const headers = new Headers(init.headers);
    calls.push({
      url,
      method: init.method || "GET",
      body: typeof init.body === "string" ? init.body : null,
      auth: headers.get("authorization"),
    });
    if (url.startsWith(DECISIONS_URL)) {
      return handlers.decisions === 200
        ? Response.json({
            model: "d1",
            answers: { ping: { type: "noul", noul: 0.5 } },
            usage: { input_tokens: 10, output_tokens: 0 },
          })
        : Response.json({ error: { code: "invalid_api_key" } }, { status: handlers.decisions });
    }
    return handlers.chat === 200
      ? Response.json({ data: [{ id: "lfm3-1.7b" }] })
      : Response.json({ detail: "Could not validate credentials" }, { status: handlers.chat });
  }) as typeof fetch;
  return { calls, restore: () => (globalThis.fetch = originalFetch) };
}

test("a decisions-only Liquid key is valid", async () => {
  const mock = mockLiquid({ chat: 401, decisions: 200 });
  try {
    const result = await validateProviderApiKey({
      provider: "liquid",
      apiKey: "liquid_decisions_only",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.equal(result.error, null);
    assert.equal(result.method, "liquid_decisions");
    assert.match(String(result.warning), /decisions/i);
    const probe = mock.calls.find((call) => call.url === DECISIONS_URL);
    assert.ok(probe, "the decisions API must be probed");
    assert.equal(probe.method, "POST");
    assert.equal(probe.auth, "Bearer liquid_decisions_only");
    const body = JSON.parse(String(probe.body));
    assert.equal(body.model, "d1");
    assert.equal(typeof body.state, "string");
    assert.ok(body.questions && typeof body.questions === "object");
  } finally {
    mock.restore();
  }
});

test("a Liquid key refused by both APIs stays invalid", async () => {
  const mock = mockLiquid({ chat: 401, decisions: 401 });
  try {
    const result = await validateProviderApiKey({
      provider: "liquid",
      apiKey: "liquid_bad",
      providerSpecificData: {},
    });
    assert.equal(result.valid, false);
    assert.equal(result.error, "Invalid API key");
  } finally {
    mock.restore();
  }
});

test("a chat-capable Liquid key is valid without a decisions call", async () => {
  const mock = mockLiquid({ chat: 200, decisions: 401 });
  try {
    const result = await validateProviderApiKey({
      provider: "liquid",
      apiKey: "liquid_chat",
      providerSpecificData: {},
    });
    assert.equal(result.valid, true);
    assert.equal(
      mock.calls.some((call) => call.url === DECISIONS_URL),
      false
    );
  } finally {
    mock.restore();
  }
});
