import assert from "node:assert/strict";
import test from "node:test";

// The runner's isolateDataDir preload provides an isolated SQLite database.
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createProviderNode, deleteProviderNode } =
  await import("../../src/lib/db/providers/nodes.ts");
const {
  createProviderConnection,
  updateProviderConnection,
  deleteProviderConnectionsByProvider,
  getProviderConnectionById,
} = await import("../../src/lib/db/providers.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");
const { createProviderNodeSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");

const NODE_ID = "openai-compatible-chat-legacy-workbuddy-17278";
const ALIAS_NODE_ID = "anthropic-compatible-legacy-wb-17278";
const BOOT_NODE_ID = "openai-compatible-boot-warning-17278";
const RETIRED_NODE_ID = "openai-compatible-retired-felo-17278";

async function legacyNode(id: string, prefix: string, type = "openai-compatible") {
  // Existing persisted records predate registry reservations; creation via the
  // public API is separately checked below and must continue to reject them.
  return createProviderNode({
    id,
    name: "Legacy prefix fixture",
    prefix,
    type,
    apiType: "chat",
    baseUrl: "https://legacy.invalid/v1",
  });
}

async function builtinConnection(isActive: boolean) {
  return createProviderConnection({
    provider: "workbuddy",
    name: "Synthetic builtin fixture",
    authType: "apikey",
    apiKey: "synthetic-test-key-17278",
    isActive,
    testStatus: "active",
  });
}

test.beforeEach(async () => {
  await deleteProviderConnectionsByProvider("workbuddy");
  for (const id of [NODE_ID, ALIAS_NODE_ID, RETIRED_NODE_ID, BOOT_NODE_ID])
    await deleteProviderNode(id);
});
test.after(() => resetDbInstance());

test("pre-existing workbuddy node keeps its prefix when the builtin has no active connections", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  const info = await getModelInfo("workbuddy/cn:glm-5.3");
  assert.equal(info.provider, NODE_ID);
  assert.equal(info.model, "cn:glm-5.3");
});

test("pre-existing builtin alias works for an Anthropic-compatible node too", async () => {
  await legacyNode(ALIAS_NODE_ID, "wb", "anthropic-compatible");
  const info = await getModelInfo("wb/custom-model");
  assert.equal(info.provider, ALIAS_NODE_ID);
  assert.equal(info.model, "custom-model");
});

test("a disabled builtin connection does not shadow the pre-existing node", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  await builtinConnection(false);
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, NODE_ID);
});

test("an active builtin connection takes precedence again", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  await builtinConnection(true);
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, "workbuddy");
});

test("connection activation and deactivation are reflected on the next resolution", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  const connection = await builtinConnection(true);
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, "workbuddy");
  await updateProviderConnection(String(connection.id), { isActive: false });
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, NODE_ID);
});

test("retired provider tombstones remain fail-closed despite a persisted colliding node", async () => {
  await legacyNode(RETIRED_NODE_ID, "felo-web");
  await assert.rejects(
    () => getModelInfo("felo-web/custom-model"),
    (error: unknown) => {
      assert.equal((error as { code?: string }).code, "PROVIDER_RETIRED");
      return true;
    }
  );
});

test("new nodes still cannot claim a reserved builtin id or alias", () => {
  for (const prefix of ["workbuddy", "wb"]) {
    const parsed = createProviderNodeSchema.safeParse({
      name: "New node",
      prefix,
      type: "openai-compatible",
      apiType: "chat",
      baseUrl: "https://new.invalid/v1",
    });
    assert.equal(parsed.success, false, prefix);
    if (!parsed.success)
      assert.ok(parsed.error.issues.some((issue) => issue.path.includes("prefix")));
  }
});

test("active builtin keeps precedence during a transient cooldown or auth error", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  const connection = await builtinConnection(true);
  await updateProviderConnection(String(connection.id), {
    testStatus: "unavailable",
    errorCode: 429,
    rateLimitedUntil: new Date(Date.now() + 3600000).toISOString(),
  });
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, "workbuddy");
  await updateProviderConnection(String(connection.id), { testStatus: "error", errorCode: 401 });
  assert.equal((await getModelInfo("workbuddy/custom-model")).provider, "workbuddy");
});

test("internal node ids remain directly addressable while the builtin owns the prefix", async () => {
  await legacyNode(NODE_ID, "workbuddy");
  await builtinConnection(true);
  assert.equal((await getModelInfo(`${NODE_ID}/custom-model`)).provider, NODE_ID);
});

test("derived shadow status restores automatically and never overwrites stored health", async () => {
  const { projectProviderPrefixCollisions } =
    await import("../../src/lib/providers/providerPrefixCollision.ts");
  await legacyNode(NODE_ID, "workbuddy");
  const custom = await createProviderConnection({
    provider: NODE_ID,
    name: "Synthetic legacy connection",
    authType: "apikey",
    apiKey: "synthetic-legacy-test-key",
    isActive: true,
    testStatus: "active",
  });
  const builtin = await builtinConnection(true);
  const before = await getProviderConnectionById(String(custom.id));
  const [projected] = await projectProviderPrefixCollisions([before]);
  assert.equal(projected.prefixShadowed?.code, "prefix_shadowed");
  assert.match(projected.prefixShadowed?.message ?? "", /workbuddy/);
  assert.equal(projected.testStatus, "active");
  assert.equal(projected.isActive, true);
  assert.deepEqual(await getProviderConnectionById(String(custom.id)), before);
  await updateProviderConnection(String(builtin.id), { isActive: false });
  const [restored] = await projectProviderPrefixCollisions([before]);
  assert.equal(restored.prefixShadowed, null);
  assert.equal(restored.testStatus, "active");
  assert.deepEqual(await getProviderConnectionById(String(custom.id)), before);
});

test("boot warning identifies collision and effective routing once per node state", async () => {
  const { warnProviderPrefixCollisionsAtBoot } =
    await import("../../src/lib/providers/providerPrefixCollision.ts");
  await legacyNode(BOOT_NODE_ID, "workbuddy");
  const warnings: string[] = [];
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => warnings.push(args.map(String).join(" "));
  try {
    await warnProviderPrefixCollisionsAtBoot();
    await warnProviderPrefixCollisionsAtBoot();
    assert.equal(warnings.length, 1);
    assert.match(warnings[0], /prefix_grandfathered/);
    assert.match(warnings[0], /openai-compatible-boot-warning-17278/);
    await builtinConnection(true);
    await warnProviderPrefixCollisionsAtBoot();
    assert.equal(warnings.length, 2);
    assert.match(warnings[1], /prefix_shadowed/);
    assert.doesNotMatch(warnings.join(" "), /synthetic-test-key|legacy.invalid/);
  } finally {
    console.warn = originalWarn;
  }
});

test("the builtin canonical connection also takes precedence over its alias", async () => {
  await legacyNode(ALIAS_NODE_ID, "wb", "anthropic-compatible");
  await builtinConnection(true);
  assert.equal((await getModelInfo("wb/custom-model")).provider, "workbuddy");
});
