import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "omni-static-discovery-16687-"));
process.env.DATA_DIR = dataDir;
process.env.APP_LOG_TO_FILE = "false";
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { GET } = await import("../../src/app/api/providers/[id]/models/route.ts");
const { getDiscoveryClass } = await import("../../src/lib/providerModels/discoveryClass.ts");
const { isDegradedDiscovery } =
  await import("../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts");
const { extractImportWarning, classifyModelImport } =
  await import("../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning.ts");
const originalFetch = globalThis.fetch;
const noAdapterWarning =
  "Model discovery is not configured for this provider — using local catalog";

async function connection(provider: string) {
  return createProviderConnection({
    provider,
    authType: "apikey",
    name: `${provider} test`,
    apiKey: "test-only-key",
    isActive: true,
    providerSpecificData: { autoFetchModels: true },
  });
}
function refresh(id: string) {
  return GET(new Request(`http://localhost/api/providers/${id}/models?refresh=true`), {
    params: { id },
  });
}

test.beforeEach(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  mkdirSync(dataDir, { recursive: true });
});
test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const provider of ["ideogram", "grok-web"]) {
  test(`${provider} static-only refresh identifies missing discovery without an upstream call`, async () => {
    assert.equal(getDiscoveryClass(provider), "static-only");
    const stored = await connection(provider);
    let fetches = 0;
    globalThis.fetch = async () => {
      fetches++;
      return new Response("unexpected", { status: 500 });
    };
    const response = await refresh(stored.id);
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.source, "local_catalog");
    assert.equal(body.intentional, true);
    assert.ok(body.models.length > 0);
    assert.equal(fetches, 0);
    assert.equal(body.warning, noAdapterWarning);
    assert.equal(extractImportWarning(body), noAdapterWarning);
    assert.equal(isDegradedDiscovery(body), false);
    assert.equal(
      classifyModelImport({
        modelsData: body,
        fetchedModels: body.models,
        isKnownModel: () => true,
      }).degraded,
      false
    );
  });
}

test("configured discovery failure retains its API-unavailable warning", async () => {
  const stored = await connection("openai");
  const urls: string[] = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return new Response("upstream unavailable", { status: 500 });
  };
  const response = await refresh(stored.id);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.source, "local_catalog");
  assert.ok(urls.length > 0);
  assert.ok(urls.every((url) => url === "https://api.openai.com/v1/models"));
  assert.match(body.warning, /API unavailable/);
  assert.notEqual(body.intentional, true);
  assert.equal(isDegradedDiscovery(body), true);
});

test("configured successful discovery remains live and warning-free", async () => {
  const stored = await connection("openai");
  const urls: string[] = [];
  globalThis.fetch = async (url) => {
    urls.push(String(url));
    return Response.json({ data: [{ id: "gpt-4.1", object: "model" }] });
  };
  const response = await refresh(stored.id);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.source, "api");
  assert.deepEqual(urls, ["https://api.openai.com/v1/models"]);
  assert.ok(body.models.some((model: { id: string }) => model.id === "gpt-4.1"));
  assert.equal(body.warning, undefined);
  assert.equal(extractImportWarning(body), null);
  assert.equal(isDegradedDiscovery(body), false);
});
