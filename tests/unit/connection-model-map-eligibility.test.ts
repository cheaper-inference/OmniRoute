// #18395 finding: a connection model map must apply to credential eligibility, not only after
// selection. A connection advertising the mapped target has to be able to serve the alias, and a
// lockout recorded against the model that actually reached the wire has to skip that account.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-map-eligibility-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const auth = await import("../../src/sse/services/auth.ts");
const fallback = await import("../../open-sse/services/accountFallback.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.beforeEach(() => {
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

test.after(() => {
  fallback.clearAllModelLockouts();
  quotaCache.__clearForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function selectedConnectionId(selected: unknown): string | null {
  if (!selected || typeof selected !== "object") return null;
  const id = (selected as { connectionId?: unknown }).connectionId;
  return typeof id === "string" ? id : null;
}

async function seedAccount(
  provider: string,
  name: string,
  options: {
    modelMap?: Record<string, string>;
    inventory?: string[];
    priority?: number;
    authType?: string;
  } = {}
) {
  const created = (await providersDb.createProviderConnection({
    provider,
    authType: options.authType ?? "oauth",
    ...(options.authType === "apikey" ? { apiKey: `${name}-key` } : {}),
    ...(options.authType === "apikey" ? {} : { accessToken: `${name}-token` }),
    name,
    priority: options.priority ?? 1,
    isActive: true,
    providerSpecificData: {},
    ...(options.modelMap ? { modelMap: options.modelMap } : {}),
  })) as { id: string };
  if (options.inventory) {
    await modelsDb.replaceSyncedAvailableModelsForConnection(
      provider,
      created.id,
      options.inventory.map((id) => ({ id, name: id }))
    );
  }
  return created.id;
}

// Codex keeps a per-account synced inventory, so it is the provider that exercises the
// "inventory does not advertise the alias" gate.
const ALIAS = "gpt-alias-18395";
const TARGET = "gpt-target-18395";

test("a connection advertising the mapped target serves the alias", async () => {
  const mapped = await seedAccount("codex", "mapped", {
    modelMap: { [ALIAS]: TARGET },
    inventory: [TARGET],
    priority: 1,
  });
  // A sibling advertises the alias literally, so the pool is not empty for it and the inventory
  // filter really runs instead of failing open.
  await seedAccount("codex", "literal", { inventory: [ALIAS], priority: 2 });

  const selected = await auth.getProviderCredentials("codex", null, null, ALIAS);

  assert.equal(
    selectedConnectionId(selected),
    mapped,
    "the account whose map resolves the alias to an advertised target must be eligible"
  );
});

test("without a map the alias still needs its own advertised id", async () => {
  const unmapped = await seedAccount("codex", "unmapped", { inventory: [TARGET], priority: 1 });
  const literal = await seedAccount("codex", "literal", { inventory: [ALIAS], priority: 2 });

  const selected = await auth.getProviderCredentials("codex", null, null, ALIAS);

  assert.notEqual(
    selectedConnectionId(selected),
    unmapped,
    "an unmapped account that never synced the alias must stay ineligible for it"
  );
  assert.equal(selectedConnectionId(selected), literal);
});

test("a model lockout recorded under the mapped target skips that account", async () => {
  // Claude keeps an exact-model lock key (Codex collapses every gpt-* id into one quota scope,
  // which would make this assertion vacuous).
  const LOCK_ALIAS = "claude-alias-18395";
  const LOCK_TARGET = "claude-target-18395";
  const map = { [LOCK_ALIAS]: LOCK_TARGET };
  const locked = await seedAccount("claude", "locked", { modelMap: map, priority: 1 });
  const healthy = await seedAccount("claude", "healthy", { modelMap: map, priority: 2 });
  // A mapped connection dispatches the target, and chatCore's failure handler locks `targetModel`,
  // so the lock is recorded under the model that actually reached the wire.
  fallback.lockModel("claude", locked, LOCK_TARGET, "unknown", 60_000);

  const selected = await auth.getProviderCredentials("claude", null, null, LOCK_ALIAS);

  assert.equal(
    selectedConnectionId(selected),
    healthy,
    "judging the lock by the alias would miss it and resend the failing model"
  );
});
