/**
 * #17393 — the Combo Control Center must be able to name the account each
 * configured target is pinned to.
 *
 * The browser cannot read the connection table, so the combo route resolves the
 * account display names server-side (`buildComboConnectionLabels`) and ships
 * them next to the combo row. Connections without a name/displayName/email are
 * left out on purpose: the client then falls back to the step label and
 * finally to the full connection id, which is more useful than a generic
 * "Account #abc123".
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-account-labels-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { buildComboConnectionLabels } =
  await import("../../src/lib/combos/controlCenterAccountLabels.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("buildComboConnectionLabels resolves the account name of every pinned connection", async () => {
  const named = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "Primary",
    email: "primary@example.com",
    apiKey: "sk-named",
  });
  const nameless = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    apiKey: "sk-nameless",
  });

  const labels = buildComboConnectionLabels({
    models: [
      {
        id: "step-named",
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-5-codex",
        connectionId: named.id,
        weight: 0,
      },
      {
        id: "step-nameless",
        kind: "model",
        providerId: "openai",
        model: "openai/gpt-5-mini",
        connectionId: nameless.id,
        weight: 0,
      },
    ],
  });

  assert.equal(labels[named.id], "Primary");
  assert.equal(
    labels[nameless.id],
    undefined,
    "a connection without a name must not get a placeholder label"
  );
});

test("buildComboConnectionLabels ignores steps without a pinned connection", () => {
  assert.deepEqual(
    buildComboConnectionLabels({
      models: [
        { id: "step-open", kind: "model", providerId: "openai", model: "openai/gpt-5-codex" },
        { id: "step-ref", kind: "combo-ref", comboName: "other-combo" },
      ],
    }),
    {}
  );
});
