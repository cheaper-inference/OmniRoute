import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const root = fileURLToPath(new URL("../../../", import.meta.url));

function observe(t, flags) {
  const artifacts = join(root, "_artifacts");
  mkdirSync(artifacts, { recursive: true });
  const directory = mkdtempSync(join(artifacts, "pack-staging-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, "scripts/build"), { recursive: true });
  mkdirSync(join(directory, "scripts/ad-hoc"), { recursive: true });
  for (const name of [
    "validate-pack-artifact.ts",
    "pack-artifact-policy.ts",
    "docsMirrorRuntime.mjs",
    "buildProvenance.ts",
    "mcpPublishedFilesClosure.ts",
    "resolveNpmEntry.ts",
  ])
    copyFileSync(join(root, "scripts/build", name), join(directory, "scripts/build", name));
  writeFileSync(join(directory, "package.json"), JSON.stringify({ type: "module" }));
  const trace = join(directory, "unexpected-npm.json");
  const npmEntry = join(directory, "scripts/ad-hoc/npm-cli.js");
  writeFileSync(
    npmEntry,
    `
    import { writeFileSync } from "node:fs";
    writeFileSync(${JSON.stringify(trace)}, JSON.stringify(process.argv.slice(2)));
    process.exit(99);
  `
  );
  const result = spawnSync(
    process.execPath,
    ["--import", "tsx/esm", join(directory, "scripts/build/validate-pack-artifact.ts"), ...flags],
    {
      cwd: directory,
      env: { PATH: process.env.PATH, LANG: "C.UTF-8", npm_execpath: npmEntry },
      encoding: "utf8",
      timeout: 10000,
    }
  );
  assert.equal(result.error, undefined);
  return {
    ...result,
    attempted: existsSync(trace) ? JSON.parse(readFileSync(trace, "utf8")) : null,
  };
}

test("strict pack validation rejects missing staging before invoking npm", (t) => {
  const result = observe(t, ["--require-staging"]);
  assert.equal(result.status, 1);
  assert.equal(result.attempted, null, "prepared pack validation cannot request another build");
  assert.match(result.stderr, /PACK_STAGING_MISSING/);
});

test("strict staging cannot be combined with policy-only", (t) => {
  const result = observe(t, ["--require-staging", "--policy-only"]);
  assert.equal(result.status, 1);
  assert.equal(result.attempted, null);
  assert.match(result.stderr, /--require-staging cannot be combined with --policy-only/);
});

test("legacy standalone checker retains its explicit preparation behavior", (t) => {
  const result = observe(t, []);
  assert.equal(result.status, 1, "the synthetic npm command deliberately exits 99");
  assert.deepEqual(result.attempted, ["run", "build:cli"]);
});
