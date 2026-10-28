import test from "node:test";
import assert from "node:assert/strict";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

for (const model of ["claude-opus-5-5-high", "claude-sonnet-5-5-high", "gemini-4-argon"]) {
  test(`${model}: merged tool response and follow-up retain model-specific order`, () => {
    const body = {
      messages: [
        { role: "user", content: "Run check" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_check", type: "function", function: { name: "exec", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_check", content: "ok" },
        { role: "user", content: "Follow-up" },
        { role: "user", content: "More context" },
      ],
    };
    const result = openaiToAntigravityRequest(model, body, false, { projectId: "test-project" });
    const contents = result.request.contents;
    assert.deepEqual(
      contents.map((c) => c.role),
      ["user", "model", "user"]
    );
    const parts = contents[2].parts;
    const responses = parts.filter((p) => p.functionResponse);
    assert.equal(responses.length, 1);
    assert.equal(responses[0].functionResponse.id, "call_check");
    assert.equal(responses[0].functionResponse.response.result, "ok");
    assert.deepEqual(
      parts.filter((p) => p.text).map((p) => p.text),
      ["Follow-up", "More context"]
    );
    assert.ok(model.includes("claude") ? parts[0].functionResponse : parts.at(-1).functionResponse);
  });
}
