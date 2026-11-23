// The metadata hold charges its queue up front so the deferred-bytes ceiling covers what the
// queue can actually write: a frame's own bytes plus every tail that will be folded into it.
// Charging only the current render let a long held tail slip past the ceiling.
import assert from "node:assert/strict";
import test from "node:test";

import { createMetadataHold, type MetadataWindow } from "../../src/lib/sseMetadataHold.ts";
import { createMetadataBufferStore } from "../../src/lib/streamingCredentialTransform.ts";

const TAIL = "t".repeat(100);

function holdingWindow(): MetadataWindow {
  const held = new Map<string, string>();
  return {
    process: (text, path) => {
      held.set(path, TAIL);
      return text;
    },
    holds: (path) => (held.get(path) ?? "").length > 0,
    release: (path) => {
      const tail = held.get(path) ?? "";
      held.delete(path);
      return tail;
    },
    heldBytes: (path) => (held.get(path) ?? "").length,
  };
}

test("a held tail counts against the deferred-bytes ceiling", () => {
  const window = holdingWindow();
  const holder: Record<string, unknown> = { method: "GET" };
  const frame = {};
  // Generous until the ceiling is measured; the tail is what pushes it over.
  const hold = createMetadataHold(window, 110);
  hold.redact(holder, "method", "usage_evidence.method", frame, { stop: false, snapshot: false });

  const render = () => JSON.stringify(holder);
  assert.ok(render().length < 110, "the frame itself is under the ceiling");
  assert.ok(render().length + TAIL.length > 110, "the folded tail is what exceeds it");
  assert.throws(
    () => hold.writeFrame(frame, render, () => undefined),
    /Credential stream buffer limit exceeded/
  );
});

test("the held tail still reaches the frame it belongs to", () => {
  const window = holdingWindow();
  const holder: Record<string, unknown> = { method: "GET" };
  const frame = {};
  const hold = createMetadataHold(window, 4096);
  hold.redact(holder, "method", "usage_evidence.method", frame, { stop: false, snapshot: false });

  const written: string[] = [];
  hold.writeFrame(frame, () => JSON.stringify(holder), (text) => written.push(text));
  hold.releaseAll((text) => written.push(text));

  assert.equal(written.length, 1, "the frame is written exactly once, when it is released");
  assert.ok(written[0].includes(TAIL), "the tail is folded into the field it came from");
});

test("the metadata path ceiling names its own limit", () => {
  const store = createMetadataBufferStore(2);
  store.set("a", "1");
  store.set("b", "2");
  assert.throws(() => store.set("c", "3"), /Credential metadata path limit exceeded/);
});

test("a tail that migrates to the next frame is charged once, not twice", () => {
  const window = holdingWindow();
  const first: Record<string, unknown> = { method: "GET" };
  const second: Record<string, unknown> = { method: "POST" };
  const renderFirst = () => JSON.stringify(first);
  const renderSecond = () => JSON.stringify(second);
  const trueTotal = renderFirst().length + renderSecond().length + TAIL.length;
  const hold = createMetadataHold(window, trueTotal + 5);
  const firstFrame = {};
  const secondFrame = {};

  hold.redact(first, "method", "usage_evidence.method", firstFrame, {
    stop: false,
    snapshot: false,
  });
  hold.writeFrame(firstFrame, renderFirst, () => undefined);

  // The second value on the path takes the tail over: the first frame no longer owns it, so
  // only one of the two queued frames may be charged for it.
  hold.redact(second, "method", "usage_evidence.method", secondFrame, {
    stop: false,
    snapshot: false,
  });
  assert.doesNotThrow(() => hold.writeFrame(secondFrame, renderSecond, () => undefined));
});
