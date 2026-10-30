import assert from "node:assert/strict";
import { test } from "node:test";
import {
  FLAP_MS,
  HOLD_LIMIT,
  LIVE_FAILS,
  LIVE_FLAPS,
  LIVE_RAPID,
  RAPID_GAP_MS,
  SNAPSHOT_DROPS,
  idle,
  isTerminal,
  reduce,
  type SessionEvent,
  type SessionState,
} from "../../../src/app/(dashboard)/dashboard/grok-bot/session";

const close = (livedMs = 5_000, nowMs = 1_000): SessionEvent => ({
  type: "close",
  livedMs,
  nowMs,
});

function fold(events: SessionEvent[], from: SessionState = idle()): SessionState {
  return events.reduce(reduce, from);
}

const streaming = () => fold([{ type: "select" }, { type: "cutover" }]);

test("a selection opens, seals and then streams", () => {
  assert.equal(fold([{ type: "select" }, { type: "frame" }, { type: "cutover" }]).phase, "streaming");
});

test("a conversation restored from memory starts live instead of waiting for a seal", () => {
  const state = fold([{ type: "select", resume: "live" }]);
  assert.equal(state.phase, "streaming");
  // and it does not start counting snapshot drops, which is what pinned it before
  assert.equal(fold([close(), close(), close()], state).phase, "streaming");
});

test("the snapshot is given three drops before it is called stuck", () => {
  assert.equal(fold([{ type: "select" }, close()]).phase, "opening");
  assert.equal(fold([{ type: "select" }, close(), close()]).phase, "opening");
  assert.deepEqual(fold([{ type: "select" }, close(), close(), close()]), { phase: "stalled" });
});

test("six attempts that deliver nothing end the stream", () => {
  let state = streaming();
  for (let i = 0; i < LIVE_FAILS; i += 1) state = reduce(state, close(5_000, 1_000 + i * 20_000));
  assert.deepEqual(state, { phase: "lost", reason: "failures" });
});

test("six sub-second attempts end the stream", () => {
  // Frames keep the failure run at zero and the wide spacing keeps the rapid
  // count at zero, so flaps is the counter under test on its own.
  let state = streaming();
  for (let i = 0; i < LIVE_FLAPS; i += 1) {
    state = reduce(state, { type: "frame" });
    state = reduce(state, close(FLAP_MS - 1, 1_000 + i * 20_000));
  }
  assert.deepEqual(state, { phase: "lost", reason: "flaps" });
});

test("a stream that delivers a frame and hangs up at once still terminates", () => {
  // The exact shape neither of the other two counters can see: the frame clears
  // the failure count and the life clears the flap count, every single time.
  let state = streaming();
  let now = 1_000;
  for (let i = 0; i < LIVE_RAPID; i += 1) {
    state = reduce(state, { type: "frame" });
    state = reduce(state, close(1_500, now));
    now += 1_500 + 1_000;
  }
  assert.deepEqual(state, { phase: "lost", reason: "rapid" });
});

test("a server that closes the watch every fifteen seconds is not a fault", () => {
  // Measured behaviour: while the bot works the watch is terminated about every
  // fifteen seconds and reconnecting is the intended path.
  let state = streaming();
  let now = 1_000;
  for (let i = 0; i < 40; i += 1) {
    state = reduce(state, { type: "frame" });
    state = reduce(state, close(15_000, now));
    now += 15_000 + 1_000;
  }
  assert.equal(state.phase, "streaming");
});

test("closes further apart than the gap reset the rapid count", () => {
  let state = streaming();
  let now = 1_000;
  for (let i = 0; i < LIVE_RAPID - 1; i += 1) {
    state = reduce(state, { type: "frame" });
    state = reduce(state, close(1_500, (now += 1_500)));
  }
  assert.equal(state.phase, "streaming");
  now += RAPID_GAP_MS;
  state = reduce(state, { type: "frame" });
  state = reduce(state, close(1_500, now));
  assert.equal(state.phase, "streaming");
});

test("a healthy stream stays where it is however many frames arrive", () => {
  const state = fold(
    Array.from({ length: 500 }, () => ({ type: "frame" }) as SessionEvent),
    streaming()
  );
  assert.equal(state.phase, "streaming");
});

