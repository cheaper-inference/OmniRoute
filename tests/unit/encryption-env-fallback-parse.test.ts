// DBSEC-3: when STORAGE_ENCRYPTION_KEY is not in the process environment,
// src/lib/db/encryption.ts reads it from a .env file itself. That fallback used
// `split("=", 2)[1]`, which drops everything after a second "=", so a base64 key
// such as `openssl rand -base64 32` output lost its padding and derived a
// different AES key than the CLI (bin/omniroute.mjs) and Docker bootstrap
// (scripts/build/bootstrap-env.mjs), which split on the first "=".
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import util from "node:util";
import { createCipheriv, createDecipheriv, createHash, randomBytes, scryptSync } from "node:crypto";

import { parseEnvValue as cliParseEnvValue } from "../../bin/cli/utils/parseEnvValue.mjs";

const { isEncryptionEnabled } = await import("../../src/lib/db/encryption.ts");

const KEY = "STORAGE_ENCRYPTION_KEY";
const FLAG = "OMNIROUTE_DOTENV_KEY_OLD_READING";
const STATE = Symbol.for("omniroute.storageKeyBeforeFirstEqualsFix");

// ensureSecretLoaded() returns early in a test context, so drop the markers that
// isTestContext() looks at while the fallback runs (same approach as
// encryption-production-warn-13330.test.ts).
function withoutTestFlags<T>(fn: () => T): T {
  const savedEnv = {
    NODE_ENV: process.env.NODE_ENV,
    VITEST: process.env.VITEST,
    NODE_TEST_CONTEXT: process.env.NODE_TEST_CONTEXT,
  };
  const savedExec = process.execArgv.slice();
  const savedArgv = process.argv.slice();
  const strip = (list: string[]) => list.filter((arg) => arg !== "--test");
  try {
    delete process.env.NODE_ENV;
    delete process.env.VITEST;
    delete process.env.NODE_TEST_CONTEXT;
    process.execArgv.splice(0, process.execArgv.length, ...strip(savedExec));
    process.argv.splice(0, process.argv.length, ...strip(savedArgv));
    return fn();
  } finally {
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    process.execArgv.splice(0, process.execArgv.length, ...savedExec);
    process.argv.splice(0, process.argv.length, ...savedArgv);
  }
}

/**
 * Run `fn` with DATA_DIR/.env holding `envText` (and ./.env holding
 * `cwdEnvText`, when given), STORAGE_ENCRYPTION_KEY unset and the
 * test-context markers removed, so the .env fallback runs. Restores the
 * environment afterwards.
 */
function withEnvFile<T>(envText: string, fn: () => T, cwdEnvText?: string): T {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "enc-env-parse-"));
  const dataDir = path.join(root, "data");
  const emptyDir = path.join(root, "empty");
  fs.mkdirSync(dataDir);
  fs.mkdirSync(emptyDir);
  fs.writeFileSync(path.join(dataDir, ".env"), envText);
  if (cwdEnvText !== undefined) fs.writeFileSync(path.join(emptyDir, ".env"), cwdEnvText);
  const saved = {
    DATA_DIR: process.env.DATA_DIR,
    HOME: process.env.HOME,
    [KEY]: process.env[KEY],
    [FLAG]: process.env[FLAG],
  };
  const savedCwd = process.cwd();
  try {
    process.env.DATA_DIR = dataDir;
    // ~/.hermes/.env stays empty; ./.env only holds `cwdEnvText`.
    process.env.HOME = emptyDir;
    process.chdir(emptyDir);
    delete process.env[KEY];
    return withoutTestFlags(fn);
  } finally {
    process.chdir(savedCwd);
    for (const [key, value] of Object.entries(saved)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    fs.rmSync(root, { recursive: true, force: true });
  }
}

/** Load the key from a DATA_DIR/.env holding `envText`; returns what the fallback read. */
function loadFromEnvFile(envText: string): string | undefined {
  return withEnvFile(envText, () => {
    isEncryptionEnabled();
    return process.env[KEY];
  });
}

test("keeps base64 padding on the key", () => {
  const b64 = "q83vEjRWeJCrze8SNFZ4kKvN7xI0VniQq83vEjRWeJA=";
  assert.equal(loadFromEnvFile(`${KEY}=${b64}\n`), b64);
  assert.equal(loadFromEnvFile(`${KEY}="${b64}"\n`), b64);
  assert.equal(loadFromEnvFile(`${KEY}=c2hvcnQ==\r\n`), "c2hvcnQ==");
});

