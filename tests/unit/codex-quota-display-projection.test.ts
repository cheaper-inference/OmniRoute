import assert from "node:assert/strict";
import test from "node:test";
import {
  mergeCodexQuotaObservation,
  projectCodexQuotaDisplay,
} from "../../src/lib/providers/codexQuotaDisplay.ts";

const older = "2026-01-01T00:00:00.000Z";
const newer = "2026-01-01T00:01:00.000Z";
const newest = "2026-01-01T00:02:00.000Z";
const signal = (scope: string, windows: Record<string, unknown>[]) => ({ scope, windows });
const percentageWindow = (percentUsed: unknown, windowSeconds: unknown, id = "primary") => ({
  id,
  percentUsed,
  windowSeconds,
  resetAt: null,
});

for (const [label, state] of [
  ["missing percentage", { quotaSignal: signal("codex", [{ windowSeconds: 18000 }]) }],
  ["invalid percentage", { quotaSignal: signal("codex", [percentageWindow(NaN, 18000)]) }],
  ["over-100 percentage", { quotaSignal: signal("codex", [percentageWindow(1.01, 18000)]) }],
  ["negative percentage", { quotaSignal: signal("codex", [percentageWindow(-0.01, 18000)]) }],
  ["string percentage", { quotaSignal: signal("codex", [percentageWindow("0.5", 18000)]) }],
  ["unknown duration", { quotaSignal: signal("codex", [percentageWindow(0.5, null)]) }],
  ["unsupported duration", { quotaSignal: signal("codex", [percentageWindow(0.5, 3600)]) }],
  ["foreign scope", { quotaSignal: signal("spark", [percentageWindow(0.5, 18000)]) }],
  ["missing denominator", { usage5h: 0 }],
  ["zero denominator", { usage5h: 0, limit5h: 0 }],
  ["negative usage", { usage5h: -1, limit5h: 100 }],
  ["infinite denominator", { usage5h: 10, limit5h: Infinity }],
] as const) {
  test(`${label} cannot create a display row`, () => {
    assert.equal(
      projectCodexQuotaDisplay(null, {
        codexQuotaStateByScope: { codex: { ...state, observedAt: newer } },
      }),
      null
    );
  });
}

test("only a scoped legacy snapshot is promoted, and its value is not mutated", () => {
  const state = { scope: "spark", usage7d: 100, limit7d: 100, observedAt: older };
  const copy = structuredClone(state);
  const projected = projectCodexQuotaDisplay(null, { codexQuotaState: state });
  assert.deepEqual(Object.keys(projected!.quotas!), ["gpt_5_3_codex_spark_weekly"]);
  assert.deepEqual(state, copy);
});

test("weekly-only primary signals stay weekly and do not fabricate a session", () => {
  const projected = projectCodexQuotaDisplay(null, {
    codexQuotaStateByScope: {
      codex: {
        observedAt: newer,
        quotaSignal: signal("codex", [percentageWindow(1, 604800)]),
      },
    },
  });
  assert.deepEqual(Object.keys(projected!.quotas!), ["weekly"]);
});

test("a malformed optional signal window does not discard its valid exhausted sibling", () => {
  const projected = projectCodexQuotaDisplay(null, {
    codexQuotaStateByScope: {
      codex: {
        observedAt: newer,
        quotaSignal: signal("codex", [
          percentageWindow("bad", 18000),
          percentageWindow(1, 604800, "secondary"),
        ]),
      },
    },
  });
  assert.deepEqual(Object.keys(projected!.quotas!), ["weekly"]);
  assert.equal((projected!.quotas!.weekly as Record<string, unknown>).remainingPercentage, 0);
});

test("sparse signal updates preserve sibling values and each window's age", () => {
  const previous = {
    observedAt: older,
    quotaSignal: signal("codex", [
      percentageWindow(0.1, 18000),
      percentageWindow(0.2, 604800, "secondary"),
    ]),
  };
  const next = { observedAt: newest, quotaSignal: signal("codex", [percentageWindow(0.3, 18000)]) };
  const merged = mergeCodexQuotaObservation(previous, next)!;
  assert.deepEqual(merged.observedAtByWindow, { "5h": newest, "7d": older });
  assert.deepEqual((merged.quotaSignal as { windows: unknown[] }).windows, [
    percentageWindow(0.3, 18000),
    percentageWindow(0.2, 604800, "secondary"),
  ]);
  const projected = projectCodexQuotaDisplay(
    {
      quotas: { session: { remainingPercentage: 90 }, weekly: { remainingPercentage: 60 } },
      fetchedAt: newer,
      plan: null,
      message: null,
    },
    { codexQuotaStateByScope: { codex: merged } }
  );
  assert.equal((projected!.quotas!.weekly as Record<string, unknown>).remainingPercentage, 60);
});

test("numeric observations supersede old percentage evidence only for the same window", () => {
  const merged = mergeCodexQuotaObservation(
    {
      observedAt: older,
      quotaSignal: signal("codex", [
        percentageWindow(0.2, 18000),
        percentageWindow(0.7, 604800, "secondary"),
      ]),
    },
    { observedAt: newer, usage5h: 40, limit5h: 100 }
  )!;
  const projected = projectCodexQuotaDisplay(null, { codexQuotaStateByScope: { codex: merged } })!;
  assert.equal((projected.quotas!.session as Record<string, unknown>).remainingPercentage, 60);
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).remainingPercentage, 30);
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).observedAt, older);
});

test("sparse signals preserve a weekly window even when the new primary is a session", () => {
  const merged = mergeCodexQuotaObservation(
    {
      observedAt: older,
      quotaSignal: signal("codex", [percentageWindow(0.7, 604800)]),
    },
    {
      observedAt: newer,
      quotaSignal: signal("codex", [percentageWindow(0.4, 18000)]),
    }
  )!;
  const projected = projectCodexQuotaDisplay(null, { codexQuotaStateByScope: { codex: merged } })!;
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).remainingPercentage, 30);
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).observedAt, older);
  assert.equal((projected.quotas!.session as Record<string, unknown>).remainingPercentage, 60);
});

test("an omitted cached row does not erase an older known sibling window", () => {
  const projected = projectCodexQuotaDisplay(
    {
      quotas: { session: { remainingPercentage: 60 } },
      fetchedAt: newer,
      plan: null,
      message: null,
    },
    {
      codexQuotaStateByScope: { codex: { usage7d: 70, limit7d: 100, observedAt: older } },
    }
  )!;
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).remainingPercentage, 30);
  assert.equal((projected.quotas!.weekly as Record<string, unknown>).observedAt, older);
  assert.equal(projected.fetchedAt, newer);
});

test("equal-age reads cannot repeatedly claim to be newer observations", () => {
  const cached = {
    quotas: { session: { remainingPercentage: 30 } },
    fetchedAt: newer,
    plan: null,
    message: null,
  };
  assert.equal(
    projectCodexQuotaDisplay(cached, {
      codexQuotaStateByScope: { codex: { observedAt: newer, usage5h: 5, limit5h: 100 } },
    }),
    cached
  );
});

test("a late snapshot is rejected before it can erase a scoped quota state", () => {
  assert.equal(mergeCodexQuotaObservation({ observedAt: newer }, { observedAt: older }), null);
});
