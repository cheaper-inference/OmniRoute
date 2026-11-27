import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

let fetchCalls = 0;
globalThis.fetch = () => {
  fetchCalls++;
  throw new Error("network access in tests");
};

const { runDrift } = await import("../../scripts/quality/catalog-drift/run.mjs");
const { renderMarkdown } = await import("../../scripts/quality/catalog-drift/report.mjs");
const { loadManifest } = await import("../../scripts/quality/catalog-drift/manifest.mjs");

const fixtureDir = "tests/fixtures/catalog-drift";
const fixtureManifest = join(fixtureDir, "manifest.2026-11-09.json");
const fixtureCatalog = join(fixtureDir, "catalog.2026-11-09.json");
const sourcesDir = join(fixtureDir, "sources");
const manifest = loadManifest(fixtureManifest);
const { catalogRows, catalogCuratedAt } = JSON.parse(readFileSync(fixtureCatalog, "utf8"));
const providers = ["llm7", "mistral", "nara", "xkiro"];

function replay(tag: string, now = Date.UTC(2026, 10, 25)) {
  return runDrift({
    manifest,
    catalogRows,
    catalogCuratedAt,
    replay: { dir: sourcesDir, tag },
    now: () => now,
  });
}

const { report: before } = await replay("before");
const { report: after } = await replay("after");

test("before: the 2026-11-09 catalog matches every source", () => {
  assert.equal(before.probes.length, 6);
  assert.ok(before.probes.every((probe) => probe.status === "ok"));
  for (const provider of providers) {
    const result = before.providers[provider];
    assert.equal(result.allProbesFetched, true);
    assert.equal(result.fingerprint, null);
    assert.ok(result.findings.every(({ severity }) => severity !== "drift"));
  }
});

test("after: Mistral's free API drop is detected", () => {
  const kinds = after.providers.mistral.findings.map(({ kind }) => kind);
  assert.ok(kinds.includes("phrase-missing"));
  assert.ok(kinds.includes("phrase-present"));
});

test("after: Nara's free plan with no models is detected", () => {
  const assertions = after.providers.nara.findings.filter(
    ({ kind }) => kind === "assertion-failed"
  );
  const lengthFailure = assertions.find(({ details }) => details.op === "lengthAtLeast");
  assert.equal(lengthFailure?.details.actual, 0);
  const idsFailure = assertions.find(({ details }) => details.op === "includesCatalogIds");
  assert.deepEqual(idsFailure?.details.missing, [
    "agnes-2.0-flash",
    "agnes-2.5-flash",
    "laguna-s-2.1",
    "minimax-m3-free",
    "mistral-large",
    "mistral-medium-3-5",
    "qwen3.8-27b",
    "stepfun-3.7-flash",
  ]);
});

test("after: xKiro's cut is detected", () => {
  const findings = after.providers.xkiro.findings;
  assert.deepEqual(findings.find(({ kind }) => kind === "ids-missing")?.details.ids, [
    "deepseek/deepseek-v4-pro",
    "minimax/minimax-m2.7:free",
    "qwen/qwen3-vl-plus:free",
  ]);
  assert.equal(
    findings.find(({ kind }) => kind === "phrase-missing")?.details.phrase,
    "Free tokens 5M / day"
  );
});

test("after: LLM7's cut is detected", () => {
  const findings = after.providers.llm7.findings;
  assert.deepEqual(findings.find(({ kind }) => kind === "ids-missing")?.details.ids, [
    "deepseek-r1-0528",
    "gpt-4.1-nano-2025-04-14",
    "gpt-4o-mini-2024-07-18",
    "qwen2.5-coder-32b-instruct",
  ]);
  assert.ok(findings.some(({ kind }) => kind === "excerpt-changed"));
});

test("criterion 8: each of the four providers has at least one drift finding after", () => {
  assert.ok(providers.every((provider) => after.providers[provider].fingerprint !== null));
});

test("fingerprints are stable across runs", async () => {
  const { report } = await replay("after", Date.UTC(2026, 10, 26));
  assert.notEqual(report.runAt, after.runAt);
  for (const provider of providers) {
    assert.equal(report.providers[provider].fingerprint, after.providers[provider].fingerprint);
  }
});

test("the report carries catalog rows per provider", () => {
  assert.equal(after.providers.mistral.catalogRows.length, 5);
  assert.equal(after.providers.mistral.notInCatalog, false);
  assert.match(
    renderMarkdown(after),
    /\| provider \| probes \| drift \| info \| fetch failures \|/
  );
});

test("replay never touches the network", () => {
  assert.equal(fetchCalls, 0);
});

test("fixtures stay minimal", () => {
  const files = readdirSync(sourcesDir);
  assert.equal(files.length, 12);
  for (const file of files) {
    assert.ok(statSync(join(sourcesDir, file)).size <= 2048, file);
  }
});

test("cli writes report.json and report.md and exits 0 with drift", (t) => {
  mkdirSync("_artifacts", { recursive: true });
  const out = mkdtempSync("_artifacts/catalog-drift-cli-");
  t.after(() => rmSync(out, { recursive: true }));
  const result = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "scripts/quality/catalog-drift/run.mjs",
      "--out",
      out,
      "--manifest",
      fixtureManifest,
      "--catalog",
      fixtureCatalog,
      "--replay",
      sourcesDir,
      "--replay-tag",
      "after",
    ],
    { encoding: "utf8" }
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(readFileSync(join(out, "report.json"), "utf8")).schemaVersion, 1);
  assert.match(readFileSync(join(out, "report.md"), "utf8"), /\| mistral \|/);
});
