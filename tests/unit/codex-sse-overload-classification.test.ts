import assert from "node:assert/strict";
import test from "node:test";
import { peekCodexSseTransientError } from "../../open-sse/executors/codex.ts";
import { resetDbInstance } from "../../src/lib/db/core.ts";

// Only local synthetic streams; no account/quota/admission or fork-private harness.
test.after(() => resetDbInstance());
function codexFrame(payload: Record<string, unknown>, label = String(payload.type ?? "")) {
  return `${label ? `event: ${label}\n` : ""}data: ${JSON.stringify(payload)}\n\n`;
}
const encoder = new TextEncoder();
const completed = codexFrame({
  type: "response.completed",
  response: { id: "resp_fixture", status: "completed", output: [] },
});
const created = codexFrame({ type: "response.created", response: { status: "in_progress" } });

function responseFromChunks(chunks: Uint8Array[]) {
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        for (const chunk of chunks) controller.enqueue(chunk);
        controller.close();
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );
}

async function assertPassthrough(wire: string, chunks: Uint8Array[] = [encoder.encode(wire)]) {
  const result = await peekCodexSseTransientError(responseFromChunks(chunks), 100);
  assert.equal(result.matched, null, "Model output is not an error declaration");
  assert.equal(result.timedOut ?? false, false);
  assert.ok(result.replacementBody);
  assert.equal(await new Response(result.replacementBody).text(), wire);
}

for (const marker of [
  "server_is_overloaded",
  "service_unavailable_error",
  "Selected model is at capacity",
]) {
  for (const type of [
    "response.output_text.delta",
    "response.reasoning_text.delta",
    "response.function_call_arguments.delta",
    "response.custom_tool_call_input.delta",
  ]) {
    test(`${type} may quote ${marker} without a synthetic 503`, async () => {
      await assertPassthrough(
        created + codexFrame({ type, delta: `🙂 Explain ${marker} literally.` }) + completed
      );
    });
  }
}

for (const newline of ["\n", "\r\n", "\r"]) {
  test(`fragmented named-only output remains byte exact, newline=${JSON.stringify(newline)}`, async () => {
    const wire = (
      created +
      codexFrame({ delta: "🙂 server_is_overloaded" }, "response.output_text.delta") +
      completed
    ).replace(/\n/g, newline);
    const bytes = encoder.encode(wire);
    const chunks: Uint8Array[] = [];
    for (let offset = 0; offset < bytes.length; offset += 3)
      chunks.push(bytes.slice(offset, offset + 3));
    await assertPassthrough(wire, chunks);
  });
}

for (const code of ["context_length_exceeded", "insufficient_quota", "invalid_request_error"]) {
  test(`${code} keeps its verdict when its message quotes a capacity marker`, async () => {
    await assertPassthrough(
      codexFrame({
        type: "response.failed",
        response: {
          status: "failed",
          error: { code, message: "Diagnostic: server_is_overloaded" },
        },
      })
    );
  });
}

test("a genuine failure after output in the SAME network chunk cannot replace that output", async () => {
  await assertPassthrough(
    codexFrame({ type: "response.output_text.delta", delta: "Already visible" }) +
      codexFrame({
        type: "response.failed",
        response: { status: "failed", error: { code: "server_is_overloaded", message: "Busy" } },
      })
  );
});

test("comments, unrelated metadata and malformed data cannot declare an overload", async () => {
  await assertPassthrough(
    ": server_is_overloaded\n\n" +
      codexFrame({
        type: "response.created",
        response: { metadata: { note: "server_is_overloaded" } },
      }) +
      "data: service_unavailable_error is not JSON\n\n" +
      completed
  );
});

test("an incomplete error frame is not inspected as a completed SSE declaration", async () => {
  await assertPassthrough('event: error\ndata: {"error":{"message":"Selected model is at capacity');
});

test("real overload still triggers after lifecycle events, with fragmented multiline data", async () => {
  const error =
    'event: error\ndata: {"error":\ndata: {"code":"server_is_overloaded","message":"Busy"}}\n\n';
  const wire = created + ": heartbeat\n\n" + error;
  const bytes = encoder.encode(wire);
  const chunks = Array.from(bytes, (byte) => Uint8Array.of(byte));
  const result = await peekCodexSseTransientError(responseFromChunks(chunks), 100);
  assert.match(result.matched ?? "", /overloaded/);
  assert.equal(result.replacementBody, null);
});

test("open quoted-output stream is handed off immediately and cancelled exactly once", async () => {
  let cancels = 0;
  const frame = codexFrame({ type: "response.output_text.delta", delta: "server_is_overloaded" });
  const response = new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(frame));
      },
      cancel() {
        cancels++;
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );
  const result = await peekCodexSseTransientError(response, 100);
  try {
    assert.equal(result.matched, null);
    assert.equal(result.timedOut ?? false, false);
    assert.ok(result.replacementBody);
  } finally {
    await result.replacementBody?.cancel();
  }
  assert.equal(cancels, 1);
});
