import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildAuthHeaders } from "../src/shared/auth-headers.js";
import { defaultOmniRouteModelsFetcher } from "../src/shared/models-map.js";

describe("buildAuthHeaders", () => {
  it("replaces a caller-supplied authorization header regardless of casing", () => {
    const headers = buildAuthHeaders(
      {
        authorization: "Basic user",
        AUTHORIZATION: "Basic other",
        "CF-Access-Client-Id": "id",
      },
      "gateway-key"
    );
    assert.equal(headers.get("Authorization"), "Bearer gateway-key");
    assert.equal(headers.get("cf-access-client-id"), "id");
    assert.deepEqual(
      [...headers.keys()].filter((name) => name === "authorization"),
      ["authorization"]
    );
  });

  it("preserves caller headers and their Accept override", () => {
    const headers = buildAuthHeaders({ Accept: "text/plain", "CF-Access-Client-Secret": "s" }, "k");
    assert.equal(headers.get("accept"), "text/plain");
    assert.equal(headers.get("cf-access-client-secret"), "s");
  });
});

describe("fetchers send a single bearer authorization", () => {
  it("models fetcher replaces a lowercase authorization header", async () => {
    const original = globalThis.fetch;
    let captured: RequestInit["headers"] | undefined;
    globalThis.fetch = (async (_input: unknown, init?: RequestInit) => {
      captured = init?.headers;
      return new Response(JSON.stringify({ object: "list", data: [] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as unknown as typeof fetch;
    try {
      await defaultOmniRouteModelsFetcher("https://gw.example.com", "gateway-key", 1_000, {
        authorization: "Basic user",
      });
    } finally {
      globalThis.fetch = original;
    }
    const headers = new Headers(captured);
    assert.equal(headers.get("authorization"), "Bearer gateway-key");
  });
});
