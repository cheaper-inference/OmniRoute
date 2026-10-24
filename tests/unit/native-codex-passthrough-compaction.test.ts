import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-codex-passthrough-compaction-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { updateCompressionSettings } = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { shouldSkipNativeCodexReactiveCompaction, NATIVE_CODEX_REACTIVE_COMPACTION_FLAG } =
  await import("../../open-sse/handlers/chatCore/nativeCodexCompaction.ts");

const ENV_CONTEXT_LIMIT = "CONTEXT_LENGTH_CODEX";
const originalFetch = globalThis.fetch;
const originalEnvContext = process.env[ENV_CONTEXT_LIMIT];
const originalFlag = process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG];

let upstreamPayload: Record<string, unknown> | null = null;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.before(async () => {
  await resetStorage();
  process.env[ENV_CONTEXT_LIMIT] = "4000";

  await updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
  });

  globalThis.fetch = async (url: RequestInfo | URL, init: RequestInit = {}) => {
    if (String(url instanceof Request ? url.url : url).includes("/__omniroute_event")) {
      return new Response(null, { status: 204 });
    }
    if (init.body) {
      try {
        upstreamPayload = JSON.parse(String(init.body));
      } catch {
        upstreamPayload = null;
      }
    }
    return new Response(
      JSON.stringify({
        id: "resp-test",
        object: "response",
        model: "gpt-5.6-terra",
        status: "completed",
        output: [
          {
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "ok from upstream codex" }],
          },
        ],
        usage: { input_tokens: 1500, output_tokens: 5, total_tokens: 1505 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  if (originalEnvContext === undefined) {
    delete process.env[ENV_CONTEXT_LIMIT];
  } else {
    process.env[ENV_CONTEXT_LIMIT] = originalEnvContext;
  }
  if (originalFlag === undefined) {
    delete process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG];
  } else {
    process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG] = originalFlag;
  }
  await new Promise((r) => setTimeout(r, 200));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function buildOversizedNativeCodexRequest() {
  // 10 turns of Responses API input[] (~5,000 estimated tokens, > 4,000 context limit)
  const input = [];
  for (let i = 0; i < 10; i++) {
    input.push({
      type: "message",
      role: "user",
      content: [{ type: "input_text", text: `Turn ${i} user request: ` + "word ".repeat(250) }],
    });
    input.push({
      type: "message",
      role: "assistant",
      content: [
        { type: "output_text", text: `Turn ${i} assistant reply: ` + "answer ".repeat(250) },
      ],
    });
  }
  const responsesBody = { model: "gpt-5.6-terra", input, stream: false };
  return { input, responsesBody };
}

function runNativeCodex(responsesBody: Record<string, unknown>) {
  return handleChatCore({
    body: responsesBody,
    modelInfo: { provider: "codex", model: "gpt-5.6-terra", extendedContext: false },
    credentials: { apiKey: "sk-test", providerSpecificData: { baseUrl: "https://api.openai.com" } },
    clientRawRequest: {
      endpoint: "/v1/responses",
      body: responsesBody,
      headers: new Headers({ accept: "application/json", "content-type": "application/json" }),
    },
    userAgent: "codex_cli/1.0.0",
    isCombo: false,
    log: { debug() {}, info() {}, warn() {}, error() {} },
  });
}

test("flag resolver: exclusion holds by default, opts in only when the flag is on, fails closed", () => {
  assert.equal(
    shouldSkipNativeCodexReactiveCompaction(false, () => false),
    false
  );
  assert.equal(
    shouldSkipNativeCodexReactiveCompaction(true, () => false),
    true
  );
  assert.equal(
    shouldSkipNativeCodexReactiveCompaction(true, () => true),
    false
  );
  assert.equal(
    shouldSkipNativeCodexReactiveCompaction(true, () => {
      throw new Error("flag store unavailable");
    }),
    true
  );
  let askedKey = "";
  shouldSkipNativeCodexReactiveCompaction(true, (key) => {
    askedKey = key;
    return false;
  });
  assert.equal(askedKey, "NATIVE_CODEX_REACTIVE_COMPACTION_ENABLED");
});

test("flag off (default): native Codex history is never compacted — oversized request is rejected unchanged", async () => {
  delete process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG];
  upstreamPayload = null;
  const { responsesBody } = buildOversizedNativeCodexRequest();

  const result = await runNativeCodex(responsesBody);

  assert.equal(result.success, false, "oversized native Codex history must not be compacted");
  assert.equal((result as { status?: number }).status, 400);
  assert.match(String((result as { error?: string }).error), /exceeds context window/);
  assert.equal(upstreamPayload, null, "no upstream dispatch with the exclusion in place");
});

test("flag on: native Codex passthrough compacts multi-turn Responses payloads when context threshold exceeded", async () => {
  process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG] = "true";
  upstreamPayload = null;
  const { input, responsesBody } = buildOversizedNativeCodexRequest();

  const result = await runNativeCodex(responsesBody);
  delete process.env[NATIVE_CODEX_REACTIVE_COMPACTION_FLAG];

  assert.equal(
    result.success,
    true,
    `expected request to succeed, got error: ${(result as { error?: string }).error}`
  );
  assert.ok(upstreamPayload, "expected upstream request to be dispatched");
  assert.ok(
    Array.isArray(upstreamPayload.input),
    "expected native Responses input[] array upstream"
  );
  assert.ok(
    (upstreamPayload.input as unknown[]).length < input.length,
    `expected input turns to be compacted/pruned: original ${input.length}, upstream ${(upstreamPayload.input as unknown[]).length}`
  );
});
