import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { GuardrailContext } from "../../src/lib/guardrails/base";

// Russian PII identifiers (passport_ru, snils_ru, inn_ru, phone_ru, vin):
// strict opt-in pattern table excluded from default `enabledTypes: null` redaction,
// selectable per type or via the "russian" preset, and compatible with the reversible vault.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-ru-"));
process.env.DATA_DIR = tmpDir;
delete process.env.PII_REDACTION_ENABLED;
delete process.env.PII_RESPONSE_SANITIZATION;
delete process.env.PII_RESPONSE_SANITIZATION_MODE;
delete process.env.PII_REVERSIBLE_VAULT_ENABLED;

const { RU_PII_PATTERNS, buildRuPiiRules } =
  await import("../../src/shared/utils/piiPatterns.ts");
const {
  PII_BUILTIN_TYPES,
  PII_DEFAULT_BUILTIN_TYPES,
  PII_OPT_IN_TYPES,
  PII_TEMPLATES,
  resolveInitialPiiSelection,
  serializePiiSelectionForSave,
} = await import("../../src/shared/constants/piiTypes.ts");
const { updatePiiSettingsSchema } =
  await import("../../src/shared/validation/schemas/piiSettings.ts");
const { setPiiSettings, clearPiiSettingsCache } = await import("../../src/lib/db/piiSettings.ts");
const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { sanitizePII } = await import("../../src/lib/piiSanitizer.ts");
const { processPII } = await import("../../src/shared/utils/inputSanitizer.ts");
const { PIIMaskerGuardrail } = await import("../../src/lib/guardrails/piiMasker.ts");
const { runWithRequestTokenVault } =
  await import("../../src/lib/pii/requestTokenVaultScope.ts");
const { getActiveRequestTokenVault } = await import("../../src/lib/pii/tokenVault.ts");
const { buildNonStreamingJsonResponse } =
  await import("../../open-sse/handlers/chatCore/nonStreamingJsonResponse.ts");

const RU_IDS = RU_PII_PATTERNS.map((pattern) => pattern.name);
const RU_LABELS = RU_PII_PATTERNS.map((pattern) => pattern.replacement);
const RU_ENABLED_SET = new Set<string>(RU_IDS);
const CONTEXT = {} as GuardrailContext;

function validate(name: string, value: string, context = ""): boolean {
  const def = RU_PII_PATTERNS.find((pattern) => pattern.name === name);
  assert.ok(def, `unknown pattern ${name}`);
  return def.validate(value, context);
}

function resetAll() {
  clearAllFeatureFlagOverrides();
  setPiiSettings({ enabledTypes: null, customPatterns: [] });
  clearPiiSettingsCache();
  delete process.env.PII_REDACTION_ENABLED;
  delete process.env.PII_RESPONSE_SANITIZATION;
  delete process.env.PII_REVERSIBLE_VAULT_ENABLED;
}

