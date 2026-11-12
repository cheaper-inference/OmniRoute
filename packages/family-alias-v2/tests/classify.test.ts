import assert from "node:assert/strict";
import test from "node:test";
import { classifyLocalEndpoint } from "../src/index.ts";

const endpoint = (modelId: string, providerId = "anthropic") => ({
  connectionId: "conn-1",
  providerId,
  modelId,
  billingClass: "subscription" as const,
  active: true,
});

test("classifies Claude and GPT product lines exactly", () => {
  assert.equal(classifyLocalEndpoint(endpoint("claude-fable-5.2"))?.lineage.owner, "claude");
  assert.equal(classifyLocalEndpoint(endpoint("claude-fable-5.2"))?.lineage.line, "fable");
  assert.equal(classifyLocalEndpoint(endpoint("gpt-6-astra", "openai"))?.lineage.line, "astra");
  assert.equal(classifyLocalEndpoint(endpoint("gpt-6.1-sol", "codex"))?.lineage.line, "sol");
});

test("keeps DeepSeek R1 and V3 distinct using curated family ids", () => {
  const r1 = classifyLocalEndpoint(endpoint("deepseek-r1-0528", "deepseek"), {
    modelId: "deepseek-r1-0528",
    familyId: "deepseek/r1",
  });
  const v3 = classifyLocalEndpoint(endpoint("deepseek-v3.1", "deepseek"), {
    modelId: "deepseek-v3.1",
    familyId: "deepseek/v3",
  });
  assert.equal(r1?.lineage.line, "r1");
  assert.equal(v3?.lineage.line, "v3");
  assert.equal(r1?.version.releaseTag, "0528");
});

test("keeps Qwen Coder, VL and Instruct distinct", () => {
  for (const modality of ["coder", "vl", "instruct"]) {
    const classified = classifyLocalEndpoint(endpoint(`qwen2.5-${modality}`, "qwen"), {
      modelId: `qwen2.5-${modality}`,
      familyId: `qwen/qwen/${modality}`,
    });
    assert.equal(classified?.lineage.modality, modality);
  }
});

test("separates generation, release tag and context size", () => {
  const classified = classifyLocalEndpoint(endpoint("claude-opus-4.5-20251101-120b"), {
    modelId: "claude-opus-4.5-20251101-120b",
    familyId: "claude/opus",
  });
  assert.deepEqual(classified?.version.generation, [4, 5]);
  assert.equal(classified?.version.releaseTag, "20251101");
  assert.equal(classified?.version.contextSize, "120b");
});

test("marks thinking/effort variants outside the base family chain", () => {
  assert.equal(
    classifyLocalEndpoint(endpoint("claude-opus-4.6-thinking-high"), {
      modelId: "claude-opus-4.6-thinking-high",
      familyId: "claude/opus",
    })?.isReasoningVariant,
    true,
  );
});

test("returns null for unclassified model without curated metadata", () => {
  assert.equal(classifyLocalEndpoint(endpoint("mystery-model-7", "unknown")), null);
});
