/**
 * Launch view `serve.shape: "codex"` on the real gateway.
 *
 * - mint and PATCH accept `shape: "codex"`; `prefix` (and `mode`) stay refused with 400;
 * - `/v1/models` with a codex-shaped session token returns the codex envelope
 *   (`{object,data,models:[]}`) for the view rows WITHOUT any codex header;
 * - an openai-shaped session over the same rows keeps the plain `{object,data}` payload;
 * - the cache key separates the two shapes over one view hash.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

type Loose = { [key: string]: Loose };

const scratchDir = process.env.DATA_DIR || path.resolve("_artifacts/tests");
fs.mkdirSync(scratchDir, { recursive: true });
const TEST_DATA_DIR = fs.mkdtempSync(path.join(scratchDir, "omniroute-launch-codex-shape-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "launch-codex-shape-test-secret";
process.env.JWT_SECRET = "launch-codex-shape-test-jwt-secret";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
delete process.env.OMNIROUTE_PEER_STAMP_TOKEN;
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;
delete process.env.INITIAL_PASSWORD;
delete process.env.REQUIRE_API_KEY;

const { unexpectedCatalogNetworkRequests } =
  await import("../../_helpers/catalogNetworkGuard13389.ts");
const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const modelsDb = await import("../../../src/lib/db/models.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../../src/lib/db/apiKeys.ts");
const { viewHash } = await import("../../../src/shared/launch/viewSelect.ts");
const { aiHordeImageCatalog } = await import("../../../open-sse/services/aihordeImageCatalog.ts");
const catalog = await import("../../../src/app/api/v1/models/catalog.ts");
const { launchViewCacheKeySuffix, isCodexShapedLaunchView } =
  await import("../../../src/app/api/v1/models/catalogLaunchView.ts");
const { serveError } = await import("../../../src/app/api/launch/launchRouteHelpers.ts");
const sessionsRoute = await import("../../../src/app/api/launch/sessions/route.ts");
const idRoute = await import("../../../src/app/api/launch/sessions/[id]/route.ts");
const capsRoute = await import("../../../src/app/api/launch/capabilities/route.ts");

test.afterEach(() => {
  assert.deepEqual(unexpectedCatalogNetworkRequests, [], "catalog tests must not use the network");
});

test.after(() => {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REMOTE = "http://gateway.example.com";
const FIXTURE_MODELS = ["cs-alpha", "cs-bravo", "cs-charlie"];
const VIEW_IDS = ["groq/cs-charlie", "groq/cs-alpha"];
const baseView = () => ({ hash: viewHash(VIEW_IDS), ids: VIEW_IDS });

function req(method: string, pathName: string, token: string, body?: unknown): Request {
  return new Request(`${REMOTE}${pathName}`, {
    method,
    headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

const ctx = (id: string) => ({ params: Promise.resolve({ id }) });

async function mint(key: string, body: Record<string, unknown>) {
  const res = await sessionsRoute.POST(req("POST", "/api/launch/sessions", key, body));
  return { res, json: (await res.json()) as Loose };
}

async function patch(token: string, id: string, body: Record<string, unknown>) {
  const res = await idRoute.PATCH(req("PATCH", `/api/launch/sessions/${id}`, token, body), ctx(id));
  return { res, json: (await res.json()) as Loose };
}

async function readCatalog(token: string): Promise<{ status: number; body: Loose }> {
  // No originator / user-agent: header sniffing must not be what selects the codex envelope.
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { authorization: `Bearer ${token}` },
    })
  );
  return { status: response.status, body: (await response.json()) as Loose };
}

let seeded = false;
async function seedCatalog() {
  if (seeded) return;
  seeded = true;
  aiHordeImageCatalog.setFetch(async () => Response.json([]));
  await aiHordeImageCatalog.ensureFresh();
  await settingsDb.updateSettings({
    password: "launch-codex-shape-test-password",
    requireLogin: true,
    requireAuthForModels: true,
    hideAutoCombos: true,
    hideNoThinkVariants: true,
  });
  const { id } = await providersDb.createProviderConnection({
    provider: "groq",
    authType: "apikey",
    name: "launch-codex-shape-groq",
    apiKey: "groq-launch-codex-shape-test-key",
    isActive: true,
    testStatus: "active",
  });
  assert.ok(typeof id === "string");
  await modelsDb.replaceSyncedAvailableModelsForConnection(
    "groq",
    id,
    FIXTURE_MODELS.map((model) => ({ id: model, name: model, supportedEndpoints: ["chat"] }))
  );
}

test("serveError accepts openai and codex shapes, refuses prefix, mode and unknown shapes", () => {
  assert.equal(serveError(undefined), null);
  assert.equal(serveError({}), null);
  assert.equal(serveError({ shape: "openai" }), null);
  assert.equal(serveError({ shape: "codex" }), null);
  assert.match(String(serveError({ prefix: "x/" })), /prefix/);
  assert.match(String(serveError({ prefix: "x/", mode: "replace" })), /prefix/);
  assert.match(String(serveError({ mode: "mirror" })), /mode/);
  assert.match(String(serveError({ shape: "anthropic" })), /shape/);
});

test("capabilities advertise the codex shape", async () => {
  const { key } = await apiKeysDb.createApiKey("caps", "launch-codex-shape");
  const res = await capsRoute.GET(req("GET", "/api/launch/capabilities", key));
  assert.equal(res.status, 200);
  const json = (await res.json()) as { view: { shapes: string[]; prefix: boolean } };
  assert.deepEqual(json.view.shapes, ["openai", "codex"]);
  assert.equal(json.view.prefix, false);
});

test("mint and PATCH accept serve.shape codex; prefix is still 400", async () => {
  const { key } = await apiKeysDb.createApiKey("mint-codex", "launch-codex-shape");
  const codexView = { ...baseView(), serve: { shape: "codex" } };

  const minted = await mint(key, { tool: "codex", view: codexView });
  assert.equal(minted.res.status, 201);
  assert.equal(minted.json.view.count, 2);
  let meta = await apiKeysDb.getApiKeyMetadata(minted.json.token as unknown as string);
  assert.equal(meta?.launchSession?.view?.serve?.shape, "codex");

  // The launcher's real flow: mint bare, then PATCH the view.
  const bare = await mint(key, { tool: "codex" });
  assert.equal(bare.res.status, 201);
  const token = bare.json.token as unknown as string;
  const id = bare.json.sessionId as unknown as string;
  const ok = await patch(token, id, { view: codexView });
  assert.equal(ok.res.status, 200, JSON.stringify(ok.json));
  meta = await apiKeysDb.getApiKeyMetadata(token);
  assert.equal(meta?.launchSession?.view?.serve?.shape, "codex");

  const prefixMint = await mint(key, {
    tool: "codex",
    view: { ...baseView(), serve: { prefix: "x/" } },
  });
  assert.equal(prefixMint.res.status, 400);
  const prefixPatch = await patch(token, id, {
    view: { ...baseView(), serve: { prefix: "x/", shape: "codex" } },
  });
  assert.equal(prefixPatch.res.status, 400);
  assert.ok(prefixPatch.json.error);
  // A refused PATCH leaves the stored view alone.
  meta = await apiKeysDb.getApiKeyMetadata(token);
  assert.equal(meta?.launchSession?.view?.serve?.prefix, undefined);
});

test("/v1/models: codex-shaped view gets the codex envelope, openai view over the same rows does not", async () => {
  await seedCatalog();
  const { key } = await apiKeysDb.createApiKey("catalog-codex", "launch-codex-shape");

  const parent = await readCatalog(key);
  assert.equal(parent.status, 200);
  assert.equal("models" in parent.body, false, "a plain key keeps {object,data}");

  const codex = await mint(key, {
    tool: "codex",
    view: { ...baseView(), serve: { shape: "codex" } },
  });
  const openai = await mint(key, {
    tool: "opencode",
    view: { ...baseView(), serve: { shape: "openai" } },
  });
  const plain = await mint(key, { tool: "crush", view: baseView() });
  for (const m of [codex, openai, plain]) assert.equal(m.res.status, 201);
  const codexToken = codex.json.token as unknown as string;
  const openaiToken = openai.json.token as unknown as string;
  const plainToken = plain.json.token as unknown as string;

  // Cache keys never collide across shapes over the same hash.
  const hash = baseView().hash;
  assert.equal(launchViewCacheKeySuffix(codexToken), `|view=${hash}|shape=codex`);
  assert.equal(launchViewCacheKeySuffix(openaiToken), `|view=${hash}`);
  assert.equal(launchViewCacheKeySuffix(plainToken), `|view=${hash}`);

  // Twice each: the second read comes from the cache and must keep the shape.
  for (let round = 0; round < 2; round++) {
    const c = await readCatalog(codexToken);
    assert.equal(c.status, 200);
    assert.equal(c.body.object as unknown as string, "list");
    assert.deepEqual(
      (c.body.data as unknown as Array<{ id: string }>).map((row) => row.id),
      VIEW_IDS,
      "codex shape serves the view rows in view order"
    );
    assert.deepEqual(c.body.models, [], "codex envelope without any codex header");

    for (const token of [openaiToken, plainToken]) {
      const o = await readCatalog(token);
      assert.equal(o.status, 200);
      assert.deepEqual(Object.keys(o.body).sort(), ["data", "object"], "byte-identical shape");
      assert.deepEqual(
        (o.body.data as unknown as Array<{ id: string }>).map((row) => row.id),
        VIEW_IDS
      );
    }
  }
});

test("isCodexShapedLaunchView only matches a well-formed codex view", () => {
  const v = baseView();
  assert.equal(isCodexShapedLaunchView(null), false);
  assert.equal(isCodexShapedLaunchView(v), false);
  assert.equal(isCodexShapedLaunchView({ ...v, serve: { shape: "openai" } }), false);
  assert.equal(isCodexShapedLaunchView({ ...v, serve: { shape: "codex" } }), true);
});
