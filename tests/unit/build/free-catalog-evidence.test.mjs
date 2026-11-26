import assert from "node:assert/strict";
import test from "node:test";
import { validateCatalogEvidence } from "../../../scripts/check/freeCatalogEvidence.mjs";

const row = {
  provider: "fixture",
  modelId: "new-model",
  freeType: "recurring-uncapped",
  monthlyTokens: 0,
  creditTokens: 0,
  poolKey: null,
  tos: "ok",
};
test("a new uncapped catalog entry requires evidence instead of inheriting legacy research", () => {
  const errors = validateCatalogEvidence(
    [row],
    { schemaVersion: 1, debt: [], evidence: [] },
    { seed: [], previousDebt: [], today: "2026-10-19" }
  );
  assert.ok(
    errors.some((error) => error.includes("missing evidence")),
    JSON.stringify(errors)
  );
});

test("grandfathering is restricted to exact seed entries, not a provider-wide waiver", () => {
  const options = {
    seed: [{ ...row, catalogHash: "placeholder" }],
    previousDebt: ["fixture/new-model"],
    today: "2026-10-19",
  };
  const policy = { schemaVersion: 1, debt: ["fixture/new-model"], evidence: [] };
  // Even the allowed identity cannot grandfather altered economics.
  assert.ok(
    validateCatalogEvidence([row], policy, options).some((error) =>
      error.includes("changed legacy economics")
    )
  );
});

import { catalogFingerprint } from "../../../scripts/check/freeCatalogEvidence.mjs";
import { readFileSync, readdirSync, mkdtempSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync, execFileSync } from "node:child_process";
import { FREE_MODEL_BUDGETS } from "../../../open-sse/config/freeModelCatalog.data.ts";
import {
  grantsFreeAccess as catalogGrantsFreeAccess,
  resolveFreeQuotaUnit,
} from "../../../open-sse/config/freeModelCatalog.ts";

const key = "fixture/new-model";
const seed = [
  { provider: row.provider, modelId: row.modelId, catalogHash: catalogFingerprint(row) },
];
const options = { seed, previousDebt: [key], today: "2026-10-19" };
const evidence = {
  provider: row.provider,
  modelId: row.modelId,
  catalogHash: catalogFingerprint(row),
  sourceType: "public-page",
  sourceUrl: "https://provider.example/pricing",
  checkedAt: "2026-10-18",
  claim: "recurring-free-access",
  verifiedBy: "fixture-reviewer",
  summary: "The exact model has free input and output on the recurring plan.",
  limitations: "Account and rate limits still apply; this is not billing protection.",
};
const sourced = () => ({ schemaVersion: 1, debt: [], evidence: [{ ...evidence }] });

test("valid per-model source metadata satisfies a new entry and retired debt is removed", () => {
  assert.deepEqual(validateCatalogEvidence([row], sourced(), { ...options, previousDebt: [] }), []);
});

test("exact unchanged legacy entries remain available during the approved migration", () => {
  assert.deepEqual(
    validateCatalogEvidence([row], { schemaVersion: 1, debt: [key], evidence: [] }, options),
    []
  );
});

test("a reviewed entry cannot return to debt even if it existed in the bootstrap seed", () => {
  const errors = validateCatalogEvidence(
    [row],
    { schemaVersion: 1, debt: [key], evidence: [] },
    { ...options, previousDebt: [] }
  );
  assert.ok(errors.some((e) => e.includes("cannot grow or be reintroduced")));
});

test("new debt cannot borrow a provider's grandfathered status", () => {
  const other = { ...row, modelId: "another-model" };
  const errors = validateCatalogEvidence(
    [row, other],
    { schemaVersion: 1, debt: [key, "fixture/another-model"], evidence: [] },
    options
  );
  assert.ok(errors.some((e) => e.includes("outside frozen legacy seed")));
});

test("evidence is bound to exact provider, model and economic terms", () => {
  for (const changed of [
    { ...row, provider: "another" },
    { ...row, modelId: "different" },
    { ...row, hardStopGuaranteed: true },
  ]) {
    assert.notDeepEqual(validateCatalogEvidence([changed], sourced(), options), []);
  }
});

test("invalid source, date, claim and missing review context fail closed", () => {
  for (const patch of [
    { sourceUrl: "http://provider.example/pricing" },
    { sourceUrl: "https://user:secret@provider.example/pricing" },
    { sourceUrl: "javascript:alert(1)" },
    { checkedAt: "2026-02-30" },
    { checkedAt: "2099-01-01" },
    { sourceType: "guess" },
    { claim: "open-weights" },
    { summary: "" },
    { limitations: "" },
    { verifiedBy: "" },
  ]) {
    const policy = sourced();
    Object.assign(policy.evidence[0], patch);
    assert.notDeepEqual(validateCatalogEvidence([row], policy, options), [], JSON.stringify(patch));
  }
});

