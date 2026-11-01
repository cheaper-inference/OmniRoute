/**
 * Vision Bridge credential checks — #10702 regression tests.
 *
 * `hasUsableCredentialsForModel()` gates which vision-capable catalog
 * candidates the bridge may use. Before the fix:
 *
 *   1. The provider prefix was used verbatim against `provider_connections`
 *      (an exact SQL `provider = ?` match), so alias-keyed model ids like
 *      `cmd/<model>` queried `provider = "cmd"` — but the row is stored
 *      under the canonical id `command-code` — returning zero rows and excluding
 *      every candidate, which surfaced as
 *      "No vision-capable provider connected, cannot process image request".
 *
 *   2. No-auth providers (`unc`/`uncloseai`, `ddgw`/`duckduckgo-web`, ...) were
 *      judged by the same "must have a usable stored API key" bar as keyed
 *      providers, even though their effective credential is the synthetic
 *      "noauth" connection (src/sse/services/auth.ts) and they carry no key.
 *
 * This suite exercises the real DB-backed path (createProviderConnection +
 * getProviderConnections) — same pattern as
 * tests/unit/8779-agy-prefix-credential-lookup.test.ts. Isolated DATA_DIR per
 * PII learnings §3: resetDbInstance() + cleanup in test.after so the node:test
 * runner doesn't hang on open handles.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-vb-cred-"));

// Set before any db import so getDbInstance() picks the temp dir.
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const {
  hasUsableCredentialsForModel,
  hasTerminalConnectionStatus,
  getUsableConnectionsForModel,
  isBlockedNoAuthProvider,
} = await import("../../../src/lib/guardrails/visionBridgeCredentials.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(async () => {
  // Drop the blocked list and bust the module-level 5s settings read cache
  // before teardown, so a block written here cannot leak into sibling test
  // files sharing this process under --test-isolation=none.
  try {
    await settingsDb.updateSettings({ blockedProviders: [] });
  } catch {
    // Settings store already gone — nothing left to leak.
  }
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// ── alias → canonical id resolution (#10702) ────────────────────────────────

test("alias-keyed model finds a row stored under the canonical provider id (#10702)", async () => {
  await resetStorage();
  // The connection is stored under the canonical id "command-code".
  await providersDb.createProviderConnection({
    provider: "command-code",
    authType: "apikey",
    apiKey: "cc-real-key",
    isActive: true,
    testStatus: "active",
  });

  // The model id uses the public alias prefix "cmd" — before the fix this
  // queried provider = "cmd", found no row, and returned false.
  const usable = await hasUsableCredentialsForModel("cmd/deepseek-v4-flash");
  assert.equal(usable, true, "alias prefix must resolve to the canonical provider id");
});

test("alias-keyed noauth model is usable with NO stored row (#10702)", async () => {
  await resetStorage();
  // No `provider_connections` row at all — the noauth provider is served by
  // the synthetic "noauth" connection, so it must still be usable.
  const usable = await hasUsableCredentialsForModel("unc/some-model");
  assert.equal(usable, true, "noauth provider must not require a stored connection row");
});

test("canonical-id noauth model is usable with NO stored row", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("uncloseai/some-model");
  assert.equal(usable, true);
});

// ── noauth terminal-status blocking ─────────────────────────────────────────

test("noauth provider is NOT usable when a row carries a terminal status", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "uncloseai",
    authType: "no-auth",
    name: "uncloseai-account",
    isActive: true,
    testStatus: "banned",
  });
  const usable = await hasUsableCredentialsForModel("unc/some-model");
  assert.equal(usable, false, "a banned noauth row must block the provider");
});

test("noauth provider with a healthy row is usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "uncloseai",
    authType: "no-auth",
    name: "uncloseai-account",
    isActive: true,
    testStatus: "active",
  });
  const usable = await hasUsableCredentialsForModel("unc/some-model");
  assert.equal(usable, true);
});

// ── keyed providers keep the original gate ──────────────────────────────────

test("keyed provider with no active connection is NOT usable", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, false, "no openai row seeded → definitively unusable");
});

test("keyed provider with a usable active connection is usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-real-key",
    isActive: true,
    testStatus: "active",
  });
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, true);
});

test("keyed provider with only a banned connection is NOT usable", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-dead-key",
    isActive: true,
    testStatus: "banned",
  });
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(usable, false);
});

test("non-existent provider returns false (definitive, table readable)", async () => {
  await resetStorage();
  const usable = await hasUsableCredentialsForModel("no-such-provider/model");
  assert.equal(usable, false);
});

// ── blockedProviders gate ───────────────────────────────────────────────────
// Dispatch refuses a no-auth provider listed in blockedProviders BEFORE any
// credential path (src/sse/services/auth.ts) — synthetic connection and
// stored optional-key rows alike. The bridge must therefore report a blocked
// no-auth provider as definitively unusable; otherwise the pool keeps a
// candidate that is guaranteed to fail at dispatch with
// provider_not_configured.

test("blocked no-auth provider is NOT usable with no stored row", async () => {
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: ["cloudflare-playground"] });
  // "cfp" is the alias; the settings list stores canonical ids, and
  // isProviderBlockedByIdOrAlias matches either direction.
  const usable = await hasUsableCredentialsForModel("cfp/some-model");
  assert.equal(usable, false, "dispatch refuses blocked no-auth providers; the bridge must too");
});

test("blocked no-auth provider is NOT usable even with a healthy stored row", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "uncloseai",
    authType: "no-auth",
    name: "uncloseai-account",
    isActive: true,
    testStatus: "active",
  });
  await settingsDb.updateSettings({ blockedProviders: ["uncloseai"] });
  const usable = await hasUsableCredentialsForModel("unc/some-model");
  assert.equal(usable, false, "a stored row must not re-enable a provider dispatch refuses");
});

test("blocked-by-alias settings entry blocks the canonical no-auth provider", async () => {
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: ["unc"] });
  const usable = await hasUsableCredentialsForModel("uncloseai/some-model");
  assert.equal(usable, false);
});

test("blocking one no-auth provider leaves the others usable", async () => {
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: ["cloudflare-playground"] });
  const usable = await hasUsableCredentialsForModel("unc/some-model");
  assert.equal(usable, true);
});

test("unblocking restores usability for the provider", async () => {
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: ["uncloseai"] });
  assert.equal(await hasUsableCredentialsForModel("unc/some-model"), false);
  await settingsDb.updateSettings({ blockedProviders: [] });
  assert.equal(
    await hasUsableCredentialsForModel("unc/some-model"),
    true,
    "removing the block must restore the synthetic no-auth path"
  );
});

test("keyed provider in blockedProviders is NOT excluded (dispatch ignores the list for keyed providers)", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-real-key",
    isActive: true,
    testStatus: "active",
  });
  await settingsDb.updateSettings({ blockedProviders: ["openai"] });
  const usable = await hasUsableCredentialsForModel("openai/gpt-4o-mini");
  assert.equal(
    usable,
    true,
    "blockedProviders gates no-auth providers only; keyed providers keep the credential bar"
  );
});

test("getUsableConnectionsForModel surfaces no synthetic connection for a blocked no-auth provider", async () => {
  await resetStorage();
  await settingsDb.updateSettings({ blockedProviders: ["uncloseai"] });
  const connections = await getUsableConnectionsForModel("unc/some-model");
  assert.deepEqual(connections, []);
});

test("getUsableConnectionsForModel drops stored rows of a blocked no-auth provider", async () => {
  await resetStorage();
  await providersDb.createProviderConnection({
    provider: "uncloseai",
    authType: "no-auth",
    name: "uncloseai-account",
    isActive: true,
    testStatus: "active",
  });
  await settingsDb.updateSettings({ blockedProviders: ["uncloseai"] });
  const connections = await getUsableConnectionsForModel("unc/some-model");
  assert.deepEqual(connections, []);
});

test("isBlockedNoAuthProvider fails open when the settings store is unreadable", async () => {
  await resetStorage();
  // Seed a block, then destroy the settings table: updateSettings above
  // invalidated the read cache, so the next read misses and throws. The
  // helper must treat "cannot read settings" as NOT blocked (fail open) —
  // a fail-closed regression would drop every no-auth provider from the
  // bridge pool on any settings-read error.
  await settingsDb.updateSettings({ blockedProviders: ["uncloseai"] });
  core.getDbInstance().exec("DROP TABLE key_value");
  assert.equal(
    await isBlockedNoAuthProvider("uncloseai"),
    false,
    "settings-read failure must not report a provider as blocked"
  );
});

// ── helper: hasTerminalConnectionStatus ─────────────────────────────────────

test("hasTerminalConnectionStatus recognizes terminal statuses", () => {
  assert.equal(hasTerminalConnectionStatus({ testStatus: "disabled" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "banned" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "expired" }), true);
  assert.equal(hasTerminalConnectionStatus({ testStatus: "active" }), false);
  assert.equal(hasTerminalConnectionStatus({ testStatus: null }), false);
  assert.equal(hasTerminalConnectionStatus({}), false);
});
