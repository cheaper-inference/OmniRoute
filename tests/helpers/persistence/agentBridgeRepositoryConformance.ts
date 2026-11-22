import assert from "node:assert/strict";
import test from "node:test";

import type {
  AgentBridgeBypassRepository,
  AgentBridgeStateRepository,
  InspectorCustomHostRepository,
} from "../../../src/domain/persistence/agentBridgeRepositories.ts";

export interface AgentBridgeRepositoriesHarness {
  state: AgentBridgeStateRepository;
  bypass: AgentBridgeBypassRepository;
  customHosts: InspectorCustomHostRepository;
  reset(): Promise<void>;
}

function promised<T>(value: Promise<T>): Promise<T> {
  assert.ok(value instanceof Promise, "every repository operation returns a Promise");
  return value;
}

export function registerAgentBridgeRepositoriesConformance(
  createHarness: () => Promise<AgentBridgeRepositoriesHarness>
): void {
  test("agent bridge state repository: defaults, partial updates and ordering", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { state } = harness;

    assert.deepEqual(await promised(state.list()), []);
    assert.equal(await promised(state.get("codex")), null);

    await promised(state.upsert({ agent_id: "kiro", cert_trusted: true }));
    await state.upsert({ agent_id: "codex" });
    assert.deepEqual(await state.get("codex"), {
      agent_id: "codex",
      dns_enabled: false,
      cert_trusted: false,
      setup_completed: false,
      last_started_at: null,
      last_error: null,
    });

    await state.upsert({ agent_id: "kiro", dns_enabled: true, last_error: "e" });
    await state.upsert({ agent_id: "kiro", last_error: null });
    assert.deepEqual(await state.get("kiro"), {
      agent_id: "kiro",
      dns_enabled: true,
      cert_trusted: true,
      setup_completed: false,
      last_started_at: null,
      last_error: null,
    });

    await promised(state.setLastStarted("antigravity", "t1"));
    await promised(state.setLastError("antigravity", "boom"));
    await state.setLastStarted("kiro", "t2");
    assert.deepEqual(
      (await state.list()).map((row) => [row.agent_id, row.last_started_at, row.last_error]),
      [
        ["antigravity", "t1", "boom"],
        ["codex", null, null],
        ["kiro", "t2", null],
      ]
    );
    assert.equal((await state.get("kiro"))?.cert_trusted, true);
  });

  test("agent bridge bypass repository: ordering, atomic replace and idempotent seed", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { bypass } = harness;

    assert.deepEqual(await promised(bypass.listAll()), []);
    assert.deepEqual(await promised(bypass.listUserPatterns()), []);

    await promised(bypass.seedDefaults(["z.example", "a.example"]));
    await promised(bypass.replaceUserPatterns(["u2.example", "u1.example"]));
    await bypass.seedDefaults(["a.example", "u1.example"]);

    assert.deepEqual(
      (await bypass.listAll()).map((row) => `${row.source}:${row.pattern}`),
      ["default:a.example", "default:z.example", "user:u1.example", "user:u2.example"]
    );
    assert.deepEqual(await bypass.listUserPatterns(), ["u1.example", "u2.example"]);

    await assert.rejects(bypass.replaceUserPatterns(["n.example", "z.example"]));
    assert.deepEqual(await bypass.listUserPatterns(), ["u1.example", "u2.example"]);

    await bypass.replaceUserPatterns([]);
    assert.deepEqual(await bypass.listUserPatterns(), []);
    assert.deepEqual(
      (await bypass.listAll()).map((row) => row.pattern),
      ["a.example", "z.example"]
    );
  });

  test("inspector custom host repository: add defaults, filter, toggle and lookup", async () => {
    const harness = await createHarness();
    await harness.reset();
    const { customHosts } = harness;

    assert.deepEqual(await promised(customHosts.list()), []);
    await promised(customHosts.add("c.example"));
    await customHosts.add("a.example", "llm", "A");
    await customHosts.add("a.example", "app", "ignored");
    await customHosts.add("b.example", "app");
    await promised(customHosts.setEnabled("b.example", false));

    const all = await customHosts.list();
    assert.deepEqual(
      all.map((row) => [row.host, row.enabled, row.kind, row.label]),
      [
        ["a.example", true, "llm", "A"],
        ["b.example", false, "app", null],
        ["c.example", true, "custom", null],
      ]
    );
    assert.deepEqual(
      (await promised(customHosts.list({ enabledOnly: true }))).map((row) => row.host),
      ["a.example", "c.example"]
    );

    assert.equal(await promised(customHosts.isEnabledCustomHost("a.example")), true);
    assert.equal(await customHosts.isEnabledCustomHost("b.example"), false);
    assert.equal(await customHosts.isEnabledCustomHost("missing.example"), false);

    await promised(customHosts.touchLastSeen("c.example"));
    const touched = (await customHosts.list()).find((row) => row.host === "c.example");
    assert.equal(typeof touched?.last_seen_at, "string");

    await promised(customHosts.remove("a.example"));
    assert.deepEqual(
      (await customHosts.list()).map((row) => row.host),
      ["b.example", "c.example"]
    );
  });
}
