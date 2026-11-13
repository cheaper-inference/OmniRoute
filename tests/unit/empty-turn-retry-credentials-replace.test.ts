import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// DATA_DIR must be set before the first import that reaches the DB module.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-empty-turn-creds-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { runEmptyTurnRetryLoop } =
  await import("../../open-sse/handlers/chatCore/emptyTurnRetryLoop.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const core = await import("../../src/lib/db/core.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type LoopDeps = Parameters<typeof runEmptyTurnRetryLoop>[0];

const frame = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
const MUTE = `${frame({
  id: "c",
  object: "chat.completion.chunk",
  model: "m",
  choices: [{ delta: { role: "assistant", content: "" }, finish_reason: "stop" }],
})}data: [DONE]\n\n`;
const CONTENT = `${frame({
  id: "c",
  object: "chat.completion.chunk",
  model: "m",
  choices: [{ delta: { content: "served" }, finish_reason: "stop" }],
})}data: [DONE]\n\n`;

const sse = (body: string) =>
  new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });

function deps(
  credentials: Record<string, unknown>,
  next: Record<string, unknown>,
  seen: Array<Record<string, unknown>>
): LoopDeps {
  return {
    providerResponse: sse(MUTE),
    credentials,
    provider: "openai",
    currentModel: "gpt-4.1",
    model: "gpt-4.1",
    targetFormat: FORMATS.OPENAI,
    clientResponseFormat: FORMATS.OPENAI,
    isAborted: () => false,
    timeoutMs: 0,
    maxTimeoutMs: 0,
    maxRetries: 1,
    translatedBody: {},
    finalBody: {},
    providerUrl: "https://example.test",
    providerHeaders: {},
    correlationId: "c",
    traceId: "t",
    log: null,
    getProviderCredentials: async () => next,
    executeProviderRequest: async () => {
      seen.push({ ...credentials });
      return { response: sse(CONTENT) };
    },
    noteOutcome: () => {},
    logTargetRequest: () => {},
    captureBody: (body: unknown) => body,
  } as LoopDeps;
}

test("the retry runs on the next connection's credentials only", async () => {
  const seen: Array<Record<string, unknown>> = [];
  const credentials = {
    connectionId: "conn-A",
    apiKey: "key-A",
    copilotSessionToken: "session-of-A",
    routing: { leaseId: "lease-of-A" },
  };
  const next = { connectionId: "conn-B", apiKey: "key-B" };
  const result = await runEmptyTurnRetryLoop(deps(credentials, next, seen));
  assert.equal(result.adopted, true);
  assert.equal(seen.length, 1);
  assert.deepEqual(seen[0], { connectionId: "conn-B", apiKey: "key-B" });
});

test("a rejected retry restores the original credentials in full", async () => {
  const seen: Array<Record<string, unknown>> = [];
  const credentials = {
    connectionId: "conn-A",
    apiKey: "key-A",
    copilotSessionToken: "session-of-A",
  };
  const original = { ...credentials };
  const loopDeps = deps(credentials, { connectionId: "conn-B", apiKey: "key-B" }, seen);
  loopDeps.executeProviderRequest = async () => {
    seen.push({ ...credentials });
    throw new Error("retry failed");
  };
  const result = await runEmptyTurnRetryLoop(loopDeps);
  assert.equal(result.adopted, false);
  assert.deepEqual(credentials, original);
});
