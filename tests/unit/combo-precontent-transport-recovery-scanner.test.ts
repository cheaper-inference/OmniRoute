import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

// Split out of combo-precontent-transport-recovery.test.ts to keep that file under the
// test-file line cap: pure scanner-level frame table, no database or routing involved.
const data = fs.mkdtempSync(path.join(os.tmpdir(), "combo-transport-scanner-"));
process.env.DATA_DIR = data;
process.env.APP_LOG_TO_FILE = "false";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
const { SseOutputScanner } = await import("../../open-sse/services/combo/firstOutputStream.ts");
const ping = "event: ping\ndata: {}\n\n";
const frame = (payload: unknown, event?: string) =>
  `${event ? `event: ${event}\n` : ""}data: ${JSON.stringify(payload)}\n\n`;
function assertScannerVeto(prefix: string | string[], expected: boolean) {
  let observed = false;
  const scanner = new SseOutputScanner(() => {
    observed = true;
  });
  const readiness = new SseOutputScanner();
  for (const chunk of typeof prefix === "string" ? [prefix] : prefix) {
    const ready = scanner.push(chunk);
    assert.equal(ready, readiness.push(chunk), "observer preserves push readiness");
    const overflowed = scanner.overflowedWithoutOutput();
    assert.equal(overflowed, readiness.overflowedWithoutOutput());
    if (ready || overflowed) break;
  }
  assert.equal(scanner.flush(), readiness.flush(), "observer preserves error/EOF flush");
  assert.equal(observed, expected, "scanner's completed frames/output/caps decide replay veto");
}
test.after(() => {
  fs.rmSync(data, { recursive: true, force: true });
});
const splitReviewFrame = (event: string, data: string[]) =>
  [`event: ${event}`, ...data.map((line) => `data: ${line}`), "", ""].join("\r\n").split(/(?<=\r)/);
type ReviewFrame = [string, string | string[], boolean];
const reviewFrames: ReviewFrame[] = [
  [
    "implicit terminal flush on comment",
    'event: response.done\ndata: {"type":"response.done"}\n: ping\n',
    false,
  ],
  ["comment after non-self-describing data", "event: response.done\ndata: {}\n: ping\n", true],
  ["array-valued usage terminal", frame({ choices: null, usage: [] }), false],
  [
    "incomplete terminal frame",
    frame({ type: "response.done" }, "response.done").slice(0, -1),
    true,
  ],
  [
    "incomplete error frame",
    frame({ type: "error", error: { code: "invalid_request_error" } }, "error").slice(0, -1),
    true,
  ],
  [
    "incomplete useful output",
    frame(
      { type: "response.output_text.delta", delta: "hello" },
      "response.output_text.delta"
    ).slice(0, -1),
    false,
  ],
  ["usage terminal with choices null", frame({ choices: null, usage: { total_tokens: 1 } }), false],
  ["usage terminal with non-array choices", frame({ choices: {}, usage: {} }), false],
  ["response.created usage metadata", frame({ type: "response.created", usage: {} }), true],
  ["response.in_progress usage metadata", frame({ type: "response.in_progress", usage: {} }), true],
  [
    "individual JSON data lines",
    splitReviewFrame("response.output_item.added", [
      '{"item":{"type":"message","content":[]}}',
      '{"metadata":true}',
    ]),
    false,
  ],
  ["empty-type terminal", frame({ type: "", response: { output: [] } }, "response.done"), false],
  [
    "empty-type request failure",
    frame({ type: "", response: { error: { code: "invalid_request_error" } } }, "response.failed"),
    false,
  ],
  [
    "empty-type error",
    frame({ type: "", code: "invalid_request_error", message: "invalid request" }, "error"),
    false,
  ],
  [
    "split multiline terminal",
    splitReviewFrame("response.done", ["{", '"response":{"output":[]}}']),
    false,
  ],
  [
    "split multiline request failure",
    splitReviewFrame("response.failed", [
      "{",
      '"response":{"status":"failed","error":{"code":"invalid_request_error"}}}',
    ]),
    false,
  ],
  [
    "split multiline error",
    splitReviewFrame("error", ["{", '"error":{"code":"invalid_request_error"}}']),
    false,
  ],
  [
    "split multiline output item",
    splitReviewFrame("response.output_item.added", [
      "{",
      '"item":{"type":"message","content":[]}}',
    ]),
    false,
  ],
  ["split multiline metadata", splitReviewFrame("ping", ["{", '"metadata":true}']), true],
];
for (const event of ["response.done", "error", "progress"]) {
  reviewFrames.push([
    `review13 oversized complete ${event} then later metadata`,
    [frame({ type: event, padding: "x".repeat(80 * 1024) }, event), ping],
    false,
  ]);
}
reviewFrames.push(["review13 pending line overflow", ":" + "x".repeat(80 * 1024), false]);
reviewFrames.push(["review13 below cap", frame({ padding: "x".repeat(60 * 1024) }), true]);
for (const payload of [true, 1, "signal", []]) {
  for (const event of [
    "response.done",
    "content_block_start",
    "message_stop",
    "message_start",
    "message_delta",
    "progress",
  ]) {
    reviewFrames.push([
      `review13 ${event} ${JSON.stringify(payload)}`,
      frame(payload, event),
      ["message_start", "message_delta", "progress"].includes(event),
    ]);
  }
}
for (const payload of [false, 0, "", null]) {
  reviewFrames.push([
    `review13 falsey terminal ${JSON.stringify(payload)}`,
    frame(payload, "response.done"),
    true,
  ]);
}
reviewFrames.push(["review14 line budget", ":\n".repeat(257), false]);
reviewFrames.push(["review14 below line budget", ":\n".repeat(200), true]);
for (const [label, prefix, recover] of reviewFrames) {
  test(`scanner preserves ${label}`, () => assertScannerVeto(prefix, !recover));
}
