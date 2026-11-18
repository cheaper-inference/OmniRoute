import { spawnSync } from "node:child_process";
import { createCipheriv, createDecipheriv, createHash, randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { resolveDataDir } from "../data-dir.mjs";
import { runSyncExportSqlite, runSyncImport } from "./sync.mjs";

const MAGIC = "ORPSYNC1";
const CONFIG_NAME = "remote-sync.json";
const SAFE_TARGET = /^[A-Za-z0-9._/:@-]+$/;
const DEFAULT_INTERVAL_MS = 60_000;
const MIN_INTERVAL_MS = 1_000;
// setTimeout uses a signed 32-bit delay; larger values wrap into an immediate poll.
const MAX_INTERVAL_MS = 2_147_483_647;

/** Validate the daemon poll interval before it reaches setTimeout. */
export function parseIntervalMs(value = DEFAULT_INTERVAL_MS) {
  const interval = Number(value);
  if (!Number.isInteger(interval) || interval < MIN_INTERVAL_MS || interval > MAX_INTERVAL_MS) {
    throw new Error(
      `--interval must be an integer between ${MIN_INTERVAL_MS} and ${MAX_INTERVAL_MS} ms`
    );
  }
  return interval;
}

/** True when a remote target that used to hold a backup has disappeared. */
export function shouldRepublishMissingTarget(state, remoteVersionValue) {
  return remoteVersionValue === null && Boolean(state.lastPushedVersion);
}

function configPath() {
  return join(resolveDataDir(), CONFIG_NAME);
}

function statePath() {
  return join(resolveDataDir(), "remote-sync-state.json");
}

function readConfig() {
  const path = configPath();
  if (!existsSync(path)) {
    throw new Error("no remote sync configured; run: omniroute sync remote configure");
  }
  return JSON.parse(readFileSync(path, "utf8"));
}

function writeConfig(config) {
  mkdirSync(resolveDataDir(), { recursive: true });
  writeFileSync(configPath(), JSON.stringify(config, null, 2), { mode: 0o600, flag: "wx" });
}

function readState() {
  if (!existsSync(statePath())) return {};
  try {
    return JSON.parse(readFileSync(statePath(), "utf8"));
  } catch {
    return {};
  }
}

function writeState(state) {
  writeFileSync(statePath(), JSON.stringify(state), { mode: 0o600 });
}

/** Prompt without echoing the typed characters, then restore terminal mode. */
async function promptHidden(question) {
  const stdin = process.stdin;
  if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
    const rl = createInterface({ input: stdin, output: process.stdout });
    return new Promise((resolve) =>
      rl.question(question, (answer) => {
        rl.close();
        resolve(answer.trim());
      })
    );
  }
  process.stdout.write(question);
  return new Promise((resolve, reject) => {
    let value = "";
    const onData = (chunk) => {
      const text = chunk.toString("utf8");
      if (text === "\u0003") {
        cleanup();
        process.stdout.write("\n");
        reject(new Error("cancelled"));
        return;
      }
      if (text.includes("\r") || text.includes("\n")) {
        cleanup();
        process.stdout.write("\n");
        resolve(value);
        return;
      }
      for (const ch of text) {
        if (ch === "\u007f" || ch === "\b") {
          if (value.length > 0) value = value.slice(0, -1);
        } else {
          value += ch;
        }
      }
    };
    const cleanup = () => {
      stdin.setRawMode(false);
      stdin.pause();
      stdin.off("data", onData);
    };
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding("utf8");
    stdin.on("data", onData);
  });
}

async function passwordFrom(opts) {
  const value = opts.password || process.env.OMNIROUTE_REMOTE_SYNC_PASSWORD;
  if (value) return value;
  return promptHidden("Remote sync password: ");
}

