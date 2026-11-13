// The OpenCode Zen and OpenCode server registries list Muse Spark models. Muse Spark takes image
// input (OpenCode's own catalog on models.dev lists it, and the opencode-go rows already set
// supportsVision). Without the flag the models read as text-only to combos and /v1/models.
import test from "node:test";
import assert from "node:assert/strict";
import { getResolvedModelCapabilities } from "../../src/lib/modelCapabilities.ts";

const CASES: Array<[string, string]> = [
  ["opencode-zen", "muse-spark-1.2"],
  ["opencode-zen", "muse-spark-1.2-contributor-free"],
  ["opencode-zen", "muse-spark-1.3"],
  ["opencode-zen", "muse-spark-1.3-contributor-free"],
  ["opencode-server", "muse-spark-1.3-contributor-free"],
];

for (const [provider, model] of CASES) {
  test(`${provider}/${model} declares vision input`, () => {
    assert.equal(getResolvedModelCapabilities({ provider, model }).supportsVision, true);
  });
}

test("a text-only OpenCode Zen model is not marked as vision", () => {
  assert.notEqual(
    getResolvedModelCapabilities({ provider: "opencode-zen", model: "big-pickle" }).supportsVision,
    true
  );
});
