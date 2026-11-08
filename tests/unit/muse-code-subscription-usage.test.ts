// Muse Code reports subscription usage on every Responses stream (`response.subscription_usage`,
// after `response.completed`). The provider request path must pass the stream through unchanged
// and keep the reading on the connection; the usage fetcher must report it as session/weekly
// windows.
import test from "node:test";
import assert from "node:assert/strict";

const usageModule = await import("../../open-sse/services/museSubscriptionUsage.ts");
const {
  MUSE_SUBSCRIPTION_USAGE_EVENT,
  parseMuseSubscriptionUsageEvent,
  tapMuseSubscriptionUsage,
  readStoredMuseSubscriptionUsage,
  museUsageQuotas,
  observeMuseSubscriptionUsage,
} = usageModule;
const { getMuseUsage } = await import("../../open-sse/services/usage/museCode.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");

// Shape recorded from the Muse Code client's own traffic; values are synthetic.
const SESSION_RESET = 4_102_444_800; // 2100-01-01T00:00:00Z
const WEEKLY_RESET = SESSION_RESET + 3 * 24 * 3600;
const frame = {
  subscription: {
    tier: "synthetic-tier",
    weekly: { resets_at: WEEKLY_RESET, used_percent: 4 },
    window: { resets_at: SESSION_RESET, used_percent: 6, window_duration_mins: 300 },
  },
  type: MUSE_SUBSCRIPTION_USAGE_EVENT,
};

function sse(events: Array<{ event: string; data: unknown }>): string {
  return events
    .map(({ event, data }) => `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`)
    .join("");
}

const museStream = sse([
  { event: "response.created", data: { type: "response.created", response: { id: "resp_1" } } },
  {
    event: "response.output_text.delta",
    data: { type: "response.output_text.delta", delta: "ok" },
  },
  {
    event: "response.completed",
    data: { type: "response.completed", response: { id: "resp_1", status: "completed" } },
  },
  { event: MUSE_SUBSCRIPTION_USAGE_EVENT, data: frame },
]);

function sseResponse(text: string, chunkSize = text.length): Response {
  const bytes = new TextEncoder().encode(text);
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      for (let i = 0; i < bytes.length; i += chunkSize) {
        controller.enqueue(bytes.slice(i, i + chunkSize));
      }
      controller.close();
    },
  });
  return new Response(body, { status: 200, headers: { "content-type": "text/event-stream" } });
}

test("parses a subscription usage frame into session and weekly windows", () => {
  const observedAt = new Date("2099-12-31T22:00:00.000Z");
  assert.deepEqual(parseMuseSubscriptionUsageEvent(frame, observedAt), {
    tierId: "synthetic-tier",
    window: {
      usedPercent: 6,
      resetAt: "2100-01-01T00:00:00.000Z",
      windowSeconds: 18_000,
    },
    weekly: {
      usedPercent: 4,
      resetAt: "2100-01-04T00:00:00.000Z",
      windowSeconds: 604_800,
    },
    observedAt: "2099-12-31T22:00:00.000Z",
  });
});

test("ignores other events and out-of-domain windows instead of clamping them", () => {
  assert.equal(parseMuseSubscriptionUsageEvent({ ...frame, type: "response.completed" }), null);
  assert.equal(parseMuseSubscriptionUsageEvent(null), null);
  const bad = (window: unknown, weekly: unknown) =>
    parseMuseSubscriptionUsageEvent({
      type: MUSE_SUBSCRIPTION_USAGE_EVENT,
      subscription: { window, weekly },
    });
  assert.equal(
    bad({ used_percent: 101, resets_at: SESSION_RESET, window_duration_mins: 300 }, null),
    null
  );
  assert.equal(
    bad({ used_percent: -1, resets_at: SESSION_RESET, window_duration_mins: 300 }, null),
    null
  );
  assert.equal(bad({ used_percent: 5, window_duration_mins: 300 }, null), null);
  assert.equal(bad({ used_percent: 5, resets_at: SESSION_RESET }, null), null, "no duration");
  assert.equal(
    bad({ used_percent: 5, resets_at: 1e16, window_duration_mins: 300 }, null),
    null,
    "a reset beyond the Date range has no instant to report"
  );
  const weeklyOnly = bad(null, { used_percent: 7, resets_at: WEEKLY_RESET });
  assert.equal(weeklyOnly?.window, undefined);
  assert.equal(weeklyOnly?.weekly?.usedPercent, 7);
});

