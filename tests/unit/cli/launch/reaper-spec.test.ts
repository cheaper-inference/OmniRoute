// Tests for parseReaperSpec field validation and defaults (core/reaper.mjs).
import { test } from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_GRACE_MS,
  DEFAULT_SCAN_MS,
  parseReaperSpec,
} from "../../../../bin/cli/launch/core/reaper.mjs";
import { LEASE_STALE_MS } from "../../../../bin/cli/launch/core/lease.mjs";

const BASE = { stateDir: "/state", generation: "g", port: 4242 };
const parse = (extra: Record<string, unknown> = {}) =>
  parseReaperSpec(JSON.stringify({ ...BASE, ...extra }));

test("parseReaperSpec returns every field in a stable order", () => {
  assert.deepEqual(Object.keys(parse()), [
    "mode",
    "command",
    "adopt",
    "graceMs",
    "scanMs",
    "startTimeoutMs",
    "leaseStaleMs",
    "lockTimeoutMs",
    "stateDir",
    "generation",
    "port",
  ]);
});

test("parseReaperSpec applies defaults when optional numbers are absent", () => {
  const spec = parse();
  assert.equal(spec.mode, "spawn");
  assert.equal(spec.command, null);
  assert.equal(spec.adopt, null);
  assert.equal(spec.graceMs, DEFAULT_GRACE_MS);
  assert.equal(spec.scanMs, DEFAULT_SCAN_MS);
  assert.equal(spec.startTimeoutMs, 60_000);
  assert.equal(spec.leaseStaleMs, LEASE_STALE_MS);
  assert.equal(spec.lockTimeoutMs, 5_000);
  assert.equal(spec.stateDir, "/state");
  assert.equal(spec.generation, "g");
  assert.equal(spec.port, 4242);
});

test("parseReaperSpec keeps valid optional numbers", () => {
  const spec = parse({
    graceMs: 5,
    scanMs: 6,
    startTimeoutMs: 7,
    leaseStaleMs: 8,
    lockTimeoutMs: 9,
  });
  assert.equal(spec.graceMs, 5);
  assert.equal(spec.scanMs, 6);
  assert.equal(spec.startTimeoutMs, 7);
  assert.equal(spec.leaseStaleMs, 8);
  assert.equal(spec.lockTimeoutMs, 9);
});

test("parseReaperSpec: zero grace is valid, zero for the positive fields falls back", () => {
  const spec = parse({
    graceMs: 0,
    scanMs: 0,
    startTimeoutMs: 0,
    leaseStaleMs: 0,
    lockTimeoutMs: 0,
  });
  assert.equal(spec.graceMs, 0);
  assert.equal(spec.scanMs, DEFAULT_SCAN_MS);
  assert.equal(spec.startTimeoutMs, 60_000);
  assert.equal(spec.leaseStaleMs, LEASE_STALE_MS);
  assert.equal(spec.lockTimeoutMs, 5_000);
});

test("parseReaperSpec: negative and non-numeric values fall back to defaults", () => {
  const spec = parse({ graceMs: -1, scanMs: "5", startTimeoutMs: null, lockTimeoutMs: true });
  assert.equal(spec.graceMs, DEFAULT_GRACE_MS);
  assert.equal(spec.scanMs, DEFAULT_SCAN_MS);
  assert.equal(spec.startTimeoutMs, 60_000);
  assert.equal(spec.lockTimeoutMs, 5_000);
});

test("parseReaperSpec keeps adopt pids and the adopt mode", () => {
  const adopt = { supervisorPid: 10, serverPid: 11 };
  const spec = parse({ mode: "adopt", adopt });
  assert.equal(spec.mode, "adopt");
  assert.deepEqual(spec.adopt, adopt);
});

test("parseReaperSpec ignores a non-array command", () => {
  assert.equal(parse({ command: "omniroute serve" }).command, null);
});

test("parseReaperSpec error messages distinguish identity and port failures", () => {
  assert.throws(() => parseReaperSpec("null"), { message: "invalid reaper spec" });
  assert.throws(() => parseReaperSpec("0"), { message: "invalid reaper spec" });
  assert.throws(() => parseReaperSpec(JSON.stringify({ ...BASE, stateDir: 1 })), {
    message: "invalid reaper spec",
  });
  assert.throws(() => parseReaperSpec(JSON.stringify({ ...BASE, generation: null })), {
    message: "invalid reaper spec",
  });
  for (const port of [0, -1, 65536, 1.5, "80", null]) {
    assert.throws(() => parse({ port }), { message: "invalid reaper port" }, String(port));
  }
  assert.equal(parse({ port: 65535 }).port, 65535);
  assert.equal(parse({ port: 1 }).port, 1);
});

test("parseReaperSpec rethrows JSON errors for empty or malformed input", () => {
  assert.throws(() => parseReaperSpec(undefined), SyntaxError);
  assert.throws(() => parseReaperSpec("{"), SyntaxError);
});
