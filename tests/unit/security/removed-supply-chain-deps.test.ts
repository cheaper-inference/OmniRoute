import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { discoverManifests } from "../../../scripts/check/check-deps.mjs";

const repoRoot = fileURLToPath(new URL("../../../", import.meta.url));
const removedPackages = {
  "fetch-socks":
    "deprecated on npm and its repository is archived; removed in 2026-11 (no imports)",
  "node-loader": "its repository is archived; removed in 2026-11 (unused)",
};
const dependencySections = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
] as const;

test("package manifests do not declare dependencies removed for supply chain reasons", () => {
  const violations: string[] = [];
  const manifests: string[] = discoverManifests(repoRoot);

  for (const path of manifests) {
    const manifest: Partial<Record<(typeof dependencySections)[number], Record<string, unknown>>> =
      JSON.parse(readFileSync(join(repoRoot, path), "utf8"));
    for (const section of dependencySections) {
      const dependencies = manifest[section] ?? {};
      for (const [name, reason] of Object.entries(removedPackages)) {
        if (Object.hasOwn(dependencies, name)) {
          violations.push(`${path} (${section}): ${name} — ${reason}`);
        }
      }
    }
  }

  assert.equal(violations.length, 0, violations.join("\n"));
});
