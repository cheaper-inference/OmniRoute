import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { ModelAccessLookups, ModelAccessPolicy } from "../../src/domain/modelAccessPolicy.ts";

const previousDataDir = process.env.DATA_DIR;
const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-access-policy-"));
const sqlitePath = path.join(dataDir, "storage.sqlite");
process.env.DATA_DIR = dataDir;

let evaluateModelAccess: typeof import("../../src/domain/modelAccessPolicy.ts").evaluateModelAccess;

test.before(async () => {
  ({ evaluateModelAccess } = await import("../../src/domain/modelAccessPolicy.ts"));
});

test.after(async () => {
  const initializedSqlite = fs.existsSync(sqlitePath);
  try {
    if (initializedSqlite) {
      // Close a leaked handle before cleanup if a future import adds a DB dependency.
      const { resetDbInstance } = await import("../../src/lib/db/core.ts");
      resetDbInstance();
    }
  } finally {
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true });
  }
  assert.equal(initializedSqlite, false, "domain evaluation must not initialize storage.sqlite");
});

function lookups(overrides: Partial<ModelAccessLookups> = {}): ModelAccessLookups {
  return {
    getCandidates: async (modelId) => [modelId],
    resolveAlias: (modelId) => modelId,
    getPublishedTarget: async () => null,
    findPublishedModel: async () => null,
    isPublishedModelHidden: () => false,
    checkGroupAccess: () => ({ allowed: true }),
    isDeniedUnderCanonicalProvider: async () => false,
    ...overrides,
  };
}

function unexpectedRead(): never {
  throw new Error("this decision must not read a later authorization source");
}

const noPublicationOrGroupReads: Partial<ModelAccessLookups> = {
  resolveAlias: unexpectedRead,
  getPublishedTarget: unexpectedRead,
  findPublishedModel: unexpectedRead,
  isPublishedModelHidden: unexpectedRead,
  checkGroupAccess: unexpectedRead,
  isDeniedUnderCanonicalProvider: unexpectedRead,
};

function restricted(overrides: Partial<ModelAccessPolicy> = {}): ModelAccessPolicy {
  return {
    id: "test-key",
    modelAccessMode: "restricted",
    allowedModels: ["openai/*"],
    ...overrides,
  };
}

test("import and synthetic evaluation do not initialize SQLite", async () => {
  assert.equal(fs.existsSync(sqlitePath), false);
  const decision = await evaluateModelAccess(
    { modelAccessMode: "all" },
    { modelId: "openai/public-model" },
    lookups()
  );
  assert.deepEqual(decision, { allowed: true, reason: "permissions" });
  assert.equal(fs.existsSync(sqlitePath), false);
});

test("a blocked model wins over an explicit grant before publication or groups", async () => {
  const decision = await evaluateModelAccess(
    restricted({
      allowedModels: ["openai/private-model"],
      blockedModels: ["openai/private-model"],
      disableNonPublicModels: true,
    }),
    { modelId: "openai/private-model" },
    lookups(noPublicationOrGroupReads)
  );
  assert.deepEqual(decision, { allowed: false, reason: "blocked" });
});

test("a deny matches expanded candidates of the requested alias", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["friendly"], blockedModels: ["openai/private-model"] }),
    { modelId: "friendly", resolvedModelId: "openai/public-model" },
    lookups({
      ...noPublicationOrGroupReads,
      getCandidates: async (modelId) =>
        modelId === "friendly" ? ["friendly", "openai/private-model"] : [modelId],
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "blocked" });
});

test("a deny matches expanded candidates of the resolved target", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["friendly"], blockedModels: ["canonical/private-model"] }),
    { modelId: "friendly", resolvedModelId: "openai/private-model" },
    lookups({
      ...noPublicationOrGroupReads,
      getCandidates: async (modelId) =>
        modelId === "openai/private-model" ? [modelId, "canonical/private-model"] : [modelId],
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "blocked" });
});

