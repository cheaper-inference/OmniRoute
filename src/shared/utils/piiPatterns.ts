/**
 * Shared PII patterns — GDPR (EU) and POPIA (South Africa).
 *
 * Single source of truth for these identifiers, consumed by BOTH sanitizers:
 * the response side (`src/lib/piiSanitizer.ts`) and the request side
 * (`src/shared/utils/inputSanitizer.ts`). Every pattern carries a validator
 * (checksum, structure or surrounding-context check) and a match is redacted
 * only when its validator accepts it. A bare run of digits is never redacted
 * on its own: order numbers, timestamps, build numbers and identifiers such as
 * `gpt4o` or `gh12abc` must survive.
 *
 * The patterns are opt-in like the rest of PII masking (PII_REDACTION_ENABLED /
 * PII_RESPONSE_SANITIZATION stay off by default) and are selectable per type
 * through the ids registered in `src/shared/constants/piiTypes.ts`.
 *
 * @module shared/utils/piiPatterns
 */

export type Jurisdiction = "EU" | "ZA";

/** Characters of text before a match handed to a validator as context. */
const PII_CONTEXT_WINDOW = 48;

/**
 * Decides whether a regex match really is the identifier.
 * `context` is the text right before the match (at most PII_CONTEXT_WINDOW chars).
 */
type PiiMatchValidator = (match: string, context: string) => boolean;

interface GdprPopiaPatternDef {
  name: string;
  /** Regex source without boundaries, wrapped by `compileGdprPopiaPattern`. Must not contain capture groups. */
  core: string;
  flags: string;
  replacement: string;
  severity: "high" | "medium" | "low";
  jurisdiction: Jurisdiction;
  validate: PiiMatchValidator;
}

// ── Generic helpers ──

const digitsOnly = (value: string): string => value.replace(/\D/g, "");

/** `0000000000`, `1111111111`, ... are never real identifiers. */
const isRepeatedDigit = (digits: string): boolean => /^(\d)\1+$/.test(digits);

function isValidLuhn(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/** Day-of-month sanity check shared by the birth-date based identifiers. */
const isPlausibleDay = (day: number): boolean => day >= 1 && day <= 31;

// ── IBAN (ISO 13616, MOD-97-10) ──

/** Total IBAN length per country (ISO 13616 registry). An unknown country is not an IBAN. */
const IBAN_LENGTHS: Readonly<Record<string, number>> = {
  AD: 24,
  AE: 23,
  AL: 28,
  AT: 20,
  AZ: 28,
  BA: 20,
  BE: 16,
  BG: 22,
  BH: 22,
  BR: 29,
  BY: 28,
  CH: 21,
  CR: 22,
  CY: 28,
  CZ: 24,
  DE: 22,
  DK: 18,
  DO: 28,
  EE: 20,
  EG: 29,
  ES: 24,
  FI: 18,
  FO: 18,
  FR: 27,
  GB: 22,
  GE: 22,
  GI: 23,
  GL: 18,
  GR: 27,
  GT: 28,
  HR: 21,
  HU: 28,
  IE: 22,
  IL: 23,
  IQ: 23,
  IS: 26,
  IT: 27,
  JO: 30,
  KW: 30,
  KZ: 20,
  LB: 28,
  LC: 32,
  LI: 21,
  LT: 20,
  LU: 20,
  LV: 21,
  MC: 27,
  MD: 24,
  ME: 22,
  MK: 19,
  MR: 27,
  MT: 31,
  MU: 30,
  NL: 18,
  NO: 15,
  PK: 24,
  PL: 28,
  PS: 29,
  PT: 25,
  QA: 29,
  RO: 24,
  RS: 22,
  SA: 24,
  SC: 31,
  SE: 24,
  SI: 19,
  SK: 24,
  SM: 27,
  ST: 25,
  SV: 28,
  TL: 23,
  TN: 24,
  TR: 26,
  UA: 29,
  VA: 22,
  VG: 24,
  XK: 20,
};

function isValidIBAN(value: string): boolean {
  const cleaned = value.replace(/\s/g, "").toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(cleaned)) return false;
  if (IBAN_LENGTHS[cleaned.slice(0, 2)] !== cleaned.length) return false;

  const rearranged = cleaned.slice(4) + cleaned.slice(0, 4);
  let remainder = 0;
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    // Letters expand to two digits (A=10 ... Z=35); digits stay as they are.
    const chunk = code >= 65 ? String(code - 55) : ch;
    for (const digit of chunk) remainder = (remainder * 10 + Number(digit)) % 97;
  }
  return remainder === 1;
}

