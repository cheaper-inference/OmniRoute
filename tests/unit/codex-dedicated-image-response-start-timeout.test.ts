import { test } from "node:test";
import assert from "node:assert/strict";
import { proxyFetch, runWithProxyContext } from "../../open-sse/utils/proxyFetch.ts";
import {
  __setProxyHealthTcpCheckForTesting,
  invalidateProxyHealth,
} from "../../src/lib/proxyHealth.ts";
import {
  getDefaultDispatcher,
  getDedicatedCodexImageDispatcher,
} from "../../open-sse/utils/proxyDispatcher.ts";
import { getGuardedDispatcher } from "../../open-sse/utils/connectGuardDispatcher.ts";

const CODEX_GENERATION = "https://chatgpt.com/backend-api/codex/images/generations";
const CODEX_EDITS = "https://chatgpt.com/backend-api/codex/images/edits";
// The general direct guard stays at 10 ms: a success delay above it proves the image deadline
// applied. Wide gaps around the image deadline keep the outcomes stable on a loaded runner.
const IMAGE_DEADLINE_MS = 1000;
const SLOW_SUCCESS_MS = 100;
const PAST_DEADLINE_MS = 2000;

async function runWithHealthyProxyContext<T>(
  proxy: { type: "http"; host: string; port: number },
  fn: () => Promise<T>
): Promise<T> {
  const proxyUrl = `http://${proxy.host}:${proxy.port}`;
  invalidateProxyHealth(proxyUrl);
  __setProxyHealthTcpCheckForTesting(async () => true);
  try {
    return await runWithProxyContext(proxy, fn);
  } finally {
    __setProxyHealthTcpCheckForTesting(null);
    invalidateProxyHealth(proxyUrl);
  }
}

async function withTimeoutOverrides<T>(fn: () => Promise<T>): Promise<T> {
  const originalDirect = process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS;
  const originalImage = process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS;
  process.env.OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS = "10";
  process.env.OMNIROUTE_CODEX_IMAGE_RESPONSE_START_TIMEOUT_MS = String(IMAGE_DEADLINE_MS);
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
      { undiciFetch: delayedFetch(SLOW_SUCCESS_MS, capture) }
    );
    assert.equal(await res.text(), "ok");
    assert.equal(capture.calls, 1);
    assert.equal(
      capture.dispatchers[0],
      getDedicatedCodexImageDispatcher(IMAGE_DEADLINE_MS),
      "must use a fresh socket"
    );
  });
});

test("Codex dedicated edits use the same long timeout and never replay", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    const res = await proxyFetch(
      CODEX_EDITS,
      { method: "POST", body: JSON.stringify({ model: "gpt-image-2", images: [] }) },
      { undiciFetch: delayedFetch(SLOW_SUCCESS_MS, capture) }
    );
    assert.equal(res.status, 200);
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDedicatedCodexImageDispatcher(IMAGE_DEADLINE_MS));
  });
});

