// A non-streaming provider failure must reach the client as the sanitized error body,
// never as the raw upstream Response (body fields, internal paths, Set-Cookie, other headers).
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("nonstream-provider-error-sanitized");
const originalFetch = globalThis.fetch;

const LEAKY_BODY = {
  error: {
    message: "upstream failed at /srv/app/node_modules/foo/index.js:10",
    type: "invalid_request_error",
    internal_trace: "TRACE-LEAK-MARKER",
  },
};

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => h.cleanup());

for (const stream of [true, false]) {
  test(`stream=${stream}: upstream 400 body and headers do not reach the client`, async () => {
    await h.resetStorage();
    globalThis.fetch = (async () =>
      new Response(JSON.stringify(LEAKY_BODY), {
        status: 400,
        headers: {
          "content-type": "application/json",
          "x-upstream-internal": "HDR-LEAK-MARKER",
          "set-cookie": "sid=UPSTREAM-COOKIE; Path=/",
        },
      })) as typeof fetch;
    await h.seedConnection("openai", { name: "sanitize-400" });

    const res = await h.handleChat(
      h.buildRequest({
        body: { model: "openai/gpt-4o-mini", stream, messages: [{ role: "user", content: "hi" }] },
      })
    );
    const text = await res.text();

    assert.equal(res.status, 400);
    assert.ok(
      !text.includes("TRACE-LEAK-MARKER"),
      `raw upstream body field reached the client: ${text}`
    );
    assert.ok(!text.includes("node_modules"), `internal path reached the client: ${text}`);
    assert.equal(res.headers.get("set-cookie"), null, "upstream Set-Cookie reached the client");
    assert.equal(
      res.headers.get("x-upstream-internal"),
      null,
      "upstream header reached the client"
    );
    assert.equal(JSON.parse(text).error?.type, "invalid_request_error");
  });
}

test("stream=false: upstream Retry-After still reaches the client on a 429", async () => {
  await h.resetStorage();
  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: { message: "slow down", type: "rate_limit_error" } }), {
      status: 429,
      headers: { "content-type": "application/json", "retry-after": "7" },
    })) as typeof fetch;
  await h.seedConnection("openai", { name: "sanitize-429" });

  const res = await h.handleChat(
    h.buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "hi" }],
      },
    })
  );
  await res.text();

  assert.equal(res.status, 429);
  assert.ok(res.headers.get("retry-after"), "Retry-After hint was dropped");
});
