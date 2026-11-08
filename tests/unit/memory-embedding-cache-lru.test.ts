import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { get, invalidate, set } from "../../src/lib/memory/embedding/cache";

const vec = (n: number) => new Float32Array([n]);
const dateNow = Date as unknown as { now: () => number };

describe("memory-embedding-cache least-recently-used eviction", () => {
  const origMax = process.env.MEMORY_EMBEDDING_CACHE_MAX;
  const origNow = Date.now;

  beforeEach(() => {
    process.env.MEMORY_EMBEDDING_CACHE_MAX = "2";
    invalidate();
  });

  afterEach(() => {
    dateNow.now = origNow;
    if (origMax === undefined) delete process.env.MEMORY_EMBEDDING_CACHE_MAX;
    else process.env.MEMORY_EMBEDDING_CACHE_MAX = origMax;
    invalidate();
  });

  it("a hit protects its entry: set A, set B, get A, set C evicts B", () => {
    set("A", vec(1));
    set("B", vec(2));
    assert.ok(get("A"));
    set("C", vec(3));

    assert.ok(get("A"), "recently read entry stays");
    assert.equal(get("B"), undefined, "least recently used entry is evicted");
    assert.ok(get("C"));
  });

  it("a hit does not extend the TTL of its entry", () => {
    dateNow.now = () => 0;
    set("A", vec(1));
    dateNow.now = () => 200_000;
    assert.ok(get("A"));
    dateNow.now = () => 360_000;
    assert.equal(get("A"), undefined, "TTL still counts from the original set");
  });
});
