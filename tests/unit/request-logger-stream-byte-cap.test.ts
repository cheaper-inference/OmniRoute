import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-byte-cap-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_SSE_COMMENTS = "off";

const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type Logger = Awaited<ReturnType<typeof createRequestLogger>>;
const stages = [
  ["provider", "appendProviderChunk"],
  ["openai", "appendOpenAIChunk"],
  ["client", "appendConvertedChunk"],
] as const;
const timestampBytes = 15; // "[HH:MM:SS.mmm] "
const byteMarker = (cap: number) => `[stream chunk log truncated after ${cap} bytes]`;
const itemMarker = (cap: number) => `[stream chunk log truncated after ${cap} chunks]`;
const isMarker = (chunk: string) => chunk.startsWith("[stream chunk log truncated after ");
const byteLength = (chunks: string[]) => Buffer.byteLength(chunks.join(""), "utf8");

function captured(logger: Logger, stage: (typeof stages)[number][0]): string[] {
  const chunks = logger.getPipelinePayloads()?.streamChunks?.[stage];
  assert.ok(chunks, `${stage} capture must exist`);
  return chunks;
}

function assertBounded(chunks: string[], cap: number, maxItems = 10_240) {
  const dataBytes = byteLength(chunks.filter((chunk) => !isMarker(chunk)));
  assert.ok(dataBytes <= cap, `captured UTF-8 data ${dataBytes} exceeds ${cap} bytes`);
  assert.ok(chunks.length <= maxItems, "markers must fit within the item cap");
  assert.ok(chunks.filter(isMarker).length <= 1, "at most one truncation marker per stage");
  // Preserve the existing marker text: its overhead is separate from the data budget.
  const markerBytes = Math.max(
    Buffer.byteLength(byteMarker(cap)),
    Buffer.byteLength(itemMarker(maxItems))
  );
  assert.ok(byteLength(chunks) <= cap + markerBytes, "total capture has bounded marker overhead");
  for (const chunk of chunks) {
    assert.equal(
      chunk,
      Buffer.from(chunk, "utf8").toString("utf8"),
      "capture must contain whole code points"
    );
  }
}

test("stream chunk caps enforce UTF-8 bytes including timestamps on all three stages", async () => {
  for (const input of ["A".repeat(200), "界".repeat(128), "😀".repeat(128), "a界😀".repeat(80)]) {
    const logger = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: 128,
    });
    for (const [stage, append] of stages) {
      logger[append](input);
      const chunks = captured(logger, stage);
      assertBounded(chunks, 128);
      assert.match(chunks[0], /^\[\d{2}:\d{2}:\d{2}\.\d{3}\] /);
      assert.equal(chunks.at(-1), byteMarker(128));
    }
  }
});

test("stream chunk truncation preserves complete Unicode code points at byte boundaries", async () => {
  const cases: Array<[number, string, string]> = [
    [0, "界😀a", ""],
    [1, "界😀a", ""],
    [2, "界😀a", ""],
    [3, "界😀a", "界"],
    [4, "界😀a", "界"],
    [6, "界😀a", "界"],
    [7, "界😀a", "界😀"],
    [8, "界😀a", "界😀a"],
    [3, "😀界a", ""],
    [4, "😀界a", "😀"],
    [6, "😀界a", "😀"],
    [7, "😀界a", "😀界"],
    [3, "\ud800界", "\ufffd"],
    [5, "\ud800界", "\ufffd"],
    [6, "\ud800界", "\ufffd界"],
    [3, "\udc00😀", "\ufffd"],
    [7, "\udc00😀", "\ufffd😀"],
  ];
  for (const [payloadBytes, input, expected] of cases) {
    const cap = timestampBytes + payloadBytes;
    const logger = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: cap,
    });
    logger.appendProviderChunk(input.repeat(10));
    const chunks = captured(logger, "provider");
    assertBounded(chunks, cap);
    assert.equal(chunks[0].slice(timestampBytes), expected, `payload budget: ${payloadBytes}`);
    assert.equal(chunks.at(-1), byteMarker(cap));
  }
});

