import assert from "node:assert/strict";
import test from "node:test";
import type { z } from "zod";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";
import { restoreOpenAIToolNames } from "../../open-sse/translator/helpers/toolCallHelper.ts";
import { validateProviderSpecificData } from "../../src/shared/validation/providerSpecificData.ts";

// A custom OpenAI-compatible node in front of LiteLLM -> Bedrock Converse rejects tool
// names over 64 chars ("Member must have length less than or equal to 64"), and Claude
// Code MCP names routinely exceed that. Custom nodes have no registry entry, so the
// limit must come from the connection's providerSpecificData.
const LONG = "mcp__example-observability-prod__trace_top_time_consuming_operations"; // 68 chars
const COMPATIBLE = "openai-compatible-chat-gateway";

type ChatBody = {
  model: string;
  tools: Array<{ type: string; function: { name: string; parameters: object } }>;
  messages: Array<{ role: string; content: string }>;
  _toolNameMap?: Map<string, string>;
};

function chatBody(): ChatBody {
  return {
    model: "m",
    tools: [{ type: "function", function: { name: LONG, parameters: { type: "object" } } }],
    messages: [{ role: "user", content: "hi" }],
  };
}

function transform(provider: string, providerSpecificData?: Record<string, unknown>): ChatBody {
  const executor = new DefaultExecutor(provider);
  return executor.transformRequest("m", chatBody(), false, {
    apiKey: "k",
    providerSpecificData,
  }) as ChatBody;
}

test("compatible connection with toolNameMaxLength aliases long tool names and restores them", () => {
  const out = transform(COMPATIBLE, { toolNameMaxLength: 64 });
  const sent = out.tools[0].function.name;
  assert.ok(sent.length <= 64, `sent name is ${sent.length} chars`);
  assert.equal(out._toolNameMap?.get(sent), LONG);

  const response = {
    choices: [
      {
        message: {
          tool_calls: [{ id: "c1", type: "function", function: { name: sent, arguments: "{}" } }],
        },
      },
    ],
  };
  restoreOpenAIToolNames(response, out._toolNameMap as Map<string, string>);
  assert.equal(response.choices[0].message.tool_calls[0].function.name, LONG);
});

test("compatible connection without toolNameMaxLength leaves tool names unchanged", () => {
  const out = transform(COMPATIBLE);
  assert.equal(out.tools[0].function.name, LONG);
  assert.equal(out._toolNameMap, undefined);
});

test("registry toolNameMaxLength still applies when the connection sets none", () => {
  const out = transform("nvidia");
  assert.ok(out.tools[0].function.name.length <= 64);
});

function collectIssues() {
  const issues: Array<{ path: (string | number)[] }> = [];
  const ctx = {
    addIssue: (issue: { path?: (string | number)[] }) => issues.push({ path: issue.path ?? [] }),
  } as unknown as z.RefinementCtx;
  return { ctx, issues };
}

test("validateProviderSpecificData accepts a positive integer toolNameMaxLength", () => {
  const { ctx, issues } = collectIssues();
  validateProviderSpecificData({ toolNameMaxLength: 64 }, ctx);
  assert.deepEqual(issues, []);
});

test("validateProviderSpecificData rejects an invalid toolNameMaxLength", () => {
  for (const bad of [0, -1, 1.5, "64", 1025]) {
    const { ctx, issues } = collectIssues();
    validateProviderSpecificData({ toolNameMaxLength: bad }, ctx);
    assert.deepEqual(
      issues.map((i) => i.path),
      [["toolNameMaxLength"]],
      String(bad)
    );
  }
});
