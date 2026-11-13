import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// After a model-family fallback the sibling model answered. The usage row and the cost must be
// attributed to the model that served, not the model the client asked for.
const h = await createChatPipelineHarness("nonstream-family-fallback-usage");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => h.cleanup());

const REQUESTED = "claude-opus-4-6-thinking";
const SERVED = "claude-opus-4-6";

function claudeReply(model: string) {
  return new Response(
    JSON.stringify({
      id: "msg_fixture",
      type: "message",
      role: "assistant",
      model,
      content: [{ type: "text", text: "served by the sibling" }],
      stop_reason: "end_turn",
      usage: { input_tokens: 10, output_tokens: 4 },
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

test("usage row names the family-fallback model that served the request", async () => {
  await h.resetStorage();
  await h.seedConnection("claude", { name: "family-fallback", apiKey: "k-family-fallback" });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  const sentModels: string[] = [];
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
    sentModels.push(String(sent.model));
    if (sent.model === REQUESTED) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: { type: "not_found_error", message: `model: ${REQUESTED}` },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return claudeReply(String(sent.model));
  }) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: `claude/${REQUESTED}`,
        stream: false,
        messages: [{ role: "user", content: `family ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  assert.equal(res.status, 200);
  assert.deepEqual(sentModels, [REQUESTED, SERVED], "the sibling must have served the request");
  const rows = (await h.waitFor(() => {
    const found = getDbInstance()
      .prepare("SELECT model, success FROM usage_history WHERE api_key_id = ?")
      .all(key.id) as Array<{ model: string; success: number }>;
    return found.length > 0 ? found : null;
  })) as Array<{ model: string; success: number }> | null;
  assert.equal(rows?.length, 1);
  assert.equal(rows?.[0].success, 1);
  assert.equal(rows?.[0].model, SERVED);
});

test("cost is priced for the family-fallback model that served the request", async () => {
  await h.resetStorage();
  await h.seedConnection("claude", { name: "family-fallback-cost", apiKey: "k-family-cost" });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  const pricing = await import("../../src/lib/db/settings.ts");
  // Different per-token prices, so the cost row shows which model was priced.
  await pricing.updatePricing({
    claude: {
      [REQUESTED]: { input: 100, output: 100 },
      [SERVED]: { input: 1, output: 1 },
    },
  });
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
    if (sent.model === REQUESTED) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: { type: "not_found_error", message: `model: ${REQUESTED}` },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return claudeReply(String(sent.model));
  }) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: `claude/${REQUESTED}`,
        stream: false,
        messages: [{ role: "user", content: `family cost ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  assert.equal(res.status, 200);
  assert.ok(res.headers.get("x-omniroute-response-cost"), "cost header present");
  const cost = Number(res.headers.get("x-omniroute-response-cost"));
  // 10 input + 4 output tokens at 1 USD per million each = 0.000014; at 100 it would be 0.0014.
  assert.ok(cost > 0 && cost < 0.0001, `priced as the requested model: ${cost}`);
});

test("streaming: usage row names the family-fallback model that served the request", async () => {
  await h.resetStorage();
  await h.seedConnection("claude", { name: "family-fallback-stream", apiKey: "k-family-stream" });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
    if (sent.model === REQUESTED) {
      return new Response(
        JSON.stringify({
          type: "error",
          error: { type: "not_found_error", message: `model: ${REQUESTED}` },
        }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    const events = [
      [
        "message_start",
        {
          type: "message_start",
          message: {
            id: "m",
            type: "message",
            role: "assistant",
            model: sent.model,
            content: [],
            usage: { input_tokens: 10, output_tokens: 1 },
          },
        },
      ],
      [
        "content_block_start",
        { type: "content_block_start", index: 0, content_block: { type: "text", text: "" } },
      ],
      [
        "content_block_delta",
        { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "hi" } },
      ],
      ["content_block_stop", { type: "content_block_stop", index: 0 }],
      [
        "message_delta",
        { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 4 } },
      ],
      ["message_stop", { type: "message_stop" }],
    ];
    return new Response(
      events.map(([e, d]) => `event: ${e}\ndata: ${JSON.stringify(d)}\n\n`).join(""),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: `claude/${REQUESTED}`,
        stream: true,
        messages: [{ role: "user", content: `family stream ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  assert.equal(res.status, 200);
  const rows = (await h.waitFor(() => {
    const found = getDbInstance()
      .prepare("SELECT model, success FROM usage_history WHERE api_key_id = ?")
      .all(key.id) as Array<{ model: string; success: number }>;
    return found.length > 0 ? found : null;
  })) as Array<{ model: string; success: number }> | null;
  assert.equal(rows?.[0]?.model, SERVED);
});
