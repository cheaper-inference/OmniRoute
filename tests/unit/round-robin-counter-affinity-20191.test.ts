import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rr-affinity-20191-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { rrCounters, rrStickyTargets } = await import("../../open-sse/services/combo/rrState.ts");
const stick = await import("../../open-sse/services/combo/sessionStickiness.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const { getSettings } = await import("../../src/lib/db/settings.ts");

function makeLog() {
  return { info() {}, warn() {}, debug() {}, error() {} };
}

function makeRRCombo(name: string, stickyLimit: number = 1) {
  return {
    name,
    strategy: "round-robin",
    config: {
      maxRetries: 0,
      stickyRoundRobinLimit: stickyLimit,
      disableSessionStickiness: true, // test pure round-robin without user-session stickiness
    },
    models: [
      {
        kind: "model",
        provider: "mock-a",
        providerId: "mock-a",
        model: "m-a",
        connectionId: "conn-A",
        id: `${name}-0`,
      },
      {
        kind: "model",
        provider: "mock-b",
        providerId: "mock-b",
        model: "m-b",
        connectionId: "conn-B",
        id: `${name}-1`,
      },
      {
        kind: "model",
        provider: "mock-c",
        providerId: "mock-c",
        model: "m-c",
        connectionId: "conn-C",
        id: `${name}-2`,
      },
    ],
  };
}

async function dispatchWithPrefix(
  combo: Record<string, unknown>,
  systemPrompt: string,
  userMessage: string = "hello",
  settings: Record<string, unknown> = { promptCacheAffinityEnabled: true }
): Promise<string> {
  let conn = "?";
  await handleComboChat({
    body: {
      model: combo.name,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      stream: false,
    },
    combo,
    allCombos: [combo],
    isModelAvailable: async () => true,
    relayOptions: undefined,
    signal: undefined,
    settings,
    log: makeLog(),
    handleSingleModel: async (
      _b: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      conn = target?.connectionId ?? "?";
      return Response.json({ choices: [{ message: { role: "assistant", content: modelStr } }] });
    },
  });
  return conn;
}

test.beforeEach(() => {
  rrCounters.clear();
  rrStickyTargets.clear();
  stick.clearAllStickyBindings();
});

test.after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

test("round-robin advances across targets even when promptCacheAffinity is enabled (#20191)", async () => {
  const combo = makeRRCombo("rr-rotation-affinity-test", 1);
  const served: string[] = [];

  // Send 6 requests with distinct system prompts and prompt cache affinity enabled
  for (let i = 0; i < 6; i++) {
    const conn = await dispatchWithPrefix(
      combo,
      `System prompt version ${i} — cache prefix content ${i * 100}`,
      `User query ${i}`
    );
    served.push(conn);
  }

  // Must rotate cleanly across all 3 targets in order
  assert.deepEqual(served, ["conn-A", "conn-B", "conn-C", "conn-A", "conn-B", "conn-C"]);
});

test("round-robin with stickyRoundRobinLimit > 1 rotates after threshold in initialTargets space (#20191)", async () => {
  const combo = makeRRCombo("rr-sticky-limit-test", 2);
  const served: string[] = [];

  // With sticky limit 2, each target should serve 2 requests before advancing
  for (let i = 0; i < 6; i++) {
    const conn = await dispatchWithPrefix(combo, `System prompt version ${i}`, `User query ${i}`);
    served.push(conn);
  }

  assert.deepEqual(served, ["conn-A", "conn-A", "conn-B", "conn-B", "conn-C", "conn-C"]);
});

test("getSettings falls back to databaseSettings namespace for promptCacheAffinityEnabled (#20191)", async () => {
  const db = dbCore.getDbInstance();

  // Initially default is true
  const initialSettings = await getSettings();
  assert.equal(initialSettings.promptCacheAffinityEnabled, true);

  // Write promptCacheAffinityEnabled: false to databaseSettings namespace
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('databaseSettings', 'promptCacheAffinityEnabled', 'false')"
  ).run();

  const settingsFromDbNamespace = await getSettings();
  assert.equal(settingsFromDbNamespace.promptCacheAffinityEnabled, false);

  // When settings namespace has an explicit value, it overrides databaseSettings
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('settings', 'promptCacheAffinityEnabled', 'true')"
  ).run();

  const overriddenSettings = await getSettings();
  assert.equal(overriddenSettings.promptCacheAffinityEnabled, true);

  // Clean up key_value rows
  db.prepare("DELETE FROM key_value WHERE key = 'promptCacheAffinityEnabled'").run();
});
