import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// GDPR (EU) + POPIA (ZA) identifiers: one shared pattern table consumed by the
// response sanitizer and the request masker. Masking stays opt-in; nothing here
// turns the feature flags on outside the test that sets them.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-gdpr-"));
process.env.DATA_DIR = tmpDir;
delete process.env.PII_REDACTION_ENABLED;
delete process.env.PII_RESPONSE_SANITIZATION;
delete process.env.PII_RESPONSE_SANITIZATION_MODE;

const { GDPR_POPIA_PATTERNS, buildGdprPopiaRules } =
  await import("../../src/shared/utils/piiPatterns.ts");
const { PII_BUILTIN_TYPES, PII_TEMPLATES } = await import("../../src/shared/constants/piiTypes.ts");
const { updatePiiSettingsSchema } =
  await import("../../src/shared/validation/schemas/piiSettings.ts");
const { setPiiSettings, clearPiiSettingsCache } = await import("../../src/lib/db/piiSettings.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { sanitizePII } = await import("../../src/lib/piiSanitizer.ts");
const { processPII } = await import("../../src/shared/utils/inputSanitizer.ts");

const NEW_IDS = GDPR_POPIA_PATTERNS.map((pattern) => pattern.name);
const NEW_LABELS = GDPR_POPIA_PATTERNS.map((pattern) => pattern.replacement);

function validate(name: string, value: string, context = ""): boolean {
  const def = GDPR_POPIA_PATTERNS.find((pattern) => pattern.name === name);
  assert.ok(def, `unknown pattern ${name}`);
  return def.validate(value, context);
}

test.after(() => {
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

// Identifiers with a correct check digit / structure, one table drives positive + negative checks.
const VALID: Array<{ name: string; value: string; context?: string; label: string }> = [
  { name: "iban", value: "GB29NWBK60161331926819", label: "[IBAN_REDACTED]" },
  { name: "iban", value: "DE89370400440532013000", label: "[IBAN_REDACTED]" },
  { name: "eu_vat", value: "DE136695976", label: "[EU_VAT_REDACTED]" },
  { name: "eu_vat", value: "NL004495445B01", label: "[EU_VAT_REDACTED]" },
  { name: "es_dni_nie", value: "12345678Z", label: "[ES_DNI_REDACTED]" },
  { name: "es_dni_nie", value: "X1234567L", label: "[ES_DNI_REDACTED]" },
  { name: "it_codice_fiscale", value: "RSSMRA80A01H501U", label: "[IT_CF_REDACTED]" },
  { name: "pl_pesel", value: "44051401359", label: "[PL_PESEL_REDACTED]" },
  { name: "nl_bsn", value: "111222333", label: "[NL_BSN_REDACTED]" },
  { name: "de_steuer_id", value: "65929970489", label: "[DE_STEUERID_REDACTED]" },
  { name: "se_personnummer", value: "811228-9874", label: "[SE_PNR_REDACTED]" },
  { name: "se_personnummer", value: "198112289874", label: "[SE_PNR_REDACTED]" },
  { name: "za_id", value: "8001015009087", label: "[ZA_ID_REDACTED]" },
  { name: "za_phone", value: "+27 82 123 4567", label: "[ZA_PHONE_REDACTED]" },
  { name: "za_phone", value: "082 123 4567", label: "[ZA_PHONE_REDACTED]" },
  { name: "za_vat", value: "4123456789", context: "VAT no ", label: "[ZA_VAT_REDACTED]" },
  { name: "za_tax_ref", value: "1000000008", context: "Tax ref ", label: "[ZA_TAXREF_REDACTED]" },
];

// Same shapes as the identifiers above but wrong checksum / structure / missing cue.
const INVALID: Array<{ name: string; value: string; context?: string }> = [
  { name: "iban", value: "GB29NWBK60161331926818" }, // MOD-97 fails
  { name: "iban", value: "GB29NWBK6016133192681" }, // wrong length for GB
  { name: "iban", value: "XX29NWBK60161331926819" }, // unknown country
  { name: "iban", value: "gh12abc" },
  { name: "eu_vat", value: "HELLO" }, // plain uppercase word
  { name: "eu_vat", value: "README" },
  { name: "eu_vat", value: "DE12345678" }, // DE needs 9 digits
  { name: "eu_vat", value: "ZZ123456789" }, // unknown member state
  { name: "es_dni_nie", value: "12345678X" }, // wrong control letter
  { name: "es_dni_nie", value: "X1234567A" },
  { name: "it_codice_fiscale", value: "RSSMRA80A01H501V" }, // wrong control letter
  { name: "pl_pesel", value: "44051401358" }, // checksum fails
  { name: "pl_pesel", value: "44131401350" }, // month 13
  { name: "nl_bsn", value: "123456789" }, // 11-proof fails
  { name: "nl_bsn", value: "000000000" }, // repeated digit
  { name: "de_steuer_id", value: "12345678901" }, // checksum fails
  { name: "de_steuer_id", value: "77777777778" }, // digit structure
  { name: "de_steuer_id", value: "05929970489" }, // leading zero
  { name: "se_personnummer", value: "811228-9875" }, // Luhn fails
  { name: "se_personnummer", value: "811328-9874" }, // month 13
  { name: "za_id", value: "8001015009083" }, // Luhn fails
  { name: "za_id", value: "1760000000000" }, // 13-digit millisecond timestamp
  { name: "za_phone", value: "0821234567" }, // bare national form: could be any order number
  { name: "za_vat", value: "4123456789" }, // no VAT cue
  { name: "za_vat", value: "4123456789", context: "order number " },
  { name: "za_tax_ref", value: "1000000008" }, // no tax cue
  { name: "za_tax_ref", value: "1000000000", context: "Tax ref " }, // Luhn fails
  { name: "za_tax_ref", value: "1760000000", context: "Tax ref " }, // unix timestamp: Luhn fails
];

test("every GDPR/POPIA pattern has a positive and a negative checksum case", () => {
  for (const name of NEW_IDS) {
    assert.ok(
      VALID.some((entry) => entry.name === name),
      `${name}: no valid sample`
    );
    assert.ok(
      INVALID.some((entry) => entry.name === name),
      `${name}: no invalid sample`
    );
  }
});

test("validators accept correct identifiers", () => {
  for (const entry of VALID) {
    assert.equal(
      validate(entry.name, entry.value, entry.context),
      true,
      `${entry.name} ${entry.value}`
    );
  }
});

test("validators reject wrong checksums, wrong structure and missing cues", () => {
  for (const entry of INVALID) {
    assert.equal(
      validate(entry.name, entry.value, entry.context),
      false,
      `${entry.name} ${entry.value}`
    );
  }
});

test("a bare digit run is never valid on its own", () => {
  for (const digits of ["0000000000", "1111111111", "99999999999", "1111111111111", "222222222"]) {
    for (const name of NEW_IDS) {
      assert.equal(validate(name, digits, "VAT tax "), false, `${name} ${digits}`);
    }
  }
});

test("every pattern core is bounded (no unbounded repeat) and compiles per call", () => {
  for (const def of GDPR_POPIA_PATTERNS) {
    const outsideClasses = def.core.replace(/\[[^\]]*\]/g, "").replace(/\\./g, "");
    assert.ok(!/[*+]/.test(outsideClasses), `${def.name}: unbounded repeat`);
  }
  const first = buildGdprPopiaRules();
  const second = buildGdprPopiaRules();
  assert.notEqual(first[0].regex, second[0].regex, "each caller gets its own stateful regex");
});

test("pathological input stays linear (ReDoS bound)", () => {
  const hostile = [
    "A".repeat(50_000),
    "1".repeat(50_000),
    "DE" + "9".repeat(50_000),
    "GB29" + "A1".repeat(25_000),
    "+27 ".repeat(10_000),
    "27-".repeat(15_000),
    "1-".repeat(25_000),
    "19".repeat(25_000) + "-",
  ];
  // Only the GDPR/POPIA rules are timed here: the older email pattern is not part of this change.
  for (const rule of buildGdprPopiaRules()) {
    for (const input of hostile) {
      const started = Date.now();
      for (const match of input.matchAll(rule.regex)) rule.validate(match[0], "");
      assert.ok(Date.now() - started < 1500, `${rule.name} backtracks on ${input.slice(0, 8)}`);
    }
  }
});

const FALSE_POSITIVE_CORPUS = [
  "Created at 1760000000000 (unix ms), order 123456789, trace 1234567890123.",
  "Use model gpt4o-mini or gh12abc, id AB12CD34, tag v20260417, HTTP2 and README.",
  "HELLO WORLD TODO FIXME NOTE: see ABCD1234 and XYZ99999999 in build-4455.",
  "Invoice 4123456789 was paid; reference 1000000008 is unrelated; call 0821234567.",
  "uuid 550e8400-e29b-41d4-a716-446655440000 and sha 9f86d081884c7d659a2feaa0c55ad015.",
];

test("request masker leaves ordinary identifiers alone", () => {
  for (const input of FALSE_POSITIVE_CORPUS) {
    const { text, detections } = processPII(input, true);
    for (const label of NEW_LABELS) assert.ok(!text.includes(label), `${label} in: ${text}`);
    for (const detection of detections)
      assert.ok(!NEW_IDS.includes(detection.type), detection.type);
  }
});

test("response sanitizer leaves ordinary identifiers alone", () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: null, customPatterns: [] });
    clearPiiSettingsCache();
    for (const input of FALSE_POSITIVE_CORPUS) {
      const { text, detections } = sanitizePII(input);
      for (const label of NEW_LABELS) assert.ok(!text.includes(label), `${label} in: ${text}`);
      for (const detection of detections) assert.ok(!NEW_IDS.includes(detection.pattern));
    }
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});

