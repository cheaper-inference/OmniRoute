import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  measureCatalogCounts,
  parseRoutingStrategyCount,
  PROVIDER_COLLECTION_NAMES,
} from "../../../scripts/docs/lib/count-facts.mjs";
import {
  planCountSync,
  planDocumentCounts,
  managedCountChecks,
} from "../../../scripts/docs/lib/count-sync.mjs";
import {
  contentHash,
  sourceSectionHashes,
  patchJsonStringLeaves,
} from "../../../scripts/docs/lib/count-state.mjs";
import { applyCountPlan, readCountFiles } from "../../../scripts/docs/lib/count-io.mjs";
import { validateFinancialCopy } from "../../../scripts/docs/lib/count-finance-guard.mjs";
import { tallyDrift } from "../../../scripts/check/check-docs-counts-sync.mjs";
import { parseCountArguments } from "../../../scripts/docs/sync-counts.mjs";

const collections = () =>
  Object.fromEntries(
    PROVIDER_COLLECTION_NAMES.map((name, index) => [
      name,
      index ? {} : { one: { id: "one", hasFree: true } },
    ])
  );
const totals = () => ({
  perModel: [{ provider: "one", freeType: "recurring-uncapped" }],
  poolCount: 1,
  steadyRecurringTokens: 1e9,
  firstMonthRealisticTokens: 2e9,
  gatedRecurringTokens: 0,
});
const group = {
  parts: ["Providers ", "; migrations ", "; entries ", "."],
  claims: [
    { slot: 0, fact: "providers" },
    { slot: 1, fact: "migrations" },
    { slot: 2, fact: "catalogEntries" },
  ],
};

function fixture() {
  const locales = ["bn", "fa"];
  const source = "docs/example.md";
  const before = "# Example\n\nProviders 1; migrations 2; entries 3.\n\nUntouched 2026 and 14.2.\n";
  const translated = [
    before.replace("1; migrations 2; entries 3", "১; migrations ২; entries ৩"),
    before.replace("1; migrations 2; entries 3", "۱; migrations ۲; entries ۳"),
  ];
  const paths = [source, ...locales.map((locale) => `docs/i18n/${locale}/${source}`)];
  const files = new Map(paths.map((file, index) => [file, index ? translated[index - 1] : before]));
  const hash = contentHash(before);
  const state = {
    version: 1,
    sources: {
      [source]: {
        source_hash: hash,
        locales: Object.fromEntries(
          locales.map((locale, index) => [
            locale,
            {
              source_hash: hash,
              target_hash: contentHash(translated[index]),
              updated_at: "2020-01-01",
              ...(index ? {} : { section_hashes: sourceSectionHashes(before) }),
            },
          ])
        ),
      },
    },
  };
  files.set(".i18n-state.json", JSON.stringify(state, null, 4) + "\n");
  const registry = {
    version: 1,
    documents: paths.map((file) => ({ path: file, groups: [group] })),
    families: [source],
    generated: [],
  };
  return {
    registry,
    files,
    locales,
    facts: { providers: 2, migrations: 3, catalogEntries: 4 },
    source,
  };
}

test("provider and financial facts follow union identities and eligible recurring regimes", () => {
  const input = collections();
  input.APIKEY_PROVIDERS = {
    duplicate: { id: "one", hasFree: true },
    two: { id: "two", hasFree: false },
  };
  const initial = measureCatalogCounts(input, totals());
  assert.equal(initial.providers, 2);
  assert.equal(initial.catalogMarkedFree, 1);
  assert.equal(initial.freeForever, 1);
  const changed = totals();
  changed.perModel.push({ provider: "two", freeType: "discontinued" });
  assert.equal(measureCatalogCounts(input, changed).catalogEntries, 2);
  assert.equal(measureCatalogCounts(input, changed).freeForever, 1);
  changed.perModel[0].freeType = "discontinued";
  assert.equal(measureCatalogCounts(input, changed).freeForever, 0);
});

test("unknown provider collections, regimes and invalid totals fail closed", () => {
  assert.throws(() => measureCatalogCounts({}, totals()), /COLLECTION_MISSING/);
  const unknown = totals();
  unknown.perModel[0].freeType = "new-regime";
  assert.throws(() => measureCatalogCounts(collections(), unknown), /UNKNOWN_FREE_REGIME/);
  assert.throws(
    () => measureCatalogCounts(collections(), { ...totals(), steadyRecurringTokens: NaN }),
    /INVALID_TOTAL/
  );
});

