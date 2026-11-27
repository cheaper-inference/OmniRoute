import test from "node:test";
import assert from "node:assert/strict";

const { openaiToAntigravityRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

const body = {
  messages: [
    { role: "user", content: "Use the terminal tool to echo hi." },
    {
      role: "assistant",
      tool_calls: [
        {
          id: "call_1",
          type: "function",
          function: { name: "terminal", arguments: JSON.stringify({ command: "echo hi" }) },
        },
      ],
    },
    { role: "tool", tool_call_id: "call_1", name: "terminal", content: "hi" },
  ],
  tools: [
    {
      type: "function",
      function: {
        name: "terminal",
        description: "Run a shell command",
        parameters: { type: "object", properties: { command: { type: "string" } } },
      },
    },
  ],
};

function modelParts(model: string, b: unknown) {
  const envelope = openaiToAntigravityRequest(model, b, true) as {
    request: { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };
  };
  const modelMsg = envelope.request.contents.find((c) => c.role === "model");
  assert.ok(modelMsg, "expected an assistant (model-role) message in the translation");
  return modelMsg.parts;
}

test("antigravity thinking Gemini defaults to context fallback without the bypass sentinel (#21395)", () => {
  const envelope = openaiToAntigravityRequest("gemini-3.1-pro-low", body, true) as {
    request: { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };
  };
  const serialized = JSON.stringify(envelope.request.contents);
  assert.equal(serialized.includes("skip_thought_signature_validator"), false);
  assert.equal(serialized.includes("previous_tool_result_context"), true);
});

test("ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS=1 opts in to the bypass sentinel and =0 keeps it off", () => {
  const prev = process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
  try {
    process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = "1";
    const enabledParts = modelParts("gemini-3.1-pro-low", body);
    const enabledFc = enabledParts.find((p) => p.functionCall);
    assert.ok(enabledFc, "expected a functionCall part when bypass is opted in");
    assert.equal(enabledFc.thoughtSignature, "skip_thought_signature_validator");

    process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = "0";
    const disabledEnvelope = openaiToAntigravityRequest("gemini-3.1-pro-low", body, true) as {
      request: { contents: Array<{ role: string; parts: Array<Record<string, unknown>> }> };
    };
    const serialized = JSON.stringify(disabledEnvelope.request.contents);
    assert.equal(serialized.includes("skip_thought_signature_validator"), false);
    assert.equal(serialized.includes("previous_tool_result_context"), true);
  } finally {
    if (prev === undefined) delete process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS;
    else process.env.ANTIGRAVITY_ALLOW_SIGNATURE_BYPASS = prev;
  }
});
