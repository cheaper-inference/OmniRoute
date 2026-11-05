import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import type WebSocket from "ws";
import {
  CopilotM365WebExecutor,
  __setCopilotM365WebSocketForTesting,
} from "../../open-sse/executors/copilot-m365-web.ts";
import { encodeFrame } from "../../open-sse/executors/copilot-m365-frames.ts";
import { __resetM365ConversationsForTesting } from "../../open-sse/executors/m365Protocol/conversations.ts";

// Copilot keeps each conversation server-side. Starting a new one per request re-sends the whole
// history and opens a new thread every turn; Copilot throttles accounts that open many threads.
// A request that extends our last reply must continue that conversation with only the new
// messages, and anything doubtful must still start fresh.

type Frame = Record<string, unknown>;
type Turn = Frame[];
const ok = (text: string): Turn => [
  {
    type: 1,
    target: "update",
    arguments: [{ messages: [{ messageId: "m", author: "bot", text }] }],
  },
  {
    type: 2,
    item: {
      result: { value: "Success" },
      messages: [{ author: "bot", messageId: "m", messageType: "Chat", text }],
    },
  },
  { type: 3, invocationId: "0" },
];
const internalError: Turn = [
  { type: 2, item: { result: { value: "InternalError" } } },
  { type: 3, invocationId: "0" },
];
const throttled: Turn = [
  { type: 2, item: { result: { value: "Throttled", errorCode: "PerUserThrottled" } } },
  { type: 3, invocationId: "0" },
];

let turns: Turn[] = [];
const sockets: Socket[] = [];
class Socket extends EventEmitter {
  readyState = 1;
  invocation: Frame | undefined;
  constructor(
    public url: string,
    public options: { headers: Record<string, string> }
  ) {
    super();
    sockets.push(this);
    queueMicrotask(() => this.emit("open"));
  }
  send(data: string) {
    const frames = data
      .split("\x1e")
      .filter(Boolean)
      .map((f) => JSON.parse(f) as Frame);
    if (frames.some((f) => f.protocol === "json"))
      queueMicrotask(() => this.emit("message", Buffer.from(encodeFrame({}))));
    const invocation = frames.find((f) => f.type === 4);
    if (invocation) {
      this.invocation = invocation;
      const turn = turns.shift() ?? ok("unexpected extra turn");
      queueMicrotask(() => {
        for (const frame of turn) this.emit("message", Buffer.from(encodeFrame(frame)));
      });
    }
  }
  close() {
    this.readyState = 3;
    this.emit("close");
  }
  terminate() {
    this.close();
  }
  get args() {
    return (this.invocation!.arguments as Frame[])[0] as Frame & { message: { text: string } };
  }
  get query() {
    return new URL(this.url).searchParams;
  }
}

function request(
  messages: Frame[],
  options: { stream?: boolean; connectionId?: string | null } = {}
) {
  const connectionId = options.connectionId === undefined ? "conn-1" : options.connectionId;
  return {
    model: "copilot-m365",
    stream: options.stream ?? false,
    body: { messages } as Record<string, unknown>,
    credentials: {
      accessToken: "test-token",
      ...(connectionId ? { connectionId } : {}),
      providerSpecificData: { chathubPath: "u@t", tier: "edu" },
    },
  };
}
const user = (content: string) => ({ role: "user", content });
const assistant = (content: string) => ({ role: "assistant", content });

async function run(script: Turn[], fn: (exec: CopilotM365WebExecutor) => Promise<void>) {
  turns = [...script];
  sockets.length = 0;
  __resetM365ConversationsForTesting();
  const restore = __setCopilotM365WebSocketForTesting(Socket as unknown as typeof WebSocket);
  try {
    await fn(new CopilotM365WebExecutor());
  } finally {
    restore();
  }
}
async function text(response: Response): Promise<string> {
  const body = (await response.json()) as { choices: Array<{ message: { content: string } }> };
  return body.choices[0].message.content;
}

for (const stream of [false, true]) {
  test(`a follow-up continues the same conversation with only the new messages (stream=${stream})`, async () => {
    await run([ok("answer one"), ok("answer two")], async (exec) => {
      const first = await exec.execute(request([user("open the task")], { stream }));
      await first.response.text();
      const second = await exec.execute(
        request([user("open the task"), assistant("answer one"), user("next step")], { stream })
      );
      assert.equal(second.response.status, 200);
      await second.response.text();
      const [a, b] = sockets;
      assert.equal(sockets.length, 2);
      assert.equal(a.args.isStartOfSession, true);
      assert.equal(b.args.isStartOfSession, false);
      assert.equal(b.args.conversationId, a.args.conversationId);
      assert.equal(b.args.sessionId, a.args.sessionId);
      assert.equal(b.query.get("ConversationId"), a.query.get("ConversationId"));
      assert.equal(b.query.get("X-SessionId"), a.query.get("X-SessionId"));
      assert.equal(b.options.headers["X-RoutingParameter-SessionKey"], a.args.conversationId);
      assert.match(b.args.message.text, /next step/);
      assert.doesNotMatch(b.args.message.text, /open the task/);
    });
  });
}

