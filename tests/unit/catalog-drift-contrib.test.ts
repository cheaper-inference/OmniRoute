import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { load } from "js-yaml";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const root = new URL("../../", import.meta.url);
const { FREE_MODEL_BUDGETS, grantsFreeAccess, resolveFreeQuotaUnit } =
  await import("../../open-sse/config/freeModelCatalog.ts");
const { validateCatalogEvidence } = await import("../../scripts/check/freeCatalogEvidence.mjs");
const { buildEvidenceStub } = await import("../../scripts/quality/catalog-drift/evidence-stub.mjs");

const formPath = new URL(".github/ISSUE_TEMPLATE/free_tier_change.yml", root);
const reportRules = [
  "I read this on the provider's own page today",
  "This is not a referral code, shared key, multi-account trick or loophole",
];
const today = "2026-11-25";
const sourceType = "public-page";
const sourceUrl = "https://developers.cloudflare.com/workers-ai/platform/pricing/";
const quotaRow = FREE_MODEL_BUDGETS.find(
  ({ provider, monthlyTokens }) => provider === "cloudflare-ai" && monthlyTokens > 0
);
assert.ok(quotaRow);

type FormField = {
  id: string;
  type: string;
  attributes: {
    description?: string;
    placeholder?: string;
    options?: (string | { label: string; required?: boolean })[];
  };
  validations?: { required?: boolean };
};

test("the issue form parses and asks for an official source and a quote", () => {
  const form = load(readFileSync(formPath, "utf8")) as {
    name: string;
    title: string;
    labels: string[];
    body: FormField[];
  };
  assert.equal(form.name, "Free plan changed");
  assert.equal(form.title, "free-tier: ");
  assert.deepEqual(form.labels, ["free-tier-report"]);
  const fields = new Map(form.body.map((field) => [field.id, field]));
  for (const [id, type] of Object.entries({
    provider: "input",
    change: "dropdown",
    source_url: "input",
    quote: "textarea",
    checked_on: "input",
  })) {
    assert.equal(fields.get(id)?.type, type, id);
    assert.equal(fields.get(id)?.validations?.required, true, id);
  }
  assert.deepEqual(fields.get("change")?.attributes.options, [
    "Quota went down",
    "Quota went up",
    "Free plan ended",
    "New free models",
    "Model no longer free",
    "New requirement (card, phone, deposit, region…)",
    "Provider we don't list has a free plan",
    "Limited-time promotion",
  ]);
  assert.match(fields.get("source_url")?.attributes.description ?? "", /provider's own domain/);
  assert.match(fields.get("quote")?.attributes.description ?? "", /sentence or JSON field/);
  assert.equal(fields.get("checked_on")?.attributes.placeholder, "YYYY-MM-DD");
  assert.equal(fields.get("models")?.type, "textarea");
  assert.notEqual(fields.get("models")?.validations?.required, true);
  assert.equal(fields.get("pr")?.type, "checkboxes");
  assert.deepEqual(fields.get("pr")?.attributes.options, [
    { label: "I can open the pull request myself" },
  ]);
  assert.equal(fields.get("rules")?.type, "checkboxes");
  assert.deepEqual(
    fields.get("rules")?.attributes.options,
    reportRules.map((label) => ({ label, required: true }))
  );
});

test("the form never asks for keys or codes", () => {
  const source = readFileSync(formPath, "utf8");
  // The required acknowledgement explicitly rules out sharing those codes.
  assert.doesNotMatch(source.replace(reportRules[1], ""), /api key|password|referral code|coupon/i);
});

test("CONTRIBUTING has the 10-minute guide with runnable commands", () => {
  const source = readFileSync(new URL("CONTRIBUTING.md", root), "utf8");
  const heading = "## Fix a free plan in 10 minutes";
  const start = source.indexOf(heading);
  const end = source.indexOf("## Pull Request Checklist");
  assert.ok(start >= 0 && end > start);
  const section = source.slice(start, end);
  assert.match(section, /npm run quality:evidence-stub/);
  assert.match(section, /npm run check:free-catalog-evidence/);
  assert.match(section, /scripts\/quality\/catalog-drift\/manifest\.json/);
  assert.match(section, /pendingCatalogFix/);
  const { scripts } = JSON.parse(readFileSync(new URL("package.json", root), "utf8"));
  for (const [, name] of section.matchAll(/\bnpm run ([\w:-]+)/g)) {
    assert.ok(Object.hasOwn(scripts, name), `Missing npm script ${name}`);
  }
});

test("the evidence stub passes the real validator once filled", () => {
  const stub = buildEvidenceStub({ row: quotaRow, sourceType, sourceUrl, today });
  assert.equal(stub.claim, "recurring-quota");
  assert.equal(stub.quotaUnit, "neurons");
  assert.equal(stub.excerpt, "TODO");
  assert.equal(stub.summary, "TODO");
  assert.equal(stub.limitations, "TODO");
  assert.equal(stub.verifiedBy, "TODO");
  const entry = {
    ...stub,
    excerpt: "Our free allocation allows anyone to use a total of 10,000 Neurons per day.",
    summary: "The provider publishes a daily allocation measured in Neurons.",
    limitations: "The allocation is shared across eligible free models.",
    verifiedBy: "Test contributor",
  };
  assert.deepEqual(
    validateCatalogEvidence(
      [quotaRow],
      { schemaVersion: 1, debt: [], evidence: [entry] },
      { seed: [], previousDebt: [], today, grantsFreeAccess, unitOf: resolveFreeQuotaUnit }
    ),
    []
  );
});

test("the evidence command finds a model by its full ID and prints one JSON record", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "scripts/quality/catalog-drift/evidence-stub.mjs",
      "--provider",
      quotaRow.provider,
      "--model",
      quotaRow.modelId,
      "--url",
      sourceUrl,
      "--source-type",
      sourceType,
      "--today",
      today,
    ],
    { cwd: fileURLToPath(root), encoding: "utf8", timeout: 10_000 }
  );
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  const entry = JSON.parse(result.stdout);
  assert.equal(entry.provider, quotaRow.provider);
  assert.equal(entry.modelId, quotaRow.modelId);
  assert.equal(entry.sourceUrl, sourceUrl);
  assert.equal(entry.sourceType, sourceType);
  assert.equal(entry.checkedAt, today);
  assert.match(entry.catalogHash, /^[a-f0-9]{64}$/);
});
