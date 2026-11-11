import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { NativeZcodeHostClient } from "../../open-sse/executors/zcode/nativeHostClient.ts";
import { NativeZcodeSessionBridge } from "../../open-sse/executors/zcode/nativeSession.ts";
import { encodeZcodeValue } from "../../open-sse/executors/zcodeProtocol.ts";

const realSetTimeout = setTimeout;
const realClearTimeout = clearTimeout;

function connectedClient() {
  const client = new NativeZcodeHostClient({ serverRoot: "unused" });
  const transport = client as unknown as {
    startup: Promise<void>;
    ready: boolean;
    socket: unknown;
    pending: Map<number, unknown>;
    consume(data: Buffer): void;
  };
  let sends = 0;
  Object.assign(transport, {
    startup: Promise.resolve(),
    ready: true,
    socket: {
      readyState: 1,
      send(_data: Buffer, callback: (error?: Error) => void) {
        sends++;
        callback();
      },
      terminate() {},
    },
  });
  return {
    client,
    transport,
    sends: () => sends,
    reply(id: number, result: unknown) {
      const body = Buffer.concat([encodeZcodeValue([201, id]), encodeZcodeValue(result)]);
      const frame = Buffer.alloc(13 + body.length);
      frame[0] = 1;
      frame.writeUInt32BE(body.length, 9);
      body.copy(frame, 13);
      transport.consume(frame);
    },
  };
}

test("session RPC uses its caller deadline beyond the generic 90s without replay", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  const f = connectedClient();
  let failure: unknown;
  try {
    const response = f.client.call("zcode-agent", "sendPrompt", [], { timeoutMs: 600_000 });
    const observed = response.catch((error: unknown) => {
      failure = error;
    });
    await Promise.resolve();
    t.mock.timers.tick(203_000);
    await new Promise<void>((resolve) => setImmediate(resolve));
    assert.equal(failure, undefined, "a live 203s turn must not hit the generic RPC deadline");
    f.reply(1, { accepted: true });
    assert.deepEqual(await observed, { accepted: true });
    assert.equal(f.sends(), 1);
    assert.equal(f.transport.pending.size, 0);
  } finally {
    await f.client.close();
  }
});

test("continuation expiry does not close an actively running native turn", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-active-expiry-test-"));
  let closed = false;
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    timeoutMs: 1000,
    continuationTimeoutMs: 20,
    clientFactory: () => ({
      async start() {},
      async close() {
        closed = true;
      },
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession") {
          await new Promise((resolve) => setTimeout(resolve, 60));
          if (closed) throw new Error("ZCode host client is closed");
          return {
            session: { status: "idle" },
            messages: [
              {
                info: { finish: "stop", semantics: { kind: "assistant_response" } },
                parts: [{ type: "text", text: "completed" }],
              },
            ],
          };
        }
        return true;
      },
    }),
  });
  try {
    assert.equal((await bridge.execute(input)).text, "completed");
    assert.equal(closed, true, "completed turn still releases its client");
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

test("aborting one native RPC releases it while concurrent calls survive", async () => {
  const f = connectedClient();
  const controller = new AbortController();
  try {
    const canceled = f.client.call("zcode-agent", "readSession", [], {
      signal: controller.signal,
    });
    const rejected = assert.rejects(canceled, /cancel/i);
    const other = f.client.call("model-selection", "getView", []);
    await Promise.resolve();
    controller.abort();
    f.reply(2, { available: true });
    f.reply(1, { late: true });
    await rejected;
    assert.deepEqual(await other, { available: true });
    assert.equal(f.transport.pending.size, 0);
  } finally {
    await f.client.close();
  }
});

const input = {
  scope: "timeout-owner",
  selection: { providerId: "account:bigmodel-start-plan", modelId: "GLM-5.3-Flash" },
  messages: [{ role: "user", content: "Reply" }],
  tools: [],
};

test("session deadline interrupts a stalled poll and releases its workspace", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-timeout-test-"));
  let releasePoll: ((value: unknown) => void) | undefined;
  let closed = false;
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    timeoutMs: 30,
    clientFactory: () => ({
      async start() {},
      async close() {
        closed = true;
        releasePoll?.({ session: { status: "running" } });
      },
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession")
          return new Promise((resolve) => {
            releasePoll = resolve;
          });
        return true;
      },
    }),
  });
  let guard: ReturnType<typeof setTimeout> | undefined;
  const operation = bridge.execute(input).then(
    () => "resolved",
    (error: unknown) => error
  );
  try {
    const result = await Promise.race([
      operation,
      new Promise((resolve) => {
        guard = setTimeout(() => resolve("stalled"), 300);
      }),
    ]);
    assert.ok(result instanceof Error, "the session deadline must interrupt the awaited poll");
    assert.match(result.message, /timed out/i);
    assert.equal(closed, true);
  } finally {
    clearTimeout(guard);
    await bridge.close();
    await operation;
    await rm(root, { recursive: true, force: true });
  }
});

