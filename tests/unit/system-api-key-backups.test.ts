import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test, { before, describe } from "node:test";
import { NextRequest } from "next/server";
import { x as extractTar } from "tar";

import {
  createManagementSessionHeaders,
  makeManagementSessionRequest,
} from "../helpers/managementSession.ts";

const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-system-key-backups-"));
const dataDir = path.join(scratch, "data");
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "system-key-backup-test-api-key";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
process.env.APP_LOG_TO_FILE = "false";
process.env.CLOUD_URL = "false";
process.env.REQUIRE_API_KEY = "true";
delete process.env.INITIAL_PASSWORD;
delete process.env.OMNIROUTE_API_KEY;
delete process.env.ROUTER_API_KEY;

const { getDbInstance, resetDbInstance, DB_BACKUPS_DIR } = await import("@/lib/db/core");
const { openDatabaseAsync } = await import("@/lib/db/adapters/driverFactory");
const { createApiKey, createSystemApiKey, resolveSystemApiKey } = await import("@/lib/db/apiKeys");
const { backfillApiKeySecretsAtRest, decryptApiKeySecret } =
  await import("@/lib/db/apiKeys/secretAtRest");
const { backupDbFileAwaited, SCRUBBED_SYSTEM_API_KEY_MARKER } = await import("@/lib/db/backup");
const { updateSettings } = await import("@/lib/db/settings");
const { getCallLogsDir } = await import("@/lib/usage/callLogArtifacts");
const { runAuthzPipeline } = await import("@/server/authz/pipeline");
const sqliteExport = await import("@/app/api/db-backups/export/route");
const fullExport = await import("@/app/api/db-backups/exportAll/route");
const sqliteImport = await import("@/app/api/db-backups/import/route");

type KeyRow = {
  id: string;
  name: string;
  key: string;
  key_prefix: string;
  key_hash: string;
  source: string;
};

type SystemKey = { row: KeyRow; secret: string };

function readKey(db: ReturnType<typeof getDbInstance>, id: string) {
  const row = db
    .prepare<KeyRow>(
      "SELECT id, name, key, key_prefix, key_hash, source FROM api_keys WHERE id = ?"
    )
    .get(id);
  assert.ok(row, "API key row exists");
  return row;
}

function assertSecretAbsent(bytes: Buffer, keys: SystemKey[], entry: string) {
  for (const { secret, row } of keys) {
    assert.equal(bytes.includes(secret), false, `${entry} contains a plaintext system secret`);
    assert.equal(bytes.includes(row.key), false, `${entry} contains a stored system secret`);
    assert.equal(bytes.includes(secret.slice(0, 8)), false, `${entry} contains a system prefix`);
  }
}

async function operator(action: "export" | "exportAll") {
  const request = await makeManagementSessionRequest(`http://localhost/api/db-backups/${action}`);
  return new NextRequest(request);
}

async function downloadFullExport() {
  const response = await fullExport.GET(await operator("exportAll"));
  assert.equal(response.status, 200);
  const payload = fs.mkdtempSync(path.join(scratch, "payload-"));
  const archive = `${payload}.tar.gz`;
  fs.writeFileSync(archive, Buffer.from(await response.arrayBuffer()));
  await extractTar({ file: archive, cwd: payload, strip: 1, strict: true });
  return payload;
}

async function importDatabase(bytes: Uint8Array<ArrayBuffer>) {
  const headers = await createManagementSessionHeaders({
    "content-type": "application/octet-stream",
  });
  const response = await sqliteImport.POST(
    new Request("http://localhost/api/db-backups/import", { method: "POST", headers, body: bytes })
  );
  assert.equal(response.status, 200, await response.clone().text());
  assert.equal((await response.json()).imported, true);
}

async function assertClientAuthStatus(key: string, status: number) {
  for (const headers of [{ authorization: `Bearer ${key}` }, { "x-api-key": key }]) {
    const req = new NextRequest("http://localhost/api/v1/chat/completions", {
      method: "POST",
      headers,
    });
    assert.equal((await runAuthzPipeline(req, { enforce: true })).status, status);
  }
}

