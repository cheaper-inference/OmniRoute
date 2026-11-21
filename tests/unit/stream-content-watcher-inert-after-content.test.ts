import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "or9r-content-watcher-"));

const { createStreamContentWatcher } = await import("../../open-sse/utils/streamReadiness.ts");

const contentFrame = (text: string) =>
  `data: ${JSON.stringify({ choices: [{ delta: { content: text } }] })}\n\n`;

// Count JSON.parse calls made while `run` executes (the watcher parses every data line).
function countParses(run: () => void): number {
  const original = JSON.parse;
  let calls = 0;
  JSON.parse = ((...args: Parameters<typeof JSON.parse>) => {
    calls += 1;
    return original(...args);
  }) as typeof JSON.parse;
  try {
    run();
  } finally {
    JSON.parse = original;
  }
  return calls;
}

test("content watcher stops parsing frames once content is proven", () => {
  const watcher = createStreamContentWatcher();
  watcher.note(contentFrame("first"));
  assert.equal(watcher.sawContent(), true);

  const parses = countParses(() => {
    for (let i = 0; i < 500; i += 1) watcher.note(contentFrame(`token ${i}`));
    watcher.finish();
  });

  assert.equal(parses, 0, "no frame is parsed after content is seen");
  assert.equal(watcher.sawContent(), true);
});

test("content watcher keeps scanning every frame while content is absent", () => {
  const watcher = createStreamContentWatcher();
  const parses = countParses(() => {
    for (let i = 0; i < 50; i += 1) watcher.note(`data: ${JSON.stringify({ choices: [] })}\n\n`);
  });
  assert.ok(parses >= 50, `every frame is parsed while content is absent, got ${parses}`);
  assert.equal(watcher.sawContent(), false);
  assert.equal(watcher.sawSseFrame(), true);
});

test("pre-content flags still work: error frame, legit empty terminal, reasoning progress", () => {
  const errored = createStreamContentWatcher();
  errored.note('data: {"type":"error","error":{"type":"overloaded_error","message":"busy"}}\n\n');
  assert.equal(errored.sawError(), true);
  assert.equal(errored.sawContent(), false);

  const empty = createStreamContentWatcher();
  empty.note('data: {"choices":[{"delta":{},"finish_reason":"length"}]}\n\n');
  assert.equal(empty.sawLegitEmptyTerminal(), true);
  assert.equal(empty.sawContent(), false);

  const thinking = createStreamContentWatcher();
  thinking.note(
    'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":""}}\n\n'
  );
  thinking.note(
    'event: content_block_delta\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking","thinking":""}}\n\n'
  );
  assert.equal(thinking.sawContent(), false);
  assert.equal(thinking.reasoningProgress(), 2);
});

test("a content frame split across chunks is still detected", () => {
  const watcher = createStreamContentWatcher();
  const frame = contentFrame("split");
  watcher.note(frame.slice(0, 12));
  assert.equal(watcher.sawContent(), false);
  watcher.note(frame.slice(12));
  assert.equal(watcher.sawContent(), true);
});
