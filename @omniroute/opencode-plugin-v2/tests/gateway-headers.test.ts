import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildProviderPayload,
  collectCatalog,
  defaultOmniRouteUsageFetcher,
} from "../src/catalog.js";
import { parsePluginOptions, toResolvedOptions } from "../src/options.js";

const baseOpts = {
  providerId: "omniroute",
  baseURL: "https://gw.example.com",
  apiKey: "k",
  timeoutMs: 1000,
  modelCacheTtlMs: 300000,
  usableOnly: false,
};

const CF = { "CF-Access-Client-Id": "id", "CF-Access-Client-Secret": "secret" };

async function publish(headers?: Record<string, string>) {
  const opts = headers ? { ...baseOpts, headers } : baseOpts;
  const collected = await collectCatalog(opts, {
    fetcher: async () => [{ id: "af/chat-latest", capabilities: { effort_tiers: ["low"] } }],
    combosFetcher: async () => [],
  });
  const payload = buildProviderPayload(collected, opts);
  return {
    info: payload.info as unknown as Record<string, any>,
    model: payload.models[0] as unknown as Record<string, any>,
  };
}

describe("headers option schema", () => {
  it("accepts a string map and threads it into the resolved options", () => {
    const parsed = parsePluginOptions({ baseURL: "https://gw.example.com", headers: CF });
    assert.deepEqual(toResolvedOptions(parsed).headers, CF);
  });

  it("rejects non-string header values", () => {
    assert.throws(() =>
      parsePluginOptions({ baseURL: "https://gw.example.com", headers: { "X-Num": 1 } })
    );
  });
});

describe("usage fetcher carries the headers option", () => {
  it("sends the extra headers and keeps the management bearer authoritative", async () => {
    const original = globalThis.fetch;
    let captured: RequestInit["headers"] | undefined;
    globalThis.fetch = (async (_input: unknown, init?: RequestInit) => {
      captured = init?.headers;
      return new Response(JSON.stringify({ byModel: [{ model: "a/b" }] }), { status: 200 });
    }) as unknown as typeof fetch;
    try {
      const ids = await defaultOmniRouteUsageFetcher(
        "https://gw.example.com/v1",
        "mgmt",
        1_000,
        undefined,
        { ...CF, authorization: "Bearer user" }
      );
      assert.deepEqual(ids, ["a/b"]);
    } finally {
      globalThis.fetch = original;
    }
    const sent = new Headers(captured);
    assert.equal(sent.get("cf-access-client-id"), "id");
    assert.equal(sent.get("authorization"), "Bearer mgmt");
  });
});

describe("published payload carries the headers option for inference", () => {
  it("publishes the headers on the provider, each model and each variant", async () => {
    const { info, model } = await publish({ ...CF, Authorization: "Bearer user" });
    assert.deepEqual(info.headers, CF);
    assert.deepEqual(model.headers, CF);
    for (const variant of model.variants as Array<{ headers: unknown }>) {
      assert.deepEqual(variant.headers, CF);
    }
  });

  it("never publishes an authorization entry, whatever the casing", async () => {
    const { info, model } = await publish({ authorization: "Bearer user", "X-Extra": "1" });
    assert.deepEqual(info.headers, { "X-Extra": "1" });
    assert.deepEqual(model.headers, { "X-Extra": "1" });
  });

  it("leaves the payload unchanged without the option", async () => {
    const { info, model } = await publish();
    assert.equal("headers" in info, false);
    assert.deepEqual(model.headers, {});
    for (const variant of model.variants as Array<{ headers: unknown }>) {
      assert.deepEqual(variant.headers, {});
    }
  });
});
