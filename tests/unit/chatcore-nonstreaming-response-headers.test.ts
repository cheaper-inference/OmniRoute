// Characterization of buildNonStreamingResponseHeaders — the cache-MISS response header builder
// extracted from handleChatCore's non-streaming success path (chatCore god-file decomposition,
// #3501). attachOmniRouteMetaHeaders + now are injected so the static headers, the meta payload,
// and the optional compression header are observable. Locks: Content-Type + cache MISS, latencyMs =
// now - startTime, and the compression header only when meta is present.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildNonStreamingResponseHeaders } =
  await import("../../open-sse/handlers/chatCore/nonStreamingResponseHeaders.ts");

function makeDeps(now = 1000) {
  const metaCalls: Array<{ headers: Record<string, string>; meta: Record<string, unknown> }> = [];
  const deps = {
    attachOmniRouteMetaHeaders: (
      headers: Record<string, string>,
      meta: Record<string, unknown>
    ) => {
      metaCalls.push({ headers, meta });
      headers["x-omniroute-meta"] = "attached";
    },
    now: () => now,
  } as Parameters<typeof buildNonStreamingResponseHeaders>[1];
  return { deps, metaCalls };
}

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    model: "gpt-x",
    startTime: 600,
    responseUsage: { prompt_tokens: 5 },
    estimatedCost: 0.0012,
    requestId: "req-1",
    compressionResponseMeta: undefined,
    ...overrides,
  } as Parameters<typeof buildNonStreamingResponseHeaders>[0];
}

function acceptsAttachMetaInputContract(args: {
  responseUsage: Record<string, unknown> | null | undefined;
  requestId: string | null | undefined;
}) {
  return args;
}

test("builder input types match the metadata attachment contract", () => {
  acceptsAttachMetaInputContract(baseArgs());
});

test("static headers: Content-Type json + cache MISS", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(baseArgs(), deps);
  assert.equal(h["Content-Type"], "application/json");
  // cache marker key/value
  assert.ok(Object.values(h).includes("MISS"));
});

test("meta receives provider/model/cacheHit false/latency/usage/cost/requestId", () => {
  const { deps, metaCalls } = makeDeps(1000);
  buildNonStreamingResponseHeaders(baseArgs({ startTime: 600 }), deps);
  assert.equal(metaCalls.length, 1);
  const meta = metaCalls[0].meta;
  assert.equal(meta.provider, "openai");
  assert.equal(meta.model, "gpt-x");
  assert.equal(meta.cacheHit, false);
  assert.equal(meta.latencyMs, 400); // now 1000 - startTime 600
  assert.deepEqual(meta.usage, { prompt_tokens: 5 });
  assert.equal(meta.costUsd, 0.0012);
  assert.equal(meta.requestId, "req-1");
});

test("no compression meta → no compression header", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({ compressionResponseMeta: undefined }),
    deps
  );
  assert.ok(!Object.values(h).includes("engine:x"));
});

test("compression meta present → compression header set to that value", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({ compressionResponseMeta: "engine:x; source=header" }),
    deps
  );
  assert.ok(Object.values(h).includes("engine:x; source=header"));
});

test("forwards fallbackAttempts into the non-streaming meta payload", () => {
  const { deps, metaCalls } = makeDeps();
  buildNonStreamingResponseHeaders(baseArgs({ fallbackAttempts: 3 }), deps);
  assert.equal(metaCalls.length, 1);
  assert.equal(metaCalls[0].meta.fallbackAttempts, 3);
});

test("omitted fallbackAttempts does not invent a count", () => {
  const { deps, metaCalls } = makeDeps();
  buildNonStreamingResponseHeaders(baseArgs(), deps);
  assert.equal("fallbackAttempts" in metaCalls[0].meta, false);
});

// #20345: a Claude-format client gets the upstream Anthropic account headers under the same
// per-key policy the streaming path applies; every other client format gets none.
const UPSTREAM = {
  "content-type": "application/json; charset=utf-8",
  "anthropic-ratelimit-requests-limit": "50",
  "anthropic-ratelimit-unified-5h-utilization": "0.4",
  "anthropic-organization-id": "org-1",
  "x-upstream-other": "skip",
  "retry-after": "12",
};

test("claude source format copies only the Anthropic account headers", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({ provider: "claude", sourceFormat: "claude", providerHeaders: UPSTREAM }),
    deps
  );
  assert.equal(h["anthropic-ratelimit-requests-limit"], "50");
  assert.equal(h["anthropic-ratelimit-unified-5h-utilization"], "0.4");
  assert.equal(h["anthropic-organization-id"], "org-1");
  assert.equal(h["x-upstream-other"], undefined);
  assert.equal(h["retry-after"], undefined);
  assert.equal(h["content-type"], undefined);
  assert.equal(h["Content-Type"], "application/json");
});

test("claude source format honours a `strip` key", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({
      provider: "claude",
      sourceFormat: "claude",
      providerHeaders: UPSTREAM,
      apiKeyInfo: { anthropicRateLimitHeaders: "strip" },
    }),
    deps
  );
  assert.equal(h["anthropic-ratelimit-requests-limit"], undefined);
  assert.equal(h["anthropic-organization-id"], undefined);
});

test("claude source format honours an `auto` key that is not pinned to one connection", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({
      provider: "claude",
      sourceFormat: "claude",
      providerHeaders: UPSTREAM,
      apiKeyInfo: {
        anthropicRateLimitHeaders: "auto",
        scopes: ["self:account-quota"],
        allowedConnections: ["a", "b"],
      },
    }),
    deps
  );
  assert.equal(h["anthropic-ratelimit-requests-limit"], undefined);
});

test("non-claude source formats never get upstream Anthropic account headers", () => {
  for (const sourceFormat of ["openai", "openai-responses", "gemini", undefined]) {
    const { deps } = makeDeps();
    const h = buildNonStreamingResponseHeaders(
      baseArgs({ provider: "claude", sourceFormat, providerHeaders: UPSTREAM }),
      deps
    );
    assert.equal(h["anthropic-ratelimit-requests-limit"], undefined, String(sourceFormat));
    assert.equal(h["anthropic-organization-id"], undefined, String(sourceFormat));
  }
});
