import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

const baseline = await import("../../scripts/perf/lts-baseline.mjs");
const { classifySsePayload, measureStreamTtft, parseArgs, runBaseline, renderMarkdown } = baseline;

// ── classifier: one fixture per wire format ─────────────────────────────────

test("classifySsePayload reads OpenAI chat chunks", () => {
  const chunk = (delta: object, finish_reason: string | null = null) => ({
    choices: [{ index: 0, delta, finish_reason }],
  });
  assert.equal(classifySsePayload(chunk({ role: "assistant", content: "" })), null);
  assert.equal(classifySsePayload(chunk({ content: "Hi" })), "text");
  assert.equal(classifySsePayload(chunk({ reasoning_content: "hmm" })), "reasoning");
  assert.equal(classifySsePayload(chunk({ tool_calls: [{ index: 0 }] })), "tool");
  assert.equal(classifySsePayload(chunk({}, "stop")), "done");
  assert.equal(classifySsePayload({ choices: [], usage: { total_tokens: 3 } }), null);
  assert.equal(classifySsePayload({ error: { message: "boom" } }), "error");
});

test("classifySsePayload reads Claude Messages events", () => {
  assert.equal(classifySsePayload({ type: "message_start", message: {} }), null);
  assert.equal(
    classifySsePayload({ type: "content_block_start", content_block: { type: "text", text: "" } }),
    null
  );
  assert.equal(
    classifySsePayload({ type: "content_block_delta", delta: { type: "text_delta", text: "Hi" } }),
    "text"
  );
  assert.equal(
    classifySsePayload({
      type: "content_block_delta",
      delta: { type: "thinking_delta", thinking: "hmm" },
    }),
    "reasoning"
  );
  assert.equal(
    classifySsePayload({ type: "content_block_start", content_block: { type: "tool_use" } }),
    "tool"
  );
  assert.equal(classifySsePayload({ type: "message_stop" }), "done");
  assert.equal(classifySsePayload({ type: "error", error: { message: "boom" } }), "error");
});

test("classifySsePayload reads Responses events", () => {
  assert.equal(classifySsePayload({ type: "response.created", response: {} }), null);
  assert.equal(classifySsePayload({ type: "response.output_text.delta", delta: "Hi" }), "text");
  assert.equal(classifySsePayload({ type: "response.output_text.delta", delta: "" }), null);
  assert.equal(
    classifySsePayload({ type: "response.reasoning_summary_text.delta", delta: "hmm" }),
    "reasoning"
  );
  assert.equal(
    classifySsePayload({ type: "response.output_item.added", item: { type: "function_call" } }),
    "tool"
  );
  assert.equal(classifySsePayload({ type: "response.completed", response: {} }), "done");
  assert.equal(classifySsePayload({ type: "response.failed", response: {} }), "error");
});

// ── measurement against a loopback mock upstream ────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const sse = (data: unknown, event?: string) =>
  `${event ? `event: ${event}\n` : ""}data: ${typeof data === "string" ? data : JSON.stringify(data)}\n\n`;

// Each mock sends a lifecycle frame first, waits, then content, then the terminal frame.
const SCRIPTS: Record<string, { pre: string; content: string; post: string }> = {
  openai: {
    pre: sse({ choices: [{ index: 0, delta: { role: "assistant", content: "" } }] }),
    content: sse({ choices: [{ index: 0, delta: { content: "Hi" } }] }),
    post: sse({ choices: [{ index: 0, delta: {}, finish_reason: "stop" }] }) + sse("[DONE]"),
  },
  claude: {
    pre: sse({ type: "message_start", message: {} }, "message_start"),
    content: sse(
      { type: "content_block_delta", delta: { type: "text_delta", text: "Hi" } },
      "content_block_delta"
    ),
    post: sse({ type: "message_stop" }, "message_stop"),
  },
  responses: {
    pre: sse({ type: "response.created", response: {} }, "response.created"),
    content: sse({ type: "response.output_text.delta", delta: "Hi" }, "response.output_text.delta"),
    post: sse({ type: "response.completed", response: {} }, "response.completed"),
  },
};

