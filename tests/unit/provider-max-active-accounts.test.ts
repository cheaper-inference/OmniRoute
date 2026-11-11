// Opt-in PROVIDER_MAX_ACTIVE_ACCOUNTS (e.g. "claude=2,codex=1"): per provider, only the first N
// usable accounts by priority take requests. The rest are reserves and are used only when
// the active ones are unusable. Default off.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omni-max-active-accounts-"));
process.env.DATA_DIR = dataDir;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { parseMaxActiveAccounts } = await import("../../src/sse/services/maxActiveAccounts.ts");

const FLAG = "PROVIDER_MAX_ACTIVE_ACCOUNTS";
const PROVIDER = "openai";
const MODEL = "gpt-5.2";

async function seed(n: number) {
  const ids: string[] = [];
  for (let i = 0; i < n; i++) {
    const c = await providersDb.createProviderConnection({
      provider: PROVIDER,
      authType: "apikey",
      name: `max-active-${i}`,
      apiKey: `k-${i}`,
      isActive: true,
      testStatus: "active",
      priority: i + 1,
      providerSpecificData: {},
    });
    ids.push(String(c.id));
  }
  return ids;
}

async function pick(exclude: string[] = []) {
  const r = (await auth.getProviderCredentials(PROVIDER, null, null, MODEL, {
    excludeConnectionIds: exclude,
  })) as { connectionId?: string } | null;
  return r?.connectionId;
}

test.beforeEach(async () => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(dataDir, { recursive: true });
  await settingsDb.updateSettings({ fallbackStrategy: "round-robin", stickyRoundRobinLimit: 1 });
  delete process.env[FLAG];
});
test.after(() => {
  delete process.env[FLAG];
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("parse: reads provider=N pairs and ignores bad entries", () => {
  assert.equal(parseMaxActiveAccounts("openai=2,claude=1", "openai"), 2);
  assert.equal(parseMaxActiveAccounts(" OpenAI = 3 ", "openai"), 3);
  assert.equal(parseMaxActiveAccounts("openai=0", "openai"), 0);
  assert.equal(parseMaxActiveAccounts("openai=x,claude=1", "openai"), 0);
  assert.equal(parseMaxActiveAccounts("claude=1", "openai"), 0);
  assert.equal(parseMaxActiveAccounts(undefined, "openai"), 0);
});

test("round-robin never uses an account beyond the active limit", async () => {
  process.env[FLAG] = `${PROVIDER}=2`;
  const [a, b] = await seed(4);
  const seen = new Set<string>();
  for (let i = 0; i < 8; i++) seen.add(String(await pick()));
  assert.deepEqual([...seen].sort(), [a, b].sort());
});

test("is off by default: round-robin reaches every account", async () => {
  const ids = await seed(4);
  const seen = new Set<string>();
  for (let i = 0; i < 12; i++) seen.add(String(await pick()));
  assert.deepEqual([...seen].sort(), [...ids].sort());
});

test("a reserve takes over only when an active account is unusable", async () => {
  process.env[FLAG] = `${PROVIDER}=1`;
  const [a, b, c] = await seed(3);
  const used = async (exclude: string[]) => {
    const seen = new Set<string>();
    for (let i = 0; i < 6; i++) seen.add(String(await pick(exclude)));
    return [...seen];
  };
  assert.deepEqual(await used([]), [a]);
  assert.deepEqual(await used([a]), [b]);
  assert.deepEqual(await used([a, b]), [c]);
});

test("a limit above the account count changes nothing", async () => {
  process.env[FLAG] = `${PROVIDER}=9`;
  const ids = await seed(3);
  const seen = new Set<string>();
  for (let i = 0; i < 9; i++) seen.add(String(await pick()));
  assert.deepEqual([...seen].sort(), [...ids].sort());
});

test("another provider's limit does not apply", async () => {
  process.env[FLAG] = "claude=1";
  const ids = await seed(3);
  const seen = new Set<string>();
  for (let i = 0; i < 9; i++) seen.add(String(await pick()));
  assert.deepEqual([...seen].sort(), [...ids].sort());
});
