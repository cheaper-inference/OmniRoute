import { describe, it, afterEach, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-meta-"));
process.env.DATA_DIR = TEST_DATA_DIR;

import type { CodexCatalogEntry } from "../../src/lib/cliTools/codexModelCatalog.ts";

const core = await import("../../src/lib/db/core.ts");
const { buildCodexModelCatalog } = await import("../../src/lib/cliTools/codexModelCatalog.ts");
const { listOmniRouteChatModels } =
  await import("../../src/lib/cliTools/codexModelCatalogWriter.ts");
after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const FLAG = "OMNIROUTE_CODEX_CATALOG_METADATA";
const originalFlag = process.env[FLAG];
afterEach(() => {
  if (originalFlag === undefined) delete process.env[FLAG];
  else process.env[FLAG] = originalFlag;
});

const entry = (slug: string, overrides: Record<string, unknown> = {}): CodexCatalogEntry => ({
  slug,
  display_name: slug,
  description: `${slug} description`,
  default_reasoning_level: "medium",
  supported_reasoning_levels: [
    { effort: "low", description: "Fast" },
    { effort: "medium", description: "Balanced" },
    { effort: "high", description: "Deep" },
  ],
  input_modalities: ["text", "image"],
  support_verbosity: true,
  shell_type: "unified_exec",
  truncation_policy: { mode: "tokens", limit: 10000 },
  priority: 1,
  visibility: "list",
  supported_in_api: true,
  experimental_supported_tools: [],
  base_instructions: `instructions for ${slug}`,
  context_window: 272000,
  max_context_window: 872000,
  ...overrides,
});
const bundled = { models: [entry("gpt-5.5")] };
const bySlug = (catalog: { models: CodexCatalogEntry[] }, slug: string) =>
  catalog.models.find((m) => m.slug === slug) as CodexCatalogEntry;

const routed = [
  {
    id: "kr/text-only",
    context_length: 64000,
    capabilities: { effort_tiers: ["low", "high"] },
    input_modalities: ["text"],
  },
  { id: "kr/no-meta", context_length: 64000 },
];

describe("Codex catalog model metadata (opt-in)", () => {
  it("default: unmatched slugs keep the inherited template efforts and modalities", () => {
    const entryFor = bySlug(buildCodexModelCatalog(bundled, routed), "kr/text-only");
    assert.deepEqual(
      (entryFor.supported_reasoning_levels as { effort: string }[]).map((l) => l.effort),
      ["low", "medium", "high"]
    );
    assert.deepEqual(entryFor.input_modalities, ["text", "image"]);
  });

  it("flag on: efforts and modalities come from the routed model, scaffolding is kept", () => {
    process.env[FLAG] = "1";
    const catalog = buildCodexModelCatalog(bundled, routed);
    const entryFor = bySlug(catalog, "kr/text-only");
    assert.deepEqual(
      (entryFor.supported_reasoning_levels as { effort: string }[]).map((l) => l.effort),
      ["low", "high"]
    );
    assert.equal(
      entryFor.default_reasoning_level,
      "low",
      "default must be one of the offered levels"
    );
    assert.deepEqual(entryFor.input_modalities, ["text"]);
    assert.equal(entryFor.base_instructions, "instructions for gpt-5.5");
    assert.equal(entryFor.shell_type, "unified_exec");
  });

  it("flag on: a model with no metadata keeps the inherited values", () => {
    process.env[FLAG] = "1";
    const entryFor = bySlug(buildCodexModelCatalog(bundled, routed), "kr/no-meta");
    assert.equal((entryFor.supported_reasoning_levels as unknown[]).length, 3);
    assert.deepEqual(entryFor.input_modalities, ["text", "image"]);
  });

  it("flag on: a bundled-slug match keeps Codex's own metadata", () => {
    process.env[FLAG] = "1";
    const catalog = buildCodexModelCatalog(bundled, [
      { id: "cx/gpt-5.5", capabilities: { effort_tiers: ["low"] }, input_modalities: ["text"] },
    ]);
    const entryFor = bySlug(catalog, "cx/gpt-5.5");
    assert.equal((entryFor.supported_reasoning_levels as unknown[]).length, 3);
    assert.deepEqual(entryFor.input_modalities, ["text", "image"]);
  });

  it("flag on: unknown effort values and empty lists are ignored", () => {
    process.env[FLAG] = "1";
    const catalog = buildCodexModelCatalog(bundled, [
      { id: "kr/odd", capabilities: { effort_tiers: ["bogus"] }, input_modalities: [] },
    ]);
    const entryFor = bySlug(catalog, "kr/odd");
    assert.equal((entryFor.supported_reasoning_levels as unknown[]).length, 3);
    assert.deepEqual(entryFor.input_modalities, ["text", "image"]);
  });

  it("the listing keeps effort tiers and input modalities from the unified catalog", async () => {
    const providers = await import("../../src/lib/db/providers.ts");
    await providers.createProviderConnection({
      provider: "claude",
      authType: "apikey",
      name: "claude-metadata-test",
      apiKey: "test-key",
      isActive: true,
      testStatus: "active",
      providerSpecificData: {},
    });
    const listed = await listOmniRouteChatModels(
      new Request("http://localhost/api/cli-tools/codex-settings")
    );
    const opus = listed.find((m) => typeof m === "object" && m?.id === "cc/claude-opus-4-6") as {
      capabilities?: { effort_tiers?: string[] };
      input_modalities?: string[];
    };
    assert.ok(opus, "cc/claude-opus-4-6 must be listed");
    assert.deepEqual(opus.capabilities?.effort_tiers, ["low", "medium", "high", "max"]);
    assert.deepEqual(opus.input_modalities, ["text", "image"]);
  });
});
