/**
 * #19035 — /v1/messages must keep the caller's X-Correlation-Id end to end.
 *
 * The non-streaming branch called handleChat() without the correlation id, so the
 * response (and the call log) carried a freshly generated id instead of the caller's.
 * The slow-stream branch built its synthetic keepalive response without the
 * X-Correlation-Id header, so a slow upstream hid the id from the caller.
 * Mirrors tests/unit/responses-route-correlation-12994.test.ts for /v1/responses.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("messages-correlation-19035");
const { POST } = await import("../../src/app/api/v1/messages/route.ts");
const { resolveIncomingCorrelationId } =
  await import("../../src/shared/utils/correlationPreserve.ts");
const streamBody =
  'data: {"id":"chatcmpl-correlation","object":"chat.completion.chunk","model":"gpt-4.1","choices":[{"index":0,"delta":{"content":"OK"},"finish_reason":null}]}\n\ndata: [DONE]\n\n';
const ORIGINAL_FETCH = globalThis.fetch;

test.beforeEach(async () => {
  await harness.resetStorage();
  await harness.seedConnection("openai");
  await harness.settingsDb.updateSettings({ call_log_pipeline_enabled: true });
});
test.afterEach(() => {
  globalThis.fetch = ORIGINAL_FETCH;
});
test.after(async () => await harness.cleanup());

const cases: Array<{
  name: string;
  stream: boolean;
  slow?: boolean;
  headers: Record<string, string>;
  expected?: string;
  notExpected?: string;
}> = [
  {
    name: "non-streaming preserves a caller X-Correlation-Id",
    stream: false,
    headers: { "X-Correlation-Id": "caller-123" },
    expected: "caller-123",
  },
  {
    name: "non-streaming keeps X-Correlation-Id ahead of X-Request-Id",
    stream: false,
    headers: { "X-Correlation-Id": "trace-id", "X-Request-Id": "http-id" },
    expected: "trace-id",
  },
  {
    name: "non-streaming preserves a sanitized caller correlation",
    stream: false,
    headers: { "X-Correlation-Id": "  trace-trim  " },
    expected: "trace-trim",
  },
  {
    name: "non-streaming rejects an overlong correlation and generates a safe id",
    stream: false,
    headers: { "X-Correlation-Id": "a".repeat(257) },
    notExpected: "a".repeat(257),
  },
  {
    name: "streaming forwards the caller correlation",
    stream: true,
    headers: { "X-Correlation-Id": "stream-trace" },
    expected: "stream-trace",
  },
  {
    name: "slow stream keeps the caller correlation on the synthetic response",
    stream: true,
    slow: true,
    headers: { "X-Correlation-Id": "slow-caller-123" },
    expected: "slow-caller-123",
  },
  {
    name: "slow stream exposes the generated correlation on the synthetic response",
    stream: true,
    slow: true,
    headers: {},
  },
];

for (const scenario of cases) {
  test(scenario.name, async () => {
    let release = () => {};
    const released = new Promise<void>((resolve) => {
      release = resolve;
    });
    globalThis.fetch = async () => {
      if (scenario.slow) await released;
      return scenario.stream
        ? new Response(streamBody, { headers: { "Content-Type": "text/event-stream" } })
        : harness.buildOpenAIResponse("OK", "gpt-4.1");
    };
    let response: Response;
    let wire: string;
    try {
      response = await POST(
        harness.buildRequest({
          url: "http://localhost/v1/messages",
          headers: scenario.headers,
          body: {
            model: "openai/gpt-4.1",
            max_tokens: 16,
            messages: [{ role: "user", content: "hi" }],
            stream: scenario.stream,
          },
        })
      );
      release();
      wire = await response.text();
    } finally {
      release();
    }
    assert.equal(response.status, 200, wire);
    if (scenario.slow) assert.match(wire, /event: ping/, "the early-keepalive path must run");
    const id = response.headers.get("x-correlation-id");
    assert.ok(
      id && id.length <= 256 && !/[\r\n]/.test(id),
      "the correlation id must be present and safe"
    );
    if (scenario.expected) assert.equal(id, scenario.expected);
    if (scenario.notExpected) assert.notEqual(id, scenario.notExpected);
    await harness.callLogsDb.waitForCallLogSaves(10_000);
    const row = await harness.waitFor(async () => {
      const rows = await harness.callLogsDb.getCallLogs({ limit: 20 });
      return rows.find((entry: { correlationId?: string }) => entry.correlationId === id);
    }, 10_000);
    assert.ok(row, "the persisted call log must carry the same id returned to the caller");
  });
}

test("resolver strips header injection attempts before use", () => {
  assert.equal(resolveIncomingCorrelationId("safe\r\nInjected: yes"), "safeInjected: yes");
  assert.equal(resolveIncomingCorrelationId("a".repeat(257)), null);
});
