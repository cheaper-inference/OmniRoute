import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import Database from "better-sqlite3";

const dataDir = mkdtempSync(join(tmpdir(), "omniroute-ban-summary-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.API_KEY_SECRET = "isolated-ban-summary-test-secret";

const core = await import("../../src/lib/db/core.ts");
const keys = await import("../../src/lib/db/apiKeys.ts");
const { getApiKeyBanSummary } = await import("../../src/lib/db/apiKeys/banSummary.ts");
const { GET } = await import("../../src/app/api/keys/bans/route.ts");
const { PATCH } = await import("../../src/app/api/keys/[id]/route.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const { updateKeyPermissionsSchema } = await import("../../src/shared/validation/schemas/keys.ts");

function request(token?: string): Request {
  return new Request("http://localhost/api/keys/bans", {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

test.after(() => {
  core.resetDbInstance();
  keys.resetApiKeyState();
  rmSync(dataDir, { recursive: true, force: true });
});

test("the ban reason accepts only defined categories and requires a ban update", () => {
  assert.equal(
    updateKeyPermissionsSchema.safeParse({ isBanned: true, banReason: "prompt_injection" }).success,
    true
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({ isBanned: true, banReason: "untrusted request body" })
      .success,
    false
  );
  assert.equal(
    updateKeyPermissionsSchema.safeParse({ isBanned: false, banReason: "prompt_injection" })
      .success,
    false
  );
});

test("the authenticated summary shows recorded bans and only safe fields", async () => {
  const manager = await keys.createApiKey("Management fixture", "manager-fixture");
  await keys.updateApiKeyPermissions(manager.id, { scopes: ["manage"] });
  const enabled = await keys.createApiKey("Enabled fixture", "enabled-fixture");
  const disabled = await keys.createApiKey("Disabled fixture", "disabled-fixture");
  await keys.updateApiKeyPermissions(disabled.id, { isActive: false });
  const known = await keys.createApiKey("Guard review fixture", "guard-fixture");
  const ban = new Request(`http://localhost/api/keys/${known.id}`, {
    method: "PATCH",
    headers: { authorization: `Bearer ${manager.key}`, "content-type": "application/json" },
    body: JSON.stringify({ isBanned: true, banReason: "prompt_injection" }),
  });
  assert.equal((await PATCH(ban, { params: Promise.resolve({ id: known.id }) })).status, 200);
  const legacy = await keys.createApiKey("Legacy ban fixture", "legacy-fixture");
  await keys.updateApiKeyPermissions(legacy.id, { isBanned: true });

  assert.equal((await GET(request())).status, 401);
  assert.equal((await GET(request(enabled.key))).status, 403);

  const response = await GET(request(manager.key));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  const payload = await response.json();
  assert.equal(payload.total, 2);
  assert.deepEqual(
    payload.keys.sort((left: { id: string }, right: { id: string }) =>
      left.id.localeCompare(right.id)
    ),
    [
      { id: known.id, name: known.name, reason: "prompt_injection" },
      { id: legacy.id, name: legacy.name, reason: null },
    ].sort((left, right) => left.id.localeCompare(right.id))
  );

  await keys.updateApiKeyPermissions(known.id, { isBanned: true, name: "Renamed fixture" });
  assert.equal(
    getApiKeyBanSummary().keys.find((key) => key.id === known.id)?.reason,
    "prompt_injection"
  );
  assert.ok(!Object.hasOwn((await keys.getApiKeyById(known.id))!, "banReason"));
  await keys.updateApiKeyPermissions(known.id, { isBanned: false });
  assert.equal((await (await GET(request(manager.key))).json()).total, 1);
  await keys.updateApiKeyPermissions(known.id, { isBanned: true });
  assert.equal(getApiKeyBanSummary().keys.find((key) => key.id === known.id)?.reason, null);
});

test("a legacy banned key keeps its state and gains no guessed reason on upgrade", () => {
  const db = new Database(":memory:");
  try {
    db.exec(`
      CREATE TABLE api_keys (id TEXT PRIMARY KEY, is_banned INTEGER);
      INSERT INTO api_keys VALUES ('legacy-fixture', 1);
    `);
    db.exec(
      readFileSync(
        new URL(
          "../../src/lib/db/migrations/20261123205417_api_key_ban_reason.sql",
          import.meta.url
        ),
        "utf8"
      )
    );
    assert.deepEqual(db.prepare("SELECT * FROM api_keys").get(), {
      id: "legacy-fixture",
      is_banned: 1,
      ban_reason: null,
      banned_at: null,
    });
  } finally {
    db.close();
  }
});

test("open dashboard mode still requires credentials for the summary and ban reason", async () => {
  const enabled = await keys.createApiKey("Open mode fixture", "open-fixture");
  await updateSettings({ requireLogin: false });
  try {
    assert.equal((await GET(request())).status, 401);
    const ban = new Request(`http://localhost/api/keys/${enabled.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isBanned: true, banReason: "policy_violation" }),
    });
    assert.equal((await PATCH(ban, { params: Promise.resolve({ id: enabled.id }) })).status, 401);
    assert.equal((await keys.getApiKeyById(enabled.id))?.isBanned, false);
  } finally {
    await updateSettings({ requireLogin: true });
  }
});
