// CodeQL #1389 (js/resource-exhaustion), remaining sites after #20824: `poll_interval_ms` and
// `timeout_ms` from the request body still reached `sleep()` and the polling deadline with no
// upper bound in the Kie (image / video / music), Runway, DashScope, Novita, MiniMax, video
// job-preset, RenderHour video / speech and UC (image / video) handlers.
//
// Each handler is driven against a fake upstream that never finishes. Timers created by the
// polling sleep are intercepted (identified by the call stack), recorded, and fired at once while
// a virtual clock advances by the requested delay, so a multi-day wait runs in milliseconds. The
// UC handlers take an injectable sleep, so there the stub records the delay directly.
import test from "node:test";
import assert from "node:assert/strict";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";
import { handleVideoGeneration } from "../../open-sse/handlers/videoGeneration.ts";
import { handleMusicGeneration } from "../../open-sse/handlers/musicGeneration.ts";
import { handleAudioSpeech } from "../../open-sse/handlers/audioSpeech.ts";
import { handleUcImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/ucImage.ts";
import {
  handleUcVideoGeneration,
  UC_DIRECT_VIDEO_URL,
  UC_PERSONA_TEXT_TO_VIDEO_URL,
} from "../../open-sse/handlers/videoGeneration/providers/ucVideo.ts";
import { UC_PERSONA_IMAGE_URL } from "../../open-sse/handlers/imageGeneration/providers/ucImage.ts";
import { isUcClerkMintUrl } from "./helpers/ucClerkUrl.ts";

const HUGE_MS = 1e12; // ~31 years
const INTERVAL_CEILING = 30_000;
// Video jobs render for minutes; their caller interval ceiling is longer (pollBounds.ts).
const VIDEO_INTERVAL_CEILING = 120_000;
const intervalCeilingFor = (name: string) =>
  /video|runway|dashscope|novita|minimax/i.test(name) ? VIDEO_INTERVAL_CEILING : INTERVAL_CEILING;
const TIMEOUT_CEILING = 600_000;

const originalFetch = globalThis.fetch;
const originalSetTimeout = globalThis.setTimeout;
const originalDateNow = Date.now;

type SleepTrace = { sleeps: number[]; elapsedMs: () => number };

/** Files whose `setTimeout` is the polling sleep of a handler under test. */
const SLEEP_FRAMES = ["utils/sleep.ts", "videoGeneration/minimaxHandler.ts"];

/** Intercepts timers created by the polling sleeps and drives a virtual clock with them. */
function installVirtualSleep(): SleepTrace {
  const start = originalDateNow();
  let offset = 0;
  const sleeps: number[] = [];
  Date.now = () => start + offset;
  globalThis.setTimeout = ((fn: (...args: unknown[]) => void, ms?: number, ...args: unknown[]) => {
    const stack = new Error().stack ?? "";
    if (!SLEEP_FRAMES.some((frame) => stack.includes(frame))) {
      return originalSetTimeout(fn, ms, ...args);
    }
    const delay = Number(ms) || 0;
    sleeps.push(delay);
    offset += delay;
    return originalSetTimeout(fn, 0, ...args);
  }) as typeof setTimeout;
  return { sleeps, elapsedMs: () => offset };
}

/** A virtual clock driven by an injected `sleepImpl` (UC handlers). */
function virtualSleepImpl(): SleepTrace & { sleepImpl: (ms: number) => Promise<void> } {
  const start = originalDateNow();
  let offset = 0;
  const sleeps: number[] = [];
  Date.now = () => start + offset;
  return {
    sleeps,
    elapsedMs: () => offset,
    sleepImpl: async (ms: number) => {
      sleeps.push(ms);
      offset += ms;
    },
  };
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

/** Kie: every create endpoint returns a task id, every record-info poll says "pending". */
const kieFetch = (async (input: string | URL) => {
  const url = String(input);
  if (url.includes("record-info") || url.includes("recordInfo")) {
    return json({ code: 200, data: { status: "GENERATING" } });
  }
  return json({ code: 200, data: { taskId: "kie-task-1" } });
}) as typeof fetch;

/** RenderHour: the job is accepted and stays "running". */
const renderhourFetch = (async (input: string | URL) => {
  const url = String(input);
  if (url.endsWith("/v1/generations")) return json({ id: "job-1", status: "queued" }, 201);
  return json({ id: "job-1", status: "running" });
}) as typeof fetch;

type Site = {
  /** Default poll interval the handler uses when the caller sends none. */
  defaultIntervalMs: number;
  /** Default polling window; a default above the ceiling stays the effective ceiling. */
  defaultTimeoutMs: number;
  fetch: typeof fetch;
  run: (extraBody: Record<string, unknown>) => Promise<unknown>;
};

const SITES: Record<string, Site> = {
  "kie image": {
    defaultIntervalMs: 2_500,
    defaultTimeoutMs: 300_000,
    fetch: kieFetch,
    run: (extra) =>
      handleImageGeneration({
        body: { model: "kie/gpt4o-image", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "kie-key" },
        log: null,
      }),
  },
  "kie video": {
    defaultIntervalMs: 2_500,
    defaultTimeoutMs: 300_000,
    fetch: kieFetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "kie/kling-3.0/video", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "kie-key" },
        log: null,
      }),
  },
  "kie music": {
    defaultIntervalMs: 2_500,
    defaultTimeoutMs: 300_000,
    fetch: kieFetch,
    run: (extra) =>
      handleMusicGeneration({
        body: { model: "kie/V4", prompt: "a sea shanty", ...extra },
        credentials: { apiKey: "kie-key" },
        log: null,
      }),
  },
  runway: {
    defaultIntervalMs: 5_000,
    defaultTimeoutMs: 300_000,
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("_to_video")) return json({ id: "task-1" });
      return json({ id: "task-1", status: "RUNNING" });
    }) as typeof fetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "runwayml/gen4.5", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "runway-key" },
        log: null,
      }),
  },
  dashscope: {
    defaultIntervalMs: 2_500,
    defaultTimeoutMs: 300_000,
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("/video-synthesis")) {
        return json({ output: { task_id: "ali-task-1", task_status: "PENDING" } });
      }
      return json({ output: { task_id: "ali-task-1", task_status: "RUNNING" } });
    }) as typeof fetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "alibaba/wan2.7-t2v-2026-06-12", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "alibaba-key", providerSpecificData: { region: "global-sg" } },
        log: null,
      }),
  },
  novita: {
    defaultIntervalMs: 2_500,
    defaultTimeoutMs: 300_000,
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/task-result")) {
        return json({ task: { task_id: "n-1", status: "TASK_STATUS_PROCESSING" } });
      }
      return json({ task_id: "n-1" });
    }) as typeof fetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "novita/wan-t2v", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "novita-key" },
        log: null,
      }),
  },
  minimax: {
    defaultIntervalMs: 5_000,
    defaultTimeoutMs: 300_000,
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.includes("/query/video_generation")) {
        return json({ task_id: "mm-1", status: "Processing", base_resp: { status_code: 0 } });
      }
      return json({ task_id: "mm-1", base_resp: { status_code: 0, status_msg: "success" } });
    }) as typeof fetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "minimax/MiniMax-Hailuo-02", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "minimax-key" },
        log: null,
      }),
  },
  "video job preset (agnes)": {
    defaultIntervalMs: 2_000,
    // No deadline here: the window is the preset's poll count (60) times the interval.
    defaultTimeoutMs: 60 * INTERVAL_CEILING,
    fetch: (async (input: string | URL) => {
      const url = String(input);
      if (url.endsWith("/v1/videos")) return json({ video_id: "vid-1" });
      return json({ status: "processing" });
    }) as typeof fetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "agnes/agnes-video-v2.0", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "agnes-key" },
        log: null,
      }),
  },
  "renderhour video": {
    defaultIntervalMs: 5_000,
    defaultTimeoutMs: 900_000,
    fetch: renderhourFetch,
    run: (extra) =>
      handleVideoGeneration({
        body: { model: "renderhour/kling-3.0", prompt: "a lighthouse", ...extra },
        credentials: { apiKey: "rh_key" },
        log: null,
      }),
  },
  "renderhour speech": {
    defaultIntervalMs: 2_000,
    defaultTimeoutMs: 180_000,
    fetch: renderhourFetch,
    run: (extra) =>
      handleAudioSpeech({
        body: { model: "renderhour/eleven-v4", input: "Hello there", ...extra },
        credentials: { apiKey: "rh_key" },
      }),
  },
};