test("new provider, migration and catalog entry are RED then deterministic GREEN without changing other text", () => {
  const input = fixture();
  const red = tallyDrift(managedCountChecks(input.registry, input.facts), (file) =>
    input.files.get(file)
  );
  assert.equal(red.strict, 3);
  const plan = planCountSync(input);
  assert.equal(plan.changes.filter((change) => change.kind === "numeric").length, 3);
  for (const change of plan.changes.filter((change) => change.kind === "numeric")) {
    let oldAt = 0;
    let newAt = 0;
    for (const op of change.operations) {
      const untouched = change.before.slice(oldAt, op.start);
      assert.equal(change.after.slice(newAt, newAt + untouched.length), untouched);
      newAt += untouched.length + op.after.length;
      oldAt = op.end;
    }
    assert.equal(change.after.slice(newAt), change.before.slice(oldAt));
  }
  const updated = new Map(input.files);
  for (const change of plan.changes) updated.set(change.path, change.after);
  const green = tallyDrift(managedCountChecks(input.registry, input.facts), (file) =>
    updated.get(file)
  );
  assert.equal(green.strict, 0);
  assert.equal(planCountSync({ ...input, files: updated }).changes.length, 0);
  assert.match(updated.get("docs/i18n/bn/docs/example.md"), /Providers ২; migrations ৩; entries ৪/);
  assert.match(updated.get("docs/i18n/fa/docs/example.md"), /Providers ۲; migrations ۳; entries ۴/);
});

test("only proved existing state string leaves advance; absent caches and old dates remain", () => {
  const input = fixture();
  const plan = planCountSync(input);
  const result = plan.changes.find((change) => change.path === ".i18n-state.json");
  const state = JSON.parse(result.after);
  assert.equal(Object.hasOwn(state.sources[input.source].locales.fa, "section_hashes"), false);
  assert.equal(state.sources[input.source].locales.bn.updated_at, "2020-01-01");
  assert.ok(
    plan.stateLeaves.every((leaf) =>
      /source_hash|target_hash|section_hashes/.test(leaf.pointer.join("/"))
    )
  );
  let masked = result.after;
  for (const leaf of [...plan.stateLeaves].reverse())
    masked = patchJsonStringLeaves(masked, [
      { pointer: leaf.pointer, before: leaf.after, after: leaf.before },
    ]);
  assert.equal(masked, result.before);
});

for (const failure of ["source", "target", "cache"])
  test(`stale ${failure} state cannot be laundered by numeric updates`, () => {
    const input = fixture();
    const state = JSON.parse(input.files.get(".i18n-state.json"));
    if (failure === "source") state.sources[input.source].source_hash = "old";
    if (failure === "target") state.sources[input.source].locales.bn.target_hash = "old";
    if (failure === "cache") state.sources[input.source].locales.bn.section_hashes = ["old"];
    input.files.set(".i18n-state.json", JSON.stringify(state));
    assert.throws(() => planCountSync(input), /PREIMAGE/);
    const review = planCountSync({ ...input, preserveState: true });
    assert.equal(review.stateReviewRequired, true);
    assert.equal(review.stateLeaves.length, 0);
    assert.ok(!review.changes.some((change) => change.path === ".i18n-state.json"));
  });

test("missing files, missing or ambiguous anchors and new unregistered locales fail", () => {
  const input = fixture();
  const missing = new Map(input.files);
  missing.delete(input.source);
  assert.throws(() => planCountSync({ ...input, files: missing }), /REQUIRED_FILE_MISSING/);
  assert.equal(
    tallyDrift(managedCountChecks(input.registry, input.facts), (file) => missing.get(file)).strict,
    3
  );
  const document = input.registry.documents[0];
  assert.throws(
    () => planDocumentCounts(document, "Changed prose\n", input.facts),
    /ANCHOR_MISSING/
  );
  assert.throws(
    () => planDocumentCounts(document, input.files.get(input.source).repeat(2), input.facts),
    /ANCHOR_AMBIGUOUS/
  );
  assert.throws(
    () => planCountSync({ ...input, locales: [...input.locales, "new"] }),
    /LOCALE_REGISTRY_DRIFT/
  );
});

test("unknown facts and generator outputs fail without introducing a baseline", () => {
  const input = fixture();
  const registry = structuredClone(input.registry);
  registry.documents[0].groups[0].claims[0].fact = "unsupported";
  assert.throws(() => planCountSync({ ...input, registry }), /UNKNOWN_FACT/);
  assert.throws(
    () => planCountSync({ ...input, generated: new Map([["unknown.svg", "x"]]) }),
    /GENERATOR_OUTPUT_SET/
  );
});

test("generated translated source changes require semantic review, SVG-only changes do not invent state", () => {
  const files = new Map([
    ["doc.md", "before"],
    [".i18n-state.json", JSON.stringify({ sources: { "doc.md": { locales: { pt: {} } } } })],
  ]);
  const registry = { version: 1, documents: [], families: [], generated: ["doc.md"] };
  assert.throws(
    () =>
      planCountSync({
        registry,
        files,
        facts: {},
        locales: [],
        generated: new Map([["doc.md", "after"]]),
      }),
    /TRANSLATION_REQUIRED/
  );
  const svg = planCountSync({
    registry: { ...registry, generated: ["picture.svg"] },
    files: new Map([["picture.svg", "before"]]),
    facts: {},
    locales: [],
    generated: new Map([["picture.svg", "after"]]),
  });
  assert.equal(svg.stateLeaves.length, 0);
});

