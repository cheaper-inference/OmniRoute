/**
 * Unit test suite validating Mistral correctness safeguards:
 * - toolNameMaxLength of 64 on mistralProvider
 * - DefaultExecutor tool name length truncation and character aliasing
 * - parallel_tool_calls reaching Mistral, which documents it as a request parameter
 * - Dynamic reasoning_effort sanitization based on Mistral's own model catalog
 * - Dynamic supportsTools extraction from capabilities.function_calling in modelDiscovery
 * - Dynamic provider listing in handleModeration error responses
 */

import { test } from "node:test";
import assert from "node:assert/strict";

import { mistralProvider } from "@omniroute/open-sse/config/providers/registry/mistral/index.ts";
import { getUnsupportedParams } from "@omniroute/open-sse/config/providerRegistry.ts";
import DefaultExecutor from "@omniroute/open-sse/executors/default.ts";
import { stripUnsupportedParams } from "@omniroute/open-sse/translator/paramSupport.ts";
import { sanitizeReasoningEffortForProvider } from "@omniroute/open-sse/executors/base/reasoningEffort.ts";
import { normalizeDiscoveredModels } from "@/lib/providerModels/modelDiscovery";
import { handleModeration } from "@omniroute/open-sse/handlers/moderations.ts";

test("mistralProvider declares toolNameMaxLength of 64", () => {
  assert.equal(mistralProvider.toolNameMaxLength, 64);
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

// Mistral documents parallel_tool_calls on chat completions: `false` "forces the model to use
// single tool calling", so dropping it silently changes what the client asked for.
test("parallel_tool_calls reaches Mistral on both strip paths", () => {
  assert.ok(
    !getUnsupportedParams("mistral", "mistral-large-latest").includes("parallel_tool_calls")
  );

  const body = {
    model: "mistral-large-latest",
    parallel_tool_calls: false,
    temperature: 0.7,
  };
  stripUnsupportedParams("mistral", "mistral-large-latest", body);
  assert.equal(body.parallel_tool_calls, false);
  assert.equal(body.temperature, 0.7);
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

// getProviderModel() falls through to other providers' entries and to fuzzy matches, so an id
// outside Mistral's catalog would be judged by a model that is not the one being called.
test("sanitizeReasoningEffortForProvider keeps reasoning_effort for ids outside Mistral's catalog", () => {
  for (const model of ["mistral-small-2603", "mistral-medium-latest", "zai-glm-5-3"]) {
    const sanitized = sanitizeReasoningEffortForProvider(
      { model, reasoning_effort: "high" },
      "mistral",
      model
    );
    assert.equal(sanitized.reasoning_effort, "high", model);
  }
});

test("sanitizeReasoningEffortForProvider resolves a provider-prefixed Mistral catalog id", () => {
  const model = "mistral/mistral-large-latest";
  const sanitized = sanitizeReasoningEffortForProvider(
    { model, reasoning_effort: "high" },
    "mistral",
    model
  );
  assert.equal(sanitized.reasoning_effort, undefined);
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