async function runSite(name: string, extraBody: Record<string, unknown>) {
  const site = SITES[name];
  globalThis.fetch = site.fetch;
  const trace = installVirtualSleep();
  const result = await site.run(extraBody);
  restore();
  return { result, trace };
}

function isFailure(result: unknown): boolean {
  if (result instanceof Response) return result.status >= 400;
  return (result as { success?: boolean }).success === false;
}

const HUGE_BODY = { poll_interval_ms: HUGE_MS, timeout_ms: HUGE_MS * 10 };

test("video job preset (agnes): a huge caller max_polls cannot stretch the polling window", async () => {
  const { result, trace } = await runSite("video job preset (agnes)", {
    poll_interval_ms: HUGE_MS,
    max_polls: 1e9,
  });
  assert.equal((result as { success: boolean }).success, false);
  assert.ok(
    trace.elapsedMs() <= TIMEOUT_CEILING + VIDEO_INTERVAL_CEILING,
    `polling ran for ${trace.elapsedMs()}ms of virtual time`
  );
});

for (const [name, site] of Object.entries(SITES)) {
  test(`${name}: a huge caller poll interval and timeout are clamped to the ceilings`, async () => {
    const { result, trace } = await runSite(name, HUGE_BODY);

    assert.ok(isFailure(result), "a job that never finishes must fail");
    assert.ok(trace.sleeps.length > 0, "the handler polled at least once");
    const longest = Math.max(...trace.sleeps);
    assert.ok(
      longest <= intervalCeilingFor(name),
      `longest single sleep ${longest}ms > ${intervalCeilingFor(name)}`
    );
    const window = Math.max(TIMEOUT_CEILING, site.defaultTimeoutMs);
    assert.ok(
      trace.elapsedMs() <= window + intervalCeilingFor(name),
      `polling ran for ${trace.elapsedMs()}ms of virtual time, above the ${window}ms window`
    );
  });

  test(`${name}: a small caller poll interval is used as given`, async () => {
    const { trace } = await runSite(name, { poll_interval_ms: 1_000, timeout_ms: 5_000 });
    assert.ok(trace.sleeps.length > 0);
    assert.ok(
      trace.sleeps.every((ms) => ms === 1_000),
      `sleeps: ${trace.sleeps.join(",")}`
    );
  });

  test(`${name}: the default poll interval is unchanged when the caller sends none`, async () => {
    const { trace } = await runSite(name, {});
    assert.equal(trace.sleeps[0], site.defaultIntervalMs);
  });
}

