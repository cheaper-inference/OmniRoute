import assert from "node:assert/strict";
import { test } from "node:test";
import {
  emptyPresence,
  readPresence,
  statusOf,
  STALE_AFTER_MS,
} from "../../../src/app/(dashboard)/dashboard/grok-bot/presence";

const frame = (live: unknown) => ({ agentState: { live } });

test("a bot that reports itself running is working", () => {
  const seen = readPresence(frame([{ agentId: "a", isRunning: true }]), 1_000);
  assert.deepEqual(seen.running, ["a"]);
  assert.equal(seen.lastLiveAtMs, 1_000);
});

test("a live entry without the running flag is not working", () => {
  const seen = readPresence(frame([{ agentId: "a" }]), 1_000);
  assert.deepEqual(seen.running, []);
  assert.equal(statusOf({ ...emptyPresence(), ...seen }, 1_000), "idle");
});

test("a stream that never delivered a live frame has no status", () => {
  assert.equal(statusOf(emptyPresence(), 5_000), "stale");
});

test("the status goes stale once the live frames stop for ninety seconds", () => {
  const seen = readPresence(frame([]), 1_000);
  const presence = { ...emptyPresence(), ...seen };
  assert.equal(statusOf(presence, 1_000 + STALE_AFTER_MS - 1), "idle");
  assert.equal(statusOf(presence, 1_000 + STALE_AFTER_MS), "stale");
});

test("the box run state is read from the same frame", () => {
  const seen = readPresence({ boxState: { state: { runState: "RUNNING" } } }, 1_000);
  assert.equal(seen.runState, "RUNNING");
  assert.equal(seen.lastLiveAtMs, undefined);
});

test("a frame that is not an object says nothing", () => {
  assert.deepEqual(readPresence("nonsense", 1_000), {});
  assert.deepEqual(readPresence(null, 1_000), {});
});

test("another bot working does not make the one on screen busy", () => {
  const seen = readPresence(frame([{ agentId: "b", isRunning: true }]), 1_000);
  const presence = { ...emptyPresence(), ...seen };
  assert.equal(statusOf(presence, 1_000, "a"), "idle");
  assert.equal(statusOf(presence, 1_000, "b"), "running");
});

test("a bot whose subagents are working is working, even while it says nothing", () => {
  // Measured: on a long task isRunning is absent from every frame for minutes
  // while hasRunningSubagents stays true.
  const seen = readPresence(frame([{ agentId: "a", hasRunningSubagents: true }]), 1_000);
  const presence = { ...emptyPresence(), ...seen };
  assert.deepEqual(presence.subagents, ["a"]);
  assert.equal(statusOf(presence, 1_000, "a"), "running");
});

test("the frame states how long a quiet stream stays trustworthy", () => {
  const seen = readPresence(frame([{ agentId: "a", staleAfterMs: 5_000 }]), 1_000);
  const presence = { ...emptyPresence(), ...seen };
  assert.equal(presence.staleAfterMs, 5_000);
  assert.equal(statusOf(presence, 5_000, "a"), "idle");
  assert.equal(statusOf(presence, 6_000, "a"), "stale");
});

test("a connected but quiet bot reads idle, not unknown", () => {
  // One frame with bot activity, then a long run of frames without any: the
  // stream is alive, so the window is measured from the last frame, not from
  // the last time the bot itself did something.
  let presence = { ...emptyPresence(), ...readPresence(frame([{ agentId: "a" }]), 1_000) };
  assert.equal(statusOf(presence, 2_000, "a"), "idle");
  presence = { ...presence, ...readPresence({ rows: { entries: [] } }, 80_000) };
  assert.equal(statusOf(presence, 100_000, "a"), "idle", "80s of quiet frames is alive");
  presence = { ...presence, ...readPresence({ rows: { entries: [] } }, 180_000) };
  assert.equal(statusOf(presence, 280_000, "a"), "stale", "no frame for 100s is not");
});
