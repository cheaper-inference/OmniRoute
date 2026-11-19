// #20418 — `omniroute sync remote` asks `GET /api/db-backups/export` for the history-free
// copy (`?portable=true`) for everything it uploads or hashes against an uploaded version,
// while the pre-restore safety snapshot taken by `pull` stays the complete export (the
// bundle being imported carries no usage/call-log history, so that snapshot is the only
// copy of it). Driven end to end with `fetch` stubbed and a fake `rclone` on PATH.
import test from "node:test";
import assert from "node:assert/strict";
import {
  chmodSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { delimiter, join } from "node:path";

// Isolate DATA_DIR before importing the CLI modules: their static import chain reaches
// contexts.mjs, whose module init reads the real config/keychain.
const root = mkdtempSync(join(tmpdir(), "omniroute-sync-portable-"));
const dataDir = join(root, "data");
mkdirSync(dataDir, { recursive: true });
const ORIGINAL_ENV = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED: process.env.OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED,
  OMNIROUTE_BASE_URL: process.env.OMNIROUTE_BASE_URL,
  OMNIROUTE_CLI_TOKEN: process.env.OMNIROUTE_CLI_TOKEN,
  OMNIROUTE_API_KEY: process.env.OMNIROUTE_API_KEY,
  OMNIROUTE_REMOTE_SYNC_PASSWORD: process.env.OMNIROUTE_REMOTE_SYNC_PASSWORD,
  FAKE_RCLONE_STORE: process.env.FAKE_RCLONE_STORE,
  PATH: process.env.PATH,
};
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_CONTEXT_KEYCHAIN_DISABLED = "1";
process.env.OMNIROUTE_BASE_URL = "http://127.0.0.1:20999";
process.env.OMNIROUTE_CLI_TOKEN = "test-cli-token-sync-remote";
delete process.env.OMNIROUTE_API_KEY;

const { exportSqlitePath, runSyncExportSqlite } = await import("../../bin/cli/commands/sync.mjs");
const { runSyncRemotePull, runSyncRemotePush } =
  await import("../../bin/cli/commands/sync-remote.mjs");

// The remote-sync CLI refuses anything that is not a SQLite file (header + >= 100 bytes).
const SQLITE_BYTES = Buffer.concat([
  Buffer.from("SQLite format 3\u0000", "latin1"),
  Buffer.alloc(4080),
]);

test.after(() => {
  for (const [key, value] of Object.entries(ORIGINAL_ENV)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  rmSync(root, { recursive: true, force: true });
});

/** Stub fetch for the duration of `fn`, answering the export and import routes. */
async function withStubbedServer(fn) {
  const calls = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = async (url, init = {}) => {
    const parsed = new URL(String(url));
    calls.push({ method: String(init.method ?? "GET").toUpperCase(), url: parsed });
    if (parsed.pathname === "/api/db-backups/export") {
      return new Response(SQLITE_BYTES, {
        status: 200,
        headers: { "Content-Type": "application/octet-stream" },
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
  try {
    await fn();
  } finally {
    globalThis.fetch = origFetch;
  }
  return calls.filter((call) => call.url.pathname === "/api/db-backups/export");
}

/** A fake `rclone copyto <src> <dst>` backed by one local file ($FAKE_RCLONE_STORE). */
function installFakeRclone() {
  const binDir = join(root, "bin");
  mkdirSync(binDir, { recursive: true });
  const script = join(binDir, "rclone");
  writeFileSync(
    script,
    [
      "#!/bin/sh",
      'case "$2" in',
      '  fake:*) cp "$FAKE_RCLONE_STORE" "$3" ;;',
      '  *) cp "$2" "$FAKE_RCLONE_STORE" ;;',
      "esac",
      "",
    ].join("\n")
  );
  chmodSync(script, 0o755);
  process.env.FAKE_RCLONE_STORE = join(root, "remote-bundle.json");
  process.env.PATH = `${binDir}${delimiter}${ORIGINAL_ENV.PATH ?? ""}`;
  writeFileSync(
    join(dataDir, "remote-sync.json"),
    JSON.stringify({ backend: "rclone", target: "fake:omniroute/bundle.json" })
  );
  process.env.OMNIROUTE_REMOTE_SYNC_PASSWORD = "correct horse battery staple";
}

test("the export route path only carries portable=true when asked", () => {
  assert.equal(exportSqlitePath(), "/api/db-backups/export");
  assert.equal(exportSqlitePath({ portable: false }), "/api/db-backups/export");
  assert.equal(exportSqlitePath({ portable: true }), "/api/db-backups/export?portable=true");
});

test("runSyncExportSqlite keeps the complete export by default", async () => {
  const dir = mkdtempSync(join(root, "export-"));
  const exports = await withStubbedServer(async () => {
    assert.equal(await runSyncExportSqlite(join(dir, "full.sqlite")), 0);
    assert.equal(
      await runSyncExportSqlite(join(dir, "portable.sqlite"), {}, { portable: true }),
      0
    );
  });
  assert.deepEqual(
    exports.map((call) => call.url.search),
    ["", "?portable=true"]
  );
  assert.deepEqual(readFileSync(join(dir, "full.sqlite")), SQLITE_BYTES);
});

test(
  "sync remote push uploads the portable export; pull snapshots the complete one first",
  { skip: process.platform === "win32" && "fake rclone is a POSIX shell script" },
  async () => {
    installFakeRclone();

    const pushExports = await withStubbedServer(async () => {
      assert.equal(await runSyncRemotePush({ opts: {} }), 0);
    });
    assert.deepEqual(
      pushExports.map((call) => call.url.search),
      ["?portable=true"],
      "push must upload the history-free copy"
    );
    const envelope = JSON.parse(readFileSync(process.env.FAKE_RCLONE_STORE, "utf8"));
    assert.equal(envelope.format, 1);

    const pullExports = await withStubbedServer(async () => {
      assert.equal(await runSyncRemotePull({ opts: {} }), 0);
    });
    assert.deepEqual(
      pullExports.map((call) => call.url.search),
      [""],
      "the pre-restore snapshot must be the complete export"
    );
    const snapshots = readdirSync(join(dataDir, "backups"));
    assert.equal(snapshots.length, 1);
    assert.match(snapshots[0], /^pre-remote-restore-\d+\.sqlite$/);
  }
);
