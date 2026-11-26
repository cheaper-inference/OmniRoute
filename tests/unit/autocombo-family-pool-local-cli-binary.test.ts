/**
 * auto/<family> pools bypass the no-auth allowlist, so they rely on the readiness gate alone:
 * zcode and auggie must stay out of every family pool while their binary is absent on the
 * host (the localCliAvailability verdict that already hides them from /v1/models, #18753),
 * and join again once it is present.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-local-cli-"));
const BIN_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-family-local-cli-bin-"));
const ENV_KEYS = [
  "DATA_DIR",
  "ZCODE_BIN",
  "ZCODE_SERVER_RUNTIME_ROOT",
  "ZCODE_SERVER_NODE",
  "ZCODE_SERVER_ENTRY",
  "AUGGIE_BIN",
  "CLI_AUGGIE_BIN",
  "CLI_DEVIN_AGENTIC_BIN",
] as const;
const ORIGINAL_ENV = Object.fromEntries(ENV_KEYS.map((key) => [key, process.env[key]]));
for (const key of ENV_KEYS) delete process.env[key];
process.env.DATA_DIR = TEST_DATA_DIR;
const ZCODE_BIN = path.join(BIN_DIR, "zcode");
const AUGGIE_BIN = path.join(BIN_DIR, "auggie");
process.env.ZCODE_BIN = ZCODE_BIN;
process.env.ZCODE_SERVER_RUNTIME_ROOT = path.join(BIN_DIR, "no-runtime");
process.env.AUGGIE_BIN = AUGGIE_BIN;
process.env.CLI_DEVIN_AGENTIC_BIN = path.join(BIN_DIR, "no-such-devin-binary");

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const builtinCatalog = await import("../../open-sse/services/autoCombo/builtinCatalog.ts");
const noAuthReadiness = await import("../../open-sse/services/autoCombo/noAuthReadiness.ts");
const availability = await import("../../src/shared/services/localCliAvailability.ts");
const { registerNoAuthAutoRoutingReadiness } =
  await import("../../src/lib/providers/noAuthAutoRoutingReadiness.ts");

const LOCAL_CLI = ["zcode", "auggie"];

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function setBinaries(present: boolean) {
  for (const file of [ZCODE_BIN, AUGGIE_BIN]) {
    if (present) fs.writeFileSync(file, "#!/bin/sh\n", { mode: 0o755 });
    else fs.rmSync(file, { force: true });
  }
  availability.resetLocalCliAvailabilityCache();
}

test.beforeEach(async () => {
  await resetStorage();
  noAuthReadiness.__resetNoAuthReadinessForTests();
  await settingsDb.updateSettings({ excludeTosAvoid: false });
  // What registerNodejs() does at server boot.
  registerNoAuthAutoRoutingReadiness();
});

test.after(async () => {
  noAuthReadiness.__resetNoAuthReadinessForTests();
  availability.resetLocalCliAvailabilityCache();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.rmSync(BIN_DIR, { recursive: true, force: true });
  for (const key of ENV_KEYS) {
    if (ORIGINAL_ENV[key] === undefined) delete process.env[key];
    else process.env[key] = ORIGINAL_ENV[key];
  }
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

test("binary absent: no auto/<family> pool has a zcode or auggie candidate", async () => {
  setBinaries(false);
  const providers = await familyProviders();
  assert.ok(providers.length > 0, "fixture: the family pools are not empty");
  for (const id of LOCAL_CLI) {
    assert.ok(!providers.includes(id), `${id} leaked into a family pool: ${providers}`);
  }
  // No binary check covers codex-app-server: it stays fail-open (the CLI may run elsewhere).
  assert.ok(providers.includes("codex-app-server"), `pool providers: ${providers}`);
});

test("binary present: the family pools carry zcode and auggie candidates again", async () => {
  setBinaries(true);
  const providers = await familyProviders();
  for (const id of LOCAL_CLI) {
    assert.ok(providers.includes(id), `${id} missing from the family pools: ${providers}`);
  }
});
