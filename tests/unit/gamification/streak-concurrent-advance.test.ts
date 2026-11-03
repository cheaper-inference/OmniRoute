import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { advanceStreak } from "../../../src/lib/gamification/streaks";
import { getDbInstance } from "../../../src/lib/db/core";

const DAY_MS = 86_400_000;
const yesterday = () => new Date(Date.now() - DAY_MS).toISOString().split("T")[0];

describe("advanceStreak under concurrent calls", () => {
  it("extends the streak once when two first-of-day calls overlap", async () => {
    getDbInstance()
      .prepare("INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES (?, ?, ?)")
      .run(
        "gamification:streaks",
        "concurrent-key",
        JSON.stringify({
          currentStreak: 2,
          longestStreak: 2,
          lastActiveDate: yesterday(),
          streakStartDate: "2000-01-01",
        })
      );

    const results = await Promise.all([
      advanceStreak("concurrent-key"),
      advanceStreak("concurrent-key"),
    ]);

    assert.equal(results.filter((result) => result.extended).length, 1, JSON.stringify(results));
  });
});
