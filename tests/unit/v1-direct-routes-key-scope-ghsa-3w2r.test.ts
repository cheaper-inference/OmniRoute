/**
 * GHSA-3w2r-vvhm-8h85 (direct /v1 routes variant) — every direct /v1 route
 * that picks a provider connection must stay inside the caller API key's
 * connection scope, exactly like chat dispatch does.
 *
 * Chat bounds credential selection by the key's `allowedConnections` (and its
 * quota-pool scope). The media / embedding / retrieval routes below resolved
 * credentials from the provider's whole pool instead, so a key restricted to
 * connection A was served by any connection of the provider (and a key whose
 * scope covers none of them was served anyway).
 *
 * Each case seeds two connections of the route's provider — B first, so an
 * unscoped selection picks it — then calls the route with:
 *   - a key restricted to A        → only A's secret may reach upstream;
 *   - a key restricted elsewhere   → nothing reaches upstream, non-200, no stack;
 *   - an unrestricted key          → still reaches upstream (behavior kept).
 *
 * Upstream is a fetch stub that answers 400 to every call, so no handler polls
 * or retries; the assertion is on which connection secret left the process.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-v1-routes-ghsa-3w2r-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "ghsa-3w2r-v1-routes-test-secret";
useDecollidedMigrationsDir();

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const { selectProvider } = await import("../../open-sse/config/searchRegistry.ts");

const translationsRoute = await import("../../src/app/api/v1/audio/translations/route.ts");
const speechRoute = await import("../../src/app/api/v1/audio/speech/route.ts");
const imagesRoute = await import("../../src/app/api/v1/images/generations/route.ts");
const videosRoute = await import("../../src/app/api/v1/videos/generations/route.ts");
const embeddingsRoute = await import("../../src/app/api/v1/embeddings/route.ts");
const rerankRoute = await import("../../src/app/api/v1/rerank/route.ts");
const segmentRoute = await import("../../src/app/api/v1/segment/route.ts");
const classifyRoute = await import("../../src/app/api/v1/classify/route.ts");
const alphaSearchRoute = await import("../../src/app/api/v1/alpha/search/route.ts");
const searchRoute = await import("../../src/app/api/v1/search/route.ts");
const moderationsRoute = await import("../../src/app/api/v1/moderations/route.ts");
const ocrRoute = await import("../../src/app/api/v1/ocr/route.ts");
const musicRoute = await import("../../src/app/api/v1/music/generations/route.ts");
const providerEmbeddingsRoute =
  await import("../../src/app/api/v1/providers/[provider]/embeddings/route.ts");
const providerImagesRoute =
  await import("../../src/app/api/v1/providers/[provider]/images/generations/route.ts");
const webFetchRoute = await import("../../src/app/api/v1/web/fetch/route.ts");
const webMapRoute = await import("../../src/app/api/v1/web/map/route.ts");
const voicesRoute = await import("../../src/app/api/v1/voices/route.ts");
const providerVoicesRoute =
  await import("../../src/app/api/v1/providers/[provider]/voices/route.ts");

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── fixtures ────────────────────────────────────────────────────────────────

const DEAD_CONNECTION = "00000000-0000-4000-8000-00000000dead";

type SeededPair = { aId: string; aSecret: string; bSecret: string };
const seededPairs = new Map<string, SeededPair>();
/** Every connection secret seeded in this file — any of them leaving is observable. */
const allSecrets: string[] = [];

