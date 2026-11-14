import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-conn-model-map-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { resolveConnectionModel } =
  await import("../../open-sse/services/connectionModelMapping.ts");
const { createExecutorResolver } =
  await import("../../open-sse/handlers/chatCore/executorProxy.ts");

const originalFetch = globalThis.fetch;
const quietLog = { info() {}, warn() {}, error() {} };

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolveConnectionModel: exact match wins over a wildcard", () => {
  const map = { "fast-*": "vendor-fast-v2", "fast-1": "vendor-fast-v1" };
  assert.equal(resolveConnectionModel("fast-1", map), "vendor-fast-v1");
});

test("resolveConnectionModel: the longest trailing-star pattern wins", () => {
  const map = { "gpt-*": "short", "gpt-5-*": "long" };
  assert.equal(resolveConnectionModel("gpt-5-mini", map), "long");
  assert.equal(resolveConnectionModel("gpt-4o", map), "short");
});

test("resolveConnectionModel: no match, no mapping and malformed entries give null", () => {
  assert.equal(resolveConnectionModel("claude-x", { "gpt-*": "a" }), null);
  assert.equal(resolveConnectionModel("claude-x", undefined), null);
  assert.equal(resolveConnectionModel("claude-x", "not-an-object"), null);
  assert.equal(resolveConnectionModel("a", { a: 42 }), null, "non-string target ignored");
  assert.equal(resolveConnectionModel("a", { a: "  " }), null, "blank target ignored");
});

test("resolveConnectionModel: a target with unsafe model-id syntax is ignored", () => {
  assert.equal(resolveConnectionModel("a", { a: "../admin" }), null);
  assert.equal(resolveConnectionModel("a", { a: "x?y=1" }), null);
});

async function dispatch(providerSpecificData: Record<string, unknown> | undefined) {
  const seen: Array<{ url: string; body: Record<string, unknown> }> = [];
  globalThis.fetch = (async (url: unknown, init?: { body?: unknown }) => {
    seen.push({ url: String(url), body: JSON.parse(String(init?.body ?? "{}")) });
    return new Response(JSON.stringify({ choices: [] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }) as typeof fetch;
  const credentials = { apiKey: "test-key-placeholder", providerSpecificData };
  const executor = await createExecutorResolver(quietLog, credentials)("openai");
  await executor.execute({
    model: "my-alias",
    body: { model: "my-alias", messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials,
    log: quietLog,
  } as never);
  return seen;
}

test("no mapping configured: the model is sent as the client named it (unchanged default)", async () => {
  const seen = await dispatch(undefined);
  assert.equal(seen.length, 1);
  assert.equal(seen[0].body.model, "my-alias");
});

test("a connection mapping renames the model on the wire", async () => {
  const seen = await dispatch({ modelMapping: { "my-alias": "real-upstream-model" } });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].body.model, "real-upstream-model");
});

test("a connection mapping with no matching pattern leaves the model alone", async () => {
  const seen = await dispatch({ modelMapping: { "other-*": "x" } });
  assert.equal(seen[0].body.model, "my-alias");
});

test("the wrapper keeps the executor's own methods working", async () => {
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const { wrapExecutorWithConnectionModelMapping } =
    await import("../../open-sse/services/connectionModelMapping.ts");
  for (const provider of ["openai", "claude"]) {
    const original = (await getExecutor(provider)) as unknown as Record<
      string,
      (...a: unknown[]) => unknown
    >;
    const wrapped = wrapExecutorWithConnectionModelMapping(original as never, {
      modelMapping: { "a-*": "b" },
    }) as unknown as Record<string, (...a: unknown[]) => unknown>;
    assert.notEqual(wrapped, original, "a mapping must produce a wrapper");
    assert.deepEqual(wrapped.getTimeoutMs(), original.getTimeoutMs(), `${provider}.getTimeoutMs`);
  }
});

test("the wrapper does not break executors that read #private fields (opencode-zen accounts)", async () => {
  const { getExecutor } = await import("../../open-sse/executors/index.ts");
  const { wrapExecutorWithConnectionModelMapping } =
    await import("../../open-sse/services/connectionModelMapping.ts");
  const original = (await getExecutor("opencode-zen")) as unknown as { accounts: unknown };
  const wrapped = wrapExecutorWithConnectionModelMapping(original as never, {
    modelMapping: { "a-*": "b" },
  }) as unknown as { accounts: unknown };
  assert.notEqual(wrapped, original, "a mapping must produce a wrapper");
  assert.deepEqual(wrapped.accounts, original.accounts);
});

test("providerSpecificData.modelMapping is validated on connection create", async () => {
  const { createProviderSchema } = await import("../../src/shared/validation/schemas/provider.ts");
  const base = { provider: "openai", apiKey: "test-key-placeholder", name: "map-check" };
  const parse = (modelMapping: unknown) =>
    createProviderSchema.safeParse({ ...base, providerSpecificData: { modelMapping } });
  assert.equal(parse({ "gpt-5-*": "vendor-gpt-5" }).success, true);
  assert.equal(parse("nope").success, false, "must be an object");
  assert.equal(parse([["a", "b"]]).success, false, "arrays are not allowed");
  assert.equal(parse({ a: 42 }).success, false, "targets must be strings");
  assert.equal(parse({ a: "../admin" }).success, false, "unsafe target syntax");
  assert.equal(parse({ [`k${"x".repeat(300)}`]: "b" }).success, false, "key too long");
  const many = Object.fromEntries(Array.from({ length: 101 }, (_, i) => [`m${i}`, "t"]));
  assert.equal(parse(many).success, false, "at most 100 entries");
});

test("modelMapping survives a connection save/load round trip and is validated on update", async () => {
  const providersDb = await import("../../src/lib/db/providers.ts");
  const { updateProviderConnectionSchema } =
    await import("../../src/shared/validation/schemas/provider.ts");
  const created = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "map-roundtrip",
    apiKey: "test-key-placeholder-roundtrip",
    isActive: true,
    providerSpecificData: { modelMapping: { "my-*": "vendor-model" } },
  });
  const loaded = await providersDb.getProviderConnectionById(created.id);
  assert.deepEqual((loaded?.providerSpecificData as Record<string, unknown>)?.modelMapping, {
    "my-*": "vendor-model",
  });
  assert.equal(
    updateProviderConnectionSchema.safeParse({ providerSpecificData: { modelMapping: { a: 1 } } })
      .success,
    false
  );
});
