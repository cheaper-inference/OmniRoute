import test from "node:test";
import assert from "node:assert/strict";

const { AsyncEventQueue } = await import("../../open-sse/vendor/codex-chatgpt-web/event-queue.ts");

type Ev = { type: string; text?: string; phase?: string; arguments?: string; message?: string };

async function drain(queue: InstanceType<typeof AsyncEventQueue<Ev>>): Promise<Ev[]> {
  queue.close();
  return queue.collect();
}

test("adjacent small text deltas of the same phase merge in the backlog", async () => {
  const queue = new AsyncEventQueue<Ev>();
  for (let i = 0; i < 200; i += 1)
    queue.push({ type: "text_delta", text: "ab", phase: "final_answer" });
  const events = await drain(queue);
  assert.equal(events.length, 1);
  assert.equal(events[0].text, "ab".repeat(200));
});

test("text deltas never merge across a phase or a tool boundary", async () => {
  const queue = new AsyncEventQueue<Ev>();
  queue.push({ type: "text_delta", text: "a", phase: "commentary" });
  queue.push({ type: "text_delta", text: "b", phase: "final_answer" });
  queue.push({ type: "tool_call_start", message: "t" });
  queue.push({ type: "text_delta", text: "c", phase: "final_answer" });
  queue.push({ type: "tool_call_end" });
  queue.push({ type: "text_delta", text: "d", phase: "final_answer" });
  const events = await drain(queue);
  assert.deepEqual(
    events.map((e) => e.text ?? e.type),
    ["a", "b", "tool_call_start", "c", "tool_call_end", "d"]
  );
});

test("a merged delta stops growing at the coalesce limit", async () => {
  const queue = new AsyncEventQueue<Ev>();
  const chunk = "x".repeat(40_000);
  for (let i = 0; i < 4; i += 1)
    queue.push({ type: "text_delta", text: chunk, phase: "final_answer" });
  const events = await drain(queue);
  assert.ok(events.length >= 2, "events beyond 64 Ki code units must not merge");
  assert.ok(events.every((e) => (e.text?.length ?? 0) <= 65_536));
  assert.equal(events.map((e) => e.text).join(""), chunk.repeat(4));
});

test("the backlog is capped by retained characters, not only by event count", () => {
  const queue = new AsyncEventQueue<Ev>(10_000, 1_000);
  // Alternate phases so no two events merge.
  queue.push({ type: "text_delta", text: "x".repeat(600), phase: "commentary" });
  assert.throws(
    () => queue.push({ type: "text_delta", text: "y".repeat(600), phase: "final_answer" }),
    /Adapter event backlog exceeded/
  );
});

test("a consumed event frees its share of the character budget", async () => {
  const queue = new AsyncEventQueue<Ev>(10_000, 1_000);
  const iterator = queue[Symbol.asyncIterator]();
  queue.push({ type: "text_delta", text: "x".repeat(600), phase: "commentary" });
  await iterator.next();
  queue.push({ type: "text_delta", text: "y".repeat(600), phase: "final_answer" });
  queue.close();
  const rest = await queue.collect();
  assert.equal(rest.length, 1);
});

test("a terminal error still fits after the backlog overflows", async () => {
  const queue = new AsyncEventQueue<Ev>(10_000, 1_000);
  queue.push({ type: "text_delta", text: "x".repeat(900), phase: "commentary" });
  assert.throws(() =>
    queue.push({ type: "text_delta", text: "y".repeat(900), phase: "final_answer" })
  );
  queue.push({ type: "error", message: "Adapter event backlog exceeded" });
  const events = await drain(queue);
  assert.equal(events.at(-1)?.type, "error");
});

test("merging deltas does not leak character budget across consumed events", async () => {
  const queue = new AsyncEventQueue<Ev>(10_000, 2_000);
  const iterator = queue[Symbol.asyncIterator]();
  for (let round = 0; round < 50; round += 1) {
    for (let i = 0; i < 10; i += 1) {
      queue.push({ type: "text_delta", text: "x".repeat(50), phase: "final_answer" });
    }
    const { value } = await iterator.next();
    assert.equal(value?.text?.length, 500);
  }
});
