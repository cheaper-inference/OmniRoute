import test from "node:test";
import assert from "node:assert/strict";
import { ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE } from "../../open-sse/config/constants.ts";
import {
  AntigravityTimingTracker,
  withAntigravityTiming,
  hasAntigravityMeaningfulDelta,
} from "../../open-sse/services/antigravityTiming.ts";
import {
  HttpAttemptCollector,
  selectHttpResponse,
} from "../../open-sse/utils/providerHttpAttempts.ts";
import { runWithCapture } from "../../open-sse/utils/providerRequestLogging.ts";

const text = 'data: {"response":{"candidates":[{"content":{"parts":[{"text":"fixture"}]}}]}}\n\n';
const encoder = new TextEncoder();
const requestId = "24a00000-0000-4000-a000-000000000024";

test("pings, roles, usage and errors are not meaningful deltas", () => {
  for (const frame of [
    ": ping\n\n",
    'data: {"usageMetadata":{"totalTokenCount":1}}\n\n',
    'data: {"response":{"candidates":[{"content":{"role":"model","parts":[]}}]}}\n\n',
    'data: {"error":{"message":"failure"}}\n\n',
    "data: [DONE]\n\n",
  ]) {
    assert.equal(hasAntigravityMeaningfulDelta(frame), false);
  }
  assert.equal(hasAntigravityMeaningfulDelta(text), true);
  assert.equal(
    hasAntigravityMeaningfulDelta(
      'data: {"candidates":[{"content":{"parts":[{"functionCall":{"name":"tool"}}]}}]}\n\n'
    ),
    true
  );
});

test("measures actual header and first delta phases with null unavailable network phases", async () => {
  let now = 100;
  const events: Record<string, unknown>[] = [];
  const tracker = new AntigravityTimingTracker(() => now);
  let upstream: ReadableStreamDefaultController<Uint8Array>;
  const response = await withAntigravityTiming(
    {
      enabled: true,
      connectionId: "fixture-account",
      model: "agy/gemini-3.8-flash",
      correlationId: requestId,
      emit: (event) => events.push(event),
    },
    () =>
      tracker.fetch(async () => {
        now = 125;
        return new Response(
          new ReadableStream<Uint8Array>({
            start(controller) {
              upstream = controller;
            },
          })
        );
      })
  );
  assert.equal(events[0].headerLatencyMs, 25);
  assert.equal(events[0].idleDurationMs, null);
  assert.equal(events[0].dnsMs, null);
  assert.equal(events[0].connectMs, null);
  assert.equal(events[0].tlsMs, null);
  now = 140;
  upstream!.enqueue(encoder.encode(": ping\n\n"));
  const reading = response.text();
  now = 170;
  upstream!.enqueue(encoder.encode(text.slice(0, 20)));
  upstream!.enqueue(encoder.encode(text.slice(20)));
  upstream!.close();
  assert.equal(await reading, ": ping\n\n" + text);
  const first = events.find((event) => event.phase === "first_meaningful_delta")!;
  assert.equal(first.firstMeaningfulDeltaFromHeadersMs, 45);
  assert.equal(first.firstMeaningfulDeltaFromSendMs, 70);
  assert.equal(first.requestId, requestId);
  assert.equal(first.model, "gemini-3.8-flash-high");
  assert.equal(events.filter((event) => event.phase === "complete").length, 1);
  const serialized = JSON.stringify(events);
  for (const forbidden of [
    "fixture-account",
    'fixture"',
    "Bearer",
    "https://",
    "parts",
    "candidates",
  ]) {
    assert.equal(serialized.includes(forbidden), false);
  }
});

test("idle duration and inflight count are per account and end on actual lifecycle", async () => {
  let now = 10;
  const tracker = new AntigravityTimingTracker(() => now);
  const events: Record<string, unknown>[] = [];
  const send = (id = "a") =>
    withAntigravityTiming(
      {
        enabled: true,
        connectionId: id,
        model: "gemini-3.8-flash-high",
        emit: (event) => events.push(event),
      },
      () => tracker.fetch(async () => new Response(new ReadableStream()))
    );
  const first = await send();
  now = 20;
  const concurrent = await send();
  assert.equal(events[1].concurrentInflight, 2);
  assert.equal(events[1].idleDurationMs, 0);
  await first.body!.cancel();
  await concurrent.body!.cancel();
  now = 90;
  const afterIdle = await send();
  assert.equal(events.findLast((event) => event.phase === "headers")!.idleDurationMs, 70);
  const other = await send("b");
  assert.equal(events.findLast((event) => event.phase === "headers")!.idleDurationMs, null);
  await afterIdle.body!.cancel();
  await other.body!.cancel();
});

test("feature off does not wrap or consume the response, and logs nothing", async () => {
  const tracker = new AntigravityTimingTracker();
  const original = new Response(text);
  const events: unknown[] = [];
  const response = await withAntigravityTiming(
    {
      enabled: false,
      connectionId: "a",
      model: "m",
      emit: (event) => events.push(event),
    },
    () => tracker.fetch(async () => original)
  );
  assert.equal(response, original);
  assert.equal(response.bodyUsed, false);
  assert.deepEqual(events, []);
});

