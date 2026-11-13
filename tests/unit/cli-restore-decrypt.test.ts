// ENVIRONMENT NOTE: the storage.sqlite round trip builds a real better-sqlite3 database.
// It is skipped where the native addon cannot load (see tests/unit/_helpers/betterSqlite3Availability.ts).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { Readable } from "node:stream";
import {
  betterSqlite3Available,
  BETTER_SQLITE3_SKIP_REASON,
} from "./_helpers/betterSqlite3Availability.ts";

const { runBackupCommand, runRestoreCommand } = await import("../../bin/cli/commands/backup.mjs");
const Database = betterSqlite3Available() ? (await import("better-sqlite3")).default : null;

// `backup create --encrypt` writes `<name>.enc` payloads (scrypt + AES-256-GCM). Restore must
// decrypt them with the same passphrase, copy only after every file decrypts, and fail with a
// non-zero exit (live files untouched, no plaintext left behind) on a wrong key.

const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  TMPDIR: process.env.TMPDIR,
  OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
};
// Built from parts so no credential-shaped literal sits in the file.
const PASS = ["correct", "horse", "battery", "staple"].join(" ");
const WRONG = ["wrong", "horse", "battery", "staple"].join(" ");

async function withEnv(fn: (dataDir: string, scratch: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-restore-dec-"));
  const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-restore-tmp-"));
  process.env.DATA_DIR = dataDir;
  process.env.TMPDIR = scratch; // restore's temp dir lands here, so the test can look for leftovers
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:9"; // nothing listens: the server is down
  const { log, error } = console;
  console.log = () => {};
  console.error = () => {};
  try {
    await fn(dataDir, scratch);
  } finally {
    console.log = log;
    console.error = error;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

async function withStdin<T>(text: string, fn: () => Promise<T>): Promise<T> {
  const original = Object.getOwnPropertyDescriptor(process, "stdin");
  Object.defineProperty(process, "stdin", {
    value: Readable.from(text ? [text] : []),
    configurable: true,
  });
  try {
    return await fn();
  } finally {
    if (original) Object.defineProperty(process, "stdin", original);
    else delete (process as { stdin?: unknown }).stdin;
  }
}

function writeKey(dataDir: string, name: string, pass: string) {
  const keyFile = path.join(dataDir, name);
  fs.writeFileSync(keyFile, `${pass}\n`);
  return keyFile;
}

function seedLive(dataDir: string, value: string) {
  fs.writeFileSync(path.join(dataDir, "settings.json"), `{"v":"${value}"}`);
  fs.writeFileSync(path.join(dataDir, "combos.json"), `{"c":"${value}"}`);
}

function readLive(dataDir: string) {
  return ["settings.json", "combos.json"].map((f) =>
    fs.readFileSync(path.join(dataDir, f), "utf8")
  );
}

test("restore decrypts a backup made with --encrypt and --key-file", async () => {
  await withEnv(async (dataDir, scratch) => {
    const keyFile = writeKey(dataDir, "key.txt", PASS);
    seedLive(dataDir, "backup");
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    seedLive(dataDir, "live");

    assert.equal(await runRestoreCommand("enc", { yes: true, keyFile }), 0);

    assert.deepEqual(readLive(dataDir), ['{"v":"backup"}', '{"c":"backup"}']);
    assert.deepEqual(fs.readdirSync(scratch), [], "no decrypted copy may stay in the temp dir");
  });
});

test(
  "restore of an encrypted storage.sqlite brings the rows back",
  { skip: !Database && BETTER_SQLITE3_SKIP_REASON },
  async () => {
    await withEnv(async (dataDir) => {
      const live = path.join(dataDir, "storage.sqlite");
      const write = (value: string) => {
        fs.rmSync(live, { force: true });
        const db = new Database!(live);
        db.exec("CREATE TABLE t (v TEXT)");
        db.prepare("INSERT INTO t (v) VALUES (?)").run(value);
        db.close();
      };
      const keyFile = writeKey(dataDir, "key.txt", PASS);
      write("from-backup");
      assert.equal(await runBackupCommand({ name: "encdb", encrypt: true, keyFile }), 0);
      write("live");

      assert.equal(await runRestoreCommand("encdb", { yes: true, keyFile }), 0);

      const db = new Database!(live, { readonly: true });
      try {
        assert.deepEqual(db.prepare("SELECT v FROM t").all(), [{ v: "from-backup" }]);
      } finally {
        db.close();
      }
    });
  }
);

test("restore with the wrong key exits 1 and leaves the live files unchanged", async () => {
  await withEnv(async (dataDir, scratch) => {
    const keyFile = writeKey(dataDir, "key.txt", PASS);
    seedLive(dataDir, "backup");
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    seedLive(dataDir, "live");

    const wrongKey = writeKey(dataDir, "wrong.txt", WRONG);
    assert.equal(await runRestoreCommand("enc", { yes: true, keyFile: wrongKey }), 1);

    assert.deepEqual(readLive(dataDir), ['{"v":"live"}', '{"c":"live"}']);
    assert.deepEqual(
      fs.readdirSync(scratch),
      [],
      "a failed restore must not leave plaintext behind"
    );
  });
});

test("restore copies nothing when one payload is damaged, even if the others decrypt", async () => {
  await withEnv(async (dataDir) => {
    const keyFile = writeKey(dataDir, "key.txt", PASS);
    seedLive(dataDir, "backup");
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    seedLive(dataDir, "live");
    // combos.json comes after settings.json in the restore order: flip one ciphertext byte.
    const damaged = path.join(dataDir, "backups", "omniroute-backup-enc", "combos.json.enc");
    const bytes = fs.readFileSync(damaged);
    bytes[bytes.length - 1] ^= 0xff;
    fs.writeFileSync(damaged, bytes);

    assert.equal(await runRestoreCommand("enc", { yes: true, keyFile }), 1);

    assert.deepEqual(readLive(dataDir), ['{"v":"live"}', '{"c":"live"}']);
  });
});

test("restore asks for the passphrase when no key file is given", async () => {
  await withEnv(async (dataDir) => {
    const keyFile = writeKey(dataDir, "key.txt", PASS);
    seedLive(dataDir, "backup");
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    seedLive(dataDir, "live");

    const code = await withStdin(`${PASS}\n`, () => runRestoreCommand("enc", { yes: true }));

    assert.equal(code, 0);
    assert.deepEqual(readLive(dataDir), ['{"v":"backup"}', '{"c":"backup"}']);
  });
});

test("restore with no key file and no passphrase on stdin exits 1 and changes nothing", async () => {
  await withEnv(async (dataDir) => {
    const keyFile = writeKey(dataDir, "key.txt", PASS);
    seedLive(dataDir, "backup");
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    seedLive(dataDir, "live");

    const code = await withStdin("", () => runRestoreCommand("enc", { yes: true }));

    assert.equal(code, 1);
    assert.deepEqual(readLive(dataDir), ['{"v":"live"}', '{"c":"live"}']);
  });
});
