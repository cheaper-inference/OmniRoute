import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "or9r-antigravity-parts-"));

const { AntigravityExecutor, normalizeAntigravitySystemInstruction } =
  await import("../../open-sse/executors/antigravity.ts");

test("Antigravity system normalization drops only empty part objects", () => {
  const textPart = { text: "Keep this instruction" };
  const nonTextPart = { inlineData: { mimeType: "text/plain", data: "AA==" } };
  const normalized = normalizeAntigravitySystemInstruction({
    role: "user",
    parts: [{}, textPart, {}, nonTextPart],
  }) as { role: string; parts: unknown[] };

  assert.equal(normalized.role, "user");
  assert.deepEqual(normalized.parts, [textPart, nonTextPart]);
  assert.strictEqual(normalized.parts[0], textPart);
  assert.strictEqual(normalized.parts[1], nonTextPart);
  assert.equal(normalizeAntigravitySystemInstruction({ parts: [{}, {}] }), undefined);
});

for (const model of ["antigravity/claude-opus-4-8-thinking", "gemini-3.8-flash-high"]) {
  test(`${model}: empty system parts are removed from the request envelope`, async () => {
    const executor = new AntigravityExecutor();
    const result = await executor.transformRequest(
      model,
      {
        request: {
          systemInstruction: { parts: [{}, {}] },
          contents: [{ role: "user", parts: [{ text: "hi" }] }],
          generationConfig: {},
        },
      },
      true,
      { projectId: "project-1" }
    );
    if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");

    assert.equal("systemInstruction" in (result.request as Record<string, unknown>), false);
  });
}
