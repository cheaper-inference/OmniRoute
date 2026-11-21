import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSseChunk, summarizeStream } from "../../scripts/homolog/lib/sseCheck.mjs";

test("parseSseChunk separa eventos data: e detecta [DONE]", () => {
  const events = parseSseChunk('data: {"choices":[{"delta":{"content":"O"}}]}\n\ndata: [DONE]\n\n');
  assert.equal(events.length, 2);
  assert.equal(events[1], "[DONE]");
});

test("parseSseChunk acha data: mesmo precedido de comment-lines SSE no mesmo bloco", () => {
  // VPS real format (v3.8.47): telemetry trailers as comments (`:x-omniroute-*`)
  // in the SAME block as the data: [DONE] — the parser cannot look at just the beginning of the block.
  const chunk =
    'data: {"choices":[{"delta":{"content":"OK"}}]}\n\n' +
    ": x-omniroute-cache-hit=false\n: x-omniroute-latency-ms=67\ndata: [DONE]\n\n";
  const events = parseSseChunk(chunk);
  assert.deepEqual(events, ['{"choices":[{"delta":{"content":"OK"}}]}', "[DONE]"]);
});

test("summarizeStream requires >=1 content delta and terminator [DONE]", () => {
  const good = summarizeStream(['{"choices":[{"delta":{"content":"OK"}}]}', "[DONE]"]);
  assert.equal(good.ok, true);
  const noDone = summarizeStream(['{"choices":[{"delta":{"content":"OK"}}]}']);
  assert.equal(noDone.ok, false);
  const noContent = summarizeStream(["[DONE]"]);
  assert.equal(noContent.ok, false);
});
