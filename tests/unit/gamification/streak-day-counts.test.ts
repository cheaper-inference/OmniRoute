import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getStreak } from "../../../src/lib/gamification/streaks";
import { getDbInstance } from "../../../src/lib/db/core";

describe("stored streak counters", () => {
  it("never read back negative or fractional", async () => {
    getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run(
        "gamification:streaks",
        "bad-counters-key",
        JSON.stringify({
          currentStreak: -5,
          longestStreak: 2.5,
          lastActiveDate: "2000-01-01",
          streakStartDate: "2000-01-01",
        })
      );

    const streak = await getStreak("bad-counters-key");

    assert.equal(streak.currentStreak, 0);
    assert.equal(streak.longestStreak, 2);
  });
});
