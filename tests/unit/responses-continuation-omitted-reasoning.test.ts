// The call log stores encrypted reasoning as the marker "[omitted: encrypted reasoning, N chars]".
// The Responses continuation store rebuilds previous_response_id history from that stored copy
// and chat.ts splices it into the next upstream body. applyReasoningInputPolicy keeps a
// reasoning item whose encrypted_content is any non-empty string, so the marker was sent
// upstream as if it were encrypted reasoning. The marker must never be replayed: the item is
// dropped (the real ciphertext is deliberately not stored on disk, see
// strip-reasoning-blobs-agentic-context-1599).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-continuation-reasoning-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/db/responsesContinuationStore.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const artifactWriter = await import("../../src/lib/usage/callLogArtifactWriter.ts");
const { protectPipelinePayloads } = await import("../../src/lib/usage/callLogs/format.ts");
const { applyReasoningInputPolicy } =
  await import("../../open-sse/services/reasoningInputPolicy.ts");

const API_KEY_ID = "key-omitted-reasoning";
const CIPHERTEXT = "gAAAA" + "x".repeat(3000);
const MARKER_PATTERN = /\[omitted: encrypted reasoning/;

test.after(async () => {
  await artifactWriter.closeCallLogArtifactWriter();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const userMessage = {
  type: "message",
  role: "user",
  content: [{ type: "input_text", text: "hi" }],
};
const reasoning = {
  type: "reasoning",
  id: "rs_1",
  summary: [],
  encrypted_content: CIPHERTEXT,
};
const toolCall = { type: "function_call", call_id: "call_1", name: "ls", arguments: "{}" };
const answer = {
  type: "message",
  role: "assistant",
  content: [{ type: "output_text", text: "ok" }],
};

function rawPipeline(extraOutput: unknown[] = []) {
  return {
    clientRawRequest: { effectiveInput: [userMessage, { ...reasoning, id: "rs_0" }] },
    clientResponse: { output: [reasoning, toolCall, answer, ...extraOutput] },
  };
}

test("the pipeline copy really holds the marker (precondition)", () => {
  const stored = protectPipelinePayloads(rawPipeline());

  assert.match(JSON.stringify(stored), MARKER_PATTERN);
  assert.ok(!JSON.stringify(stored).includes(CIPHERTEXT));
});

test("a bridged continuation does not replay the encrypted reasoning marker", () => {
  const stored = protectPipelinePayloads(rawPipeline());
  store.seedPendingContinuationState("resp-bridge-marker", API_KEY_ID, stored as never, false);

  const state = store.resolvePreviousResponseState("resp-bridge-marker", API_KEY_ID);
  store.clearPendingContinuationState("resp-bridge-marker");

  assert.ok(state, "the continuation still resolves");
  assert.ok(!MARKER_PATTERN.test(JSON.stringify(state)), "no marker in the replayed history");
  assert.deepEqual(state.input, [userMessage]);
  assert.deepEqual(state.output, [toolCall, answer]);
});

test("the upstream-bound body of a continued turn carries no marker (codex and openai)", () => {
  const stored = protectPipelinePayloads(rawPipeline());
  store.seedPendingContinuationState("resp-upstream-marker", API_KEY_ID, stored as never, false);
  const state = store.resolvePreviousResponseState("resp-upstream-marker", API_KEY_ID);
  store.clearPendingContinuationState("resp-upstream-marker");
  assert.ok(state);

  for (const provider of ["codex", "openai"]) {
    const body: Record<string, unknown> = {
      input: [...state.input, ...state.output, userMessage],
    };
    applyReasoningInputPolicy(body, "responses", { provider });

    assert.ok(!MARKER_PATTERN.test(JSON.stringify(body)), `${provider}: marker reached upstream`);
  }
});

test("a durable continuation does not replay the marker either", async () => {
  await callLogs.saveCallLog({
    method: "POST",
    path: "/v1/responses",
    status: 200,
    model: "gpt-5.4",
    provider: "openai",
    apiKeyId: API_KEY_ID,
    responseId: "resp-durable-marker",
    pipeline: rawPipeline(),
  });

  const state = store.resolvePreviousResponseState("resp-durable-marker", API_KEY_ID);

  assert.ok(state, "the continuation resolves from the stored artifact");
  assert.ok(!MARKER_PATTERN.test(JSON.stringify(state)));
  assert.deepEqual(state.output, [toolCall, answer]);
});

test("a reasoning item that also carries plaintext keeps the plaintext, without the marker", () => {
  const plaintext = [{ type: "reasoning_text", text: "thinking out loud" }];
  const mixed = { ...reasoning, id: "rs_mixed", content: plaintext };
  const stored = protectPipelinePayloads({
    clientRawRequest: { effectiveInput: [userMessage] },
    clientResponse: { output: [mixed, answer] },
  });
  store.seedPendingContinuationState("resp-mixed-marker", API_KEY_ID, stored as never, false);

  const state = store.resolvePreviousResponseState("resp-mixed-marker", API_KEY_ID);
  store.clearPendingContinuationState("resp-mixed-marker");

  assert.ok(state);
  assert.ok(!MARKER_PATTERN.test(JSON.stringify(state)));
  assert.deepEqual(state.output[0], {
    type: "reasoning",
    id: "rs_mixed",
    summary: [],
    content: plaintext,
  });
});

test("history without encrypted reasoning is returned unchanged (guard)", () => {
  const plain = {
    clientRawRequest: { effectiveInput: [userMessage] },
    clientResponse: { output: [answer] },
  };
  store.seedPendingContinuationState("resp-plain", API_KEY_ID, plain as never, false);

  const state = store.resolvePreviousResponseState("resp-plain", API_KEY_ID);
  store.clearPendingContinuationState("resp-plain");

  assert.deepEqual(state, { input: [userMessage], output: [answer] });
});
