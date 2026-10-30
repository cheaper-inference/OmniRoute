import assert from "node:assert/strict";
import { test } from "node:test";
import { watchCounter, watchOverlap, watchSlot } from "../../../src/app/(dashboard)/dashboard/grok-bot/overlap";

test("a second watch is kept until the new one seals", () => {
  assert.equal(watchOverlap(1), "keep");
});

test("a third watch is refused", () => {
  assert.equal(watchOverlap(2), "refuse");
});

test("the first watch is always kept", () => {
  assert.equal(watchOverlap(0), "keep");
});

test("a second watch on one connection is kept and a third refused", () => {
  const watches = watchCounter();
  assert.equal(watches.open("conn-1"), "keep");
  assert.equal(watches.open("conn-1"), "keep");
  assert.equal(watches.open("conn-1"), "refuse");
  assert.equal(watches.size("conn-1"), 2);
});

test("closing a watch frees the slot", () => {
  const watches = watchCounter();
  watches.open("conn-1");
  watches.open("conn-1");
  watches.close("conn-1");
  assert.equal(watches.open("conn-1"), "keep");
});

test("one connection's watches do not count against another's", () => {
  const watches = watchCounter();
  watches.open("conn-1");
  watches.open("conn-1");
  assert.equal(watches.open("conn-2"), "keep");
});

test("a slot taken twice is given up once", () => {
  const watches = watchCounter();
  const first = watchSlot(watches, "conn-1");
  const second = watchSlot(watches, "conn-1");
  assert.ok(first && second);
  first();
  first();
  assert.equal(watches.size("conn-1"), 1);
  second();
  assert.equal(watches.size("conn-1"), 0);
});

test("a refused slot returns nothing to release", () => {
  const watches = watchCounter();
  watchSlot(watches, "conn-1");
  watchSlot(watches, "conn-1");
  assert.equal(watchSlot(watches, "conn-1"), null);
  assert.equal(watches.size("conn-1"), 2);
});
