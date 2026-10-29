import test from "node:test";
import assert from "node:assert/strict";

const { translateRequest } = await import("../../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../../open-sse/translator/formats.ts");

// Claude Code's WebSearch sends an Anthropic server tool —
// `{ type: "web_search_20250305", name: "web_search", max_uses: 8 }` — as the ONLY
// tool. When OmniRoute routes that to a Gemini/Antigravity target, Google Search
// grounding must be enabled on the upstream request (`{ googleSearch: {} }`).
//
// Claude has no direct CLAUDE→ANTIGRAVITY translator, so the hub runs
// claude-to-openai → openai-to-gemini; the direct CLAUDE→GEMINI path skips the hub.
// Both lanes have to end at `{ googleSearch: {} }`.

type Envelope = { request?: { tools?: unknown; toolConfig?: unknown }; tools?: unknown };

function antigravityBody(model = "gemini-3.8-flash", tools: unknown[]) {
  return {
    model,
    max_tokens: 1024,
    messages: [{ role: "user", content: "search the web for the latest news" }],
    tools,
  };
}

const WEB_SEARCH_20250305 = { type: "web_search_20250305", name: "web_search", max_uses: 8 };
const WEB_SEARCH_20260209 = { type: "web_search_20260209", name: "web_search", max_uses: 8 };

const READ_TOOL = {
  name: "Read",
  description: "Read a file",
  input_schema: {
    type: "object",
    properties: { path: { type: "string" } },
    required: ["path"],
  },
};

function translateToAntigravity(body: unknown): Envelope {
  return translateRequest(
    FORMATS.CLAUDE,
    FORMATS.ANTIGRAVITY,
    "gemini-3.8-flash",
    body,
    true,
    { projectId: "proj-search" },
    "antigravity"
  ) as Envelope;
}

test("CLAUDE -> ANTIGRAVITY maps the dated web_search server tool to googleSearch grounding", () => {
  const result = translateToAntigravity(antigravityBody("gemini-3.8-flash", [WEB_SEARCH_20250305]));

  assert.deepEqual(result.request?.tools, [{ googleSearch: {} }]);
});

test("CLAUDE -> ANTIGRAVITY handles the web_search_20260209 dated variant", () => {
  const result = translateToAntigravity(antigravityBody("gemini-3.8-flash", [WEB_SEARCH_20260209]));

  assert.deepEqual(result.request?.tools, [{ googleSearch: {} }]);
});

test("CLAUDE -> GEMINI (direct translator) maps the dated web_search server tool to googleSearch", () => {
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.GEMINI,
    "gemini-3.8-flash",
    antigravityBody("gemini-3.8-flash", [WEB_SEARCH_20250305]),
    true,
    null,
    "gemini"
  ) as Envelope;

  assert.ok(Array.isArray(result.tools), `expected a tools array, got ${JSON.stringify(result)}`);
  assert.deepEqual(result.tools, [{ googleSearch: {} }]);
});

test("CLAUDE -> ANTIGRAVITY keeps a normal Claude function tool as a functionDeclaration (no grounding)", () => {
  const result = translateToAntigravity(antigravityBody("gemini-3.8-flash", [READ_TOOL]));

  const tools = result.request?.tools as Array<{ functionDeclarations?: Array<{ name: string }> }>;
  const declared = (tools ?? []).flatMap((tool) =>
    (tool.functionDeclarations ?? []).map((fn) => fn.name)
  );
  assert.deepEqual(declared, ["Read"]);
  assert.equal(
    (tools ?? []).some((tool) => "googleSearch" in tool),
    false,
    "a custom function tool must not enable Google Search grounding"
  );
});

