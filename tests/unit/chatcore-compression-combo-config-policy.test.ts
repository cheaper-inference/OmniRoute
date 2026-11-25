// Regression for #21083: a named or routing-assigned combo kept its raw pipeline, so the
// lossy-request policy never reached the lite engine.
//
// The seeded default combo is sanitized in defaultComboForRequest before it is merged, but a
// named / routing combo went through mergeCompressionComboIntoConfig, which folded the combo's
// pipeline into the config verbatim. shouldRunResolvedPipeline() then refuses to replace that
// pipeline with the resolved (already-sanitized) one — a named combo is an explicit choice — so
// a bare `{ engine: "lite" }` step reached lite.ts with no config and its
// `compressToolResults !== false` gate defaulted to true, truncating every earlier tool result
// to DEFAULT_MAX_TOOL_LENGTH on turn 3+ of a long agent session.
import { test } from "node:test";
import assert from "node:assert/strict";

const { mergeCompressionComboIntoConfig } = await import(
  "../../open-sse/handlers/chatCore/compressionComboConfig.ts"
);
const { defaultComboForRequest } = await import(
  "../../open-sse/handlers/chatCore/compressionComboPredicates.ts"
);
const { DEFAULT_COMPRESSION_CONFIG } = await import(
  "../../open-sse/services/compression/types.ts"
);

const baseConfig = {
  ...DEFAULT_COMPRESSION_CONFIG,
  enabled: true,
  defaultMode: "stacked" as const,
};

/** The shape the issue reports: a session-dedup + bare lite pipeline, as an operator saves it. */
const namedCombo = {
  id: "default-caveman",
  pipeline: [{ engine: "session-dedup" }, { engine: "lite" }],
  languagePacks: ["en"],
  outputMode: false,
  outputModeIntensity: "full",
} as never;

const LOSSLESS_LITE = { compressToolResults: false, preserveToolWhitespace: true };

test("mergeCompressionComboIntoConfig keeps the policy's lossless lite step", () => {
  const merged = mergeCompressionComboIntoConfig(baseConfig, namedCombo, []);
  assert.ok(merged, "a combo with a pipeline is applied");
  assert.deepEqual(
    merged!.stackedPipeline,
    [{ engine: "session-dedup" }, { engine: "lite", config: LOSSLESS_LITE }],
    "the lite step must carry the policy's compressToolResults:false, not a bare engine"
  );
});

/** The invariant the fix restores: both combo paths resolve the same pipeline for the same input.
 * Only the seeded default combo was sanitized before, which is why a named combo truncated. */
test("a named combo resolves the same pipeline the seeded default combo would", () => {
  for (const pipeline of [
    [{ engine: "session-dedup" }, { engine: "lite" }],
    [{ engine: "lite" }],
    [{ engine: "session-dedup" }],
    [{ engine: "lite", config: { compressToolResults: true } }],
    [{ engine: "rtk" }],
    [{ engine: "session-dedup" }, { engine: "lite" }, { engine: "rtk" }],
  ]) {
    const combo = { ...namedCombo, pipeline } as never;
    const fromMerge = mergeCompressionComboIntoConfig(baseConfig, combo, [])?.stackedPipeline;
    const fromDefault = defaultComboForRequest(combo, {
      config: baseConfig,
      header: null,
      combos: {},
    })?.pipeline;
    assert.deepEqual(fromMerge, fromDefault, JSON.stringify(pipeline));
  }
});

test("mergeCompressionComboIntoConfig honours a request that opts into lossy", () => {
  const merged = mergeCompressionComboIntoConfig(baseConfig, namedCombo, [], "allow-lossy");
  assert.deepEqual(
    merged!.stackedPipeline,
    [{ engine: "session-dedup" }, { engine: "lite" }],
    "an explicit opt-in keeps the operator's lossy pipeline untouched"
  );
});

test("a header that names a combo opts that combo's lossy steps in", () => {
  // A header resolving its own plan is itself the opt-in — the same rule
  // defaultComboForRequest applies to the seeded default combo. shouldRunResolvedPipeline
  // never replaces a merged combo's pipeline, so the merge must honour the opt-in itself.
  const combos = { "default-caveman": namedCombo.pipeline } as never;
  const merged = mergeCompressionComboIntoConfig(
    baseConfig,
    namedCombo,
    [],
    "default-caveman",
    combos
  );
  assert.deepEqual(
    merged!.stackedPipeline,
    [{ engine: "session-dedup" }, { engine: "lite" }],
    "the named combo's bare lite step keeps its truncation when the header asks for it"
  );
});

test("a header naming a combo that does not resolve does not opt in", () => {
  // planFromHeader returns null for an unknown name, so the request has no plan of its
  // own and the sanitization stands — a mistyped combo name cannot enable truncation.
  const merged = mergeCompressionComboIntoConfig(baseConfig, namedCombo, [], "typo-combo", {});
  assert.deepEqual(
    merged!.stackedPipeline,
    [{ engine: "session-dedup" }, { engine: "lite", config: LOSSLESS_LITE }],
    "an unrecognized header value still sanitizes"
  );
});

test("mergeCompressionComboIntoConfig still returns null without a usable combo", () => {
  assert.equal(mergeCompressionComboIntoConfig(baseConfig, null, []), null);
  const empty = { ...namedCombo, pipeline: [] } as never;
  assert.equal(mergeCompressionComboIntoConfig(baseConfig, empty, []), null);
});