test("renderhour video: an operator default above the ceiling stays reachable", async () => {
  // 900 s is the built-in RenderHour video window; a caller may ask for it but not for more.
  // A huge interval too, so the unclamped code ends after one sleep instead of polling
  // ~33 million times (which is the defect itself).
  const { result, trace } = await runSite("renderhour video", {
    poll_interval_ms: HUGE_MS,
    timeout_ms: HUGE_MS,
  });
  assert.match(String((result as { error?: unknown }).error), /within 900 s/);
  assert.ok(trace.elapsedMs() > TIMEOUT_CEILING, `elapsed ${trace.elapsedMs()}ms`);
  assert.ok(
    trace.elapsedMs() <= 900_000 + VIDEO_INTERVAL_CEILING,
    `elapsed ${trace.elapsedMs()}ms`
  );
});

// --- UC (injectable sleep) ---------------------------------------------------------------------

const UC_PERSONA_CRED = {
  providerSpecificData: {
    ucClientCookie: "clientcookie-abc",
    ucSid: "sess_123",
    ucUid: "b03dd963-d0c1-4193-99c9-f5a9d0c66b7f",
    ucCookies: { __client: "clientcookie-abc", __cf_bm: "cf" },
  },
};
const UC_DIRECT_CRED = { apiKey: "uai_sk_live_deadbeef" };

function fakeJwt(): string {
  const b64 = (o: unknown) => Buffer.from(JSON.stringify(o)).toString("base64url");
  const exp = Math.floor(originalDateNow() / 1000) + 3600 * 24 * 365 * 100;
  return `${b64({ alg: "RS256" })}.${b64({ uid: "uid", exp, sub: "user_1", sid: "sess_123" })}.sig`;
}

