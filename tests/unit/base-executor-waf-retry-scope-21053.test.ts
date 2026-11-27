import test from "node:test";
import assert from "node:assert/strict";
import { DefaultExecutor } from "../../open-sse/executors/default.ts";

const realFetch = globalThis.fetch;
const realSetTimeout = globalThis.setTimeout;

function stub() {
  const state = { fetches: 0 };
  globalThis.fetch = (async () => {
    state.fetches++;
    return new Response(JSON.stringify({ error: { code: "content_blocked" } }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  // fast-forward long retry timers
  globalThis.setTimeout = ((fn: () => void, ms?: number, ...a: unknown[]) => {
    if (typeof ms === "number" && ms >= 500) return realSetTimeout(fn, 0, ...a);
    return realSetTimeout(fn, ms, ...a);
  }) as typeof setTimeout;
  return state;
}

async function run(provider: string, model: string) {
  const state = stub();
  const res = await new DefaultExecutor(provider).execute({
    model,
    body: { model, messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "k" },
  } as never);
  return { status: res.response.status, fetches: state.fetches };
}

test.afterEach(() => {
  globalThis.fetch = realFetch;
  globalThis.setTimeout = realSetTimeout;
});

test("non-AgentRouter provider: permanent 400 content_blocked is not replayed (#21053)", async () => {
  const r = await run("gemini", "gemini-2.5-flash");
  assert.equal(r.status, 400);
  assert.equal(r.fetches, 1);
});

test("agentrouter keeps the WAF intra-URL retry (3 calls) (#21053)", async () => {
  const r = await run("agentrouter", "claude-sonnet-4-5");
  assert.equal(r.fetches, 3);
});
