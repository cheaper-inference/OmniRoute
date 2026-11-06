import { afterEach, test } from "node:test";
import assert from "node:assert/strict";

import { isTabVisible, startVisiblePolling } from "../../src/shared/utils/visiblePolling.ts";
import {
  getNormalizedLocaleMessages,
  normalizeComplianceEventTypes,
} from "../../src/i18n/request.ts";

type Listener = () => void;

function fakeDocument(visibilityState: string) {
  const listeners = new Set<Listener>();
  return {
    visibilityState,
    addEventListener: (_type: string, listener: Listener) => listeners.add(listener),
    removeEventListener: (_type: string, listener: Listener) => listeners.delete(listener),
    fire: () => listeners.forEach((listener) => listener()),
    listeners,
  };
}

const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

afterEach(() => {
  delete (globalThis as { document?: unknown }).document;
});

test("isTabVisible is true without a document, so server rendering never skips", () => {
  assert.equal(isTabVisible(), true);
});

test("polls on start while visible, and stops after the returned cleanup", async () => {
  const doc = fakeDocument("visible");
  (globalThis as { document?: unknown }).document = doc;
  let calls = 0;
  const stop = startVisiblePolling(() => {
    calls += 1;
  }, 60_000);
  await flush();
  assert.equal(calls, 1);

  stop();
  assert.equal(doc.listeners.size, 0, "the visibilitychange listener must be removed");
  doc.fire();
  assert.equal(calls, 1);
});

test("skips while hidden and catches up when the tab returns", async () => {
  const doc = fakeDocument("hidden");
  (globalThis as { document?: unknown }).document = doc;
  let calls = 0;
  const stop = startVisiblePolling(() => {
    calls += 1;
  }, 60_000);
  await flush();
  assert.equal(calls, 0, "a hidden tab must not poll on mount");

  doc.fire();
  assert.equal(calls, 0, "a change that leaves the tab hidden must not poll");

  doc.visibilityState = "visible";
  doc.fire();
  assert.equal(calls, 1, "returning to the tab must refresh at once");
  stop();
});

test("does not poll if stopped before the first tick", async () => {
  (globalThis as { document?: unknown }).document = fakeDocument("visible");
  let calls = 0;
  const stop = startVisiblePolling(() => {
    calls += 1;
  }, 60_000);
  stop();
  await flush();
  assert.equal(calls, 0);
});

test("normalized catalogs are computed once per loaded catalog", () => {
  const catalog = { compliance: { eventTypes: { "auth.login": "Login" } } };
  const first = getNormalizedLocaleMessages(catalog);
  assert.equal(getNormalizedLocaleMessages(catalog), first, "second read must reuse the result");
  assert.deepEqual(first, normalizeComplianceEventTypes(catalog));
  assert.notEqual(getNormalizedLocaleMessages({ ...catalog }), first);
});
