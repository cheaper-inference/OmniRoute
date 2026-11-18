import test from "node:test";
import assert from "node:assert/strict";

const totp = await import("../../src/lib/auth/totp.ts");
const backupCodes = await import("../../src/lib/auth/backupCodes.ts");

// RFC 6238 Appendix B / RFC 4226 Appendix D use the ASCII seed "12345678901234567890".
const RFC_SEED = Buffer.from("12345678901234567890", "ascii");

test("base32 round-trips the RFC 4648 §10 vectors (unpadded)", () => {
  const vectors: Array<[string, string]> = [
    ["", ""],
    ["f", "MY"],
    ["fo", "MZXQ"],
    ["foo", "MZXW6"],
    ["foob", "MZXW6YQ"],
    ["fooba", "MZXW6YTB"],
    ["foobar", "MZXW6YTBOI"],
  ];
  for (const [plain, encoded] of vectors) {
    assert.equal(totp.base32Encode(Buffer.from(plain, "ascii")), encoded, plain);
    assert.equal(totp.base32Decode(encoded).toString("ascii"), plain, encoded);
  }
  // Padding, lowercase and spaces are tolerated on decode.
  assert.equal(totp.base32Decode("mzxw 6ytb oi======").toString("ascii"), "foobar");
  assert.throws(() => totp.base32Decode("MZXW1"), /Invalid base32/);
});

test("HOTP matches the RFC 4226 Appendix D values", () => {
  const expected = [
    "755224",
    "287082",
    "359152",
    "969429",
    "338314",
    "254676",
    "287922",
    "162583",
    "399871",
    "520489",
  ];
  expected.forEach((code, counter) => {
    assert.equal(totp.generateHotpCode(RFC_SEED, counter), code, `counter ${counter}`);
  });
});

test("TOTP matches the RFC 6238 Appendix B SHA-1 values (8 digits)", () => {
  const vectors: Array<[number, string]> = [
    [59, "94287082"],
    [1111111109, "07081804"],
    [1111111111, "14050471"],
    [1234567890, "89005924"],
    [2000000000, "69279037"],
    [20000000000, "65353130"],
  ];
  for (const [seconds, code] of vectors) {
    const counter = totp.totpCounter(seconds * 1000);
    assert.equal(totp.generateHotpCode(RFC_SEED, counter, { digits: 8 }), code, `t=${seconds}`);
  }
});

test("a code is accepted one step either side of now and rejected two steps away", () => {
  const secret = totp.generateTotpSecret();
  const atMs = 1_700_000_000_000;
  const now = totp.totpCounter(atMs);
  for (const drift of [-1, 0, 1]) {
    const code = totp.generateHotpCode(secret, now + drift);
    assert.equal(totp.matchTotpCode(secret, code, { atMs }), now + drift, `drift ${drift}`);
  }
  for (const drift of [-2, 2]) {
    const code = totp.generateHotpCode(secret, now + drift);
    // A collision with a neighbouring step would make this flaky; check against them too.
    const collides = [-1, 0, 1].some((d) => totp.generateHotpCode(secret, now + d) === code);
    if (!collides) assert.equal(totp.verifyTotpCode(secret, code, { atMs }), false);
  }
});

test("malformed secrets and codes are a plain mismatch, never a throw", () => {
  const secret = totp.generateTotpSecret();
  assert.equal(totp.verifyTotpCode(secret, ""), false);
  assert.equal(totp.verifyTotpCode(secret, "12345"), false);
  assert.equal(totp.verifyTotpCode(secret, "abcdef"), false);
  assert.equal(totp.verifyTotpCode(secret, null), false);
  assert.equal(totp.verifyTotpCode("", "123456"), false);
  assert.equal(totp.verifyTotpCode("not base32!", "123456"), false);
  // Spaces/dashes people type are stripped before comparing.
  const code = totp.generateHotpCode(secret, totp.totpCounter());
  assert.equal(totp.verifyTotpCode(secret, `${code.slice(0, 3)} ${code.slice(3)}`), true);
});

test("a generated secret is 160 bits of base32 and the otpauth URI carries it", () => {
  const secret = totp.generateTotpSecret();
  assert.match(secret, /^[A-Z2-7]{32}$/);
  assert.equal(totp.base32Decode(secret).length, 20);
  const uri = totp.buildOtpAuthUri({ secret });
  assert.ok(uri.startsWith("otpauth://totp/OmniRoute%3Aadmin?"), uri);
  const params = new URL(uri).searchParams;
  assert.equal(params.get("secret"), secret);
  assert.equal(params.get("issuer"), "OmniRoute");
  assert.equal(params.get("digits"), "6");
  assert.equal(params.get("period"), "30");
  assert.equal(params.get("algorithm"), "SHA1");
});

test("backup codes: ten unique codes, hashed, matched case/separator-insensitively", async () => {
  const { codes, hashes } = await backupCodes.generateBackupCodes();
  assert.equal(codes.length, backupCodes.BACKUP_CODE_COUNT);
  assert.equal(new Set(codes).size, codes.length);
  for (const code of codes) assert.match(code, /^[A-HJKMNP-TV-Z2-9]{5}-[A-HJKMNP-TV-Z2-9]{5}$/);
  for (const hash of hashes) {
    assert.match(hash, /^\$2[aby]\$10\$/);
    assert.equal(codes.includes(hash), false, "plaintext must never be stored");
  }

  const typed = codes[3].toLowerCase().replace("-", " ");
  assert.equal(await backupCodes.findMatchingBackupCodeHash(typed, hashes), hashes[3]);
  assert.equal(await backupCodes.findMatchingBackupCodeHash("AAAAA-AAAAA", hashes), null);
  assert.equal(await backupCodes.findMatchingBackupCodeHash("", hashes), null);
  assert.equal(await backupCodes.findMatchingBackupCodeHash(codes[0], ["not-a-hash"]), null);
});