// ── EU VAT numbers (format per member state; VIES lookup is out of scope) ──

const EU_VAT_FORMATS: Readonly<Record<string, RegExp>> = {
  AT: /^U\d{8}$/,
  BE: /^[01]\d{9}$/,
  BG: /^\d{9,10}$/,
  CY: /^\d{8}[A-Z]$/,
  CZ: /^\d{8,10}$/,
  DE: /^\d{9}$/,
  DK: /^\d{8}$/,
  EE: /^\d{9}$/,
  EL: /^\d{9}$/,
  ES: /^[A-Z0-9]\d{7}[A-Z0-9]$/,
  FI: /^\d{8}$/,
  FR: /^[A-Z0-9]{2}\d{9}$/,
  HR: /^\d{11}$/,
  HU: /^\d{8}$/,
  IE: /^(?:\d{7}[A-Z]{1,2}|\d[A-Z+*]\d{5}[A-Z])$/,
  IT: /^\d{11}$/,
  LT: /^(?:\d{9}|\d{12})$/,
  LU: /^\d{8}$/,
  LV: /^\d{11}$/,
  MT: /^\d{8}$/,
  NL: /^\d{9}B\d{2}$/,
  PL: /^\d{10}$/,
  PT: /^\d{9}$/,
  RO: /^\d{2,10}$/,
  SE: /^\d{12}$/,
  SI: /^\d{8}$/,
  SK: /^\d{10}$/,
  XI: /^(?:\d{9}|\d{12}|GD\d{3}|HA\d{3})$/,
};

/** An unknown country prefix is NOT a VAT number: `HELLO` or `README` must not be redacted. */
function isValidEU_VAT(value: string): boolean {
  const cleaned = value.toUpperCase().replace(/\s/g, "");
  if (!/^[A-Z]{2}[A-Z0-9+*]{2,12}$/.test(cleaned)) return false;
  const format = EU_VAT_FORMATS[cleaned.slice(0, 2)];
  return format !== undefined && format.test(cleaned.slice(2));
}

// ── Spain: DNI (8 digits) and NIE (X/Y/Z + 7 digits), check letter = value mod 23 ──

function isValidES_DNI_NIE(value: string): boolean {
  const cleaned = value.toUpperCase().replace(/[\s.-]/g, "");
  const parts = /^(\d{8}|[XYZ]\d{7})([A-Z])$/.exec(cleaned);
  if (!parts) return false;
  const numeric = parts[1].replace("X", "0").replace("Y", "1").replace("Z", "2");
  return "TRWAGMYFPDXBNJZSQVHLCKE"[parseInt(numeric, 10) % 23] === parts[2];
}

// ── Italy: Codice Fiscale (16 chars, odd/even position tables, check letter) ──

const CF_ODD_VALUES = [
  1, 0, 5, 7, 9, 13, 15, 17, 19, 21, 2, 4, 18, 20, 11, 3, 6, 8, 12, 14, 16, 10, 22, 25, 24, 23,
];

function cfValue(ch: string, isOddPosition: boolean): number {
  const index = /\d/.test(ch) ? ch.charCodeAt(0) - 48 : ch.charCodeAt(0) - 65;
  if (!isOddPosition) return index;
  return CF_ODD_VALUES[index];
}

function isValidIT_CodiceFiscale(value: string): boolean {
  const cleaned = value.toUpperCase().replace(/\s/g, "");
  if (!/^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(cleaned)) return false;
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    // Positions are 1-based in the specification: index 0 is the first (odd) position.
    sum += cfValue(cleaned[i], i % 2 === 0);
  }
  return String.fromCharCode(65 + (sum % 26)) === cleaned[15];
}

// ── Poland: PESEL (11 digits, weights 1379 1379 13, encoded birth date) ──

function isValidPL_PESEL(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length !== 11 || isRepeatedDigit(digits)) return false;

  // Month carries the century: +0 (1900s), +20 (2000s), +40 (2100s), +60 (2200s), +80 (1800s).
  const month = parseInt(digits.slice(2, 4), 10) % 20;
  if (month < 1 || month > 12 || !isPlausibleDay(parseInt(digits.slice(4, 6), 10))) return false;

  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i], 10) * weights[i];
  return (10 - (sum % 10)) % 10 === parseInt(digits[10], 10);
}

