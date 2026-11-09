// Function-tool `strict` keeps the SOURCE format's semantics on every route.
//
// The same omitted field means different things per wire format:
//   - Chat Completions / Claude: omitted `strict` = non-strict (optional props stay optional).
//   - Responses: omitted `strict` = the API strict-normalizes the schema (every property
//     becomes required, so the model invents values for optional ones). Explicit `false`
//     and `null` (LangChain) both opt out.
// So Chat/Claude -> Responses must spell an omitted/null strict as `false`, native
// Responses clients keep whatever they declared (including `null`) through the Codex
// tool rebuild, and Responses -> Chat carries only booleans (never `null`).
import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { normalizeCodexTools } = await import("../../open-sse/executors/codex/tools.ts");
const { readToolStrict, chatStrictForResponses, chatStrictFrom, restoreToolStrict } =
  await import("../../open-sse/translator/helpers/toolStrict.ts");

type JsonRecord = Record<string, unknown>;

// Shape of a tool whose `id` must stay optional (new claims are sent without one).
const SUBMIT_PAGE_PARAMS = {
  type: "object",
  properties: {
    claims: {
      type: "array",
      items: {
        type: "object",
        properties: { id: { type: "string" }, statement: { type: "string" } },
        required: ["statement"],
        additionalProperties: false,
      },
    },
  },
  additionalProperties: false,
};

const DECLARED: Array<boolean | null> = [false, null, true];

function chatTool(extra: JsonRecord = {}): JsonRecord {
  return {
    type: "function",
    function: {
      name: "submit_page",
      description: "submit",
      parameters: SUBMIT_PAGE_PARAMS,
      ...extra,
    },
  };
}

function flatTool(extra: JsonRecord = {}): JsonRecord {
  return {
    type: "function",
    name: "submit_page",
    description: "submit",
    parameters: SUBMIT_PAGE_PARAMS,
    ...extra,
  };
}

function claudeTool(extra: JsonRecord = {}): JsonRecord {
  return { name: "submit_page", description: "submit", input_schema: SUBMIT_PAGE_PARAMS, ...extra };
}

const responsesInput = [
  { type: "message", role: "user", content: [{ type: "input_text", text: "hi" }] },
];

function chatToResponses(tool: JsonRecord): JsonRecord {
  const out = translateRequest(FORMATS.OPENAI, FORMATS.OPENAI_RESPONSES, "gpt-5.5", {
    model: "gpt-5.5",
    messages: [{ role: "user", content: "hi" }],
    tools: [tool],
  }) as { tools: JsonRecord[] };
  return out.tools[0];
}

function claudeToResponses(tool: JsonRecord): JsonRecord {
  const out = translateRequest(FORMATS.CLAUDE, FORMATS.OPENAI_RESPONSES, "gpt-5.5", {
    model: "gpt-5.5",
    max_tokens: 100,
    messages: [{ role: "user", content: "hi" }],
    tools: [tool],
  }) as { tools: JsonRecord[] };
  return out.tools.find((t) => t.name === "submit_page") as JsonRecord;
}

function claudeToChat(tool: JsonRecord): JsonRecord {
  const out = translateRequest(FORMATS.CLAUDE, FORMATS.OPENAI, "gpt-5.5", {
    model: "gpt-5.5",
    max_tokens: 100,
    messages: [{ role: "user", content: "hi" }],
    tools: [tool],
  }) as { tools: Array<{ function: JsonRecord }> };
  return out.tools.find((t) => t.function.name === "submit_page")!.function;
}

function responsesToChat(tool: JsonRecord): JsonRecord {
  const out = translateRequest(FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, "gpt-x", {
    model: "gpt-x",
    input: structuredClone(responsesInput),
    tools: [tool],
  }) as { tools: Array<{ function: JsonRecord }> };
  return out.tools[0].function;
}

// ── helpers ────────────────────────────────────────────────────────────────

test("readToolStrict reads flat and nested strict, ignoring undeclared or invalid values", () => {
  assert.equal(readToolStrict(flatTool()), undefined);
  assert.equal(readToolStrict(chatTool()), undefined);
  assert.equal(readToolStrict(flatTool({ strict: "yes" })), undefined);
  assert.equal(readToolStrict(null), undefined);
  for (const value of DECLARED) {
    assert.equal(readToolStrict(flatTool({ strict: value })), value);
    assert.equal(readToolStrict(chatTool({ strict: value })), value);
  }
});