test.after(() => {
  resetAll();
  resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

const VALID: Array<{ name: string; value: string; context?: string; label: string }> = [
  { name: "phone_ru", value: "+7 999 123-45-67", label: "[RU_PHONE_REDACTED]" },
  { name: "phone_ru", value: "+79991234567", label: "[RU_PHONE_REDACTED]" },
  { name: "phone_ru", value: "8 (999) 123-45-67", label: "[RU_PHONE_REDACTED]" },
  { name: "phone_ru", value: "8-800-555-35-35", label: "[RU_PHONE_REDACTED]" },
  { name: "passport_ru", value: "45 12 123456", label: "[RU_PASSPORT_REDACTED]" },
  {
    name: "passport_ru",
    value: "4512 123456",
    context: "Passport ",
    label: "[RU_PASSPORT_REDACTED]",
  },
  { name: "snils_ru", value: "112-233-445 95", label: "[RU_SNILS_REDACTED]" },
  { name: "snils_ru", value: "087 654 303 00", label: "[RU_SNILS_REDACTED]" },
  { name: "inn_ru", value: "7707083893", label: "[RU_INN_REDACTED]" },
  { name: "inn_ru", value: "500100732259", label: "[RU_INN_REDACTED]" },
  { name: "vin", value: "1HGCM82633A004352", label: "[VIN_REDACTED]" },
  { name: "vin", value: "XTA210990Y2766389", context: "VIN ", label: "[VIN_REDACTED]" },
];

const INVALID: Array<{ name: string; value: string; context?: string }> = [
  { name: "phone_ru", value: "89991234567" }, // bare 11-digit number without separators
  { name: "phone_ru", value: "+7 000 000-00-00" }, // repeated / zero area code
  { name: "phone_ru", value: "8 (012) 345-67-89" }, // invalid leading 0 area code
  { name: "passport_ru", value: "00 12 123456" }, // invalid 00 region series
  { name: "passport_ru", value: "4512 123456" }, // 4+6 digits without passport cue
  { name: "passport_ru", value: "45 12 000000" }, // zero passport number
  { name: "snils_ru", value: "112-233-445 96" }, // mod-101 checksum fails
  { name: "snils_ru", value: "001-001-998 00" }, // below checksum threshold
  { name: "snils_ru", value: "111-111-111 11" }, // repeated digits
  { name: "inn_ru", value: "7707083894" }, // 10-digit checksum fails
  { name: "inn_ru", value: "500100732258" }, // 12-digit checksum fails
  { name: "inn_ru", value: "0007083893" }, // invalid 00 region prefix
  { name: "inn_ru", value: "1760000000" }, // unix timestamp
  { name: "vin", value: "12345678901234567" }, // digits only
  { name: "vin", value: "ABCDEFGHJKLMNPRST" }, // letters only
  { name: "vin", value: "1A2B3C4D5E6F78901" }, // pure hex without VIN cue
  { name: "vin", value: "1HGCM82693A004352" }, // wrong ISO 3779 check digit without cue
];

test("every RU pattern has positive and negative validation cases", () => {
  for (const name of RU_IDS) {
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

test("validators accept valid RU identifiers and reject invalid checksums/false positives", () => {
  for (const entry of VALID) {
    assert.equal(
      validate(entry.name, entry.value, entry.context),
      true,
      `expected valid: ${entry.name} ${entry.value}`
    );
  }
  for (const entry of INVALID) {
    assert.equal(
      validate(entry.name, entry.value, entry.context),
      false,
      `expected invalid: ${entry.name} ${entry.value}`
    );
  }
});

test("every RU pattern core is bounded, marked optIn, and compiles per call", () => {
  for (const def of RU_PII_PATTERNS) {
    const outsideClasses = def.core.replace(/\[[^\]]*\]/g, "").replace(/\\./g, "");
    assert.ok(!/[*+]/.test(outsideClasses), `${def.name}: unbounded repeat`);
  }
  const first = buildRuPiiRules();
  const second = buildRuPiiRules();
  assert.notEqual(first[0].regex, second[0].regex, "each caller gets its own stateful regex");
  for (const rule of first) {
    assert.equal(rule.optIn, true, `${rule.name} must be marked optIn: true`);
  }
});

test("Scenario A1: default enabledTypes=null leaves RU PII untouched and preserves US/BR priority", async () => {
  resetAll();
  process.env.PII_REDACTION_ENABLED = "true";
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    // Bare 10/11-digit runs (+79991234567, 7707083893) already match pre-existing phone_br on main;
    // all other RU samples must remain byte-identical, and zero RU rules/labels may fire for any sample.
    const nonPhoneBrOverlap = VALID.filter(
      (entry) => entry.value !== "+79991234567" && entry.value !== "7707083893"
    );
    for (const entry of nonPhoneBrOverlap) {
      const input = `${entry.context ?? "id: "}${entry.value} end`;
      const req = processPII(input, true);
      assert.equal(req.text, input, `default request masker must not redact ${entry.name}`);
      assert.equal(req.detections.length, 0, `default request masker must not detect ${entry.name}`);

      const res = sanitizePII(input);
      assert.equal(res.text, input, `default response sanitizer must not redact ${entry.name}`);
      assert.equal(res.detections.length, 0, `default response sanitizer must not detect ${entry.name}`);
    }

    for (const entry of VALID) {
      const input = `${entry.context ?? "id: "}${entry.value} end`;
      const req = processPII(input, true);
      const res = sanitizePII(input);
      for (const label of RU_LABELS) {
        assert.ok(!req.text.includes(label), `default request emitted RU label ${label}`);
        assert.ok(!res.text.includes(label), `default response emitted RU label ${label}`);
      }
      for (const d of req.detections) assert.ok(!RU_IDS.includes(d.type), d.type);
      for (const d of res.detections) assert.ok(!RU_IDS.includes(d.pattern), d.pattern);
    }

    const guardrailRes = await new PIIMaskerGuardrail().preCall(
      {
        messages: [
          {
            role: "user",
            content:
              "RU +7 999 123-45-67 passport 45 12 123456 SNILS 112-233-445 95 INN 500100732259 VIN 1HGCM82633A004352",
          },
        ],
      },
      CONTEXT
    );
    assert.equal(
      (guardrailRes as { modifiedPayload?: unknown }).modifiedPayload,
      undefined,
      "guardrail must leave RU PII untouched when enabledTypes is null"
    );

    // US/BR phone and CPF keep their original labels without interference.
    const usBrInput = "BR (11) 98765-4321 CPF 529.982.247-25 US +1 415-555-0199";
    const reqUsBr = processPII(usBrInput, true);
    assert.ok(reqUsBr.text.includes("[PHONE_REDACTED]"));
    assert.ok(reqUsBr.text.includes("[CPF_REDACTED]"));
    for (const label of RU_LABELS) assert.ok(!reqUsBr.text.includes(label));

    const resUsBr = sanitizePII(usBrInput);
    assert.ok(resUsBr.text.includes("[PHONE_REDACTED]"));
    assert.ok(resUsBr.text.includes("[CPF_REDACTED]"));
    for (const label of RU_LABELS) assert.ok(!resUsBr.text.includes(label));

    // Even when all 28 types ("full") are explicitly enabled, phone_br keeps priority over inn_ru.
    const fullSet = new Set<string>(PII_BUILTIN_TYPES);
    const reqFull = processPII("7707083893", true, { enabledTypes: fullSet });
    assert.equal(reqFull.text, "[PHONE_REDACTED]");
    setPiiSettings({ enabledTypes: [...PII_BUILTIN_TYPES], customPatterns: [] });
    clearPiiSettingsCache();
    const resFull = sanitizePII("7707083893");
    assert.equal(resFull.text, "[PHONE_REDACTED]");
  } finally {
    resetAll();
  }
});

test("Scenario A2: explicit opt-in redacts all 5 RU types with RU labels on both sanitizers", () => {
  resetAll();
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: [...RU_IDS], customPatterns: [] });
    clearPiiSettingsCache();

    for (const entry of VALID) {
      const input = `${entry.context ?? "id: "}${entry.value} end`;
      const req = processPII(input, true, { enabledTypes: RU_ENABLED_SET });
      assert.ok(req.text.includes(entry.label), `request ${entry.name}: ${req.text}`);
      assert.ok(!req.text.includes(entry.value), `request leaked ${entry.value}`);
      assert.ok(
        req.detections.some((d) => d.type === entry.name),
        `request ${entry.name} not counted`
      );

      const res = sanitizePII(input);
      assert.ok(res.text.includes(entry.label), `response ${entry.name}: ${res.text}`);
      assert.ok(!res.text.includes(entry.value), `response leaked ${entry.value}`);
      assert.ok(
        res.detections.some((d) => d.pattern === entry.name),
        `response ${entry.name} not counted`
      );
    }
  } finally {
    resetAll();
  }
});

