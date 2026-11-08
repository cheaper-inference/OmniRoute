/**
 * Optional custom ID suffix for OpenAI-/Anthropic-compatible provider nodes.
 *
 * POST /api/provider-nodes accepts `providerIdSuffix`; when set, the node id becomes
 * `openai-compatible-<apiType>-<suffix>` / `anthropic-compatible-<suffix>` /
 * `anthropic-compatible-cc-<suffix>` instead of `<prefix><uuid>`. Blank keeps the UUID.
 * Duplicate ids are rejected with 409 (never overwrite, never 500), the suffix charset is
 * restricted, and every id shape that existed before keeps resolving identically.
 *
 * Run: node --import tsx/esm --test tests/unit/provider-nodes-custom-suffix.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-provider-node-suffix-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const nodesDb = await import("../../src/lib/db/providers/nodes.ts");
const providerNodesRoute = await import("../../src/app/api/provider-nodes/route.ts");
const { createProviderNodeSchema } =
  await import("../../src/shared/validation/schemas/provider.ts");
const { isCompatibleProviderConnectionId } =
  await import("../../src/shared/utils/compatibleProviderId.ts");
const { getOpenAICompatibleType, isClaudeCodeCompatible } =
  await import("../../open-sse/services/provider.ts");
const { nodeTypeFromId } = await import("../../src/lib/db/providerNodeSelect.ts");
const { getProviderDisplayName } = await import("../../src/lib/display/names.ts");

const UUID_ID_RE = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const UUID = "02669115-2545-4896-b003-cb4dac09d441";

function resetStorage() {
  delete process.env.ENABLE_CC_COMPATIBLE_PROVIDER;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function post(body: Record<string, unknown>) {
  return providerNodesRoute.POST(
    new Request("http://localhost/api/provider-nodes", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    })
  );
}

const OPENAI_BASE = {
  type: "openai-compatible",
  apiType: "chat",
  name: "Team Gateway",
  prefix: "teamgw",
  baseUrl: "https://gateway.example.com/v1",
};

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("openai-compatible node uses the custom suffix (trimmed, case preserved)", async () => {
  const res = await post({ ...OPENAI_BASE, providerIdSuffix: "team-gw" });
  assert.equal(res.status, 201);
  const body = (await res.json()) as { node: { id: string } };
  assert.equal(body.node.id, "openai-compatible-chat-team-gw");

  const trimmed = await post({
    ...OPENAI_BASE,
    prefix: "teamgw2",
    providerIdSuffix: "  Team.Proxy_1-Prod  ",
  });
  assert.equal(trimmed.status, 201);
  const trimmedBody = (await trimmed.json()) as { node: { id: string } };
  assert.equal(trimmedBody.node.id, "openai-compatible-chat-Team.Proxy_1-Prod");

  const stored = await nodesDb.getProviderNodeById("openai-compatible-chat-team-gw");
  assert.equal((stored as { name?: string } | null)?.name, "Team Gateway");
});

test("the suffix applies to every OpenAI apiType segment", async () => {
  const res = await post({
    ...OPENAI_BASE,
    apiType: "responses",
    providerIdSuffix: "responses_node",
  });
  assert.equal(res.status, 201);
  const body = (await res.json()) as { node: { id: string; apiType: string } };
  assert.equal(body.node.id, "openai-compatible-responses-responses_node");
  assert.equal(body.node.apiType, "responses");

  const emb = await post({ ...OPENAI_BASE, apiType: "embeddings", providerIdSuffix: "emb1" });
  assert.equal(emb.status, 201);
  assert.equal(
    ((await emb.json()) as { node: { id: string } }).node.id,
    "openai-compatible-embeddings-emb1"
  );
});

test("blank, whitespace, null or missing suffix keeps the random UUID id (non-regression)", async () => {
  const variants: Array<Record<string, unknown>> = [
    {},
    { providerIdSuffix: "" },
    { providerIdSuffix: "   " },
    { providerIdSuffix: null },
  ];
  const seen = new Set<string>();
  for (const extra of variants) {
    const res = await post({ ...OPENAI_BASE, ...extra });
    assert.equal(res.status, 201, `variant ${JSON.stringify(extra)}`);
    const { node } = (await res.json()) as { node: { id: string } };
    assert.match(node.id, /^openai-compatible-chat-/);
    assert.match(node.id, UUID_ID_RE);
    seen.add(node.id);
  }
  assert.equal(seen.size, variants.length);

  const anth = await post({
    type: "anthropic-compatible",
    name: "Anthropic",
    prefix: "anth",
    baseUrl: "https://anthropic.example.com/v1",
  });
  assert.equal(anth.status, 201);
  const anthId = ((await anth.json()) as { node: { id: string } }).node.id;
  assert.match(anthId, /^anthropic-compatible-[0-9a-f]{8}-/);
});

test("duplicate custom id returns 409 and leaves the original node untouched", async () => {
  const first = await post({ ...OPENAI_BASE, providerIdSuffix: "shared" });
  assert.equal(first.status, 201);

  const dup = await post({
    ...OPENAI_BASE,
    name: "Replacement",
    prefix: "replacement",
    baseUrl: "https://replacement.example.com/v1",
    providerIdSuffix: "shared",
  });
  assert.equal(dup.status, 409);
  const dupBody = (await dup.json()) as { error: { message: string; type: string } };
  assert.equal(dupBody.error.type, "conflict");
  assert.match(dupBody.error.message, /already exists/i);
  assert.ok(!dupBody.error.message.includes("at /"), "must not leak a stack trace");

  const stored = (await nodesDb.getProviderNodeById("openai-compatible-chat-shared")) as Record<
    string,
    unknown
  >;
  assert.equal(stored.name, "Team Gateway");
  assert.equal(stored.prefix, "teamgw");
  assert.equal(stored.baseUrl, "https://gateway.example.com/v1");
  assert.equal(nodesDb.getProviderNodesCount(), 1);
});

test("createProviderNode throws a typed conflict error instead of a raw SQLite error", async () => {
  await nodesDb.createProviderNode({
    id: "anthropic-compatible-dup",
    type: "anthropic-compatible",
    name: "A",
  });
  await assert.rejects(
    () =>
      nodesDb.createProviderNode({
        id: "anthropic-compatible-dup",
        type: "anthropic-compatible",
        name: "B",
      }),
    (err: unknown) => {
      assert.equal(nodesDb.isProviderNodeIdConflictError(err), true);
      assert.ok(err instanceof nodesDb.ProviderNodeIdConflictError);
      return true;
    }
  );
  const stored = (await nodesDb.getProviderNodeById("anthropic-compatible-dup")) as Record<
    string,
    unknown
  >;
  assert.equal(stored.name, "A");
});

test("invalid suffix charset or length is rejected with 400", async () => {
  for (const providerIdSuffix of [
    "a/b",
    "../x",
    "with space",
    "a?b",
    "-leading",
    ".hidden",
    "x".repeat(65),
    42,
  ]) {
    const res = await post({ ...OPENAI_BASE, providerIdSuffix });
    assert.equal(res.status, 400, `suffix ${JSON.stringify(providerIdSuffix)} must be rejected`);
  }
  assert.equal(nodesDb.getProviderNodesCount(), 0);
  assert.equal(
    createProviderNodeSchema.safeParse({ ...OPENAI_BASE, providerIdSuffix: "ok-1.2_3" }).success,
    true
  );
  assert.equal(
    createProviderNodeSchema.safeParse({ ...OPENAI_BASE, providerIdSuffix: "x".repeat(64) })
      .success,
    true
  );
});

test("anthropic suffix starting with cc- is rejected (would be detected as CC-compatible)", async () => {
  const anthBase = {
    type: "anthropic-compatible",
    name: "Anthropic",
    prefix: "anth",
    baseUrl: "https://anthropic.example.com/v1",
  };
  for (const providerIdSuffix of ["cc-x", "CC-x"]) {
    const res = await post({ ...anthBase, providerIdSuffix });
    assert.equal(res.status, 400, `suffix ${providerIdSuffix}`);
  }

  const ok = await post({ ...anthBase, providerIdSuffix: "ac-prod" });
  assert.equal(ok.status, 201);
  const id = ((await ok.json()) as { node: { id: string } }).node.id;
  assert.equal(id, "anthropic-compatible-ac-prod");
  assert.equal(isClaudeCodeCompatible(id), false);
});

test("CC-compatible node builds anthropic-compatible-cc-<suffix>", async () => {
  process.env.ENABLE_CC_COMPATIBLE_PROVIDER = "true";
  const res = await post({
    type: "anthropic-compatible",
    compatMode: "cc",
    name: "CC Relay",
    prefix: "ccrelay",
    baseUrl: "https://cc.example.com",
    providerIdSuffix: "x",
  });
  assert.equal(res.status, 201);
  const id = ((await res.json()) as { node: { id: string } }).node.id;
  assert.equal(id, "anthropic-compatible-cc-x");
  assert.equal(isClaudeCodeCompatible(id), true);
});

test("custom-suffixed ids are recognized as compatible connection ids", () => {
  for (const id of [
    "openai-compatible-chat-team-gw",
    "openai-compatible-responses-Team.Proxy_1-Prod",
    "anthropic-compatible-ac-prod",
    "anthropic-compatible-cc-x",
  ]) {
    assert.equal(isCompatibleProviderConnectionId(id), true, id);
  }
  for (const id of [
    "openai-compatible-chat-a/b",
    "openai-compatible-chat-",
    "anthropic-compatible-",
  ]) {
    assert.equal(isCompatibleProviderConnectionId(id), false, id);
  }
  assert.equal(getProviderDisplayName("openai-compatible-chat-team-gw"), "Compatible (openai)");
  assert.equal(getProviderDisplayName("anthropic-compatible-cc-x"), "CC Compatible");
});

test("a suffix containing a type word never flips the openai-compatible apiType", () => {
  assert.equal(getOpenAICompatibleType("openai-compatible-chat-my-responses", null), "chat");
  assert.equal(getOpenAICompatibleType("openai-compatible-chat-embeddings-gw", null), "chat");
  assert.equal(getOpenAICompatibleType("openai-compatible-chat-audio-speech", null), "chat");
  assert.equal(getOpenAICompatibleType("openai-compatible-responses-chat", null), "responses");
  assert.equal(
    getOpenAICompatibleType("openai-compatible-embeddings-images-generations", null),
    "embeddings"
  );
  // stored apiType still wins over the id marker
  assert.equal(
    getOpenAICompatibleType("openai-compatible-chat-x", { apiType: "responses" }),
    "responses"
  );
});

test("legacy UUID ids keep resolving exactly as before (non-regression)", () => {
  const legacy: Array<[string, string]> = [
    ["openai-compatible-chat-" + UUID, "chat"],
    ["openai-compatible-responses-" + UUID, "responses"],
    ["openai-compatible-embeddings-" + UUID, "embeddings"],
    ["openai-compatible-audio-transcriptions-" + UUID, "audio-transcriptions"],
    ["openai-compatible-audio-speech-" + UUID, "audio-speech"],
    ["openai-compatible-images-generations-" + UUID, "images-generations"],
    // bare derived types (#4421 callers) still map to their type
    ["openai-compatible-responses", "responses"],
    ["openai-compatible-embeddings", "embeddings"],
    ["openai-compatible-chat", "chat"],
  ];
  for (const [id, type] of legacy) {
    assert.equal(getOpenAICompatibleType(id, null), type, id);
  }
  // non-openai ids are untouched
  assert.equal(getOpenAICompatibleType("anthropic-compatible-" + UUID, null), "chat");

  // validator: the same 4 generated shapes match, embeddings shape stays unmatched as before
  assert.equal(isCompatibleProviderConnectionId("openai-compatible-chat-" + UUID), true);
  assert.equal(isCompatibleProviderConnectionId("openai-compatible-responses-" + UUID), true);
  assert.equal(isCompatibleProviderConnectionId("anthropic-compatible-" + UUID), true);
  assert.equal(isCompatibleProviderConnectionId("anthropic-compatible-cc-" + UUID), true);
  assert.equal(isCompatibleProviderConnectionId("openai-compatible-embeddings-" + UUID), false);
  assert.equal(isCompatibleProviderConnectionId("custom-compatible-chat-" + UUID), false);
  assert.equal(isCompatibleProviderConnectionId("openai"), false);

  // node-type derivation for the #4421 bare-type fallback is unchanged
  assert.equal(
    nodeTypeFromId("openai-compatible-responses-" + UUID),
    "openai-compatible-responses"
  );
  assert.equal(nodeTypeFromId("anthropic-compatible-cc-" + UUID), "anthropic-compatible-cc");
});

test("a legacy UUID node stored before the change is still fetched by its exact id", async () => {
  const legacyId = "openai-compatible-chat-" + UUID;
  await nodesDb.createProviderNode({
    id: legacyId,
    type: "openai-compatible",
    apiType: "chat",
    name: "Legacy",
    prefix: "legacy",
    baseUrl: "https://legacy.example.com/v1",
  });
  const stored = (await nodesDb.getProviderNodeById(legacyId)) as Record<string, unknown>;
  assert.equal(stored.id, legacyId);
  assert.equal(stored.name, "Legacy");
});
