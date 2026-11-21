import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  __cacheProxyDispatcherForTest,
  clearDispatcherCache,
  evictProxyDispatcher,
  getDispatcherCache,
} from "../../open-sse/utils/proxyDispatcherCache.ts";
import {
  __proxyFailureStreakSizeForTest,
  __resetDispatcherReapForTest,
  MAX_PROXY_FAILURE_STREAKS,
  PROXY_DISPATCHER_EVICT_THRESHOLD,
  PROXY_DISPATCHER_FAILURE_WINDOW_MS,
  recordProxyDispatcherFailure,
  recordProxyDispatcherSuccess,
} from "../../open-sse/utils/proxyDispatcherReap.ts";
import { createProxyDispatcher } from "../../open-sse/utils/proxyDispatcher.ts";
import { proxyFetch } from "../../open-sse/utils/proxyFetch.ts";

async function withEnv(
  overrides: Record<string, string | undefined>,
  fn: () => Promise<void>
): Promise<void> {
  const previous = new Map<string, string | undefined>();
  for (const [key, value] of Object.entries(overrides)) {
    previous.set(key, process.env[key]);
    if (value === undefined) {
      delete process.env[key];
    } else {
      process.env[key] = value;
    }
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of previous.entries()) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }
  }
}

afterEach(() => {
  clearDispatcherCache();
  __resetDispatcherReapForTest();
});

describe("evictProxyDispatcher()", () => {
  it("removes and gracefully closes only the targeted proxy dispatchers without calling destroy()", () => {
    const targetUrl = "http://proxy-a.example.com:8080";
    const otherUrl = "http://proxy-b.example.com:8080";
    let targetClosed = 0;
    let targetRetryClosed = 0;
    let targetCodexClosed = 0;
    let targetDestroyed = 0;
    let otherClosed = 0;

    __cacheProxyDispatcherForTest(targetUrl, {
      close: () => {
        targetClosed += 1;
        return Promise.reject(new Error("async close error"));
      },
      destroy: () => {
        targetDestroyed += 1;
      },
    } as never);
    __cacheProxyDispatcherForTest(`retry:${targetUrl}`, {
      close: () => {
        targetRetryClosed += 1;
        return Promise.resolve();
      },
      destroy: () => {
        targetDestroyed += 1;
      },
    } as never);
    __cacheProxyDispatcherForTest(`codex-image:120000:${targetUrl}`, {
      close: () => {
        targetCodexClosed += 1;
        return Promise.resolve();
      },
      destroy: () => {
        targetDestroyed += 1;
      },
    } as never);
    __cacheProxyDispatcherForTest(otherUrl, {
      close: () => {
        otherClosed += 1;
        return Promise.resolve();
      },
    } as never);

    const evicted = evictProxyDispatcher(targetUrl);
    assert.equal(evicted, true);
    assert.equal(targetClosed, 1);
    assert.equal(targetRetryClosed, 1);
    assert.equal(targetCodexClosed, 1);
    assert.equal(targetDestroyed, 0, "must use close(), never destroy()");
    assert.equal(otherClosed, 0);
    assert.equal(getDispatcherCache().has(targetUrl), false);
    assert.equal(getDispatcherCache().has(`retry:${targetUrl}`), false);
    assert.equal(getDispatcherCache().has(`codex-image:120000:${targetUrl}`), false);
    assert.equal(getDispatcherCache().has(otherUrl), true);
    assert.equal(evictProxyDispatcher(targetUrl), false);
  });
});

