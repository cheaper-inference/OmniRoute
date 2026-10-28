import { after, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const directory = fs.mkdtempSync(path.join(os.tmpdir(), "systemone-unpriced-"));
process.env.DATA_DIR = directory;
process.env.API_KEY_SECRET = "synthetic-systemone-unpriced-secret";
process.env.USAGE_LIMIT_IGNORE_UNPRICED = "false";
const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemOne.ts");
const { createApiKey, getApiKeyById, resetApiKeyState } =
  await import("../../src/lib/db/apiKeys.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { checkBudget, setBudget, resetCostData } = await import("../../src/domain/costRules.ts");
const { checkKeyQuota } = await import("../../src/domain/keyQuota.ts");
const { upsertKeyQuotaLimits } = await import("../../src/lib/db/keyQuota.ts");
after(() => {
  resetCostData();
  resetApiKeyState();
  resetDbInstance();
  fs.rmSync(directory, { recursive: true, force: true });
});

const options = {
  provider: "openrouter",
  canonicalModel: "openrouter/typesafe/jev-1.14",
  body: {
    model: "typesafe/jev-1.14",
    state: "synthetic",
    questions: { q: { type: "noul", instructions: "Is this synthetic?" } },
  },
  credentials: { apiKey: "synthetic-provider-key", connectionId: "synthetic-provider-connection" },
};

for (const dimension of ["budget", "monthly"] as const) {
  for (const outcome of [
    "unknown-failure",
    "unknown-success",
    "known-zero-failure",
    "priced-success",
  ] as const) {
    test(`${dimension}-only key with usageLimitEnabled false handles ${outcome} honestly`, async () => {
      const key = await createApiKey(
        `Synthetic ${dimension} ${outcome}`,
        `synthetic-${dimension}-${outcome}`
      );
      assert.equal((await getApiKeyById(key.id)).usageLimitEnabled, false);
      if (dimension === "budget") setBudget(key.id, { dailyLimitUsd: 1, resetInterval: "daily" });
      else upsertKeyQuotaLimits(key.id, { monthlyAmountUsd: 1 });
      assert.equal(checkBudget(key.id).allowed, true);
      assert.equal(checkKeyQuota(key.id).allowed, true);
      const failed = outcome.endsWith("failure");
      const knownZero = outcome === "known-zero-failure";
      const response = await handleSystemOneProxy(
        { ...options, apiKeyInfo: { id: key.id } },
        {
          withCapacity: async (_options, _signal, run) => run(),
          fetchSystemOne: async () =>
            Response.json(
              {
                answers: { q: { type: "noul", noul: 1 } },
                usage: { input_tokens: 10, output_tokens: 1, ...(knownZero ? { cost: 0 } : {}) },
              },
              { status: failed ? 503 : 200 }
            ),
          calculateCost: async () => ({
            costUsd: outcome === "priced-success" ? 0.0001 : 0,
            priced: outcome === "priced-success",
          }),
          markAccountUnavailable: async () => {},
        }
      );
      assert.equal(response.status, failed ? 503 : 200);
      const shouldRemainOpen = knownZero || outcome === "priced-success";
      const verdict = dimension === "budget" ? checkBudget(key.id) : checkKeyQuota(key.id);
      assert.equal(verdict.allowed, shouldRemainOpen);
      if (!shouldRemainOpen) assert.match(String(verdict.reason), /without a price/i);
      assert.equal(
        response.headers.get("x-omniroute-cost-status"),
        shouldRemainOpen ? "known" : "unknown"
      );
    });
  }
}

test("unpriced marker writer failure is terminal and never reenters accounting", async () => {
  const key = await createApiKey(
    "Synthetic unpriced writer failure",
    "synthetic-unpriced-writer-failure"
  );
  let markers = 0,
    physical = 0,
    cooldowns = 0;
  const response = await handleSystemOneProxy(
    { ...options, apiKeyInfo: { id: key.id } },
    {
      withCapacity: async (_options, _signal, run) => run(),
      fetchSystemOne: async () => {
        physical++;
        return Response.json({ error: { message: "synthetic outage" } }, { status: 503 });
      },
      recordUnpricedCost: () => {
        markers++;
        throw new Error("synthetic-private-storage-error");
      },
      markAccountUnavailable: async () => {
        cooldowns++;
      },
    }
  );
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("x-omniroute-accounting-status"), "failed");
  assert.equal(markers, 1);
  assert.equal(physical, 1);
  assert.equal(cooldowns, 0);
  assert.doesNotMatch(await response.text(), /synthetic-private-storage-error/);
});
