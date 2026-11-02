// I1 — end to end: `execute()` must report what the STREAM carried.
//
// The review asked for a test of `execute() -> reportTurn`, because the old
// unit tests handed `usage` to `reportTurn` by hand and therefore proved
// nothing: the executor cast `(result as {usage?}).usage`, a field
// `ExecutorExecuteResult` does not have, so the report always went out with an
// empty usage block and no first-token time.
//
// This test drives the REAL executor against a stubbed upstream that streams
// SSE, consumes the tapped response the way chatCore does, and asserts on the
// bytes that actually reach the telemetry endpoints.
import test from "node:test";
import assert from "node:assert/strict";

import { CodeBuddyIntlExecutor } from "../../open-sse/executors/codebuddy-intl.ts";
import { CODEBUDDY_TELEMETRY_FLAG } from "../../open-sse/executors/codebuddy-intl/reportTurn.ts";
import {
  CODEBUDDY_REPORT_PATH,
  CODEBUDDY_TRACES_PATH,
} from "../../open-sse/executors/codebuddy-intl/telemetryTransport.ts";

const creds = { accessToken: "cbai-token" };

const USAGE = { prompt_tokens: 21, completion_tokens: 8, total_tokens: 29 };

function sse(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

/** The SSE body a real CodeBuddy turn produces, ending with the usage chunk. */
const TURN_SSE =
  sse({ choices: [{ index: 0, delta: { role: "assistant", content: "" } }] }) +
  sse({ choices: [{ index: 0, delta: { content: "Hola" } }] }) +
  sse({ choices: [{ index: 0, delta: { content: " mundo" } }] }) +
  sse({ choices: [], usage: USAGE }) +
  "data: [DONE]\n\n";

interface Captured {
  report: Array<{ events: Array<Record<string, unknown>> }>;
  traces: unknown[];
  urls: string[];
}

/**
 * Stub the network for BOTH hops: the chat completion (which must stream) and
 * the two telemetry endpoints (which must be recorded).
 */
function stubNetwork(captured: Captured) {
  return (async (url: string | URL | Request, init?: RequestInit) => {
    const target = String(url);

    if (target.includes("/v2/chat/completions")) {
      return new Response(TURN_SSE, {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      });
    }

    const body = init?.body ? JSON.parse(String(init.body)) : null;
    captured.urls.push(target);
    if (target.endsWith(CODEBUDDY_REPORT_PATH)) captured.report.push(body);
    if (target.endsWith(CODEBUDDY_TRACES_PATH)) captured.traces.push(body);
    return Response.json({ code: 0, msg: "OK" });
  }) as unknown as typeof fetch;
}

function bodyFor(text: string) {
  return { model: "glm-5.2", messages: [{ role: "user", content: text }] };
}

async function runTurn(): Promise<Captured> {
  const captured: Captured = { report: [], traces: [], urls: [] };
  const originalFetch = globalThis.fetch;
  const previousFlag = process.env[CODEBUDDY_TELEMETRY_FLAG];
  globalThis.fetch = stubNetwork(captured);
  process.env[CODEBUDDY_TELEMETRY_FLAG] = "true";

  try {
    const exec = new CodeBuddyIntlExecutor();
    const result = await exec.execute({
      model: "glm-5.2",
      body: bodyFor("saluda"),
      stream: true,
      credentials: creds,
    });

    // Consume the tapped response exactly like chatCore does: this is what
    // triggers the observation and therefore the report.
    const response = result instanceof Response ? result : result.response;
    assert.ok(response, "execute() must return a response to consume");
    const streamed = await response.text();
    assert.equal(streamed, TURN_SSE, "the tap must forward the bytes unchanged");

    // The report is fired from the stream end, so let the microtasks settle.
    await new Promise((resolve) => setImmediate(resolve));
    return captured;
  } finally {
    globalThis.fetch = originalFetch;
    if (previousFlag === undefined) delete process.env[CODEBUDDY_TELEMETRY_FLAG];
    else process.env[CODEBUDDY_TELEMETRY_FLAG] = previousFlag;
  }
}

test("execute() reports the usage the stream carried", async () => {
  const captured = await runTurn();
  assert.equal(captured.report.length, 1, "exactly one report per turn");

  const events = captured.report[0].events;
  const withUsage = events.find((event) => event.usage !== undefined);
  assert.ok(withUsage, "the report must carry the stream's usage block");
  // The envelope normalizes the SSE `usage` object onto its own vocabulary.
  assert.deepEqual(withUsage?.usage, {
    promptTokens: 21,
    completionTokens: 8,
    totalTokens: 29,
    reasoningTokens: 0,
    cacheHitTokens: 0,
    cacheMissTokens: 0,
    credit: 0,
  });
});

test("execute() reports a real first-token time, not the request start", async () => {
  const captured = await runTurn();
  const events = captured.report[0].events;
  const firstToken = events.find((event) => event.firstTokenAt !== undefined);

  assert.ok(firstToken, "the first-token instant must be reported");
  const at = Date.parse(String(firstToken?.firstTokenAt));
  assert.equal(Number.isNaN(at), false, "firstTokenAt must be an ISO instant");
});

test("execute() sends to both telemetry endpoints after the stream closes", async () => {
  const captured = await runTurn();
  assert.equal(
    captured.urls.some((url) => url.endsWith(CODEBUDDY_REPORT_PATH)),
    true
  );
  assert.equal(
    captured.urls.some((url) => url.endsWith(CODEBUDDY_TRACES_PATH)),
    true
  );
});

test("execute() sends nothing when the flag is off", async () => {
  const captured: Captured = { report: [], traces: [], urls: [] };
  const originalFetch = globalThis.fetch;
  const previousFlag = process.env[CODEBUDDY_TELEMETRY_FLAG];
  globalThis.fetch = stubNetwork(captured);
  delete process.env[CODEBUDDY_TELEMETRY_FLAG];

  try {
    const exec = new CodeBuddyIntlExecutor();
    const result = await exec.execute({
      model: "glm-5.2",
      body: bodyFor("saluda"),
      stream: true,
      credentials: creds,
    });
    const response = result instanceof Response ? result : result.response;
    await response.text();
    await new Promise((resolve) => setImmediate(resolve));

    // Opt-in means opt-in: not one outbound byte.
    assert.deepEqual(captured.urls, []);
  } finally {
    globalThis.fetch = originalFetch;
    if (previousFlag !== undefined) process.env[CODEBUDDY_TELEMETRY_FLAG] = previousFlag;
  }
});

test("execute() reports a cancelled turn as cancelled, not as an upstream error", async () => {
  const captured: Captured = { report: [], traces: [], urls: [] };
  const originalFetch = globalThis.fetch;
  const previousFlag = process.env[CODEBUDDY_TELEMETRY_FLAG];
  globalThis.fetch = stubNetwork(captured);
  process.env[CODEBUDDY_TELEMETRY_FLAG] = "true";

  try {
    const exec = new CodeBuddyIntlExecutor();
    const result = await exec.execute({
      model: "glm-5.2",
      body: bodyFor("cancela"),
      stream: true,
      credentials: creds,
    });
    const response = result instanceof Response ? result : result.response;
    const reader = response.body!.getReader();
    await reader.read();
    await reader.cancel("client went away");
    await new Promise((resolve) => setImmediate(resolve));

    assert.equal(captured.report.length, 1, "a cancelled turn is still closed");
    const events = captured.report[0].events;
    const terminal = events.at(-1) as { status?: string };
    assert.equal(terminal.status, "cancelled");
  } finally {
    globalThis.fetch = originalFetch;
    if (previousFlag === undefined) delete process.env[CODEBUDDY_TELEMETRY_FLAG];
    else process.env[CODEBUDDY_TELEMETRY_FLAG] = previousFlag;
  }
});