test("keeps every '=' after the first one", () => {
  assert.equal(loadFromEnvFile(`${KEY}=a=b=c\n`), "a=b=c");
  assert.equal(loadFromEnvFile(`${KEY}==leading\n`), "=leading");
});

test("ignores lines without '=' and lines for other keys", () => {
  assert.equal(loadFromEnvFile(`${KEY}\n`), undefined);
  assert.equal(loadFromEnvFile(`${KEY}_OLD=nope\nOTHER=${KEY}=x\n`), undefined);
  assert.equal(loadFromEnvFile(`# ${KEY}=commented\n${KEY}\n${KEY}=real=\n`), "real=");
});

test("trims the key name and keeps the first non-empty value", () => {
  assert.equal(loadFromEnvFile(`${KEY} = spaced=\n`), "spaced=");
  assert.equal(loadFromEnvFile(`${KEY}= "quoted after space="\n`), "quoted after space=");
  assert.equal(loadFromEnvFile(`${KEY}=\n${KEY}=first=\n${KEY}=second\n`), "first=");
});

test("does not read a value the old reader used as the key as unset", () => {
  // The CLI reads "# set me" here, and so did this fallback before the fix.
  // bootstrap-env.mjs reads it as empty; doing that here would turn
  // encryption off on upgrade.
  assert.equal(loadFromEnvFile(`${KEY}=  # set me\n`), "# set me");
  // The current parser reads `""` and stops; the old reader used the whole text.
  assert.equal(loadFromEnvFile(`${KEY}="" # empty\n`), '"" # empty');
  assert.equal(loadFromEnvFile(`${KEY}=""\n`), undefined);
  // As before the fix, the first such line wins over a later key line.
  assert.equal(loadFromEnvFile(`${KEY}=# placeholder\n${KEY}=real\n`), "# placeholder");
});

test("reads the same value as the CLI .env parser", () => {
  const values = [
    "q83vEjRWeJCrze8SNFZ4kKvN7xI0VniQq83vEjRWeJA=",
    "a=b=c",
    `"quoted=#=value"`,
    "'single=='",
    "value # trailing comment",
    "pass#word=",
    "  padded==  ",
    "  # set me",
    `"abc'`,
    "tab=\t# comment",
    `"quoted=" # comment`,
    "two=  # spaces before the comment",
    `" spaced inside "`,
    `"abc"def`,
    `'abc' x`,
  ];
  for (const raw of values) {
    assert.equal(loadFromEnvFile(`${KEY}=${raw}\n`), cliParseEnvValue(raw), raw);
  }
});

test("the CLI-parity cases above load the exact CLI value", () => {
  // Spelled out so a parser change cannot drift together with the CLI copy.
  assert.equal(loadFromEnvFile(`${KEY}="abc'\n`), `"abc'`);
  assert.equal(loadFromEnvFile(`${KEY}=tab=\t# comment\n`), "tab=");
  assert.equal(loadFromEnvFile(`${KEY}="quoted=" # comment\n`), "quoted=");
  assert.equal(loadFromEnvFile(`${KEY}=two=  # spaces\n`), "two=");
  assert.equal(loadFromEnvFile(`${KEY}=" spaced inside "\n`), " spaced inside ");
  // A quote that does not end the value does not start a quoted value.
  assert.equal(loadFromEnvFile(`${KEY}="abc"def\n`), `"abc"def`);
});

// ── Upgrade: data encrypted under the value the old reader took ──────────────

const ENCRYPTION_MODULE = new URL("../../src/lib/db/encryption.ts", import.meta.url).href;
let freshCount = 0;
type EncryptionModule = typeof import("../../src/lib/db/encryption.ts");
/** A new module instance, so no derived key is cached from an earlier test. */
async function freshEncryption(): Promise<EncryptionModule> {
  return import(`${ENCRYPTION_MODULE}?fresh=${++freshCount}`);
}

