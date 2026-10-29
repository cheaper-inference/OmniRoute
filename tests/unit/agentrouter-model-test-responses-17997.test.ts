import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { z } from "zod";

const originalDataDir = process.env.DATA_DIR;
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agentrouter-17997-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const runner = await import("../../src/lib/api/modelTestRunner.ts");
const callLogs = await import("../../src/lib/usage/callLogs.ts");
const { getCodexCliRsHeaders } = await import("../../open-sse/config/codexClient.ts");

const connection = await providers.createProviderConnection({
  provider: "agentrouter",
  authType: "apikey",
  name: "agentrouter-responses-17997",
  apiKey: "test-agentrouter-key",
  isActive: true,
  testStatus: "active",
});

const responsesRequestSchema = z.looseObject({
  model: z.string(),
  input: z.unknown(),
  stream: z.boolean(),
});

type CapturedRequest = {
  url: string;
  headers: Headers;
  body: z.infer<typeof responsesRequestSchema>;
};

function createSseResponse(events: string[]): Response {
  return new Response(`${events.join("\n\n")}\n\n`, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

function installAgentRouterFetch(
  mode: "completed" | "failed",
  capturedRequests: CapturedRequest[]
): void {
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    if (!url.startsWith("https://agentrouter.org/v1/")) {
      throw new Error(`Unexpected external request: ${new URL(url).origin}`);
    }

    if (url === "https://agentrouter.org/v1/chat/completions") {
      return new Response(
        JSON.stringify({
          error: {
            message:
              "Model gpt-6-astra does not support /v1/chat/completions, please use /v1/responses instead.",
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    assert.equal(url, "https://agentrouter.org/v1/responses");
    const rawBody: unknown = JSON.parse(String(init.body || "{}"));
    const body = responsesRequestSchema.parse(rawBody);
    capturedRequests.push({ url, headers: new Headers(init.headers), body });
    if (mode === "failed") {
      return createSseResponse([
        'event: error\ndata: {"type":"error","error":{"message":"Rate limit exceeded","code":"rate_limit_exceeded"}}',
        'event: response.failed\ndata: {"type":"response.failed","response":{"id":"resp_agentrouter_17997","status":"failed","error":{"message":"Rate limit exceeded","code":"rate_limit_exceeded"}}}',
      ]);
    }

    return createSseResponse([
      'event: response.created\ndata: {"type":"response.created","response":{"id":"resp_agentrouter_17997","object":"response","status":"in_progress"}}',
      'event: response.output_text.delta\ndata: {"type":"response.output_text.delta","item_id":"msg_agentrouter_17997","output_index":0,"content_index":0,"delta":"OK"}',
      'event: response.completed\ndata: {"type":"response.completed","response":{"id":"resp_agentrouter_17997","object":"response","status":"completed","model":"gpt-6-astra","output":[],"usage":{"input_tokens":4,"output_tokens":1,"total_tokens":5}}}',
    ]);
  };
}

async function runDashboardProbe() {
  return runner.runSingleModelTest({
    providerId: "agentrouter",
    modelId: "gpt-6-astra",
    connectionId: String(connection.id),
    timeoutMs: 15_000,
    streamChat: true,
    prompt: "Reply with exactly OK.",
  });
}

const originalFetch = globalThis.fetch;

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await callLogs.waitForCallLogSaves(10_000);
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await callLogs.waitForCallLogSaves(10_000);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
});

test("#17997 dashboard AgentRouter GPT probe succeeds through Responses", async () => {
  const capturedRequests: CapturedRequest[] = [];
  installAgentRouterFetch("completed", capturedRequests);

  const result = await runDashboardProbe();

  assert.equal(result.status, "ok");
  assert.equal(result.responseText, "OK");
  assert.equal(result.httpStatus, 200);
  assert.equal(capturedRequests.length, 1);
  const [captured] = capturedRequests;
  assert.ok(captured);
  assert.equal(captured.url, "https://agentrouter.org/v1/responses");
  assert.equal(captured.body.model, "gpt-6-astra");
  assert.equal(captured.body.stream, true);
  assert.ok("input" in captured.body);
  assert.equal("messages" in captured.body, false);
  assert.equal(captured.headers.get("authorization"), "Bearer test-agentrouter-key");
  assert.equal(captured.headers.get("originator"), "codex_cli_rs");
  assert.equal(captured.headers.get("user-agent"), getCodexCliRsHeaders()["User-Agent"]);
  assert.equal(captured.headers.get("x-api-key"), null);
});

test("#17997 dashboard does not mark a failed Responses stream healthy", async () => {
  const capturedRequests: CapturedRequest[] = [];
  installAgentRouterFetch("failed", capturedRequests);

  const result = await runDashboardProbe();

  assert.notEqual(result.status, "ok");
  assert.notEqual(result.responseText, "OK");
  assert.equal(capturedRequests[0]?.url, "https://agentrouter.org/v1/responses");
});
