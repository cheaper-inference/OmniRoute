// Workflow regression tests from PR #21036 by same7adel.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function stripHashComments(source) {
  return source
    .split("\n")
    .filter((line) => !/^\s*#/.test(line))
    .join("\n");
}

test("nightly-llm-security.yml pins garak to an exact PyPI version (#21014)", () => {
  const wf = stripHashComments(read(".github/workflows/nightly-llm-security.yml"));
  assert.doesNotMatch(
    wf,
    /pip\s+install\s+(?:--[^\s]+\s+)*garak\s*$/m,
    "unpinned `pip install garak` in a job holding PROMPTFOO_PROVIDER_KEY is forbidden"
  );
  assert.match(
    wf,
    /pip\s+install\s+--disable-pip-version-check\s+garak==\d+\.\d+\.\d+\b/,
    "garak must be pinned with ==x.y.z"
  );
});

test("ci.yml test-bun-sqlite uses lockfile-pinned Bun instead of remote/global installers (#21014)", () => {
  const ci = stripHashComments(read(".github/workflows/ci.yml"));
  assert.doesNotMatch(
    ci,
    /bun\.sh\/install\.ps1/,
    "ci.yml must never pipe bun.sh/install.ps1 into PowerShell"
  );
  assert.doesNotMatch(
    ci,
    /npm\s+install\s+-g\s+bun\b/,
    "ci.yml must never run unpinned `npm install -g bun`"
  );
  assert.match(
    ci,
    /npx\s+--no-install\s+bun\s+--version/,
    "test-bun-sqlite must verify the lockfile-pinned local bun binary via npx --no-install"
  );
});

test("npm-publish.yml runs CycloneDX with npx --no-install (#21014)", () => {
  const wf = stripHashComments(read(".github/workflows/npm-publish.yml"));
  assert.match(
    wf,
    /npx\s+--no-install\s+@cyclonedx\/cyclonedx-npm\b/,
    "SBOM generation must execute the lockfile-pinned @cyclonedx/cyclonedx-npm with --no-install"
  );
  assert.doesNotMatch(
    wf,
    /npx\s+@cyclonedx\/cyclonedx-npm\b/,
    "bare `npx @cyclonedx/cyclonedx-npm` without --no-install must not remain"
  );
});

test("schemathesis workflows pin exact PyPI versions (#21014)", () => {
  for (const rel of [
    ".github/workflows/nightly-schemathesis.yml",
    ".github/workflows/dast-smoke.yml",
  ]) {
    const wf = stripHashComments(read(rel));
    assert.doesNotMatch(
      wf,
      /pip\s+install\s+(?:--[^\s]+\s+)*schemathesis\s*$/m,
      `${rel} must not run unpinned pip install schemathesis`
    );
    assert.match(
      wf,
      /pip\s+install\s+--disable-pip-version-check\s+schemathesis==\d+\.\d+\.\d+\b/,
      `${rel} must pin schemathesis==x.y.z`
    );
  }
});
