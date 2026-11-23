import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildNextQuotaVisibility,
  filterQuotasByVisibility,
  getHiddenQuotaRows,
} from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

// Regression for upstream 9router#4767: hiding a quota row on one account must
// not hide the same-named row on every other account of the same provider.
describe("quota row visibility is per account (9router#4767)", () => {
  const quotas = [
    { name: "Bonus Pack 1", used: 1, total: 10 },
    { name: "Bonus Pack 2", used: 2, total: 10 },
  ];
  const connA = { connectionId: "conn-a", provider: "kiro" };
  const connB = { connectionId: "conn-b", provider: "kiro" };

  it("hiding a row on connection A leaves connection B untouched", () => {
    const next = buildNextQuotaVisibility({}, connA, "Bonus Pack 1", true);

    assert.deepEqual(
      filterQuotasByVisibility(connA, quotas, next).map((q) => q.name),
      ["Bonus Pack 2"]
    );
    assert.deepEqual(
      getHiddenQuotaRows(connA, quotas, next).map((q) => q.name),
      ["Bonus Pack 1"]
    );
    assert.deepEqual(
      filterQuotasByVisibility(connB, quotas, next).map((q) => q.name),
      ["Bonus Pack 1", "Bonus Pack 2"]
    );
    assert.deepEqual(getHiddenQuotaRows(connB, quotas, next), []);
  });

  it("keeps honoring a legacy provider-keyed entry as a read fallback", () => {
    const legacy = { kiro: { hidden: ["Bonus Pack 2"] } };

    assert.deepEqual(
      filterQuotasByVisibility(connA, quotas, legacy).map((q) => q.name),
      ["Bonus Pack 1"]
    );
    assert.deepEqual(
      filterQuotasByVisibility(connB, quotas, legacy).map((q) => q.name),
      ["Bonus Pack 1"]
    );
  });

  it("changing one account seeds from the legacy entry without affecting the others", () => {
    const legacy = { kiro: { hidden: ["Bonus Pack 2"] } };
    const next = buildNextQuotaVisibility(legacy, connA, "Bonus Pack 1", true);

    // Account A now owns its own list, seeded from the legacy provider entry.
    assert.deepEqual(filterQuotasByVisibility(connA, quotas, next), []);
    // Account B still reads the untouched legacy provider entry.
    assert.deepEqual(
      filterQuotasByVisibility(connB, quotas, next).map((q) => q.name),
      ["Bonus Pack 1"]
    );

    // Un-hiding the legacy row on A only affects A.
    const shown = buildNextQuotaVisibility(next, connA, "Bonus Pack 2", false);
    assert.deepEqual(
      filterQuotasByVisibility(connA, quotas, shown).map((q) => q.name),
      ["Bonus Pack 2"]
    );
    assert.deepEqual(
      filterQuotasByVisibility(connB, quotas, shown).map((q) => q.name),
      ["Bonus Pack 1"]
    );
  });

  it("an account-level empty list overrides the legacy provider entry", () => {
    const visibility = { kiro: { hidden: ["Bonus Pack 1"] }, "conn-a": { hidden: [] } };
    assert.equal(filterQuotasByVisibility(connA, quotas, visibility).length, 2);
    assert.equal(filterQuotasByVisibility(connB, quotas, visibility).length, 1);
  });
});
