// OMNIROUTE_DIST_DIR (#17828) redirects the whole publish bundle into a scratch
// directory. That only works when EVERY esbuild --outfile in
// scripts/build/prepublish.ts is derived from DIST_DIR: a hardcoded
// "--outfile=dist/..." keeps writing into <repo>/dist and leaves the scratch
// bundle incomplete. This source-level test pins that invariant.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname, parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getPrepublishDistDirRefusal } from "../../scripts/build/prepublishPathSafety.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SOURCE = readFileSync(
  join(__dirname, "..", "..", "scripts", "build", "prepublish.ts"),
  "utf8"
);

test("prepublish resolves DIST_DIR from OMNIROUTE_DIST_DIR with a repo-root dist/ default", () => {
  assert.match(
    SOURCE,
    /const DIST_DIR = process\.env\.OMNIROUTE_DIST_DIR \|\| join\(ROOT, "dist"\);/
  );
});

test("no esbuild --outfile in prepublish hardcodes the dist/ directory", () => {
  const hardcoded = SOURCE.split("\n")
    .map((line, index) => ({ line: line.trim(), number: index + 1 }))
    .filter(({ line }) => /--outfile=["`]?dist\//.test(line) || /["`]--outfile=dist\//.test(line));
  assert.deepEqual(
    hardcoded,
    [],
    `hardcoded --outfile=dist/ literals bypass OMNIROUTE_DIST_DIR: ${JSON.stringify(hardcoded)}`
  );
});

test("every --outfile except the CLI entrypoint is derived from DIST_DIR", () => {
  const outfiles = SOURCE.split("\n")
    .map((line) => line.trim())
    .filter((line) => line.includes("--outfile="));
  const nonDist = outfiles.filter((line) => !line.includes("Dest"));
  // bin/omniroute.mjs is the CLI entrypoint staged in the checkout, not in dist/.
  assert.deepEqual(nonDist, ['"--outfile=bin/omniroute.mjs",']);
});

test("prepublish refuses an OMNIROUTE_DIST_DIR that would wipe the filesystem root", () => {
  const projectRoot = resolve(__dirname, "..", "..");
  const filesystemRoot = parse(projectRoot).root;
  assert.equal(getPrepublishDistDirRefusal(filesystemRoot, projectRoot), "filesystem root");
});

test("prepublish refuses the checkout and its parent directories", () => {
  const projectRoot = resolve(__dirname, "..", "..");
  assert.equal(getPrepublishDistDirRefusal(projectRoot, projectRoot), "the checkout");
  assert.equal(
    getPrepublishDistDirRefusal(dirname(projectRoot), projectRoot),
    "a parent of the checkout"
  );
});

test("prepublish allows repo dist/ and an external scratch directory", () => {
  const projectRoot = resolve(__dirname, "..", "..");
  assert.equal(getPrepublishDistDirRefusal(join(projectRoot, "dist"), projectRoot), undefined);
  assert.equal(
    getPrepublishDistDirRefusal(join(dirname(projectRoot), "scratch-output"), projectRoot),
    undefined
  );
});

test("prepublish checks path safety before recursively wiping DIST_DIR", () => {
  const guardAt = SOURCE.indexOf("getPrepublishDistDirRefusal(DIST_DIR, ROOT)");
  const wipeAt = SOURCE.indexOf("rmSync(DIST_DIR, { recursive: true, force: true })");
  assert.ok(guardAt > 0, "guard is present");
  assert.ok(wipeAt > guardAt, "guard runs before the recursive wipe of DIST_DIR");
});