async function seedPair(provider: string): Promise<SeededPair> {
  const existing = seededPairs.get(provider);
  if (existing) return existing;
  const slug = provider.replace(/[^a-z0-9]/gi, "");
  const bSecret = `sk-ghsa3w2r-${slug}-connection-B-secret`;
  const aSecret = `sk-ghsa3w2r-${slug}-connection-A-secret`;
  const create = (name: string, apiKey: string) =>
    providersDb.createProviderConnection({
      provider,
      authType: "apikey",
      name,
      apiKey,
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
  // B is created first, so it wins an unrestricted pool selection.
  await create(`${slug}-conn-B`, bSecret);
  const connA = await create(`${slug}-conn-A`, aSecret);
  const pair = { aId: connA.id as string, aSecret, bSecret };
  seededPairs.set(provider, pair);
  allSecrets.push(aSecret, bSecret);
  return pair;
}

let keyCounter = 0;
async function makeKey(
  options: {
    allowedConnections?: string[];
    blockedModels?: string[];
    allowedQuotas?: string[];
  } = {}
): Promise<string> {
  keyCounter += 1;
  const key = await apiKeysDb.createApiKey(
    `ghsa-3w2r-v1-key-${keyCounter}`,
    "machine-ghsa-3w2r-v1",
    [],
    { allowedConnections: options.allowedConnections }
  );
  if (options.blockedModels || options.allowedQuotas) {
    await apiKeysDb.updateApiKeyPermissions(key.id, {
      ...(options.blockedModels ? { blockedModels: options.blockedModels } : {}),
      ...(options.allowedQuotas ? { allowedQuotas: options.allowedQuotas } : {}),
    });
  }
  return key.key as string;
}

/** Records every outbound call and answers 400 so no handler polls or retries. */
function stubUpstream(
  reply: () => Response = () =>
    new Response(JSON.stringify({ error: { message: "stubbed upstream" } }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    })
) {
  const originalFetch = globalThis.fetch;
  const calls: string[] = [];
  globalThis.fetch = (async (input: RequestInfo | URL, init: RequestInit = {}) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const headers: Record<string, string> = {};
    new Headers(init.headers).forEach((value, name) => {
      headers[name] = value;
    });
    const body = typeof init.body === "string" ? init.body : "";
    calls.push(`${url} ${JSON.stringify(headers)} ${body}`);
    return reply();
  }) as typeof fetch;
  return {
    calls,
    secretsSeen: () => allSecrets.filter((secret) => calls.some((call) => call.includes(secret))),
    restore: () => {
      globalThis.fetch = originalFetch;
    },
  };
}

function jsonRequest(url: string, bearer: string, body: unknown, method = "POST") {
  return new Request(`http://localhost${url}`, {
    method,
    headers: { Authorization: `Bearer ${bearer}`, "Content-Type": "application/json" },
    body: method === "GET" ? undefined : JSON.stringify(body),
  });
}

function wavBlob(): Blob {
  const dataLen = 320;
  const b = Buffer.alloc(44 + dataLen);
  b.write("RIFF", 0, "ascii");
  b.writeUInt32LE(36 + dataLen, 4);
  b.write("WAVE", 8, "ascii");
  b.write("fmt ", 12, "ascii");
  b.writeUInt32LE(16, 16);
  b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22);
  b.writeUInt32LE(16000, 24);
  b.writeUInt32LE(32000, 28);
  b.writeUInt16LE(2, 32);
  b.writeUInt16LE(16, 34);
  b.write("data", 36, "ascii");
  b.writeUInt32LE(dataLen, 40);
  return new Blob([b], { type: "audio/wav" });
}

const params = (provider: string) => ({ params: Promise.resolve({ provider }) });
const noContext = {} as never;

type RouteCase = {
  name: string;
  /** Provider whose connections the route selects. */
  provider: string | (() => string);
  call: (bearer: string) => Promise<Response>;
};

