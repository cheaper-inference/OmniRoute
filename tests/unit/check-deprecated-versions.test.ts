import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { findVersionDrift } from "../../scripts/check/check-deprecated-versions.mjs";

test("reports an old version attributed to OmniRoute on its original line", () => {
  const claim = "OmniRoute v3.5.0 is required";
  assert.deepEqual(findVersionDrift(`# Installation\n\n${claim}`), [
    { line: 3, type: "stale-version", match: "v3.5.0", text: claim },
  ]);
});

test("reports old prose versions, npm pins, and Docker tags on the same line", () => {
  const claims = [
    "npm install omniroute@2.1.0",
    "docker pull diegosouzapw/omniroute:3.4.1",
    "Run OmniRoute 1.9.0",
    "OMNIROUTE VERSION 3.6.12",
  ].join(" | ");

  assert.deepEqual(
    findVersionDrift(claims).map(({ match }) => match),
    ["2.1.0", "3.4.1", "1.9.0", "3.6.12"]
  );
});

test("ignores versions unrelated to OmniRoute, recent versions, and update dates", () => {
  const safeLines = [
    "Claude Code 2.1.258 (isolated container)",
    "## 🎮 Model Playground _(v2.0.9+)_",
    '"version": "1.0.0",',
    "#### 3.1.1 `src/app/(dashboard)/dashboard/` — UI pages",
    "Tested with OmniRoute 3.8.52: KiviDB 1.2.0",
    "OmniRoute 3.7.0",
    "OmniRoute 3.10.0",
    "Connect to OmniRoute 1.2.3.4",
    "_Last updated: 2020-01-01_",
    "OmniRoute\n3.5.0",
  ];

  for (const line of safeLines) assert.deepEqual(findVersionDrift(line), [], line);
});

test("ignores historical references, examples, and minimum-version markers", () => {
  const safeLines = [
    "OmniRoute v3.6.2+ ships the uninstall command",
    "Supports OmniRoute ≥v3.6.2",
    "Requires OmniRoute version >= 3.6.2",
    "Historical: OmniRoute v3.4.0 introduced X",
    "pin a tag (e.g. `OmniRoute v3.4.7`)",
    "For example, use `omniroute@2.1.0`.",
  ];

  for (const line of safeLines) assert.deepEqual(findVersionDrift(line), [], line);
});

test("skips lines longer than 500 characters", () => {
  const claim = "OmniRoute v3.5.0".padEnd(500, " ");
  assert.equal(findVersionDrift(claim).length, 1);
  assert.deepEqual(findVersionDrift(`${claim} `), []);
});

test("importing the scanner does not run the CLI", () => {
  const moduleUrl = new URL("../../scripts/check/check-deprecated-versions.mjs", import.meta.url);
  const result = spawnSync(process.execPath, ["--import", moduleUrl.href, "-"], {
    encoding: "utf8",
    input: "",
  });

  assert.ifError(result.error);
  assert.equal(result.status, 0);
  assert.equal(result.stdout, "");
  assert.equal(result.stderr, "");
});
