import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import { getDefaultDispatcher, getDedicatedCodexImageDispatcher } from "../../open-sse/utils/proxyDispatcher.ts";

const CODEX_GENERATION = "https://chatgpt.com/backend-api/codex/images/generations";
const CODEX_EDITS = "https://chatgpt.com/backend-api/codex/images/edits";

async function withTimeoutOverrides<T>(fn: () => Promise<T>): Promise<T> {
  const originalDirect = process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  const originalImage = process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS;
  process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = "10";
  process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS = "90";
  try {
    return await fn();
  } finally {
    if (originalDirect === undefined) delete process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
    else process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = originalDirect;
    if (originalImage === undefined)
      delete process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS;
    else process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS = originalImage;
  }
}

function delayedFetch(ms: number, capture: { calls: number; dispatchers: unknown[] }) {
  return async (_input: RequestInfo | URL, options: RequestInit = {}): Promise<Response> =>
    new Promise<Response>((resolve, reject) => {
      capture.calls++;
      capture.dispatchers.push((options as RequestInit & { dispatcher?: unknown }).dispatcher);
      const timer = setTimeout(() => resolve(new Response("ok")), ms);
      options.signal?.addEventListener(
        "abort",
        () => {
          clearTimeout(timer);
          reject(options.signal?.reason ?? new Error("aborted"));
        },
        { once: true }
      );
    });
}

test("Codex dedicated generations can take longer than the global 30s guard without replay", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const res = await proxyFetch(
      CODEX_GENERATION,
      { method: "POST", body: JSON.stringify({ model: "gpt-image-2.5-flare", prompt: "test" }) },
      { undiciFetch: delayedFetch(35, capture) }
    );
    assert.equal(await res.text(), "ok");
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDedicatedCodexImageDispatcher(90), "must use a fresh socket");
  });
});

test("Codex dedicated edits use the same long timeout and never replay", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const res = await proxyFetch(
      CODEX_EDITS,
      { method: "POST", body: JSON.stringify({ model: "gpt-image-2", images: [] }) },
      { undiciFetch: delayedFetch(35, capture) }
    );
    assert.equal(res.status, 200);
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDedicatedCodexImageDispatcher(90));
  });
});

test("Codex dedicated image timeout has one attempt (never submits duplicate generation)", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    await assert.rejects(
      proxyFetch(CODEX_GENERATION, { method: "POST", body: "{}" }, {
        undiciFetch: delayedFetch(180, capture),
      }),
      (error: unknown) => (error as { code?: string }).code === "DIRECT_RESPONSE_START_TIMEOUT"
    );
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDedicatedCodexImageDispatcher(90));
  });
});

test("unrelated Codex Responses traffic keeps the normal pooled path", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const res = await proxyFetch(
      "https://chatgpt.com/backend-api/codex/responses",
      { method: "POST", body: "{}" },
      { undiciFetch: delayedFetch(0, capture) }
    );
    assert.equal(res.status, 200);
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDefaultDispatcher());
  });
});

test("Codex paid image transport error never replays through native fetch", async () => {
  await withTimeoutOverrides(async () => {
    let attempts = 0;
    let nativeAttempts = 0;
    await assert.rejects(
      proxyFetch(
        CODEX_GENERATION,
        { method: "POST", body: JSON.stringify({ prompt: "test" }) },
        {
          undiciFetch: async () => {
            attempts++;
            const error = new TypeError("fetch failed");
            (error as TypeError & { code?: string }).code = "ECONNRESET";
            throw error;
          },
          nativeFetch: async () => {
            nativeAttempts++;
            return new Response("unexpected");
          },
        }
      )
    );
    assert.equal(attempts, 1, "only one paid image submission");
    assert.equal(nativeAttempts, 0, "native fallback must not resubmit image work");
  });
});

test("proxied Codex image generation honors its own response-start deadline", async () => {
  await withTimeoutOverrides(async () => {
    const proxy = { type: "http" as const, host: "127.0.0.1", port: 7897 };
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const res = await runWithProxyContext(proxy, () =>
      proxyFetch(
        CODEX_GENERATION,
        { method: "POST", body: JSON.stringify({ prompt: "test" }) },
        { undiciFetch: delayedFetch(35, capture) }
      )
    );
    assert.equal(res.status, 200);
    assert.equal(capture.calls, 1);
    assert.ok(capture.dispatchers[0], "proxied images need a dedicated dispatcher");
  });
});

test("proxied Codex image response-start timeout does not resubmit", async () => {
  await withTimeoutOverrides(async () => {
    const proxy = { type: "http" as const, host: "127.0.0.1", port: 7897 };
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    await assert.rejects(
      runWithProxyContext(proxy, () =>
        proxyFetch(
          CODEX_EDITS,
          { method: "POST", body: JSON.stringify({ prompt: "test", images: [] }) },
          { undiciFetch: delayedFetch(180, capture) }
        )
      )
    );
    assert.equal(capture.calls, 1, "proxy egress also submits paid image work only once");
  });
});
