/**
 * End-to-end /v1/models coverage for the per-key Claude Code discovery alias flag.
 *
 * Drives the real catalog path (getUnifiedModelsResponse -> key metadata ->
 * post-filters) rather than the post-filter helper alone, so a regression in how
 * the flag reaches the shared post-filter context (e.g. a read-before-init of the
 * key metadata) breaks /v1/models for every key and fails here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cc-alias-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET ||= "api-key-cc-discovery-aliases-catalog-test-secret";
process.env.EXPOSE_CC_DISCOVERY_ALIASES = "1";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function fetchCatalogIds(key?: string): Promise<string[]> {
  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      method: "GET",
      headers: key ? { authorization: `Bearer ${key}` } : {},
    })
  );
  if (res.status !== 200) {
    assert.fail(`Expected 200, got ${res.status}: ${(await res.text()).slice(0, 500)}`);
  }
  const body = (await res.json()) as { data: Array<{ id: string }> };
  return body.data.map((model) => model.id);
}

const isClaudeMirror = (id: string) => id.startsWith("claude/");

test.after(() => {
  delete process.env.EXPOSE_CC_DISCOVERY_ALIASES;
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("/v1/models serves claude/ mirrors by default and drops them when the key opts out", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });
  const created = await apiKeys.createApiKey("CC alias catalog", "machine-cc-alias-catalog");

  // Flag on (default): the catalog is served and carries discovery mirrors.
  const withMirrors = await fetchCatalogIds(created.key);
  assert.ok(withMirrors.length > 0, "the catalog must be served for a key with the default flag");
  assert.ok(
    withMirrors.some(isClaudeMirror),
    "claude/ discovery mirrors must be listed while the key flag is on"
  );

  // Flag off: mirrors disappear, every other row survives.
  assert.equal(
    await apiKeys.updateApiKeyPermissions(created.id, { allowCcDiscoveryAliases: false }),
    true
  );
  const withoutMirrors = await fetchCatalogIds(created.key);
  assert.equal(
    withoutMirrors.some(isClaudeMirror),
    false,
    "claude/ discovery mirrors must not be listed once the key opts out"
  );
  const nonMirrorsBefore = withMirrors.filter((id) => !isClaudeMirror(id));
  assert.deepEqual(
    withoutMirrors.slice().sort(),
    nonMirrorsBefore.slice().sort(),
    "opting out must only remove the mirrors, never other catalog rows"
  );

  // Flag back on: mirrors return (the cached catalog varies on the key flag).
  await apiKeys.updateApiKeyPermissions(created.id, { allowCcDiscoveryAliases: true });
  assert.ok(
    (await fetchCatalogIds(created.key)).some(isClaudeMirror),
    "claude/ discovery mirrors must return when the key opts back in"
  );
});

test("/v1/models without an API key keeps the discovery mirrors", async () => {
  assert.ok((await fetchCatalogIds()).some(isClaudeMirror));
});
