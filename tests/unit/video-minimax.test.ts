import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-minimax-video-"));

const { VIDEO_PROVIDERS, getAllVideoModels } =
  await import("../../open-sse/config/videoRegistry.ts");
const { handleVideoGeneration } = await import("../../open-sse/handlers/videoGeneration.ts");
const { buildMinimaxVideoRequestBody, normalizeMinimaxTaskStatus } =
  await import("../../open-sse/handlers/videoGeneration/minimaxHandler.ts");

const API_KEY = "sk-minimax-secret-key-123";

type FetchCall = { url: string; init: RequestInit };
type FetchStep = (url: string, init: RequestInit) => Response | Promise<Response>;

function jsonResponse(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", ...headers },
  });
}

function immediateTimeout(callback: unknown, _ms?: number, ...args: unknown[]) {
  if (typeof callback === "function") callback(...args);
  return 0;
}

/**
 * Runs handleVideoGeneration with a scripted fetch. Each upstream call is routed by URL
 * to the create / query / files handlers so the order of polls is explicit in the test.
 */
async function runMinimax(
  body: Record<string, unknown>,
  handlers: { create: FetchStep; query?: FetchStep; files?: FetchStep },
  credentials: Record<string, unknown> | null = { apiKey: API_KEY }
) {
  const originalFetch = globalThis.fetch;
  const originalSetTimeout = globalThis.setTimeout;
  const calls: FetchCall[] = [];

  globalThis.setTimeout = immediateTimeout as unknown as typeof setTimeout;
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = String(input);
    calls.push({ url, init });
    if (url.startsWith("https://api.minimax.io/v1/video_generation")) {
      return handlers.create(url, init);
    }
    if (url.startsWith("https://api.minimax.io/v1/query/video_generation") && handlers.query) {
      return handlers.query(url, init);
    }
    if (url.startsWith("https://api.minimax.io/v1/files/retrieve") && handlers.files) {
      return handlers.files(url, init);
    }
    throw new Error(`Unexpected URL: ${url}`);
  }) as typeof fetch;

  try {
    const result = await handleVideoGeneration({ body, credentials, log: null });
    return { result, calls };
  } finally {
    globalThis.fetch = originalFetch;
    globalThis.setTimeout = originalSetTimeout;
  }
}

function headerValue(init: RequestInit, name: string): string | undefined {
  const headers = (init.headers || {}) as Record<string, string>;
  const key = Object.keys(headers).find((entry) => entry.toLowerCase() === name.toLowerCase());
  return key ? headers[key] : undefined;
}

test("registry: minimax video is dispatchable and advertised (no longer unsupported)", () => {
  const minimax = VIDEO_PROVIDERS.minimax;
  assert.equal(minimax.format, "minimax-video");
  assert.equal(minimax.unsupported, undefined);
  assert.equal(minimax.unsupportedReason, undefined);
  assert.equal(minimax.baseUrl, "https://api.minimax.io/v1/video_generation");
  assert.equal(minimax.statusUrl, "https://api.minimax.io/v1/query/video_generation");
  assert.equal(minimax.filesUrl, "https://api.minimax.io/v1/files/retrieve");

  const advertised = getAllVideoModels().map((entry: { id: string }) => entry.id);
  assert.ok(advertised.includes("minimax/MiniMax-Hailuo-02"));
});

test("buildMinimaxVideoRequestBody: rejects an empty prompt", () => {
  const result = buildMinimaxVideoRequestBody("MiniMax-Hailuo-02", { prompt: "   " }, [
    "MiniMax-Hailuo-02",
  ]);
  assert.ok("error" in result);
  assert.match(result.error, /prompt/i);
});

test("buildMinimaxVideoRequestBody: rejects a prompt over 2000 characters", () => {
  const result = buildMinimaxVideoRequestBody("MiniMax-Hailuo-02", { prompt: "x".repeat(2001) }, [
    "MiniMax-Hailuo-02",
  ]);
  assert.ok("error" in result);
  assert.match(result.error, /2000/);
});

test("buildMinimaxVideoRequestBody: rejects a model outside the registry", () => {
  const result = buildMinimaxVideoRequestBody("MiniMax-H3", { prompt: "a lake" }, [
    "MiniMax-Hailuo-02",
  ]);
  assert.ok("error" in result);
  assert.match(result.error, /Unsupported MiniMax video model: MiniMax-H3/);
});

