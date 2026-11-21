import test from "node:test";
import assert from "node:assert/strict";

import { quotaGroupSlug, quotaModelName } from "../../src/lib/quota/quotaModelNaming.ts";
import { listQuotaKeyModels } from "../../src/lib/quota/quotaKeyModels.ts";

const mine = quotaModelName("Team A", "claude", "claude-sonnet-5");
const theirs = quotaModelName("Team B", "claude", "claude-sonnet-5");

const deps = (combos: unknown, poolSlugs = [quotaGroupSlug("Team A")]) => ({
  resolveQuotaKeyScope: async () => ({ poolSlugs }),
  getCombos: async () => combos as Array<{ name?: unknown }>,
});

test("lists only the quota models of the key's own groups", async () => {
  assert.deepEqual(
    await listQuotaKeyModels(
      ["pool-1"],
      deps([{ name: mine }, { name: theirs }, { name: "plain" }, { name: "" }, {}])
    ),
    [mine]
  );
});

test("a key without quota pools sees no models", async () => {
  assert.deepEqual(await listQuotaKeyModels([], deps([{ name: mine }], [])), []);
});

test("null or undefined allowedQuotas resolve an empty scope and yield no models", async () => {
  for (const allowedQuotas of [null, undefined]) {
    const seen: string[][] = [];
    const models = await listQuotaKeyModels(allowedQuotas, {
      resolveQuotaKeyScope: async (quotas) => {
        seen.push(quotas);
        return { poolSlugs: quotas.length ? [quotaGroupSlug("Team A")] : [] };
      },
      getCombos: async () => [{ name: mine }],
    });
    assert.deepEqual(models, []);
    assert.deepEqual(seen, [[]]);
  }
});

test("a scope resolution failure propagates to the caller", async () => {
  await assert.rejects(
    listQuotaKeyModels(["pool-1"], {
      ...deps([{ name: mine }]),
      resolveQuotaKeyScope: async () => {
        throw new Error("scope lookup failed");
      },
    }),
    /scope lookup failed/
  );
});

test("a failed combo read yields an empty list instead of throwing", async () => {
  assert.deepEqual(
    await listQuotaKeyModels(["pool-1"], {
      ...deps([]),
      getCombos: async () => {
        throw new Error("db down");
      },
    }),
    []
  );
});
