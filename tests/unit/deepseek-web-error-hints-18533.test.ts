import assert from "node:assert/strict";
import test from "node:test";

import {
  DeepSeekWebExecutor,
  sessionCache,
  tokenCache,
} from "../../open-sse/executors/deepseek-web.ts";

import { deepSeekHashV1 } from "../../open-sse/lib/deepseek-pow-hash.js";

const salt = "test-salt";
const expiry = 42;
const challenge = {
  algorithm: "DeepSeekHashV1",
  challenge: deepSeekHashV1(`${salt}_${expiry}_0`),
  salt,
  signature: "test-signature",
  difficulty: 1,
  expire_at: expiry,
  expire_after: 300000,
  target_path: "/api/v0/chat/completion",
};

function hint(reason = "rate_limit_reached", type = "error") {
  return `event: hint\r\ndata: ${JSON.stringify({
    type,
    content: "private upstream detail",
    clear_response: true,
    finish_reason: reason,
  })}\r\n\r\n`;
}

const finished =
  'data: {"v":{"response":{"fragments":[{"type":"RESPONSE","content":"Answer"}]}}}\n\n' +
  'data: {"p":"response/status","v":"FINISHED"}\n\n';

async function withExecutor(events: string, run: (executor: DeepSeekWebExecutor) => Promise<void>) {
  const originalFetch = globalThis.fetch;
  let completions = 0;
  tokenCache.clear();
  sessionCache.clear();
  globalThis.fetch = async (input) => {
    const path = new URL(input instanceof Request ? input.url : String(input)).pathname;
    const json = (value: unknown) => Response.json({ code: 0, data: { biz_data: value } });
    if (path.endsWith("/users/current")) return json({ token: "test-token" });
    if (path.endsWith("/chat_session/create")) return json({ chat_session: { id: "test-chat" } });
    if (path.endsWith("/chat_session/delete")) return Response.json({ code: 0 });
    if (path.endsWith("/create_pow_challenge")) return json({ challenge });
    assert.ok(path.endsWith("/chat/completion"), "unexpected upstream endpoint");
    completions++;
    const bytes = new TextEncoder().encode(events);
    return new Response(
      new ReadableStream({
        start(controller) {
          for (let offset = 0; offset < bytes.length; offset += 7) {
            controller.enqueue(bytes.slice(offset, offset + 7));
          }
          controller.close();
        },
      }),
      { headers: { "Content-Type": "text/event-stream" } }
    );
  };
  try {
    await run(new DeepSeekWebExecutor());
    assert.equal(completions, 1, "error hints must not trigger inference replay");
  } finally {
    globalThis.fetch = originalFetch;
    tokenCache.clear();
    sessionCache.clear();
  }
}

function input(stream: boolean) {
  return {
    model: "deepseek-chat",
    body: { messages: [{ role: "user", content: "Test prompt" }] },
    stream,
    credentials: { apiKey: "test-api-key" },
    signal: AbortSignal.timeout(10000),
  };
}

test("DeepSeek rate-limit hints return HTTP 429 instead of missing-FINISHED 502", async () => {
  await withExecutor(hint(), async (executor) => {
    const result = await executor.execute(input(false));
    assert.equal(result.response.status, 429);
    const body = await result.response.text();
    assert.ok(body.includes("DeepSeek upstream rate limit reached"));
    assert.ok(!body.includes("private upstream detail"));
    assert.ok(!body.includes("no FINISHED"));
  });
});

test("DeepSeek error hints fail an already-started stream instead of emitting a successful stop", async () => {
  await withExecutor(hint(), async (executor) => {
    const result = await executor.execute(input(true));
    await assert.rejects(result.response.text(), (error: Error) => {
      assert.equal(error.message, "DeepSeek upstream rate limit reached");
      return true;
    });
  });
});

test("unknown error hints remain safe failures even when FINISHED follows", async () => {
  await withExecutor(hint("unknown_reason") + finished, async (executor) => {
    const result = await executor.execute(input(false));
    assert.equal(result.response.status, 502);
    const body = await result.response.text();
    assert.ok(body.includes("DeepSeek upstream rejected the request"));
    assert.ok(!body.includes("private upstream detail"));
  });
});

test("informational hints do not prevent the following normal completion", async () => {
  await withExecutor(hint("rate_limit_reached", "info") + finished, async (executor) => {
    const result = await executor.execute(input(false));
    assert.equal(result.response.status, 200);
    const body = await result.response.json();
    assert.ok(body.choices[0].message.content.includes("Answer"));
    assert.ok(!JSON.stringify(body).includes("private upstream detail"));
  });
});
