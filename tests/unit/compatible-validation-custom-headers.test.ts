/**
 * Compatible-node connection tests send the connection's customHeaders, as the chat path does.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { validateOpenAICompatibleProvider } =
  await import("../../src/lib/providers/validation/openaiFormat.ts");
const { validateAnthropicCompatibleProvider, validateClaudeCodeCompatibleProvider } =
  await import("../../src/lib/providers/validation/anthropicFormat.ts");

const originalFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

const GATE = { "CF-Access-Client-Id": "id.access", "CF-Access-Client-Secret": "secret" };
const BASE = "https://gw.example.com/v1";

type Call = { url: string; headers: Headers };

/** Records every request; 403s anything without the gate headers, otherwise defers to `reply`. */
function recordingFetch(reply: (url: string) => Response): Call[] {
  const calls: Call[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit = {}) => {
    const headers = new Headers(init.headers);
    calls.push({ url: String(url), headers });
    const gated =
      headers.get("CF-Access-Client-Id") === GATE["CF-Access-Client-Id"] &&
      headers.get("CF-Access-Client-Secret") === GATE["CF-Access-Client-Secret"];
    return gated ? reply(String(url)) : new Response("Forbidden", { status: 403 });
  }) as typeof fetch;
  return calls;
}

const ok = () => Response.json({ data: [{ id: "m" }] });

test("openai-compatible models probe sends the connection's customHeaders", async () => {
  const calls = recordingFetch(ok);
  const result = await validateOpenAICompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: BASE, customHeaders: GATE },
  });
  assert.equal(result.valid, true, String(result.error));
  assert.equal(calls[0].headers.get("Authorization"), "Bearer sk-test");
});

test("openai-compatible chat fallback probe sends the connection's customHeaders", async () => {
  const calls = recordingFetch((url) => {
    if (url.endsWith("/models")) throw new Error("connection reset");
    return Response.json({ choices: [{ message: { content: "ok" } }] });
  });
  const result = await validateOpenAICompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: BASE, customHeaders: GATE, validationModelId: "m" },
  });
  assert.equal(result.valid, true, String(result.error));
  assert.ok(calls.some((c) => c.url.endsWith("/chat/completions")));
});

test("anthropic-compatible messages probe sends the connection's customHeaders", async () => {
  const calls = recordingFetch((url) =>
    url.endsWith("/models")
      ? new Response("not found", { status: 404 })
      : Response.json({ type: "message", content: [{ type: "text", text: "ok" }] })
  );
  const result = await validateAnthropicCompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: BASE, customHeaders: GATE },
  });
  assert.equal(result.valid, true, String(result.error));
  const post = calls.find((c) => c.url.endsWith("/messages"));
  assert.equal(post?.headers.get("x-api-key"), "sk-test");
});

test("claude-code-compatible probes send the connection's customHeaders", async () => {
  const calls = recordingFetch((url) =>
    url.includes("/models")
      ? new Response("not found", { status: 404 })
      : Response.json({ type: "message", content: [{ type: "text", text: "ok" }] })
  );
  const result = await validateClaudeCodeCompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: BASE, customHeaders: GATE },
  });
  assert.equal(result.valid, true, String(result.error));
  assert.ok(calls.length >= 2, "models and messages probes ran");
});

test("customHeaders never replace the probe's Authorization header", async () => {
  const calls = recordingFetch(ok);
  await validateOpenAICompatibleProvider({
    apiKey: "sk-test",
    providerSpecificData: { baseUrl: BASE, customHeaders: { ...GATE, Authorization: "Bearer x" } },
  });
  assert.equal(calls[0].headers.get("Authorization"), "Bearer sk-test");
});
