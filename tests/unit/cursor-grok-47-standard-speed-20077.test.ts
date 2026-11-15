import test from "node:test";
import assert from "node:assert/strict";

const { encodeAgentRunRequest } = await import("../../open-sse/utils/cursorAgentProtobuf.ts");
const { WT_LEN, decodeFields, findField } =
  await import("../../open-sse/utils/cursorAgentProtobuf/wire.ts");
const { resolveCursorGrok47Variant } =
  await import("../../open-sse/config/providers/registry/cursor/grok47.ts");

test("resolveCursorGrok47Variant parses bare effort variants and defaults context to 256k (#20077)", () => {
  const resolved = resolveCursorGrok47Variant("cursor-grok-4.7-medium");
  assert.ok(resolved);
  assert.equal(resolved.modelId, "grok-4.7");
  assert.deepEqual(resolved.parameters, [
    { id: "context", value: "256k" },
    { id: "effort", value: "medium" },
    { id: "fast", value: "false" },
  ]);

  const explicitContext = resolveCursorGrok47Variant("cursor-grok-4.7-low-500k");
  assert.ok(explicitContext);
  assert.equal(explicitContext.modelId, "grok-4.7");
  assert.deepEqual(explicitContext.parameters, [
    { id: "context", value: "500k" },
    { id: "effort", value: "low" },
    { id: "fast", value: "false" },
  ]);
});

test("Grok 4.7 non-fast models omit ModelDetails and use reasoning_effort (#20077)", () => {
  const models = [
    "cursor-grok-4.7-medium",
    "cursor-grok-4.7-low",
    "cursor-grok-4.7-medium-256k",
    "cursor-grok-4.7-low-256k",
    "cursor-grok-4.7-xhigh-500k",
  ];

  for (const modelId of models) {
    const request = encodeAgentRunRequest({ modelId, userText: "test" });
    const run = findField(decodeFields(request), 1);
    assert.ok(run?.wireType === WT_LEN);
    const fields = decodeFields(run.bytes);

    // Field 3 (modelDetails) must be omitted for standard speed models to prevent Cursor falling back to high-fast
    assert.equal(findField(fields, 3), undefined, `modelDetails must be undefined for ${modelId}`);

    const requestedModel = findField(fields, 9);
    assert.ok(requestedModel?.wireType === WT_LEN);
    const modelFields = decodeFields(requestedModel.bytes);

    const getFieldText = (f: ReturnType<typeof decodeFields>, num: number) => {
      const field = findField(f, num);
      assert.ok(field?.wireType === WT_LEN);
      return field.bytes.toString("utf8");
    };

    assert.equal(getFieldText(modelFields, 1), "grok-4.7");

    const params = modelFields
      .filter((field) => field.fieldNumber === 3)
      .map((field) => {
        assert.ok(field.wireType === WT_LEN);
        const pair = decodeFields(field.bytes);
        return [getFieldText(pair, 1), getFieldText(pair, 2)];
      });

    assert.ok(params.some(([k]) => k === "reasoning_effort"));
    assert.ok(params.some(([k, v]) => k === "fast" && v === "false"));
  }
});
