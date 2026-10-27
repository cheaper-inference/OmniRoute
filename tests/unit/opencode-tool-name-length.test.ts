import assert from "node:assert/strict";
import test from "node:test";

import { getRegistryEntry } from "../../open-sse/config/providerRegistry.ts";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import {
  applyRegistryToolNameLengthAliases,
  applyToolNameLengthAliases,
} from "../../open-sse/executors/toolNameLengthAlias.ts";
import { restoreOpenAIToolNames } from "../../open-sse/translator/helpers/toolCallHelper.ts";

// Claude Code MCP tool names routinely exceed 64 chars. OpenCode Zen/Go reject them with
// HTTP 400 "name must be at most 64 characters, got 68".
const SHARED_PREFIX = "mcp__plugin_acme-enterprise-tools_acme-enterprise-server__query_";
const LONG_A = `${SHARED_PREFIX}rowA`;
const LONG_B = `${SHARED_PREFIX}rowB`;
// A paid chat-completions model: the free-tier contract (which may append a `_noop`
// tool) does not apply, so the tool list reflects only the aliasing.
const MODEL = "kimi-k3";

type ToolCall = { id: string; type: string; function: { name: string; arguments: string } };
type ChatBody = {
  model: string;
  stream: boolean;
  tools: Array<{ type: string; function: { name: string; parameters: object } }>;
  tool_choice?: { type: string; function: { name: string } };
  messages: Array<{
    role: string;
    content: string | null;
    tool_calls?: ToolCall[];
    tool_call_id?: string;
    name?: string;
  }>;
  _toolNameMap?: Map<string, string>;
};

function chatBody(names: string[]): ChatBody {
  return {
    model: MODEL,
    stream: true,
    tools: names.map((name) => ({
      type: "function",
      function: { name, parameters: { type: "object", properties: {} } },
    })),
    messages: [{ role: "user", content: "hi" }],
  };
}

function transform(provider: string, body: ChatBody): ChatBody {
  const executor = new OpencodeExecutor(provider);
  return executor.transformRequest(MODEL, body, true, { apiKey: "k" }) as ChatBody;
}

test("toolNameMaxLength 64 is declared for every keyed OpenCode registry entry", () => {
  for (const provider of ["opencode-zen", "opencode-go"]) {
    assert.equal(getRegistryEntry(provider)?.toolNameMaxLength, 64, provider);
  }
});

test("OpencodeExecutor aliases two 68-char names sharing a 64-char prefix to distinct names", () => {
  assert.equal(LONG_A.length, 68);
  assert.equal(LONG_B.length, 68);
  assert.equal(LONG_A.slice(0, 64), LONG_B.slice(0, 64));

  for (const provider of ["opencode-zen", "opencode-go"]) {
    const out = transform(provider, chatBody([LONG_A, LONG_B]));
    const [aliasA, aliasB] = out.tools.map((tool) => tool.function.name);

    assert.notEqual(aliasA, aliasB, provider);
    assert.match(aliasA, /^[A-Za-z0-9_-]{1,64}$/);
    assert.match(aliasB, /^[A-Za-z0-9_-]{1,64}$/);
    assert.ok(out._toolNameMap instanceof Map, `${provider}: _toolNameMap missing`);
    assert.equal(out._toolNameMap.get(aliasA), LONG_A);
    assert.equal(out._toolNameMap.get(aliasB), LONG_B);
    assert.equal(Object.prototype.propertyIsEnumerable.call(out, "_toolNameMap"), false);
    assert.equal(JSON.stringify(out).includes("_toolNameMap"), false);
  }
});

