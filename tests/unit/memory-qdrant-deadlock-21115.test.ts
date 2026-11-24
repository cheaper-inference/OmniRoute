import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { makeManagementSessionRequest } from "../helpers/managementSession.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-qdrant-deadlock-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret-qdrant-deadlock";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const memorySettings = await import("../../src/lib/memory/settings.ts");
const { checkQdrantHealth, searchSemanticMemory } = await import("../../src/lib/memory/qdrant.ts");
const qdrantHealthRoute = await import("../../src/app/api/settings/qdrant/health/route.ts");
const qdrantSearchRoute = await import("../../src/app/api/settings/qdrant/search/route.ts");

const asNextRequest = (req: Request) => req as unknown as import("next/server").NextRequest;

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  memorySettings.invalidateMemorySettingsCache();
  await updateSettings({
    requireLogin: false,
    qdrantEnabled: false,
    qdrantHost: "http://qdrant.test",
    qdrantPort: 6333,
    qdrantCollection: "omniroute_memory",
    qdrantEmbeddingModel: "openai/text-embedding-3-small",
  });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ─── 1. checkQdrantHealth with allowDisabled ─────────────────────────────────

test("#21115: checkQdrantHealth connects to /readyz when allowDisabled=true even if qdrantEnabled is false", async () => {
  const originalFetch = globalThis.fetch;
  let readyzCalled = false;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/readyz")) {
      readyzCalled = true;
      return new Response("ready", { status: 200 });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    const res = await checkQdrantHealth({ allowDisabled: true });
    assert.equal(readyzCalled, true, "checkQdrantHealth must call /readyz when allowDisabled=true");
    assert.equal(res.ok, true, "health must be ok when server responds readyz");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── 2. GET /api/settings/qdrant/health route ────────────────────────────────

test("#21115: GET /api/settings/qdrant/health allows testing connection before enabling", async () => {
  const originalFetch = globalThis.fetch;
  let readyzCalled = false;

  globalThis.fetch = async (url) => {
    if (String(url).endsWith("/readyz")) {
      readyzCalled = true;
      return new Response("ready", { status: 200 });
    }
    return new Response("not found", { status: 404 });
  };

  try {
    const req = await makeManagementSessionRequest("http://localhost/api/settings/qdrant/health");
    const res = await qdrantHealthRoute.GET(asNextRequest(req));
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(readyzCalled, true, "route must trigger /readyz probe");
    assert.equal(body.ok, true, "route must report ok: true when qdrant responds");
    assert.notEqual(
      body.error,
      "not_configured",
      "must not return not_configured when host is set"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── 3. searchSemanticMemory with allowDisabled ──────────────────────────────

test("#21115: searchSemanticMemory runs when allowDisabled=true and host is configured", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    const s = String(url);
    if (s.endsWith("/collections/omniroute_memory")) {
      return Response.json({ result: { config: { params: { vectors: { size: 1536 } } } } });
    }
    if (s.endsWith("/points/search")) {
      return Response.json({
        result: [{ id: "1", score: 0.95, payload: { kind: "omniroute_memory" } }],
      });
    }
    return new Response("ok", { status: 200 });
  };

  try {
    const res = await searchSemanticMemory("test query", 5, undefined, { allowDisabled: true });
    assert.notEqual(
      res.error,
      "not_configured",
      "searchSemanticMemory with allowDisabled=true must not return not_configured when host is set"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});

// ─── 4. POST /api/settings/qdrant/search route ───────────────────────────────

test("#21115: POST /api/settings/qdrant/search allows running search test before enabling", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (url) => {
    const s = String(url);
    if (s.endsWith("/collections/omniroute_memory")) {
      return Response.json({ result: { config: { params: { vectors: { size: 1536 } } } } });
    }
    if (s.endsWith("/points/search")) {
      return Response.json({
        result: [{ id: "1", score: 0.95, payload: { kind: "omniroute_memory" } }],
      });
    }
    return new Response("ok", { status: 200 });
  };

  try {
    const req = await makeManagementSessionRequest("http://localhost/api/settings/qdrant/search", {
      method: "POST",
      body: { query: "test query", topK: 5 },
    });
    const res = await qdrantSearchRoute.POST(asNextRequest(req));
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(typeof body.ok, "boolean");
    assert.ok(Array.isArray(body.results));
  } finally {
    globalThis.fetch = originalFetch;
  }
});
