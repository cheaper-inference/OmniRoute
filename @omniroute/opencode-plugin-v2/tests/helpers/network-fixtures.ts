import assert from "node:assert/strict";
import type { OmniRouteEnrichmentFetcher } from "../../src/shared/enrich.js";

/** Keep catalog mapping tests independent of the optional management transports. */
export async function withEmptyEnrichment<T>(
  action: (enrichmentFetcher: OmniRouteEnrichmentFetcher) => Promise<T>
): Promise<T> {
  let calls = 0;
  const enrichmentFetcher: OmniRouteEnrichmentFetcher = async () => {
    calls += 1;
    return new Map();
  };
  const result = await action(enrichmentFetcher);
  assert.equal(calls, 1, "the catalog must use the injected enrichment fixture exactly once");
  return result;
}

/** These hook/logger cases exercise setup, so answer its five default bootstrap routes. */
export async function withBootstrapNetwork(setup: () => Promise<() => void>): Promise<void> {
  const responses: Record<string, unknown> = {
    "/v1/models": { data: [] },
    "/api/combos": { combos: [] },
    "/api/pricing/models": { providers: {} },
    "/api/pricing": {},
    "/api/free-tier/summary": { perModel: [] },
  };
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  let escapeAttempts = 0;
  let cleanup: (() => void) | undefined;
  globalThis.fetch = async (input, init) => {
    const url = new URL(input instanceof Request ? input.url : String(input));
    const method = init?.method ?? (input instanceof Request ? input.method : "GET");
    if (
      url.origin !== "https://gw.example.com" ||
      url.search ||
      method !== "GET" ||
      !Object.hasOwn(responses, url.pathname)
    ) {
      escapeAttempts += 1;
      throw new Error("unexpected transport in the bootstrap fixture");
    }
    calls.push(url.pathname);
    return new Response(JSON.stringify(responses[url.pathname]), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
  try {
    cleanup = await setup();
    assert.equal(typeof cleanup, "function", "setup must return its owned refresh-loop cleanup");
    // Every fixture response is immediate. One event-loop turn drains the finite optional
    // Promise chain before restoring fetch; it is not a sleep or an extended test timeout.
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(escapeAttempts, 0, "bootstrap must never fall through to an external transport");
    assert.deepEqual(
      calls.slice().sort(),
      Object.keys(responses).sort(),
      "bootstrap must request each mocked endpoint exactly once"
    );
  } finally {
    try {
      if (typeof cleanup === "function") cleanup();
    } finally {
      globalThis.fetch = originalFetch;
    }
  }
}
