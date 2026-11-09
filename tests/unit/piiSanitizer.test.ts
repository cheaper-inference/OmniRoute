import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { GuardrailContext } from "@/lib/guardrails/base";

// Isolate DB state to avoid polluting production database
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-"));
process.env.DATA_DIR = tmpDir;

test("PIIMaskerGuardrail respects feature flag DB overrides", async (t) => {
  await t.test(
    "when PII_REDACTION_ENABLED is false in env but true in DB, request PII is redacted",
    async () => {
      delete process.env.PII_REDACTION_ENABLED;
      const { setFeatureFlagOverride } = await import("@/lib/db/featureFlags");
      setFeatureFlagOverride("PII_REDACTION_ENABLED", "true");

      const { PIIMaskerGuardrail } = await import("@/lib/guardrails/piiMasker");
      const guardrail = new PIIMaskerGuardrail();
      const payload = {
        model: "gpt-4o",
        messages: [{ role: "user", content: "My SSN is 123-45-6789" }],
      };
      const dummyContext: GuardrailContext = {
        model: "gpt-4o",
        provider: "openai",
        endpoint: "/v1/chat/completions",
      };
      const res = await guardrail.preCall(payload, dummyContext);
      assert.strictEqual(Boolean(res.modifiedPayload), true);
      const messages = (res.modifiedPayload as { messages?: Array<{ content?: string }> })
        ?.messages;
      assert.strictEqual(messages?.[0]?.content, "My SSN is [SSN_REDACTED]");

      setFeatureFlagOverride("PII_REDACTION_ENABLED", "false");
      const resDisabled = await guardrail.preCall(payload, dummyContext);
      assert.strictEqual(Boolean(resDisabled.modifiedPayload), false);
    }
  );
});

test("sanitizePII checks resolveFeatureFlag, not process.env", async (t) => {
  const originalEnv = process.env.PII_RESPONSE_SANITIZATION;

  await t.test("when env is true but DB is override false, it resolves to disabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "true";

    const { setFeatureFlagOverride, getFeatureFlagOverride } =
      await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "false");

    console.log("Subtest 1 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log(
      "Subtest 1 - isFeatureFlagEnabled:",
      isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")
    );

    const input = "my email is test@example.com";
    const result = sanitizePIIChunk(input, true);
    assert.equal(result, input);
  });

  await t.test("when env is false but DB is override true, it resolves to enabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "false";

    const { setFeatureFlagOverride, getFeatureFlagOverride } =
      await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "true");

    console.log("Subtest 2 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log(
      "Subtest 2 - isFeatureFlagEnabled:",
      isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")
    );

    const input = "my email is test@example.com";
    const result = sanitizePIIChunk(input, true);
    assert.ok(result.includes("[EMAIL_REDACTED]"));
  });

  if (originalEnv !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION = originalEnv;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});

test.after(async () => {
  const coreDb = await import("@/lib/db/core");
  coreDb.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getMode returns redact for invalid flag values", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "garbage";

  const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
  const input = "my email is test@example.com";
  const result = sanitizePIIChunk(input, true);

  assert.ok(
    result.includes("[EMAIL_REDACTED]"),
    "invalid mode should fall back to redact, not silently pass PII through"
  );

  delete process.env.PII_RESPONSE_SANITIZATION_MODE;
});

test("sanitizePII detects and redacts SSN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "My SSN is 123-45-6789";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[SSN_REDACTED]"), "SSN should be redacted");
  assert.ok(!result.text.includes("123-45-6789"), "raw SSN should not remain");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts credit card", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "Card: 4111111111111111";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[CC_REDACTED]"), "Credit card should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects AWS access key", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "Key: AKIAEXAMPLE123456789";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[AWS_KEY_REDACTED]"), "AWS access key should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePIIResponse handles Claude format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const payload = {
    type: "message",
    content: [{ type: "text", text: "SSN: 123-45-6789" }],
  };
  const result = sanitizePIIResponse(payload) as typeof payload;

  assert.ok(result.content[0].text.includes("[SSN_REDACTED]"));

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePIIResponse handles Gemini format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const payload = {
    candidates: [
      {
        content: {
          parts: [{ text: "Contact: test@example.com" }],
        },
      },
    ],
  };
  const result = sanitizePIIResponse(payload) as typeof payload;

  assert.ok(result.candidates[0].content.parts[0].text.includes("[EMAIL_REDACTED]"));

  delete process.env.PII_RESPONSE_SANITIZATION;
});

