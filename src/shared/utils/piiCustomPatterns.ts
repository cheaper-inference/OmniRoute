/**
 * Operator-defined PII masking patterns: compile, gate and preview.
 *
 * Every pattern passes the same gate before it is stored, previewed or run:
 * a length cap, a flag allow-list, a compile check, the `safe-regex`
 * catastrophic-backtracking check, and a refusal of patterns that match the
 * empty string (a global regex that matches "" never advances). A stored
 * pattern that somehow fails the gate later (hand-edited DB row) is skipped at
 * runtime instead of being compiled raw.
 */

import safeRegex from "safe-regex";
import { PII_CUSTOM_PATTERN_LIMITS } from "@/shared/constants/piiTypes";

export type PiiCustomPatternType = "regex" | "wildcard";

export interface PiiCustomPattern {
  id: string;
  name: string;
  type: PiiCustomPatternType;
  pattern: string;
  flags?: string;
  enabled: boolean;
}

export interface CompiledPiiRule {
  name: string;
  regex: RegExp;
  replacement: string;
}

export type PiiPatternRejection =
  "too_long" | "invalid_flags" | "invalid" | "unsafe" | "matches_empty" | "matches_placeholder";

export type PiiPatternCompileResult =
  { ok: true; regex: RegExp } | { ok: false; reason: PiiPatternRejection };

export const CUSTOM_PII_REPLACEMENT = "[CUSTOM_REDACTED]";

// Redaction tokens the sanitizers write. A custom rule that matched one of them
// would re-redact its own output on every pass of the streaming window.
const REDACTION_PLACEHOLDERS = [
  CUSTOM_PII_REPLACEMENT,
  "[EMAIL_REDACTED]",
  "[SSN_REDACTED]",
  "[CC_REDACTED]",
  "[CARD_REDACTED]",
  "[PHONE_REDACTED]",
  "[CPF_REDACTED]",
  "[CNPJ_REDACTED]",
  "[IP_REDACTED]",
  "[AWS_KEY_REDACTED]",
  "[API_KEY_REDACTED]",
];

/** Upper bound for one `*` in a wildcard, so a wildcard can never scan a whole token. */
const WILDCARD_SPAN = 64;
const ALLOWED_FLAGS = new Set(["g", "i", "m", "s", "u"]);

export const PII_PATTERN_REJECTION_MESSAGES: Record<PiiPatternRejection, string> = {
  too_long: `Pattern must be 1-${PII_CUSTOM_PATTERN_LIMITS.maxPatternLength} characters`,
  invalid_flags: "Flags may only contain g, i, m, s and u",
  invalid: "Pattern is not a valid regular expression",
  unsafe: "Pattern rejected: potentially catastrophic backtracking (ReDoS)",
  matches_empty: "Pattern must not match an empty string",
  matches_placeholder: "Pattern must not match a redaction placeholder such as [CUSTOM_REDACTED]",
};

/**
 * Wildcard → regex source. `*` is a bounded run of non-whitespace, `?` one
 * non-whitespace character; everything else is literal. Consecutive `*` collapse
 * into one so `**` cannot stack two quantifiers.
 */
export function wildcardToRegexSource(pattern: string): string {
  let out = "";
  let previousWasStar = false;
  for (const ch of pattern) {
    if (ch === "*") {
      if (!previousWasStar) out += `\\S{0,${WILDCARD_SPAN}}`;
      previousWasStar = true;
      continue;
    }
    previousWasStar = false;
    out += ch === "?" ? "\\S" : ch.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
  }
  return out;
}

function normalizeFlags(flags: string | undefined): string | null {
  const unique = new Set<string>();
  for (const flag of flags ?? "") {
    if (!ALLOWED_FLAGS.has(flag)) return null;
    unique.add(flag);
  }
  unique.add("g");
  return Array.from(unique).join("");
}

export function compilePiiCustomPattern(input: {
  type: PiiCustomPatternType;
  pattern: string;
  flags?: string;
}): PiiPatternCompileResult {
  const pattern = typeof input.pattern === "string" ? input.pattern : "";
  if (pattern.length === 0 || pattern.length > PII_CUSTOM_PATTERN_LIMITS.maxPatternLength) {
    return { ok: false, reason: "too_long" };
  }
  const flags = normalizeFlags(input.flags);
  if (flags === null) return { ok: false, reason: "invalid_flags" };

  const source = input.type === "wildcard" ? wildcardToRegexSource(pattern) : pattern;
  let regex: RegExp;
  try {
    regex = new RegExp(source, flags);
  } catch {
    return { ok: false, reason: "invalid" };
  }
  if (!safeRegex(regex)) return { ok: false, reason: "unsafe" };
  const probe = new RegExp(source, flags.replace("g", ""));
  if (probe.test("")) return { ok: false, reason: "matches_empty" };
  if (REDACTION_PLACEHOLDERS.some((placeholder) => probe.test(placeholder))) {
    return { ok: false, reason: "matches_placeholder" };
  }
  return { ok: true, regex };
}

/** Compile the enabled patterns that pass the gate; anything else is skipped. */
export function compilePiiCustomRules(patterns: readonly PiiCustomPattern[] | null | undefined) {
  const rules: CompiledPiiRule[] = [];
  for (const entry of patterns ?? []) {
    if (rules.length >= PII_CUSTOM_PATTERN_LIMITS.maxPatterns) break;
    if (!entry || entry.enabled === false) continue;
    const compiled = compilePiiCustomPattern(entry);
    if ("reason" in compiled) continue;
    rules.push({
      name: `custom:${entry.name}`,
      regex: compiled.regex,
      replacement: CUSTOM_PII_REPLACEMENT,
    });
  }
  return rules;
}

const MAX_PREVIEW_MATCHES = 50;

/** Dry run of one pattern against a sample, for the dashboard "Test" button. */
export function previewPiiCustomPattern(input: {
  type: PiiCustomPatternType;
  pattern: string;
  flags?: string;
  sampleText: string;
}) {
  const compiled = compilePiiCustomPattern(input);
  // `in` narrows the union without strictNullChecks (the dashboard tsconfig).
  if ("reason" in compiled) return { valid: false as const, reason: compiled.reason };
  const all = input.sampleText.match(compiled.regex) ?? [];
  return {
    valid: true as const,
    matches: all.slice(0, MAX_PREVIEW_MATCHES),
    count: all.length,
    preview: input.sampleText.replace(compiled.regex, CUSTOM_PII_REPLACEMENT),
  };
}
