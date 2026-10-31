import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  buildUnifiedSource,
  buildPresetUnifiedSource,
  readPublishedCutoffDate,
  UNPUBLISHED_CUTOFF_DATE,
} from "../../src/lib/db/usageAnalytics/sources.ts";

for (const [name, build, prefix] of [
  ["analytics", buildUnifiedSource, ""],
  ["preset", buildPresetUnifiedSource, "preset"],
] as const) {
  describe(`${name} published-day boundaries`, () => {
    for (const [label, sinceIso, rawCutoffDate, apiKeyWhere, aggregated] of [
      ["null pointer with all time", null, null, null, false],
      ["null pointer with a lower bound", "2026-01-01T00:00:00.000Z", null, "", false],
      ["all time with a published day", null, "2026-01-02", null, true],
      ["window before cutoff", "2026-01-01T00:00:00.000Z", "2026-01-02", "", true],
      ["window on cutoff day", "2026-01-02T23:59:59.999Z", "2026-01-02", null, true],
      ["window after cutoff", "2026-01-03T00:00:00.000Z", "2026-01-02", "", false],
      [
        "API key filter on cutoff",
        "2026-01-02T00:00:00.000Z",
        "2026-01-02",
        "api_key_id = @apiKey0",
        false,
      ],
      ["API key filter with all time", null, "2026-01-02", "api_key_id = @apiKey0", false],
      [
        "unpublished sentinel with a lower bound",
        "2026-01-01T00:00:00.000Z",
        UNPUBLISHED_CUTOFF_DATE,
        null,
        false,
      ],
      ["unpublished sentinel with all time", null, UNPUBLISHED_CUTOFF_DATE, null, true],
    ] as const) {
      it(label, () => {
        const { unifiedSource: sql, unifiedParams: params } = build({
          sinceIso,
          untilIso: null,
          rawCutoffDate,
          apiKeyWhere,
          apiKeyParams: apiKeyWhere ? { apiKey0: "key-a" } : {},
        });
        const param = (key: string) =>
          prefix ? `${prefix}${key[0].toUpperCase()}${key.slice(1)}` : key;
        assert.equal(sql.includes("UNION ALL"), aggregated);
        assert.equal(sql.includes("FROM usage_daily_summary"), aggregated);
        if (aggregated) {
          assert.ok(sql.includes(`DATE(timestamp) > @${param("rawCutoff")}`));
          assert.ok(sql.includes(`date <= @${param("rawCutoffDate")}`));
          assert.equal(params[param("rawCutoff")], rawCutoffDate);
          assert.equal(params[param("rawCutoffDate")], rawCutoffDate);
          assert.equal(params[param("sinceDate")], sinceIso?.split("T")[0]);
          assert.equal(params[param("since")], undefined);
        } else {
          assert.equal(params[param("rawCutoff")], undefined);
          assert.equal(params[param("rawCutoffDate")], undefined);
          assert.equal(params[param("since")], sinceIso ?? undefined);
          assert.equal(sql.includes(`timestamp >= @${param("since")}`), !!sinceIso);
        }
        assert.equal(params.apiKey0, apiKeyWhere ? "key-a" : undefined);
        if (apiKeyWhere) assert.ok(sql.includes(apiKeyWhere));
      });
    }
  });
}

describe("published pointer", () => {
  for (const row of [undefined, { last_completed_date: null }]) {
    it(`uses the unpublished sentinel for ${row ? "a null pointer" : "a missing row"}`, () => {
      assert.equal(
        readPublishedCutoffDate({ prepare: () => ({ get: () => row }) }),
        UNPUBLISHED_CUTOFF_DATE
      );
    });
  }
  it("retains the published cutoff day", () => {
    assert.equal(
      readPublishedCutoffDate({
        prepare: () => ({ get: () => ({ last_completed_date: "2026-01-02" }) }),
      }),
      "2026-01-02"
    );
  });
});
