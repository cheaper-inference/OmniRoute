import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-claude-alias-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");

test.beforeEach(() => {
  core.resetDbInstance();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// Claude Code shape: assistant tool_use, user tool_result, then the trailing
// `<total_tokens>` system notice that claude-to-openai demotes to a user turn.
function claudeCodeToolFollowUp(model: string) {
  return {
    model,
    max_tokens: 1000,
    system: "You are Claude Code.",
    messages: [
      { role: "user", content: "list files" },
      {
        role: "assistant",
        content: [
          { type: "tool_use", id: "toolu_vrtx_01A", name: "Bash", input: { command: "ls" } },
        ],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "toolu_vrtx_01A", content: "file.txt" }],
      },
      { role: "system", content: "<total_tokens>14999775 tokens left</total_tokens>" },
    ],
    tools: [
      {
        name: "Bash",
        description: "run a command",
        input_schema: { type: "object", properties: { command: { type: "string" } } },
      },
    ],
  };
}

type Part = Record<string, unknown>;

async function runPipeline(requestedModel: string) {
  const translated = translateRequest(
    "claude",
    "antigravity",
    requestedModel,
    claudeCodeToolFollowUp(requestedModel),
    true,
    { projectId: "project-18411" },
    "antigravity"
  ) as Record<string, unknown>;
  const body = translated.request ? translated : { request: translated };
  const result = await new AntigravityExecutor().transformRequest(
    `antigravity/${requestedModel}`,
    body,
    true,
    { projectId: "project-18411" }
  );
  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const request = (result as Record<string, unknown>).request as {
    contents: Array<{ role: string; parts: Part[] }>;
  };
  return { model: (result as Record<string, unknown>).model, request };
}

// #18411: the translator only puts functionResponse first when its own model id names
// Claude (#17256). A MITM alias whose name does not mention Claude reaches a Claude
// upstream with [text, functionResponse], which Vertex rejects with 400 "tool_use ids
// were found without tool_result blocks immediately after".
test("alias resolving to a Claude upstream sends the tool result first (#18411)", async () => {
  await modelsDb.setMitmAliasAll("antigravity", {
    "team-coder": "antigravity/claude-opus-4-6-thinking",
  });

  const { model, request } = await runPipeline("team-coder");

  assert.equal(model, "claude-opus-4-6-thinking");
  const last = request.contents.at(-1);
  assert.equal(last?.role, "user");
  assert.ok(last?.parts[0] && "functionResponse" in last.parts[0], "tool result must lead");
  assert.equal(
    last?.parts.some((p) => typeof p.text === "string" && p.text.includes("<total_tokens>")),
    false,
    "the synthetic budget notice is dropped from the tool-result turn"
  );
});

test("alias resolving to a native Gemini upstream keeps the tool result last", async () => {
  await modelsDb.setMitmAliasAll("antigravity", {
    "team-gemini": "antigravity/gemini-3.1-pro-low",
  });

  const { model, request } = await runPipeline("team-gemini");

  assert.equal(model, "gemini-3.1-pro-low");
  const parts = request.contents.at(-1)?.parts ?? [];
  assert.ok("functionResponse" in (parts.at(-1) ?? {}), "Gemini 4 needs functionResponse last");
  assert.equal(parts[0]?.text, "<total_tokens>14999775 tokens left</total_tokens>");
});
