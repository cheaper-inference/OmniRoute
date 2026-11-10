/**
 * GitHub Copilot embeddings: `github/text-embedding-3-small` (and `-ada-002`)
 * are served by `https://api.githubcopilot.com/embeddings`. Copilot rejects the
 * raw GitHub OAuth token there, so the request must carry the exchanged
 * `copilotToken` plus the Copilot identity headers the chat executor sends, and
 * a bare string `input` must be wrapped into a one-element array (Copilot
 * answers 400 on a string input).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-embed-github-copilot-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "embed-github-copilot-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getEmbeddingProvider, parseEmbeddingModel, getAllEmbeddingModels } =
  await import("../../open-sse/config/embeddingRegistry.ts");
const { handleEmbedding } = await import("../../open-sse/handlers/embeddings.ts");
const { createEmbeddingResponse } = await import("../../src/lib/embeddings/service.ts");
const { getGitHubCopilotChatHeaders } =
  await import("../../open-sse/config/providerHeaderProfiles.ts");

const COPILOT_EMBEDDINGS_URL = "https://api.githubcopilot.com/embeddings";
const COPILOT_TOKEN_URL = "https://api.github.com/copilot_internal/v2/token";

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

interface CapturedCall {
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

function embeddingOk(): Response {
  return new Response(
    JSON.stringify({
      object: "list",
      data: [{ object: "embedding", embedding: [0.1, 0.2], index: 0 }],
      model: "text-embedding-3-small",
      usage: { prompt_tokens: 2, total_tokens: 2 },
    }),
    { status: 200, headers: { "content-type": "application/json" } }
  );
}

/** Mock fetch: Copilot token exchange answers `mintedToken`, everything else is captured. */
function installFetch(calls: CapturedCall[], tokenCalls: string[], mintedToken = "tid=minted") {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url: unknown, init: RequestInit = {}) => {
    const href = String(url);
    if (href === COPILOT_TOKEN_URL) {
      tokenCalls.push(href);
      return new Response(
        JSON.stringify({ token: mintedToken, expires_at: Math.floor(Date.now() / 1000) + 1800 }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    }
    calls.push({
      url: href,
      headers: { ...((init.headers as Record<string, string>) || {}) },
      body: JSON.parse(String(init.body || "{}")),
    });
    return embeddingOk();
  }) as typeof fetch;
  return () => {
    globalThis.fetch = originalFetch;
  };
}

/** Each service-level test owns exactly one active github connection. */
async function deactivate(id: string): Promise<void> {
  await providersDb.updateProviderConnection(id, { isActive: false });
}

test("registry exposes github embeddings on the Copilot API (3-small + ada-002, no 3-large)", () => {
  const provider = getEmbeddingProvider("github");
  assert.ok(provider, "github must be a curated embedding provider");
  assert.equal(provider.baseUrl, COPILOT_EMBEDDINGS_URL);
  assert.equal(provider.tokenField, "copilotToken");
  assert.deepEqual(
    provider.models.map((m) => [m.id, m.dimensions]),
    [
      ["text-embedding-3-small", 1536],
      ["text-embedding-ada-002", 1536],
    ]
  );
  assert.equal(
    provider.models.some((m) => m.id === "text-embedding-3-large"),
    false,
    "Copilot answers 400 model_not_supported for text-embedding-3-large"
  );
  assert.equal(getEmbeddingProvider("gh"), provider, "the gh alias resolves to github");
  assert.deepEqual(parseEmbeddingModel("gh/text-embedding-3-small"), {
    provider: "github",
    model: "text-embedding-3-small",
  });
  // A bare model id keeps resolving to OpenAI, not to the Copilot entry.
  assert.deepEqual(parseEmbeddingModel("text-embedding-3-small"), {
    provider: "openai",
    model: "text-embedding-3-small",
  });
  const listed = getAllEmbeddingModels().filter((m) => m.provider === "github");
  assert.deepEqual(
    listed.map((m) => m.id),
    ["github/text-embedding-3-small", "github/text-embedding-ada-002"]
  );
});