test("buildMinimaxVideoRequestBody: forwards optional fields only when provided", () => {
  const minimal = buildMinimaxVideoRequestBody("MiniMax-Hailuo-02", { prompt: "  a lake " }, [
    "MiniMax-Hailuo-02",
  ]);
  assert.deepEqual(minimal, { model: "MiniMax-Hailuo-02", prompt: "a lake" });

  const full = buildMinimaxVideoRequestBody(
    "MiniMax-Hailuo-02",
    {
      prompt: "a lake",
      duration: 10,
      resolution: "768p",
      first_frame_image: "https://cdn.example.com/frame.png",
      prompt_optimizer: false,
      fast_pretreatment: true,
    },
    ["MiniMax-Hailuo-02"]
  );
  assert.deepEqual(full, {
    model: "MiniMax-Hailuo-02",
    prompt: "a lake",
    duration: 10,
    resolution: "768P",
    first_frame_image: "https://cdn.example.com/frame.png",
    prompt_optimizer: false,
    fast_pretreatment: true,
  });
});

test("buildMinimaxVideoRequestBody: accepts image_url as the first frame", () => {
  const result = buildMinimaxVideoRequestBody(
    "MiniMax-Hailuo-02",
    { prompt: "a lake", image_url: "https://cdn.example.com/frame.png" },
    ["MiniMax-Hailuo-02"]
  );
  assert.ok(!("error" in result));
  assert.equal(result.first_frame_image, "https://cdn.example.com/frame.png");
});

test("buildMinimaxVideoRequestBody: rejects invalid duration and resolution", () => {
  const badDuration = buildMinimaxVideoRequestBody(
    "MiniMax-Hailuo-02",
    { prompt: "a lake", duration: 7 },
    ["MiniMax-Hailuo-02"]
  );
  assert.ok("error" in badDuration);
  assert.match(badDuration.error, /duration/i);

  const badResolution = buildMinimaxVideoRequestBody(
    "MiniMax-Hailuo-02",
    { prompt: "a lake", resolution: "4K" },
    ["MiniMax-Hailuo-02"]
  );
  assert.ok("error" in badResolution);
  assert.match(badResolution.error, /resolution/i);
});

test("normalizeMinimaxTaskStatus maps the documented v1 states", () => {
  assert.equal(normalizeMinimaxTaskStatus("Preparing"), "pending");
  assert.equal(normalizeMinimaxTaskStatus("Queueing"), "pending");
  assert.equal(normalizeMinimaxTaskStatus("Processing"), "processing");
  assert.equal(normalizeMinimaxTaskStatus("Success"), "done");
  assert.equal(normalizeMinimaxTaskStatus("Fail"), "failed");
  assert.equal(normalizeMinimaxTaskStatus(undefined), "pending");
});

test("dispatcher: minimax create → poll → files/retrieve returns the download URL", async () => {
  let polls = 0;
  const { result, calls } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "A lantern over a lake", duration: 6 },
    {
      create: () =>
        jsonResponse({ task_id: "task-42", base_resp: { status_code: 0, status_msg: "success" } }),
      query: () => {
        polls += 1;
        return polls === 1
          ? jsonResponse({
              task_id: "task-42",
              status: "Processing",
              base_resp: { status_code: 0 },
            })
          : jsonResponse({
              task_id: "task-42",
              status: "Success",
              file_id: "998877",
              base_resp: { status_code: 0 },
            });
      },
      files: () =>
        jsonResponse({
          file: { file_id: 998877, download_url: "https://cdn.minimax.example/video.mp4" },
          base_resp: { status_code: 0, status_msg: "success" },
        }),
    }
  );

  assert.equal(result.success, true, JSON.stringify(result));
  assert.deepEqual(result.data.data, [
    { url: "https://cdn.minimax.example/video.mp4", format: "mp4" },
  ]);
  assert.equal(typeof result.data.created, "number");

  const [create, poll1, poll2, files] = calls;
  assert.equal(create.url, "https://api.minimax.io/v1/video_generation");
  assert.equal(create.init.method, "POST");
  assert.equal(headerValue(create.init, "Authorization"), `Bearer ${API_KEY}`);
  assert.deepEqual(JSON.parse(String(create.init.body)), {
    model: "MiniMax-Hailuo-02",
    prompt: "A lantern over a lake",
    duration: 6,
  });
  assert.equal(poll1.url, "https://api.minimax.io/v1/query/video_generation?task_id=task-42");
  assert.equal(headerValue(poll1.init, "Authorization"), `Bearer ${API_KEY}`);
  assert.equal(poll2.url, poll1.url);
  assert.equal(files.url, "https://api.minimax.io/v1/files/retrieve?file_id=998877");
  assert.equal(calls.length, 4);
});

