/**
 * The signed-thinking store caps what one connection may hold (turns, blocks per turn, chars)
 * and evicts whole turns, so a runaway session cannot push out the signed blocks of other
 * connections and a tool turn never keeps only some of its signed blocks.
 */
import test from "node:test";
import assert from "node:assert/strict";

const store = await import("../../open-sse/services/claudeThinkingStore.ts");

const PROVIDER = "claude";
const MODEL = "claude-sonnet-4-5";

function turn(toolUseIds: string[], thinking = "t") {
  return toolUseIds.flatMap((id) => [
    { type: "thinking", thinking, signature: `sig-${id}` },
    { type: "tool_use", id, name: "read_file", input: {} },
  ]);
}
function put(connectionId: string, toolUseIds: string[], thinking?: string) {
  return store.storeClaudeThinkingBlocks({
    content: turn(toolUseIds, thinking),
    provider: PROVIDER,
    model: MODEL,
    connectionId,
  });
}
function has(connectionId: string, toolUseId: string) {
  return (
    store.restoreClaudeThinkingBlocks({
      toolUseIds: [toolUseId],
      provider: PROVIDER,
      model: MODEL,
      connectionId,
    }) !== null
  );
}

test.beforeEach(() => store.clearClaudeThinkingStore());

test("turns within the caps all stay restorable", () => {
  for (let i = 0; i < 256; i += 1) assert.equal(put("conn-a", [`toolu_ok_${i}`]), true);
  for (let i = 0; i < 256; i += 1) assert.equal(has("conn-a", `toolu_ok_${i}`), true);
});

test("one connection keeps at most 256 turns, oldest evicted first", () => {
  for (let i = 0; i < 260; i += 1) put("conn-a", [`toolu_turn_${i}`]);
  for (let i = 0; i < 4; i += 1) assert.equal(has("conn-a", `toolu_turn_${i}`), false, `turn ${i}`);
  for (let i = 4; i < 260; i += 1)
    assert.equal(has("conn-a", `toolu_turn_${i}`), true, `turn ${i}`);
});

test("a flood on one connection does not evict another connection's turn", () => {
  put("conn-b", ["toolu_other_connection"]);
  for (let i = 0; i < 1100; i += 1) put("conn-a", [`toolu_flood_${i}`]);
  assert.equal(has("conn-b", "toolu_other_connection"), true);
});

test("one connection keeps at most 16 MiB, oldest turn evicted first", () => {
  const big = "x".repeat(Math.floor(1.9 * 1024 * 1024));
  for (let i = 0; i < 9; i += 1) assert.equal(put("conn-a", [`toolu_big_${i}`], big), true);
  assert.equal(has("conn-a", "toolu_big_0"), false);
  for (let i = 1; i < 9; i += 1) assert.equal(has("conn-a", `toolu_big_${i}`), true, `big ${i}`);
});

test("a turn with more than 512 signed blocks is not stored at all", () => {
  const ids = (n: number) => Array.from({ length: n }, (_, i) => `toolu_many_${n}_${i}`);
  assert.equal(put("conn-a", ids(513)), false);
  assert.equal(has("conn-a", "toolu_many_513_0"), false);
  assert.equal(put("conn-a", ids(512)), true);
  assert.equal(has("conn-a", "toolu_many_512_511"), true);
});

test("the global cap counts turns, and a turn leaves whole, never one tool_use id of it", () => {
  // 1001 two-call turns on separate connections: one turn too many for the 1000-turn cap.
  for (let i = 0; i < 1001; i += 1) put(`conn-fill-${i}`, [`toolu_a_${i}`, `toolu_b_${i}`]);
  assert.equal(has("conn-fill-0", "toolu_a_0"), false);
  assert.equal(has("conn-fill-0", "toolu_b_0"), false);
  assert.equal(has("conn-fill-1", "toolu_a_1"), true);
  assert.equal(has("conn-fill-1", "toolu_b_1"), true);
  assert.equal(has("conn-fill-1000", "toolu_b_1000"), true);
});
