import assert from "node:assert/strict";
import test from "node:test";
import { providerModelMutationSchema } from "../../src/shared/validation/schemas/provider.ts";
import { classifyModelSupportedEndpoints } from "../../src/shared/constants/modelSupportedEndpoints.ts";
import { getRegisteredEndpointAdapterStatuses } from "../../src/lib/providerModels/endpointAdapterAvailability.ts";
import { resolveProviderServiceKinds } from "../../open-sse/config/mediaServiceKinds.ts";
import { AI_PROVIDERS } from "../../src/shared/constants/providers.ts";
import {
  resolveEndpointCategory,
  resolveCanonicalEndpointPath,
} from "../../src/shared/constants/endpointCategories.ts";

test("native custom models retain decision type and default to their native endpoint", () => {
  const row = providerModelMutationSchema.parse({
    provider: "typesafe",
    modelId: "jev-1.14.0",
    apiFormat: "systemone",
    modelType: "decision",
  });
  assert.deepEqual(row.supportedEndpoints, ["systemone"]);
  assert.equal(row.modelType, "decision");
  assert.equal(row.apiFormat, "systemone");
});

test("decision metadata aliases normalize, and clearing an override is explicit", () => {
  for (const alias of ["decision", "decisions", "systemone"]) {
    const row = providerModelMutationSchema.parse({
      provider: "fixture",
      modelId: "any-maker/model",
      supportedEndpoints: [alias],
      modelType: null,
    });
    assert.deepEqual(row.supportedEndpoints, ["systemone"]);
    assert.equal(row.modelType, null);
  }
});

test("legacy decision model kinds normalize at the mutation boundary", () => {
  for (const modelType of ["decision", "decisions", "systemone"]) {
    const row = providerModelMutationSchema.parse({
      provider: "fixture",
      modelId: "native",
      modelType,
    });
    assert.equal(row.modelType, "decision");
    assert.deepEqual(row.supportedEndpoints, ["systemone"]);
    assert.equal(row.apiFormat, "systemone");
  }
});

test("decision classification does not override mixed chat capability", () => {
  assert.deepEqual(classifyModelSupportedEndpoints(["systemone"]), { type: "decision" });
  assert.deepEqual(classifyModelSupportedEndpoints(["chat", "systemone"]), {});
  const ordinary = providerModelMutationSchema.parse({ provider: "fixture", modelId: "chat" });
  assert.equal(ordinary.apiFormat, "chat-completions");
  assert.deepEqual(ordinary.supportedEndpoints, ["chat"]);
});

test("provider decision category follows native adapter evidence, not a model name", () => {
  for (const provider of ["typesafe", "openrouter", "vercel-ai-gateway", "opencode-zen"]) {
    assert.ok(resolveProviderServiceKinds(provider, ["llm"]).includes("decision"));
    assert.equal(getRegisteredEndpointAdapterStatuses(provider).systemone, "available");
  }
  assert.equal(getRegisteredEndpointAdapterStatuses("unregistered-fixture").systemone, "unknown");
  assert.ok(!resolveProviderServiceKinds("unregistered-fixture", ["llm"]).includes("decision"));
});

test("native-only provider cards declare decision without enabling chat testing", () => {
  assert.ok(AI_PROVIDERS.typesafe.serviceKinds.includes("decision"));
  assert.ok(!AI_PROVIDERS.typesafe.serviceKinds.includes("llm"));
});

test("the distinct Decisions contract uses the native decision ACL category", () => {
  assert.equal(resolveEndpointCategory("/v1/decisions"), "systemone");
  assert.equal(
    resolveEndpointCategory(resolveCanonicalEndpointPath("/api/v1/decisions")),
    "systemone"
  );
});
