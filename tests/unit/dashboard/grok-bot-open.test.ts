import assert from "node:assert/strict";
import { test } from "node:test";
import { openTranscript } from "../../../src/app/(dashboard)/dashboard/grok-bot/open";
import { nextTranscriptRequest } from "../../../src/app/(dashboard)/dashboard/grok-bot/transcript";

async function* frames(values: unknown[]): AsyncIterable<unknown> {
  yield* values;
}

const tick = () => new Promise<void>((resolve) => setImmediate(resolve));

test("snapshot cutover closes the request before opening live at the frozen cursor", async (t) => {
  const requests: Array<{ phase: string; after: string }> = [];
  const signals: AbortSignal[] = [];
  const visible: string[] = [];
  let snapshotClosed = false;
  let retries = 0;
  const opened = openTranscript({
    request: { phase: "snapshot", after: "0" },
    read: async function* (request, signal) {
      requests.push(request);
      signals.push(signal);
      if (request.phase === "snapshot") {
        try {
          yield { rows: { entries: [{ updatedSeq: "9007199254740993" }] } };
          yield { heartbeat: true };
          assert.fail("snapshot must stop at the heartbeat");
        } finally {
          snapshotClosed = true;
        }
      } else {
        assert.equal(snapshotClosed, true);
        assert.equal(signals[0].aborted, true);
        assert.equal(signal.aborted, false);
        yield { rows: { entries: [{ updatedSeq: "9007199254740994", role: "assistant", text: "live reply" }] } };
        await new Promise<void>((resolve) =>
          signal.addEventListener("abort", () => resolve(), { once: true })
        );
      }
    },
    onFrame: (frame, cursor) => {
      const next = nextTranscriptRequest(cursor, frame);
      visible.push(...(next.visible ?? []).map((item) => item.text));
      return next;
    },
    retryWait: () => { retries += 1; return -1; },
  });
  t.after(opened.abort);
  await tick();
  assert.deepEqual(requests.map(({ phase, after }) => ({ phase, after })), [
    { phase: "snapshot", after: "0" },
    { phase: "live", after: "9007199254740993" },
  ]);
  assert.deepEqual(visible, ["live reply"]);
  assert.equal(retries, 0);
});

test("a failed live read retries from the last processed cursor", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const cursors: string[] = [];
  const counts: number[] = [];
  const opened = openTranscript({
    request: { phase: "live", after: "0" },
    read: async function* (request, signal) {
      cursors.push(request.after);
      if (cursors.length === 1) {
        yield { rows: { entries: [{ updatedSeq: "9" }] } };
        throw new Error("dropped");
      }
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
    },
    onFrame: (frame, cursor) => nextTranscriptRequest(cursor, frame),
    retryWait: (fails) => { counts.push(fails); return 10; },
  });
  t.after(opened.abort);
  await tick();
  assert.deepEqual(cursors, ["0"]);
  t.mock.timers.tick(10);
  await tick();
  assert.deepEqual(cursors, ["0", "9"]);
  assert.deepEqual(counts, [1]);
});

test("abort during a retry wait keeps the reader closed", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  let reads = 0;
  const opened = openTranscript({
    request: { phase: "live", after: "5" },
    read: () => { reads += 1; throw new Error("dropped"); },
    onFrame: (_frame, cursor) => cursor,
    retryWait: () => 10,
  });
  t.after(opened.abort);
  await tick();
  opened.abort();
  t.mock.timers.tick(100);
  await tick();
  assert.equal(reads, 1);
});

test("a negative retry delay terminates after a synchronous read failure", async (t) => {
  let reads = 0;
  const opened = openTranscript({
    request: { phase: "snapshot", after: "0" },
    read: () => { reads += 1; throw new Error("dropped"); },
    onFrame: (_frame, cursor) => cursor,
    retryWait: () => -1,
  });
  t.after(opened.abort);
  await tick();
  assert.equal(reads, 1);
});

test("abort right after opening discards the first frame", async (t) => {
  const seen: unknown[] = [];
  const opened = openTranscript({
    request: { phase: "snapshot", after: "0" },
    read: () => frames([{ heartbeat: true }]),
    onFrame: (frame, cursor) => { seen.push(frame); return cursor; },
    retryWait: () => 0,
  });
  t.after(opened.abort);
  opened.abort();
  await tick();
  assert.deepEqual(seen, []);
});

test("a frame arriving after abort is discarded", async (t) => {
  let deliver!: () => void;
  const late = new Promise<void>((resolve) => { deliver = resolve; });
  const seen: unknown[] = [];
  let signal: AbortSignal | undefined;
  const opened = openTranscript({
    request: { phase: "live", after: "1" },
    read: async function* (_request, currentSignal) {
      signal = currentSignal;
      await late;
      yield "late";
    },
    onFrame: (frame, cursor) => { seen.push(frame); return cursor; },
    retryWait: () => { assert.fail("abort must not retry"); },
  });
  t.after(opened.abort);
  opened.abort();
  deliver();
  await tick();
  assert.equal(signal?.aborted, true);
  assert.deepEqual(seen, []);
});