test("stream chunk caps handle tiny budgets and malformed Unicode that fits", async () => {
  for (const cap of [1, 2, 7, 14, 15, 16, 17, 18]) {
    const logger = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: cap,
    });
    for (const [stage, append] of stages) {
      logger[append]("😀界");
      assertBounded(captured(logger, stage), cap);
    }
  }
  const logger = await createRequestLogger("openai", "openai", "test", { maxStreamChunkBytes: 64 });
  logger.appendProviderChunk("\ud800a\udc00");
  assertBounded(captured(logger, "provider"), 64);
  assert.equal(captured(logger, "provider")[0].slice(timestampBytes), "\ufffda\ufffd");
});

test("stream chunk UTF-8 budgets accumulate independently and stop after truncation", async () => {
  const logger = await createRequestLogger("openai", "openai", "test", {
    maxStreamChunkBytes: 128,
  });
  for (const [stage, append] of stages) {
    logger[append]("界".repeat(10));
    logger[append]("界".repeat(10));
    logger[append]("界".repeat(10));
    const chunks = captured(logger, stage);
    assertBounded(chunks, 128);
    assert.equal(byteLength(chunks.filter((chunk) => !isMarker(chunk))), 126);
    assert.equal(chunks.at(-1), byteMarker(128));
    const snapshot = [...chunks];
    for (let n = 0; n < 5; n++) logger[append]("late");
    assert.deepEqual(chunks, snapshot, "capture stops permanently at the first truncation");
  }
});

test("stream chunk exact byte fits preserve the existing marker policy", async () => {
  for (const input of ["ascii", "界", "😀", "界😀"]) {
    const cap = timestampBytes + Buffer.byteLength(input);
    const logger = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: cap,
    });
    logger.appendProviderChunk(input);
    const chunks = captured(logger, "provider");
    assertBounded(chunks, cap);
    assert.equal(chunks.length, 1);
    assert.equal(chunks[0].slice(timestampBytes), input);
    logger.appendProviderChunk("late");
    assert.equal(chunks.length, 1, "an already full byte budget does not add a marker");
  }
});

test("stream chunk item limits include existing truncation markers", async () => {
  for (const maxItems of [1, 2, 3]) {
    const logger = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: 128,
      maxStreamChunkItems: maxItems,
    });
    for (let n = 0; n < maxItems + 3; n++) logger.appendProviderChunk("界");
    const chunks = captured(logger, "provider");
    assertBounded(chunks, 128, maxItems);
    assert.equal(chunks.length, maxItems);
    assert.equal(chunks.at(-1), itemMarker(maxItems));

    const oversized = await createRequestLogger("openai", "openai", "test", {
      maxStreamChunkBytes: 128,
      maxStreamChunkItems: maxItems,
    });
    oversized.appendProviderChunk("界".repeat(128));
    const bounded = captured(oversized, "provider");
    assertBounded(bounded, 128, maxItems);
    assert.equal(bounded.filter(isMarker).length, maxItems > 1 ? 1 : 0);
    const snapshot = [...bounded];
    oversized.appendProviderChunk("late");
    assert.deepEqual(bounded, snapshot);
  }
});

test("stream chunk capture bounds a large source to its copied Unicode prefix", async () => {
  const logger = await createRequestLogger("openai", "openai", "test", {
    maxStreamChunkBytes: 128,
  });
  logger.appendProviderChunk("界😀".repeat(1_000_000));
  const chunks = captured(logger, "provider");
  assertBounded(chunks, 128);
  assert.equal(chunks[0].slice(timestampBytes), "界😀".repeat(16));
});

test("UTF-8 log truncation leaves the forwarded SSE payload intact", async () => {
  const { createPassthroughStreamWithLogger } = await import("../../open-sse/utils/stream.ts");
  const logger = await createRequestLogger("openai", "openai", "test", {
    maxStreamChunkBytes: 128,
  });
  const content = "界😀".repeat(128);
  const event = `data: ${JSON.stringify({
    id: "utf8-cap",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  })}\n\n`;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(event));
      controller.enqueue(new TextEncoder().encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const output = await new Response(
    source.pipeThrough(createPassthroughStreamWithLogger(null, logger))
  ).text();
  assert.ok(output.includes(event), "the complete Unicode SSE event must reach the client");
  assert.ok(output.includes("data: [DONE]"));
  assertBounded(captured(logger, "provider"), 128);
  assertBounded(captured(logger, "client"), 128);
});
