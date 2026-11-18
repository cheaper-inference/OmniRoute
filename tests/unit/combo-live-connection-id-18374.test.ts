/**
 * #18374: Combo Live Studio shows which account served a target. The id has to survive the whole
 * live path: combo loop -> EventBus payload -> WS frame mapping -> reducer (covered in
 * tests/unit/ui/comboFlowModel.test.ts) -> node (tests/unit/ui/providerCascadeNode.test.tsx).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-18374-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const rrState = await import("../../open-sse/services/combo/rrState.ts");
const dbCore = await import("../../src/lib/db/core.ts");
const eventBus = await import("../../src/lib/events/eventBus.ts");
const { toLiveComboEvent } = await import("../../src/hooks/useLiveDashboard.ts");

const log = { info() {}, warn() {}, debug() {}, error() {} };
const OK_BODY = {
  choices: [{ message: { role: "assistant", content: "served" }, finish_reason: "stop" }],
};

function json(status: number, body: unknown, selected?: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      ...(selected ? { "X-OmniRoute-Selected-Connection-Id": selected } : {}),
    },
  });
}

function comboOf(strategy: string, connectionId?: string) {
  const name = `live-18374-${strategy}-${Math.random().toString(16).slice(2)}`;
  return {
    name,
    strategy,
    config: { maxRetries: 0, disableSessionStickiness: true },
    models: [
      {
        kind: "model",
        provider: "codex",
        providerId: "codex",
        model: "m-a",
        ...(connectionId ? { connectionId } : {}),
        id: `${name}-0`,
      },
    ],
  };
}

async function runAndCapture(combo: unknown, response: () => Response) {
  const seen: Record<string, Array<{ connectionId?: string }>> = {};
  const offs = (["attempt", "succeeded", "failed"] as const).map((kind) =>
    eventBus.on(`combo.target.${kind}`, (payload: { connectionId?: string }) => {
      (seen[kind] ??= []).push(payload);
    })
  );
  try {
    const result = await handleComboChat({
      body: { model: "x", messages: [{ role: "user", content: "hi" }] },
      combo,
      handleSingleModel: async () => response(),
      isModelAvailable: async () => true,
      log,
      settings: {},
      allCombos: null,
    } as never);
    await result.body?.cancel();
  } finally {
    offs.forEach((off) => off());
  }
  return seen;
}

test.beforeEach(() => {
  rrState.rrCounters.clear();
  rrState.rrStickyTargets.clear();
});

test.after(() => {
  dbCore.resetDbInstance?.();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const strategy of ["priority", "round-robin"]) {
  test(`${strategy}: attempt and success carry a pinned target's account`, async () => {
    const seen = await runAndCapture(comboOf(strategy, "conn-pinned"), () => json(200, OK_BODY));
    assert.equal(seen.attempt?.[0]?.connectionId, "conn-pinned");
    assert.equal(seen.succeeded?.[0]?.connectionId, "conn-pinned");
  });

  test(`${strategy}: a pooled target's success carries the account that served it`, async () => {
    const seen = await runAndCapture(comboOf(strategy), () =>
      json(200, OK_BODY, "conn-from-header")
    );
    assert.equal(seen.attempt?.[0]?.connectionId, undefined);
    assert.equal(seen.succeeded?.[0]?.connectionId, "conn-from-header");
  });
}

test("round-robin: a failed attempt carries the account that failed", async () => {
  const seen = await runAndCapture(comboOf("round-robin"), () =>
    json(500, { error: { message: "boom" } }, "conn-failing")
  );
  assert.equal(seen.failed?.[0]?.connectionId, "conn-failing");
});

test("WS frame mapping keeps connectionId on all three event kinds", () => {
  const data = {
    comboName: "c",
    targetIndex: 0,
    provider: "p",
    model: "m",
    latencyMs: 1,
    error: "e",
    strategy: "priority",
    connectionId: "conn-ws",
  };
  for (const [event, type] of [
    ["combo.target.attempt", "attempt"],
    ["combo.target.succeeded", "succeeded"],
    ["combo.target.failed", "failed"],
  ] as const) {
    const mapped = toLiveComboEvent({ channel: "combo", event, data, timestamp: 7 } as never);
    assert.equal(mapped?.type, type);
    assert.equal(mapped?.connectionId, "conn-ws");
    assert.equal(mapped?.timestamp, 7);
  }
  assert.equal(
    toLiveComboEvent({ channel: "combo", event: "other", data, timestamp: 7 } as never),
    null
  );
});
