import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createResourcePressureTracker,
  resolveResourcePressureThresholds,
  type PressureReason,
  type PressureSeverity,
  type ResourcePressureState,
  type ResourcePressureThresholds,
  type ResourceSignals,
} from "../../open-sse/utils/resourcePressurePolicy.ts";

const MiB = 1024 ** 2;

function baseSignals(overrides: Partial<ResourceSignals> = {}): ResourceSignals {
  return {
    observedAtMs: 1_000,
    v8: { heapUsedBytes: 100 * MiB, heapLimitBytes: 1_000 * MiB },
    process: {
      rssBytes: 200 * MiB,
      externalBytes: 10 * MiB,
      arrayBuffersBytes: MiB,
      availableBytes: null,
      constrainedBytes: null,
    },
    cgroup: { currentBytes: null, maxBytes: null, highBytes: null, fileBytes: null, events: null },
    psi: null,
    ...overrides,
  };
}

const fastThresholds: Partial<ResourcePressureThresholds> = {
  highRatio: 0.8,
  criticalRatio: 0.9,
  recoveryRatio: 0.7,
  highPsiAvg10: 20,
  criticalPsiAvg10: 40,
  recoveryPsiAvg10: 10,
  sustainedSamplesHigh: 2,
  sustainedSamplesCritical: 2,
  sustainedSamplesRecovery: 2,
  heapAbsoluteThresholdMb: null,
};

describe("resource pressure threshold validation", () => {
  it("accepts every valid boundary", () => {
    const thresholds = resolveResourcePressureThresholds({
      recoveryRatio: 0,
      highRatio: 0.5,
      criticalRatio: 1,
      recoveryPsiAvg10: 0,
      highPsiAvg10: 50,
      criticalPsiAvg10: 100,
      sustainedSamplesHigh: 1,
      sustainedSamplesCritical: 1,
      sustainedSamplesRecovery: 10_000,
      heapAbsoluteThresholdMb: null,
    });
    assert.equal(thresholds.recoveryRatio, 0);
    assert.equal(thresholds.criticalRatio, 1);
    assert.equal(thresholds.criticalPsiAvg10, 100);
    assert.equal(thresholds.sustainedSamplesRecovery, 10_000);
    assert.equal(thresholds.heapAbsoluteThresholdMb, null);
  });

  it("throws deterministically for invalid partial overrides", () => {
    const invalid: Array<Partial<ResourcePressureThresholds>> = [
      { recoveryRatio: -0.01 },
      { criticalRatio: 1.01 },
      { highRatio: Number.NaN },
      { recoveryRatio: 0.8, highRatio: 0.8 },
      { highRatio: 0.95, criticalRatio: 0.9 },
      { recoveryPsiAvg10: -1 },
      { criticalPsiAvg10: 101 },
      { highPsiAvg10: Number.POSITIVE_INFINITY },
      { recoveryPsiAvg10: 20, highPsiAvg10: 20 },
      { highPsiAvg10: 50, criticalPsiAvg10: 40 },
      { sustainedSamplesHigh: 0 },
      { sustainedSamplesCritical: 1.5 },
      { sustainedSamplesRecovery: 10_001 },
      { heapAbsoluteThresholdMb: 0 },
      { heapAbsoluteThresholdMb: Number.POSITIVE_INFINITY },
    ];
    for (const partial of invalid) {
      assert.throws(() => resolveResourcePressureThresholds(partial), RangeError);
    }
  });
});