test("failed fetch never fabricates header or first delta latency", async () => {
  let now = 0;
  const tracker = new AntigravityTimingTracker(() => now);
  const events: Record<string, unknown>[] = [];
  await assert.rejects(
    withAntigravityTiming(
      {
        enabled: true,
        connectionId: "a",
        model: "m",
        correlationId: "Bearer secret",
        emit: (event) => events.push(event),
      },
      () =>
        tracker.fetch(async () => {
          now = 500;
          throw new Error("secret upstream URL");
        })
    )
  );
  assert.equal(events[0].headerLatencyMs, null);
  assert.equal(events[0].firstMeaningfulDeltaFromSendMs, null);
  assert.equal(events[0].elapsedMs, 500);
  assert.equal(JSON.stringify(events).includes("secret"), false);
});

test("unread upstream errors close timing immediately and keep original bodies untouched", async () => {
  let now = 100;
  const tracker = new AntigravityTimingTracker(() => now);
  const events: Record<string, unknown>[] = [];
  const run = (body: Response) =>
    withAntigravityTiming(
      {
        enabled: true,
        connectionId: "retry-account",
        model: "gemini-3.8-flash-tiered",
        emit: (event) => events.push(event),
      },
      () =>
        tracker.fetch(async () => {
          now += 10;
          return body;
        })
    );

  for (const status of [403, 429, 503]) {
    const original = new Response(new ReadableStream<Uint8Array>(), { status });
    const returned = await run(original);
    assert.equal(returned, original, "error bodies must remain untouched for retries");
    assert.equal(returned.bodyUsed, false);
    assert.equal(events.findLast((event) => event.phase === "headers")!.concurrentInflight, 1);
    assert.equal(events.findLast((event) => event.phase === "http_error")!.headerLatencyMs, 10);
    await returned.body!.cancel();
  }
  assert.equal(events.filter((event) => event.phase === "http_error").length, 3);
  assert.equal(events.filter((event) => event.phase === "complete").length, 0);
  assert.equal(events.findLast((event) => event.phase === "headers")!.idleDurationMs, 0);
});

test("unread successful stream expires telemetry without cancelling upstream transport", async () => {
  const tracker = new AntigravityTimingTracker(() => performance.now(), 15);
  const events: Record<string, unknown>[] = [];
  const run = (response: Response) =>
    withAntigravityTiming(
      {
        enabled: true,
        connectionId: "unread-ok",
        model: "gemini-3.8-flash-tiered",
        emit: (event) => events.push(event),
      },
      () => tracker.fetch(async () => response)
    );
  let upstreamCancelled = false;
  const unread = await run(
    new Response(
      new ReadableStream({
        cancel() {
          upstreamCancelled = true;
        },
      })
    )
  );
  await new Promise((resolve) => setTimeout(resolve, 35));
  assert.equal(events.filter((event) => event.phase === "observation_expired").length, 1);
  assert.equal(
    upstreamCancelled,
    false,
    "timing watchdog must never affect HTTP response behavior"
  );
  assert.equal(unread.bodyUsed, false);
  const following = await run(new Response(null, { status: 204 }));
  assert.equal(following.status, 204);
  assert.equal(events.filter((event) => event.phase === "headers").at(-1)!.concurrentInflight, 1);
  await unread.body!.cancel();
  assert.equal(upstreamCancelled, true);
  assert.equal(events.filter((event) => event.phase === "observation_expired").length, 1);
});

test("request abort and failed fetch release per-account timing slots exactly once", async () => {
  const tracker = new AntigravityTimingTracker();
  const events: Record<string, unknown>[] = [];
  const abortController = new AbortController();
  const run = (send: () => Promise<Response>, signal?: AbortSignal) =>
    withAntigravityTiming(
      {
        enabled: true,
        connectionId: "abort-account",
        model: "gemini-3.8-flash-tiered",
        emit: (event) => events.push(event),
      },
      () => tracker.fetch(send, signal)
    );
  const held = await run(async () => new Response(new ReadableStream()), abortController.signal);
  abortController.abort(new DOMException("cancelled", "AbortError"));
  assert.equal(events.filter((event) => event.phase === "caller_abort").length, 1);
  await held.body!.cancel();
  await assert.rejects(
    run(async () => {
      throw new Error("upstream failed");
    })
  );
  assert.equal(events.filter((event) => event.phase === "fetch_failed").length, 1);
  await run(async () => new Response(null, { status: 204 }));
  assert.equal(events.filter((event) => event.phase === "headers").at(-1)!.concurrentInflight, 1);
});