async function withMock(
  script: { pre: string; content: string; post: string } | null,
  run: (url: string) => Promise<void>
) {
  const server = http.createServer(async (_req, res) => {
    if (!script) {
      res.writeHead(500).end("nope");
      return;
    }
    res.writeHead(200, { "content-type": "text/event-stream" });
    res.write(script.pre);
    await sleep(120);
    res.write(script.content);
    res.write(script.post);
    res.end();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const { port } = server.address() as { port: number };
  try {
    await run(`http://127.0.0.1:${port}/stream`);
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
}

for (const format of ["openai", "claude", "responses"]) {
  test(`measureStreamTtft: ${format} TTFT is the first semantic event, not the first byte`, async () => {
    await withMock(SCRIPTS[format], async (url) => {
      const r = await measureStreamTtft({
        url,
        init: { method: "POST", body: "{}" },
        fetchImpl: fetch,
        now: () => performance.now(),
      });
      assert.equal(r.ok, true, JSON.stringify(r));
      assert.equal(r.firstClass, "text");
      assert.ok(r.ttftMs - r.firstByteMs >= 80, `ttft ${r.ttftMs} vs first byte ${r.firstByteMs}`);
    });
  });
}

test("measureStreamTtft: a stream that ends without a terminal event is not a success", async () => {
  await withMock({ ...SCRIPTS.openai, post: "" }, async (url) => {
    const r = await measureStreamTtft({
      url,
      init: {},
      fetchImpl: fetch,
      now: () => performance.now(),
    });
    assert.equal(r.ok, false);
    assert.match(r.reason, /terminal/);
  });
});

test("measureStreamTtft: an error frame and an HTTP error are failures", async () => {
  const errScript = { ...SCRIPTS.openai, content: sse({ error: { message: "boom" } }) };
  await withMock(errScript, async (url) => {
    const r = await measureStreamTtft({
      url,
      init: {},
      fetchImpl: fetch,
      now: () => performance.now(),
    });
    assert.equal(r.ok, false);
    assert.match(r.reason, /error/);
  });
  await withMock(null, async (url) => {
    const r = await measureStreamTtft({
      url,
      init: {},
      fetchImpl: fetch,
      now: () => performance.now(),
    });
    assert.equal(r.ok, false);
    assert.match(r.reason, /HTTP 500/);
  });
});

test("measureStreamTtft: a frame split across chunks is still classified", async () => {
  const frame = SCRIPTS.openai.content;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      const enc = new TextEncoder();
      controller.enqueue(enc.encode(frame.slice(0, 15)));
      controller.enqueue(enc.encode(frame.slice(15) + SCRIPTS.openai.post));
      controller.close();
    },
  });
  const r = await measureStreamTtft({
    url: "http://x/stream",
    init: {},
    fetchImpl: async () => new Response(body, { status: 200 }),
    now: () => performance.now(),
  });
  assert.equal(r.ok, true);
  assert.equal(r.firstClass, "text");
});

// ── CLI + report wiring ─────────────────────────────────────────────────────

test("parseArgs reads --stream-url/--stream-format/--stream-model and validates them", () => {
  const a = parseArgs([
    "--stream-url",
    "http://127.0.0.1:20128/v1/messages",
    "--stream-format",
    "claude",
    "--stream-model",
    "m1",
  ]);
  assert.equal(a.streamUrl, "http://127.0.0.1:20128/v1/messages");
  assert.equal(a.streamFormat, "claude");
  assert.equal(a.streamModel, "m1");
  assert.equal(parseArgs([]).streamUrl, null);
  assert.throws(
    () => parseArgs(["--stream-url", "ftp://x", "--stream-model", "m"]),
    /--stream-url/
  );
  assert.throws(
    () =>
      parseArgs(["--stream-url", "http://x/y", "--stream-format", "grpc", "--stream-model", "m"]),
    /--stream-format/
  );
  assert.throws(() => parseArgs(["--stream-url", "http://x/y"]), /--stream-model/);
});

test("runBaseline adds a streamTtft measurement only when --stream-url is set", async () => {
  const runner = async () => ({
    exitCode: 0,
    signal: null,
    timedOut: false,
    stdout: "[heap] growth=1.0MB\n",
    stderr: "",
    durationMs: 1,
  });
  const make = (options: object, fetchImpl: unknown) =>
    runBaseline(options, {
      root: "/r",
      dataDir: "/iso",
      runner,
      exists: () => false,
      startServer: async () => {
        throw new Error("must not boot");
      },
      fetchImpl,
      now: () => performance.now(),
      host: { cpuCount: 4, totalMemMB: 1, loadAvg: [0, 0, 0], nodeVersion: "v0" },
      gitSha: "x",
      generatedAt: "t",
      log: () => {},
      baseEnv: { OMNIROUTE_API_KEY: "sk-test" },
    });

  assert.equal((await make(parseArgs([]), fetch)).measurements.streamTtft, undefined);

  const seen: { url: string; init: { headers: Record<string, string>; body: string } }[] = [];
  const fakeFetch = async (
    url: string,
    init: { headers: Record<string, string>; body: string }
  ) => {
    seen.push({ url, init });
    const enc = new TextEncoder();
    return new Response(
      new ReadableStream({
        start(c) {
          c.enqueue(enc.encode(SCRIPTS.responses.content + SCRIPTS.responses.post));
          c.close();
        },
      }),
      { status: 200 }
    );
  };
  const report = await make(
    parseArgs([
      "--runs",
      "2",
      "--stream-url",
      "http://127.0.0.1:1/v1/responses",
      "--stream-format",
      "responses",
      "--stream-model",
      "m1",
    ]),
    fakeFetch
  );
  const m = report.measurements.streamTtft;
  assert.equal(m.status, "ok");
  assert.equal(m.raw.ok, 2);
  assert.equal(m.raw.failed, 0);
  assert.equal(seen.length, 5); // 3 warmup + 2 timed
  assert.equal(JSON.parse(seen[0].init.body).input !== undefined, true);
  assert.equal(JSON.parse(seen[0].init.body).stream, true);
  assert.equal(seen[0].init.headers.authorization, "Bearer sk-test");
  assert.ok(!JSON.stringify(report).includes("sk-test"), "the key never reaches the report");
  assert.match(renderMarkdown(report), /streamTtft/);
});
