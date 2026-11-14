// Antigravity `403 VALIDATION_REQUIRED` carries the Google link that unlocks the
// account. The extractor must find it in every known payload shape and must
// never accept a link that is not https://accounts.google.com.
import test from "node:test";
import assert from "node:assert/strict";

import {
  extractVerificationUrl,
  isGoogleVerificationUrl,
  readStoredVerificationUrl,
  redactVerificationUrls,
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

test("extracts appeal_url on Google TOS_VIOLATION (forms.gle link)", () => {
  const APPEAL_LINK = "https://forms.gle/hGzM9MEUv2azZsrb9";
  const body = {
    error: {
      code: 403,
      message:
        "This service has been disabled in this account for violation of Terms of Service. Please submit an appeal to continue using this product.",
      status: "PERMISSION_DENIED",
      details: [
        {
          "@type": "type.googleapis.com/google.rpc.ErrorInfo",
          reason: "TOS_VIOLATION",
          domain: "cloudcode-pa.googleapis.com",
          metadata: {
            uiMessage: "true",
            appeal_url: APPEAL_LINK,
            appeal_url_link_text: "Submit Appeal",
          },
        },
      ],
    },
  };

  assert.equal(extractVerificationUrl(body), APPEAL_LINK);
  assert.equal(isGoogleVerificationUrl(APPEAL_LINK), true);
  assert.equal(readStoredVerificationUrl({ verificationUrl: APPEAL_LINK }), APPEAL_LINK);
});

test("isGoogleVerificationUrl accepts docs.google.com/forms links but rejects other docs links", () => {
  assert.equal(
    isGoogleVerificationUrl("https://docs.google.com/forms/d/e/1FAIpQLSc_test/viewform"),
    true
  );
  assert.equal(isGoogleVerificationUrl("https://docs.google.com/document/d/123/edit"), false);
});

test("redactVerificationUrls masks case-variant and JSON-escaped URLs", () => {
  const text =
    'Upper: HTTPS://ACCOUNTS.GOOGLE.COM/signin and HTTPS://FORMS.GLE/xyz - Escaped: {"appeal_url":"https:\\/\\/forms.gle\\/abc","verif":"https:\\/\\/accounts.google.com\\/challenge"}';
  const redacted = redactVerificationUrls(text);
  assert.equal(
    redacted,
    'Upper: [verification-url] and [verification-url] - Escaped: {"appeal_url":"[verification-url]","verif":"[verification-url]"}'
  );
});

test("isGoogleVerificationUrl and extractVerificationUrl accept uppercase and escaped-slash URLs", () => {
  assert.equal(isGoogleVerificationUrl("HTTPS://FORMS.GLE/xyz"), true);
  assert.equal(isGoogleVerificationUrl("HTTPS://ACCOUNTS.GOOGLE.COM/signin"), true);
  assert.equal(isGoogleVerificationUrl("https:\\/\\/forms.gle\\/xyz"), true);
  assert.equal(isGoogleVerificationUrl("https:\\/\\/accounts.google.com\\/signin"), true);

  const escapedBody =
    '{"error":{"message":"Verify your account at https:\\/\\/forms.gle\\/abc to continue"}}';
  assert.equal(extractVerificationUrl(escapedBody), "https://forms.gle/abc");
});

test("extractVerificationUrl stops raw-text links at a backslash that is not an escaped slash", () => {
  assert.equal(
    extractVerificationUrl('verify at https://accounts.google.com/c?x=1\\" then'),
    "https://accounts.google.com/c?x=1"
  );
  assert.equal(
    extractVerificationUrl("verify at https://accounts.google.com/c?x=1\\u0026y=2"),
    "https://accounts.google.com/c?x=1"
  );
  assert.equal(
    extractVerificationUrl("verify at https:\\/\\/forms.gle\\/abc\\/def\\n next"),
    "https://forms.gle/abc/def"
  );
});

test("extractVerificationUrl skips a lookalike host to reach the real link", () => {
  assert.equal(
    extractVerificationUrl(
      "verify at https://accounts.google.com.evil.com/x or https://accounts.google.com/real"
    ),
    "https://accounts.google.com/real"
  );
});

test("redactVerificationUrls keeps masking past a JSON unicode escape in a raw body", () => {
  assert.equal(
    redactVerificationUrls('{"url":"https://accounts.google.com/c?x=1\\u0026token=secret"}'),
    '{"url":"[verification-url]"}'
  );
});

test("extractVerificationUrl extracts age-verification URL on RESTRICTED_AGE in ineligibleTiers", () => {
  const body = {
    allowedTiers: [
      {
        id: "standard-tier",
        name: "Antigravity",
        userDefinedCloudaicompanionProject: true,
      },
    ],
    ineligibleTiers: [
      {
        reasonCode: "RESTRICTED_AGE",
        reasonMessage:
          "Your current account is not eligible for Antigravity. To use Antigravity you must be 18 years old or older. If you think you are receiving this message in error, please ensure you have verified your age and try to log in again.",
        tierId: "free-tier",
        tierName: "Antigravity",
      },
    ],
  };

  const url = extractVerificationUrl(body);
  assert.equal(url, "https://myaccount.google.com/age-verification");
  assert.equal(isGoogleVerificationUrl(url), true);
  assert.equal(readStoredVerificationUrl({ verificationUrl: url }), url);
});

test("isGoogleVerificationUrl accepts myaccount.google.com and redactVerificationUrls masks it", () => {
  const AGE_URL = "https://myaccount.google.com/age-verification";
  assert.equal(isGoogleVerificationUrl(AGE_URL), true);
  assert.equal(isGoogleVerificationUrl("https://myaccount.google.com/other-page"), true);
  assert.equal(isGoogleVerificationUrl("https://myaccount.google.com.evil.com/age-verification"), false);

  const text = `Please verify age at ${AGE_URL} immediately`;
  assert.equal(extractVerificationUrl(text), AGE_URL);
  assert.equal(
    redactVerificationUrls(text),
    "Please verify age at [verification-url] immediately"
  );
});

test("extractVerificationUrl extracts age verification link from free text with 18 years wording", () => {
  const text =
    "Error: To use Antigravity you must be 18 years old or older. Please ensure you have verified your age.";
  assert.equal(extractVerificationUrl(text), "https://myaccount.google.com/age-verification");
});

test("targetGoogleVerificationUrl wraps URL in AccountChooser with Email and authuser", async () => {
  const { targetGoogleVerificationUrl } = await import(
    "../../open-sse/services/antigravityVerification.ts"
  );

  const targetedAge = targetGoogleVerificationUrl(
    "https://myaccount.google.com/age-verification",
    "canaldarkbiblia2@gmail.com"
  );
  assert.ok(targetedAge);
  assert.ok(targetedAge.startsWith("https://accounts.google.com/AccountChooser?"));
  assert.ok(targetedAge.includes("Email=canaldarkbiblia2%40gmail.com"));
  assert.ok(targetedAge.includes("continue="));
  assert.ok(targetedAge.includes("authuser%3Dcanaldarkbiblia2%2540gmail.com"));

  // forms.gle appeal and accounts.google.com/signin/continue challenge are untouched
  assert.equal(
    targetGoogleVerificationUrl("https://forms.gle/abc123", "canaldarkbiblia2@gmail.com"),
    "https://forms.gle/abc123"
  );
  assert.equal(
    targetGoogleVerificationUrl("https://accounts.google.com/signin/continue?sarp=1", "canaldarkbiblia2@gmail.com"),
    "https://accounts.google.com/signin/continue?sarp=1"
  );

  // Ignores empty or invalid emails
  assert.equal(
    targetGoogleVerificationUrl("https://myaccount.google.com/age-verification", ""),
    "https://myaccount.google.com/age-verification"
  );
  assert.equal(
    targetGoogleVerificationUrl("https://myaccount.google.com/age-verification", undefined),
    "https://myaccount.google.com/age-verification"
  );

  // Does not double-wrap an existing AccountChooser URL
  const alreadyChooser =
    "https://accounts.google.com/AccountChooser?Email=foo%40gmail.com&continue=https%3A%2F%2Fmyaccount.google.com%2Fage-verification";
  assert.equal(targetGoogleVerificationUrl(alreadyChooser, "foo@gmail.com"), alreadyChooser);
});
