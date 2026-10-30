import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { startVisiblePolling } from "../../src/shared/utils/visiblePolling.ts";

function mockDocument(t: TestContext, page: EventTarget & { visibilityState: string }) {
  const previous = Object.getOwnPropertyDescriptor(globalThis, "document");
  Object.defineProperty(globalThis, "document", { configurable: true, value: page });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, "document", previous);
    else Reflect.deleteProperty(globalThis, "document");
  });
}

function deferred() {
  let finish!: () => void;
  const promise = new Promise<void>((resolve) => {
    finish = resolve;
  });
  return { promise, finish };
}

for (const visible of [true, false]) {
  test(`polling starts ${visible ? "immediately" : "on visibility"} and stops cleanly`, async (t) => {
    t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
    const page = Object.assign(new EventTarget(), {
      visibilityState: visible ? "visible" : "hidden",
    });
    mockDocument(t, page);
    let reads = 0;
    const polling = startVisiblePolling(async () => {
      reads++;
    });
    assert.equal(reads, visible ? 1 : 0);
    await Promise.resolve();
    page.visibilityState = "hidden";
    t.mock.timers.tick(10000);
    assert.equal(reads, visible ? 1 : 0);
    page.visibilityState = "visible";
    page.dispatchEvent(new Event("visibilitychange"));
    assert.equal(reads, visible ? 2 : 1);
    polling.dispose();
    t.mock.timers.tick(30000);
    page.dispatchEvent(new Event("visibilitychange"));
    assert.equal(reads, visible ? 2 : 1);
  });
}

test("replacement and cleanup abort old reads, without overlapping background requests", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  mockDocument(t, Object.assign(new EventTarget(), { visibilityState: "visible" }));
  const pending = deferred();
  const signals: AbortSignal[] = [];
  const polling = startVisiblePolling(async (signal) => {
    signals.push(signal);
    await pending.promise;
  });
  t.mock.timers.tick(10000);
  assert.equal(signals.length, 1);
  void polling.refresh(true);
  assert.equal(signals[0].aborted, true);
  assert.equal(signals.length, 2);
  polling.dispose();
  assert.equal(signals[1].aborted, true);
  pending.finish();
  await pending.promise;
});

test("a stalled cache read is aborted at its deadline and later polling can recover", async (t) => {
  t.mock.timers.enable({ apis: ["setTimeout", "setInterval"] });
  mockDocument(t, Object.assign(new EventTarget(), { visibilityState: "visible" }));
  const pending = deferred();
  const signals: AbortSignal[] = [];
  const polling = startVisiblePolling(async (signal) => {
    signals.push(signal);
    if (signals.length === 1) await pending.promise;
  });
  t.mock.timers.tick(15000);
  assert.equal(signals[0].aborted, true);
  t.mock.timers.tick(5000);
  assert.ok(signals.length >= 2);
  polling.dispose();
  pending.finish();
  await pending.promise;
});
