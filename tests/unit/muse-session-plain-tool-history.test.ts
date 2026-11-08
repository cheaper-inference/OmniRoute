import { test } from "node:test";
import assert from "node:assert/strict";
import {
  museSessionScope,
  claimMuseSession,
  bindMuseGeneration,
  recordMuseOutput,
} from "../../src/sse/services/museSessionOwnership.ts";
import { getDbInstance, resetDbInstance } from "../../src/lib/db/core.ts";

// Tool call ids and plain item ids are chosen by whoever produced the turn and carry no
// account state: Muse accepts any of them. Only encrypted reasoning and server-side item
// references bind a thread to the account that issued them.
const candidates = [{ id: "account-a" }, { id: "account-b" }];

const foreignToolTurn = (suffix: string) => [
  {
    type: "function_call",
    id: `fc_foreign_${suffix}`,
    call_id: `toolu_foreign_${suffix}`,
    name: "read",
    arguments: "{}",
  },
  { type: "function_call_output", call_id: `toolu_foreign_${suffix}`, output: "result" },
];

function resetOwnership() {
  getDbInstance()
    .prepare("DELETE FROM key_value WHERE namespace = ?")
    .run("muse_session_ownership");
}

async function serve(scope: string, generation: string, output: unknown[]) {
  await recordMuseOutput(new Response(JSON.stringify({ output })), scope, generation).text();
}

test("a served session continues with tool calls another provider issued", async () => {
  resetOwnership();
  const scope = museSessionScope({ prompt_cache_key: "switched-model" }, undefined, "client");
  const owner = claimMuseSession(scope, { input: "start" }, candidates);
  const generation = bindMuseGeneration(scope, owner.connectionId, "key-a", "identity-a");
  const museTurn = [
    { type: "reasoning", id: "rs_muse", encrypted_content: "muse-opaque", summary: [] },
    { type: "function_call", id: "fc_muse", call_id: "call_muse", name: "read", arguments: "{}" },
  ];
  await serve(scope, generation, museTurn);

  // The client switched the thread to another provider for a while, then back to Muse.
  const input = [
    ...museTurn,
    { type: "function_call_output", call_id: "call_muse", output: "result" },
    ...foreignToolTurn("1"),
    { role: "user", content: "continue" },
  ];
  assert.equal(claimMuseSession(scope, { input }, candidates).connectionId, owner.connectionId);

  // Chat Completions shape of the same history.
  const messages = [
    {
      role: "assistant",
      tool_calls: [
        { id: "toolu_chat", type: "function", function: { name: "read", arguments: "{}" } },
      ],
    },
    { role: "tool", tool_call_id: "toolu_chat", content: "result" },
  ];
  assert.equal(claimMuseSession(scope, { messages }, candidates).connectionId, owner.connectionId);
});

test("a fresh session adopts plain tool history and keeps account rotation", () => {
  resetOwnership();
  const first = museSessionScope({ session_id: "fresh-plain-1" }, undefined, "client");
  const second = museSessionScope({ session_id: "fresh-plain-2" }, undefined, "client");
  const a = claimMuseSession(first, { input: foreignToolTurn("2") }, candidates);
  const b = claimMuseSession(second, { input: foreignToolTurn("3") }, candidates);
  assert.notEqual(a.connectionId, b.connectionId);
  // The claim is durable: the next turn stays on the same account.
  assert.equal(
    claimMuseSession(first, { input: foreignToolTurn("4") }, candidates).connectionId,
    a.connectionId
  );
});

test("encrypted reasoning and item references stay bound to their issuing session", async () => {
  resetOwnership();
  const fresh = museSessionScope({ session_id: "fresh-opaque" }, undefined, "client");
  for (const body of [
    { input: [...foreignToolTurn("5"), { type: "reasoning", encrypted_content: "foreign" }] },
    { input: [...foreignToolTurn("6"), { type: "item_reference", id: "msg_foreign" }] },
    { input: foreignToolTurn("7"), previous_response_id: "resp_foreign" },
  ]) {
    assert.throws(() => claimMuseSession(fresh, body, candidates), /no recorded owner/);
  }

  const scope = museSessionScope({ session_id: "served-opaque" }, undefined, "client");
  const owner = claimMuseSession(scope, { input: "start" }, candidates);
  const generation = bindMuseGeneration(scope, owner.connectionId, "key-b", "identity-b");
  await serve(scope, generation, [{ type: "message", id: "msg_served" }]);
  assert.throws(
    () =>
      claimMuseSession(
        scope,
        { input: [...foreignToolTurn("8"), { type: "reasoning", encrypted_content: "foreign" }] },
        candidates
      ),
    /encrypted reasoning was not issued/
  );
  assert.throws(
    () =>
      claimMuseSession(
        scope,
        { input: [...foreignToolTurn("9"), { type: "item_reference", id: "msg_foreign" }] },
        candidates
      ),
    /not issued/
  );
  assert.equal(
    claimMuseSession(scope, { input: [{ type: "item_reference", id: "msg_served" }] }, candidates)
      .connectionId,
    owner.connectionId
  );
});

test.after(() => resetDbInstance());