// ── GDPR / EU Pattern Tests ──

test("sanitizePII detects and redacts IBAN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid IBAN: GB29 NWBK 6016 1331 9268 19 (GB29NWBK60161331926819)
  const input = "IBAN: GB29NWBK60161331926819";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[IBAN_REDACTED]"), "IBAN should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts ES DNI/NIE", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid DNI: 12345678Z
  const input = "DNI: 12345678Z";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[ES_DNI_REDACTED]"), "ES DNI should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts IT Codice Fiscale", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid CF: RSSMRA80A01H501U
  const input = "CF: RSSMRA80A01H501U";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[IT_CF_REDACTED]"), "IT Codice Fiscale should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts PL PESEL", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid PESEL: 85010112345 (checksum valid)
  const input = "PESEL: 85010112345";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[PL_PESEL_REDACTED]"), "PL PESEL should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts NL BSN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid BSN: 111222333 (11-proof)
  const input = "BSN: 111222333";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[NL_BSN_REDACTED]"), "NL BSN should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts DE Steuer-ID", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid Steuer-ID: 65929970489 (ISO 7064 Mod 11,10 + digit-structure rules)
  const input = "Steuer-ID: 65929970489";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[DE_STEUERID_REDACTED]"), "DE Steuer-ID should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts SE personnummer", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid personnummer: 800101-1009 (Luhn valid on 10 digits)
  const input = "Personnummer: 800101-1009";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[SE_PNR_REDACTED]"), "SE personnummer should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

// ── POPIA / South Africa Pattern Tests ──

test("sanitizePII detects and redacts ZA ID", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid SA ID: 8001015009087 (standard Luhn over all 13 digits)
  const input = "SA ID: 8001015009087";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[ZA_ID_REDACTED]"), "ZA ID should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts ZA phone", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid SA phone: +27 82 123 4567
  const input = "Phone: +27 82 123 4567";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[ZA_PHONE_REDACTED]"), "ZA phone should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts ZA VAT", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid SA VAT: 4000000000 (starts with 4, 10 digits)
  const input = "VAT: 4000000000";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[ZA_VAT_REDACTED]"), "ZA VAT should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts ZA tax reference", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Valid SA tax ref: 1000000008 (10 digits, Luhn) with a "tax" cue in front of it
  const input = "Tax Ref: 1000000008";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[ZA_TAXREF_REDACTED]"), "ZA tax ref should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

// ── Validator rejection tests (false positives should not be redacted) ──

test("sanitizePII does not redact invalid IBAN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Invalid IBAN (wrong check digits)
  const input = "IBAN: GB29NWBK60161331926818";
  const result = sanitizePII(input);

  assert.ok(!result.text.includes("[IBAN_REDACTED]"), "Invalid IBAN should not be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII does not redact invalid ES DNI", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Invalid DNI (wrong letter)
  const input = "DNI: 12345678X";
  const result = sanitizePII(input);

  assert.ok(!result.text.includes("[ES_DNI_REDACTED]"), "Invalid ES DNI should not be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII does not redact invalid ZA ID", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  // Invalid SA ID (wrong Luhn)
  const input = "SA ID: 8001015009088";
  const result = sanitizePII(input);

  assert.ok(!result.text.includes("[ZA_ID_REDACTED]"), "Invalid ZA ID should not be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});
