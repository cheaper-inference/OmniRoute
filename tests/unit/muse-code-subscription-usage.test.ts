// Muse Code reports subscription usage on every Responses stream (`response.subscription_usage`,
// after `response.completed`). The executor must pass the stream through unchanged, keep the
// reading on the connection, and the usage fetcher must report it as session/weekly windows.
import test from "node:test";
import assert from "node:assert/strict";

const usageModule = await import("../../open-sse/services/museSubscriptionUsage.ts");
const {
  MUSE_SUBSCRIPTION_USAGE_EVENT,
  parseMuseSubscriptionUsageEvent,
  tapMuseSubscriptionUsage,
  readStoredMuseSubscriptionUsage,
  museUsageQuotas,
} = usageModule;
const { getMuseUsage } = await import("../../open-sse/services/usage/museCode.ts");
const { MuseCodeExecutor } = await import("../../open-sse/executors/muse-code.ts");
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
  const weeklyOnly = bad(null, { used_percent: 7, resets_at: WEEKLY_RESET });
  assert.equal(weeklyOnly?.window, undefined);
  assert.equal(weeklyOnly?.weekly?.usedPercent, 7);
});

test("the tap passes the stream through byte for byte at every chunk boundary", async () => {
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

test("the executor keeps the reading on its connection and streams the response unchanged", async () => {
  core.resetDbInstance();
  const connection = await providers.createProviderConnection({
    provider: "muse-code",
    authType: "oauth",
    name: "Muse fixture",
    accessToken: "fixture-inference-key",
    providerSpecificData: { subsTierName: "Synthetic tier" },
  });
  const connectionId = String((connection as { id: string }).id);
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => sseResponse(museStream, 3)) as typeof fetch;
  try {
    const result = await new MuseCodeExecutor().execute({
      model: "muse-spark-1.3-contributor",
      body: { model: "muse-spark-1.3-contributor", input: "hi", stream: true },
      stream: true,
      credentials: { accessToken: "fixture-inference-key", connectionId },
      signal: null,
    } as Parameters<MuseCodeExecutor["execute"]>[0]);
    const response = result instanceof Response ? result : result.response;
    assert.equal(await response.text(), museStream);
  } finally {
    globalThis.fetch = originalFetch;
  }
  let stored: unknown;
  for (let attempt = 0; attempt < 200 && !stored; attempt += 1) {
    await new Promise((resolve) => setTimeout(resolve, 5));
    const row = (await providers.getProviderConnectionById(connectionId)) as {
      providerSpecificData?: Record<string, unknown>;
    } | null;
    stored = row?.providerSpecificData?.subscriptionUsage;
  }
  const reading = readStoredMuseSubscriptionUsage(stored);
  assert.ok(reading, "the reading was stored on the connection");
  assert.equal(reading.tierId, "synthetic-tier");
  assert.equal(reading.window?.usedPercent, 6);
  assert.equal(reading.weekly?.usedPercent, 4);
  const row = (await providers.getProviderConnectionById(connectionId)) as {
    providerSpecificData: Record<string, unknown>;
  };
  assert.equal(row.providerSpecificData.subsTierName, "Synthetic tier", "other keys are kept");
  core.resetDbInstance();
});
