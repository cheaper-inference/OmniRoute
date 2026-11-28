import test from "node:test";
import assert from "node:assert/strict";

const { nextTranscriptRequest } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/transcript.ts");

const wire = (entryKind: string, message: unknown, updatedSeq: string) => ({
  seq: updatedSeq,
  entryKind,
  entryId: `e${updatedSeq}`,
  updatedSeq,
  body: Buffer.from(JSON.stringify(message), "utf-8").toString("base64"),
});

// Reply rows arrive as entryKind "send-message" with the text inside `message`;
// the user's own row comes back as entryKind "message" carrying role and nonce.
const reply = (text: string) => ({ message: { type: "text", content: text } });
const echo = (text: string, nonce = "") => ({
  role: "user",
  content: text,
  clientNonce: nonce,
  isStreaming: false,
});

test("the first heartbeat ends the snapshot and the next request uses its cursor", () => {
  const snapshot = { phase: "snapshot", after: "0" };
  const replay = nextTranscriptRequest(snapshot, {
    replay: true,
    rows: { entries: [{ updatedSeq: "10" }] },
  });
  assert.deepEqual(replay, {
    phase: "snapshot",
    after: "10",
    stop: false,
    visible: [],
    cards: [{ seq: "10", entryId: "", kind: "unknown", type: "oversize" }],
    permissions: [],
    historyUnavailable: false,
    deleted: [],
    cleared: false,
    halt: false,
    turnFailure: undefined,
  });

  const cutover = nextTranscriptRequest(replay, { heartbeat: true });
  assert.deepEqual(cutover, {
    phase: "live",
    after: "10",
    stop: true,
    visible: [],
    cards: [],
    permissions: [],
    historyUnavailable: false,
    deleted: [],
    cleared: false,
    halt: false,
    turnFailure: undefined,
  });
});

test("replay on the live stream is shown", () => {
  const live = { phase: "live", after: "10" };
  const next = nextTranscriptRequest(live, {
    replay: true,
    rows: { entries: [wire("send-message", reply("missed"), "11")] },
  });
  assert.equal(next.stop, false);
  assert.deepEqual(next.visible, [
    {
      seq: "11",
      entryId: "e11",
      role: "assistant",
      text: "missed",
      clientNonce: "",
      streaming: false,
    },
  ]);
});

test("the seal hands over the rows the snapshot collected", () => {
  // The regression this guards is the bug itself: the sealing frame used to
  // return an empty list, so a freshly opened conversation stayed blank.
  const state = nextTranscriptRequest(
    { phase: "snapshot", after: "0" },
    {
      rows: {
        entries: [wire("send-message", reply("hello"), "7"), wire("message", echo("hi"), "8")],
      },
      heartbeat: true,
    }
  );
  assert.equal(state.stop, true);
  assert.deepEqual(state.visible, [
    {
      seq: "7",
      entryId: "e7",
      role: "assistant",
      text: "hello",
      clientNonce: "",
      streaming: false,
    },
    { seq: "8", entryId: "e8", role: "user", text: "hi", clientNonce: "", streaming: false },
  ]);
});

test("a refused history without a generation keeps the old cursor", () => {
  const state = nextTranscriptRequest(
    { phase: "snapshot", after: "40", generation: 2 },
    { cursorTooOld: { agentId: "c7fbc519-6499-4d7e-a75a-55813760617d" } }
  );
  assert.equal(state.after, "40");
  assert.equal(state.generation, 2);
  assert.equal(state.stop, true);
  assert.equal(state.halt, true);
  assert.equal(state.historyUnavailable, false);
});
