/**
 * Issue #2822 — qwen3.7-max (opencode-go) returns 500 on image inputs.
 *
 * qwen3.7-max, qwen3.6-plus e qwen3.5-plus nos providers opencode-go e
 * opencode-zen did not have supportsVision: false. This made
 * image blocks reach upstream (which does not support vision),
 * generating 500s that exhausted the entire retry budget.
 *
 * Este teste garante que todos os modelos afetados tenham
 * supportsVision !== true (i.e. false or not set to true).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

type ModelEntry = {
  id: string;
  supportsVision?: boolean;
  [key: string]: unknown;
};

type ProviderEntry = {
  models?: ModelEntry[];
  [key: string]: unknown;
};

function getModel(providerId: string, modelId: string): ModelEntry | undefined {
  const provider = (REGISTRY as Record<string, ProviderEntry>)[providerId];
  if (!provider) return undefined;
  return provider.models?.find((m) => m.id === modelId);
}

// ── opencode-go ─────────────────────────────────────────────────────────────

test("#2822 opencode-go/qwen3.7-max must have supportsVision !== true", () => {
  const model = getModel("opencode-go", "qwen3.7-max");
  assert.ok(model, "qwen3.7-max deve estar registrado em opencode-go");
  assert.notEqual(
    model.supportsVision,
    true,
    "opencode-go/qwen3.7-max não suporta visão — supportsVision deve ser false ou ausente"
  );
  assert.strictEqual(
    model.supportsVision,
    false,
    "opencode-go/qwen3.7-max deve ter supportsVision: false explícito para bloquear seleção em combo com imagens"
  );
});

test("#2822 opencode-go/qwen3.6-plus must have supportsVision !== true", () => {
  const model = getModel("opencode-go", "qwen3.6-plus");
  assert.ok(model, "qwen3.6-plus deve estar registrado em opencode-go");
  assert.notEqual(
    model.supportsVision,
    true,
    "opencode-go/qwen3.6-plus não suporta visão — supportsVision deve ser false ou ausente"
  );
  assert.strictEqual(
    model.supportsVision,
    false,
    "opencode-go/qwen3.6-plus deve ter supportsVision: false explícito para bloquear seleção em combo com imagens"
  );
});

// #3328 — o oposto do #2822: MiniMax M3 (opencode) era multimodal (verificado
// empiricamente: descrevia imagens base64 via o upstream opencode). #6998:
// minimax-m3-free foi deslistado do free tier da OpenCode Zen (401 "not
// supported") on 2026-07-14 and removed from the static catalog — this test
// now confirm removal.
test("#6998 opencode/minimax-m3-free should no longer be registered (unlisted upstream)", () => {
  const model = getModel("opencode", "minimax-m3-free");
  assert.equal(
    model,
    undefined,
    "opencode/minimax-m3-free foi deslistado do free tier da OpenCode Zen (#6998)"
  );
});

test("#2822 opencode-go/qwen3.5-plus must have supportsVision !== true", () => {
  const model = getModel("opencode-go", "qwen3.5-plus");
  assert.ok(model, "qwen3.5-plus deve estar registrado em opencode-go");
  assert.notEqual(
    model.supportsVision,
    true,
    "opencode-go/qwen3.5-plus não suporta visão — supportsVision deve ser false ou ausente"
  );
  assert.strictEqual(
    model.supportsVision,
    false,
    "opencode-go/qwen3.5-plus deve ter supportsVision: false explícito para bloquear seleção em combo com imagens"
  );
});

// ── opencode-zen ─────────────────────────────────────────────────────────────

test("#2822 opencode-zen/qwen3.5-plus must have supportsVision !== true", () => {
  const model = getModel("opencode-zen", "qwen3.5-plus");
  assert.ok(model, "qwen3.5-plus deve estar registrado em opencode-zen");
  assert.notEqual(
    model.supportsVision,
    true,
    "opencode-zen/qwen3.5-plus não suporta visão — supportsVision deve ser false ou ausente"
  );
  assert.strictEqual(
    model.supportsVision,
    false,
    "opencode-zen/qwen3.5-plus deve ter supportsVision: false explícito para bloquear seleção em combo com imagens"
  );
});

test("#2822 opencode-zen/qwen3.6-plus must have supportsVision !== true", () => {
  const model = getModel("opencode-zen", "qwen3.6-plus");
  assert.ok(model, "qwen3.6-plus deve estar registrado em opencode-zen");
  assert.notEqual(
    model.supportsVision,
    true,
    "opencode-zen/qwen3.6-plus não suporta visão — supportsVision deve ser false ou ausente"
  );
  assert.strictEqual(
    model.supportsVision,
    false,
    "opencode-zen/qwen3.6-plus deve ter supportsVision: false explícito para bloquear seleção em combo com imagens"
  );
});
