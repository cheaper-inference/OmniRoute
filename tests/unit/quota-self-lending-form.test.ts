import test from "node:test";
import assert from "node:assert/strict";

import {
  buildLendingSubmission,
  describeLending,
  LENDING_DURATIONS,
  lendingBaseline,
  lendingBorrowRows,
  lendingCardKind,
  lendingChoices,
  lendingDraft,
  lendingErrorText,
  lendingFormView,
  lendingIsDirty,
  parseLendingPercent,
  type LendingDeadlineChoice,
  type LendingStatus,
} from "../../src/app/quota/[provider]/lib/lendingForm.ts";
import type { SelfServiceWriteFailure } from "../../src/app/quota/[provider]/lib/selfServiceClient.ts";
import { selfLendingPatchSchema } from "../../src/shared/schemas/selfQuota.ts";

const NOW = Date.parse("2026-05-27T15:30:00.000Z");
const UNTIL = Date.parse("2026-06-01T12:00:00.000Z");
const active = (percent: number, until: number | null) =>
  ({ kind: "active", percent, until }) as const;

test("the status follows lendingActive, never a clock", () => {
  assert.deepEqual(
    describeLending({ lendingPercent: 30, lendingUntil: null, lendingActive: true }),
    active(30, null)
  );
  assert.deepEqual(
    describeLending({ lendingPercent: 30, lendingUntil: UNTIL, lendingActive: true }),
    active(30, UNTIL)
  );
  assert.deepEqual(
    describeLending({ lendingPercent: 40, lendingUntil: UNTIL, lendingActive: false }),
    { kind: "ended", percent: 40, until: UNTIL }
  );
  assert.deepEqual(
    describeLending({ lendingPercent: 0, lendingUntil: null, lendingActive: false }),
    { kind: "off" }
  );
  assert.deepEqual(
    describeLending({ lendingPercent: 40, lendingUntil: null, lendingActive: false }),
    { kind: "off" }
  );
});

test("the form starts from what is in force", () => {
  assert.deepEqual(lendingBaseline(active(30, null)), { percent: "30", deadline: "none" });
  assert.deepEqual(lendingBaseline(active(30, UNTIL)), { percent: "30", deadline: "keep" });
  assert.deepEqual(lendingBaseline({ kind: "ended", percent: 40, until: UNTIL }), {
    percent: "0",
    deadline: "none",
  });
  assert.deepEqual(lendingBaseline({ kind: "off" }), { percent: "0", deadline: "none" });
  assert.deepEqual(lendingChoices({ kind: "off" }), ["none", "1h", "8h", "24h", "7d", "30d"]);
  assert.deepEqual(lendingChoices(active(30, UNTIL)), [
    "keep",
    "none",
    "1h",
    "8h",
    "24h",
    "7d",
    "30d",
  ]);
  assert.ok(!lendingChoices(active(30, null)).includes("keep"));
  assert.ok(!lendingChoices({ kind: "ended", percent: 40, until: UNTIL }).includes("keep"));
});

test("a stored deadline that matches a duration from now still starts on keep", () => {
  assert.deepEqual(lendingBaseline(active(30, NOW + 86_400_000)), {
    percent: "30",
    deadline: "keep",
  });
});

test("the durations count hours and days from the moment of saving", () => {
  assert.deepEqual(
    LENDING_DURATIONS.map(({ choice, unit, value, ms }) => [choice, unit, value, ms]),
    [
      ["1h", "hours", 1, 3_600_000],
      ["8h", "hours", 8, 28_800_000],
      ["24h", "hours", 24, 86_400_000],
      ["7d", "days", 7, 604_800_000],
      ["30d", "days", 30, 2_592_000_000],
    ]
  );
});

test("a percentage is a whole number from 0 to 100", () => {
  for (const [raw, value] of [
    ["0", 0],
    ["7", 7],
    ["100", 100],
    ["007", 7],
  ] as const)
    assert.equal(parseLendingPercent(raw), value, raw);
  for (const raw of ["", " ", "101", "150", "12.5", "-1", "+5", "1e2", "abc", "5%", "1000"])
    assert.equal(parseLendingPercent(raw), null, raw);
});

