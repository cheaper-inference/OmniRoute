import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

// Isolated DATA_DIR under the worktree's _artifacts/ (never the real ~/.omniroute).
const ARTIFACTS_DIR = path.resolve(import.meta.dirname, "../../_artifacts");
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });
process.env.DATA_DIR = fs.mkdtempSync(path.join(ARTIFACTS_DIR, "openai-tool-name-limit-"));

const core = await import("../../src/lib/db/core.ts");
const { getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
const { DefaultExecutor } = await import("../../open-sse/executors/default.ts");
const { AzureOpenAIExecutor } = await import("../../open-sse/executors/azure-openai.ts");
const { AzureAiExecutor } = await import("../../open-sse/executors/azure-ai.ts");
const { resolveToolNameMaxLength } =
  await import("../../open-sse/executors/toolNameLengthAlias.ts");
const { restoreOpenAIToolNames } =
  await import("../../open-sse/translator/helpers/toolCallHelper.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

// OpenAI Chat Completions (and Azure OpenAI, which implements the same schema) reject a
// function name over 64 chars. MCP tool names from VS Code / Claude Code routinely exceed
// it (cheaper-inference/OmniCopilot#27).
const LONG = "mcp__example-observability-prod__trace_top_time_consuming_operations_by_service"; // 78
const SHORT = "mcp__github__get_issue";
const EXACT_64 = "a".repeat(64);

type ToolCall = { id: string; type: string; function: { name: string; arguments: string } };
type ChatBody = {
  model: string;
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

function chatBody(toolName: string): ChatBody {
  return {
    model: "m",
    tools: [
      { type: "function", function: { name: toolName, parameters: { type: "object" } } },
      { type: "function", function: { name: SHORT, parameters: { type: "object" } } },
    ],
    tool_choice: { type: "function", function: { name: toolName } },
    messages: [
      { role: "user", content: "hi" },
      {
        role: "assistant",
        content: null,
        tool_calls: [{ id: "c1", type: "function", function: { name: toolName, arguments: "{}" } }],
      },
      { role: "tool", tool_call_id: "c1", name: toolName, content: "ok" },
    ],
  };
}

const EXECUTORS: Record<string, () => InstanceType<typeof DefaultExecutor>> = {
  openai: () => new DefaultExecutor("openai"),
  "azure-openai": () => new AzureOpenAIExecutor(),
  "azure-ai": () => new AzureAiExecutor(),
};

function transform(
  provider: string,
  toolName: string,
  providerSpecificData?: Record<string, unknown>
): ChatBody {
  return EXECUTORS[provider]().transformRequest("m", chatBody(toolName), false, {
    apiKey: "k",
    providerSpecificData,
  }) as ChatBody;
}

for (const provider of Object.keys(EXECUTORS)) {
  test(`${provider}: a ${LONG.length}-char tool name goes upstream at most 64 chars everywhere`, () => {
    assert.ok(LONG.length > 64);
    const out = transform(provider, LONG);
    const sent = out.tools[0].function.name;

    assert.ok(sent.length <= 64, `tools[] name is ${sent.length} chars`);
    assert.match(sent, /^[A-Za-z0-9_-]{1,64}$/);
    assert.equal(out.tools[1].function.name, SHORT);
    assert.equal(out.tool_choice?.function.name, sent);
    assert.equal(out.messages[1].tool_calls?.[0].function.name, sent);
    assert.equal(out.messages[2].name, sent);
    assert.equal(out._toolNameMap?.get(sent), LONG);
    assert.equal(JSON.stringify(out).includes("_toolNameMap"), false);
  });

  test(`${provider}: a non-streaming tool call comes back under its original name`, () => {
    const out = transform(provider, LONG);
    const sent = out.tools[0].function.name;
    const response = {
      choices: [
        {
          message: {
            role: "assistant",
            content: null,
            tool_calls: [{ id: "c2", type: "function", function: { name: sent, arguments: "{}" } }],
          },
          finish_reason: "tool_calls",
        },
      ],
    };

    assert.equal(restoreOpenAIToolNames(response, out._toolNameMap), true);
    assert.equal(response.choices[0].message.tool_calls[0].function.name, LONG);
  });

  test(`${provider}: a streamed tool call comes back under its original name`, async () => {
    const out = transform(provider, LONG);
    const sent = out.tools[0].function.name;
    const chunk = {
      id: "chatcmpl-1",
      object: "chat.completion.chunk",
      created: 1,
      model: "m",
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [
              { index: 0, id: "c3", type: "function", function: { name: sent, arguments: "{}" } },
            ],
          },
          finish_reason: null,
        },
      ],
    };
    const source = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });
    const text = await new Response(
      source.pipeThrough(
        createSSEStream({
          mode: "passthrough",
          sourceFormat: FORMATS.OPENAI,
          provider,
          model: "m",
          toolNameMap: out._toolNameMap,
          body: { messages: [{ role: "user", content: "hi" }] },
        })
      )
    ).text();

    assert.ok(text.includes(JSON.stringify(LONG)), "original name missing from the stream");
    assert.equal(text.includes(JSON.stringify(sent)), false, "alias leaked to the client");
  });

  test(`${provider}: names of 64 chars or fewer are untouched`, () => {
    for (const name of [EXACT_64, SHORT]) {
      const out = transform(provider, name);
      assert.equal(out.tools[0].function.name, name);
      assert.equal(out.messages[1].tool_calls?.[0].function.name, name);
      assert.equal(out._toolNameMap, undefined);
    }
  });
}

test("openai declares toolNameMaxLength 64 in the registry", () => {
  assert.equal(getRegistryEntry("openai")?.toolNameMaxLength, 64);
});

test("azure providers have no registry entry, so their 64 is a built-in limit", () => {
  assert.equal(getRegistryEntry("azure-openai"), null);
  assert.equal(getRegistryEntry("azure-ai"), null);
  assert.equal(resolveToolNameMaxLength("azure-openai", undefined), 64);
  assert.equal(resolveToolNameMaxLength("azure-ai", undefined), 64);
});

test("a connection toolNameMaxLength still applies where the registry declares none", () => {
  // Azure: a stricter gateway in front of the deployment lowers the built-in 64.
  const azure = transform("azure-openai", "x".repeat(50), { toolNameMaxLength: 40 });
  assert.ok(azure.tools[0].function.name.length <= 40);
  // A provider with neither a registry nor a built-in limit keeps honoring the connection.
  assert.equal(resolveToolNameMaxLength("openai-compatible-gw", { toolNameMaxLength: 48 }), 48);
  assert.equal(resolveToolNameMaxLength("openai-compatible-gw", undefined), undefined);
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(process.env.DATA_DIR as string, { recursive: true, force: true });
});
