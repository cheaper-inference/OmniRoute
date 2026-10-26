// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";

const { PerplexityWebExecutor } = await import("../../open-sse/executors/perplexity-web.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/perplexityTlsClient.ts");

__setTlsFetchOverrideForTesting(async (url, opts) => {
  const res = await globalThis.fetch(url, opts);
  return {
    status: res.status,
    headers: res.headers,
    text: res.status === 200 ? null : await res.text(),
    body: res.status === 200 ? res.body : null,
  };
});

function okStream() {
  const body = 'event: message\r\ndata: {"status":"COMPLETED","blocks":[]}\r\n\r\n';
  return new Response(body, { status: 200, headers: { "Content-Type": "text/event-stream" } });
}

async function run(model) {
  let fetches = 0;
  const original = globalThis.fetch;
  globalThis.fetch = async () => {
    fetches += 1;
    return okStream();
  };
  try {
    const executor = new PerplexityWebExecutor();
    const out = await executor.execute({
      model,
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "test-cookie" },
      signal: AbortSignal.timeout(10000),
      log: null,
    });
    const res = out.response;
    return { status: res.status, body: await res.json(), fetches };
  } finally {
    globalThis.fetch = original;
  }
}

test("an unmapped model name is rejected locally and never reaches perplexity", async () => {
  const { status, body, fetches } = await run("pplx-deep-research");
  assert.equal(status, 404);
  assert.equal(body.error.code, "model_not_found");
  assert.equal(fetches, 0);
});

test("a mapped model still reaches perplexity, so a counter stuck at zero fails", async () => {
  const { fetches } = await run("pplx-sonar");
  assert.equal(fetches, 1);
});

test("the unmapped-model 404 goes through the shared error body and never echoes a credential", async () => {
  const secret = "sk-ant-api03-abcdefghijklmnopqrstuvwxyz0123456789";
  const { status, body, fetches } = await run(`pplx-${secret}`);
  assert.equal(status, 404);
  assert.equal(body.error.type, "invalid_request_error");
  assert.equal(body.error.code, "model_not_found");
  assert.match(body.error.message, /^Unknown model: /);
  assert.ok(!body.error.message.includes(secret), "credential-shaped model name must be redacted");
  assert.equal(fetches, 0);
});