test("invalid checksums and ordinary numbers/IDs are left untouched even when RU types are enabled", () => {
  resetAll();
  const falsePositives = [
    "Order 89991234567, timestamp 1760000000, build 2026 123456, sha 1A2B3C4D5E6F78901.",
    "Bad SNILS 112-233-445 96, bad INN 7707083894, bad 12-INN 500100732258, bad passport 00 12 123456.",
  ];
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: [...RU_IDS], customPatterns: [] });
    clearPiiSettingsCache();

    for (const input of falsePositives) {
      const req = processPII(input, true, { enabledTypes: RU_ENABLED_SET });
      const res = sanitizePII(input);
      for (const label of RU_LABELS) {
        assert.ok(!req.text.includes(label), `request false positive ${label}: ${req.text}`);
        assert.ok(!res.text.includes(label), `response false positive ${label}: ${res.text}`);
      }
      for (const d of req.detections) assert.ok(!RU_IDS.includes(d.type), d.type);
      for (const d of res.detections) assert.ok(!RU_IDS.includes(d.pattern), d.pattern);
    }
  } finally {
    resetAll();
  }
});

test("Scenario A3: catalog split, schema, russian template, i18n, and PiiMaskingCard default/save semantics", () => {
  assert.equal(PII_DEFAULT_BUILTIN_TYPES.length, 23);
  assert.equal(PII_OPT_IN_TYPES.length, 5);
  assert.equal(PII_BUILTIN_TYPES.length, 28);
  for (const id of RU_IDS) {
    assert.ok(!(PII_DEFAULT_BUILTIN_TYPES as readonly string[]).includes(id), `${id} must not be in default types`);
    assert.ok((PII_OPT_IN_TYPES as readonly string[]).includes(id), `${id} missing from opt-in types`);
    assert.ok((PII_BUILTIN_TYPES as readonly string[]).includes(id), `${id} missing from catalog`);
  }

  const parsed = updatePiiSettingsSchema.safeParse({ enabledTypes: [...RU_IDS] });
  assert.equal(parsed.success, true, "settings schema accepts RU ids");

  const russianTpl = PII_TEMPLATES.find((tpl) => tpl.id === "russian");
  assert.ok(russianTpl, "russian template exists");
  assert.deepEqual(russianTpl.types, ["email", "passport_ru", "snils_ru", "inn_ru", "phone_ru", "vin"]);

  const messages = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src/i18n/messages/en.json"), "utf8")
  );
  for (const id of PII_BUILTIN_TYPES) {
    assert.equal(typeof messages.settings.piiMasking.types[id], "string", `en.json types.${id}`);
  }
  assert.equal(typeof messages.settings.piiMasking.template.russian, "string");

  // PiiMaskingCard initial/apply state when GET returns enabledTypes: null
  const initial = resolveInitialPiiSelection(null);
  assert.deepEqual(initial, [...PII_DEFAULT_BUILTIN_TYPES]);
  for (const id of RU_IDS) {
    assert.equal(initial.includes(id), false, `${id} must start unchecked`);
  }

  // Saving default selection collapses to null; checking any RU type or clicking russian/full sends explicit array
  assert.equal(serializePiiSelectionForSave(initial), null);
  assert.deepEqual(serializePiiSelectionForSave([...PII_BUILTIN_TYPES]), [...PII_BUILTIN_TYPES]);
  assert.deepEqual(serializePiiSelectionForSave(russianTpl.types), [...russianTpl.types]);
  assert.deepEqual(
    serializePiiSelectionForSave([...PII_DEFAULT_BUILTIN_TYPES, "phone_ru"]),
    [...PII_DEFAULT_BUILTIN_TYPES, "phone_ru"]
  );

  // Per-type selection runs only the chosen RU type
  resetAll();
  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    const text = "SNILS 112-233-445 95 and INN 7707083893";
    setPiiSettings({ enabledTypes: ["snils_ru"], customPatterns: [] });
    clearPiiSettingsCache();
    const onlySnils = sanitizePII(text);
    assert.ok(onlySnils.text.includes("[RU_SNILS_REDACTED]"));
    assert.ok(onlySnils.text.includes("7707083893"), "deselected inn_ru stays untouched");

    const reqOnlyInn = processPII(text, true, { enabledTypes: new Set(["inn_ru"]) });
    assert.ok(reqOnlyInn.text.includes("112-233-445 95"), "deselected snils_ru stays untouched");
    assert.ok(reqOnlyInn.text.includes("[RU_INN_REDACTED]"));
  } finally {
    resetAll();
  }
});

