import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-stream-line-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const core = await import("../../src/lib/db/core.ts");

const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const textEncoder = new TextEncoder();
const CHUNK_CHARS = 16 * 1024;

function contentFrame(content: string): string {
  return `data: ${JSON.stringify({
    id: "chatcmpl_cap",
    object: "chat.completion.chunk",
    created: 1,
    model: "gpt-4.1-mini",
    choices: [{ index: 0, delta: { content }, finish_reason: null }],
  })}\n\n`;
}

function makeStream(onFailure?: (payload: { code?: string }) => boolean) {
  return createSSEStream({
    mode: "passthrough",
    sourceFormat: FORMATS.OPENAI,
    provider: "openai",
    model: "gpt-4.1-mini",
    body: { messages: [{ role: "user", content: "hi" }] },
    onFailure,
  } as never);
}

// A source that sends one newline-free "line" in 16 KiB pieces, after optional leading frames.
// With `closeAsJson`, the line is a JSON event that is closed and terminated once fully sent,
// so a stream that reads the whole line ends on a valid event (a non-JSON `data:` tail fails).
function endlessLineSource(leading: string[], totalChars: number, closeAsJson = false) {
  let sent = 0;
  let leadingIdx = 0;
  let closed = false;
  return new ReadableStream<Uint8Array>({
    pull(controller) {
      if (leadingIdx < leading.length) {
        controller.enqueue(textEncoder.encode(leading[leadingIdx++]));
        return;
      }
      if (sent >= totalChars) {
        if (closeAsJson && !closed) {
          closed = true;
          controller.enqueue(textEncoder.encode('"}\n\n'));
          return;
        }
        controller.close();
        return;
      }
      const prefix = sent === 0 ? (closeAsJson ? 'data: {"pad":"' : "data: ") : "";
      controller.enqueue(textEncoder.encode(prefix + "x".repeat(CHUNK_CHARS - prefix.length)));
      sent += CHUNK_CHARS;
    },
  });
}

async function readAll(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let text = "";
  let error: Error | null = null;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      text += decoder.decode(value, { stream: true });
    }
  } catch (e) {
    error = e as Error;
  }
  return { text, error };
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("a newline-free upstream line is scanned for a newline in new text only", async () => {
  const scanned: number[] = [];
  const original = String.prototype.lastIndexOf;
  String.prototype.lastIndexOf = function (this: string, ...args: [string, number?]) {
    if (args[0] === "\n") scanned.push(this.length);
    return original.apply(this, args);
  };
  try {
    const frames = 120; // 120 x 16 KiB = ~2 MiB, one line, no newline
    const { error } = await readAll(
      endlessLineSource([], frames * CHUNK_CHARS, true).pipeThrough(makeStream())
    );
    assert.equal(error, null, "the whole line must be read, not rejected early");
  } finally {
    String.prototype.lastIndexOf = original;
  }
  assert.ok(scanned.length >= 120, `expected one scan per chunk, got ${scanned.length}`);
  const widest = Math.max(0, ...scanned);
  assert.ok(
    widest <= 2 * CHUNK_CHARS,
    `newline scan walked ${widest} chars; it must stay within one network chunk`
  );
});

test("a pending upstream line over the cap ends the stream with one error frame", async () => {
  const failures: string[] = [];
  const stream = endlessLineSource([contentFrame("Hello ")], 65 * 1024 * 1024).pipeThrough(
    makeStream((payload) => {
      failures.push(String(payload.code));
      return false;
    })
  );
  const { text } = await readAll(stream);

  assert.match(text, /"content":"Hello "/, "content sent before the overflow stays delivered");
  assert.equal(failures.length, 1, "onFailure fires once");
  assert.equal(failures[0], "invalid_sse_payload");
  const errorFrames = text
    .split("\n\n")
    .filter((b) => b.startsWith("data: ") && b.includes('"error"'));
  assert.equal(errorFrames.length, 1, `expected one error frame, got:\n${text.slice(-400)}`);
  assert.doesNotThrow(() => JSON.parse(errorFrames[0].slice(6)));
  assert.ok(!text.includes("xxxxxxxx"), "the oversize line itself is never forwarded");
});

test("a multibyte pending line is capped by UTF-8 bytes, not UTF-16 code units", async () => {
  // 3-byte characters: 22M of them are 66 MB on the wire but only 22M code units.
  const piece = textEncoder.encode("\u20ac".repeat(8192));
  const first = textEncoder.encode("data: ");
  const total = 22 * 1024 * 1024 * 3;
  let sent = 0;
  const failures: string[] = [];
  const source = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (sent >= total) return controller.close();
      controller.enqueue(sent === 0 ? first : piece);
      sent += sent === 0 ? first.length : piece.length;
    },
  });
  const { text } = await readAll(
    source.pipeThrough(
      makeStream((payload) => {
        failures.push(String(payload.code));
        return false;
      })
    )
  );
  assert.deepEqual(failures, ["invalid_sse_payload"]);
  assert.ok(!text.includes("\u20ac\u20ac\u20ac"), "the oversize line itself is never forwarded");
});

test("a chunk that takes the pending line over the cap and ends it with a newline is refused", async () => {
  const failures: string[] = [];
  const cap = 64 * 1024 * 1024;
  const head = textEncoder.encode("data: " + "x".repeat(CHUNK_CHARS - 6));
  const tail = textEncoder.encode("y".repeat(4096) + "\n\n");
  let sent = 0;
  let tailSent = false;
  const source = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (sent < cap - 1024) {
        controller.enqueue(head);
        sent += head.length;
      } else if (!tailSent) {
        tailSent = true;
        controller.enqueue(tail);
      } else {
        controller.close();
      }
    },
  });
  const { text } = await readAll(
    source.pipeThrough(
      makeStream((payload) => {
        failures.push(String(payload.code));
        return false;
      })
    )
  );
  assert.deepEqual(failures, ["invalid_sse_payload"]);
  assert.ok(!text.includes("yyyyyyyy"), "the oversize line itself is never forwarded");
});

test("normal multi-chunk lines under the cap are unchanged", async () => {
  const big = "y".repeat(3 * CHUNK_CHARS);
  const frame = contentFrame(big);
  const pieces: string[] = [];
  for (let i = 0; i < frame.length; i += CHUNK_CHARS) pieces.push(frame.slice(i, i + CHUNK_CHARS));
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const p of pieces) controller.enqueue(textEncoder.encode(p));
      controller.enqueue(textEncoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  const { text, error } = await readAll(source.pipeThrough(makeStream()));
  assert.equal(error, null);
  assert.ok(text.includes(big));
});
