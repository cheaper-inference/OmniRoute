import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

// Isolate DATA_DIR before importing the CLI module: its static import chain reaches
// contexts.mjs, whose module init reads the real config/keychain. The npm-test preload
// does not protect a standalone `node --test` invocation.
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-sync-data-"));
process.env.DATA_DIR = dataDir;
process.env.OMNIROUTE_DISABLE_KEYCHAIN = "1";

const { decryptFile, encryptFile } = await import("../../bin/cli/commands/sync-remote.mjs");

test.after(() => {
  rmSync(dataDir, { recursive: true, force: true });
});

function withTemp(fn) {
  const dir = mkdtempSync(join(tmpdir(), "omniroute-sync-test-"));
  try {
    return fn(dir);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test("encrypted sync bundle round-trips and leaves no plaintext", () => {
  withTemp((dir) => {
    const plain = join(dir, "storage.sqlite");
    const secret = "sk-provider-secret-value";
    writeFileSync(plain, Buffer.from(`provider_key=${secret}`));
    const enc = join(dir, "bundle.enc");
    encryptFile(plain, enc, "correct horse battery staple");
    const bytes = readFileSync(enc);
    assert.equal(bytes.subarray(0, 8).toString("ascii"), "ORPSYNC1");
    assert.equal(
      bytes.includes(Buffer.from(secret)),
      false,
      "plaintext secret must not appear in bundle"
    );
    const restored = join(dir, "restored.sqlite");
    decryptFile(enc, restored, "correct horse battery staple");
    assert.equal(readFileSync(restored).toString(), `provider_key=${secret}`);
  });
});

test("decrypt refuses a wrong password", () => {
  withTemp((dir) => {
    const plain = join(dir, "plain");
    writeFileSync(plain, "payload");
    const enc = join(dir, "enc");
    encryptFile(plain, enc, "right-password");
    assert.throws(
      () => decryptFile(enc, join(dir, "out"), "wrong-password"),
      /wrong password|tampered/
    );
  });
});

test("decrypt refuses a tampered bundle", () => {
  withTemp((dir) => {
    const plain = join(dir, "plain");
    writeFileSync(plain, "payload");
    const enc = join(dir, "enc");
    encryptFile(plain, enc, "password");
    const bytes = readFileSync(enc);
    bytes[bytes.length - 1] ^= 0xff;
    writeFileSync(enc, bytes);
    assert.throws(() => decryptFile(enc, join(dir, "out"), "password"), /wrong password|tampered/);
  });
});
