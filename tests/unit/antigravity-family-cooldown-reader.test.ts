import test from "node:test";
import assert from "node:assert/strict";
import {
  rehydrateAntigravityFamilyLocks,
  getAntigravityFamilyCooldownUntil,
} from "../../open-sse/services/antigravityFamilyCooldown.ts";
import {
  clearAllModelLockouts,
  getAllModelLockouts,
  lockModel,
} from "../../open-sse/services/accountFallback.ts";

function legacyRehydrate(provider: string, psd: unknown) {
  if (provider !== "antigravity" && provider !== "agy") return;
  const record = (value: unknown): Record<string, unknown> =>
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const untils = record(record(psd).antigravityFamilyRateLimitedUntil);
  const now = Date.now();
  for (const family of ["gemini", "claude"] as const) {
    const value = untils[family];
    let until = NaN;
    if (typeof value === "number" && Number.isFinite(value)) until = value;
    if (typeof value === "string" && value.trim()) {
      const parsed = /^\d+(\.\d+)?$/.test(value.trim()) ? Number(value) : Date.parse(value);
      until = Number.isFinite(parsed) ? parsed : NaN;
    }
    if (!Number.isFinite(until) || until <= now) continue;
    for (const alias of ["agy", "antigravity"])
      lockModel(alias, "synthetic", `${family}-family-lock`, "quota_exhausted", until - now);
  }
}

test("saved family reader preserves the lock sets and deadlines of hydration", (t) => {
  const now = Date.parse("2099-01-01T00:00:00Z");
  t.mock.method(Date, "now", () => now);
  const values = [
    undefined,
    null,
    false,
    "",
    " ",
    "invalid",
    NaN,
    Infinity,
    now - 1,
    now,
    now + 600_000,
    String(now + 600_000),
    ` ${now + 600_000}.5 `,
    new Date(now + 600_000).toISOString(),
    [],
    {},
  ];
  try {
    for (const provider of ["antigravity", "agy", "openai"])
      for (const value of values) {
        const psd = {
          antigravityFamilyRateLimitedUntil: {
            gemini: value,
            claude: now + 900_000,
            other: now + 900_000,
          },
        };
        clearAllModelLockouts();
        legacyRehydrate(provider, psd);
        const expected = getAllModelLockouts();
        clearAllModelLockouts();
        getAntigravityFamilyCooldownUntil(psd, "gemini", now);
        assert.deepEqual(getAllModelLockouts(), [], "pure reads install no locks");
        rehydrateAntigravityFamilyLocks(provider, "synthetic", psd);
        assert.deepEqual(getAllModelLockouts(), expected, `${provider}: ${String(value)}`);
        assert.equal(getAntigravityFamilyCooldownUntil(psd, "other", now), null);
      }
    for (const psd of [undefined, null, [], {}, { antigravityFamilyRateLimitedUntil: [] }]) {
      clearAllModelLockouts();
      rehydrateAntigravityFamilyLocks("agy", "synthetic", psd as Record<string, unknown>);
      assert.deepEqual(getAllModelLockouts(), []);
    }
  } finally {
    clearAllModelLockouts();
  }
});

for (const provider of ["agy", "antigravity"]) {
  test(`${provider} restores only the saved Argon family for both aliases`, (t) => {
    const now = Date.parse("2099-01-01T00:00:00Z");
    const until = now + 600_000;
    t.mock.method(Date, "now", () => now);
    t.after(clearAllModelLockouts);
    for (const value of [until, String(until), new Date(until).toISOString()]) {
      clearAllModelLockouts();
      const psd = { antigravityFamilyRateLimitedUntil: { argon: value } };
      assert.equal(getAntigravityFamilyCooldownUntil(psd, "argon", now), until);
      assert.deepEqual(getAllModelLockouts(), [], "reading Argon installs no locks");
      rehydrateAntigravityFamilyLocks(provider, "argon-restart", psd);
      const locks = getAllModelLockouts();
      assert.deepEqual(
        locks.map(({ provider, connectionId, model, reason, until, remainingMs }) => ({
          provider,
          connectionId,
          model,
          reason,
          until,
          remainingMs,
        })),
        ["agy", "antigravity"].map((alias) => ({
          provider: alias,
          connectionId: "argon-restart",
          model: "family:argon",
          reason: "quota_exhausted",
          until,
          remainingMs: until - now,
        })),
        "restore exactly the Argon family, not Gemini or Claude, with the saved deadline"
      );
      assert.deepEqual(psd, { antigravityFamilyRateLimitedUntil: { argon: value } });
    }
  });

  test(`${provider} ignores missing, expired and malformed Argon deadlines`, (t) => {
    const now = Date.parse("2099-01-01T00:00:00Z");
    t.mock.method(Date, "now", () => now);
    t.after(clearAllModelLockouts);
    for (const value of [
      undefined,
      null,
      false,
      "",
      " ",
      "invalid",
      NaN,
      Infinity,
      now - 1,
      now,
      [],
      {},
    ]) {
      clearAllModelLockouts();
      const psd = { antigravityFamilyRateLimitedUntil: { argon: value } };
      assert.equal(getAntigravityFamilyCooldownUntil(psd, "argon", now), null);
      rehydrateAntigravityFamilyLocks(provider, "argon-restart", psd);
      assert.deepEqual(getAllModelLockouts(), [], String(value));
      lockModel("agy", "unrelated", "claude-family-lock", "quota_exhausted", 900_000);
      const existingLocks = getAllModelLockouts();
      rehydrateAntigravityFamilyLocks(provider, "argon-restart", psd);
      assert.deepEqual(getAllModelLockouts(), existingLocks, "existing locks are unchanged");
    }
    clearAllModelLockouts();
    rehydrateAntigravityFamilyLocks("openai", "argon-restart", {
      antigravityFamilyRateLimitedUntil: { argon: now + 600_000 },
    });
    assert.deepEqual(getAllModelLockouts(), [], "non-Antigravity providers stay untouched");
  });
}
