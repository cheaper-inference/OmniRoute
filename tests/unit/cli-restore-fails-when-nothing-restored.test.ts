import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const { runBackupCommand, runRestoreCommand } = await import("../../bin/cli/commands/backup.mjs");

// `omniroute restore` looked only for the plain payload names. An encrypted
// backup holds `<name>.enc` files, so nothing matched, no file was restored, and
// the command still printed "Restore complete." and returned 0. A restore that
// restores nothing must fail, and an encrypted backup it cannot decrypt (here: a
// wrong key) must fail before it touches the live data.

const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
const ORIGINAL_BASE_URL = process.env.OMNIROUTE_BASE_URL;

async function withDataDir(fn: (dataDir: string) => Promise<void>) {
  const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-cli-restore-"));
  process.env.DATA_DIR = dataDir;
  process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:9"; // nothing listens: restore needs the server down
  const { log, error } = console;
  console.log = () => {};
  console.error = () => {};
  try {
    await fn(dataDir);
  } finally {
    console.log = log;
    console.error = error;
    fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
    if (ORIGINAL_BASE_URL === undefined) delete process.env.OMNIROUTE_BASE_URL;
    else process.env.OMNIROUTE_BASE_URL = ORIGINAL_BASE_URL;
  }
}

test("restore of an encrypted backup with the wrong key fails and leaves the live data untouched", async () => {
  await withDataDir(async (dataDir) => {
    const settings = path.join(dataDir, "settings.json");
    const keyFile = path.join(dataDir, "key.txt");
    fs.writeFileSync(keyFile, "correct horse battery staple");
    fs.writeFileSync(settings, '{"from":"backup"}');
    assert.equal(await runBackupCommand({ name: "enc", encrypt: true, keyFile }), 0);
    assert.ok(
      fs.existsSync(path.join(dataDir, "backups", "omniroute-backup-enc", "settings.json.enc"))
    );

    fs.writeFileSync(settings, '{"from":"live"}');
    const wrongKey = path.join(dataDir, "wrong-key.txt");
    fs.writeFileSync(wrongKey, "not the backup passphrase");
    const code = await runRestoreCommand("enc", { yes: true, keyFile: wrongKey });

    assert.equal(code, 1, "an encrypted backup the restore cannot decrypt must not report success");
    assert.equal(fs.readFileSync(settings, "utf8"), '{"from":"live"}');
  });
});

test("restore that restores zero files fails", async () => {
  await withDataDir(async (dataDir) => {
    const empty = path.join(dataDir, "backups", "omniroute-backup-empty");
    fs.mkdirSync(empty, { recursive: true });
    fs.writeFileSync(
      path.join(empty, "backup-info.json"),
      JSON.stringify({ timestamp: new Date().toISOString(), encrypted: false, files: [] })
    );
    assert.equal(await runRestoreCommand("empty", { yes: true }), 1);
  });
});

test("restore of a plain backup still restores the files and returns 0", async () => {
  await withDataDir(async (dataDir) => {
    const settings = path.join(dataDir, "settings.json");
    fs.writeFileSync(settings, '{"from":"backup"}');
    assert.equal(await runBackupCommand({ name: "plain" }), 0);

    fs.writeFileSync(settings, '{"from":"live"}');
    assert.equal(await runRestoreCommand("plain", { yes: true }), 0);
    assert.equal(fs.readFileSync(settings, "utf8"), '{"from":"backup"}');
  });
});
