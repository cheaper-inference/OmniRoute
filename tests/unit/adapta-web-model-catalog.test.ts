/**
 * #18673: the Adapta registry and the executor's MODEL_KEY_MAP are two hand-kept lists
 * and the upstream body carries the catalog key, so both are pinned here against the
 * real executor with only the network stubbed.
 */
import assert from "node:assert/strict";
import test from "node:test";

import { adapta_webProvider } from "../../open-sse/config/providers/registry/adapta-web/index.ts";

const { AdaptaWebExecutor, MODEL_KEY_MAP } = await import("../../open-sse/executors/adapta-web.ts");

const LEGACY_IDS = [
  "adapta-gpt",
  "adapta-claude",
  "adapta-gemini",
  "adapta-grok",
  "adapta-deepseek",
  "adapta-llama",
];

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

type UpstreamBody = {
  chatId: string;
  id: string;
  modelAi: string;
  trigger: string;
  aiModelId?: unknown;
  messages: Array<{ id: string; role: string; metadata?: { model?: string; chatId?: string } }>;
};

/** Stubs Clerk and the stream endpoint; returns what reached the stream endpoint. */
function stubUpstream(events: unknown[]) {
  const bodies: UpstreamBody[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url.endsWith("/v1/client")) {
      return Response.json({ response: { sessions: [{ id: "session-1", status: "active" }] } });
    }
    if (url.includes("/tokens")) return Response.json({ jwt: "eyJ.test-session.jwt" });
    bodies.push(JSON.parse(String(init?.body)));
    return new Response(events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(""), {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    });
  }) as typeof fetch;
  return bodies;
}

async function run(model: string, stream: boolean, cookie: string, messages?: unknown[]) {
  return new AdaptaWebExecutor().execute({
    model,
    body: { messages: messages ?? [{ role: "user", content: "hello" }] },
    stream,
    credentials: { apiKey: `__client=${cookie}` },
    signal: null,
  });
}

const TEXT_THEN_FINISH = [
  { type: "text-delta", id: "t1", delta: "hi" },
  { type: "finish" },
  { type: "text-delta", id: "t1", delta: "after the finish" },
];

test("every registry id has a catalog key and every catalog key has a registry id", () => {
  const registryIds = adapta_webProvider.models.map((model) => model.id).sort();
  assert.deepEqual(registryIds, Object.keys(MODEL_KEY_MAP).sort());
  assert.equal(new Set(Object.values(MODEL_KEY_MAP)).size, registryIds.length);
});

test("legacy ids stay routable as aliases of adapta-one, without their own catalog row", () => {
  const one = adapta_webProvider.models.find((model) => model.id === "adapta-one");
  assert.deepEqual([...(one?.aliases ?? [])].sort(), [...LEGACY_IDS].sort());
  for (const id of LEGACY_IDS) {
    assert.equal(
      adapta_webProvider.models.some((model) => model.id === id),
      false,
      id
    );
  }
});

test("a catalog id sends its key in modelAi with the chat ids the body needs", async () => {
  const bodies = stubUpstream(TEXT_THEN_FINISH);
  const result = await run("adapta-claude-5-5-sonnet", true, "catalog-id-cookie", [
    { role: "user", content: "hello" },
    { role: "assistant", content: "hi there" },
    { role: "user", content: "again" },
  ]);
  await result.response.text();

  const [body] = bodies;
  assert.equal(body.modelAi, "CLAUDE_5_5_SONNET");
  assert.equal(body.trigger, "submit-message");
  assert.equal(body.id, body.chatId);
  assert.equal(body.aiModelId, undefined);
  assert.deepEqual(
    body.messages.map((message) => message.role),
    ["user", "assistant", "user"]
  );
  assert.equal(new Set(body.messages.map((message) => message.id)).size, 3);
  assert.equal(body.messages[1].metadata?.model, "CLAUDE_5_5_SONNET");
  assert.equal(body.messages[1].metadata?.chatId, body.chatId);
});

test("legacy and unknown ids both fall back to ONE, as they did on the numeric map", async () => {
  for (const [index, model] of [...LEGACY_IDS, "adapta-not-a-model"].entries()) {
    const bodies = stubUpstream(TEXT_THEN_FINISH);
    const result = await run(model, true, `fallback-cookie-${index}`);
    await result.response.text();
    assert.equal(bodies[0].modelAi, "ONE", model);
  }
});

test("an empty assistant turn is not forwarded", async () => {
  const bodies = stubUpstream(TEXT_THEN_FINISH);
  const result = await run("adapta-one", true, "empty-assistant-cookie", [
    { role: "user", content: "hello" },
    { role: "assistant", content: "   " },
    { role: "user", content: "again" },
  ]);
  await result.response.text();
  assert.deepEqual(
    bodies[0].messages.map((message) => message.role),
    ["user", "user"]
  );
});

test("a finish event ends the stream and nothing after it is emitted", async () => {
  stubUpstream(TEXT_THEN_FINISH);
  const result = await run("adapta-one", true, "stream-finish-cookie");
  const sse = await result.response.text();
  assert.match(sse, /"content":"hi"/);
  assert.match(sse, /"finish_reason":"stop"/);
  assert.match(sse, /data: \[DONE\]/);
  assert.doesNotMatch(sse, /after the finish/);
});