test("duplicate identities cannot hide debt or conflicting source records", () => {
  const policy = sourced();
  policy.evidence.push({ ...evidence });
  assert.ok(
    validateCatalogEvidence([row], policy, options).some((e) => e.includes("duplicate evidence"))
  );
  assert.ok(
    validateCatalogEvidence([row, row], sourced(), options).some((e) =>
      e.includes("duplicate catalog")
    )
  );
  assert.ok(
    validateCatalogEvidence(
      [row],
      { schemaVersion: 1, debt: [key, key], evidence: [] },
      options
    ).some((e) => e.includes("duplicate debt"))
  );
});

test("removed or audited rows must leave debt and stale evidence is rejected", () => {
  assert.ok(
    validateCatalogEvidence([], { schemaVersion: 1, debt: [key], evidence: [] }, options).some(
      (e) => e.includes("stale legacy")
    )
  );
  assert.ok(
    validateCatalogEvidence([], sourced(), options).some((e) => e.includes("stale evidence"))
  );
  assert.ok(
    validateCatalogEvidence([row], { ...sourced(), debt: [key] }, options).some((e) =>
      e.includes("audited entry")
    )
  );
});

test("paid and numerically capped rows are outside this uncapped migration", () => {
  assert.deepEqual(
    validateCatalogEvidence(
      [{ ...row, freeType: "recurring-monthly" }],
      { schemaVersion: 1, debt: [], evidence: [] },
      options
    ),
    []
  );
});

test("malformed policy identities are errors instead of waived entries", () => {
  for (const policy of [
    null,
    {},
    { schemaVersion: 1, debt: [null], evidence: [] },
    { schemaVersion: 1, debt: [], evidence: [null] },
  ]) {
    assert.notDeepEqual(validateCatalogEvidence([row], policy, options), []);
  }
});

test("real catalog has a precise disposition for every identity that needs evidence", () => {
  const policy = JSON.parse(
    readFileSync(
      new URL("../../../config/quality/free-catalog-evidence.json", import.meta.url),
      "utf8"
    )
  );
  const frozen = JSON.parse(
    readFileSync(
      new URL("../../../config/quality/free-catalog-legacy-seed.json", import.meta.url),
      "utf8"
    )
  );
  assert.deepEqual(
    validateCatalogEvidence(FREE_MODEL_BUDGETS, policy, {
      seed: frozen.entries,
      previousDebt: frozen.entries.map((e) => `${e.provider}/${e.modelId}`),
      today: new Date().toISOString().slice(0, 10),
      grantsFreeAccess: catalogGrantsFreeAccess,
      unitOf: resolveFreeQuotaUnit,
    }),
    []
  );
});

// The CLI imports the catalog .ts files natively (no tsx loader). Its V8 coverage would carry a
// second source layout for those files and break the merged coverage report. Node copies the
// parent's NODE_V8_COVERAGE into a child env when the key is absent, so explicitly clear it.
function cliEnv(extra = {}) {
  return { ...process.env, ...extra, NODE_V8_COVERAGE: "" };
}

test("CLI refuses unavailable baseline and missing PR base; neither is a successful bootstrap", () => {
  const script = new URL("../../../scripts/check/check-free-catalog-evidence.mjs", import.meta.url);
  const cwd = new URL("../../../", import.meta.url);
  const invalid = spawnSync(
    process.execPath,
    [fileURLToPath(script), "--base-ref", "refs/heads/nonexistent-free-catalog-test"],
    { cwd, encoding: "utf8", env: cliEnv() }
  );
  assert.equal(invalid.status, 1);
  assert.match(invalid.stderr, /FAIL/);
  const missing = spawnSync(process.execPath, [fileURLToPath(script)], {
    cwd,
    encoding: "utf8",
    env: cliEnv({ GITHUB_EVENT_NAME: "pull_request", BASE_SHA: "" }),
  });
  assert.equal(missing.status, 1);
  assert.match(missing.stderr, /FAIL/);
});

test("CLI requires an event baseline for PR, merge-group and push checks", () => {
  const script = fileURLToPath(
    new URL("../../../scripts/check/check-free-catalog-evidence.mjs", import.meta.url)
  );
  for (const event of ["pull_request", "merge_group", "push"]) {
    const result = spawnSync(process.execPath, [script], {
      cwd: new URL("../../../", import.meta.url),
      encoding: "utf8",
      env: cliEnv({ GITHUB_EVENT_NAME: event, BASE_SHA: "" }),
    });
    assert.equal(result.status, 1, event);
  }
});

