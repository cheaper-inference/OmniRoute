import test from "node:test";
import assert from "node:assert/strict";

import { VertexExecutor } from "../../open-sse/executors/vertex.ts";
import {
  isGeminiTrailingModelTurnRejectingModel,
  stripTrailingGeminiModelTurns,
} from "../../open-sse/translator/helpers/geminiTrailingModelTurn.ts";
import type { ExecuteInput } from "../../open-sse/executors/base.ts";

/**
 * Regression test for Vertex AI (aiplatform.googleapis.com) rejecting conversations
 * that end with a `model` turn with:
 * `400 INVALID_ARGUMENT: Requests ending with a model turn are not supported.`
 *
 * Verifies that:
 * 1. isGeminiTrailingModelTurnRejectingModel correctly matches provider-qualified Gemini 3.x and 4.x models.
 * 2. stripTrailingGeminiModelTurns pops trailing model turns while preserving user turns and lone model turns.
 * 3. VertexExecutor.execute strips trailing model turns from input.body.contents end-to-end.
 */

test("(a) identifies qualified and unqualified Gemini 3+ and 4+ chat models as restricted", () => {
  const restricted = [
    "gemini-4-argon",
    "vertex/gemini-4-argon",
    "gemini-4-neon",
    "vertex/gemini-4-neon",
    "gemini-4-carbon",
    "gemini-4-hydrogen",
    "gemini-3.8-flash",
    "vertex/gemini-3.8-flash",
    "gemini-3.1-pro-preview",
    "vertex/gemini-3.1-pro-preview",
    "gemini-3-flash-preview",
    "gemini-pro-agent",
  ];
  for (const m of restricted) {
    assert.equal(
      isGeminiTrailingModelTurnRejectingModel(m),
      true,
      `Expected ${m} to be restricted from trailing model turns`
    );
  }
});

test("(b) leaves models predating the restriction or outside chat scope unrestricted", () => {
  const unrestricted = [
    "gemini-2.5-flash",
    "vertex/gemini-2.5-flash",
    "gemini-2.5-pro",
    "vertex/gemini-2.5-pro",
    "gemini-2.5-flash-lite",
    "gemini-3.1-flash-image",
    "gemini-2.5-flash-image",
    "claude-sonnet-5",
    "vertex/claude-sonnet-5",
    "deepseek-v3.2",
    "qwen3-next-80b",
    "mistral-medium",
  ];
  for (const m of unrestricted) {
    assert.equal(
      isGeminiTrailingModelTurnRejectingModel(m),
      false,
      `Expected ${m} to NOT be restricted from trailing model turns`
    );
  }
});

test("(c) stripTrailingGeminiModelTurns strips single and consecutive trailing model turns", () => {
  const request = {
    contents: [
      { role: "user", parts: [{ text: "Hello" }] },
      { role: "model", parts: [{ text: "Turn 1" }] },
      { role: "model", parts: [{ text: "Turn 2" }] },
    ],
  };

  stripTrailingGeminiModelTurns(request.contents);

  assert.equal(request.contents.length, 1);
  assert.equal(request.contents[0].role, "user");
});

test("(d) stripTrailingGeminiModelTurns preserves lone model turn so contents is never emptied", () => {
  const request = {
    contents: [{ role: "model", parts: [{ text: "Lone prefill" }] }],
  };

  stripTrailingGeminiModelTurns(request.contents);

  assert.equal(request.contents.length, 1);
  assert.equal(request.contents[0].role, "model");
});

test("(e) VertexExecutor.execute strips trailing model turn end-to-end", async () => {
  const executor = new VertexExecutor();
  let capturedBodyText: string | null = null;

  // Intercept dispatchRequest via unknown cast so real network calls are not made
  const testExecutor = executor as unknown as {
    dispatchRequest: (_url: string, init: RequestInit) => Promise<Response>;
  };
  testExecutor.dispatchRequest = async (_url, init) => {
    capturedBodyText = typeof init.body === "string" ? init.body : null;
    return new Response(JSON.stringify({ candidates: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const input: ExecuteInput = {
    model: "vertex/gemini-4-argon",
    body: {
      contents: [
        { role: "user", parts: [{ text: "Hello" }] },
        { role: "model", parts: [{ text: "Assistant response" }] },
      ],
    },
    credentials: {
      apiKey: "test-api-key",
    },
    stream: false,
    log: null as unknown as ExecuteInput["log"],
  };

  await executor.execute(input);

  assert.ok(capturedBodyText, "expected captured request body");
  const parsed = JSON.parse(capturedBodyText) as { contents: Array<{ role: string }> };
  assert.equal(parsed.contents.length, 1, "trailing model turn must be stripped by executor");
  assert.equal(parsed.contents[0].role, "user");
});

test("(f) VertexExecutor.execute preserves prefilled model turn for legacy unrestricted models", async () => {
  const executor = new VertexExecutor();
  let capturedBodyText: string | null = null;

  const testExecutor = executor as unknown as {
    dispatchRequest: (_url: string, init: RequestInit) => Promise<Response>;
  };
  testExecutor.dispatchRequest = async (_url, init) => {
    capturedBodyText = typeof init.body === "string" ? init.body : null;
    return new Response(JSON.stringify({ candidates: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const input: ExecuteInput = {
    model: "vertex/gemini-2.5-flash",
    body: {
      contents: [
        { role: "user", parts: [{ text: "Hello" }] },
        { role: "model", parts: [{ text: "Assistant response" }] },
      ],
    },
    credentials: {
      apiKey: "test-api-key",
    },
    stream: false,
    log: null as unknown as ExecuteInput["log"],
  };

  await executor.execute(input);

  assert.ok(capturedBodyText, "expected captured request body");
  const parsed = JSON.parse(capturedBodyText) as { contents: Array<{ role: string }> };
  assert.equal(parsed.contents.length, 2, "prefill must be preserved for legacy models");
  assert.equal(parsed.contents[1].role, "model");
});
