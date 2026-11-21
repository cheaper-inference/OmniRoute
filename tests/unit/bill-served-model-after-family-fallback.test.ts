import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// Operator rule: when a model-family fallback serves a request, usage, cost and the request log are
// recorded under the model that SERVED it. The model the client asked for stays as metadata on the
// call log (`requested_model`). Both the non-streaming and the streaming path follow the rule.
const h = await createChatPipelineHarness("bill-served-model");
const { getDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => h.cleanup());

const REQUESTED = "claude-opus-4-6-thinking";
const SERVED = "claude-opus-4-6";

type Seen = { usageModels: string[]; callLog: { model: string; requested_model: string | null } };

function notFound() {
  return new Response(
    JSON.stringify({
      type: "error",
      error: { type: "not_found_error", message: `model: ${REQUESTED}` },
    }),
    { status: 404, headers: { "Content-Type": "application/json" } }
  );
}

function jsonReply(model: string) {
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

function sseReply(model: string) {
  const events: Array<[string, unknown]> = [
    [
      "message_start",
      {
        type: "message_start",
        message: {
          id: "m",
          type: "message",
          role: "assistant",
          model,
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
}

function summary(seen: Seen) {
  return {
    usageModels: seen.usageModels,
    callLogModel: seen.callLog.model,
    requestedKept: new RegExp(`${REQUESTED}$`).test(String(seen.callLog.requested_model)),
  };
}

async function run(opts: { stream: boolean; requested: string; label: string }): Promise<Seen> {
  await h.resetStorage();
  await h.seedConnection("claude", { name: opts.label, apiKey: `k-${opts.label}` });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
    if (sent.model === REQUESTED) return notFound();
    return opts.stream ? sseReply(String(sent.model)) : jsonReply(String(sent.model));
  }) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: `claude/${opts.requested}`,
        stream: opts.stream,
        messages: [{ role: "user", content: `${opts.label} ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  assert.equal(res.status, 200);
  const rows = (await h.waitFor(() => {
    const found = getDbInstance()
      .prepare("SELECT model FROM usage_history WHERE api_key_id = ?")
      .all(key.id) as Array<{ model: string }>;
    return found.length > 0 ? found : null;
  })) as Array<{ model: string }> | null;
  const callLog = (await h.waitFor(async () => {
    const latest = await h.getLatestCallLog();
    return latest && latest.status === 200 ? latest : null;
  })) as { model: string; requestedModel: string | null } | null;
  assert.ok(callLog, "a call log row exists");
  return {
    usageModels: (rows ?? []).map((r) => r.model),
    callLog: { model: callLog.model, requested_model: callLog.requestedModel },
  };
}

test("non-streaming: usage row and call log name the served model, call log keeps the requested one", async () => {
  const seen = await run({ stream: false, requested: REQUESTED, label: "bill-nonstream" });
  assert.deepEqual(summary(seen), {
    usageModels: [SERVED],
    callLogModel: SERVED,
    requestedKept: true,
  });
});

test("streaming: usage row and call log name the served model, call log keeps the requested one", async () => {
  const seen = await run({ stream: true, requested: REQUESTED, label: "bill-stream" });
  assert.deepEqual(summary(seen), {
    usageModels: [SERVED],
    callLogModel: SERVED,
    requestedKept: true,
  });
});

test("non-streaming: cost is priced for the served model", async () => {
  await h.resetStorage();
  await h.seedConnection("claude", { name: "bill-cost", apiKey: "k-bill-cost" });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  const settings = await import("../../src/lib/db/settings.ts");
  // Different per-token prices, so the cost shows which model was priced.
  await settings.updatePricing({
    claude: {
      [REQUESTED]: { input: 100, output: 100 },
      [SERVED]: { input: 1, output: 1 },
    },
  });
  globalThis.fetch = (async (_input: unknown, init: RequestInit = {}) => {
    const sent = JSON.parse(String(init.body ?? "{}")) as { model?: string };
    return sent.model === REQUESTED ? notFound() : jsonReply(String(sent.model));
  }) as typeof fetch;
  const res = await h.handleChat(
    h.buildRequest({
      authKey: key.key,
      body: {
        model: `claude/${REQUESTED}`,
        stream: false,
        messages: [{ role: "user", content: `bill cost ${crypto.randomUUID()}` }],
      },
    })
  );
  await res.text();
  assert.equal(res.status, 200);
  const cost = Number(res.headers.get("x-omniroute-response-cost"));
  // 10 input + 4 output tokens at 1 USD per million = 0.000014; at 100 USD per million it is 0.0014.
  assert.ok(cost > 0 && cost < 0.0001, `priced as the requested model: ${cost}`);
});

test("no fallback: usage row and call log keep the requested model", async () => {
  const seen = await run({ stream: false, requested: SERVED, label: "bill-nofallback" });
  assert.deepEqual(summary(seen).usageModels, [SERVED]);
  assert.equal(seen.callLog.model, SERVED);
});
