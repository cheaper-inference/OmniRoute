/**
 * #18313: the repair retry's delay and the sessions behind it must stop with the client.
 * Runs the real executor; only the playground transport is faked.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CloudflarePlaygroundExecutor,
  type CfTransport,
  type CfTransportStartResult,
} from "../../open-sse/executors/cloudflare-playground.ts";

const cfFrame = (chatId: string, body: unknown) =>
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", body: JSON.stringify(body) });

const buildSuccessFrames = (chatId: string, text: string) => [
  cfFrame(chatId, { type: "start" }),
  cfFrame(chatId, { type: "text-start", id: "t1" }),
  cfFrame(chatId, { type: "text-delta", delta: text, id: "t1" }),
  cfFrame(chatId, { type: "finish", messageMetadata: { finishReason: "stop" } }),
  JSON.stringify({ id: chatId, type: "cf_agent_use_chat_response", done: true }),
];

class FakeTransport implements CfTransport {
  constructor(private framesList: string[]) {}

  async start(): Promise<CfTransportStartResult> {
    return { ok: true };
  }

  async *frames(): AsyncGenerator<string> {
    for (const frame of this.framesList) yield frame;
  }

  async close(): Promise<void> {}
}

const READ_TOOL = {
  type: "function",
  function: {
    name: "read",
    description: "Read a file",
    parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  },
};

const readArgs = () =>
  ({
    body: {
      model: "test-model",
      messages: [{ role: "user", content: "read a.py" }],
      tools: [READ_TOOL],
    },
    credentials: {},
    signal: null,
    stream: false,
  }) as unknown as Parameters<CloudflarePlaygroundExecutor["execute"]>[0];

/** The real 5 s delay on purpose: only an abort-aware wait can beat these budgets. */
function makeRetryingExecutorWithRealDelay(rooms: string[]) {
  return new CloudflarePlaygroundExecutor((chatId) => {
    rooms.push(chatId);
    return new FakeTransport(buildSuccessFrames(chatId, "<read><path>a.py"));
  });
}

test("a client disconnect during the retry delay opens no further session", async () => {
  const rooms: string[] = [];
  const controller = new AbortController();
  const startedAt = Date.now();
  setTimeout(() => controller.abort(), 20);

  const result = await makeRetryingExecutorWithRealDelay(rooms).execute({
    ...readArgs(),
    signal: controller.signal,
  });
  await result.response.body?.cancel();

  assert.equal(rooms.length, 1, "no retry session may open after the abort");
  assert.ok(Date.now() - startedAt < 2000, "the 5 s delay must end with the abort");
});

/** Hands back a complete reply, then aborts as the attempt closes its transport. */
class AbortOnCloseTransport extends FakeTransport {
  constructor(
    frames: string[],
    private controller: AbortController
  ) {
    super(frames);
  }

  async close(): Promise<void> {
    this.controller.abort();
  }
}

test("an abort that lands as the attempt ends skips the delay and every retry", async () => {
  const rooms: string[] = [];
  const controller = new AbortController();
  const executor = new CloudflarePlaygroundExecutor((chatId) => {
    rooms.push(chatId);
    return new AbortOnCloseTransport(buildSuccessFrames(chatId, "<read><path>a.py"), controller);
  });
  const startedAt = Date.now();

  const result = await executor.execute({ ...readArgs(), signal: controller.signal });
  await result.response.body?.cancel();

  assert.equal(rooms.length, 1);
  assert.ok(Date.now() - startedAt < 2000);
});

test("an aborted request does not take the colon retry either", async () => {
  const rooms: string[] = [];
  const controller = new AbortController();
  const executor = new CloudflarePlaygroundExecutor((chatId) => {
    rooms.push(chatId);
    return new AbortOnCloseTransport(
      buildSuccessFrames(chatId, "Let me look at the file:"),
      controller
    );
  });

  const result = await executor.execute({ ...readArgs(), signal: controller.signal });
  await result.response.body?.cancel();

  assert.equal(rooms.length, 1);
});

test("the retry delay still applies when the request is not aborted", async () => {
  const rooms: string[] = [];
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => {
      rooms.push(chatId);
      return new FakeTransport(
        rooms.length === 1
          ? buildSuccessFrames(chatId, "<read><path>a.py")
          : buildSuccessFrames(chatId, '<read>{"path": "a.py"}</read>')
      );
    },
    undefined,
    60
  );
  const startedAt = Date.now();

  const result = await executor.execute({
    ...readArgs(),
    signal: new AbortController().signal,
  });
  await result.response.body?.cancel();

  assert.equal(rooms.length, 2);
  assert.ok(Date.now() - startedAt >= 50, "the delay must run before the retry session");
});

// ── Colon retry: only for requests that carry tools ──────────────────────────

function makeColonExecutor(rooms: string[]) {
  return new CloudflarePlaygroundExecutor((chatId) => {
    rooms.push(chatId);
    return new FakeTransport(buildSuccessFrames(chatId, "Here is the list:"));
  });
}

test("a tool-less reply ending in a colon opens no second session", async () => {
  const rooms: string[] = [];
  const args = readArgs();
  const { tools: _tools, ...toollessBody } = args.body as Record<string, unknown>;

  const result = await makeColonExecutor(rooms).execute({ ...args, body: toollessBody });
  const parsed = JSON.parse(await result.response.text()) as {
    choices: Array<{ message: { content: string }; finish_reason: string }>;
  };

  assert.equal(rooms.length, 1);
  assert.equal(parsed.choices[0].message.content, "Here is the list:");
  assert.equal(parsed.choices[0].finish_reason, "stop");
});

test("an empty tools list counts as tool-less for the colon retry", async () => {
  const rooms: string[] = [];
  const args = readArgs();
  const body = { ...(args.body as Record<string, unknown>), tools: [] };

  const result = await makeColonExecutor(rooms).execute({ ...args, body });
  await result.response.body?.cancel();

  assert.equal(rooms.length, 1);
});

test("a request with tools still takes the colon retry", async () => {
  const rooms: string[] = [];

  const result = await makeColonExecutor(rooms).execute(readArgs());
  await result.response.body?.cancel();

  assert.equal(rooms.length, 2);
  assert.notEqual(rooms[0], rooms[1], "the retry must open a fresh room");
});
