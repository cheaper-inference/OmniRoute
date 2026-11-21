// tests/unit/build/check-vuln-ratchet.test.ts
// TDD unit tests for scripts/check/check-vuln-ratchet.mjs — Task 7.2 osv-scanner.
//
// Strategy: test the two exported pure functions without spawning osv-scanner
// or touching the filesystem. All fixtures are synthetic.
//   - parseOsvJson()      — parses osv-scanner --format json output
//   - extractSeverity()   — extracts severity from a vulnerability entry
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import {
  parseOsvJson,
  extractSeverity,
  evaluateVulnRatchet,
  readBaselineVulnValue,
  // @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
} from "../../../scripts/check/check-vuln-ratchet.mjs";

type RatchetVerdict = { regressed: boolean; improved: boolean };
const evaluate = evaluateVulnRatchet as (current: number, baseline: number) => RatchetVerdict;
const readBaseline = readBaselineVulnValue as (p?: string) => number | null;

const SCRIPT_PATH = fileURLToPath(
  new URL("../../../scripts/check/check-vuln-ratchet.mjs", import.meta.url)
);

// ---------------------------------------------------------------------------
// Fixtures — Synthetic JSON with osv-scanner format --format json
// ---------------------------------------------------------------------------

/** Empty result (no vulnerabilities found). */
function makeEmptyResult() {
  return { results: [] };
}

/** Um pacote com 1 vulnerabilidade, sem groups. */
function makeResultOnePkg(vulnCount: number) {
  const vulnerabilities = Array.from({ length: vulnCount }, (_, i) => ({
    id: `GHSA-fake-${i + 1}`,
    aliases: [],
    affected: [],
  }));
  return {
    results: [
      {
        packages: [
          {
            package: { name: "lodash", version: "4.17.0", ecosystem: "npm" },
            vulnerabilities,
          },
        ],
      },
    ],
  };
}

/** Two packages in two results, no groups. */
function makeResultTwoPkgs() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-a", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              { id: "GHSA-aaa-1", aliases: [], affected: [] },
              { id: "GHSA-aaa-2", aliases: [], affected: [] },
            ],
          },
        ],
      },
      {
        packages: [
          {
            package: { name: "pkg-b", version: "2.0.0", ecosystem: "npm" },
            vulnerabilities: [{ id: "GHSA-bbb-1", aliases: [], affected: [] }],
          },
        ],
      },
    ],
  };
}

/** Package with groups for deduplication. */
function makeResultWithGroups() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-c", version: "3.0.0", ecosystem: "npm" },
            // 3 vulnerabilities but only 2 groups (1 was deduplicated)
            vulnerabilities: [
              { id: "GHSA-ccc-1", aliases: [], affected: [] },
              { id: "GHSA-ccc-2", aliases: [], affected: [] },
              { id: "GHSA-ccc-3", aliases: [], affected: [] },
            ],
            groups: [
              { ids: ["GHSA-ccc-1"] },
              { ids: ["GHSA-ccc-2", "GHSA-ccc-3"] }, // grupo deduplicado
            ],
          },
        ],
      },
    ],
  };
}

/** Pacote com severidade em database_specific.severity. */
function makeResultWithDbSeverity() {
  return {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-sev", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              {
                id: "GHSA-sev-1",
                database_specific: { severity: "HIGH" },
                aliases: [],
                affected: [],
              },
              {
                id: "GHSA-sev-2",
                database_specific: { severity: "CRITICAL" },
                aliases: [],
                affected: [],
              },
              {
                id: "GHSA-sev-3",
                database_specific: { severity: "low" }, // lowercase
                aliases: [],
                affected: [],
              },
            ],
          },
        ],
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// parseOsvJson — invalid input
// ---------------------------------------------------------------------------

test("parseOsvJson: null retorna vulnCount=0", () => {
  const result = parseOsvJson(null);
  assert.equal(result.vulnCount, 0);
  assert.deepEqual(result.bySeverity, {});
});

test("parseOsvJson: undefined retorna vulnCount=0", () => {
  const result = parseOsvJson(undefined as unknown as null);
  assert.equal(result.vulnCount, 0);
});

test("parseOsvJson: object without results returns vulnCount=0", () => {
  const result = parseOsvJson({ other: [] } as unknown as { results: never[] });
  assert.equal(result.vulnCount, 0);
});