test("CLAUDE -> ANTIGRAVITY mixed case keeps the custom tools and does NOT enable grounding", () => {
  const result = translateToAntigravity(
    antigravityBody("gemini-3.8-flash", [READ_TOOL, WEB_SEARCH_20250305])
  );

  // Grounding is reserved for the sole-server-tool shape (Claude Code's WebSearch
  // sub-request). An agent turn that merely declares the server tool next to its own
  // functions must keep those functions: Antigravity v1internal 400s when a built-in
  // tool shares a request with functionDeclarations, so the server tool is dropped
  // instead and the request looks exactly as it did before grounding was wired up.
  const tools = result.request?.tools as Array<{
    functionDeclarations?: Array<{ name: string }>;
  }>;
  assert.deepEqual(
    (tools ?? []).flatMap((tool) => (tool.functionDeclarations ?? []).map((fn) => fn.name)),
    ["Read"]
  );
  assert.equal(
    (tools ?? []).some((tool) => "googleSearch" in tool),
    false,
    "a mixed request must not enable Google Search grounding"
  );
  assert.equal(
    (tools ?? []).some((tool) =>
      (tool.functionDeclarations ?? []).some((fn) => fn.name === "web_search")
    ),
    false,
    "the server tool must not degrade to a bogus web_search functionDeclaration"
  );
});

test("CLAUDE -> GEMINI (direct) mixed case keeps the custom tools and does NOT enable grounding", () => {
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.GEMINI,
    "gemini-3.8-flash",
    antigravityBody("gemini-3.8-flash", [READ_TOOL, WEB_SEARCH_20250305]),
    true,
    null,
    "gemini"
  ) as Envelope;

  const tools = result.tools as Array<{ functionDeclarations?: Array<{ name: string }> }>;
  assert.deepEqual(
    (tools ?? []).flatMap((tool) => (tool.functionDeclarations ?? []).map((fn) => fn.name)),
    ["Read"]
  );
  assert.equal(
    (tools ?? []).some((tool) => "googleSearch" in tool),
    false,
    "a mixed request must not enable Google Search grounding"
  );
  assert.equal(
    (tools ?? []).some((tool) =>
      (tool.functionDeclarations ?? []).some((fn) => fn.name === "web_search")
    ),
    false,
    "the server tool must not degrade to a bogus web_search functionDeclaration"
  );
});

test("CLAUDE -> OPENAI_RESPONSES still converts the server tool to the native web_search tool", () => {
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5",
    antigravityBody("gpt-5", [WEB_SEARCH_20250305]),
    true,
    null,
    "openai"
  ) as Envelope;

  assert.deepEqual(result.tools, [{ type: "web_search" }]);
});

test("CLAUDE -> OPENAI_RESPONSES converts natively even when the server tool is mixed", () => {
  // The sole-tool restriction is Gemini/Antigravity-only: the Responses API has no
  // built-in-vs-functionDeclarations conflict, so its behavior is unchanged.
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5",
    antigravityBody("gpt-5", [READ_TOOL, WEB_SEARCH_20250305]),
    true,
    null,
    "openai"
  ) as Envelope;

  // Responses tools are FLAT ({ type: "function", name }) rather than nested under
  // `.function` — see prepareWebSearchFallbackBody's target-format branch.
  const tools = result.tools as Array<Record<string, unknown>>;
  assert.equal(
    tools.some((tool) => tool.type === "web_search"),
    true,
    "the native web_search tool must still be emitted"
  );
  assert.equal(
    tools.some((tool) => tool.type === "function" && tool.name === "Read"),
    true,
    "the custom tool must survive next to the native web_search tool"
  );
});

test("CLAUDE -> OPENAI (chat completions) is untouched: the server tool stays a plain function", () => {
  const result = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "gpt-5",
    antigravityBody("gpt-5", [WEB_SEARCH_20250305]),
    true,
    null,
    "openai"
  ) as Envelope;

  const tools = result.tools as Array<{ type: string; function: { name: string } }>;
  assert.equal(tools.length, 1);
  assert.equal(tools[0].type, "function");
  assert.equal(tools[0].function.name, "web_search");
  assert.equal(
    tools.some((tool) => "googleSearch" in tool),
    false,
    "a chat-completions target must never receive Google Search grounding"
  );
});