describe("recordProxyDispatcherFailure() / recordProxyDispatcherSuccess()", () => {
  it("evicts after 3 consecutive failures within 60s and resets on success or window expiry", () => {
    const proxyUrl = "http://proxy-streak.example.com:8080";
    let closed = 0;
    __cacheProxyDispatcherForTest(proxyUrl, {
      close: () => {
        closed += 1;
        return Promise.resolve();
      },
    } as never);

    assert.equal(PROXY_DISPATCHER_EVICT_THRESHOLD, 3);
    assert.equal(PROXY_DISPATCHER_FAILURE_WINDOW_MS, 60_000);

    // 2 failures + 1 success -> streak resets, no eviction.
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 1_000), false);
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 2_000), false);
    recordProxyDispatcherSuccess(proxyUrl);
    assert.equal(closed, 0);
    assert.equal(getDispatcherCache().has(proxyUrl), true);

    // 2 failures, then > 60s gap -> counter resets to 1, no eviction on 3rd call.
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 10_000), false);
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 20_000), false);
    assert.equal(
      recordProxyDispatcherFailure(proxyUrl, 20_000 + PROXY_DISPATCHER_FAILURE_WINDOW_MS + 1),
      false
    );
    assert.equal(closed, 0);
    assert.equal(getDispatcherCache().has(proxyUrl), true);

    // 2 more failures within 60s reach threshold 3 -> evicts and closes.
    assert.equal(
      recordProxyDispatcherFailure(proxyUrl, 20_000 + PROXY_DISPATCHER_FAILURE_WINDOW_MS + 100),
      false
    );
    assert.equal(
      recordProxyDispatcherFailure(proxyUrl, 20_000 + PROXY_DISPATCHER_FAILURE_WINDOW_MS + 200),
      true
    );
    assert.equal(closed, 1);
    assert.equal(getDispatcherCache().has(proxyUrl), false);
  });

  it("uses a true 60s sliding window rather than pairwise gaps between failures", () => {
    const proxyUrl = "http://proxy-sliding.example.com:8080";
    let closed = 0;
    __cacheProxyDispatcherForTest(proxyUrl, {
      close: () => {
        closed += 1;
        return Promise.resolve();
      },
    } as never);

    // 1_000, 60_000, 119_000: pairwise gaps <= 60s, but only 2 failures in [59_000..119_000].
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 1_000), false);
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 60_000), false);
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 119_000), false);
    assert.equal(closed, 0);
    assert.equal(getDispatcherCache().has(proxyUrl), true);

    // 119_500 brings 3 failures inside [59_500..119_500] -> evicts.
    assert.equal(recordProxyDispatcherFailure(proxyUrl, 119_500), true);
    assert.equal(closed, 1);
    assert.equal(getDispatcherCache().has(proxyUrl), false);
  });

  it("prunes expired failure streaks by TTL and bounds map size to MAX_PROXY_FAILURE_STREAKS", () => {
    assert.equal(MAX_PROXY_FAILURE_STREAKS, 1024);

    for (let i = 0; i < 5; i += 1) {
      assert.equal(recordProxyDispatcherFailure(`http://stale-${i}.example.com:8080`, 1_000), false);
    }
    assert.equal(__proxyFailureStreakSizeForTest(), 5);

    // Advancing past the 60s window prunes all stale entries on the next failure.
    assert.equal(
      recordProxyDispatcherFailure(
        "http://fresh.example.com:8080",
        1_000 + PROXY_DISPATCHER_FAILURE_WINDOW_MS + 1
      ),
      false
    );
    assert.equal(__proxyFailureStreakSizeForTest(), 1);

    // Flooding > MAX_PROXY_FAILURE_STREAKS distinct proxies within the window stays bounded.
    const baseNow = 200_000;
    for (let i = 0; i < MAX_PROXY_FAILURE_STREAKS + 50; i += 1) {
      assert.equal(
        recordProxyDispatcherFailure(`http://flood-${i}.example.com:8080`, baseNow + i),
        false
      );
    }
    assert.equal(__proxyFailureStreakSizeForTest(), MAX_PROXY_FAILURE_STREAKS);
  });
});

