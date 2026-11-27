// End-to-end wiring for prompt template expansion: through handleChat, with a stubbed upstream.
// Flag off: a template:// message goes upstream untouched. Flag on: the upstream sees the
// expanded text and no template_params; a missing slot is a 400 and never reaches the upstream.
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("prompt-template-chat");
const { handleChat, buildRequest, buildOpenAIResponse, seedConnection, resetStorage } = harness;
const promptsDb = await import("../../src/lib/db/prompts.ts");

const originalFetch = globalThis.fetch;

// One storage reset for the file: prompts.ts creates its table lazily and remembers that it did,
// so wiping the database between tests would leave it without the table.
await resetStorage();
await seedConnection("openai", { apiKey: ["placeholder", "value"].join("-") });
promptsDb.savePrompt("greet", "Hello {{name}}.");

test.afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.OMNIROUTE_PROMPT_TEMPLATES;
});

test.after(() => harness.cleanup());

async function send(template_params?: Record<string, unknown>) {
  const upstream: Array<Record<string, unknown>> = [];
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body)) as Record<string, unknown>;
    upstream.push(body);
    return buildOpenAIResponse("ok", String(body.model));
  };
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "template://greet" }],
        ...(template_params ? { template_params } : {}),
      },
    })
  );
  return { response, upstream };
}

const firstContent = (body: Record<string, unknown>) =>
  (body.messages as Array<{ content: unknown }>)[0].content;

test("flag off: the template:// text goes upstream unchanged", async () => {
  const { response, upstream } = await send({ name: "Ada" });
  assert.equal(response.status, 200, await response.text());
  assert.equal(firstContent(upstream[0]), "template://greet");
});

test("flag on: the upstream gets the expanded text and no template_params", async () => {
  process.env.OMNIROUTE_PROMPT_TEMPLATES = "1";
  const { response, upstream } = await send({ name: "Ada" });
  assert.equal(response.status, 200, await response.text());
  assert.equal(firstContent(upstream[0]), "Hello Ada.");
  assert.equal("template_params" in upstream[0], false);
});

test("flag on: a missing slot is a 400 and nothing is sent upstream", async () => {
  process.env.OMNIROUTE_PROMPT_TEMPLATES = "1";
  const { response, upstream } = await send({});
  assert.equal(response.status, 400);
  assert.match(await response.text(), /missing template parameters/i);
  assert.equal(upstream.length, 0);
});
