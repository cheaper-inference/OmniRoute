/**
 * The absolute RSS fuse (OMNIROUTE_RSS_PRESSURE_MB) must arm the self-restart
 * circuit. Before the fix, check() set state=critical/rss_absolute but every
 * background refresh replaced it with the tracker's RSS-blind verdict and reset
 * the timer: a process pinned above the RSS fuse kept returning 503 for hours
 * and never self-restarted.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createResourcePressureRuntime } from "../../open-sse/utils/resourcePressure.ts";
import type { ResourceSignals } from "../../open-sse/utils/resourcePressurePolicy.ts";

const MiB = 1024 ** 2;

function signals(observedAtMs: number, rssMb: number, heapMb = 100): ResourceSignals {
  return {
    observedAtMs,
    v8: { heapUsedBytes: heapMb * MiB, heapLimitBytes: 1_433 * MiB },
    process: {
      rssBytes: rssMb * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    // cgroup working set well under its cap: only the absolute fuse is over.
    cgroup: { currentBytes: 1_000 * MiB, maxBytes: 4_000 * MiB, highBytes: null, fileBytes: 0, events: null },
    psi: null,
  };
}

function harness(rssMbAt: (clock: number) => number, opts: { heapThresholdMb?: number | null; heapMbAt?: (c: number) => number } = {}) {
  let clock = 0;
  let scheduled: (() => void) | null = null;
  const exits: number[] = [];
  const origWarn = console.warn;
  const origError = console.error;
  console.warn = () => {};
  console.error = () => {};
  const runtime = createResourcePressureRuntime({
    heapThresholdMb: opts.heapThresholdMb === undefined ? null : opts.heapThresholdMb,
    rssThresholdMb: 1_904,
    immediateHeapUsedMb: () => (opts.heapMbAt ? opts.heapMbAt(clock) : 100),
    immediateRssUsedMb: () => rssMbAt(clock),
    nowMs: () => clock,
    schedule: (fn) => {
      scheduled = fn;
    },
    staleAfterMs: 1_000,
    maxStaleMs: 30_000,
    sample: async () => signals(clock, rssMbAt(clock), opts.heapMbAt ? opts.heapMbAt(clock) : 100),
    selfRestart: { enabled: true, afterMs: 60_000, exitFn: (code) => void exits.push(code) },
  });
  return {
    exits,
    runtime,
    // Background driver path: refresh without any request calling check().
    async refreshOnly(advanceMs: number) {
      clock += advanceMs;
      runtime.check(); // schedules; also the request path
      const fn = scheduled;
      scheduled = null;
      fn?.();
      await runtime.whenRefreshSettled();
    },
    restore() {
      console.warn = origWarn;
      console.error = origError;
      runtime.dispose();
    },
  };
}

describe("rss_absolute fuse arms the self-restart circuit", () => {
  it("exits after afterMs while RSS stays above the fuse", async () => {
    const h = harness(() => 1_920);
    try {
      for (let i = 0; i < 59; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, [], "must not exit before afterMs");
      assert.equal(h.runtime.getObservation().state.reason, "rss_absolute");
      for (let i = 0; i < 5; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, [1], "sustained rss_absolute must self-restart once");
    } finally {
      h.restore();
    }
  });

  it("re-arms the timer when RSS drops back under the fuse", async () => {
    let rss = 1_920;
    const h = harness(() => rss);
    try {
      for (let i = 0; i < 40; i++) await h.refreshOnly(1_000);
      rss = 1_500;
      await h.refreshOnly(1_000);
      assert.equal(h.runtime.getObservation().state.severity, "normal");
      rss = 1_920;
      for (let i = 0; i < 40; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, [], "the dip must reset the 60s window");
      for (let i = 0; i < 25; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, [1]);
    } finally {
      h.restore();
    }
  });

  it("also holds the immediate heap fuse when the tracker has no absolute heap threshold", async () => {
    const h = harness(() => 1_500, { heapThresholdMb: 1_361, heapMbAt: () => 1_370 });
    try {
      for (let i = 0; i < 65; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, [1]);
    } finally {
      h.restore();
    }
  });

  it("never fires while both fuses are clear", async () => {
    const h = harness(() => 1_500);
    try {
      for (let i = 0; i < 200; i++) await h.refreshOnly(1_000);
      assert.deepEqual(h.exits, []);
      assert.equal(h.runtime.getObservation().state.severity, "normal");
    } finally {
      h.restore();
    }
  });
});
