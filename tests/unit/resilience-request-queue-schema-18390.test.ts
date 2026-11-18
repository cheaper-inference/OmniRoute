/**
 * Regression test for #18390: the strict resilience schemas rejected keys the
 * normalizers read, so Settings > Resilience > Request Queue could never be saved
 * (the card always posts requestQueue.globalConcurrentRequests) and
 * waitForCooldown.budgetMs could not be set through the API.
 */
import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { updateResilienceSchema } from "../../src/shared/validation/schemas.js";
import { GET, PATCH } from "../../src/app/api/resilience/route.ts";

function patchRequest(body: unknown) {
  return new Request("http://localhost/api/resilience", {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("#18390 requestQueue.globalConcurrentRequests", () => {
  it("accepts the bounds the normalizer uses", () => {
    for (const value of [0, 1, 64, 100_000]) {
      const result = updateResilienceSchema.safeParse({
        requestQueue: { globalConcurrentRequests: value },
      });
      assert.equal(result.success, true, `${value} should be accepted: ${JSON.stringify(result)}`);
    }
  });

  it("rejects out-of-range and non-integer values", () => {
    for (const value of [-1, 100_001, 1.5, "8"]) {
      const result = updateResilienceSchema.safeParse({
        requestQueue: { globalConcurrentRequests: value },
      });
      assert.equal(result.success, false, `${JSON.stringify(value)} should be rejected`);
    }
  });

  it("accepts the whole Request Queue card payload", () => {
    const result = updateResilienceSchema.safeParse({
      requestQueue: {
        autoEnableApiKeyProviders: true,
        requestsPerMinute: 100,
        minTimeBetweenRequestsMs: 200,
        concurrentRequests: 10,
        globalConcurrentRequests: 0,
        maxWaitMs: 120_000,
        executionMaxWaitMs: 600_000,
        maxQueueDepth: 100,
      },
    });
    assert.equal(result.success, true, JSON.stringify(result));
  });

  it("still rejects unknown requestQueue keys", () => {
    const result = updateResilienceSchema.safeParse({
      requestQueue: { globalConcurrentRequest: 1 },
    });
    assert.equal(result.success, false);
  });
});

describe("#18390 waitForCooldown.budgetMs", () => {
  it("accepts 0 through the 5 minute ceiling", () => {
    for (const value of [0, 30_000, 300_000]) {
      const result = updateResilienceSchema.safeParse({ waitForCooldown: { budgetMs: value } });
      assert.equal(result.success, true, `${value} should be accepted: ${JSON.stringify(result)}`);
    }
  });

  it("rejects out-of-range and non-integer values", () => {
    for (const value of [-1, 300_001, 1000.5]) {
      const result = updateResilienceSchema.safeParse({ waitForCooldown: { budgetMs: value } });
      assert.equal(result.success, false, `${value} should be rejected`);
    }
  });
});

describe("#18390 PATCH /api/resilience round trip", () => {
  it("saves the Request Queue card payload built from GET", async () => {
    const current = await (await GET()).json();
    const payload = {
      requestQueue: {
        ...current.requestQueue,
        requestsPerMinute: 77,
        globalConcurrentRequests: 12,
      },
    };
    const response = await PATCH(patchRequest(payload));
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.requestQueue.requestsPerMinute, 77);
    assert.equal(body.requestQueue.globalConcurrentRequests, 12);

    const reread = await (await GET()).json();
    assert.equal(reread.requestQueue.requestsPerMinute, 77);
    assert.equal(reread.requestQueue.globalConcurrentRequests, 12);
  });

  it("maps the legacy defaults.globalConcurrentRequests key", async () => {
    const response = await PATCH(patchRequest({ defaults: { globalConcurrentRequests: 5 } }));
    const body = await response.json();
    assert.equal(response.status, 200, JSON.stringify(body));
    assert.equal(body.requestQueue.globalConcurrentRequests, 5);
  });

  it("stores waitForCooldown.budgetMs, floored at the single wait cap", async () => {
    const { getSettings } = await import("../../src/lib/db/settings.ts");
    const { resolveResilienceSettings } = await import("../../src/lib/resilience/settings.ts");

    const ok = await PATCH(
      patchRequest({ waitForCooldown: { maxRetries: 2, maxRetryWaitSec: 10, budgetMs: 45_000 } })
    );
    assert.equal(ok.status, 200, JSON.stringify(await ok.json()));
    assert.equal(resolveResilienceSettings(await getSettings()).waitForCooldown.budgetMs, 45_000);

    const floored = await PATCH(patchRequest({ waitForCooldown: { budgetMs: 1_000 } }));
    assert.equal(floored.status, 200, JSON.stringify(await floored.json()));
    assert.equal(resolveResilienceSettings(await getSettings()).waitForCooldown.budgetMs, 10_000);
  });

  it("rejects an out-of-range globalConcurrentRequests with a validation error", async () => {
    const response = await PATCH(patchRequest({ requestQueue: { globalConcurrentRequests: -1 } }));
    assert.equal(response.status, 400);
  });
});
