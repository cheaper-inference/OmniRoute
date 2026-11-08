import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { evaluateBadges, seedBuiltinBadges } from "../../../src/lib/gamification/badges";
import { getDbInstance } from "../../../src/lib/db/core";

describe("early-adopter window", () => {
  it("is measured in UTC, whatever the server time zone is", async () => {
    const originalTz = process.env.TZ;
    process.env.TZ = "America/Los_Angeles";
    try {
      await seedBuiltinBadges();
      // first activity 30 days and 1 hour ago, stored as SQLite UTC text
      getDbInstance()
        .prepare(
          "INSERT INTO xp_audit_log (api_key_id, action, xp_earned, created_at) VALUES (?, ?, ?, datetime('now', '-30 days', '-1 hour'))"
        )
        .run("early-tz-key", "request", 1);

      const unlocked = await evaluateBadges("early-tz-key", "request");

      assert.ok(!unlocked.includes("early-adopter"), JSON.stringify(unlocked));
    } finally {
      if (originalTz === undefined) delete process.env.TZ;
      else process.env.TZ = originalTz;
    }
  });
});