test("the tap passes the stream through byte for byte at every chunk boundary", async () => {
  for (const chunkSize of [1, 2, 7, 64, museStream.length]) {
    const crlf = museStream.replace(/\n/g, "\r\n");
    const readings: unknown[] = [];
    const tapped = tapMuseSubscriptionUsage(sseResponse(crlf, chunkSize), (u) => {
      readings.push(u);
    });
    assert.equal(await tapped.text(), crlf, `CRLF, chunk size ${chunkSize}`);
    assert.equal(readings.length, 1, `CRLF: one reading at chunk size ${chunkSize}`);
  }
  for (const chunkSize of [1, 2, 7, 64, museStream.length]) {
    const readings: unknown[] = [];
    const tapped = tapMuseSubscriptionUsage(sseResponse(museStream, chunkSize), (usage) => {
      readings.push(usage);
    });
    assert.equal(await tapped.text(), museStream, `chunk size ${chunkSize}`);
    assert.equal(readings.length, 1, `one reading at chunk size ${chunkSize}`);
    assert.equal((readings[0] as { window: { usedPercent: number } }).window.usedPercent, 6);
  }
});

test("the tap reports nothing for a stream without a usage frame, and leaves non-SSE alone", async () => {
  const readings: unknown[] = [];
  const plain = sse([{ event: "response.completed", data: { type: "response.completed" } }]);
  assert.equal(
    await tapMuseSubscriptionUsage(sseResponse(plain), (u) => void readings.push(u)).text(),
    plain
  );
  assert.deepEqual(readings, []);
  const json = new Response('{"ok":true}', { headers: { "content-type": "application/json" } });
  assert.equal(
    tapMuseSubscriptionUsage(json, () => assert.fail("not SSE")),
    json
  );
});

test("an out-of-range frame or an oversized block never breaks the stream", async () => {
  const outOfRange = sse([
    {
      event: MUSE_SUBSCRIPTION_USAGE_EVENT,
      data: {
        type: MUSE_SUBSCRIPTION_USAGE_EVENT,
        subscription: { window: { used_percent: 5, resets_at: 1e16, window_duration_mins: 300 } },
      },
    },
  ]);
  const ignored: unknown[] = [];
  const first = tapMuseSubscriptionUsage(sseResponse(outOfRange, 5), (u) => void ignored.push(u));
  assert.equal(await first.text(), outOfRange);
  assert.deepEqual(ignored, []);

  // 3 MiB without a blank line, then the usage frame: the block is dropped, the frame still read.
  const oversized = `data: ${"x".repeat(3 * 1024 * 1024)}\n\n` + museStream;
  const readings: Array<{ window?: { usedPercent: number } }> = [];
  const second = tapMuseSubscriptionUsage(sseResponse(oversized, 64 * 1024), (u) => {
    readings.push(u);
  });
  assert.equal((await second.text()).length, oversized.length);
  assert.equal(readings.length, 1);
  assert.equal(readings[0].window?.usedPercent, 6);
});

test("a failing usage recorder never breaks the stream", async () => {
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);
  process.on("unhandledRejection", onUnhandled);
  try {
    const throwing = tapMuseSubscriptionUsage(sseResponse(museStream, 5), () => {
      throw new Error("store down");
    });
    assert.equal(await throwing.text(), museStream);
    const rejecting = tapMuseSubscriptionUsage(sseResponse(museStream, 5), async () => {
      throw new Error("store down");
    });
    assert.equal(await rejecting.text(), museStream);
    await new Promise((resolve) => setTimeout(resolve, 0));
  } finally {
    process.off("unhandledRejection", onUnhandled);
  }
  assert.deepEqual(unhandled, []);
});

test("the usage fetcher reports a stored reading as session and weekly windows", async () => {
  const stored = parseMuseSubscriptionUsageEvent(frame, new Date("2099-12-31T22:00:00.000Z"));
  const result = await getMuseUsage(undefined, {
    subsTierName: "Synthetic tier",
    isSubsActive: true,
    subscriptionUsage: stored,
  });
  const quotas = result.quotas as Record<string, Record<string, unknown>>;
  assert.deepEqual(Object.keys(quotas).sort(), ["session", "weekly"]);
  assert.equal(quotas.session.used, 6);
  assert.equal(quotas.session.total, 100);
  assert.equal(quotas.session.remainingPercentage, 94);
  assert.equal(quotas.session.resetAt, "2100-01-01T00:00:00.000Z");
  assert.equal(quotas.session.windowSeconds, 18_000);
  assert.equal(quotas.session.fractionReported, true);
  assert.equal(quotas.session.displayName, "Session (5h)");
  assert.equal(quotas.weekly.used, 4);
  assert.equal(quotas.weekly.resetAt, "2100-01-04T00:00:00.000Z");
  assert.equal(result.resetAt, "2100-01-01T00:00:00.000Z");
  assert.equal(result.plan, "Synthetic tier");
  assert.match(String(result.message), /Synthetic tier \(active\)/);
});

