import test from "node:test";
import { EventEmitter } from "node:events";
import assert from "node:assert/strict";

import { createClaudeWebResponse } from "../../open-sse/executors/claude-web/stream.ts";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";

const CAP = 1024 * 1024;

type ScriptedFakeWs = {
  closed: boolean;
  drained: Promise<void>;
};

/**
 * A WebSocket double that answers the SignalR handshake and, once the chat
 * invocation arrives, drains a scripted queue of raw socket payloads (one
 * `setImmediate` per message). `drained` resolves after the last scripted
 * payload has been handed to the message handler, so assertions never race
 * the delivery.
 */
function makeScriptedFakeWsCtor(chatMessages: string[]) {
  let instance: ScriptedFakeWs | null = null;

  class ScriptedFakeWsCtor extends EventEmitter {
    readyState = 0;
    closed = false;
    readonly drained: Promise<void>;
    private queue: string[];
    private drainResolve: (() => void) | null = null;

    constructor(_url: string, _options?: unknown) {
      super();
      this.queue = [...chatMessages];
      this.drained = new Promise((resolve) => {
        this.drainResolve = resolve;
      });
      instance = this;
      setImmediate(() => {
        if (this.readyState !== 0) return;
        this.readyState = 1;
        this.emit("open");
      });
    }

    send(data: unknown) {
      assert.equal(this.readyState, 1, "cannot send unless the socket is OPEN");
      const str = typeof data === "string" ? data : String(data);
      if (str.includes('"protocol":"json"')) {
        setImmediate(() => this.emit("message", Buffer.from(encodeFrame({}))));
      } else if (str.includes('"target":"chat"')) {
        setImmediate(() => this.scheduleNext());
      }
    }

    private scheduleNext() {
      const next = this.queue.shift();
      if (next === undefined) {
        this.drainResolve?.();
        return;
      }
      setImmediate(() => {
        this.emit("message", Buffer.from(next));
        this.scheduleNext();
      });
    }

    close() {
      if (this.readyState >= 2) return;
      this.closed = true;
      this.readyState = 2;
      setImmediate(() => {
        this.readyState = 3;
        this.emit("close", 1000, Buffer.alloc(0));
      });
    }
    terminate() {
      if (this.readyState === 3) return;
      this.closed = true;
      this.readyState = 3;
      setImmediate(() => this.emit("close", 1006, Buffer.alloc(0)));
    }
  }

  return {
    ctor: ScriptedFakeWsCtor as never,
    getInstance: (): ScriptedFakeWs | null => instance,
  };
}

test("copilot-m365-web: tolerates a pending frame at the size cap, reassembles a split frame, and aborts once the pending buffer passes the cap", async () => {
  const healthyFrame = {
    type: 1,
    target: "update",
    arguments: [{ messages: [{ author: "bot", text: "legit-content-marker" }] }],
    padding: "",
  };
  healthyFrame.padding = "x".repeat(CAP - Buffer.byteLength(JSON.stringify(healthyFrame)));
  const healthyBody = JSON.stringify(healthyFrame);
  assert.equal(Buffer.byteLength(healthyBody), CAP);
  // Begin with partial JSON, then reach exactly CAP retained bytes before the
  // separator. This exercises pending framing, not standalone-JSON admission.
  const chatMessages = [
    healthyBody.slice(0, 40),
    healthyBody.slice(40),
    "\x1e" + '{"type":6',
    "}\x1e",
    "y".repeat(CAP + 1),
    "\x1e" + encodeFrame({ type: 3 }),
  ];
  const { ctor, getInstance } = makeScriptedFakeWsCtor(chatMessages);
  const restore = __setCopilotM365WebSocketForTesting(ctor);
  let body: string;
  try {
    const { response } = await new CopilotM365WebExecutor().execute({
      model: "copilot-m365",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {
        apiKey: "access_token=test-token",
        providerSpecificData: { chathubPath: "user-oid@tenant-id" },
      },
      log: null,
    } as never);
    body = await response.text();
    await getInstance()?.drained;
  } finally {
    restore();
  }

  assert.ok(
    body.includes("legit-content-marker"),
    `expected the split healthy frame to stream, got: ${body.slice(0, 400)}`
  );
  assert.match(body, /m365_frame_too_large/);
  assert.ok(
    !body.includes('"finish_reason":"stop"'),
    `expected an error, not a successful finish, got: ${body.slice(0, 400)}`
  );
  assert.ok(getInstance()?.closed, "expected the socket to be closed after the abort");
});

