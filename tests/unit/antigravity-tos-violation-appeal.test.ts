import {
  checkFallbackError,
  isAccountDeactivated,
} from "../../open-sse/services/accountFallback.ts";
import test from "node:test";
import assert from "node:assert/strict";

import {
  extractVerificationUrl,
  isGoogleVerificationUrl,
} from "../../open-sse/services/antigravityVerification.ts";
import { isAccountDeactivatedMessage } from "../../src/app/api/providers/[id]/test/publicErrorBoundary.ts";
import { classifyProviderError } from "../../open-sse/services/errorClassifier.ts";
import { PROVIDER_ERROR_TYPES } from "../../open-sse/services/errorClassifier.ts";
import { toRecoverableConnectionInput } from "../../src/lib/quota/connectionRecovery.ts";

const TOS_BODY = {
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
          appeal_url: "https://forms.gle/hGzM9MEUv2azZsrb9",
          appeal_url_link_text: "Submit Appeal",
        },
      },
    ],
  },
};

test("extracts Google Forms appeal URL on Antigravity TOS_VIOLATION", () => {
  const url = extractVerificationUrl(TOS_BODY);
  assert.equal(url, "https://forms.gle/hGzM9MEUv2azZsrb9");
  assert.equal(isGoogleVerificationUrl(url), true);
});

test("isAccountDeactivatedMessage recognises Google Cloud Code TOS_VIOLATION", () => {
  const jsonStr = JSON.stringify(TOS_BODY);
  assert.equal(isAccountDeactivatedMessage(jsonStr), true);
  assert.equal(
    isAccountDeactivatedMessage(
      "This service has been disabled in this account for violation of Terms of Service."
    ),
    true
  );
});

test("classifyProviderError classifies a 403 TOS_VIOLATION as ACCOUNT_DEACTIVATED", () => {
  const classification = classifyProviderError(403, TOS_BODY, "antigravity");
  assert.equal(classification, PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED);
});

test("connectionRecovery flags verificationPending for stored Google Forms appeal URL", () => {
  const conn = {
    id: "c-tos",
    testStatus: "error",
    providerSpecificData: {
      verificationUrl: "https://forms.gle/hGzM9MEUv2azZsrb9",
    },
  };
  const recoverable = toRecoverableConnectionInput(conn);
  assert.equal(recoverable.verificationPending, true);
});

test("incidental tos_violation in non-Google response does not deactivate account", () => {
  const unrelated = {
    error: { message: "The user prompt discussed tos_violation in conversation" },
  };
  const str = JSON.stringify(unrelated);
  assert.equal(isAccountDeactivatedMessage(str), false);
  assert.equal(isAccountDeactivated(str), false);
});

test("isAccountDeactivated identifies Google Cloud Code TOS_VIOLATION", () => {
  const str = JSON.stringify(TOS_BODY);
  assert.equal(isAccountDeactivated(str), true);
});

const LOOKALIKE_REFUSAL = JSON.stringify({
  error: { code: "tos_violation", message: "Your request violates our Terms of Service" },
});
const PROMPT_ECHO = JSON.stringify({
  error: { message: "Cannot summarise the tos_violation clause of the terms of service" },
});

test("a per-request tos_violation refusal from another provider says nothing about the account", () => {
  assert.equal(isAccountDeactivated(LOOKALIKE_REFUSAL), false);
  assert.equal(isAccountDeactivatedMessage(LOOKALIKE_REFUSAL), false);
  assert.equal(classifyProviderError(403, LOOKALIKE_REFUSAL, "openrouter"), null);

  for (const status of [400, 403]) {
    const result = checkFallbackError(status, LOOKALIKE_REFUSAL, 0, null, "openrouter");
    assert.notEqual(result.permanent, true, `status ${status} must not park the connection`);
  }
});

test("a prompt echoing tos_violation and terms of service does not park the connection", () => {
  assert.equal(isAccountDeactivated(PROMPT_ECHO), false);
  assert.equal(isAccountDeactivatedMessage(PROMPT_ECHO), false);
  assert.notEqual(checkFallbackError(400, PROMPT_ECHO, 0, null, "openai").permanent, true);
});

test("generic 'disabled in this account' wording is not labeled as a deactivated account", () => {
  const text = "Streaming is disabled in this account, see our terms of service";
  assert.equal(isAccountDeactivatedMessage(text), false);
});

test("the Cloud Code TOS_VIOLATION reason deactivates the account whatever the message says", () => {
  const body = JSON.stringify({
    error: {
      code: 403,
      message: "Dieser Dienst wurde gesperrt.",
      status: "PERMISSION_DENIED",
      details: [{ reason: "TOS_VIOLATION", domain: "cloudcode-pa.googleapis.com" }],
    },
  });
  assert.equal(isAccountDeactivated(body), true);
  assert.equal(isAccountDeactivatedMessage(body), true);
  assert.equal(
    classifyProviderError(403, body, "antigravity"),
    PROVIDER_ERROR_TYPES.ACCOUNT_DEACTIVATED
  );
  assert.equal(checkFallbackError(403, body, 0, null, "antigravity").permanent, true);
});
