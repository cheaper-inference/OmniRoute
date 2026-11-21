import test from "node:test";
import assert from "node:assert/strict";

const { isSupportedUsageConnection } = await import("../../../src/lib/usage/providerLimits.ts");

test("isSupportedUsageConnection accepts Google Flow web-session and cookie connections", () => {
  for (const provider of ["googleflow-web", "googleflow", "gflow"]) {
    for (const authType of ["web-session", "cookie"]) {
      assert.equal(
        isSupportedUsageConnection({ id: `${provider}-${authType}`, provider, authType }),
        true,
        `${provider} (${authType}) should report Provider Limits`
      );
    }
  }
});

test("isSupportedUsageConnection keeps other web-session providers out of the Google Flow branch", () => {
  assert.equal(
    isSupportedUsageConnection({ id: "w1", provider: "not-a-provider", authType: "web-session" }),
    false
  );
  assert.equal(
    isSupportedUsageConnection({ id: "w2", provider: "not-a-provider", authType: "cookie" }),
    false
  );
});

test("isSupportedUsageConnection accepts Google Flow ids stored as API-key connections", () => {
  for (const provider of ["googleflow-web", "googleflow", "gflow"]) {
    assert.equal(isSupportedUsageConnection({ id: provider, provider, authType: "apikey" }), true);
  }
});
