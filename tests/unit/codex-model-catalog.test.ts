import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  buildCodexModelCatalog,
  MAX_LISTED_CATALOG_MODELS,
  type CodexCatalogEntry,
  type CodexModelCatalog,
} from "../../src/lib/cliTools/codexModelCatalog.ts";

// Minimal stand-ins for `codex debug models --bundled` entries; real ones carry ~60 KB of
// instructions, which is exactly why the builder clones instead of synthesizing.
const entry = (slug: string, overrides: Record<string, unknown> = {}): CodexCatalogEntry => ({
  slug,
  display_name: slug.toUpperCase(),
  description: `${slug} description`,
  supported_reasoning_levels: [{ effort: "medium", description: "Balanced" }],
  support_verbosity: true,
  shell_type: "unified_exec",
  truncation_policy: { mode: "tokens", limit: 10000 },
  priority: 1,
  visibility: "list",
  supported_in_api: true,
  experimental_supported_tools: [],
  base_instructions: `instructions for ${slug}`,
  model_messages: { instructions_template: `template for ${slug}` },
  service_tiers: [{ id: "priority", name: "Fast" }],
  additional_speed_tiers: ["fast"],
  availability_nux: null,
  upgrade: null,
  context_window: 272000,
  max_context_window: 872000,
  ...overrides,
});

// Code-mode flags carried by gpt-6-astra / gpt-5.6-* in the real bundled catalog
const codeMode = {
  tool_mode: "code_mode_only",
  use_responses_lite: true,
  multi_agent_version: "v2",
};

const bundled: CodexModelCatalog = {
  models: [
    entry("gpt-5.6-sol", { priority: 6, ...codeMode }),
    entry("gpt-6-astra", {
      priority: 1,
      ...codeMode,
      multi_agent_reasoning_effort: "xhigh",
      experimental_supported_tools: ["send_user_message_async", "clock"],
    }),
    entry("gpt-5.6-terra", { priority: 7, ...codeMode }),
    entry("gpt-5.5", { priority: 12 }),
    entry("gpt-hidden-first", { priority: 0, visibility: "hide" }),
    entry("gpt-5.4", {
      priority: 16,
      visibility: "hide",
      upgrade: {
        model: "gpt-5.6-terra",
        migration_markdown: "retired",
        retirement_at: "2026-08-31T19:00:00Z",
      },
    }),
    entry("codex-auto-review", { priority: 43, visibility: "hide" }),
  ],
};

const withoutGpt55 = () => bundled.models.filter((m) => m.slug !== "gpt-5.5");
const listed = (catalog: CodexModelCatalog) =>
  catalog.models.filter((m) => m.visibility === "list");
const bySlug = (catalog: CodexModelCatalog, slug: string) => {
  const found = catalog.models.find((m) => m.slug === slug);
  assert.ok(found, `expected ${slug} in catalog`);
  return found;
};
const pick = (obj: Record<string, unknown>, keys: string[]) =>
  Object.fromEntries(keys.map((k) => [k, obj[k]]));

