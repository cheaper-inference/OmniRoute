import assert from "node:assert/strict";
import { test } from "node:test";
import { resolveProviderAvailability } from "../../src/lib/providerAvailability.ts";
import { buildFixtureHealthAccount as buildHealthAccount } from "./quota-overview-projection-fixtures.ts";
import { displayAccount } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/availabilityDisplay.ts";

const now = Date.parse("2099-01-01T00:00:00Z");
const data = { quotas: [{ name: "weekly", remainingPercentage: 80 }] };
const policy = { enabled: false, defaultThresholdPercent: 2, providerWindowDefaults: {} };

for (const testStatus of ["banned", "expired", "credits_exhausted"]) {
  for (const lastErrorAt of [undefined, "2098-12-01T00:00:00Z", "2099-01-01T00:00:00Z"]) {
    test(`${testStatus} uses the upstream terminal classifier (${lastErrorAt ?? "unconfirmed"})`, () => {
      const connection = {
        id: "account@example.test",
        provider: "claude",
        isActive: true,
        testStatus: ` ${testStatus.toUpperCase()} `,
        lastErrorAt,
        rateLimitedUntil: "2098-12-31T23:59:00Z",
      };
      const account = buildHealthAccount(connection, data, {}, now, { policy });
      assert.deepEqual(account.runtimeAvailability, resolveProviderAvailability(connection, now));
      assert.equal(displayAccount(account, now).kind, "act");
      assert.equal(account.recoverAt, undefined);
      assert.equal(
        account.reasons.find((reason) => reason.type === "terminal")?.terminal,
        testStatus
      );
      const later = buildHealthAccount(connection, data, {}, now + 7 * 86400000, { policy });
      assert.equal(later.runtimeAvailability.state, "STALE_TERMINAL");
      assert.equal(displayAccount(later, now + 7 * 86400000).kind, "act");
    });
  }
}

test("per-account display hiding never removes availability evidence", () => {
  const connection = { id: "account@example.test", provider: "claude", isActive: true };
  const exhausted = { quotas: [{ name: "weekly", remainingPercentage: 0 }] };
  const visibility = { [connection.id]: { hidden: ["weekly"] } };
  assert.deepEqual(
    buildHealthAccount(connection, exhausted, visibility, now, { policy }),
    buildHealthAccount(connection, exhausted, {}, now, { policy })
  );
  assert.equal(
    displayAccount(buildHealthAccount(connection, exhausted, visibility, now, { policy }), now)
      .kind,
    "cdw"
  );
});
