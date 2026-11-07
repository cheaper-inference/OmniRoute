import test from "node:test";
import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { setFlagsFromString } from "node:v8";
import { runInNewContext } from "node:vm";

const { createOmnirouteWsBridge } = await import("../../scripts/dev/v1-ws-bridge.mjs");

// retainedBytes() needs the gc() function; --expose-gc is not set by the test runner.
setFlagsFromString("--expose-gc");

const DEFAULT_LIMIT = 16 * 1024 * 1024;
const MASK = Buffer.from([0x11, 0x22, 0x33, 0x44]);

// Socket stand-in: the test controls exactly how the bytes are chunked.
class FakeSocket extends EventEmitter {
  destroyed = false;
  writable = true;
  ended = false;
  writes: Buffer[] = [];
  upstreamCalls: string[] = [];
  setNoDelay() {}
  unshift() {}
  write(data: Buffer | string) {
    // Like a net.Socket, data written after end() never reaches the peer.
    if (this.ended) return false;
    this.writes.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
    return true;
  }
  end() {
    this.ended = true;
    this.writable = false;
  }
  destroy() {
    this.destroyed = true;
  }
}

// Answers the handshake and records every other upstream call.
function fakeFetch(calls: string[]) {
  return async (url: URL) => {
    if (url.pathname !== "/api/v1/ws") {
      calls.push(url.pathname);
      return new Response("{}", { status: 200, headers: { "content-type": "application/json" } });
    }
    return new Response(JSON.stringify({ ok: true, originChecked: true, path: "/v1/ws" }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };
}

function requestFrame(id: string) {
  const body = { type: "request", id, payload: { model: "m", messages: [] } };
  return maskedFrame(0x1, Buffer.from(JSON.stringify(body)));
}

async function openSession(options: Record<string, unknown> = {}) {
  const socket = new FakeSocket();
  // Passed as a variable: the parameter type inferred from the .mjs defaults has no baseUrl,
  // and an object literal would fail the excess-property check (TS2353).
  const bridgeOptions = {
    baseUrl: "http://127.0.0.1:1",
    fetchImpl: fakeFetch(socket.upstreamCalls),
    pingIntervalMs: 60_000,
    idleTimeoutMs: 120_000,
    ...options,
  };
  const bridge = createOmnirouteWsBridge(bridgeOptions);
  const req = {
    url: "/v1/ws",
    headers: { upgrade: "websocket", "sec-websocket-key": "dGhlIHNhbXBsZSBub25jZQ==" },
    socket: { remoteAddress: "127.0.0.1" },
  };
  assert.equal(await bridge.handleUpgrade(req, socket, Buffer.alloc(0)), true);
  // writes[0] is the 101 response, writes[1] the session.ready frame.
  assert.match(socket.writes[0].toString("latin1"), /^HTTP\/1\.1 101/);
  return socket;
}

function frameHeader(opcode: number, length: number, fin = true) {
  const byte0 = (fin ? 0x80 : 0) | opcode;
  let header: Buffer;
  if (length < 126) {
    header = Buffer.from([byte0, 0x80 | length]);
  } else if (length <= 0xffff) {
    header = Buffer.alloc(4);
    header[0] = byte0;
    header[1] = 0x80 | 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.alloc(10);
    header[0] = byte0;
    header[1] = 0x80 | 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }
  return Buffer.concat([header, MASK]);
}

function maskedFrame(opcode: number, payload: Buffer, fin = true) {
  const masked = Buffer.from(payload);
  for (let i = 0; i < masked.length; i += 1) masked[i] ^= MASK[i % 4];
  return Buffer.concat([frameHeader(opcode, payload.length, fin), masked]);
}

// A JSON ping envelope padded with spaces to exactly `size` bytes.
function pingPayload(size: number) {
  const base = '{"type":"ping"}';
  assert.ok(size >= base.length);
  return Buffer.from(base.slice(0, -1) + " ".repeat(size - base.length) + "}", "utf8");
}

// Server frames are unmasked; collect them from everything written after the 101.
function serverFrames(socket: FakeSocket) {
  const buffer = Buffer.concat(socket.writes.slice(1));
  const frames: { opcode: number; payload: Buffer }[] = [];
  let offset = 0;
  while (offset < buffer.length) {
    const opcode = buffer[offset] & 0x0f;
    let length = buffer[offset + 1] & 0x7f;
    let headerLength = 2;
    if (length === 126) {
      length = buffer.readUInt16BE(offset + 2);
      headerLength = 4;
    } else if (length === 127) {
      length = Number(buffer.readBigUInt64BE(offset + 2));
      headerLength = 10;
    }
    frames.push({
      opcode,
      payload: buffer.subarray(offset + headerLength, offset + headerLength + length),
    });
    offset += headerLength + length;
  }
  return frames;
}

function jsonMessages(socket: FakeSocket) {
  return serverFrames(socket)
    .filter((frame) => frame.opcode === 0x1)
    .map((frame) => JSON.parse(frame.payload.toString("utf8")));
}

function closeCode(socket: FakeSocket) {
  const close = serverFrames(socket).find((frame) => frame.opcode === 0x8);
  return close ? close.payload.readUInt16BE(0) : null;
}

function closeReason(socket: FakeSocket) {
  const close = serverFrames(socket).find((frame) => frame.opcode === 0x8);
  return close ? close.payload.subarray(2).toString("utf8") : null;
}

async function settle() {
  for (let i = 0; i < 5; i += 1) await new Promise((resolve) => setImmediate(resolve));
}

async function feed(socket: FakeSocket, data: Buffer, chunkSize = data.length) {
  for (let offset = 0; offset < data.length; offset += chunkSize) {
    socket.emit("data", data.subarray(offset, offset + chunkSize));
  }
  await settle();
}

function pongs(socket: FakeSocket) {
  return jsonMessages(socket).filter((message) => message.type === "pong").length;
}

function tooLargeErrors(socket: FakeSocket) {
  return jsonMessages(socket).filter(
    (message) => message.type === "protocol.error" && message.code === "message_too_large"
  ).length;
}

function finish(socket: FakeSocket) {
  socket.emit("close");
}

// Sums the bytes that Buffer.concat, Buffer.allocUnsafe and Buffer.from(<bytes>) produce
// while `run` executes (the ways the bridge can copy input) and records the largest single
// result. Node implements some of these with the others, so only the outermost call counts.
async function countCopies(run: () => Promise<void>) {
  const { concat, allocUnsafe, from } = Buffer;
  let copied = 0;
  let largest = 0;
  let depth = 0;
  const counted =
    <A extends unknown[]>(fn: (...args: A) => Buffer, counts: (args: A) => boolean) =>
    (...args: A) => {
      depth += 1;
      try {
        const result = fn.apply(Buffer, args);
        if (depth === 1 && counts(args)) {
          copied += result.length;
          largest = Math.max(largest, result.length);
        }
        return result;
      } finally {
        depth -= 1;
      }
    };
  Buffer.concat = counted(concat, () => true) as typeof Buffer.concat;
  Buffer.allocUnsafe = counted(allocUnsafe, () => true) as typeof Buffer.allocUnsafe;
  Buffer.from = counted(
    from as (...args: unknown[]) => Buffer,
    (args) => args[0] instanceof Uint8Array
  ) as typeof Buffer.from;
  try {
    await run();
  } finally {
    Object.assign(Buffer, { concat, allocUnsafe, from });
  }
  return { copied, largest };
}

// Largest Buffer.allocUnsafe result while `run` executes, relative to `received()` bytes at
// the time of the call.
async function largestAllocationRatio(received: () => number, run: () => Promise<void>) {
  const { allocUnsafe } = Buffer;
  let ratio = 0;
  let depth = 0;
  Buffer.allocUnsafe = ((size: number) => {
    depth += 1;
    try {
      const result = allocUnsafe(size);
      if (depth === 1) ratio = Math.max(ratio, result.length / received());
      return result;
    } finally {
      depth -= 1;
    }
  }) as typeof Buffer.allocUnsafe;
  try {
    await run();
  } finally {
    Buffer.allocUnsafe = allocUnsafe;
  }
  return ratio;
}

// Heap and ArrayBuffer bytes still reachable after a full GC.
async function retainedBytes() {
  const gc = runInNewContext("gc") as () => void;
  for (let i = 0; i < 3; i += 1) {
    gc();
    await new Promise((resolve) => setImmediate(resolve));
  }
  const usage = process.memoryUsage();
  return { heap: usage.heapUsed, arrayBuffers: usage.arrayBuffers };
}

test("a large frame split into many TCP chunks is joined in linear time", async () => {
  const size = 4 * 1024 * 1024;
  const socket = await openSession();
  const frame = maskedFrame(0x1, pingPayload(size));
  const { copied, largest } = await countCopies(() => feed(socket, frame, 4096));

  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  // Growing the pending buffer by doubling (about 3 x the frame) and copying the payload out
  // (1 x). Re-joining the buffer on every 4 KiB chunk copies about size * chunks / 2 bytes
  // (about 2 GiB here).
  assert.ok(copied < 5 * frame.length, `copied ${copied} bytes for a ${frame.length}-byte frame`);
  // Doubling stops at the frame length instead of overshooting to the next power of two.
  assert.ok(largest <= frame.length, `allocated ${largest} bytes for a ${frame.length}-byte frame`);
  finish(socket);
});

test("many small continuation frames still form one message", async () => {
  const parts = 1024;
  const partSize = 4096;
  const payload = pingPayload(parts * partSize);
  const frames: Buffer[] = [];
  for (let i = 0; i < parts; i += 1) {
    const slice = payload.subarray(i * partSize, (i + 1) * partSize);
    frames.push(maskedFrame(i === 0 ? 0x1 : 0x0, slice, i === parts - 1));
  }
  const socket = await openSession();
  const wire = Buffer.concat(frames);
  const { copied } = await countCopies(() => feed(socket, wire, 1500));

  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  assert.ok(copied < 6 * wire.length, `copied ${copied} bytes for ${wire.length} wire bytes`);
  finish(socket);
});

test("a frame header over the default 16 MiB cap closes with 1009 before the payload", async () => {
  const socket = await openSession();
  await feed(socket, frameHeader(0x1, DEFAULT_LIMIT + 1));

  assert.equal(tooLargeErrors(socket), 1);
  assert.equal(closeCode(socket), 1009);
  assert.equal(socket.ended, true);

  // Later input is ignored once the session is closed: no reply, no upstream request.
  const writes = socket.writes.length;
  await feed(socket, Buffer.concat([maskedFrame(0x1, pingPayload(64)), requestFrame("late")]));
  assert.equal(socket.writes.length, writes);
  assert.deepEqual(socket.upstreamCalls, []);
  finish(socket);
});

test("a 1 GiB 64-bit length is refused from the header alone", async () => {
  const socket = await openSession();
  await feed(socket, Buffer.concat([frameHeader(0x1, 1024 ** 3), Buffer.alloc(65536)]));

  assert.equal(tooLargeErrors(socket), 1);
  assert.equal(closeCode(socket), 1009);
  finish(socket);
});

test("a 64-bit length above Number.MAX_SAFE_INTEGER also closes with 1009", async () => {
  const socket = await openSession();
  const header = frameHeader(0x1, 0);
  const huge = Buffer.alloc(14);
  huge[0] = header[0];
  huge[1] = 0x80 | 127;
  huge.writeBigUInt64BE(2n ** 63n, 2);
  MASK.copy(huge, 10);
  await feed(socket, huge);

  assert.equal(tooLargeErrors(socket), 1);
  assert.equal(closeCode(socket), 1009);
  finish(socket);
});

test("a frame of exactly the default cap is accepted", async () => {
  const socket = await openSession();
  await feed(socket, maskedFrame(0x1, pingPayload(DEFAULT_LIMIT)), 1024 * 1024);

  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  finish(socket);
});

test("custom maxMessageBytes: equal is accepted, one byte over closes with 1009", async () => {
  const limit = 1024;
  const ok = await openSession({ maxMessageBytes: limit });
  await feed(ok, maskedFrame(0x1, pingPayload(limit)), 100);
  assert.equal(pongs(ok), 1);
  assert.equal(closeCode(ok), null);
  finish(ok);

  const over = await openSession({ maxMessageBytes: limit });
  await feed(over, maskedFrame(0x1, pingPayload(limit + 1)), 100);
  assert.equal(pongs(over), 0);
  assert.equal(tooLargeErrors(over), 1);
  assert.equal(closeCode(over), 1009);
  finish(over);
});

test("fragmented message: total at the cap is accepted, one byte over closes with 1009", async () => {
  const limit = 1024;
  const fragmented = (total: number) => {
    const payload = pingPayload(total);
    return Buffer.concat([
      maskedFrame(0x1, payload.subarray(0, 600), false),
      maskedFrame(0x0, payload.subarray(600, 900), false),
      maskedFrame(0x0, payload.subarray(900), true),
    ]);
  };

  const ok = await openSession({ maxMessageBytes: limit });
  await feed(ok, fragmented(limit));
  assert.equal(pongs(ok), 1);
  assert.equal(closeCode(ok), null);
  // The count resets after a complete message.
  await feed(ok, fragmented(limit));
  assert.equal(pongs(ok), 2);
  assert.equal(closeCode(ok), null);
  finish(ok);

  const over = await openSession({ maxMessageBytes: limit });
  await feed(over, fragmented(limit + 1));
  assert.equal(pongs(over), 0);
  assert.equal(tooLargeErrors(over), 1);
  assert.equal(closeCode(over), 1009);
  finish(over);
});

test("first fragment over the cap is refused even without continuation frames", async () => {
  const limit = 1024;
  const socket = await openSession({ maxMessageBytes: limit });
  await feed(socket, maskedFrame(0x1, Buffer.alloc(limit + 1, 0x20), false));
  assert.equal(closeCode(socket), 1009);
  finish(socket);
});

test("invalid maxMessageBytes values fall back to 16 MiB", async () => {
  for (const value of [0, -1, 1.5, "abc", null]) {
    const atCap = await openSession({ maxMessageBytes: value });
    await feed(atCap, frameHeader(0x1, DEFAULT_LIMIT));
    assert.equal(closeCode(atCap), null, `value ${String(value)} at cap`);
    finish(atCap);

    const over = await openSession({ maxMessageBytes: value });
    await feed(over, frameHeader(0x1, DEFAULT_LIMIT + 1));
    assert.equal(closeCode(over), 1009, `value ${String(value)} over cap`);
    finish(over);
  }
});

test("small messages, pings and back-to-back frames in one chunk are unaffected", async () => {
  const socket = await openSession();
  const wire = Buffer.concat([
    maskedFrame(0x1, pingPayload(15)),
    maskedFrame(0x9, Buffer.from("hi")),
    maskedFrame(0x1, pingPayload(300)),
    maskedFrame(0x1, Buffer.from("{bad json")),
  ]);
  // Split mid-header of the second frame to cover header reassembly.
  await feed(socket, wire.subarray(0, 22));
  await feed(socket, wire.subarray(22), 7);

  assert.equal(pongs(socket), 2);
  const wsPong = serverFrames(socket).find((frame) => frame.opcode === 0xa);
  assert.equal(wsPong?.payload.toString(), "hi");
  assert.ok(jsonMessages(socket).some((message) => message.code === "invalid_json"));
  assert.equal(closeCode(socket), null);
  assert.equal(socket.ended, false);
  finish(socket);
});

test("a client close frame gets a close frame back and stops later frames", async () => {
  const socket = await openSession();
  const payload = Buffer.alloc(2);
  payload.writeUInt16BE(1000, 0);
  // A request in the same chunk after the close frame must not reach upstream.
  await feed(socket, Buffer.concat([maskedFrame(0x8, payload), requestFrame("after-close")]));
  assert.equal(closeCode(socket), 1000);
  assert.equal(socket.ended, true);
  assert.deepEqual(socket.upstreamCalls, []);
  finish(socket);
});

test("a request frame still reaches upstream", async () => {
  const socket = await openSession();
  await feed(socket, requestFrame("r1"), 5);
  assert.deepEqual(socket.upstreamCalls, ["/v1/chat/completions"]);
  finish(socket);
});

test("a flood of empty continuation frames closes with 1009 instead of growing memory", async () => {
  const socket = await openSession();
  const empty = frameHeader(0x0, 0, false);
  const wire = Buffer.concat([
    maskedFrame(0x1, Buffer.from("{"), false),
    ...Array(20_000).fill(empty),
  ]);
  await feed(socket, wire, 6000);
  assert.equal(tooLargeErrors(socket), 1);
  assert.equal(closeCode(socket), 1009);
  finish(socket);
});

test("a message of exactly 16384 fragments is accepted, one more closes with 1009", async () => {
  // Start frame carries the whole JSON; the rest are empty continuation frames. Each
  // message is fed as one chunk: onData is not serialized, so frames from several
  // synchronously emitted chunks can interleave in this fake socket.
  const fragmented = (count: number) => {
    const empty = frameHeader(0x0, 0, false);
    return Buffer.concat([
      maskedFrame(0x1, pingPayload(15), false),
      ...Array(count - 2).fill(empty),
      frameHeader(0x0, 0, true),
    ]);
  };

  const ok = await openSession();
  await feed(ok, fragmented(16 * 1024));
  assert.equal(pongs(ok), 1);
  // The fragment count resets after a complete message.
  await feed(ok, fragmented(16 * 1024));
  assert.equal(pongs(ok), 2);
  assert.equal(closeCode(ok), null);
  finish(ok);

  const over = await openSession();
  await feed(over, fragmented(16 * 1024 + 1));
  assert.equal(pongs(over), 0);
  assert.equal(tooLargeErrors(over), 1);
  assert.equal(closeCode(over), 1009);
  finish(over);
});

test("a continuation frame header over the cap closes with 1009 before its payload", async () => {
  const limit = 1024;
  const socket = await openSession({ maxMessageBytes: limit });
  await feed(
    socket,
    Buffer.concat([maskedFrame(0x1, Buffer.from("{"), false), frameHeader(0x0, limit + 1, false)])
  );
  assert.equal(closeCode(socket), 1009);
  finish(socket);
});

test("an unmasked frame closes with 1002 and later input is not re-decoded", async () => {
  const socket = await openSession();
  await feed(socket, Buffer.from([0x81, 0x7f]));
  const decodeErrors = jsonMessages(socket).filter(
    (message) => message.type === "protocol.error" && message.code === "frame_decode_failed"
  );
  assert.equal(decodeErrors.length, 1);
  assert.equal(closeCode(socket), 1002);
  assert.equal(socket.ended, true);
  const writes = socket.writes.length;
  const { copied } = await countCopies(() => feed(socket, Buffer.alloc(256 * 1024, 0x41), 4096));
  assert.equal(copied, 0);
  assert.equal(socket.writes.length, writes);
  finish(socket);
});

test("input after a 1009 close is not buffered or joined", async () => {
  const socket = await openSession({ maxMessageBytes: 1024 });
  await feed(socket, frameHeader(0x1, 1025));
  assert.equal(closeCode(socket), 1009);
  // Under the cap, so only the closed check keeps it from being buffered and answered.
  const late = maskedFrame(0x1, pingPayload(1000));
  const { copied } = await countCopies(() => feed(socket, late, 100));
  assert.equal(copied, 0);
  assert.equal(pongs(socket), 0);
  finish(socket);
});

test("header errors close before back-to-back chunks re-join the buffer", async () => {
  // Chunks queued while the handshake was in flight are emitted without a microtask
  // checkpoint in between, like this fake socket does.
  for (const [header, code, kind] of [
    [Buffer.from([0x81, 0x7f]), 1002, "frame_decode_failed"],
    [frameHeader(0x1, 1025), 1009, "message_too_large"],
  ] as const) {
    const socket = await openSession({ maxMessageBytes: 1024 });
    const { copied } = await countCopies(async () => {
      socket.emit("data", header);
      for (let i = 0; i < 4096; i += 1) socket.emit("data", Buffer.alloc(16, 0x41));
      await settle();
    });
    const errors = jsonMessages(socket).filter(
      (message) => message.type === "protocol.error" && message.code === kind
    );
    assert.equal(errors.length, 1);
    assert.equal(closeCode(socket), code);
    // Only the two small output frames are joined; re-joining the input costs about 134 MB here.
    assert.ok(copied < 1024, `copied ${copied} bytes`);
    finish(socket);
  }
});

test("a frame trickled in 1-byte chunks keeps one buffer, not one object per chunk", async () => {
  // Each read used to stay in a chunk list until the frame was complete: about 107 bytes of
  // heap per read, so 1 MiB in 1-byte reads kept about 107 MiB and an accepted 16 MiB frame
  // ran a 512 MiB heap out of memory.
  const size = 1024 * 1024;
  const socket = await openSession();
  const frame = maskedFrame(0x1, pingPayload(size));
  const before = await retainedBytes();
  for (let offset = 0; offset < frame.length - 1; offset += 1) {
    socket.emit("data", frame.subarray(offset, offset + 1));
    // Let the per-call promises settle, as socket reads would.
    if (offset % 8192 === 8191) await new Promise((resolve) => setImmediate(resolve));
  }
  const held = await retainedBytes();
  const heapGrowth = held.heap - before.heap;
  const bufferGrowth = held.arrayBuffers - before.arrayBuffers;
  assert.ok(heapGrowth < 16 * 1024 * 1024, `heap grew by ${heapGrowth} bytes`);
  // The pending buffer is less than twice the bytes received.
  assert.ok(bufferGrowth < 2 * frame.length, `ArrayBuffers grew by ${bufferGrowth} bytes`);

  await feed(socket, frame.subarray(frame.length - 1));
  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  finish(socket);
});

test("an incomplete tail does not keep the assembled frame alive", async () => {
  const size = 1024 * 1024;
  const socket = await openSession();
  // The last read carries the first byte of the next frame, so a tail stays pending.
  const wire = Buffer.concat([maskedFrame(0x1, pingPayload(size)), Buffer.from([0x81])]);
  const before = await retainedBytes();
  await feed(socket, wire, 4096);
  const held = await retainedBytes();

  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  // A view into the assembled buffer would keep the whole frame for one pending byte.
  const bufferGrowth = held.arrayBuffers - before.arrayBuffers;
  assert.ok(bufferGrowth < size / 2, `ArrayBuffers grew by ${bufferGrowth} bytes`);
  finish(socket);
});

test("a partial header after a completed frame is not held to that frame's length", async () => {
  const socket = await openSession();
  const first = maskedFrame(0x1, pingPayload(1000));
  const second = maskedFrame(0x1, pingPayload(20));
  // Two reads of the first frame, then its last byte with the first byte of the next frame.
  await feed(socket, first.subarray(0, 500));
  await feed(socket, Buffer.concat([first.subarray(500), second.subarray(0, 1)]));
  await feed(socket, second.subarray(1));

  assert.equal(pongs(socket), 2);
  assert.equal(closeCode(socket), null);
  finish(socket);
});

test("a header alone does not allocate the length it claims", async () => {
  const socket = await openSession();
  const header = frameHeader(0x1, DEFAULT_LIMIT);
  const { copied } = await countCopies(async () => {
    for (const byte of header) socket.emit("data", Buffer.from([byte]));
    await feed(socket, Buffer.alloc(64, 0x41), 1);
  });
  assert.ok(copied < 4096, `copied ${copied} bytes for a header and 64 payload bytes`);
  assert.equal(closeCode(socket), null);
  finish(socket);
});

test("control frames are held to the same cap as data frames", async () => {
  for (const opcode of [0x8, 0x9, 0xa]) {
    const socket = await openSession();
    await feed(socket, frameHeader(opcode, DEFAULT_LIMIT + 1));
    assert.equal(tooLargeErrors(socket), 1, `opcode ${opcode}`);
    assert.equal(closeCode(socket), 1009, `opcode ${opcode}`);
    finish(socket);
  }
});

test("close frames carry the reason for each close code", async () => {
  const tooLarge = await openSession({ maxMessageBytes: 1024 });
  await feed(tooLarge, frameHeader(0x1, 1025));
  assert.equal(closeCode(tooLarge), 1009);
  assert.equal(closeReason(tooLarge), "message_too_large");
  finish(tooLarge);

  const unmasked = await openSession();
  await feed(unmasked, Buffer.from([0x81, 0x05]));
  assert.equal(closeCode(unmasked), 1002);
  assert.equal(closeReason(unmasked), "protocol_error");
  finish(unmasked);

  const normal = await openSession();
  const payload = Buffer.alloc(2);
  payload.writeUInt16BE(1000, 0);
  await feed(normal, maskedFrame(0x8, payload));
  assert.equal(closeCode(normal), 1000);
  assert.equal(closeReason(normal), "normal_closure");
  finish(normal);
});

test("a new start frame mid-message resets the fragment count", async () => {
  // An unfinished message is replaced when a new start frame arrives (base behaviour). The new
  // message gets its own 16384 fragments.
  const empty = frameHeader(0x0, 0, false);
  const wire = Buffer.concat([
    maskedFrame(0x1, Buffer.from("x"), false),
    ...Array(16_000).fill(empty),
    maskedFrame(0x1, pingPayload(15), false),
    ...Array(16 * 1024 - 2).fill(empty),
    frameHeader(0x0, 0, true),
  ]);
  const socket = await openSession();
  await feed(socket, wire);
  assert.equal(tooLargeErrors(socket), 0);
  assert.equal(pongs(socket), 1);
  assert.equal(closeCode(socket), null);
  finish(socket);
});

test("16-bit and 64-bit length headers split across reads are read only when complete", async () => {
  for (const size of [200, 70_000]) {
    const socket = await openSession();
    const frame = maskedFrame(0x1, pingPayload(size));
    const headerLength = size < 0x10000 ? 8 : 14;
    await feed(socket, frame.subarray(0, headerLength), 1);
    await feed(socket, frame.subarray(headerLength));
    const errors = jsonMessages(socket).filter((message) => message.type === "protocol.error");
    assert.deepEqual(errors, [], `size ${size}`);
    assert.equal(pongs(socket), 1, `size ${size}`);
    finish(socket);
  }
});

test("frames right behind a bad header get no reply and start no request", async () => {
  // Both later frames arrive in their own reads, back to back with no microtask in between,
  // like chunks queued during the handshake. A close made only in the promise's catch
  // handler would run after both were decoded.
  const unmaskedPing = Buffer.concat([Buffer.from([0x81, 0x0f]), Buffer.from('{"type":"ping"}')]);
  for (const [header, code] of [
    [unmaskedPing, 1002],
    [frameHeader(0x1, 1025), 1009],
  ] as const) {
    const socket = await openSession({ maxMessageBytes: 1024 });
    socket.emit("data", header);
    socket.emit("data", maskedFrame(0x1, pingPayload(100)));
    socket.emit("data", requestFrame("after-bad-header"));
    await settle();
    assert.equal(closeCode(socket), code);
    assert.equal(pongs(socket), 0, `close ${code}`);
    assert.deepEqual(socket.upstreamCalls, [], `close ${code}`);
    finish(socket);
  }
});

test("an unmasked continuation or control frame closes with 1002", async () => {
  const socket = await openSession();
  const start = Buffer.from('{"type":');
  const rest = Buffer.from('"ping"}');
  await feed(socket, maskedFrame(0x1, start, false));
  await feed(socket, Buffer.concat([Buffer.from([0x80, rest.length]), rest]));
  assert.equal(closeCode(socket), 1002);
  assert.equal(pongs(socket), 0);
  finish(socket);

  const control = await openSession();
  await feed(control, Buffer.from([0x89, 0x00]));
  assert.equal(closeCode(control), 1002);
  assert.equal(
    serverFrames(control).some((frame) => frame.opcode === 0xa),
    false
  );
  finish(control);
});

test("a 1-byte trickle never allocates more than twice the bytes received", async () => {
  const socket = await openSession();
  const frame = maskedFrame(0x1, pingPayload(64 * 1024));
  let received = 0;
  const ratio = await largestAllocationRatio(
    () => received,
    async () => {
      for (; received < frame.length - 1;) {
        received += 1;
        socket.emit("data", frame.subarray(received - 1, received));
      }
      await settle();
    }
  );
  assert.ok(ratio <= 2, `allocated ${ratio} x the bytes received`);
  await feed(socket, frame.subarray(frame.length - 1));
  assert.equal(pongs(socket), 1);
  finish(socket);
});