test("a submission mirrors the PATCH schema", () => {
  const build = (
    percent: string,
    deadline: LendingDeadlineChoice,
    status: LendingStatus = { kind: "off" },
    now = NOW
  ) => buildLendingSubmission({ percent, deadline }, status, now);
  assert.deepEqual(build("25", "none"), { ok: true, lendingPercent: 25, lendingUntil: null });
  assert.deepEqual(build("25", "24h"), {
    ok: true,
    lendingPercent: 25,
    lendingUntil: NOW + 86_400_000,
  });
  assert.deepEqual(build("25", "30d"), {
    ok: true,
    lendingPercent: 25,
    lendingUntil: NOW + 2_592_000_000,
  });
  assert.deepEqual(build("50", "keep", active(30, UNTIL)), {
    ok: true,
    lendingPercent: 50,
    lendingUntil: UNTIL,
  });
  assert.deepEqual(build("0", "7d", active(30, UNTIL)), {
    ok: true,
    lendingPercent: 0,
    lendingUntil: null,
  });
  assert.deepEqual(build("150", "none"), { ok: false, problem: "percent" });
  assert.deepEqual(build("50", "keep", active(30, UNTIL), UNTIL), {
    ok: false,
    problem: "deadline",
  });
  assert.deepEqual(build("50", "keep", active(30, null)), { ok: false, problem: "deadline" });
  assert.deepEqual(build("50", "1h", { kind: "off" }, Number.NaN), {
    ok: false,
    problem: "deadline",
  });
  for (const { choice } of LENDING_DURATIONS) {
    const sent = build("1", choice);
    assert.ok(
      sent.ok &&
        selfLendingPatchSchema.safeParse({
          pool: `qpr_${"a".repeat(32)}`,
          lendingPercent: sent.lendingPercent,
          lendingUntil: sent.lendingUntil,
        }).success,
      choice
    );
  }
});

test("a draft that keeps a deadline is never sent without one after that deadline ends", () => {
  const ended = { kind: "ended", percent: 30, until: UNTIL } as const;
  const kept = lendingDraft({ percent: "50", deadline: "keep" }, active(30, UNTIL), null);
  assert.deepEqual(kept, { values: { percent: "50", deadline: "keep" }, keptUntil: UNTIL });
  // The ended state no longer names a kept deadline, so the draft keeps the one it had.
  assert.equal(lendingDraft(kept.values, ended, kept).keptUntil, UNTIL);

  const view = lendingFormView(kept, ended);
  assert.deepEqual(view.values, { percent: "50", deadline: "keep" });
  assert.equal(view.keptUntil, UNTIL);
  assert.deepEqual(view.options[0], { choice: "keep", disabled: true });
  assert.deepEqual(
    view.options.slice(1),
    lendingChoices(ended).map((choice) => ({ choice, disabled: false }))
  );
  assert.equal(lendingIsDirty(view.values, ended), true);
  assert.deepEqual(buildLendingSubmission(view.values, ended, NOW), {
    ok: false,
    problem: "deadline",
  });

  // Another choice is listed as offered, and the kept one is no longer shown.
  const other = lendingFormView(
    lendingDraft({ percent: "50", deadline: "24h" }, ended, kept),
    ended
  );
  assert.ok(other.options.every((option) => option.choice !== "keep" && !option.disabled));
  assert.deepEqual(buildLendingSubmission(other.values, ended, NOW), {
    ok: true,
    lendingPercent: 50,
    lendingUntil: NOW + 86_400_000,
  });

  // While the deadline is in force, keep is offered and nothing is disabled.
  const live = lendingFormView(kept, active(30, UNTIL));
  assert.deepEqual(live.options[0], { choice: "keep", disabled: false });
  assert.equal(live.keptUntil, UNTIL);
  assert.deepEqual(lendingFormView(null, ended).values, { percent: "0", deadline: "none" });
});

test("the form is dirty only when saving would change what is in force", () => {
  const dirty = (percent: string, deadline: LendingDeadlineChoice, status: LendingStatus) =>
    lendingIsDirty({ percent, deadline }, status);
  assert.equal(dirty("0", "none", { kind: "off" }), false);
  assert.equal(dirty("0", "7d", { kind: "off" }), false);
  assert.equal(dirty("0", "none", { kind: "ended", percent: 40, until: UNTIL }), false);
  assert.equal(dirty("30", "keep", active(30, UNTIL)), false);
  assert.equal(dirty("30", "none", active(30, null)), false);
  assert.equal(dirty("30", "none", active(30, UNTIL)), true);
  assert.equal(dirty("31", "keep", active(30, UNTIL)), true);
  assert.equal(dirty("0", "keep", active(30, UNTIL)), true);
  assert.equal(dirty("10", "none", { kind: "off" }), true);
  assert.equal(dirty("abc", "none", { kind: "off" }), true); // Save stays reachable, so the field error can show
});

