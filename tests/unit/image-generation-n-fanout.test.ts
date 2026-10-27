import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-images-fanout-"));

const { handleImageGeneration } = await import("../../open-sse/handlers/imageGeneration.ts");
const { resolveRequestedImageCount, IMAGE_FANOUT_CONCURRENCY, IMAGE_FANOUT_MAX_N } =
  await import("../../open-sse/handlers/imageGeneration/fanOut.ts");
const { setPinnedFetchTestOverride } = await import("../../src/shared/network/remoteImageFetch.ts");

type FetchImpl = (url: unknown, options?: RequestInit) => Promise<Response>;

function mockFetch(impl: FetchImpl) {
  globalThis.fetch = impl as typeof fetch;
  setPinnedFetchTestOverride(impl);
}

function json(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}

function createLogRecorder() {
  const entries: Array<{ level: string; message: string }> = [];
  const push = (level: string) => (_tag: string, message: string) =>
    entries.push({ level, message });
  return { entries, info: push("info"), warn: push("warn"), error: push("error") };
}

const tick = () => new Promise((resolve) => setImmediate(resolve));

/**
 * Fake api.bfl.ai: every POST creates a task whose polled result is a URL naming the seed the
 * task was created with. Tracks POST bodies, in-flight tasks (POST start → poll Ready) and the
 * peak of in-flight tasks.
 */
function mockBfl({ model = "flux-2-pro", moderatedSeed = null as number | null } = {}) {
  const state = { posts: [] as Record<string, unknown>[], inFlight: 0, peak: 0 };
  let nextId = 0;
  const tasks = new Map<string, Record<string, unknown>>();

  mockFetch(async (url, options = {}) => {
    const stringUrl = String(url);
    if (stringUrl === `https://api.bfl.ai/v1/${model}`) {
      const body = JSON.parse(String(options.body || "{}"));
      state.posts.push(body);
      state.inFlight++;
      state.peak = Math.max(state.peak, state.inFlight);
      const id = String(nextId++);
      tasks.set(id, body);
      await tick();
      await tick();
      return json({ id, polling_url: `https://api.bfl.ai/result/${id}` });
    }
    const pollMatch = stringUrl.match(/^https:\/\/api\.bfl\.ai\/result\/(\d+)$/);
    if (pollMatch) {
      const taskBody = tasks.get(pollMatch[1]);
      await tick();
      state.inFlight--;
      if (moderatedSeed !== null && taskBody.seed === moderatedSeed) {
        return json({ status: "Content Moderated" });
      }
      return json({
        status: "Ready",
        result: { sample: `https://cdn.example.com/bfl-${String(taskBody.seed ?? "x")}.png` },
      });
    }
    throw new Error(`Unexpected URL: ${stringUrl}`);
  });

  return state;
}

async function withFetchRestored(fn: () => Promise<void>) {
  const originalFetch = globalThis.fetch;
  try {
    await fn();
  } finally {
    mockFetch(originalFetch as FetchImpl);
  }
}

test("resolveRequestedImageCount accepts positive integers and numeric strings only", () => {
  assert.equal(resolveRequestedImageCount(undefined), 1);
  assert.equal(resolveRequestedImageCount(null), 1);
  assert.equal(resolveRequestedImageCount(0), 1);
  assert.equal(resolveRequestedImageCount(-2), 1);
  assert.equal(resolveRequestedImageCount(2.5), 1);
  assert.equal(resolveRequestedImageCount("abc"), 1);
  assert.equal(resolveRequestedImageCount(""), 1);
  assert.equal(resolveRequestedImageCount(3), 3);
  assert.equal(resolveRequestedImageCount("4"), 4);
});

test("BFL n=3 fans out to 3 tasks and returns 3 images in call order with offset seeds", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl();
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-2-pro", prompt: "a red fox", n: 3, seed: 100 },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(state.posts.length, 3);
    assert.deepEqual(state.posts.map((body) => body.seed).sort(), [100, 101, 102]);
    assert.deepEqual(
      result.data.data.map((item: { url: string }) => item.url),
      [
        "https://cdn.example.com/bfl-100.png",
        "https://cdn.example.com/bfl-101.png",
        "https://cdn.example.com/bfl-102.png",
      ]
    );
  });
});

test("BFL without n sends exactly one task and no num_images / n field", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl();
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-2-pro", prompt: "a red fox" },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(state.posts.length, 1);
    assert.equal(result.data.data.length, 1);
    assert.equal("num_images" in state.posts[0], false);
    assert.equal("n" in state.posts[0], false);
    assert.equal("seed" in state.posts[0], false);
  });
});

