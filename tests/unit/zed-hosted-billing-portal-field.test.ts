/**
 * zed-hosted-billing-portal-field.test.ts: Zed Hosted's optional USD quota comes
 * from the Orb billing portal link copied out of Zed's billing page. The
 * connection modal exposes a field for it, and the value is a credential (the
 * Orb token rides in the link) even though it looks like a URL: it is stripped
 * from API responses and encrypted at rest.
 *
 * Imports the UI-free module on purpose: pulling the .tsx would drag in
 * `@/shared/components` -> untranspiled ESM that node:test cannot parse.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

import {
  EMPTY_QUOTA_SCRAPING_FIELDS,
  assignQuotaScrapingProviderData,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues.ts";

// The encryption module reads the key at first use; set it before any import
// that reaches src/lib/db/encryption.ts.
process.env.STORAGE_ENCRYPTION_KEY = "zed-billing-portal-field-synthetic-key";

const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");
const { PROVIDER_SPECIFIC_SECRET_FIELDS } =
  await import("../../src/lib/db/providers/providerSpecificDataSecrets.ts");
const { sanitizeProviderSpecificDataForResponse } =
  await import("../../src/lib/providers/requestDefaults.ts");
const { encryptConnectionFields, decryptConnectionFields, looksEncrypted } =
  await import("../../src/lib/db/encryption.ts");

const PORTAL_LINK = "https://portal.withorb.com/view?token=fake-token-abc123456789";

test("the quota-scraping field inventory declares billingPortalUrl with an empty default", () => {
  assert.ok(
    Object.hasOwn(EMPTY_QUOTA_SCRAPING_FIELDS, "billingPortalUrl"),
    "EMPTY_QUOTA_SCRAPING_FIELDS must declare billingPortalUrl so add/edit forms start blank"
  );
  assert.equal(EMPTY_QUOTA_SCRAPING_FIELDS.billingPortalUrl, "");
});

test("zed-hosted persists the billing portal link trimmed", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "zed-hosted",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, billingPortalUrl: `  ${PORTAL_LINK}  ` },
    target
  );

  assert.equal(target.billingPortalUrl, PORTAL_LINK);
});

test("a blank billing portal link does not overwrite the stored one", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "zed-hosted",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, billingPortalUrl: "   " },
    target
  );

  assert.equal(
    Object.hasOwn(target, "billingPortalUrl"),
    false,
    "blank input must leave the stored link untouched"
  );
});

test("a form object without billingPortalUrl does not throw", () => {
  const target: Record<string, unknown> = {};
  const partial = { ...EMPTY_QUOTA_SCRAPING_FIELDS } as Record<string, string>;
  delete partial.billingPortalUrl;

  assert.doesNotThrow(() =>
    assignQuotaScrapingProviderData(
      "zed-hosted",
      partial as unknown as typeof EMPTY_QUOTA_SCRAPING_FIELDS,
      target
    )
  );
  assert.equal(Object.hasOwn(target, "billingPortalUrl"), false);
});

test("other providers never persist billingPortalUrl", () => {
  for (const provider of ["openai", "ollama-cloud", "volcengine-coding-plan", undefined]) {
    const target: Record<string, unknown> = {};
    assignQuotaScrapingProviderData(
      provider,
      { ...EMPTY_QUOTA_SCRAPING_FIELDS, billingPortalUrl: PORTAL_LINK },
      target
    );
    assert.equal(
      Object.hasOwn(target, "billingPortalUrl"),
      false,
      `${provider}: billingPortalUrl is zed-hosted only`
    );
  }
});

test("sanitizeProviderSpecificDataForResponse strips billingPortalUrl", () => {
  const sanitized = sanitizeProviderSpecificDataForResponse({
    billingPortalUrl: PORTAL_LINK,
    workspaceId: "ws-visible",
  });

  assert.ok(sanitized, "sanitizer returned nothing");
  assert.equal("billingPortalUrl" in sanitized, false, "portal link must not reach the response");
  assert.equal(sanitized.workspaceId, "ws-visible");
  assert.ok(!JSON.stringify(sanitized).includes("fake-token-abc123456789"));
});

test("billingPortalUrl is a declared secret field", () => {
  assert.ok(
    PROVIDER_SPECIFIC_SECRET_FIELDS.includes("billingPortalUrl"),
    "the Orb token rides in the link, so it must be declared in PROVIDER_SPECIFIC_SECRET_FIELDS"
  );
});

test("billingPortalUrl is encrypted at rest, decrypts back, and never double-wraps", () => {
  const input = { billingPortalUrl: PORTAL_LINK, workspaceId: "ws-visible" };
  const stored = encryptConnectionFields({
    id: "conn-zed-hosted",
    provider: "zed-hosted",
    providerSpecificData: input,
  });
  const atRest = stored.providerSpecificData as Record<string, unknown>;

  assert.notStrictEqual(atRest, input, "the input object must not be mutated");
  assert.ok(looksEncrypted(atRest.billingPortalUrl), "portal link must be enveloped");
  assert.ok(!JSON.stringify(atRest).includes("fake-token-abc123456789"));
  assert.equal(atRest.workspaceId, "ws-visible");

  const twice = encryptConnectionFields({ providerSpecificData: atRest });
  assert.deepEqual((twice as { providerSpecificData: unknown }).providerSpecificData, atRest);

  const restored = decryptConnectionFields(stored);
  assert.deepEqual(restored?.providerSpecificData, input);
});

test("providerSpecificData validation guards billingPortalUrl", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { billingPortalUrl: PORTAL_LINK },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  const wrongType = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { billingPortalUrl: 42 },
  });
  assert.equal(wrongType.success, false, "non-string link must be rejected");

  const tooLong = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { billingPortalUrl: "x".repeat(4097) },
  });
  assert.equal(tooLong.success, false, "oversized link must be rejected");

  const atLimit = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { billingPortalUrl: "x".repeat(4096) },
  });
  assert.equal(atLimit.success, true, "4096 characters is still accepted");
});

// The modal cannot be imported here (it pulls the shared UI barrel), so this pins
// the save path structurally: zed-hosted connections are OAuth-only, and the
// API-key save branch is the only place the assign helper used to be called.
test("EditConnectionModal saves the link on the OAuth branch too", () => {
  const source = readFileSync(
    "src/app/(dashboard)/dashboard/providers/[id]/components/modals/EditConnectionModal.tsx",
    "utf8"
  );
  const branchStart = source.indexOf("      } else {\n        updates.providerSpecificData");
  assert.ok(branchStart > 0, "the OAuth save branch could not be located");
  const branchEnd = source.indexOf("\n      if (isAntigravityFamily) {", branchStart);
  assert.ok(branchEnd > branchStart, "the OAuth save branch could not be bounded");
  const oauthBranch = source.slice(branchStart, branchEnd);
  const call = oauthBranch.indexOf("assignQuotaScrapingProviderData(provider, formData");
  assert.ok(call > 0, "the OAuth save branch must call assignQuotaScrapingProviderData");
});