/** Encrypt `plaintext` with STORAGE_ENCRYPTION_KEY=`secret` in the process environment. */
async function encryptWithEnvKey(secret: string, plaintext: string): Promise<string> {
  const mod = await freshEncryption();
  const saved = process.env[KEY];
  process.env[KEY] = secret;
  try {
    const out = mod.encrypt(plaintext);
    assert.ok(typeof out === "string" && mod.looksEncrypted(out));
    return out;
  } finally {
    if (saved === undefined) delete process.env[KEY];
    else process.env[KEY] = saved;
  }
}

/** Decrypt with a key derived from `secret`, independent of the module under test. */
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

function captureWarnings<T>(fn: () => T): { result: T; warnings: string[] } {
  const warnings: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map(String).join(" "));
  };
  try {
    return { result: fn(), warnings };
  } finally {
    console.warn = original;
  }
}

const B64 = "q83vEjRWeJCrze8SNFZ4kKvN7xI0VniQq83vEjRWeJA=";
const HEX = "0123456789abcdef0123456789abcdef";
// [.env line value, what the old reader took, what the current reader takes]
const DIVERGENT = [
  [B64, B64.slice(0, -1), B64],
  [`"${B64}"`, `"${B64.slice(0, -1)}`, B64],
  [`${HEX} # rotated 2026`, `${HEX} # rotated 2026`, HEX],
];

for (const [raw, oldValue, newValue] of DIVERGENT) {
  test(`after upgrade, ${raw} decrypts data from both readings and warns once`, async () => {
    const underOld = await encryptWithEnvKey(oldValue, "stored-before-upgrade");
    const underNew = await encryptWithEnvKey(newValue, "stored-by-cli");
    const mod = await freshEncryption();
    const { result, warnings } = captureWarnings(() =>
      withEnvFile(`${KEY}=${raw}\n`, () => ({
        old: mod.decrypt(underOld),
        cur: mod.decrypt(underNew),
        written: mod.encrypt("written-after-upgrade"),
        migratedOld: mod.migrateLegacyEncryptedString(underOld),
        migratedNew: mod.migrateLegacyEncryptedString(underNew),
      }))
    );
    assert.equal(result.old, "stored-before-upgrade");
    assert.equal(result.cur, "stored-by-cli");
    // Values from the old reading are rewritten under the current key.
    assert.equal(result.migratedOld.updated, true);
    assert.equal(result.migratedNew.updated, false);

    // New writes and migrated values use the current reading only.
    assert.equal(decryptWithSecret(newValue, result.written), "written-after-upgrade");
    assert.equal(decryptWithSecret(newValue, result.migratedOld.value), "stored-before-upgrade");

    const upgradeWarnings = warnings.filter((w) => w.includes("first-'=' parsing fix"));
    assert.equal(upgradeWarnings.length, 1, warnings.join("\n"));
    assert.ok(!upgradeWarnings[0].includes(newValue), "warning must not print the key");
    assert.ok(!upgradeWarnings[0].includes(oldValue), "warning must not print the key");
  });
}

for (const [raw, oldValue] of [
  ["  # set me", "# set me"],
  ['"" # empty', '"" # empty'],
  // The current parser reads a blank value here; a blank key cannot encrypt.
  ['"  " # note', '"  " # note'],
  ["'\t' # note", "'\t' # note"],
]) {
  test(`after upgrade, ${KEY}=${raw} keeps encryption on and old data readable`, async () => {
    const underOld = await encryptWithEnvKey(oldValue, "stored-before-upgrade");
    const mod = await freshEncryption();
    const { result, warnings } = captureWarnings(() =>
      withEnvFile(`${KEY}=${raw}\n`, () => ({
        enabled: mod.isEncryptionEnabled(),
        old: mod.decrypt(underOld),
        written: mod.encrypt("written-after-upgrade"),
      }))
    );
    assert.equal(result.enabled, true);
    assert.equal(result.old, "stored-before-upgrade");
    assert.equal(decryptWithSecret(oldValue, result.written), "written-after-upgrade");
    assert.ok(warnings.length >= 1, "an operator-visible warning is required");
    // Both readings resolve to the same key, so there is no second key to report.
    assert.ok(!warnings.some((w) => w.includes("first-'='")), warnings.join("\n"));
    // A key text that starts with '#' gets its own warning.
    const hashWarning = warnings.some((w) => w.includes("starts with '#'"));
    assert.equal(hashWarning, oldValue.startsWith("#"), warnings.join("\n"));
    for (const w of warnings) assert.ok(!w.includes(oldValue), "warning must not print the key");
  });
}

