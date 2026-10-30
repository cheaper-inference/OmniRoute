import test from "node:test";
import assert from "node:assert/strict";

const { watchStream } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/watchStream.ts");
const { watchCounter, watchSlot } =
  await import("../../../src/app/(dashboard)/dashboard/grok-bot/overlap.ts");

function readerFrames(frames: unknown[], failAt?: number) {
  let index = 0;
  return async function* () {
    for (const frame of frames) {
      if (failAt !== undefined && index === failAt) throw new Error("upstream");
      index += 1;
      yield frame;
    }
  };
}

async function text(stream: ReadableStream<Uint8Array>): Promise<string> {
  const chunks: string[] = [];
  const decoder = new TextDecoder();
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(decoder.decode(value, { stream: true }));
  }
  return chunks.join("");
}

test("each upstream frame becomes one server-sent event", async () => {
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "7",
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ seq: "8" }, { heartbeat: true }]),
      pressure: () => "read",
    })
  );
  assert.equal(body, 'data: {"seq":"8"}\n\ndata: {"heartbeat":true}\n\n');
});

test("an upstream failure is reported as the route's error frame, not as a broken stream", async () => {
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ seq: "1" }, { seq: "2" }], 1),
      pressure: () => "read",
    })
  );
  assert.match(body, /^data: \{"seq":"1"\}\n\n/);
  assert.match(body, /event: error/);
});

test("the watch slot is given back when the consumer cancels", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-1") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    signal: new AbortController().signal,
    release,
    frames: readerFrames([{ seq: "1" }, { seq: "2" }]),
    pressure: () => "read",
  });
  await stream.cancel();
  await stream.cancel();
  assert.equal(watches.size("conn-1"), 0, "a cancelled watch frees its slot once");
});

test("cancelling a stalled watch frees its slot", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-stalled") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    signal: new AbortController().signal,
    release,
    // The upstream sends one frame and then goes quiet. Nothing else can free
    // the slot, so only the consumer's cancel can.
    frames: async function* () {
      yield { seq: "1" };
      await new Promise(() => {});
    },
    pressure: () => "read",
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(watches.size("conn-stalled"), 1, "the watch holds its slot while streaming");
  await stream.cancel();
  assert.equal(watches.size("conn-stalled"), 0, "cancelling gives the slot back");
});

test("a queue that stays full aborts the upstream watch and fails the stream", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-1") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    signal: new AbortController().signal,
    release,
    frames: readerFrames([{ seq: "1" }]),
    pressure: () => "abort",
  });
  await assert.rejects(() => text(stream), /downstream stalled/);
  assert.equal(watches.size("conn-1"), 0, "a stalled watch frees its slot");
});

test("a pause holds the loop and then delivers the frames", async () => {
  const answers: Array<"read" | "pause" | "abort"> = ["pause", "read", "read"];
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ seq: "1" }]),
      pressure: () => answers.shift() ?? "read",
    })
  );
  assert.equal(body, 'data: {"seq":"1"}\n\n');
});

test("the abort listener is removed once the stream ends", async () => {
  const controller = new AbortController();
  const signal = controller.signal;
  let added = 0;
  let removed = 0;
  const add = signal.addEventListener.bind(signal);
  const remove = signal.removeEventListener.bind(signal);
  signal.addEventListener = ((...args: Parameters<typeof add>) => {
    if (args[0] === "abort") added += 1;
    return add(...args);
  }) as typeof signal.addEventListener;
  signal.removeEventListener = ((...args: Parameters<typeof remove>) => {
    if (args[0] === "abort") removed += 1;
    return remove(...args);
  }) as typeof signal.removeEventListener;
  await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      signal,
      release: () => {},
      frames: readerFrames([{ seq: "1" }]),
      pressure: () => "read",
    })
  );
  assert.equal(added, 1);
  assert.equal(removed, 1, "a finished watch leaves no abort listener behind");
});
