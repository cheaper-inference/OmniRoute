import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-scan-terminal-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();
const ITEM_COUNT = 200;

const sse = (event: object) => `data: ${JSON.stringify(event)}\n\n`;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("commentary filter scans the retained items only on response.completed", async () => {
  const events: string[] = [
    sse({ type: "response.created", response: { id: "resp_scan", output: [] } }),
  ];
  for (let i = 0; i < ITEM_COUNT; i++) {
    events.push(
      sse({
        type: "response.output_item.done",
        output_index: i,
        item: {
          id: `msg_${i}`,
          type: "message",
          role: "assistant",
          phase: "final",
          content: [{ type: "output_text", text: `t${i}` }],
        },
      })
    );
  }
  for (let i = 0; i < 10; i++) {
    events.push(
      sse({
        type: "response.output_text.delta",
        item_id: "msg_x",
        output_index: 0,
        content_index: 0,
        delta: "x",
      })
    );
  }
  events.push(
    sse({
      type: "response.completed",
      response: { id: "resp_scan", object: "response", status: "completed", output: [] },
    })
  );

  const source = new ReadableStream({
    start(controller) {
      for (const e of events) controller.enqueue(textEncoder.encode(e));
      controller.close();
    },
  });

  // The commentary filter is Array#filter over the retained list, so count the
  // filter calls that see a list of full size.
  const originalFilter = Array.prototype.filter;
  let fullScans = 0;
  Array.prototype.filter = function (this: unknown[], ...args: Parameters<typeof originalFilter>) {
    if (this.length >= ITEM_COUNT) fullScans++;
    return originalFilter.apply(this, args);
  } as typeof Array.prototype.filter;
  let text: string;
  try {
    text = await new Response(
      source.pipeThrough(
        createSSEStream({
          mode: "passthrough",
          sourceFormat: FORMATS.OPENAI_RESPONSES,
          clientResponseFormat: FORMATS.OPENAI_RESPONSES,
          provider: "openai",
          model: "gpt-4.1-mini",
          body: { input: "hi" },
          dropResponsesCommentary: true,
        })
      )
    ).text();
  } finally {
    Array.prototype.filter = originalFilter;
  }

  const completed = text
    .split("\n\n")
    .filter((b) => b.includes('"response.completed"'))
    .map((b) => JSON.parse(b.replace(/^data: /, "")))[0];
  assert.equal(completed.response.output.length, ITEM_COUNT, "terminal backfill must still work");
  assert.ok(fullScans <= 1, `expected at most 1 full scan (response.completed), got ${fullScans}`);
});
