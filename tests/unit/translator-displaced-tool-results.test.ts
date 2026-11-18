import test from "node:test";
import assert from "node:assert/strict";

// Displaced tool results: clients that steer mid-turn (queued user messages,
// task notifications) can interleave a non-tool message between an assistant
// tool_calls message and part of its results:
//   [assistant(tc:c1,c2), tool(c1), user, tool(c2)]
// Strict upstream validators (DeepSeek V4 thinking confirmed live 2026-11-01,
// "insufficient tool messages following tool_calls message") reject the whole
// request. repairDisplacedToolResults hoists the result back into the turn's
// contiguous run; fixMissingToolResponses (per-id coverage) inserts empty
// results for calls nothing resolves.
const { repairDisplacedToolResults, fixMissingToolResponses } = await import(
  "../../open-sse/translator/helpers/toolCallHelper.ts"
);

const asst = (ids, text = null) => ({
  role: "assistant",
  content: text,
  tool_calls: ids.map((id) => ({
    id,
    type: "function",
    function: { name: "shell", arguments: "{}" },
  })),
});
const tool = (id, content = "result") => ({ role: "tool", tool_call_id: id, content });
const user = (text) => ({ role: "user", content: text });

function runBoth(body) {
  return fixMissingToolResponses(repairDisplacedToolResults(body));
}

test("displaced result is hoisted back into the assistant turn's result run", () => {
  const body = {
    messages: [user("go"), asst(["c1", "c2"]), tool("c1"), user("task notification"), tool("c2"), user("next")],
  };
  const out = runBoth(body).messages;
  // The displaced c2 result moves above the steering user message; the run is
  // contiguous, so no synthetic results are injected.
  assert.deepEqual(
    out.map((m) => m.role),
    ["user", "assistant", "tool", "tool", "user", "user"]
  );
  assert.deepEqual(out.slice(2, 4).map((m) => m.tool_call_id), ["c1", "c2"]);
  assert.equal(out[2].content, "result");
  assert.equal(out[3].content, "result");
});

test("partial coverage: missing id gets an empty result, existing result untouched", () => {
  const body = { messages: [user("go"), asst(["c1", "c2"]), tool("c1"), user("next")] };
  const out = runBoth(body).messages;
  assert.equal(out.length, 5);
  assert.equal(out[2].tool_call_id, "c1");
  assert.equal(out[2].content, "result");
  assert.equal(out[3].tool_call_id, "c2");
  assert.equal(out[3].content, "");
  assert.equal(out[4].role, "user");
});

test("dangling call mid-conversation still gets an empty result", () => {
  const body = { messages: [user("go"), asst(["c1"]), user("next")] };
  const out = runBoth(body).messages;
  assert.equal(out.length, 4);
  assert.equal(out[2].role, "tool");
  assert.equal(out[2].tool_call_id, "c1");
  assert.equal(out[3].role, "user");
});

test("trailing assistant turn gets its pending call closed with an empty result", () => {
  // release/v3.8.53 normalizeTrailingCalls: a trailing pending call gets an
  // empty response so the conversation is complete for the next turn.
  const body = { messages: [user("go"), asst(["c1"])] };
  const out = runBoth(body).messages;
  assert.equal(out.length, 3);
  assert.equal(out[2].role, "tool");
  assert.equal(out[2].tool_call_id, "c1");
  assert.equal(out[2].content, "");
});

test("hoisting never crosses the next assistant message", () => {
  const body = {
    messages: [user("go"), asst(["c1"]), user("steer"), user("later"), asst([], "hi"), tool("c1"), user("next")],
  };
  const out = runBoth(body).messages;
  // The dangling call gets its empty result right after the assistant; the
  // stale result beyond the later assistant stays in place (hoisting never
  // crosses an assistant boundary).
  assert.equal(out[2].role, "tool");
  assert.equal(out[2].tool_call_id, "c1");
  assert.equal(out[2].content, "");
  assert.equal(out[5].role, "assistant");
  assert.equal(out[6].role, "tool");
  assert.equal(out[6].tool_call_id, "c1");
});

test("multiple displaced results hoist in stable relative order", () => {
  const body = {
    messages: [
      user("go"),
      asst(["c1", "c2", "c3"]),
      tool("c1"),
      user("notif one"),
      tool("c3"),
      user("notif two"),
      tool("c2"),
      user("next"),
    ],
  };
  const out = runBoth(body).messages;
  assert.deepEqual(
    out.slice(2, 5).map((m) => (m.role === "tool" ? m.tool_call_id : m.role)),
    ["c1", "c3", "c2"]
  );
  assert.equal(out[5].role, "user");
});

test("Claude-format displaced tool_result user message hoists the same way", () => {
  const claudeAsst = {
    role: "assistant",
    content: [
      { type: "tool_use", id: "c1", name: "shell", input: {} },
      { type: "tool_use", id: "c2", name: "shell", input: {} },
    ],
  };
  const resultCarrier = (id) => ({
    role: "user",
    content: [{ type: "tool_result", tool_use_id: id, content: "r" }],
  });
  const body = {
    messages: [user("go"), claudeAsst, resultCarrier("c1"), user("notif"), resultCarrier("c2"), user("next")],
  };
  const out = runBoth(body).messages;
  // The c2 carrier hoists above the notification; no synthetic result needed.
  assert.deepEqual(
    out.slice(2, 5).map((m) => m.role),
    ["user", "user", "user"]
  );
  const ids = out.slice(2, 5).map((m) => m.content?.[0]?.tool_use_id);
  assert.deepEqual(ids, ["c1", "c2", undefined]);
});

test("fully-paired conversation is a no-op", () => {
  const body = { messages: [user("go"), asst(["c1"]), tool("c1"), user("next")] };
  const before = JSON.stringify(body.messages);
  const out = runBoth(body).messages;
  assert.equal(JSON.stringify(out), before);
});