test("dispatcher: base_resp auth error on HTTP 200 create → sanitized 401, no poll", async () => {
  const { result, calls } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    {
      create: () =>
        jsonResponse({
          task_id: "",
          base_resp: {
            status_code: 1004,
            status_msg: "login fail: Please carry the API secret key",
          },
        }),
    }
  );

  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.match(result.error, /1004/);
  assert.ok(!result.error.includes("at /"), "error must not leak a stack trace");
  assert.ok(!result.error.includes(API_KEY), "error must not leak the API key");
  assert.equal(calls.length, 1);
});

test("dispatcher: base_resp invalid params (2013) on create → 400", async () => {
  const { result } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    {
      create: () =>
        jsonResponse({ base_resp: { status_code: 2013, status_msg: "invalid params, duration" } }),
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.match(result.error, /2013/);
});

test("dispatcher: request validation fails before any upstream call", async () => {
  const { result, calls } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "" },
    { create: () => jsonResponse({ task_id: "never" }) }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 400);
  assert.equal(calls.length, 0);
});

test("dispatcher: missing API key → 401 without upstream call", async () => {
  const { result, calls } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    { create: () => jsonResponse({ task_id: "never" }) },
    null
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 401);
  assert.equal(calls.length, 0);
});

test("dispatcher: Fail status ends polling with an error", async () => {
  let polls = 0;
  const { result, calls } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    {
      create: () => jsonResponse({ task_id: "task-f", base_resp: { status_code: 0 } }),
      query: () => {
        polls += 1;
        return jsonResponse({
          task_id: "task-f",
          status: "Fail",
          base_resp: { status_code: 1027, status_msg: "output video sensitive" },
        });
      },
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(result.error, /failed/i);
  assert.equal(polls, 1);
  assert.equal(calls.length, 2);
});

test("dispatcher: bounded wait — a task that never finishes times out with 504", async () => {
  let polls = 0;
  const { result } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake", timeout_ms: 30, poll_interval_ms: 1 },
    {
      create: () => jsonResponse({ task_id: "task-slow", base_resp: { status_code: 0 } }),
      query: async () => {
        polls += 1;
        await new Promise((resolve) => setImmediate(resolve));
        return jsonResponse({
          task_id: "task-slow",
          status: "Queueing",
          base_resp: { status_code: 0 },
        });
      },
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 504);
  assert.match(result.error, /task-slow/);
  assert.ok(polls >= 1);
});

test("dispatcher: transient 429 on a poll backs off and keeps polling", async () => {
  let polls = 0;
  const { result } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    {
      create: () => jsonResponse({ task_id: "task-r", base_resp: { status_code: 0 } }),
      query: () => {
        polls += 1;
        if (polls === 1)
          return jsonResponse({ error: "rate limited" }, 429, { "retry-after": "1" });
        return jsonResponse({
          task_id: "task-r",
          status: "Success",
          file_id: "1",
          base_resp: { status_code: 0 },
        });
      },
      files: () =>
        jsonResponse({
          file: { file_id: 1, download_url: "https://cdn.minimax.example/r.mp4" },
          base_resp: { status_code: 0 },
        }),
    }
  );
  assert.equal(result.success, true, JSON.stringify(result));
  assert.equal(result.data.data[0].url, "https://cdn.minimax.example/r.mp4");
  assert.equal(polls, 2);
});

test("dispatcher: Success without a retrievable download_url → 502", async () => {
  const { result } = await runMinimax(
    { model: "minimax/MiniMax-Hailuo-02", prompt: "a lake" },
    {
      create: () => jsonResponse({ task_id: "task-n", base_resp: { status_code: 0 } }),
      query: () =>
        jsonResponse({
          task_id: "task-n",
          status: "Success",
          file_id: "5",
          base_resp: { status_code: 0 },
        }),
      files: () => jsonResponse({ file: { file_id: 5 }, base_resp: { status_code: 0 } }),
    }
  );
  assert.equal(result.success, false);
  assert.equal(result.status, 502);
  assert.match(result.error, /download/i);
});