test("OpencodeExecutor aliases history tool_calls, tool results and tool_choice consistently", () => {
  const body = chatBody([LONG_A, "short_tool"]);
  body.tool_choice = { type: "function", function: { name: LONG_A } };
  body.messages.push(
    {
      role: "assistant",
      content: null,
      tool_calls: [
        { id: "call_1", type: "function", function: { name: LONG_A, arguments: "{}" } },
        { id: "call_2", type: "function", function: { name: "short_tool", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "call_1", name: LONG_A, content: "ok" }
  );

  const out = transform("opencode-go", body);
  const alias = out.tools[0].function.name;

  assert.notEqual(alias, LONG_A);
  assert.equal(out.tools[1].function.name, "short_tool");
  assert.equal(out.tool_choice?.function.name, alias);
  assert.equal(out.messages[1].tool_calls?.[0].function.name, alias);
  assert.equal(out.messages[1].tool_calls?.[1].function.name, "short_tool");
  assert.equal(out.messages[2].name, alias);
  assert.equal(out._toolNameMap?.get(alias), LONG_A);
  assert.equal(out._toolNameMap?.has("short_tool"), false);
});

test("OpencodeExecutor keeps the same alias map when the same input is re-dispatched", () => {
  // Account rotation re-runs transformRequest on the same input body.
  const input = chatBody([LONG_A, LONG_B]);
  const first = transform("opencode-zen", input);
  const second = transform("opencode-zen", input);

  assert.deepEqual([...(second._toolNameMap ?? new Map())], [...(first._toolNameMap ?? [])]);
  assert.deepEqual(
    second.tools.map((tool) => tool.function.name),
    first.tools.map((tool) => tool.function.name)
  );
});

test("OpencodeExecutor leaves short, charset-clean names untouched", () => {
  const out = transform("opencode-zen", chatBody(["Bash", "read_file", "mcp__github__get_issue"]));

  assert.deepEqual(
    out.tools.map((tool) => tool.function.name),
    ["Bash", "read_file", "mcp__github__get_issue"]
  );
  assert.equal(out._toolNameMap, undefined);
});

test("OpencodeExecutor does not alias tool names on non chat-completions surfaces", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "claude";
  const out = executor.transformRequest(MODEL, chatBody([LONG_A]), true, {
    apiKey: "k",
  }) as ChatBody;

  assert.equal(out.tools[0].function.name, LONG_A);
  assert.equal(out._toolNameMap, undefined);
});

test("aliases restore to the original names in an OpenAI response", () => {
  const out = transform("opencode-zen", chatBody([LONG_A, LONG_B]));
  const aliasB = out.tools[1].function.name;
  const response = {
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          tool_calls: [{ id: "c1", type: "function", function: { name: aliasB, arguments: "{}" } }],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  assert.equal(restoreOpenAIToolNames(response, out._toolNameMap), true);
  assert.equal(response.choices[0].message.tool_calls[0].function.name, LONG_B);
});

test("applyToolNameLengthAliases merges into an existing _toolNameMap without mutating it", () => {
  const body: Record<string, unknown> = chatBody([LONG_A]);
  const existing = new Map([["Cloaked", "original_cloaked"]]);
  Object.defineProperty(body, "_toolNameMap", {
    value: existing,
    enumerable: false,
    configurable: true,
    writable: true,
  });

  const added = applyToolNameLengthAliases(body, 64);
  const merged = body._toolNameMap as Map<string, string>;

  assert.equal(added.size, 1);
  assert.notEqual(merged, existing);
  assert.equal(existing.size, 1);
  assert.equal(merged.get("Cloaked"), "original_cloaked");
  assert.equal(merged.get([...added.keys()][0]), LONG_A);
  assert.equal(Object.prototype.propertyIsEnumerable.call(body, "_toolNameMap"), false);
});

test("applyToolNameLengthAliases accepts a custom normalizer and ignores invalid limits", () => {
  // A Responses-shaped body (flat `tools[].name`) needs its own normalizer, e.g. a
  // 128-char Codex cap. The helper only owns the limit gate and the map bookkeeping.
  const body: Record<string, unknown> = { tools: [{ type: "function", name: "x".repeat(130) }] };
  const added = applyToolNameLengthAliases(body, 128, (target, maxLength) => {
    const tools = (target as { tools: Array<{ name: string }> }).tools;
    const aliases = new Map<string, string>();
    for (const tool of tools) {
      if (tool.name.length <= maxLength) continue;
      const alias = tool.name.slice(0, maxLength);
      aliases.set(alias, tool.name);
      tool.name = alias;
    }
    return aliases;
  });

  assert.equal(added.size, 1);
  assert.equal((body._toolNameMap as Map<string, string>).get("x".repeat(128)), "x".repeat(130));

  for (const limit of [undefined, 0, -1, 1.5]) {
    const untouched: Record<string, unknown> = chatBody([LONG_A]);
    assert.equal(applyToolNameLengthAliases(untouched, limit).size, 0);
    assert.equal(untouched._toolNameMap, undefined);
  }
  assert.equal(applyToolNameLengthAliases(null, 64).size, 0);
  assert.equal(applyToolNameLengthAliases([chatBody([LONG_A])], 64).size, 0);
});

test("applyRegistryToolNameLengthAliases is a no-op for providers without a limit", () => {
  const body: Record<string, unknown> = chatBody([LONG_A]);
  assert.equal(applyRegistryToolNameLengthAliases("openai", body).size, 0);
  assert.equal((body as unknown as ChatBody).tools[0].function.name, LONG_A);
  assert.equal(body._toolNameMap, undefined);
  assert.equal(applyRegistryToolNameLengthAliases("nvidia", body).size, 1);
});
