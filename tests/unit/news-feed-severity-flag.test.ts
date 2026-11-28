import test from "node:test";
import assert from "node:assert/strict";

const { readSeverityFlag } = await import("../../src/shared/hooks/useNewsFeed.ts");

type FlagFetch = Parameters<typeof readSeverityFlag>[2];

const flagList = (value: string) => ({
  flags: [{ key: "ANNOUNCEMENT_SEVERITY_ENABLED", effectiveValue: value }],
});

test("the severity flag reads true from a prompt settings response", async () => {
  const fetchFlags = (async () => ({ ok: true, json: async () => flagList("true") })) as FlagFetch;
  assert.equal(await readSeverityFlag(new AbortController().signal, 1000, fetchFlags), true);
});

test("a settings request that never answers is cut off and reads as off", async () => {
  const fetchFlags = (() => new Promise(() => {})) as FlagFetch;
  const started = Date.now();
  assert.equal(await readSeverityFlag(new AbortController().signal, 20, fetchFlags), false);
  assert.ok(Date.now() - started < 1000);
});

test("a settings body that stalls after the headers is cut off and reads as off", async () => {
  const fetchFlags = (async () => ({
    ok: true,
    json: () => new Promise(() => {}),
  })) as FlagFetch;
  assert.equal(await readSeverityFlag(new AbortController().signal, 20, fetchFlags), false);
});

test("the flag deadline does not abort the caller's signal", async () => {
  const feed = new AbortController();
  const fetchFlags = (() => new Promise(() => {})) as FlagFetch;
  assert.equal(await readSeverityFlag(feed.signal, 20, fetchFlags), false);
  assert.equal(feed.signal.aborted, false);
});
