import { test } from "node:test";
import assert from "node:assert";
import { applyCompressionAsync } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";

const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");

const body = () => ({
  model: "claude-fable-5",
  max_tokens: 128,
  system: DENSE,
  messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
});

const openaiBody = () => ({
  model: "gpt-5.6",
  messages: [
    { role: "system", content: DENSE },
    { role: "user", content: "oi" },
  ],
});

const responsesBody = () => ({
  model: "gpt-5.6",
  instructions: DENSE,
  input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "oi" }] }],
});

// Now that `estimateCompressionTokens` (stats.ts) is image-aware (Task 6), the guard
// stacked aggregate inflation honest (`guardPipelineInflation` in
// pipelineGuards.ts) no longer reverses the imaged output of omniglyph: the estimator
// counts the image block by actual billing (28px patches + overhead), not by
// char-count do base64. Este teste cobre tanto o plumbing de `providerTransport`
// (Task 5) and the final end-to-end output (Task 6).
test("stacked with step omniglyph receives providerTransport (engine runs, not skipped by transport)", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown");
  assert.ok(
    omniglyphStep!.techniquesUsed.includes("omniglyph:context-as-image"),
    `omniglyph deveria ter rodado (não pulado) — techniquesUsed=${JSON.stringify(
      omniglyphStep!.techniquesUsed
    )}`
  );
  assert.equal(r.compressed, true);
  assert.ok(
    JSON.stringify(r.body).includes('"type":"image"'),
    "stacked mantém a saída imageada (guard não reverte mais)"
  );
});

test("stacked sem providerTransport 'direct' pula omniglyph (transport_not_direct)", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    supportsVision: true,
    // providerTransport missing → fail-closed, omniglyph should skip
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown mesmo pulado");
  assert.ok(omniglyphStep!.techniquesUsed.includes("skip:transport_not_direct"));
});

test("stacked post-translation preserves the OpenAI Chat wire and runs native OmniGlyph", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(openaiBody(), "stacked", {
    model: "gpt-5.6",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai",
    targetFormat: "openai",
    compressionStage: "post-translation",
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep);
  assert.ok(omniglyphStep!.techniquesUsed.includes("omniglyph:context-as-image"));
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image_url"'));
  assert.ok(
    r.stats?.validationWarnings?.some((warning) => warning.includes("rtk: skipped (stage")),
    "engines sem suporte ao estágio devem ser explicitamente pulados"
  );
});

test("stacked post-translation does not adapt input[] Responses to messages[] before OmniGlyph", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(responsesBody(), "stacked", {
    model: "gpt-5.6",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    compressionStage: "post-translation",
    config: { stackedPipeline: [{ engine: "omniglyph" }] } as never,
  });
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"input_image"'));
  assert.ok(Array.isArray((r.body as { input?: unknown }).input));
});

test("OpenAI→Claude uses the translated wire without a second translation", async () => {
  registerBuiltinCompressionEngines();
  const translatedClaudeBody = body();
  const r = await applyCompressionAsync(translatedClaudeBody, "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai",
    targetFormat: "claude",
    compressionStage: "post-translation",
  });
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
  assert.ok(!JSON.stringify(r.body).includes('"type":"image_url"'));
});

test("Claude→OpenAI waits for the target wire and does not image the source body", async () => {
  registerBuiltinCompressionEngines();
  const pre = await applyCompressionAsync(body(), "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "claude",
    targetFormat: "openai",
    compressionStage: "pre-translation",
  });
  assert.equal(pre.compressed, false);
  assert.ok(pre.stats?.techniquesUsed.includes("skip:requires_post_translation"));

  const post = await applyCompressionAsync(
    {
      model: "gpt-5.6",
      messages: [
        { role: "system", content: DENSE },
        { role: "user", content: "oi" },
      ],
    },
    "omniglyph",
    {
      model: "gpt-5.6",
      supportsVision: true,
      providerTransport: "direct",
      imageTransportFidelity: "byte-preserving",
      sourceFormat: "claude",
      targetFormat: "openai",
      compressionStage: "post-translation",
    }
  );
  assert.equal(post.compressed, true);
  assert.ok(JSON.stringify(post.body).includes('"type":"image_url"'));
});

// The `provider` is explicitly threaded by each selector layer (it is not a
// blind spread), then a fresh layer can knock it out silently: a
// accounting would drop to `unknown` and start refusing cache semantics
// sem nenhum erro aparecer.
test("provider reaches from the selector to the engine accounting", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    provider: "anthropic",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    config: { stackedPipeline: [{ engine: "omniglyph" }] } as never,
  });
  assert.equal(r.compressed, true);
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown");
  assert.equal(
    omniglyphStep!.omniglyph?.provider,
    "anthropic",
    "sem o provider a contabilidade cai para unknown e recusa a semântica de cache"
  );
  assert.equal(omniglyphStep!.omniglyph?.savings.evidence, "bytes-only");
});
