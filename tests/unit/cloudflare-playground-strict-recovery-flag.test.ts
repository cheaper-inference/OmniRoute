/**
 * #18313: the 10-retry budget and the 502 on an exhausted tool-call recovery are opt-in via
 * CLOUDFLARE_PLAYGROUND_STRICT_TOOL_RECOVERY_ENABLED. Off, the executor retries 3 times and
 * returns the last reply as an answer. Runs the real executor with a fake transport and a
 * retry delay of 0, so only the delay itself is not exercised here.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  CloudflarePlaygroundExecutor,
  DEFAULT_TOOL_RETRIES,
  MAX_TOOL_RETRIES,
  RETRY_DELAY_MS,
  STRICT_TOOL_RECOVERY_FLAG,
} from "../../open-sse/executors/cloudflare-playground.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";
import {
  buildSuccessFrames,
  FakeTransport,
  parseSseChunks,
} from "../fixtures/cloudflare-playground/executorHarness.ts";

const BROKEN = "<read><path>a.py";
const FLAG_RESOLVER_KEY = Symbol.for("omniroute.featureFlagResolver");
const globals = globalThis as unknown as Record<symbol, unknown>;
const originalResolver = globals[FLAG_RESOLVER_KEY];

const READ_TOOL = {
  type: "function",
  function: {
    name: "read",
    description: "Read a file",
    parameters: { type: "object", properties: { path: { type: "string" } }, required: ["path"] },
  },
};

function args(options: { stream?: boolean; tools?: unknown[]; signal?: AbortSignal } = {}) {
  return {
    body: {
      model: "test-model",
      messages: [{ role: "user", content: "read a.py" }],
      tools: options.tools ?? [READ_TOOL],
    },
    credentials: {},
    signal: options.signal ?? null,
    stream: options.stream ?? false,
  } as unknown as Parameters<CloudflarePlaygroundExecutor["execute"]>[0];
}

/** Production retry budget (nothing injected), no real delay. */
function makeExecutor(rooms: string[], reply = BROKEN, reasoning = "") {
  return new CloudflarePlaygroundExecutor(
    (chatId) => {
      rooms.push(chatId);
      return new FakeTransport(buildSuccessFrames(chatId, reply, reasoning));
    },
    undefined,
    undefined,
    0
  );
}

test.beforeEach(() => {
  delete process.env[STRICT_TOOL_RECOVERY_FLAG];
  delete globals[FLAG_RESOLVER_KEY];
});

test.after(() => {
  delete process.env[STRICT_TOOL_RECOVERY_FLAG];
  if (originalResolver) globals[FLAG_RESOLVER_KEY] = originalResolver;
});

test("the flag is defined, off by default, and the budgets are the agreed ones", () => {
  const definition = FEATURE_FLAG_DEFINITIONS.find((f) => f.key === STRICT_TOOL_RECOVERY_FLAG);
  assert.equal(definition?.defaultValue, "false");
  assert.equal(definition?.type, "boolean");
  assert.equal(DEFAULT_TOOL_RETRIES, 3);
  assert.equal(MAX_TOOL_RETRIES, 10);
  assert.equal(RETRY_DELAY_MS, 5000);
});

test("flag off: 3 retries, then the last reply comes back as a 200 answer", async () => {
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args());
  const parsed = (await response.json()) as {
    choices: Array<{ message: { content: string }; finish_reason: string }>;
  };

  assert.equal(rooms.length, 1 + 3);
  assert.equal(response.status, 200);
  assert.equal(parsed.choices[0].finish_reason, "stop");
  assert.equal(parsed.choices[0].message.content, BROKEN);
});

test("flag off: streaming ends normally, with no recovery error chunk", async () => {
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args({ stream: true }));
  const raw = await response.text();
  const chunks = parseSseChunks(raw);

  assert.equal(rooms.length, 1 + 3);
  assert.equal(response.status, 200);
  assert.ok(!chunks.some((chunk) => chunk.error));
  assert.ok(chunks.some((chunk) => chunk.choices?.[0]?.delta?.content === BROKEN));
  assert.equal(chunks.at(-1).choices[0].finish_reason, "stop");
  assert.match(raw, /data: \[DONE\]/);
});

test("flag off: a blank reply exhausts its retries and is still a 200", async () => {
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms, "").execute(args());
  await response.body?.cancel();

  assert.equal(rooms.length, 1 + 3);
  assert.equal(response.status, 200);
});

for (const value of ["false", "0", "off", ""]) {
  test(`flag value ${JSON.stringify(value)} stays off`, async () => {
    process.env[STRICT_TOOL_RECOVERY_FLAG] = value;
    const rooms: string[] = [];
    const { response } = await makeExecutor(rooms).execute(args());
    await response.body?.cancel();

    assert.equal(rooms.length, 1 + 3);
    assert.equal(response.status, 200);
  });
}

test("a flag resolver that throws fails closed to off", async () => {
  process.env[STRICT_TOOL_RECOVERY_FLAG] = "true";
  globals[FLAG_RESOLVER_KEY] = () => {
    throw new Error("flag store unavailable");
  };
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args());
  await response.body?.cancel();

  assert.equal(rooms.length, 1 + 3);
  assert.equal(response.status, 200);
});

