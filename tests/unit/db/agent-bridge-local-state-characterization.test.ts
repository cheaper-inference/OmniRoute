/**
 * Characterization of the synchronous Agent Bridge / Traffic Inspector local
 * state facades: `agentBridgeState.ts`, `agentBridgeBypass.ts` and
 * `inspectorCustomHosts.ts`.
 *
 * Pins defaults, boolean mapping, partial-update semantics, ordering,
 * idempotent seeding and transactional replacement so moving persistence
 * behind repositories cannot change what the agent-bridge / traffic-inspector
 * routes, the MITM manager, DNS provisioning or the intercept hook observe.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-bridge-char-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const state = await import("../../../src/lib/db/agentBridgeState.ts");
const bypass = await import("../../../src/lib/db/agentBridgeBypass.ts");
const hosts = await import("../../../src/lib/db/inspectorCustomHosts.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must stay synchronous");
  return value;
}

function raw(sql: string, ...params: unknown[]): unknown[] {
  return core
    .getDbInstance()
    .prepare(sql)
    .all(...params);
}

// ── agent_bridge_state ─────────────────────────────────────────────────────

test("agent bridge state: empty table, missing agent and synchronous reads", () => {
  assert.deepEqual(synchronous(state.getAllAgentBridgeStates()), []);
  assert.equal(synchronous(state.getAgentBridgeState("codex")), null);
});

test("agent bridge state: insert defaults every omitted flag to false and text to null", () => {
  assert.equal(synchronous(state.upsertAgentBridgeState({ agent_id: "codex" })), undefined);
  assert.deepEqual(state.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: false,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: null,
    last_error: null,
  });
  assert.deepEqual(raw("SELECT * FROM agent_bridge_state"), [
    {
      agent_id: "codex",
      dns_enabled: 0,
      cert_trusted: 0,
      setup_completed: 0,
      last_started_at: null,
      last_error: null,
    },
  ]);
});

test("agent bridge state: insert stores booleans as 0/1 and keeps provided text", () => {
  state.upsertAgentBridgeState({
    agent_id: "claude",
    dns_enabled: true,
    cert_trusted: false,
    setup_completed: true,
    last_started_at: "2026-01-01T00:00:00.000Z",
    last_error: "boom",
  });
  assert.deepEqual(raw("SELECT * FROM agent_bridge_state"), [
    {
      agent_id: "claude",
      dns_enabled: 1,
      cert_trusted: 0,
      setup_completed: 1,
      last_started_at: "2026-01-01T00:00:00.000Z",
      last_error: "boom",
    },
  ]);
});

test("agent bridge state: update touches only provided fields and null clears text", () => {
  state.upsertAgentBridgeState({
    agent_id: "codex",
    dns_enabled: true,
    cert_trusted: true,
    last_started_at: "t1",
    last_error: "e1",
  });

  state.upsertAgentBridgeState({ agent_id: "codex", dns_enabled: false });
  assert.deepEqual(state.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: false,
    cert_trusted: true,
    setup_completed: false,
    last_started_at: "t1",
    last_error: "e1",
  });

  state.upsertAgentBridgeState({ agent_id: "codex", last_error: null, setup_completed: true });
  assert.deepEqual(state.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: false,
    cert_trusted: true,
    setup_completed: true,
    last_started_at: "t1",
    last_error: null,
  });

  // An explicit `undefined` is "not provided"; an empty patch is a no-op.
  state.upsertAgentBridgeState({ agent_id: "codex", cert_trusted: undefined });
  state.upsertAgentBridgeState({ agent_id: "codex" });
  assert.equal(state.getAgentBridgeState("codex")?.cert_trusted, true);
});

test("agent bridge state: list is ordered by agent_id ascending", () => {
  for (const agentId of ["kiro", "antigravity", "codex"]) {
    state.upsertAgentBridgeState({ agent_id: agentId });
  }
  assert.deepEqual(
    state.getAllAgentBridgeStates().map((row) => row.agent_id),
    ["antigravity", "codex", "kiro"]
  );
});

test("agent bridge state: only exact 1 maps to true", () => {
  core
    .getDbInstance()
    .prepare(
      "INSERT INTO agent_bridge_state (agent_id, dns_enabled, cert_trusted, setup_completed) VALUES (?, ?, ?, ?)"
    )
    .run("odd", 2, -1, 1);
  const row = state.getAgentBridgeState("odd");
  assert.equal(row?.dns_enabled, false);
  assert.equal(row?.cert_trusted, false);
  assert.equal(row?.setup_completed, true);
});

test("agent bridge state: setLastStarted / setLastError upsert one column only", () => {
  synchronous(state.setLastStarted("codex", "t1"));
  assert.deepEqual(state.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: false,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: "t1",
    last_error: null,
  });

  state.upsertAgentBridgeState({ agent_id: "codex", dns_enabled: true });
  synchronous(state.setLastError("codex", "e1"));
  state.setLastStarted("codex", "t2");
  assert.deepEqual(state.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: true,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: "t2",
    last_error: "e1",
  });

  state.setLastError("codex", null);
  assert.equal(state.getAgentBridgeState("codex")?.last_error, null);

  state.setLastError("fresh", "only-error");
  assert.deepEqual(state.getAgentBridgeState("fresh"), {
    agent_id: "fresh",
    dns_enabled: false,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: null,
    last_error: "only-error",
  });
});

// ── agent_bridge_bypass ────────────────────────────────────────────────────

test("bypass: empty lists and synchronous writes", () => {
  assert.deepEqual(synchronous(bypass.getAllBypassPatterns()), []);
  assert.deepEqual(synchronous(bypass.getUserBypassPatterns()), []);
  assert.equal(synchronous(bypass.replaceUserBypassPatterns([])), undefined);
  assert.equal(synchronous(bypass.seedDefaultBypassPatterns([])), undefined);
});

test("bypass: list orders defaults before user rows, then by pattern", () => {
  bypass.seedDefaultBypassPatterns(["*.z.example", "*.a.example"]);
  bypass.replaceUserBypassPatterns(["m.example", "b.example"]);

  assert.deepEqual(
    bypass.getAllBypassPatterns().map((row) => [row.source, row.pattern]),
    [
      ["default", "*.a.example"],
      ["default", "*.z.example"],
      ["user", "b.example"],
      ["user", "m.example"],
    ]
  );
  assert.deepEqual(bypass.getUserBypassPatterns(), ["b.example", "m.example"]);
  for (const row of bypass.getAllBypassPatterns()) {
    assert.match(row.created_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  }
});

test("bypass: replace swaps only user rows and stamps one shared timestamp", () => {
  bypass.seedDefaultBypassPatterns(["default.example"]);
  bypass.replaceUserBypassPatterns(["old.example"]);
  bypass.replaceUserBypassPatterns(["new-1.example", "new-2.example"]);

  assert.deepEqual(bypass.getUserBypassPatterns(), ["new-1.example", "new-2.example"]);
  const userRows = bypass.getAllBypassPatterns().filter((row) => row.source === "user");
  assert.equal(new Set(userRows.map((row) => row.created_at)).size, 1);
  assert.deepEqual(
    bypass
      .getAllBypassPatterns()
      .filter((row) => row.source === "default")
      .map((row) => row.pattern),
    ["default.example"]
  );

  bypass.replaceUserBypassPatterns([]);
  assert.deepEqual(bypass.getUserBypassPatterns(), []);
  assert.equal(bypass.getAllBypassPatterns().length, 1);
});

test("bypass: replace is atomic when a pattern collides", () => {
  bypass.seedDefaultBypassPatterns(["taken.example"]);
  bypass.replaceUserBypassPatterns(["kept.example"]);

  assert.throws(() => bypass.replaceUserBypassPatterns(["a.example", "a.example"]));
  assert.deepEqual(bypass.getUserBypassPatterns(), ["kept.example"]);

  assert.throws(() => bypass.replaceUserBypassPatterns(["b.example", "taken.example"]));
  assert.deepEqual(bypass.getUserBypassPatterns(), ["kept.example"]);
  assert.deepEqual(
    bypass.getAllBypassPatterns().map((row) => `${row.source}:${row.pattern}`),
    ["default:taken.example", "user:kept.example"]
  );
});

test("bypass: seeding is idempotent and never converts an existing user row", () => {
  bypass.replaceUserBypassPatterns(["shared.example"]);
  bypass.seedDefaultBypassPatterns(["shared.example", "d.example", "d.example"]);
  const first = bypass.getAllBypassPatterns();
  bypass.seedDefaultBypassPatterns(["shared.example", "d.example"]);

  assert.deepEqual(bypass.getAllBypassPatterns(), first);
  assert.deepEqual(
    first.map((row) => `${row.source}:${row.pattern}`),
    ["default:d.example", "user:shared.example"]
  );
});

// ── inspector_custom_hosts ─────────────────────────────────────────────────

test("custom hosts: add defaults to enabled, kind custom and null label", () => {
  assert.deepEqual(synchronous(hosts.listCustomHosts()), []);
  assert.equal(synchronous(hosts.addCustomHost("api.example.com")), undefined);

  const [row] = hosts.listCustomHosts();
  assert.equal(row.host, "api.example.com");
  assert.equal(row.enabled, true);
  assert.equal(row.kind, "custom");
  assert.equal(row.label, null);
  assert.equal(row.last_seen_at, null);
  assert.match(row.added_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.deepEqual(raw("SELECT enabled FROM inspector_custom_hosts"), [{ enabled: 1 }]);
});

test("custom hosts: duplicate add is ignored and keeps the first row unchanged", () => {
  hosts.addCustomHost("dup.example", "llm", "First");
  hosts.toggleCustomHost("dup.example", false);
  const before = hosts.listCustomHosts();

  hosts.addCustomHost("dup.example", "app", "Second");
  assert.deepEqual(hosts.listCustomHosts(), before);
  assert.equal(before[0].enabled, false);
  assert.equal(before[0].kind, "llm");
  assert.equal(before[0].label, "First");
});

test("custom hosts: an invalid kind is silently dropped (INSERT OR IGNORE also ignores CHECK)", () => {
  assert.equal(hosts.addCustomHost("bad.example", "other" as unknown as "custom"), undefined);
  assert.deepEqual(hosts.listCustomHosts(), []);
});

test("custom hosts: ordering, enabledOnly filter and isCustomHost", () => {
  hosts.addCustomHost("c.example");
  hosts.addCustomHost("a.example", "llm", "A");
  hosts.addCustomHost("b.example", "app");
  synchronous(hosts.toggleCustomHost("b.example", false));

  assert.deepEqual(
    hosts.listCustomHosts().map((row) => row.host),
    ["a.example", "b.example", "c.example"]
  );
  assert.deepEqual(
    hosts.listCustomHosts({ enabledOnly: true }).map((row) => row.host),
    ["a.example", "c.example"]
  );
  assert.equal(hosts.listCustomHosts({ enabledOnly: false }).length, 3);
  assert.equal(hosts.listCustomHosts({}).length, 3);

  assert.equal(synchronous(hosts.isCustomHost("a.example")), true);
  assert.equal(hosts.isCustomHost("b.example"), false);
  assert.equal(hosts.isCustomHost("missing.example"), false);
  assert.equal(hosts.isCustomHost("A.EXAMPLE"), false);

  hosts.toggleCustomHost("b.example", true);
  assert.equal(hosts.isCustomHost("b.example"), true);
});

test("custom hosts: touchLastSeen and remove affect one host; unknown hosts are no-ops", () => {
  hosts.addCustomHost("seen.example");
  hosts.addCustomHost("other.example");

  assert.equal(synchronous(hosts.touchLastSeen("seen.example")), undefined);
  const seen = hosts.listCustomHosts().find((row) => row.host === "seen.example");
  assert.match(seen?.last_seen_at ?? "", /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
  assert.equal(
    hosts.listCustomHosts().find((row) => row.host === "other.example")?.last_seen_at,
    null
  );

  hosts.touchLastSeen("missing.example");
  hosts.toggleCustomHost("missing.example", true);
  assert.equal(synchronous(hosts.removeCustomHost("missing.example")), undefined);
  assert.equal(hosts.listCustomHosts().length, 2);

  hosts.removeCustomHost("seen.example");
  assert.deepEqual(
    hosts.listCustomHosts().map((row) => row.host),
    ["other.example"]
  );
});