// ── Netherlands: BSN (9 digits, 11-proof with weights 9..2,-1) ──

function isValidNL_BSN(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length !== 9 || isRepeatedDigit(digits)) return false;
  const weights = [9, 8, 7, 6, 5, 4, 3, 2, -1];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i], 10) * weights[i];
  return sum % 11 === 0;
}

// ── Germany: Steuer-ID (11 digits, ISO 7064 Mod 11,10 + structural rules) ──

function hasSteuerIdDigitStructure(digits: string): boolean {
  if (digits[0] === "0") return false;
  const counts = new Map<string, number>();
  for (const digit of digits.slice(0, 10)) counts.set(digit, (counts.get(digit) ?? 0) + 1);
  // Exactly one digit occurs two or three times in the first ten; every other digit at most once.
  const repeated = [...counts.values()].filter((count) => count > 1);
  if (repeated.length !== 1 || repeated[0] > 3) return false;
  return !/(\d)\1\1/.test(digits.slice(0, 10));
}

function isValidDE_SteuerID(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length !== 11 || !hasSteuerIdDigitStructure(digits)) return false;

  let product = 10;
  for (let i = 0; i < 10; i++) {
    let sum = (parseInt(digits[i], 10) + product) % 10;
    if (sum === 0) sum = 10;
    product = (sum * 2) % 11;
  }
  return (11 - product) % 10 === parseInt(digits[10], 10);
}

// ── Sweden: personnummer (YYMMDD-NNNC or YYYYMMDDNNNC, Luhn over the last ten digits) ──

function isValidSE_Personnummer(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length !== 10 && digits.length !== 12) return false;
  if (digits.length === 12 && !/^(?:19|20)/.test(digits)) return false;
  const tenDigits = digits.slice(-10);
  if (isRepeatedDigit(tenDigits)) return false;

  const month = parseInt(tenDigits.slice(2, 4), 10);
  const day = parseInt(tenDigits.slice(4, 6), 10);
  // Coordination numbers (samordningsnummer) add 60 to the day.
  const plausibleDay = isPlausibleDay(day) || isPlausibleDay(day - 60);
  if (month < 1 || month > 12 || !plausibleDay) return false;
  return isValidLuhn(tenDigits);
}

// ── South Africa ──

/** ID number: YYMMDD SSSS C A Z. C is 0/1 (citizen/resident), A is 8 or 9, Z is the Luhn digit. */
function isValidZA_ID(value: string): boolean {
  const digits = digitsOnly(value);
  if (digits.length !== 13 || isRepeatedDigit(digits)) return false;
  const month = parseInt(digits.slice(2, 4), 10);
  const day = parseInt(digits.slice(4, 6), 10);
  if (month < 1 || month > 12 || !isPlausibleDay(day)) return false;
  if (digits[10] !== "0" && digits[10] !== "1") return false;
  if (digits[11] !== "8" && digits[11] !== "9") return false;
  return isValidLuhn(digits);
}

/**
 * Phone number. International forms (`+27 ...`, `27 ...`) are specific enough on their own.
 * The national form (`0..`) is only accepted when written with separators: a bare run
 * of ten digits starting with 0 is indistinguishable from an order or account number.
 */
function isValidZA_Phone(value: string): boolean {
  if (/^\+?27/.test(value)) return true;
  return /[\s-]/.test(value);
}

/** VAT number (10 digits starting with 4) has no checksum, so it needs a "VAT" cue before it. */
function isValidZA_VAT(value: string, context: string): boolean {
  const digits = digitsOnly(value);
  if (!/^4\d{9}$/.test(digits) || isRepeatedDigit(digits)) return false;
  return /\b(?:vat|btw)\b/i.test(context);
}

/** Income tax reference: 10 digits starting 0-3 with a Luhn digit, plus a "tax" cue before it. */
function isValidZA_TaxRef(value: string, context: string): boolean {
  const digits = digitsOnly(value);
  if (!/^[0-3]\d{9}$/.test(digits) || isRepeatedDigit(digits) || !isValidLuhn(digits)) {
    return false;
  }
  return /\b(?:tax|taxpayer|sars)\b/i.test(context);
}

// ── Pattern table ──

/**
 * Order matters only for labelling: ranges that overlap are merged on the response
 * side and redacted by the first matching rule on the request side.
 */
