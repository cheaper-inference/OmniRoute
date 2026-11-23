import { test, describe } from "node:test";
import assert from "node:assert/strict";

// Regression guard for the "providers/quota dashboard stuck on its skeleton
// forever" bug. The page gates `loading` on awaiting every first-paint request;
// a bare `fetch()` that never *settles* (browser connection-pool starvation
// under the RSC prefetch storm, or a stalled connection) left `loading` true
// forever. loadProviderPageData bounds each request with an AbortSignal timeout
// so the loader ALWAYS resolves (degrading to defaults) and the page paints.
const { loadProviderPageData, loadOpenRouterProviderStats } =
  await import("@/app/(dashboard)/dashboard/providers/providerPageUtils");

// A fetch mock that honors AbortSignal the way the real fetch does: it never
// resolves on its own, but rejects with an AbortError once the signal fires.
function hangingFetch(): typeof fetch {
  return ((_url: string | URL, init?: RequestInit) =>
    new Promise<Response>((_resolve, reject) => {
      const signal = init?.signal;
      if (signal) {
        if (signal.aborted) {
          reject(new DOMException("Aborted", "AbortError"));
          return;
        }
        signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), {
          once: true,
        });
      }
    })) as unknown as typeof fetch;
}

function jsonFetch(map: Record<string, unknown>): typeof fetch {
  return ((url: string | URL) => {
    const body = map[String(url)] ?? {};
    return Promise.resolve(
      new Response(JSON.stringify(body), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    );
  }) as unknown as typeof fetch;
}

describe("loadProviderPageData — never freezes the dashboard skeleton", () => {
  test("a never-settling fetch is aborted by the timeout and the loader still resolves", async () => {
    const start = Date.now();
    const data = await loadProviderPageData(hangingFetch(), 50);
    const elapsed = Date.now() - start;

    // The core guarantee: bounded, not infinite.
    assert.ok(elapsed < 3000, `loader should resolve promptly, took ${elapsed}ms`);
    assert.deepEqual(data.connections, []);
    assert.deepEqual(data.providerNodes, []);
    assert.equal(data.ccCompatibleProviderEnabled, false);
    assert.equal(data.expirations, null);
    assert.equal(data.blockedProviders, null);
    assert.equal(data.settings, null);
  });

  test("returns parsed data when every endpoint resolves", async () => {
    const data = await loadProviderPageData(
      jsonFetch({
        "/api/providers": { connections: [{ id: "c1" }] },
        "/api/provider-nodes": { nodes: [{ id: "n1" }], ccCompatibleProviderEnabled: true },
        "/api/providers/expiration": { openai: "2030-01-01" },
        "/api/settings": { blockedProviders: ["openai"] },
      }),
      1000
    );

    assert.deepEqual(data.connections, [{ id: "c1" }]);
    assert.deepEqual(data.providerNodes, [{ id: "n1" }]);
    assert.equal(data.ccCompatibleProviderEnabled, true);
    assert.deepEqual(data.expirations, { openai: "2030-01-01" });
    assert.deepEqual(data.blockedProviders, ["openai"]);
  });

  test("a rejecting fetch degrades to defaults instead of throwing", async () => {
    const rejectFetch = (() =>
      Promise.reject(new Error("network down"))) as unknown as typeof fetch;
    const data = await loadProviderPageData(rejectFetch, 1000);
    assert.deepEqual(data.connections, []);
    assert.equal(data.settings, null);
  });
});

// KEA-9368 (slow first-load skeleton on Providers): /api/providers/openrouter-stats
// answers from a 24h disk cache, but on a cold or unwritable cache the route calls
// three openrouter.ai endpoints (15s timeout each) before it responds. It only feeds
// the popularity chip on each card, so it must not be part of the first-paint gate.
describe("loadProviderPageData — first paint does not wait for OpenRouter enrichment", () => {
  const STATS_URL = "/api/providers/openrouter-stats";

  test("resolves while the stats request is still pending, then hands the stats over", async () => {
    const entries = [{ slug: "openai", displayName: "OpenAI", popularityRank: 1 }];
    const answers = jsonFetch({
      "/api/providers": { connections: [{ id: "c1" }] },
      [STATS_URL]: { data: entries },
    });
    let releaseStats!: () => void;
    const statsGate = new Promise<void>((resolve) => (releaseStats = resolve));
    // The stats answer only once released (or reject when the loader's timeout aborts them).
    const fetchImpl = (async (url: string | URL, init?: RequestInit) => {
      if (String(url) === STATS_URL) {
        await Promise.race([
          statsGate,
          new Promise((_resolve, reject) =>
            init?.signal?.addEventListener(
              "abort",
              () => reject(new DOMException("Aborted", "AbortError")),
              { once: true }
            )
          ),
        ]);
      }
      return answers(url, init);
    }) as unknown as typeof fetch;

    // Waiting for the stats here would take the full 5000ms timeout (and lose them).
    const start = Date.now();
    const data = await loadProviderPageData(fetchImpl, 5000);
    const elapsed = Date.now() - start;
    assert.deepEqual(data.connections, [{ id: "c1" }]);
    assert.ok(elapsed < 4000, `first paint waited ${elapsed}ms for a non-essential request`);

    let settled = false;
    void data.openRouterProviderStats.then(() => (settled = true));
    await new Promise((resolve) => setImmediate(resolve));
    assert.equal(settled, false, "the stats were awaited before the first paint");

    releaseStats();
    assert.deepEqual(await data.openRouterProviderStats, entries);
  });

  test("the pending stats degrade to an empty list when the request never settles", async () => {
    const data = await loadProviderPageData(hangingFetch(), 50);
    assert.deepEqual(await data.openRouterProviderStats, []);
  });

  test("loadOpenRouterProviderStats returns the entries the route lists", async () => {
    const entries = [{ slug: "openai", displayName: "OpenAI", popularityRank: 1 }];
    const data = await loadOpenRouterProviderStats(jsonFetch({ [STATS_URL]: { data: entries } }));
    assert.deepEqual(data, entries);
  });

  test("loadOpenRouterProviderStats degrades to an empty list, never throws or hangs", async () => {
    assert.deepEqual(await loadOpenRouterProviderStats(hangingFetch(), 50), []);
    const rejectFetch = (() =>
      Promise.reject(new Error("network down"))) as unknown as typeof fetch;
    assert.deepEqual(await loadOpenRouterProviderStats(rejectFetch, 1000), []);
    assert.deepEqual(await loadOpenRouterProviderStats(jsonFetch({ [STATS_URL]: {} }), 1000), []);
  });
});
