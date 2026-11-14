/**
 * /v1/models advertised models of no-auth local-CLI providers (zcode, auggie,
 * devin-cli-agentic, codex-app-server) whose program or bridge does not exist on the
 * server host, so every request to them failed (`spawn zcode ENOENT`, "bridge is not
 * configured", ...). They must be hidden when the host check definitively fails.
 * Sibling file: catalog-keeps-available-local-cli.test.ts (host has them).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-cli-absent-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.CATALOG_BUILD_TIMEOUT_MS = "120000";
process.env.ZCODE_BIN = path.join(TEST_DATA_DIR, "no-such-zcode");
process.env.ZCODE_SERVER_RUNTIME_ROOT = path.join(TEST_DATA_DIR, "no-zcode-runtime");
delete process.env.ZCODE_SERVER_NODE;
delete process.env.ZCODE_SERVER_ENTRY;
process.env.AUGGIE_BIN = path.join(TEST_DATA_DIR, "no-such-auggie");
delete process.env.CLI_AUGGIE_BIN;
delete process.env.DEVIN_AGENTIC_HOME;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const catalog = await import("../../src/app/api/v1/models/catalog.ts");

async function listIds(): Promise<string[]> {
  catalog.__resetCatalogBuilderRunsForTest();
  const response = await catalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models?prefix=dual")
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as { data: Array<{ id: string }> };
  return body.data.map((row) => row.id);
}

const startsWithAny = (ids: string[], prefixes: string[]) =>
  ids.filter((id) => prefixes.some((p) => id.startsWith(`${p}/`)));

test.beforeEach(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("catalog omits local-CLI no-auth providers whose host check reports unavailable", async () => {
  const ids = await listIds();
  for (const [provider, prefixes] of [
    ["zcode", ["zc", "zcode"]],
    ["auggie", ["aug", "auggie"]],
    ["devin-cli-agentic", ["dva", "devin-cli-agentic"]],
    ["codex-app-server", ["cxa", "codex-app-server"]],
  ] as const) {
    assert.deepEqual(startsWithAny(ids, [...prefixes]), [], `${provider} must not be advertised`);
  }
});

test("catalog still lists other no-auth providers (anti-vacuity)", async () => {
  const ids = await listIds();
  assert.ok(startsWithAny(ids, ["ddgw", "duckduckgo-web"]).length > 0, "duckduckgo-web stays");
});

test("a local-CLI provider with a real connection stays listed", async () => {
  await providersDb.createProviderConnection({
    provider: "auggie",
    authType: "apikey",
    name: "auggie-conn",
    apiKey: "x",
    isActive: true,
    testStatus: "active",
    providerSpecificData: {},
  });
  const ids = await listIds();
  assert.ok(startsWithAny(ids, ["aug", "auggie"]).length > 0, "auggie with a connection stays");
});
