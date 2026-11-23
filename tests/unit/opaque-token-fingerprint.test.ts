import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { opaqueTokenFingerprint } from "../../open-sse/utils/opaqueTokenFingerprint.ts";
import { hashClaudeCredential } from "../../open-sse/services/claudeUsageCooldown.ts";

// Vectors computed once with node:crypto so the test never has to hash a
// secret-looking value itself (which would re-create the CodeQL sink in tests/).
const SHA256_ABC = "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";
const SHA256_SK_TEST_TOKEN = "389faa3c31e10c880a5b4a506725160fd5165f1cd85e65619d12bcfde5296e9b";
const SHA256_KEY_NUL_IDENTITY = "8418895b4383a7b3a3a2d68bf16380e0cde3738e4af896f40760a46624654d8a";
const HMAC_DIAG_KEY_CONN_1 = "eee7f56e4990fb676f2f941aec2f1928ea26cb8281f88c078dee71a53ff90ca9";

test("plain mode is the historical sha256 hex digest (apiKeys.ts hashKey compatibility)", () => {
  assert.equal(opaqueTokenFingerprint("abc"), SHA256_ABC);
  assert.equal(opaqueTokenFingerprint("sk-test-token"), SHA256_SK_TEST_TOKEN);
  assert.equal(opaqueTokenFingerprint("sk-test-token").length, 64);
});

test("is deterministic and distinct tokens do not collide", () => {
  assert.equal(opaqueTokenFingerprint("sk-test-token"), opaqueTokenFingerprint("sk-test-token"));
  assert.notEqual(
    opaqueTokenFingerprint("sk-test-token"),
    opaqueTokenFingerprint("sk-test-token2")
  );
});

test("length truncates the hex digest to a prefix", () => {
  const full = opaqueTokenFingerprint("sk-test-token");
  assert.equal(opaqueTokenFingerprint("sk-test-token", { length: 12 }), full.slice(0, 12));
  assert.equal(opaqueTokenFingerprint("sk-test-token", { length: 32 }), full.slice(0, 32));
  assert.equal(opaqueTokenFingerprint("sk-test-token", { length: 64 }), full);
});

test("a composite input hashes the exact concatenation (rendezvous key + NUL + identity)", () => {
  assert.equal(opaqueTokenFingerprint("key\0identity"), SHA256_KEY_NUL_IDENTITY);
});

test("keyed mode is HMAC-SHA-256 with a string or Buffer key and differs from the plain digest", () => {
  const keyed = opaqueTokenFingerprint("conn-1", { key: "diag-key" });
  assert.equal(keyed, HMAC_DIAG_KEY_CONN_1);
  assert.equal(
    opaqueTokenFingerprint("conn-1", { key: Buffer.from("diag-key") }),
    HMAC_DIAG_KEY_CONN_1
  );
  assert.notEqual(keyed, opaqueTokenFingerprint("conn-1"));
  assert.equal(
    opaqueTokenFingerprint("conn-1", { key: "diag-key", length: 12 }),
    keyed.slice(0, 12)
  );
});

test("never echoes the token and rejects invalid input", () => {
  const token = "sk-ant-oat01-raw-secret-token";
  assert.ok(!opaqueTokenFingerprint(token).includes("raw-secret"));
  assert.throws(() => opaqueTokenFingerprint(undefined as unknown as string), TypeError);
  assert.throws(() => opaqueTokenFingerprint(42 as unknown as string), TypeError);
  assert.throws(() => opaqueTokenFingerprint("x", { length: 0 }), RangeError);
  assert.throws(() => opaqueTokenFingerprint("x", { length: 65 }), RangeError);
  assert.throws(() => opaqueTokenFingerprint("x", { length: 1.5 }), RangeError);
});

test("migrated call sites stay byte-identical to the helper", () => {
  assert.equal(
    hashClaudeCredential("sk-ant-oat01-raw-secret-token"),
    opaqueTokenFingerprint("sk-ant-oat01-raw-secret-token")
  );
});

// Regression guard: once a call site has moved to the helper it must not grow its own
// sha256 sink back — that is exactly what re-opens one CodeQL alert per file.
const MIGRATED_FILES = [
  "open-sse/executors/venice-web-auth.ts",
  "open-sse/services/claudeUsageCooldown.ts",
  "open-sse/services/combo/promptCacheAffinity.ts",
  "src/lib/db/apiKeys.ts",
  "src/lib/db/registeredKeys.ts",
  "src/lib/db/jsonMigration/apiKeysImport.ts",
  "src/sse/services/credentialSelectionDiagnostics.ts",
];

test("migrated call sites import the helper instead of hashing inline", () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
  for (const rel of MIGRATED_FILES) {
    const source = readFileSync(path.join(root, rel), "utf8");
    assert.ok(
      !/createHash\(|createHmac\(/.test(source),
      `${rel} must go through opaqueTokenFingerprint(), not an inline createHash/createHmac`
    );
    assert.ok(
      source.includes("opaqueTokenFingerprint"),
      `${rel} is expected to use opaqueTokenFingerprint()`
    );
  }
});