describe("buildCodexModelCatalog", () => {
  it("clones the bundled entry matching the part after the last slash", () => {
    const catalog = buildCodexModelCatalog(bundled, ["mirbud/gpt-5.6-terra", "a/b/gpt-5.6-sol"]);
    const terra = bySlug(catalog, "mirbud/gpt-5.6-terra");
    assert.equal(terra.base_instructions, "instructions for gpt-5.6-terra");
    assert.deepEqual(terra.model_messages, { instructions_template: "template for gpt-5.6-terra" });
    assert.equal(terra.display_name, "mirbud/gpt-5.6-terra");
    assert.equal(terra.description, "mirbud/gpt-5.6-terra via OmniRoute");
    assert.equal(terra.visibility, "list");
    // Matched templates keep Codex's own tiers and window for that model
    assert.deepEqual(terra.service_tiers, [{ id: "priority", name: "Fast" }]);
    assert.equal(terra.context_window, 272000);
    assert.equal(
      bySlug(catalog, "a/b/gpt-5.6-sol").base_instructions,
      "instructions for gpt-5.6-sol"
    );
  });

  it("falls back to bundled gpt-5.5 for unknown models", () => {
    const catalog = buildCodexModelCatalog(bundled, ["cc/claude-opus", "Opus_like"]);
    for (const slug of ["cc/claude-opus", "Opus_like"]) {
      const clone = bySlug(catalog, slug);
      assert.equal(clone.base_instructions, "instructions for gpt-5.5");
      assert.deepEqual(clone.service_tiers, []);
      assert.deepEqual(clone.additional_speed_tiers, []);
      assert.match(String(clone.description), /via OmniRoute \(Codex profile: gpt-5\.5\)$/);
    }
  });

  it("without gpt-5.5, falls back to the lowest-priority plain listed entry", () => {
    const models = [
      ...withoutGpt55(),
      entry("gpt-plain-late", { priority: 30 }),
      entry("gpt-plain-early", { priority: 20 }),
      entry("gpt-plain-hidden", { priority: 2, visibility: "hide" }),
    ];
    const clone = bySlug(buildCodexModelCatalog({ models }, ["cc/claude-opus"]), "cc/claude-opus");
    assert.equal(clone.base_instructions, "instructions for gpt-plain-early");
  });

  it("with only code-mode entries, falls back to the lowest-priority listed entry", () => {
    const clone = bySlug(
      buildCodexModelCatalog({ models: withoutGpt55() }, ["cc/claude-opus"]),
      "cc/claude-opus"
    );
    // gpt-hidden-first has priority 0 but is hidden, so astra wins
    assert.equal(clone.base_instructions, "instructions for gpt-6-astra");
  });

  it("neutralizes code-mode flags for non-Codex providers and combos", () => {
    const ids = ["kr/gpt-5.6-terra", "mirbud/gpt-6-astra", "Opus_like", "cc/claude-opus"];
    const catalog = buildCodexModelCatalog({ models: withoutGpt55() }, ids);
    for (const slug of ids) {
      assert.deepEqual(
        pick(bySlug(catalog, slug), [
          "tool_mode",
          "use_responses_lite",
          "multi_agent_version",
          "multi_agent_reasoning_effort",
          "experimental_supported_tools",
        ]),
        {
          tool_mode: null,
          use_responses_lite: false,
          multi_agent_version: null,
          multi_agent_reasoning_effort: null,
          experimental_supported_tools: [],
        },
        slug
      );
    }
    // Instructions still come from the matched template
    assert.equal(
      bySlug(catalog, "kr/gpt-5.6-terra").base_instructions,
      "instructions for gpt-5.6-terra"
    );
  });

  it("keeps Codex values for Codex-provider entries (id and registry alias)", () => {
    const catalog = buildCodexModelCatalog(bundled, ["cx/gpt-6-astra", "codex/gpt-5.6-terra"]);
    assert.deepEqual(
      pick(bySlug(catalog, "cx/gpt-6-astra"), [
        "tool_mode",
        "use_responses_lite",
        "multi_agent_version",
        "multi_agent_reasoning_effort",
        "experimental_supported_tools",
      ]),
      {
        ...codeMode,
        multi_agent_reasoning_effort: "xhigh",
        experimental_supported_tools: ["send_user_message_async", "clock"],
      }
    );
    assert.deepEqual(pick(bySlug(catalog, "codex/gpt-5.6-terra"), Object.keys(codeMode)), codeMode);
    // Hidden bundled originals are never neutralized
    assert.deepEqual(pick(bySlug(catalog, "gpt-5.6-sol"), Object.keys(codeMode)), codeMode);
  });

  it("uses the OmniRoute context length only for default-template clones", () => {
    const catalog = buildCodexModelCatalog(bundled, [
      { id: "cc/claude-opus", context_length: 200000 },
      { id: "cx/gpt-5.6-terra", context_length: 128000 },
      { id: "kr/unknown" },
      { id: "kr/bogus-window", context_length: -1 },
    ]);
    const windowOf = (slug: string) =>
      pick(bySlug(catalog, slug), ["context_window", "max_context_window"]);
    assert.deepEqual(windowOf("cc/claude-opus"), {
      context_window: 200000,
      max_context_window: 200000,
    });
    assert.deepEqual(windowOf("cx/gpt-5.6-terra"), {
      context_window: 272000,
      max_context_window: 872000,
    });
    assert.deepEqual(windowOf("kr/unknown"), {
      context_window: 272000,
      max_context_window: 872000,
    });
    assert.deepEqual(windowOf("kr/bogus-window"), {
      context_window: 272000,
      max_context_window: 872000,
    });
  });

  it("clears inherited upgrade prompts on OmniRoute entries only", () => {
    const catalog = buildCodexModelCatalog(bundled, ["mirbud/gpt-5.4"]);
    const clone = bySlug(catalog, "mirbud/gpt-5.4");
    assert.equal(clone.base_instructions, "instructions for gpt-5.4");
    assert.equal(clone.upgrade, null);
    assert.equal(clone.availability_nux, null);
    assert.equal((bySlug(catalog, "gpt-5.4").upgrade as { model: string }).model, "gpt-5.6-terra");
  });

  it("keeps every bundled entry but hides it from the picker", () => {
    const catalog = buildCodexModelCatalog(bundled, ["cx/gpt-5.6-terra"]);
    assert.deepEqual(
      listed(catalog).map((m) => m.slug),
      ["cx/gpt-5.6-terra"]
    );
    for (const original of bundled.models) {
      const kept = bySlug(catalog, original.slug);
      assert.equal(kept.visibility, "hide");
      assert.equal(kept.base_instructions, original.base_instructions);
    }
    // Input catalog is not mutated
    assert.equal(bundled.models.find((m) => m.slug === "gpt-6-astra")?.visibility, "list");
  });

  it("lets an OmniRoute id win over a bundled slug without duplicating it", () => {
    const catalog = buildCodexModelCatalog(bundled, ["gpt-5.6-terra", "gpt-5.6-terra"]);
    const matches = catalog.models.filter((m) => m.slug === "gpt-5.6-terra");
    assert.equal(matches.length, 1);
    assert.deepEqual(pick(matches[0], ["visibility", "priority", "display_name"]), {
      visibility: "list",
      priority: 1,
      display_name: "gpt-5.6-terra",
    });
    const slugs = catalog.models.map((m) => m.slug);
    assert.equal(new Set(slugs).size, slugs.length);
  });

  it("orders OmniRoute entries by input order ahead of hidden bundled entries", () => {
    const ids = ["Opus_like", "cx/gpt-5.6-terra", "cc/claude-opus"];
    const catalog = buildCodexModelCatalog(bundled, ids);
    assert.deepEqual(
      listed(catalog).map((m) => [m.slug, m.priority]),
      [
        ["Opus_like", 1],
        ["cx/gpt-5.6-terra", 2],
        ["cc/claude-opus", 3],
      ]
    );
    const hiddenPriorities = catalog.models
      .filter((m) => m.visibility === "hide")
      .map((m) => Number(m.priority));
    assert.ok(Math.min(...hiddenPriorities) > ids.length);
  });

  it("preserves the fields Codex requires to parse an entry", () => {
    const required = [
      "slug",
      "display_name",
      "supported_reasoning_levels",
      "support_verbosity",
      "shell_type",
      "truncation_policy",
      "priority",
      "visibility",
      "supported_in_api",
      "experimental_supported_tools",
    ];
    const catalog = buildCodexModelCatalog(bundled, ["cx/gpt-5.6-terra", "cc/claude-opus"]);
    for (const model of catalog.models) {
      for (const key of required) assert.ok(key in model, `${model.slug} is missing ${key}`);
      const messages = model.model_messages as { instructions_template?: string } | undefined;
      assert.ok(model.base_instructions || messages?.instructions_template);
    }
  });

  it("caps the listed block so the catalog file stays bounded", () => {
    const ids = Array.from({ length: MAX_LISTED_CATALOG_MODELS + 25 }, (_, i) => `kr/m-${i}`);
    const catalog = buildCodexModelCatalog(bundled, ids);
    const listedSlugs = listed(catalog).map((m) => m.slug);
    assert.equal(listedSlugs.length, MAX_LISTED_CATALOG_MODELS);
    assert.equal(listedSlugs[0], "kr/m-0");
    assert.equal(listedSlugs.at(-1), `kr/m-${MAX_LISTED_CATALOG_MODELS - 1}`);
    // Bundled entries are still all kept (hidden)
    assert.equal(catalog.models.length, MAX_LISTED_CATALOG_MODELS + bundled.models.length);
  });

  it("returns an empty catalog when there is nothing to clone from", () => {
    assert.deepEqual(buildCodexModelCatalog({ models: [] }, ["cx/gpt-5.6-terra"]), { models: [] });
    assert.deepEqual(buildCodexModelCatalog(null, ["cx/gpt-5.6-terra"]), { models: [] });
    assert.deepEqual(
      listed(buildCodexModelCatalog(bundled, [" ", null, 42 as unknown as string, { id: 7 }])),
      []
    );
  });
});