function readApiKeysSchema(db: ReturnType<typeof getDbInstance>) {
  return db
    .prepare<{ type: string; name: string; sql: string | null }>(
      `SELECT type, name, sql FROM sqlite_schema
       WHERE tbl_name = 'api_keys' AND type IN ('table', 'index', 'trigger')
       ORDER BY type, name`
    )
    .all();
}

async function assertDownloadDatabase(file: string, keys: SystemKey[], ordinary: KeyRow) {
  const db = await openDatabaseAsync(file, { readonly: true });
  try {
    assert.deepEqual(readApiKeysSchema(db), readApiKeysSchema(getDbInstance()));
    for (const { row } of keys) {
      const downloaded = readKey(db, row.id);
      const marker = SCRUBBED_SYSTEM_API_KEY_MARKER + row.id;
      assert.equal(downloaded.key === marker, true, "system secret is replaced by its marker");
      assert.equal(downloaded.key_prefix === "", true, "system key prefix is blank");
      assert.deepEqual(downloaded, { ...row, key: marker, key_prefix: "" });
    }
    assert.deepEqual(readKey(db, ordinary.id), ordinary);
    assert.equal(db.pragma("integrity_check", { simple: true }), "ok");
    assert.deepEqual(db.pragma("foreign_key_check"), []);
    assert.ok(
      db.prepare("SELECT 1 FROM api_key_context_sources WHERE api_key_id = ?").get(keys[0].row.id),
      "the system key still has its associated row"
    );
  } finally {
    db.close();
  }
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(scratch, { recursive: true, force: true });
});

