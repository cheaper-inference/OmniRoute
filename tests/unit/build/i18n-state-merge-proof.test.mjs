import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  sectionHashes,
  splitSections,
  stripTopHeading,
} from "../../../scripts/i18n/lib/section-cache.mjs";

const linuxTest = process.platform === "linux" ? test : test.skip;
const resolver = fileURLToPath(
  new URL(
    "../../../config/quality/skill-templates/i18n-waves/scripts/resolve_state_merge.py",
    import.meta.url
  )
);
const fixtureScript = fileURLToPath(new URL("./i18n-state-merge-proof.test.py", import.meta.url));

function invoke(t, extra, input) {
  const directory = mkdtempSync(join(tmpdir(), "omniroute-state-merge-proof-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const result = spawnSync(
    "python3",
    [
      "-I",
      "-B",
      fixtureScript,
      "--implementation",
      "proposal",
      "--resolver",
      resolver,
      "--fixtures-root",
      directory,
      ...extra,
    ],
    {
      cwd: directory,
      env: { PATH: process.env.PATH, LANG: "C.UTF-8", TZ: "UTC" },
      encoding: "utf8",
      input,
      timeout: 15000,
      maxBuffer: 1024 * 1024,
    }
  );
  assert.equal(result.error, undefined);
  assert.equal(result.signal, null);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.equal(result.stderr, "");
  return JSON.parse(result.stdout);
}

linuxTest(
  "state merge preserves proved tuples and rejects unproved adoption before mutation",
  (t) => {
    const result = invoke(t, ["--all-proposal-cases"]);
    assert.equal(result.testsRun, 50);
    assert.equal(result.status, "PASS");
    assert.deepEqual(result.failures, []);
    assert.deepEqual(result.errors, []);
    assert.equal(result.externalProcessesExecuted, 0);
    assert.equal(result.realStateReadOrWritten, false);
  }
);

linuxTest("the resolver cache proof matches the canonical section parser", (t) => {
  const examples = [
    "---\ntitle: Fixture\n---\n\n# Heading\n\nLead.\n\n## A\n\n```md\n## not a heading\n```\n\n## B\n\nTail.\n",
    "# H\n\n\ufeff## A\n\nText.\u00a0\n",
    "# H\n\n## A\n\nText.\u0085\n",
    "# H\r\n\r\n## A\r\n\r\nText.\r\n",
  ];
  const results = invoke(t, ["--cache-fixtures"], JSON.stringify(examples));
  assert.deepEqual(
    results.map((result) => result.sourceText),
    examples
  );
  for (const result of results) {
    assert.deepEqual(
      result.hashes,
      sectionHashes(splitSections(stripTopHeading(result.sourceText)))
    );
  }
});
