import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { upsertApiKeyProviderConnection } from "../../../bin/cli/provider-store.mjs";
import {
  backupSqliteFile,
  normalizeBunSqliteParams,
  openOmniRouteDb,
} from "../../../bin/cli/sqlite.mjs";

test("CLI Bun SQLite parameter normalization preserves binary values", () => {
  const typedArray = new Uint8Array([1, 2, 3]);
  const buffer = Buffer.from([4, 5, 6]);

  assert.deepEqual(normalizeBunSqliteParams([typedArray]), [typedArray]);
  assert.deepEqual(normalizeBunSqliteParams([buffer]), [buffer]);
});

test("CLI Bun SQLite parameter normalization expands named object keys", () => {
  assert.deepEqual(normalizeBunSqliteParams([{ id: 7 }]), [{ "@id": 7, ":id": 7, $id: 7 }]);
});

test("CLI Bun SQLite backs up physical files without serializing them", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const sourcePath = path.join(os.tmpdir(), `cli-bun-sqlite-source-${Date.now()}.sqlite`);
  const destinationPath = path.join(os.tmpdir(), `cli-bun-sqlite-destination-${Date.now()}.sqlite`);
  t.after(() => {
    for (const filePath of [sourcePath, destinationPath]) {
      try {
        fs.unlinkSync(filePath);
      } catch {}
    }
  });

  const { Database } = await import("bun:sqlite");
  const source = new Database(sourcePath);
  source.exec("CREATE TABLE items (value TEXT); INSERT INTO items VALUES ('copied')");
  source.close();

  await backupSqliteFile(sourcePath, destinationPath);

  const destination = new Database(destinationPath, { readonly: true });
  assert.equal(destination.query("SELECT value FROM items").get().value, "copied");
  destination.close();
});

test("CLI Bun SQLite creates a connection when the proxy default was never saved", async (t) => {
  if (!process.versions.bun) {
    t.skip("bun:sqlite is only available under Bun");
    return;
  }

  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "cli-bun-sqlite-proxy-default-"));
  const previousDataDir = process.env.DATA_DIR;
  process.env.DATA_DIR = dataDir;
  const { db } = await openOmniRouteDb();
  t.after(() => {
    db.close();
    if (previousDataDir === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = previousDataDir;
    fs.rmSync(dataDir, { recursive: true, force: true });
  });

  const connection = upsertApiKeyProviderConnection(db, {
    provider: "openai",
    name: "Bun synthetic",
    apiKey: "sk-bun-synthetic",
  });

  assert.equal(connection.proxyEnabled, true);
  assert.equal(
    db.prepare("SELECT proxy_enabled FROM provider_connections WHERE id = ?").get(connection.id)
      .proxy_enabled,
    1
  );
});
