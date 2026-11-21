import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readConnectFrames } from "../../open-sse/utils/connectFrames.ts";

function frame(value: unknown, flag = 0): Buffer {
  const body = Buffer.from(JSON.stringify(value));
  const header = Buffer.alloc(5);
  header[0] = flag;
  header.writeUInt32BE(body.length, 1);
  return Buffer.concat([header, body]);
}
function source(chunks: Uint8Array[]) {
  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
    },
    cancel() {
      cancelled = true;
    },
  });
  return { stream, wasCancelled: () => cancelled };
}
it("refuses a frame that grows past the cap instead of buffering it", async () => {
  const body = Buffer.from(JSON.stringify({ pad: "x".repeat(4096) }));
  const header = Buffer.alloc(5);
  header[0] = 0;
  header.writeUInt32BE(body.length, 1);
  const big = Buffer.concat([header, body]);
  const { stream } = source([big]);
  await assert.rejects(async () => {
    for await (const _ of readConnectFrames(stream, 1024)) {
      // draining is the point: the guard has to fire before the frame is decoded
    }
  }, /exceeds the size cap/);
});

it("accepts the same frame when the cap allows it", async () => {
  const body = Buffer.from(JSON.stringify({ pad: "x".repeat(4096) }));
  const header = Buffer.alloc(5);
  header[0] = 0;
  header.writeUInt32BE(body.length, 1);
  const { stream } = source([Buffer.concat([header, body]), frame({}, 0x02)]);
  const values: unknown[] = [];
  for await (const value of readConnectFrames(stream, 64 * 1024)) values.push(value);
  assert.equal(values.length, 1);
});

async function collect(stream: ReadableStream<Uint8Array>): Promise<unknown[]> {
  const values: unknown[] = [];
  for await (const value of readConnectFrames(stream)) values.push(value);
  return values;
}

describe("Grok Bot Connect frame boundaries", () => {
  it("preserves frames split at every byte and terminates at the trailer", async () => {
    const data = Buffer.concat([
      frame({ text: "你好" }),
      frame({ id: 2 }),
      frame({}, 2),
      frame({ ignored: true }),
    ]);
    for (let split = 1; split < data.length; split += 1) {
      const fixture = source([data.subarray(0, split), data.subarray(split)]);
      assert.deepEqual(await collect(fixture.stream), [{ text: "你好" }, { id: 2 }]);
      assert.equal(fixture.wasCancelled(), true);
    }
  });
  it("skips non-JSON data flags without losing the next frame", async () => {
    const fixture = source([
      Buffer.concat([frame({ ignoredPayload: true }, 1), frame({ ok: true }), frame({}, 2)]),
    ]);
    assert.deepEqual(await collect(fixture.stream), [{ ok: true }]);
  });
  it("reports trailer errors and cancels the reader", async () => {
    const fixture = source([frame({ error: { code: "permission_denied", message: "no" } }, 2)]);
    await assert.rejects(collect(fixture.stream), /connect stream error: permission_denied no/);
    assert.equal(fixture.wasCancelled(), true);
  });
  it("cancels after invalid JSON instead of leaving a stream alive", async () => {
    const fixture = source([new Uint8Array([0, 0, 0, 0, 1, 123])]);
    await assert.rejects(collect(fixture.stream), SyntaxError);
    assert.equal(fixture.wasCancelled(), true);
  });
});
