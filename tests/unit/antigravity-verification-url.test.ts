// Antigravity `403 VALIDATION_REQUIRED` carries the Google link that unlocks the
// account. The extractor must find it in every known payload shape and must
// never accept a link that is not https://accounts.google.com.
import test from "node:test";
import assert from "node:assert/strict";

import {
  extractVerificationUrl,
  isGoogleVerificationUrl,
  readStoredVerificationUrl,
} from "../../open-sse/services/antigravityVerification.ts";

const URL_A = "https://accounts.google.com/signin/continue?sarp=1&continue=https://x.example";

test("extracts error.details[].metadata.validation_url", () => {
  const body = {
    error: {
      code: 403,
      message: "Verify your account to continue.",
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "VALIDATION_REQUIRED",
          metadata: { validation_url: URL_A },
        },
      ],
    },
  };
  assert.equal(extractVerificationUrl(body), URL_A);
  // Same payload as raw text (what a non-parsed upstream body looks like).
  assert.equal(extractVerificationUrl(JSON.stringify(body)), URL_A);
  // Gemini-style array envelope.
  assert.equal(extractVerificationUrl([body]), URL_A);
});

test("extracts details[].links[].url only when the error is a verification challenge", () => {
  const withReason = {
    error: {
      message: "Forbidden",
      details: [
        { reason: "VALIDATION_REQUIRED" },
        { "@type": "type.googleapis.com/google.rpc.Help", links: [{ url: URL_A }] },
      ],
    },
  };
  assert.equal(extractVerificationUrl(withReason), URL_A);

  const unrelated = {
    error: {
      message: "Quota exceeded",
      details: [{ "@type": "type.googleapis.com/google.rpc.Help", links: [{ url: URL_A }] }],
    },
  };
  assert.equal(extractVerificationUrl(unrelated), null);
});

test("extracts ineligibleTiers[].validationUrl from a loadCodeAssist body", () => {
  const body = {
    ineligibleTiers: [
      { id: "standard-tier", validationErrorMessage: "Validation required", validationUrl: URL_A },
    ],
  };
  assert.equal(extractVerificationUrl(body), URL_A);
});

test("extracts the link from free text that mentions verification", () => {
  const text = `403 Forbidden: Verify your account to continue at ${URL_A} then retry`;
  assert.equal(extractVerificationUrl(text), URL_A);
  assert.equal(extractVerificationUrl(`Forbidden: see ${URL_A}`), null);
});

test("rejects non-https, look-alike and foreign hosts", () => {
  const challenge = (url: string) => ({
    error: {
      message: "Verify your account to continue.",
      details: [{ reason: "VALIDATION_REQUIRED", metadata: { validation_url: url } }],
    },
  });
  assert.equal(
    extractVerificationUrl(challenge("http://accounts.google.com/signin/continue")),
    null
  );
  assert.equal(extractVerificationUrl(challenge("https://evil.com/?accounts.google.com")), null);
  assert.equal(
    extractVerificationUrl(challenge("https://accounts.google.com.evil.com/signin/continue")),
    null
  );
  assert.equal(extractVerificationUrl(challenge("javascript:alert(1)")), null);
  assert.equal(extractVerificationUrl(challenge("https://support.google.com/a/answer/1")), null);
});

test("returns null for empty / unrelated payloads", () => {
  assert.equal(extractVerificationUrl(null), null);
  assert.equal(extractVerificationUrl(undefined), null);
  assert.equal(extractVerificationUrl(""), null);
  assert.equal(extractVerificationUrl({ error: { message: "rate limited" } }), null);
});

test("isGoogleVerificationUrl / readStoredVerificationUrl validate strictly", () => {
  assert.equal(isGoogleVerificationUrl(URL_A), true);
  assert.equal(isGoogleVerificationUrl("https://accounts.google.com.evil.com/x"), false);
  assert.equal(isGoogleVerificationUrl(42), false);
  assert.equal(readStoredVerificationUrl({ verificationUrl: URL_A }), URL_A);
  assert.equal(readStoredVerificationUrl({ verificationUrl: "https://evil.com/" }), null);
  assert.equal(readStoredVerificationUrl(undefined), null);
});
