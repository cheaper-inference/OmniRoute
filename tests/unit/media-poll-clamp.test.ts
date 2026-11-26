// CodeQL #1389 (js/resource-exhaustion): `poll_interval_ms`, `timeout_ms` and
// `poll_timeout_ms` from the request body reached `sleep()` (open-sse/utils/sleep.ts) and the
// polling deadline with no upper bound, so one request could hold a handler for days while the
// server kept polling the upstream with the operator's credential.
//
// The handlers are driven against a fake upstream that never finishes. Timers created by
// `sleep()` are intercepted (identified by the call stack), recorded, and fired at once while a
// virtual clock advances by the requested delay, so a multi-day wait runs in milliseconds.
import test from "node:test";
import assert from "node:assert/strict";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import {
  MAX_CALLER_POLL_INTERVAL_MS,
  MAX_CALLER_POLL_TIMEOUT_MS,
  clampCallerMs,
  clampPollIntervalMs,
  clampPollTimeoutMs,
} from "../../open-sse/utils/pollBounds.ts";

const HUGE_MS = 1e12; // ~31 years
const INTERVAL_CEILING = 30_000;
const TIMEOUT_CEILING = 600_000;

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;
const originalDateNow = Date.now;

type SleepTrace = { sleeps: number[]; elapsedMs: () => number };

/** Intercepts timers created by utils/sleep.ts and drives a virtual clock with them. */
function installVirtualSleep(): SleepTrace {
  const start = originalDateNow();
  let offset = 0;
  const sleeps: number[] = [];
  Date.now = () => start + offset;
  globalThis.setTimeout = ((fn: (...args: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    const stack = new Error().stack ?? "";
    if (!stack.includes("utils/sleep.ts")) return originalSetTimeout(fn, ms, ...args);
    const delay = Number(ms) || 0;
    sleeps.push(delay);
    offset += delay;
    return originalSetTimeout(fn, 0, ...args);
  }) as typeof setTimeout;
  return { sleeps, elapsedMs: () => offset };
}

function restore() {
  globalThis.fetch = originalFetch;
  globalThis.setTimeout = originalSetTimeout;
  Date.now = originalDateNow;
}

test.afterEach(restore);

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Upstream fakes that accept the job and report it as still running on every poll. */
const NEVER_FINISHING_UPSTREAMS: Record<string, { model: string; fetch: typeof fetch }> = {
  nanobanana: {
    model: "nanobanana/nanobanana-flash",
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/record-info")) return json({ data: { successFlag: 0 } });
      return json({ data: { taskId: "task-1" } });
    }) as typeof fetch,
  },
  magnific: {
    model: "magnific/realism",
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("/task-1"))
        return json({ data: { task_id: "task-1", status: "IN_PROGRESS" } });
      return json({ data: { task_id: "task-1", status: "CREATED" } });
    }) as typeof fetch,
  },
  "black-forest-labs": {
    model: "black-forest-labs/flux-2-pro",
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url === "https://api.bfl.ai/result/1") return json({ status: "Pending" });
      return json({ id: "1", polling_url: "https://api.bfl.ai/result/1" });
    }) as typeof fetch,
  },
  renderhour: {
    model: "renderhour/z-image",
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("/v1/generations")) return json({ id: "job-1", status: "queued" }, 201);
      return json({ id: "job-1", status: "running" });
    }) as typeof fetch,
  },
};

async function runNeverFinishing(provider: string, extraBody: Record<string, unknown>) {
  const upstream = NEVER_FINISHING_UPSTREAMS[provider];
  globalThis.fetch = upstream.fetch;
  const trace = installVirtualSleep();
  const result = await handleImageGeneration({
    body: { model: upstream.model, prompt: "a lighthouse", ...extraBody },
    credentials: { apiKey: "test-key" },
    log: null,
  });
  restore();
  return { result, trace };
}

