import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, it } from "node:test";

// OpenCode 1.x reads reasoning levels from `variants: { <level>: { reasoningEffort } }`.
// The generator wrote models without them although the catalog row carries
// `capabilities.effort_tiers`.
describe("opencode config generator — reasoning variants from effort_tiers", () => {
  const originalFetch = globalThis.fetch;
  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  function stubCatalog(models: unknown[]) {
    globalThis.fetch = (async () =>
      new Response(JSON.stringify({ object: "list", data: models }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })) as typeof fetch;
  }

  async function generate(existing?: string) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "opencode-variants-"));
    const configPath = path.join(dir, "opencode.json");
    if (existing) fs.writeFileSync(configPath, existing);
    const { generateOpencodeConfig } =
      await import("../../src/lib/cli-helper/config-generator/opencode.ts");
    const out = await generateOpencodeConfig({
      baseUrl: "http://localhost:20128",
      apiKey: "sk-test",
      configPath,
    });
    fs.rmSync(dir, { recursive: true, force: true });
    return JSON.parse(out);
  }

  const tiers = ["low", "medium", "high", "xhigh", "max"];

  it("writes variants in tier order from capabilities.effort_tiers", async () => {
    stubCatalog([
      {
        id: "cc/claude-opus-5-5",
        owned_by: "cc",
        capabilities: { reasoning: true, effort_tiers: tiers },
      },
    ]);
    const cfg = await generate();
    const entry = cfg.provider.omniroute.models["cc/claude-opus-5-5"];
    assert.deepEqual(Object.keys(entry.variants), tiers);
    for (const level of tiers) assert.deepEqual(entry.variants[level], { reasoningEffort: level });
  });

  it("skips the `none` tier and writes nothing when no tiers remain or none exist", async () => {
    stubCatalog([
      { id: "a/with-none", capabilities: { effort_tiers: ["none", "low", "high"] } },
      { id: "a/only-none", capabilities: { effort_tiers: ["none"] } },
      { id: "a/no-tiers", capabilities: { reasoning: true } },
    ]);
    const cfg = await generate();
    const models = cfg.provider.omniroute.models;
    assert.deepEqual(Object.keys(models["a/with-none"].variants), ["low", "high"]);
    assert.equal("variants" in models["a/only-none"], false);
    assert.equal("variants" in models["a/no-tiers"], false);
  });

  it("keeps the user's existing variants untouched", async () => {
    stubCatalog([
      { id: "cc/claude-opus-5-5", capabilities: { reasoning: true, effort_tiers: tiers } },
    ]);
    const userVariants = { turbo: { reasoningEffort: "high", textVerbosity: "low" } };
    const existing = JSON.stringify({
      provider: { omniroute: { models: { "cc/claude-opus-5-5": { variants: userVariants } } } },
    });
    const cfg = await generate(existing);
    assert.deepEqual(cfg.provider.omniroute.models["cc/claude-opus-5-5"].variants, userVariants);
  });
});