test("BFL ultra no longer forwards the undocumented num_images field", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl({ model: "flux-pro-1.1-ultra" });
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-pro-1.1-ultra", prompt: "a red fox", n: 2 },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(state.posts.length, 2);
    assert.equal(result.data.data.length, 2);
    for (const body of state.posts) assert.equal("num_images" in body, false);
  });
});

test("fan-out keeps at most IMAGE_FANOUT_CONCURRENCY upstream tasks in flight", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl();
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-2-pro", prompt: "a red fox", n: 8 },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(result.data.data.length, 8);
    assert.equal(state.posts.length, 8);
    assert.equal(state.peak, IMAGE_FANOUT_CONCURRENCY);
  });
});

test("fan-out is all-or-nothing and stops starting tasks after a failure", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl({ moderatedSeed: 1 });
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-2-pro", prompt: "a red fox", n: 8, seed: 0 },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, false);
    assert.match(String(result.error), /Content Moderated/);
    assert.equal(result.data, undefined);
    assert.ok(state.posts.length < 8, `expected early stop, got ${state.posts.length} tasks`);
  });
});

test("n above the OpenAI maximum is clamped with a warning", async () => {
  await withFetchRestored(async () => {
    const state = mockBfl();
    const log = createLogRecorder();
    const result = await handleImageGeneration({
      body: { model: "black-forest-labs/flux-2-pro", prompt: "a red fox", n: 50 },
      credentials: { apiKey: "bfl-key" },
      log,
    });

    assert.equal(result.success, true);
    assert.equal(state.posts.length, IMAGE_FANOUT_MAX_N);
    assert.equal(result.data.data.length, IMAGE_FANOUT_MAX_N);
    assert.ok(log.entries.some((e) => e.level === "warn" && /n=50 clamped to 10/.test(e.message)));
  });
});

test("BFL edit fan-out sends the same input image on every task", async () => {
  await withFetchRestored(async () => {
    const state = { posts: [] as Record<string, unknown>[] };
    let nextId = 0;
    mockFetch(async (url, options = {}) => {
      const stringUrl = String(url);
      if (stringUrl.startsWith("data:")) throw new Error("data URLs are decoded locally");
      if (stringUrl === "https://api.bfl.ai/v1/flux-kontext-pro") {
        state.posts.push(JSON.parse(String(options.body || "{}")));
        return json({ polling_url: `https://api.bfl.ai/result/${nextId++}` });
      }
      if (stringUrl.startsWith("https://api.bfl.ai/result/")) {
        return json({ status: "Ready", result: { sample: `${stringUrl}.png` } });
      }
      throw new Error(`Unexpected URL: ${stringUrl}`);
    });

    const result = await handleImageGeneration({
      body: {
        model: "black-forest-labs/flux-kontext-pro",
        prompt: "make it blue",
        image_url: "data:image/png;base64,AQI=",
        n: 2,
      },
      credentials: { apiKey: "bfl-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(state.posts.length, 2);
    assert.equal(result.data.data.length, 2);
    for (const body of state.posts) assert.equal(body.input_image, "AQI=");
  });
});

test("Stability AI n=2 fans out to two single-image requests", async () => {
  await withFetchRestored(async () => {
    let calls = 0;
    mockFetch(async (url) => {
      assert.equal(String(url), "https://api.stability.ai/v2beta/stable-image/generate/core");
      calls++;
      return json({ image: Buffer.from(`img-${calls}`).toString("base64") });
    });

    const result = await handleImageGeneration({
      body: {
        model: "stability-ai/stable-image-core",
        prompt: "city near beach",
        n: 2,
        response_format: "b64_json",
      },
      credentials: { apiKey: "stability-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(calls, 2);
    assert.equal(result.data.data.length, 2);
  });
});

test("providers that honor n natively still get a single request carrying n", async () => {
  await withFetchRestored(async () => {
    const bodies: Record<string, unknown>[] = [];
    mockFetch(async (_url, options = {}) => {
      bodies.push(JSON.parse(String(options.body || "{}")));
      return json({
        created: 1,
        data: [{ url: "https://cdn.example.com/a.png" }, { url: "https://cdn.example.com/b.png" }],
      });
    });

    const result = await handleImageGeneration({
      body: { model: "openai/gpt-image-2", prompt: "skyline", n: 2 },
      credentials: { apiKey: "image-key" },
      log: null,
    });

    assert.equal(result.success, true);
    assert.equal(bodies.length, 1);
    assert.equal(bodies[0].n, 2);
    assert.equal(result.data.data.length, 2);
  });
});
