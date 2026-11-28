import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { createTempDataDir } from "../_setup/tempDataDir";

const { cleanup } = createTempDataDir("pii-card-luhn-");
const { removeFeatureFlagOverride, setFeatureFlagOverride } =
  await import("../../src/lib/db/featureFlags.ts");
const { processPII, sanitizeRequest } = await import("../../src/shared/utils/inputSanitizer.ts");

const flag = "PII_CARD_LUHN_ENABLED";
const validCard = ["4111", "1111", "1111", "1111"];
const invalidCard = ["4111", "1111", "1111", "1112"];
const timestamp = `ts_us=${["16999", "99999", "123456"].join("")}`;
const logger = { info() {}, warn() {}, error() {} };

beforeEach(() => {
  process.env.INPUT_SANITIZER_ENABLED = "true";
  process.env.PII_REDACTION_ENABLED = "true";
  delete process.env[flag];
});
after(cleanup);

function redact(content: string): string {
  const body = { messages: [{ role: "user", content }] };
  const { sanitizedBody } = sanitizeRequest(body, logger);
  return (sanitizedBody ?? body).messages[0].content;
}

test("unset Luhn flag preserves base masking and detection counts", () => {
  delete process.env[flag];
  assert.equal(redact(timestamp), "ts_us=[CARD_REDACTED]");
  assert.deepEqual(processPII(`${invalidCard.join("")}@example.com`, true), {
    text: "[EMAIL_REDACTED]",
    detections: [
      { type: "email", count: 1 },
      { type: "credit_card", count: 1 },
    ],
  });
});

test("Luhn flag on: preserve a timestamp but still mask valid cards", () => {
  process.env[flag] = "true";
  try {
    assert.equal(redact(timestamp), timestamp);
    for (const separator of ["", "-", " "]) {
      assert.equal(redact(`card ${validCard.join(separator)}`), "card [CARD_REDACTED]");
    }
  } finally {
    delete process.env[flag];
  }
});

test("a saved false Luhn flag preserves masking over an enabled environment flag", () => {
  process.env[flag] = "true";
  try {
    setFeatureFlagOverride(flag, "false");
    assert.equal(redact(timestamp), "ts_us=[CARD_REDACTED]");
  } finally {
    delete process.env[flag];
    removeFeatureFlagOverride(flag);
  }
});
