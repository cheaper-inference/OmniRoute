// tests/unit/chatcore-execution-credentials.test.ts
// Characterization of resolveExecutionCredentials — the per-execution credentials builder extracted
// from handleChatCore (chatCore god-file decomposition, #3501). Locks: the native-Codex passthrough
// endpoint override, the Azure AI / OCI apiType=responses forcing (+ responses-upstream marker) only
// under the OpenAI Responses target format, respecting an explicit apiType, and the Claude Code
// session-id threading.
import { test } from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";
import {
  getExecutionConnectionId,
  resolveExecutionCredentials,
} from "../../open-sse/handlers/chatCore/executionCredentials.ts";

const RESPONSES = "openai-responses";

const base = {
  credentials: { providerSpecificData: { foo: "bar" } } as Record<string, unknown>,
  nativeCodexPassthrough: false,
  endpointPath: "/v1/responses",
  targetFormat: "openai",
  provider: "openai",
  ccSessionId: null,
};

test("non-passthrough leaves credentials without a requestEndpointPath", () => {
  const out = resolveExecutionCredentials({ ...base }) as Record<string, unknown>;
  assert.equal("requestEndpointPath" in out, false);
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});

test("native Codex passthrough injects requestEndpointPath", () => {
  const out = resolveExecutionCredentials({
    ...base,
    nativeCodexPassthrough: true,
  }) as Record<string, unknown>;
  assert.equal(out.requestEndpointPath, "/v1/responses");
});

test("native Responses passthrough (xAI via codex flag) injects requestEndpointPath (#8964)", () => {
  // chatCore ORs xAI into nativeCodexPassthrough before calling this helper.
  const out = resolveExecutionCredentials({
    ...base,
    provider: "xai-oauth",
    nativeCodexPassthrough: true,
  }) as Record<string, unknown>;
  assert.equal(out.requestEndpointPath, "/v1/responses");
});

test("azure-ai + responses target forces apiType=responses and the upstream marker", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "azure-ai",
    targetFormat: RESPONSES,
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("a non-responses apiType is forced to responses under the responses target", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "oci",
    targetFormat: RESPONSES,
    credentials: { providerSpecificData: { apiType: "chat" } },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("an explicit apiType=responses is preserved (guard short-circuits the reassignment)", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "oci",
    targetFormat: RESPONSES,
    credentials: { providerSpecificData: { apiType: "responses" } },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, "responses");
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("non azure/oci providers never get apiType forcing", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "openai",
    targetFormat: RESPONSES,
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, undefined);
  assert.equal(psd._omnirouteForceResponsesUpstream, undefined);
});

test("AgentRouter threads the resolved Responses protocol only into execution credentials", () => {
  const credentials = { providerSpecificData: { apiKeyHealth: {} } };
  const out = resolveExecutionCredentials({
    ...base,
    provider: "agentrouter",
    targetFormat: RESPONSES,
    credentials,
  }) as Record<string, unknown>;

  assert.deepEqual(out.providerSpecificData, {
    apiKeyHealth: {},
    targetFormat: RESPONSES,
  });
  assert.deepEqual(credentials.providerSpecificData, { apiKeyHealth: {} });
});

test("#8969: poe + responses target sets the responses-upstream marker (no apiType)", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "poe",
    targetFormat: RESPONSES,
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.apiType, undefined);
  assert.equal(psd._omnirouteForceResponsesUpstream, true);
});

test("#8969: poe + claude target disables OpenAI stream_options injection", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "poe",
    targetFormat: "claude",
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.disableStreamOptions, true);
  assert.equal(psd._omnirouteForceResponsesUpstream, undefined);
});

test("ccSessionId is threaded into providerSpecificData when present", () => {
  const out = resolveExecutionCredentials({
    ...base,
    ccSessionId: "sess-123",
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd.ccSessionId, "sess-123");
  assert.equal(psd.foo, "bar");
});

test("missing providerSpecificData defaults to an empty object", () => {
  const out = resolveExecutionCredentials({
    ...base,
    credentials: { connectionId: "c1" },
  }) as Record<string, unknown>;
  assert.deepEqual(out.providerSpecificData, {});
  assert.equal(out.connectionId, "c1");
});

test("getExecutionConnectionId validates and trims the execution credential id", () => {
  assert.equal(getExecutionConnectionId({ connectionId: "  c1  " }), "c1");
  assert.equal(getExecutionConnectionId({ connectionId: 42 }), null);
  assert.equal(getExecutionConnectionId(null), null);
});

test("Kimi execution credentials carry the discovered protocol and thinking policy", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "kimi-coding",
    targetFormat: "claude",
    modelInfo: {
      supportsThinking: true,
      alwaysThinking: true,
      supportedThinkingEfforts: ["low", "medium", "high"],
      defaultThinkingEffort: "medium",
    },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.equal(psd._omnirouteKimiTargetFormat, "claude");
  assert.deepEqual(psd._omnirouteKimiThinking, {
    supportsThinking: true,
    alwaysThinking: true,
    supportedThinkingEfforts: ["low", "medium", "high"],
    defaultThinkingEffort: "medium",
  });
});

