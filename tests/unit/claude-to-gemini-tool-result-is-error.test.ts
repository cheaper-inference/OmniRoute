/**
 * Claude -> Gemini: a failed `tool_result` (`is_error: true`) must reach Gemini in
 * `functionResponse.response.error`, a successful one in `.result`. Before, both went
 * to `.result`, so the model could not tell that the tool had failed.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gemini-is-error-"));

const { claudeToGeminiRequest } =
  await import("../../open-sse/translator/request/claude-to-gemini.ts");
const {
  buildGeminiThoughtSignatureKey,
  storeGeminiThoughtSignature,
  clearGeminiThoughtSignatures,
} = await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

type Part = { functionResponse?: { response: Record<string, unknown> }; text?: string };

test.after(() => {
  clearGeminiThoughtSignatures();
  resetDbInstance();
});

function responseParts(ns: string, userContent: unknown[]): Part[] {
  storeGeminiThoughtSignature(buildGeminiThoughtSignatureKey(ns, "tu_err"), "SIG_ERR");
  const result = claudeToGeminiRequest(
    "gemini-2.5-pro",
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "tool_use", id: "tu_err", name: "run", input: {} }],
        },
        { role: "user", content: userContent },
      ],
    },
    false,
    { _signatureNamespace: ns }
  ) as { contents: Array<{ parts: Part[] }> };
  return result.contents.flatMap((c) => c.parts);
}

const toolResult = (extra: Record<string, unknown>) => ({
  type: "tool_result",
  tool_use_id: "tu_err",
  ...extra,
});

test("a failed tool_result is written to functionResponse.response.error", () => {
  const parts = responseParts("is-error-string", [toolResult({ content: "boom", is_error: true })]);

  assert.deepEqual(parts.at(-1)?.functionResponse?.response, { error: "boom" });
});

test("a failed tool_result with text blocks joins them into the error field", () => {
  const parts = responseParts("is-error-blocks", [
    toolResult({
      content: [
        { type: "text", text: "line one" },
        { type: "text", text: "line two" },
      ],
      is_error: true,
    }),
  ]);

  assert.deepEqual(parts.at(-1)?.functionResponse?.response, { error: "line one\nline two" });
});

test("text that follows a failed tool_result is folded into the error field", () => {
  const parts = responseParts("is-error-trailing", [
    toolResult({ content: "boom", is_error: true }),
    { type: "text", text: "<system-reminder>retry</system-reminder>" },
  ]);

  assert.deepEqual(parts.at(-1)?.functionResponse?.response, {
    error: "boom\n<system-reminder>retry</system-reminder>",
  });
  assert.equal(parts.at(-1)?.text, undefined, "no loose text part may follow the response");
});

test("a successful tool_result keeps the result field", () => {
  const ok = responseParts("is-error-ok", [toolResult({ content: "fine" })]);
  const explicitFalse = responseParts("is-error-false", [
    toolResult({ content: "fine", is_error: false }),
  ]);

  assert.deepEqual(ok.at(-1)?.functionResponse?.response, { result: "fine" });
  assert.deepEqual(explicitFalse.at(-1)?.functionResponse?.response, { result: "fine" });
});
