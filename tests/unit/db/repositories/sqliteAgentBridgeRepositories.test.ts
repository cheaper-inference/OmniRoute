import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { registerAgentBridgeRepositoriesConformance } from "../../../helpers/persistence/agentBridgeRepositoryConformance.ts";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-bridge-repository-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../../src/lib/db/core.ts");
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.DATA_DIR;
});

const { sqliteAgentBridgeStateRepository: state } =
  await import("../../../../src/lib/db/repositories/sqliteAgentBridgeStateRepository.ts");
const { sqliteAgentBridgeBypassRepository: bypass } =
  await import("../../../../src/lib/db/repositories/sqliteAgentBridgeBypassRepository.ts");
const { sqliteInspectorCustomHostRepository: customHosts } =
  await import("../../../../src/lib/db/repositories/sqliteInspectorCustomHostRepository.ts");
const { agentBridgeRepositories } =
  await import("../../../../src/lib/db/repositories/agentBridgeRepositories.ts");
const stateFacade = await import("../../../../src/lib/db/agentBridgeState.ts");
const bypassFacade = await import("../../../../src/lib/db/agentBridgeBypass.ts");
const hostsFacade = await import("../../../../src/lib/db/inspectorCustomHosts.ts");

async function resetStorage(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

registerAgentBridgeRepositoriesConformance(async () => ({
  state,
  bypass,
  customHosts,
  reset: resetStorage,
}));

function synchronous<T>(value: T): T {
  assert.equal(value instanceof Promise, false, "legacy helpers must not return Promises");
  return value;
}

test("composition root binds the SQLite repositories and their legacy sync helpers", () => {
  assert.equal(agentBridgeRepositories.state, state);
  assert.equal(agentBridgeRepositories.bypass, bypass);
  assert.equal(agentBridgeRepositories.customHosts, customHosts);
  assert.equal(stateFacade.getAgentBridgeStateRepository(), state);
  assert.equal(bypassFacade.getAgentBridgeBypassRepository(), bypass);
  assert.equal(hostsFacade.getInspectorCustomHostRepository(), customHosts);
  for (const helpers of Object.values(agentBridgeRepositories.legacySync)) {
    for (const fn of Object.values(helpers)) assert.equal(typeof fn, "function");
  }
});

test("legacy sync facades and async repositories share data in both directions", async () => {
  await resetStorage();

  synchronous(stateFacade.upsertAgentBridgeState({ agent_id: "codex", dns_enabled: true }));
  assert.equal((await state.get("codex"))?.dns_enabled, true);
  await state.upsert({ agent_id: "codex", setup_completed: true });
  assert.equal(synchronous(stateFacade.getAgentBridgeState("codex"))?.setup_completed, true);

  synchronous(bypassFacade.replaceUserBypassPatterns(["sync.example"]));
  assert.deepEqual(await bypass.listUserPatterns(), ["sync.example"]);
  await bypass.seedDefaults(["async.example"]);
  assert.deepEqual(
    synchronous(bypassFacade.getAllBypassPatterns()).map((row) => row.pattern),
    ["async.example", "sync.example"]
  );

  synchronous(hostsFacade.addCustomHost("sync.example", "llm"));
  assert.equal(await customHosts.isEnabledCustomHost("sync.example"), true);
  await customHosts.setEnabled("sync.example", false);
  assert.equal(synchronous(hostsFacade.isCustomHost("sync.example")), false);
});

test("a rejected write propagates and leaves existing rows intact", async () => {
  await resetStorage();
  stateFacade.upsertAgentBridgeState({ agent_id: "codex", dns_enabled: true });
  hostsFacade.addCustomHost("kept.example");
  const db = core.getDbInstance();
  db.exec(
    "CREATE TRIGGER agent_bridge_state_fail BEFORE UPDATE ON agent_bridge_state " +
      "BEGIN SELECT RAISE(ABORT, 'forced'); END"
  );
  db.exec(
    "CREATE TRIGGER custom_hosts_fail BEFORE UPDATE ON inspector_custom_hosts " +
      "BEGIN SELECT RAISE(ABORT, 'forced'); END"
  );
  try {
    assert.throws(
      () => stateFacade.upsertAgentBridgeState({ agent_id: "codex", dns_enabled: false }),
      /forced/
    );
    await assert.rejects(state.setLastError("codex", "x"), /forced/);
    assert.throws(() => hostsFacade.toggleCustomHost("kept.example", false), /forced/);
    await assert.rejects(customHosts.touchLastSeen("kept.example"), /forced/);
  } finally {
    db.exec("DROP TRIGGER agent_bridge_state_fail");
    db.exec("DROP TRIGGER custom_hosts_fail");
  }
  assert.deepEqual(stateFacade.getAgentBridgeState("codex"), {
    agent_id: "codex",
    dns_enabled: true,
    cert_trusted: false,
    setup_completed: false,
    last_started_at: null,
    last_error: null,
  });
  const [host] = hostsFacade.listCustomHosts();
  assert.equal(host.enabled, true);
  assert.equal(host.last_seen_at, null);
});
