import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const data = fs.mkdtempSync(path.join(os.tmpdir(), "omni-pinned-empty-turn-"));
process.env.DATA_DIR = data;
const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { tryPinnedModelDispatch } = await import("../../open-sse/services/combo/dispatchPrelude.ts");
const { resolveComboSetupConfig } = await import("../../open-sse/services/comboConfig.ts");
const { markEmptyTurnExecution } = await import("../../open-sse/utils/emptyTurnPolicy.ts");
const log = { info() {}, warn() {}, debug() {}, error() {} };

test.after(
  async () => {
    await (await import("../../src/lib/usage/callLogs.ts")).closeCallLogSaves(5000);
    core.resetDbInstance();
    fs.rmSync(data, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  },
  { timeout: 6000 }
);

test(
  "pinned native empty turns require execution evidence, including unprefixed aliases",
  { timeout: 8000 },
  async () => {
    const connection = await createProviderConnection({
      provider: "anthropic",
      authType: "apikey",
      name: "native-empty-turn-fixture",
      isActive: true,
      apiKey: "fixture-anthropic-key",
    });
    assert.ok(connection && typeof connection.id === "string");
    const events = [
      'event: message_start\ndata: {"type":"message_start","message":{"content":[]}}',
      'event: message_delta\ndata: {"type":"message_delta","delta":{"stop_reason":"end_turn"}}',
      'event: message_stop\ndata: {"type":"message_stop"}',
      "",
    ].join("\n\n");
    for (const pinnedModel of ["anthropic/claude-sonnet-4-6", "claude-alias"]) {
      const combo = {
        name: "native-empty-turn-combo",
        strategy: "priority",
        models: [{ model: pinnedModel }],
        config: {},
      };
      for (const trusted of [false, true]) {
        const raw = new Response(events, {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "X-OmniRoute-Selected-Connection-Id": connection.id,
          },
        });
        const response = trusted
          ? markEmptyTurnExecution(raw, "https://api.anthropic.com/v1/messages", {
              connectionId: connection.id,
              apiKey: "fixture-anthropic-key",
            })
          : raw;
        const result = await tryPinnedModelDispatch({
          body: { messages: [{ role: "user", content: "hi" }], stream: true },
          combo,
          pinnedModel,
          allCombos: [combo],
          config: resolveComboSetupConfig(combo, {}),
          clientRequestedStream: true,
          handleSingleModelWithTimeout: async () => response,
          log,
        });
        assert.equal(
          result,
          trusted ? response : null,
          "a selected-connection header cannot authorize an empty turn"
        );
        if (result) await result.text();
      }
    }
  }
);
