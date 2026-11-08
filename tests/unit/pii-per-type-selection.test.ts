import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { GuardrailContext } from "../../src/lib/guardrails/base";

// Per-type PII selection, operator custom patterns (ReDoS-gated) and the
// detection counters. Masking stays opt-in: with the flags off nothing here
// may change a payload, even with custom patterns stored.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-per-type-"));
process.env.DATA_DIR = tmpDir;
delete process.env.PII_REDACTION_ENABLED;
delete process.env.PII_RESPONSE_SANITIZATION;
delete process.env.PII_RESPONSE_SANITIZATION_MODE;

const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { setPiiSettings, clearPiiSettingsCache } = await import("../../src/lib/db/piiSettings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { sanitizePII, sanitizePIIResponse } = await import("../../src/lib/piiSanitizer.ts");
const { processPII } = await import("../../src/shared/utils/inputSanitizer.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");
const { compilePiiCustomPattern, compilePiiCustomRules, wildcardToRegexSource } =
  await import("../../src/shared/utils/piiCustomPatterns.ts");
const { piiCustomPatternSchema, updatePiiSettingsSchema } =
  await import("../../src/shared/validation/schemas/piiSettings.ts");
const { getPiiDetectionStats, resetPiiDetectionStats } =
  await import("../../src/lib/pii/piiDetectionStats.ts");

const CONTEXT = {} as GuardrailContext;
const EMAIL = "jdoe@example.com";
const CPF = "529.982.247-25";
const TOKEN = "SK-abcdefghij0123456789";

function resetAll() {
  clearAllFeatureFlagOverrides();
  setPiiSettings({ enabledTypes: null, customPatterns: [] });
  clearPiiSettingsCache();
  resetPiiDetectionStats();
  delete process.env.PII_REDACTION_ENABLED;
  delete process.env.PII_RESPONSE_SANITIZATION;
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("response sanitizer honours the per-type selection", () => {
  resetAll();
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    const text = `mail ${EMAIL} cpf ${CPF}`;
    const all = sanitizePII(text);
    assert.ok(all.text.includes("[EMAIL_REDACTED]"));
    assert.ok(all.text.includes("[CPF_REDACTED]"), "unset selection keeps every type");

    setPiiSettings({ enabledTypes: ["email"] });
    const onlyEmail = sanitizePII(text);
    assert.ok(onlyEmail.text.includes("[EMAIL_REDACTED]"));
    assert.ok(onlyEmail.text.includes(CPF), "a deselected type is left alone");
    assert.deepEqual(
      onlyEmail.detections.map((d) => d.pattern),
      ["email"]
    );
  } finally {
    resetAll();
  }
});

test("request masker honours the per-type selection (ssn_us maps to ssn)", async () => {
  resetAll();
  process.env.PII_REDACTION_ENABLED = "true";
  try {
    setPiiSettings({ enabledTypes: ["ssn"] });
    const body = {
      messages: [{ role: "user", content: `mail ${EMAIL} ssn 123-45-6789 cpf ${CPF}` }],
    };
    const result = await new PIIMaskerGuardrail().preCall(body, CONTEXT);
    const masked = (result as { modifiedPayload?: typeof body }).modifiedPayload;
    assert.ok(masked, "the payload is masked");
    const content = masked.messages[0].content;
    assert.ok(content.includes("[SSN_REDACTED]"));
    assert.ok(content.includes(EMAIL), "email is not selected");
    assert.ok(content.includes(CPF), "cpf is not selected");
  } finally {
    resetAll();
  }
});

test("custom patterns are redacted on both sides when masking is on", async () => {
  resetAll();
  process.env.PII_REDACTION_ENABLED = "true";
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({
      customPatterns: [
        {
          id: "tok",
          name: "Internal token",
          type: "regex",
          pattern: "SK-[a-z0-9]{20}",
          enabled: true,
        },
        { id: "host", name: "Hosts", type: "wildcard", pattern: "*.corp.local", enabled: true },
      ],
    });
    const out = sanitizePII(`token ${TOKEN} host db1.corp.local`);
    assert.ok(!out.text.includes(TOKEN));
    assert.ok(!out.text.includes("db1.corp.local"));
    assert.ok(out.text.includes("[CUSTOM_REDACTED]"));

    const req = await new PIIMaskerGuardrail().preCall(
      { messages: [{ role: "user", content: `use ${TOKEN}` }] },
      CONTEXT
    );
    const masked = (req as { modifiedPayload?: { messages: Array<{ content: string }> } })
      .modifiedPayload;
    assert.equal(masked?.messages[0].content, "use [CUSTOM_REDACTED]");

    const custom = processPII(`x ${TOKEN}`, true, {
      enabledTypes: null,
      customRules: compilePiiCustomRules([
        { id: "t", name: "t", type: "regex", pattern: "SK-[a-z0-9]{20}", enabled: true },
      ]),
    });
    assert.equal(custom.text, "x [CUSTOM_REDACTED]");
    assert.deepEqual(custom.detections, [{ type: "custom:t", count: 1 }]);
  } finally {
    resetAll();
  }
});

