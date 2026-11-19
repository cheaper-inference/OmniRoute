import assert from "node:assert/strict";
import test from "node:test";
import { repairClaudeFinalWireUsage } from "../../open-sse/utils/streamUsageMerge.ts";

test("a long text stream only requests accounting for its terminal message delta", () => {
  let reads = 0;
  const receipt = () => {
    reads++;
    return { completion_tokens: 12 };
  };
  for (let i = 0; i < 10000; i++) {
    assert.equal(repairClaudeFinalWireUsage({ type: "content_block_delta" }, receipt), false);
  }
  assert.equal(reads, 0);
  const final = { type: "message_delta", usage: { output_tokens: 0 } };
  assert.equal(repairClaudeFinalWireUsage(final, receipt), true);
  assert.equal(final.usage.output_tokens, 12);
  assert.equal(reads, 1);
});