test("abort at the cutover boundary cannot start a live request", async (t) => {
  let reads = 0;
  let opened!: { abort: () => void };
  opened = openTranscript({
    request: { phase: "snapshot", after: "0" },
    read: () => { reads += 1; return frames([{ heartbeat: true }]); },
    onFrame: (frame, cursor) => {
      opened.abort();
      return nextTranscriptRequest(cursor, frame);
    },
    retryWait: () => { assert.fail("abort must not retry"); },
  });
  t.after(opened.abort);
  await tick();
  assert.equal(reads, 1);
});

test("a live read that ends on its own reconnects at the last cursor", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const cursors: string[] = [];
  const opened = openTranscript({
    request: { phase: "live", after: "0" },
    read: async function* (request, signal) {
      cursors.push(request.after);
      if (cursors.length === 1) {
        yield { rows: { entries: [{ updatedSeq: "9" }] } };
        return;
      }
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
    },
    onFrame: (frame, cursor) => nextTranscriptRequest(cursor, frame),
    retryWait: () => 10,
  });
  t.after(opened.abort);
  await tick();
  assert.deepEqual(cursors, ["0"]);
  t.mock.timers.tick(10);
  await tick();
  assert.deepEqual(cursors, ["0", "9"]);
});

test("an abort-induced read rejection is not retried", async (t) => {
  const waits: number[] = [];
  let reads = 0;
  const opened = openTranscript({
    request: { phase: "live", after: "3" },
    read: async function* (_request, signal) {
      reads += 1;
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
      throw new DOMException("aborted", "AbortError");
    },
    onFrame: (_frame, cursor) => cursor,
    retryWait: (fails) => {
      waits.push(fails);
      return 10;
    },
  });
  t.after(opened.abort);
  await tick();
  opened.abort();
  await tick();
  assert.equal(reads, 1);
  assert.deepEqual(waits, []);
});

test("abort aborts the in-flight read signal synchronously", async (t) => {
  let signal: AbortSignal | undefined;
  const opened = openTranscript({
    request: { phase: "live", after: "1" },
    read: async function* (_request, currentSignal) {
      signal = currentSignal;
      await new Promise<void>(() => {});
      yield undefined;
    },
    onFrame: (_frame, cursor) => cursor,
    retryWait: () => { assert.fail("abort must not retry"); },
  });
  t.after(opened.abort);
  await tick();
  assert.equal(signal?.aborted, false);
  opened.abort();
  assert.equal(signal?.aborted, true);
});

test("a delivered frame resets the retry backoff", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const attempts: number[] = [];
  let reads = 0;
  const opened = openTranscript({
    request: { phase: "live", after: "0" },
    read: async function* (_request, signal) {
      reads += 1;
      if (reads === 3) {
        yield { rows: { entries: [{ updatedSeq: "9" }] } };
      }
      if (reads < 4) throw new Error("dropped");
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
    },
    onFrame: (frame, cursor) => nextTranscriptRequest(cursor, frame),
    retryWait: (fails) => { attempts.push(fails); return 5; },
  });
  t.after(opened.abort);
  await tick();
  for (let i = 0; i < 3; i += 1) {
    t.mock.timers.tick(5);
    await tick();
  }
  assert.equal(reads, 4);
  assert.deepEqual(attempts, [1, 2, 1]);
});

test("a handler fault stops the reader instead of retrying it", async (t) => {
  const faults: unknown[] = [];
  let reads = 0;
  const opened = openTranscript({
    request: { phase: "live", after: "0" },
    read: async function* (_request, signal) {
      reads += 1;
      yield { rows: { entries: [{ updatedSeq: "1" }] } };
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
    },
    onFrame: () => { throw new Error("handler bug"); },
    retryWait: () => { assert.fail("a handler fault must not be retried"); },
    onFault: (error) => { faults.push(error); },
  });
  t.after(opened.abort);
  await tick();
  assert.equal(reads, 1);
  assert.deepEqual(faults.map((error) => (error as Error).message), ["handler bug"]);
});

test("a socket that goes silent is treated as closed instead of hanging", async (t) => {
  const kinds: string[] = [];
  const opened = openTranscript({
    request: { phase: "live", after: "0" },
    read: async function* (_request, signal) {
      await new Promise<void>((resolve) =>
        signal.addEventListener("abort", () => resolve(), { once: true })
      );
    },
    onFrame: (frame, cursor) => nextTranscriptRequest(cursor, frame),
    retryWait: (_fails, _livedMs, kind) => { kinds.push(kind); return -1; },
    silenceMs: 20,
  });
  t.after(opened.abort);
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.deepEqual(kinds, ["drop"]);
});

test("a refusal to admit the watch is not counted as a dead stream", async (t) => {
  const kinds: string[] = [];
  const opened = openTranscript({
    request: { phase: "snapshot", after: "0" },
    read: async function* () {
      throw Object.assign(new Error("transcript 429"), { admission: true });
    },
    onFrame: (frame, cursor) => nextTranscriptRequest(cursor, frame),
    retryWait: (_fails, _livedMs, kind) => { kinds.push(kind); return -1; },
  });
  t.after(opened.abort);
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.deepEqual(kinds, ["admission"]);
});
