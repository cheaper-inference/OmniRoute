/**
 * Content check (`hasUsefulStreamContent`, behind the empty-turn verdict and the
 * content watcher): a `data:` line that is not JSON is not useful stream content.
 * The readiness gate side of the same refusal landed in #17123
 * (stream-readiness-nonjson-garbage.test.ts); the negative readiness cases are
 * repeated here so this file pins both halves of the contract.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  hasStreamReadinessSignal,
  hasUsefulStreamContent,
} from "../../open-sse/utils/streamReadiness.ts";

const contentChunk = (content: string) =>
  `data: ${JSON.stringify({
    id: "chatcmpl-1",
    object: "chat.completion.chunk",
    choices: [{ index: 0, delta: { content } }],
  })}\n\n`;

test("content check refuses a non-JSON data line", () => {
  assert.equal(
    hasUsefulStreamContent("data: <html><body>proxy error 502</body></html>\n\n"),
    false
  );
});

test("content check skips a non-JSON data line and still sees later content", () => {
  assert.equal(
    hasUsefulStreamContent(`data: <html>proxy error</html>\n\n${contentChunk("hello")}`),
    true
  );
});

test("content check keeps a valid JSON payload whose text contains ']data: {'", () => {
  // An answer that quotes SSE framing must stay useful content: the payload is
  // valid JSON, so nothing may split it on the embedded `data:` text.
  assert.equal(hasUsefulStreamContent(contentChunk("x]data: {y")), true);
  assert.equal(hasUsefulStreamContent(contentChunk('x}data: "y')), true);
});

test("readiness gate refuses structural fields and raw text outside data:", () => {
  assert.equal(hasStreamReadinessSignal("retry: 3000\n\n"), false);
  assert.equal(hasStreamReadinessSignal("id: 1\n\n"), false);
  assert.equal(hasStreamReadinessSignal("id: 1\nevent: ping\ndata: {}\n\n"), false);
  assert.equal(hasStreamReadinessSignal("<html><body>502 Bad Gateway</body></html>\n\n"), false);
  assert.equal(hasUsefulStreamContent("<html><body>502 Bad Gateway</body></html>\n\n"), false);
});

test("readiness gate still accepts a non-ping JSON data line", () => {
  assert.equal(hasStreamReadinessSignal(contentChunk("hi")), true);
});
