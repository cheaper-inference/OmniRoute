import test from "node:test";
import assert from "node:assert/strict";
import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";

test("opencode-zen openai-responses with real API key sends Authorization Bearer and x-api-key (#19315)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";

  const responsesModels = [
    "gpt-5.6-sol",
    "gpt-5.6-terra",
    "gpt-5.6-luna",
    "grok-4.6",
    "grok-build-0.1",
    "muse-spark-1.2",
    "muse-spark-1.3",
  ];

  for (const model of responsesModels) {
    const headers = executor.buildHeaders({ apiKey: "sk-console-key-123" }, true, null, model);

    assert.equal(
      headers["Authorization"],
      "Bearer sk-console-key-123",
      `model ${model} must send Authorization Bearer header for OpenCode Console responses endpoint`
    );
    assert.equal(
      headers["x-api-key"],
      "sk-console-key-123",
      `model ${model} must also preserve x-api-key for zen responses endpoint`
    );
  }
});

test("opencode-zen openai-responses for gated free-tier keeps x-api-key public and no Authorization (#19315)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai-responses";

  const headers = executor.buildHeaders(
    { apiKey: "sk-console-key-123" },
    true,
    null,
    "muse-spark-1.2-contributor-free"
  );

  assert.equal(headers["x-api-key"], "public");
  assert.equal(headers["Authorization"], undefined);
});

test("opencode-zen chat models keep Authorization Bearer only (#19315)", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai";

  const headers = executor.buildHeaders(
    { apiKey: "sk-console-key-123" },
    true,
    null,
    "gpt-6-astra"
  );

  assert.equal(headers["Authorization"], "Bearer sk-console-key-123");
  assert.equal(headers["x-api-key"], undefined);
});
