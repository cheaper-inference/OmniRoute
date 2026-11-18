import test from "node:test";
import assert from "node:assert/strict";

const wal = await import("../../src/lib/db/walMaintenance.ts");

const MB = 1024 * 1024;
const restartOk = {
  ok: true,
  busy: false,
  skipped: false,
  logFrames: 120,
  checkpointedFrames: 120,
  error: null,
};

test("the WAL guard warning reports the retained file size apart from pending frames", () => {
  const message = wal.formatWalGuardWarning(300 * MB, 256 * MB, restartOk);
  assert.match(message, /retainedFileMb=300\b/);
  assert.match(message, /guardMb=256\b/);
  assert.match(message, /pendingFrames=0\b/);
});

test("pending frames are the frames the checkpoint did not move; null counts stay unknown", () => {
  const busy = { ...restartOk, ok: false, busy: true, logFrames: 120, checkpointedFrames: 80 };
  assert.match(wal.formatWalGuardWarning(300 * MB, 256 * MB, busy), /pendingFrames=40\b/);
  const unknown = { ...restartOk, logFrames: null, checkpointedFrames: null };
  assert.match(wal.formatWalGuardWarning(300 * MB, 256 * MB, unknown), /pendingFrames=unknown/);
});

test("the WAL guard warning does not claim the guard caps disk use", () => {
  const message = wal.formatWalGuardWarning(300 * MB, 256 * MB, restartOk);
  assert.match(message, /keeps its allocated size/);
  assert.doesNotMatch(message, /\bcap(s|ped)?\b/i);
});