test("the registered resolver decides over the environment", async () => {
  globals[FLAG_RESOLVER_KEY] = (key: string) => key === STRICT_TOOL_RECOVERY_FLAG;
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args());
  await response.body?.cancel();

  assert.equal(rooms.length, 1 + 10);
  assert.equal(response.status, 502);
});

test("flag on: 10 retries, then a 502 with no stack or upstream text", async () => {
  process.env[STRICT_TOOL_RECOVERY_FLAG] = "true";
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args());
  const parsed = (await response.json()) as { error: { code: string; message: string } };

  assert.equal(rooms.length, 1 + 10);
  assert.equal(response.status, 502);
  assert.equal(parsed.error.code, "HTTP_502");
  assert.match(parsed.error.message, /after 11 attempts \(last failure: malformed_intent\)/);
  assert.doesNotMatch(JSON.stringify(parsed), /a\.py|\n\s+at /);
});

test("flag on: streaming fails with an error chunk and no broken content", async () => {
  process.env[STRICT_TOOL_RECOVERY_FLAG] = "true";
  const rooms: string[] = [];
  const { response } = await makeExecutor(rooms).execute(args({ stream: true }));
  const raw = await response.text();
  const chunks = parseSseChunks(raw);
  const errorChunk = chunks.find((chunk) => chunk.error);

  assert.equal(rooms.length, 1 + 10);
  assert.equal(errorChunk?.error.type, "tool_call_recovery_failed");
  assert.equal(errorChunk?.error.code, "HTTP_502");
  assert.ok(!chunks.some((chunk) => chunk.choices?.[0]?.delta?.content));
  assert.match(raw, /data: \[DONE\]/);
});

test("flag on: a reply that succeeds on a retry is not a failure", async () => {
  process.env[STRICT_TOOL_RECOVERY_FLAG] = "true";
  const rooms: string[] = [];
  const executor = new CloudflarePlaygroundExecutor(
    (chatId) => {
      rooms.push(chatId);
      const reply = rooms.length < 8 ? BROKEN : '<read>{"path": "a.py"}</read>';
      return new FakeTransport(buildSuccessFrames(chatId, reply));
    },
    undefined,
    undefined,
    0
  );
  const { response } = await executor.execute(args());
  const parsed = (await response.json()) as { choices: Array<{ finish_reason: string }> };

  assert.equal(rooms.length, 8);
  assert.equal(response.status, 200);
  assert.equal(parsed.choices[0].finish_reason, "tool_calls");
});

for (const flag of [undefined, "true"]) {
  const label = flag ? "flag on" : "flag off";

  test(`${label}: a disconnect during the real delay ends it and opens no session`, async () => {
    if (flag) process.env[STRICT_TOOL_RECOVERY_FLAG] = flag;
    const rooms: string[] = [];
    const executor = new CloudflarePlaygroundExecutor((chatId) => {
      rooms.push(chatId);
      return new FakeTransport(buildSuccessFrames(chatId, BROKEN));
    });
    const controller = new AbortController();
    const startedAt = Date.now();
    setTimeout(() => controller.abort(), 20);

    const { response } = await executor.execute(args({ signal: controller.signal }));
    await response.body?.cancel();

    assert.equal(rooms.length, 1, "no retry session may open after the abort");
    assert.ok(Date.now() - startedAt < 2000, "the 5 s delay must end with the abort");
    assert.equal(response.status, 200, "an abandoned request is not an exhausted recovery");
  });

  test(`${label}: a disconnect partway through the retries stops them`, async () => {
    if (flag) process.env[STRICT_TOOL_RECOVERY_FLAG] = flag;
    const rooms: string[] = [];
    const controller = new AbortController();
    const executor = new CloudflarePlaygroundExecutor(
      (chatId) => {
        rooms.push(chatId);
        if (rooms.length === 2) setTimeout(() => controller.abort(), 5);
        return new FakeTransport(buildSuccessFrames(chatId, BROKEN));
      },
      undefined,
      undefined,
      1000
    );
    const startedAt = Date.now();

    const { response } = await executor.execute(args({ signal: controller.signal }));
    await response.body?.cancel();

    assert.equal(rooms.length, 2);
    assert.ok(Date.now() - startedAt < 1800, "the second delay must end with the abort");
  });

  test(`${label}: a tool-less reply ending in a colon opens no second session`, async () => {
    if (flag) process.env[STRICT_TOOL_RECOVERY_FLAG] = flag;
    const rooms: string[] = [];
    const { response } = await makeExecutor(rooms, "Here is the list:").execute(
      args({ tools: [] })
    );
    await response.body?.cancel();

    assert.equal(rooms.length, 1);
    assert.equal(response.status, 200);
  });

  test(`${label}: a request with tools still takes the colon retry`, async () => {
    if (flag) process.env[STRICT_TOOL_RECOVERY_FLAG] = flag;
    const rooms: string[] = [];
    const { response } = await makeExecutor(rooms, "Here is the list:").execute(args());
    await response.body?.cancel();

    assert.equal(rooms.length, 2);
    assert.equal(response.status, 200);
  });
}
