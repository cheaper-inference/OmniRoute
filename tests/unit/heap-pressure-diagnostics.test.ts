import test from "node:test";
import assert from "node:assert/strict";
import {
  resetEventLoopStallStatsForTests,
  startEventLoopStallRecorder,
  stopEventLoopStallRecorder,
  tickEventLoopStallRecorderForTests,
} from "../../src/lib/healthzLag.ts";

test("heap diagnostics are opt-in, thresholded, and limited to one sample per minute", () => {
  const originalEnabled = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
  const originalThreshold = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
  let timeMs = 1_000;
  const logs: string[] = [];
  try {
    delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = "1";
    startEventLoopStallRecorder({
      now: () => timeMs,
      thresholdMs: 100_000,
      sampler: () => 3,
      log: (message) => logs.push(message),
    });

    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 0, "disabled diagnostics must not sample");

    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = "1";
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = "10000000";
    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 0, "enabled samples below the threshold must stay silent");

    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = "1";
    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 1, "crossing the threshold logs immediately");
    assert.match(logs[0], /high V8 heap heapUsedMb=\d+ heapTotalMb=\d+ rssMb=\d+/);
    assert.match(logs[0], /oldSpaceUsedMb=\d+ inflight=3/);

    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 1, "one-minute throttle avoids per-request log noise");

    timeMs += 60_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 2);
  } finally {
    stopEventLoopStallRecorder();
    if (originalEnabled === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = originalEnabled;
    if (originalThreshold === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = originalThreshold;
  }
});

test("the stats reset also clears the heap diagnostic throttle", () => {
  const originalEnabled = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
  const originalThreshold = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
  let timeMs = 1_000;
  const logs: string[] = [];
  const start = () =>
    startEventLoopStallRecorder({
      now: () => timeMs,
      thresholdMs: 100_000,
      sampler: () => 0,
      log: (message) => logs.push(message),
    });
  try {
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = "1";
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = "1";
    resetEventLoopStallStatsForTests();
    start();
    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 1);

    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
    start();
    timeMs += 1_000;
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 2, "a reset must not leave the previous sample's throttle armed");
  } finally {
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
    if (originalEnabled === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = originalEnabled;
    if (originalThreshold === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = originalThreshold;
  }
});

test("a stall threshold of 0 also disables the heap diagnostic", () => {
  const originalEnabled = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
  const originalThreshold = process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
  const logs: string[] = [];
  try {
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = "1";
    process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = "1";
    resetEventLoopStallStatsForTests();
    startEventLoopStallRecorder({
      now: () => 1_000,
      thresholdMs: 0,
      log: (message) => logs.push(message),
    });
    tickEventLoopStallRecorderForTests();
    assert.equal(logs.length, 0, "the sampler runs inside the stall recorder tick");
  } finally {
    stopEventLoopStallRecorder();
    resetEventLoopStallStatsForTests();
    if (originalEnabled === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_ENABLED = originalEnabled;
    if (originalThreshold === undefined) delete process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB;
    else process.env.OMNIROUTE_HEAP_DIAGNOSTICS_THRESHOLD_MB = originalThreshold;
  }
});
