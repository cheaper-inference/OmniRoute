import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "length-continuation-wiring-"));
process.env.DATA_DIR = dataDir;
const core = await import("../../src/lib/db/core.ts");
const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");
const { executeProviderRequest } =
  await import("../../open-sse/handlers/chatCore/executeProviderRequest.ts");
type Deps =
  import("../../open-sse/handlers/chatCore/executeProviderRequest.ts").ExecuteProviderRequestDeps;

const FLAG = "STREAM_LENGTH_CONTINUATION_ENABLED";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

function frame(payload: unknown): string {
  return `data: ${JSON.stringify(payload)}\n\n`;
}
const chunk = (content: string, finish?: string) =>
  frame({
    id: "chatcmpl-wiring",
    object: "chat.completion.chunk",
    created: 1,
    model: "m",
    choices: [{ index: 0, delta: { content }, ...(finish ? { finish_reason: finish } : {}) }],
  });

const FIRST = chunk("Primeiro trecho.", "length") + "data: [DONE]\n\n";
const SECOND = chunk("o trecho. Fim.", "stop") + "data: [DONE]\n\n";

function sse(text: string): Response {
  return new Response(encoder.encode(text), { headers: { "content-type": "text/event-stream" } });
}

function dependencies(
  execute: Deps["executor"]["execute"],
  rawBody: Record<string, unknown>,
  targetFormat = "openai"
): Deps {
  const controller = new AbortController();
  const credentials = { apiKey: "synthetic-key" };
  return {
    agentGoalPolicy: {
      detected: false,
      readinessMaxTimeoutMs: 600_000,
      streamRecoveryEnabled: false,
    },
    assertManagedLeaseFence: () => {},
    buildUpstreamHeadersForExecute: () => ({}),
    clientRawRequest: { headers: new Headers(), signal: controller.signal },
    clientResponseFormat: "openai",
    connectionId: null,
    correlationId: null,
    credentials,
    dedupEnabled: false,
    dedupHash: null,
    effectiveModel: "m",
    executor: { execute },
    extendedContext: false,
    getExecutionCredentials: () => credentials,
    getExecutorClientHeaders: () => ({}),
    isModelScope: () => false,
    isOpencodeClient: false,
    log: null,
    model: "m",
    onCredentialsRefreshed: null,
    pendingScope: { id: null, model: "m", provider: "openai", connectionId: null },
    provider: "openai",
    providerRequestCapture: { capture: () => {}, body: (fallback: unknown) => fallback },
    rawBody,
    recordKeyHealthStatus: () => {},
    requestedModel: "m",
    resilienceSettings: resolveResilienceSettings(null),
    settings: null,
    skipUpstreamRetry: false,
    stream: true,
    streamController: { signal: controller.signal },
    targetFormat,
    trace: () => {},
    traceId: "length-continuation-wiring",
    translatedBody: rawBody,
    trustedEffortContext: {},
    upstreamStream: true,
    userAgent: "offline-test",
  };
}

async function drive(
  flag: string | undefined,
  rawBody: Record<string, unknown>,
  targetFormat?: string
) {
  if (flag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = flag;
  const bodies: unknown[] = [];
  const execute: Deps["executor"]["execute"] = async (input) => {
    bodies.push((input as { body: unknown }).body);
    return {
      response: sse(bodies.length === 1 ? FIRST : SECOND),
      url: "http://x",
      headers: {},
      transformedBody: input.body,
    };
  };
  const result = await executeProviderRequest(dependencies(execute, rawBody, targetFormat), "m");
  const client = decoder.decode(await new Response(result.response.body).arrayBuffer());
  return { client, bodies };
}

const REQUEST = { model: "m", stream: true, messages: [{ role: "user", content: "hi" }] };

test.afterEach(() => {
  delete process.env[FLAG];
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 50 });
});

test("with the flag off the frames are byte for byte the upstream's and nothing is re-requested", async () => {
  const off = await drive(undefined, { ...REQUEST });
  assert.equal(off.client, FIRST);
  assert.equal(off.bodies.length, 1);
  const explicitOff = await drive("false", { ...REQUEST });
  assert.equal(explicitOff.client, FIRST);
  assert.equal(explicitOff.bodies.length, 1);
});

test("with the flag on a genuine length is continued once through the same executor", async () => {
  const on = await drive("true", { ...REQUEST });
  assert.equal(on.bodies.length, 2);
  const second = on.bodies[1] as {
    messages: { role: string; content: string }[];
    max_tokens: number;
  };
  assert.deepEqual(second.messages.at(-1), { role: "assistant", content: "Primeiro trecho." });
  assert.equal(second.max_tokens, 2048);
  assert.match(on.client, /Primeiro trecho\./);
  assert.match(on.client, /" Fim\."/);
  assert.equal(on.client.match(/finish_reason":"(\w+)"/g)?.length, 1);
  assert.match(on.client, /finish_reason":"stop"/);
  assert.equal(on.client.match(/\[DONE\]/g)?.length, 1);
});

test("a client limit that the length consumed is never extended", async () => {
  const limited = await drive("true", { ...REQUEST, max_tokens: 64 });
  assert.equal(limited.bodies.length, 1);
  assert.equal(limited.client, FIRST);
});

test("only Chat Completions upstreams are wrapped", async () => {
  const other = await drive("true", { ...REQUEST }, "claude");
  assert.equal(other.bodies.length, 1);
  assert.equal(other.client, FIRST);
});