for (const provider of Object.keys(NEVER_FINISHING_UPSTREAMS)) {
  test(`${provider}: a huge caller poll interval and timeout are clamped to the ceilings`, async () => {
    const { result, trace } = await runNeverFinishing(provider, {
      poll_interval_ms: HUGE_MS,
      timeout_ms: HUGE_MS,
      poll_timeout_ms: HUGE_MS,
    });

    assert.equal(result.success, false, "a job that never finishes must fail");
    assert.ok(trace.sleeps.length > 0, "the handler polled at least once");
    assert.ok(
      Math.max(...trace.sleeps) <= INTERVAL_CEILING,
      `longest single sleep ${Math.max(...trace.sleeps)}ms exceeds ${INTERVAL_CEILING}ms`
    );
    assert.ok(
      trace.elapsedMs() <= TIMEOUT_CEILING + INTERVAL_CEILING,
      `polling ran for ${trace.elapsedMs()}ms of virtual time, above the ${TIMEOUT_CEILING}ms ceiling`
    );
  });

  test(`${provider}: a small caller poll interval is used as given`, async () => {
    const { trace } = await runNeverFinishing(provider, {
      poll_interval_ms: 1_000,
      timeout_ms: 5_000,
      poll_timeout_ms: 5_000,
    });
    assert.ok(trace.sleeps.length > 0);
    assert.ok(
      trace.sleeps.every((ms) => ms === 1_000),
      `sleeps: ${trace.sleeps.join(",")}`
    );
  });
}

test("default poll intervals are unchanged when the caller sends none", async () => {
  const expected: Record<string, number> = {
    nanobanana: 2_500,
    magnific: 4_000,
    "black-forest-labs": 1_500,
    renderhour: 2_000,
  };
  for (const [provider, interval] of Object.entries(expected)) {
    const { trace } = await runNeverFinishing(provider, {});
    assert.equal(trace.sleeps[0], interval, `${provider} default poll interval`);
  }
});

test("timeout error messages report the clamped value", async () => {
  // A huge interval too, so the unclamped code ends after one sleep instead of polling
  // ~400 million times (which is the defect itself).
  const huge = { timeout_ms: HUGE_MS, poll_interval_ms: HUGE_MS };
  const nano = await runNeverFinishing("nanobanana", huge);
  assert.match(String(nano.result.error), /timeout after 600000ms/);
  const bfl = await runNeverFinishing("black-forest-labs", huge);
  assert.match(String(bfl.result.error), /timed out after 600000ms/);
  const rh = await runNeverFinishing("renderhour", huge);
  assert.match(String(rh.result.error), /within 600 s/);
});

test("renderhour: aborting the request ends the wait between polls", async () => {
  globalThis.fetch = (async (input: string | URL, init: RequestInit = {}) => {
    init.signal?.throwIfAborted();
    const url = String(input);
    if (url.endsWith("/v1/generations")) return json({ id: "job-1", status: "queued" }, 201);
    return json({ id: "job-1", status: "running" });
  }) as typeof fetch;
  const controller = new AbortController();
  const timer = originalSetTimeout(() => controller.abort(), 50);
  const startedAt = originalDateNow();
  const result = await handleImageGeneration({
    body: { model: "renderhour/z-image", prompt: "a lighthouse", poll_interval_ms: 30_000 },
    credentials: { apiKey: "test-key" },
    log: null,
    signal: controller.signal,
  });
  clearTimeout(timer);
  assert.equal(result.success, false);
  assert.ok(
    originalDateNow() - startedAt < 10_000,
    "the 30 s sleep should end as soon as the request is aborted"
  );
});

test("clampCallerMs: bounds caller values, never shrinks the fallback", () => {
  assert.equal(MAX_CALLER_POLL_INTERVAL_MS, INTERVAL_CEILING);
  assert.equal(MAX_CALLER_POLL_TIMEOUT_MS, TIMEOUT_CEILING);
  assert.equal(clampCallerMs(HUGE_MS, 2_000, 30_000), 30_000);
  assert.equal(clampCallerMs("1500.9", 2_000, 30_000), 1_500);
  assert.equal(clampCallerMs(undefined, 2_000, 30_000), 2_000);
  assert.equal(clampCallerMs(0, 2_000, 30_000), 2_000);
  assert.equal(clampCallerMs(-5, 2_000, 30_000), 2_000);
  assert.equal(clampCallerMs(Number.NaN, 2_000, 30_000), 2_000);
  assert.equal(clampCallerMs(Infinity, 2_000, 30_000), 2_000);
  assert.equal(clampCallerMs(0.5, 2_000, 30_000), 2_000, "sub-millisecond values would spin");
  // A fallback above the ceiling (an operator default) is kept, and a caller may ask for it.
  assert.equal(clampCallerMs(undefined, 900_000, 600_000), 900_000);
  assert.equal(clampCallerMs(HUGE_MS, 900_000, 600_000), 900_000);
  assert.equal(clampPollIntervalMs(HUGE_MS, 2_500), INTERVAL_CEILING);
  assert.equal(clampPollTimeoutMs(HUGE_MS, 300_000), TIMEOUT_CEILING);
});
