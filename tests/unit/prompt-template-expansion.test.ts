// Prompt template expansion (opt-in, OMNIROUTE_PROMPT_TEMPLATES=1).
// A client sends a message whose whole content is `template://<slug>` and a `template_params`
// object. The gateway swaps the content for the stored template with {{var}} slots filled in.
// Values are inserted as data (never re-scanned for slots); a slot with no value is a 400.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-prompt-tpl-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const promptsDb = await import("../../src/lib/db/prompts.ts");
const { expandPromptTemplates, isPromptTemplatesEnabled } =
  await import("../../src/lib/promptTemplateExpand.ts");

test.after(() => {
  delete process.env.OMNIROUTE_PROMPT_TEMPLATES;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const lookup = (slug: string) => promptsDb.getActivePrompt(slug)?.content ?? null;

function request(content: unknown, template_params?: unknown, extra: Record<string, unknown> = {}) {
  return {
    model: "m",
    messages: [{ role: "user", content }],
    ...(template_params === undefined ? {} : { template_params }),
    ...extra,
  };
}

test("a template:// message is replaced by the stored template with slots filled", () => {
  promptsDb.savePrompt("greet", "Hello {{name}}, welcome to {{place}}.");
  const result = expandPromptTemplates(
    request("template://greet", { name: "Ada", place: "the lab" }),
    lookup
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.messages[0].content, "Hello Ada, welcome to the lab.");
  assert.equal("template_params" in result.body, false, "template_params is not sent upstream");
});

test("a value that contains a slot or a $ pattern is inserted as plain text", () => {
  promptsDb.savePrompt("echo", "Say: {{text}} / {{other}}");
  const result = expandPromptTemplates(
    request("template://echo", { text: "{{other}} costs $& and $1", other: "second" }),
    lookup
  );
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.messages[0].content, "Say: {{other}} costs $& and $1 / second");
});

test("a slot with no value is refused with the missing names", () => {
  promptsDb.savePrompt("two", "{{a}} and {{b}} and {{a}}");
  const result = expandPromptTemplates(request("template://two", { a: "x" }), lookup);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.status, 400);
  assert.match(result.message, /missing template parameters/i);
  assert.match(result.message, /\bb\b/);
  assert.doesNotMatch(result.message, /\ba\b/);
});

test("an unknown template is refused", () => {
  const result = expandPromptTemplates(request("template://nope"), lookup);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.status, 400);
  assert.match(result.message, /unknown template/i);
});

test("parameter values must be strings", () => {
  promptsDb.savePrompt("typed", "{{n}}");
  const result = expandPromptTemplates(request("template://typed", { n: 5 }), lookup);
  assert.equal(result.ok, false);
  if (result.ok) return;
  assert.equal(result.status, 400);
  assert.match(result.message, /string/i);
});

test("a body with no template:// message is returned untouched (same object)", () => {
  const body = request("plain text", { ignored: "x" });
  const result = expandPromptTemplates(body, lookup);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body, body);
});

test("only a message that is exactly template://slug counts; text around it does not", () => {
  const body = request("please use template://greet now");
  const result = expandPromptTemplates(body, lookup);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  assert.equal(result.body.messages[0].content, "please use template://greet now");
});

test("the input body is never mutated", () => {
  promptsDb.savePrompt("pure", "Hi {{x}}");
  const body = request("template://pure", { x: "y" });
  const snapshot = JSON.stringify(body);
  expandPromptTemplates(body, lookup);
  assert.equal(JSON.stringify(body), snapshot);
});

test("the flag is off unless OMNIROUTE_PROMPT_TEMPLATES is truthy", () => {
  assert.equal(isPromptTemplatesEnabled({}), false);
  assert.equal(isPromptTemplatesEnabled({ OMNIROUTE_PROMPT_TEMPLATES: "0" }), false);
  assert.equal(isPromptTemplatesEnabled({ OMNIROUTE_PROMPT_TEMPLATES: "1" }), true);
});
