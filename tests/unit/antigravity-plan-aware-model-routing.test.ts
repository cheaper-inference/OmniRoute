/**
 * Antigravity entitlement is per ACCOUNT (plan): only Ultra accounts are offered the 5.5 Claude
 * models. Routing must (1) skip accounts whose live inventory lacks the requested model,
 * (2) fail open when no account advertises it, and (3) let an operator-pinned account through.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agy-plan-routing-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const auth = await import("../../src/sse/services/auth.ts");

const PROVIDER = "antigravity";
const OPUS55 = "claude-opus-5-5-low";

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

async function account(name: string, priority: number, models: string[]): Promise<string> {
  const created = (await providersDb.createProviderConnection({
    provider: PROVIDER,
    authType: "oauth",
    name,
    accessToken: `token-${name}`,
    priority,
    isActive: true,
  })) as { id: string };
  if (models.length > 0) {
    await modelsDb.replaceSyncedAvailableModelsForConnection(
      PROVIDER,
      created.id,
      models.map((id) => ({ id, name: id }))
    );
  }
  return created.id;
}

const idOf = (selected: unknown): string | null => {
  if (!selected || typeof selected !== "object") return null;
  const id = (selected as { connectionId?: unknown }).connectionId;
  return typeof id === "string" ? id : null;
};

const OLD = ["claude-opus-4-6-thinking", "claude-sonnet-4-6"];
const ULTRA = [...OLD, OPUS55, "claude-opus-5-5-high"];

test("a 5.5 request skips the accounts whose plan does not list it", async () => {
  await resetStorage();
  const pro1 = await account("pro1", 1, OLD);
  const pro2 = await account("pro2", 2, OLD);
  const ultra = await account("ultra", 3, ULTRA);

  const first = await auth.getProviderCredentials(PROVIDER, null, null, OPUS55);
  assert.equal(idOf(first), ultra, "only the Ultra account advertises the 5.5 model");
  assert.notEqual(idOf(first), pro1);
  assert.notEqual(idOf(first), pro2);

  const next = await auth.getProviderCredentials(PROVIDER, ultra, null, OPUS55);
  assert.notEqual(idOf(next), pro1, "failover must not wander onto an account without the model");
  assert.notEqual(idOf(next), pro2);
});

test("a model every account lists keeps all accounts eligible (4.6 failover intact)", async () => {
  await resetStorage();
  const a = await account("a", 1, ULTRA);
  const b = await account("b", 2, OLD);

  assert.equal(
    idOf(await auth.getProviderCredentials(PROVIDER, null, null, "claude-sonnet-4-6")),
    a
  );
  assert.equal(idOf(await auth.getProviderCredentials(PROVIDER, a, null, "claude-sonnet-4-6")), b);
});

test("fails open when no account advertises the model (stale or incomplete lists)", async () => {
  await resetStorage();
  const a = await account("a", 1, OLD);
  await account("b", 2, OLD);

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, "claude-opus-9-9-low");
  assert.equal(idOf(selected), a, "an unlisted model must not empty the pool");
});

test("accounts never synced stay eligible (unknown is not 'does not have it')", async () => {
  await resetStorage();
  const unsynced = await account("unsynced", 1, []);
  await account("ultra", 2, ULTRA);

  const selected = await auth.getProviderCredentials(PROVIDER, null, null, OPUS55);
  assert.equal(idOf(selected), unsynced);
});

test("inventoryOrFailOpen: keeps the inventory only when some account advertises the model", async () => {
  const filter = await import("../../src/sse/services/perAccountCatalogFilter.ts");
  const inv = new Map([
    ["x", new Set(["m1"])],
    ["y", new Set(["m2"])],
  ]);
  assert.equal(filter.inventoryOrFailOpen("m1", inv), inv);
  assert.equal(filter.inventoryOrFailOpen("missing", inv).size, 0);
  assert.equal(filter.isPerAccountCatalogProvider("antigravity"), true);
  assert.equal(filter.isPerAccountCatalogProvider("openai"), false);
});

test("an account the operator pinned is not vetoed, but a combo-derived pin still is", async () => {
  await resetStorage();
  const pro = await account("pro", 1, OLD);
  const ultra = await account("ultra", 2, ULTRA);

  const pinned = await auth.getProviderCredentials(PROVIDER, null, null, OPUS55, {
    forcedConnectionId: pro,
    explicitConnectionPin: true,
  });
  assert.equal(idOf(pinned), pro, "operator pinned this account; it must be tried as asked");

  const comboTarget = await auth.getProviderCredentials(PROVIDER, null, null, OPUS55, {
    forcedConnectionId: pro,
  });
  assert.equal(
    idOf(comboTarget),
    null,
    "a combo expansion must not spend calls on a non-covering account"
  );

  const automatic = await auth.getProviderCredentials(PROVIDER, null, null, OPUS55);
  assert.equal(idOf(automatic), ultra, "automatic selection still follows the live inventory");
});

test("a model only the agy accounts list (Gemini 4 Argon) skips the antigravity-provider accounts", async () => {
  await resetStorage();
  const ARGON = "gemini-4-argon-low";
  const proAccount = await account("pro", 1, OLD);
  const agy = (await providersDb.createProviderConnection({
    provider: "agy",
    authType: "oauth",
    name: "ultra-agy",
    accessToken: "token-ultra-agy",
    priority: 2,
    isActive: true,
  })) as { id: string };
  await modelsDb.replaceSyncedAvailableModelsForConnection("agy", agy.id, [
    { id: ARGON, name: ARGON },
    ...OLD.map((id) => ({ id, name: id })),
  ]);

  const first = await auth.getProviderCredentials(PROVIDER, null, null, ARGON);
  assert.equal(idOf(first), agy.id, "only the agy account advertises Argon");
  assert.notEqual(idOf(first), proAccount);
});
