import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decryptFile, encryptFile } from "../../bin/cli/commands/sync-remote.mjs";

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