test("Kimi Code k3 exposes its documented efforts from the offline policy before model import", () => {
  const out = resolveExecutionCredentials({
    ...base,
    provider: "kimi-coding",
    targetFormat: "claude",
    modelInfo: { model: "k3" },
  }) as Record<string, unknown>;
  const psd = out.providerSpecificData as Record<string, unknown>;
  assert.deepEqual(psd._omnirouteKimiThinking, {
    supportsThinking: true,
    supportedThinkingEfforts: ["low", "high", "max"],
    defaultThinkingEffort: "max",
  });
});

const codexBase = {
  ...base,
  provider: "codex",
  targetFormat: RESPONSES,
  modelInfo: {
    model: "gpt-5.6-sol",
    supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
    defaultThinkingEffort: "high",
  },
};

function codexMetadata(requestBody?: Record<string, unknown>) {
  const out = resolveExecutionCredentials({ ...codexBase, requestBody });
  return z.record(z.string(), z.unknown()).parse(out.providerSpecificData._omnirouteCodexThinking);
}

const effortCarriers: Array<{
  name: string;
  body: Record<string, unknown>;
  expected: string;
}> = [
  {
    name: "Claude output_config",
    body: { output_config: { effort: "medium" } },
    expected: "medium",
  },
  { name: "nested OpenAI", body: { reasoning: { effort: "high" } }, expected: "high" },
  { name: "flat OpenAI", body: { reasoning_effort: "low" }, expected: "low" },
  {
    name: "Claude over conflicting OpenAI carriers",
    body: {
      output_config: { effort: "medium" },
      reasoning: { effort: "high" },
      reasoning_effort: "low",
    },
    expected: "medium",
  },
  {
    name: "nested over flat OpenAI",
    body: { reasoning: { effort: "high" }, reasoning_effort: "low" },
    expected: "high",
  },
];

for (const { name, body, expected } of effortCarriers) {
  test(`Codex metadata preserves ${name} effort (#18746)`, () => {
    assert.equal(codexMetadata(body).requestedThinkingEffort, expected);
  });
}

const unusableClaudeEfforts: Array<[string, unknown]> = [
  ["undefined", undefined],
  ["null", null],
  ["empty", ""],
  ["blank", "   "],
  ["number", 42],
  ["object", {}],
  ["array", []],
];

for (const [name, value] of unusableClaudeEfforts) {
  for (const carrier of ["nested", "flat"]) {
    test(`unusable ${name} Claude effort retains ${carrier} original effort (#18746)`, () => {
      const body = {
        output_config: { effort: value },
        ...(carrier === "nested"
          ? { reasoning: { effort: "high" }, reasoning_effort: "low" }
          : { reasoning_effort: "high" }),
      };
      assert.equal(codexMetadata(body).requestedThinkingEffort, "high");
    });
  }
}

test("empty Codex request omits own requestedThinkingEffort metadata (#18746)", () => {
  assert.equal(Object.hasOwn(codexMetadata({}), "requestedThinkingEffort"), false);
});

test("missing Codex request retains catalog metadata without an effort property", () => {
  assert.deepEqual(codexMetadata(), {
    model: "gpt-5.6-sol",
    supportedThinkingEfforts: ["low", "medium", "high", "xhigh"],
    defaultThinkingEffort: "high",
    resolvedThinkingEffort: undefined,
  });
});

test("Codex metadata capture does not mutate input credentials or request", () => {
  const credentials = { providerSpecificData: { requestDefaults: { reasoningEffort: "low" } } };
  const requestBody = { output_config: { effort: "medium" } };
  const originalCredentials = structuredClone(credentials);
  const originalRequest = structuredClone(requestBody);
  const out = resolveExecutionCredentials({ ...codexBase, credentials, requestBody });
  assert.ok(Object.hasOwn(out.providerSpecificData, "_omnirouteCodexThinking"));
  assert.deepEqual(credentials, originalCredentials);
  assert.deepEqual(requestBody, originalRequest);
});

test("uncatalogued Codex model still carries the Claude effort without catalog fields (#18947)", () => {
  const out = resolveExecutionCredentials({
    ...codexBase,
    modelInfo: null,
    requestBody: { output_config: { effort: "medium" }, reasoning_effort: "low" },
  });
  assert.deepEqual(out.providerSpecificData._omnirouteCodexThinking, {
    requestedThinkingEffort: "medium",
  });
});

test("uncatalogued Codex model without any effort omits the metadata (#18947)", () => {
  const out = resolveExecutionCredentials({ ...codexBase, modelInfo: null, requestBody: {} });
  assert.equal(Object.hasOwn(out.providerSpecificData, "_omnirouteCodexThinking"), false);
});

test("non-Codex credentials never capture Codex effort metadata", () => {
  const out = resolveExecutionCredentials({
    ...codexBase,
    provider: "openai",
    requestBody: { output_config: { effort: "medium" } },
  });
  assert.deepEqual(out.providerSpecificData, { foo: "bar" });
});
