import assert from "node:assert/strict";
import test from "node:test";
import {
  buildNativeReasoningFamilies,
  resolveNativeReasoningFamily,
  filterForcedReasoningModels,
} from "../../open-sse/services/nativeReasoningFamilies.ts";

const catalog = [
  { id: "gemini-4-hydrogen-low", name: "Hydrogen (Low)" },
  { id: "gemini-4-hydrogen-high", name: "Hydrogen (High)" },
  { id: "gemini-4-hydrogen-xhigh", name: "Hydrogen (Extra)" },
  { id: "claude-opus-5-5-medium", name: "Opus (Medium)" },
  { id: "claude-opus-5-5-high", name: "Opus (High)" },
  { id: "gemini-4-carbon-disabled", name: "Carbon unavailable" },
];
for (const provider of ["antigravity", "agy"]) {
  test(`${provider}: families advertise only discovered effort variants`, () => {
    const families = buildNativeReasoningFamilies(provider, catalog);
    assert.deepEqual(
      families.map((f) => f.id),
      ["gemini-4-hydrogen", "claude-opus-5-5"]
    );
    assert.deepEqual(families[0].supportedThinkingEfforts, ["low", "high", "xhigh"]);
    assert.equal(families[0].defaultThinkingEffort, "high");
    assert.equal(families[0].nativeReasoningVariants.medium, undefined);
  });
  test(`${provider}: both protocol shapes select an exact tier without mutation`, () => {
    const family = buildNativeReasoningFamilies(provider, catalog)[0];
    for (const body of [{ reasoning_effort: "xhigh" }, { reasoning: { effort: "xhigh" } }]) {
      const before = JSON.stringify(body);
      assert.equal(resolveNativeReasoningFamily(family, body).model, "gemini-4-hydrogen-xhigh");
      assert.equal(JSON.stringify(body), before);
    }
    assert.equal(resolveNativeReasoningFamily(family, {}).model, "gemini-4-hydrogen-high");
    assert.equal(
      resolveNativeReasoningFamily(family, { reasoning_effort: "medium" }).error,
      "unsupported_reasoning_effort"
    );
  });
  test(`${provider}: hide only fixed variants with an available family`, () => {
    const families = buildNativeReasoningFamilies(provider, catalog);
    assert.deepEqual(
      filterForcedReasoningModels(provider, [...catalog, ...families], true).map((m) => m.id),
      ["gemini-4-carbon-disabled", "gemini-4-hydrogen", "claude-opus-5-5"]
    );
    assert.equal(filterForcedReasoningModels(provider, catalog, false), catalog);
  });
}
test("other providers, unavailable rows and native base names are not reinterpreted", () => {
  assert.deepEqual(buildNativeReasoningFamilies("openai", catalog), []);
  assert.deepEqual(
    buildNativeReasoningFamilies("antigravity", [
      { id: "model-high" },
      { id: "gemini-test-high", supportedInApi: false },
    ]),
    []
  );
  assert.deepEqual(
    buildNativeReasoningFamilies("antigravity", [
      { id: "gemini-test" },
      { id: "gemini-test-high" },
    ]),
    []
  );
});
test("an account with low only never gains a high tier from another account", () => {
  const family = buildNativeReasoningFamilies("antigravity", [catalog[0]])[0];
  assert.deepEqual(family.supportedThinkingEfforts, ["low"]);
  assert.equal(
    resolveNativeReasoningFamily(family, { reasoning_effort: "high" }).error,
    "unsupported_reasoning_effort"
  );
});

test("family defaults and limits do not inherit a fixed low variant's capabilities", () => {
  const [family] = buildNativeReasoningFamilies("antigravity", [
    {
      id: "gemini-4-hydrogen-low",
      defaultThinkingEffort: "low",
      inputTokenLimit: 2000,
      supportsVision: true,
    },
    {
      id: "gemini-4-hydrogen-high",
      defaultThinkingEffort: "high",
      inputTokenLimit: 1000,
      supportsVision: false,
    },
  ]);
  assert.equal(family.defaultThinkingEffort, "high");
  assert.equal(family.inputTokenLimit, 1000);
  assert.equal(family.supportsVision, undefined);
});

test("fixed-tier visibility also works when upstream already has a native base model", () => {
  const rows = [{ id: "gemini-4-hydrogen" }, { id: "gemini-4-hydrogen-high" }];
  assert.deepEqual(filterForcedReasoningModels("antigravity", rows, true), [rows[0]]);
});

test("an inherited object key is never a reasoning tier", () => {
  const [family] = buildNativeReasoningFamilies("antigravity", catalog);
  for (const reasoning_effort of ["constructor", "toString", "__proto__", "hasOwnProperty"]) {
    const choice = resolveNativeReasoningFamily(family, { reasoning_effort });
    assert.equal(choice.error, "unsupported_reasoning_effort", reasoning_effort);
    assert.equal(choice.model, undefined, reasoning_effort);
  }
});

test("combo metadata for a native family keeps the family limits and vision", async () => {
  const { nativeReasoningComboMetadata } =
    await import("../../src/app/api/v1/models/nativeReasoningCatalog.ts");
  const rows = [
    {
      id: "gemini-4-hydrogen-low",
      inputTokenLimit: 2000,
      outputTokenLimit: 800,
      supportsVision: true,
    },
    {
      id: "gemini-4-hydrogen-high",
      inputTokenLimit: 1000,
      outputTokenLimit: 900,
      supportsVision: true,
    },
  ];
  const metadata = nativeReasoningComboMetadata(
    "antigravity",
    "gemini-4-hydrogen",
    {},
    [{ id: "acct-1" }],
    { "acct-1": rows },
    () => true
  );
  assert.ok(metadata);
  assert.deepEqual(metadata.capabilities.effort_tiers, ["low", "high"]);
  assert.equal(metadata.contextLength, 1000, "the smallest tier window bounds the family");
  assert.equal(metadata.maxInputTokens, 1000);
  assert.equal(metadata.maxOutputTokens, 800);
  assert.equal(metadata.capabilities.vision, true);
  assert.deepEqual(metadata.inputModalities, ["text", "image"]);

  const unknownLimits = nativeReasoningComboMetadata(
    "antigravity",
    "gemini-4-hydrogen",
    {},
    [{ id: "acct-1" }],
    { "acct-1": [{ id: "gemini-4-hydrogen-low" }, { id: "gemini-4-hydrogen-high" }] },
    () => true
  );
  assert.equal(unknownLimits?.contextLength, undefined, "no limit evidence, no invented window");
  assert.equal(unknownLimits?.capabilities.vision, undefined);
});
