import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { validateScoreChange } from "../../../src/lib/gamification/antiCheat";
import { getDbInstance } from "../../../src/lib/db/core";

describe("validateScoreChange", () => {
  it("refuses a negative amount that would offset the window total", async () => {
    getDbInstance()
      .prepare("INSERT INTO xp_audit_log (api_key_id, action, xp_earned) VALUES (?, ?, ?)")
      .run("anti-cheat-key", "request", 1000);

    const result = await validateScoreChange("anti-cheat-key", "request", -5000);

    assert.equal(result.allowed, false);
  });

  it("refuses a non-finite amount", async () => {
    const result = await validateScoreChange("anti-cheat-other", "request", Number.NaN);

    assert.equal(result.allowed, false);
  });

  it("still allows a normal amount", async () => {
    const result = await validateScoreChange("anti-cheat-fresh", "request", 5);

    assert.equal(result.allowed, true);
  });
});
