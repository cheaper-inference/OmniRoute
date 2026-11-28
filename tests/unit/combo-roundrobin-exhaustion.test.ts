// The 503 the round-robin leg returns when nothing was dispatched. Split out of the loop file so
// each branch can be checked on its own: a missing branch here means an operator sees a 503 that
// explains nothing about why every target was filtered out.
import test from "node:test";
import assert from "node:assert/strict";

import { roundRobinExhaustedResponse } from "../../open-sse/services/combo/roundRobinExhaustion.ts";

async function bodyOf(response: Response | null): Promise<Record<string, unknown>> {
  assert.ok(response, "a response is expected");
  return (await response.json()) as Record<string, unknown>;
}

test("a status that arrived is left to the caller", () => {
  assert.equal(roundRobinExhaustedResponse([], 0, 429), null);
});

test("no attempt and no quota exclusion still names the skipped pre-dispatch filters", async () => {
  const response = roundRobinExhaustedResponse([{ executionKey: "k1", modelStr: "m1" }], 0, null);

  assert.equal(response?.status, 503);
  const body = await bodyOf(response);
  const message = String((body.error as Record<string, unknown> | undefined)?.message ?? "");
  assert.match(message, /all targets were skipped by pre-dispatch filters/);
});

test("an attempt that produced nothing reports the inactive accounts", async () => {
  const response = roundRobinExhaustedResponse([], 2, null);

  assert.equal(response?.status, 503);
  const body = await bodyOf(response);
  const error = body.error as Record<string, unknown> | undefined;
  assert.equal(error?.code, "ALL_ACCOUNTS_INACTIVE");
});