test("the native CLI leaves the unit shard's V8 coverage directory untouched", (t) => {
  const script = fileURLToPath(
    new URL("../../../scripts/check/check-free-catalog-evidence.mjs", import.meta.url)
  );
  const coverage = mkdtempSync(join(tmpdir(), "catalog-cli-coverage-"));
  t.after(() => rmSync(coverage, { recursive: true, force: true }));
  const previousCoverage = process.env.NODE_V8_COVERAGE;
  process.env.NODE_V8_COVERAGE = coverage;
  try {
    const result = spawnSync(process.execPath, [script], {
      cwd: new URL("../../../", import.meta.url),
      encoding: "utf8",
      env: cliEnv({ GITHUB_EVENT_NAME: "pull_request", BASE_SHA: "" }),
    });
    assert.equal(result.status, 1);
    assert.match(result.stderr, /FAIL/);
  } finally {
    if (previousCoverage === undefined) delete process.env.NODE_V8_COVERAGE;
    else process.env.NODE_V8_COVERAGE = previousCoverage;
  }
  assert.deepEqual(readdirSync(coverage), []);
});

test(
  "CLI compares candidate debt to the event baseline, including merge queues and pushes",
  { timeout: 180000 },
  () => {
    const dir = mkdtempSync(join(tmpdir(), "catalog-evidence-"));
    const script = fileURLToPath(
      new URL("../../../scripts/check/check-free-catalog-evidence.mjs", import.meta.url)
    );
    const frozen = JSON.parse(
      readFileSync(
        new URL("../../../config/quality/free-catalog-legacy-seed.json", import.meta.url),
        "utf8"
      )
    );
    const policy = JSON.parse(
      readFileSync(
        new URL("../../../config/quality/free-catalog-evidence.json", import.meta.url),
        "utf8"
      )
    );
    // Use the current policy: retired rows stay absent and reviewed or changed-economics
    // rows retain their evidence rather than returning to the immutable seed debt.
    // Only debt varies between the synthetic commits below.
    const allDebt = policy.debt;
    assert.ok(allDebt.length > 0, "the fixture needs a legacy identity to retire and reintroduce");
    const git = (...args) =>
      execFileSync("git", args, {
        cwd: dir,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        timeout: 30000,
        killSignal: "SIGKILL",
        windowsHide: true,
      }).trim();
    const policyPath = join(dir, "config/quality/free-catalog-evidence.json");
    const writePolicy = (debt) =>
      writeFileSync(policyPath, JSON.stringify({ ...policy, debt }), "utf8");
    try {
      git("init");
      if (process.platform === "win32") git("config", "core.longpaths", "true");
      git("config", "user.name", "Catalog Test");
      git("config", "user.email", "catalog-test@example.invalid");
      git("commit", "--allow-empty", "-m", "fixture before policy");
      const bootstrap = git("rev-parse", "HEAD");
      mkdirSync(join(dir, "config/quality"), { recursive: true });
      writeFileSync(
        join(dir, "config/quality/free-catalog-legacy-seed.json"),
        JSON.stringify(frozen),
        "utf8"
      );
      writePolicy(allDebt.slice(1));
      git("add", "config");
      git("commit", "-m", "fixture audited identity");
      const audited = git("rev-parse", "HEAD");
      writePolicy(allDebt);
      git("add", "config");
      git("commit", "-m", "fixture restores retired debt");
      for (const event of ["pull_request", "merge_group", "push"]) {
        const run = (base) =>
          spawnSync(process.execPath, [script], {
            cwd: dir,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
            timeout: 30000,
            killSignal: "SIGKILL",
            windowsHide: true,
            env: cliEnv({ GITHUB_EVENT_NAME: event, BASE_SHA: base }),
          });
        const rejected = run(audited);
        assert.equal(rejected.status, 1, event + rejected.stdout + rejected.stderr);
        assert.match(rejected.stderr, /cannot grow or be reintroduced/);
        const initial = run(bootstrap);
        assert.equal(
          initial.status,
          0,
          "initial debt is allowed against policy-free base: " + initial.stdout + initial.stderr
        );
        const unchanged = run("HEAD");
        assert.equal(
          unchanged.status,
          0,
          "unchanged debt is allowed: " + unchanged.stdout + unchanged.stderr
        );
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  }
);

// Re-audit of 2026-11: every row with a quota, and every free row new against the base, needs
// dated evidence; quota and credit records quote the page and name the quota unit.
const quotaRow = {
  provider: "fixture",
  modelId: "quota-model",
  freeType: "recurring-daily",
  monthlyTokens: 6_000_000,
  creditTokens: 0,
  poolKey: null,
  tos: "caution",
};
const creditRow = {
  provider: "fixture",
  modelId: "credit-model",
  freeType: "one-time-initial",
  monthlyTokens: 0,
  creditTokens: 1_000_000,
  poolKey: null,
  tos: "caution",
};
const grantsFreeAccess = (freeType) => freeType !== "discontinued";
const unitOf = () => "tokens";
const quotaOptions = { seed: [], previousDebt: [], today: "2026-11-23", grantsFreeAccess, unitOf };
const recordFor = (r, extra) => ({
  ...evidence,
  provider: r.provider,
  modelId: r.modelId,
  catalogHash: catalogFingerprint(r),
  checkedAt: "2026-11-23",
  ...extra,
});
const policyWith = (...records) => ({ schemaVersion: 1, debt: [], evidence: records });

test("a row with a monthly quota requires evidence even when it is not uncapped", () => {
  const errors = validateCatalogEvidence([quotaRow], policyWith(), quotaOptions);
  assert.ok(errors.includes("fixture/quota-model: missing evidence"), JSON.stringify(errors));
});

test("a quota record must quote the page and name the provider's quota unit", () => {
  const ok = recordFor(quotaRow, {
    claim: "recurring-quota",
    quotaUnit: "tokens",
    excerpt: "200K tokens per day on the free plan.",
  });
  assert.deepEqual(validateCatalogEvidence([quotaRow], policyWith(ok), quotaOptions), []);
  const noExcerpt = { ...ok };
  delete noExcerpt.excerpt;
  assert.ok(
    validateCatalogEvidence([quotaRow], policyWith(noExcerpt), quotaOptions).some((e) =>
      e.includes("missing excerpt")
    )
  );
  assert.ok(
    validateCatalogEvidence(
      [quotaRow],
      policyWith({ ...ok, excerpt: "x".repeat(301) }),
      quotaOptions
    ).some((e) => e.includes("excerpt longer than 300"))
  );
  assert.ok(
    validateCatalogEvidence(
      [quotaRow],
      policyWith({ ...ok, quotaUnit: "requests" }),
      quotaOptions
    ).some((e) => e.includes("quota unit does not match"))
  );
  assert.ok(
    validateCatalogEvidence(
      [quotaRow],
      policyWith({ ...ok, claim: "recurring-free-access" }),
      quotaOptions
    ).some((e) => e.includes("wrong evidence claim"))
  );
});

test("a free row new against the base needs evidence, even with only a signup credit", () => {
  const baseKeys = new Set(["fixture/other"]);
  const errors = validateCatalogEvidence([creditRow], policyWith(), { ...quotaOptions, baseKeys });
  assert.ok(errors.includes("fixture/credit-model: missing evidence"), JSON.stringify(errors));
  const credit = recordFor(creditRow, {
    claim: "signup-credit",
    excerpt: "New accounts receive a one-time trial credit.",
  });
  assert.deepEqual(
    validateCatalogEvidence([creditRow], policyWith(credit), { ...quotaOptions, baseKeys }),
    []
  );
});

test("a credit-only row already in the base is not required to carry evidence", () => {
  const baseKeys = new Set(["fixture/credit-model"]);
  assert.deepEqual(
    validateCatalogEvidence([creditRow], policyWith(), { ...quotaOptions, baseKeys }),
    []
  );
});

test("evidence of a row that became discontinued is stale", () => {
  const ok = recordFor(quotaRow, {
    claim: "recurring-quota",
    quotaUnit: "tokens",
    excerpt: "200K tokens per day on the free plan.",
  });
  const retired = { ...quotaRow, freeType: "discontinued", monthlyTokens: 0 };
  assert.ok(
    validateCatalogEvidence([retired], policyWith(ok), quotaOptions).some((e) =>
      e.includes("stale evidence")
    )
  );
});

test("the fingerprint ignores absent gates (old hashes hold) and moves when gates change", () => {
  // Hash of the fixture row under the algorithm before `gates` existed.
  assert.equal(
    catalogFingerprint(row),
    "432a928975e73e5d6f271350265cd0d818edd1358cd15796a8d1c9c7ef52809c"
  );
  assert.equal(catalogFingerprint({ ...row, gates: [] }), catalogFingerprint(row));
  const card = catalogFingerprint({ ...row, gates: ["card"] });
  assert.notEqual(card, catalogFingerprint(row));
  assert.notEqual(card, catalogFingerprint({ ...row, gates: ["card", "phone"] }));
  assert.equal(
    catalogFingerprint({ ...row, gates: ["phone", "card"] }),
    catalogFingerprint({ ...row, gates: ["card", "phone"] })
  );
  const frozen = JSON.parse(
    readFileSync(
      new URL("../../../config/quality/free-catalog-legacy-seed.json", import.meta.url),
      "utf8"
    )
  );
  const seeded = frozen.entries.find(
    (e) => e.provider === "sealion" && e.modelId === "aisingapore/Gemma-SEA-LION-v4-27B-IT"
  );
  const live = FREE_MODEL_BUDGETS.find(
    (m) => m.provider === seeded.provider && m.modelId === seeded.modelId
  );
  assert.equal(catalogFingerprint(live), seeded.catalogHash);
});
