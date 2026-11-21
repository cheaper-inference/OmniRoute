import assert from "node:assert/strict";
import fs from "node:fs/promises";
import test from "node:test";
import {
  supportsManagedCliNpmPolicy,
  buildManagedCliNpmManifest,
} from "../../src/lib/cliTools/managedCliNpmPolicy.mjs";

test("local installs do not use the unsupported command-line allow-scripts option", async () => {
  const source = await fs.readFile(
    new URL("../../src/lib/cliTools/managedCliInstall.ts", import.meta.url),
    "utf8"
  );
  assert.ok(!source.includes("--allow-scripts="));
});

test("policy enforcement requires reviewed stable npm versions", () => {
  for (const version of ["11.18.0", "11.21.3", "12.0.0", "12.2.3\n"]) {
    assert.equal(supportsManagedCliNpmPolicy(version), true, version);
  }
  for (const version of [
    "10.9.0",
    "11.9.0",
    "11.15.0",
    "11.16.0",
    "11.17.9",
    "13.0.0",
    "12.0.0-beta.1",
    "12.0.0+build",
    "npm 12.0.0",
    "",
    null,
  ]) {
    assert.equal(supportsManagedCliNpmPolicy(version), false, String(version));
  }
});

test("staged manifest grants only explicit catalog lifecycle packages", () => {
  assert.deepEqual(
    buildManagedCliNpmManifest({ id: "claude", lifecyclePackages: ["@anthropic-ai/claude-code"] }),
    {
      name: "omniroute-managed-claude",
      version: "0.0.0",
      private: true,
      allowScripts: { "@anthropic-ai/claude-code": true },
    }
  );
  assert.deepEqual(
    buildManagedCliNpmManifest({ id: "codex", lifecyclePackages: [] }).allowScripts,
    {}
  );
});
