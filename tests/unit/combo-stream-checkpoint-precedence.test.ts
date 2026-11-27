// Precedence between the combo's stream resumption and the same-target mid-stream continuation:
// a request the combo marked for resumption (`_omnirouteComboCheckpointResume`) keeps the
// upstream handler from continuing a cut itself, and the marker never reaches the upstream.
// Without the marker the continuation runs exactly as before.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-ckpt-precedence-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { closeCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { STREAM_RECOVERY } = await import("../../open-sse/config/constants.ts");
const { COMBO_CHECKPOINT_RESUME_FIELD } =
  await import("../../open-sse/services/combo/reasoningCheckpoint.ts");

const ENV_KEYS = ["STREAM_RECOVERY_ENABLED", "STREAM_RECOVERY_MIDSTREAM_ENABLED"] as const;
const originalEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
const originalFetch = globalThis.fetch;
const enc = new TextEncoder();

const chunk = (content: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-precedence",
    object: "chat.completion.chunk",
    model: "gpt-4o-mini",
    choices: [{ index: 0, delta: { role: "assistant", content } }],
  })}\n\n`;

before(() => {
  core.resetDbInstance();
  process.env.STREAM_RECOVERY_ENABLED = "true";
  process.env.STREAM_RECOVERY_MIDSTREAM_ENABLED = "true";
});

after(async () => {
  globalThis.fetch = originalFetch;
  for (const key of ENV_KEYS) {
    if (originalEnv[key] === undefined) delete process.env[key];
    else process.env[key] = originalEnv[key];
  }
  await closeCallLogSaves();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function run(extraBody: Record<string, unknown>) {
  const sent: string[] = [];
  let calls = 0;
  globalThis.fetch = (async (_url: unknown, init?: { body?: unknown }) => {
    calls += 1;
    sent.push(String(init?.body ?? ""));
    if (calls === 1) {
      // Two chunks spaced past the holdback window (so the stream commits), then a silent cut.
      let step = 0;
      const body = new ReadableStream<Uint8Array>({
        async pull(controller) {
          step += 1;
          if (step === 1) controller.enqueue(enc.encode(chunk("Hello there ")));
          else if (step === 2) {
            await new Promise((r) => setTimeout(r, STREAM_RECOVERY.HOLDBACK_MS + 150));
            controller.enqueue(enc.encode(chunk("world")));
          } else controller.close();
        },
      });
      return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
    }
    return new Response(chunk("there world, nice to meet you!") + "data: [DONE]\n\n", {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    });
  }) as typeof fetch;

  const log = { info() {}, error() {}, warn() {}, debug() {} };
  const body = {
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: "hi" }],
    ...extraBody,
  };
  const result = await handleChatCore({
    body,
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test-precedence" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log,
    correlationId: "req-precedence",
  } as unknown as Parameters<typeof handleChatCore>[0]);
  const response = (result as { response?: Response }).response;
  assert.ok(response?.body, "streaming response expected");
  const text = await response.text().catch(() => "");
  return { calls, text, sent };
}

test("without the marker the same-target continuation still finishes the answer", async () => {
  const { calls, text } = await run({});
  assert.equal(calls, 2, "one upstream request plus one continuation");
  assert.match(text, /nice to meet you!/);
});

test("a request marked for the combo's resumption is not continued by the upstream handler", async () => {
  const { calls, text, sent } = await run({ [COMBO_CHECKPOINT_RESUME_FIELD]: true });
  assert.equal(calls, 1, "the cut is left to the combo");
  assert.ok(!text.includes("nice to meet you!"));
  for (const body of sent) {
    assert.ok(
      !body.includes(COMBO_CHECKPOINT_RESUME_FIELD),
      "the marker never reaches the upstream"
    );
  }
});
