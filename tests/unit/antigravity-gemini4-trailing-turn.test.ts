import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const TEST_DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-antigravity-gemini4-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { AntigravityExecutor } = await import("../../open-sse/executors/antigravity.ts");
const core = await import("../../src/lib/db/core.ts");

// transformRequest reaches getMitmAlias -> getDbInstance: close that handle before removing the dir.
test.after(() => {
  core.closeDbInstance();
  rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// Gemini 4 joined the trailing-turn gate (it answers 400 like Gemini 3), but its system text
// stays untouched: only Claude and the Gemini 3.x family get the identity rewrite.
test("gemini-4 drops a trailing model turn and keeps its system text", async () => {
  const identity = "You are a Claude agent, built on Anthropic's Claude Agent SDK.";
  for (const model of ["gemini-4-argon-high", "antigravity/gemini-4-argon-high"]) {
    const result = await new AntigravityExecutor().transformRequest(
      model,
      {
        request: {
          systemInstruction: { parts: [{ text: identity }] },
          contents: [
            { role: "user", parts: [{ text: "hi" }] },
            { role: "model", parts: [{ text: "prefill" }] },
          ],
          generationConfig: {},
        },
      },
      true,
      { projectId: "project-1" }
    );
    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
    const request = result.request as {
      contents: Array<{ role: string }>;
      systemInstruction: { parts: unknown[] };
    };

    assert.equal(request.contents.length, 1, model);
    assert.equal(request.contents.at(-1)?.role, "user", model);
    assert.deepEqual(request.systemInstruction.parts, [{ text: identity }], model);
  }
});
