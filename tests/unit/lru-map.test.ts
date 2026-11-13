import test from "node:test";
import assert from "node:assert/strict";

const { lruMap } = await import("../../open-sse/utils/lruMap.ts");

test("lruMap drops the least recently used key past the cap", () => {
  const m = lruMap<number>(2);
  m.set("a", 1);
  m.set("b", 2);
  assert.equal(m.get("a"), 1); // a is now newest
  m.set("c", 3);
  assert.equal(m.get("b"), undefined);
  assert.equal(m.get("a"), 1);
  assert.equal(m.get("c"), 3);
  assert.equal(m.size, 2);
});

test("lruMap overwrite keeps one entry and clear empties it", () => {
  const m = lruMap<number>(2);
  m.set("a", 1);
  m.set("a", 2);
  assert.equal(m.size, 1);
  assert.equal(m.get("a"), 2);
  m.clear();
  assert.equal(m.size, 0);
});

test("lruMap iterates entries without refreshing recency", () => {
  const m = lruMap<number>(2);
  m.set("a", 1);
  m.set("b", 2);
  assert.deepEqual(
    [...m],
    [
      ["a", 1],
      ["b", 2],
    ]
  );
  m.set("c", 3); // a is still the oldest: iteration did not touch it
  assert.equal(m.get("a"), undefined);
});
