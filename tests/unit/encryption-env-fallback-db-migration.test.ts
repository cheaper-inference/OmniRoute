// DBSEC-3: the startup migration on a real database when the key comes from a
// .env line that the reader before the first-"=" fix read differently. Each
// step runs in its own process, like a server restart, without the test
// markers that make the encryption module skip the .env fallback.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createDecipheriv, scryptSync } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPO = fileURLToPath(new URL("../../", import.meta.url));
const B64 = "q83vEjRWeJCrze8SNFZ4kKvN7xI0VniQq83vEjRWeJA=";
const OLD_READING = B64.slice(0, -1);
const TOKENS = ["fake-access-token", "fake-refresh-token", "fake-id-token"];

const CHILD = `
const [op, dataDir, home, repo] = process.argv.slice(2);
const inheritedKey = Object.hasOwn(process.env, "STORAGE_ENCRYPTION_KEY");
process.chdir(home);
const src = (p) => new URL(p, "file://" + repo).href;
const core = await import(src("src/lib/db/core.ts"));
const db = core.getDbInstance();
const providers = await import(src("src/lib/db/providers.ts"));
const secrets = await import(src("src/lib/db/secrets.ts"));
const out = { inheritedKey };
if (op === "respawn") {
  // Like \`pm2 restart omniroute --update-env\`: the new process gets this
  // process's environment, key included, and does not need to read .env.
  const { spawnSync } = await import("node:child_process");
  const next = spawnSync(process.execPath, [...process.execArgv, process.argv[1], "read", dataDir, home, repo], {
    cwd: repo, env: { ...process.env }, encoding: "utf8", timeout: 120_000,
  });
  process.stdout.write(next.stdout);
  process.stderr.write(next.stderr);
  process.exit(0);
}
if (op === "write") {
  const conn = await providers.createProviderConnection({
    provider: "openai", authType: "apikey", name: "dbsec3",
    apiKey: "sk-fake-apikey", providerSpecificData: { consoleApiKey: "fake-console-key" },
  });
  secrets.persistSecret("jwtSecret", "fake-jwt-secret");
  // OAuth tokens under the same key. The ID token is in the format from before
  // v3.7.9 (salt from the key's SHA-256), which the migration also rewrites.
  const enc = await import(src("src/lib/db/encryption.ts"));
  const crypto = await import("node:crypto");
  const secret = ${JSON.stringify(OLD_READING)}; // the key this step runs with
  const salt = crypto.createHash("sha256").update(secret).digest().subarray(0, 16);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-gcm", crypto.scryptSync(secret, salt, 32), iv);
  const body = cipher.update("fake-id-token", "utf8", "hex") + cipher.final("hex");
  const idToken = "enc:v1:" + iv.toString("hex") + ":" + body + ":" + cipher.getAuthTag().toString("hex");
  db.prepare("UPDATE provider_connections SET access_token = ?, refresh_token = ?, id_token = ? WHERE id = ?")
    .run(enc.encrypt("fake-access-token"), enc.encrypt("fake-refresh-token"), idToken, conn.id);
  out.id = conn.id;
} else {
  const row = db.prepare("SELECT * FROM provider_connections").get();
  const jwt = db.prepare("SELECT value FROM key_value WHERE namespace='secrets' AND key='jwtSecret'").get();
  out.rawApiKey = row.api_key;
  out.rawTokens = [row.access_token, row.refresh_token, row.id_token];
  out.rawConsoleKey = JSON.parse(row.provider_specific_data).consoleApiKey;
  out.rawJwt = JSON.parse(jwt.value);
  const conn = await providers.getProviderConnectionById(row.id);
  out.apiKey = conn.apiKey;
  out.tokens = [conn.accessToken, conn.refreshToken, conn.idToken];
  out.consoleKey = conn.providerSpecificData?.consoleApiKey ?? null;
  out.decryptFailed = !!conn.credentialDecryptFailed;
  out.jwt = secrets.getPersistedSecret("jwtSecret");
}
console.log("RESULT " + JSON.stringify(out));
process.exit(0);
`;

