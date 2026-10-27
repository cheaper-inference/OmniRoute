import assert from "node:assert/strict";
import { test } from "node:test";
import {
  readRequestBodyWithLimit,
  RequestBodyTooLargeError,
} from "../../src/shared/middleware/bodySizeGuard.ts";

function request(stream: ReadableStream<Uint8Array>, signal: AbortSignal) {
  return new Request("http://localhost/v1/systemone", {
    method: "POST",
    body: stream,
    signal,
    duplex: "half",
  } as RequestInit & { duplex: "half" });
}
async function bounded<T>(pending: Promise<T>): Promise<T | "test-timeout"> {
  let timeout: ReturnType<typeof setTimeout>;
  try {
    return await Promise.race([
      pending,
      new Promise<"test-timeout">((resolve) => {
        timeout = setTimeout(() => resolve("test-timeout"), 100);
      }),
    ]);
  } finally {
    clearTimeout(timeout!);
  }
}

test("optional cancellation settles a stalled read without awaiting stalled underlying cancel", async () => {
  const controller = new AbortController();
  let close: () => void = () => {};
  let releaseCancel: () => void = () => {};
  let cancellations = 0;
  const stream = new ReadableStream<Uint8Array>({
    start(value) {
      close = () => value.close();
    },
    cancel() {
      cancellations++;
      return new Promise<void>((resolve) => {
        releaseCancel = resolve;
      });
    },
  });
  const req = request(stream, controller.signal);
  const result = readRequestBodyWithLimit(req, 32, req.signal).then(
    () => "completed",
    (error) => (error === req.signal.reason ? "aborted" : "wrong-error")
  );
  await Promise.resolve();
  controller.abort();
  try {
    assert.equal(await bounded(result), "aborted");
    assert.equal(cancellations, 1);
    assert.equal(stream.locked, false);
  } finally {
    if (!cancellations) close();
    releaseCancel();
    await result;
  }
});

test("pre-cancelled body returns its abort reason and releases its reader", async () => {
  const controller = new AbortController();
  let cancel = 0;
  let close: () => void = () => {};
  const stream = new ReadableStream<Uint8Array>({
    start(value) {
      close = () => value.close();
    },
    cancel() {
      cancel++;
    },
  });
  const req = request(stream, controller.signal);
  controller.abort();
  const pending = readRequestBodyWithLimit(req, 32, req.signal).then(
    () => "completed",
    (error) => (error === req.signal.reason ? "aborted" : "wrong-error")
  );
  try {
    assert.equal(await bounded(pending), "aborted");
    assert.equal(stream.locked, false);
    assert.equal(cancel, 1);
  } finally {
    if (!cancel) close();
    await pending;
  }
});

test("partial chunks retain byte bounds without waiting for asynchronous cancellation cleanup", async () => {
  const controller = new AbortController();
  let releaseCancel: () => void = () => {};
  let cancellations = 0;
  const stream = new ReadableStream<Uint8Array>({
    start(value) {
      value.enqueue(new Uint8Array([1, 2]));
      value.enqueue(new Uint8Array([3, 4]));
    },
    cancel() {
      cancellations++;
      return new Promise<void>((resolve) => {
        releaseCancel = resolve;
      });
    },
  });
  const req = request(stream, controller.signal);
  const pending = readRequestBodyWithLimit(req, 3, req.signal).then(
    () => "completed",
    (error) => (error instanceof RequestBodyTooLargeError ? "oversize" : "wrong-error")
  );
  try {
    assert.equal(await bounded(pending), "oversize");
    assert.equal(cancellations, 1);
    assert.equal(stream.locked, false);
  } finally {
    releaseCancel();
    await pending;
  }
});

test("abort listeners are removed on ordinary completion and read errors", async () => {
  for (const failure of [false, true]) {
    const controller = new AbortController();
    const signal = controller.signal;
    const add = signal.addEventListener.bind(signal);
    const remove = signal.removeEventListener.bind(signal);
    const active = new Set<unknown>();
    signal.addEventListener = ((type, listener, options) => {
      if (type === "abort") active.add(listener);
      return add(type, listener, options);
    }) as typeof signal.addEventListener;
    signal.removeEventListener = ((type, listener, options) => {
      if (type === "abort") active.delete(listener);
      return remove(type, listener, options);
    }) as typeof signal.removeEventListener;
    const stream = new ReadableStream<Uint8Array>({
      start(value) {
        if (failure) value.error(new Error("fixture read error"));
        else {
          value.enqueue(new Uint8Array([1, 2]));
          value.close();
        }
      },
    });
    const req = request(stream, signal);
    // Observe only the helper's listener, not Request's own signal propagation.
    active.clear();
    const read = readRequestBodyWithLimit(req, 32, signal);
    if (failure) await assert.rejects(read, /fixture read error/);
    else assert.deepEqual(await read, new Uint8Array([1, 2]));
    assert.equal(active.size, 0);
    assert.equal(stream.locked, false);
  }
});
