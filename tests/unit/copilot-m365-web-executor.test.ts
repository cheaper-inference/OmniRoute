import test from "node:test";
import { EventEmitter } from "node:events";
import assert from "node:assert/strict";

import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";

class MockM365WebSocket extends EventEmitter {
  static instances: MockM365WebSocket[] = [];
  static mode: "success" | "error" = "success";

  sent: string[] = [];
  closed = false;
  readyState = 0;

  constructor(
    public url: string,
    public options: unknown
  ) {
    super();
    MockM365WebSocket.instances.push(this);
    queueMicrotask(() => {
      if (this.readyState !== 0) return;
      if (MockM365WebSocket.mode === "error") {
        this.emit("error", new Error("upstream transport failed\nstack line"));
        return;
      }
      this.readyState = 1;
      this.emit("open");
    });
  }

  send(data: string): void {
    assert.equal(this.readyState, 1, "cannot send unless the socket is OPEN");
    this.sent.push(String(data));
    // #10718 — a single socket write may carry multiple \x1e-terminated frames
    // (the chat invocation and its Metrics follow-up ride together).
    const parsedFrames = String(data)
      .split("\x1e")
      .filter((f) => f.length > 0)
      .map((f) => {
        try {
          return JSON.parse(f);
        } catch {
          return null;
        }
      });
    const parsed = parsedFrames.find((f) => f && f.protocol === "json") ?? parsedFrames[0];
    if (parsed?.protocol === "json") {
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
      return;
    }
    if (parsedFrames.some((f) => f?.type === 4 && f?.target === "chat")) {
      queueMicrotask(() => {
        this.emit(
          "message",
          Buffer.from(
            encodeFrame({
              type: 1,
              target: "update",
              arguments: [
                { messages: [{ text: "In progress...", messageType: "Progress", author: "bot" }] },
              ],
            }) +
              encodeFrame({
                type: 1,
                target: "update",
                arguments: [{ messages: [{ text: "po", author: "bot" }] }],
              }) +
              encodeFrame({
                type: 1,
                target: "update",
                arguments: [{ messages: [{ text: "pong", author: "bot" }], isLastUpdate: true }],
              }) +
              encodeFrame({
                type: 2,
                invocationId: "0",
                item: { messages: [], result: { value: "Success" } },
              }) +
              encodeFrame({ type: 3, invocationId: "0" })
          )
        );
      });
    }
  }

  close(): void {
    if (this.readyState >= 2) return;
    this.closed = true;
    this.readyState = 2;
    setImmediate(() => {
      this.readyState = 3;
      this.emit("close", 1000, Buffer.alloc(0));
    });
  }

  terminate(): void {
    if (this.readyState === 3) return;
    this.closed = true;
    this.readyState = 3;
    setImmediate(() => this.emit("close", 1006, Buffer.alloc(0)));
  }
}

function makeInput(stream = true) {
  return {
    model: "copilot-m365",
    stream,
    body: { messages: [{ role: "user", content: "Reply with exactly one word: pong" }] },
    credentials: {
      apiKey: "redacted-token",
      providerSpecificData: { chathubPath: "redacted-user@redacted-tenant" },
    },
  };
}

async function readBody(response: Response): Promise<string> {
  return await response.text();
}

test("CopilotM365WebExecutor streams OpenAI SSE chunks from accumulated M365 updates", async () => {
  MockM365WebSocket.instances = [];
  MockM365WebSocket.mode = "success";
  const restore = __setCopilotM365WebSocketForTesting(
    MockM365WebSocket as unknown as typeof import("ws").default
  );
  try {
    const executor = new CopilotM365WebExecutor();
    const result = await executor.execute(makeInput(true));
    const body = await readBody(result.response);

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    assert.match(result.url, /access_token=REDACTED/);
    assert.doesNotMatch(result.url, /redacted-token/);
    assert.equal(MockM365WebSocket.instances.length, 1);

    const sent = MockM365WebSocket.instances[0].sent;
    const sentFrames = sent.flatMap((f) => f.split("\x1e").filter((frame) => frame.length > 0));
    assert.ok(sentFrames.some((f) => f.includes('"protocol":"json"')));
    // #10718 — the chat invocation and its type:1 Metrics follow-up ride in ONE
    // socket write, and no type:6 keepalive is sent before them.
    const invocationWrite = sent.find((f) => f.includes('"target":"chat"'));
    assert.ok(invocationWrite, "expected a chat invocation write");
    assert.match(invocationWrite, /"target":"Metrics"/);
    assert.ok(
      !sentFrames.some((f) => f === '{"type":6}'),
      "the leading keepalive ping was removed (#10718): it must not precede the invocation"
    );

    const dataLines = body
      .split("\n")
      .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]");
    const payloads = dataLines.map((line) => JSON.parse(line.slice("data: ".length)));
    const deltas = payloads.map((payload) => payload.choices?.[0]?.delta?.content).filter(Boolean);
    const finishReasons = payloads
      .map((payload) => payload.choices?.[0]?.finish_reason)
      .filter(Boolean);

    assert.deepEqual(deltas, ["po", "ng"]);
    assert.deepEqual(finishReasons, ["stop"]);
    assert.match(body, /data: \[DONE\]/);
    assert.doesNotMatch(body, /In progress/);
  } finally {
    restore();
  }
});

test("CopilotM365WebExecutor returns typed HTTP failure before SSE content without raw diagnostics", async () => {
  MockM365WebSocket.instances = [];
  MockM365WebSocket.mode = "error";
  const restore = __setCopilotM365WebSocketForTesting(
    MockM365WebSocket as unknown as typeof import("ws").default
  );
  try {
    const executor = new CopilotM365WebExecutor();
    const result = await executor.execute(makeInput(true));
    const body = await readBody(result.response);

    // HTTP is not committed before content; routers must see the actual failure status.
    assert.equal(result.response.status, 502);
    assert.equal(result.response.headers.get("Content-Type"), "application/json");
    assert.equal(JSON.parse(body).error.code, "m365_socket_error");
    assert.doesNotMatch(body, /upstream transport failed/);
    assert.doesNotMatch(body, /stack line/);
    assert.doesNotMatch(body, /\nstack/);
  } finally {
    restore();
  }
});
