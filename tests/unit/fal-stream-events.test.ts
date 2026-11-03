import test from "node:test";
import assert from "node:assert/strict";
import {
  readFalEvents,
  mergeFalEvent,
  type FalStreamState,
} from "../../open-sse/handlers/fal/events.ts";

test("native final snapshots preserve null, false, zero and empty text", () => {
  for (const value of [null, false, 0, ""]) {
    const state = mergeFalEvent(
      { artifacts: [], events: [] },
      { event: "final", data: { partial: false, output: value } }
    );
    assert.equal(state.final, value);
  }
});

test("SSE preserves split UTF-8, CRLF, multiline data, native names, files and cumulative snapshots", async () => {
  const url = "https://cdn.example/mesh.glb?signature=a%2Fb&x=1";
  const payload = {
    partial: true,
    output: "é",
    reasoning: "separate",
    files: [
      { url, file_name: "mesh.glb", content_type: "model/gltf-binary", path: "native.mesh" },
      { url: "https://cdn.example/texture.png", file_name: "texture.png" },
    ],
  };
  const raw = `: heartbeat\r\nevent: progress\r\ndata: ${JSON.stringify(payload)}\r\n\r\ndata: ${JSON.stringify(payload)}\n\nevent: note\ndata: first\ndata: second\n\nevent: final\ndata: {"partial":false,\ndata: "output":"é cube","reasoning":"separate"}\n\nevent: error\ndata: {"error":"upstream error"}\n\n`;
  const bytes = new TextEncoder().encode(raw);
  let state: FalStreamState = { artifacts: [], events: [] };
  await readFalEvents(
    new ReadableStream({
      start(c) {
        // One-byte chunks split both UTF-8 code points and frame separators.
        for (const b of bytes) c.enqueue(Uint8Array.of(b));
        c.close();
      },
    }),
    (event) => {
      state = mergeFalEvent(state, event);
    }
  );
  assert.equal(state.artifacts.length, 2);
  assert.equal(state.artifacts[0].url, url);
  assert.equal(state.artifacts[0].path, "native.mesh");
  assert.equal(state.partial, "é");
  assert.equal(state.final, "é cube");
  assert.equal(state.reasoning, "separate");
  assert.equal(state.error, "upstream error");
  assert.deepEqual(state.events[2], { event: "note", data: "first\nsecond" });
});

test("truncated SSE and cancelled readers do not report successful completion", async () => {
  let cancelled = 0;
  const abort = new AbortController();
  const body = new ReadableStream<Uint8Array>({
    start(c) {
      c.enqueue(new TextEncoder().encode('data: {"partial":true}\n\n'));
    },
    cancel() {
      cancelled++;
    },
  });
  await assert.rejects(
    readFalEvents(body, () => abort.abort(), abort.signal),
    { name: "AbortError" }
  );
  assert.equal(cancelled, 1);
  assert.equal(body.locked, false);
  await assert.rejects(
    readFalEvents(
      new ReadableStream({
        start(c) {
          c.enqueue(new TextEncoder().encode("data: truncated"));
          c.close();
        },
      }),
      () => {}
    ),
    /incomplete event/
  );
});

test("native text and malformed JSON remain visible and event history is bounded", () => {
  let state: FalStreamState = { artifacts: [], events: [] };
  for (let i = 0; i < 80; i++)
    state = mergeFalEvent(state, { event: "native", data: `{"invalid":${i}` });
  assert.equal(state.events.length, 40);
  assert.equal(state.events[39].data, '{"invalid":79');
});