describe("resource pressure policy", () => {
  it("does not let high then critical count as two critical samples", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const high = baseSignals({
      v8: { heapUsedBytes: 850 * MiB, heapLimitBytes: 1_000 * MiB },
    });
    const critical = baseSignals({
      v8: { heapUsedBytes: 950 * MiB, heapLimitBytes: 1_000 * MiB },
    });

    assert.equal(tracker.observe(high).severity, "normal");
    assert.equal(tracker.observe(critical).severity, "normal");
    assert.equal(tracker.observe(critical).severity, "critical");
  });

  it("resets pending streak when severity or reason alternates", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const heapCritical = baseSignals({
      v8: { heapUsedBytes: 950 * MiB, heapLimitBytes: 1_000 * MiB },
    });
    const psiCritical = baseSignals({
      psi: {
        someAvg10: 50,
        someAvg60: null,
        someAvg300: null,
        fullAvg10: null,
        fullAvg60: null,
        fullAvg300: null,
      },
    });

    assert.equal(tracker.observe(heapCritical).severity, "normal");
    assert.equal(tracker.observe(psiCritical).severity, "normal");
    assert.equal(tracker.observe(psiCritical).severity, "critical");
    assert.equal(tracker.getState().reason, "psi_some");
  });

  it("baselines cumulative OOM counters and only treats increases as events", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const oomCounters = (oom: number, oom_kill: number, observedAtMs: number) =>
      baseSignals({
        observedAtMs,
        cgroup: {
          currentBytes: null,
          maxBytes: null,
          highBytes: null,
          fileBytes: null,
          events: { low: 0, high: 0, max: 0, oom, oom_kill },
        },
      });

    assert.equal(tracker.observe(oomCounters(7, 3, 1)).severity, "normal", "history baselines");
    assert.equal(tracker.observe(oomCounters(7, 3, 2)).severity, "normal", "unchanged history");

    const event = tracker.observe(oomCounters(8, 3, 3));
    assert.equal(event.severity, "critical", "a new OOM event is immediately critical");
    assert.equal(event.reason, "oom_event");

    assert.equal(tracker.observe(oomCounters(8, 3, 4)).severity, "critical");
    assert.equal(
      tracker.observe(oomCounters(8, 3, 5)).severity,
      "normal",
      "unchanged allows recovery"
    );
  });

  it("re-baselines when OOM counters reset or the cgroup event source is replaced", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const events = (oom: number, oom_kill: number) =>
      baseSignals({
        cgroup: {
          currentBytes: null,
          maxBytes: null,
          highBytes: null,
          fileBytes: null,
          events: { low: 0, high: 0, max: 0, oom, oom_kill },
        },
      });

    assert.equal(tracker.observe(events(10, 4)).severity, "normal");
    assert.equal(tracker.observe(events(1, 0)).severity, "normal", "counter reset re-baselines");
    assert.equal(
      tracker.observe({ ...events(1, 0), cgroup: { ...events(1, 0).cgroup, events: null } })
        .severity,
      "normal"
    );
    assert.equal(tracker.observe(events(9, 3)).severity, "normal", "replacement re-baselines");
  });

  it("ignores reclaimable page cache in the cgroup workingset ratio", () => {
    // Incident 2026-08-29: memory.current included 3.01 GiB of reclaimable
    // page cache on top of 1.62 GiB anon, tripping cgroup_ratio critical at
    // 95% while the real working set was 33% and memory.events stayed zero.
    const tracker = createResourcePressureTracker(fastThresholds);
    const cgroup = (currentBytes: number, fileBytes: number | null): ResourceSignals["cgroup"] => ({
      currentBytes,
      maxBytes: 5 * 1024 ** 3,
      highBytes: null,
      fileBytes,
      events: { low: 0, high: 0, max: 0, oom: 0, oom_kill: 0 },
    });
    const signals = (c: ResourceSignals["cgroup"]): ResourceSignals => ({
      ...baseSignals(),
      cgroup: c,
    });

    // Raw current at 95% with 3 GiB reclaimable cache: workingset is 1.62/5 = 32%.
    assert.equal(tracker.observe(signals(cgroup(5_033_164_800, 3_232_225_280))).severity, "normal");
    // Same current with zero cache is genuine pressure (sustained 2 samples).
    tracker.observe(signals(cgroup(5_033_164_800, 0)));
    assert.equal(tracker.observe(signals(cgroup(5_033_164_800, 0))).severity, "critical");
    // Missing memory.stat (fileBytes null) keeps the legacy raw-ratio behavior.
    tracker.observe(signals(cgroup(5_033_164_800, null)));
    assert.equal(tracker.observe(signals(cgroup(5_033_164_800, null))).severity, "critical");
  });

  it("recovers the cgroup_ratio latch once page cache drains", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const cgroup = (currentBytes: number, fileBytes: number | null): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes,
        maxBytes: 5 * 1024 ** 3,
        highBytes: null,
        fileBytes,
        events: { low: 0, high: 0, max: 0, oom: 0, oom_kill: 0 },
      },
    });

    let state = tracker.observe(cgroup(5_033_164_800, 0)); // genuine critical
    state = tracker.observe(cgroup(5_033_164_800, 0)); // sustained 2 samples
    assert.equal(state.severity, "critical");
    // Cache grows while anon stays low: current stays high but workingset drops.
    state = tracker.observe(cgroup(4_662_461_440, 3_232_225_280));
    assert.equal(state.severity, "critical", "recovery needs sustained samples");
    state = tracker.observe(cgroup(4_662_461_440, 3_232_225_280));
    assert.equal(state.severity, "normal", "workingset below recovery ratio releases the latch");
  });

  it("handles workingset boundary conditions", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (cur: number, file: number | null): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: cur,
        maxBytes: 5 * 1024 ** 3,
        highBytes: null,
        fileBytes: file,
        events: { low: 0, high: 0, max: 0, oom: 0, oom_kill: 0 },
      },
    });

    // measurement skew: file > current falls back to the raw ratio, never 0.
    // Raw current 95% with a bogus file reading must still read as critical.
    tracker.observe(mk(5_033_164_800, 5_999_000_000));
    let state = tracker.observe(mk(5_033_164_800, 5_999_000_000));
    assert.equal(state.severity, "critical");

    // file = 0 is a valid stat read (no page cache): raw ratio path.
    tracker.observe(mk(5_033_164_800, 0));
    state = tracker.observe(mk(5_033_164_800, 0));
    assert.equal(state.severity, "critical");

    // file exactly equal to current: workingset is 0 (all cache), ratio 0.
    tracker.observe(mk(5_033_164_800, 5_033_164_800));
    state = tracker.observe(mk(5_033_164_800, 5_033_164_800));
    assert.equal(state.severity, "normal");
  });

  it("stays informative on the raw total charge without kernel throttling proof", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (cur: number, file: number, high: number): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: cur,
        maxBytes: 5 * 1024 ** 3,
        highBytes: high,
        fileBytes: file,
        events: { low: 0, high: 0, max: 0, oom: 0, oom_kill: 0 },
      },
      psi: {
        someAvg10: 0,
        someAvg60: 0,
        someAvg300: 0,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      },
    });
    // Total charge 3.5 GiB over a 3 GiB high with 3 GiB of it file cache:
    // the kernel reports no throttling (events silent, PSI zero), so the
    // guard stays at an informative high instead of firing critical.
    tracker.observe(mk(3_758_096_384, 3_221_225_472, 3 * 1024 ** 3));
    const state = tracker.observe(mk(3_758_096_384, 3_221_225_472, 3 * 1024 ** 3));
    assert.equal(state.severity, "high");
    assert.equal(state.reason, "cgroup_high");
  });

  it("reaches critical on a memory.high stall when anonymous memory dominates", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const mk = (throttleHigh: number): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: 3_758_096_384,
        maxBytes: 5 * 1024 ** 3,
        highBytes: 3 * 1024 ** 3,
        fileBytes: 500 * MiB,
        events: { low: 0, high: throttleHigh, max: 0, oom: 0, oom_kill: 0 },
      },
      psi: {
        someAvg10: 0,
        someAvg60: 0,
        someAvg300: 0,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      },
    });
    // The raw total is high and anonymous memory dominates; kernel throttling
    // proof must still escalate to critical on cgroup_high.
    tracker.observe(mk(0));
    tracker.observe(mk(0));
    tracker.observe(mk(3));
    const state = tracker.observe(mk(5));
    assert.equal(state.severity, "critical");
    assert.equal(state.reason, "cgroup_high");
  });

  it("does not shed all traffic when memory.high only reclaims SQLite page cache", () => {
    const tracker = createResourcePressureTracker({
      ...fastThresholds,
      sustainedSamplesRecovery: 1,
    });
    const sample = (
      fileMb: number,
      somePsi: number,
      highEvents: number,
      maxEvents = 0,
      psiSource: "cgroup" | "host" = "cgroup"
    ): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: 1_799 * MiB,
        highBytes: 1_800 * MiB,
        maxBytes: 2_300 * MiB,
        fileBytes: fileMb * MiB,
        events: { low: 0, high: highEvents, max: maxEvents, oom: 0, oom_kill: 0 },
      },
      psi: {
        someAvg10: somePsi,
        someAvg60: 0,
        someAvg300: 0,
        fullAvg10: somePsi,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource,
      },
    });

    // Reproduces the production incident: ~1 GiB file cache, ~790 MiB
    // working set, 1800 MiB MemoryHigh and low local PSI. Reclaim increments
    // memory.events.high, but that is not evidence of dangerous heap pressure.
    tracker.observe(sample(1009, 0.36, 0));
    tracker.observe(sample(1009, 0.36, 10));
    assert.equal(tracker.observe(sample(1009, 0.36, 20)).severity, "high");

    // Real 503s are still necessary when heap/anonymous charge dominates.
    const anon = createResourcePressureTracker(fastThresholds);
    anon.observe(sample(138, 4.26, 0));
    anon.observe(sample(138, 4.26, 10));
    assert.equal(anon.observe(sample(138, 4.26, 20)).severity, "critical");

    // Sustained local PSI proves real stalls despite the page cache.
    const stalled = createResourcePressureTracker(fastThresholds);
    stalled.observe(sample(1009, 2, 0));
    stalled.observe(sample(1009, 2, 10));
    assert.equal(stalled.observe(sample(1009, 2, 20)).severity, "critical");

    // Real memory.max events must never be hidden by the cache exception.
    const maxed = createResourcePressureTracker(fastThresholds);
    maxed.observe(sample(1009, 0.1, 0, 0));
    maxed.observe(sample(1009, 0.1, 10, 1));
    assert.equal(maxed.observe(sample(1009, 0.1, 20, 2)).severity, "critical");

    // Without cgroup-local PSI we cannot prove that reclaim is cheap.
    const host = createResourcePressureTracker(fastThresholds);
    host.observe(sample(1009, 0, 0, 0, "host"));
    host.observe(sample(1009, 0, 10, 0, "host"));
    assert.equal(host.observe(sample(1009, 0, 20, 0, "host")).severity, "critical");
  });

  it("releases an old cgroup.high critical latch after low-stall cache reclaim", () => {
    const tracker = createResourcePressureTracker({
      ...fastThresholds,
      sustainedSamplesRecovery: 1,
    });
    const make = (fileMb: number, psiAvg: number, highEvents: number): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: 1_799 * MiB,
        highBytes: 1_800 * MiB,
        maxBytes: 2_300 * MiB,
        fileBytes: fileMb * MiB,
        events: { low: 0, high: highEvents, max: 0, oom: 0, oom_kill: 0 },
      },
      psi: {
        someAvg10: psiAvg,
        someAvg60: 0,
        someAvg300: 0,
        fullAvg10: psiAvg,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      },
    });
    tracker.observe(make(138, 4.26, 0));
    tracker.observe(make(138, 4.26, 10));
    assert.equal(tracker.observe(make(138, 4.26, 20)).severity, "critical");
    // The raw charge is still > recoveryRatio * memory.high, but it is
    // mostly reclaimable cache and the local stall has disappeared.
    assert.equal(tracker.observe(make(1009, 0.36, 20)).severity, "normal");
  });

  it("keeps a critical memory.high latch when a new memory.max event arrives", () => {
    const tracker = createResourcePressureTracker({
      ...fastThresholds,
      sustainedSamplesRecovery: 1,
    });
    const sample = (
      currentMb: number,
      fileMb: number,
      highEvents: number,
      maxEvents: number
    ): ResourceSignals => ({
      ...baseSignals(),
      cgroup: {
        currentBytes: currentMb * MiB,
        highBytes: 1_800 * MiB,
        maxBytes: 2_300 * MiB,
        fileBytes: fileMb * MiB,
        events: { low: 0, high: highEvents, max: maxEvents, oom: 0, oom_kill: 0 },
      },
      psi: {
        someAvg10: 0,
        someAvg60: 0,
        someAvg300: 0,
        fullAvg10: 0,
        fullAvg60: 0,
        fullAvg300: 0,
        psiSource: "cgroup",
      },
    });

    // First produce a genuine critical cgroup.high state.
    tracker.observe(sample(1_710, 100, 0, 0));
    tracker.observe(sample(1_710, 100, 1, 0));
    assert.equal(tracker.observe(sample(1_710, 100, 2, 0)).severity, "critical");

    // The new sample is high (85% of memory.high, below criticalRatio).
    // Although its working set is tiny, memory.max incremented. It must
    // not make the recovery test ignore total memory and clear the latch.
    const withMaxEvent = tracker.observe(sample(1_530, 1_000, 2, 1));
    assert.equal(withMaxEvent.severity, "critical");
    assert.equal(withMaxEvent.reason, "cgroup_high");

    // The next stable sample can recover once the max counter stops rising.
    assert.equal(tracker.observe(sample(1_530, 1_000, 2, 1)).severity, "normal");
  });

  it("keeps snapshot state fields and bounded-cardinality values", () => {
    const tracker = createResourcePressureTracker(fastThresholds);
    const state: ResourcePressureState = tracker.observe(baseSignals());
    const severities = new Set<PressureSeverity>(["normal", "high", "critical"]);
    const reasons = new Set<PressureReason>([
      "none",
      "v8_heap_ratio",
      "v8_heap_absolute",
      "cgroup_ratio",
      "cgroup_high",
      "psi_some",
      "psi_full",
      "oom_event",
    ]);
    assert.ok(severities.has(state.severity));
    assert.ok(reasons.has(state.reason));
    assert.deepEqual(Object.keys(state).sort(), [
      "elevatedStreak",
      "lastTransitionAtMs",
      "observedAtMs",
      "reason",
      "recoveryStreak",
      "severity",
    ]);
  });

  it("#13124 OMNIROUTE_PRESSURE_PSI_DISABLED ignores host PSI and keeps cgroup", () => {
    const previous = process.env.OMNIROUTE_PRESSURE_PSI_DISABLED;
    process.env.OMNIROUTE_PRESSURE_PSI_DISABLED = "1";
    try {
      const tracker = createResourcePressureTracker(fastThresholds);
      const psiCritical = baseSignals({
        psi: {
          someAvg10: 90,
          someAvg60: null,
          someAvg300: null,
          fullAvg10: 90,
          fullAvg60: null,
          fullAvg300: null,
        },
      });
      assert.equal(tracker.observe(psiCritical).severity, "normal");
      assert.equal(tracker.observe(psiCritical).severity, "normal");

      const cgroupCritical = baseSignals({
        cgroup: {
          currentBytes: 950,
          maxBytes: 1000,
          highBytes: null,
          fileBytes: null,
          events: null,
        },
      });
      tracker.observe(cgroupCritical);
      assert.equal(tracker.observe(cgroupCritical).severity, "critical");
      assert.equal(tracker.getState().reason, "cgroup_ratio");
    } finally {
      if (previous === undefined) delete process.env.OMNIROUTE_PRESSURE_PSI_DISABLED;
      else process.env.OMNIROUTE_PRESSURE_PSI_DISABLED = previous;
    }
  });
});