/** AES-256-GCM with scrypt KDF. Header: MAGIC(8) + salt(16) + iv(12) + tag(16) + ciphertext. */
export function encryptFile(srcPath, destPath, passphrase) {
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = scryptSync(passphrase, salt, 32);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const input = readFileSync(srcPath);
  const ciphertext = Buffer.concat([cipher.update(input), cipher.final()]);
  const out = Buffer.concat([
    Buffer.from(MAGIC, "ascii"),
    salt,
    iv,
    cipher.getAuthTag(),
    ciphertext,
  ]);
  writeFileSync(destPath, out, { mode: 0o600, flag: "wx" });
  return out;
}

export function decryptFile(srcPath, destPath, passphrase) {
  const raw = readFileSync(srcPath);
  const header = Buffer.from(MAGIC, "ascii");
  if (
    raw.length < header.length + 44 ||
    raw.subarray(0, header.length).toString("ascii") !== MAGIC
  ) {
    throw new Error("not an OmniRoute encrypted sync bundle");
  }
  let offset = header.length;
  const salt = raw.subarray(offset, offset + 16);
  offset += 16;
  const iv = raw.subarray(offset, offset + 12);
  offset += 12;
  const tag = raw.subarray(offset, offset + 16);
  offset += 16;
  const key = scryptSync(passphrase, salt, 32);
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  let plaintext;
  try {
    plaintext = Buffer.concat([decipher.update(raw.subarray(offset)), decipher.final()]);
  } catch {
    throw new Error("wrong password or tampered bundle");
  }
  writeFileSync(destPath, plaintext, { mode: 0o600, flag: "wx" });
  return plaintext;
}

function fileHash(path) {
  return createHash("sha256").update(readFileSync(path)).digest("hex");
}

/** Refuse to encrypt/upload anything that is not a real SQLite database. */
function assertSqlite(path) {
  const buf = readFileSync(path);
  const header = buf.subarray(0, 16).toString("latin1");
  if (buf.length < 100 || header !== "SQLite format 3\u0000") {
    throw new Error("export is not a SQLite database; refusing to upload");
  }
}

function run(cmd, args, maxBuffer) {
  const result = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: maxBuffer || 1 << 24 });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${cmd} failed: ${(result.stderr || result.stdout || "").trim()}`);
  }
  return result.stdout;
}

function runBuffer(cmd, args) {
  const result = spawnSync(cmd, args, { encoding: "buffer", maxBuffer: 1 << 30 });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${cmd} failed: ${(result.stderr || "").toString().trim()}`);
  }
  return Buffer.from(result.stdout);
}

function splitTarget(target) {
  const sep = target.indexOf(":");
  if (sep < 1) throw new Error("target must be remote:path or owner/repo:path");
  return { repo: target.slice(0, sep), path: target.slice(sep + 1) };
}

function githubBranch(config) {
  return config.branch || "main";
}

function githubContentsUrl(config) {
  const { repo, path } = splitTarget(config.target);
  return `repos/${repo}/contents/${path}?ref=${encodeURIComponent(githubBranch(config))}`;
}

function remoteSha(config) {
  try {
    const json = run("gh", ["api", "--method", "GET", githubContentsUrl(config)]);
    return JSON.parse(json).sha || null;
  } catch {
    return null;
  }
}

function upload(localPath, config) {
  if (config.backend === "rclone") {
    run("rclone", ["copyto", localPath, config.target]);
    return;
  }
  const { repo, path } = splitTarget(config.target);
  const payloadPath = join(mkdtempSync(join(tmpdir(), "omniroute-gh-")), "payload.json");
  try {
    const sha = remoteSha(config);
    writeFileSync(
      payloadPath,
      JSON.stringify({
        message: "OmniRoute remote sync",
        content: readFileSync(localPath).toString("base64"),
        branch: githubBranch(config),
        ...(sha ? { sha } : {}),
      }),
      { mode: 0o600 }
    );
    // Use the Contents API path without the query string for the PUT.
    run("gh", ["api", "--method", "PUT", "--input", payloadPath, `repos/${repo}/contents/${path}`]);
  } finally {
    rmSync(payloadPath, { force: true });
  }
}