test("claude-web keeps the same 1 MiB pending-line cap at the boundary", async () => {
  const encoder = new TextEncoder();
  const capChunk = encoder.encode("x".repeat(64 * 1024)); // 16 of these = 1 MiB exactly
  const byteChunk = encoder.encode("y");

  const runCase = async (chunks: Uint8Array[], reserve: number) => {
    const state = { reads: 0, cancelled: false };
    const source = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (state.reads >= chunks.length + reserve) {
          controller.close();
          return;
        }
        const chunk = chunks[state.reads] ?? byteChunk;
        state.reads += 1;
        controller.enqueue(chunk);
      },
      cancel() {
        state.cancelled = true;
      },
    });
    const logs: string[] = [];
    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
      log: {
        error: (tag: string, message: string) => {
          logs.push(`${tag}: ${message}`);
        },
      },
    });
    return { response, state, logs };
  };

  // Exactly the cap (16 x 64 KiB, never terminated): the line is read to EOF
  // and fails as an unterminated stream WITHOUT tripping the size-limit guard.
  const atCap = await runCase(
    Array.from({ length: 16 }, () => capChunk),
    0
  );
  assert.equal(atCap.response.status, 502);
  assert.ok(
    !atCap.logs.some((message) => /size limit/.test(message)),
    `exact cap must not trip the size-limit guard: ${atCap.logs.join(" | ")}`
  );
  assert.equal(atCap.state.reads, 16);
  assert.equal(atCap.state.cancelled, false);

  // One byte past the cap: the guard trips before the source is read out,
  // cancelling it.
  const overCap = await runCase([...Array.from({ length: 16 }, () => capChunk), byteChunk], 1);
  assert.equal(overCap.response.status, 502);
  assert.ok(
    overCap.logs.some((message) => /size limit/.test(message)),
    `one byte past the cap must trip the size-limit guard: ${overCap.logs.join(" | ")}`
  );
  assert.equal(overCap.state.reads, 17);
  assert.equal(overCap.state.cancelled, true);
});

test("copilot-m365-web: complete over-cap frames are rejected before content just like split frames", async () => {
  // Intentional native contract: a separator cannot bypass frame memory admission.
  const overCapText = "legit-content-marker" + "z".repeat(CAP);
  const chatMessages = [
    encodeFrame({
      type: 1,
      target: "update",
      arguments: [{ messages: [{ author: "bot", text: overCapText }] }],
    }),
    encodeFrame({ type: 3 }),
  ];
  const { ctor, getInstance } = makeScriptedFakeWsCtor(chatMessages);
  const restore = __setCopilotM365WebSocketForTesting(ctor);
  let body: string;
  try {
    const { response } = await new CopilotM365WebExecutor().execute({
      model: "copilot-m365",
      body: { messages: [{ role: "user", content: "hi" }] },
      stream: true,
      credentials: {
        apiKey: "access_token=test-token",
        providerSpecificData: { chathubPath: "user-oid@tenant-id" },
      },
      log: null,
    } as never);
    body = await response.text();
    await getInstance()?.drained;
  } finally {
    restore();
  }

  assert.equal(JSON.parse(body).error.code, "m365_frame_too_large");
  assert.doesNotMatch(body, /legit-content-marker|finish_reason|\[DONE\]/);
  assert.ok(getInstance()?.closed, "expected the socket to be closed after the turn");
});
