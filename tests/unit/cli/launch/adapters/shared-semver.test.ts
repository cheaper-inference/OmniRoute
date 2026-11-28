// Unit tests for bin/cli/launch/adapters/_shared/semver.mjs (shared adapter version helpers).

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  compareDotted,
  compareSemver,
  gateStatus,
  isSemverBelow,
  parseSemver,
  parseSemverPrefix,
  semverLess,
} from "../../../../../bin/cli/launch/adapters/_shared/semver.mjs";

test("parseSemver finds the first x.y.z anywhere in the text", () => {
  assert.deepEqual(parseSemver("tool 1.2.3 (build 4.5.6)"), [1, 2, 3]);
  assert.deepEqual(parseSemver("v10.20.30-beta"), [10, 20, 30]);
  assert.equal(parseSemver("1.2"), null);
  assert.equal(parseSemver(null), null);
  assert.equal(parseSemver(undefined), null);
});

test("parseSemverPrefix only accepts an x.y.z at the start", () => {
  assert.deepEqual(parseSemverPrefix("2.0.1 (Claude Code)"), [2, 0, 1]);
  assert.equal(parseSemverPrefix("v2.0.1"), null);
  assert.equal(parseSemverPrefix(" 2.0.1"), null);
  assert.equal(parseSemverPrefix(null), null);
});

test("compareSemver and semverLess order triples", () => {
  assert.equal(compareSemver([1, 2, 3], [1, 2, 3]), 0);
  assert.equal(compareSemver([1, 2, 3], [1, 3, 0]), -1);
  assert.equal(compareSemver([2, 0, 0], [1, 9, 9]), 1);
  assert.equal(semverLess([1, 2, 3], [1, 2, 4]), true);
  assert.equal(semverLess([1, 2, 4], [1, 2, 4]), false);
  assert.equal(semverLess([1, 3, 0], [1, 2, 9]), false);
});

test("isSemverBelow is false when either side does not parse", () => {
  assert.equal(isSemverBelow("0.9.0", "1.0.0"), true);
  assert.equal(isSemverBelow("1.0.0", "1.0.0"), false);
  assert.equal(isSemverBelow("vunknown", "1.0.0"), false);
  assert.equal(isSemverBelow(null, "1.0.0"), false);
  assert.equal(isSemverBelow("0.9.0", "latest"), false);
  // A custom parser (prefix-only) changes what counts as parseable.
  assert.equal(isSemverBelow("v0.9.0", "1.0.0", parseSemverPrefix), false);
  assert.equal(isSemverBelow("0.9.0 build", "1.0.0", parseSemverPrefix), true);
});

test("compareDotted compares numeric parts, non-numeric parts count as 0", () => {
  assert.equal(compareDotted("2026.1.10", "2026.1.9"), 1);
  assert.equal(compareDotted("1.2", "1.2.0"), 0);
  assert.equal(compareDotted("1.2.x", "1.2.0"), 0);
  assert.equal(compareDotted("1.2.3.4", "1.2.3.5"), -1);
  // A fixed width ignores the parts past it.
  assert.equal(compareDotted("1.2.3.4", "1.2.3.5", 3), 0);
  assert.equal(compareDotted("0.9", "1.0", 3), -1);
});

test("gateStatus places a version against min and recommended", () => {
  const gate = { min: "1.0.0", recommended: "1.5.0" };
  assert.equal(gateStatus("vunknown", gate), "unknown");
  assert.equal(gateStatus("0.9.9", gate), "too-old");
  assert.equal(gateStatus("1.2.0", gate), "behind");
  assert.equal(gateStatus("1.5.0", gate), "ok");
  assert.equal(gateStatus("1.2.0", { min: "1.0.0" }), "ok");
});