const ROUTE_CASES: RouteCase[] = [
  {
    name: "POST /v1/audio/translations",
    provider: "openai",
    call: (bearer) => {
      const fd = new FormData();
      fd.set("model", "openai/whisper-1");
      fd.set("file", wavBlob(), "clip.wav");
      return translationsRoute.POST(
        new Request("http://localhost/v1/audio/translations", {
          method: "POST",
          headers: { Authorization: `Bearer ${bearer}` },
          body: fd,
        })
      );
    },
  },
  {
    name: "POST /v1/audio/speech",
    provider: "openai",
    call: (bearer) =>
      speechRoute.POST(
        jsonRequest("/v1/audio/speech", bearer, {
          model: "openai/tts-1",
          input: "hello",
          voice: "alloy",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/images/generations",
    provider: "openai",
    call: (bearer) =>
      imagesRoute.POST(
        jsonRequest("/v1/images/generations", bearer, {
          model: "openai/dall-e-3",
          prompt: "a lighthouse",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/videos/generations",
    provider: "fal-ai",
    call: (bearer) =>
      videosRoute.POST(
        jsonRequest("/v1/videos/generations", bearer, {
          model: "fal-ai/veo3.1/lite",
          prompt: "a lighthouse at dusk",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/embeddings",
    provider: "openai",
    call: (bearer) =>
      embeddingsRoute.POST(
        jsonRequest("/v1/embeddings", bearer, {
          model: "openai/text-embedding-3-small",
          input: "hello",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/rerank",
    provider: "cohere",
    call: (bearer) =>
      rerankRoute.POST(
        jsonRequest("/v1/rerank", bearer, {
          model: "cohere/rerank-v3.5",
          query: "lighthouse",
          documents: ["a lighthouse", "a tree"],
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/segment",
    provider: "jina-ai",
    call: (bearer) =>
      segmentRoute.POST(jsonRequest("/v1/segment", bearer, { content: "one. two." }), noContext),
  },
  {
    name: "POST /v1/classify",
    provider: "jina-ai",
    call: (bearer) =>
      classifyRoute.POST(
        jsonRequest("/v1/classify", bearer, { input: ["hello"], labels: ["greeting", "other"] }),
        noContext
      ),
  },
  {
    name: "POST /v1/alpha/search",
    provider: () => selectProvider(undefined, "web")!.id,
    call: (bearer) =>
      alphaSearchRoute.POST(
        jsonRequest("/v1/alpha/search", bearer, {
          commands: { search_query: [{ q: "lighthouse" }] },
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/search",
    provider: () => selectProvider(undefined, "web")!.id,
    call: (bearer) =>
      searchRoute.POST(jsonRequest("/v1/search", bearer, { query: "lighthouse" }), noContext),
  },
  {
    name: "POST /v1/moderations",
    provider: "openai",
    call: (bearer) =>
      moderationsRoute.POST(jsonRequest("/v1/moderations", bearer, { input: "hello" }), noContext),
  },
  {
    name: "POST /v1/ocr",
    provider: "mistral",
    call: (bearer) =>
      ocrRoute.POST(
        jsonRequest("/v1/ocr", bearer, {
          model: "mistral/mistral-ocr-latest",
          document: { type: "document_url", document_url: "https://example.com/a.pdf" },
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/music/generations",
    provider: "minimax",
    call: (bearer) =>
      musicRoute.POST(
        jsonRequest("/v1/music/generations", bearer, {
          model: "minimax/music-2.6",
          prompt: "calm piano",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/providers/{provider}/embeddings",
    provider: "openai",
    call: (bearer) =>
      providerEmbeddingsRoute.POST(
        jsonRequest("/v1/providers/openai/embeddings", bearer, {
          model: "text-embedding-3-small",
          input: "hello",
        }),
        params("openai")
      ),
  },
  {
    name: "POST /v1/providers/{provider}/images/generations",
    provider: "openai",
    call: (bearer) =>
      providerImagesRoute.POST(
        jsonRequest("/v1/providers/openai/images/generations", bearer, {
          model: "openai/dall-e-3",
          prompt: "a lighthouse",
        }),
        params("openai")
      ),
  },
  {
    name: "POST /v1/web/fetch",
    provider: "firecrawl",
    call: (bearer) =>
      webFetchRoute.POST(
        jsonRequest("/v1/web/fetch", bearer, {
          url: "https://example.com/",
          provider: "firecrawl",
        })
      ),
  },
  {
    name: "POST /v1/web/map",
    provider: "firecrawl",
    call: (bearer) =>
      webMapRoute.POST(jsonRequest("/v1/web/map", bearer, { url: "https://example.com/" })),
  },
  {
    name: "GET /v1/voices (ElevenLabs proxy)",
    provider: "elevenlabs",
    call: (bearer) => voicesRoute.GET(jsonRequest("/v1/voices", bearer, null, "GET")),
  },
  {
    name: "GET /v1/providers/fishaudio/voices (Fish Audio proxy)",
    provider: "fishaudio",
    call: (bearer) =>
      providerVoicesRoute.GET(
        jsonRequest("/v1/providers/fishaudio/voices", bearer, null, "GET"),
        params("fishaudio")
      ),
  },
];

function providerOf(routeCase: RouteCase): string {
  return typeof routeCase.provider === "function" ? routeCase.provider() : routeCase.provider;
}

for (const routeCase of ROUTE_CASES) {
  test(`GHSA-3w2r ${routeCase.name}: a connection-scoped key only reaches its connection`, async () => {
    const pair = await seedPair(providerOf(routeCase));
    const scopedKey = await makeKey({ allowedConnections: [pair.aId] });

    const upstream = stubUpstream();
    try {
      for (let i = 0; i < 2; i++) {
        const response = await routeCase.call(scopedKey);
        await response.text();
      }
      assert.deepEqual(
        upstream.secretsSeen(),
        [pair.aSecret],
        `${routeCase.name} must only use the key's allowed connection`
      );
    } finally {
      upstream.restore();
    }
  });

  test(`GHSA-3w2r ${routeCase.name}: a key scoped to other connections reaches none`, async () => {
    await seedPair(providerOf(routeCase));
    const disjointKey = await makeKey({ allowedConnections: [DEAD_CONNECTION] });

    const upstream = stubUpstream();
    try {
      const response = await routeCase.call(disjointKey);
      assert.notEqual(response.status, 200, "no allowed connection → no success");
      const body = await response.text();
      assert.ok(!body.includes("at /"), "no stack trace leaks");
      assert.deepEqual(upstream.secretsSeen(), [], "no connection outside the key's scope is used");
      // Nor a keyless third party (e.g. the DuckDuckGo search fallback): the
      // request must not leave the process at all.
      assert.deepEqual(upstream.calls, [], "nothing reaches any upstream");
    } finally {
      upstream.restore();
    }
  });

  test(`GHSA-3w2r ${routeCase.name}: an unrestricted key keeps today's selection`, async () => {
    const pair = await seedPair(providerOf(routeCase));
    const openKey = await makeKey();

    const upstream = stubUpstream();
    try {
      const response = await routeCase.call(openKey);
      await response.text();
      const seen = upstream.secretsSeen();
      assert.ok(
        seen.includes(pair.aSecret) || seen.includes(pair.bSecret),
        `${routeCase.name} still reaches the provider for an unrestricted key`
      );
    } finally {
      upstream.restore();
    }
  });
}

// ── combo fan-out ───────────────────────────────────────────────────────────

test("GHSA-3w2r combos: embedding / speech / rerank combo targets stay inside the key's scope", async () => {
  const openai = await seedPair("openai");
  const cohere = await seedPair("cohere");
  await combosDb.createCombo({
    name: "ghsa3w2r-embed-combo",
    strategy: "priority",
    models: ["openai/text-embedding-3-small"],
  });
  await combosDb.createCombo({
    name: "ghsa3w2r-speech-combo",
    strategy: "priority",
    models: ["openai/tts-1"],
  });
  await combosDb.createCombo({
    name: "ghsa3w2r-rerank-combo",
    strategy: "priority",
    models: ["cohere/rerank-v3.5"],
  });
  const scopedKey = await makeKey({ allowedConnections: [openai.aId, cohere.aId] });

  const upstream = stubUpstream();
  try {
    await (
      await embeddingsRoute.POST(
        jsonRequest("/v1/embeddings", scopedKey, { model: "ghsa3w2r-embed-combo", input: "x" }),
        noContext
      )
    ).text();
    await (
      await speechRoute.POST(
        jsonRequest("/v1/audio/speech", scopedKey, {
          model: "ghsa3w2r-speech-combo",
          input: "x",
          voice: "alloy",
        }),
        noContext
      )
    ).text();
    await (
      await rerankRoute.POST(
        jsonRequest("/v1/rerank", scopedKey, {
          model: "ghsa3w2r-rerank-combo",
          query: "x",
          documents: ["a", "b"],
        }),
        noContext
      )
    ).text();
    assert.deepEqual(upstream.secretsSeen().sort(), [openai.aSecret, cohere.aSecret].sort());
  } finally {
    upstream.restore();
  }
});

test("GHSA-3w2r combos: the per-target model gate follows chat's combo policy", async () => {
  const { createComboTargetKeyGate } = await import("../../src/sse/services/keyConnectionScope.ts");
  const target = "openai/text-embedding-3-small";

  // Unrestricted key (or keyless caller): no gate — combo fan-out unchanged.
  assert.equal(createComboTargetKeyGate(null, "my-combo"), undefined);
  assert.equal(
    createComboTargetKeyGate({ apiKey: "sk-x", apiKeyInfo: { allowedCombos: ["combo/*"] } }, "c"),
    undefined
  );

  // A key without a combo grant: a blocked target is skipped, like chat.
  const gate = createComboTargetKeyGate(
    { apiKey: "sk-x", apiKeyInfo: { blockedModels: [target] } },
    "my-combo"
  );
  assert.ok(gate);
  assert.equal(await gate(target), false, "a target the key blocks is never dispatched");

  // A stored combo granted by allowedCombos grants its own targets (#14197).
  const granted = createComboTargetKeyGate(
    { apiKey: "sk-x", apiKeyInfo: { blockedModels: [target], allowedCombos: ["combo/*"] } },
    "my-combo"
  );
  assert.ok(granted);
  assert.equal(await granted(target), true);
});

// ── keyless / zero-config providers (chat's #9057 rule) ─────────────────────

type KeylessCase = { name: string; call: (bearer: string) => Promise<Response> };

const KEYLESS_CASES: KeylessCase[] = [
  {
    name: "POST /v1/images/generations (sdwebui)",
    call: (bearer) =>
      imagesRoute.POST(
        jsonRequest("/v1/images/generations", bearer, {
          model: "sdwebui/sdxl-base-1.0",
          prompt: "a lighthouse",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/videos/generations (comfyui)",
    call: (bearer) =>
      videosRoute.POST(
        jsonRequest("/v1/videos/generations", bearer, {
          model: "comfyui/animatediff",
          prompt: "a lighthouse at dusk",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/music/generations (comfyui)",
    call: (bearer) =>
      musicRoute.POST(
        jsonRequest("/v1/music/generations", bearer, {
          model: "comfyui/musicgen-medium",
          prompt: "calm piano",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/audio/speech (coqui)",
    call: (bearer) =>
      speechRoute.POST(
        jsonRequest("/v1/audio/speech", bearer, {
          model: "coqui/tts_models/en/ljspeech/tacotron2-DDC",
          input: "hello",
          voice: "default",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/embeddings (ollama-local)",
    call: (bearer) =>
      embeddingsRoute.POST(
        jsonRequest("/v1/embeddings", bearer, {
          model: "ollama-local/nomic-embed-text",
          input: "hello",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/search (explicit duckduckgo-free)",
    call: (bearer) =>
      searchRoute.POST(
        jsonRequest("/v1/search", bearer, {
          query: "lighthouse keyless",
          provider: "duckduckgo-free",
        }),
        noContext
      ),
  },
  {
    name: "POST /v1/web/fetch (anonymous context7 tier)",
    call: (bearer) =>
      webFetchRoute.POST(
        jsonRequest("/v1/web/fetch", bearer, {
          url: "https://context7.com/reactjs/react.dev",
          provider: "context7",
        })
      ),
  },
];

for (const keylessCase of KEYLESS_CASES) {
  test(`GHSA-3w2r ${keylessCase.name}: a connection-scoped key never reaches a keyless provider`, async () => {
    const openai = await seedPair("openai");
    const scopedKey = await makeKey({ allowedConnections: [openai.aId] });

    const upstream = stubUpstream();
    try {
      const response = await keylessCase.call(scopedKey);
      assert.notEqual(response.status, 200);
      const body = await response.text();
      assert.ok(!body.includes("at /"), "no stack trace leaks");
      assert.deepEqual(upstream.calls, [], "the keyless provider is never contacted");
    } finally {
      upstream.restore();
    }
  });

  test(`GHSA-3w2r ${keylessCase.name}: keyless stays available when the allowlist admits noauth`, async () => {
    const noauthKey = await makeKey({ allowedConnections: ["noauth"] });
    const openKey = await makeKey();

    const upstream = stubUpstream();
    try {
      await (await keylessCase.call(noauthKey)).text();
      assert.ok(upstream.calls.length > 0, "an allowlist naming noauth admits keyless providers");
      upstream.calls.length = 0;
      await (await keylessCase.call(openKey)).text();
      assert.ok(upstream.calls.length > 0, "an unrestricted key keeps today's behavior");
    } finally {
      upstream.restore();
    }
  });
}

test("GHSA-3w2r keyless: chat's answer when no connection serves a scoped key", async () => {
  const openai = await seedPair("openai");
  const scopedKey = await makeKey({ allowedConnections: [openai.aId] });
  const response = await KEYLESS_CASES[0].call(scopedKey);
  assert.equal(response.status, 404);
  const body = (await response.json()) as { error?: { message?: string } };
  assert.match(body.error?.message ?? "", /No active credentials for provider: sdwebui/);
});

// ── /v1/search cache partitioned by the key's connection scope ──────────────

test("GHSA-3w2r search cache: a scoped key never gets a result fetched through another connection", async () => {
  const provider = selectProvider(undefined, "web")!.id;
  const pair = await seedPair(provider);
  const openKey = await makeKey();
  const scopedKey = await makeKey({ allowedConnections: [pair.aId] });
  const query = "ghsa3w2r cache partition probe";

  const upstream = stubUpstream(
    () =>
      new Response(
        JSON.stringify({
          results: [{ title: "Lighthouse", url: "https://example.com/l", content: "beam" }],
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      )
  );
  try {
    const first = await searchRoute.POST(jsonRequest("/v1/search", openKey, { query }), noContext);
    assert.equal(first.status, 200, await first.clone().text());
    await first.text();
    assert.deepEqual(upstream.secretsSeen(), [pair.bSecret], "the unrestricted key is served by B");

    upstream.calls.length = 0;
    const second = await searchRoute.POST(
      jsonRequest("/v1/search", scopedKey, { query }),
      noContext
    );
    assert.equal(second.status, 200, await second.clone().text());
    await second.text();
    assert.deepEqual(
      upstream.secretsSeen(),
      [pair.aSecret],
      "the scoped key is a cache miss and is served by its own connection"
    );

    upstream.calls.length = 0;
    const repeat = await searchRoute.POST(jsonRequest("/v1/search", openKey, { query }), noContext);
    await repeat.text();
    assert.deepEqual(upstream.calls, [], "an unrestricted key keeps hitting its own cache entry");
  } finally {
    upstream.restore();
  }
});

// ── shared scope helper (same narrowing chat applies) ───────────────────────

test("GHSA-3w2r scope helper: unscoped keys stay unfiltered, scoped keys keep their list", async () => {
  const { resolveKeyConnectionScope } =
    await import("../../src/sse/services/keyConnectionScope.ts");
  assert.deepEqual(await resolveKeyConnectionScope(null), {
    allowedConnections: null,
    rejection: null,
  });
  assert.deepEqual(await resolveKeyConnectionScope({ allowedConnections: [] }), {
    allowedConnections: null,
    rejection: null,
  });
  assert.deepEqual(await resolveKeyConnectionScope({ allowedConnections: ["conn-a"] }), {
    allowedConnections: ["conn-a"],
    rejection: null,
  });
});

test("GHSA-3w2r scope helper: a quota key whose pools resolve to nothing is refused like chat", async () => {
  const { resolveKeyConnectionScope } =
    await import("../../src/sse/services/keyConnectionScope.ts");
  const scope = await resolveKeyConnectionScope({ allowedQuotas: ["ghsa3w2r-missing-pool"] });
  assert.equal(scope.allowedConnections, null);
  assert.ok(scope.rejection, "an empty quota scope admits no connection");
  assert.equal(scope.rejection.status, 503);
  const body = await scope.rejection.text();
  assert.ok(!body.includes("at /"), "no stack trace leaks");
});

test("GHSA-3w2r scope helper: narrowing never widens a disjoint pair into 'unfiltered'", async () => {
  const { narrowConnectionScope, NO_ELIGIBLE_CONNECTION_ID } =
    await import("../../src/sse/services/keyConnectionScope.ts");
  assert.equal(narrowConnectionScope(null, null), null);
  assert.deepEqual(narrowConnectionScope(["a", "b"], null), ["a", "b"]);
  assert.deepEqual(narrowConnectionScope(null, ["b"]), ["b"]);
  assert.deepEqual(narrowConnectionScope(["a", "b"], ["b", "c"]), ["b"]);
  assert.deepEqual(narrowConnectionScope(["a"], ["c"]), [NO_ELIGIBLE_CONNECTION_ID]);
});
