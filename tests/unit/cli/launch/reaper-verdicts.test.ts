// Tests for the pure stop/detach decisions of the gateway reaper (core/reaper.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";

import { idleVerdict, recordVerdict } from "../../../../bin/cli/launch/core/reaper.mjs";

const GEN = "gen-1";

test("recordVerdict detaches when the record is missing", () => {
  assert.equal(recordVerdict(null, GEN), "record gone, detaching");
});

test("recordVerdict detaches when the record belongs to another generation", () => {
  assert.equal(
    recordVerdict({ generation: "other", state: "ready" }, GEN),
    "record gone, detaching"
  );
});

test("recordVerdict detaches from a kept gateway", () => {
  assert.equal(recordVerdict({ generation: GEN, state: "kept" }, GEN), "kept, detaching");
});

test("recordVerdict returns null for a live record that is ours", () => {
  for (const state of ["starting", "ready", "stopping"]) {
    assert.equal(recordVerdict({ generation: GEN, state }, GEN), null, state);
  }
});

test("idleVerdict never counts leases for a record that is gone or kept", () => {
  const countLeases = () => {
    throw new Error("must not be called");
  };
  assert.equal(idleVerdict(null, GEN, countLeases), "record gone, detaching");
  assert.equal(
    idleVerdict({ generation: "other", state: "ready" }, GEN, countLeases),
    "record gone, detaching"
  );
  assert.equal(
    idleVerdict({ generation: GEN, state: "kept" }, GEN, countLeases),
    "kept, detaching"
  );
});

test("idleVerdict is busy while leases hold the gateway", () => {
  let calls = 0;
  const verdict = idleVerdict({ generation: GEN, state: "ready" }, GEN, () => {
    calls++;
    return 2;
  });
  assert.equal(verdict, "busy");
  assert.equal(calls, 1);
});

test("idleVerdict stops an idle gateway with zero leases", () => {
  assert.equal(
    idleVerdict({ generation: GEN, state: "ready" }, GEN, () => 0),
    "stop"
  );
});
