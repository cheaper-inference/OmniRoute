import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const repoRoot = new URL("../../../", import.meta.url);
const lockfiles = [
  "package-lock.json",
  "electron/package-lock.json",
  "@omniroute/opencode-plugin/package-lock.json",
  "@omniroute/opencode-plugin-v2/package-lock.json",
  "@omniroute/opencode-provider/package-lock.json",
];

const advisories = new Map([
  ["minimatch", { introduced: "7.0.0", fixed: "11.0.1", id: "GHSA-g3hv-75wg-m249" }],
  ["glob", { introduced: "9.0.0", fixed: "14.0.2", id: "GHSA-3g3m-2fjr-6pw4" }],
  ["effect", { introduced: "4.0.0-beta.0", fixed: "4.0.0-beta.103", id: "GHSA-chp3-j5qr-2vfr" }],
]);

function parseVersion(version: string) {
  const match = /^(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?(?:\+[\w.-]+)?$/.exec(version);
  assert.ok(match, `Invalid version in advisory check: ${version}`);
  const [, major, minor, patch, prerelease] = match;
  return { major: Number(major), minor: Number(minor), patch: Number(patch), prerelease };
}

function compareVersions(left: string, right: string): number {
  const a = parseVersion(left);
  const b = parseVersion(right);
  const coreOrder = a.major - b.major || a.minor - b.minor || a.patch - b.patch;
  if (coreOrder || a.prerelease === b.prerelease) return coreOrder;
  if (!a.prerelease) return 1;
  if (!b.prerelease) return -1;

  const aIdentifiers = a.prerelease.split(".");
  const bIdentifiers = b.prerelease.split(".");
  for (const [index, aIdentifier] of aIdentifiers.entries()) {
    const bIdentifier = bIdentifiers[index];
    if (bIdentifier === undefined) return 1;
    if (aIdentifier === bIdentifier) continue;

    const aIsNumeric = /^\d+$/.test(aIdentifier);
    const bIsNumeric = /^\d+$/.test(bIdentifier);
    if (aIsNumeric && bIsNumeric) return Number(aIdentifier) - Number(bIdentifier);
    if (aIsNumeric !== bIsNumeric) return aIsNumeric ? -1 : 1;
    return aIdentifier < bIdentifier ? -1 : 1;
  }
  return aIdentifiers.length - bIdentifiers.length;
}

test("npm lockfiles exclude versions affected by the minimatch, glob, and effect advisories", () => {
  const violations: string[] = [];
  for (const lockfile of lockfiles) {
    const { packages } = JSON.parse(readFileSync(new URL(lockfile, repoRoot), "utf8")) as {
      packages: Record<string, { version: string }>;
    };

    for (const [path, { version }] of Object.entries(packages)) {
      const packageName = path.split("node_modules/").at(-1) ?? "";
      const advisory = advisories.get(packageName);
      if (
        advisory &&
        compareVersions(version, advisory.introduced) >= 0 &&
        compareVersions(version, advisory.fixed) < 0
      ) {
        violations.push(`${lockfile}: ${path}@${version} (${advisory.id})`);
      }
    }
  }

  assert.equal(violations.length, 0, `Vulnerable lockfile entries:\n${violations.join("\n")}`);
});