function ucResponse(ok: boolean, status: number, body: unknown = {}): Response {
  return {
    ok,
    status,
    headers: { get: () => "" },
    async json() {
      return body;
    },
    async text() {
      return typeof body === "string" ? body : JSON.stringify(body);
    },
  } as unknown as Response;
}

/** UC persona: mint, accept the job, keep the result URL pending forever. */
function ucPersonaFetch(submitUrl: string, resultUrl: string): typeof fetch {
  const jwt = fakeJwt();
  return (async (url: string) => {
    if (isUcClerkMintUrl(url)) return ucResponse(true, 200, { object: "token", jwt });
    if (url === submitUrl) return ucResponse(true, 200, { status: "pending", url: resultUrl });
    if (url === resultUrl) return ucResponse(false, 403, "");
    throw new Error(`unexpected fetch to ${url}`);
  }) as unknown as typeof fetch;
}

const UC_SITES: Record<
  string,
  {
    defaultIntervalMs: number;
    run: (
      extra: Record<string, unknown>,
      sleepImpl: (ms: number) => Promise<void>
    ) => Promise<unknown>;
  }
> = {
  "uc image (persona)": {
    defaultIntervalMs: 2_000,
    run: (extra, sleepImpl) =>
      handleUcImageGeneration({
        model: "uc/seedream-v5",
        provider: "uc",
        body: { prompt: "x", ...extra },
        credentials: UC_PERSONA_CRED,
        fetchImpl: ucPersonaFetch(UC_PERSONA_IMAGE_URL, "https://gen.moveinwater.com/never.png"),
        sleepImpl,
      }),
  },
  "uc video (persona)": {
    defaultIntervalMs: 3_000,
    run: (extra, sleepImpl) =>
      handleUcVideoGeneration({
        model: "uc/wan-2.2-spicy",
        provider: "uc",
        body: { prompt: "x", ...extra },
        credentials: UC_PERSONA_CRED,
        fetchImpl: ucPersonaFetch(
          UC_PERSONA_TEXT_TO_VIDEO_URL,
          "https://videogen.moveinwater.com/never"
        ),
        sleepImpl,
      }),
  },
  "uc video (direct)": {
    defaultIntervalMs: 3_000,
    run: (extra, sleepImpl) =>
      handleUcVideoGeneration({
        model: "uc-direct/t2v-standard",
        provider: "uc",
        body: { prompt: "x", ...extra },
        credentials: UC_DIRECT_CRED,
        fetchImpl: (async (url: string) => {
          const statusUrl = "https://api.uncensored.com/api/v1/videos/status/1";
          if (url === UC_DIRECT_VIDEO_URL) {
            return ucResponse(true, 200, { status: "pending", status_url: statusUrl, id: "job_1" });
          }
          if (url === statusUrl) return ucResponse(true, 200, { status: "processing" });
          throw new Error(`unexpected fetch to ${url}`);
        }) as unknown as typeof fetch,
        sleepImpl,
      }),
  },
};

for (const [name, site] of Object.entries(UC_SITES)) {
  test(`${name}: a huge caller poll interval and timeout are clamped to the ceilings`, async () => {
    const clock = virtualSleepImpl();
    const result = (await site.run(HUGE_BODY, clock.sleepImpl)) as { success: boolean };
    restore();
    assert.equal(result.success, false, "a job that never finishes must fail");
    assert.ok(clock.sleeps.length > 0, "the handler polled at least once");
    const longest = Math.max(...clock.sleeps);
    assert.ok(
      longest <= intervalCeilingFor(name),
      `longest single sleep ${longest}ms > ${intervalCeilingFor(name)}`
    );
    assert.ok(
      clock.elapsedMs() <= TIMEOUT_CEILING + intervalCeilingFor(name),
      `polling ran for ${clock.elapsedMs()}ms of virtual time`
    );
  });

  test(`${name}: the default poll interval is unchanged when the caller sends none`, async () => {
    const clock = virtualSleepImpl();
    await site.run({ timeout_ms: 20_000 }, clock.sleepImpl);
    restore();
    assert.equal(clock.sleeps[0], site.defaultIntervalMs);
  });
}
