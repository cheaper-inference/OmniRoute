import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const ingest = require("../../src/mitm/_internal/ingest.cjs");
const { postIngestEntry } = ingest;

const BASE = "http://localhost:20128";
const entry = { id: "x" };
const refused = async () => ({ ok: false, status: 403 });
const down = async () => {
  throw new Error("connect ECONNREFUSED");
};

function captureErrors() {
  const lines: string[] = [];
  const spy = test.mock.method(console, "error", (...args: unknown[]) => {
    lines.push(args.join(" "));
  });
  return { lines, restore: () => spy.mock.restore() };
}

test("a rejected ingest post is counted and the first failure is logged", async () => {
  const log = captureErrors();
  try {
    const before = ingest.getIngestFailureCount();
    assert.equal(await postIngestEntry(BASE, "tok-secret", entry, refused), false);
    assert.equal(ingest.getIngestFailureCount(), before + 1);
    assert.equal(log.lines.length, 1);
    assert.match(log.lines[0], /ingest/i);
    assert.match(log.lines[0], /403/);
    assert.doesNotMatch(log.lines[0], /tok-secret/);
  } finally {
    log.restore();
  }
});

test("a network error is counted too", async () => {
  const log = captureErrors();
  try {
    const before = ingest.getIngestFailureCount();
    assert.equal(await postIngestEntry(BASE, "tok", entry, down), false);
    assert.equal(ingest.getIngestFailureCount(), before + 1);
    assert.ok(log.lines.every((line) => !line.includes("tok-secret")));
  } finally {
    log.restore();
  }
});

test("a long run of failures logs the first one and every 100th, not each one", async () => {
  const log = captureErrors();
  try {
    const before = ingest.getIngestFailureCount();
    for (let i = 0; i < 250; i++) await postIngestEntry(BASE, "tok", entry, refused);
    assert.equal(ingest.getIngestFailureCount(), before + 250);
    const logged = log.lines.length;
    assert.ok(logged >= 2 && logged <= 4, `expected 2-4 log lines for 250 failures, got ${logged}`);
  } finally {
    log.restore();
  }
});

test("a successful post and a disabled capture (no token) are not failures", async () => {
  const log = captureErrors();
  try {
    const before = ingest.getIngestFailureCount();
    assert.equal(await postIngestEntry(BASE, "tok", entry, async () => ({ ok: true })), true);
    assert.equal(await postIngestEntry(BASE, "", entry, refused), false);
    assert.equal(await postIngestEntry("", "tok", entry, refused), false);
    assert.equal(ingest.getIngestFailureCount(), before);
    assert.equal(log.lines.length, 0);
  } finally {
    log.restore();
  }
});
