import assert from "node:assert/strict";
import test from "node:test";
import { getModelInfoCore } from "../../open-sse/services/model.ts";

for (const provider of ["ollama-cloud", "ollamacloud"]) {
  for (const target of [`${provider}/gpt-oss:120b`, { provider, model: "gpt-oss:120b" }]) {
    test(`local ${typeof target} alias preserves native ID for ${provider}`, async () => {
      const result = await getModelInfoCore("native-ollama", { "native-ollama": target });
      assert.equal(result.provider, "ollama-cloud");
      assert.equal(result.model, "gpt-oss:120b");
    });
  }
}

test("local object alias still normalizes NVIDIA's foreign dialect", async () => {
  const result = await getModelInfoCore("nvidia-compat", {
    "nvidia-compat": { provider: "nvidia", model: "gpt-oss:120b" },
  });
  assert.equal(result.provider, "nvidia");
  assert.equal(result.model, "openai/gpt-oss-120b");
});
