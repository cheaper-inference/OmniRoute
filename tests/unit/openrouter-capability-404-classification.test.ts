import test from "node:test";
import assert from "node:assert/strict";
import {
  classifyProviderError,
  isResourceNotFoundResponse,
  isRequestCapabilityNotFoundResponse,
  PROVIDER_ERROR_TYPES,
} from "../../open-sse/services/errorClassifier.ts";
import { getResource404Bypass } from "../../src/sse/services/requestResourceHealth.ts";

test("#19686: OpenRouter capability 404 does not classify as MODEL_NOT_FOUND", () => {
  const capabilityErrors = [
    "No endpoints found that support image input",
    "No endpoints found that support tool use",
    "No allowed providers are available for this request",
    "No allowed providers",
    "No endpoints found matching your data policy",
    { error: { message: "No endpoints found that support image input" } },
    { error: { message: "No allowed providers found for request" } },
    { error: { message: "No endpoints found matching your data policy" } },
  ];

  for (const body of capabilityErrors) {
    assert.equal(
      isRequestCapabilityNotFoundResponse(body),
      true,
      `Expected isRequestCapabilityNotFoundResponse to be true for: ${JSON.stringify(body)}`
    );
    assert.equal(
      isResourceNotFoundResponse(body),
      true,
      `Expected isResourceNotFoundResponse to be true for: ${JSON.stringify(body)}`
    );
    assert.equal(
      classifyProviderError(404, body, "openrouter"),
      null,
      `Expected classifyProviderError(404) to return null (not lock model) for: ${JSON.stringify(body)}`
    );
  }
});

test("#19686: genuine missing model 404 still classifies as MODEL_NOT_FOUND", () => {
  const deadModelErrors = [
    "No endpoints found for deepseek/deepseek-chat",
    "No endpoints found for non-existent-model",
    "model 'deepseek/deepseek-v4-flash-0731' not found",
    { error: { message: "No endpoints found for meta-llama/llama-3-70b" } },
    { error: { message: "Model not found" } },
  ];

  for (const body of deadModelErrors) {
    assert.equal(
      isRequestCapabilityNotFoundResponse(body),
      false,
      `Expected isRequestCapabilityNotFoundResponse to be false for: ${JSON.stringify(body)}`
    );
    assert.equal(
      classifyProviderError(404, body, "openrouter"),
      PROVIDER_ERROR_TYPES.MODEL_NOT_FOUND,
      `Expected classifyProviderError(404) to return MODEL_NOT_FOUND for: ${JSON.stringify(body)}`
    );
  }
});

test("#19686: getResource404Bypass bypasses cooldown for OpenRouter capability 404", () => {
  const logs: string[] = [];
  const mockLogger = {
    info: (_tag: string, msg: string) => {
      logs.push(msg);
    },
  };

  const bypass = getResource404Bypass(
    404,
    "No endpoints found that support image input",
    "conn-12345678-abcd",
    mockLogger
  );

  assert.deepEqual(bypass, { shouldFallback: false, cooldownMs: 0 });
  assert.equal(logs.length, 1);
  assert.match(logs[0], /conn-123 request-resource 404; skipping model\/account cooldown/);
});
