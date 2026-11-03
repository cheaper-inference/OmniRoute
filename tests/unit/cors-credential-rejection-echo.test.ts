/**
 * #5242 follow-up to the CLIENT_API validated-key CORS rule.
 *
 * With REQUIRE_API_KEY=false the authz pipeline serves an unvalidated key as
 * anonymous and does not echo the Origin. A route that then refuses the key
 * with its own 401 must restore the echo so browser/Electron clients can read
 * the rejection, while a response served to the anonymous caller still gets no
 * Access-Control-Allow-Origin.
 *
 * Self-isolating: DATA_DIR points at a fresh temp dir before any db module loads.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cors-rejection-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-secret-cors-rejection";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const settingsModule = await import("../../src/lib/db/settings.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const filesRoute = await import("../../src/app/api/v1/files/route.ts");
const fileByIdRoute = await import("../../src/app/api/v1/files/[id]/route.ts");
const { resolveListScope } = await import("../../src/app/api/v1/_helpers/apiKeyScope.ts");
const sessionLeasesRoute = await import("../../src/app/api/v1/session-leases/route.ts");

const ORIGIN = "https://app.example";
const originalRequireApiKey = process.env.REQUIRE_API_KEY;

async function resetStorage() {
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  v1ModelsCatalog.__resetCatalogBuilderRunsForTest();
}

test.beforeEach(async () => {
  delete process.env.CORS_ALLOW_ALL;
  delete process.env.CORS_ALLOWED_ORIGINS;
  process.env.REQUIRE_API_KEY = "false";
  await resetStorage();
});

test.after(() => {
  if (originalRequireApiKey === undefined) delete process.env.REQUIRE_API_KEY;
  else process.env.REQUIRE_API_KEY = originalRequireApiKey;
  core.resetDbInstance();
  apiKeysDb.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function crossOrigin(url: string, headers: Record<string, string> = {}) {
  return new Request(url, { headers: { origin: ORIGIN, ...headers } });
}

test("/v1/models 401 for a refused key echoes the Origin when management auth is configured", async () => {
  await settingsModule.updateSettings({ password: "test-password-cors", requireLogin: true });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    crossOrigin("http://test.example.com/v1/models", { authorization: "Bearer junk" })
  );

  assert.equal(res.status, 401);
  assert.equal((await res.json()).error.code, "invalid_api_key");
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.match(res.headers.get("Vary") || "", /Origin/);
  assert.equal(res.headers.get("Access-Control-Allow-Credentials"), null);
});

test("/v1/models 401 without a presented key does not echo the Origin", async () => {
  await settingsModule.updateSettings({ password: "test-password-cors", requireLogin: true });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    crossOrigin("http://test.example.com/v1/models")
  );

  assert.equal(res.status, 401);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
});

test("/v1/models served to an anonymous caller with a junk key does not echo the Origin", async () => {
  await settingsModule.updateSettings({ requireAuthForModels: false });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    crossOrigin("http://test.example.com/v1/models", { authorization: "Bearer junk" })
  );

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), null);
});

test("/v1/files 401 for a refused key echoes the Origin", async () => {
  const list = await filesRoute.GET(
    crossOrigin("http://localhost/api/v1/files", { authorization: "Bearer junk" })
  );
  assert.equal(list.status, 401);
  assert.equal(list.headers.get("Access-Control-Allow-Origin"), ORIGIN);

  const byId = await fileByIdRoute.GET(
    crossOrigin("http://localhost/api/v1/files/file-x", { authorization: "Bearer junk" }),
    { params: Promise.resolve({ id: "file-x" }) }
  );
  assert.equal(byId.status, 401);
  assert.equal(byId.headers.get("Access-Control-Allow-Origin"), ORIGIN);
});

test("/v1/session-leases 401 for a refused key echoes the Origin", async () => {
  const res = await sessionLeasesRoute.POST(
    new Request("http://localhost/api/v1/session-leases", {
      method: "POST",
      headers: { origin: ORIGIN, authorization: "Bearer junk", "content-type": "application/json" },
      body: JSON.stringify({ action: "status" }),
    })
  );
  assert.equal(res.status, 401);
  assert.equal(res.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  assert.equal(res.headers.get("Content-Type"), "application/json");
});

test("resolveListScope 401 echoes the Origin only when given the request", () => {
  const scope = {
    apiKey: "junk",
    apiKeyId: null,
    apiKeyMetadata: null,
    keyState: "missing",
    rejection: null,
    isSessionAuth: false,
  } as unknown as Parameters<typeof resolveListScope>[0];
  const req = crossOrigin("http://localhost/api/v1/files", { "x-api-key": "junk" });

  const withRequest = resolveListScope(scope, undefined, req);
  assert.equal(withRequest.mode, "rejected");
  if (withRequest.mode === "rejected") {
    assert.equal(withRequest.response.headers.get("Access-Control-Allow-Origin"), ORIGIN);
  }

  const withoutRequest = resolveListScope(scope);
  assert.equal(withoutRequest.mode, "rejected");
  if (withoutRequest.mode === "rejected") {
    assert.equal(withoutRequest.response.headers.get("Access-Control-Allow-Origin"), null);
  }
});
