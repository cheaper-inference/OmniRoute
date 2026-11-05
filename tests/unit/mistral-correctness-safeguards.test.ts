import { test } from "node:test";
import assert from "node:assert/strict";

import { mistralProvider } from "@omniroute/open-sse/config/providers/registry/mistral/index.ts";
import DefaultExecutor from "@omniroute/open-sse/executors/default.ts";
import { stripUnsupportedParams } from "@omniroute/open-sse/translator/paramSupport.ts";
import { sanitizeReasoningEffortForProvider } from "@omniroute/open-sse/executors/base/reasoningEffort.ts";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import { handleModeration } from "@omniroute/open-sse/handlers/moderations.ts";

test("mistralProvider declares toolNameMaxLength of 64 and unsupportedParams for parallel_tool_calls", () => {
  assert.equal(mistralProvider.toolNameMaxLength, 64);
  assert.ok(Array.isArray(mistralProvider.unsupportedParams));
  assert.ok(mistralProvider.unsupportedParams?.includes("parallel_tool_calls"));
});

test("DefaultExecutor applies toolNameMaxLength and character sanitization for Mistral", () => {
  const executor = new DefaultExecutor("mistral");
  const longName = "a".repeat(70);
  const dottedName = "tools.opencode.list_mcp_resources";

  const body: Record<string, unknown> = {
    model: "mistral-large-latest",
    messages: [{ role: "user", content: "hello" }],
    tools: [
      {
        type: "function",
        function: { name: dottedName, description: "dotted tool" },
      },
      {
        type: "function",
        function: { name: longName, description: "long tool" },
      },
    ],
  };

  const transformed = executor.transformRequest("mistral-large-latest", body, false, {
    apiKey: "test-key",
  }) as Record<string, unknown>;

  const tools = transformed.tools as Array<{ function: { name: string } }>;
  assert.equal(tools.length, 2);

  // Dotted name should be aliased to a valid identifier (alphanumeric/underscore/hyphen, <= 64 chars)
  assert.ok(tools[0].function.name.startsWith("tools_opencode_list_mcp_resources"));
  assert.ok(tools[0].function.name.length <= 64);
  assert.ok(/^[a-zA-Z0-9_-]+$/.test(tools[0].function.name));

  // Long name (>64 chars) should be truncated/hashed to <= 64 chars
  assert.ok(tools[1].function.name.length <= 64);
  assert.ok(/^[a-zA-Z0-9_-]+$/.test(tools[1].function.name));

  // _toolNameMap should record mappings for restoration
  const toolNameMap = (
    transformed as Record<string, unknown> & { _toolNameMap?: Map<string, string> }
  )._toolNameMap;
  assert.ok(toolNameMap instanceof Map);
  assert.equal(toolNameMap.get(tools[0].function.name), dottedName);
  assert.equal(toolNameMap.get(tools[1].function.name), longName);
});

test("stripUnsupportedParams strips parallel_tool_calls for mistral, preserves for openai", () => {
  const mistralBody = {
    model: "mistral-large-latest",
    parallel_tool_calls: true,
    temperature: 0.7,
  };
  stripUnsupportedParams("mistral", "mistral-large-latest", mistralBody);
  assert.equal(mistralBody.parallel_tool_calls, undefined);
  assert.equal(mistralBody.temperature, 0.7);

  const openaiBody = {
    model: "gpt-4o",
    parallel_tool_calls: true,
    temperature: 0.7,
  };
  stripUnsupportedParams("openai", "gpt-4o", openaiBody);
  assert.equal(openaiBody.parallel_tool_calls, true);
});

test("sanitizeReasoningEffortForProvider dynamically strips reasoning_effort for non-reasoning Mistral models", () => {
  // Non-reasoning Mistral models must strip reasoning_effort
  const nonReasoningBody = {
    model: "mistral-large-latest",
    reasoning_effort: "high",
  };
  const sanitizedNonReasoning = sanitizeReasoningEffortForProvider(
    nonReasoningBody,
    "mistral",
    "mistral-large-latest"
  );
  assert.equal(sanitizedNonReasoning.reasoning_effort, undefined);

  // Codestral is non-reasoning
  const codestralBody = {
    model: "codestral-latest",
    reasoning_effort: "medium",
  };
  const sanitizedCodestral = sanitizeReasoningEffortForProvider(
    codestralBody,
    "mistral",
    "codestral-latest"
  );
  assert.equal(sanitizedCodestral.reasoning_effort, undefined);

  // Reasoning Mistral models must preserve reasoning_effort
  const reasoningBody = {
    model: "mistral-large-4",
    reasoning_effort: "high",
  };
  const sanitizedReasoning = sanitizeReasoningEffortForProvider(
    reasoningBody,
    "mistral",
    "mistral-large-4"
  );
  assert.equal(sanitizedReasoning.reasoning_effort, "high");

  // Non-Mistral providers remain unaffected
  const openaiBody = {
    model: "o3-mini",
    reasoning_effort: "high",
  };
  const sanitizedOpenai = sanitizeReasoningEffortForProvider(openaiBody, "openai", "o3-mini");
  assert.equal(sanitizedOpenai.reasoning_effort, "high");
});

test("normalizeDiscoveredModels dynamically extracts supportsTools for Mistral from capabilities.function_calling", () => {
  // When function_calling is true
  const [modelWithTools] = normalizeDiscoveredModels(
    [
      {
        id: "mistral-large-latest",
        object: "model",
        capabilities: { function_calling: true },
      },
    ],
    "mistral"
  );
  assert.equal(modelWithTools.supportsTools, true);

  // When function_calling is explicitly false
  const [modelWithoutTools] = normalizeDiscoveredModels(
    [
      {
        id: "mistral-embed",
        object: "model",
        capabilities: { function_calling: false },
      },
    ],
    "mistral"
  );
  assert.equal(modelWithoutTools.supportsTools, false);
});

test("handleModeration dynamically lists all available providers in error message", async () => {
  const res = (await handleModeration({
    body: { input: "hello", model: "unknown-provider/unknown-model" },
    credentials: { apiKey: "test-key" },
  })) as Response;

  assert.equal(res.status, 400);
  const data = (await res.json()) as { error: { message: string } };
  assert.ok(data.error.message.includes("Available:"));
  assert.ok(data.error.message.includes("openai"));
  assert.ok(data.error.message.includes("mistral"));
});
