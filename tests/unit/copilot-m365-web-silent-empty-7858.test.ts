import test from "node:test";
import { EventEmitter } from "node:events";
import assert from "node:assert/strict";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";

function makeFakeWsCtor(frames: Array<Record<string, unknown>>) {
  return class FakeWS extends EventEmitter {
    readyState = 0;
    constructor(_url: string) {
      super();
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
        setImmediate(() => {
          for (const frame of frames) this.emit("message", Buffer.from(encodeFrame(frame)));
        });
      }
    }
    close() {
      if (this.readyState >= 2) return;
      this.readyState = 2;
      setImmediate(() => {
        this.readyState = 3;
        this.emit("close", 1000, Buffer.alloc(0));
      });
    }
    terminate() {
      if (this.readyState === 3) return;
      this.readyState = 3;
      setImmediate(() => this.emit("close", 1006, Buffer.alloc(0)));
    }
  };
}

test("copilot-m365-web: unrecognized frame shape must surface an error, not a silent stop [#7858]", async () => {
  const frames = [
    { type: 1, target: "update", arguments: [{ someUnknownField: "not a known shape" }] },
    { type: 3 },
  ];
  const restore = __setCopilotM365WebSocketForTesting(makeFakeWsCtor(frames) as never);
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
  } finally {
    restore();
  }

  assert.ok(
    body.includes('"error"'),
    `expected the stream to carry an explicit error for a fully-empty turn, got: ${body}`
  );
});

test("copilot-m365-web: a legitimate content-bearing turn is unaffected [#7858 regression guard]", async () => {
  const frames = [
    {
      type: 1,
      target: "update",
      arguments: [{ messages: [{ author: "bot", text: "hello there" }] }],
    },
    { type: 3 },
  ];
  const restore = __setCopilotM365WebSocketForTesting(makeFakeWsCtor(frames) as never);
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
  } finally {
    restore();
  }

  assert.ok(
    !body.includes('"error"'),
    `expected no error for a content-bearing turn, got: ${body}`
  );
  assert.ok(body.includes("hello there"), `expected the streamed content, got: ${body}`);
  assert.ok(body.includes('"finish_reason":"stop"'), `expected a stop chunk, got: ${body}`);
});