test("reversible PII vault round-trips RU identifiers end-to-end when opted in", async () => {
  resetAll();
  process.env.PII_REDACTION_ENABLED = "true";
  process.env.PII_REVERSIBLE_VAULT_ENABLED = "true";
  const russianTpl = PII_TEMPLATES.find((tpl) => tpl.id === "russian")!;
  setPiiSettings({ enabledTypes: [...russianTpl.types], customPatterns: [] });
  clearPiiSettingsCache();

  const prompt =
    "Call +7 999 123-45-67, passport 45 12 123456, SNILS 112-233-445 95, INN 7707083893, VIN 1HGCM82633A004352";

  try {
    const response = await runWithRequestTokenVault(
      async () => {
        const result = await new PIIMaskerGuardrail().preCall(
          { messages: [{ role: "user", content: prompt }] },
          { tokenVault: getActiveRequestTokenVault() ?? null }
        );
        const masked = (result.modifiedPayload as { messages: Array<{ content: string }> })
          .messages[0].content;

        assert.ok(!masked.includes("+7 999 123-45-67"));
        assert.ok(!masked.includes("45 12 123456"));
        assert.ok(!masked.includes("112-233-445 95"));
        assert.ok(!masked.includes("7707083893"));
        assert.ok(!masked.includes("1HGCM82633A004352"));
        assert.match(masked, /<<PII_PHONE_RU_[A-Z]{8}_\d+>>/);
        assert.match(masked, /<<PII_PASSPORT_RU_[A-Z]{8}_\d+>>/);
        assert.match(masked, /<<PII_SNILS_RU_[A-Z]{8}_\d+>>/);
        assert.match(masked, /<<PII_INN_RU_[A-Z]{8}_\d+>>/);
        assert.match(masked, /<<PII_VIN_[A-Z]{8}_\d+>>/);

        return buildNonStreamingJsonResponse(
          {
            id: "ru-vault-1",
            choices: [{ index: 0, message: { role: "assistant", content: masked } }],
          },
          { "Content-Type": "application/json" }
        );
      },
      { log: { warn() {} } }
    );

    const body = JSON.parse(await response.text()) as {
      choices: Array<{ message: { content: string } }>;
    };
    assert.equal(body.choices[0].message.content, prompt);
  } finally {
    resetAll();
  }
});

