import { test } from "node:test";
import assert from "node:assert";
import { omniglyphEngine } from "../../../open-sse/services/compression/engines/omniglyphAdapter.ts";

// OmniGlyph 1.4.0 exposes `normalizeAccounting()`, which classifies the DEGREE OF
// EVIDENCE of the economy (provider-reported / estimated / bytes-only /
// unavailable) and solves per-provider cache semantics — Anthropic uses
// buckets disjuntos, OpenAI/xAI reportam cached como subconjunto do input.
// Adding by hand gives double-count. Before that, the adapter discarded everything and the UI
// displayed a number without saying where it came from.

const SEGREDO = "sk-ant-api03-SEGREDO-QUE-NAO-PODE-VAZAR-NA-TELEMETRIA";
const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");

function claudeBody(): Record<string, unknown> {
  return {
    model: "claude-fable-5",
    max_tokens: 128,
    system: `${DENSE}\nAPI_KEY=${SEGREDO}\ncwd=/home/operador/projeto-secreto`,
    messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
  };
}

const OK = {
  model: "claude-fable-5",
  provider: "anthropic",
  supportsVision: true,
  providerTransport: "direct" as const,
  imageTransportFidelity: "byte-preserving" as const,
};

test("omniglyph stats load normalized accounting with evidence grade", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK as never);
  assert.equal(r.compressed, true);

  const accounting = r.stats?.omniglyph;
  assert.ok(accounting, "compressão aplicada deve registrar a contabilidade");
  assert.equal(accounting.provider, "anthropic");
  assert.ok(
    ["provider-reported", "estimated", "bytes-only", "unavailable"].includes(
      accounting.savings.evidence
    ),
    `evidência inesperada: ${accounting.savings.evidence}`
  );
  // Without provider counters at this stage, the honest basis is body size.
  assert.equal(accounting.savings.evidence, "bytes-only");
  assert.ok(typeof accounting.bytes.original === "number" && accounting.bytes.original > 0);
  assert.ok(typeof accounting.bytes.transformed === "number");
  assert.ok(typeof accounting.images.count === "number" && accounting.images.count > 0);
  assert.ok(typeof accounting.images.bytes === "number" && accounting.images.bytes > 0);
});

test("telemetry does not load content: neither base64, nor prompt, nor secret, nor environment", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), OK as never);
  assert.equal(r.compressed, true);

  const serialized = JSON.stringify(r.stats);

  // Request values.
  assert.ok(!serialized.includes(SEGREDO), "segredo do system vazou na telemetria");
  assert.ok(!serialized.includes("projeto-secreto"), "caminho do operador vazou");
  assert.ok(!serialized.includes("const row_0 = compute"), "texto do system vazou");
  assert.ok(!serialized.includes("data:image/png;base64"), "data URL de imagem vazou");
  assert.ok(!serialized.includes("iVBORw0KGgo"), "cabeçalho PNG em base64 vazou");

  // TransformInfo keys that carry content, content hash, or environment.
  for (const proibida of [
    "imageSourceText",
    "imageSourceTexts",
    "recoverable",
    "systemSha8",
    "claudeMdSha8",
    "firstUserSha8",
    "unknownStaticTags",
    "churningStaticTags",
    '"env"',
  ]) {
    assert.ok(!serialized.includes(proibida), `campo proibido na telemetria: ${proibida}`);
  }

  // The allowlist is positive: every accounting value is a number, enum string
  // known, or such object. No free text coming from the request.
  const accounting = r.stats?.omniglyph;
  assert.ok(accounting);
  const enums = new Set([
    "anthropic",
    "openai",
    "xai",
    "unknown",
    "provider-reported",
    "estimated",
    "bytes-only",
    "unavailable",
    "claude-fable-5",
  ]);
  const walk = (value: unknown, path: string): void => {
    if (value === undefined || value === null || typeof value === "number") return;
    if (typeof value === "string") {
      assert.ok(enums.has(value), `string fora da allowlist em ${path}: ${value}`);
      return;
    }
    assert.equal(typeof value, "object", `tipo inesperado em ${path}`);
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) walk(v, `${path}.${k}`);
  };
  walk(accounting, "omniglyph");
});

test("skip doesn't invent accounting", async () => {
  const r = await omniglyphEngine.applyAsync!(claudeBody(), {
    ...OK,
    imageTransportFidelity: "unknown",
  } as never);
  assert.equal(r.compressed, false);
  assert.equal(r.stats?.omniglyph, undefined);
});