for (const encrypted of [false, true]) {
  describe(encrypted ? "with STORAGE_ENCRYPTION_KEY" : "without STORAGE_ENCRYPTION_KEY", () => {
    const systemKeys: SystemKey[] = [];
    let ordinary: KeyRow;
    let ordinarySecret: string;

    before(async () => {
      fs.mkdirSync(dataDir, { recursive: true });
      if (encrypted) process.env.STORAGE_ENCRYPTION_KEY = "system-key-backup-test-encryption";
      else delete process.env.STORAGE_ENCRYPTION_KEY;
      await updateSettings({ requireLogin: true, setupComplete: true });

      const db = getDbInstance();
      const client = await createApiKey("Ordinary", "backup-test");
      ordinary = readKey(db, client.id);
      ordinarySecret = client.key;
      for (const name of ["System inference", "System evaluation"]) {
        const { id } = await createSystemApiKey(name, "backup-test");
        const binding = await resolveSystemApiKey(id);
        assert.ok(binding, "system key creation produces a usable server binding");
        systemKeys.push({ row: readKey(db, id), secret: binding.apiKey });
      }
      db.prepare("INSERT INTO api_key_context_sources (api_key_id, source_type) VALUES (?, ?)").run(
        systemKeys[0].row.id,
        "obsidian"
      );

      const callLogsDir = getCallLogsDir();
      assert.ok(callLogsDir);
      fs.mkdirSync(path.join(callLogsDir, "sample"), { recursive: true });
      fs.writeFileSync(path.join(callLogsDir, "sample", "call.json"), '{"status":200}');
    });

    test.after(() => {
      resetDbInstance();
      fs.rmSync(dataDir, { recursive: true, force: true });
    });

    async function assertLiveKeys() {
      for (const { row, secret } of systemKeys) {
        assert.equal(row.key.startsWith("enc:v1:"), encrypted, "selected at-rest storage mode");
        assert.equal(
          row.key === secret,
          !encrypted,
          "plaintext is stored only in passthrough mode"
        );
        assert.equal(
          readKey(getDbInstance(), row.id).key === row.key,
          true,
          "live storage survives"
        );
        assert.equal((await resolveSystemApiKey(row.id))?.apiKey === secret, true, "live binding");
      }
    }

    test("SQLite export removes secret bytes while keeping both system rows and the ordinary key", async () => {
      const response = await sqliteExport.GET(await operator("export"));
      assert.equal(response.status, 200);
      const bytes = Buffer.from(await response.arrayBuffer());
      await assertLiveKeys();
      assertSecretAbsent(bytes, systemKeys, "downloaded SQLite");
      const file = path.join(scratch, `export-${encrypted}.sqlite`);
      fs.writeFileSync(file, bytes);
      await assertDownloadDatabase(file, systemKeys, ordinary);
    });

    test("full export removes system credentials from every member and blanks summary prefixes", async () => {
      const payload = await downloadFullExport();
      await assertLiveKeys();

      const members = fs.readdirSync(payload, { recursive: true, withFileTypes: true });
      const files = members
        .filter((member) => member.isFile())
        .map((member) => path.relative(payload, path.join(member.parentPath, member.name)))
        .sort();
      assert.deepEqual(files, [
        "api-keys.json",
        path.join("call_logs", "sample", "call.json"),
        "combos.json",
        "metadata.json",
        "providers.json",
        "reasoning-routing-rules.json",
        "settings.json",
        "storage.sqlite",
      ]);

      const summary = JSON.parse(fs.readFileSync(path.join(payload, "api-keys.json"), "utf8")) as {
        id: string;
        prefix: string;
      }[];
      for (const { row } of systemKeys) {
        const entry = summary.find(({ id }) => id === row.id);
        assert.ok(entry, "system metadata is retained");
        assert.equal(entry.prefix === "", true, "system summary prefix is blank");
      }
      assert.equal(summary.find(({ id }) => id === ordinary.id)?.prefix, ordinary.key.slice(0, 8));
      for (const file of files) {
        assertSecretAbsent(fs.readFileSync(path.join(payload, file)), systemKeys, file);
      }
      await assertDownloadDatabase(path.join(payload, "storage.sqlite"), systemKeys, ordinary);
    });

    test("private manual snapshots keep the stored system credentials", async () => {
      const result = await backupDbFileAwaited("manual", { mandatory: true });
      assert.ok(result);
      const db = await openDatabaseAsync(path.join(DB_BACKUPS_DIR, result.filename), {
        readonly: true,
      });
      try {
        for (const { row } of systemKeys) {
          assert.equal(readKey(db, row.id).key === row.key, true, "private snapshot keeps secret");
        }
      } finally {
        db.close();
      }
    });

    for (const [action, handler] of [
      ["export", sqliteExport.GET],
      ["exportAll", fullExport.GET],
    ] as const) {
      test(`${action} fails closed and removes staging files when the copy cannot be scrubbed`, async (t) => {
        let tmpPath: string | undefined;
        t.mock.method(getDbInstance(), "backup", async (destination: string) => {
          tmpPath = destination;
          fs.writeFileSync(destination, "invalid SQLite data");
        });

        const response = await handler(await operator(action));
        const body = await response.text();
        assert.equal(response.status, 500);
        assert.equal(response.headers.has("content-disposition"), false);
        assert.match(response.headers.get("content-type") ?? "", /application\/json/);
        assert.doesNotMatch(body, /"stack"|\n\s*at |invalid SQLite data/);
        assert.ok(tmpPath, "the backup reached the copy stage");
        const tmpDir =
          action === "export" ? path.dirname(tmpPath) : path.dirname(path.dirname(tmpPath));
        assert.equal(fs.existsSync(tmpDir), false, "staging directory was removed");
      });
    }

    test("both downloads can be imported without restoring usable system credentials", async (t) => {
      const response = await sqliteExport.GET(await operator("export"));
      assert.equal(response.status, 200);
      const sqliteBytes = new Uint8Array(await response.arrayBuffer());
      const payload = await downloadFullExport();
      const fullExportBytes = new Uint8Array(fs.readFileSync(path.join(payload, "storage.sqlite")));

      for (const [action, bytes] of [
        ["export", sqliteBytes],
        ["exportAll", fullExportBytes],
      ] as const) {
        await t.test(action, async () => {
          await importDatabase(bytes);
          const db = getDbInstance();
          backfillApiKeySecretsAtRest(db);

          for (const { row } of systemKeys) {
            const restored = readKey(db, row.id);
            const marker = SCRUBBED_SYSTEM_API_KEY_MARKER + row.id;
            assert.equal(restored.source, "system");
            assert.equal(restored.key_hash, row.key_hash);
            assert.equal(restored.key.startsWith("enc:v1:"), encrypted);
            assert.equal(decryptApiKeySecret(restored.key) === marker, true);
            assert.equal(await resolveSystemApiKey(row.id), null);
            await assertClientAuthStatus(marker, 401);
          }
          await assertClientAuthStatus(ordinarySecret, 200);
        });
      }
    });
  });
}
