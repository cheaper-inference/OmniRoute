import { test } from "node:test";
import assert from "node:assert/strict";
import { applyReasoningInputPolicy } from "../../open-sse/services/reasoningInputPolicy.ts";

for (const provider of ["chatgpt-web-codex", "codex", "openai"]) {
  test(`native message provenance for ${provider}`, () => {
    const body = {
      input: [
        { type: "message", id: "msg_environment", role: "user", content: [] },
        { type: "message", id: "msg_instruction", role: "user", content: [] },
        { type: "message", id: null, role: "user", content: [] },
        { type: "message", id: "unowned", role: "user", content: [] },
      ],
    };
    applyReasoningInputPolicy(body, "responses", { provider });
    assert.equal(
      body.input[0].id,
      provider === "chatgpt-web-codex" ? "msg_environment" : undefined
    );
    assert.equal(
      body.input[1].id,
      provider === "chatgpt-web-codex" ? "msg_instruction" : undefined
    );
    assert.equal(body.input[2].id, undefined);
    assert.equal(body.input[3].id, undefined);
  });
}

test("native environment remains verifiable after routing sanitation", async () => {
  const { parseRequest } =
    await import("../../open-sse/vendor/codex-chatgpt-web/responses/parser.ts");
  const { extractChatGptTurnEnvironment } =
    await import("../../open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts");
  const body = {
    model: "gpt-5.6-sol",
    client_metadata: {
      "x-codex-turn-metadata": JSON.stringify({
        thread_id: "thread",
        turn_id: "turn",
        sandbox_mode: "read-only",
        workspaces: { "/tmp": {} },
      }),
    },
    input: [
      {
        type: "message",
        id: "msg_environment",
        role: "user",
        content: [
          {
            type: "input_text",
            text: "<environment_context><cwd>/tmp</cwd><sandbox_mode>read-only</sandbox_mode></environment_context>",
          },
        ],
      },
      {
        type: "message",
        id: "msg_instruction",
        role: "user",
        content: [{ type: "input_text", text: "Print a marker" }],
      },
    ],
  };
  applyReasoningInputPolicy(body, "responses", { provider: "chatgpt-web-codex" });
  assert.equal(extractChatGptTurnEnvironment(parseRequest(body)).cwd, "/tmp");
});
