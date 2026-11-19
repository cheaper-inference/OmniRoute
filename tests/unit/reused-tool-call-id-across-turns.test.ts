import test from "node:test";
import assert from "node:assert/strict";

const { claudeToOpenAIRequest } =
  await import("../../open-sse/translator/request/claude-to-openai.ts");
const { openaiToClaudeRequest } =
  await import("../../open-sse/translator/request/openai-to-claude.ts");

// A tool_call/tool_use id is only unique within one assistant turn: long agent
// sessions reuse ids (Kimi `functions.X:0`, GLM, local models `call_0`). A
// conversation-wide first-wins id map then pairs every result with the FIRST
// turn, drops the second real result and leaves the later tool_use unpaired.

test("claude->openai: reused tool_use id across turns keeps the 2nd result", () => {
  const r = claudeToOpenAIRequest(
    "gpt-x",
    {
      messages: [
        { role: "user", content: "q" },
        { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "Read", input: {} }] },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "t1", content: "RESULT-ONE" }],
        },
        { role: "assistant", content: [{ type: "tool_use", id: "t1", name: "Bash", input: {} }] },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "t1", content: "RESULT-TWO" }],
        },
      ],
    },
    false
  );
  const s = JSON.stringify(r.messages);
  assert.ok(s.includes("RESULT-TWO"), "2nd result lost: " + s);
  assert.ok(!s.includes("No response received"), "placeholder injected: " + s);
  // The 2nd result must sit right after the 2nd (Bash) assistant turn.
  const msgs = r.messages as Array<{
    role: string;
    tool_calls?: Array<{ id?: string; function?: { name?: string } }>;
    tool_call_id?: string;
    content?: unknown;
  }>;
  const bashIdx = msgs.findIndex(
    (m) => m.role === "assistant" && m.tool_calls?.some((tc) => tc.function?.name === "Bash")
  );
  const next = msgs[bashIdx + 1];
  assert.equal(next?.role, "tool", "2nd result not adjacent to the 2nd turn: " + s);
  assert.equal(next?.tool_call_id, "t1");
  assert.ok(String(next?.content).includes("RESULT-TWO"), "wrong result attached: " + s);
});

test("openai->claude: reused tool_call id across turns keeps the 2nd result", () => {
  const r = openaiToClaudeRequest(
    "claude-sonnet-4-5",
    {
      messages: [
        { role: "user", content: "q" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "a", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "R1" },
        {
          role: "assistant",
          content: null,
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "b", arguments: "{}" } },
          ],
        },
        { role: "tool", tool_call_id: "call_1", content: "R2" },
      ],
    },
    false
  );
  const s = JSON.stringify(r.messages);
  assert.ok(!s.includes("Unpaired tool result"), "2nd result turned into text: " + s);
  // Every tool_use must have its tool_result immediately after its own turn.
  const msgs = r.messages as Array<{
    role: string;
    content?: Array<{ type: string; id?: string; tool_use_id?: string; content?: unknown }>;
  }>;
  const results: string[] = [];
  msgs.forEach((m, i) => {
    const blocks = Array.isArray(m.content) ? m.content : [];
    for (const block of blocks) {
      if (block.type !== "tool_use" || !block.id) continue;
      const tr = (msgs[i + 1]?.content ?? []).find(
        (b) => b.type === "tool_result" && b.tool_use_id === block.id
      );
      assert.ok(tr, `tool_use ${block.id} has no adjacent tool_result: ` + s);
      results.push(String(tr.content));
    }
  });
  assert.deepEqual(results, ["R1", "R2"], "results not paired per turn: " + s);
});