export const GDPR_POPIA_PATTERNS: readonly GdprPopiaPatternDef[] = [
  // ── GDPR / EU ──
  {
    name: "iban",
    core: "[A-Z]{2}\\d{2}[A-Z0-9]{11,30}",
    flags: "gi",
    replacement: "[IBAN_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidIBAN,
  },
  {
    name: "eu_vat",
    core: "[A-Z]{2}[A-Z0-9+*]{2,12}",
    flags: "g",
    replacement: "[EU_VAT_REDACTED]",
    severity: "medium",
    jurisdiction: "EU",
    validate: isValidEU_VAT,
  },
  {
    name: "es_dni_nie",
    core: "(?:\\d{8}|[XYZ]\\d{7})[A-Z]",
    flags: "gi",
    replacement: "[ES_DNI_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidES_DNI_NIE,
  },
  {
    name: "it_codice_fiscale",
    core: "[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]",
    flags: "gi",
    replacement: "[IT_CF_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidIT_CodiceFiscale,
  },
  {
    name: "pl_pesel",
    core: "\\d{11}",
    flags: "g",
    replacement: "[PL_PESEL_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidPL_PESEL,
  },
  {
    name: "nl_bsn",
    core: "\\d{9}",
    flags: "g",
    replacement: "[NL_BSN_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidNL_BSN,
  },
  {
    name: "de_steuer_id",
    core: "\\d{11}",
    flags: "g",
    replacement: "[DE_STEUERID_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidDE_SteuerID,
  },
  {
    name: "se_personnummer",
    core: "(?:\\d{2})?\\d{6}[-+]?\\d{4}",
    flags: "g",
    replacement: "[SE_PNR_REDACTED]",
    severity: "high",
    jurisdiction: "EU",
    validate: isValidSE_Personnummer,
  },

  // ── POPIA / South Africa ──
  {
    name: "za_id",
    core: "\\d{13}",
    flags: "g",
    replacement: "[ZA_ID_REDACTED]",
    severity: "high",
    jurisdiction: "ZA",
    validate: isValidZA_ID,
  },
  {
    name: "za_phone",
    core: "(?:\\+?27|0)[\\s-]?(?:1[0-9]|2[1-9]|3[1-9]|4[0-9]|5[1-9]|6[0-9]|7[1-9]|8[1-9])[\\s-]?\\d{3}[\\s-]?\\d{4}",
    flags: "g",
    replacement: "[ZA_PHONE_REDACTED]",
    severity: "medium",
    jurisdiction: "ZA",
    validate: isValidZA_Phone,
  },
  {
    name: "za_vat",
    core: "4\\d{9}",
    flags: "g",
    replacement: "[ZA_VAT_REDACTED]",
    severity: "medium",
    jurisdiction: "ZA",
    validate: isValidZA_VAT,
  },
  {
    name: "za_tax_ref",
    core: "\\d{10}",
    flags: "g",
    replacement: "[ZA_TAXREF_REDACTED]",
    severity: "medium",
    jurisdiction: "ZA",
    validate: isValidZA_TaxRef,
  },
];

/**
 * A fresh, stateful (`g`) regex for one pattern. Matches must sit between
 * non-alphanumeric characters (`_` counts as part of an identifier), so a number
 * inside a longer token such as `build12345678901x` is left alone.
 * Every core is built from bounded quantifiers only (no nested or unbounded repeats).
 */
function compileGdprPopiaPattern(def: GdprPopiaPatternDef): RegExp {
  return new RegExp(`(?<![A-Za-z0-9_])(?:${def.core})(?![A-Za-z0-9_])`, def.flags);
}

export interface CompiledGdprPopiaRule {
  name: string;
  regex: RegExp;
  replacement: string;
  severity: "high" | "medium" | "low";
  validate: PiiMatchValidator;
}

/**
 * Compile the whole table. Each sanitizer calls this once and keeps its own copy,
 * because the regexes are global and carry `lastIndex` state.
 */
export function buildGdprPopiaRules(): CompiledGdprPopiaRule[] {
  return GDPR_POPIA_PATTERNS.map((def) => ({
    name: def.name,
    regex: compileGdprPopiaPattern(def),
    replacement: def.replacement,
    severity: def.severity,
    validate: def.validate,
  }));
}

/** Text right before `index`, in the shape the validators expect. */
export function precedingContext(text: string, index: number): string {
  return text.slice(Math.max(0, index - PII_CONTEXT_WINDOW), index);
}