test("parseOsvJson: non-array results returns vulnCount=0", () => {
  const result = parseOsvJson({ results: "invalid" } as unknown as { results: never[] });
  assert.equal(result.vulnCount, 0);
});

// ---------------------------------------------------------------------------
// parseOsvJson — empty result
// ---------------------------------------------------------------------------

test("parseOsvJson: empty results returns vulnCount=0", () => {
  const result = parseOsvJson(makeEmptyResult());
  assert.equal(result.vulnCount, 0);
  assert.deepEqual(result.bySeverity, {});
});

test("parseOsvJson: result sem packages retorna vulnCount=0", () => {
  const result = parseOsvJson({ results: [{ other: "data" }] } as unknown as {
    results: { packages: never[] }[];
  });
  assert.equal(result.vulnCount, 0);
});

// ---------------------------------------------------------------------------
// parseOsvJson — basic counting
// ---------------------------------------------------------------------------

test("parseOsvJson: 1 pacote com 1 vuln retorna vulnCount=1", () => {
  const result = parseOsvJson(makeResultOnePkg(1));
  assert.equal(result.vulnCount, 1);
});

test("parseOsvJson: 1 pacote com 3 vulns retorna vulnCount=3", () => {
  const result = parseOsvJson(makeResultOnePkg(3));
  assert.equal(result.vulnCount, 3);
});

test("parseOsvJson: 2 pacotes em 2 results retorna vulnCount=3 (2+1)", () => {
  const result = parseOsvJson(makeResultTwoPkgs());
  assert.equal(result.vulnCount, 3);
});

// ---------------------------------------------------------------------------
// parseOsvJson — deduplication via groups
// ---------------------------------------------------------------------------

test("parseOsvJson: usa groups.length quando groups tem menos entradas que vulnerabilities", () => {
  // 3 vulns, 2 grupos => vulnCount=2 (deduplicado)
  const result = parseOsvJson(makeResultWithGroups());
  assert.equal(result.vulnCount, 2);
});

test("parseOsvJson: uses vulnerabilities.length when groups is missing", () => {
  // No groups => counts vulnerabilities directly
  const result = parseOsvJson(makeResultOnePkg(5));
  assert.equal(result.vulnCount, 5);
});

test("parseOsvJson: empty groups does not cause deduplication (uses vulnerabilities)", () => {
  const json = {
    results: [
      {
        packages: [
          {
            package: { name: "pkg-d", version: "1.0.0", ecosystem: "npm" },
            vulnerabilities: [
              { id: "GHSA-d-1", aliases: [], affected: [] },
              { id: "GHSA-d-2", aliases: [], affected: [] },
            ],
            groups: [], // empty — should not deduplicate
          },
        ],
      },
    ],
  };
  const result = parseOsvJson(json);
  assert.equal(result.vulnCount, 2);
});

// ---------------------------------------------------------------------------
// parseOsvJson — severidade
// ---------------------------------------------------------------------------

test("parseOsvJson: coleta severidade de database_specific.severity", () => {
  const result = parseOsvJson(makeResultWithDbSeverity());
  assert.equal(result.vulnCount, 3);
  assert.ok("HIGH" in result.bySeverity, "must have HIGH");
  assert.ok("CRITICAL" in result.bySeverity, "must have CRITICAL");
  assert.ok("LOW" in result.bySeverity, "must have LOW (normalized to uppercase)");
});

test("parseOsvJson: vuln sem severidade conta como UNKNOWN", () => {
  const json = makeResultOnePkg(1);
  // Vuln sem database_specific.severity e sem severity array
  const result = parseOsvJson(json);
  assert.ok("UNKNOWN" in result.bySeverity, "vuln without severity must be UNKNOWN");
});

// ---------------------------------------------------------------------------
// extractSeverity
// ---------------------------------------------------------------------------

test("extractSeverity: null retorna UNKNOWN", () => {
  assert.equal(extractSeverity(null), "UNKNOWN");
});

test("extractSeverity: empty object returns UNKNOWN", () => {
  assert.equal(extractSeverity({}), "UNKNOWN");
});

test("extractSeverity: usa database_specific.severity quando presente", () => {
  const vuln = { database_specific: { severity: "HIGH" } };
  assert.equal(extractSeverity(vuln), "HIGH");
});

test("extractSeverity: normaliza database_specific.severity para uppercase", () => {
  const vuln = { database_specific: { severity: "critical" } };
  assert.equal(extractSeverity(vuln), "CRITICAL");
});

