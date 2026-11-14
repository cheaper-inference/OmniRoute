/**
 * codex-app-server (cxa) must stay out of auto/<family> pools while the app-server
 * transport is not configured on the host (family pools bypass the no-auth allowlist, so
 * they rely on the readiness gate), and join them once it is configured.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-cxa-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const noAuthReadiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const host = await import("../../src/lib/providers/localCliHostAvailability.ts");
const { registerNoAuthAutoRoutingReadiness } =
  await import("../../src/lib/providers/noAuthAutoRoutingReadiness.ts");

const CXA = "codex-app-server";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  noAuthReadiness.__resetNoAuthReadinessForTests();
  host.__resetLocalCliHostVerdictsForTests();
  await settingsDb.updateSettings({ excludeTosAvoid: false });
  registerNoAuthAutoRoutingReadiness();
});

test.after(async () => {
  noAuthReadiness.__resetNoAuthReadinessForTests();
  host.__resetLocalCliHostVerdictsForTests();
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS;
  delete process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN;
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

async function familyProviders(): Promise<string[]> {
  const all = new Set<string>();
  for (const family of builtinCatalog.AUTO_FAMILY_IDS) {
    const combo = await builtinCatalog.createBuiltinAutoCombo(
      family,
      family.replace(/^auto\//, "")
    );
    for (const m of combo.models) all.add(m.providerId);
  }
  return [...all];
}

test("app-server not configured: no auto/<family> pool has a codex-app-server candidate", async () => {
  const providers = await familyProviders();
  assert.ok(providers.length > 0, "fixture: the family pools are not empty");
  assert.ok(!providers.includes(CXA), `pool providers: ${JSON.stringify(providers)}`);
  assert.equal(noAuthReadiness.isNoAuthProviderReadyForAutoRouting(CXA), false);
});

test("app-server configured: a family pool carries codex-app-server candidates", async () => {
  process.env.OMNIROUTE_CODEX_APPSERVER_WS = "ws://127.0.0.1:1456";
  process.env.OMNIROUTE_CODEX_APPSERVER_WS_TOKEN = "test-app-server-token";
  host.__resetLocalCliHostVerdictsForTests();
  assert.equal(noAuthReadiness.isNoAuthProviderReadyForAutoRouting(CXA), true);
  const providers = await familyProviders();
  assert.ok(providers.includes(CXA), `pool providers: ${JSON.stringify(providers)}`);
});
