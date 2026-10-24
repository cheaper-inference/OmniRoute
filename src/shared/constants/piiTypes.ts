/**
 * PII masking catalog shared by the response sanitizer, the request masker,
 * the settings API and the dashboard panel.
 *
 * The ids are the pattern names of `src/lib/piiSanitizer.ts`. The request-side
 * engine (`src/shared/utils/inputSanitizer.ts`) names one of them differently;
 * `PII_REQUEST_TYPE_ALIASES` maps it back so one selection drives both sides.
 *
 * Masking itself stays opt-in (PII_REDACTION_ENABLED / PII_RESPONSE_SANITIZATION,
 * both default off). Nothing here turns it on.
 */

export const PII_BUILTIN_TYPES = [
  "email",
  "phone_us",
  "phone_br",
  "ssn",
  "credit_card",
  "cpf",
  "cnpj",
  "ip_address",
  "ipv6_address",
  "aws_key",
  "api_key_generic",
  // GDPR (EU) — validators in src/shared/utils/piiPatterns.ts
  "iban",
  "eu_vat",
  "es_dni_nie",
  "it_codice_fiscale",
  "pl_pesel",
  "nl_bsn",
  "de_steuer_id",
  "se_personnummer",
  // POPIA (South Africa)
  "za_id",
  "za_phone",
  "za_vat",
  "za_tax_ref",
] as const;

export type PiiBuiltinType = (typeof PII_BUILTIN_TYPES)[number];

/** Request-side pattern name → catalog id. */
export const PII_REQUEST_TYPE_ALIASES: Readonly<Record<string, PiiBuiltinType>> = {
  ssn_us: "ssn",
};

/** Dashboard presets. They only fill the per-type selection; there is no server-side template. */
export const PII_TEMPLATES: ReadonlyArray<{ id: string; types: readonly PiiBuiltinType[] }> = [
  { id: "minimal", types: ["email", "phone_us", "phone_br"] },
  {
    id: "standard",
    types: [
      "email",
      "phone_us",
      "phone_br",
      "cpf",
      "cnpj",
      "credit_card",
      "ip_address",
      "aws_key",
      "api_key_generic",
    ],
  },
  { id: "financial", types: ["credit_card", "cpf", "cnpj", "aws_key", "api_key_generic"] },
  { id: "brazilian", types: ["cpf", "cnpj", "phone_br", "email"] },
  { id: "usa", types: ["ssn", "phone_us", "email"] },
  {
    id: "gdpr",
    types: [
      "email",
      "iban",
      "eu_vat",
      "es_dni_nie",
      "it_codice_fiscale",
      "pl_pesel",
      "nl_bsn",
      "de_steuer_id",
      "se_personnummer",
    ],
  },
  { id: "popia", types: ["email", "za_id", "za_phone", "za_vat", "za_tax_ref"] },
  { id: "full", types: [...PII_BUILTIN_TYPES] },
];

export const PII_CUSTOM_PATTERN_LIMITS = {
  maxPatterns: 20,
  maxPatternLength: 500,
  maxNameLength: 80,
  maxIdLength: 64,
  /** UTF-8 bytes accepted by the pattern test endpoint. */
  maxSampleBytes: 8192,
} as const;