test("VIN supports Cyrillic context cues and lowercase values on both sanitizers", () => {
  resetAll();
  assert.equal(validate("vin", "XTA21099AY2766389", ""), false);
  assert.equal(validate("vin", "XTA21099AY2766389", "кузов: "), true);
  assert.equal(validate("vin", "1hgcm82633a004352", ""), true);
  assert.equal(validate("vin", "xta21099ay2766389", "кузов: "), true);
  assert.equal(validate("passport_ru", "4512 123456", "паспорт: "), true);
  assert.equal(validate("passport_ru", "4512 123456", "непаспорт: "), false);

  process.env.PII_RESPONSE_SANITIZATION = "true";
  try {
    setPiiSettings({ enabledTypes: ["vin"], customPatterns: [] });
    clearPiiSettingsCache();

    const cases = [
      { input: "кузов: XTA21099AY2766389", raw: "XTA21099AY2766389" },
      { input: "1hgcm82633a004352", raw: "1hgcm82633a004352" },
      { input: "кузов: xta21099ay2766389", raw: "xta21099ay2766389" },
    ];

    for (const { input, raw } of cases) {
      const req = processPII(input, true, { enabledTypes: new Set(["vin"]) });
      assert.ok(req.text.includes("[VIN_REDACTED]"), `request failed for ${input}: ${req.text}`);
      assert.ok(!req.text.includes(raw), `request leaked ${raw}`);

      const res = sanitizePII(input);
      assert.ok(res.text.includes("[VIN_REDACTED]"), `response failed for ${input}: ${res.text}`);
      assert.ok(!res.text.includes(raw), `response leaked ${raw}`);
    }
  } finally {
    resetAll();
  }
});