test("chatStrictForResponses: omitted/null -> false, booleans kept", () => {
  assert.equal(chatStrictForResponses({}), false);
  assert.equal(chatStrictForResponses({ strict: null }), false);
  assert.equal(chatStrictForResponses({ strict: false }), false);
  assert.equal(chatStrictForResponses({ strict: true }), true);
  assert.equal(chatStrictForResponses(undefined), false);
});

test("chatStrictFrom carries only boolean strict", () => {
  assert.deepEqual(chatStrictFrom({}), {});
  assert.deepEqual(chatStrictFrom({ strict: null }), {});
  assert.deepEqual(chatStrictFrom({ strict: "true" }), {});
  assert.deepEqual(chatStrictFrom({ strict: false }), { strict: false });
  assert.deepEqual(chatStrictFrom({ strict: true }), { strict: true });
});

test("restoreToolStrict restores only declared values", () => {
  assert.equal("strict" in restoreToolStrict({}, undefined), false);
  assert.deepEqual(restoreToolStrict({}, null), { strict: null });
  assert.deepEqual(restoreToolStrict({}, false), { strict: false });
});

// ── Chat Completions -> Responses ──────────────────────────────────────────

test("Chat -> Responses: omitted strict reaches Responses as strict:false", () => {
  const tool = chatToResponses(chatTool());
  assert.equal(tool.name, "submit_page");
  assert.equal(tool.strict, false);
});

test("Chat -> Responses: strict null -> false, booleans kept", () => {
  assert.equal(chatToResponses(chatTool({ strict: null })).strict, false);
  assert.equal(chatToResponses(chatTool({ strict: false })).strict, false);
  assert.equal(chatToResponses(chatTool({ strict: true })).strict, true);
});

// ── Claude -> Chat / Responses ─────────────────────────────────────────────

test("Claude -> Chat: explicit boolean strict carried, omitted stays omitted", () => {
  assert.equal(claudeToChat(claudeTool({ strict: true })).strict, true);
  assert.equal(claudeToChat(claudeTool({ strict: false })).strict, false);
  assert.equal("strict" in claudeToChat(claudeTool()), false);
  assert.equal("strict" in claudeToChat(claudeTool({ strict: null })), false);
});

test("Claude -> Responses: omitted strict reaches Responses as false, true is kept", () => {
  assert.equal(claudeToResponses(claudeTool()).strict, false);
  assert.equal(claudeToResponses(claudeTool({ strict: true })).strict, true);
});

// ── Responses -> Chat Completions ──────────────────────────────────────────

test("Responses -> Chat: strict:null and undeclared strict do not leak into Chat", () => {
  assert.equal("strict" in responsesToChat(flatTool({ strict: null })), false);
  assert.equal("strict" in responsesToChat(flatTool()), false);
});

test("Responses -> Chat: boolean strict is kept", () => {
  assert.equal(responsesToChat(flatTool({ strict: false })).strict, false);
  assert.equal(responsesToChat(flatTool({ strict: true })).strict, true);
});

test("Responses -> Chat: custom tools do not leak strict:null", () => {
  const custom = { type: "custom", name: "apply_patch", description: "patch", strict: null };
  assert.equal("strict" in responsesToChat(custom), false);
});

// ── Codex executor tool rebuild ────────────────────────────────────────────

test("codex rebuild keeps native strict omitted when the client omitted it", () => {
  const flat = flatTool();
  normalizeCodexTools({ tools: [flat] }, { defaultFunctionStrict: undefined });
  assert.equal("strict" in flat, false);
});

test("codex rebuild preserves declared strict (including null) on native tools", () => {
  for (const value of DECLARED) {
    const flat = flatTool({ strict: value });
    const nested = chatTool({ strict: value });
    normalizeCodexTools({ tools: [flat, nested] }, { defaultFunctionStrict: undefined });
    assert.equal(flat.strict, value);
    assert.equal(nested.strict, value);
    assert.equal(nested.function, undefined);
  }
});

test("codex rebuild: a declared null is not overridden by the translated-path default", () => {
  const flat = flatTool({ strict: null });
  normalizeCodexTools({ tools: [flat] }, { defaultFunctionStrict: false });
  assert.equal(flat.strict, null);
});

test("Chat client end to end through the codex rebuild reaches upstream with strict:false", () => {
  const translated = chatToResponses(chatTool());
  normalizeCodexTools({ tools: [translated] }, { defaultFunctionStrict: undefined });
  assert.equal(translated.strict, false);
});
