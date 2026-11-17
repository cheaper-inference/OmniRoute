import assert from "node:assert/strict";
import { test } from "node:test";
import { backlogged } from "../../../src/app/(dashboard)/dashboard/grok-bot/pressure";

test("a queue with room to spare is not behind", () => {
  assert.equal(backlogged(null), 0);
  assert.equal(backlogged(1), 0);
  assert.equal(backlogged(0), 0);
});

test("a waiting chunk counts as behind", () => {
  assert.equal(backlogged(-1), 1);
});

test("a zero high-water mark still reads while the consumer keeps up", () => {
  let firstVerdict = -1;
  let afterEnqueue = -1;
  new ReadableStream<Uint8Array>(
    {
      start(controller) {
        firstVerdict = backlogged(controller.desiredSize);
        controller.enqueue(new Uint8Array([1]));
        afterEnqueue = backlogged(controller.desiredSize);
        controller.close();
      },
    },
    { highWaterMark: 0 }
  );
  assert.equal(firstVerdict, 0, "an idle stream at a zero mark must not look stalled");
  assert.equal(afterEnqueue, 1);
});
