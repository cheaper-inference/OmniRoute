import test from "node:test";
import assert from "node:assert/strict";

const { watchStream, pumpWatch, safeBlobUrl } =
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
      generation: 0,
      signal: new AbortController().signal,
      release: () => {},
      streamId: "test-stream",
      frames: readerFrames([{ seq: "8" }, { heartbeat: true }]),
      pressure: () => "read",
    })
  );
  assert.equal(
    body,
    'event: connected\ndata: {"streamId":"test-stream"}\n\nevent: frame\ndata: {"seq":"8"}\n\nevent: frame\ndata: {"heartbeat":true}\n\n'
  );
});

test("a missing generation does not open the upstream watch", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-missing") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    signal: new AbortController().signal,
    release,
    frames: async function* () {
      throw new Error("upstream opened");
    },
  });
  await assert.rejects(() => text(stream), /generation required/);
  assert.equal(watches.size("conn-missing"), 0);
});

test("the upstream watch uses the requested generation", async () => {
  let generation: unknown;
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 9,
      signal: new AbortController().signal,
      release: () => {},
      frames: async function* (input) {
        generation = (input.payload.cursors as Array<{ generation?: unknown }>)[0]?.generation;
        yield { heartbeat: true };
      },
      pressure: () => "read",
    })
  );
  assert.match(body, /"heartbeat":true/);
  assert.equal(generation, 9);
});

test("a pause timer cannot pull another frame after cancel", async () => {
  const seen: unknown[] = [];
  const upstream = new AbortController();
  const frames = (async function* () {
    yield { seq: "1" };
    await new Promise<void>((resolve) =>
      upstream.signal.addEventListener("abort", () => resolve())
    );
    seen.push("late");
    yield { seq: "2" };
  })();
  const controller = {
    enqueue() {},
    error() {},
  } as unknown as ReadableStreamDefaultController<Uint8Array>;
  const running = pumpWatch({
    frames,
    controller,
    upstream,
    pressure: () => "pause",
    streamId: "pause",
  });
  await new Promise((resolve) => setTimeout(resolve, 20));
  upstream.abort();
  await running;
  assert.deepEqual(seen, []);
});

test("a frames factory failure releases its slot and aborts upstream", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-factory") ?? (() => {});
  const upstream = new AbortController();
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    generation: 0,
    signal: new AbortController().signal,
    release,
    frames: (input) => {
      input.signal?.addEventListener("abort", () => upstream.abort());
      throw new Error("factory failed");
    },
  });
  await assert.rejects(() => text(stream), /factory failed/);
  assert.equal(watches.size("conn-factory"), 0);
  assert.equal(upstream.signal.aborted, true);
});

test("an upstream failure is reported as the route's error frame, not as a broken stream", async () => {
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 0,
      signal: new AbortController().signal,
      release: () => {},
      streamId: "test-stream",
      frames: readerFrames([{ seq: "1" }, { seq: "2" }], 1),
      pressure: () => "read",
    })
  );
  assert.match(body, /event: frame\ndata: \{"seq":"1"\}\n\n/);
  assert.match(body, /event: terminal/);
  assert.match(body, /"code":"unknown"/);
  assert.match(body, /"streamId":"test-stream"/);
});

test("the watch slot is given back when the consumer cancels", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-1") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    generation: 0,
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
  let upstreamSignal: AbortSignal | undefined;
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    generation: 0,
    signal: new AbortController().signal,
    release,
    // The upstream sends one frame and then goes quiet. Nothing else can free
    // the slot, so only the consumer's cancel can.
    frames: async function* (input) {
      upstreamSignal = input.signal;
      yield { seq: "1" };
      await new Promise(() => {});
    },
    pressure: () => "read",
  });
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(watches.size("conn-stalled"), 1, "the watch holds its slot while streaming");
  await stream.cancel();
  assert.equal(watches.size("conn-stalled"), 0, "cancelling gives the slot back");
  assert.equal(upstreamSignal?.aborted, true, "cancelling also aborts the upstream watch");
});

test("a queue that stays full aborts the upstream watch and fails the stream", async () => {
  const watches = watchCounter();
  const release = watchSlot(watches, "conn-1") ?? (() => {});
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    generation: 0,
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
      generation: 0,
      signal: new AbortController().signal,
      release: () => {},
      streamId: "test-stream",
      frames: readerFrames([{ seq: "1" }]),
      pressure: () => answers.shift() ?? "read",
    })
  );
  assert.equal(
    body,
    'event: connected\ndata: {"streamId":"test-stream"}\n\nevent: frame\ndata: {"seq":"1"}\n\n'
  );
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
      generation: 0,
      signal,
      release: () => {},
      frames: readerFrames([{ seq: "1" }]),
      pressure: () => "read",
    })
  );
  assert.equal(added, 1);
  assert.equal(removed, 1, "a finished watch leaves no abort listener behind");
});

test("an omitted body is filled from the list one seq ahead", async () => {
  const calls: Array<Record<string, unknown>> = [];
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 2,
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ rows: { entries: [{ seq: "3", bodyOmitted: true }] } }]),
      recover: async (input) => {
        calls.push(input.payload);
        return { entries: [{ seq: "3", body: "kept" }] };
      },
      pressure: () => "read",
    })
  );
  assert.deepEqual(calls, [{ agentId: "agent-1", sessionId: "", beforeSeq: "4", limit: 1 }]);
  assert.match(body, /"body":"kept"/);
  assert.equal(body.includes('"bodyOmitted":true'), false);
});