test("an edited history starts a fresh conversation with the whole history", async () => {
  await run([ok("answer one"), ok("answer two")], async (exec) => {
    await (await exec.execute(request([user("open")]))).response.text();
    await (
      await exec.execute(request([user("open, edited"), assistant("answer one"), user("next")]))
    ).response.text();
    const [a, b] = sockets;
    assert.notEqual(b.args.conversationId, a.args.conversationId);
    assert.equal(b.args.isStartOfSession, true);
    assert.match(b.args.message.text, /open, edited/);
  });
});

test("without a connection identity every request stays stateless", async () => {
  await run([ok("answer one"), ok("answer two")], async (exec) => {
    await (await exec.execute(request([user("open")], { connectionId: null }))).response.text();
    await (
      await exec.execute(
        request([user("open"), assistant("answer one"), user("next")], { connectionId: null })
      )
    ).response.text();
    assert.notEqual(sockets[1].args.conversationId, sockets[0].args.conversationId);
    assert.equal(sockets[1].args.isStartOfSession, true);
  });
});

test("the same history on another connection never joins its conversation", async () => {
  await run([ok("answer one"), ok("answer two")], async (exec) => {
    await (await exec.execute(request([user("open")]))).response.text();
    await (
      await exec.execute(
        request([user("open"), assistant("answer one"), user("next")], { connectionId: "conn-2" })
      )
    ).response.text();
    assert.notEqual(sockets[1].args.conversationId, sockets[0].args.conversationId);
  });
});

test("a failed continuation is forgotten: the next request starts fresh", async () => {
  await run([ok("answer one"), throttled, ok("answer three")], async (exec) => {
    const history = [user("open"), assistant("answer one"), user("next")];
    await (await exec.execute(request([user("open")]))).response.text();
    const failed = await exec.execute(request(history));
    assert.equal(failed.response.status, 429);
    await failed.response.text();
    await (await exec.execute(request(history))).response.text();
    assert.equal(sockets[1].args.isStartOfSession, false);
    assert.equal(sockets[2].args.isStartOfSession, true);
    assert.notEqual(sockets[2].args.conversationId, sockets[0].args.conversationId);
  });
});

test("a content-less InternalError is retried once in a fresh conversation", async () => {
  await run([internalError, ok("recovered")], async (exec) => {
    const result = await exec.execute(request([user("open")]));
    assert.equal(result.response.status, 200);
    assert.equal(await text(result.response), "recovered");
    assert.equal(sockets.length, 2);
    assert.notEqual(sockets[1].args.conversationId, sockets[0].args.conversationId);
    assert.equal(sockets[1].args.isStartOfSession, true);
  });
});

test("an InternalError during a continuation retries with the whole history", async () => {
  await run([ok("answer one"), internalError, ok("recovered")], async (exec) => {
    await (await exec.execute(request([user("open")]))).response.text();
    const result = await exec.execute(
      request([user("open"), assistant("answer one"), user("next")])
    );
    assert.equal(await text(result.response), "recovered");
    const retry = sockets[2];
    assert.equal(retry.args.isStartOfSession, true);
    assert.notEqual(retry.args.conversationId, sockets[0].args.conversationId);
    assert.match(retry.args.message.text, /open[\s\S]*next/);
  });
});

test("a second InternalError fails as m365_internal_error without a third attempt", async () => {
  await run([internalError, internalError, ok("never")], async (exec) => {
    const result = await exec.execute(request([user("open")]));
    assert.equal(result.response.status, 502);
    const body = (await result.response.json()) as { error: { code: string } };
    assert.equal(body.error.code, "m365_internal_error");
    assert.equal(sockets.length, 2);
  });
});

test("an InternalError after streamed content is not retried: the client already has bytes", async () => {
  const partial: Turn = [
    {
      type: 1,
      target: "update",
      arguments: [{ messages: [{ messageId: "m", author: "bot", text: "partial" }] }],
    },
    { type: 2, item: { result: { value: "InternalError" } } },
    { type: 3, invocationId: "0" },
  ];
  await run([partial, ok("never")], async (exec) => {
    const result = await exec.execute(request([user("open")], { stream: true }));
    const body = await result.response.text();
    assert.match(body, /partial/);
    assert.match(body, /m365_internal_error/);
    assert.equal(sockets.length, 1);
  });
});