test("a handler fault ends the stream at once", () => {
  assert.deepEqual(fold([{ type: "select" }, { type: "cutover" }, { type: "fault" }]), {
    phase: "lost",
    reason: "fault",
  });
});

test("a terminal state absorbs every event but a selection", () => {
  const events: SessionEvent[] = [
    { type: "frame" },
    { type: "cutover" },
    close(),
    close(1),
    { type: "fault" },
  ];
  for (const terminal of [
    fold([{ type: "select" }, close(), close(), close()]),
    fold([{ type: "select" }, { type: "cutover" }, { type: "fault" }]),
  ]) {
    assert.ok(isTerminal(terminal));
    let state = terminal;
    for (let round = 0; round < 100; round += 1) {
      for (const event of events) {
        state = reduce(state, event);
        assert.deepEqual(state, terminal, `${terminal.phase} leaked on ${event.type}`);
      }
    }
  }
});

test("selecting again clears whatever the terminal state was counting", () => {
  const stuck = fold([{ type: "select" }, close(), close(), close()]);
  assert.deepEqual(reduce(stuck, { type: "select" }), { phase: "opening", drops: 0, holds: 0 });
  const lost = fold([{ type: "select" }, { type: "cutover" }, { type: "fault" }]);
  assert.equal(reduce(lost, { type: "select", resume: "live" }).phase, "streaming");
});

test("nothing happens before a selection", () => {
  for (const event of [
    { type: "frame" },
    { type: "cutover" },
    close(),
    { type: "fault" },
  ] as SessionEvent[]) {
    assert.deepEqual(reduce(idle(), event), { phase: "idle" });
  }
});

test("every state answers every event, so no later state can fall through", () => {
  const states: SessionState[] = [
    idle(),
    { phase: "opening", drops: 0, holds: 0 },
    { phase: "opening", drops: SNAPSHOT_DROPS - 1, holds: 0 },
    { phase: "streaming", fails: 0, flaps: 0, rapid: 0, holds: 0, lastCloseAtMs: 0 },
    { phase: "streaming", fails: LIVE_FAILS - 1, flaps: LIVE_FLAPS - 1, rapid: LIVE_RAPID - 1, holds: 0, lastCloseAtMs: 500 },
    { phase: "stalled" },
    { phase: "lost", reason: "fault" },
  ];
  const events: SessionEvent[] = [
    { type: "select" },
    { type: "frame" },
    { type: "cutover" },
    close(),
    close(FLAP_MS),
    { type: "fault" },
  ];
  for (const state of states) {
    for (const event of events) {
      assert.ok(reduce(state, event).phase, `${state.phase} + ${event.type} produced nothing`);
    }
  }
});

test("a refusal to admit the watch is bounded without spending the snapshot budget", () => {
  let state: SessionState = { phase: "opening", drops: 0, holds: 0 };
  for (let i = 0; i < HOLD_LIMIT - 1; i += 1) state = reduce(state, { type: "hold" });
  assert.equal(state.phase, "opening", "a short conflict must not stop the conversation");
  state = reduce(state, { type: "hold" });
  assert.deepEqual(state, { phase: "stalled" });
});

test("a refusal on a live stream ends it as refused, not as a dead stream", () => {
  let state = streaming();
  for (let i = 0; i < HOLD_LIMIT - 1; i += 1) state = reduce(state, { type: "hold" });
  assert.equal(state.phase, "streaming");
  assert.deepEqual(reduce(state, { type: "hold" }), { phase: "lost", reason: "refused" });
});

test("a frame clears the refusal count, so a conflict that passes leaves no trace", () => {
  let state = streaming();
  for (let i = 0; i < HOLD_LIMIT - 1; i += 1) state = reduce(state, { type: "hold" });
  state = reduce(state, { type: "frame" });
  for (let i = 0; i < HOLD_LIMIT - 1; i += 1) state = reduce(state, { type: "hold" });
  assert.equal(state.phase, "streaming");
});

test("rows arriving during the snapshot keep it from being called unstartable", () => {
  // Three closes only mean "cannot start" if nothing ever arrived.
  let state: SessionState = { phase: "opening", drops: 0, holds: 0 };
  for (let i = 0; i < SNAPSHOT_DROPS + 2; i += 1) {
    state = reduce(state, close());
    state = reduce(state, { type: "frame" });
  }
  assert.equal(state.phase, "opening", "a snapshot delivering rows is starting, not failing");
});