describe("proxyFetch sendProxy per-proxy dispatcher eviction", () => {
  it("evicts and closes the proxy dispatcher after 3 consecutive HTTP 504 responses", async () => {
    const proxyUrl = "http://proxy-504.example.com:8080";
    const initialDispatcher = createProxyDispatcher(proxyUrl);
    let destroyCalls = 0;
    initialDispatcher.destroy = () => {
      destroyCalls += 1;
      return Promise.resolve();
    };

    const mockUndici = async (): Promise<Response> => new Response("gateway timeout", { status: 504 });

    await withEnv({ HTTPS_PROXY: proxyUrl, HTTP_PROXY: proxyUrl, NO_PROXY: undefined }, async () => {
      const r1 = await proxyFetch(
        "https://api.example.com/v1/chat/completions",
        { method: "POST" },
        { undiciFetch: mockUndici }
      );
      assert.equal(r1.status, 504);
      assert.equal(getDispatcherCache().get(proxyUrl), initialDispatcher);
      assert.equal(initialDispatcher.closed, false);

      const r2 = await proxyFetch(
        "https://api.example.com/v1/chat/completions",
        { method: "POST" },
        { undiciFetch: mockUndici }
      );
      assert.equal(r2.status, 504);
      assert.equal(getDispatcherCache().get(proxyUrl), initialDispatcher);
      assert.equal(initialDispatcher.closed, false);

      const r3 = await proxyFetch(
        "https://api.example.com/v1/chat/completions",
        { method: "POST" },
        { undiciFetch: mockUndici }
      );
      assert.equal(r3.status, 504);
      assert.equal(initialDispatcher.closed, true);
      assert.equal(destroyCalls, 0);
      assert.equal(getDispatcherCache().has(proxyUrl), false);

      const rebuilt = createProxyDispatcher(proxyUrl);
      assert.notEqual(rebuilt, initialDispatcher);
    });
  });

  it("resets the 504 failure streak when a 200 response succeeds", async () => {
    const proxyUrl = "http://proxy-recover.example.com:8080";
    const initialDispatcher = createProxyDispatcher(proxyUrl);
    let status = 504;
    const mockUndici = async (): Promise<Response> => new Response("resp", { status });

    await withEnv({ HTTPS_PROXY: proxyUrl, HTTP_PROXY: proxyUrl, NO_PROXY: undefined }, async () => {
      await proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici });
      await proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici });
      status = 200;
      const ok = await proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici });
      assert.equal(ok.status, 200);

      status = 504;
      await proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici });
      await proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici });
      assert.equal(
        getDispatcherCache().get(proxyUrl),
        initialDispatcher,
        "streak reset on 200 must prevent eviction after only 2 subsequent 504s"
      );
      assert.equal(initialDispatcher.closed, false);
    });
  });

  it("evicts and closes the proxy dispatcher after 3 consecutive transport errors, ignoring caller aborts", async () => {
    const proxyUrl = "http://proxy-err.example.com:8080";
    const initialDispatcher = createProxyDispatcher(proxyUrl);
    let destroyCalls = 0;
    initialDispatcher.destroy = () => {
      destroyCalls += 1;
      return Promise.resolve();
    };

    const makeConnRefused = () => {
      const err = new Error("connect ECONNREFUSED") as Error & { code?: string };
      err.code = "ECONNREFUSED";
      return err;
    };

    const mockUndici = async (): Promise<Response> => {
      throw makeConnRefused();
    };

    await withEnv({ HTTPS_PROXY: proxyUrl, HTTP_PROXY: proxyUrl, NO_PROXY: undefined }, async () => {
      // Caller-aborted request must not increment failure streak.
      const ac = new AbortController();
      ac.abort();
      await assert.rejects(() =>
        proxyFetch(
          "https://api.example.com/v1/models",
          { signal: ac.signal },
          { undiciFetch: mockUndici }
        )
      );
      assert.equal(initialDispatcher.closed, false);

      for (let i = 0; i < 2; i += 1) {
        await assert.rejects(() =>
          proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici })
        );
        assert.equal(getDispatcherCache().get(proxyUrl), initialDispatcher);
        assert.equal(initialDispatcher.closed, false);
      }

      await assert.rejects(() =>
        proxyFetch("https://api.example.com/v1/models", {}, { undiciFetch: mockUndici })
      );
      assert.equal(initialDispatcher.closed, true);
      assert.equal(destroyCalls, 0);
      assert.equal(getDispatcherCache().has(proxyUrl), false);
    });
  });
});
