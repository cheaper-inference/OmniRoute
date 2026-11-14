/**
 * muse-code-console-session-field.test.ts — the Muse Code console quota is
 * cookie-authenticated (the `llama_dev_sess` cookie on dev.meta.ai; the
 * inference key cannot read the 5h/weekly usage), so the connection modal MUST
 * expose a field to paste that cookie. Without it the live quota is
 * unconfigurable from the dashboard.
 *
 * Mirrors the xiaomi / qwen / volcengine console-cookie fields
 * (xiaomi-mimo-cookie-field.test.ts) and guards the optional `museTeamId`.
 * Imports the UI-free quotaScrapingFieldValues module (never the .tsx) and
 * reads the component as text, because `@/shared/components` pulls
 * untranspiled ESM that node:test cannot parse.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  assignQuotaScrapingProviderData,
  EMPTY_QUOTA_SCRAPING_FIELDS,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/quotaScrapingFieldValues.ts";
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");
const { PROVIDER_SPECIFIC_SECRET_FIELDS } =
  await import("../../src/lib/db/providers/providerSpecificDataSecrets.ts");
const { sanitizeProviderSpecificDataForResponse } =
  await import("../../src/lib/providers/requestDefaults.ts");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const TSX_PATH = path.resolve(
  HERE,
  "../../src/app/(dashboard)/dashboard/providers/[id]/components/modals/QuotaScrapingFields.tsx"
);

test("muse-code persists the console session cookie (trimmed)", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "muse-code",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, museConsoleSession: "  llama_dev_sess-value  " },
    target
  );

  assert.equal(target.museConsoleSession, "llama_dev_sess-value");
});

test("a blank console session does not overwrite the stored one", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "muse-code",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, museConsoleSession: "   " },
    target
  );

  assert.equal(
    Object.hasOwn(target, "museConsoleSession"),
    false,
    "blank input must leave the stored cookie untouched"
  );
});

test("the optional muse team id is stored when non-blank and left alone when blank", () => {
  const target: Record<string, unknown> = {};

  assignQuotaScrapingProviderData(
    "muse-code",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, museTeamId: "  team-123  " },
    target
  );
  assert.equal(target.museTeamId, "team-123");

  const blank: Record<string, unknown> = {};
  assignQuotaScrapingProviderData(
    "muse-code",
    { ...EMPTY_QUOTA_SCRAPING_FIELDS, museTeamId: "   " },
    blank
  );
  assert.equal(Object.hasOwn(blank, "museTeamId"), false);
});

test("a form object without the muse fields does not throw", () => {
  const target: Record<string, unknown> = {};
  const partial = { ...EMPTY_QUOTA_SCRAPING_FIELDS } as unknown as Record<string, string>;
  delete partial.museConsoleSession;
  delete partial.museTeamId;

  assert.doesNotThrow(() =>
    assignQuotaScrapingProviderData(
      "muse-code",
      partial as unknown as typeof EMPTY_QUOTA_SCRAPING_FIELDS,
      target
    )
  );
  assert.equal(Object.hasOwn(target, "museConsoleSession"), false);
  assert.equal(Object.hasOwn(target, "museTeamId"), false);
});

test("providerSpecificData validation guards the console session cookie and team id", () => {
  const ok = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { museConsoleSession: "llama_dev_sess-value", museTeamId: "team-123" },
  });
  assert.equal(ok.success, true, JSON.stringify(ok.error?.issues));

  for (const bad of [42, "x".repeat(10_001)]) {
    const result = updateProviderConnectionSchema.safeParse({
      providerSpecificData: { museConsoleSession: bad },
    });
    assert.equal(
      result.success,
      false,
      `museConsoleSession=${String(bad).slice(0, 20)} must be rejected`
    );
  }

  const badTeamType = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { museTeamId: 42 },
  });
  assert.equal(badTeamType.success, false, "non-string museTeamId must be rejected");

  const oversizedTeam = updateProviderConnectionSchema.safeParse({
    providerSpecificData: { museTeamId: "t".repeat(1001) },
  });
  assert.equal(oversizedTeam.success, false, "oversized museTeamId must be rejected");
});

test("the console session is declared secret and stripped from responses", () => {
  assert.ok(
    PROVIDER_SPECIFIC_SECRET_FIELDS.includes("museConsoleSession"),
    "museConsoleSession must be in PROVIDER_SPECIFIC_SECRET_FIELDS"
  );
  assert.ok(
    !PROVIDER_SPECIFIC_SECRET_FIELDS.includes("museTeamId"),
    "museTeamId is a non-secret identity field and must stay queryable"
  );

  const sanitized = sanitizeProviderSpecificDataForResponse({
    museConsoleSession: "llama_dev_sess-value",
    museTeamId: "team-123",
  });
  assert.ok(sanitized, "sanitizer must return a record");
  assert.equal(Object.hasOwn(sanitized, "museConsoleSession"), false);
  assert.equal(sanitized.museTeamId, "team-123");
});

test("the quota modal renders the muse console fields with the DevTools hint", () => {
  const source = fs.readFileSync(TSX_PATH, "utf8");

  for (const token of [
    "museConsoleSession",
    "museConsoleSessionLabel",
    "museConsoleSessionHint",
    "museTeamId",
    "museTeamIdLabel",
    "museTeamIdHint",
    "DevTools > Application > Cookies > dev.meta.ai > llama_dev_sess",
    "Leave blank to keep the stored session.",
  ]) {
    assert.ok(source.includes(token), `QuotaScrapingFields.tsx must contain ${token}`);
  }
});
