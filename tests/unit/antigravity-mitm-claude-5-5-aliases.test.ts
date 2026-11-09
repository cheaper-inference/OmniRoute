// The Antigravity MITM card renders one mapping row per `CLI_TOOLS.antigravity.defaultModels`
// entry, and `src/mitm/_internal/standaloneRouting.cjs` resolves an override by EXACT source
// model key (or "*"). Before this change the tool listed only Gemini, Claude 4.6 and GPT-OSS,
// so the IDE's Claude Sonnet 5.5 / Opus 5.5 requests had no mapping row and went to
// PASSTHROUGH ("model has no MITM alias mapping").
//
// Antigravity serves Claude 5.5 with one upstream id PER TIER (`claude-opus-5-5-low|medium|high`,
// same for Sonnet) and no bare `claude-opus-5-5` (see open-sse/utils/antigravityLiteralModelIds.ts),
// so the MITM exposes exactly the six tiered ids.
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

import { CLI_TOOLS } from "../../src/shared/constants/cliTools.ts";
import { isAntigravityLiteralTierModelId } from "../../open-sse/utils/antigravityLiteralModelIds.ts";

const require = createRequire(import.meta.url);
const routing = require("../../src/mitm/_internal/standaloneRouting.cjs");
const aliasConfigShim = require("../../src/mitm/_internal/aliasConfig.cjs");

const CLAUDE_5_5_TIER_IDS = [
  "claude-sonnet-5-5-low",
  "claude-sonnet-5-5-medium",
  "claude-sonnet-5-5-high",
  "claude-opus-5-5-low",
  "claude-opus-5-5-medium",
  "claude-opus-5-5-high",
] as const;

const antigravity = CLI_TOOLS.antigravity;

test("Antigravity MITM exposes the Claude 5.5 tier ids as mappable aliases", () => {
  const aliases = new Set(antigravity.modelAliases);
  const defaultIds = new Set(antigravity.defaultModels.map((model) => model.id));

  for (const id of CLAUDE_5_5_TIER_IDS) {
    assert.equal(aliases.has(id), true, `${id} missing from modelAliases`);
    assert.equal(defaultIds.has(id), true, `${id} missing from defaultModels (no mapping row)`);
    // Every exposed id must be one Antigravity actually serves literally.
    assert.equal(isAntigravityLiteralTierModelId("antigravity", id), true, id);
  }
});

test("Antigravity MITM does not expose bare Claude 5.5 ids the backend never serves", () => {
  for (const bare of ["claude-sonnet-5-5", "claude-opus-5-5"]) {
    assert.equal(antigravity.modelAliases.includes(bare), false, `${bare} in modelAliases`);
    assert.equal(
      antigravity.defaultModels.some((model) => model.id === bare),
      false,
      `${bare} in defaultModels`
    );
  }
});

test("Antigravity MITM keeps the Claude 4.6 rows next to Claude 5.5", () => {
  for (const id of ["claude-sonnet-4-6", "claude-opus-4-6-thinking"]) {
    assert.equal(antigravity.modelAliases.includes(id), true, `${id} missing from modelAliases`);
    assert.equal(
      antigravity.defaultModels.some((model) => model.id === id),
      true,
      `${id} missing from defaultModels`
    );
  }
});

test("Antigravity MITM defaultModels and modelAliases stay in sync", () => {
  const aliases = new Set(antigravity.modelAliases);
  for (const model of antigravity.defaultModels) {
    assert.equal(model.alias, model.id, `${model.id} alias must equal its id`);
    assert.equal(aliases.has(model.alias), true, `${model.alias} missing from modelAliases`);
    assert.ok(model.name.trim().length > 0, `${model.id} needs a display name`);
  }
  assert.equal(aliases.size, antigravity.modelAliases.length, "modelAliases has duplicates");
  assert.equal(
    new Set(antigravity.defaultModels.map((model) => model.id)).size,
    antigravity.defaultModels.length,
    "defaultModels has duplicates"
  );
});

test("standalone MITM resolves a stored Claude 5.5 tier mapping by exact key", () => {
  const rows: Record<string, string> = {
    antigravity: JSON.stringify({
      "claude-opus-5-5-high": { model: "anthropic/claude-opus-5-5", reasoningEffort: "high" },
      "claude-sonnet-5-5-low": "antigravity/claude-sonnet-5-5-low",
    }),
  };
  const db = {
    prepare(sql: string) {
      assert.equal(sql, "SELECT value FROM key_value WHERE namespace = 'mitmAlias' AND key = ?");
      return {
        get(key: string) {
          return rows[key] ? { value: rows[key] } : undefined;
        },
      };
    },
  };
  const deps = {
    fs: { existsSync: () => false },
    dbFile: "/unused/db.json",
    getSqliteDb: () => db,
    aliasConfigShim,
  };

  assert.deepEqual(routing.resolveMappedOverride("claude-opus-5-5-high", "antigravity", deps), {
    model: "anthropic/claude-opus-5-5",
    reasoningEffort: "high",
  });
  assert.deepEqual(routing.resolveMappedOverride("claude-sonnet-5-5-low", "antigravity", deps), {
    model: "antigravity/claude-sonnet-5-5-low",
  });
  // No fuzzy matching: an unmapped sibling tier stays unmapped (-> passthrough).
  assert.equal(routing.resolveMappedOverride("claude-opus-5-5-low", "antigravity", deps), null);
});