test("Codex dedicated image timeout has one attempt (never submits duplicate generation)", async () => {
  await withTimeoutOverrides(async () => {
    const capture = { calls: 0, dispatchers: [] as unknown[] };
    await assert.rejects(
      proxyFetch(
        CODEX_GENERATION,
        { method: "POST", body: "{}" },
        {
          undiciFetch: delayedFetch(PAST_DEADLINE_MS, capture),
        }
      ),
      (error: unknown) => {
        const { code, message } = error as { code?: string; message: string };
        assert.equal(code, "DIRECT_RESPONSE_START_TIMEOUT");
        assert.doesNotMatch(message, /retry/i, "a paid image POST is never retried");
        return true;
      }
    );
    assert.equal(capture.calls, 1);
    assert.equal(capture.dispatchers[0], getDedicatedCodexImageDispatcher(IMAGE_DEADLINE_MS));
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
    const res = await runWithHealthyProxyContext(proxy, () =>
      proxyFetch(
        CODEX_GENERATION,
        { method: "POST", body: JSON.stringify({ prompt: "test" }) },
        { undiciFetch: delayedFetch(SLOW_SUCCESS_MS, capture) }
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
      runWithHealthyProxyContext(proxy, () =>
        proxyFetch(
          CODEX_EDITS,
          { method: "POST", body: JSON.stringify({ prompt: "test", images: [] }) },
          { undiciFetch: delayedFetch(PAST_DEADLINE_MS, capture) }
        )
      )
    );
    assert.equal(capture.calls, 1, "proxy egress also submits paid image work only once");
  });
});

function connectionReset(): TypeError {
  return Object.assign(new TypeError("fetch failed"), { code: "ECONNRESET" });
}

test("proxied Codex image transport error does not resubmit", async () => {
  await withTimeoutOverrides(async () => {
    const proxy = { type: "http" as const, host: "127.0.0.1", port: 7897 };
    let submissions = 0;
    await assert.rejects(
      runWithHealthyProxyContext(proxy, () =>
        proxyFetch(
          CODEX_GENERATION,
          { method: "POST", body: JSON.stringify({ prompt: "test" }) },
          {
            undiciFetch: async () => {
              submissions++;
              throw connectionReset();
            },
          }
        )
      )
    );
    assert.equal(submissions, 1);
  });
});

test("Codex paid image POST is submitted once through an edge relay", async () => {
  await withTimeoutOverrides(async () => {
    const relay = { type: "vercel", host: "relay.test", relayAuth: "test-only" };
    const submissionsFor = async (url: string): Promise<number> => {
      let submissions = 0;
      await assert.rejects(
        runWithProxyContext(relay, () =>
          proxyFetch(
            url,
            { method: "POST", body: JSON.stringify({ prompt: "test" }) },
            {
              undiciFetch: async () => {
                submissions++;
                throw connectionReset();
              },
            }
          )
        )
      );
      return submissions;
    };

    assert.equal(await submissionsFor(CODEX_GENERATION), 1);
    assert.equal(await submissionsFor(CODEX_EDITS), 1);
    assert.equal(
      await submissionsFor("https://chatgpt.com/backend-api/codex/responses"),
      2,
      "other relay POSTs keep the fresh-socket retry"
    );
  });
});

test("a guarded Codex paid image POST keeps its connect guard and is submitted once", async () => {
  await withTimeoutOverrides(async () => {
    const dispatchers: unknown[] = [];
    let nativeAttempts = 0;
    await assert.rejects(
      proxyFetch(
        CODEX_GENERATION,
        {
          method: "POST",
          body: JSON.stringify({ prompt: "test" }),
          connectGuard: "block-metadata",
        },
        {
          undiciFetch: async (_input: RequestInfo | URL, options: RequestInit = {}) => {
            dispatchers.push((options as RequestInit & { dispatcher?: unknown }).dispatcher);
            throw connectionReset();
          },
          nativeFetch: async () => {
            nativeAttempts++;
            return new Response("unexpected");
          },
        }
      )
    );
    assert.deepEqual(dispatchers, [getGuardedDispatcher("block-metadata")]);
    assert.equal(nativeAttempts, 0, "native fallback must not resubmit image work");
  });
});

test("a Request input is recognized as a Codex paid image POST", async () => {
  await withTimeoutOverrides(async () => {
    const dispatchers: unknown[] = [];
    await assert.rejects(
      proxyFetch(
        new Request(CODEX_GENERATION, { method: "POST" }),
        {},
        {
          undiciFetch: async (_input: RequestInfo | URL, options: RequestInit = {}) => {
            dispatchers.push((options as RequestInit & { dispatcher?: unknown }).dispatcher);
            throw connectionReset();
          },
          nativeFetch: async () => {
            throw new Error("native fallback must not resubmit image work");
          },
        }
      )
    );
    assert.deepEqual(dispatchers, [getDedicatedCodexImageDispatcher(IMAGE_DEADLINE_MS)]);
  });
});