test("handleEmbedding sends the copilotToken, Copilot identity headers and an array input", async () => {
  const calls: CapturedCall[] = [];
  const restore = installFetch(calls, []);
  try {
    const result = await handleEmbedding({
      body: { model: "github/text-embedding-3-small", input: "hello world" },
      credentials: {
        accessToken: "gho_raw_oauth",
        providerSpecificData: { copilotToken: "tid=abc" },
      },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(calls.length, 1);
    const [call] = calls;
    assert.equal(call.url, COPILOT_EMBEDDINGS_URL);
    assert.equal(call.headers.Authorization, "Bearer tid=abc");
    assert.doesNotMatch(JSON.stringify(call.headers), /gho_raw_oauth/);
    const identity = getGitHubCopilotChatHeaders("application/json");
    assert.equal(call.headers["copilot-integration-id"], identity["copilot-integration-id"]);
    assert.equal(call.headers["editor-version"], identity["editor-version"]);
    assert.equal(call.headers["x-github-api-version"], identity["x-github-api-version"]);
    assert.equal(call.headers["Content-Type"], "application/json");
    assert.deepEqual(call.body.input, ["hello world"]);
    assert.equal(call.body.model, "text-embedding-3-small");
  } finally {
    restore();
  }
});

test("handleEmbedding prefers a top-level copilotToken and keeps array input unchanged", async () => {
  const calls: CapturedCall[] = [];
  const restore = installFetch(calls, []);
  try {
    const result = await handleEmbedding({
      body: {
        model: "github/text-embedding-ada-002",
        input: ["a", "b"],
        encoding_format: "float",
      },
      credentials: {
        accessToken: "gho_raw_oauth",
        copilotToken: "tid=top",
        providerSpecificData: { copilotToken: "tid=nested" },
      },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(calls[0].headers.Authorization, "Bearer tid=top");
    assert.deepEqual(calls[0].body.input, ["a", "b"]);
    assert.equal(calls[0].body.encoding_format, "float");
  } finally {
    restore();
  }
});

test("other providers keep a bare string input and no Copilot headers", async () => {
  const calls: CapturedCall[] = [];
  const restore = installFetch(calls, []);
  try {
    const result = await handleEmbedding({
      body: { model: "openai/text-embedding-3-small", input: "hello" },
      credentials: { apiKey: "sk-openai", providerSpecificData: { copilotToken: "tid=x" } },
      log: null,
    });
    assert.equal(result.success, true);
    assert.equal(calls[0].body.input, "hello");
    assert.equal(calls[0].headers.Authorization, "Bearer sk-openai");
    assert.equal(calls[0].headers["copilot-integration-id"], undefined);
  } finally {
    restore();
  }
});

test("createEmbeddingResponse uses the stored copilotToken without a token exchange", async () => {
  const conn = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "copilot fresh",
    accessToken: "gho_fresh_oauth",
    isActive: true,
    providerSpecificData: {
      copilotToken: "tid=fresh",
      copilotTokenExpiresAt: Math.floor(Date.now() / 1000) + 3600,
    },
  })) as { id: string };
  const calls: CapturedCall[] = [];
  const tokenCalls: string[] = [];
  const restore = installFetch(calls, tokenCalls);
  try {
    const res = await createEmbeddingResponse({
      model: "github/text-embedding-3-small",
      input: "ping",
    });
    assert.equal(res.status, 200);
    assert.equal(tokenCalls.length, 0);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, COPILOT_EMBEDDINGS_URL);
    assert.equal(calls[0].headers.Authorization, "Bearer tid=fresh");
  } finally {
    restore();
    await deactivate(conn.id);
  }
});

