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
