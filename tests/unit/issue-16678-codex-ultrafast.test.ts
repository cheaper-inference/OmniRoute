import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeCodexServiceTier,
  normalizeRequestDefaults,
  getCodexRequestDefaults,
} from "../../src/lib/providers/requestDefaults.ts";
import {
  applyCodexGlobalFastServiceTier,
  resolveCodexGlobalFastServiceTier,
} from "../../src/lib/providers/codexFastTier.ts";
import {
  createProviderSchema,
  updateProviderConnectionSchema,
} from "../../src/shared/validation/schemas.ts";
import { updateSettingsSchema } from "../../src/shared/validation/settingsSchemas.ts";
import { CodexExecutor } from "../../open-sse/executors/codex.ts";
import { withApiKeyCodexServiceMode } from "../../src/lib/providers/codexApiKeyServiceMode.ts";
import {
  resolveEffectiveServiceTier,
  resolveReportedServiceTier,
} from "../../open-sse/handlers/chatCore/serviceTier.ts";

const models = ["gpt-6-astra", "gpt-6.1-sol"];
const data = { requestDefaults: { serviceTier: "ultrafast" } };
const credentials = { providerSpecificData: data };
const global = { codexServiceTier: { enabled: true, tier: "ultrafast" } };
const executor = new CodexExecutor();

test("Ultrafast survives normalization and connection defaults", () => {
  assert.equal(normalizeCodexServiceTier(" ULTRAFAST "), "ultrafast");
  assert.equal(
    normalizeRequestDefaults("codex", { serviceTier: "ultrafast" })?.serviceTier,
    "ultrafast"
  );
  assert.equal(getCodexRequestDefaults(data).serviceTier, "ultrafast");
});

test("create/update provider and global settings accept Ultrafast", () => {
  assert.equal(
    createProviderSchema.safeParse({
      provider: "codex",
      name: "fixture",
      apiKey: "fixture",
      providerSpecificData: data,
    }).success,
    true
  );
  assert.equal(
    updateProviderConnectionSchema.safeParse({ providerSpecificData: data }).success,
    true
  );
  assert.equal(updateSettingsSchema.safeParse(global).success, true);
});

test("Ultrafast defaults to the exact official model list and preserves an empty selection", () => {
  const resolved = resolveCodexGlobalFastServiceTier(global);
  assert.equal(resolved.tier, "ultrafast");
  assert.deepEqual([...resolved.supportedModels].sort(), [...models].sort());
  assert.deepEqual(
    resolveCodexGlobalFastServiceTier({
      codexServiceTier: { ...global.codexServiceTier, supportedModels: [] },
    }).supportedModels,
    []
  );
});

for (const model of [...models, "codex/gpt-6-astra"]) {
  test(`global and connection defaults emit Ultrafast for ${model}`, () => {
    const body: Record<string, unknown> = { model, input: "hello" };
    const applied = applyCodexGlobalFastServiceTier("codex", { providerSpecificData: {} }, global, {
      model,
      body,
    });
    assert.equal(body.service_tier, "ultrafast");
    assert.equal(getCodexRequestDefaults(applied.providerSpecificData).serviceTier, "ultrafast");
    const source = { input: "hello" };
    assert.equal(
      executor.transformRequest(model, source, false, credentials).service_tier,
      "ultrafast"
    );
    assert.deepEqual(source, { input: "hello" });
    assert.equal(resolveEffectiveServiceTier("codex", data, { model }), "ultrafast");
  });
}

for (const model of ["gpt-5.6-sol", "gpt-6-astra-unknown", "gpt-6.1-sol-high", "", undefined]) {
  test(`automatic Ultrafast does not apply to ${String(model)}`, () => {
    const body: Record<string, unknown> = { input: "hello" };
    const settings = {
      codexServiceTier: { ...global.codexServiceTier, supportedModels: [model || "gpt-6-astra"] },
    };
    const applied = applyCodexGlobalFastServiceTier("codex", credentials, settings, {
      model,
      body,
    });
    assert.equal(applied, credentials);
    assert.equal(body.service_tier, undefined);
    if (model !== undefined)
      assert.equal(
        executor.transformRequest(model, body, false, credentials).service_tier,
        undefined
      );
    assert.equal(resolveEffectiveServiceTier("codex", data, { model }), "standard");
  });
}

test("deselected eligible model does not receive the global override", () => {
  const body: Record<string, unknown> = { input: "hello" };
  const source = { providerSpecificData: { requestDefaults: { serviceTier: "flex" } } };
  assert.equal(
    applyCodexGlobalFastServiceTier(
      "codex",
      source,
      { codexServiceTier: { ...global.codexServiceTier, supportedModels: [] } },
      { model: models[0], body }
    ),
    source
  );
  assert.equal(body.service_tier, undefined);
});

test("explicit caller tier survives global defaults and unsupported-model passthrough", () => {
  for (const tier of ["ultrafast", "flex", "default", "priority"]) {
    const body: Record<string, unknown> = { model: models[0], input: "hello", service_tier: tier };
    applyCodexGlobalFastServiceTier("codex", credentials, global, { model: models[0], body });
    assert.equal(body.service_tier, tier);
    assert.equal(
      executor.transformRequest("gpt-5.6-sol", body, false, credentials).service_tier,
      tier
    );
    assert.equal(resolveEffectiveServiceTier("codex", data, body), tier);
  }
});

test("API key policy still overrides explicit caller and connection Ultrafast", () => {
  const wrapped = withApiKeyCodexServiceMode("codex", credentials, "default");
  assert.equal(
    executor.transformRequest(
      models[0],
      { input: "hello", service_tier: "ultrafast" },
      false,
      wrapped
    ).service_tier,
    "default"
  );
  assert.deepEqual(credentials, { providerSpecificData: data });
});

test("upstream reported Ultrafast is recognized without inferring it from status", () => {
  assert.equal(
    resolveReportedServiceTier("codex", { response: { service_tier: "ultrafast" } }),
    "ultrafast"
  );
  assert.equal(resolveReportedServiceTier("codex", { status: 200 }), null);
  assert.equal(resolveReportedServiceTier("openai", { service_tier: "ultrafast" }), null);
});

test("existing tier contracts, unknown rejection and non-Codex behavior remain intact", () => {
  assert.equal(normalizeCodexServiceTier("fast"), "priority");
  for (const tier of ["default", "priority", "flex"])
    assert.equal(normalizeCodexServiceTier(tier), tier);
  assert.equal(normalizeCodexServiceTier("bogus-tier"), undefined);
  assert.equal(
    updateSettingsSchema.safeParse({ codexServiceTier: { enabled: true, tier: "bogus-tier" } })
      .success,
    false
  );
  assert.equal(
    applyCodexGlobalFastServiceTier("openai", credentials, global, { model: models[0] }),
    credentials
  );
  assert.equal(resolveEffectiveServiceTier("openai", data, { model: models[0] }), "standard");
});

test("Ultrafast model selections require exact IDs, not prefix guesses", () => {
  const body: Record<string, unknown> = { input: "hello" };
  const source = { providerSpecificData: { requestDefaults: { serviceTier: "flex" } } };
  const settings = { codexServiceTier: { ...global.codexServiceTier, supportedModels: ["gpt-6"] } };
  assert.equal(
    applyCodexGlobalFastServiceTier("codex", source, settings, { model: "gpt-6-astra", body }),
    source
  );
  assert.equal(body.service_tier, undefined);
});