test("cleanup on a disconnected host preserves the original failure", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-disconnect-test-"));
  const failure = new Error("ZCode host disconnected");
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession") throw failure;
        if (method === "closeSession" || method === "disposeWorkspace")
          throw new Error("ZCode host client is closed");
        return true;
      },
    }),
  });
  try {
    await assert.rejects(bridge.execute(input), (error: unknown) => error === failure);
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

test("a completed answer survives a closeSession error", async () => {
  const root = await mkdtemp(join(tmpdir(), "native-ready-answer-cleanup-test-"));
  let closed = false;
  let releasedWorkspace = false;
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    clientFactory: () => ({
      async start() {},
      async close() {
        closed = true;
      },
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession")
          return {
            session: { status: "idle" },
            messages: [
              {
                info: { finish: "stop", semantics: { kind: "assistant_response" } },
                parts: [{ type: "text", text: "completed" }],
              },
            ],
          };
        if (method === "closeSession") throw new Error("ZCode host client is closed");
        if (method === "disposeWorkspace") releasedWorkspace = true;
        return true;
      },
    }),
  });
  try {
    const result = await bridge.execute(input);
    assert.equal(result.text, "completed");
    assert.equal(closed, true);
    assert.equal(releasedWorkspace, true);
  } finally {
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

test("a stalled cleanup cannot extend the caller deadline by another 90s", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "native-cleanup-timeout-test-"));
  t.mock.timers.enable({ apis: ["setTimeout", "Date"] });
  let polled: () => void;
  const polling = new Promise<void>((resolve) => {
    polled = resolve;
  });
  let cleaning: () => void;
  const cleanupStarted = new Promise<void>((resolve) => {
    cleaning = resolve;
  });
  let releaseCleanup: (value: unknown) => void;
  let releasedWorkspace = false;
  const bridge = new NativeZcodeSessionBridge({
    workspaceRoot: root,
    timeoutMs: 30,
    clientFactory: () => ({
      async start() {},
      async close() {},
      async call(_channel, method) {
        if (method === "saveProject") return { id: "project" };
        if (method === "createSession") return { session: { sessionId: "session" } };
        if (method === "readSession") {
          polled();
          return new Promise(() => {});
        }
        if (method === "closeSession") {
          cleaning();
          return new Promise((resolve) => {
            releaseCleanup = resolve;
          });
        }
        if (method === "disposeWorkspace") releasedWorkspace = true;
        return true;
      },
    }),
  });
  const operation = bridge.execute(input).catch((error: unknown) => error);
  let guard: ReturnType<typeof setTimeout> | undefined;
  try {
    await polling;
    t.mock.timers.tick(31);
    await cleanupStarted;
    t.mock.timers.tick(5001);
    const result = await Promise.race([
      operation,
      new Promise((resolve) => {
        guard = realSetTimeout(() => resolve("cleanup stalled"), 300);
      }),
    ]);
    assert.ok(result instanceof Error, "cleanup must be bounded independently of the RPC default");
    assert.match(result.message, /session timed out/i);
    assert.equal(
      releasedWorkspace,
      true,
      "workspace release is attempted after closeSession stalls"
    );
  } finally {
    realClearTimeout(guard);
    releaseCleanup!(true);
    await operation;
    await bridge.close();
    await rm(root, { recursive: true, force: true });
  }
});

for (const [stalledMethod, abortCaller] of [
  ["readSession", false],
  ["getTaskTokenUsage", false],
  ["getTaskTokenUsage", true],
] as const) {
  test(`ready tool survives stalled ${stalledMethod}; caller abort=${abortCaller}`, async () => {
    const root = await mkdtemp(join(tmpdir(), "native-ready-tool-timeout-test-"));
    const controller = new AbortController();
    let releaseStats: ((value: unknown) => void) | undefined;
    let reachedStats: () => void;
    const statsStarted = new Promise<void>((resolve) => {
      reachedStats = resolve;
    });
    let prompts = 0;
    const bridge = new NativeZcodeSessionBridge({
      workspaceRoot: root,
      timeoutMs: 3000,
      clientFactory: () => ({
        async start() {},
        async close() {},
        async call(_channel, method) {
          if (method === "saveProject") return { id: "project" };
          if (method === "createSession") return { session: { sessionId: "session" } };
          if (method === "sendPrompt") {
            prompts++;
            // Model the already received MCP tool event; wire delivery itself is
            // covered by zcode-native-session.test.ts. No external service runs.
            const run = (bridge as unknown as { runs: Set<{ pending: unknown[] }> }).runs
              .values()
              .next().value!;
            run.pending.push({
              id: "call_zcn_ready",
              rpcId: 1,
              name: "echo",
              input: { value: 7 },
              response: { destroy() {} },
              delivered: false,
            });
          }
          if (method === stalledMethod) {
            reachedStats();
            return new Promise((resolve) => {
              releaseStats = resolve;
            });
          }
          return {};
        },
      }),
    });
    const operation = bridge
      .execute({
        ...input,
        signal: controller.signal,
        tools: [{ name: "echo", inputSchema: { type: "object" } }],
      })
      .catch((error: unknown) => error);
    let guard: ReturnType<typeof setTimeout> | undefined;
    try {
      await statsStarted;
      if (abortCaller) controller.abort();
      const result = await Promise.race([
        operation,
        new Promise((resolve) => {
          guard = setTimeout(() => resolve("statistics stalled"), 1400);
        }),
      ]);
      if (abortCaller) {
        assert.ok(result instanceof Error);
        assert.match(result.message, /request cancelled/i);
      } else {
        assert.ok(result && typeof result === "object" && !(result instanceof Error));
        assert.equal((result as Record<string, unknown>).finishReason, "tool-calls");
        assert.deepEqual((result as Record<string, unknown>).toolCalls, [
          { id: "call_zcn_ready", name: "echo", input: { value: 7 } },
        ]);
      }
      assert.equal(prompts, 1, "statistics timeout must not replay the prompt");
    } finally {
      clearTimeout(guard);
      releaseStats?.({});
      await operation;
      await bridge.close();
      await rm(root, { recursive: true, force: true });
    }
  });
}
