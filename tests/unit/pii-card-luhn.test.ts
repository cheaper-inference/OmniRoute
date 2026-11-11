import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeRequest } from "../../src/shared/utils/inputSanitizer.ts";

// Digits are built from parts so no card-shaped literal sits in the file.
const VALID_CARD = ["4111", "1111", "1111", "1111"].join("");
// A 16-digit microsecond timestamp: fails the Luhn check, so it is not a card.
const TIMESTAMP_US = ["16999", "99999", "123456"].join("");

const silentLogger = { info() {}, warn() {}, error() {} } as Pick<
  Console,
  "info" | "warn" | "error"
>;

function redact(content: string): string {
  const saved = {
    enabled: process.env.INPUT_SANITIZER_ENABLED,
    pii: process.env.PII_REDACTION_ENABLED,
  };
  process.env.INPUT_SANITIZER_ENABLED = "true";
  process.env.PII_REDACTION_ENABLED = "true";
  try {
    const body = { messages: [{ role: "user", content }] };
    const result = sanitizeRequest(body, silentLogger);
    const out = (result.sanitizedBody ?? body) as typeof body;
    return String(out.messages[0].content);
  } finally {
    for (const [key, value] of [
      ["INPUT_SANITIZER_ENABLED", saved.enabled],
      ["PII_REDACTION_ENABLED", saved.pii],
    ] as const) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("a 16-digit id that fails the Luhn check is not masked as a card", () => {
  const out = redact(`ts_us=${TIMESTAMP_US}`);
  assert.ok(!out.includes("[CARD_REDACTED]"), out);
  assert.ok(out.includes(TIMESTAMP_US), out);
});

test("a Luhn-valid card number is still masked", () => {
  assert.ok(redact(`card ${VALID_CARD}`).includes("[CARD_REDACTED]"));
});

test("a Luhn-valid card with dashes is still masked", () => {
  const dashed = VALID_CARD.match(/\d{4}/g)!.join("-");
  assert.ok(redact(`card ${dashed}`).includes("[CARD_REDACTED]"));
});