function decryptWithSecret(secret: string, ciphertext: unknown): string | null {
  if (typeof ciphertext !== "string" || !ciphertext.startsWith("enc:v1:")) return null;
  const [iv, body, tag] = ciphertext.slice("enc:v1:".length).split(":");
  try {
    const key = scryptSync(secret, "omniroute-field-encryption-v1", 32);
    const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "hex"), {
      authTagLength: 16,
    });
    decipher.setAuthTag(Buffer.from(tag, "hex"));
    return decipher.update(body, "hex", "utf8") + decipher.final("utf8");
  } catch {
    return null;
  }
}

test("startup re-encrypts provider tokens and keeps the rest readable", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "enc-env-db-"));
  const dataDir = path.join(root, "data");
  const home = path.join(root, "home");
  fs.mkdirSync(dataDir);
  fs.mkdirSync(home);
  const script = path.join(root, "child.mts");
  fs.writeFileSync(script, CHILD);

  const run = (op: string, envKey?: string) => {
    const env: NodeJS.ProcessEnv = { ...process.env, DATA_DIR: dataDir, HOME: home };
    for (const name of ["NODE_ENV", "NODE_TEST_CONTEXT", "VITEST", "STORAGE_ENCRYPTION_KEY"]) {
      delete env[name];
    }
    env.DISABLE_SQLITE_AUTO_BACKUP = "true";
    env.APP_LOG_TO_FILE = "false";
    if (envKey !== undefined) env.STORAGE_ENCRYPTION_KEY = envKey;
    const child = spawnSync(
      process.execPath,
      ["--import", "tsx/esm", script, op, dataDir, home, REPO],
      { cwd: REPO, env, encoding: "utf8", timeout: 120_000 }
    );
    const output = `${child.stdout}\n${child.stderr}`;
    const line = output.split("\n").find((l) => l.startsWith("RESULT "));
    assert.ok(line, output);
    return { result: JSON.parse(line.slice("RESULT ".length)), output };
  };

  try {
    // Before the fix, the .env fallback used the value cut at the second "=".
    run("write", OLD_READING);
    fs.writeFileSync(path.join(dataDir, ".env"), `STORAGE_ENCRYPTION_KEY=${B64}\n`);

    const first = run("read");
    assert.equal(first.result.inheritedKey, false);
    assert.match(first.output, /Auto-migrated 1 connection/);
    assert.equal(decryptWithSecret(B64, first.result.rawApiKey), "sk-fake-apikey");
    assert.deepEqual(
      first.result.rawTokens.map((raw: string) => decryptWithSecret(B64, raw)),
      TOKENS
    );
    assert.deepEqual(first.result.tokens, TOKENS);
    // providerSpecificData and key_value secrets are not rewritten at startup.
    assert.equal(decryptWithSecret(OLD_READING, first.result.rawConsoleKey), "fake-console-key");
    assert.equal(decryptWithSecret(OLD_READING, first.result.rawJwt), "fake-jwt-secret");
    assert.equal(first.result.apiKey, "sk-fake-apikey");
    assert.equal(first.result.consoleKey, "fake-console-key");
    assert.equal(first.result.jwt, "fake-jwt-secret");
    assert.equal(first.result.decryptFailed, false);

    const second = run("read");
    assert.doesNotMatch(second.output, /Auto-migrated/);
    assert.equal(second.result.consoleKey, "fake-console-key");
    assert.equal(second.result.jwt, "fake-jwt-secret");

    // A process started with the environment of one that loaded the key
    // from .env can still read what the startup migration left alone.
    const respawned = run("respawn");
    assert.equal(respawned.result.inheritedKey, true);
    assert.equal(respawned.result.apiKey, "sk-fake-apikey");
    assert.deepEqual(respawned.result.tokens, TOKENS);
    assert.equal(respawned.result.consoleKey, "fake-console-key");
    assert.equal(respawned.result.jwt, "fake-jwt-secret");
    assert.equal(respawned.result.decryptFailed, false);

    // What the warning says not to do: the old value in the process
    // environment cannot open the re-encrypted token.
    const oldInEnv = run("read", OLD_READING);
    assert.equal(oldInEnv.result.apiKey, null);
    assert.equal(oldInEnv.result.decryptFailed, true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
