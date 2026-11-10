import test from "node:test";
import assert from "node:assert/strict";

import { antigravityDegradedProjectState } from "../../src/lib/oauth/antigravityProjectGate.ts";
import { getStatusPresentation } from "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowStatus.ts";
import { ERROR_TYPE_LABELS } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";
import { GOOGLE_AGE_VERIFICATION_URL } from "../../open-sse/services/antigravityVerification.ts";

test("antigravityDegradedProjectState flags age_verification_required when verificationUrl contains age-verification", () => {
  const degraded = antigravityDegradedProjectState("antigravity", {
    projectId: "",
    verificationUrl: GOOGLE_AGE_VERIFICATION_URL,
    providerSpecificData: {
      clientProfile: "ide",
      verificationUrl: GOOGLE_AGE_VERIFICATION_URL,
    },
  });

  assert.ok(degraded);
  assert.equal(degraded.testStatus, "degraded");
  assert.equal(degraded.errorCode, "age_verification_required");
  assert.equal(degraded.lastErrorType, "oauth_verification_required");
  assert.ok(degraded.warning.includes("age verification"));
  assert.ok(degraded.warning.includes(GOOGLE_AGE_VERIFICATION_URL));
});

test("antigravityDegradedProjectState flags generic verification_required for other verification URLs", () => {
  const degraded = antigravityDegradedProjectState("agy", {
    projectId: "",
    verificationUrl: "https://accounts.google.com/signin/continue",
  });

  assert.ok(degraded);
  assert.equal(degraded.testStatus, "degraded");
  assert.equal(degraded.errorCode, "verification_required");
  assert.equal(degraded.lastErrorType, "oauth_verification_required");
  assert.ok(degraded.warning.includes("requires account verification"));
});

test("ERROR_TYPE_LABELS includes verification_required and age_verification_required", () => {
  assert.ok(ERROR_TYPE_LABELS.verification_required);
  assert.equal(ERROR_TYPE_LABELS.verification_required.variant, "warning");
  assert.ok(ERROR_TYPE_LABELS.age_verification_required);
  assert.equal(ERROR_TYPE_LABELS.age_verification_required.variant, "warning");
});

test("getStatusPresentation renders Verification Required badge when connection needs age verification", () => {
  const t = (key: string) => (key === "statusVerificationRequired" ? "Verification Required" : key);
  const mockConnection = {
    id: "test-id",
    name: "canaldarkbiblia2@gmail.com",
    provider: "antigravity",
    isActive: true,
    testStatus: "degraded",
    errorCode: "age_verification_required",
    lastErrorType: "oauth_verification_required",
    lastError: "Google requires age verification",
    providerSpecificData: {
      clientProfile: "ide",
      verificationUrl: GOOGLE_AGE_VERIFICATION_URL,
    },
  };

  const presentation = getStatusPresentation(
    mockConnection as unknown as Parameters<typeof getStatusPresentation>[0],
    "degraded",
    false,
    t as unknown as Parameters<typeof getStatusPresentation>[3]
  );
  assert.equal(presentation.statusVariant, "warning");
  assert.equal(presentation.statusLabel, "Verification Required");
  assert.equal(presentation.errorTextClass, "text-warning");
});