test("extractSeverity: uses severity[0].type when database_specific missing", () => {
  const vuln = { severity: [{ type: "CVSS_V3", score: "CVSS:3.1/AV:N/AC:L" }] };
  assert.equal(extractSeverity(vuln), "CVSS_V3");
});

test("extractSeverity: database_specific.severity takes precedence over severity[]", () => {
  const vuln = {
    database_specific: { severity: "HIGH" },
    severity: [{ type: "CVSS_V2", score: "AV:N/AC:L/Au:N/C:P/I:P/A:P" }],
  };
  assert.equal(extractSeverity(vuln), "HIGH");
});

test("extractSeverity: empty severity array returns UNKNOWN", () => {
  const vuln = { severity: [] };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

test("extractSeverity: severity[0] sem type retorna UNKNOWN", () => {
  const vuln = { severity: [{ score: "AV:N/AC:L" }] };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

test("extractSeverity: empty database_specific.severity returns UNKNOWN", () => {
  const vuln = { database_specific: { severity: "" } };
  assert.equal(extractSeverity(vuln), "UNKNOWN");
});

// ---------------------------------------------------------------------------
// evaluateVulnRatchet — ratchet direction:down (cycle-end: flip to blocking)
// Regression when measured > baseline; baseline=10 → 11+ blocks, 10 passes.
// ---------------------------------------------------------------------------

test("evaluateVulnRatchet: medida == baseline passa (10 vs 10)", () => {
  const r = evaluate(10, 10);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, false);
});

test("evaluateVulnRatchet: one more than the baseline is regression (11 vs 10)", () => {
  const r = evaluate(11, 10);
  assert.equal(r.regressed, true, "a single new vulnerability must block");
  assert.equal(r.improved, false);
});

test("evaluateVulnRatchet: less than baseline is improvement", () => {
  const r = evaluate(5, 10);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateVulnRatchet: zero against non-zero baseline is maximum improvement", () => {
  const r = evaluate(0, 13);
  assert.equal(r.regressed, false);
  assert.equal(r.improved, true);
});

test("evaluateVulnRatchet: strict integer comparison — any increase regresses", () => {
  assert.equal(evaluate(11, 10).regressed, true);
  assert.equal(evaluate(10, 10).regressed, false);
  assert.equal(evaluate(9, 10).regressed, false);
});

// ---------------------------------------------------------------------------
// readBaselineVulnValue — leitura tolerante do quality-baseline.json
// ---------------------------------------------------------------------------

function withTmpBaseline(content: string | null, fn: (p: string) => void) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "vuln-baseline-"));
  const p = path.join(dir, "quality-baseline.json");
  if (content !== null) fs.writeFileSync(p, content);
  try {
    fn(p);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
}

test("readBaselineVulnValue: read metrics.vulnCount.value", () => {
  withTmpBaseline(JSON.stringify({ metrics: { vulnCount: { value: 10 } } }), (p) => {
    assert.equal(readBaseline(p), 10);
  });
});

test("readBaselineVulnValue: missing file returns null (graceful SKIP)", () => {
  assert.equal(readBaseline("/tmp/does-not-exist-99999/quality-baseline.json"), null);
});

test("readBaselineVulnValue: missing metric returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: {} }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineVulnValue: non-numeric value returns null", () => {
  withTmpBaseline(JSON.stringify({ metrics: { vulnCount: { value: "10" } } }), (p) => {
    assert.equal(readBaseline(p), null);
  });
});

test("readBaselineVulnValue: Invalid JSON returns null (does not throw)", () => {
  withTmpBaseline("{ not valid json", (p) => {
    assert.equal(readBaseline(p), null);
  });
});

// ---------------------------------------------------------------------------
// --ratchet end-to-end: a missing required measurement is incomplete and blocks. Runs the script with an empty PATH so osv-scanner is unresolvable.
// ---------------------------------------------------------------------------

test("--ratchet with osv-scanner missing reports INCOMPLETE and exits 2", () => {
  const res = spawnSync(process.execPath, [SCRIPT_PATH, "--ratchet", "--quiet"], {
    encoding: "utf8",
    // Empty PATH → `which`/`osv-scanner` unresolvable → findOsvScanner() returns null.
    env: { ...process.env, PATH: "/nonexistent-bin-dir" },
    timeout: 30_000,
  });
  assert.equal(res.status, 2, "required scanner evidence must be complete");
  assert.match(res.stdout, /vulnCount=INCOMPLETE reason=binary-absent/);
});
