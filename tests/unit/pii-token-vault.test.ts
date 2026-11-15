// Reversible PII vault (owner design 2026-11-08, builds on #18017): the vault itself and the
// request-side minting through processPII / the pii-masker.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { inspect } from "node:util";

// A private DB per file: a shared DATA_DIR makes two test processes race the migrations.
process.env.DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pii-vault-"));

const {
  RequestTokenVault,
  TOKEN_VAULT_LIMITS,
  findTokenPrefixStart,
  getActiveRequestTokenVault,
  getLiveTokenVaultCount,
  hasMintedPiiTokens,
  runWithTokenVault,
} = await import("../../src/lib/pii/tokenVault.ts");
const { processPII, sanitizeRequest } = await import("../../src/shared/utils/inputSanitizer.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

test.after(() => resetDbInstance());

const TOKEN_SHAPE = /^<<PII_[A-Z0-9_]+_[A-Z]{8}_\d+>>$/;

test("tokens use the per-request letter nonce and the same value maps to the same token", () => {
  const vault = new RequestTokenVault({ nonce: "QWERTYUI" });
  const a = vault.tokenize("email", "jane@example.com");
  assert.equal(a, "<<PII_EMAIL_QWERTYUI_1>>");
  assert.equal(vault.tokenize("email", "jane@example.com"), a);
  const b = vault.tokenize("credit_card", "4111 1111 1111 1111");
  assert.equal(b, "<<PII_CREDIT_CARD_QWERTYUI_2>>");
  assert.equal(vault.resolve(a!), "jane@example.com");
  assert.equal(vault.size, 2);
  vault.dispose();
});

test("custom rule names become a bounded type label", () => {
  const vault = new RequestTokenVault();
  const token = vault.tokenize("custom:Employee ID (internal)", "EMP-0042")!;
  assert.match(token, TOKEN_SHAPE);
  assert.ok(token.startsWith("<<PII_CUSTOM_EMPLOYEE_ID_I_"));
  vault.dispose();
});

test("two vaults use different nonces and never resolve each other's tokens", () => {
  const a = new RequestTokenVault();
  const b = new RequestTokenVault();
  const tokenA = a.tokenize("email", "a@example.com")!;
  b.tokenize("email", "b@example.com");
  assert.equal(b.resolve(tokenA), undefined);
  // A forged token with B's nonce but a sequence B never minted stays literal.
  const forged = tokenA.replace(/_[A-Z]{8}_/, "_ZZZZZZZZ_");
  assert.equal(b.replaceTokens(`x ${forged} y`), `x ${forged} y`);
  assert.equal(b.replaceTokens(`x ${tokenA} y`), `x ${tokenA} y`);
  a.dispose();
  b.dispose();
});

test("limits refuse new values instead of evicting old mappings", () => {
  const vault = new RequestTokenVault({ limits: { maxEntries: 2 } });
  const first = vault.tokenize("email", "one@example.com");
  vault.tokenize("email", "two@example.com");
  assert.equal(vault.tokenize("email", "three@example.com"), null);
  assert.equal(vault.resolve(first!), "one@example.com", "no mapping is dropped");
  assert.equal(vault.tokenize("email", "x".repeat(TOKEN_VAULT_LIMITS.maxValueLength + 1)), null);
  const small = new RequestTokenVault({ limits: { maxTotalBytes: 10 } });
  assert.ok(small.tokenize("a", "12345"));
  assert.equal(small.tokenize("a", "1234567"), null);
  assert.equal(vault.stats().rejected, 2);
  vault.dispose();
  small.dispose();
});

test("JSON.stringify and inspect expose only the size; dispose clears and refuses", () => {
  const before = getLiveTokenVaultCount();
  const vault = new RequestTokenVault();
  assert.equal(getLiveTokenVaultCount(), before + 1);
  const token = vault.tokenize("email", "secret@example.com")!;
  assert.equal(JSON.stringify(vault), '{"size":1}');
  assert.equal(JSON.stringify({ vault }), '{"vault":{"size":1}}');
  assert.doesNotMatch(inspect(vault, { depth: 5, showHidden: true }), /secret@example\.com/);
  assert.doesNotMatch(String(Object.values(vault)), /secret/);
  vault.dispose();
  assert.equal(getLiveTokenVaultCount(), before);
  assert.equal(vault.resolve(token), undefined);
  assert.equal(vault.tokenize("email", "late@example.com"), null);
});

test("replaceTokens escapes for JSON fragments and leaves unknown tokens literal", () => {
  const vault = new RequestTokenVault({ nonce: "ABCDEFGH" });
  const token = vault.tokenize("custom", 'he said "hi" \\ bye')!;
  assert.equal(vault.replaceTokens(`<${token}>`), '<he said "hi" \\ bye>');
  const json = `{"note":"${token}"}`;
  assert.deepEqual(JSON.parse(vault.replaceTokens(json, "json")), { note: 'he said "hi" \\ bye' });
  const unknown = "<<PII_EMAIL_ABCDEFGH_99>>";
  assert.equal(vault.replaceTokens(unknown), unknown);
  assert.deepEqual(vault.stats(), { minted: 1, restored: 2, unresolved: 1, rejected: 0 });
  vault.dispose();
});

test("findTokenPrefixStart holds back only a suffix that can still become a token", () => {
  assert.equal(findTokenPrefixStart("plain text"), -1);
  assert.equal(findTokenPrefixStart("if a < b"), -1);
  assert.equal(findTokenPrefixStart("cat <<EOF"), -1);
  assert.equal(findTokenPrefixStart("done <<PII_EMAIL_ABCDEFGH_1>>"), -1);
  assert.equal(findTokenPrefixStart("mail <"), 5);
  assert.equal(findTokenPrefixStart("mail <<"), 5);
  assert.equal(findTokenPrefixStart("mail <<PI"), 5);
  assert.equal(findTokenPrefixStart("mail <<PII_EMAIL_ABC"), 5);
  assert.equal(findTokenPrefixStart("mail <<PII_EMAIL_ABCDEFGH_1>"), 5);
  // Longer than any token: released.
  assert.equal(findTokenPrefixStart(`<<PII_${"A".repeat(60)}`), -1);
});

test("the active vault is request-scoped through AsyncLocalStorage", async () => {
  assert.equal(getActiveRequestTokenVault(), undefined);
  assert.equal(hasMintedPiiTokens(), false);
  const a = new RequestTokenVault();
  const b = new RequestTokenVault();
  const seen = await Promise.all([
    runWithTokenVault(a, async () => {
      await new Promise((r) => setTimeout(r, 5));
      return getActiveRequestTokenVault();
    }),
    runWithTokenVault(b, async () => getActiveRequestTokenVault()),
  ]);
  assert.equal(seen[0], a);
  assert.equal(seen[1], b);
  runWithTokenVault(a, () => {
    assert.equal(hasMintedPiiTokens(), false);
    a.tokenize("email", "x@example.com");
    assert.equal(hasMintedPiiTokens(), true);
  });
  a.dispose();
  b.dispose();
});

// ─── Request side: processPII with an explicit minter ──────────────────────

function minterFor(vault: InstanceType<typeof RequestTokenVault>) {
  return (type: string, value: string) => vault.tokenize(type, value);
}

test("processPII mints tokens for a simple rule and repeats the same token for the same value", () => {
  const vault = new RequestTokenVault({ nonce: "MNBVCXZL" });
  const out = processPII("mail jane@example.com and again jane@example.com", true, {
    tokenize: minterFor(vault),
  });
  assert.equal(
    out.text,
    "mail <<PII_EMAIL_MNBVCXZL_1>> and again <<PII_EMAIL_MNBVCXZL_1>>",
    "same value, same token"
  );
  assert.equal(vault.size, 1);
  vault.dispose();
});

test("processPII mints tokens for a validated rule (IBAN) and for a custom rule", () => {
  const vault = new RequestTokenVault({ nonce: "POIUYTRE" });
  const out = processPII("IBAN DE89370400440532013000 badge EMP-0042", true, {
    customRules: [{ name: "custom:badge", regex: /EMP-\d{4}/g, replacement: "[CUSTOM_REDACTED]" }],
    tokenize: minterFor(vault),
  });
  assert.match(out.text, /IBAN <<PII_IBAN_POIUYTRE_\d>> badge <<PII_CUSTOM_BADGE_POIUYTRE_\d>>/);
  assert.equal(vault.size, 2);
  assert.deepEqual(
    new Set(out.text.match(/<<PII_[A-Z0-9_]+>>/g)!.map((t) => vault.resolve(t))),
    new Set(["DE89370400440532013000", "EMP-0042"])
  );
  vault.dispose();
});

test("a later rule never rewrites part of a token an earlier rule wrote", () => {
  const vault = new RequestTokenVault({ nonce: "ASDFGHJK" });
  const out = processPII("reach jane@example.com", true, {
    customRules: [{ name: "custom:letters", regex: /ASDFGHJK/g, replacement: "[CUSTOM_REDACTED]" }],
    tokenize: minterFor(vault),
  });
  assert.equal(out.text, "reach <<PII_EMAIL_ASDFGHJK_1>>");
  vault.dispose();
});

test("without a minter, with a full vault, or when the minter throws, placeholders are written", () => {
  const text = "mail jane@example.com";
  assert.equal(processPII(text, true).text, "mail [EMAIL_REDACTED]");
  const full = new RequestTokenVault({ limits: { maxEntries: 0 } });
  assert.equal(processPII(text, true, { tokenize: minterFor(full) }).text, "mail [EMAIL_REDACTED]");
  const throwing = () => {
    throw new Error("boom");
  };
  assert.equal(processPII(text, true, { tokenize: throwing }).text, "mail [EMAIL_REDACTED]");
  assert.equal(
    processPII("IBAN DE89370400440532013000", true, { tokenize: throwing }).text,
    "IBAN [IBAN_REDACTED]"
  );
  // Detection only (redact=false) never mints.
  const vault = new RequestTokenVault();
  assert.equal(processPII(text, false, { tokenize: minterFor(vault) }).text, text);
  assert.equal(vault.size, 0);
  full.dispose();
  vault.dispose();
});

test("sanitizeRequest (prompt-injection path) never mints into the active vault", async () => {
  const prev = process.env.PII_REDACTION_ENABLED;
  process.env.PII_REDACTION_ENABLED = "true";
  try {
    const vault = new RequestTokenVault();
    runWithTokenVault(vault, () => {
      sanitizeRequest({ messages: [{ role: "user", content: "mail jane@example.com" }] }, {
        warn() {},
        info() {},
      } as unknown as Console);
    });
    assert.equal(vault.size, 0);
    vault.dispose();
  } finally {
    if (prev === undefined) delete process.env.PII_REDACTION_ENABLED;
    else process.env.PII_REDACTION_ENABLED = prev;
  }
});

test("pii-masker mints only with context.tokenVault and falls back to placeholders without it", async () => {
  const prev = process.env.PII_REDACTION_ENABLED;
  process.env.PII_REDACTION_ENABLED = "true";
  try {
    const masker = new PIIMaskerGuardrail();
    const body = {
      messages: [
        { role: "system", content: "ssn 123-45-6789" },
        { role: "user", content: [{ type: "text", text: "mail jane@example.com" }] },
      ],
    };
    const vault = new RequestTokenVault({ nonce: "ZXCVBNMA" });
    const warnings: unknown[] = [];
    const log = { warn: (...args: unknown[]) => warnings.push(args) };
    const minted = await masker.preCall(body, { tokenVault: vault, log });
    const mintedText = JSON.stringify(minted.modifiedPayload);
    assert.deepEqual(warnings, [], "the vault path must not fall back");
    assert.match(mintedText, /<<PII_SSN_US_ZXCVBNMA_\d>>/);
    assert.match(mintedText, /<<PII_EMAIL_ZXCVBNMA_\d>>/);
    assert.doesNotMatch(mintedText, /jane@example\.com|123-45-6789/);

    const plain = await masker.preCall(body, {});
    const plainText = JSON.stringify(plain.modifiedPayload);
    assert.match(plainText, /\[EMAIL_REDACTED\]/);
    assert.doesNotMatch(plainText, /<<PII_/);

    // A vault whose minter throws: still masked, with placeholders, never the raw values.
    const broken = {
      tokenize() {
        throw new Error("vault exploded");
      },
    };
    const fallback = await masker.preCall(body, { tokenVault: broken });
    const fallbackText = JSON.stringify(fallback.modifiedPayload);
    assert.doesNotMatch(fallbackText, /jane@example\.com|123-45-6789/);
    assert.match(fallbackText, /\[EMAIL_REDACTED\]/);
    vault.dispose();
  } finally {
    if (prev === undefined) delete process.env.PII_REDACTION_ENABLED;
    else process.env.PII_REDACTION_ENABLED = prev;
  }
});

test("pii-masker does not mint while PII_REDACTION_ENABLED is off", async () => {
  delete process.env.PII_REDACTION_ENABLED;
  const masker = new PIIMaskerGuardrail();
  const vault = new RequestTokenVault();
  const body = { messages: [{ role: "user", content: "mail jane@example.com" }] };
  const result = await masker.preCall(body, { tokenVault: vault });
  assert.equal(result.modifiedPayload, undefined);
  assert.equal(vault.size, 0);
  vault.dispose();
});