test("what others lend is a figure, unknown, or not applicable, never a zero for null", () => {
  const dim = (window: "daily" | "weekly", borrowAvailable?: number | null) => ({
    unit: "requests" as const,
    window,
    limit: 1000,
    yourShare: {
      fairShare: 500,
      consumed: 1,
      remaining: 499,
      status: "ok" as const,
      borrowAvailable,
    },
  });
  assert.deepEqual(
    lendingBorrowRows({
      policy: "hard",
      dimensions: [dim("daily", 40), dim("weekly", null), dim("daily", 0)],
    }),
    {
      kind: "rows",
      rows: [
        { window: "daily", unit: "requests", amount: 40 },
        { window: "weekly", unit: "requests", amount: null },
        { window: "daily", unit: "requests", amount: 0 },
      ],
    }
  );
  assert.deepEqual(lendingBorrowRows({ policy: "hard", dimensions: [dim("daily")] }).kind, "rows"); // absent reads as unknown
  assert.deepEqual(lendingBorrowRows({ policy: "soft", dimensions: [dim("daily", null)] }), {
    kind: "not-applicable",
  });
  assert.deepEqual(lendingBorrowRows({ policy: "burst", dimensions: [] }), {
    kind: "not-applicable",
  });
  assert.deepEqual(lendingBorrowRows({ policy: "hard", dimensions: [] }), { kind: "none" });
});

test("a figure that is not a finite number from 0 up reads as unknown", () => {
  const dim = (borrowAvailable?: number | null) => ({
    unit: "tokens" as const,
    window: "daily" as const,
    limit: 1000,
    yourShare: {
      fairShare: 500,
      consumed: 1,
      remaining: 499,
      status: "ok" as const,
      borrowAvailable,
    },
  });
  assert.deepEqual(
    lendingBorrowRows({
      policy: "hard",
      dimensions: [dim(), dim(-1), dim(Number.NaN), dim(Infinity)],
    }),
    {
      kind: "rows",
      rows: Array.from({ length: 4 }, () => ({ window: "daily", unit: "tokens", amount: null })),
    }
  );
});

test("a consent pool gets the full card, a saturation pool only a withdrawal of a stored percentage", () => {
  assert.equal(lendingCardKind({ borrowMode: "consent", lendingPercent: 0 }), "full");
  assert.equal(lendingCardKind({ borrowMode: "consent", lendingPercent: 40 }), "full");
  assert.equal(lendingCardKind({ borrowMode: "saturation", lendingPercent: 40 }), "withdraw");
  assert.equal(lendingCardKind({ borrowMode: "saturation", lendingPercent: 0 }), "none");
});

test("each write failure has one text, and only two offer a reload", () => {
  const text = (error: SelfServiceWriteFailure, seconds: number | null = null) =>
    lendingErrorText(error, seconds);
  assert.deepEqual(text("unauthorized"), { key: "lendingErrorKey", reload: false });
  assert.deepEqual(text("forbidden"), { key: "lendingErrorClosed", reload: true });
  assert.deepEqual(text("not-found"), { key: "lendingErrorGone", reload: true });
  assert.deepEqual(text("rejected"), { key: "lendingErrorRejected", reload: false });
  assert.deepEqual(text("rate-limited", 7), {
    key: "lendingErrorRateLimited",
    values: { seconds: 7 },
    reload: false,
  });
  assert.deepEqual(text("rate-limited"), { key: "lendingErrorRateLimitedUnknown", reload: false });
  assert.deepEqual(text("server"), { key: "lendingErrorServer", reload: false });
  assert.deepEqual(text("network"), { key: "lendingErrorNetwork", reload: false });
  assert.deepEqual(text("invalid-response"), { key: "lendingErrorUnreadable", reload: false });
});

test("the rules read no clock, no storage and no React", async () => {
  const { readFileSync } = await import("node:fs");
  const source = readFileSync("src/app/quota/[provider]/lib/lendingForm.ts", "utf8");
  assert.match(source, /export function buildLendingSubmission\(/);
  assert.doesNotMatch(source, /Date\.now|new Date\(|performance\.|from "react"|fetch\(|Storage/);
});
