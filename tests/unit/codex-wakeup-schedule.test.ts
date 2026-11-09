/**
 * Scheduled Codex account wakeups — next-run math and input validation.
 *
 * `nextWakeupAt` is pure (no timers, no DB): daily schedules are resolved in the task's
 * IANA timezone, interval schedules count from the moment they are evaluated.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { nextWakeupAt } = await import("../../src/lib/services/codexWakeupSchedule.ts");
const { codexWakeupActionSchema, codexWakeupTaskInputSchema } =
  await import("../../src/shared/validation/codexWakeupSchemas.ts");

const ALL_DAYS = [0, 1, 2, 3, 4, 5, 6];

test("daily schedule fires later today when the local time has not passed yet", () => {
  // 2026-03-10 is a Tuesday. 09:00 UTC = 06:00 in São Paulo (UTC-3, no DST).
  const after = Date.parse("2026-03-10T09:00:00.000Z");
  const next = nextWakeupAt(
    { kind: "daily", time: "08:30", timezone: "America/Sao_Paulo", days: ALL_DAYS },
    after
  );
  assert.equal(next, "2026-03-10T11:30:00.000Z");
});

test("daily schedule moves to the next allowed day once today's time has passed", () => {
  // Tuesday 12:00 local (15:00Z); only Mondays and Thursdays allowed → Thursday 08:30 local.
  const after = Date.parse("2026-03-10T15:00:00.000Z");
  const next = nextWakeupAt(
    { kind: "daily", time: "08:30", timezone: "America/Sao_Paulo", days: [1, 4] },
    after
  );
  assert.equal(next, "2026-03-12T11:30:00.000Z");
});

test("daily schedule uses the local calendar day, not the UTC one", () => {
  // 2026-03-11T01:00Z is still Tuesday 22:00 in São Paulo; Tuesday 23:00 local is ahead.
  const after = Date.parse("2026-03-11T01:00:00.000Z");
  const next = nextWakeupAt(
    { kind: "daily", time: "23:00", timezone: "America/Sao_Paulo", days: [2] },
    after
  );
  assert.equal(next, "2026-03-11T02:00:00.000Z");
});

test("daily schedule never returns the instant it is evaluated at", () => {
  const after = Date.parse("2026-03-10T11:30:00.000Z"); // exactly 08:30 local
  const next = nextWakeupAt(
    { kind: "daily", time: "08:30", timezone: "America/Sao_Paulo", days: ALL_DAYS },
    after
  );
  assert.equal(next, "2026-03-11T11:30:00.000Z");
});

test("daily schedule follows a DST offset change in the task timezone", () => {
  // New York switches to EDT on 2026-03-08: 07:00 local is 12:00Z before, 11:00Z after.
  const before = nextWakeupAt(
    { kind: "daily", time: "07:00", timezone: "America/New_York", days: ALL_DAYS },
    Date.parse("2026-03-06T13:00:00.000Z")
  );
  assert.equal(before, "2026-03-07T12:00:00.000Z");
  const after = nextWakeupAt(
    { kind: "daily", time: "07:00", timezone: "America/New_York", days: ALL_DAYS },
    Date.parse("2026-03-08T13:00:00.000Z")
  );
  assert.equal(after, "2026-03-09T11:00:00.000Z");
});

test("interval schedule counts from the evaluation time", () => {
  const after = Date.parse("2026-03-10T09:00:00.000Z");
  assert.equal(nextWakeupAt({ kind: "interval", minutes: 90 }, after), "2026-03-10T10:30:00.000Z");
});

const validTask = {
  name: "  Morning warm-up  ",
  connectionIds: ["codex-a", "codex-b"],
  enabled: true,
  schedule: { kind: "daily", time: "08:30", timezone: "America/Sao_Paulo", days: [5, 1, 3] },
};

test("task schema trims the name and sorts weekdays", () => {
  const parsed = codexWakeupTaskInputSchema.parse(validTask);
  assert.equal(parsed.name, "Morning warm-up");
  assert.deepEqual(parsed.schedule, {
    kind: "daily",
    time: "08:30",
    timezone: "America/Sao_Paulo",
    days: [1, 3, 5],
  });
});

test("task schema rejects bad time, timezone, weekdays, interval and account lists", () => {
  const invalid = [
    { ...validTask, schedule: { ...validTask.schedule, time: "24:00" } },
    { ...validTask, schedule: { ...validTask.schedule, time: "8:30" } },
    { ...validTask, schedule: { ...validTask.schedule, timezone: "Mars/Olympus_Mons" } },
    { ...validTask, schedule: { ...validTask.schedule, days: [] } },
    { ...validTask, schedule: { ...validTask.schedule, days: [1, 1] } },
    { ...validTask, schedule: { ...validTask.schedule, days: [7] } },
    { ...validTask, schedule: { kind: "interval", minutes: 4 } },
    { ...validTask, schedule: { kind: "interval", minutes: 10081 } },
    { ...validTask, schedule: { kind: "interval", minutes: 7.5 } },
    { ...validTask, schedule: { kind: "cron", expression: "* * * * *" } },
    { ...validTask, connectionIds: [] },
    { ...validTask, connectionIds: ["a", "a"] },
    { ...validTask, connectionIds: Array.from({ length: 21 }, (_, i) => `c${i}`) },
    { ...validTask, name: "   " },
    { ...validTask, name: "x".repeat(81) },
    { ...validTask, enabled: "yes" },
    { ...validTask, provider: "claude" },
  ];
  for (const input of invalid) {
    assert.equal(
      codexWakeupTaskInputSchema.safeParse(input).success,
      false,
      `expected rejection: ${JSON.stringify(input).slice(0, 120)}`
    );
  }
});

test("action schema accepts create/update/delete/run and rejects unknown actions", () => {
  assert.equal(
    codexWakeupActionSchema.safeParse({ action: "create", task: validTask }).success,
    true
  );
  assert.equal(
    codexWakeupActionSchema.safeParse({ action: "update", id: "t1", task: validTask }).success,
    true
  );
  assert.equal(codexWakeupActionSchema.safeParse({ action: "delete", id: "t1" }).success, true);
  assert.equal(codexWakeupActionSchema.safeParse({ action: "run", id: "t1" }).success, true);
  assert.equal(codexWakeupActionSchema.safeParse({ action: "run" }).success, false);
  assert.equal(codexWakeupActionSchema.safeParse({ action: "ping", id: "t1" }).success, false);
  assert.equal(
    codexWakeupActionSchema.safeParse({ action: "delete", id: "bad id!" }).success,
    false
  );
});
