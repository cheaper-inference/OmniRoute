/**
 * Regression: combo routing must not send image requests to models
 * explicitly known to lack vision, while allowing unknown-capability fallbacks.
 *
 * Root cause: `getResolvedModelCapabilities` returned `supportsVision: null` for
 * every Mistral model — including Pixtral, which IS multimodal — because Mistral
 * ships no models.dev `attachment` flag and the provider registry sets no
 * `supportsVision`. The combo compatibility filter only dropped a target when
 * `supportsVision === false`, so a `null` (unknown) text model like
 * `ministral-14b` slipped through and received the image, replying
 * "IMAGEM_INDISPONIVEL" / "image not provided".
 *
 * Two-part fix, both asserted here:
 *  A) resolveVisionCapability falls back to a conservative model-id heuristic so
 *     known-multimodal families (pixtral, llava, qwen-vl, gpt-4o, …) resolve to
 *     `true` when there is no synced/registry/spec data.
 *  B) the combo filter excludes explicitly non-vision targets (#8332).
 *     Unknown capability remains unknown and may be attempted only after
 *     confirmed vision models (#17289); that does not resurrect a target with
 *     an explicit negative verdict.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Deterministic, isolated storage so capability resolution sees NO synced data
// and exercises the registry/spec/heuristic path only.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-vision-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { getResolvedModelCapabilities } = await import("../../src/lib/modelCapabilities.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { deriveRequestCompatibilityRequirements, hasHardCapabilityFailure } =
  await import("../../open-sse/services/combo/comboStructure.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// --- Part A: capability resolution -----------------------------------------

test("Pixtral resolves supportsVision=true via model-id heuristic (no synced data)", () => {
  assert.equal(getResolvedModelCapabilities("mistral/pixtral-12b-latest").supportsVision, true);
});

test("a text-only Mistral model is NOT a vision false-positive", () => {
  assert.notEqual(
    getResolvedModelCapabilities("mistral/ministral-14b-latest").supportsVision,
    true
  );
});

// --- Part B: combo routing --------------------------------------------------

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.includes("/") ? modelStr.split("/")[0] : modelStr,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

const imageBody = {
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: "What is in this image?" },
        {
          type: "image_url",
          image_url: { url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB" },
        },
      ],
    },
  ],
};

test("image request: confirmed vision wins while unknown metadata remains fallback (#17289)", () => {
  assert.equal(getResolvedModelCapabilities("mistral/ministral-14b-latest").supportsVision, null);
  const out = filterTargetsByRequestCompatibility(
    [target("mistral/ministral-14b-latest"), target("mistral/pixtral-12b-latest")],
    imageBody,
    noopLog
  );
  assert.deepEqual(
    out.map((t) => t.modelStr),
    ["mistral/pixtral-12b-latest", "mistral/ministral-14b-latest"],
    "confirmed vision must dispatch first; unknown metadata is last resort"
  );
});

test("nested case-insensitive image indicators still enforce hard vision compatibility", () => {
  const requirements = deriveRequestCompatibilityRequirements({
    messages: [
      {
        role: "user",
        content: [
          {
            payload: {
              type: "IMAGE_URL",
              image_url: { url: "data:image/png;base64,iVBOR" },
            },
          },
        ],
      },
    ],
  });

  assert.equal(requirements.requiresVision, true);
  assert.equal(hasHardCapabilityFailure(["vision"]), true);
  assert.equal(hasHardCapabilityFailure(["context_window"]), false);
});

test(
  "image request with explicitly non-vision targets fails closed (#8332, #17289)",
  () => {
    // Explicitly text-only variants stay excluded even after unknown-capability
    // fallbacks were enabled for other models.
    const models = ["cmd/gpt-5.3-codex", "mimo/mimo-v2.5-pro"];
    for (const model of models) {
      assert.equal(getResolvedModelCapabilities(model).supportsVision, false, model);
    }
    const out = filterTargetsByRequestCompatibility(models.map(target), imageBody, noopLog);
    assert.deepEqual(out, [], "confirmed text-only targets must not receive images");
  }
);

test("text-only request: targets are untouched by the vision filter", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("mistral/ministral-14b-latest")],
    { messages: [{ role: "user", content: "hello" }] },
    noopLog
  );
  assert.equal(out.length, 1);
});

test("large output request: unknown maxOutputTokens does not filter a target", () => {
  const out = filterTargetsByRequestCompatibility(
    [target("openai-compatible-local/custom-large-output-model"), target("openai/gpt-4o-mini")],
    { messages: [{ role: "user", content: "hello" }], max_tokens: 32000 },
    noopLog
  );
  const ids = out.map((t) => t.modelStr);

  assert.deepEqual(ids, ["openai-compatible-local/custom-large-output-model"]);
});