test("all mode with an empty allow list remains subject to a group veto", async () => {
  const decision = await evaluateModelAccess(
    restricted({ modelAccessMode: "all", allowedModels: [] }),
    { modelId: "openai/public-model" },
    lookups({ checkGroupAccess: () => ({ allowed: false }) })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a group grant cannot widen restricted mode with an empty allow list", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: [] }),
    { modelId: "openai/public-model" },
    lookups({ isDeniedUnderCanonicalProvider: unexpectedRead })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a group veto narrows an explicit model grant", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["openai/public-model"] }),
    { modelId: "openai/public-model" },
    lookups({ checkGroupAccess: () => ({ allowed: false }) })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a policy without a key identity grants an allowed model without group reads", async () => {
  const decision = await evaluateModelAccess(
    { modelAccessMode: "restricted", allowedModels: ["openai/public-model"] },
    { modelId: "openai/public-model" },
    lookups({
      checkGroupAccess: unexpectedRead,
      isDeniedUnderCanonicalProvider: unexpectedRead,
    })
  );
  assert.deepEqual(decision, { allowed: true, reason: "permissions" });
});

test("publication restrictions reject an unknown model before checking groups", async () => {
  const decision = await evaluateModelAccess(
    restricted({ disableNonPublicModels: true }),
    { modelId: "openai/unknown-model" },
    lookups({
      isPublishedModelHidden: unexpectedRead,
      checkGroupAccess: unexpectedRead,
      isDeniedUnderCanonicalProvider: unexpectedRead,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "unpublished" });
});

test("publication restrictions reject a hidden published model before groups", async () => {
  const decision = await evaluateModelAccess(
    restricted({ disableNonPublicModels: true }),
    { modelId: "openai/private-model" },
    lookups({
      findPublishedModel: async () => ({
        providerId: "openai",
        publishedModelId: "private-model",
      }),
      isPublishedModelHidden: () => true,
      checkGroupAccess: unexpectedRead,
      isDeniedUnderCanonicalProvider: unexpectedRead,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "hidden" });
});

test("the cc wildcard publication bypass still permits a group veto", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["cc/*"], disableNonPublicModels: true }),
    { modelId: "cc/claude-sonnet" },
    lookups({
      getPublishedTarget: unexpectedRead,
      findPublishedModel: unexpectedRead,
      isPublishedModelHidden: unexpectedRead,
      checkGroupAccess: () => ({ allowed: false }),
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("an effort variant is denied when its published base model is blocked", async () => {
  const decision = await evaluateModelAccess(
    restricted({
      allowedModels: ["cx/*"],
      blockedModels: ["codex/base-model"],
      disableNonPublicModels: true,
    }),
    { modelId: "cx/base-model-high" },
    lookups({
      getPublishedTarget: async () => ({ providerId: "codex", modelId: "base-model-high" }),
      findPublishedModel: async () => ({
        providerId: "codex",
        publishedModelId: "base-model",
      }),
      isPublishedModelHidden: unexpectedRead,
      checkGroupAccess: unexpectedRead,
      isDeniedUnderCanonicalProvider: unexpectedRead,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "blocked" });
});

test("a resolved model determines publication while the requested alias retains its grant", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["friendly"], disableNonPublicModels: true }),
    { modelId: "friendly", resolvedModelId: "oa/public-model" },
    lookups({
      resolveAlias: unexpectedRead,
      getPublishedTarget: async (modelId) => {
        assert.equal(modelId, "oa/public-model");
        return { providerId: "openai", modelId: "public-model" };
      },
      findPublishedModel: async (provider, modelId) => {
        assert.equal(provider, "openai");
        assert.equal(modelId, "public-model");
        return { providerId: "openai", publishedModelId: "public-model" };
      },
    })
  );
  assert.deepEqual(decision, { allowed: true, reason: "permissions" });
});

test("a group restriction on the resolved target narrows a requested alias grant", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["friendly"] }),
    { modelId: "friendly", resolvedModelId: "openai/private-model" },
    lookups({
      checkGroupAccess: (_keyId, modelId, provider) => ({
        allowed: !(provider === "openai" && modelId === "private-model"),
      }),
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a canonical provider group denial narrows an alias grant", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["oa/public-model"] }),
    { modelId: "oa/public-model" },
    lookups({
      isDeniedUnderCanonicalProvider: async (keyId, provider, modelId) => {
        assert.equal(keyId, "test-key");
        assert.equal(provider, "oa");
        assert.equal(modelId, "public-model");
        return true;
      },
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a fully qualified group denial applies even when the short model is granted", async () => {
  const decision = await evaluateModelAccess(
    restricted(),
    { modelId: "openai/public-model" },
    lookups({
      checkGroupAccess: (_keyId, modelId) => ({ allowed: modelId !== "openai/public-model" }),
      isDeniedUnderCanonicalProvider: unexpectedRead,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

type GroupRule = { pattern: string; access: "allow" | "deny"; provider?: string };

/** Mirrors checkKeyModelAccess: exact or `*` patterns, optional provider scope, deny first. */
function groupRules(rules: GroupRule[]): ModelAccessLookups["checkGroupAccess"] {
  return (_keyId, modelId, provider) => {
    const matches = (rule: GroupRule) =>
      (rule.pattern === "*" || rule.pattern === modelId) &&
      (!rule.provider || rule.provider === provider);
    const deniedBy = rules.find((rule) => rule.access === "deny" && matches(rule)) ?? null;
    if (deniedBy) return { allowed: false, deniedBy };
    return { allowed: rules.some((rule) => rule.access === "allow" && matches(rule)), deniedBy };
  };
}

/** An OpenAI-compatible provider node: clients send the prefix, dispatch resolves the node id. */
const NODE_PREFIX = "ev";
const NODE_PREFIX_MODEL = `${NODE_PREFIX}/evidence-model`;
const NODE_ID = "openai-compatible-chat-0f8e6b1a-4c2d-4e7f-9a3b-5d6c7e8f9a0b";
const NODE_ID_MODEL = `${NODE_ID}/evidence-model`;
const nodePrefixLookup: ModelAccessLookups["getProviderNodePrefix"] = (providerId) =>
  providerId === NODE_ID ? NODE_PREFIX : null;

test("a group allow on the provider-node prefix admits the node-id resolution (#20972)", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: [NODE_PREFIX_MODEL] }),
    { modelId: NODE_PREFIX_MODEL, resolvedModelId: NODE_ID_MODEL },
    lookups({
      checkGroupAccess: groupRules([{ pattern: NODE_PREFIX_MODEL, access: "allow" }]),
      getProviderNodePrefix: nodePrefixLookup,
    })
  );
  assert.deepEqual(decision, { allowed: true, reason: "permissions" });
});

test("a group deny on the provider-node prefix form blocks the node-id resolution", async () => {
  // A combo target reaches the group check only as the resolved node id.
  for (const modelId of [NODE_PREFIX_MODEL, "evidence-combo"]) {
    const decision = await evaluateModelAccess(
      restricted({ allowedModels: [modelId] }),
      { modelId, resolvedModelId: NODE_ID_MODEL },
      lookups({
        checkGroupAccess: groupRules([
          { pattern: "*", access: "allow" },
          { pattern: NODE_PREFIX_MODEL, access: "deny" },
        ]),
        getProviderNodePrefix: nodePrefixLookup,
      })
    );
    assert.deepEqual(decision, { allowed: false, reason: "permissions" }, modelId);
  }
});

test("a group deny on the provider-node id form blocks a prefix-admitted request", async () => {
  for (const deny of [
    { pattern: NODE_ID_MODEL, access: "deny" as const },
    { pattern: "evidence-model", access: "deny" as const, provider: NODE_ID },
  ]) {
    const decision = await evaluateModelAccess(
      restricted({ allowedModels: [NODE_PREFIX_MODEL] }),
      { modelId: NODE_PREFIX_MODEL, resolvedModelId: NODE_ID_MODEL },
      lookups({
        checkGroupAccess: groupRules([{ pattern: NODE_PREFIX_MODEL, access: "allow" }, deny]),
        getProviderNodePrefix: nodePrefixLookup,
      })
    );
    assert.deepEqual(decision, { allowed: false, reason: "permissions" }, JSON.stringify(deny));
  }
});

test("a node-id resolution with no allow on the node or its prefix is still refused", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["evidence-combo"] }),
    { modelId: "evidence-combo", resolvedModelId: NODE_ID_MODEL },
    lookups({
      checkGroupAccess: groupRules([{ pattern: "evidence-combo", access: "allow" }]),
      getProviderNodePrefix: nodePrefixLookup,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a resolved target without a group allow of its own is still refused for a non-node alias", async () => {
  const decision = await evaluateModelAccess(
    restricted({ allowedModels: ["friendly"] }),
    { modelId: "friendly", resolvedModelId: "openai/private-model" },
    lookups({
      checkGroupAccess: groupRules([{ pattern: "friendly", access: "allow" }]),
      getProviderNodePrefix: () => null,
    })
  );
  assert.deepEqual(decision, { allowed: false, reason: "permissions" });
});

test("a group allow on either the short or the full form admits the requested id", async () => {
  for (const rule of [
    { pattern: "openai/public-model", access: "allow" as const },
    { pattern: "public-model", access: "allow" as const, provider: "openai" },
  ]) {
    const decision = await evaluateModelAccess(
      restricted(),
      { modelId: "openai/public-model" },
      lookups({ checkGroupAccess: groupRules([rule]), getProviderNodePrefix: unexpectedRead })
    );
    assert.deepEqual(decision, { allowed: true, reason: "permissions" }, JSON.stringify(rule));
  }
});
