/**
 * #17069 — Claude Code preserves Read-tool images inside tool_result.content
 * across every conversation turn. A confirmed text-only endpoint must never
 * receive those bytes after a failed/partial Vision Bridge describe attempt.
 * Unknown-vision targets still follow the existing fail-open contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { getResolvedModelCapabilities } = await import("../../../src/lib/modelCapabilities.ts");
const { containsMediaKind } = await import("../../../open-sse/utils/mediaParts.ts");

const TEXT_ONLY_MODEL = "glm/glm-5.3";
const DATA =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=";

function imagePart(data: string = DATA) {
  return { type: "image", source: { type: "base64", media_type: "image/png", data } };
}

function toolResultContent(images: Array<ReturnType<typeof imagePart>>) {
  return [
    { type: "text", text: "Read succeeded." },
    ...images,
    { type: "text", text: "End of output." },
  ];
}

function makeRequest(images: Array<ReturnType<typeof imagePart>>) {
  return {
    model: TEXT_ONLY_MODEL,
    max_tokens: 32,
    messages: [
      { role: "user", content: [{ type: "text", text: "Read this screenshot." }] },
      {
        role: "assistant",
        content: [
          {
            type: "tool_use",
            id: "toolu_read_1",
            name: "Read",
            input: { file_path: "docs/screenshots/screen.png" },
          },
        ],
      },
      {
        role: "user",
        content: [
          { type: "tool_result", tool_use_id: "toolu_read_1", content: toolResultContent(images) },
        ],
      },
      {
        role: "user",
        content: [{ type: "text", text: "Continue without losing the conversation." }],
      },
    ],
  };
}

function context(): GuardrailContext {
  return {
    model: TEXT_ONLY_MODEL,
    log: { debug() {}, info() {}, warn() {} },
  } as GuardrailContext;
}

function guardrail(maxImages: number, callVisionModel: (ref: string) => Promise<string>) {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVisionEnabled: true,
        modalityBridgeVisionMode: "describe",
        modalityBridgeVisionModel: "openai/gpt-4o-mini",
        modalityBridgeVisionMaxImages: maxImages,
        modalityBridgeCacheEnabled: false,
      }),
      callVisionModel,
      // Exercise the exact non-combo path without a live SQLite lookup.
      resolveComboVisionDecision: async () => "not-combo",
      hasUsableCredentials: async () => true,
    },
  });
}

test("#17069: GLM text-only and vision-capable siblings have explicit metadata", () => {
  for (const id of ["glm-5.3", "glm-5.3-high", "glm-5.3-low", "glm-5.3-max"]) {
    assert.equal(getResolvedModelCapabilities(`glm/${id}`).supportsVision, false, id);
  }
  assert.equal(getResolvedModelCapabilities("glm/glm-5.3-flash").supportsVision, true);
});

test("#17069: a failed nested Read-tool image is replaced for confirmed text-only targets", async () => {
  assert.equal(getResolvedModelCapabilities(TEXT_ONLY_MODEL).supportsVision, false);
  const request = makeRequest([imagePart()]);
  const before = structuredClone(request);
  let calls = 0;
  const result = await guardrail(10, async () => {
    calls++;
    throw new Error("vision provider unavailable");
  }).preCall(request, context());

  assert.equal(result.block, false);
  assert.equal(calls, 1);
  const modified = result.modifiedPayload as typeof request;
  assert.ok(modified);
  assert.equal(containsMediaKind(modified.messages, "image"), false);
  const originalTool = request.messages[2].content[0] as Record<string, unknown>;
  const tool = modified.messages[2].content[0] as Record<string, unknown>;
  assert.equal(tool.type, "tool_result");
  assert.equal(tool.tool_use_id, originalTool.tool_use_id);
  const content = tool.content as Array<{ type: string; text?: string; source?: unknown }>;
  assert.equal(content[1]?.type, "text");
  assert.match(content[1]?.text ?? "", /unavailable/);
  assert.equal(content[1]?.source, undefined);
  assert.equal(content[0]?.text, "Read succeeded.");
  assert.equal(content[2]?.text, "End of output.");
  assert.deepEqual(request, before, "bridge must not mutate the original transcript");
});

test("#17069: partial failure and maxImages cap cannot leak later nested images", async () => {
  const request = makeRequest([
    imagePart("aW1hZ2Ux"),
    imagePart("aW1hZ2Uy"),
    imagePart("aW1hZ2Uz"),
  ]);
  let calls = 0;
  const result = await guardrail(2, async (ref) => {
    calls++;
    if (ref.endsWith("aW1hZ2Uy")) throw new Error("second caption failed");
    return "A status indicator.";
  }).preCall(request, context());

  assert.equal(result.block, false);
  assert.equal(calls, 2, "image processing must respect the configured vision-call cap");
  const modified = result.modifiedPayload as typeof request;
  assert.ok(modified);
  assert.equal(containsMediaKind(modified.messages, "image"), false);
  const nested = (
    modified.messages[2].content[0] as { content: Array<{ type: string; text?: string }> }
  ).content;
  assert.equal(nested.length, 5);
  assert.match(nested[1]?.text ?? "", /status indicator/);
  assert.match(nested[2]?.text ?? "", /unavailable/);
  assert.match(nested[3]?.text ?? "", /unavailable/);
  assert.equal(nested[4]?.text, "End of output.");
});

test("#17069: native vision models still retain the original nested image", async () => {
  const request = { ...makeRequest([imagePart()]), model: "glm/glm-5.3-flash" };
  let calls = 0;
  const result = await guardrail(10, async () => {
    calls++;
    throw new Error("should not describe natively vision-capable request");
  }).preCall(request, { ...context(), model: request.model });

  assert.equal(result.block, false);
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(calls, 0);
  assert.equal(containsMediaKind(request.messages, "image"), true);
});

test("#17069: the /v1/messages guardrail result is safe after Claude-to-OpenAI translation", async () => {
  const { translateRequest } = await import("../../../open-sse/translator/index.ts");
  const { FORMATS } = await import("../../../open-sse/translator/formats.ts");
  const payload = makeRequest([imagePart()]);
  const result = await guardrail(10, async () => "A status indicator reading PASS.").preCall(
    payload,
    context()
  );
  assert.equal(result.block, false);
  assert.ok(result.modifiedPayload);

  const translated = translateRequest(
    FORMATS.CLAUDE,
    FORMATS.OPENAI,
    "glm-5.3",
    result.modifiedPayload,
    false,
    null,
    "glm"
  ) as { messages: Array<{ role: string; content: unknown }> };

  const serialized = JSON.stringify(translated.messages);
  assert.equal(serialized.includes("base64"), false);
  assert.equal(serialized.includes(DATA), false);
  assert.match(serialized, /PASS/);
  assert.ok(
    translated.messages.some((message) => message.role === "tool"),
    "the matching Read tool result must survive conversion"
  );
  assert.equal(
    containsMediaKind(translated.messages as Array<{ content: unknown }>, "image"),
    false,
    "OpenAI translation must never reintroduce an image into a text-only request"
  );
});

test("#17069: unknown vision metadata retains a nested image when captioning fails", async () => {
  // No "vision" in the id: the name heuristic would otherwise resolve it as vision-capable.
  const model = "unknown-provider/unknown-model-17069";
  const payload = { ...makeRequest([imagePart()]), model };
  let calls = 0;
  const result = await guardrail(10, async () => {
    calls++;
    throw new Error("vision provider unavailable");
  }).preCall(payload, { ...context(), model });
  assert.equal(result.block, false);
  assert.equal(calls, 1);
  assert.equal(
    containsMediaKind((result.modifiedPayload as typeof payload).messages, "image"),
    true,
    "unknown native-vision capability must retain original bytes"
  );
});