function download(config, destPath) {
  if (config.backend === "rclone") {
    run("rclone", ["copyto", config.target, destPath]);
    return;
  }
  const bytes = runBuffer("gh", [
    "api",
    "--method",
    "GET",
    "-H",
    "Accept: application/vnd.github.raw+json",
    githubContentsUrl(config),
  ]);
  writeFileSync(destPath, bytes, { mode: 0o600, flag: "wx" });
}

function buildEnvelope(sqlitePath, passphrase, stagingDir) {
  const version = fileHash(sqlitePath);
  const encryptedPath = join(stagingDir, "bundle.enc");
  encryptFile(sqlitePath, encryptedPath, passphrase);
  const envelopePath = join(stagingDir, "envelope.json");
  writeFileSync(
    envelopePath,
    JSON.stringify({
      format: 1,
      version,
      createdAt: new Date().toISOString(),
      encrypted: "aes-256-gcm+scrypt",
      content: readFileSync(encryptedPath).toString("base64"),
    }),
    { mode: 0o600 }
  );
  return { envelopePath, version };
}

export async function runSyncRemotePush(options = {}) {
  const opts = options.opts || {};
  const config = readConfig();
  const passphrase = await passwordFrom(opts);
  if (!passphrase) throw new Error("a password is required");

  const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
  try {
    const sqlite = join(staging, "storage.sqlite");
    const exportCode = await runSyncExportSqlite(sqlite, opts);
    if (exportCode !== 0) return exportCode;
    assertSqlite(sqlite);
    const { envelopePath, version } = buildEnvelope(sqlite, passphrase, staging);
    upload(envelopePath, config);
    writeState({ ...readState(), lastPushedVersion: version });
    console.log(`Pushed encrypted backup (version ${version.slice(0, 12)}).`);
    return 0;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

export async function runSyncRemotePull(options = {}) {
  const opts = options.opts || {};
  const config = readConfig();
  const passphrase = await passwordFrom(opts);
  if (!passphrase) throw new Error("a password is required");

  const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
  try {
    const envelopePath = join(staging, "envelope.json");
    download(config, envelopePath);
    const envelope = JSON.parse(readFileSync(envelopePath, "utf8"));
    if (envelope.format !== 1 || !envelope.content) throw new Error("unsupported remote bundle");
    const encryptedPath = join(staging, "bundle.enc");
    writeFileSync(encryptedPath, Buffer.from(envelope.content, "base64"), { mode: 0o600 });
    const sqlite = join(staging, "storage.sqlite");
    decryptFile(encryptedPath, sqlite, passphrase);
    const version = fileHash(sqlite);
    if (envelope.version && envelope.version !== version) {
      throw new Error("bundle checksum mismatch; refusing to import");
    }
    // Snapshot the current database to a persistent path before the import overwrites it.
    const backupsDir = join(resolveDataDir(), "backups");
    mkdirSync(backupsDir, { recursive: true });
    const snapshot = join(backupsDir, `pre-remote-restore-${Date.now()}.sqlite`);
    const snapshotCode = await runSyncExportSqlite(snapshot, opts);
    if (snapshotCode !== 0) throw new Error("pre-restore snapshot failed; aborting pull");
    console.log(`Pre-restore snapshot: ${snapshot}`);
    // Re-check the live DB immediately before replacing it. A write that lands
    // between the daemon's hash and this import must not be silently discarded.
    if (opts.expectedLocalHash) {
      const currentHash = await localDatabaseHash(opts);
      if (currentHash !== opts.expectedLocalHash) {
        throw new Error("local database changed during remote pull; refusing to replace it");
      }
    }
    const code = await runSyncImport(sqlite, {}, opts);
    if (code === 0) {
      writeState({ ...readState(), lastPushedVersion: version });
      console.log(`Restored encrypted backup (version ${version.slice(0, 12)}).`);
    }
    return code;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

/** Export the live database and hash it; used to detect writes during a remote pull. */
async function localDatabaseHash(opts) {
  const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
  try {
    const sqlite = join(staging, "storage.sqlite");
    const code = await runSyncExportSqlite(sqlite, opts);
    if (code !== 0) throw new Error("local database export failed during sync check");
    return fileHash(sqlite);
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

function remoteVersion(config) {
  const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
  try {
    const envelopePath = join(staging, "envelope.json");
    download(config, envelopePath);
    return JSON.parse(readFileSync(envelopePath, "utf8")).version || null;
  } catch {
    return null;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

export async function runSyncRemoteDaemon(options = {}) {
  const opts = options.opts || {};
  const passphrase = await passwordFrom(opts);
  const interval = parseIntervalMs(opts.interval ?? DEFAULT_INTERVAL_MS);
  console.log("Remote sync daemon starting. Restoring from remote first...");

  let baseline = false;
  for (let attempt = 0; attempt < 3 && !baseline; attempt++) {
    try {
      baseline = (await runSyncRemotePull({ opts: { ...opts, password: passphrase } })) === 0;
    } catch (err) {
      console.error(`startup restore failed: ${err instanceof Error ? err.message : String(err)}`);
    }
    if (!baseline) await new Promise((r) => setTimeout(r, 5000));
  }
  if (!baseline) throw new Error("startup restore failed; refusing to push over the remote backup");

  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    const config = readConfig();
    try {
      const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
      let localHash;
      try {
        const sqlite = join(staging, "storage.sqlite");
        const code = await runSyncExportSqlite(sqlite, opts);
        if (code !== 0) continue;
        localHash = fileHash(sqlite);
      } finally {
        rmSync(staging, { recursive: true, force: true });
      }
      const state = readState();
      const remote = remoteVersion(config);
      if (localHash !== state.lastPushedVersion) {
        await runSyncRemotePush({ opts: { ...opts, password: passphrase } });
      } else if (remote && remote !== state.lastPushedVersion) {
        await runSyncRemotePull({
          opts: { ...opts, password: passphrase, expectedLocalHash: localHash },
        });
      } else if (shouldRepublishMissingTarget(state, remote)) {
        // The configured file was deleted remotely: re-establish the backup
        // from local state instead of silently running without one.
        await runSyncRemotePush({ opts: { ...opts, password: passphrase } });
      }
    } catch (err) {
      console.error(`sync daemon: ${err instanceof Error ? err.message : String(err)}`);
    }
  }
}

export function registerSyncRemote(program) {
  const sync = program.commands.find((command) => command.name() === "sync");
  if (!sync) throw new Error("sync command is not registered");
  const remote = sync
    .command("remote")
    .description("Free encrypted config sync to your own storage");

  remote
    .command("configure")
    .option("--backend <github|rclone>", "storage backend")
    .option("--target <target>", "owner/repo:path or remote:path")
    .option("--branch <branch>", "github branch (default main)", "main")
    .action((opts) => {
      if (!["github", "rclone"].includes(opts.backend)) {
        throw new Error("--backend must be github or rclone");
      }
      if (!opts.target || !SAFE_TARGET.test(opts.target)) throw new Error("invalid --target");
      try {
        writeConfig({
          backend: opts.backend,
          target: opts.target,
          branch: opts.branch,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        if (err.code === "EEXIST") {
          throw new Error("already configured; delete " + configPath() + " first");
        }
        throw err;
      }
      console.log("Remote sync configured: " + opts.backend);
    });

  remote.command("push").action(async (opts, cmd) => {
    const code = await runSyncRemotePush({ opts: cmd.optsWithGlobals() });
    if (code) process.exit(code);
  });
  remote.command("pull").action(async (opts, cmd) => {
    const code = await runSyncRemotePull({ opts: cmd.optsWithGlobals() });
    if (code) process.exit(code);
  });
  remote
    .command("daemon")
    .option("--interval <ms>", "poll interval in milliseconds", String(DEFAULT_INTERVAL_MS))
    .action(async (opts, cmd) => {
      await runSyncRemoteDaemon({ opts: { ...cmd.optsWithGlobals(), interval: opts.interval } });
    });
}
