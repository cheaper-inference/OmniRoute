import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

globalThis.fetch = () => {
  throw new Error("network access in tests");
};

const { runDrift } = await import("../../scripts/quality/catalog-drift/run.mjs");
const { emptyState, loadState, recordFetch, recordProviderRun } =
  await import("../../scripts/quality/catalog-drift/state.mjs");

const nowIso = "2026-11-25T00:00:00.000Z";
const modelList = {
  id: "a",
  provider: "p",
  url: "https://example.test/models",
  type: "model-list" as const,
  source: "public-api" as const,
  addedAt: "2026-11-25",
  minIds: 1,
};
const validList = () => Response.json({ data: [{ id: "a" }] });
const emptyList = () => Response.json({ data: [] });
const gone = async () => {
  throw new Error("DNS failed", { cause: { code: "ENOTFOUND" } });
};

function run(options: Partial<Parameters<typeof runDrift>[0]> = {}) {
  return runDrift({
    manifest: {
      schemaVersion: 1,
      reviewedAt: "2026-11-25",
      allowedHosts: ["example.test"],
      probes: [modelList],
    },
    catalogRows: [{ provider: "p", modelId: "a", freeType: "recurring-daily", monthlyTokens: 1 }],
    catalogCuratedAt: "2026-11-09",
    now: () => Date.parse(nowIso),
    sleep: async () => {},
    fetchImpl: gone,
    ...options,
  });
}

test("one failure does not produce a finding", async () => {
  const { report, state } = await run();
  assert.equal(report.providers.p.fingerprint, null);
  assert.equal(report.providers.p.allProbesFetched, false);
  assert.equal(state.probes.a.consecutiveFailures, 1);
});

test("two consecutive failures produce one drift finding", async () => {
  const first = await run();
  const { report, state } = await run({ state: first.state });
  assert.deepEqual(
    report.providers.p.findings.map(({ kind, severity }) => [kind, severity]),
    [["gone", "drift"]]
  );
  assert.equal(state.probes.a.consecutiveFailures, 2);
});

test("a success resets the counter", async () => {
  const first = await run();
  const second = await run({ state: first.state, fetchImpl: async () => validList() });
  const third = await run({ state: second.state });
  assert.equal(third.state.probes.a.consecutiveFailures, 1);
  assert.equal(third.report.providers.p.fingerprint, null);
});

test("invalid responses count as failures", async () => {
  const fetchImpl = async () => emptyList();
  const first = await run({ fetchImpl });
  assert.deepEqual(first.report.providers.p.findings, []);
  const second = await run({ fetchImpl, state: first.state });
  assert.deepEqual(
    second.report.providers.p.findings.map(({ kind }) => kind),
    ["invalid-response"]
  );
});

test("a page that shrank by half and lost every phrase is invalid", async () => {
  const probe = { ...modelList, type: "page-text" as const, mustContain: ["quota"] };
  const manifest = {
    schemaVersion: 1 as const,
    reviewedAt: "2026-11-25",
    allowedHosts: ["example.test"],
    probes: [probe],
  };
  const first = await run({
    manifest,
    fetchImpl: async () => new Response("quota " + "a".repeat(994)),
  });
  const short = await run({
    manifest,
    state: first.state,
    fetchImpl: async () => new Response("b".repeat(300)),
  });
  assert.equal(short.report.probes[0].status, "invalid-response");
  assert.deepEqual(short.report.providers.p.findings, []);
  assert.equal(short.state.probes.a.textChars, 1000);
  const long = await run({
    manifest,
    state: first.state,
    fetchImpl: async () => new Response("b".repeat(900)),
  });
  assert.deepEqual(
    long.report.providers.p.findings.map(({ kind }) => kind),
    ["phrase-missing"]
  );
  assert.equal(long.state.probes.a.textChars, 900);
});

