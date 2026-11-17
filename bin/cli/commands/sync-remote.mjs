import { spawnSync } from "node:child_process";
import { createCipheriv, createDecipheriv, createHash, randomBytes, scryptSync } from "node:crypto";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createInterface } from "node:readline";
import { resolveDataDir } from "../data-dir.mjs";
import { runSyncImport, runSyncPull } from "./sync.mjs";

const MAGIC = "ORPSYNC1";
const CONFIG_NAME = "remote-sync.json";
const SAFE_TARGET = /^[A-Za-z0-9._\/:@-]+$/;
const DEFAULT_INTERVAL_MS = 60_000;

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

async function passwordFrom(opts) {
  const value = opts.password || process.env.OMNIROUTE_REMOTE_SYNC_PASSWORD;
  if (value) return value;
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question("Remote sync password: ", (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
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

function run(cmd, args, maxBuffer) {
  const result = spawnSync(cmd, args, { encoding: "utf8", maxBuffer: maxBuffer || 1 << 24 });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${cmd} failed: ${(result.stderr || result.stdout || "").trim()}`);
  }
  return result.stdout;
}

function splitTarget(target) {
  const sep = target.indexOf(":");
  if (sep < 1) throw new Error("target must be remote:path or owner/repo:path");
  return { repo: target.slice(0, sep), path: target.slice(sep + 1) };
}

function upload(localPath, config) {
  if (config.backend === "rclone") {
    run("rclone", ["copyto", localPath, config.target]);
    return;
  }
  const { repo, path } = splitTarget(config.target);
  const payload = join(mkdtempSync(join(tmpdir(), "omniroute-gh-")), "payload.json");
  try {
    let sha;
    try {
      const existing = run("gh", [
        "api",
        `repos/${repo}/contents/${path}`,
        "-f",
        `ref=${config.branch || "main"}`,
      ]);
      sha = JSON.parse(existing).sha;
    } catch {}
    writeFileSync(
      payload,
      JSON.stringify({
        message: "OmniRoute remote sync",
        content: readFileSync(localPath).toString("base64"),
        branch: config.branch || "main",
        ...(sha ? { sha } : {}),
      }),
      { mode: 0o600 }
    );
    run("gh", ["api", "--method", "PUT", "--input", payload, `repos/${repo}/contents/${path}`]);
  } finally {
    rmSync(payload, { force: true });
  }
}

function download(config, destPath) {
  if (config.backend === "rclone") {
    run("rclone", ["copyto", config.target, destPath]);
    return;
  }
  const { repo, path } = splitTarget(config.target);
  const json = run(
    "gh",
    ["api", `repos/${repo}/contents/${path}`, "-f", `ref=${config.branch || "main"}`],
    1 << 30
  );
  const parsed = JSON.parse(json);
  if (typeof parsed.content !== "string") throw new Error("remote bundle has no content");
  writeFileSync(destPath, Buffer.from(parsed.content.replace(/\s/g, ""), "base64"), {
    mode: 0o600,
    flag: "wx",
  });
}

export async function runSyncRemotePush(opts = {}) {
  const config = readConfig();
  const passphrase = await passwordFrom(opts);
  if (!passphrase) throw new Error("a password is required");

  const staging = mkdtempSync(join(tmpdir(), "omniroute-sync-"));
  try {
    const sqlite = join(staging, "storage.sqlite");
    const pullCode = await runSyncPull(sqlite);
    if (pullCode !== 0) return pullCode;
    const version = fileHash(sqlite);
    const envelopePath = join(staging, "envelope.json");
    const encryptedPath = join(staging, "bundle.enc");
    encryptFile(sqlite, encryptedPath, passphrase);
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
    upload(envelopePath, config);
    writeFileSync(statePath(), JSON.stringify({ lastPushedVersion: version }), { mode: 0o600 });
    console.log(`Pushed encrypted backup (version ${version.slice(0, 12)}).`);
    return 0;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

export async function runSyncRemotePull(opts = {}) {
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
    // Keep a timestamped local snapshot before the import overwrites the DB.
    const snapshot = join(staging, "pre-remote-restore.sqlite");
    await runSyncPull(snapshot);
    const code = await runSyncImport(sqlite);
    if (code === 0) {
      writeFileSync(statePath(), JSON.stringify({ lastPushedVersion: version }), { mode: 0o600 });
      console.log(`Restored encrypted backup (version ${version.slice(0, 12)}).`);
    }
    return code;
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
}

export async function runSyncRemoteDaemon(opts = {}) {
  const passphrase = await passwordFrom(opts);
  const interval = Number(opts.interval) || DEFAULT_INTERVAL_MS;
  console.log("Remote sync daemon started. Pulling on startup...");
  await runSyncRemotePull({ password: passphrase });
  for (;;) {
    await new Promise((resolve) => setTimeout(resolve, interval));
    const sqlite = join(mkdtempSync(join(tmpdir(), "omniroute-sync-")), "storage.sqlite");
    try {
      const code = await runSyncPull(sqlite);
      if (code !== 0) continue;
      const previous = existsSync(statePath())
        ? JSON.parse(readFileSync(statePath(), "utf8")).lastPushedVersion
        : null;
      if (fileHash(sqlite) !== previous) await runSyncRemotePush({ password: passphrase });
    } catch (err) {
      console.error(`sync daemon: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      rmSync(join(sqlite, ".."), { recursive: true, force: true });
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
      if (!["github", "rclone"].includes(opts.backend))
        throw new Error("--backend must be github or rclone");
      if (!opts.target || !SAFE_TARGET.test(opts.target)) throw new Error("invalid --target");
      try {
        writeConfig({
          backend: opts.backend,
          target: opts.target,
          branch: opts.branch,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        if (err.code === "EEXIST")
          throw new Error("already configured; delete " + configPath() + " first");
        throw err;
      }
      console.log("Remote sync configured: " + opts.backend);
    });

  remote.command("push").action(async (opts, cmd) => {
    const code = await runSyncRemotePush(cmd.optsWithGlobals());
    if (code) process.exit(code);
  });
  remote.command("pull").action(async (opts, cmd) => {
    const code = await runSyncRemotePull(cmd.optsWithGlobals());
    if (code) process.exit(code);
  });
  remote
    .command("daemon")
    .option("--interval <ms>", "poll interval in milliseconds", String(DEFAULT_INTERVAL_MS))
    .action(async (opts) => {
      await runSyncRemoteDaemon(opts);
    });
}
