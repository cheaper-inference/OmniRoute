// handleChatCore wiring of the mid-stream continuation log hooks: a real streaming request
// with stream recovery + mid-stream continuation enabled, an upstream that commits the
// holdback window and then drops, and a continuation that finishes the answer. The injected
// log must receive the release attempt line at warn and the stitched outcome at info,
// both carrying the requesting call's correlationId.
import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-recovery-log-wiring-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { getCallLogs, waitForCallLogSaves, closeCallLogSaves } =
  await import("../../src/lib/usage/callLogs.ts");
const { STREAM_RECOVERY } = await import("../../open-sse/config/constants.ts");

const ENV_KEYS = ["STREAM_RECOVERY_ENABLED", "STREAM_RECOVERY_MIDSTREAM_ENABLED"] as const;
const originalEnv = Object.fromEntries(ENV_KEYS.map((k) => [k, process.env[k]]));
const originalFetch = globalThis.fetch;
const enc = new TextEncoder();

const chunk = (content: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-wiring",
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

test("handleChatCore routes continuation logs through buildContinuationLogHooks", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls += 1;
    if (calls === 1) {
      // Two chunks spaced past the holdback window (so the stream commits), then a silent
      // cut: no finish_reason, no [DONE].
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

  const warn: string[] = [];
  const debug: string[] = [];
  const info: string[] = [];
  const log = {
    info: (tag: string, msg: string) => info.push(`${tag} ${msg}`),
    error() {},
    warn: (tag: string, msg: string) => warn.push(`${tag} ${msg}`),
    debug: (tag: string, msg: string) => debug.push(`${tag} ${msg}`),
  };
  const body = {
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: "hi" }],
  };
  const result = await handleChatCore({
    body,
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "sk-test-wiring" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    log,
    correlationId: "req-wiring-1",
  } as unknown as Parameters<typeof handleChatCore>[0]);

  const response = (result as { response?: Response }).response;
  assert.ok(response?.body, "streaming response expected");
  const text = await response.text();

  assert.equal(calls, 2, "one upstream request plus one continuation");
  assert.match(text, /nice to meet you!/);
  const recoveryWarns = warn.filter((l) => l.startsWith("STREAM_RECOVERY "));
  assert.deepEqual(recoveryWarns, [
    "STREAM_RECOVERY mid-stream continuation attempt 1/4 correlationId=req-wiring-1",
  ]);
  assert.deepEqual(
    debug.filter((l) => l.startsWith("STREAM_RECOVERY ")),
    []
  );
  assert.ok(
    info.includes(
      "STREAM_RECOVERY mid-stream continuation attempt 1/4 outcome=suffix suffixChars=19 correlationId=req-wiring-1"
    ),
    info.filter((l) => l.startsWith("STREAM_RECOVERY")).join(" | ")
  );
  assert.equal(await waitForCallLogSaves(20_000), true);
  const rows = await getCallLogs({ correlationId: "req-wiring-1", limit: 20 });
  assert.equal(
    rows.length,
    3,
    "composite continuation retains both physical sends plus the logical outcome"
  );
  const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
  assert.equal(logical?.upstreamHttp?.send, null);
  assert.equal(logical?.upstreamHttp?.total, 2);
});

async function coreStream(correlationId: string) {
  const body = {
    model: "gpt-4o-mini",
    stream: true,
    messages: [{ role: "user", content: "hello" }],
  };
  const result = await handleChatCore({
    body,
    modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
    credentials: { apiKey: "fixture" },
    clientRawRequest: {
      endpoint: "/v1/chat/completions",
      body,
      headers: new Headers({ accept: "text/event-stream" }),
    },
    userAgent: "unit-test",
    isCombo: false,
    correlationId,
    log: { info() {}, error() {}, warn() {}, debug() {} },
  } as unknown as Parameters<typeof handleChatCore>[0]);
  return (result as { response: Response }).response;
}

test("accepted early replacement selects its own send through actual stream finalization", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    const body =
      calls === 1
        ? new ReadableStream<Uint8Array>({
            pull(controller) {
              controller.error(new Error("socket hang up"));
            },
          })
        : new ReadableStream<Uint8Array>({
            start(controller) {
              controller.enqueue(enc.encode(chunk("recovered") + "data: [DONE]\n\n"));
              controller.close();
            },
          });
    return new Response(body, { headers: { "content-type": "text/event-stream" } });
  }) as typeof fetch;
  const response = await coreStream("selected-early-replacement");
  assert.match(await response.text(), /recovered/);
  assert.equal(await waitForCallLogSaves(20_000), true);
  const rows = await getCallLogs({ correlationId: "selected-early-replacement", limit: 20 });
  const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
  assert.equal(calls, 2);
  assert.equal(rows.length, 2);
  assert.equal(logical?.upstreamHttp?.send?.ordinal, 2);
  assert.equal(logical?.status, 200);
});

test("rejected replacements preserve the original selected upstream200 on terminal stream failure", async () => {
  let calls = 0;
  globalThis.fetch = (async () => {
    calls++;
    if (calls > 1)
      return Response.json({ error: { message: "replacement rejected" } }, { status: 503 });
    return new Response(
      new ReadableStream<Uint8Array>({
        pull(controller) {
          controller.error(new Error("socket hang up"));
        },
      }),
      { headers: { "content-type": "text/event-stream" } }
    );
  }) as typeof fetch;
  const response = await coreStream("selected-rejected-replacement");
  await response.text().catch(() => "");
  assert.equal(await waitForCallLogSaves(20_000), true);
  const rows = await getCallLogs({ correlationId: "selected-rejected-replacement", limit: 20 });
  const logical = rows.find((row) => row.requestType !== "upstream_http_attempt");
  assert.ok(calls > 1);
  assert.equal(rows.length, calls);
  assert.equal(logical?.upstreamHttp?.send?.ordinal, 1);
  assert.equal(logical?.upstreamHttp?.send?.status, 200);
  assert.ok(Number(logical?.status) >= 400);
});