test("a blob read does not follow a redirect out of the network", async () => {
  const inits: Array<RequestInit | undefined> = [];
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 2,
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ rows: { entries: [{ seq: "8", blobHash: "abc123def456ghij" }] } }]),
      recover: async () => ({
        instructions: [
          { relPath: "blobs/abc123def456ghij", url: "https://blob.example/body" },
        ],
      }),
      fetchBlob: async (_url, init) => {
        inits.push(init);
        return new Response("", {
          status: 302,
          headers: { location: "http://169.254.169.254/latest/meta-data" },
        });
      },
      pressure: () => "read",
    })
  );
  assert.equal(inits[0]?.redirect, "manual", "the redirect is answered, not followed");
  assert.equal(/169\.254\.169\.254/.test(body), false);
  assert.equal(/"body"/.test(body), false, "the row stays, its body does not");
});

test("a recovery read is cancellable", async () => {
  const { grokBotRead } = await import(
    "../../../src/app/(dashboard)/dashboard/grok-bot/read.ts"
  );
  const controller = new AbortController();
  controller.abort();
  let seen: RequestInit | undefined;
  await grokBotRead({
    accessToken: "token",
    method: "ListGrokBotTranscript",
    payload: {},
    signal: controller.signal,
    fetch: async (_url, init) => {
      seen = init;
      return new Response("{}");
    },
  });
  assert.equal(seen?.signal, controller.signal, "the read passes the signal to fetch");
});

test("a blob hash is read from its signed blobs path", async () => {
  const calls: Array<Record<string, unknown>> = [];
  const urls: string[] = [];
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 2,
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ rows: { entries: [{ seq: "8", blobHash: "abc123def456ghij" }] } }]),
      recover: async (input) => {
        calls.push(input.payload);
        return {
          instructions: [{ relPath: "blobs/abc123def456ghij", url: "https://blob.example/body" }],
        };
      },
      fetchBlob: async (url) => {
        urls.push(url);
        return new Response("blob-body");
      },
      pressure: () => "read",
    })
  );
  assert.deepEqual(calls, [{ relPaths: ["blobs/abc123def456ghij"] }]);
  assert.deepEqual(urls, ["https://blob.example/body"]);
  assert.match(body, /"body":"blob-body"/);
});

test("a request that was already aborted never opens the upstream watch", async () => {
  let opened = 0;
  let released = 0;
  const controller = new AbortController();
  controller.abort();
  const stream = watchStream({
    accessToken: "token",
    agentId: "agent-1",
    after: "0",
    generation: 0,
    signal: controller.signal,
    release: () => {
      released += 1;
    },
    frames: async function* () {
      opened += 1;
      yield { heartbeat: true };
    },
  });
  await text(stream);
  assert.equal(opened, 0, "the upstream watch must not be started");
  assert.equal(released, 1, "the slot has to come back");
});

test("a body url pointing inside the network is refused", () => {
  // The service supplies this url, but this process fetches it, so a link-local
  // address or a loopback name must never be reached.
  assert.equal(safeBlobUrl("http://blob.example/body"), null);
  assert.equal(safeBlobUrl("https://127.0.0.1/body"), null);
  assert.equal(safeBlobUrl("https://169.254.169.254/latest/meta-data"), null);
  assert.equal(safeBlobUrl("https://localhost/body"), null);
  assert.equal(safeBlobUrl("https://10.1.2.3/body"), null);
  assert.equal(safeBlobUrl("https://192.168.1.5/body"), null);
  assert.equal(safeBlobUrl("https://[::1]/body"), null);
  assert.equal(safeBlobUrl("not a url"), null);
  // The same addresses in the spelling a URL parser delivers, plus the metadata name
  // and the CGNAT range: a hand-rolled check missed all of these.
  assert.equal(safeBlobUrl("https://[::ffff:127.0.0.1]/body"), null);
  assert.equal(safeBlobUrl("https://[::ffff:169.254.169.254]/body"), null);
  assert.equal(safeBlobUrl("https://[0:0:0:0:0:ffff:a9fe:a9fe]/body"), null);
  assert.equal(safeBlobUrl("https://metadata.google.internal/x"), null);
  assert.equal(safeBlobUrl("https://100.100.100.200/latest"), null);
  assert.equal(safeBlobUrl("https://localhost./body"), null);
  assert.equal(safeBlobUrl("https://blob.example./body"), "https://blob.example./body");
  assert.equal(safeBlobUrl("https://blob.example/body"), "https://blob.example/body");
});

test("a blob body past the size limit is dropped rather than kept", async () => {
  const body = await text(
    watchStream({
      accessToken: "token",
      agentId: "agent-1",
      after: "0",
      generation: 2,
      signal: new AbortController().signal,
      release: () => {},
      frames: readerFrames([{ rows: { entries: [{ seq: "8", blobHash: "abc123def456ghij" }] } }]),
      recover: async () => ({
        instructions: [{ relPath: "blobs/abc123def456ghij", url: "https://blob.example/body" }],
      }),
      fetchBlob: async () => new Response("x".repeat(1024 * 1024 + 1)),
      pressure: () => "read",
    })
  );
  assert.equal(/blobHash/.test(body), true, "the row stays, only the body is missing");
  assert.equal(/"body"/.test(body), false);
});