test("request masker redacts each valid identifier with its own label", () => {
  for (const entry of VALID) {
    const input = `${entry.context ?? "id: "}${entry.value} end`;
    const { text, detections } = processPII(input, true);
    assert.ok(text.includes(entry.label), `${entry.name} ${entry.value} -> ${text}`);
    assert.ok(!text.includes(entry.value), `${entry.value} leaked: ${text}`);
    assert.ok(
      detections.some((d) => d.type === entry.name),
      `${entry.name} not counted`
    );
  }
});

test("response sanitizer redacts each valid identifier with its own label", () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: null, customPatterns: [] });
    clearPiiSettingsCache();
    for (const entry of VALID) {
      const input = `${entry.context ?? "id: "}${entry.value} end`;
      const { text, detections } = sanitizePII(input);
      assert.ok(text.includes(entry.label), `${entry.name} ${entry.value} -> ${text}`);
      assert.ok(!text.includes(entry.value), `${entry.value} leaked: ${text}`);
      assert.ok(
        detections.some((d) => d.pattern === entry.name),
        `${entry.name} not counted`
      );
    }
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});

test("invalid checksums are not redacted on either side", () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: null, customPatterns: [] });
    clearPiiSettingsCache();
    for (const entry of INVALID) {
      const input = `${entry.context ?? "id: "}${entry.value} end`;
      const request = processPII(input, true);
      const response = sanitizePII(input);
      for (const detection of request.detections) {
        assert.notEqual(detection.type, entry.name, `request ${entry.name} ${entry.value}`);
      }
      for (const detection of response.detections) {
        assert.notEqual(detection.pattern, entry.name, `response ${entry.name} ${entry.value}`);
      }
    }
  } finally {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});