test("JSON pointer edits do not replace equal hashes in unrelated leaves", () => {
  const original = '{ "a": { "hash": "same" }, "b": { "hash": "same" } }\n';
  assert.equal(
    patchJsonStringLeaves(original, [{ pointer: ["a", "hash"], before: "same", after: "new" }]),
    '{ "a": { "hash": "new" }, "b": { "hash": "same" } }\n'
  );
  assert.throws(
    () =>
      patchJsonStringLeaves(original, [{ pointer: ["a", "hash"], before: "wrong", after: "new" }]),
    /LEAF_PREIMAGE/
  );
});

test("unmanaged financial budget or pool claims fail rather than update translation hashes", () => {
  const files = new Map([["README.md", "~1.00B free tokens/month from 1 recurring pool.\n"]]);
  const facts = { freeSteady: 1e9, freeFirst: 1e9, freeGated: 0, freePools: 1 };
  validateFinancialCopy(files, facts, ["README.md"]);
  assert.throws(
    () =>
      validateFinancialCopy(files, { ...facts, freeSteady: 2e9, freeFirst: 2e9 }, ["README.md"]),
    /FINANCIAL_COPY_REVIEW_REQUIRED/
  );
  assert.throws(
    () => validateFinancialCopy(files, { ...facts, freePools: 2 }, ["README.md"]),
    /FINANCIAL_COPY_REVIEW_REQUIRED/
  );
  assert.throws(
    () => validateFinancialCopy(new Map([["README.md", "Claim removed"]]), facts, ["README.md"]),
    /FINANCIAL_COPY_REVIEW_REQUIRED/
  );
});

function diskFixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "docs-counts-test-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const changes = ["one.md", "two.md"].map((file) => ({
    path: file,
    before: "old\n",
    after: "new\n",
    beforeHash: contentHash("old\n"),
    afterHash: contentHash("new\n"),
  }));
  for (const change of changes) fs.writeFileSync(path.join(root, change.path), change.before);
  return { root, plan: { changes, stateReviewRequired: false } };
}

test("file writes require all exact preimages and unchanged input snapshot", (t) => {
  const input = diskFixture(t);
  fs.writeFileSync(path.join(input.root, "two.md"), "concurrent\n");
  assert.throws(() => applyCountPlan(input), /TARGET_PREIMAGE_CHANGED/);
  assert.equal(fs.readFileSync(path.join(input.root, "one.md"), "utf8"), "old\n");
  assert.throws(() => applyCountPlan({ ...input, verifyInputs: () => false }), /SOURCE_CHANGED/);
});

test("partial write failure compensates only this command's own outputs", (t) => {
  const input = diskFixture(t);
  let renames = 0;
  const io = {
    ...fs,
    renameSync(from, to) {
      if (++renames === 2) throw new Error("injected disk failure");
      fs.renameSync(from, to);
    },
  };
  assert.throws(() => applyCountPlan({ ...input, io }), /injected disk failure/);
  for (const change of input.plan.changes)
    assert.equal(fs.readFileSync(path.join(input.root, change.path), "utf8"), change.before);
  assert.deepEqual(fs.readdirSync(input.root).sort(), ["one.md", "two.md"]);
});

test("concurrent user edit is preserved during failed-write compensation", (t) => {
  const input = diskFixture(t);
  let renames = 0;
  const io = {
    ...fs,
    renameSync(from, to) {
      if (++renames === 2) {
        fs.writeFileSync(path.join(input.root, "one.md"), "user edit\n");
        throw new Error("injected");
      }
      fs.renameSync(from, to);
    },
  };
  assert.throws(() => applyCountPlan({ ...input, io }), /COMPENSATION_REVIEW_REQUIRED/);
  assert.equal(fs.readFileSync(path.join(input.root, "one.md"), "utf8"), "user edit\n");
  assert.deepEqual(fs.readdirSync(input.root).sort(), ["one.md", "two.md"]);
});

test("successful writes are atomic per file and unsafe or symlink targets are refused", (t) => {
  const input = diskFixture(t);
  assert.equal(applyCountPlan(input).written, 2);
  fs.symlinkSync(path.join(input.root, "one.md"), path.join(input.root, "link.md"));
  assert.throws(() => readCountFiles(input.root, ["link.md"]), /SYMLINK/);
  assert.throws(() => readCountFiles(input.root, ["../one.md"]), /UNSAFE_PATH/);
});

test("check is the CLI default and unknown or contradictory modes are refused", () => {
  assert.equal(parseCountArguments([]).write, false);
  assert.equal(parseCountArguments(["--write"]).write, true);
  assert.throws(() => parseCountArguments(["--write", "--check"]), /ARGUMENTS_INVALID/);
  assert.throws(() => parseCountArguments(["--force"]), /ARGUMENTS_INVALID/);
});

test("routing strategy measurement refuses computed or repeated entries", () => {
  assert.equal(parseRoutingStrategyCount('const ROUTING_STRATEGY_VALUES = ["one", "two",]'), 2);
  assert.throws(
    () => parseRoutingStrategyCount('const ROUTING_STRATEGY_VALUES = ["one", ...others]'),
    /STRATEGIES_SHAPE/
  );
  assert.throws(
    () => parseRoutingStrategyCount('const ROUTING_STRATEGY_VALUES = ["one", "one"]'),
    /STRATEGIES_INVALID/
  );
});
