/**
 * Stream readiness gate: a `data:` line that is not JSON is not a readiness
 * signal, and not useful stream content. Valid JSON is still a signal, and a
 * non-`data:` line is itself a signal.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  hasStreamReadinessSignal,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

test("readiness gate refuses a non-JSON data line", () => {
  // A proxy error page served as `data:` must not satisfy the gate.
  assert.equal(
    hasStreamReadinessSignal("data: <html><body>proxy error 502</body></html>\n\n"),
    false
  );
});

test("readiness gate accepts a JSON data line", () => {
  const chunk = JSON.stringify({
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { role: "assistant" } }],
  });
  assert.equal(hasStreamReadinessSignal(`data: ${chunk}\n\n`), true);
});

test("readiness gate accepts a raw non-data line as a signal", () => {
  // A plain-text (non-SSE) line outside `data:` is itself a readiness signal:
  // the gate accepts a non-ping JSON payload or any non-`data:` line, so a raw
  // line releases the gate instead of timing out.
  assert.equal(hasStreamReadinessSignal("some raw text\n\n"), true);
  // The content check (empty-turn verdict / content watcher) is a separate
  // concern, unchanged here: a raw line is not useful stream content.
  assert.equal(hasUsefulStreamContent("some raw text\n\n"), false);
});

test("content check refuses a non-JSON data line", () => {
  // The same refusal applies to the content check that backs the empty-turn
  // verdict and the content watcher.
  assert.equal(
    hasUsefulStreamContent("data: <html><body>proxy error 502</body></html>\n\n"),
    false
  );
});