test("createEmbeddingResponse refreshes an expired copilotToken before dispatch and persists it", async () => {
  const conn = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "copilot expired",
    accessToken: "gho_expired_oauth",
    isActive: true,
    providerSpecificData: {
      copilotToken: "tid=stale",
      copilotTokenExpiresAt: Math.floor(Date.now() / 1000) - 60,
    },
  })) as { id: string };
  const calls: CapturedCall[] = [];
  const tokenCalls: string[] = [];
  const restore = installFetch(calls, tokenCalls, "tid=refreshed");
  try {
    const res = await createEmbeddingResponse({
      model: "github/text-embedding-3-small",
      input: "ping",
    });
    assert.equal(res.status, 200);
    assert.equal(tokenCalls.length, 1, "exactly one Copilot token exchange");
    assert.equal(calls[0].headers.Authorization, "Bearer tid=refreshed");
    const stored = (await providersDb.getProviderConnectionById(conn.id)) as {
      providerSpecificData?: { copilotToken?: string };
    };
    assert.equal(stored.providerSpecificData?.copilotToken, "tid=refreshed");
  } finally {
    restore();
    await deactivate(conn.id);
  }
});

test("createEmbeddingResponse mints a copilotToken when the connection has none yet", async () => {
  const conn = (await providersDb.createProviderConnection({
    provider: "github",
    authType: "oauth",
    name: "copilot never chatted",
    accessToken: "gho_new_oauth",
    isActive: true,
  })) as { id: string };
  const calls: CapturedCall[] = [];
  const tokenCalls: string[] = [];
  const restore = installFetch(calls, tokenCalls, "tid=minted");
  try {
    const res = await createEmbeddingResponse({
      model: "github/text-embedding-3-small",
      input: "ping",
    });
    assert.equal(res.status, 200);
    assert.equal(tokenCalls.length, 1);
    assert.equal(calls[0].headers.Authorization, "Bearer tid=minted");
    assert.doesNotMatch(JSON.stringify(calls[0].headers), /gho_new_oauth/);
    const stored = (await providersDb.getProviderConnectionById(conn.id)) as {
      providerSpecificData?: { copilotToken?: string; copilotTokenExpiresAt?: number };
    };
    assert.equal(stored.providerSpecificData?.copilotToken, "tid=minted");
    assert.equal(typeof stored.providerSpecificData?.copilotTokenExpiresAt, "number");
  } finally {
    restore();
    await deactivate(conn.id);
  }
});

test("ensureCopilotEmbeddingToken leaves non-Copilot providers and failed exchanges alone", async () => {
  const { ensureCopilotEmbeddingToken } = await import("../../src/lib/embeddings/copilotToken.ts");
  const called: string[] = [];
  const deps = {
    checkAndRefreshToken: async (_provider: string, creds: Record<string, unknown>) => {
      called.push("check");
      return creds;
    },
    refreshCopilotToken: async () => {
      called.push("mint");
      return null;
    },
    updateProviderCredentials: async () => {
      called.push("persist");
      return true;
    },
  };

  const openaiCreds = { apiKey: "sk-openai" };
  const passthrough = await ensureCopilotEmbeddingToken(
    getEmbeddingProvider("openai"),
    "openai",
    openaiCreds,
    deps
  );
  assert.equal(passthrough, openaiCreds);
  assert.deepEqual(called, []);

  // The exchange answers nothing: keep the credentials, persist nothing.
  const githubCreds = { accessToken: "gho_raw", connectionId: "conn-1" };
  const unchanged = await ensureCopilotEmbeddingToken(
    getEmbeddingProvider("github"),
    "github",
    githubCreds,
    deps
  );
  assert.deepEqual(unchanged, githubCreds);
  assert.deepEqual(called, ["check", "mint"]);

  // A throwing refresh never breaks the request path.
  const throwing = await ensureCopilotEmbeddingToken(
    getEmbeddingProvider("github"),
    "github",
    githubCreds,
    {
      ...deps,
      checkAndRefreshToken: async () => {
        throw new Error("network down");
      },
    }
  );
  assert.deepEqual(throwing, githubCreds);
});
