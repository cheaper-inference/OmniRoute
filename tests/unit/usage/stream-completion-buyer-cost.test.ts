import test from "node:test";
import assert from "node:assert/strict";
import { withBuyerCostMicro } from "../../../open-sse/utils/streamCompletePayload.ts";

test("disabled completion logging does not read buyer cost", () => {
  assert.equal(
    withBuyerCostMicro(null, () => {
      throw new Error("unexpected read");
    }),
    null
  );
});

test("completion reads the latest cost and preserves the rest of the payload", () => {
  let cost: number | null = null;
  const seen: unknown[] = [];
  const callback = withBuyerCostMicro(
    (payload) => seen.push(payload),
    () => cost
  );
  const payload = { status: 200, usage: { output_tokens: 3 } };
  callback!(payload);
  cost = 0;
  callback!(payload);
  cost = 17;
  callback!(payload);
  assert.deepEqual(
    seen,
    [null, 0, 17].map((buyerCostMicro) => ({ ...payload, buyerCostMicro }))
  );
  assert.deepEqual(payload, { status: 200, usage: { output_tokens: 3 } });
});
