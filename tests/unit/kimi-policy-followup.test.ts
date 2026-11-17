import assert from "node:assert/strict";
import test from "node:test";
import {
  collectHealthRows,
  type HealthContext,
} from "../../src/app/api/v1/models/health/healthUniverse.ts";
import { modelPatternMatches } from "../../src/domain/modelPermissions.ts";
import {
  evaluateModelAccess,
  type ModelAccessLookups,
} from "../../src/domain/modelAccessPolicy.ts";

function healthContext(provider: string, blocked: string[]): HealthContext {
  const connection = { id: "native", provider: "kimi" };
  return {
    aliasToProviderId: { kimi: "kimi", moonshot: "kimi", openrouter: "openrouter" },
    providerIdToAlias: { kimi: "kimi", openrouter: "openrouter" },
    blockedProviders: new Set(blocked),
    connections: [connection],
    activeAliases: new Set([provider, "kimi", "openrouter"]),
    includeAlias: true,
    providerModels: { [provider]: [{ id: "static" }] },
    synced: { [provider]: [{ id: "synced" }] },
    customMap: { [provider]: [{ id: "custom" }] },
    aliasBacked: [
      { providerKey: provider, modelId: "alias" },
      { providerKey: "openrouter", modelId: "moonshot/foreign" },
    ],
    modalities: [{ id: provider + "/embedding", provider, rawModel: "embedding" }],
    emitsCanonicalFor: () => true,
    connsFor: () => [connection],
  };
}
for (const provider of ["kimi", "moonshot"])
  for (const blocked of ["kimi", "moonshot"])
    test(
      "health excludes every native source under stored block " +
        blocked +
        " with source " +
        provider,
      () => {
        const unblocked = collectHealthRows(healthContext(provider, []));
        for (const root of ["static", "synced", "custom", "alias", "embedding"])
          assert.ok(
            unblocked.some((row) => row.root === root),
            root
          );
        assert.deepEqual(
          collectHealthRows(healthContext(provider, [blocked])).map((row) => row.id),
          ["openrouter/moonshot/foreign"]
        );
      }
    );
for (const candidate of ["kimi/kimi-k3", "moonshot/kimi-k3"])
  test("wildcards retain equivalent leading native prefixes for " + candidate, async () => {
    for (const pattern of ["moon*/kimi-k3", "ki*/kimi-k3", "*/kimi-k*", "moonshot/*", "kimi/*"])
      assert.equal(modelPatternMatches(pattern, [candidate]), true, pattern);
    const lookups: ModelAccessLookups = {
      getCandidates: async (id) => [id],
      resolveAlias: (id) => id,
      getPublishedTarget: async () => {
        throw new Error("deny must precede publication lookup");
      },
      findPublishedModel: async () => null,
      isPublishedModelHidden: () => false,
      checkGroupAccess: () => ({ allowed: true }),
      isDeniedUnderCanonicalProvider: async () => false,
    };
    assert.deepEqual(
      await evaluateModelAccess(
        {
          modelAccessMode: "restricted",
          allowedModels: ["kimi/*"],
          blockedModels: ["moon*/kimi-k3"],
          disableNonPublicModels: true,
        },
        { modelId: candidate },
        lookups
      ),
      { allowed: false, reason: "blocked" }
    );
  });
test("native alias candidates preserve nested providers, slash segments and opaque wires", () => {
  for (const candidate of [
    "openrouter/moonshot/kimi-k3",
    "kimi-coding/kimi-k3",
    "MOONSHOT/kimi-k3",
  ])
    assert.equal(modelPatternMatches("moon*/kimi-k3", [candidate]), false, candidate);
  assert.equal(modelPatternMatches("moon*/kimi-k3", ["kimi/family/kimi-k3"]), false);
  assert.equal(modelPatternMatches("openrouter/moonshot/*", ["openrouter/kimi/custom"]), false);
  assert.equal(modelPatternMatches("cline/*", ["cline/openrouter/deepseek/model"]), false);
  assert.equal(modelPatternMatches("cline/*", ["cline/deepseek/model"]), true);
});
