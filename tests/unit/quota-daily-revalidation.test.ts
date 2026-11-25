/**
 * A long quota lock must not go unverified for days (#20343).
 *
 * A relative-prose quota window ("Resets in 76h25m43s") is honored up to the
 * dedicated prose ceiling, but the upstream can reset the quota EARLY and the
 * model would then stay parked for the rest of the ceiling. The mirror problem:
 * a lock derived from a bad parse could park a model that was never exhausted.
 *
 * A model that is locked for longer than a day is therefore retried once a day,
 * opt-in (QUOTA_DAILY_REVALIDATION, default off). This module decides WHICH
 * locks are due — the pure half, so it is testable without a database, a clock
 * or an upstream call.
 *
 * Contract:
 *   - an hourly or 30-minute lock is never revalidated: it expires on its own
 *     before the probe could help, and probing spends quota;
 *   - a lock expiring in more than a day is due once per calendar day of lock
 *     age, counted from when it was applied;
 *   - a lock whose remaining time is under a day is not due, even if it has
 *     been locked for longer than that (it is about to expire anyway);
 *   - the sweep is bounded, oldest lock first, so one pass cannot storm upstream.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  DAILY_REVALIDATION_INTERVAL_MS,
  isDailyRevalidationDue,
  selectDailyRevalidations,
} from "../../open-sse/services/quotaDailyRevalidation.ts";

const HOUR = 3_600_000;
const DAY = 24 * HOUR;

const lock = (overrides: Record<string, number> = {}) => ({
  provider: "antigravity",
  connectionId: "conn-1",
  model: "claude-opus-4-6-thinking",
  until: 100 * DAY,
  lockedAt: 0,
  ...overrides,
});

describe("quota daily revalidation — which locks are due", () => {
  it("never revalidates a short lock that expires on its own first", () => {
    const now = 100 * HOUR;
    // 30 min left, 1 h left: both expire before a daily probe could help.
    assert.equal(
      isDailyRevalidationDue(lock({ until: now + 30 * 60_000, lockedAt: now }), now),
      false
    );
    assert.equal(isDailyRevalidationDue(lock({ until: now + HOUR, lockedAt: now }), now), false);
  });

  it("revalidates a lock that still has more than a day left and was never probed", () => {
    const now = 100 * HOUR;
    const candidate = lock({ until: now + 5 * DAY, lockedAt: now - DAY });
    assert.equal(isDailyRevalidationDue(candidate, now), true);
  });

  it("waits a full interval before probing the same lock again", () => {
    const now = 100 * HOUR;
    const candidate = lock({ until: now + 5 * DAY, lockedAt: now - 3 * HOUR });
    // Probed 2 h ago: not due yet.
    assert.equal(
      isDailyRevalidationDue({ ...candidate, lastRevalidatedAt: now - 2 * HOUR }, now),
      false
    );
    // Probed a full interval ago: due again.
    assert.equal(
      isDailyRevalidationDue(
        { ...candidate, lastRevalidatedAt: now - DAILY_REVALIDATION_INTERVAL_MS },
        now
      ),
      true
    );
  });

  it("does not probe a lock whose remaining time is under a day", () => {
    const now = 100 * HOUR;
    // Locked long ago but expiring in 2 h: waiting is cheaper than probing.
    assert.equal(
      isDailyRevalidationDue(lock({ until: now + 2 * HOUR, lockedAt: now - 10 * DAY }), now),
      false
    );
  });

  it("ignores an expired lock instead of probing it", () => {
    const now = 100 * HOUR;
    assert.equal(
      isDailyRevalidationDue(lock({ until: now - 1, lockedAt: now - 5 * DAY }), now),
      false
    );
  });

  it("selects the oldest locks first and respects the per-sweep bound", () => {
    const now = 100 * HOUR;
    const candidates = [
      lock({ connectionId: "newest", until: now + 5 * DAY, lockedAt: now - 1 * DAY }),
      lock({ connectionId: "oldest", until: now + 5 * DAY, lockedAt: now - 5 * DAY }),
      lock({ connectionId: "middle", until: now + 5 * DAY, lockedAt: now - 3 * DAY }),
      lock({ connectionId: "short", until: now + HOUR, lockedAt: now - 9 * DAY }),
    ];
    const selected = selectDailyRevalidations(candidates, now, 2);
    assert.deepEqual(
      selected.map((entry) => entry.connectionId),
      ["oldest", "middle"]
    );
  });

  it("returns nothing when disabled, without touching the candidates", () => {
    const now = 100 * HOUR;
    const candidates = [lock({ until: now + 5 * DAY, lockedAt: now - 5 * DAY })];
    assert.deepEqual(selectDailyRevalidations(candidates, now, 5, { enabled: false }), []);
  });
});
