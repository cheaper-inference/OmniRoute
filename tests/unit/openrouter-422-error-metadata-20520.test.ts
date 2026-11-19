import test from "node:test";
import assert from "node:assert/strict";

const { parseUpstreamError } = await import("../../open-sse/utils/error.ts");

const OPENROUTER_422 = {
  error: {
    message: "Provider returned error",
    code: 422,
    metadata: {
      raw: '{"message":"tools.0.function.parameters: invalid JSON schema"}',
      provider_name: "Cohere",
    },
  },
};

const mk = (body: unknown, status = 422) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

test("#20520: OpenRouter metadata.raw / provider_name surface in the parsed message", async () => {
  const parsed = await parseUpstreamError(mk(OPENROUTER_422), "openrouter");
  assert.equal(parsed.statusCode, 422);
  assert.match(parsed.message, /Provider returned error/);
  assert.match(parsed.message, /Cohere/);
  assert.match(parsed.message, /invalid JSON schema/);
});

test("#20520: metadata suffix is bounded", async () => {
  const body = {
    error: { message: "Provider returned error", metadata: { raw: "x".repeat(5000) } },
  };
  const parsed = await parseUpstreamError(mk(body), "openrouter");
  assert.ok(parsed.message.length < 600, `length ${parsed.message.length}`);
});

test("#20520: errors without metadata keep the plain message", async () => {
  const parsed = await parseUpstreamError(
    mk({ error: { message: "bad request" } }, 400),
    "openrouter"
  );
  assert.equal(parsed.message, "bad request");
});