test("flags off: payloads pass through untouched even with custom patterns stored", async () => {
  resetAll();
  setPiiSettings({
    enabledTypes: ["email"],
    customPatterns: [
      { id: "t", name: "t", type: "regex", pattern: "SK-[a-z0-9]{20}", enabled: true },
    ],
  });
  const text = `token ${TOKEN} mail ${EMAIL}`;
  assert.equal(sanitizePII(text).text, text);
  const body = { choices: [{ message: { content: text } }] };
  assert.deepEqual(sanitizePIIResponse(JSON.parse(JSON.stringify(body))), body);
  const req = await new PIIMaskerGuardrail().preCall(
    { messages: [{ role: "user", content: text }] },
    CONTEXT
  );
  assert.equal((req as { modifiedPayload?: unknown }).modifiedPayload, undefined);
  assert.equal(getPiiDetectionStats().total, 0, "nothing is counted while masking is off");
  resetAll();
});

test("catastrophic custom regex is rejected by the schema and skipped at runtime", () => {
  const evil = {
    id: "evil",
    name: "evil",
    type: "regex" as const,
    // Assembled at runtime so the deliberately catastrophic pattern is test data, not a
    // regex literal in source (static analysis flags a ReDoS-shaped literal).
    pattern: ["(a", "+)", "+$"].join(""),
    enabled: true,
  };
  assert.deepEqual(compilePiiCustomPattern(evil), { ok: false, reason: "unsafe" });
  assert.equal(piiCustomPatternSchema.safeParse(evil).success, false);
  assert.equal(updatePiiSettingsSchema.safeParse({ customPatterns: [evil] }).success, false);
  assert.equal(compilePiiCustomRules([evil]).length, 0, "a stored unsafe pattern never compiles");

  // Other refusals of the same gate.
  assert.equal(compilePiiCustomPattern({ type: "regex", pattern: "a*" }).ok, false);
  assert.equal(compilePiiCustomPattern({ type: "regex", pattern: "(" }).ok, false);
  assert.equal(compilePiiCustomPattern({ type: "regex", pattern: "REDACTED" }).ok, false);
  assert.equal(compilePiiCustomPattern({ type: "regex", pattern: "x", flags: "y" }).ok, false);
  assert.equal(compilePiiCustomPattern({ type: "regex", pattern: "x".repeat(501) }).ok, false);

  // A hand-written unsafe row in the DB is skipped instead of being compiled raw.
  resetAll();
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ customPatterns: [evil] });
    const text = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab";
    assert.equal(sanitizePII(text).text, text);
  } finally {
    resetAll();
  }
});

test("wildcards are literal except * and ?, and * is bounded", () => {
  assert.equal(wildcardToRegexSource("a.b*c?"), "a\\.b\\S{0,64}c\\S");
  assert.equal(wildcardToRegexSource("x**y"), "x\\S{0,64}y");
});

test("schema refuses duplicate ids, unknown types and empty updates", () => {
  const p = { id: "a", name: "a", type: "regex", pattern: "abc", enabled: true };
  assert.equal(updatePiiSettingsSchema.safeParse({ customPatterns: [p, p] }).success, false);
  assert.equal(updatePiiSettingsSchema.safeParse({ enabledTypes: ["nope"] }).success, false);
  assert.equal(updatePiiSettingsSchema.safeParse({}).success, false);
  assert.equal(updatePiiSettingsSchema.safeParse({ enabledTypes: null }).success, true);
});

test("detection counters count types (never values) while masking is on", async () => {
  resetAll();
  process.env.PII_REDACTION_ENABLED = "true";
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    await new PIIMaskerGuardrail().preCall(
      { messages: [{ role: "user", content: `${EMAIL} and b@example.org` }] },
      CONTEXT
    );
    sanitizePIIResponse({ choices: [{ message: { content: `cpf ${CPF}` } }] });
    const stats = getPiiDetectionStats();
    assert.deepEqual(stats.request, { email: 2 });
    assert.deepEqual(stats.response, { cpf: 1 });
    assert.equal(stats.total, 3);
    // No matched value is kept: the snapshot holds only the type counters, a total and a
    // timestamp — request/response were compared exactly above.
    assert.deepEqual(Object.keys(stats).sort(), ["request", "response", "since", "total"]);
    assert.ok(!Number.isNaN(Date.parse(stats.since)), "since is a timestamp");
  } finally {
    resetAll();
  }
});