test("a window that has reset since the reading no longer reports its old fraction", () => {
  const stored = parseMuseSubscriptionUsageEvent(frame);
  assert.ok(stored);
  const afterSessionReset = Date.parse("2100-01-02T00:00:00.000Z");
  const quotas = museUsageQuotas(stored, afterSessionReset);
  assert.equal(quotas.session.used, 0);
  assert.equal(quotas.session.resetAt, null);
  assert.equal(quotas.session.fractionReported, false);
  assert.equal(quotas.weekly.used, 4, "the weekly window has not reset yet");
  assert.equal(quotas.weekly.fractionReported, true);
});

test("a malformed stored reading is treated as no reading", async () => {
  assert.equal(
    readStoredMuseSubscriptionUsage({ observedAt: "x", window: { usedPercent: 500 } }),
    null
  );
  const result = await getMuseUsage(undefined, { subscriptionUsage: { window: "nope" } });
  assert.equal("quotas" in result, false);
  assert.match(String(result.message), /first request/);
});

test("only Muse Code responses from a real (non-probe) connection are observed", async () => {
  const untouched = sseResponse(museStream);
  const notProbe = async () => false;
  for (const input of [
    { provider: "openai", connectionId: "c1", isProbe: notProbe },
    { provider: "muse-code", connectionId: null, isProbe: notProbe },
    { provider: "muse-code", connectionId: "c1", isProbe: async () => true },
  ]) {
    assert.equal(
      await observeMuseSubscriptionUsage({ ...input, response: untouched }),
      untouched,
      JSON.stringify({ ...input, isProbe: undefined })
    );
  }
  const observed = await observeMuseSubscriptionUsage({
    provider: "muse-code",
    connectionId: "c1",
    response: sseResponse(museStream),
    isProbe: notProbe,
  });
  assert.equal(await observed.text(), museStream);
});

async function storedUsageOf(connectionId: string): Promise<unknown> {
  for (let attempt = 0; attempt < 200; attempt += 1) {
    const row = (await providers.getProviderConnectionById(connectionId)) as {
      providerSpecificData?: Record<string, unknown>;
    } | null;
    if (row?.providerSpecificData?.subscriptionUsage)
      return row.providerSpecificData.subscriptionUsage;
    await new Promise((resolve) => setTimeout(resolve, 5));
  }
  return undefined;
}

test("a Muse Code request through the chat core keeps the reading on its connection", async () => {
  core.resetDbInstance();
  const connection = (await providers.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "Muse fixture",
    accessToken: "fixture-inference-key",
    providerSpecificData: { subsTierName: "Synthetic tier" },
  })) as { id: string };
  const body = { model: "muse-spark-1.3-contributor", input: "hi", stream: true };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => sseResponse(museStream, 3)) as typeof fetch;
  try {
    const result = (await handleChatCore({
      body,
      modelInfo: {
        provider: "muse-code",
        model: "muse-spark-1.3-contributor",
        extendedContext: false,
      },
      credentials: {
        accessToken: "fixture-inference-key",
        connectionId: connection.id,
        providerSpecificData: { subsTierName: "Synthetic tier" },
      },
      clientRawRequest: {
        endpoint: "/v1/responses",
        body,
        headers: new Headers({ accept: "text/event-stream" }),
      },
      userAgent: "unit-test",
      isCombo: false,
      log: { debug() {}, info() {}, warn() {}, error() {} },
    })) as { success: boolean; response?: Response; error?: string };
    assert.equal(result.success, true, result.error);
    assert.ok(result.response);
    await result.response.text();
  } finally {
    globalThis.fetch = originalFetch;
  }
  const reading = readStoredMuseSubscriptionUsage(await storedUsageOf(connection.id));
  assert.ok(reading, "the reading was stored on the connection");
  assert.equal(reading.tierId, "synthetic-tier");
  assert.equal(reading.window?.usedPercent, 6);
  assert.equal(reading.weekly?.usedPercent, 4);
  const row = (await providers.getProviderConnectionById(connection.id)) as {
    providerSpecificData: Record<string, unknown>;
  };
  assert.equal(row.providerSpecificData.subsTierName, "Synthetic tier", "other keys are kept");
  // The chat core logs the call in the background; close the database only after it is saved.
  assert.equal(await waitForCallLogSaves(10_000), true);
  core.resetDbInstance();
});
