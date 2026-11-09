// In-flight dedup shares ONE upstream call and its response between every joiner, so the
// dedup key must include the provider connection. Two identical non-stream requests from the
// same API key, pinned to different accounts, must each reach their own account.
import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const h = await createChatPipelineHarness("dedup-per-connection");
const originalFetch = globalThis.fetch;
let tokens: string[] = [];

test.beforeEach(async () => {
  await h.resetStorage();
  tokens = [];
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    tokens.push((new Headers(init.headers).get("authorization") || "").replace(/^Bearer\s+/i, ""));
    await new Promise((resolve) => setTimeout(resolve, 300));
    return h.buildOpenAIResponse("ok");
  }) as typeof fetch;
});
test.afterEach(() => {
  globalThis.fetch = originalFetch;
});
test.after(() => h.cleanup());

const body = {
  model: "openai/gpt-4o-mini",
  stream: false,
  temperature: 0,
  messages: [{ role: "user", content: "same prompt" }],
};

async function sendPair(firstPin: string, secondPin: string) {
  const [first, second] = await Promise.all([
    h.handleChat(h.buildRequest({ headers: { "x-omniroute-connection": firstPin }, body })),
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 40));
      return h.handleChat(
        h.buildRequest({ headers: { "x-omniroute-connection": secondPin }, body })
      );
    })(),
  ]);
  await first.text();
  await second.text();
  return [first, second];
}

test("identical requests pinned to different accounts do not share one upstream call", async () => {
  const a = await h.seedConnection("openai", { name: "acct-a", priority: 1 });
  const b = await h.seedConnection("openai", { name: "acct-b", priority: 2 });

  const [ra, rb] = await sendPair(a.id, b.id);

  assert.equal(ra.status, 200);
  assert.equal(rb.status, 200);
  assert.equal(
    tokens.length,
    2,
    "request pinned to account B joined account A's in-flight call and never reached B"
  );
  assert.notEqual(tokens[0], tokens[1], "both upstream calls used the same account credential");
});

test("identical requests pinned to the same account still share one upstream call", async () => {
  const a = await h.seedConnection("openai", { name: "acct-a", priority: 1 });
  await h.seedConnection("openai", { name: "acct-b", priority: 2 });

  const [r1, r2] = await sendPair(a.id, a.id);

  assert.equal(r1.status, 200);
  assert.equal(r2.status, 200);
  assert.equal(tokens.length, 1, "dedup on the same connection must keep working");
});
