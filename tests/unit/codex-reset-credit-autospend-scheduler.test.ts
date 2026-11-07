import test from "node:test";
import assert from "node:assert/strict";

const scheduler = await import("../../src/lib/services/codexResetCreditAutospend.ts");

function makeDeps(options: {
  settings?: Record<string, unknown>;
  connections?: Array<{ id: string; provider: string; authType?: string }>;
  spend?: (connectionId: string) => Promise<{ spent: unknown[]; skipped?: string; error?: string }>;
}) {
  const calls: string[] = [];
  return {
    calls,
    deps: {
      getSettings: async () => options.settings ?? {},
      getProviderConnections: async () =>
        options.connections ?? [{ id: "conn-1", provider: "codex", authType: "oauth" }],
      spend: async (connectionId: string) => {
        calls.push(connectionId);
        return options.spend ? options.spend(connectionId) : { spent: [] };
      },
    },
  };
}

test("runCodexAutospendTick does nothing when the opt-in is off", async () => {
  const { deps, calls } = makeDeps({
    settings: { codexSpendExpiringResetCredits: { enabled: false } },
  });

  await scheduler.runCodexAutospendTick(deps);

  // Anti-regression for "background polls never touch reset credits": a tick
  // without the explicit opt-in must not even reach the spend path.
  assert.deepEqual(calls, []);
});

test("runCodexAutospendTick does nothing when the setting is absent", async () => {
  const { deps, calls } = makeDeps({ settings: {} });

  await scheduler.runCodexAutospendTick(deps);

  assert.deepEqual(calls, []);
});

test("runCodexAutospendTick spends for every Codex OAuth connection when enabled", async () => {
  const { deps, calls } = makeDeps({
    settings: { codexSpendExpiringResetCredits: { enabled: true } },
    connections: [
      { id: "conn-1", provider: "codex", authType: "oauth" },
      { id: "conn-2", provider: "codex", authType: "oauth" },
    ],
    spend: async (id) => ({ spent: [{ creditId: `credit-${id}` }] }),
  });

  await scheduler.runCodexAutospendTick(deps);

  assert.deepEqual(calls, ["conn-1", "conn-2"]);
});

test("runCodexAutospendTick keeps going when one connection throws", async () => {
  const { deps, calls } = makeDeps({
    settings: { codexSpendExpiringResetCredits: { enabled: true } },
    connections: [
      { id: "conn-boom", provider: "codex", authType: "oauth" },
      { id: "conn-ok", provider: "codex", authType: "oauth" },
    ],
    spend: async (id) => {
      if (id === "conn-boom") throw new Error("upstream exploded");
      return { spent: [] };
    },
  });

  await scheduler.runCodexAutospendTick(deps);

  assert.deepEqual(calls, ["conn-boom", "conn-ok"]);
});

test("runCodexAutospendTick is re-entrancy guarded", async () => {
  let release: (() => void) | undefined;
  const gate = new Promise<void>((resolve) => {
    release = resolve;
  });
  const { deps } = makeDeps({
    settings: { codexSpendExpiringResetCredits: { enabled: true } },
    spend: async () => {
      await gate;
      return { spent: [] };
    },
  });
  const state = scheduler.createCodexAutospendState();

  const first = scheduler.runCodexAutospendTick(deps, state);
  // Second call while the first is still awaiting must be a no-op.
  await scheduler.runCodexAutospendTick(deps, state);
  release?.();
  await first;

  assert.equal(state.running, false);
});

test("runCodexAutospendTick swallows a settings read failure", async () => {
  const deps = {
    getSettings: async () => {
      throw new Error("db down");
    },
    getProviderConnections: async () => [],
    spend: async () => ({ spent: [] }),
  };

  // Must resolve, never reject: the tick lives on a timer.
  await scheduler.runCodexAutospendTick(deps);
});