test("a pre-response abort reports its own phase before the fetch rejection", async () => {
  const controller = new AbortController();
  const tracker = new AntigravityTimingTracker();
  const events: Record<string, unknown>[] = [];
  const timeout = Object.assign(new Error("request header timeout"), {
    name: "TimeoutError",
    code: ANTIGRAVITY_PRE_RESPONSE_TIMEOUT_CODE,
  });
  const running = withAntigravityTiming(
    {
      enabled: true,
      connectionId: "timeout-account",
      model: "gemini-3.8-flash",
      emit: (event) => events.push(event),
    },
    () =>
      tracker.fetch(
        () =>
          new Promise<Response>((_resolve, reject) => {
            controller.signal.addEventListener("abort", () => reject(timeout), { once: true });
          }),
        controller.signal
      )
  );
  controller.abort(timeout);
  await assert.rejects(running);
  assert.equal(events.filter((event) => event.phase === "pre_response_timeout").length, 1);
  assert.equal(events.filter((event) => event.phase === "upstream_deadline").length, 0);
});

test("timing events retain the request id and physical retry ordinal", async () => {
  const events: Record<string, unknown>[] = [];
  const tracker = new AntigravityTimingTracker();
  await withAntigravityTiming(
    {
      enabled: true,
      connectionId: "retry-account",
      model: "gemini-3.8-flash",
      correlationId: requestId,
      physicalSendOrdinal: 4,
      emit: (event) => events.push(event),
    },
    () => tracker.fetch(async () => new Response(null, { status: 204 }))
  );
  assert.equal(events[0].requestId, requestId);
  assert.equal(events[0].physicalSend, 4);
});

test("Antigravity physical fetch opt-in wraps actual transport; default stays unchanged", async () => {
  const { fetchAntigravityWithReadinessTimeout } =
    await import("../../open-sse/executors/antigravity/executeAttempt.ts");
  const previousFetch = globalThis.fetch;
  const previousFlag = process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY;
  const response = new Response(text);
  let sends = 0;
  try {
    globalThis.fetch = (async () => {
      sends++;
      return response;
    }) as typeof fetch;
    delete process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY;
    const meta = {
      provider: "antigravity",
      model: "gemini-3.8-flash-high",
      connectionId: "timing-connection",
      endpoint: "antigravity_generate",
    };
    const original = await fetchAntigravityWithReadinessTimeout(
      "https://example.invalid/generate",
      { method: "POST" },
      0,
      meta
    );
    assert.equal(original, response, "disabled telemetry must preserve original Response identity");
    process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY = "true";
    const timed = await fetchAntigravityWithReadinessTimeout(
      "https://example.invalid/generate",
      { method: "POST" },
      0,
      meta
    );
    assert.notEqual(
      timed,
      response,
      "enabled telemetry must observe the actual transport response"
    );
    assert.equal(await timed.text(), text);
    assert.equal(sends, 2, "telemetry never resends the upstream request");
  } finally {
    globalThis.fetch = previousFetch;
    if (previousFlag === undefined) delete process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY;
    else process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY = previousFlag;
  }
});

test("opt-in timing on the bounded path keeps the attempt on the wrapped Response", async () => {
  const { fetchAntigravityWithReadinessTimeout } =
    await import("../../open-sse/executors/antigravity/executeAttempt.ts");
  const previousFetch = globalThis.fetch;
  const previousFlag = process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY;
  const response = new Response(text);
  const httpAttempts = new HttpAttemptCollector();
  const capture = { httpAttempts, capture() {}, body: (fallback: unknown) => fallback };
  const caller = new AbortController();
  let sentSignal: AbortSignal | null | undefined;
  try {
    globalThis.fetch = (async (_url: string, init?: RequestInit) => {
      sentSignal = init?.signal;
      return response;
    }) as typeof fetch;
    process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY = "true";
    const timed = await runWithCapture(capture, () =>
      fetchAntigravityWithReadinessTimeout(
        "https://example.invalid/generate",
        { method: "POST", signal: caller.signal },
        60_000,
        {
          provider: "antigravity",
          model: "gemini-3.8-flash-high",
          connectionId: "bounded-connection",
          endpoint: "antigravity_generate",
        },
        { correlationId: requestId, ordinal: 1 }
      )
    );
    assert.notEqual(timed, response, "enabled telemetry must wrap the bounded transport response");
    assert.ok(sentSignal, "the bounded path must keep sending its merged abort signal");
    assert.notEqual(sentSignal, caller.signal);
    const attempt = selectHttpResponse(timed)?.current;
    assert.equal(attempt?.record.outcome, "response");
    assert.equal(attempt?.record.status, 200);
    assert.equal(attempt?.record.connectionId, "bounded-connection");
    assert.equal(selectHttpResponse(response), null, "the unwrapped Response must not hold it");
    assert.equal(await timed.text(), text);
  } finally {
    globalThis.fetch = previousFetch;
    if (previousFlag === undefined) delete process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY;
    else process.env.OMNIROUTE_ANTIGRAVITY_TIMING_TELEMETRY = previousFlag;
  }
});