test("no upgrade warning or second key when both readings agree", async () => {
  const stored = await encryptWithEnvKey(HEX, "stored");
  const mod = await freshEncryption();
  const { result, warnings } = captureWarnings(() =>
    withEnvFile(`${KEY}=${HEX}\n`, () => ({
      value: mod.decrypt(stored),
      migrated: mod.migrateLegacyEncryptedString(stored),
    }))
  );
  assert.equal(result.value, "stored");
  assert.equal(result.migrated.updated, false);
  assert.deepEqual(warnings, []);
});

test("with several key lines, the old reading is the first non-empty one", async () => {
  const underOld = await encryptWithEnvKey("first", "stored-before-upgrade");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}=\n${KEY}=first=\n${KEY}=second\n`, () => mod.decrypt(underOld))
  );
  assert.equal(result, "stored-before-upgrade");
});

test("an indented key line still opens data from the old reading", async () => {
  // Both readers trimmed the line before matching, so indentation and CRLF
  // do not change which key line is read.
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`  ${KEY}=${B64}\r\n`, () => mod.decrypt(underOld))
  );
  assert.equal(result, "stored-before-upgrade");
});

test("no upgrade warning when the old reader found no key line", async () => {
  // The old reader matched only `STORAGE_ENCRYPTION_KEY=` at the start of the
  // line, so it ran without encryption here; nothing was stored under a key.
  const { result, warnings } = captureWarnings(() => loadFromEnvFile(`${KEY} = spaced=\n`));
  assert.equal(result, "spaced=");
  assert.deepEqual(warnings, []);

  // An old reading recorded by an earlier load does not carry over.
  const underTruncated = await encryptWithEnvKey(B64.slice(0, -1), "stored");
  captureWarnings(() => loadFromEnvFile(`${KEY}=${B64}\n`));
  const mod = await freshEncryption();
  const reloaded = captureWarnings(() =>
    withEnvFile(`${KEY} = ${B64}\n`, () => mod.decrypt(underTruncated, { quiet: true }))
  );
  assert.equal(reloaded.result, null);
});

test("a blank key read the same both ways gets no 'stay encrypted' warning", () => {
  // Both readers take two spaces here, which cannot derive a key, as before.
  const { result, warnings } = captureWarnings(() => loadFromEnvFile(`${KEY}="  "\n`));
  assert.equal(result, "  ");
  assert.ok(!warnings.some((w) => w.includes("stay encrypted")), warnings.join("\n"));
});

/** The value bin/omniroute.mjs puts in process.env: its first key line wins. */
function cliLoadedValue(envText: string): string | undefined {
  let value: string | undefined;
  for (const line of envText.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0 && trimmed.slice(0, eqIdx).trim() === KEY && value === undefined) {
      value = cliParseEnvValue(trimmed.slice(eqIdx + 1));
    }
  }
  return value;
}

test("a blank first line wins as in the CLI, so both entry points read each other's data", async () => {
  // The CLI loads the blank first value and stores plaintext while
  // isEncryptionEnabled() is true. The fallback did the same before the fix.
  // Taking the later line here would encrypt data the CLI cannot read.
  for (const blank of [`"  "`, `'\t'`]) {
    const envText = `${KEY}=${blank}\n${KEY}=realkey123\n`;
    const cliValue = cliLoadedValue(envText);
    assert.ok(cliValue && !cliValue.trim(), JSON.stringify(cliValue));
    const mod = await freshEncryption();
    const loaded = captureWarnings(() =>
      withEnvFile(envText, () => ({
        enabled: mod.isEncryptionEnabled(),
        key: process.env[KEY],
        flag: process.env[FLAG],
        written: mod.encrypt("written-by-fallback"),
      }))
    );
    assert.equal(loaded.result.enabled, true);
    assert.equal(loaded.result.key, cliValue);
    assert.equal(loaded.result.flag, undefined);
    assert.ok(!loaded.warnings.some((w) => w.includes("first-'='")), loaded.warnings.join("\n"));

    const cli = await freshEncryption();
    const saved = process.env[KEY];
    process.env[KEY] = cliValue;
    try {
      assert.equal(cli.decrypt(loaded.result.written, { quiet: true }), "written-by-fallback");
    } finally {
      if (saved === undefined) delete process.env[KEY];
      else process.env[KEY] = saved;
    }

    const inherited = captureWarnings(() =>
      asInheritingProcess(envText, cliValue, () => isEncryptionEnabled())
    );
    assert.ok(
      !inherited.warnings.some((w) => w.includes("first-'='")),
      inherited.warnings.join("\n")
    );
  }
  // An empty first value is falsy, so a server started by the CLI reaches
  // this fallback and takes the later line itself.
  assert.equal(cliLoadedValue(`${KEY}=""\n${KEY}=realkey123\n`), "");
  assert.equal(loadFromEnvFile(`${KEY}=""\n${KEY}=realkey123\n`), "realkey123");
});

test("a blank value that only the old reader saw is not an old reading", async () => {
  // The old reader skipped `KEY = realkey123` (space before "=") and took the
  // blank line after it. The new reader, like the CLI, takes the first line.
  const envText = `${KEY} = realkey123\n${KEY}="  "\n`;
  assert.equal(cliLoadedValue(envText), "realkey123");
  const mod = await freshEncryption();
  const loaded = captureWarnings(() =>
    withEnvFile(envText, () => ({
      enabled: mod.isEncryptionEnabled(),
      key: process.env[KEY],
      flag: process.env[FLAG],
    }))
  );
  assert.deepEqual(loaded.result, { enabled: true, key: "realkey123", flag: undefined });
  assert.ok(!loaded.warnings.some((w) => w.includes("first-'='")), loaded.warnings.join("\n"));

  const inherited = captureWarnings(() =>
    asInheritingProcess(envText, "realkey123", () => isEncryptionEnabled())
  );
  assert.equal(inherited.result, true);
  assert.ok(
    !inherited.warnings.some((w) => w.includes("first-'='")),
    inherited.warnings.join("\n")
  );
});

test("a key from the old reading does not open data under an unrelated key", async () => {
  const unrelated = await encryptWithEnvKey("some-other-key", "not yours");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => ({
      value: mod.decrypt(unrelated, { quiet: true }),
      migrated: mod.migrateLegacyEncryptedString(unrelated),
    }))
  );
  assert.equal(result.value, null);
  assert.equal(result.migrated.updated, false);
});

test("the old reading still counts after a later-matching line or file", async () => {
  // The old reader skipped `KEY =abc` (no "=" right after the name) and took
  // the next line, or the next file, cut at its second "=".
  const underOld = await encryptWithEnvKey("xyz", "stored-before-upgrade");
  for (const [dataEnv, cwdEnv] of [
    [`${KEY} =abc\n${KEY}=xyz=\n`, undefined],
    [`${KEY} =abc\n`, `${KEY}=xyz=\n`],
  ]) {
    const mod = await freshEncryption();
    const { result } = captureWarnings(() =>
      withEnvFile(dataEnv, () => ({ old: mod.decrypt(underOld), key: process.env[KEY] }), cwdEnv)
    );
    assert.equal(result.key, "abc");
    assert.equal(result.old, "stored-before-upgrade", JSON.stringify([dataEnv, cwdEnv]));
  }
});

test("the old reading trims before it strips a quote", async () => {
  // `KEY= "abc=="`: the old reader cut at the second "=" to ` "abc`, trimmed
  // it to `"abc`, and kept the quote because the closing one was cut off.
  const underOld = await encryptWithEnvKey('"abc', "stored-before-upgrade");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}= "abc=="\n`, () => ({ old: mod.decrypt(underOld), key: process.env[KEY] }))
  );
  assert.equal(result.key, "abc==");
  assert.equal(result.old, "stored-before-upgrade");
});

test("every module instance in the process can use the old reading", async () => {
  // Next.js evaluates this module once per bundle. The first instance reads
  // .env and puts the key in process.env; later ones find it there and never
  // read the file.
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const first = await freshEncryption();
  const second = await freshEncryption();
  const row = {
    id: "conn-1",
    provider: "openai",
    apiKey: underOld,
    providerSpecificData: { consoleApiKey: underOld, workspaceId: "ws-1" },
  };
  const { result, warnings } = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => {
      const enabled = first.isEncryptionEnabled();
      return {
        enabled,
        old: second.decrypt(underOld),
        quiet: second.decrypt(underOld, { quiet: true }),
        migrated: second.migrateLegacyEncryptedString(underOld),
        // providerSpecificData secrets are not migrated at startup and are
        // read through decrypt(..., { quiet: true }).
        firstRow: first.decryptConnectionFields({ ...row }),
        secondRow: second.decryptConnectionFields({ ...row }),
      };
    })
  );
  assert.equal(result.enabled, true);
  assert.equal(result.old, "stored-before-upgrade");
  assert.equal(result.quiet, "stored-before-upgrade");
  assert.equal(result.migrated.updated, true);
  assert.equal(decryptWithSecret(B64, result.migrated.value), "stored-before-upgrade");
  for (const decrypted of [result.firstRow, result.secondRow]) {
    assert.equal(decrypted.apiKey, "stored-before-upgrade");
    assert.deepEqual(decrypted.providerSpecificData, {
      consoleApiKey: "stored-before-upgrade",
      workspaceId: "ws-1",
    });
    assert.equal(decrypted.credentialDecryptFailed, undefined);
  }
  const upgradeWarnings = warnings.filter((w) => w.includes("first-'='"));
  assert.equal(upgradeWarnings.length, 1, warnings.join("\n"));
});

test("the old reading is not used when the active key came from elsewhere", async () => {
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const beforeV379 = encryptWithDynamicSalt(B64.slice(0, -1), "stored-before-v3.7.9");
  const loader = await freshEncryption();
  captureWarnings(() => withEnvFile(`${KEY}=${B64}\n`, () => loader.isEncryptionEnabled()));
  // Same process, but the operator now sets a different key in the environment.
  const mod = await freshEncryption();
  const saved = process.env[KEY];
  process.env[KEY] = HEX;
  try {
    assert.equal(mod.decrypt(underOld, { quiet: true }), null);
    assert.equal(mod.migrateLegacyEncryptedString(underOld).updated, false);
    assert.equal(mod.migrateLegacyEncryptedString(beforeV379).updated, false);
  } finally {
    if (saved === undefined) delete process.env[KEY];
    else process.env[KEY] = saved;
  }
});

test("the upgrade warning gives the recovery that works", async () => {
  const { warnings } = captureWarnings(() => loadFromEnvFile(`${KEY}=${B64}\n`));
  const upgradeWarning = warnings.find((w) => w.includes("first-'='")) ?? "";
  assert.match(upgradeWarning, /restore it/);
  assert.match(upgradeWarning, /breaks the re-encrypted tokens/);
  assert.doesNotMatch(upgradeWarning, /until every stored secret/);
  // Only provider_connections tokens are migrated; the rest is not a closed list.
  assert.match(upgradeWarning, /Only provider connection tokens are re-encrypted/);
  assert.match(upgradeWarning, /every other encrypted value \(for example /);
});

/**
 * Run `fn` like a process that inherited the environment of one that loaded
 * the key from .env: STORAGE_ENCRYPTION_KEY (and the flag, unless `flag` is
 * false) are set, and this globalThis holds no state yet.
 */
function asInheritingProcess<T>(envText: string, envKey: string, fn: () => T, flag = true): T {
  return withEnvFile(envText, () => {
    process.env[KEY] = envKey;
    if (flag) process.env[FLAG] = "1";
    else delete process.env[FLAG];
    delete (globalThis as Record<symbol, unknown>)[STATE];
    return fn();
  });
}

test("loading from .env flags the environment only when the readings differ", () => {
  const seen = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => {
      isEncryptionEnabled();
      return process.env[FLAG];
    })
  );
  assert.equal(seen.result, "1");
  const same = captureWarnings(() =>
    withEnvFile(`${KEY}=${HEX}\n`, () => {
      process.env[FLAG] = "1";
      isEncryptionEnabled();
      return process.env[FLAG];
    })
  );
  assert.equal(same.result, undefined);
});

test("a process that inherits the key and the flag reads the old reading from .env", async () => {
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const first = await freshEncryption();
  const second = await freshEncryption();
  const { result, warnings } = captureWarnings(() =>
    asInheritingProcess(`${KEY}=${B64}\n`, B64, () => ({
      old: first.decrypt(underOld, { quiet: true }),
      again: second.decrypt(underOld, { quiet: true }),
      migrated: second.migrateLegacyEncryptedString(underOld),
      flag: process.env[FLAG],
    }))
  );
  assert.equal(result.old, "stored-before-upgrade");
  assert.equal(result.again, "stored-before-upgrade");
  // The flag stays, so this process's own children can do the same.
  assert.equal(result.flag, "1");
  assert.equal(result.migrated.updated, true);
  assert.equal(decryptWithSecret(B64, result.migrated.value), "stored-before-upgrade");
  // Once per process, not once per module instance.
  assert.equal(warnings.filter((w) => w.includes("first-'='")).length, 1, warnings.join("\n"));
});

test("an inherited flag does not apply when .env no longer yields the inherited key", async () => {
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  for (const [envText, envKey, flag] of [
    // The environment key is not what the file gives.
    [`${KEY}=${B64}\n`, HEX, true],
    // The file changed after the parent loaded it.
    [`${KEY}=${HEX}\n`, B64, true],
    // No flag: a key set in the environment is used as is, the file is not read.
    [`${KEY}=${B64}\n`, B64, false],
  ] as const) {
    const mod = await freshEncryption();
    const { result, warnings } = captureWarnings(() =>
      asInheritingProcess(envText, envKey, () => mod.decrypt(underOld, { quiet: true }), flag)
    );
    assert.equal(result, null, JSON.stringify([envText, envKey, flag]));
    assert.ok(!warnings.some((w) => w.includes("first-'='")), warnings.join("\n"));
  }
});

test("the old reading is not visible through inspect or a forged prototype entry", async () => {
  const underOld = await encryptWithEnvKey("attacker-chosen", "not yours");
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => {
      isEncryptionEnabled();
      return [
        util.inspect(globalThis, { depth: 2 }),
        util.inspect({ ...globalThis }, { depth: 2 }),
      ];
    })
  );
  for (const text of result) assert.ok(!text.includes(B64.slice(0, -1)), "must not show the key");

  const proto = Object.prototype as Record<symbol, unknown>;
  const mod = await freshEncryption();
  try {
    proto[STATE] = { secret: HEX, beforeFix: "attacker-chosen" };
    const value = asInheritingProcess(`${KEY}=${HEX}\n`, HEX, () =>
      mod.decrypt(underOld, { quiet: true })
    );
    assert.equal(value, null);
  } finally {
    delete proto[STATE];
  }
});

/** Encrypt like versions before v3.7.9 (salt from the key's SHA-256), without the module. */
function encryptWithDynamicSalt(secret: string, plaintext: string): string {
  const salt = createHash("sha256").update(secret).digest().subarray(0, 16);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-gcm", scryptSync(secret, salt, 32), iv);
  const body = cipher.update(plaintext, "utf8", "hex") + cipher.final("hex");
  return `enc:v1:${iv.toString("hex")}:${body}:${cipher.getAuthTag().toString("hex")}`;
}

test("the startup migration also rewrites pre-3.7.9 data under the old reading", async () => {
  const beforeV379 = encryptWithDynamicSalt(B64.slice(0, -1), "stored-before-v3.7.9");
  const unrelated = encryptWithDynamicSalt("some-other-key", "not yours");
  const loaded = await freshEncryption();
  const fromFile = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => ({
      readBefore: loaded.decrypt(beforeV379, { quiet: true }),
      migrated: loaded.migrateLegacyEncryptedString(beforeV379),
      readAfter: loaded.decrypt(beforeV379, { quiet: true }),
      unrelated: loaded.migrateLegacyEncryptedString(unrelated),
    }))
  ).result;
  // Only the migration tries this key format; decrypt() does not, as before.
  assert.equal(fromFile.readBefore, null);
  assert.equal(fromFile.readAfter, null);
  assert.equal(fromFile.migrated.updated, true);
  assert.equal(decryptWithSecret(B64, fromFile.migrated.value), "stored-before-v3.7.9");
  assert.equal(fromFile.unrelated.updated, false);

  const inherited = await freshEncryption();
  const viaFlag = captureWarnings(() =>
    asInheritingProcess(`${KEY}=${B64}\n`, B64, () =>
      inherited.migrateLegacyEncryptedString(beforeV379)
    )
  ).result;
  assert.equal(viaFlag.updated, true);
  assert.equal(decryptWithSecret(B64, viaFlag.value), "stored-before-v3.7.9");

  // Without the flag the key in the environment is used as is.
  const noFlag = await freshEncryption();
  const plain = captureWarnings(() =>
    asInheritingProcess(
      `${KEY}=${B64}\n`,
      B64,
      () => noFlag.migrateLegacyEncryptedString(beforeV379),
      false
    )
  ).result;
  assert.equal(plain.updated, false);
});

test("pre-3.7.9 keys from the old reading and from the active key are cached apart", async () => {
  // An install can hold pre-3.7.9 tokens under both readings; one module
  // instance must keep migrating both kinds in any order.
  const underOldReading = encryptWithDynamicSalt(B64.slice(0, -1), "old-reading");
  const underActiveKey = encryptWithDynamicSalt(B64, "active-key");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () =>
      [underOldReading, underActiveKey, underOldReading, underActiveKey].map((ct) =>
        mod.migrateLegacyEncryptedString(ct)
      )
    )
  );
  const expected = ["old-reading", "active-key", "old-reading", "active-key"];
  result.forEach((migrated, i) => {
    assert.equal(migrated.updated, true, String(i));
    assert.equal(decryptWithSecret(B64, migrated.value), expected[i], String(i));
  });
});

test("only the flag value 1 makes an inheriting process use the old reading", async () => {
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  for (const value of ["true", "TRUE", "yes", "0", " 1", "1 "]) {
    const mod = await freshEncryption();
    const { result } = captureWarnings(() =>
      asInheritingProcess(`${KEY}=${B64}\n`, B64, () => {
        process.env[FLAG] = value;
        return mod.decrypt(underOld, { quiet: true });
      })
    );
    assert.equal(result, null, JSON.stringify(value));
  }
});

test("an inheriting process reads .env once, also when it finds no old reading", async () => {
  const mod = await freshEncryption();
  const originalRead = fs.readFileSync;
  let envReads = 0;
  (fs as { readFileSync: unknown }).readFileSync = (...args: unknown[]) => {
    if (String(args[0]).endsWith(".env")) envReads++;
    return (originalRead as (...a: unknown[]) => unknown)(...args);
  };
  try {
    captureWarnings(() =>
      asInheritingProcess(`${KEY}=${HEX}\n`, B64, () => {
        for (let i = 0; i < 50; i++) mod.isEncryptionEnabled();
      })
    );
  } finally {
    fs.readFileSync = originalRead;
  }
  assert.equal(envReads, 1);
});

test("a module instance keeps its derived keys when the environment key changes", async () => {
  // Like the active key, the old-reading key is derived once per instance; a
  // changed key takes effect after a restart, not halfway through.
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const beforeV379 = encryptWithDynamicSalt(B64.slice(0, -1), "stored-before-v3.7.9");
  const mod = await freshEncryption();
  const { result } = captureWarnings(() =>
    withEnvFile(`${KEY}=${B64}\n`, () => {
      const before = mod.decrypt(underOld, { quiet: true });
      mod.migrateLegacyEncryptedString(beforeV379);
      process.env[KEY] = HEX;
      return {
        before,
        after: mod.decrypt(underOld, { quiet: true }),
        migrated: mod.migrateLegacyEncryptedString(beforeV379),
        written: mod.encrypt("x"),
      };
    })
  );
  assert.equal(result.before, "stored-before-upgrade");
  assert.equal(result.after, "stored-before-upgrade");
  assert.equal(decryptWithSecret(B64, result.migrated.value), "stored-before-v3.7.9");
  assert.equal(decryptWithSecret(B64, result.written), "x");
});

test("a state entry of another shape is replaced, not trusted", async () => {
  const underOld = await encryptWithEnvKey(B64.slice(0, -1), "stored-before-upgrade");
  const mod = await freshEncryption();
  try {
    const { result } = captureWarnings(() =>
      asInheritingProcess(`${KEY}=${B64}\n`, B64, () => {
        Object.defineProperty(globalThis, STATE, {
          value: { secret: 42 },
          configurable: true,
          writable: true,
        });
        return mod.decrypt(underOld, { quiet: true });
      })
    );
    assert.equal(result, "stored-before-upgrade");
  } finally {
    delete (globalThis as Record<symbol, unknown>)[STATE];
  }
});
