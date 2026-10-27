import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

// #17834: a custom native Responses upstream (openai-compatible-* stamped with
// _nativeOpenAICompatibleResponsesPassthrough) must keep assistant commentary items in
// the request history, like the native Codex passthrough already does (#3107).

const credentials = { providerSpecificData: { baseUrl: "https://gw.example/v1" } };

const historyInput = () => [
  { type: "message", role: "user", content: [{ type: "input_text", text: "Check pricing" }] },
  {
    type: "message",
    id: "msg_progress",
    role: "assistant",
    phase: "commentary",
    content: [{ type: "output_text", text: "I am checking pricing." }],
  },
  { type: "function_call", id: "fc_probe", call_id: "call_probe", name: "lookup", arguments: "{}" },
  { type: "function_call_output", call_id: "call_probe", output: "Found prices" },
];

test("native openai-compatible Responses passthrough keeps assistant commentary history", () => {
  const executor = new DefaultExecutor("openai-compatible-responses-my-gateway");
  const out = executor.transformRequest(
    "m",
    { model: "m", input: historyInput(), _nativeOpenAICompatibleResponsesPassthrough: true },
    true,
    credentials
  ) as { input: Array<Record<string, unknown>> };

  assert.equal(out.input.length, 4);
  assert.deepEqual(out.input, historyInput());
});

test("unstamped Responses bodies still drop assistant commentary history", () => {
  const executor = new DefaultExecutor("openai-compatible-responses-my-gateway");
  const out = executor.transformRequest(
    "m",
    { model: "m", input: historyInput() },
    true,
    credentials
  ) as { input: Array<Record<string, unknown>> };

  assert.equal(out.input.length, 3);
  assert.equal(
    out.input.some((item) => item.id === "msg_progress"),
    false
  );
});
