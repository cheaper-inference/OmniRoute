/**
 * #18417: `auto/<family>` pools bypass the curated no-auth allowlist (#6453/#8183),
 * but they must still honor the local-CLI readiness gate (#15446). Before the fix the
 * bypass also skipped the probe, so `auto/claude-sonnet` routed to `devin-cli-agentic`
 * on hosts without the Devin CLI.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-readiness-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const noAuthReadiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const { getAutoRoutableEmulatedNoAuthProviders } =
  await import("../../open-sse/services/autoCombo/emulatedNoAuthAllowlist.ts");

const DEVIN = "devin-cli-agentic";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
  noAuthReadiness.__resetNoAuthReadinessForTests();
  // Keep the ToS default (#15979) from emptying the keyless part of the pool, so this
  // file guards only the readiness gate.
  await settingsDb.updateSettings({ excludeTosAvoid: false });
});

test.after(async () => {
  noAuthReadiness.__resetNoAuthReadinessForTests();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

async function familyPoolProviders(family: string): Promise<string[]> {
  const combo = await builtinCatalog.createBuiltinAutoCombo(`auto/${family}`, family);
  return [...new Set(combo.models.map((m: { providerId: string }) => m.providerId))].sort();
}

test("no readiness probe registered: auto/claude-sonnet has no devin-cli-agentic candidate", async () => {
  assert.equal(noAuthReadiness.isNoAuthProviderReadyForAutoRouting(DEVIN), false);
  const providers = await familyPoolProviders("claude-sonnet");
  assert.ok(!providers.includes(DEVIN), `pool providers: ${JSON.stringify(providers)}`);
});

test("probe returns false: auto/claude-sonnet has no devin-cli-agentic candidate", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => false);
  const providers = await familyPoolProviders("claude-sonnet");
  assert.ok(!providers.includes(DEVIN), `pool providers: ${JSON.stringify(providers)}`);
});

test("probe returns false: the regular auto pool keeps devin-cli-agentic out too", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => false);
  const combo = await virtualFactory.createVirtualAutoCombo(undefined);
  const providers = new Set(combo.models.map((m: { providerId: string }) => m.providerId));
  assert.equal(providers.has(DEVIN), false);
});

test("probe returns true: devin-cli-agentic serves auto/claude-sonnet", async () => {
  noAuthReadiness.registerNoAuthReadiness(DEVIN, () => true);
  const providers = await familyPoolProviders("claude-sonnet");
  assert.ok(providers.includes(DEVIN), `pool providers: ${JSON.stringify(providers)}`);
});

test("family pools still bypass the allowlist for no-auth providers without a probe", async () => {
  const allowlist = getAutoRoutableEmulatedNoAuthProviders();
  const providers = await familyPoolProviders("glm");
  const bypassed = providers.filter((id) => ["auggie", "zcode"].includes(id));
  assert.deepEqual(bypassed, ["auggie", "zcode"], `pool providers: ${JSON.stringify(providers)}`);
  for (const id of bypassed) assert.equal(allowlist.has(id), false);
});