test("a multi-identifier text redacts only the valid ones", () => {
  const input =
    "IBAN GB29NWBK60161331926819, order 123456789, BSN 111222333, DNI 12345678X, build gh12abc";
  const { text } = processPII(input, true);
  assert.equal(
    text,
    "IBAN [IBAN_REDACTED], order 123456789, BSN [NL_BSN_REDACTED], DNI 12345678X, build gh12abc"
  );
});

test("the new ids are registered so per-type selection controls them", () => {
  for (const id of NEW_IDS) {
    assert.ok((PII_BUILTIN_TYPES as readonly string[]).includes(id), `${id} missing from catalog`);
  }
  assert.deepEqual([...new Set(NEW_IDS)].sort(), [...NEW_IDS].sort(), "pattern ids must be unique");
  const parsed = updatePiiSettingsSchema.safeParse({ enabledTypes: ["iban", "za_id", "nl_bsn"] });
  assert.equal(parsed.success, true, "settings schema accepts the new ids");

  const templateTypes = (id: string) => PII_TEMPLATES.find((tpl) => tpl.id === id)?.types ?? [];
  for (const def of GDPR_POPIA_PATTERNS) {
    const template = def.jurisdiction === "EU" ? "gdpr" : "popia";
    assert.ok(
      templateTypes(template).includes(def.name as never),
      `${def.name} not in ${template}`
    );
  }
});

test("catalog ids all have a label in the English UI messages", () => {
  const messages = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/i18n/messages/en.json"), "utf8")
  );
  const types = messages.settings.piiMasking.types;
  const templates = messages.settings.piiMasking.template;
  for (const id of PII_BUILTIN_TYPES) assert.equal(typeof types[id], "string", `types.${id}`);
  for (const tpl of PII_TEMPLATES)
    assert.equal(typeof templates[tpl.id], "string", `template.${tpl.id}`);
});

test("per-type selection runs only the chosen GDPR/POPIA types", () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    const text = "IBAN GB29NWBK60161331926819 and BSN 111222333";
    setPiiSettings({ enabledTypes: ["iban"], customPatterns: [] });
    clearPiiSettingsCache();
    const onlyIban = sanitizePII(text);
    assert.ok(onlyIban.text.includes("[IBAN_REDACTED]"));
    assert.ok(onlyIban.text.includes("111222333"), "deselected nl_bsn is left alone");

    const request = processPII(text, true, { enabledTypes: new Set(["nl_bsn"]) });
    assert.ok(request.text.includes("GB29NWBK60161331926819"));
    assert.ok(request.text.includes("[NL_BSN_REDACTED]"));
  } finally {
    setPiiSettings({ enabledTypes: null, customPatterns: [] });
    clearPiiSettingsCache();
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});
