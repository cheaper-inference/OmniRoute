/**
 * Regression: the vision-bridge reroute must work when the configured vision
 * model is an `auto/*` virtual id, and the describe path must only run when the
 * vision pool is genuinely empty.
 *
 * Upstream v3.8.50 resolves `auto/*` fixedModels through the vision router
 * pool; the guardrail-level guard (`bestUsable === false && !auto/*`) keeps the
 * reroute from being blocked when the router returns an unresolved auto id.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { resetGuardrailsForTests } = await import("../../../src/lib/guardrails/registry.ts");
import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

let mockSettings: Record<string, unknown> = {};
let visionCallCount = 0;
let credentialsMock: (model: string) => Promise<boolean | null> = async () => null;

function createGuardrail(options?: Parameters<typeof VisionBridgeGuardrail>[0]) {
  return new VisionBridgeGuardrail({
    ...options,
    deps: {
      getSettings: async () => mockSettings,
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
        visionCallCount++;
        return "described";
      },
      hasUsableCredentials: credentialsMock,
      ...(options?.deps ?? {}),
    },
  });
}

function createContext(overrides: Partial<GuardrailContext> = {}): GuardrailContext {
  return { model: "deepseek/deepseek-chat", log: console, ...overrides };
}

function imagePayload(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    model: "deepseek/deepseek-chat",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
        ],
      },
    ],
    ...overrides,
  };
}

function baseSettings() {
  return {
    visionBridgeEnabled: true,
    visionBridgeModel: "auto/best-vision",
    visionBridgePrompt: "Describe this image concisely.",
    visionBridgeTimeout: 30000,
    visionBridgeMaxImages: 10,
  };
}

test.beforeEach(() => {
  resetGuardrailsForTests({ registerDefaults: false });
  visionCallCount = 0;
  credentialsMock = async () => null;
  mockSettings = baseSettings();
});

test("mixed-content Auto retains the full request for multimodal compatibility routing", async () => {
  for (const model of ["auto", "auto/best-vision"]) {
    for (const attachment of [
      {
        type: "file",
        file: { filename: "test.pdf", file_data: "data:application/pdf;base64,JVBER" },
      },
      { type: "input_audio", input_audio: { data: "fixture", format: "wav" } },
      { type: "video_url", video_url: { url: "https://example.com/video.mp4" } },
    ]) {
      const payload = imagePayload({ model });
      const messages = payload.messages as Array<{ content: unknown[] }>;
      messages[0].content.push(attachment);
      const result = await createGuardrail().preCall(payload, createContext({ model }));
      assert.deepEqual(result, { block: false });
      assert.equal(visionCallCount, 0);
      assert.equal(messages[0].content[2], attachment);
    }
  }
});

test("VB-REROUTE-AUTO: auto/best-vision resolves through the router pool and reroutes (no describe)", async () => {
  // Provider "auto" has no credential rows → hasUsableCredentials=false for the
  // raw auto id; the router must still resolve a pool model and reroute.
  credentialsMock = async (model: string) => (model.startsWith("auto/") ? false : null);

  const guardrail = createGuardrail();
  const result = await guardrail.preCall(imagePayload(), createContext());

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 0, "describe path must not run when a vision target exists");
  assert.ok(result.modifiedPayload, "payload must be modified");
  const body = result.modifiedPayload as Record<string, unknown>;
  // The reroute points the request at the resolved vision model from the pool.
  assert.notStrictEqual(body.model, "deepseek/deepseek-chat");
  assert.deepEqual((result.meta as Record<string, unknown>).rerouted, true);
});

test("VB-REROUTE-AUTO: falls back to describe only when the ENTIRE vision pool is unusable", async () => {
  // Every vision candidate is confirmed unusable → nothing to reroute to → the
  // describe path runs (existing behavior).
  credentialsMock = async () => false;

  const guardrail = createGuardrail();
  const result = await guardrail.preCall(imagePayload(), createContext());

  assert.strictEqual(result.block, false);
  assert.strictEqual(visionCallCount, 1, "describe path must run when no vision target is usable");
  const body = result.modifiedPayload as Record<string, unknown>;
  assert.strictEqual(body.model, "deepseek/deepseek-chat");
});
