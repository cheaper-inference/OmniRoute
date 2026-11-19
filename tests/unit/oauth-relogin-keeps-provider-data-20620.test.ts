// #20620: a re-login on an existing OAuth connection replaced its providerSpecificData with
// the fresh payload. For Claude that minted a new cliUserID (the device id sent upstream) and
// dropped the operator's controls; for every non-codex provider the controls were dropped.

import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "omni-relogin-keeps-psd-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";

const core = await import("../../src/lib/db/core.ts");
const providers = await import("../../src/lib/db/providers.ts");
const { normalizeConnectionProviderSpecificData } =
  await import("../../src/lib/db/providers/providerSpecificData.ts");

const DEVICE_ID = "a".repeat(64);
const FRESH_DEVICE_ID = "b".repeat(64);
const ORG = "org-20620";

const operatorControls = {
  limitPolicy: { enabled: true, thresholdPercent: 80, windows: ["weekly"] },
  quotaPreflightEnabled: false,
  allowPaidCredits: true,
  blockExtraUsage: false,
  lowPriorityMode: true,
  autoLimitReset: true,
  keepMidConversationSystem: true,
  // Already in the shape the normalizer stores, so the comparison is exact.
  peakHourProtection: { enabled: true, mode: "avoid", windows: [] },
};

function metadata(connection: Record<string, unknown> | null): Record<string, unknown> {
  assert.ok(connection, "connection must exist");
  const value = connection.providerSpecificData;
  assert.ok(value && typeof value === "object" && !Array.isArray(value));
  return value as Record<string, unknown>;
}

async function createClaude(email: string) {
  const created = await providers.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email,
    name: email,
    accessToken: "claude-access-1",
    refreshToken: "claude-refresh-1",
    providerSpecificData: {
      cliUserID: DEVICE_ID,
      autoSync: true,
      organizationUUID: ORG,
      plan: "max",
      ...operatorControls,
    },
  });
  assert.ok(created && typeof created.id === "string");
  return created as { id: string };
}

// What claude.mapTokens hands back on every login: a new random cliUserID and no controls.
const freshClaudePayload = () => ({
  cliUserID: FRESH_DEVICE_ID,
  autoSync: true,
  organizationUUID: ORG,
  plan: "pro",
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Claude re-login through createProviderConnection keeps cliUserID and operator controls", async () => {
  const original = await createClaude("create-relogin@example.invalid");

  const reloggedIn = await providers.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "create-relogin@example.invalid",
    name: "create-relogin@example.invalid",
    accessToken: "claude-access-2",
    refreshToken: "claude-refresh-2",
    providerSpecificData: freshClaudePayload(),
  });

  assert.equal(reloggedIn?.id, original.id, "re-login must update the same account");
  const stored = metadata(await providers.getProviderConnectionById(original.id));
  assert.equal(stored.cliUserID, DEVICE_ID);
  for (const [key, value] of Object.entries(operatorControls)) {
    assert.deepEqual(stored[key], value, `${key} must survive the re-login`);
  }
  // Identity fields from the fresh login still replace the stored ones.
  assert.equal(stored.plan, "pro");
  assert.equal(stored.organizationUUID, ORG);
});

test("Claude re-login through updateProviderConnection keeps cliUserID and operator controls", async () => {
  const original = await createClaude("update-relogin@example.invalid");

  const updated = await providers.updateProviderConnection(original.id, {
    accessToken: "claude-access-2",
    providerSpecificData: freshClaudePayload(),
  });

  assert.equal(updated?.id, original.id);
  const stored = metadata(await providers.getProviderConnectionById(original.id));
  assert.equal(stored.cliUserID, DEVICE_ID);
  for (const [key, value] of Object.entries(operatorControls)) {
    assert.deepEqual(stored[key], value, `${key} must survive the re-login`);
  }
  assert.equal(stored.plan, "pro");
});

test("An explicit value for a control in the payload still wins over the stored one", async () => {
  const original = await createClaude("explicit-control@example.invalid");

  await providers.updateProviderConnection(original.id, {
    providerSpecificData: {
      ...freshClaudePayload(),
      blockExtraUsage: true,
      lowPriorityMode: false,
    },
  });

  const stored = metadata(await providers.getProviderConnectionById(original.id));
  assert.equal(stored.blockExtraUsage, true);
  assert.equal(stored.lowPriorityMode, false);
  assert.equal(stored.autoLimitReset, true, "controls the payload omits are still kept");
});

test("Claude re-login keeps the fresh cliUserID when the stored one is not a valid device id", async () => {
  const original = await providers.createProviderConnection({
    provider: "claude",
    authType: "oauth",
    email: "bad-device@example.invalid",
    name: "bad-device@example.invalid",
    accessToken: "claude-access-1",
    providerSpecificData: { cliUserID: "not-a-device-id", organizationUUID: ORG },
  });

  await providers.updateProviderConnection(original.id, {
    providerSpecificData: freshClaudePayload(),
  });

  const stored = metadata(await providers.getProviderConnectionById(original.id));
  assert.equal(stored.cliUserID, FRESH_DEVICE_ID);
});

test("providerSpecificData: null still clears everything on a Claude connection", async () => {
  const original = await createClaude("clear@example.invalid");

  const cleared = await providers.updateProviderConnection(original.id, {
    providerSpecificData: null,
  });

  const stored = metadata(cleared);
  assert.equal(stored.cliUserID, undefined);
  for (const key of Object.keys(operatorControls)) {
    assert.equal(stored[key], undefined, `${key} must be cleared`);
  }
});

test("A non-Claude provider keeps its operator controls on re-login but takes the fresh data otherwise", async () => {
  const original = await providers.createProviderConnection({
    provider: "github",
    authType: "oauth",
    email: "github-relogin@example.invalid",
    name: "github-relogin@example.invalid",
    accessToken: "github-access-1",
    providerSpecificData: {
      limitPolicy: operatorControls.limitPolicy,
      lowPriorityMode: true,
      copilotToken: "old-copilot-token",
      cliUserID: DEVICE_ID,
    },
  });
  assert.ok(original && typeof original.id === "string");

  const reloggedIn = await providers.updateProviderConnection(original.id, {
    accessToken: "github-access-2",
    providerSpecificData: { copilotToken: "new-copilot-token", cliUserID: FRESH_DEVICE_ID },
  });

  const stored = metadata(reloggedIn);
  assert.deepEqual(stored.limitPolicy, operatorControls.limitPolicy);
  assert.equal(stored.lowPriorityMode, true);
  assert.equal(stored.copilotToken, "new-copilot-token", "fresh data replaces the rest");
  assert.equal(stored.cliUserID, FRESH_DEVICE_ID, "cliUserID is only carried over for claude");
});

test("normalizeConnectionProviderSpecificData ignores a non-object payload or stored value", () => {
  const credentials = { accessToken: "x" };
  assert.deepEqual(
    normalizeConnectionProviderSpecificData("claude", null, credentials, { cliUserID: DEVICE_ID }),
    {}
  );
  assert.deepEqual(
    normalizeConnectionProviderSpecificData("claude", { plan: "pro" }, credentials, null),
    { plan: "pro" }
  );
});