test("the same fingerprint counts consecutive runs", async () => {
  const catalogRows = ["a", "b"].map((modelId) => ({
    provider: "p",
    modelId,
    freeType: "recurring-daily",
    monthlyTokens: 1,
  }));
  const missingA = async () => Response.json({ data: [{ id: "b" }] });
  const first = await run({ catalogRows, fetchImpl: missingA });
  const second = await run({ catalogRows, state: first.state, fetchImpl: missingA });
  const third = await run({ catalogRows, state: second.state, fetchImpl: async () => validList() });
  const clear = await run({
    catalogRows,
    state: third.state,
    fetchImpl: async () => Response.json({ data: [{ id: "a" }, { id: "b" }] }),
  });
  assert.deepEqual(
    [first, second, third, clear].map(({ report }) => report.providers.p.consecutiveRuns),
    [1, 2, 1, 0]
  );
});

test("the deadline skips the remaining probes and still saves the state", async () => {
  let clock = Date.parse(nowIso);
  const { report, state } = await run({
    manifest: {
      schemaVersion: 1,
      reviewedAt: "2026-11-25",
      allowedHosts: ["example.test"],
      probes: [modelList, { ...modelList, id: "b" }, { ...modelList, id: "c", provider: "pc" }],
    },
    now: () => clock,
    fetchImpl: async () => {
      clock += 7 * 60_000;
      return validList();
    },
    deadlineMs: 12 * 60_000,
  });
  assert.equal(report.probes[2].status, "skipped");
  assert.equal(report.probes[2].detail, "deadline");
  assert.deepEqual(Object.keys(state.probes), ["a", "b"]);
  assert.equal(report.providers.pc.allProbesFetched, false);
});

test("--only keeps the state of other probes", async () => {
  const initialState = recordFetch(emptyState(), "b", "failed", nowIso, null).state;
  const { state: original } = recordProviderRun(initialState, "pb", "1234567890abcdef", nowIso);
  const { state } = await run({
    manifest: {
      schemaVersion: 1,
      reviewedAt: "2026-11-25",
      allowedHosts: ["example.test"],
      probes: [
        { ...modelList, provider: "pa" },
        { ...modelList, id: "b", provider: "pb" },
      ],
    },
    only: "pa",
    state: original,
  });
  assert.deepEqual(state.probes.b, original.probes.b);
  assert.deepEqual(state.providers.pb, original.providers.pb);
  assert.equal(original.probes.a, undefined);
});

function tempDir(t: { after: (callback: () => void) => void }) {
  mkdirSync("_artifacts", { recursive: true });
  const dir = mkdtempSync("_artifacts/catalog-drift-state-");
  t.after(() => rmSync(dir, { recursive: true }));
  return dir;
}

test("loadState falls back to an empty state on a missing or corrupt file", (t) => {
  const file = join(tempDir(t), "state.json");
  assert.deepEqual(loadState(file), emptyState());
  writeFileSync(file, "{");
  assert.deepEqual(loadState(file), emptyState());
  writeFileSync(file, JSON.stringify({ ...emptyState(), probes: { a: null } }));
  assert.deepEqual(loadState(file), emptyState());
});

test("the CLI reloads and writes the same state file", (t) => {
  const out = tempDir(t);
  const stateFile = join(out, "state.json");
  const fixtureDir = "tests/fixtures/catalog-drift";
  const args = [
    "--import",
    "tsx/esm",
    "scripts/quality/catalog-drift/run.mjs",
    "--out",
    out,
    "--state",
    stateFile,
    "--manifest",
    join(fixtureDir, "manifest.2026-11-09.json"),
    "--catalog",
    join(fixtureDir, "catalog.2026-11-09.json"),
    "--replay",
    join(fixtureDir, "sources"),
    "--replay-tag",
    "after",
    "--only",
    "mistral",
  ];

  for (const expected of [1, 2]) {
    const result = spawnSync(process.execPath, args, { encoding: "utf8" });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(loadState(stateFile).providers.mistral.consecutiveRuns, expected);
  }
});
