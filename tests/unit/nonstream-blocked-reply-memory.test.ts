import assert from "node:assert/strict";
import test from "node:test";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

// A non-streaming reply that a post-call guardrail blocks is answered with a 400. The client never
// sees it, so facts extracted from it must not reach durable Memory.
const h = await createChatPipelineHarness("nonstream-blocked-memory");
const { guardrailRegistry } = await import("../../src/lib/guardrails/registry.ts");
const { BaseGuardrail } = await import("../../src/lib/guardrails/base.ts");
const { invalidateMemorySettingsCache } = await import("../../src/lib/memory/settings.ts");

const REPLY = "I prefer concise answers. I usually answer in bullet points.";

class DenyAll extends BaseGuardrail {
  constructor() {
    super("deny-all-post-call", { priority: 1 });
  }
  async postCall() {
    return { block: true, message: "blocked by test guardrail" };
  }
}

test.after(() => h.cleanup());
test.afterEach(() => guardrailRegistry.clear());

function dropFts5Artifacts() {
  h.core
    .getDbInstance()
    .exec(
      "DROP TRIGGER IF EXISTS memory_fts_ai;DROP TRIGGER IF EXISTS memory_fts_ad;" +
        "DROP TRIGGER IF EXISTS memory_fts_au;DROP TABLE IF EXISTS memory_fts;"
    );
}

type Fact = { content?: string };

async function listFacts(apiKeyId: string): Promise<Fact[]> {
  dropFts5Artifacts();
  const result = await h.memoryStore.listMemories({ apiKeyId });
  return (Array.isArray(result) ? result : (result.data ?? [])) as Fact[];
}

async function chat(authKey: string, text: string) {
  const res = await h.handleChat(
    h.buildRequest({
      authKey,
      headers: { "x-omniroute-session-id": "blocked-memory" },
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: text }],
      },
    })
  );
  await res.text();
  return res.status;
}

async function setUp() {
  await h.resetStorage();
  invalidateMemorySettingsCache();
  dropFts5Artifacts();
  await h.seedConnection("openai", { apiKey: "sk-memory-test" });
  const key = (await h.seedApiKey({})) as { id: string; key: string };
  await h.settingsDb.updateSettings({
    memoryEnabled: true,
    memoryMaxTokens: 400,
    memoryRetentionDays: 30,
    memoryStrategy: "recent",
  });
  return key;
}

test("control: an allowed reply is extracted into Memory", async () => {
  const key = await setUp();
  globalThis.fetch = (async () => h.buildOpenAIResponse(REPLY)) as typeof fetch;
  assert.equal(await chat(key.key, "Remember my preferences"), 200);
  const facts = await h.waitFor(async () => {
    const list = await listFacts(key.id);
    return list.length > 0 ? list : null;
  }, 5000);
  assert.ok(facts && facts.length >= 1, "an allowed reply must still reach Memory");
});

test("a reply that a post-call guardrail blocks does not reach Memory", async () => {
  const key = await setUp();
  guardrailRegistry.register(new DenyAll());
  globalThis.fetch = (async () => h.buildOpenAIResponse(REPLY)) as typeof fetch;
  assert.equal(await chat(key.key, "Remember my preferences"), 400);

  // Extraction is deferred with setImmediate, so a count taken now proves nothing. A second,
  // allowed request on the same key writes after the first: once its fact is stored, the
  // blocked request's extraction has run too (same queue, same tick order).
  guardrailRegistry.clear();
  globalThis.fetch = (async () =>
    h.buildOpenAIResponse("I usually answer in numbered lists.")) as typeof fetch;
  assert.equal(await chat(key.key, "One more thing"), 200);
  const facts = await h.waitFor(async () => {
    const list = await listFacts(key.id);
    return list.some((fact) => /numbered lists/.test(String(fact.content))) ? list : null;
  }, 5000);
  assert.ok(facts, "the sentinel request must reach Memory");
  assert.equal(
    facts.filter((fact) => /bullet points|concise answers/.test(String(fact.content))).length,
    0,
    JSON.stringify(facts)
  );
});
