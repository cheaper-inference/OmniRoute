import assert from "node:assert/strict";
import test from "node:test";
import {
  orderCapabilityTargets,
  resetCapabilityTargetOrderForTests,
} from "../../open-sse/services/combo/capabilityTargetOrder.ts";

const targets = [
  { modelStr: "music/a", weight: 10 },
  { modelStr: "music/b", weight: 90 },
];

test.beforeEach(resetCapabilityTargetOrderForTests);

test("round-robin rotates independently per capability", () => {
  const next = (endpoint: "music" | "images") =>
    orderCapabilityTargets({ comboName: "media", endpoint, strategy: "round-robin", targets })[0]
      .modelStr;
  assert.equal(next("music"), "music/a");
  assert.equal(next("music"), "music/b");
  assert.equal(next("images"), "music/a");
});

test("weighted routing places the selected target first and retains fallback", () => {
  const ordered = orderCapabilityTargets({
    comboName: "media",
    endpoint: "music",
    strategy: "weighted",
    targets,
    random: () => 0.5,
  });
  assert.deepEqual(
    ordered.map((target) => target.modelStr),
    ["music/b", "music/a"]
  );
});
